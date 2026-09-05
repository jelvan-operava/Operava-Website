/**
 * Email templates for form submissions and notifications.
 * Synchronized directly with `/Email Notification - OTP Format/` as the single source of truth.
 * Kept as TypeScript string constants to ensure safe execution in Node, esbuild,
 * and Cloudflare Pages Functions runtimes without requiring special bundler loaders.
 */

export const otpEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your verification code</title>
</head>
<body style="margin:0;padding:0;background:#F8F7FC;font-family:Arial,Helvetica,sans-serif;color:#1F2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F8F7FC;padding:28px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E5E7EB;box-shadow:0 8px 28px rgba(13,10,25,0.04);">
        <!-- Header bar -->
        <tr>
          <td style="background:linear-gradient(135deg,#0B0F19 0%,#1a1030 55%,#5B21B6 100%);padding:18px 24px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align:middle;text-align:left;">
                  <div style="font-size:16px;letter-spacing:0.14em;font-weight:700;color:#FFFFFF;text-transform:uppercase;">OPERAVA</div>
                  <div style="font-size:10px;color:#E9D5FF;margin-top:2px;">www.operavaglobal.com</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Accent line -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#6D28D9,#5B21B6,#A855F7);font-size:0;line-height:0;">&nbsp;</td></tr>
        <!-- Body -->
        <tr>
          <td style="padding:24px 24px 8px;">
            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6D28D9;">Email verification</p>
            <h1 style="margin:0 0 12px;font-size:18px;line-height:1.35;font-weight:700;color:#0B0F19;">Your verification code</h1>
            <div style="font-size:12px;line-height:1.55;color:#4B5563;">
              <p style="margin:0;">Use this one-time code to verify your email for your <strong>{{PURPOSE}}</strong>. The code expires in <strong>10 minutes</strong>.</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 24px 24px;">
            <div style="margin:8px 0 4px;padding:14px;border-radius:12px;background:#F5F3FF;border:1px solid #DDD6FE;text-align:center;">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6D28D9;margin-bottom:6px;">Verification code</div>
              <div style="font-size:28px;font-weight:700;letter-spacing:0.25em;color:#0B0F19;">{{OTP_CODE}}</div>
            </div>
            <p style="margin:12px 0 0;font-size:11px;line-height:1.5;color:#4B5563;">For your security, do not share this code. If you did not request it, you can ignore this email.</p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 24px 20px;background:#F5F3FF;border-top:1px solid #EDE9FE;">
            <p style="margin:0 0 8px;font-size:11px;line-height:1.45;color:#4B5563;">You received this email because you submitted an inquiry or application on our website. If you did not submit an inquiry or application, please report to cs@operavaglobal.com or simply ignore this email.</p>
            <p style="margin:0;font-size:11px;">
              <span style="color:#4B5563;font-weight:600;">OPERAVA Global Solutions</span>
              <span style="color:#C4B5FD;"> &middot; </span>
              <a href="https://www.operavaglobal.com/terms" style="color:#6D28D9;text-decoration:none;">Terms and Conditions</a>
              <span style="color:#C4B5FD;"> &middot; </span>
              <a href="https://www.operavaglobal.com" style="color:#6D28D9;text-decoration:none;">www.operavaglobal.com</a>
              <span style="color:#C4B5FD;"> &middot; </span>
              <a href="https://www.operavaglobal.com/privacy" style="color:#6D28D9;text-decoration:none;">Data Privacy Policy</a>
            </p>
          </td>
        </tr>
      </table>
      <p style="margin:14px 0 0;font-size:10.5px;color:#9CA3AF;text-align:center;">&copy; OPERAVA Global Solutions. All rights reserved.</p>
    </td></tr>
  </table>
