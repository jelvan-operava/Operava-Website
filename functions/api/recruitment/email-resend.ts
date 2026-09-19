import {
  json,
  maskEmail,
  generateOtp,
  hashOtp,
  otpEmailHtml,
  otpEmailText,
  sendResend,
  resolveSecret,
  readSignedDraft,
  issueSignedDraft,
  DEFAULT_RESEND_FROM,
  type FormEnv,
} from '../../lib/formCore'

/**
 * POST /api/recruitment/email-resend
 * Resend application email OTP (rate-limited via signed draft lastSentAt).
 */
export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    if (!env.RESEND_API_KEY || String(env.RESEND_API_KEY).trim().length < 8) {
      return json({ error: 'Email delivery is not configured.' }, 503)
    }

    const secret = resolveSecret(env)
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
        from: DEFAULT_RESEND_FROM,
        to: [email],
        subject: 'Verification Code',
        html: otpEmailHtml(name, 'RECRUITMENT AVA APPLICATION EMAIL', code),
        text: otpEmailText(name, 'RECRUITMENT AVA APPLICATION EMAIL', code),
      })
    } catch (mailErr) {
      console.error('recruitment OTP resend failed', mailErr instanceof Error ? mailErr.message : 'unknown')
      return json(
        {
          error:
            'Unable to resend verification email right now. Please try again shortly.',
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
