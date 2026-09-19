import {
  otpEmailTemplate,
  servicesConfirmationTemplate,
  applicationConfirmationTemplate,
  staffNotificationTemplate,
} from './emailTemplates'

export type FormType = 'SERVICES' | 'CAREERS' | 'CONTACT' | 'ACADEMY'

export interface FormEnv {
  SUBMISSIONS_DB?: D1Database
  RESUMES_BUCKET?: R2Bucket
  RESEND_API_KEY?: string
  /** Preferred From (e.g. Operava <noreply@operavaglobal.com>) */
  RESEND_EMAIL_FROM?: string
  RESEND_FROM?: string
  OTP_SECRET?: string
  CLIENT_INBOX?: string
  TALENT_INBOX?: string
  ACADEMY_INBOX?: string
}

export const DEFAULT_RESEND_FROM = 'Operava <noreply@operavaglobal.com>'
export const OTP_RESEND_FROM = 'Operava <noreply@operavaglobal.com>'
export const NOTIFICATION_NOREPLY_FROM = 'Operava <noreply@operavaglobal.com>'
export const CLIENT_RESEND_FROM = 'hello@operavaglobal.com'
export const TALENT_RESEND_FROM = 'talents@operavaglobal.com'
export const ACADEMY_RESEND_FROM = 'academy@operavaglobal.com'
export const APPLICANT_CONFIRMATION_FROM = 'Operava <noreply@operavaglobal.com>'
export const SUPPORT_INBOX = 'hello@operavaglobal.com'
export const ACADEMY_INBOX_DEFAULT = 'academy@operavaglobal.com'
const PLAIN_EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

/** Minimum accepted OTP_SECRET length (use openssl rand -hex 32 → 64 hex chars). */
export const OTP_SECRET_MIN_LENGTH = 32

/**
 * Resolve OTP/signing secret. Fail-closed: only OTP_SECRET is accepted.
 * Never falls back to RESEND_API_KEY or a hardcoded default.
 * Returns null when misconfigured — callers must return 503.
 */
export function resolveSecret(env: FormEnv): string | null {
  const otp = env.OTP_SECRET && String(env.OTP_SECRET).trim()
  if (otp && otp.length >= OTP_SECRET_MIN_LENGTH) return otp
  return null
}

/** Constant-time equality for equal-length strings (hex / b64url). */
export function timingSafeEqualStr(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const enc = new TextEncoder()
  const ba = enc.encode(a)
  const bb = enc.encode(b)
  if (ba.length !== bb.length) return false
  let diff = 0
  for (let i = 0; i < ba.length; i++) diff |= ba[i] ^ bb[i]
  return diff === 0
}

export function isProductionRuntime(): boolean {
  try {
    if (typeof process === 'undefined' || !process?.env) return true
    const nodeEnv = String(process.env.NODE_ENV || '').toLowerCase()
    if (nodeEnv === 'development' || nodeEnv === 'test') return false
    return true
  } catch {
    return true
  }
}

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
  return 's1.' + payload + '.' + sig
}

