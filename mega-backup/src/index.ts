/**
 * OPERAVA MEGA backup Worker
 * Separate coding package — not part of the marketing SPA.
 *
 * POST JSON:
 * {
 *   folder?: "OPERAVA APPLICANTS" | "OPERAVA CLIENTS" | ...
 *   fileName?: string
 *   kind?: "applicant" | "client" | "employee" | "file"
 *   payload: object
 * }
 *
 * Header: Authorization: Bearer <MEGA_BACKUP_SHARED_SECRET>
 */

import { Storage } from 'megajs'
import { defaultFolderForKind, isAllowedMegaFolder, MEGA_FOLDERS } from './folders'

export interface Env {
  MEGA_EMAIL?: string
  MEGA_PASSWORD?: string
  MEGA_TOTP?: string
  /** Preferred auth secret */
  MEGA_BACKUP_SHARED_SECRET?: string
  /** @deprecated use MEGA_BACKUP_SHARED_SECRET */
  BACKUP_SHARED_SECRET?: string
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function resolveSharedSecret(env: Env): string {
  return (
    (env.MEGA_BACKUP_SHARED_SECRET && String(env.MEGA_BACKUP_SHARED_SECRET).trim()) ||
    (env.BACKUP_SHARED_SECRET && String(env.BACKUP_SHARED_SECRET).trim()) ||
    ''
  )
}

function authorized(request: Request, env: Env): boolean {
  const secret = resolveSharedSecret(env)
  if (!secret || secret.length < 16) return false
  const header = request.headers.get('Authorization') || ''
  const expected = 'Bearer ' + secret
  return header === expected
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'GET') {
      return json({
        service: 'operava-mega-backup',
        status: 'ok',
        folders: Object.values(MEGA_FOLDERS),
        megaConfigured: Boolean(env.MEGA_EMAIL && env.MEGA_PASSWORD),
      })
    }

    if (request.method !== 'POST') {
      return json({ success: false, error: 'Only POST requests are allowed.' }, 405)
    }

    if (!authorized(request, env)) {
      return json(
        {
          success: false,
          error: 'Unauthorized. Use Bearer MEGA_BACKUP_SHARED_SECRET.',
        },
        401,
      )
    }

    const email = env.MEGA_EMAIL && String(env.MEGA_EMAIL).trim()
    const password = env.MEGA_PASSWORD && String(env.MEGA_PASSWORD).trim()
    if (!email || !password) {
      return json({ success: false, error: 'MEGA credentials are not configured.' }, 503)
    }

    let body: {
      folder?: string
      fileName?: string
      kind?: string
      payload?: unknown
    }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return json({ success: false, error: 'Invalid JSON body.' }, 400)
    }

    const folderName = body.folder && isAllowedMegaFolder(body.folder)
      ? body.folder
      : defaultFolderForKind(body.kind)

    if (!isAllowedMegaFolder(folderName)) {
      return json({ success: false, error: 'Invalid target folder.' }, 400)
    }

    const payload = body.payload ?? body
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName =
      (body.fileName && String(body.fileName).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180)) ||
      `operava_backup_${stamp}.json`

    const stringifiedData = JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        folder: folderName,
        details: payload,
      },
      null,
      2,
    )

    let storage: Storage | undefined
    try {
      // Login options — if authenticator 2FA blocks login, use a dedicated service account
      // without 2FA, or extend this block with your megajs MFA handling.
      const loginOpts: Record<string, string> = { email, password }
      if (env.MEGA_TOTP && String(env.MEGA_TOTP).trim()) {
        loginOpts.totp = String(env.MEGA_TOTP).trim()
      }

      storage = await new Storage(loginOpts as { email: string; password: string }).ready

      const files = Object.values(storage.files || {}) as Array<{
        name?: string
        directory?: boolean
      }>

      const targetFolder = files.find(
        (file) => file.name === folderName && file.directory,
      )

      if (!targetFolder) {
        throw new Error(
          `Target folder "${folderName}" not found in MEGA. Create it first (see mega-backup/FOLDERS.md).`,
        )
      }

      await storage.upload(
        {
          name: fileName.endsWith('.json') ? fileName : fileName + '.json',
          target: targetFolder,
        },
        stringifiedData,
      ).complete

      storage.close()
      storage = undefined

      return json({
        success: true,
        message: `Saved to /${folderName}/${fileName.endsWith('.json') ? fileName : fileName + '.json'}`,
        folder: folderName,
      })
    } catch (error) {
      try {
        storage?.close()
      } catch {
        /* ignore */
      }
      const message = error instanceof Error ? error.message : 'Upload failed'
      console.error('mega-backup failed', message)
      return json({ success: false, error: message }, 500)
    }
  },
}
