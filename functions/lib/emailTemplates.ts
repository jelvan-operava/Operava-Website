/**
 * OPERAVA mandatory email format — do not alter layout.
 * Structure (exact):
 *   Email_Header.png
 *   Hi {full_name},
 *   {body}
 *   Operava Team,
 *   Note: This is an email generated email, please do not reply.
 *   Emailfooterimage.jpg
 *   legal
 *   © 2026 OPERAVA GLOBAL SOLUTIONS. All rights reserved.
 *
 * Only full_name and body content change per message.
 */

const HEADER_IMG =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/Email_Header.png'
const FOOTER_IMG =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/Emailfooterimage.jpg'

const LEGAL_TEXT =
  'This email and any attachments may contain confidential, proprietary, or privileged information intended solely for the recipient. If you are not the intended recipient, please do not copy, distribute, disclose, or use this communication. If you received this email in error, please notify the sender and delete it. OPERAVA processes personal information in accordance with applicable privacy and data-protection requirements. This communication may contain service-related, transactional, operational, or client information.'

const COPYRIGHT_TEXT = '\u00A9 2026 OPERAVA GLOBAL SOLUTIONS. All rights reserved.'

const AUTO_NOTE = 'Note: This is an email generated email, please do not reply.&nbsp;'

/**
 * Mandatory shell. Placeholders:
 *   {{FULL_NAME}} — recipient display name (already escaped by caller helpers)
 *   {{BODY}} — message body HTML only
 */
