/**
 * Recruitment AVA confirmation emails (OPERAVA mandatory shell).
 */

import {
  escapeHtml,
  normalizeFromAddress,
  sendResend,
  type FormEnv,
} from './formCore'

const HEADER_IMG =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/Email_Header.png'
const FOOTER_IMG =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/Emailfooterimage.jpg'
const LEGAL_TEXT =
  'This email and any attachments may contain confidential, proprietary, or privileged information intended solely for the recipient. If you are not the intended recipient, please do not copy, distribute, disclose, or use this communication. If you received this email in error, please notify the sender and delete it. OPERAVA processes personal information in accordance with applicable privacy and data-protection requirements.'
const COPYRIGHT_TEXT = '\u00A9 2026 OPERAVA. All rights reserved.'

function shell(bodyInnerHtml: string): string {
  return (
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; border-spacing: 0; width: 100%; background-color: rgb(255, 255, 255)">' +
    '<tbody><tr><td align="center" valign="top" style="padding: 0; margin: 0; background-color: rgb(255, 255, 255)">' +
    '<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; border-spacing: 0px; max-width: 900px; margin: 0px auto; background-color: rgb(255, 255, 255);">' +
    '<tbody>' +
    '<tr><td style="padding: 0; margin: 0; background-color: rgb(255, 255, 255); font-size: 0; line-height: 0">' +
    '<img src="' +
    HEADER_IMG +
    '" alt="OPERAVA GLOBAL SOLUTIONS" width="900" style="display: block; width: 100%; max-width: 900px; height: auto; margin: 0; padding: 0; border: 0">' +
    '</td></tr>' +
    '<tr><td style="width: 100%; padding: 0px; margin: 0px; background-color: rgb(255, 255, 255); font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 25px; color: rgb(51, 51, 51);">' +
    bodyInnerHtml +
    '</td></tr>' +
    '<tr><td style="padding: 0; margin: 0; background-color: rgb(255, 255, 255); font-size: 0; line-height: 0">' +
    '<img src="' +
    FOOTER_IMG +
    '" alt="OPERAVA GLOBAL SOLUTIONS" width="900" style="display: block; width: 100%; max-width: 900px; height: auto; margin: 0; padding: 0; border: 0">' +
    '</td></tr>' +
    '<tr><td style="width: 100%; padding: 0px; margin: 0px; background-color: rgb(255, 255, 255); color: rgb(153, 153, 153); font-family: Arial, Helvetica, sans-serif; font-size: 6px; line-height: 10px; font-weight: 400; text-align: left;">' +
    LEGAL_TEXT +
    '<br></td></tr>' +
    '<tr><td style="width: 100%; padding: 0; margin: 0; background-color: rgb(255, 255, 255); color: rgb(153, 153, 153); font-family: Arial, Helvetica, sans-serif; font-size: 6px; line-height: 10px; font-weight: 400; text-align: left">' +
    COPYRIGHT_TEXT +
    '<br></td></tr>' +
    '</tbody></table></td></tr></tbody></table>'
  )
}

export function recruitmentPoolConfirmationHtml(opts: {
  name: string
  applicationId: string
  positionTitle: string
  scorePercent: number
  correctCount: number
  total: number
}): string {
  const body =
    'Hi,&nbsp; ' +
    escapeHtml(opts.name) +
    ',<br><br>' +
    'Thank you for completing the OPERAVA Recruitment AVA assessment.<br><br>' +
    'We confirm that you have <strong>passed</strong> and are eligible for the <strong>Recruitment Pool</strong>, subject to Talent Acquisition review.<br><br>' +
    '<strong>Application number:</strong> ' +
    escapeHtml(opts.applicationId) +
    '<br>' +
    '<strong>Full name:</strong> ' +
    escapeHtml(opts.name) +
    '<br>' +
    '<strong>Position:</strong> ' +
    escapeHtml(opts.positionTitle) +
    '<br>' +
    '<strong>Assessment score:</strong> ' +
    escapeHtml(String(opts.correctCount)) +
    ' / ' +
    escapeHtml(String(opts.total)) +
    ' (' +
    escapeHtml(String(opts.scorePercent)) +
    '%)<br><br>' +
    'A member of our Talent Acquisition Team may contact you through your verified email if a suitable opportunity arises.<br><br>' +
    'Passing the assessment and pool eligibility do not guarantee employment or an interview.<br><br>' +
    'Regards,&nbsp;<br>Talent Acquisition Team<br>OPERAVA Global Solutions<br><br>' +
    'This is an automatically generated system confirmation. Please do not reply to this message.'
  return shell(body)
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
    'Talent Acquisition may contact you if a suitable opportunity arises.\n\n' +
    'Regards,\nTalent Acquisition Team\nOPERAVA Global Solutions\nwww.operavaglobal.com'
  )
}

/** Applicant confirmation + BCC talents@ after pass / pool confirmation. */
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
  },
): Promise<void> {
  const talent = env.TALENT_INBOX || 'talents@operavaglobal.com'
  const from = normalizeFromAddress(env.RESEND_FROM || 'Operava <noreply@operavaglobal.com>')
  const subject =
    'OPERAVA Recruitment Pool — ' + opts.applicationId + ' — ' + opts.name
  const html = recruitmentPoolConfirmationHtml(opts)
  const text = recruitmentPoolConfirmationText(opts)

  await sendResend(env, {
    from,
    to: [opts.email],
    bcc: [talent],
    subject,
    html,
    text,
  })
}
