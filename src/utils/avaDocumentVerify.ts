import { normalizeReferenceId } from '../data/documentVerifications'

/** Extract OPERAVA document reference ID from free text, if present */
export function extractDocumentReferenceId(raw: string): string | null {
  const text = String(raw || '').trim()
  if (!text) return null
  const branded = text.match(/\bOPERAVA[-_]?DOC[-_]?[A-Z0-9]+\b/i)
  if (branded) return normalizeReferenceId(branded[0])
  const sole = normalizeReferenceId(text)
  if (
    sole.length >= 8 &&
    sole.length <= 48 &&
    /^[A-Z0-9][-A-Z0-9]+$/.test(sole) &&
    /(?:DOC|OPERAVA|REF|CERT|ID)/i.test(sole)
  ) {
    return sole
  }
  const afterLabel = text.match(
    /(?:document\s*(?:id|reference)|reference\s*id|verify(?:\s+document)?|id\s*(?:is|:))\s*[:#]?\s*([A-Z0-9][-A-Z0-9]{6,40})/i,
  )
  if (afterLabel) return normalizeReferenceId(afterLabel[1])
  return null
}

export function wantsDocumentVerification(q: string): boolean {
  const s = q.toLowerCase()
  return (
    s.includes('verif') ||
    s.includes('document id') ||
    s.includes('reference id') ||
    s.includes('check document') ||
    s.includes('validate document') ||
    !!extractDocumentReferenceId(q)
  )
}

export async function lookupDocumentVerification(docId: string): Promise<{
  verified: boolean
  referenceId?: string
  title?: string
  issuedAt?: string
  message?: string
  error?: string
}> {
  try {
    const res = await fetch(`/api/verification/lookup?id=${encodeURIComponent(docId)}`)
    const data = (await res.json()) as {
      ok?: boolean
      verified?: boolean
      referenceId?: string
      title?: string
      issuedAt?: string
      message?: string
    }
    if (!res.ok) {
      return {
        verified: false,
        message:
          data.message ||
          'I could not complete that lookup right now. Please try again, or use https://www.operavaglobal.com/verification',
      }
    }
    if (data.verified && data.referenceId) {
      return {
        verified: true,
        referenceId: data.referenceId,
        title: data.title,
        issuedAt: data.issuedAt,
      }
    }
    return { verified: false, referenceId: docId }
  } catch {
    return {
      verified: false,
      error: 'Network error while verifying. Please try again, or open https://www.operavaglobal.com/verification',
    }
  }
}

export function formatVerificationReply(result: {
  verified: boolean
  referenceId?: string
  title?: string
  issuedAt?: string
  message?: string
  error?: string
}): string {
  if (result.error) return result.error
  if (result.message && !result.referenceId) return result.message
  if (result.verified && result.referenceId) {
    const lines = [
      '**Verified** — The document is verified.',
      '',
      `Reference ID: ${result.referenceId}`,
    ]
    if (result.title) lines.push(`Record: ${result.title}`)
    if (result.issuedAt) lines.push(`Issued: ${result.issuedAt}`)
    lines.push(
      '',
      'Note: this ID is verified and issued by **OPERAVA GLOBAL SOLUTIONS**. Document content may be updated or changed over time. This verification confirms only the reference ID. For the correct specific content of a document, email verification@operavaglobal.com.',
      '',
      'Portal: https://www.operavaglobal.com/verification',
    )
    return lines.join('\n')
  }
  const id = result.referenceId || 'that ID'
  return `**Not found** — No verified record for ${id}.\n\nDouble-check the ID. If you believe this is an error, email verification@operavaglobal.com.\n\nPortal: https://www.operavaglobal.com/verification`
}

export const ASK_FOR_DOCUMENT_ID =
  'I can verify OPERAVA document reference IDs here.\n\nPlease paste the document ID (for example OPERAVA-DOC-00000001), and I will check it for you.\n\nYou can also use the portal: https://www.operavaglobal.com/verification'
