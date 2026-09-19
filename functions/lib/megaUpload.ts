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

function normalizeFileName(name: string | undefined, fallbackExt: string): string {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  let fileName =
    (name && String(name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)) ||
    `operava_backup_${stamp}${fallbackExt}`
  if (!/\.[a-zA-Z0-9]+$/.test(fileName)) fileName += fallbackExt
  return fileName
}

async function uploadBytesToMega(
  env: MegaCredentialsEnv,
  opts: {
    folder?: string
    kind?: string
    fileName?: string
    body: string
    fallbackExt: string
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

  const fileName = normalizeFileName(opts.fileName, opts.fallbackExt)

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

    await storage.upload({ name: fileName, target: targetFolder }, opts.body).complete

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

/** JSON snapshot (forms / generic backups). */
export async function uploadJsonToMega(
  env: MegaCredentialsEnv,
  opts: {
    folder?: string
    kind?: string
    fileName?: string
    payload: unknown
  },
): Promise<{ success: true; folder: MegaFolderName; fileName: string; message: string }> {
  const stringifiedData = JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      folder: opts.folder,
      details: opts.payload,
    },
    null,
    2,
  )
  return uploadBytesToMega(env, {
    folder: opts.folder,
    kind: opts.kind,
    fileName: opts.fileName,
    body: stringifiedData,
    fallbackExt: '.json',
  })
}

/** Plain text file (recruitment applicant + assessment records). */
export async function uploadTextToMega(
  env: MegaCredentialsEnv,
  opts: {
    folder?: string
    kind?: string
    fileName: string
    text: string
  },
): Promise<{ success: true; folder: MegaFolderName; fileName: string; message: string }> {
  let name = opts.fileName
  if (!name.toLowerCase().endsWith('.txt') && !name.toLowerCase().endsWith('.text')) {
    name = name + '.txt'
  }
  return uploadBytesToMega(env, {
    folder: opts.folder,
    kind: opts.kind,
    fileName: name,
    body: opts.text,
    fallbackExt: '.txt',
  })
}
