import { json, type FormEnv } from '../../lib/formCore'
import {
  getApplicantByApplicationId,
  recruitmentConfigured,
  type RecruitmentEnv,
} from '../../lib/recruitmentDb'
import { readVerifiedSession } from '../../lib/recruitmentSession'

type Env = FormEnv & RecruitmentEnv

/** POST /api/recruitment/profile-get  body: { sessionToken } */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!recruitmentConfigured(env)) {
      return json({ error: 'Applicant database is not configured.' }, 503)
    }

    let body: { sessionToken?: string }
    try {
      body = (await request.json()) as { sessionToken?: string }
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }

    const session = await readVerifiedSession(env, String(body.sessionToken || ''))
    if (!session) return json({ error: 'Session expired or invalid. Verify your email again.' }, 401)

    const row = await getApplicantByApplicationId(env, session.applicationId)
    if (!row) return json({ error: 'Applicant record not found.' }, 404)

    const skills = Array.isArray(row.skills)
      ? (row.skills as string[])
      : typeof row.skills === 'string'
        ? (() => {
            try {
              return JSON.parse(row.skills as string) as string[]
            } catch {
              return []
            }
          })()
        : []

    return json({
      ok: true,
      applicationId: row.application_id,
      name: row.full_name,
      email: row.email,
      emailVerified: row.email_verified,
      phone: row.phone || '',
      position: row.position_title,
      positionCode: row.position_code,
      education: row.education || '',
      experienceYears: row.experience_years || '',
      experienceSummary: row.experience_summary || '',
      skills,
      positionSpecific: row.position_specific || '',
      availability: row.availability || '',
      startDate: row.start_date || '',
      additional: row.additional || '',
      status: row.status || 'APPLICATION_IN_PROGRESS',
    })
  } catch (err) {
    console.error('profile-get failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to load profile.' }, 500)
  }
}
