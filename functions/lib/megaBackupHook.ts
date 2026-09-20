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
  /** Preferred shared secret for webhook auth */
  MEGA_BACKUP_SHARED_SECRET?: string
  /** @deprecated use MEGA_BACKUP_SHARED_SECRET */
  MEGA_BACKUP_SECRET?: string
  /** @deprecated use MEGA_BACKUP_SHARED_SECRET */
  BACKUP_SHARED_SECRET?: string
}

export type MegaFolder = MegaFolderName

function resolveBackupSecret(env: MegaBackupEnv): string {
  return (
    (env.MEGA_BACKUP_SHARED_SECRET && String(env.MEGA_BACKUP_SHARED_SECRET).trim()) ||
    (env.MEGA_BACKUP_SECRET && String(env.MEGA_BACKUP_SECRET).trim()) ||
    (env.BACKUP_SHARED_SECRET && String(env.BACKUP_SHARED_SECRET).trim()) ||
    ''
  )
}

export function megaBackupConfigured(env: MegaBackupEnv): boolean {
  if (megaCredentialsConfigured(env)) return true
  const url = env.MEGA_BACKUP_URL && String(env.MEGA_BACKUP_URL).trim()
  const secret = resolveBackupSecret(env)
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

export type ApplicantAssessmentTextData = {
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
  applicationDate?: string
  otpConfirmed?: boolean
  otpConfirmedAt?: string
  termsAccepted?: boolean
  privacyAccepted?: boolean
  messages?: Array<{ role: string; body: string; created_at?: string }>
  resumeInfo?: string
  assessment: {
    correctCount: number
    total: number
    scorePercent: number
    passed: boolean
    completedAt: string
  }
}

export function formatApplicantAssessmentText(data: ApplicantAssessmentTextData): string {
  const skills = Array.isArray(data.skills) ? data.skills.join(', ') : ''
  const messages = Array.isArray(data.messages) ? data.messages : []
  const messageLines =
    messages.length === 0
      ? ['(no chat messages logged)']
      : messages.map((m, i) => {
          const at = m.created_at ? ' @ ' + m.created_at : ''
          return '[' + (i + 1) + '] ' + String(m.role || 'user').toUpperCase() + at + '\n' + String(m.body || '')
        })

  const lines = [
    'OPERAVA RECRUITMENT AVA — APPLICANT RECORD',
    '==========================================',
    '',
    'APPLICATION NUMBER: ' + data.applicationId,
    'FULL NAME: ' + data.fullName,
    'EMAIL: ' + data.email,
    'PHONE: ' + (data.phone || '—'),
    'POSITION: ' + data.positionTitle,
    'POSITION CODE: ' + data.positionCode,
    'STATUS: ' + data.status,
    'APPLICATION DATE: ' + (data.applicationDate || '—'),
    '',
    '--- OTP / VERIFICATION ---',
    'OTPConfirmed: ' + (data.otpConfirmed ? 'YES' : 'NO'),
    'OTP confirmation time: ' + (data.otpConfirmedAt || '—'),
    '',
    '--- TERMS / POLICY / DATA PRIVACY ---',
    'Terms and policy accepted: ' + (data.termsAccepted ? 'YES' : 'NO'),
    'Data privacy accepted: ' + (data.privacyAccepted ? 'YES' : 'NO'),
    'Note: Acceptance is recorded at successful email OTP verification for Recruitment AVA.',
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
    '--- MESSAGES (chat log) ---',
    ...messageLines,
    '',
    '--- RESUME INFO ---',
    data.resumeInfo && String(data.resumeInfo).trim()
      ? String(data.resumeInfo).trim()
      : '(no resume text attached for this Recruitment AVA session)',
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
  const secret = resolveBackupSecret(env)
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
    'APPLICATION NUMBER: ' + payload.applicationId,
    'FULL NAME: ' + payload.name,
    'EMAIL: ' + payload.email,
    'POSITION: ' + payload.position,
    'POSITION CODE: ' + payload.positionCode,
    'OTPConfirmed: YES',
    'OTP confirmation time: ' + (payload.emailVerifiedAt || ''),
    'Terms and policy accepted: YES',
    'Data privacy accepted: YES',
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
  data: ApplicantAssessmentTextData,
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
