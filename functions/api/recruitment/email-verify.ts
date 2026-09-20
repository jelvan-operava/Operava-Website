import {
  json,
  otpCodeMatches,
  resolveSecret,
  otpSecretMissingResponse,
  readSignedDraft,
  issueSignedDraft,
  b64urlEncode,
  hmacSign,
  extractPlainEmail,
  type FormEnv,
} from '../../lib/formCore'
import {
  recruitmentConfigured,
  upsertApplicantOnVerify,
  type RecruitmentEnv,
} from '../../lib/recruitmentDb'
import { backupApplicantToMega, type MegaBackupEnv } from '../../lib/megaBackupHook'

type Env = FormEnv & RecruitmentEnv & MegaBackupEnv

/**
 * POST /api/recruitment/email-verify
 * OTP check aligned with /api/forms/verify (same secret, hash, signed draft).
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context
  try {
    const secret = resolveSecret(env)
    if (!secret) return otpSecretMissingResponse()

    let body: { draftId?: string; code?: string }
    try {
      body = (await request.json()) as { draftId?: string; code?: string }
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }

    const draftId = String(body.draftId || '').trim()
    const code = String(body.code || '').replace(/\D/g, '').slice(0, 6)
    if (!draftId || code.length !== 6) return json({ error: 'Enter the 6-digit code.' }, 400)

    const signed = await readSignedDraft(secret, draftId)
    if (!signed) return json({ error: 'This code is no longer valid. Start verification again.' }, 400)
    if (Date.now() > Number(signed.expiresAt)) return json({ error: 'This code has expired.' }, 400)
    if (Number(signed.attempts) >= 5) {
      return json({ error: 'Too many attempts. Request a new code.' }, 429)
    }

    if (!(await otpCodeMatches(secret, code, String(signed.codeHash || '')))) {
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

    let payload: Record<string, unknown> = {}
    try {
      payload = JSON.parse(signed.payload || '{}') as Record<string, unknown>
    } catch {
      payload = {}
    }
    if (payload.purpose !== 'RECRUITMENT_APPLICATION_EMAIL') {
      return json({ error: 'Invalid recruitment verification session.' }, 400)
    }

    if (!recruitmentConfigured(env)) {
      return json(
        {
          error:
            'Applicant database is not configured. Contact talents@operavaglobal.com.',
        },
        503,
      )
    }

    const name = String(payload.name || '')
    const email = extractPlainEmail(signed.email)
    const position = String(payload.position || '')
    const positionCode = String(payload.positionCode || '')
    const emailVerifiedAt = new Date().toISOString()

    const year = new Date().getUTCFullYear()
    const n = crypto.getRandomValues(new Uint32Array(1))[0] % 900000
    const provisionalId = 'OPERAVA-APP-' + year + '-' + String(100000 + n).padStart(6, '0')

    let applicationId = provisionalId
    try {
      const row = await upsertApplicantOnVerify(env, {
        application_id: provisionalId,
        full_name: name,
        email,
        position_title: position,
        position_code: positionCode,
        email_verified_at: emailVerifiedAt,
      })
      applicationId = row.application_id
    } catch (dbErr) {
      console.error('recruitment upsert failed', dbErr instanceof Error ? dbErr.message : 'unknown')
      return json(
        {
          error:
            'Email verified locally but applicant record could not be saved. Ensure the recruitment schema is applied in Supabase, then try again.',
        },
        502,
      )
    }

    const megaTask = backupApplicantToMega(env, {
      applicationId,
      name,
      email,
      position,
      positionCode,
      emailVerifiedAt,
    })
    try {
      const ctx = context as { waitUntil?: (p: Promise<unknown>) => void }
      if (typeof ctx.waitUntil === 'function') ctx.waitUntil(megaTask)
      else void megaTask
    } catch {
      void megaTask
    }

    const sessionExpiresAt = Date.now() + 24 * 60 * 60 * 1000
    const sessionBody = JSON.stringify({
      v: 1,
      purpose: 'RECRUITMENT_VERIFIED_SESSION',
      email,
      name,
      position,
      positionCode,
      applicationId,
      emailVerifiedAt,
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
      persisted: true,
    })
  } catch (err) {
    console.error('recruitment email-verify failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to verify this code.' }, 500)
  }
}