</body>
</html>`

export const servicesConfirmationTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>WE RECEIVED YOUR INQUIRY</title>
</head>
<body style="margin:0; padding:0; background:#F8F7FC; font-family:Arial, Helvetica, sans-serif; color:#1F2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background:#F8F7FC; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:32px 20px;">
        <!-- MAIN CONTAINER -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="width:100%; max-width:600px; background:#FFFFFF; border:1px solid #E5E7EB; border-radius:16px; border-collapse:separate;">
          <tr>
            <td style="padding:28px 24px;">
              <!-- TITLE -->
              <h1 style="margin:0 0 14px 0; padding:0; font-size:18px; line-height:1.35; font-weight:700; color:#0B0F19; letter-spacing:0.3px;">
                WE RECEIVED YOUR INQUIRY
              </h1>
              <!-- EMAIL CONTENT -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:12px; line-height:1.55; color:#1F2937;">
                    <p style="margin:0 0 12px 0;">
                      Hi {{NAME}},<br>
                    </p>
                    <p style="margin:0 0 12px 0;">
                      Thank you for contacting OPERAVA and for your interest in our services and business solutions.<br>
                    </p>
                    <p style="margin:0 0 12px 0;">
                      We confirm that we have received your service inquiry. Your submitted information has been recorded as follows:<br>
                    </p>
                    <!-- DYNAMIC DETAILS -->
                    {{DETAILS_LIST}}
                    <p style="margin:12px 0;">
                      Your service inquiry will be reviewed by the appropriate OPERAVA team. A member of our Business Development, Client Support, or relevant service team may contact you to discuss your requirements and determine the most suitable solutions for your business or organization.<br>
                    </p>
                    <p style="margin:0 0 12px 0;">
                      Please note that the submission of a service inquiry does not constitute a service agreement, contract, quotation, or guarantee of service availability. Any proposed services, scope of work, pricing, and terms will be discussed and confirmed separately with the appropriate OPERAVA representative.<br>
                    </p>
                    <p style="margin:0;">
                      Thank you for considering OPERAVA as your business solutions partner. We appreciate your interest and look forward to learning more about your requirements.<br>
                    </p>
                  </td>
                </tr>
              </table>
              <!-- CLOSING -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                <tr>
                  <td style="font-size:12px; line-height:1.55; color:#1F2937;">
                    Best regards,<br>
                    <strong>OPERAVA Global Solutions</strong>
                  </td>
                </tr>
              </table>
              <!-- SIGNATURE -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px; border-collapse:collapse;">
                <!-- TOP PURPLE LINE -->
                <tr>
                  <td style="height:2px; line-height:2px; background:#8A5CF6; font-size:0;">
                    &nbsp;
                  </td>
                </tr>
                <!-- SIGNATURE HEADER -->
                <tr>
                  <td style="padding:10px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <!-- OPERAVA BRAND -->
                        <td valign="middle" style="padding-right:14px; white-space:nowrap;">
                          <div style="font-family:Arial, Helvetica, sans-serif; font-weight:900; font-size:20px; letter-spacing:3.5px; line-height:1; color:#8A5CF6;">
                            OPERAVA
                          </div>
                          <div style="font-family:Arial, Helvetica, sans-serif; font-size:8px; letter-spacing:2px; color:#6B7280; margin-top:3px; font-weight:600;">
                            GLOBAL SOLUTIONS
                          </div>
                        </td>
                        <!-- SIGNATURE IMAGE -->
                        <td valign="middle" align="right" style="width:100%;">
                          <img
                            src="https://res.cloudinary.com/sdaxzncs/image/upload/v1787451792/operava-signature.jpg"
                            width="280"
                            alt="OPERAVA Global Solutions"
                            style="display:block; border:0; max-width:280px; width:100%; height:auto; margin-left:auto;"
                          >
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- BOTTOM PURPLE LINE -->
                <tr>
                  <td style="height:2px; line-height:2px; background:#8A5CF6; font-size:0;">
                    &nbsp;
                  </td>
                </tr>
                <!-- COMPANY INFORMATION -->
                <tr>
                  <td style="padding:6px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:8.5px; line-height:12px; color:#6B7280;">
                    SEC and BIR Registered, website:
                    <a
                      href="https://www.operavaglobal.com"
                      target="_blank"
                      style="color:#8A5CF6; text-decoration:none; font-weight:600;"
                    >
                      www.operavaglobal.com
                    </a>
                  </td>
                </tr>
                <!-- CONFIDENTIALITY NOTICE -->
                <tr>
                  <td style="padding:14px 0 0 0;">
                    <div style="font-family:Arial, Helvetica, sans-serif; font-size:9.5px; font-weight:700; font-style:italic; text-decoration:underline; color:#111827; margin-bottom:3px;">
                      CONFIDENTIALITY NOTICE
                    </div>
                    <div style="font-family:Arial, Helvetica, sans-serif; font-size:9px; line-height:13.5px; font-style:italic; color:#4B5563; text-align:justify;">
                      This email and any attachments may contain confidential or privileged information intended only for the recipient(s). If you received this email in error, please notify the sender immediately and delete it. Any unauthorized use, disclosure, copying, or distribution is prohibited. OPERAVA accepts no responsibility for viruses or transmission errors; please scan attachments before opening.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!-- END MAIN CONTAINER -->
      </td>
    </tr>
  </table>
</body>
</html>`

