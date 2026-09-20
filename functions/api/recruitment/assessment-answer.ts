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
import { PASS_CORRECT, TOTAL_QUESTIONS } from '../../lib/assessmentBank'
import {
  backupRecruitmentAssessmentToMega,
  type MegaBackupEnv,
} from '../../lib/megaBackupHook'
import { sendRecruitmentPoolEmails } from '../../lib/recruitmentEmails'

type Env = FormEnv & RecruitmentEnv & MegaBackupEnv & { AI?: Ai; TALENT_INBOX?: string }

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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context
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

    const row = await getAssessment(env, session.applicationId)
    if (!row) return json({ error: 'No active assessment. Start the assessment first.' }, 400)

    if (row.status === 'COMPLETE') {
      return json({ error: 'Assessment already completed.', status: 'COMPLETE' }, 409)
    }

    const questions = Array.isArray(row.questions) ? (row.questions as Array<{ id: string; section: string; prompt: string }>) : []
    const idx = Number(row.current_index) || 0
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
      const completedAt = new Date().toISOString()

      await saveAssessment(env, {
        ...row,
        status: 'COMPLETE',
        current_index: nextIndex,
        correct_count: correctCount,
        answers,
        score_percent: scorePercent,
        passed,
        completed_at: completedAt,
      })

      await updateApplicantProfile(env, session.applicationId, {
        status: passed ? 'IN_POOL' : 'ASSESSMENT_COMPLETE',
      })

      const applicant = await getApplicantByApplicationId(env, session.applicationId)
      const fullName = applicant?.full_name || session.name || 'Applicant'
      const email = applicant?.email || session.email
      const positionTitle = applicant?.position_title || session.position || ''
      const skills = Array.isArray(applicant?.skills) ? (applicant!.skills as string[]) : []

      const megaTask = backupRecruitmentAssessmentToMega(env, {
        applicationId: session.applicationId,
        fullName,
        email,
        phone: applicant?.phone || '',
        positionTitle,
        positionCode: applicant?.position_code || session.positionCode || '',
        education: applicant?.education || '',
        experienceYears: applicant?.experience_years || '',
        experienceSummary: applicant?.experience_summary || '',
        skills,
        positionSpecific: applicant?.position_specific || '',
        availability: applicant?.availability || '',
        startDate: applicant?.start_date || '',
        additional: applicant?.additional || '',
        status: passed ? 'IN_POOL' : 'ASSESSMENT_COMPLETE',
        assessment: {
          correctCount,
          total: TOTAL_QUESTIONS,
          scorePercent,
          passed,
          completedAt,
        },
      })

      let mailTask: Promise<void> = Promise.resolve()
      if (passed && email) {
        mailTask = sendRecruitmentPoolEmails(env, {
          name: fullName,
          email,
          applicationId: session.applicationId,
          positionTitle,
          scorePercent,
          correctCount,
          total: TOTAL_QUESTIONS,
        }).catch((err) => {
          console.error('pool confirmation email failed', err instanceof Error ? err.message : 'unknown')
        })
      }

      try {
        const ctx = context as { waitUntil?: (p: Promise<unknown>) => void }
        if (typeof ctx.waitUntil === 'function') {
          ctx.waitUntil(Promise.all([megaTask, mailTask]))
        } else {
          void Promise.all([megaTask, mailTask])
        }
      } catch {
        void Promise.all([megaTask, mailTask])
      }

      return json({
        ok: true,
        done: true,
        lastCorrect: correct,
        correctCount,
        total: TOTAL_QUESTIONS,
        scorePercent,
        passed,
        passMark: PASS_CORRECT,
        applicationId: session.applicationId,
        name: fullName,
        message: passed
          ? 'Assessment complete. You passed and are eligible for the recruitment pool. A confirmation email has been sent (Talent Acquisition is notified).'
          : 'Assessment complete. Score below the 85% pass mark. Talent Acquisition may still review your application for further evaluation.',
      })
    }

    await saveAssessment(env, {
      ...row,
      current_index: nextIndex,
      correct_count: correctCount,
      answers,
    })

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
