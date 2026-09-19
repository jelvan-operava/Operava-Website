/**
 * POST /api/mega-backup
 * Pages Function aligned with mega-backup/wrangler Worker API.
 * Uses Pages secrets: MEGA_EMAIL, MEGA_PASSWORD, BACKUP_SHARED_SECRET (optional protect)
 */

import { MEGA_FOLDERS } from '../lib/megaFolders'
import {
  megaCredentialsConfigured,
  uploadJsonToMega,
  type MegaCredentialsEnv,
} from '../lib/megaUpload'

interface Env extends MegaCredentialsEnv {
  BACKUP_SHARED_SECRET?: string
  MEGA_BACKUP_SECRET?: string
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function authorized(request: Request, env: Env): boolean {
  const secret =
    (env.BACKUP_SHARED_SECRET && String(env.BACKUP_SHARED_SECRET).trim()) ||
    (env.MEGA_BACKUP_SECRET && String(env.MEGA_BACKUP_SECRET).trim()) ||
    ''
  // If no shared secret configured, allow same-project internal use only via direct lib calls.
  // HTTP endpoint requires a secret when one is set.
  if (!secret || secret.length < 16) {
    // Still allow GET health; POST requires secret if none set → reject to avoid open proxy
    return false
  }
  const header = request.headers.get('Authorization') || ''
  return header === 'Bearer ' + secret
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
    return json({ success: false, error: 'Unauthorized.' }, 401)
  }

  if (!megaCredentialsConfigured(env)) {
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

  try {
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
