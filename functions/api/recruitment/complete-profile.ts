import { json, resolveSecret, type FormEnv } from '../../lib/formCore'
import { parseVerifiedSession } from '../../lib/recruitmentSession'
import {
  getApplicantByApplicationId,
  recruitmentConfigured,
  updateApplicantProfile,
  type RecruitmentEnv,
} from '../../lib/recruitmentDb'
import { isProfileCompleteForAssessment } from '../../lib/recruitmentGuide'

type Env = FormEnv & RecruitmentEnv

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!recruitmentConfigured(env)) {
      return json({ error: 'Applicant database is not configured.' }, 503)
    }
    const secret = resolveSecret(env)
    let body: { sessionToken?: string }
    try {
      body = (await request.json()) as { sessionToken?: string }
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }
    const session = await parseVerifiedSession(secret, String(body.sessionToken || ''))
    if (!session) return json({ error: 'Session expired. Verify your email again.' }, 401)

    const row = await getApplicantByApplicationId(env, session.applicationId)
    if (!row) return json({ error: 'Applicant record not found.' }, 404)

    const snapshot = {
      name: row.full_name,
      phone: row.phone || '',
      education: row.education || '',
      experienceYears: row.experience_years || '',
      experienceSummary: row.experience_summary || '',
      skills: Array.isArray(row.skills) ? (row.skills as string[]) : [],
      positionSpecific: row.position_specific || '',
      availability: row.availability || '',
      startDate: row.start_date || '',
      additional: row.additional || '',
    }

    if (!isProfileCompleteForAssessment(snapshot)) {
      return json(
        {
          error: 'Required application fields are still incomplete.',
          complete: false,
          missing: {
            experience: !(snapshot.experienceYears && snapshot.experienceSummary),
            education: !snapshot.education,
            skills: snapshot.skills.length < 2,
            positionSpecific: !snapshot.positionSpecific,
            availability: !snapshot.availability,
            startDate: !snapshot.startDate,
          },
        },
        400,
      )
    }

    const updated = await updateApplicantProfile(env, session.applicationId, {
      status: 'PROFILE_COMPLETE',
    })

    return json({
      ok: true,
      complete: true,
      status: updated.status,
      applicationId: updated.application_id,
      message:
        'Profile validated. You may start the 30-question live assessment. Passing requires at least 26 correct answers (85%).',
    })
  } catch (err) {
    console.error('complete-profile failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to complete profile validation.' }, 500)
  }
}
