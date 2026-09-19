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
  DEFAULT_RESEND_FROM,
  type FormEnv,
} from '../../lib/formCore'

/**
 * POST /api/recruitment/email-send
 * Application email OTP for Recruitment AVA (Phase 2).
 * Uses signed draft (no D1 required). Does not create permanent applicant records.
 */
export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    if (!env.RESEND_API_KEY || String(env.RESEND_API_KEY).trim().length < 8) {
      return json(
        {
          error:
            'Email delivery is not configured. Please contact talents@operavaglobal.com.',
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

    // Reuse signed-draft machinery; formType CAREERS keeps payload compatible with FormType union
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

    try {
      await sendResend(env, {
        from: DEFAULT_RESEND_FROM,
        to: [email],
        subject: 'Verification Code',
        html: otpEmailHtml(name, 'RECRUITMENT AVA APPLICATION EMAIL',
          code),
        text: otpEmailText(name, 'RECRUITMENT AVA APPLICATION EMAIL', code),
      })
    } catch (mailErr) {
      const msg = mailErr instanceof Error ? mailErr.message : 'unknown'
      console.error('recruitment OTP email failed', msg)
      return json(
        {
          error:
            'Unable to send verification email right now. Please try again in a moment, or contact talents@operavaglobal.com.',
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
