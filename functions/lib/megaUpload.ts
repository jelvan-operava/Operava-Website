/**
 * MEGA upload via megajs (Pages Function / Worker compatible with nodejs_compat).
 * Secrets: MEGA_EMAIL, MEGA_PASSWORD, optional MEGA_TOTP
 */

import { Storage } from 'megajs'
import {
  defaultFolderForKind,
  isAllowedMegaFolder,
  type MegaFolderName,
} from './megaFolders'

export interface MegaCredentialsEnv {
  MEGA_EMAIL?: string
  MEGA_PASSWORD?: string
  MEGA_TOTP?: string
}

export function megaCredentialsConfigured(env: MegaCredentialsEnv): boolean {
  return Boolean(
    env.MEGA_EMAIL &&
      String(env.MEGA_EMAIL).trim() &&
      env.MEGA_PASSWORD &&
      String(env.MEGA_PASSWORD).trim().length >= 4,
  )
}

export async function uploadJsonToMega(
  env: MegaCredentialsEnv,
  opts: {
    folder?: string
    kind?: string
    fileName?: string
    payload: unknown
  },
): Promise<{ success: true; folder: MegaFolderName; fileName: string; message: string }> {
  const email = String(env.MEGA_EMAIL || '').trim()
  const password = String(env.MEGA_PASSWORD || '').trim()
  if (!email || !password) {
    throw new Error('MEGA credentials are not configured.')
  }

  const folderName: MegaFolderName =
    opts.folder && isAllowedMegaFolder(opts.folder)
      ? opts.folder
      : defaultFolderForKind(opts.kind)

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  let fileName =
    (opts.fileName && String(opts.fileName).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)) ||
    `operava_backup_${stamp}.json`
  if (!fileName.endsWith('.json')) fileName += '.json'

  const stringifiedData = JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      folder: folderName,
      details: opts.payload,
    },
    null,
    2,
  )

  let storage: Storage | undefined
  try {
    const loginOpts: { email: string; password: string; totp?: string } = { email, password }
    if (env.MEGA_TOTP && String(env.MEGA_TOTP).trim()) {
      loginOpts.totp = String(env.MEGA_TOTP).trim()
    }

    storage = await new Storage(loginOpts).ready

    const files = Object.values(storage.files || {}) as Array<{
      name?: string
      directory?: boolean
    }>

    const targetFolder = files.find((file) => file.name === folderName && file.directory)
    if (!targetFolder) {
      throw new Error(
        `Target folder "${folderName}" not found in MEGA. Create it first (see mega-backup/FOLDERS.md).`,
      )
    }

    await storage.upload({ name: fileName, target: targetFolder }, stringifiedData).complete

    storage.close()
    storage = undefined

    return {
      success: true,
      folder: folderName,
      fileName,
      message: `Saved to /${folderName}/${fileName}`,
    }
  } catch (error) {
    try {
      storage?.close()
    } catch {
      /* ignore */
    }
    throw error instanceof Error ? error : new Error('MEGA upload failed')
  }
}
