/**
 * Optional fire-and-forget webhook to the separate mega-backup Worker.
 * Secrets on operava-website: MEGA_BACKUP_URL, MEGA_BACKUP_SECRET
 */

export interface MegaBackupEnv {
  MEGA_BACKUP_URL?: string
  MEGA_BACKUP_SECRET?: string
}

export function megaBackupConfigured(env: MegaBackupEnv): boolean {
  const url = env.MEGA_BACKUP_URL && String(env.MEGA_BACKUP_URL).trim()
  const secret = env.MEGA_BACKUP_SECRET && String(env.MEGA_BACKUP_SECRET).trim()
  return Boolean(url && secret && url.startsWith('http') && secret.length >= 16)
}

/** Non-blocking: never throws to caller. */
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
  if (!megaBackupConfigured(env)) return

  const url = String(env.MEGA_BACKUP_URL).trim().replace(/\/$/, '')
  const secret = String(env.MEGA_BACKUP_SECRET).trim()
  const fileName =
    payload.applicationId.replace(/[^a-zA-Z0-9._-]/g, '_') +
    '_' +
    Date.now() +
    '.json'

  try {
    const res = await fetch(url + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + secret,
      },
      body: JSON.stringify({
        folder: 'OPERAVA APPLICANTS',
        kind: 'applicant',
        fileName,
        payload,
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
