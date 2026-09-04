import {
  applicantConfirmationEmail,
  clientConfirmationEmail,
  CLIENT_RESEND_FROM,
  sendResend,
  TALENT_RESEND_FROM,
  type FormEnv,
} from '../lib/formCore'

interface Env extends FormEnv {
  APPLICANT_CC?: string
}

const CAREER_KINDS = new Set(['career', 'ai-career'])
const ALLOWED_KINDS = new Set(['contact', 'service', 'ai-consultation', 'career', 'ai-career'])

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

function clean(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

function parseList(value?: string): string[] {
  if (!value) return []
  return value
    .split(/[,;]+/)
    .map((item) => item.trim().toLowerCase())
    .filter((item) => EMAIL_RE.test(item))
}

function uniqueEmails(list: string[], exclude: string): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const item of list) {
    if (!item || item === exclude || seen.has(item)) continue
    seen.add(item)
    out.push(item)
  }
  return out
}

function makeTicketId(): string {
  return `OPV-${Math.floor(100000 + Math.random() * 900000)}`
}

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as Record<string, unknown>
    if (clean(body.website, 80)) return json({ ok: true, referenceId: 'OPV-FILTERED' })

    const kind = clean(body.kind, 40)
    if (!ALLOWED_KINDS.has(kind)) return json({ error: 'Unknown inquiry type.' }, 400)

    const name = clean(body.name, 120)
    const email = clean(body.email, 180).toLowerCase()
    if (name.length < 2) return json({ error: 'Name is required.' }, 400)
    if (!EMAIL_RE.test(email)) return json({ error: 'A valid email is required.' }, 400)

    const fields = {
      company: clean(body.company, 160),
      phone: clean(body.phone, 40),
      country: clean(body.country, 80),
      service: clean(body.service, 160),
      teamModel: clean(body.teamModel, 80),
      timeline: clean(body.timeline, 80),
      role: clean(body.role, 180),
      notes: clean(body.notes || body.description, 4000),
    }

    const isCareer = CAREER_KINDS.has(kind)
    const clientInbox = env.CLIENT_INBOX || 'hello@operavaglobal.com'
    const talentInbox = env.TALENT_INBOX || 'talents@operavaglobal.com'
    const apiKey = env.RESEND_API_KEY
    const ticketId = makeTicketId()
    const sourceLabel = {
      contact: 'Website contact form',
      service: 'Services inquiry',
      'ai-consultation': 'AVA assistant — client consultation',
      career: 'Careers application',
      'ai-career': 'AVA assistant — applicant interest',
    }[kind] as string

    const cc = uniqueEmails(
      isCareer ? [talentInbox, ...parseList(env.APPLICANT_CC)] : [clientInbox],
      email,
    )
    const subject = isCareer ? 'Operava Application' : kind === 'service' ? 'Services Inquiry' : 'Contact Inquiry'

    const rows = [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Company', value: fields.company },
      { label: 'Phone', value: fields.phone },
      { label: 'Country', value: fields.country },
      { label: 'Service', value: fields.service },
      { label: 'Delivery model', value: fields.teamModel },
      { label: 'Timeline', value: fields.timeline },
      { label: 'Role', value: fields.role },
      { label: 'Details', value: fields.notes },
    ]

    const html = isCareer
      ? applicantConfirmationEmail({ name, email, referenceId: ticketId, sourceLabel, rows })
      : clientConfirmationEmail({ name, email, referenceId: ticketId, sourceLabel, rows })

    const text = isCareer
      ? `CONFIRMATION\n\nHi ${name},\n\nThank you for submitting your application. Our team will review your profile and get in touch with you as soon as possible.\n\nTalent Acquisition Team,\nOperava Global Solutions`
      : `CONFIRMATION\n\nHi ${name},\n\nThank you for submitting your inquiry. The team will get in touch with you as soon as possible.\n\nClient Support Team,\nOperava Global Solutions`

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return json({ error: 'Email delivery is not configured yet.' }, 503)
    }

    const payload: Record<string, unknown> = {
      from: isCareer ? TALENT_RESEND_FROM : CLIENT_RESEND_FROM,
      to: [email],
      reply_to: isCareer ? TALENT_RESEND_FROM : CLIENT_RESEND_FROM,
      subject,
      html,
      text,
    }
    if (cc.length) payload.cc = cc

    try {
      await sendResend(env, payload)
    } catch (err) {
      console.error('Resend error', err)
      return json({ error: 'Unable to deliver this inquiry.' }, 502)
    }

    return json({ ok: true, referenceId: ticketId })
  } catch {
    return json({ error: 'Unable to process this inquiry.' }, 500)
  }
}
