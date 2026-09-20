/**
 * Recruitment AVA confirmation emails — mandatory OPERAVA shell only.
 * Applicant receives confirmation without the .txt attachment.
 * Talent Acquisition receives a separate message with the application .txt attached.
 */

import {
  escapeHtml,
  resolveFromEnv,
  renderEmailTemplate,
  sendResend,
  extractPlainEmail,
  normalizeFromAddress,
  type FormEnv,
} from './formCore'
import { recruitmentPoolConfirmationTemplate } from './emailTemplates'

export function recruitmentPoolConfirmationHtml(opts: {
  name: string
  applicationId: string
  positionTitle: string
  scorePercent: number
  correctCount: number
  total: number
}): string {
  const score =
    escapeHtml(String(opts.correctCount)) +
    ' / ' +
    escapeHtml(String(opts.total)) +
    ' (' +
    escapeHtml(String(opts.scorePercent)) +
    '%)'
  return renderEmailTemplate(recruitmentPoolConfirmationTemplate, {
    NAME: escapeHtml(opts.name),
    APPLICATION_ID: escapeHtml(opts.applicationId),
    POSITION: escapeHtml(opts.positionTitle),
    SCORE: score,
  })
}

export function recruitmentPoolConfirmationText(opts: {
  name: string
  applicationId: string
  positionTitle: string
  scorePercent: number
  correctCount: number
  total: number
}): string {
  return (
    'Hi ' +
    opts.name +
    ',\n\n' +
    'You have passed the OPERAVA Recruitment AVA assessment and are eligible for the Recruitment Pool (subject to review).\n\n' +
    'Application number: ' +
    opts.applicationId +
    '\n' +
    'Full name: ' +
    opts.name +
    '\n' +
    'Position: ' +
    opts.positionTitle +
    '\n' +
    'Score: ' +
    opts.correctCount +
    '/' +
    opts.total +
    ' (' +
    opts.scorePercent +
    '%)\n\n' +
    'Operava Team,\n' +
    'Note: This is an email generated email, please do not reply.\n\n' +
    'www.operavaglobal.com'
  )
}

function toBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  return btoa(bin)
}

/** Direct Resend call supporting attachments (talent-only file). */
async function sendResendWithAttachments(
  env: FormEnv,
  payload: {
    from: string
    to: string[]
    subject: string
    html?: string
    text?: string
    attachments?: Array<{ filename: string; content: string; content_type?: string }>
  },
): Promise<void> {
  const apiKey = env.RESEND_API_KEY && String(env.RESEND_API_KEY).trim()
  if (!apiKey) throw new Error('RESEND_NOT_CONFIGURED')

  const from = normalizeFromAddress(payload.from)
  const to = payload.to.map((v) => extractPlainEmail(String(v))).filter(Boolean)
  if (!to.length) throw new Error('EMAIL_INVALID_TO')

  const body: Record<string, unknown> = {
    from,
    to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  }
  if (payload.attachments && payload.attachments.length) {
    body.attachments = payload.attachments
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const raw = await res.text().catch(() => '')
  if (!res.ok) {
    console.error('Resend talent attach failed', res.status, raw.slice(0, 240))
    throw new Error('EMAIL_SEND_FAILED')
  }
}

/** Applicant confirmation (no attachment) + separate talents email with .txt attachment only. */
export async function sendRecruitmentPoolEmails(
  env: FormEnv & { TALENT_INBOX?: string },
  opts: {
    name: string
    email: string
    applicationId: string
    positionTitle: string
    scorePercent: number
    correctCount: number
    total: number
    /** Full application .txt body for Talent Acquisition only */
    applicationTxt?: string
    applicationTxtName?: string
  },
): Promise<void> {
  const talent = env.TALENT_INBOX || 'talents@operavaglobal.com'
  const from = resolveFromEnv(env)
  const subject =
    'OPERAVA Recruitment Pool — ' + opts.applicationId + ' — ' + opts.name
  const html = recruitmentPoolConfirmationHtml(opts)
  const text = recruitmentPoolConfirmationText(opts)

  // 1) Applicant — confirmation only (no file)
  await sendResend(env, {
    from,
    to: [opts.email],
    subject,
    html,
    text,
  })

  // 2) Talents — internal notice + application .txt attachment (not sent to applicant)
  const talentSubject =
    '[Talent] Recruitment Pool application — ' + opts.applicationId + ' — ' + opts.name
  const talentHtml =
    '<p style="margin:0 0 8px 0;font-size:11px;line-height:1.45;color:#111111;">' +
    'Recruitment AVA pool pass notification.</p>' +
    '<ul style="margin:8px 0 0 0;padding-left:18px;font-size:11px;line-height:1.45;color:#111111;">' +
    '<li><strong>Application number:</strong> ' +
    escapeHtml(opts.applicationId) +
    '</li>' +
    '<li><strong>Full name:</strong> ' +
    escapeHtml(opts.name) +
    '</li>' +
    '<li><strong>Email:</strong> ' +
    escapeHtml(opts.email) +
    '</li>' +
    '<li><strong>Position:</strong> ' +
    escapeHtml(opts.positionTitle) +
    '</li>' +
    '<li><strong>Score:</strong> ' +
    escapeHtml(String(opts.correctCount)) +
    ' / ' +
    escapeHtml(String(opts.total)) +
    ' (' +
    escapeHtml(String(opts.scorePercent)) +
    '%)</li>' +
    '</ul>' +
    (opts.applicationTxt
      ? '<p style="margin:12px 0 0 0;font-size:11px;line-height:1.45;color:#111111;">The full application record is attached as a .txt file (Talent Acquisition only).</p>'
      : '')

  const talentText =
    'Recruitment AVA pool pass\n' +
    'Application number: ' +
    opts.applicationId +
    '\nFull name: ' +
    opts.name +
    '\nEmail: ' +
    opts.email +
    '\nPosition: ' +
    opts.positionTitle +
    '\nScore: ' +
    opts.correctCount +
    '/' +
    opts.total +
    ' (' +
    opts.scorePercent +
    '%)\n' +
    (opts.applicationTxt ? '\nFull application .txt is attached (Talent Acquisition only).\n' : '')

  const attachments: Array<{ filename: string; content: string; content_type?: string }> = []
  if (opts.applicationTxt && String(opts.applicationTxt).trim()) {
    const fileName =
      (opts.applicationTxtName && String(opts.applicationTxtName).trim()) ||
      opts.applicationId + '_' + opts.name.replace(/[^a-zA-Z0-9._-]+/g, '_') + '.txt'
    attachments.push({
      filename: fileName.endsWith('.txt') ? fileName : fileName + '.txt',
      content: toBase64Utf8(opts.applicationTxt),
      content_type: 'text/plain; charset=utf-8',
    })
  }

  await sendResendWithAttachments(env, {
    from,
    to: [talent],
    subject: talentSubject,
    html: talentHtml,
    text: talentText,
    attachments: attachments.length ? attachments : undefined,
  })
}
