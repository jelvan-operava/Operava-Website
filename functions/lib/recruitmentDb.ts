/**
 * Recruitment AVA persistence backed exclusively by Cloudflare D1.
 * The Pages binding is SUBMISSIONS_DB; no Supabase credentials or API calls are used.
 */

export interface RecruitmentEnv {
  SUBMISSIONS_DB?: D1Database
  OTP_SECRET?: string
  RESEND_API_KEY?: string
  RESEND_FROM?: string
}

export interface ApplicantRow {
  id?: number
  application_id: string
  full_name: string
  email: string
  email_verified: boolean | number
  email_verified_at?: string | null
  phone?: string | null
  position_title: string
  position_code: string
  education?: string | null
  experience_years?: string | null
  experience_summary?: string | null
  skills?: string[] | string | unknown
  position_specific?: string | null
  availability?: string | null
  start_date?: string | null
  additional?: string | null
  status?: string
  source?: string
  application_txt?: string | null
  application_txt_name?: string | null
  terms_accepted?: boolean | number | null
  privacy_accepted?: boolean | number | null
  otp_confirmed?: boolean | number | null
  created_at?: string
  updated_at?: string
}

export interface AssessmentRow {
  id?: number
  application_id: string
  position_code: string
  status: string
  current_index: number
  correct_count: number
  answers: unknown
  questions: unknown
  score_percent?: number | null
  passed?: boolean | number | null
  started_at?: string
  completed_at?: string | null
}

export interface ApplicantMessageRow {
  id?: number
  application_id: string
  role: string
  body: string
  created_at: string
}

export function recruitmentConfigured(env: RecruitmentEnv): boolean {
  return Boolean(env.SUBMISSIONS_DB)
}

