import type { ParsedResume } from './resumeParse'

export async function ensureResumeTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare(
      'CREATE TABLE IF NOT EXISTS resumes (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'resume_key TEXT NOT NULL UNIQUE,' +
        'original_filename TEXT,' +
        'content_type TEXT,' +
        'text_content TEXT NOT NULL,' +
        'parsed_json TEXT,' +
        'full_name TEXT,' +
        'email TEXT,' +
        'phone TEXT,' +
        'location TEXT,' +
        'education TEXT,' +
        'experience TEXT,' +
        'skills TEXT,' +
        'summary TEXT,' +
        'created_at TEXT NOT NULL' +
        ')',
    ),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_resumes_email ON resumes(email)'),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_resumes_key ON resumes(resume_key)'),
  ])

  // Best-effort columns on form_submissions (ignore if already present)
  for (const sql of [
    'ALTER TABLE form_submissions ADD COLUMN resume_text TEXT',
    'ALTER TABLE form_submissions ADD COLUMN resume_parsed TEXT',
  ]) {
    try {
      await db.prepare(sql).run()
    } catch {
      /* column may already exist */
    }
  }
}

export async function insertResume(
  db: D1Database,
  opts: {
    resumeKey: string
    originalFilename: string
    contentType: string
    parsed: ParsedResume
  },
): Promise<void> {
  await ensureResumeTables(db)
  const now = new Date().toISOString()
  await db
    .prepare(
      'INSERT OR REPLACE INTO resumes (' +
        'resume_key, original_filename, content_type, text_content, parsed_json, ' +
        'full_name, email, phone, location, education, experience, skills, summary, created_at' +
        ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    )
    .bind(
      opts.resumeKey,
      opts.originalFilename,
      opts.contentType,
      opts.parsed.text,
      JSON.stringify(opts.parsed.fields),
      opts.parsed.fullName || '',
      opts.parsed.email || '',
      opts.parsed.phone || '',
      opts.parsed.location || '',
      opts.parsed.education || '',
      opts.parsed.experience || '',
      opts.parsed.skills || '',
      opts.parsed.summary || '',
      now,
    )
    .run()
}

export async function getResumeByKey(
  db: D1Database,
  resumeKey: string,
): Promise<{
  resume_key: string
  text_content: string
  parsed_json: string
  full_name: string
  email: string
  phone: string
  location: string
  education: string
  experience: string
  skills: string
  summary: string
} | null> {
  if (!resumeKey) return null
  try {
    await ensureResumeTables(db)
    const row = await db
      .prepare(
        'SELECT resume_key, text_content, parsed_json, full_name, email, phone, location, education, experience, skills, summary FROM resumes WHERE resume_key = ? LIMIT 1',
      )
      .bind(resumeKey)
      .first<{
        resume_key: string
        text_content: string
        parsed_json: string
        full_name: string
        email: string
        phone: string
        location: string
        education: string
        experience: string
        skills: string
        summary: string
      }>()
    return row || null
  } catch {
    return null
  }
}

/** Merge resume structured fields into form payload; never overwrite non-empty form values. */
export function mergeResumeIntoPayload(
  payload: Record<string, unknown>,
  resume: {
    text_content?: string
    full_name?: string
    email?: string
    phone?: string
    location?: string
    education?: string
    experience?: string
    skills?: string
    summary?: string
  } | null,
): Record<string, unknown> {
  if (!resume) return payload
  const out = { ...payload }

  const fill = (key: string, value?: string) => {
    const current = String(out[key] || '').trim()
    const v = String(value || '').trim()
    if (!current && v) out[key] = v
  }

  fill('name', resume.full_name)
  fill('email', resume.email)
  fill('phone', resume.phone)
  fill('country', resume.location)
  fill('education', resume.education)
  fill('experience', resume.experience)
  fill('skills', resume.skills)
  fill('additional', resume.summary)

  // Always attach full text + mandatory resume block
  if (resume.text_content) {
    out.resumeText = resume.text_content
    out.resumeDataMandatory = {
      fullName: resume.full_name || '',
      email: resume.email || '',
      phone: resume.phone || '',
      location: resume.location || '',
      education: resume.education || '',
      experience: resume.experience || '',
      skills: resume.skills || '',
      summary: resume.summary || '',
      fullText: resume.text_content,
    }
  }
  return out
}
