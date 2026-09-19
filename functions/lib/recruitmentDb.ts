/**
 * Recruitment AVA — Supabase PostgREST client (service_role only).
 * Secrets: RECRUITMENT_SUPABASE_URL, RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY
 */

export interface RecruitmentEnv {
  RECRUITMENT_SUPABASE_URL?: string
  RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY?: string
  OTP_SECRET?: string
  RESEND_API_KEY?: string
  RESEND_FROM?: string
}

export interface ApplicantRow {
  id?: string
  application_id: string
  full_name: string
  email: string
  email_verified: boolean
  email_verified_at?: string | null
  phone?: string | null
  position_title: string
  position_code: string
  education?: string | null
  experience_years?: string | null
  experience_summary?: string | null
  skills?: string[] | unknown
  position_specific?: string | null
  availability?: string | null
  start_date?: string | null
  additional?: string | null
  status?: string
  source?: string
  created_at?: string
  updated_at?: string
}

export function recruitmentConfigured(env: RecruitmentEnv): boolean {
  const url = env.RECRUITMENT_SUPABASE_URL && String(env.RECRUITMENT_SUPABASE_URL).trim()
  const key =
    env.RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY &&
    String(env.RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY).trim()
  return Boolean(url && key && url.startsWith('http') && key.length > 20)
}

function base(env: RecruitmentEnv) {
  const url = String(env.RECRUITMENT_SUPABASE_URL || '')
    .trim()
    .replace(/\/$/, '')
  const key = String(env.RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY || '').trim()
  if (!url || !key) throw new Error('RECRUITMENT_DB_NOT_CONFIGURED')
  return { url, key }
}

async function rest<T>(
  env: RecruitmentEnv,
  path: string,
  init: RequestInit & { prefer?: string } = {},
): Promise<{ ok: boolean; status: number; data: T | null; raw: string }> {
  const { url, key } = base(env)
  const headers: Record<string, string> = {
    apikey: key,
    Authorization: 'Bearer ' + key,
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  }
  if (init.prefer) headers.Prefer = init.prefer

  const res = await fetch(url + path, {
    method: init.method || 'GET',
    headers,
    body: init.body,
  })
  const raw = await res.text().catch(() => '')
  let data: T | null = null
  if (raw) {
    try {
      data = JSON.parse(raw) as T
    } catch {
      data = null
    }
  }
  return { ok: res.ok, status: res.status, data, raw }
}

export async function upsertApplicantOnVerify(
  env: RecruitmentEnv,
  row: {
    application_id: string
    full_name: string
    email: string
    position_title: string
    position_code: string
    email_verified_at: string
  },
): Promise<ApplicantRow> {
  // Prefer existing row for same email+position (update verification + name)
  const email = row.email.toLowerCase()
  const existing = await rest<ApplicantRow[]>(
    env,
    '/rest/v1/applicants?email=eq.' +
      encodeURIComponent(email) +
      '&position_code=eq.' +
      encodeURIComponent(row.position_code) +
      '&select=*&limit=1',
  )

  if (existing.ok && Array.isArray(existing.data) && existing.data[0]) {
    const id = existing.data[0].application_id
    const patch = await rest<ApplicantRow[]>(env, '/rest/v1/applicants?application_id=eq.' + encodeURIComponent(id), {
      method: 'PATCH',
      prefer: 'return=representation',
      body: JSON.stringify({
        full_name: row.full_name,
        email_verified: true,
        email_verified_at: row.email_verified_at,
        status: existing.data[0].status || 'APPLICATION_IN_PROGRESS',
      }),
    })
    if (!patch.ok || !Array.isArray(patch.data) || !patch.data[0]) {
      console.error('applicant patch failed', patch.status, patch.raw.slice(0, 300))
      throw new Error('APPLICANT_UPSERT_FAILED')
    }
    return patch.data[0]
  }

  const insert = await rest<ApplicantRow[]>(env, '/rest/v1/applicants', {
    method: 'POST',
    prefer: 'return=representation',
    body: JSON.stringify({
      application_id: row.application_id,
      full_name: row.full_name,
      email,
      email_verified: true,
      email_verified_at: row.email_verified_at,
      position_title: row.position_title,
      position_code: row.position_code,
      status: 'APPLICATION_IN_PROGRESS',
      source: 'recruitment_ava',
      skills: [],
    }),
  })

  if (!insert.ok || !Array.isArray(insert.data) || !insert.data[0]) {
    console.error('applicant insert failed', insert.status, insert.raw.slice(0, 300))
    throw new Error('APPLICANT_UPSERT_FAILED')
  }
  return insert.data[0]
}

export async function getApplicantByApplicationId(
  env: RecruitmentEnv,
  applicationId: string,
): Promise<ApplicantRow | null> {
  const res = await rest<ApplicantRow[]>(
    env,
    '/rest/v1/applicants?application_id=eq.' +
      encodeURIComponent(applicationId) +
      '&select=*&limit=1',
  )
  if (!res.ok || !Array.isArray(res.data) || !res.data[0]) return null
  return res.data[0]
}

export async function updateApplicantProfile(
  env: RecruitmentEnv,
  applicationId: string,
  fields: Partial<{
    full_name: string
    phone: string
    education: string
    experience_years: string
    experience_summary: string
    skills: string[]
    position_specific: string
    availability: string
    start_date: string
    additional: string
    status: string
  }>,
): Promise<ApplicantRow> {
  const body: Record<string, unknown> = {}
  if (fields.full_name !== undefined) body.full_name = fields.full_name
  if (fields.phone !== undefined) body.phone = fields.phone
  if (fields.education !== undefined) body.education = fields.education
  if (fields.experience_years !== undefined) body.experience_years = fields.experience_years
  if (fields.experience_summary !== undefined) body.experience_summary = fields.experience_summary
  if (fields.skills !== undefined) body.skills = fields.skills
  if (fields.position_specific !== undefined) body.position_specific = fields.position_specific
  if (fields.availability !== undefined) body.availability = fields.availability
  if (fields.start_date !== undefined) body.start_date = fields.start_date
  if (fields.additional !== undefined) body.additional = fields.additional
  if (fields.status !== undefined) body.status = fields.status

  if (Object.keys(body).length === 0) {
    const current = await getApplicantByApplicationId(env, applicationId)
    if (!current) throw new Error('APPLICANT_NOT_FOUND')
    return current
  }

  const res = await rest<ApplicantRow[]>(
    env,
    '/rest/v1/applicants?application_id=eq.' + encodeURIComponent(applicationId),
    {
      method: 'PATCH',
      prefer: 'return=representation',
      body: JSON.stringify(body),
    },
  )
  if (!res.ok || !Array.isArray(res.data) || !res.data[0]) {
    console.error('applicant update failed', res.status, res.raw.slice(0, 300))
    throw new Error('APPLICANT_UPDATE_FAILED')
  }
  return res.data[0]
}

export async function appendApplicantMessage(
  env: RecruitmentEnv,
  applicationId: string,
  role: 'user' | 'assistant' | 'system',
  body: string,
): Promise<void> {
  const res = await rest(env, '/rest/v1/applicant_messages', {
    method: 'POST',
    prefer: 'return=minimal',
    body: JSON.stringify({
      application_id: applicationId,
      role,
      body: body.slice(0, 8000),
    }),
  })
  if (!res.ok) {
    console.error('message append failed', res.status, res.raw.slice(0, 200))
  }
}
