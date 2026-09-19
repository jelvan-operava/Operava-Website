import { b64urlDecode, hmacSign, resolveSecret, type FormEnv } from './formCore'

export interface VerifiedRecruitmentSession {
  v: number
  purpose: string
  email: string
  name: string
  position: string
  positionCode: string
  applicationId: string
  emailVerifiedAt: string
  expiresAt: number
}

export async function readVerifiedSession(
  env: FormEnv,
  token: string,
): Promise<VerifiedRecruitmentSession | null> {
  if (!token || !token.startsWith('rs1.')) return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const payload = parts[1]
  const sig = parts[2]
  const secret = resolveSecret(env)
  const expected = await hmacSign(secret, payload)
  if (sig !== expected) return null
  try {
    const data = JSON.parse(b64urlDecode(payload)) as VerifiedRecruitmentSession
    if (data.purpose !== 'RECRUITMENT_VERIFIED_SESSION') return null
    if (Date.now() > Number(data.expiresAt)) return null
    if (!data.applicationId || !data.email) return null
    return data
  } catch {
    return null
  }
}
