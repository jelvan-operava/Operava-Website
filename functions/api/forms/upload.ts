import { json, type FormEnv } from '../../lib/formCore'

const ALLOWED = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const MAX_BYTES = 8 * 1024 * 1024

export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) return json({ error: 'Resume file is required.' }, 400)
    if (file.size > MAX_BYTES) return json({ error: 'Resume must be 8MB or smaller.' }, 400)
    const name = file.name.toLowerCase()
    const extOk = name.endsWith('.pdf') || name.endsWith('.doc') || name.endsWith('.docx')
    if (file.type && !ALLOWED.has(file.type) && !extOk) {
      return json({ error: 'Upload a PDF or Word document.' }, 400)
    }
    if (!file.type && !extOk) return json({ error: 'Upload a PDF or Word document.' }, 400)

    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80)
    const key = `careers/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safe}`

    if (env.RESUMES_BUCKET) {
      await env.RESUMES_BUCKET.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type || 'application/octet-stream' },
      })
      return json({ ok: true, resumeKey: key })
    }

    return json({
      ok: true,
      resumeKey: `pending:${safe}`,
      notice: 'Resume noted. File storage attaches once R2 is bound; application still proceeds.',
    })
  } catch {
    return json({ error: 'Unable to store the resume.' }, 500)
  }
}