export const applicationConfirmationTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>WE RECEIVED YOUR APPLICATION</title>
</head>
<body style="margin:0; padding:0; background:#F8F7FC; font-family:Arial, Helvetica, sans-serif; color:#1F2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; background:#F8F7FC; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:32px 20px;">
        <!-- MAIN CONTAINER -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="width:100%; max-width:600px; background:#FFFFFF; border:1px solid #E5E7EB; border-radius:16px; border-collapse:separate;">
          <tr>
            <td style="padding:28px 24px;">
              <!-- TITLE -->
              <h1 style="margin:0 0 14px 0; padding:0; font-size:18px; line-height:1.35; font-weight:700; color:#0B0F19; letter-spacing:0.3px;">
                WE RECEIVED YOUR APPLICATION
              </h1>
              <!-- EMAIL CONTENT -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:12px; line-height:1.55; color:#1F2937;">
                    <p style="margin:0 0 12px 0;">
                      Hi {{NAME}},<br>
                    </p>
                    <p style="margin:0 0 12px 0;">
                      Thank you for contacting OPERAVA and for your interest in our opportunities.<br>
                    </p>
                    <p style="margin:0 0 12px 0;">
                      We confirm that we have received your application. Your submitted information has been recorded as follows:<br>
                    </p>
                    <!-- DYNAMIC DETAILS -->
                    {{DETAILS_LIST}}
                    <p style="margin:12px 0;">
                      Your application will be reviewed by the appropriate team. If your qualifications match an available position or another suitable opportunity, a member of our Talent Acquisition Team may contact you through your preferred contact method.<br>
                    </p>
                    <p style="margin:0 0 12px 0;">
                      Please note that submitting an application does not guarantee employment or an interview. Your information may, however, be considered for current and future opportunities within OPERAVA.<br>
                    </p>
                    <p style="margin:0;">
                      Thank you for your interest in becoming part of OPERAVA.<br>
                    </p>
                  </td>
                </tr>
              </table>
              <!-- CLOSING -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;">
                <tr>
                  <td style="font-size:12px; line-height:1.55; color:#1F2937;">
                    Best regards,<br>
                    <strong>Talent Acquisition Team,</strong><br>
                    <strong>OPERAVA Global Solutions</strong>
                  </td>
                </tr>
              </table>
              <!-- SIGNATURE -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px; border-collapse:collapse;">
                <!-- TOP PURPLE LINE -->
                <tr>
                  <td style="height:2px; line-height:2px; background:#8A5CF6; font-size:0;">
                    &nbsp;
                  </td>
                </tr>
                <!-- SIGNATURE HEADER -->
                <tr>
                  <td style="padding:10px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <!-- OPERAVA BRAND -->
                        <td valign="middle" style="padding-right:14px; white-space:nowrap;">
                          <div style="font-family:Arial, Helvetica, sans-serif; font-weight:900; font-size:20px; letter-spacing:3.5px; line-height:1; color:#8A5CF6;">
                            OPERAVA
                          </div>
                          <div style="font-family:Arial, Helvetica, sans-serif; font-size:8px; letter-spacing:2px; color:#6B7280; margin-top:3px; font-weight:600;">
                            GLOBAL SOLUTIONS
                          </div>
                        </td>
                        <!-- SIGNATURE IMAGE -->
                        <td valign="middle" align="right" style="width:100%;">
                          <img
                            src="https://res.cloudinary.com/sdaxzncs/image/upload/v1787451792/operava-signature.jpg"
                            width="280"
                            alt="OPERAVA Global Solutions"
                            style="display:block; border:0; max-width:280px; width:100%; height:auto; margin-left:auto;"
                          >
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- BOTTOM PURPLE LINE -->
                <tr>
                  <td style="height:2px; line-height:2px; background:#8A5CF6; font-size:0;">
                    &nbsp;
                  </td>
                </tr>
                <!-- COMPANY INFORMATION -->
                <tr>
                  <td style="padding:6px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:8.5px; line-height:12px; color:#6B7280;">
                    SEC and BIR Registered, website:
                    <a
                      href="https://www.operavaglobal.com"
                      target="_blank"
                      style="color:#8A5CF6; text-decoration:none; font-weight:600;"
                    >
                      www.operavaglobal.com
                    </a>
                  </td>
                </tr>
                <!-- CONFIDENTIALITY NOTICE -->
                <tr>
                  <td style="padding:14px 0 0 0;">
                    <div style="font-family:Arial, Helvetica, sans-serif; font-size:9.5px; font-weight:700; font-style:italic; text-decoration:underline; color:#111827; margin-bottom:3px;">
                      CONFIDENTIALITY NOTICE
                    </div>
                    <div style="font-family:Arial, Helvetica, sans-serif; font-size:9px; line-height:13.5px; font-style:italic; color:#4B5563; text-align:justify;">
                      This email and any attachments may contain confidential or privileged information intended only for the recipient(s). If you received this email in error, please notify the sender immediately and delete it. Any unauthorized use, disclosure, copying, or distribution is prohibited. OPERAVA accepts no responsibility for viruses or transmission errors; please scan attachments before opening.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!-- END MAIN CONTAINER -->
      </td>
    </tr>
  </table>
</body>
</html>`
