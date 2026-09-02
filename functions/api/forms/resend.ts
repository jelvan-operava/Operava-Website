import {
  ensureTables,
  generateOtp,
  hashOtp,
  json,
  otpEmailHtml,
  otpEmailText,
  purposeLabel,
  sendResend,
  type FormEnv,
  type FormType,
} from '../../lib/formCore'

export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    if (!env.SUBMISSIONS_DB) return json({ error: 'Submissions database is not bound.' }, 503)
    const secret = env.OTP_SECRET || env.RESEND_API_KEY || ''
    const body = (await request.json()) as { draftId?: string }
    const draftId = String(body.draftId || '')
    if (!draftId) return json({ error: 'Missing draft.' }, 400)
    await ensureTables(env.SUBMISSIONS_DB)
    const row = await env.SUBMISSIONS_DB.prepare(
      'SELECT email, form_type, payload, last_sent_at, resends, consumed FROM form_otps WHERE draft_id = ?'
    ).bind(draftId).first<{ email: string; form_type: FormType; payload: string; last_sent_at: number; resends: number; consumed: number }>()
    if (!row || row.consumed) return json({ error: 'Start the form again.' }, 400)
    const now = Date.now()
    if (now - Number(row.last_sent_at) < 45000) return json({ error: 'Please wait before resending.', retryAfterSec: 45 }, 429)
    if (Number(row.resends) >= 5) return json({ error: 'Resend limit reached.' }, 429)
    const payload = JSON.parse(row.payload || '{}') as { name?: string }
    const code = generateOtp()
    await env.SUBMISSIONS_DB.prepare(
      'UPDATE form_otps SET code_hash = ?, expires_at = ?, attempts = 0, resends = resends + 1, last_sent_at = ? WHERE draft_id = ?'
    ).bind(await hashOtp(secret, code), now + 10 * 60 * 1000, now, draftId).run()
    await sendResend(env, {
      to: [row.email],
      subject: 'Verification Code',
      html: otpEmailHtml(payload.name || 'there', purposeLabel(row.form_type), code),
      text: otpEmailText(payload.name || 'there', purposeLabel(row.form_type), code),
    })
    return json({ ok: true })
  } catch {
    return json({ error: 'Unable to resend the code.' }, 500)
  }
}
