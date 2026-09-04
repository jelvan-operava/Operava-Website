interface Env {
  RESEND_API_KEY?: string
  RESEND_FROM?: string
  CLIENT_INBOX?: string
  TALENT_INBOX?: string
  HR_INBOX?: string
  APPLICANT_CC?: string
}

const CAREER_KINDS = new Set(['career', 'ai-career'])
const ALLOWED_KINDS = new Set([
  'contact',
  'service',
  'ai-consultation',
  'career',
  'ai-career',
])

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

function clean(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value: string): string {
  if (!value) return ''
  return `<tr><td style="padding:8px 0;color:#5b5270;width:160px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#1c1333;">${escapeHtml(value).replace(/\n/g, '<br/>')}</td></tr>`
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

/** Same ticket shape AVA generates in chat: OPV-###### */
function makeTicketId(): string {
  return `OPV-${Math.floor(100000 + Math.random() * 900000)}`
}

function detailsTable(name: string, email: string, fields: Record<string, string>): string {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row('Name', name)}
          ${row('Email', email)}
          ${row('Company', fields.company)}
          ${row('Phone', fields.phone)}
          ${row('Country', fields.country)}
          ${row('Service', fields.service)}
          ${row('Delivery model', fields.teamModel)}
          ${row('Timeline', fields.timeline)}
          ${row('Role', fields.role)}
          ${row('Details', fields.notes)}
        </table>`
}

function clientConfirmationHtml(
  name: string,
  email: string,
  ticketId: string,
  sourceLabel: string,
  fields: Record<string, string>,
): string {
  return `
      <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;color:#1c1333;">
        <p style="margin:0 0 4px;color:#6d28d9;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">AVA ticket confirmation</p>
        <h2 style="margin:0 0 8px;">Thank you, ${escapeHtml(name)}.</h2>
        <p style="margin:0 0 16px;color:#5b5270;line-height:1.5;">
          Your project consultation request is registered under reference <strong>#${escapeHtml(ticketId)}</strong>.
          Our solutions team received your information (${escapeHtml(email)}) and will review your requirements to connect with you within 2 business hours.
        </p>
        <p style="margin:0 0 16px;color:#5b5270;font-size:13px;">${escapeHtml(sourceLabel)}</p>
        ${detailsTable(name, email, fields)}
        <p style="margin:24px 0 0;color:#8a8298;font-size:12px;">OPERAVA Global Solutions · We Operate in Advance</p>
      </div>`
}

function applicantConfirmationHtml(
  name: string,
  email: string,
  ticketId: string,
  sourceLabel: string,
  fields: Record<string, string>,
): string {
  return `
      <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;color:#1c1333;">
        <p style="margin:0 0 4px;color:#6d28d9;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">AVA ticket confirmation</p>
        <h2 style="margin:0 0 8px;">Thank you, ${escapeHtml(name)}.</h2>
        <p style="margin:0 0 16px;color:#5b5270;line-height:1.5;">
          Your career application is registered under reference <strong>#${escapeHtml(ticketId)}</strong>.
          Talent review typically starts within 24–48 hours. Keep this ticket number for follow-up.
        </p>
        <p style="margin:0 0 16px;color:#5b5270;font-size:13px;">${escapeHtml(sourceLabel)} · sent to ${escapeHtml(email)}</p>
        ${detailsTable(name, email, fields)}
        <p style="margin:24px 0 0;color:#8a8298;font-size:12px;">OPERAVA Global Solutions · Careers</p>
      </div>`
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as Record<string, unknown>
    if (clean(body.website, 80)) {
      return json({ ok: true, referenceId: 'OPV-FILTERED' })
    }

    const kind = clean(body.kind, 40)
    if (!ALLOWED_KINDS.has(kind)) {
      return json({ error: 'Unknown inquiry type.' }, 400)
    }

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
    const hrInbox = env.HR_INBOX || 'hr@operavaglobal.com'
    const from = env.RESEND_FROM || 'OPERAVA Website <noreply@operavaglobal.com>'
    const apiKey = env.RESEND_API_KEY
    const ticketId = makeTicketId()
    const sourceLabel = {
      contact: 'Website contact form',
      service: 'Services inquiry',
      'ai-consultation': 'AVA assistant consultation',
      career: 'Careers application',
      'ai-career': 'AVA assistant career interest',
    }[kind] as string

    const cc = uniqueEmails(
      isCareer ? [talentInbox, hrInbox, ...parseList(env.APPLICANT_CC)] : [clientInbox],
      email,
    )
    const replyTo = isCareer ? talentInbox : clientInbox
    const subject = isCareer
      ? `Ticket #${ticketId} — career application received`
      : `Ticket #${ticketId} — consultation request received`
    const html = isCareer
      ? applicantConfirmationHtml(name, email, ticketId, sourceLabel, fields)
      : clientConfirmationHtml(name, email, ticketId, sourceLabel, fields)
    const text = [
      isCareer
        ? `Thank you, ${name}. Your career application is registered under reference #${ticketId}.`
        : `Thank you, ${name}. Your project consultation request is registered under reference #${ticketId}.`,
      `Our team received your information (${email}).`,
      isCareer
        ? 'Talent review typically starts within 24-48 hours.'
        : 'We will review your requirements and connect within 2 business hours.',
      sourceLabel,
      fields.company && `Company: ${fields.company}`,
      fields.phone && `Phone: ${fields.phone}`,
      fields.country && `Country: ${fields.country}`,
      fields.service && `Service: ${fields.service}`,
      fields.teamModel && `Model: ${fields.teamModel}`,
      fields.timeline && `Timeline: ${fields.timeline}`,
      fields.role && `Role: ${fields.role}`,
      fields.notes && `Details:\n${fields.notes}`,
    ]
      .filter(Boolean)
      .join('\n')

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return json({ error: 'Email delivery is not configured yet.' }, 503)
    }

    const payload: Record<string, unknown> = {
      from,
      to: [email],
      reply_to: replyTo,
      subject,
      html,
      text,
    }
    if (cc.length) payload.cc = cc

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Resend error', res.status, errText)
      return json({ error: 'Unable to deliver this inquiry.' }, 502)
    }

    return json({ ok: true, referenceId: ticketId })
  } catch {
    return json({ error: 'Unable to process this inquiry.' }, 500)
  }
}

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
