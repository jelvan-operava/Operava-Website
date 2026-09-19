/**
 * Optional fire-and-forget MEGA backup after verified forms / recruitment.
 *
 * Prefer direct upload when Pages has MEGA_EMAIL + MEGA_PASSWORD.
 * Fallback: HTTP webhook to MEGA_BACKUP_URL (separate Worker or /api/mega-backup).
 */

import { megaCredentialsConfigured, uploadJsonToMega, type MegaCredentialsEnv } from './megaUpload'
import type { MegaFolderName } from './megaFolders'

export interface MegaBackupEnv extends MegaCredentialsEnv {
  MEGA_BACKUP_URL?: string
  MEGA_BACKUP_SECRET?: string
  BACKUP_SHARED_SECRET?: string
}

export type MegaFolder = MegaFolderName

export function megaBackupConfigured(env: MegaBackupEnv): boolean {
  if (megaCredentialsConfigured(env)) return true
  const url = env.MEGA_BACKUP_URL && String(env.MEGA_BACKUP_URL).trim()
  const secret =
    (env.MEGA_BACKUP_SECRET && String(env.MEGA_BACKUP_SECRET).trim()) ||
    (env.BACKUP_SHARED_SECRET && String(env.BACKUP_SHARED_SECRET).trim())
  return Boolean(url && secret && url.startsWith('http') && secret.length >= 16)
}

export function folderForFormType(formType: string): MegaFolder {
  const t = String(formType || '').toUpperCase()
  if (t === 'CAREERS' || t === 'RECRUITMENT' || t === 'APPLICANT') return 'OPERAVA APPLICANTS'
  if (t === 'ACADEMY') return 'OPERAVA FILES AND DOCUMENTS'
  if (t === 'EMPLOYEE') return 'OPERAVA EMPLOYEES'
  return 'OPERAVA CLIENTS'
}

function safeFilePart(value: string, max = 80): string {
  return String(value || 'item')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, max)
}

async function postMegaWebhook(
  env: MegaBackupEnv,
  opts: {
    folder: MegaFolder
    kind: string
    fileName: string
    payload: Record<string, unknown>
  },
): Promise<void> {
  const url = String(env.MEGA_BACKUP_URL || '').trim().replace(/\/$/, '')
  const secret =
    (env.MEGA_BACKUP_SECRET && String(env.MEGA_BACKUP_SECRET).trim()) ||
    (env.BACKUP_SHARED_SECRET && String(env.BACKUP_SHARED_SECRET).trim()) ||
    ''
  if (!url || !secret) return

  try {
    const res = await fetch(url + (url.endsWith('/api/mega-backup') ? '' : url.includes('/api/') ? '' : '/'), {
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

async function runBackup(
  env: MegaBackupEnv,
  opts: {
    folder: MegaFolder
    kind: string
    fileName: string
    payload: Record<string, unknown>
  },
): Promise<void> {
  if (!megaBackupConfigured(env)) return

  // Direct path (Pages secrets MEGA_EMAIL / MEGA_PASSWORD)
  if (megaCredentialsConfigured(env)) {
    try {
      await uploadJsonToMega(env, opts)
      return
    } catch (err) {
      console.error('mega direct upload failed', err instanceof Error ? err.message : 'unknown')
      // fall through to webhook if configured
    }
  }

  await postMegaWebhook(env, opts)
}

/** Recruitment AVA → OPERAVA APPLICANTS */
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
  const fileName = safeFilePart(payload.applicationId) + '_' + Date.now() + '.json'
  await runBackup(env, {
    folder: 'OPERAVA APPLICANTS',
    kind: 'applicant',
    fileName,
    payload: { ...payload, source: 'recruitment_ava' },
  })
}

/** Verified website forms → mapped folder */
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

  await runBackup(env, {
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
