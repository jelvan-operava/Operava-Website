/**
 * OPERAVA mandatory email format — exact UI match (margins, colors, fonts, sizes).
 * Structure:
 *   Email_Header.png
 *   body (Arial 15px / 25px / #333333)
 *   Emailfooterimage.jpg
 *   legal 6px #999999
 *   copyright 6px #999999
 *
 * Used for: OTP, auto confirmation, auto welcome, staff notifications, AVA-triggered forms.
 */

const HEADER_IMG =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/Email_Header.png'
const FOOTER_IMG =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/Emailfooterimage.jpg'

const LEGAL_TEXT =
  'This email and any attachments may contain confidential, proprietary, or privileged information intended solely for the recipient. If you are not the intended recipient, please do not copy, distribute, disclose, or use this communication. If you received this email in error, please notify the sender and delete it. OPERAVA processes personal information in accordance with applicable privacy and data-protection requirements. This communication may contain service-related, transactional, operational, or client information.'

const COPYRIGHT_TEXT = '\u00A9 2026 OPERAVA. All rights reserved.'

const AUTO_NOTICE =
  'This is an automatically generated system confirmation. Please do not reply to this message.'

/** Shared shell — exact table layout from mandatory template. */
function emailShell(title: string, bodyInnerHtml: string): string {
  return (
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; border-spacing: 0; width: 100%; background-color: rgb(255, 255, 255)">' +
    '<tbody>' +
    '<tr>' +
    '<td align="center" valign="top" style="padding: 0; margin: 0; background-color: rgb(255, 255, 255)">' +
    '<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; border-spacing: 0px; max-width: 900px; margin: 0px auto; background-color: rgb(255, 255, 255);">' +
    '<tbody>' +
    /* Header image */
    '<tr>' +
    '<td style="padding: 0; margin: 0; background-color: rgb(255, 255, 255); font-size: 0; line-height: 0">' +
    '<img src="' +
    HEADER_IMG +
    '" alt="OPERAVA GLOBAL SOLUTIONS" width="900" style="display: block; width: 100%; max-width: 900px; height: auto; margin: 0; padding: 0; border: 0; outline: none; text-decoration: none">' +
    '</td>' +
    '</tr>' +
    /* Body */
    '<tr>' +
    '<td style="width: 100%; padding: 0px; margin: 0px; background-color: rgb(255, 255, 255); font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 25px; color: rgb(51, 51, 51);">' +
    bodyInnerHtml +
    '</td>' +
    '</tr>' +
    /* Footer image */
    '<tr>' +
    '<td style="padding: 0; margin: 0; background-color: rgb(255, 255, 255); font-size: 0; line-height: 0">' +
    '<img src="' +
    FOOTER_IMG +
    '" alt="OPERAVA GLOBAL SOLUTIONS" width="900" style="display: block; width: 100%; max-width: 900px; height: auto; margin: 0; padding: 0; border: 0; outline: none; text-decoration: none">' +
    '</td>' +
    '</tr>' +
    /* Legal */
    '<tr>' +
    '<td style="width: 100%; padding: 0px; margin: 0px; background-color: rgb(255, 255, 255); color: rgb(153, 153, 153); font-family: Arial, Helvetica, sans-serif; font-size: 6px; line-height: 10px; font-weight: 400; text-align: left;">' +
    LEGAL_TEXT +
    '<br>' +
    '</td>' +
    '</tr>' +
    /* Copyright */
    '<tr>' +
    '<td style="width: 100%; padding: 0; margin: 0; background-color: rgb(255, 255, 255); color: rgb(153, 153, 153); font-family: Arial, Helvetica, sans-serif; font-size: 6px; line-height: 10px; font-weight: 400; text-align: left">' +
    COPYRIGHT_TEXT +
    '<br>' +
    '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>'
  )
}

/** Standard body block: Hi / content / Regards / Operava Global Team / auto notice */
function bodyBlock(greeting: string, contentHtml: string, signOff: string): string {
  return (
    'Hi,&nbsp;' +
    (greeting ? ' ' + greeting : '') +
    '<br>' +
    '<br>' +
    contentHtml +
    '<br>' +
    '<br>' +
    'Regards,&nbsp;' +
    '<br>' +
    signOff +
    '<br>' +
    '<br>' +
    AUTO_NOTICE
  )
}

/** OTP — placeholders: PURPOSE, OTP_CODE */
export const otpEmailTemplate = emailShell(
  'Verification Code',
  bodyBlock(
    '',
    'Thank you for choosing OPERAVA. Please use the one-time verification code below to continue your <strong>{{PURPOSE}}</strong>.<br><br>' +
      'Your verification code is: <strong style="letter-spacing: 0.12em;">{{OTP_CODE}}</strong><br><br>' +
      'This code expires in <strong>10 minutes</strong>. For your security, do not share it with anyone.<br><br>' +
      'If you did not request this code, you can safely ignore this email.',
    'Operava Global Team',
  ),
)

/** Services / contact confirmation — NAME, DETAILS_LIST, REFERENCE_ID */
export const servicesConfirmationTemplate = emailShell(
  'We received your inquiry',
  bodyBlock(
    '{{NAME}},',
    'Thank you for choosing OPERAVA. We are pleased to begin working with you and look forward to supporting your business requirements.<br><br>' +
      'We received your inquiry. Your submission has been recorded. Reference number: <strong>{{REFERENCE_ID}}</strong>.<br><br>' +
      '<strong>Submitted details</strong><br>' +
      '{{DETAILS_LIST}}<br><br>' +
      'Please use your verified email address when communicating with OPERAVA regarding your account, service, request, documentation, or engagement.<br><br>' +
      'If you have questions or require assistance, please contact the appropriate OPERAVA support channel provided in your communication.',
    'Operava Global Team',
  ),
)

/** Careers confirmation — NAME, DETAILS_LIST, REFERENCE_ID */
export const applicationConfirmationTemplate = emailShell(
  'We received your application',
  bodyBlock(
    '{{NAME}},',
    'Thank you for contacting OPERAVA and for your interest in our opportunities.<br><br>' +
      'We confirm that we have received your application. Your submitted information has been recorded. Reference number: <strong>{{REFERENCE_ID}}</strong>.<br><br>' +
      '<strong>Submitted details</strong><br>' +
      '{{DETAILS_LIST}}<br><br>' +
      'Your application will be reviewed by the appropriate team. If your qualifications match an available position or another suitable opportunity, a member of our Talent Acquisition Team may contact you through your preferred contact method.<br><br>' +
      'Please note that submitting an application does not guarantee employment or an interview. Your information may be considered for current and future opportunities within OPERAVA.',
    'Operava Global Team',
  ),
)

/** Staff notification — TITLE, REFERENCE_ID, EMAIL, SUBMITTED_AT, ROWS_HTML, PARTY_LABEL */
export const staffNotificationTemplate = emailShell(
  'OPERAVA submission',
  bodyBlock(
    'Team,',
    '<strong>{{TITLE}}</strong><br><br>' +
      'Reference: <strong>{{REFERENCE_ID}}</strong><br>' +
      '{{PARTY_LABEL}} email: <strong>{{EMAIL}}</strong><br>' +
      'Submitted: {{SUBMITTED_AT}}<br><br>' +
      'Reply to this email to contact the {{PARTY_LABEL}}.<br><br>' +
      '<strong>Submission details</strong><br>' +
      '{{ROWS_HTML}}',
    'Operava Global Team',
  ),
)
