import {
  otpEmailTemplate,
  servicesConfirmationTemplate,
  applicationConfirmationTemplate,
} from './emailTemplates'

export type FormType = 'SERVICES' | 'CAREERS' | 'CONTACT'

export interface FormEnv {
  SUBMISSIONS_DB?: D1Database
  RESUMES_BUCKET?: R2Bucket
  RESEND_API_KEY?: string
  RESEND_FROM?: string
  OTP_SECRET?: string
  CLIENT_INBOX?: string
  TALENT_INBOX?: string
}

/** Prefer verified domain sender from wrangler vars (notification@operavaglobal.com). */
export const DEFAULT_RESEND_FROM = 'OPERAVA <notification@operavaglobal.com>'
export const OTP_RESEND_FROM = 'OPERAVA <notification@operavaglobal.com>'
export const NOTIFICATION_NOREPLY_FROM = 'OPERAVA <notification@operavaglobal.com>'
export const CLIENT_RESEND_FROM = 'hello@operavaglobal.com'
export const TALENT_RESEND_FROM = 'talents@operavaglobal.com'
export const APPLICANT_CONFIRMATION_FROM = 'OPERAVA <notification@operavaglobal.com>'
export const SUPPORT_INBOX = 'hello@operavaglobal.com'
export const DEFAULT_OTP_SECRET = 'operava-form-secret'

export function resolveSecret(env: FormEnv): string {
  return (env.OTP_SECRET && String(env.OTP_SECRET)) || (env.RESEND_API_KEY && String(env.RESEND_API_KEY)) || DEFAULT_OTP_SECRET
}

export function isProductionRuntime(): boolean {
  try {
    return typeof process !== 'undefined' && process?.env?.NODE_ENV === 'production'
  } catch {
    return true
  }
}

/** UTF-8 safe base64url (avoids btoa Latin-1 crashes and Workers spread limits). */
export function b64urlEncode(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array
  if (typeof input === 'string') bytes = new TextEncoder().encode(input)
  else bytes = input instanceof Uint8Array ? input : new Uint8Array(input)
  let bin = ''
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i])
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function b64urlDecode(s: string): string {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

export async function hmacSign(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return b64urlEncode(sig)
}

export async function issueSignedDraft(
  secret: string,
  data: {
    email: string
    formType: FormType
    payload: string
    codeHash: string
    expiresAt: number
    attempts?: number
    resends?: number
    lastSentAt?: number
  },
): Promise<string> {
  const body = JSON.stringify({
    email: data.email,
    formType: data.formType,
    payload: data.payload,
    codeHash: data.codeHash,
    expiresAt: data.expiresAt,
    attempts: data.attempts || 0,
    resends: data.resends || 0,
    lastSentAt: data.lastSentAt || Date.now(),
  })
  const payload = b64urlEncode(body)
  const sig = await hmacSign(secret, payload)
  return `s1.${payload}.${sig}`
}

export async function readSignedDraft(secret: string, draftId: string) {
  if (!draftId || !draftId.startsWith('s1.')) return null
  const parts = draftId.split('.')
  if (parts.length !== 3) return null
  const [, payload, sig] = parts
  const expected = await hmacSign(secret, payload)
  if (sig !== expected) return null
  try {
    return JSON.parse(b64urlDecode(payload)) as {
      email: string
      formType: FormType
      payload: string
      codeHash: string
      expiresAt: number
      attempts: number
      resends: number
      lastSentAt: number
    }
  } catch {
    return null
  }
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
  const amp = String.fromCharCode(38)
  return value
    .replace(/&/g, amp + 'amp;')
    .replace(/</g, amp + 'lt;')
    .replace(/>/g, amp + 'gt;')
    .replace(/"/g, amp + 'quot;')
}

export function maskEmail(email: string) {
  const [user, domain] = email.split('@')
  if (!user || !domain) return email
  return `${user.slice(0, 1)}***@${domain}`
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
  const bytes = new Uint8Array(data)
  let hex = ''
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0')
  }
  return hex
}

export function renderEmailTemplate(template: string, replacements: Record<string, string>): string {
  return Object.entries(replacements).reduce(
    (html, [key, value]) => html.split(`{{${key}}}`).join(value),
    template,
  )
}

export function otpEmailHtml(_name: string, purpose: string, code: string) {
  return renderEmailTemplate(otpEmailTemplate, {
    PURPOSE: escapeHtml(purpose),
    OTP_CODE: escapeHtml(code),
  })
}

export function otpEmailText(_name: string, purpose: string, code: string) {
  return `Your verification code for ${purpose} is: ${code}\n\nThis code expires in 10 minutes.\n\nDo not share this code. If you did not request it, ignore this email.\nOPERAVA · www.operavaglobal.com`
}

export async function sendResend(env: FormEnv, payload: Record<string, unknown>) {
  const apiKey = env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')

  const from =
    (typeof payload.from === 'string' && payload.from.trim()) ||
    (env.RESEND_FROM && String(env.RESEND_FROM).trim()) ||
    DEFAULT_RESEND_FROM

  const body = { ...payload, from }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      throw new Error(`Resend failed ${res.status}: ${errText.slice(0, 400)}`)
    }
  } finally {
    clearTimeout(timer)
  }
}

export function inboxFor(type: FormType, env: FormEnv) {
  if (type === 'CAREERS') return [env.TALENT_INBOX || 'talents@operavaglobal.com']
  return [env.CLIENT_INBOX || 'hello@operavaglobal.com']
}

export function senderFor(_type: FormType, env: FormEnv) {
  return env.RESEND_FROM || DEFAULT_RESEND_FROM
}

