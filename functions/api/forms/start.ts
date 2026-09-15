import {
  EMAIL_RE,
  clean,
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

    // Build email content first so template errors surface clearly
    let html = ''
    let text = ''
    try {
      html = otpEmailHtml(name, purposeLabel(formType), code)
      text = otpEmailText(name, purposeLabel(formType), code)
    } catch (tplErr) {
      const detail = tplErr instanceof Error ? tplErr.message : String(tplErr)
      return json({ error: 'Unable to build verification email.', detail }, 500)
    }

    if (env.RESEND_API_KEY) {
      try {
        await sendResend(env, {
          from: env.RESEND_FROM || 'OPERAVA <notification@operavaglobal.com>',
          to: [email],
          subject: 'Verification Code',
          html,
          text,
        })
      } catch (mailErr) {
        console.error('OTP email send failed', mailErr)
        const detail = mailErr instanceof Error ? mailErr.message : String(mailErr)
        return json(
          {
            error:
              'Unable to send verification email right now. Please try again in a moment, or contact hello@operavaglobal.com.',
            detail,
            draftId,
            maskedEmail: maskEmail(email),
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