export async function readSignedDraft(secret: string, draftId: string) {
  if (!draftId || !draftId.startsWith('s1.')) return null
  const parts = draftId.split('.')
  if (parts.length !== 3) return null
  const payload = parts[1]
  const sig = parts[2]
  const expected = await hmacSign(secret, payload)
  if (!timingSafeEqualStr(sig, expected)) return null
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

export const EMAIL_RE = PLAIN_EMAIL_RE

export function extractPlainEmail(value: string): string {
  const raw = String(value || '').trim()
  const angle = raw.match(/<([^>]+)>/)
  if (angle && angle[1]) return angle[1].trim().toLowerCase()
  return raw.toLowerCase()
}

function mapVerifiedMailbox(email: string): string {
  const e = email.toLowerCase()
  if (
    e === 'notification@operavaglobal.com' ||
    e === 'notification-noreply@operavaglobal.com' ||
    e === 'no-reply@operavaglobal.com' ||
    e === 'noreply@operavaglobal.com'
  ) {
    return 'noreply@operavaglobal.com'
  }
  return e
}

export function normalizeFromAddress(value: string | undefined | null): string {
  let raw = String(value || '').trim()
  if (!raw) return DEFAULT_RESEND_FROM

  raw = raw.replace(/^([^<\s]+)<([^>]+)>$/, '$1 <$2>')

  const angle = raw.match(/^(.*)<([^>]+)>$/)
  if (angle) {
    let name = angle[1].trim().replace(/["<>]/g, '') || 'Operava'
    if (name.toUpperCase() === 'OPERAVA') name = 'Operava'
    const email = mapVerifiedMailbox(angle[2].trim())
    if (PLAIN_EMAIL_RE.test(email)) return name + ' <' + email + '>'
  }
  if (PLAIN_EMAIL_RE.test(raw.toLowerCase())) {
    return 'Operava <' + mapVerifiedMailbox(raw) + '>'
  }
  return DEFAULT_RESEND_FROM
}

export function resolveFromEnv(env: FormEnv): string {
  const preferred =
    (env.RESEND_EMAIL_FROM && String(env.RESEND_EMAIL_FROM).trim()) ||
    (env.RESEND_FROM && String(env.RESEND_FROM).trim()) ||
    ''
  return normalizeFromAddress(preferred || DEFAULT_RESEND_FROM)
}

export function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

export function otpSecretMissingResponse() {
  return json(
    {
      error:
        'Email verification is not configured (OTP_SECRET missing). Set a 32+ character OTP_SECRET in Cloudflare Pages secrets, then redeploy.',
      code: 'OTP_SECRET_MISSING',
    },
    503,
  )
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
  return user.slice(0, 1) + '***@' + domain
}

export function makeReference(type: FormType) {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 90000000
  const prefix = type === 'ACADEMY' ? 'ACA' : type.slice(0, 3)
  return 'OPERAVA-' + prefix + '-' + String(10000000 + n).slice(0, 8)
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

/** HMAC-SHA256(secret, code) as lowercase hex — standard keyed MAC for OTPs. */
export async function hashOtp(secret: string, code: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(String(code)))
  const bytes = new Uint8Array(sig)
  let hex = ''
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0')
  }
  return hex
}

/** Compare OTP hash using constant-time equality. */
export function otpHashMatches(expectedHex: string, actualHex: string): boolean {
  return timingSafeEqualStr(String(expectedHex || ''), String(actualHex || ''))
}

export function renderEmailTemplate(template: string, replacements: Record<string, string>): string {
  let html = template
  for (const key of Object.keys(replacements)) {
    html = html.split('{{' + key + '}}').join(replacements[key])
  }
  return html
}

export function otpEmailHtml(name: string, purpose: string, code: string) {
  const display = name && name.trim() ? name.trim() : 'there'
  return renderEmailTemplate(otpEmailTemplate, {
    NAME: escapeHtml(display),
    PURPOSE: escapeHtml(purpose),
    OTP_CODE: escapeHtml(code),
  })
}

export function otpEmailText(name: string, purpose: string, code: string) {
  const display = name && name.trim() ? name.trim() : 'there'
  return (
    'Hi ' +
    display +
    ',\n\n' +
    'Your verification code for ' +
    purpose +
    ' is: ' +
    code +
    '\n\nThis code expires in 10 minutes.\n\nDo not share this code. If you did not request it, ignore this email.\n\nOperava Team,\nNote: This is an email generated email, please do not reply.\n\nOPERAVA · www.operavaglobal.com'
  )
}

export type SendResendResult = { id: string; status: number }

export class EmailSendError extends Error {
  code: string
  providerStatus?: number
  providerMessage?: string
  fromUsed?: string
  constructor(
    code: string,
    message: string,
    extra?: { providerStatus?: number; providerMessage?: string; fromUsed?: string },
  ) {
    super(message)
    this.name = 'EmailSendError'
    this.code = code
    this.providerStatus = extra?.providerStatus
    this.providerMessage = extra?.providerMessage
    this.fromUsed = extra?.fromUsed
  }
}

function sanitizeProviderMessage(raw: string): string {
  return String(raw || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240)
}

export async function sendResend(env: FormEnv, payload: Record<string, unknown>): Promise<SendResendResult> {
  const apiKey = env.RESEND_API_KEY && String(env.RESEND_API_KEY).trim()
  if (!apiKey) throw new EmailSendError('RESEND_NOT_CONFIGURED', 'RESEND_API_KEY is not configured')
  if (apiKey.length < 20) {
    console.error('Resend API key looks truncated')
    throw new EmailSendError('EMAIL_API_KEY_INVALID', 'EMAIL_API_KEY_INVALID')
  }

  const from = normalizeFromAddress(
    (typeof payload.from === 'string' && payload.from) || resolveFromEnv(env),
  )

  let to: string[] = []
  if (Array.isArray(payload.to)) {
    to = payload.to.map((v) => extractPlainEmail(String(v))).filter((e) => PLAIN_EMAIL_RE.test(e))
  } else if (typeof payload.to === 'string') {
    const e = extractPlainEmail(payload.to)
    if (PLAIN_EMAIL_RE.test(e)) to = [e]
  }
  if (to.length === 0) throw new EmailSendError('EMAIL_INVALID_TO', 'EMAIL_INVALID_TO', { fromUsed: from })

  let replyTo: string | undefined
  if (typeof payload.reply_to === 'string' && payload.reply_to.trim()) {
    const e = extractPlainEmail(payload.reply_to)
    if (PLAIN_EMAIL_RE.test(e)) replyTo = e
  }

  let bcc: string[] | undefined
  if (Array.isArray(payload.bcc)) {
    bcc = payload.bcc.map((v) => extractPlainEmail(String(v))).filter((e) => PLAIN_EMAIL_RE.test(e))
    if (bcc.length === 0) bcc = undefined
  } else if (typeof payload.bcc === 'string' && payload.bcc.trim()) {
    const e = extractPlainEmail(payload.bcc)
    if (PLAIN_EMAIL_RE.test(e)) bcc = [e]
  }

  const body: Record<string, unknown> = {
    from,
    to,
    subject: String(payload.subject || 'OPERAVA'),
    html: typeof payload.html === 'string' ? payload.html : undefined,
    text: typeof payload.text === 'string' ? payload.text : undefined,
  }
  if (replyTo) body.reply_to = replyTo
  if (bcc) body.bcc = bcc

  let res: Response
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (netErr) {
    console.error('Resend network error', netErr instanceof Error ? netErr.message : 'unknown')
    throw new EmailSendError('EMAIL_SEND_FAILED', 'EMAIL_SEND_FAILED', { fromUsed: from })
  }

  const raw = await res.text().catch(() => '')
  if (!res.ok) {
    const providerMessage = sanitizeProviderMessage(raw)
    console.error('Resend API error', res.status, providerMessage, 'from=', from)

    if (res.status === 401 || res.status === 403) {
      throw new EmailSendError('EMAIL_API_KEY_INVALID', 'EMAIL_API_KEY_INVALID', {
        providerStatus: res.status,
        providerMessage,
        fromUsed: from,
      })
    }

    if (
      /domain is not verified/i.test(raw) ||
      /not verified/i.test(raw) ||
      /verify.*(domain|email)/i.test(raw) ||
      /sender.*not.*allowed/i.test(raw)
    ) {
      throw new EmailSendError('EMAIL_DOMAIN_NOT_VERIFIED', 'EMAIL_DOMAIN_NOT_VERIFIED', {
        providerStatus: res.status,
        providerMessage,
        fromUsed: from,
      })
    }

    if (/pattern/i.test(raw) || /invalid.*(from|to|email)/i.test(raw)) {
      throw new EmailSendError('EMAIL_ADDRESS_PATTERN', 'EMAIL_ADDRESS_PATTERN', {
        providerStatus: res.status,
        providerMessage,
        fromUsed: from,
      })
    }

    if (/invalid.*api.?key|unauthorized/i.test(raw)) {
      throw new EmailSendError('EMAIL_API_KEY_INVALID', 'EMAIL_API_KEY_INVALID', {
        providerStatus: res.status,
        providerMessage,
        fromUsed: from,
      })
    }

    throw new EmailSendError('EMAIL_SEND_FAILED', 'EMAIL_SEND_FAILED', {
      providerStatus: res.status,
      providerMessage,
      fromUsed: from,
    })
  }

  let id = ''
  try {
    const parsed = JSON.parse(raw) as { id?: string }
    id = typeof parsed.id === 'string' ? parsed.id : ''
  } catch {
    id = ''
  }
  if (id) console.info('Resend accepted', id)
  return { id, status: res.status }
}

export function inboxFor(type: FormType, env: FormEnv) {
  if (type === 'CAREERS') return [env.TALENT_INBOX || 'talents@operavaglobal.com']
  if (type === 'ACADEMY') return [env.ACADEMY_INBOX || ACADEMY_INBOX_DEFAULT]
  return [env.CLIENT_INBOX || 'hello@operavaglobal.com']
}

export function senderFor(_type: FormType, env: FormEnv) {
  return resolveFromEnv(env)
}

export function purposeLabel(type: FormType) {
  if (type === 'SERVICES') return 'SERVICE INQUIRY'
  if (type === 'CAREERS') return 'JOB APPLICATION'
  if (type === 'ACADEMY') return 'ACADEMY ENROLLMENT / INQUIRY'
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
  return (
    '<ul style="margin:8px 0 0 0;padding-left:18px;font-size:11px;line-height:1.45;color:#111111;">' +
    values
      .map(function (pair) {
        return (
          '<li style="margin-bottom:6px;"><strong style="color:#111111;">' +
          escapeHtml(pair[0]) +
          ':</strong> ' +
          escapeHtml(pair[1]) +
          '</li>'
        )
      })
      .join('') +
    '</ul>'
  )
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
        { label: 'Inquiry Category', keys: ['Inquiry Type', 'Category'] },
        { label: 'Service / Program', keys: ['Service', 'Program', 'Track'] },
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
  const isAcademy = opts.formType === 'ACADEMY'
  const rowsHtml =
    '<ul style="margin:8px 0 0 0;padding-left:18px;font-size:11px;line-height:1.45;color:#111111;">' +
    opts.rows
      .map(function (r) {
        return (
          '<li style="margin-bottom:6px;"><strong>' +
          escapeHtml(r.label) +
          ':</strong> ' +
          escapeHtml(r.value) +
          '</li>'
        )
      })
      .join('') +
    '</ul>'

  return renderEmailTemplate(staffNotificationTemplate, {
    TITLE: escapeHtml(
      isApplicant ? 'Application Received' : isAcademy ? 'Academy Enrollment / Inquiry' : 'Inquiry Received',
    ),
    REFERENCE_ID: escapeHtml(opts.referenceId),
    EMAIL: escapeHtml(opts.email),
    SUBMITTED_AT: escapeHtml(opts.submittedAt),
    ROWS_HTML: rowsHtml,
    PARTY_LABEL: escapeHtml(isApplicant ? 'applicant' : isAcademy ? 'learner' : 'customer'),
  })
}

export async function ensureTables(db: D1Database) {
  await db.batch([
    db.prepare(
      'CREATE TABLE IF NOT EXISTS form_submissions (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'reference_id TEXT NOT NULL,' +
        'form_type TEXT NOT NULL,' +
        'name TEXT NOT NULL,' +
        'email TEXT NOT NULL,' +
        'payload TEXT NOT NULL,' +
        'verification_status TEXT NOT NULL,' +
        'status TEXT NOT NULL,' +
        'resume_key TEXT,' +
        'created_at TEXT NOT NULL,' +
        'verified_at TEXT' +
        ')',
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS form_otps (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'email TEXT NOT NULL,' +
        'form_type TEXT NOT NULL,' +
        'draft_id TEXT NOT NULL,' +
        'code_hash TEXT NOT NULL,' +
        'payload TEXT NOT NULL,' +
        'expires_at INTEGER NOT NULL,' +
        'attempts INTEGER NOT NULL DEFAULT 0,' +
        'resends INTEGER NOT NULL DEFAULT 0,' +
        'last_sent_at INTEGER NOT NULL,' +
        'consumed INTEGER NOT NULL DEFAULT 0' +
        ')',
    ),
  ])
}
