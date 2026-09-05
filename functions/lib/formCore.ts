import {
  otpEmailTemplate,
  servicesConfirmationTemplate,
  applicationConfirmationTemplate,
} from './emailTemplates.ts'

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

export const DEFAULT_RESEND_FROM = 'Operava Notification <notification-noreply@operavaglobal.com>'
export const OTP_RESEND_FROM = 'Operava Notification <notification-noreply@operavaglobal.com>'
export const NOTIFICATION_NOREPLY_FROM = 'Operava Notification <notification-noreply@operavaglobal.com>'
export const CLIENT_RESEND_FROM = 'hello@operavaglobal.com'
export const TALENT_RESEND_FROM = 'talents@operavaglobal.com'
export const APPLICANT_CONFIRMATION_FROM = 'Operava Notification <notification-noreply@operavaglobal.com>'
export const SUPPORT_INBOX = 'hello@operavaglobal.com'
export const DEFAULT_OTP_SECRET = 'operava-form-secret'

export function resolveSecret(env: FormEnv): string {
  return env.OTP_SECRET || env.RESEND_API_KEY || DEFAULT_OTP_SECRET
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

/** Brand tokens aligned with www.operavaglobal.com */
const BRAND = {
  violet: '#6D28D9',
  violetDeep: '#5B21B6',
  violetSoft: '#F5F3FF',
  ink: '#0B0F19',
  body: '#1F2937',
  muted: '#4B5563',
  line: '#E5E7EB',
  canvas: '#F8F7FC',
  white: '#FFFFFF',
  success: '#10B981',
}

/**
 * Shared professional email shell — same visual language as the public website.
 */
export function brandedEmailShell(options: {
  eyebrow: string
  title: string
  introHtml: string
  bodyHtml: string
}): string {
  const { eyebrow, title, introHtml, bodyHtml } = options
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.canvas};font-family:Inter,Segoe UI,Arial,Helvetica,sans-serif;color:${BRAND.body};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND.canvas};padding:28px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:${BRAND.white};border-radius:20px;overflow:hidden;border:1px solid ${BRAND.line};box-shadow:0 12px 40px rgba(13,10,25,0.06);">
        <!-- Header bar -->
        <tr>
          <td style="background:linear-gradient(135deg,${BRAND.ink} 0%,#1a1030 55%,${BRAND.violetDeep} 100%);padding:22px 28px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align:middle;text-align:left;">
                  <div style="font-size:18px;letter-spacing:0.14em;font-weight:700;color:#FFFFFF;text-transform:uppercase;">OPERAVA</div>
                  <div style="font-size:11px;color:#E9D5FF;margin-top:3px;">www.operavaglobal.com</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Accent line -->
        <tr><td style="height:4px;background:linear-gradient(90deg,${BRAND.violet},${BRAND.violetDeep},#A855F7);font-size:0;line-height:0;">&nbsp;</td></tr>
        <!-- Body -->
        <tr>
          <td style="padding:28px 28px 8px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.violet};">${escapeHtml(eyebrow)}</p>
            <h1 style="margin:0 0 14px;font-size:22px;line-height:1.3;font-weight:700;color:${BRAND.ink};">${escapeHtml(title)}</h1>
            <div style="font-size:14px;line-height:1.65;color:${BRAND.muted};">${introHtml}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 28px 28px;">${bodyHtml}</td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:18px 28px 24px;background:${BRAND.violetSoft};border-top:1px solid #EDE9FE;">
            <p style="margin:0 0 10px;font-size:12px;line-height:1.5;color:${BRAND.muted};">You received this email because you submitted an inquiry or application on our website. If you did not submit an inquiry or application, please reply to this email.</p>
            <p style="margin:0;font-size:12px;">
              <span style="color:${BRAND.muted};font-weight:600;">OPERAVA Global Solutions</span>
              <span style="color:#C4B5FD;"> · </span>
              <a href="https://www.operavaglobal.com/terms" style="color:${BRAND.violet};text-decoration:none;">Terms</a>
              <span style="color:#C4B5FD;"> · </span>
              <a href="https://www.operavaglobal.com" style="color:${BRAND.violet};text-decoration:none;">www.operavaglobal.com</a>
              <span style="color:#C4B5FD;"> · </span>
              <a href="https://www.operavaglobal.com/privacy" style="color:${BRAND.violet};text-decoration:none;">Privacy</a>
            </p>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:#9CA3AF;text-align:center;">© OPERAVA Global Solutions. All rights reserved.</p>
    </td></tr>
  </table>
