/**
 * Optional fire-and-forget MEGA backup after verified forms / recruitment.
 *
 * Prefer direct upload when Pages has MEGA_EMAIL + MEGA_PASSWORD.
 * Fallback: HTTP webhook to MEGA_BACKUP_URL (separate Worker or /api/mega-backup).
 */

import {
  megaCredentialsConfigured,
  uploadJsonToMega,
  uploadTextToMega,
  type MegaCredentialsEnv,
} from './megaUpload'
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
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, max)
}

/** Title format required: {applicationID_Fullname}.txt */
export function recruitmentMegaFileName(applicationId: string, fullName: string): string {
  const id = safeFilePart(applicationId, 64) || 'OPERAVA-APP'
  const name = safeFilePart(fullName, 80) || 'Applicant'
  return id + '_' + name + '.txt'
}

export function formatApplicantAssessmentText(data: {
  applicationId: string
  fullName: string
  email: string
  phone?: string
  positionTitle: string
  positionCode: string
  education?: string
  experienceYears?: string
  experienceSummary?: string
  skills?: string[]
  positionSpecific?: string
  availability?: string
  startDate?: string
  additional?: string
  status: string
  assessment: {
    correctCount: number
    total: number
    scorePercent: number
    passed: boolean
    completedAt: string
  }
}): string {
  const skills = Array.isArray(data.skills) ? data.skills.join(', ') : ''
  const lines = [
    'OPERAVA RECRUITMENT AVA — APPLICANT RECORD',
    '==========================================',
    '',
    'Application ID: ' + data.applicationId,
    'Full name: ' + data.fullName,
    'Email: ' + data.email,
    'Phone: ' + (data.phone || '—'),
    'Position: ' + data.positionTitle,
    'Position code: ' + data.positionCode,
    'Status: ' + data.status,
    '',
    '--- PROFILE ---',
    'Education: ' + (data.education || '—'),
    'Experience years: ' + (data.experienceYears || '—'),
    'Experience summary: ' + (data.experienceSummary || '—'),
    'Skills: ' + (skills || '—'),
    'Position-specific: ' + (data.positionSpecific || '—'),
    'Availability: ' + (data.availability || '—'),
    'Start date: ' + (data.startDate || '—'),
    'Additional: ' + (data.additional || '—'),
    '',
    '--- ASSESSMENT ---',
    'Correct: ' + data.assessment.correctCount + ' / ' + data.assessment.total,
    'Score: ' + data.assessment.scorePercent + '%',
    'Passed (26/30 required): ' + (data.assessment.passed ? 'YES' : 'NO'),
    'Completed at: ' + data.assessment.completedAt,
    '',
    'Generated: ' + new Date().toISOString(),
    'Source: OPERAVA Recruitment AVA',
  ]
  return lines.join('\n')
}

async function postMegaWebhook(
  env: MegaBackupEnv,
  opts: {
    folder: MegaFolder
    kind: string
    fileName: string
    payload?: Record<string, unknown>
    text?: string
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
        text: opts.text,
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

async function runJsonBackup(
  env: MegaBackupEnv,
  opts: {
    folder: MegaFolder
    kind: string
    fileName: string
    payload: Record<string, unknown>
  },
): Promise<void> {
  if (!megaBackupConfigured(env)) return
  if (megaCredentialsConfigured(env)) {
    try {
      await uploadJsonToMega(env, opts)
      return
    } catch (err) {
      console.error('mega direct upload failed', err instanceof Error ? err.message : 'unknown')
    }
  }
  await postMegaWebhook(env, opts)
}

async function runTextBackup(
  env: MegaBackupEnv,
  opts: {
    folder: MegaFolder
    kind: string
    fileName: string
    text: string
  },
): Promise<void> {
  if (!megaBackupConfigured(env)) return
  if (megaCredentialsConfigured(env)) {
    try {
      await uploadTextToMega(env, opts)
      return
    } catch (err) {
      console.error('mega text upload failed', err instanceof Error ? err.message : 'unknown')
    }
  }
  await postMegaWebhook(env, {
    folder: opts.folder,
    kind: opts.kind,
    fileName: opts.fileName,
    text: opts.text,
    payload: { text: opts.text },
  })
}

/** Early verify snapshot (still used); prefer final assessment .txt for pool. */
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
  const fileName = recruitmentMegaFileName(payload.applicationId, payload.name)
  const text = [
    'OPERAVA RECRUITMENT AVA — EMAIL VERIFIED',
    'Application ID: ' + payload.applicationId,
    'Full name: ' + payload.name,
    'Email: ' + payload.email,
    'Position: ' + payload.position,
    'Position code: ' + payload.positionCode,
    'Email verified at: ' + (payload.emailVerifiedAt || ''),
    'Generated: ' + new Date().toISOString(),
  ].join('\n')
  await runTextBackup(env, {
    folder: 'OPERAVA APPLICANTS',
    kind: 'applicant',
    fileName,
    text,
  })
}

/** Final applicant + assessment text file after assessment completes. */
export async function backupRecruitmentAssessmentToMega(
  env: MegaBackupEnv,
  data: Parameters<typeof formatApplicantAssessmentText>[0],
): Promise<void> {
  const fileName = recruitmentMegaFileName(data.applicationId, data.fullName)
  const text = formatApplicantAssessmentText(data)
  await runTextBackup(env, {
    folder: 'OPERAVA APPLICANTS',
    kind: 'applicant',
    fileName,
    text,
  })
}

/** Verified website forms → mapped folder (JSON). */
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

  await runJsonBackup(env, {
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
