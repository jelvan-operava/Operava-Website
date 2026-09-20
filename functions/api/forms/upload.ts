import { json, type FormEnv } from '../../lib/formCore'
import { parseResumeFile } from '../../lib/resumeParse'
import { insertResume } from '../../lib/resumeDb'

const ALLOWED = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
])
const MAX_BYTES = 8 * 1024 * 1024

export const onRequestPost: PagesFunction<FormEnv> = async ({ request, env }) => {
  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) return json({ error: 'Resume file is required.' }, 400)
    if (file.size > MAX_BYTES) return json({ error: 'Resume must be 8MB or smaller.' }, 400)

    const name = file.name.toLowerCase()
    const extOk =
      name.endsWith('.pdf') ||
      name.endsWith('.doc') ||
      name.endsWith('.docx') ||
      name.endsWith('.txt')
    if (file.type && !ALLOWED.has(file.type) && !extOk) {
      return json({ error: 'Upload a PDF, Word, or plain-text document.' }, 400)
    }
    if (!file.type && !extOk) return json({ error: 'Upload a PDF, Word, or plain-text document.' }, 400)

    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80)
    const day = new Date().toISOString().slice(0, 10)
    const id = crypto.randomUUID()
    const key = `careers/${day}/${id}-${safe}`
    const buffer = await file.arrayBuffer()

    const parsed = await parseResumeFile(file.name, file.type || '', buffer)
    if (!parsed.text || parsed.text.length < 20) {
      return json(
        {
          error:
            'Could not read text from this resume. Please upload a text-based PDF, DOCX, or TXT (not a scanned image-only PDF).',
        },
        422,
      )
    }

    // Store original binary in R2 when bound
    if (env.RESUMES_BUCKET) {
      try {
        await env.RESUMES_BUCKET.put(key, buffer, {
          httpMetadata: { contentType: file.type || 'application/octet-stream' },
        })
        // Always also store .txt conversion next to the original
        const txtKey = key.replace(/\.[^.]+$/, '') + '.txt'
        await env.RESUMES_BUCKET.put(txtKey, parsed.text, {
          httpMetadata: { contentType: 'text/plain; charset=utf-8' },
        })
      } catch (r2Err) {
        console.error('R2 resume put failed', r2Err instanceof Error ? r2Err.message : 'unknown')
      }
    }

    // Persist full text + structured fields to D1 (mandatory when DB bound)
    if (env.SUBMISSIONS_DB) {
      try {
        await insertResume(env.SUBMISSIONS_DB, {
          resumeKey: key,
          originalFilename: file.name,
          contentType: file.type || 'application/octet-stream',
          parsed,
        })
      } catch (d1Err) {
        console.error('D1 resume insert failed', d1Err instanceof Error ? d1Err.message : 'unknown')
        return json(
          {
            error:
              'Resume text could not be saved to the database. Check SUBMISSIONS_DB binding and try again.',
          },
          503,
        )
      }
    }

    return json({
      ok: true,
      resumeKey: key,
      fileName: file.name,
      textLength: parsed.text.length,
      parsed: {
        fullName: parsed.fullName,
        email: parsed.email,
        phone: parsed.phone,
        location: parsed.location,
        education: parsed.education,
        experience: parsed.experience,
        skills: parsed.skills,
        summary: parsed.summary,
      },
      // Client may prefill form fields; full text stays server-side in D1
      notice: env.RESUMES_BUCKET
        ? 'Resume converted to text and stored.'
        : 'Resume converted to text and stored in D1. Bind RESUMES_BUCKET (R2) to also keep the original file.',
    })
  } catch (err) {
    console.error('resume upload failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to process the resume.' }, 500)
  }
}
