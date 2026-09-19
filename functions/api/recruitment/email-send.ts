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
  otpSecretMissingResponse,
  issueSignedDraft,
  senderFor,
  purposeLabel,
  EmailSendError,
  type FormEnv,
} from '../../lib/formCore'

/**
 * POST /api/recruitment/email-send
 * Application email OTP for Recruitment AVA.
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
    if (!secret) return otpSecretMissingResponse()

    let body: Record<string, unknown>
    try {
      body = (await request.json()) as Record<string, unknown>
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }

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
      const err = mailErr instanceof EmailSendError ? mailErr : null
      const msg = mailErr instanceof Error ? mailErr.message : 'unknown'
      const codeOut = err?.code || msg
      console.error('recruitment OTP email failed', codeOut, err?.providerMessage, err?.fromUsed)

      let error =
        'Unable to send verification email right now. Please try again in a moment, or contact talents@operavaglobal.com.'

      if (codeOut === 'EMAIL_DOMAIN_NOT_VERIFIED') {
        error =
          'Email sender domain is not verified with Resend for this API key. In Resend: Domains must show operavaglobal.com as Verified, and RESEND_API_KEY must belong to that same Resend account. From used: ' +
          (err?.fromUsed || 'OPERAVA <noreply@operavaglobal.com>')
      } else if (codeOut === 'EMAIL_ADDRESS_PATTERN') {
        error =
          'Email address was rejected by the mail provider. Check the application email format and try again.'
      } else if (codeOut === 'EMAIL_INVALID_TO') {
        error = 'A valid application email is required.'
      } else if (codeOut === 'RESEND_NOT_CONFIGURED' || msg === 'RESEND_API_KEY is not configured') {
        error = 'Email delivery is not configured. Please contact talents@operavaglobal.com.'
      } else if (codeOut === 'EMAIL_API_KEY_INVALID') {
        error =
          'Email service authentication failed. Update RESEND_API_KEY in Cloudflare Pages secrets (full re_ key from the same Resend account where the domain is verified).'
      }

      return json(
        {
          error,
          code: codeOut,
          fromUsed: err?.fromUsed || undefined,
          providerStatus: err?.providerStatus || undefined,
          providerMessage: err?.providerMessage || undefined,
        },
        502,
      )
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
