import { json, resolveSecret, type FormEnv } from '../../lib/formCore'
import { parseVerifiedSession } from '../../lib/recruitmentSession'
import {
  getApplicantByApplicationId,
  recruitmentConfigured,
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

async function rest(
  env: RecruitmentEnv,
  path: string,
  init: RequestInit & { prefer?: string } = {},
) {
  const url = String(env.RECRUITMENT_SUPABASE_URL || '').replace(/\/$/, '')
  const key = String(env.RECRUITMENT_SUPABASE_SERVICE_ROLE_KEY || '')
  const headers: Record<string, string> = {
    apikey: key,
    Authorization: 'Bearer ' + key,
    'Content-Type': 'application/json',
  }
  if (init.prefer) headers.Prefer = init.prefer
  const res = await fetch(url + path, { method: init.method || 'GET', headers, body: init.body })
  const raw = await res.text()
  let data: unknown = null
  try {
    data = raw ? JSON.parse(raw) : null
  } catch {
    data = null
  }
  return { ok: res.ok, status: res.status, data, raw }
}

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

    // Upsert assessment row
    const existing = await rest(
      env,
      '/rest/v1/assessments?application_id=eq.' +
        encodeURIComponent(session.applicationId) +
        '&select=*&limit=1',
    )
    if (existing.ok && Array.isArray(existing.data) && existing.data[0]?.status === 'COMPLETE') {
      return json({
        error: 'Assessment already completed for this application.',
        status: 'COMPLETE',
        passed: existing.data[0].passed,
        scorePercent: existing.data[0].score_percent,
        correctCount: existing.data[0].correct_count,
      }, 409)
    }

    const payload = {
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

    if (existing.ok && Array.isArray(existing.data) && existing.data[0]) {
      await rest(
        env,
        '/rest/v1/assessments?application_id=eq.' + encodeURIComponent(session.applicationId),
        { method: 'PATCH', prefer: 'return=minimal', body: JSON.stringify(payload) },
      )
    } else {
      const ins = await rest(env, '/rest/v1/assessments', {
        method: 'POST',
        prefer: 'return=minimal',
        body: JSON.stringify(payload),
      })
      if (!ins.ok) {
        console.error('assessment insert', ins.status, ins.raw.slice(0, 300))
        return json({
          error:
            'Could not create assessment. Ensure supabase/recruitment/002_assessments.sql has been applied.',
        }, 502)
      }
    }

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
