import { json, type FormEnv } from '../../lib/formCore'
import { readVerifiedSession } from '../../lib/recruitmentSession'
import {
  getApplicantByApplicationId,
  getAssessment,
  recruitmentConfigured,
  saveAssessment,
  updateApplicantProfile,
  type RecruitmentEnv,
} from '../../lib/recruitmentDb'
import { isProfileCompleteForAssessment } from '../../lib/recruitmentGuide'
import {
  buildQuestionSet,
  TOTAL_QUESTIONS,
  type PositionCode,
} from '../../lib/assessmentBank'

type Env = FormEnv & RecruitmentEnv

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
    if (!session) return json({ error: 'Session expired. Verify your email again.' }, 401)

    const row = await getApplicantByApplicationId(env, session.applicationId)
    if (!row) return json({ error: 'Applicant not found.' }, 404)

    const snapshot = {
      experienceYears: row.experience_years || '',
      experienceSummary: row.experience_summary || '',
      education: row.education || '',
      skills: Array.isArray(row.skills) ? (row.skills as string[]) : [],
      positionSpecific: row.position_specific || '',
      availability: row.availability || '',
      startDate: row.start_date || '',
    }
    if (!isProfileCompleteForAssessment(snapshot)) {
      return json({ error: 'Complete the application profile before starting the assessment.' }, 400)
    }

    const positionCode = (row.position_code || session.positionCode) as PositionCode
    if (!['tech', 'ops', 'cx'].includes(positionCode)) {
      return json({ error: 'Invalid position.' }, 400)
    }

    const questions = buildQuestionSet(positionCode)
    if (questions.length !== TOTAL_QUESTIONS) {
      return json({ error: 'Assessment bank is misconfigured.' }, 500)
    }

    const existing = await getAssessment(env, session.applicationId)
    if (existing && existing.status === 'COMPLETE') {
      return json(
        {
          error: 'Assessment already completed for this application.',
          status: 'COMPLETE',
          passed: existing.passed,
          scorePercent: existing.score_percent,
          correctCount: existing.correct_count,
        },
        409,
      )
    }

    const assessment = {
      application_id: session.applicationId,
      position_code: positionCode,
      status: 'IN_PROGRESS',
      current_index: 0,
      correct_count: 0,
      answers: [],
      questions: questions.map((q) => ({ id: q.id, section: q.section, prompt: q.prompt, topic: q.topic })),
      score_percent: null,
      passed: null,
      started_at: new Date().toISOString(),
      completed_at: null,
    }

    await saveAssessment(env, assessment)
    await updateApplicantProfile(env, session.applicationId, { status: 'ASSESSMENT_IN_PROGRESS' })

    const q0 = questions[0]
    return json({
      ok: true,
      total: TOTAL_QUESTIONS,
      index: 0,
      question: {
        number: 1,
        section: q0.section,
        prompt: q0.prompt,
      },
      notice:
        'This is a live assessment. Answer in your own words. Do not request the answer key. One question at a time.',
    })
  } catch (err) {
    console.error('assessment-start failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to start assessment.' }, 500)
  }
}
