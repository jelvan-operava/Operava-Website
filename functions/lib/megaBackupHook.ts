/**
 * Optional fire-and-forget webhook to the separate mega-backup Worker.
 * Secrets on operava-website: MEGA_BACKUP_URL, MEGA_BACKUP_SECRET
 *
 * Folder map (must exist in MEGA):
 * - OPERAVA APPLICANTS  → CAREERS + Recruitment AVA
 * - OPERAVA CLIENTS     → SERVICES / CONTACT / quote inquiries
 * - OPERAVA EMPLOYEES   → reserved (staff systems)
 * - OPERAVA FILES AND DOCUMENTS → ACADEMY + general document-style submissions
 */

export interface MegaBackupEnv {
  MEGA_BACKUP_URL?: string
  MEGA_BACKUP_SECRET?: string
}

export type MegaFolder =
  | 'OPERAVA APPLICANTS'
  | 'OPERAVA CLIENTS'
  | 'OPERAVA EMPLOYEES'
  | 'OPERAVA FILES AND DOCUMENTS'

export function megaBackupConfigured(env: MegaBackupEnv): boolean {
  const url = env.MEGA_BACKUP_URL && String(env.MEGA_BACKUP_URL).trim()
  const secret = env.MEGA_BACKUP_SECRET && String(env.MEGA_BACKUP_SECRET).trim()
  return Boolean(url && secret && url.startsWith('http') && secret.length >= 16)
}

export function folderForFormType(formType: string): MegaFolder {
  const t = String(formType || '').toUpperCase()
  if (t === 'CAREERS' || t === 'RECRUITMENT' || t === 'APPLICANT') return 'OPERAVA APPLICANTS'
  if (t === 'ACADEMY') return 'OPERAVA FILES AND DOCUMENTS'
  if (t === 'EMPLOYEE') return 'OPERAVA EMPLOYEES'
  // SERVICES, CONTACT, QUOTE, and default inquiries
  return 'OPERAVA CLIENTS'
}

async function postMegaBackup(
  env: MegaBackupEnv,
  opts: {
    folder: MegaFolder
    kind: string
    fileName: string
    payload: Record<string, unknown>
  },
): Promise<void> {
  if (!megaBackupConfigured(env)) return

  const url = String(env.MEGA_BACKUP_URL).trim().replace(/\/$/, '')
  const secret = String(env.MEGA_BACKUP_SECRET).trim()

  try {
    const res = await fetch(url + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + secret,
      },
      body: JSON.stringify({
        folder: opts.folder,
        kind: opts.kind,
        fileName: opts.fileName,
        payload: opts.payload,
      }),
    })
    if (!res.ok) {
      const raw = await res.text().catch(() => '')
      console.error('mega backup webhook failed', res.status, raw.slice(0, 200))
    }
  } catch (err) {
    console.error('mega backup webhook error', err instanceof Error ? err.message : 'unknown')
  }
}

function safeFilePart(value: string, max = 80): string {
  return String(value || 'item')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, max)
}

/** Recruitment AVA applicant snapshot → OPERAVA APPLICANTS */
export async function backupApplicantToMega(
  env: MegaBackupEnv,
  payload: {
    applicationId: string
    name: string
    email: string
    position: string
    positionCode: string
    emailVerifiedAt?: string
  },
): Promise<void> {
  const fileName =
    safeFilePart(payload.applicationId) + '_' + Date.now() + '.json'
  await postMegaBackup(env, {
    folder: 'OPERAVA APPLICANTS',
    kind: 'applicant',
    fileName,
    payload: { ...payload, source: 'recruitment_ava' },
  })
}

/** Verified website form (SERVICES / CAREERS / CONTACT / ACADEMY) → mapped folder */
export async function backupFormSubmissionToMega(
  env: MegaBackupEnv,
  args: {
    formType: string
    referenceId: string
    name: string
    email: string
    payload: Record<string, unknown>
    verifiedAt: string
  },
): Promise<void> {
  const folder = folderForFormType(args.formType)
  const kind =
    folder === 'OPERAVA APPLICANTS'
      ? 'applicant'
      : folder === 'OPERAVA FILES AND DOCUMENTS'
        ? 'file'
        : folder === 'OPERAVA EMPLOYEES'
          ? 'employee'
          : 'client'

  const fileName =
    safeFilePart(args.referenceId) +
    '_' +
    safeFilePart(String(args.formType || 'FORM').toUpperCase(), 20) +
    '_' +
    Date.now() +
    '.json'

  await postMegaBackup(env, {
    folder,
    kind,
    fileName,
    payload: {
      source: 'website_form',
      formType: args.formType,
      referenceId: args.referenceId,
      name: args.name,
      email: args.email,
      verifiedAt: args.verifiedAt,
      fields: args.payload,
    },
  })
}
