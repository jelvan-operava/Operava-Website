import { clean, json, type FormEnv } from '../../lib/formCore'
import {
  recruitmentConfigured,
  updateApplicantProfile,
  type RecruitmentEnv,
} from '../../lib/recruitmentDb'
import { readVerifiedSession } from '../../lib/recruitmentSession'

type Env = FormEnv & RecruitmentEnv

/** POST /api/recruitment/profile-update  body: { sessionToken, ...fields } */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!recruitmentConfigured(env)) {
      return json({ error: 'Applicant database is not configured.' }, 503)
    }

    let body: Record<string, unknown>
    try {
      body = (await request.json()) as Record<string, unknown>
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }

    const session = await readVerifiedSession(env, String(body.sessionToken || ''))
    if (!session) return json({ error: 'Session expired or invalid. Verify your email again.' }, 401)

    const skillsRaw = body.skills
    let skills: string[] | undefined
    if (Array.isArray(skillsRaw)) {
      skills = skillsRaw.map((s) => clean(String(s), 80)).filter(Boolean).slice(0, 20)
    }

    const fields = {
      full_name: body.name !== undefined ? clean(body.name, 120) : undefined,
      phone: body.phone !== undefined ? clean(body.phone, 40) : undefined,
      education: body.education !== undefined ? clean(body.education, 400) : undefined,
      experience_years:
        body.experienceYears !== undefined ? clean(body.experienceYears, 20) : undefined,
      experience_summary:
        body.experienceSummary !== undefined ? clean(body.experienceSummary, 800) : undefined,
      skills,
      position_specific:
        body.positionSpecific !== undefined ? clean(body.positionSpecific, 800) : undefined,
      availability: body.availability !== undefined ? clean(body.availability, 200) : undefined,
      start_date: body.startDate !== undefined ? clean(body.startDate, 80) : undefined,
      additional: body.additional !== undefined ? clean(body.additional, 800) : undefined,
    }

    // Drop undefined keys for cleaner patch
    const patch: Parameters<typeof updateApplicantProfile>[2] = {}
    for (const [k, v] of Object.entries(fields)) {
      if (v !== undefined) (patch as Record<string, unknown>)[k] = v
    }

    const row = await updateApplicantProfile(env, session.applicationId, patch)

    return json({
      ok: true,
      applicationId: row.application_id,
      status: row.status,
      updatedAt: row.updated_at,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown'
    console.error('profile-update failed', msg)
    if (msg === 'APPLICANT_NOT_FOUND') return json({ error: 'Applicant record not found.' }, 404)
    return json({ error: 'Unable to update profile.' }, 500)
  }
}
