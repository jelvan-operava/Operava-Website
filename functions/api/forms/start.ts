import {
  EMAIL_RE,
  clean,
  ensureTables,
  generateOtp,
  hashOtp,
  json,
  maskEmail,
  otpEmailHtml,
  otpEmailText,
  purposeLabel,
  sendResend,
  resolveSecret,
  isProductionRuntime,
  issueSignedDraft,
  type FormEnv,
  type FormType,
} from '../../lib/formCore'

const TYPES = new Set(['SERVICES', 'CAREERS', 'CONTACT'])

export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    if (!env.RESEND_API_KEY) {
      if (isProductionRuntime()) {
        return json({ error: 'Email delivery is not configured. Please contact hello@operavaglobal.com.' }, 503)
      }
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

    const formType = clean(body.formType, 20).toUpperCase() as FormType
    if (!TYPES.has(formType)) return json({ error: 'Unknown form type.' }, 400)

    const name = clean(body.name, 120)
    const email = clean(body.email, 180).toLowerCase()
    if (name.length < 2) return json({ error: 'Full name is required.' }, 400)
    if (!EMAIL_RE.test(email)) return json({ error: 'A valid email is required.' }, 400)
    if (body.accurate !== true || body.privacy !== true) {
      return json({ error: 'Required confirmations are missing.' }, 400)
    }
    if (formType === 'SERVICES' && clean(body.description, 4000).length < 15) {
      return json({ error: 'Project description is required.' }, 400)
    }
    if (formType === 'CAREERS' && !clean(body.position, 180)) {
      return json({ error: 'Position applying for is required.' }, 400)
    }
    if (formType === 'CONTACT' && clean(body.message || body.description, 4000).length < 10) {
      return json({ error: 'Message is required.' }, 400)
    }

    const now = Date.now()
    const code = generateOtp()
    const codeHash = await hashOtp(secret, code)
    const payload = JSON.stringify({ ...body, name, email, formType })
    const expiresAt = now + 10 * 60 * 1000

    const draftId = await issueSignedDraft(secret, {
      email,
      formType,
      payload,
      codeHash,
      expiresAt,
      attempts: 0,
      resends: 0,
      lastSentAt: now,
    })

    // Optional D1 rate-limit / audit (signed draft is primary)
    if (env.SUBMISSIONS_DB) {
      try {
        await ensureTables(env.SUBMISSIONS_DB)
        const existing = await env.SUBMISSIONS_DB.prepare(
          'SELECT last_sent_at FROM form_otps WHERE email = ? AND form_type = ? AND consumed = 0 ORDER BY id DESC LIMIT 1',
        )
          .bind(email, formType)
          .first<{ last_sent_at: number }>()
        if (existing && now - Number(existing.last_sent_at) < 45000) {
          return json({ error: 'Please wait before requesting another code.', retryAfterSec: 45 }, 429)
        }
        const dbDraftId = crypto.randomUUID()
        await env.SUBMISSIONS_DB.prepare(
          'UPDATE form_otps SET consumed = 1 WHERE email = ? AND form_type = ? AND consumed = 0',
        )
          .bind(email, formType)
          .run()
        await env.SUBMISSIONS_DB.prepare(
          'INSERT INTO form_otps (email, form_type, draft_id, code_hash, payload, expires_at, attempts, resends, last_sent_at, consumed) VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, 0)',
        )
          .bind(email, formType, dbDraftId, codeHash, payload, expiresAt, now)
          .run()
      } catch (d1Err) {
        console.error('D1 optional path failed; continuing with signed draft', d1Err)
      }
    }

    if (env.RESEND_API_KEY) {
      try {
        await sendResend(env, {
          from: env.RESEND_FROM || 'OPERAVA <notification@operavaglobal.com>',
          to: [email],
          subject: 'Verification Code',
          html: otpEmailHtml(name, purposeLabel(formType), code),
          text: otpEmailText(name, purposeLabel(formType), code),
        })
      } catch (mailErr) {
        console.error('OTP email send failed', mailErr)
        const detail = mailErr instanceof Error ? mailErr.message : String(mailErr)
        return json(
          {
            error:
              'Unable to send verification email right now. Please try again in a moment, or contact hello@operavaglobal.com.',
            detail,
          },
          502,
        )
      }
    } else {
      console.warn('[DEV] RESEND_API_KEY missing. OTP for ' + email + ': ' + code)
    }

    return json({
      ok: true,
      draftId,
      maskedEmail: maskEmail(email),
      expiresInSec: 600,
      ...(!isProductionRuntime() && !env.RESEND_API_KEY ? { devCode: code } : {}),
    })
  } catch (err) {
    console.error('form start failed', err)
    const detail = err instanceof Error ? err.message : String(err)
    return json({ error: 'Unable to start verification.', detail }, 500)
  }
}
