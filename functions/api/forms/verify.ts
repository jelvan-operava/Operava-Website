import {
  applicantConfirmationEmail,
  clientConfirmationEmail,
  ensureTables,
  hashOtp,
  json,
  makeReference,
  sendResend,
  resolveSecret,
  readSignedDraft,
  staffNotificationEmail,
  senderFor,
  extractPlainEmail,
  type FormEnv,
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
    if (!env.RESEND_API_KEY || String(env.RESEND_API_KEY).trim().length < 8) {
      return json({ error: 'Email delivery is not configured.' }, 503)
    }
    const secret = resolveSecret(env)
    let body: { draftId?: string; code?: string }
    try {
      body = (await request.json()) as { draftId?: string; code?: string }
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }
    const draftId = String(body.draftId || '')
    const code = String(body.code || '').replace(/\D/g, '')
    if (!draftId || code.length !== 6) return json({ error: 'Enter the 6-digit code.' }, 400)

    const signed = await readSignedDraft(secret, draftId)
    if (!signed) return json({ error: 'This code is no longer valid. Start the form again.' }, 400)
    if (Date.now() > Number(signed.expiresAt)) return json({ error: 'This code has expired.' }, 400)
    if (Number(signed.attempts) >= 5) return json({ error: 'Too many attempts. Request a new code.' }, 429)

    const hashed = await hashOtp(secret, code)
    if (hashed !== signed.codeHash) {
      return json({ error: 'Invalid verification code.' }, 401)
    }

    let payload: Record<string, unknown> = {}
    try {
      payload = JSON.parse(signed.payload || '{}') as Record<string, unknown>
    } catch {
      payload = {}
    }
    const name = String(payload.name || '')
    const email = extractPlainEmail(signed.email)
    const formType = signed.formType
    const referenceId = makeReference(formType)
    const nowIso = new Date().toISOString()

    if (env.SUBMISSIONS_DB) {
      try {
        await ensureTables(env.SUBMISSIONS_DB)
        await env.SUBMISSIONS_DB.prepare(
          "INSERT INTO form_submissions (reference_id, form_type, name, email, payload, verification_status, status, resume_key, created_at, verified_at) VALUES (?, ?, ?, ?, ?, 'VERIFIED', 'VERIFIED', ?, ?, ?)",
        )
          .bind(referenceId, formType, name, email, signed.payload, String(payload.resumeKey || ''), nowIso, nowIso)
          .run()
      } catch {
        console.error('D1 insert optional failed')
      }
    }

    const rows = payloadRows(payload)
    const isCareer = formType === 'CAREERS'

    const subject = isCareer ? 'WE RECEIVED YOUR APPLICATION' : 'WE RECEIVED YOUR INQUIRY'

    const html = isCareer
      ? applicantConfirmationEmail({
          name,
          email,
          referenceId,
          sourceLabel: isCareer ? 'Careers application form' : 'Services form',
          rows,
        })
      : clientConfirmationEmail({
          name,
          email,
          referenceId,
          sourceLabel: formType === 'SERVICES' ? 'Services / Request a Quote form' : 'Contact form',
          rows,
        })

    const text = isCareer
      ? 'CONFIRMATION\n\nHi ' +
        name +
        ',\n\nThank you for contacting OPERAVA and for your interest in our opportunities.\n\nWe confirm that we have received your application. Reference: ' +
        referenceId +
        '.\n\nYour application will be reviewed by the appropriate team.\n\nRegards,\nTalent Acquisition Team\nOPERAVA Global Solutions\n\nwww.operavaglobal.com'
      : 'CONFIRMATION\n\nHi ' +
        name +
        ',\n\nThank you for contacting OPERAVA and for your interest in our services and business solutions.\n\nWe confirm that we have received your service inquiry. Reference: ' +
        referenceId +
        '.\n\nYour service inquiry will be reviewed by the appropriate OPERAVA team.\n\nRegards,\nClient Support Team\nOPERAVA Global Solutions\n\nwww.operavaglobal.com'

    const staffInbox = isCareer
      ? env.TALENT_INBOX || 'talents@operavaglobal.com'
      : env.CLIENT_INBOX || 'hello@operavaglobal.com'

    const staffSubject = isCareer
      ? 'New application — ' + referenceId
      : 'New inquiry — ' + referenceId

    const staffHtml = staffNotificationEmail({
      formType,
      referenceId,
      email,
      submittedAt: nowIso,
      rows,
    })

    const staffText =
      (isCareer ? 'APPLICATION' : 'INQUIRY') +
      ' received\nReference: ' +
      referenceId +
      '\nFrom: ' +
      name +
      ' <' +
      email +
      '>\n\nReply to this message to contact the ' +
      (isCareer ? 'applicant' : 'customer') +
      ' directly.\n'

    let emailWarning: string | undefined
    const from = senderFor(formType, env)

    try {
      await sendResend(env, {
        from,
        to: [email],
        subject,
        html,
        text,
      })
    } catch (mailErr) {
      console.error('confirmation email failed', mailErr instanceof Error ? mailErr.message : 'unknown')
      emailWarning = 'Submission recorded; confirmation email could not be delivered right now.'
    }

    try {
      if (staffInbox.toLowerCase() !== email.toLowerCase()) {
        await sendResend(env, {
          from,
          to: [staffInbox],
          reply_to: email,
          subject: staffSubject,
          html: staffHtml,
          text: staffText,
        })
      }
    } catch (staffErr) {
      console.error('staff notification failed', staffErr instanceof Error ? staffErr.message : 'unknown')
    }

    return json({
      ok: true,
      referenceId,
      formType,
      name,
      ...(emailWarning ? { emailWarning } : {}),
    })
  } catch (err) {
    console.error('verify failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to verify this code.' }, 500)
  }
}