export async function ensureRecruitmentTables(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS applicants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id TEXT NOT NULL UNIQUE,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      email_verified INTEGER NOT NULL DEFAULT 0,
      email_verified_at TEXT,
      phone TEXT,
      position_title TEXT NOT NULL,
      position_code TEXT NOT NULL,
      education TEXT,
      experience_years TEXT,
      experience_summary TEXT,
      skills TEXT NOT NULL DEFAULT '[]',
      position_specific TEXT,
      availability TEXT,
      start_date TEXT,
      additional TEXT,
      status TEXT NOT NULL DEFAULT 'APPLICATION_IN_PROGRESS',
      source TEXT NOT NULL DEFAULT 'recruitment_ava',
      application_txt TEXT,
      application_txt_name TEXT,
      terms_accepted INTEGER NOT NULL DEFAULT 0,
      privacy_accepted INTEGER NOT NULL DEFAULT 0,
      otp_confirmed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE UNIQUE INDEX IF NOT EXISTS applicants_email_position_uidx ON applicants(email, position_code)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS applicants_status_idx ON applicants(status)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS applicant_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id TEXT NOT NULL,
      role TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS assessments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_id TEXT NOT NULL UNIQUE,
      position_code TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'IN_PROGRESS',
      current_index INTEGER NOT NULL DEFAULT 0,
      correct_count INTEGER NOT NULL DEFAULT 0,
      answers TEXT NOT NULL DEFAULT '[]',
      questions TEXT NOT NULL DEFAULT '[]',
      score_percent REAL,
      passed INTEGER,
      started_at TEXT NOT NULL,
      completed_at TEXT
    )`),
  ])

  for (const sql of [
    'ALTER TABLE applicants ADD COLUMN application_txt TEXT',
    'ALTER TABLE applicants ADD COLUMN application_txt_name TEXT',
    'ALTER TABLE applicants ADD COLUMN terms_accepted INTEGER NOT NULL DEFAULT 0',
    'ALTER TABLE applicants ADD COLUMN privacy_accepted INTEGER NOT NULL DEFAULT 0',
    'ALTER TABLE applicants ADD COLUMN otp_confirmed INTEGER NOT NULL DEFAULT 0',
  ]) {
    try {
      await db.prepare(sql).run()
    } catch {
      /* column may already exist */
    }
  }
}

function db(env: RecruitmentEnv): D1Database {
  if (!env.SUBMISSIONS_DB) throw new Error('RECRUITMENT_DB_NOT_CONFIGURED')
  return env.SUBMISSIONS_DB
}

function decodeJson(value: unknown): unknown {
  if (typeof value !== 'string') return value
  try { return JSON.parse(value) } catch { return value }
}

function applicant(row: ApplicantRow): ApplicantRow {
  return {
    ...row,
    email_verified: Boolean(row.email_verified),
    skills: decodeJson(row.skills),
    terms_accepted: row.terms_accepted == null ? row.terms_accepted : Boolean(row.terms_accepted),
    privacy_accepted: row.privacy_accepted == null ? row.privacy_accepted : Boolean(row.privacy_accepted),
    otp_confirmed: row.otp_confirmed == null ? row.otp_confirmed : Boolean(row.otp_confirmed),
  }
}

function assessment(row: AssessmentRow): AssessmentRow {
  return { ...row, answers: decodeJson(row.answers), questions: decodeJson(row.questions), passed: row.passed == null ? row.passed : Boolean(row.passed) }
}

export async function upsertApplicantOnVerify(env: RecruitmentEnv, row: {
  application_id: string; full_name: string; email: string; position_title: string; position_code: string; email_verified_at: string
}): Promise<ApplicantRow> {
  const database = db(env); await ensureRecruitmentTables(database)
  const email = row.email.toLowerCase()
  const now = new Date().toISOString()
  const existing = await database.prepare('SELECT * FROM applicants WHERE email = ? AND position_code = ? LIMIT 1').bind(email, row.position_code).first<ApplicantRow>()
  if (existing) {
    await database.prepare(
      'UPDATE applicants SET full_name = ?, email_verified = 1, email_verified_at = ?, otp_confirmed = 1, terms_accepted = 1, privacy_accepted = 1, updated_at = ? WHERE application_id = ?',
    ).bind(row.full_name, row.email_verified_at, now, existing.application_id).run()
    return applicant({
      ...existing,
      full_name: row.full_name,
      email_verified: 1,
      email_verified_at: row.email_verified_at,
      otp_confirmed: 1,
      terms_accepted: 1,
      privacy_accepted: 1,
      updated_at: now,
    })
  }
  await database.prepare(
    `INSERT INTO applicants (
      application_id, full_name, email, email_verified, email_verified_at, position_title, position_code,
      skills, status, source, otp_confirmed, terms_accepted, privacy_accepted, created_at, updated_at
    ) VALUES (?, ?, ?, 1, ?, ?, ?, '[]', 'APPLICATION_IN_PROGRESS', 'recruitment_ava', 1, 1, 1, ?, ?)`,
  ).bind(row.application_id, row.full_name, email, row.email_verified_at, row.position_title, row.position_code, now, now).run()
  const created = await database.prepare('SELECT * FROM applicants WHERE application_id = ?').bind(row.application_id).first<ApplicantRow>()
  if (!created) throw new Error('APPLICANT_UPSERT_FAILED')
  return applicant(created)
}

export async function getApplicantByApplicationId(env: RecruitmentEnv, applicationId: string): Promise<ApplicantRow | null> {
  const database = db(env); await ensureRecruitmentTables(database)
  const row = await database.prepare('SELECT * FROM applicants WHERE application_id = ? LIMIT 1').bind(applicationId).first<ApplicantRow>()
  return row ? applicant(row) : null
}

export async function updateApplicantProfile(env: RecruitmentEnv, applicationId: string, fields: Partial<Record<'full_name'|'phone'|'education'|'experience_years'|'experience_summary'|'skills'|'position_specific'|'availability'|'start_date'|'additional'|'status', string | string[]>>): Promise<ApplicantRow> {
  const database = db(env); await ensureRecruitmentTables(database)
  const allowed = ['full_name','phone','education','experience_years','experience_summary','skills','position_specific','availability','start_date','additional','status'] as const
  const entries = allowed.filter((key) => fields[key] !== undefined)
  if (entries.length) {
    const values = entries.map((key) => key === 'skills' ? JSON.stringify(fields[key]) : fields[key])
    await database.prepare(`UPDATE applicants SET ${entries.map((key) => `${key} = ?`).join(', ')}, updated_at = ? WHERE application_id = ?`).bind(...values, new Date().toISOString(), applicationId).run()
  }
  const row = await getApplicantByApplicationId(env, applicationId)
  if (!row) throw new Error('APPLICANT_NOT_FOUND')
  return row
}

export async function appendApplicantMessage(env: RecruitmentEnv, applicationId: string, role: 'user'|'assistant'|'system', body: string): Promise<void> {
  const database = db(env); await ensureRecruitmentTables(database)
  await database.prepare('INSERT INTO applicant_messages (application_id, role, body, created_at) VALUES (?, ?, ?, ?)').bind(applicationId, role, body.slice(0, 8000), new Date().toISOString()).run()
}

export async function listApplicantMessages(env: RecruitmentEnv, applicationId: string): Promise<ApplicantMessageRow[]> {
  const database = db(env); await ensureRecruitmentTables(database)
  const res = await database
    .prepare('SELECT id, application_id, role, body, created_at FROM applicant_messages WHERE application_id = ? ORDER BY id ASC')
    .bind(applicationId)
    .all<ApplicantMessageRow>()
  return res.results || []
}

/** Persist the full application .txt body on the applicant row (D1). */
export async function saveApplicantApplicationTxt(
  env: RecruitmentEnv,
  applicationId: string,
  fileName: string,
  text: string,
): Promise<void> {
  const database = db(env)
  await ensureRecruitmentTables(database)
  await database
    .prepare(
      'UPDATE applicants SET application_txt = ?, application_txt_name = ?, updated_at = ? WHERE application_id = ?',
    )
    .bind(text.slice(0, 900000), fileName.slice(0, 200), new Date().toISOString(), applicationId)
    .run()
}

export async function getAssessment(env: RecruitmentEnv, applicationId: string): Promise<AssessmentRow | null> {
  const database = db(env); await ensureRecruitmentTables(database)
  const row = await database.prepare('SELECT * FROM assessments WHERE application_id = ? LIMIT 1').bind(applicationId).first<AssessmentRow>()
  return row ? assessment(row) : null
}

export async function saveAssessment(env: RecruitmentEnv, row: AssessmentRow): Promise<AssessmentRow> {
  const database = db(env); await ensureRecruitmentTables(database)
  const values = [row.application_id, row.position_code, row.status, row.current_index, row.correct_count, JSON.stringify(row.answers ?? []), JSON.stringify(row.questions ?? []), row.score_percent ?? null, row.passed == null ? null : (row.passed ? 1 : 0), row.started_at || new Date().toISOString(), row.completed_at ?? null]
  await database.prepare(`INSERT INTO assessments (application_id, position_code, status, current_index, correct_count, answers, questions, score_percent, passed, started_at, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(application_id) DO UPDATE SET position_code=excluded.position_code, status=excluded.status, current_index=excluded.current_index, correct_count=excluded.correct_count, answers=excluded.answers, questions=excluded.questions, score_percent=excluded.score_percent, passed=excluded.passed, started_at=excluded.started_at, completed_at=excluded.completed_at`).bind(...values).run()
  const saved = await getAssessment(env, row.application_id)
  if (!saved) throw new Error('ASSESSMENT_SAVE_FAILED')
  return saved
}