export function purposeLabel(type: FormType) {
  if (type === 'SERVICES') return 'SERVICE INQUIRY'
  if (type === 'CAREERS') return 'JOB APPLICATION'
  return 'GENERAL INQUIRY'
}

function submissionValue(rows: Array<{ label: string; value: string }>, ...labels: string[]) {
  const wanted = labels.map((label) => label.toLowerCase())
  return rows.find((row) => wanted.includes(row.label.toLowerCase()))?.value || ''
}

function submissionListHtml(
  name: string,
  rows: Array<{ label: string; value: string }>,
  fields: Array<{ label: string; keys: string[] }>,
  referenceId: string,
) {
  const values: Array<[string, string]> = [
    ['Name', name],
    ...fields
      .map(({ label, keys }) => [label, submissionValue(rows, ...keys)] as [string, string])
      .filter(([_, value]) => Boolean(value && value.trim() && value !== 'undefined')),
    ['Reference Number', referenceId],
  ]
  return `<ul style="margin:8px 0 14px 0;padding-left:18px;font-size:12px;line-height:1.55;color:#1F2937;">${values
    .map(
      ([label, value]) =>
        `<li style="margin-bottom:4px;font-size:12px;line-height:1.55;"><strong style="color:#0B0F19;">${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`,
    )
    .join('')}</ul>`
}

export function clientConfirmationEmail(opts: {
  name: string
  email: string
  referenceId: string
  sourceLabel: string
  rows: Array<{ label: string; value: string }>
}): string {
  return renderEmailTemplate(servicesConfirmationTemplate, {
    NAME: escapeHtml(opts.name),
    DETAILS_LIST: submissionListHtml(
      opts.name,
      opts.rows,
      [
        { label: 'Email', keys: ['Email'] },
        { label: 'Phone', keys: ['Phone'] },
        { label: 'Country / Location', keys: ['Country / Location', 'Country'] },
        { label: 'Company / Organization', keys: ['Company'] },
        { label: 'Inquiry Category', keys: ['Category'] },
        { label: 'Service Interested In', keys: ['Service'] },
        { label: 'Project Requirements', keys: ['Description', 'Message', 'Requirements'] },
        { label: 'Estimated Budget', keys: ['Budget'] },
        { label: 'Website / System URL', keys: ['Website / System URL', 'WebsiteUrl', 'Website'] },
        { label: 'Preferred Contact Method', keys: ['Preferred contact', 'Preferred Contact Method'] },
      ],
      opts.referenceId,
    ),
    REFERENCE_ID: escapeHtml(opts.referenceId),
  })
}

export function applicantConfirmationEmail(opts: {
  name: string
  email: string
  referenceId: string
  sourceLabel: string
  rows: Array<{ label: string; value: string }>
}): string {
  return renderEmailTemplate(applicationConfirmationTemplate, {
    NAME: escapeHtml(opts.name),
    DETAILS_LIST: submissionListHtml(
      opts.name,
      opts.rows,
      [
        { label: 'Email', keys: ['Email'] },
        { label: 'Phone', keys: ['Phone'] },
        { label: 'Country / Location', keys: ['Country / Location', 'Country'] },
        { label: 'Position Applied For', keys: ['Position', 'Role'] },
        { label: 'Availability', keys: ['Availability'] },
        { label: 'Education Level', keys: ['Education'] },
        { label: 'Skills & Specialization', keys: ['Skills'] },
        { label: 'Work Experience', keys: ['Experience'] },
        { label: 'Portfolio / Profile', keys: ['Portfolio', 'Resume / Portfolio', 'Website'] },
        { label: 'Preferred Contact Method', keys: ['Preferred contact', 'Preferred Contact Method'] },
        { label: 'Additional Information', keys: ['Additional notes', 'Additional', 'Notes'] },
      ],
      opts.referenceId,
    ),
    REFERENCE_ID: escapeHtml(opts.referenceId),
  })
}

export function staffNotificationEmail(opts: {
  formType: string
  referenceId: string
  email: string
  submittedAt: string
  rows: Array<{ label: string; value: string }>
}): string {
  const isApplicant = opts.formType === 'CAREERS'
  const rowsHtml = opts.rows
    .map(
      (r) =>
        `<tr><td style="padding:6px 0;font-size:12px;color:#4B5563;width:140px;vertical-align:top;"><strong>${escapeHtml(r.label)}</strong></td><td style="padding:6px 0;font-size:12px;color:#1F2937;">${escapeHtml(r.value)}</td></tr>`,
    )
    .join('')
  return `<!DOCTYPE html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#1F2937;">
  <h2 style="color:#0B0F19;">${isApplicant ? 'Application Received' : 'Inquiry Received'}</h2>
  <p>Reference: <strong>#${escapeHtml(opts.referenceId)}</strong></p>
  <p>Verified email: <strong>${escapeHtml(opts.email)}</strong><br/>Submitted: ${escapeHtml(opts.submittedAt)}</p>
  <table role="presentation" cellpadding="0" cellspacing="0">${rowsHtml}</table>
  <p style="font-size:12px;color:#6B7280;">OPERAVA · www.operavaglobal.com</p>
</body></html>`
}

export async function ensureTables(db: D1Database) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference_id TEXT NOT NULL,
      form_type TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      payload TEXT NOT NULL,
      verification_status TEXT NOT NULL,
      status TEXT NOT NULL,
      resume_key TEXT,
      created_at TEXT NOT NULL,
      verified_at TEXT
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS form_otps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      form_type TEXT NOT NULL,
      draft_id TEXT NOT NULL,
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
