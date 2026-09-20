/**
 * POST /api/mega-backup
 * Pages Function — JSON or plain-text uploads to OPERAVA MEGA folders.
 * Secrets: MEGA_EMAIL, MEGA_PASSWORD
 * Auth: MEGA_BACKUP_SHARED_SECRET (preferred), or legacy BACKUP_SHARED_SECRET / MEGA_BACKUP_SECRET, or OTP_SECRET (admin)
 */

import { MEGA_FOLDERS } from '../lib/megaFolders'
import {
  megaCredentialsConfigured,
  uploadJsonToMega,
  uploadTextToMega,
  type MegaCredentialsEnv,
} from '../lib/megaUpload'

interface Env extends MegaCredentialsEnv {
  MEGA_BACKUP_SHARED_SECRET?: string
  /** @deprecated use MEGA_BACKUP_SHARED_SECRET */
  BACKUP_SHARED_SECRET?: string
  /** @deprecated use MEGA_BACKUP_SHARED_SECRET */
  MEGA_BACKUP_SECRET?: string
  OTP_SECRET?: string
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function authorized(request: Request, env: Env): boolean {
  const header = request.headers.get('Authorization') || ''
  if (!header.startsWith('Bearer ')) return false
  const token = header.slice('Bearer '.length).trim()
  if (!token || token.length < 16) return false

  const candidates = [
    env.MEGA_BACKUP_SHARED_SECRET && String(env.MEGA_BACKUP_SHARED_SECRET).trim(),
    env.BACKUP_SHARED_SECRET && String(env.BACKUP_SHARED_SECRET).trim(),
    env.MEGA_BACKUP_SECRET && String(env.MEGA_BACKUP_SECRET).trim(),
    env.OTP_SECRET && String(env.OTP_SECRET).trim(),
  ].filter((s): s is string => Boolean(s && s.length >= 16))

  return candidates.some((s) => s === token)
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json({
    service: 'operava-mega-backup',
    runtime: 'cloudflare-pages-function',
    status: 'ok',
    folders: Object.values(MEGA_FOLDERS),
    megaConfigured: megaCredentialsConfigured(env),
  })
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!authorized(request, env)) {
    return json(
      {
        success: false,
        error:
          'Unauthorized. Set Authorization: Bearer <MEGA_BACKUP_SHARED_SECRET or OTP_SECRET>.',
      },
      401,
    )
  }

  if (!megaCredentialsConfigured(env)) {
    return json({ success: false, error: 'MEGA credentials are not configured.' }, 503)
  }

  let body: {
    folder?: string
    fileName?: string
    kind?: string
    payload?: unknown
    text?: string
  }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return json({ success: false, error: 'Invalid JSON body.' }, 400)
  }

  try {
    const text = typeof body.text === 'string' ? body.text : ''
    if (text) {
      const result = await uploadTextToMega(env, {
        folder: body.folder,
        kind: body.kind,
        fileName: body.fileName || 'operava_backup.txt',
        text,
      })
      return json(result)
    }
    const result = await uploadJsonToMega(env, {
      folder: body.folder,
      kind: body.kind,
      fileName: body.fileName,
      payload: body.payload ?? body,
    })
    return json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    console.error('mega-backup failed', message)
    return json({ success: false, error: message }, 500)
  }
}