</body>
</html>`
}

/**
 * Renders an editable HTML email template (see `Email Notification - OTP Format/`)
 * by replacing `{{TOKEN}}` placeholders with the given values. Editing the
 * template files is applied automatically the next time an email is sent.
 */
export function renderEmailTemplate(template: string, replacements: Record<string, string>): string {
  return Object.entries(replacements).reduce(
    (html, [key, value]) => html.split(`{{${key}}}`).join(value),
    template,
  )
}

export function plainConfirmationEmail(options: {
 title: string
 introHtml: string
 bodyHtml: string
}): string {
 return `<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <title>${escapeHtml(options.title)}</title>
 </head>
 <body style="margin:0;padding:0;background:${BRAND.canvas};font-family:Arial,Helvetica,sans-serif;color:${BRAND.body};">
   <div style="max-width:600px;margin:0 auto;padding:32px 20px;background:${BRAND.white};border:1px solid ${BRAND.line};border-radius:16px;">
     <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:${BRAND.ink};">${escapeHtml(options.title)}</h1>
     <div style="font-size:14px;line-height:1.7;color:${BRAND.body};">${options.introHtml}</div>
     <div style="font-size:14px;line-height:1.7;color:${BRAND.body};">${options.bodyHtml}</div>
     <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:${BRAND.body};">
       Best regards,<br />
       <strong>OPERAVA Global Solutions</strong>
     </p>
     <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:16px;">
       <tbody>
         <tr>
           <td>
             <img src="https://res.cloudinary.com/sdaxzncs/image/upload/v1787451792/operava-signature.jpg" alt="OPERAVA Global Solutions" style="max-width:100%;height:auto;border:0;" />
           </td>
         </tr>
       </tbody>
     </table>
     <p style="margin:12px 0 0;font-size:12px;line-height:1.6;color:${BRAND.muted};">
       SEC and BIR Registered, website: <a href="https://www.operavaglobal.com" style="color:${BRAND.violet};">www.operavaglobal.com</a><br />
     </p>
   </div>
 </body>
</html>`
}

export function detailsTableHtml(rows: Array<{ label: string; value: string }>): string {
  const cells = rows
    .filter((r) => r.value)
    .map(
      (r) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};width:150px;vertical-align:top;font-size:12px;font-weight:600;color:${BRAND.muted};text-transform:capitalize;">${escapeHtml(r.label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-size:13px;color:${BRAND.body};line-height:1.5;">${escapeHtml(r.value).replace(/\n/g, '<br/>')}</td>
        </tr>`,
    )
    .join('')
  if (!cells) return ''
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:8px;border:1px solid ${BRAND.line};border-radius:12px;overflow:hidden;">
    <tr><td style="padding:4px 16px;background:${BRAND.white};"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${cells}</table></td></tr>
  </table>`
}

export function referenceBadgeHtml(referenceId: string): string {
  return `<div style="display:inline-block;margin:12px 0 4px;padding:10px 14px;border-radius:12px;background:${BRAND.violetSoft};border:1px solid #DDD6FE;">
    <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.violet};">Reference</span>
    <span style="display:block;margin-top:2px;font-size:16px;font-weight:700;color:${BRAND.ink};letter-spacing:0.02em;">#${escapeHtml(referenceId)}</span>
  </div>`
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

/** Client / services / contact confirmation */
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

/** Applicant / careers confirmation */
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
  return brandedEmailShell({
    eyebrow: 'Notification',
    title: isApplicant ? 'Application Received' : 'Inquiry Received',
    introHtml: isApplicant
      ? `<p style="margin:0 0 12px;">A new application has been received.</p>`
      : `<p style="margin:0 0 12px;">A new inquiry has been received.</p>`,
    bodyHtml: `${referenceBadgeHtml(opts.referenceId)}
      <p style="margin:12px 0;font-size:13px;color:${BRAND.muted};">Verified email: <strong style="color:${BRAND.ink};">${escapeHtml(opts.email)}</strong><br/>Submitted: ${escapeHtml(opts.submittedAt)}</p>
      ${detailsTableHtml(opts.rows)}`,
  })
}

export function otpEmailHtml(_name: string, purpose: string, code: string) {
  return renderEmailTemplate(otpEmailTemplate, {
    PURPOSE: escapeHtml(purpose),
    OTP_CODE: escapeHtml(code),
  })
}

export function otpEmailText(_name: string, purpose: string, code: string) {
  return `Your verification code for ${purpose} is: ${code}

This code expires in 10 minutes.

Do not share this code. If you did not request it, ignore this email.
OPERAVA · www.operavaglobal.com`
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
      from: env.RESEND_FROM || DEFAULT_RESEND_FROM,
      ...payload,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend failed ${res.status}: ${text.slice(0, 300)}`)
  }
}

export function inboxFor(type: FormType, env: FormEnv) {
  if (type === 'CAREERS') return [env.TALENT_INBOX || 'talents@operavaglobal.com']
  return [env.CLIENT_INBOX || 'hello@operavaglobal.com']
}

export function senderFor(type: FormType, env: FormEnv) {
  return env.RESEND_FROM || DEFAULT_RESEND_FROM
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
