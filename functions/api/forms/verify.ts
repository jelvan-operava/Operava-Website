import {
  applicantConfirmationEmail,
  clientConfirmationEmail,
  ensureTables,
  otpCodeMatches,
  json,
  makeReference,
  sendResend,
  resolveSecret,
  otpSecretMissingResponse,
  readSignedDraft,
  issueSignedDraft,
  staffNotificationEmail,
  senderFor,
  extractPlainEmail,
  ACADEMY_INBOX_DEFAULT,
  type FormEnv,
  type FormType,
} from '../../lib/formCore'
import {
  backupFormSubmissionToMega,
  type MegaBackupEnv,
} from '../../lib/megaBackupHook'
import { getResumeByKey, mergeResumeIntoPayload, ensureResumeTables } from '../../lib/resumeDb'

type Env = FormEnv & MegaBackupEnv

const LABEL_MAP: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  company: 'Company',
  phone: 'Phone',
  country: 'Country / Location',
  category: 'Inquiry Type',
  service: 'Program / Track',
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
  const skip = new Set([
    'website',
    'accurate',
    'privacy',
    'formType',
    'resumeKey',
    'resumeText',
    'resumeDataMandatory',
  ])
  return Object.entries(payload)
    .filter(([key, value]) => !skip.has(key) && value != null && String(value).trim() !== '')
    .map(([key, value]) => ({
      label: LABEL_MAP[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
      value: typeof value === 'object' ? JSON.stringify(value) : String(value),
    }))
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context
  try {
    if (!env.RESEND_API_KEY || String(env.RESEND_API_KEY).trim().length < 8) {
      return json({ error: 'Email delivery is not configured.' }, 503)
    }
    const secret = resolveSecret(env)
    if (!secret) return otpSecretMissingResponse()

    let body: { draftId?: string; code?: string }
    try {
      body = (await request.json()) as { draftId?: string; code?: string }
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }
    const draftId = String(body.draftId || '').trim()
    const code = String(body.code || '').replace(/\D/g, '').slice(0, 6)
    if (!draftId || code.length !== 6) return json({ error: 'Enter the 6-digit code.' }, 400)

    const signed = await readSignedDraft(secret, draftId)
    if (!signed) return json({ error: 'This code is no longer valid. Start the form again.' }, 400)
    if (Date.now() > Number(signed.expiresAt)) return json({ error: 'This code has expired.' }, 400)
    if (Number(signed.attempts) >= 5) return json({ error: 'Too many attempts. Request a new code.' }, 429)

    if (!(await otpCodeMatches(secret, code, String(signed.codeHash || '')))) {
      const bumped = await issueSignedDraft(secret, {
        email: signed.email,
        formType: signed.formType,
        payload: signed.payload,
        codeHash: signed.codeHash,
        expiresAt: signed.expiresAt,
        attempts: Number(signed.attempts || 0) + 1,
        resends: signed.resends,
        lastSentAt: signed.lastSentAt,
      })
      return json(
        {
          error: 'Invalid verification code.',
          draftId: bumped,
          attemptsRemaining: Math.max(0, 4 - Number(signed.attempts || 0)),
        },
        401,
      )
    }

    let payload: Record<string, unknown> = {}
    try {
      payload = JSON.parse(signed.payload || '{}') as Record<string, unknown>
    } catch {
      payload = {}
    }

    const resumeKey = String(payload.resumeKey || '').trim()
    if (resumeKey && env.SUBMISSIONS_DB) {
      try {
        const resume = await getResumeByKey(env.SUBMISSIONS_DB, resumeKey)
        payload = mergeResumeIntoPayload(payload, resume)
      } catch (resumeErr) {
        console.error('resume merge failed', resumeErr instanceof Error ? resumeErr.message : 'unknown')
      }
    }

    const name = String(payload.name || '')
    const email = extractPlainEmail(signed.email)
    const formType = signed.formType as FormType
    const referenceId = makeReference(formType)
    const nowIso = new Date().toISOString()
    const payloadJson = JSON.stringify(payload)

    if (env.SUBMISSIONS_DB) {
      try {
        await ensureTables(env.SUBMISSIONS_DB)
        await ensureResumeTables(env.SUBMISSIONS_DB)
        await env.SUBMISSIONS_DB.prepare(
          "INSERT INTO form_submissions (reference_id, form_type, name, email, payload, verification_status, status, resume_key, created_at, verified_at) VALUES (?, ?, ?, ?, ?, 'VERIFIED', 'VERIFIED', ?, ?, ?)",
        )
          .bind(referenceId, formType, name, email, payloadJson, resumeKey, nowIso, nowIso)
          .run()

        // Best-effort: also set resume_text / resume_parsed columns when present
        if (payload.resumeText) {
          try {
            await env.SUBMISSIONS_DB.prepare(
              'UPDATE form_submissions SET resume_text = ?, resume_parsed = ? WHERE reference_id = ?',
            )
              .bind(
                String(payload.resumeText).slice(0, 200000),
                JSON.stringify(payload.resumeDataMandatory || {}),
                referenceId,
              )
              .run()
          } catch {
            /* columns may not exist yet */
          }
        }
      } catch {
        console.error('D1 insert optional failed')
      }
    }

    const megaTask = backupFormSubmissionToMega(env, {
      formType,
      referenceId,
      name,
      email,
      payload,
      verifiedAt: nowIso,
    })
    try {
      const ctx = context as { waitUntil?: (p: Promise<unknown>) => void }
      if (typeof ctx.waitUntil === 'function') ctx.waitUntil(megaTask)
      else void megaTask
    } catch {
      void megaTask
    }

    const rows = payloadRows(payload)
    const isCareer = formType === 'CAREERS'
    const isAcademy = formType === 'ACADEMY'

    const subject = isCareer
      ? 'WE RECEIVED YOUR APPLICATION'
      : isAcademy
        ? 'WE RECEIVED YOUR ACADEMY INQUIRY'
        : 'WE RECEIVED YOUR INQUIRY'

    const html = isCareer
      ? applicantConfirmationEmail({
          name,
          email,
          referenceId,
          sourceLabel: 'Careers application form',
          rows,
        })
      : clientConfirmationEmail({
          name,
          email,
          referenceId,
          sourceLabel: isAcademy
            ? 'OPERAVA Academy enrollment / inquiry form'
            : formType === 'SERVICES'
              ? 'Services / Request a Quote form'
              : 'Contact form',
          rows,
        })

    const text = isCareer
      ? 'CONFIRMATION\n\nHi ' +
        name +
        ',\n\nThank you for contacting OPERAVA and for your interest in our opportunities.\n\nWe confirm that we have received your application. Reference: ' +
        referenceId +
        '.\n\nYour application will be reviewed by the appropriate team.\n\nRegards,\nTalent Acquisition Team\nOPERAVA Global Solutions\n\nwww.operavaglobal.com'
      : isAcademy
        ? 'CONFIRMATION\n\nHi ' +
          name +
          ',\n\nThank you for contacting OPERAVA Academy.\n\nWe confirm that we have received your course/training enrollment or details inquiry. Reference: ' +
          referenceId +
          '.\n\nThe Academy team will review your request. Learning Management System: https://academy.operavaglobal.com\n\nRegards,\nOPERAVA Academy\nOPERAVA Global Solutions\n\nwww.operavaglobal.com'
        : 'CONFIRMATION\n\nHi ' +
          name +
          ',\n\nThank you for contacting OPERAVA and for your interest in our services and business solutions.\n\nWe confirm that we have received your service inquiry. Reference: ' +
          referenceId +
          '.\n\nYour service inquiry will be reviewed by the appropriate OPERAVA team.\n\nRegards,\nClient Support Team\nOPERAVA Global Solutions\n\nwww.operavaglobal.com'

    const staffInbox = isCareer
      ? env.TALENT_INBOX || 'talents@operavaglobal.com'
      : isAcademy
        ? env.ACADEMY_INBOX || ACADEMY_INBOX_DEFAULT
        : env.CLIENT_INBOX || 'hello@operavaglobal.com'

    const staffSubject = isCareer
      ? 'New application — ' + referenceId
      : isAcademy
        ? 'New Academy enrollment / inquiry — ' + referenceId
        : 'New inquiry — ' + referenceId

    const staffHtml = staffNotificationEmail({
      formType,
      referenceId,
      email,
      submittedAt: nowIso,
      rows,
    })

    const staffText =
      (isCareer ? 'APPLICATION' : isAcademy ? 'ACADEMY' : 'INQUIRY') +
      ' received\nReference: ' +
      referenceId +
      '\nFrom: ' +
      name +
      ' <' +
      email +
      '>\n\nReply to this message to contact the ' +
      (isCareer ? 'applicant' : isAcademy ? 'learner' : 'customer') +
      ' directly.\n'

    let emailWarning: string | undefined
    const from = senderFor(formType, env)

    try {
      await sendResend(env, {
        from,
        to: [email],
        ...(isAcademy ? { bcc: [env.ACADEMY_INBOX || ACADEMY_INBOX_DEFAULT] } : {}),
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
