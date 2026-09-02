interface Env {
  RESEND_API_KEY?: string
  RESEND_FROM?: string
  CLIENT_INBOX?: string
  TALENT_INBOX?: string
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
    const to = isCareer
      ? env.TALENT_INBOX || 'talents@operavaglobal.com'
      : env.CLIENT_INBOX || 'client@operavaglobal.com'
    const from = env.RESEND_FROM || 'OPERAVA Website <noreply@operavaglobal.com>'
    const apiKey = env.RESEND_API_KEY
    const year = new Date().getFullYear()
    const referenceId = `OPV-${year}-${Math.floor(10000 + Math.random() * 90000)}`
    const sourceLabel = {
      contact: 'Website contact form',
      service: 'Services inquiry',
      'ai-consultation': 'AVA assistant consultation',
      career: 'Careers application',
      'ai-career': 'AVA assistant career interest',
    }[kind]
    const subject = isCareer
      ? `[Career] ${fields.role || 'Application'} — ${name} (${referenceId})`
      : `[Client] ${fields.service || 'Inquiry'} — ${name} (${referenceId})`

    const html = `
      <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;color:#1c1333;">
        <h2 style="margin:0 0 8px;">OPERAVA website inquiry</h2>
        <p style="margin:0 0 16px;color:#5b5270;">${escapeHtml(sourceLabel || kind)} · ${escapeHtml(referenceId)}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
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
        </table>
      </div>`

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return json({ error: 'Email delivery is not configured yet.' }, 503)
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html,
        text: [
          sourceLabel,
          `Reference: ${referenceId}`,
          `Name: ${name}`,
          `Email: ${email}`,
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
          .join('\n'),
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Resend error', res.status, errText)
      return json({ error: 'Unable to deliver this inquiry.' }, 502)
    }

    return json({ ok: true, referenceId })
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
