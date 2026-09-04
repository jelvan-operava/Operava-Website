import { applicantConfirmationEmail, sendResend, TALENT_RESEND_FROM, type FormEnv } from '../lib/formCore'

interface Env extends FormEnv {
  APPLICANT_CC?: string
}

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

    const name = clean(body.name, 120)
    const email = clean(body.email, 180).toLowerCase()
    if (name.length < 2) return json({ error: 'Name is required.' }, 400)
    if (!EMAIL_RE.test(email)) return json({ error: 'A valid email is required.' }, 400)

    const role = clean(body.role, 180)
    const phone = clean(body.phone, 40)
    const country = clean(body.country, 80)
    const notes = clean(body.notes || body.description, 4000)
    const ticketId = `OPV-${Math.floor(100000 + Math.random() * 900000)}`
    const talentInbox = env.TALENT_INBOX || 'talents@operavaglobal.com'
    const apiKey = env.RESEND_API_KEY
    if (!apiKey) return json({ error: 'Email delivery is not configured yet.' }, 503)

    const cc = uniqueEmails([talentInbox, ...parseList(env.APPLICANT_CC)], email)
    const rows = [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Role', value: role || 'General application' },
      { label: 'Phone', value: phone },
      { label: 'Country', value: country },
      { label: 'Notes', value: notes },
    ]

    const html = applicantConfirmationEmail({
      name,
      email,
      referenceId: ticketId,
      sourceLabel: 'Careers / AVA applicant path',
      rows,
    })

    try {
      await sendResend(env, {
        from: TALENT_RESEND_FROM,
        to: [email],
        cc,
        subject: 'Operava Application',
        html,
        text: `CONFIRMATION\n\nHi ${name},\n\nThank you for submitting your application. Our team will review your profile and get in touch with you as soon as possible.\n\nTalent Acquisition Team,\nOperava Global Solutions`,
      })
    } catch (err) {
      console.error('Resend error', err)
      return json({ error: 'Unable to deliver this application.' }, 502)
    }
    return json({ ok: true, referenceId: ticketId })
  } catch {
    return json({ error: 'Unable to process this application.' }, 500)
  }
}
