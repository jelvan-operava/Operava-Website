import {
  ensureTables,
  escapeHtml,
  hashOtp,
  inboxFor,
  json,
  makeReference,
  sendResend,
  type FormEnv,
  type FormType,
} from '../../lib/formCore'

export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    if (!env.SUBMISSIONS_DB) return json({ error: 'Submissions database is not bound.' }, 503)
    const secret = env.OTP_SECRET || env.RESEND_API_KEY || ''
    const body = (await request.json()) as { draftId?: string; code?: string }
    const draftId = String(body.draftId || '')
    const code = String(body.code || '').replace(/\D/g, '')
    if (!draftId || code.length !== 6) return json({ error: 'Enter the 6-digit code.' }, 400)
    await ensureTables(env.SUBMISSIONS_DB)
    const row = await env.SUBMISSIONS_DB.prepare(
      'SELECT email, form_type, payload, code_hash, expires_at, attempts, consumed FROM form_otps WHERE draft_id = ?'
    ).bind(draftId).first<{
      email: string
      form_type: FormType
      payload: string
      code_hash: string
      expires_at: number
      attempts: number
      consumed: number
    }>()
    if (!row || row.consumed) return json({ error: 'This code is no longer valid.' }, 400)
    if (Date.now() > Number(row.expires_at)) return json({ error: 'This code has expired.' }, 400)
    if (Number(row.attempts) >= 5) return json({ error: 'Too many attempts. Request a new code.' }, 429)
    const hashed = await hashOtp(secret, code)
    if (hashed !== row.code_hash) {
      await env.SUBMISSIONS_DB.prepare('UPDATE form_otps SET attempts = attempts + 1 WHERE draft_id = ?').bind(draftId).run()
      return json({ error: 'Invalid verification code.' }, 401)
    }

    const payload = JSON.parse(row.payload || '{}') as Record<string, unknown>
    const name = String(payload.name || '')
    const referenceId = makeReference(row.form_type)
    const nowIso = new Date().toISOString()
    await env.SUBMISSIONS_DB.prepare(
      `INSERT INTO form_submissions (reference_id, form_type, name, email, payload, verification_status, status, resume_key, created_at, verified_at)
       VALUES (?, ?, ?, ?, ?, 'VERIFIED', 'VERIFIED', ?, ?, ?)`
    ).bind(referenceId, row.form_type, name, row.email, row.payload, String(payload.resumeKey || ''), nowIso, nowIso).run()
    await env.SUBMISSIONS_DB.prepare('UPDATE form_otps SET consumed = 1 WHERE draft_id = ?').bind(draftId).run()

    const details = Object.entries(payload)
      .filter(([key]) => !['website', 'accurate', 'privacy', 'formType'].includes(key))
      .map(([key, value]) => `<tr><td style="padding:6px 0;color:#5b5270">${escapeHtml(key)}</td><td style="padding:6px 0">${escapeHtml(String(value ?? ''))}</td></tr>`)
      .join('')

    await sendResend(env, {
      to: [row.email],
      subject: `Submission received · ${referenceId}`,
      html: `<p>Thank you, ${escapeHtml(name)}.</p><p>Your ${row.form_type.toLowerCase()} submission is verified.</p><p>Reference ID: <strong>${escapeHtml(referenceId)}</strong></p>`,
      text: `Thank you, ${name}. Reference ID: ${referenceId}`,
    })
    await sendResend(env, {
      to: inboxFor(row.form_type, env),
      subject: `${row.form_type} submission ${referenceId}`,
      html: `<p>Submission Type: ${row.form_type}</p><p>Reference ID: ${escapeHtml(referenceId)}</p><p>Verified Email: ${escapeHtml(row.email)}</p><p>Submitted: ${escapeHtml(nowIso)}</p><table>${details}</table>`,
      text: `${row.form_type} ${referenceId} from ${row.email}`,
    })

    return json({ ok: true, referenceId, formType: row.form_type, name })
  } catch {
    return json({ error: 'Unable to verify this code.' }, 500)
  }
}
