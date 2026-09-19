import {
  json,
  maskEmail,
  generateOtp,
  hashOtp,
  otpEmailHtml,
  otpEmailText,
  sendResend,
  resolveSecret,
  otpSecretMissingResponse,
  readSignedDraft,
  issueSignedDraft,
  senderFor,
  purposeLabel,
  type FormEnv,
} from '../../lib/formCore'

/**
 * POST /api/recruitment/email-resend
 * Resend application email OTP (rate-limited via signed draft lastSentAt).
 */
export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    if (!env.RESEND_API_KEY || String(env.RESEND_API_KEY).trim().length < 8) {
      return json({ error: 'Email delivery is not configured.', code: 'RESEND_NOT_CONFIGURED' }, 503)
    }

    const secret = resolveSecret(env)
    if (!secret) return otpSecretMissingResponse()

    let body: { draftId?: string }
    try {
      body = (await request.json()) as { draftId?: string }
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }

    const draftId = String(body.draftId || '')
    if (!draftId) return json({ error: 'Missing verification session.' }, 400)

    const signed = await readSignedDraft(secret, draftId)
    if (!signed) return json({ error: 'This verification session is no longer valid. Start again.' }, 400)

    let payload: Record<string, unknown> = {}
    try {
      payload = JSON.parse(signed.payload || '{}') as Record<string, unknown>
    } catch {
      payload = {}
    }
    if (payload.purpose !== 'RECRUITMENT_APPLICATION_EMAIL') {
      return json({ error: 'Invalid recruitment verification session.' }, 400)
    }

    const now = Date.now()
    if (now - Number(signed.lastSentAt || 0) < 45000) {
      return json({ error: 'Please wait before requesting another code.', retryAfterSec: 45 }, 429)
    }
    if (Number(signed.resends || 0) >= 5) {
      return json({ error: 'Too many resends. Start verification again with your email.' }, 429)
    }

    const code = generateOtp()
    const codeHash = await hashOtp(secret, code)
    const expiresAt = now + 10 * 60 * 1000
    const name = String(payload.name || '')
    const email = signed.email
    const purpose = purposeLabel('CAREERS')

    const newDraftId = await issueSignedDraft(secret, {
      email,
      formType: signed.formType,
      payload: signed.payload,
      codeHash,
      expiresAt,
      attempts: 0,
      resends: Number(signed.resends || 0) + 1,
      lastSentAt: now,
    })

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
      console.error('recruitment OTP resend failed', msg)
      return json(
        {
          error:
            msg === 'EMAIL_API_KEY_INVALID' || msg === 'EMAIL_UNAUTHORIZED'
              ? 'Email service authentication failed. The site operator must update RESEND_API_KEY.'
              : 'Unable to resend verification email right now. Please try again shortly.',
          code: msg.startsWith('EMAIL_') ? msg : 'EMAIL_SEND_FAILED',
        },
        502,
      )
    }

    return json({
      ok: true,
      draftId: newDraftId,
      maskedEmail: maskEmail(email),
      expiresInSec: 600,
    })
  } catch (err) {
    console.error('recruitment email-resend failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to resend verification code.' }, 500)
  }
}
