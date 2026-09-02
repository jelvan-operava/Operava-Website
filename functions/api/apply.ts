interface Env {
  RESEND_API_KEY?: string
  RESEND_FROM?: string
  TALENT_INBOX?: string
  HR_INBOX?: string
  APPLICANT_CC?: string
}

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

function parseList(value?: string): string[] {
  if (!value) return []
  return value.split(/[,;]+/).map((item) => item.trim().toLowerCase()).filter((item) => EMAIL_RE.test(item))
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
    const hrInbox = env.HR_INBOX || 'hr@operavaglobal.com'
    const from = env.RESEND_FROM || 'OPERAVA Careers <noreply@operavaglobal.com>'
    const apiKey = env.RESEND_API_KEY
    if (!apiKey) return json({ error: 'Email delivery is not configured yet.' }, 503)

    const cc = uniqueEmails([talentInbox, hrInbox, ...parseList(env.APPLICANT_CC)], email)
    const html = `
      <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;color:#1c1333;">
        <p style="margin:0 0 4px;color:#6d28d9;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Applicant confirmation</p>
        <h2 style="margin:0 0 8px;">Thank you, ${escapeHtml(name)}.</h2>
        <p style="margin:0 0 16px;color:#5b5270;line-height:1.5;">
          Your career application is registered under reference <strong>#${escapeHtml(ticketId)}</strong>.
          Talent review typically starts within 24–48 hours.
        </p>
        <p>Role: ${escapeHtml(role || 'General application')}</p>
        <p>Phone: ${escapeHtml(phone || '—')}</p>
        <p>Country: ${escapeHtml(country || '—')}</p>
        <p>Notes: ${escapeHtml(notes || '—')}</p>
      </div>`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        reply_to: talentInbox,
        cc,
        subject: `Ticket #${ticketId} — career application received`,
        html,
        text: `Thank you, ${name}. Application #${ticketId} received for ${role || 'a general role'}.`,
      }),
    })
    if (!res.ok) return json({ error: 'Unable to deliver this application.' }, 502)
    return json({ ok: true, referenceId: ticketId })
  } catch {
    return json({ error: 'Unable to process this application.' }, 500)
  }
}
