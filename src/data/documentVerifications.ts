/** Seed / public registry of OPERAVA document reference IDs.
 * Production lookups also query D1 table document_verifications when available.
 */
export interface DocumentVerificationRecord {
  referenceId: string
  title?: string
  issuedAt?: string
  status: 'verified' | 'revoked' | 'expired'
  note?: string
}

export const documentVerificationRegistry: DocumentVerificationRecord[] = [
  {
    referenceId: 'OPERAVA-DOC-00000001',
    title: 'Sample issued document',
    issuedAt: '2026-09-01',
    status: 'verified',
    note: 'Demo reference for portal testing',
  },
]

export function normalizeReferenceId(raw: string): string {
  return String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
}
