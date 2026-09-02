export type FormType = 'SERVICES' | 'CAREERS' | 'CONTACT'

export interface FormEnv {
  SUBMISSIONS_DB?: D1Database
  RESUMES_BUCKET?: R2Bucket
  RESEND_API_KEY?: string
  RESEND_FROM?: string
  OTP_SECRET?: string
  CLIENT_INBOX?: string
  SALES_INBOX?: string
  TALENT_INBOX?: string
  HR_INBOX?: string
}

export const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export function clean(value: unknown, max = 4000) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function maskEmail(email: string) {
  const [user, domain] = email.split('@')
  if (!user || !domain) return email
  const visible = user.slice(0, 1)
  return `${visible}***@${domain}`
}

export function makeReference(type: FormType) {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 90000000
  return `OPERAVA-${type.slice(0, 3)}-${String(10000000 + n).slice(0, 8)}`
}

export function generateOtp() {
  const range = 900000
  const limit = Math.floor(0x100000000 / range) * range
  const random = new Uint32Array(1)
  do {
    crypto.getRandomValues(random)
  } while (random[0] >= limit)
  return String(100000 + (random[0] % range))
}

export async function hashOtp(secret: string, code: string) {
  const data = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${secret}\0${code}`))
  return [...new Uint8Array(data)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function otpEmailHtml(name: string, purpose: string, code: string) {
  const first = escapeHtml(name.split(' ')[0] || name)
  return `<!DOCTYPE html><html><body style="margin:0;background:#f7f6fb;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1c1333">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
  <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
    <tr><td style="padding:28px 32px 8px;text-align:center"><img src="https://www.operavaglobal.com/operava-logo.svg" alt="OPERAVA" width="48" height="48" style="display:inline-block"/></td></tr>
    <tr><td style="padding:8px 32px 0;text-align:center;font-size:12px;letter-spacing:.16em;font-weight:700;color:#6d28d9">OPERAVA</td></tr>
    <tr><td style="padding:16px 32px 0;text-align:center;font-size:22px;font-weight:700">Verify your email</td></tr>
    <tr><td style="padding:16px 32px;font-size:14px;line-height:1.6;color:#4b445c">Hello ${first},<br/><br/>We received a request to verify your email address for your:<br/><strong>${escapeHtml(purpose)}</strong></td></tr>
    <tr><td style="padding:8px 32px 20px;text-align:center"><div style="display:inline-block;letter-spacing:10px;font-size:32px;font-weight:700;color:#1c1333">${escapeHtml(code)}</div><div style="margin-top:8px;font-size:12px;color:#6b6478">This code expires in 10 minutes.</div></td></tr>
    <tr><td style="padding:0 32px 28px;font-size:12px;line-height:1.6;color:#6b6478">For your security, do not share this code with anyone. If you did not make this request, you may safely ignore this email.<br/><br/>Need assistance? Contact OPERAVA Support.<br/>© OPERAVA. All rights reserved.</td></tr>
  </table></td></tr></table></body></html>`
}

export function otpEmailText(name: string, purpose: string, code: string) {
  return `Hello ${name.split(' ')[0] || name},

Verify your email for: ${purpose}
Your verification code is: ${code}
This code expires in 10 minutes.

Do not share this code. If you did not request it, ignore this email.
OPERAVA`
}

export async function sendResend(env: FormEnv, payload: Record<string, unknown>) {
  if (!env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM || 'OPERAVA <noreply@operavaglobal.com>',
      ...payload,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend failed ${res.status}: ${text.slice(0, 300)}`)
  }
}

export function inboxFor(type: FormType, env: FormEnv) {
  if (type === 'CAREERS') return [env.TALENT_INBOX || 'talents@operavaglobal.com', env.HR_INBOX || 'hr@operavaglobal.com']
  if (type === 'SERVICES') return [env.SALES_INBOX || env.CLIENT_INBOX || 'hello@operavaglobal.com']
  return [env.CLIENT_INBOX || 'hello@operavaglobal.com']
}

export function purposeLabel(type: FormType) {
  if (type === 'SERVICES') return 'SERVICE INQUIRY'
  if (type === 'CAREERS') return 'JOB APPLICATION'
  return 'GENERAL INQUIRY'
}

export async function ensureTables(db: D1Database) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference_id TEXT NOT NULL UNIQUE,
      form_type TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      payload TEXT NOT NULL,
      verification_status TEXT NOT NULL DEFAULT 'PENDING',
      status TEXT NOT NULL DEFAULT 'NEW',
      resume_key TEXT,
      created_at TEXT NOT NULL,
      verified_at TEXT
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS form_otps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      form_type TEXT NOT NULL,
      draft_id TEXT NOT NULL UNIQUE,
      code_hash TEXT NOT NULL,
      payload TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      resends INTEGER NOT NULL DEFAULT 0,
      last_sent_at INTEGER NOT NULL,
      consumed INTEGER NOT NULL DEFAULT 0
    )`),
  ])
}
