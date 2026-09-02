export type InquiryKind =
  | 'contact'
  | 'service'
  | 'ai-consultation'
  | 'career'
  | 'ai-career'

export interface InquiryPayload {
  kind: InquiryKind
  name: string
  email: string
  company?: string
  phone?: string
  country?: string
  service?: string
  teamModel?: string
  timeline?: string
  role?: string
  notes?: string
  description?: string
  website?: string
}

async function postForm(path: string, payload: InquiryPayload) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = (await res.json().catch(() => ({}))) as {
    error?: string
    referenceId?: string
  }
  if (!res.ok || !data.referenceId) {
    throw new Error(data.error || 'Unable to send your inquiry right now.')
  }
  return { ok: true as const, referenceId: data.referenceId }
}

export async function submitInquiry(payload: InquiryPayload) {
  const applicant = payload.kind === 'career' || payload.kind === 'ai-career'
  return postForm(applicant ? '/api/apply' : '/api/inquiry', payload)
}

export async function submitApplication(payload: Omit<InquiryPayload, 'kind'> & { kind?: 'career' | 'ai-career' }) {
  return postForm('/api/apply', { ...payload, kind: payload.kind || 'career' })
}
