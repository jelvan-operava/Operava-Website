/**
 * OPERAVA email templates — mandatory format (single source of truth).
 * Structure: purple line → Email_Header.png → body → Emailfooterimage.jpg → purple line → legal → copyright
 * Header: https://res.cloudinary.com/b5i5bwwa/image/upload/Email_Header.png
 * Footer: https://res.cloudinary.com/b5i5bwwa/image/upload/Emailfooterimage.jpg
 * Purple: #711ce8 | Body text: #333333 | Headings: #4f16c7
 */

const HEADER_IMG =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/Email_Header.png'
const FOOTER_IMG =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/Emailfooterimage.jpg'

/** Shared shell: inject BODY_HTML (td contents for main content area). */
function emailShell(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${title}</title>
  <style>
    html, body { margin:0 !important; padding:0 !important; width:100% !important; min-width:100% !important; background-color:#ffffff !important; color-scheme:light !important; }
    body { font-family:Arial, Helvetica, sans-serif; color:#333333; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; width:100% !important; min-width:100% !important; }
    table { border-collapse:collapse !important; border-spacing:0 !important; mso-table-lspace:0pt; mso-table-rspace:0pt; }
    td { border-collapse:collapse !important; }
    img { display:block !important; border:0 !important; outline:none !important; text-decoration:none !important; height:auto !important; max-width:100% !important; -ms-interpolation-mode:bicubic; }
    .email-wrapper { width:100% !important; min-width:100% !important; background-color:#ffffff !important; }
    .email-container { width:100% !important; max-width:900px !important; margin:0 auto !important; background-color:#ffffff !important; }
    .purple-line { width:100% !important; height:3px !important; line-height:3px !important; font-size:0 !important; background-color:#711ce8 !important; }
    .body-content { width:100% !important; box-sizing:border-box !important; padding:44px 55px 42px !important; background-color:#ffffff !important; }
    .body-content p { margin:0 0 20px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:25px; font-weight:400; color:#333333; }
    .body-content h2 { margin:28px 0 12px; font-family:Arial, Helvetica, sans-serif; font-size:18px; line-height:26px; font-weight:600; color:#4f16c7; }
    .highlight { width:100% !important; box-sizing:border-box !important; margin:26px 0 !important; padding:18px 20px !important; border-left:4px solid #711ce8 !important; background-color:#faf7ff !important; }
    .highlight p { margin:0 !important; }
    .email-image { display:block !important; width:100% !important; max-width:900px !important; height:auto !important; margin:0 !important; padding:0 !important; background-color:#ffffff !important; }
    .legal { width:100% !important; box-sizing:border-box !important; padding:12px 24px 6px !important; background-color:#ffffff !important; color:#999999 !important; font-family:Arial, Helvetica, sans-serif !important; font-size:6px !important; line-height:10px !important; font-weight:400 !important; text-align:left !important; }
    .copyright { width:100% !important; box-sizing:border-box !important; padding:6px 24px 16px !important; background-color:#ffffff !important; color:#999999 !important; font-family:Arial, Helvetica, sans-serif !important; font-size:6px !important; line-height:10px !important; font-weight:400 !important; text-align:left !important; }
    @media only screen and (max-width:600px) {
      .body-content { padding:32px 24px 36px !important; }
      .body-content p { font-size:14px !important; line-height:23px !important; }
      .body-content h2 { font-size:17px !important; line-height:24px !important; }
      .highlight { padding:16px 17px !important; }
      .legal { padding:10px 18px 5px !important; font-size:5px !important; line-height:8px !important; }
      .copyright { padding:5px 18px 14px !important; font-size:5px !important; line-height:8px !important; }
    }
    @media (prefers-color-scheme: dark) {
      html, body, table, tr, td, .email-wrapper, .email-container, .body-content, .highlight, .legal, .copyright {
        background-color:#ffffff !important; background:#ffffff !important;
      }
      body { color:#333333 !important; }
      .body-content p { color:#333333 !important; }
      .body-content h2 { color:#4f16c7 !important; }
      .highlight { background-color:#faf7ff !important; }
      .legal, .copyright { color:#999999 !important; }
      .purple-line { background-color:#711ce8 !important; }
      .email-image { background-color:#ffffff !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;width:100%;min-width:100%;background-color:#ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="email-wrapper" style="width:100%;min-width:100%;background-color:#ffffff;">
    <tr>
      <td align="center" valign="top" style="padding:0;background-color:#ffffff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="email-container" style="width:100%;max-width:900px;margin:0 auto;background-color:#ffffff;">
          <tr>
            <td class="purple-line" style="width:100%;height:3px;line-height:3px;font-size:0;background-color:#711ce8;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:0;margin:0;background-color:#ffffff;">
              <img src="${HEADER_IMG}" alt="Images are not displayed. Turn on images or select Download Images above to view this email properly." width="900" class="email-image" style="display:block;width:100%;max-width:900px;height:auto;border:0;outline:none;background-color:#ffffff;">
            </td>
          </tr>
          <tr>
            <td class="body-content" style="width:100%;padding:44px 55px 42px;background-color:#ffffff;">
${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0;margin:0;background-color:#ffffff;">
              <img src="${FOOTER_IMG}" alt="Images are not displayed. Turn on images or select Download Images above to view this email properly." width="900" class="email-image" style="display:block;width:100%;max-width:900px;height:auto;border:0;outline:none;background-color:#ffffff;">
            </td>
          </tr>
          <tr>
            <td class="purple-line" style="width:100%;height:3px;line-height:3px;font-size:0;background-color:#711ce8;">&nbsp;</td>
          </tr>
          <tr>
            <td class="legal" style="width:100%;box-sizing:border-box;padding:12px 24px 6px;background-color:#ffffff;color:#999999;font-family:Arial,Helvetica,sans-serif;font-size:6px;line-height:10px;font-weight:400;text-align:left;">
              This email and any attachments may contain confidential, proprietary, or privileged information intended solely for the recipient. If you are not the intended recipient, please do not copy, distribute, disclose, or use this communication. If you received this email in error, please notify the sender and delete it. OPERAVA processes personal information in accordance with applicable privacy and data-protection requirements. This communication may contain service-related, transactional, operational, or client information.
            </td>
          </tr>
          <tr>
            <td style="height:6px;line-height:6px;font-size:0;background-color:#ffffff;">&nbsp;</td>
          </tr>
          <tr>
            <td class="copyright" style="width:100%;box-sizing:border-box;padding:6px 24px 16px;background-color:#ffffff;color:#999999;font-family:Arial,Helvetica,sans-serif;font-size:6px;line-height:10px;font-weight:400;text-align:left;">
              © 2026 OPERAVA GLOBAL SOLUTIONS. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** OTP / email verification — placeholders: PURPOSE, OTP_CODE */
export const otpEmailTemplate = emailShell(
  'Verification Code',
  `              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">Dear Client,</p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Thank you for choosing OPERAVA. Please use the one-time verification code below to continue your <strong>{{PURPOSE}}</strong>.
              </p>

              <h2 style="margin:28px 0 12px;font-size:18px;line-height:26px;font-weight:600;color:#4f16c7;">
                Email Verification
              </h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                This code expires in <strong>10 minutes</strong>. For your security, do not share it with anyone.
              </p>

              <div class="highlight" style="width:100%;box-sizing:border-box;margin:26px 0;padding:18px 20px;border-left:4px solid #711ce8;background-color:#faf7ff;">
                <p style="margin:0;font-size:12px;line-height:20px;letter-spacing:0.12em;text-transform:uppercase;color:#4f16c7;font-weight:700;">
                  Verification code
                </p>
                <p style="margin:10px 0 0;font-size:28px;line-height:34px;font-weight:700;letter-spacing:0.28em;color:#0B0F19;text-align:center;">
                  {{OTP_CODE}}
                </p>
              </div>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                If you did not request this code, you can safely ignore this email. No further action is required.
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                If you have questions or require assistance, please contact the appropriate OPERAVA support channel provided in your communication.
              </p>

              <p style="margin-bottom:0;font-size:15px;line-height:25px;color:#333333;">
                Client Support Team,
              </p>`,
)

/** Services / contact confirmation — placeholders: NAME, DETAILS_LIST, REFERENCE_ID */
export const servicesConfirmationTemplate = emailShell(
  'We received your inquiry',
  `              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">Dear {{NAME}},</p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Thank you for choosing OPERAVA. We are pleased to begin working with you and look forward to supporting your business requirements.
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Our client services are structured to provide reliable support across technology, workforce, talent, business processes, and related operational requirements.
              </p>

              <h2 style="margin:28px 0 12px;font-size:18px;line-height:26px;font-weight:600;color:#4f16c7;">
                We received your inquiry
              </h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Your submission has been recorded. Reference number: <strong>{{REFERENCE_ID}}</strong>.
              </p>

              <div class="highlight" style="width:100%;box-sizing:border-box;margin:26px 0;padding:18px 20px;border-left:4px solid #711ce8;background-color:#faf7ff;">
                <p style="margin:0 0 8px;font-size:15px;line-height:25px;color:#333333;font-weight:600;">Submitted details</p>
                {{DETAILS_LIST}}
              </div>

              <h2 style="margin:28px 0 12px;font-size:18px;line-height:26px;font-weight:600;color:#4f16c7;">
                Client Communication
              </h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Please use your verified email address when communicating with OPERAVA regarding your account, service, request, documentation, or engagement.
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Additional instructions will be provided whenever an action is required from you. Please review each communication carefully and follow the instructions provided.
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Please note that submitting an inquiry does not constitute a service agreement, contract, quotation, or guarantee of service availability. Any proposed services, scope, pricing, and terms will be confirmed separately with the appropriate OPERAVA representative.
              </p>

              <h2 style="margin:28px 0 12px;font-size:18px;line-height:26px;font-weight:600;color:#4f16c7;">
                Support
              </h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                If you have questions or require assistance, please contact the appropriate OPERAVA support channel provided in your communication.
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                We appreciate the opportunity to work with you and look forward to supporting your business.
              </p>

              <p style="margin-bottom:0;font-size:15px;line-height:25px;color:#333333;">
                Client Support Team,
              </p>`,
)

/** Careers application confirmation — placeholders: NAME, DETAILS_LIST, REFERENCE_ID */
export const applicationConfirmationTemplate = emailShell(
  'We received your application',
  `              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">Dear {{NAME}},</p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Thank you for contacting OPERAVA and for your interest in our opportunities.
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                We confirm that we have received your application. Your submitted information has been recorded.
              </p>

              <h2 style="margin:28px 0 12px;font-size:18px;line-height:26px;font-weight:600;color:#4f16c7;">
                Application received
              </h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Reference number: <strong>{{REFERENCE_ID}}</strong>.
              </p>

              <div class="highlight" style="width:100%;box-sizing:border-box;margin:26px 0;padding:18px 20px;border-left:4px solid #711ce8;background-color:#faf7ff;">
                <p style="margin:0 0 8px;font-size:15px;line-height:25px;color:#333333;font-weight:600;">Submitted details</p>
                {{DETAILS_LIST}}
              </div>

              <h2 style="margin:28px 0 12px;font-size:18px;line-height:26px;font-weight:600;color:#4f16c7;">
                Next steps
              </h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Your application will be reviewed by the appropriate team. If your qualifications match an available position or another suitable opportunity, a member of our Talent Acquisition Team may contact you through your preferred contact method.
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Please note that submitting an application does not guarantee employment or an interview. Your information may be considered for current and future opportunities within OPERAVA.
              </p>

              <h2 style="margin:28px 0 12px;font-size:18px;line-height:26px;font-weight:600;color:#4f16c7;">
                Support
              </h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                If you have questions or require assistance, please contact the appropriate OPERAVA support channel provided in your communication.
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Thank you for your interest in becoming part of OPERAVA.
              </p>

              <p style="margin-bottom:0;font-size:15px;line-height:25px;color:#333333;">
                Talent Acquisition Team,
              </p>`,
)

/** Staff internal notification — placeholders: TITLE, REFERENCE_ID, EMAIL, SUBMITTED_AT, ROWS_HTML, PARTY_LABEL */
export const staffNotificationTemplate = emailShell(
  'OPERAVA submission',
  `              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">Dear Team,</p>

              <h2 style="margin:28px 0 12px;font-size:18px;line-height:26px;font-weight:600;color:#4f16c7;">
                {{TITLE}}
              </h2>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Reference: <strong>{{REFERENCE_ID}}</strong><br>
                {{PARTY_LABEL}} email: <strong>{{EMAIL}}</strong><br>
                Submitted: {{SUBMITTED_AT}}
              </p>

              <p style="margin:0 0 20px;font-size:15px;line-height:25px;color:#333333;">
                Reply to this email to contact the {{PARTY_LABEL}}.
              </p>

              <div class="highlight" style="width:100%;box-sizing:border-box;margin:26px 0;padding:18px 20px;border-left:4px solid #711ce8;background-color:#faf7ff;">
                <p style="margin:0 0 8px;font-size:15px;line-height:25px;color:#333333;font-weight:600;">Submission details</p>
                {{ROWS_HTML}}
              </div>

              <p style="margin-bottom:0;font-size:15px;line-height:25px;color:#333333;">
                OPERAVA Notification,
              </p>`,
)
