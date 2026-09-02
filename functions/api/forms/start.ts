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
  type FormEnv,
  type FormType,
} from '../../lib/formCore'

const TYPES = new Set(['SERVICES', 'CAREERS', 'CONTACT'])

export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    if (!env.SUBMISSIONS_DB) return json({ error: 'Submissions database is not bound.' }, 503)
    if (!env.RESEND_API_KEY) return json({ error: 'Email delivery is not configured.' }, 503)
    const secret = env.OTP_SECRET || env.RESEND_API_KEY
    const body = (await request.json()) as Record<string, unknown>
    if (clean(body.website, 80)) return json({ ok: true, draftId: 'filtered', maskedEmail: 'hidden' })

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

    await ensureTables(env.SUBMISSIONS_DB)
    const now = Date.now()
    const existing = await env.SUBMISSIONS_DB.prepare(
      'SELECT draft_id, last_sent_at, resends FROM form_otps WHERE email = ? AND form_type = ? AND consumed = 0 ORDER BY id DESC LIMIT 1'
    ).bind(email, formType).first<{ draft_id: string; last_sent_at: number; resends: number }>()
    if (existing && now - Number(existing.last_sent_at) < 45000) {
      return json({ error: 'Please wait before requesting another code.', retryAfterSec: 45 }, 429)
    }

    const code = generateOtp()
    const draftId = crypto.randomUUID()
    const payload = JSON.stringify({ ...body, name, email, formType })
    await env.SUBMISSIONS_DB.prepare(
      'UPDATE form_otps SET consumed = 1 WHERE email = ? AND form_type = ? AND consumed = 0'
    ).bind(email, formType).run()
    await env.SUBMISSIONS_DB.prepare(
      `INSERT INTO form_otps (email, form_type, draft_id, code_hash, payload, expires_at, attempts, resends, last_sent_at, consumed)
       VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, 0)`
    ).bind(email, formType, draftId, await hashOtp(secret, code), payload, now + 10 * 60 * 1000, now).run()

    await sendResend(env, {
      to: [email],
      subject: 'Your OPERAVA verification code',
      html: otpEmailHtml(name, purposeLabel(formType), code),
      text: otpEmailText(name, purposeLabel(formType), code),
    })

    return json({ ok: true, draftId, maskedEmail: maskEmail(email), expiresInSec: 600 })
  } catch (err) {
    console.error('form start failed')
    return json({ error: 'Unable to start verification.' }, 500)
  }
}
