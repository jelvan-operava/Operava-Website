import {
  applicantConfirmationEmail,
  APPLICANT_CONFIRMATION_FROM,
  CLIENT_RESEND_FROM,
  clientConfirmationEmail,
  ensureTables,
  hashOtp,
  inboxFor,
  json,
  makeReference,
  sendResend,
  senderFor,
  resolveSecret,
  staffNotificationEmail,
  TALENT_RESEND_FROM,
  type FormEnv,
  type FormType,
} from '../../lib/formCore'

function b64url(bytes: ArrayBuffer | Uint8Array | string): string {
  let bin: string
  if (typeof bytes === 'string') bin = bytes
  else {
    const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
    bin = String.fromCharCode(...arr)
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromB64url(s: string): string {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad
  return atob(b64)
}

async function hmacSign(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return b64url(sig)
}

async function readSignedDraft(secret: string, draftId: string) {
  if (!draftId.startsWith('s1.')) return null
  const parts = draftId.split('.')
  if (parts.length !== 3) return null
  const [, payload, sig] = parts
  const expected = await hmacSign(secret, payload)
  if (sig !== expected) return null
  try {
    return JSON.parse(fromB64url(payload)) as {
      email: string
      formType: FormType
      payload: string
      codeHash: string
      expiresAt: number
      attempts: number
      resends: number
      lastSentAt: number
    }
  } catch {
    return null
  }
}

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
    if (!env.RESEND_API_KEY && process.env.NODE_ENV === 'production') {
      return json({ error: 'Email delivery is not configured.' }, 503)
    }
    const secret = resolveSecret(env)
    const body = (await request.json()) as { draftId?: string; code?: string }
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

    const payload = JSON.parse(signed.payload || '{}') as Record<string, unknown>
    const name = String(payload.name || '')
    const email = signed.email
    const formType = signed.formType
    const referenceId = makeReference(formType)
    const nowIso = new Date().toISOString()

    if (env.SUBMISSIONS_DB) {
      try {
        await ensureTables(env.SUBMISSIONS_DB)
        await env.SUBMISSIONS_DB.prepare(
          `INSERT INTO form_submissions (reference_id, form_type, name, email, payload, verification_status, status, resume_key, created_at, verified_at)
           VALUES (?, ?, ?, ?, ?, 'VERIFIED', 'VERIFIED', ?, ?, ?)`,
        )
          .bind(referenceId, formType, name, email, signed.payload, String(payload.resumeKey || ''), nowIso, nowIso)
          .run()
      } catch {
        console.error('D1 insert optional failed')
      }
    }

    const rows = payloadRows(payload)
    const isCareer = formType === 'CAREERS'
    const sourceLabel =
      formType === 'SERVICES'
        ? 'Services / Request a Quote form'
        : formType === 'CAREERS'
          ? 'Careers application form'
          : 'Contact form'

    const subject = isCareer ? 'WE RECEIVED YOUR APPLICATION' : 'WE RECEIVED YOUR INQUIRY'

    const html = isCareer
      ? applicantConfirmationEmail({ name, email, referenceId, sourceLabel, rows })
      : clientConfirmationEmail({ name, email, referenceId, sourceLabel, rows })

    const text = isCareer
      ? `CONFIRMATION\n\nHi ${name},\n\nThank you for contacting OPERAVA and for your interest in our opportunities.\n\nWe confirm that we have received your application. Reference: ${referenceId}.\n\nYour application will be reviewed by the appropriate team. If your qualifications match an available position or another suitable opportunity, a member of our Talent Acquisition Team may contact you through your preferred contact method.\n\nRegards,\nTalent Acquisition Team\nOPERAVA Global Solutions\n\nPlease do not reply directly to this automated confirmation. A separate update will be sent by the relevant team for further assistance.\nwww.operavaglobal.com`
      : `CONFIRMATION\n\nHi ${name},\n\nThank you for contacting OPERAVA and for your interest in our services and business solutions.\n\nWe confirm that we have received your service inquiry. Reference: ${referenceId}.\n\nYour service inquiry will be reviewed by the appropriate OPERAVA team. A member of our Business Development, Client Support, or relevant service team may contact you to discuss your requirements.\n\nRegards,\nClient Support Team\nOPERAVA Global Solutions\n\nPlease do not reply directly to this automated confirmation. A separate update will be sent by the relevant team for further assistance.\nwww.operavaglobal.com`

    const bccEmail = isCareer
      ? (env.TALENT_INBOX || 'talents@operavaglobal.com')
      : (env.CLIENT_INBOX || 'hello@operavaglobal.com')

    const bccList = [bccEmail].filter((addr) => addr && addr.toLowerCase() !== email.toLowerCase())

    if (env.RESEND_API_KEY) {
      await sendResend(env, {
        from: 'Operava Notification <notification-noreply@operavaglobal.com>',
        to: [email],
        bcc: bccList.length ? bccList : undefined,
        subject,
        html,
        text,
      })
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn('[DEV MODE] RESEND_API_KEY not configured. Skipping confirmation email delivery in dev mode.')
    } else {
      return json({ error: 'Email delivery is not configured.' }, 503)
    }

    return json({ ok: true, referenceId, formType, name })
  } catch (err) {
    console.error('verify failed', err)
    return json({ error: 'Unable to verify this code.' }, 500)
  }
}