export function mandatoryEmailShell(fullNamePlaceholder: string, bodyPlaceholder: string): string {
  return (
    '<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="width: 100%; margin: 0; padding: 0; background: rgb(255, 255, 255); background-color: rgb(255, 255, 255); color: rgb(17, 17, 17)">' +
    '<tbody>' +
    '<tr>' +
    '<td align="center" bgcolor="#ffffff" style="margin: 0; padding: 0; background: rgb(255, 255, 255); background-color: rgb(255, 255, 255); color: rgb(17, 17, 17)">' +
    '<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="width: 100%; max-width: 900px; margin: 0 auto; padding: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.45; background: rgb(255, 255, 255); background-color: rgb(255, 255, 255); color: rgb(17, 17, 17)">' +
    '<tbody>' +
    /* Header image — do not change */
    '<tr>' +
    '<td width="100%" bgcolor="#ffffff" style="padding: 0; margin: 0; font-size: 0; line-height: 0; color: rgb(17, 17, 17); background: rgb(255, 255, 255); background-color: rgb(255, 255, 255)">' +
    '<img src="' +
    HEADER_IMG +
    '" width="900" alt="OPERAVA GLOBAL SOLUTIONS" style="display: block; width: 100%; max-width: 900px; height: auto; border: 0; margin: 0; padding: 0; background: rgb(255, 255, 255); background-color: rgb(255, 255, 255)">' +
    '</td>' +
    '</tr>' +
    /* Body: Hi {full_name}, then body, then Operava Team + note */
    '<tr>' +
    '<td bgcolor="#ffffff" style="padding: 18px 0 14px 0; margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.45; background: rgb(255, 255, 255); background-color: rgb(255, 255, 255); color: rgb(17, 17, 17)">' +
    '<p style="margin: 0px 0px 8px; padding: 0px; font-weight: normal;">' +
    '<span style="color:rgb(17, 17, 17); font-family:Arial, Helvetica, sans-serif; font-size: 11px;">' +
    'Hi ' +
    fullNamePlaceholder +
    ',' +
    '</span><br>' +
    '</p>' +
    '<div><br></div>' +
    '<div>' +
    bodyPlaceholder +
    '<br></div>' +
    '<div><br></div>' +
    '<div><br></div>' +
    '<div><br></div>' +
    '<div>Operava Team,<br></div>' +
    '<div>' +
    AUTO_NOTE +
    '</div>' +
    '</td>' +
    '</tr>' +
    /* Footer image — do not change */
    '<tr>' +
    '<td width="100%" bgcolor="#ffffff" style="padding: 0; margin: 0; font-size: 0; line-height: 0; color: rgb(17, 17, 17); background: rgb(255, 255, 255); background-color: rgb(255, 255, 255)">' +
    '<img src="' +
    FOOTER_IMG +
    '" width="900" alt="OPERAVA GLOBAL SOLUTIONS" style="display: block; width: 100%; max-width: 900px; height: auto; border: 0; margin: 0; padding: 0; background: rgb(255, 255, 255); background-color: rgb(255, 255, 255)">' +
    '</td>' +
    '</tr>' +
    /* Legal */
    '<tr>' +
    '<td bgcolor="#ffffff" style="padding: 0; margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.45; text-align: left; background: rgb(255, 255, 255); background-color: rgb(255, 255, 255); color: rgb(85, 85, 85)" align="left">' +
    '<p style="padding: 0px; margin: 0px; line-height: 1.45;">' +
    '<span style="color:rgb(85, 85, 85); font-family:Arial, Helvetica, sans-serif; font-size: 11px;">' +
    LEGAL_TEXT +
    '<br></span></p>' +
    '<div><br></div>' +
    '</td>' +
    '</tr>' +
    /* Copyright */
    '<tr>' +
    '<td bgcolor="#ffffff" style="padding: 0; margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.45; text-align: left; background: rgb(255, 255, 255); background-color: rgb(255, 255, 255); color: rgb(85, 85, 85)" align="left">' +
    '<p style="padding: 0px; margin: 0px; line-height: 1.45;">' +
    '<span style="color:rgb(85, 85, 85); font-family:Arial, Helvetica, sans-serif; font-size: 11px;">' +
    COPYRIGHT_TEXT +
    '<br></span></p>' +
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

/** Build final HTML: only full name + body vary. */
export function buildMandatoryEmail(fullName: string, bodyHtml: string): string {
  const name = fullName && String(fullName).trim() ? String(fullName).trim() : 'there'
  return mandatoryEmailShell(name, bodyHtml)
}

/** OTP body only — placeholders PURPOSE, OTP_CODE (filled by formCore). */
export const otpBodyTemplate =
  'Thank you for choosing OPERAVA. Please use the one-time verification code below to continue your <strong>{{PURPOSE}}</strong>.<br><br>' +
  'Your verification code is: <strong style="letter-spacing: 0.12em;">{{OTP_CODE}}</strong><br><br>' +
  'This code expires in <strong>10 minutes</strong>. For your security, do not share it with anyone.<br><br>' +
  'If you did not request this code, you can safely ignore this email.'

/** OTP full template — NAME + PURPOSE + OTP_CODE */
export const otpEmailTemplate = mandatoryEmailShell(
  '{{NAME}}',
  otpBodyTemplate,
)

/** Services / contact confirmation body — DETAILS_LIST, REFERENCE_ID */
export const servicesBodyTemplate =
  'Thank you for choosing OPERAVA. We are pleased to begin working with you and look forward to supporting your business requirements.<br><br>' +
  'We received your inquiry. Your submission has been recorded. Reference number: <strong>{{REFERENCE_ID}}</strong>.<br><br>' +
  '<strong>Submitted details</strong><br>' +
  '{{DETAILS_LIST}}<br><br>' +
  'Please use your verified email address when communicating with OPERAVA regarding your account, service, request, documentation, or engagement.<br><br>' +
  'If you have questions or require assistance, please contact the appropriate OPERAVA support channel provided in your communication.'

export const servicesConfirmationTemplate = mandatoryEmailShell('{{NAME}}', servicesBodyTemplate)

/** Careers confirmation body */
export const applicationBodyTemplate =
  'Thank you for contacting OPERAVA and for your interest in our opportunities.<br><br>' +
  'We confirm that we have received your application. Your submitted information has been recorded. Reference number: <strong>{{REFERENCE_ID}}</strong>.<br><br>' +
  '<strong>Submitted details</strong><br>' +
  '{{DETAILS_LIST}}<br><br>' +
  'Your application will be reviewed by the appropriate team. If your qualifications match an available position or another suitable opportunity, a member of our Talent Acquisition Team may contact you through your preferred contact method.<br><br>' +
  'Please note that submitting an application does not guarantee employment or an interview. Your information may be considered for current and future opportunities within OPERAVA.'

export const applicationConfirmationTemplate = mandatoryEmailShell(
  '{{NAME}}',
  applicationBodyTemplate,
)

/** Staff notification body */
export const staffBodyTemplate =
  '<strong>{{TITLE}}</strong><br><br>' +
  'Reference: <strong>{{REFERENCE_ID}}</strong><br>' +
  '{{PARTY_LABEL}} email: <strong>{{EMAIL}}</strong><br>' +
  'Submitted: {{SUBMITTED_AT}}<br><br>' +
  'Reply to this email to contact the {{PARTY_LABEL}}.<br><br>' +
  '<strong>Submission details</strong><br>' +
  '{{ROWS_HTML}}'

export const staffNotificationTemplate = mandatoryEmailShell('Team', staffBodyTemplate)

/** Recruitment pool pass confirmation body */
export const recruitmentPoolBodyTemplate =
  'Thank you for completing the OPERAVA Recruitment AVA assessment.<br><br>' +
  'We confirm that you have <strong>passed</strong> and are eligible for the <strong>Recruitment Pool</strong>, subject to Talent Acquisition review.<br><br>' +
  '<strong>Application number:</strong> {{APPLICATION_ID}}<br>' +
  '<strong>Full name:</strong> {{NAME}}<br>' +
  '<strong>Position:</strong> {{POSITION}}<br>' +
  '<strong>Assessment score:</strong> {{SCORE}}<br><br>' +
  'A member of our Talent Acquisition Team may contact you through your verified email if a suitable opportunity arises.<br><br>' +
  'Passing the assessment and pool eligibility do not guarantee employment or an interview.'

export const recruitmentPoolConfirmationTemplate = mandatoryEmailShell(
  '{{NAME}}',
  recruitmentPoolBodyTemplate,
)
