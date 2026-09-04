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

function confirmationHtml(
  formType: FormType,
  name: string,
  email: string,
  referenceId: string,
  detailsRows: string,
): string {
  const isCareer = formType === 'CAREERS'
  const headline = isCareer
    ? 'Your career application is registered.'
    : formType === 'SERVICES'
      ? 'Your service inquiry is registered.'
      : 'Your message is registered.'
  const timing = isCareer
    ? 'Talent review typically starts within 24–48 hours. Keep this reference number for follow-up.'
    : 'Our team will review your request and connect with you within 2 business hours where possible.'
  const footer = isCareer ? 'OPERAVA Global Solutions · Careers' : 'OPERAVA Global Solutions · We Operate in Advance'

  return `
      <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;color:#1c1333;">
        <p style="margin:0 0 4px;color:#6d28d9;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">OPERAVA submission confirmation</p>
        <h2 style="margin:0 0 8px;">Thank you, ${escapeHtml(name)}.</h2>
        <p style="margin:0 0 16px;color:#5b5270;line-height:1.5;">
          ${escapeHtml(headline)} Reference <strong>#${escapeHtml(referenceId)}</strong>.
          ${escapeHtml(timing)}
        </p>
        <p style="margin:0 0 16px;color:#5b5270;font-size:13px;">Confirmation sent to ${escapeHtml(email)}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${detailsRows}</table>
        <p style="margin:24px 0 0;color:#8a8298;font-size:12px;">${escapeHtml(footer)}</p>
      </div>`
}

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
      'SELECT email, form_type, payload, code_hash, expires_at, attempts, consumed FROM form_otps WHERE draft_id = ?',
    )
      .bind(draftId)
      .first<{
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
       VALUES (?, ?, ?, ?, ?, 'VERIFIED', 'VERIFIED', ?, ?, ?)`,
    )
      .bind(referenceId, row.form_type, name, row.email, row.payload, String(payload.resumeKey || ''), nowIso, nowIso)
      .run()
    await env.SUBMISSIONS_DB.prepare('UPDATE form_otps SET consumed = 1 WHERE draft_id = ?').bind(draftId).run()

    const skipKeys = new Set(['website', 'accurate', 'privacy', 'formType', 'resumeKey'])
    const detailsRows = Object.entries(payload)
      .filter(([key]) => !skipKeys.has(key))
      .map(
        ([key, value]) =>
          `<tr><td style="padding:6px 0;color:#5b5270;width:160px;vertical-align:top;">${escapeHtml(key)}</td><td style="padding:6px 0;color:#1c1333;">${escapeHtml(String(value ?? '')).replace(/\n/g, '<br/>')}</td></tr>`,
      )
      .join('')

    const staffInboxes = inboxFor(row.form_type, env).filter((addr) => addr && addr.toLowerCase() !== row.email.toLowerCase())
    const replyTo = staffInboxes[0] || env.CLIENT_INBOX || 'hello@operavaglobal.com'
    const isCareer = row.form_type === 'CAREERS'
    const subject = isCareer
      ? `Ticket #${referenceId} — career application received`
      : row.form_type === 'SERVICES'
        ? `Ticket #${referenceId} — service inquiry received`
        : `Ticket #${referenceId} — contact message received`

    // 1) Submitter confirmation (staff CC so the same ticket sits in our mailbox)
    await sendResend(env, {
      to: [row.email],
      cc: staffInboxes.length ? staffInboxes : undefined,
      reply_to: replyTo,
      subject,
      html: confirmationHtml(row.form_type, name, row.email, referenceId, detailsRows),
      text: [
        `Thank you, ${name}.`,
        `Reference ID: ${referenceId}`,
        isCareer
          ? 'Your career application was received. Talent review typically starts within 24-48 hours.'
          : 'Your inquiry was received. Our team will review and connect within 2 business hours where possible.',
        `Email on file: ${row.email}`,
      ].join('\n'),
    })

    // 2) Explicit staff notification with full payload (in case CC is filtered)
    if (staffInboxes.length) {
      await sendResend(env, {
        to: staffInboxes,
        subject: `${row.form_type} submission ${referenceId}`,
        html: `<p>Submission Type: ${escapeHtml(row.form_type)}</p><p>Reference ID: ${escapeHtml(referenceId)}</p><p>Verified Email: ${escapeHtml(row.email)}</p><p>Submitted: ${escapeHtml(nowIso)}</p><table style="width:100%;border-collapse:collapse;font-size:14px;">${detailsRows}</table>`,
        text: `${row.form_type} ${referenceId} from ${row.email}`,
      })
    }

    return json({ ok: true, referenceId, formType: row.form_type, name })
  } catch {
    return json({ error: 'Unable to verify this code.' }, 500)
  }
}
