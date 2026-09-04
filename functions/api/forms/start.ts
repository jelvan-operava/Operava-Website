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
  OTP_RESEND_FROM,
  type FormEnv,
  type FormType,
} from '../../lib/formCore'

const TYPES = new Set(['SERVICES', 'CAREERS', 'CONTACT'])

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

async function issueSignedDraft(
  secret: string,
  data: {
    email: string
    formType: FormType
    payload: string
    codeHash: string
    expiresAt: number
    attempts?: number
    resends?: number
    lastSentAt?: number
  },
): Promise<string> {
  const body = JSON.stringify({
    email: data.email,
    formType: data.formType,
    payload: data.payload,
    codeHash: data.codeHash,
    expiresAt: data.expiresAt,
    attempts: data.attempts || 0,
    resends: data.resends || 0,
    lastSentAt: data.lastSentAt || Date.now(),
  })
  const payload = b64url(body)
  const sig = await hmacSign(secret, payload)
  return `s1.${payload}.${sig}`
}

export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
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

    const now = Date.now()
    const code = generateOtp()
    const codeHash = await hashOtp(secret, code)
    const payload = JSON.stringify({ ...body, name, email, formType })
    const expiresAt = now + 10 * 60 * 1000

    let draftId = await issueSignedDraft(secret, {
      email,
      formType,
      payload,
      codeHash,
      expiresAt,
      attempts: 0,
      resends: 0,
      lastSentAt: now,
    })

    if (env.SUBMISSIONS_DB) {
      try {
        await ensureTables(env.SUBMISSIONS_DB)
        const existing = await env.SUBMISSIONS_DB.prepare(
          'SELECT last_sent_at FROM form_otps WHERE email = ? AND form_type = ? AND consumed = 0 ORDER BY id DESC LIMIT 1',
        )
          .bind(email, formType)
          .first<{ last_sent_at: number }>()
        if (existing && now - Number(existing.last_sent_at) < 45000) {
          return json({ error: 'Please wait before requesting another code.', retryAfterSec: 45 }, 429)
        }
        const dbDraftId = crypto.randomUUID()
        await env.SUBMISSIONS_DB.prepare(
          'UPDATE form_otps SET consumed = 1 WHERE email = ? AND form_type = ? AND consumed = 0',
        )
          .bind(email, formType)
          .run()
        await env.SUBMISSIONS_DB.prepare(
          `INSERT INTO form_otps (email, form_type, draft_id, code_hash, payload, expires_at, attempts, resends, last_sent_at, consumed)
           VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, 0)`,
        )
          .bind(email, formType, dbDraftId, codeHash, payload, expiresAt, now)
          .run()
      } catch {
        console.error('D1 optional path failed; continuing with signed draft')
      }
    }

    await sendResend(env, {
      from: OTP_RESEND_FROM,
      to: [email],
      subject: 'Operava Notification',
      html: otpEmailHtml(name, purposeLabel(formType), code),
      text: otpEmailText(name, purposeLabel(formType), code),
    })

    return json({ ok: true, draftId, maskedEmail: maskEmail(email), expiresInSec: 600 })
  } catch (err) {
    console.error('form start failed', err)
    return json({ error: 'Unable to start verification.' }, 500)
  }
}
