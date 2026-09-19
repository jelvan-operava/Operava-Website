import {
  EMAIL_RE,
  clean,
  generateOtp,
  hashOtp,
  json,
  maskEmail,
  otpEmailHtml,
  otpEmailText,
  sendResend,
  resolveSecret,
  issueSignedDraft,
  senderFor,
  purposeLabel,
  type FormEnv,
} from '../../lib/formCore'

/**
 * POST /api/recruitment/email-send
 * Application email OTP for Recruitment AVA.
 * Same Resend path as /api/forms/start (signed draft, subject Verification Code).
 */
export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    const apiKey = env.RESEND_API_KEY && String(env.RESEND_API_KEY).trim()
    if (!apiKey || apiKey.length < 8) {
      return json(
        {
          error:
            'Email delivery is not configured. Please contact talents@operavaglobal.com.',
          code: 'RESEND_NOT_CONFIGURED',
        },
        503,
      )
    }

    const secret = resolveSecret(env)

    let body: Record<string, unknown>
    try {
      body = (await request.json()) as Record<string, unknown>
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }

    // Honeypot
    if (clean(body.website, 80)) {
      return json({ ok: true, draftId: 'filtered', maskedEmail: 'hidden' })
    }

    const name = clean(body.name, 120)
    const email = clean(body.email, 180).toLowerCase()
    const position = clean(body.position, 180)
    const positionCode = clean(body.positionCode, 20).toLowerCase()

    if (name.length < 2) return json({ error: 'Full name is required.' }, 400)
    if (!EMAIL_RE.test(email)) return json({ error: 'A valid application email is required.' }, 400)
    if (!position) return json({ error: 'Position is required.' }, 400)
    if (!['tech', 'ops', 'cx'].includes(positionCode)) {
      return json({ error: 'Invalid position selection.' }, 400)
    }

    const now = Date.now()
    const code = generateOtp()
    const codeHash = await hashOtp(secret, code)
    const payload = JSON.stringify({
      name,
      email,
      position,
      positionCode,
      purpose: 'RECRUITMENT_APPLICATION_EMAIL',
    })
    const expiresAt = now + 10 * 60 * 1000

    const draftId = await issueSignedDraft(secret, {
      email,
      formType: 'CAREERS',
      payload,
      codeHash,
      expiresAt,
      attempts: 0,
      resends: 0,
      lastSentAt: now,
    })

    const purpose = purposeLabel('CAREERS')
    try {
      await sendResend(env, {
        from: senderFor('CAREERS', env),
        to: [email],
        subject: 'Verification Code',
        html: otpEmailHtml(name, purpose, code),
        text: otpEmailText(name, purpose, code),
      })
    } catch (mailErr) {
      const msg = mailErr instanceof Error ? mailErr.message : 'unknown'
      console.error('recruitment OTP email failed', msg)
      let error =
        'Unable to send verification email right now. Please try again in a moment, or contact talents@operavaglobal.com.'
      let codeOut = 'EMAIL_SEND_FAILED'
      if (msg === 'EMAIL_DOMAIN_NOT_VERIFIED') {
        error =
          'Email sender domain is not verified with Resend. Contact the site operator to verify operavaglobal.com.'
        codeOut = msg
      } else if (msg === 'EMAIL_ADDRESS_PATTERN') {
        error =
          'Email address was rejected by the mail provider. Check the application email format and try again.'
        codeOut = msg
      } else if (msg === 'EMAIL_INVALID_TO') {
        error = 'A valid application email is required.'
        codeOut = msg
      } else if (msg === 'RESEND_API_KEY is not configured') {
        error = 'Email delivery is not configured. Please contact talents@operavaglobal.com.'
        codeOut = 'RESEND_NOT_CONFIGURED'
      } else if (msg === 'EMAIL_UNAUTHORIZED' || msg === 'EMAIL_API_KEY_INVALID') {
        error =
          'Email service authentication failed. The site operator must update RESEND_API_KEY in Cloudflare Pages secrets.'
        codeOut = msg
      }
      return json({ error, code: codeOut }, 502)
    }

    return json({
      ok: true,
      draftId,
      maskedEmail: maskEmail(email),
      expiresInSec: 600,
    })
  } catch (err) {
    console.error('recruitment email-send failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to start email verification.' }, 500)
  }
}
