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

export async function submitInquiry(payload: InquiryPayload): Promise<{
  ok: true
  referenceId: string
}> {
  const res = await fetch('/api/inquiry', {
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
  return { ok: true, referenceId: data.referenceId }
}
