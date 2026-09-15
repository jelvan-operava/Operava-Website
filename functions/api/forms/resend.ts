import {
  generateOtp,
  hashOtp,
  json,
  otpEmailHtml,
  otpEmailText,
  purposeLabel,
  sendResend,
  resolveSecret,
  OTP_RESEND_FROM,
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
    if (!env.RESEND_API_KEY && process.env.NODE_ENV === 'production') {
      return json({ error: 'Email delivery is not configured.' }, 503)
    }
    const secret = resolveSecret(env)
    const body = (await request.json()) as { draftId?: string }
    const draftId = String(body.draftId || '')
    if (!draftId) return json({ error: 'Missing draft.' }, 400)

    const signed = await readSignedDraft(secret, draftId)
    if (!signed) return json({ error: 'Start the form again.' }, 400)
    const now = Date.now()
    if (now - Number(signed.lastSentAt) < 45000) {
      return json({ error: 'Please wait before resending.', retryAfterSec: 45 }, 429)
    }
    if (Number(signed.resends) >= 5) return json({ error: 'Resend limit reached.' }, 429)

    const payloadObj = JSON.parse(signed.payload || '{}') as { name?: string }
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

    if (env.RESEND_API_KEY) {
      await sendResend(env, {
        from: 'Operava Notification <notification-noreply@operavaglobal.com>',
        to: [signed.email],
        subject: 'Verification Code',
        html: otpEmailHtml(payloadObj.name || 'there', purposeLabel(signed.formType), code),
        text: otpEmailText(payloadObj.name || 'there', purposeLabel(signed.formType), code),
      })
    } else {
      console.warn(`[DEV MODE] RESEND_API_KEY not configured. Resent verification code for ${signed.email}: ${code}`)
    }

    return json({
      ok: true,
      draftId: newDraftId,
      ...(process.env.NODE_ENV !== 'production' && !env.RESEND_API_KEY ? { devCode: code } : {}),
    })
  } catch {
    return json({ error: 'Unable to resend the code.' }, 500)
  }
}
