import {
  json,
  hashOtp,
  resolveSecret,
  readSignedDraft,
  issueSignedDraft,
  b64urlEncode,
  hmacSign,
  extractPlainEmail,
  type FormEnv,
} from '../../lib/formCore'

/**
 * POST /api/recruitment/email-verify
 * Validates OTP and returns a short-lived verified session token.
 * Does NOT create permanent Supabase/D1 applicant rows (Phase 3+).
 */
export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    const secret = resolveSecret(env)
    let body: { draftId?: string; code?: string }
    try {
      body = (await request.json()) as { draftId?: string; code?: string }
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }

    const draftId = String(body.draftId || '')
    const code = String(body.code || '').replace(/\D/g, '')
    if (!draftId || code.length !== 6) return json({ error: 'Enter the 6-digit code.' }, 400)

    const signed = await readSignedDraft(secret, draftId)
    if (!signed) return json({ error: 'This code is no longer valid. Start verification again.' }, 400)
    if (Date.now() > Number(signed.expiresAt)) return json({ error: 'This code has expired.' }, 400)
    if (Number(signed.attempts) >= 5) {
      return json({ error: 'Too many attempts. Request a new code.' }, 429)
    }

    let payload: Record<string, unknown> = {}
    try {
      payload = JSON.parse(signed.payload || '{}') as Record<string, unknown>
    } catch {
      payload = {}
    }
    if (payload.purpose !== 'RECRUITMENT_APPLICATION_EMAIL') {
      return json({ error: 'Invalid recruitment verification session.' }, 400)
    }

    const hashed = await hashOtp(secret, code)
    if (hashed !== signed.codeHash) {
      // Re-issue draft with incremented attempts so client can keep trying with same draftId replaced
      const bumped = await issueSignedDraft(secret, {
        email: signed.email,
        formType: signed.formType,
        payload: signed.payload,
        codeHash: signed.codeHash,
        expiresAt: signed.expiresAt,
        attempts: Number(signed.attempts || 0) + 1,
        resends: signed.resends,
        lastSentAt: signed.lastSentAt,
      })
      return json(
        {
          error: 'Invalid verification code.',
          draftId: bumped,
          attemptsRemaining: Math.max(0, 4 - Number(signed.attempts || 0)),
        },
        401,
      )
    }

    const name = String(payload.name || '')
    const email = extractPlainEmail(signed.email)
    const position = String(payload.position || '')
    const positionCode = String(payload.positionCode || '')

    const year = new Date().getUTCFullYear()
    const n = crypto.getRandomValues(new Uint32Array(1))[0] % 900000
    const applicationId = 'OPERAVA-APP-' + year + '-' + String(100000 + n).padStart(6, '0')

    const sessionExpiresAt = Date.now() + 24 * 60 * 60 * 1000
    const sessionBody = JSON.stringify({
      v: 1,
      purpose: 'RECRUITMENT_VERIFIED_SESSION',
      email,
      name,
      position,
      positionCode,
      applicationId,
      emailVerifiedAt: new Date().toISOString(),
      expiresAt: sessionExpiresAt,
    })
    const sessionPayload = b64urlEncode(sessionBody)
    const sessionSig = await hmacSign(secret, sessionPayload)
    const sessionToken = 'rs1.' + sessionPayload + '.' + sessionSig

    return json({
      ok: true,
      emailVerified: true,
      applicationId,
      name,
      email,
      position,
      positionCode,
      sessionToken,
      expiresAt: sessionExpiresAt,
    })
  } catch (err) {
    console.error('recruitment email-verify failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to verify this code.' }, 500)
  }
}
