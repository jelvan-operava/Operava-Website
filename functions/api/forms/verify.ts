import {
  applicantConfirmationEmail,
  clientConfirmationEmail,
  ensureTables,
  hashOtp,
  inboxFor,
  json,
  makeReference,
  sendResend,
  staffNotificationEmail,
  type FormEnv,
  type FormType,
} from '../../lib/formCore'

const LABEL_MAP: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  company: 'Company',
  phone: 'Phone',
  country: 'Country / Location',
  category: 'Category',
  service: 'Service',
  description: 'Description',
  message: 'Message',
  budget: 'Budget',
  websiteUrl: 'Website / System URL',
  contactMethod: 'Preferred contact',
  position: 'Position',
  availability: 'Availability',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  portfolio: 'Portfolio',
  additional: 'Additional notes',
}

function payloadRows(payload: Record<string, unknown>): Array<{ label: string; value: string }> {
  const skip = new Set(['website', 'accurate', 'privacy', 'formType', 'resumeKey'])
  return Object.entries(payload)
    .filter(([key, value]) => !skip.has(key) && value != null && String(value).trim() !== '')
    .map(([key, value]) => ({
      label: LABEL_MAP[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
      value: String(value),
    }))
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

    const rows = payloadRows(payload)
    const staffInboxes = inboxFor(row.form_type, env).filter((addr) => addr && addr.toLowerCase() !== row.email.toLowerCase())
    const replyTo = staffInboxes[0] || env.CLIENT_INBOX || 'hello@operavaglobal.com'
    const isCareer = row.form_type === 'CAREERS'
    const sourceLabel =
      row.form_type === 'SERVICES'
        ? 'Services / Request a Quote form'
        : row.form_type === 'CAREERS'
          ? 'Careers application form'
          : 'Contact form'

    const subject = isCareer
      ? `Ticket #${referenceId} — career application received`
      : row.form_type === 'SERVICES'
        ? `Ticket #${referenceId} — service inquiry received`
        : `Ticket #${referenceId} — contact message received`

    const html = isCareer
      ? applicantConfirmationEmail({ name, email: row.email, referenceId, sourceLabel, rows })
      : clientConfirmationEmail({ name, email: row.email, referenceId, sourceLabel, rows })

    const text = isCareer
      ? `Thank you, ${name}. Your career application is registered under #${referenceId}. Talent review typically starts within 24-48 hours.`
      : `Thank you, ${name}. Your inquiry is registered under #${referenceId}. Our team will review and connect within 2 business hours where possible.`

    // 1) Professional confirmation to client or applicant + staff CC
    await sendResend(env, {
      to: [row.email],
      cc: staffInboxes.length ? staffInboxes : undefined,
      reply_to: replyTo,
      subject,
      html,
      text,
    })

    // 2) Staff notification (full payload)
    if (staffInboxes.length) {
      await sendResend(env, {
        to: staffInboxes,
        subject: `${row.form_type} submission ${referenceId}`,
        html: staffNotificationEmail({
          formType: row.form_type,
          referenceId,
          email: row.email,
          submittedAt: nowIso,
          rows,
        }),
        text: `${row.form_type} ${referenceId} from ${row.email}`,
      })
    }

    return json({ ok: true, referenceId, formType: row.form_type, name })
  } catch {
    return json({ error: 'Unable to verify this code.' }, 500)
  }
}
