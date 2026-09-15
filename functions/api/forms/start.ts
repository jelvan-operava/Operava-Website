import {
  EMAIL_RE,
  clean,
  generateOtp,
  hashOtp,
  json,
  maskEmail,
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

    // Step A: OTP generate
    let code = ''
    try {
      code = generateOtp()
    } catch (e) {
      return json({ error: 'stepA generateOtp', detail: String(e) }, 500)
    }

    // Step B: hash
    let codeHash = ''
    try {
      codeHash = await hashOtp(secret, code)
    } catch (e) {
      return json({ error: 'stepB hashOtp', detail: String(e) }, 500)
    }

    const payload = JSON.stringify({ ...body, name, email, formType })
    const expiresAt = Date.now() + 10 * 60 * 1000

    // Step C: signed draft
    let draftId = ''
    try {
      draftId = await issueSignedDraft(secret, {
        email,
        formType,
        payload,
        codeHash,
        expiresAt,
        attempts: 0,
        resends: 0,
        lastSentAt: Date.now(),
      })
    } catch (e) {
      return json({ error: 'stepC issueSignedDraft', detail: String(e) }, 500)
    }

    // Stop here for diagnosis — do not call Resend yet
    return json({
      ok: true,
      debug: true,
      draftId,
      maskedEmail: maskEmail(email),
      codeLen: code.length,
      hashLen: codeHash.length,
      hasResendKey: Boolean(env.RESEND_API_KEY),
      hasResendFrom: Boolean(env.RESEND_FROM),
    })
  } catch (err) {
    console.error('form start failed', err)
    const detail = err instanceof Error ? err.message : String(err)
    return json({ error: 'Unable to start verification.', detail }, 500)
  }
}
