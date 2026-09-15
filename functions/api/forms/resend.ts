import {
  generateOtp,
  hashOtp,
  json,
  otpEmailHtml,
  otpEmailText,
  purposeLabel,
  sendResend,
  resolveSecret,
  issueSignedDraft,
  readSignedDraft,
  type FormEnv,
} from '../../lib/formCore'

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
    if (!draftId) return json({ error: 'Missing draft.' }, 400)

    const signed = await readSignedDraft(secret, draftId)
    if (!signed) return json({ error: 'Start the form again.' }, 400)
    const now = Date.now()
    if (now - Number(signed.lastSentAt) < 45000) {
      return json({ error: 'Please wait before resending.', retryAfterSec: 45 }, 429)
    }
    if (Number(signed.resends) >= 5) return json({ error: 'Resend limit reached.' }, 429)

    let payloadObj: { name?: string } = {}
    try {
      payloadObj = JSON.parse(signed.payload || '{}') as { name?: string }
    } catch {
      payloadObj = {}
    }

    // New code invalidates the previous draft (client must use new draftId)
    const code = generateOtp()
    const codeHash = await hashOtp(secret, code)
    const expiresAt = now + 10 * 60 * 1000
    const newDraftId = await issueSignedDraft(secret, {
      email: signed.email,
      formType: signed.formType,
      payload: signed.payload,
      codeHash,
      expiresAt,
      attempts: 0,
      resends: Number(signed.resends) + 1,
      lastSentAt: now,
    })

    try {
      await sendResend(env, {
        from: env.RESEND_FROM || 'Operava <noreply@operavaglobal.com>',
        to: [signed.email],
        subject: 'Verification Code',
        html: otpEmailHtml(payloadObj.name || 'there', purposeLabel(signed.formType), code),
        text: otpEmailText(payloadObj.name || 'there', purposeLabel(signed.formType), code),
      })
    } catch (mailErr) {
      console.error('OTP resend failed', mailErr instanceof Error ? mailErr.message : 'unknown')
      return json(
        {
          error: 'Unable to resend verification email. Please try again shortly.',
        },
        502,
      )
    }

    return json({
      ok: true,
      draftId: newDraftId,
    })
  } catch (err) {
    console.error('form resend failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to resend the code.' }, 500)
  }
}
