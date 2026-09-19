import { json, type FormEnv } from '../../lib/formCore'
import { readVerifiedSession } from '../../lib/recruitmentSession'
import {
  recruitmentConfigured,
  updateApplicantProfile,
  type RecruitmentEnv,
} from '../../lib/recruitmentDb'
import { PASS_CORRECT, TOTAL_QUESTIONS } from '../../lib/assessmentBank'

type Env = FormEnv & RecruitmentEnv & { AI?: Ai }

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

async function scoreAnswer(env: Env, question: string, answer: string): Promise<boolean> {
  const trimmed = answer.trim()
  if (trimmed.length < 8) return false

  if (env.AI) {
    try {
      const result = (await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [
          {
            role: 'system',
            content:
              'You are a strict but fair exam grader for OPERAVA recruitment. Reply with ONLY JSON: {"correct":true} or {"correct":false}. Mark correct if the answer is substantially right, relevant, and shows understanding. Mark false if empty, off-topic, nonsense, or clearly wrong.',
          },
          {
            role: 'user',
            content: `Question: ${question}\n\nApplicant answer: ${trimmed}\n\nJSON only.`,
          },
        ],
        temperature: 0.1,
        max_tokens: 40,
      })) as { response?: string }
      const text = String(result?.response || '')
      const m = text.match(/\{\s*"correct"\s*:\s*(true|false)\s*\}/i)
      if (m) return m[1].toLowerCase() === 'true'
      if (/\btrue\b/i.test(text) && !/\bfalse\b/i.test(text)) return true
    } catch {
      /* heuristic fallback */
    }
  }

  return trimmed.split(/\s+/).length >= 6 && trimmed.length >= 24
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!recruitmentConfigured(env)) {
      return json({ error: 'Applicant database is not configured.' }, 503)
    }
    let body: { sessionToken?: string; answer?: string }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return json({ error: 'Invalid request body.' }, 400)
    }
    const session = await readVerifiedSession(env, String(body.sessionToken || ''))
    if (!session) return json({ error: 'Session expired.' }, 401)
    const answer = String(body.answer || '').trim()
    if (!answer) return json({ error: 'Enter an answer before submitting.' }, 400)

    const found = await rest(
      env,
      '/rest/v1/assessments?application_id=eq.' +
        encodeURIComponent(session.applicationId) +
        '&select=*&limit=1',
    )
    if (!found.ok || !Array.isArray(found.data) || !found.data[0]) {
      return json({ error: 'No active assessment. Start the assessment first.' }, 400)
    }
    const row = found.data[0] as {
      status: string
      current_index: number
      correct_count: number
      answers: unknown
      questions: Array<{ id: string; section: string; prompt: string }>
    }
    if (row.status === 'COMPLETE') {
      return json({ error: 'Assessment already completed.', status: 'COMPLETE' }, 409)
    }

    const idx = Number(row.current_index) || 0
    const questions = Array.isArray(row.questions) ? row.questions : []
    if (idx < 0 || idx >= questions.length) {
      return json({ error: 'Assessment index error.' }, 500)
    }
    const current = questions[idx]
    const correct = await scoreAnswer(env, current.prompt, answer)
    const answers = Array.isArray(row.answers) ? [...(row.answers as unknown[])] : []
    answers.push({
      id: current.id,
      correct,
      answer: answer.slice(0, 4000),
      at: new Date().toISOString(),
    })
    const correctCount = (Number(row.correct_count) || 0) + (correct ? 1 : 0)
    const nextIndex = idx + 1
    const done = nextIndex >= TOTAL_QUESTIONS || nextIndex >= questions.length

    if (done) {
      const passed = correctCount >= PASS_CORRECT
      const scorePercent = Math.round((correctCount / TOTAL_QUESTIONS) * 1000) / 10
      await rest(
        env,
        '/rest/v1/assessments?application_id=eq.' + encodeURIComponent(session.applicationId),
        {
          method: 'PATCH',
          prefer: 'return=minimal',
          body: JSON.stringify({
            status: 'COMPLETE',
            current_index: nextIndex,
            correct_count: correctCount,
            answers,
            score_percent: scorePercent,
            passed,
            completed_at: new Date().toISOString(),
          }),
        },
      )
      await updateApplicantProfile(env, session.applicationId, {
        status: passed ? 'IN_POOL' : 'ASSESSMENT_COMPLETE',
      })
      return json({
        ok: true,
        done: true,
        lastCorrect: correct,
        correctCount,
        total: TOTAL_QUESTIONS,
        scorePercent,
        passed,
        passMark: PASS_CORRECT,
        message: passed
          ? 'Assessment complete. You passed and are eligible for the recruitment pool subject to Talent Acquisition review.'
          : 'Assessment complete. Score below the 85% pass mark. Talent Acquisition may still review your application for further evaluation.',
      })
    }

    await rest(
      env,
      '/rest/v1/assessments?application_id=eq.' + encodeURIComponent(session.applicationId),
      {
        method: 'PATCH',
        prefer: 'return=minimal',
        body: JSON.stringify({
          current_index: nextIndex,
          correct_count: correctCount,
          answers,
        }),
      },
    )

    const next = questions[nextIndex]
    return json({
      ok: true,
      done: false,
      lastCorrect: correct,
      correctCount,
      index: nextIndex,
      question: {
        number: nextIndex + 1,
        section: next.section,
        prompt: next.prompt,
      },
      total: TOTAL_QUESTIONS,
    })
  } catch (err) {
    console.error('assessment-answer failed', err instanceof Error ? err.message : 'unknown')
    return json({ error: 'Unable to submit answer.' }, 500)
  }
}
