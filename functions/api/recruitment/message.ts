import { json, type FormEnv } from '../../lib/formCore'
import { readVerifiedSession } from '../../lib/recruitmentSession'
import {
  appendApplicantMessage,
  recruitmentConfigured,
  type RecruitmentEnv,
} from '../../lib/recruitmentDb'

type Env = FormEnv & RecruitmentEnv

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!recruitmentConfigured(env)) return json({ ok: false }, 200)
    let body: { sessionToken?: string; role?: string; text?: string }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return json({ error: 'Invalid body' }, 400)
    }
    const session = await readVerifiedSession(env, String(body.sessionToken || ''))
    if (!session) return json({ error: 'Invalid session' }, 401)
    const role = body.role === 'assistant' ? 'assistant' : body.role === 'system' ? 'system' : 'user'
    const text = String(body.text || '').trim()
    if (!text) return json({ error: 'Empty message' }, 400)
    await appendApplicantMessage(env, session.applicationId, role, text)
    return json({ ok: true })
  } catch {
    return json({ ok: false }, 200)
  }
}
