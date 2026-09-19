import { nextInterviewPrompt } from '../lib/recruitmentGuide'

interface Env {
  AI: Ai
}

const SYSTEM = `You are OPERAVA Recruitment AVA — the official hiring conversation assistant for OPERAVA Global Solutions.
You are NOT the main-site AVA for sales. Stay only in recruitment and careers scope.

PERSONALITY
Professional, calm, friendly, concise (1–3 short paragraphs).

MISSION
Guide the verified applicant through application categories: experience, education, skills, position-specific examples, availability, start date, phone, additional notes.
Acknowledge answers, extract what they shared, ask the single next missing question.
When information is complete, tell them they can start the 30-question live assessment (pass mark 26/30 = 85%).

RULES
1. Do not invent salaries, headcount, or guarantees of hire.
2. Do not answer general IT/BPO sales questions — redirect to www.operavaglobal.com.
3. This AI session is not a final hiring decision.
4. Do not reveal assessment answer keys.
5. Prefer one clear next question over long lists.
`

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context
  try {
    const body = (await request.json()) as {
      message?: string
      history?: Array<{ role: 'user' | 'model'; text: string }>
      profile?: Record<string, unknown>
      positionTitle?: string
    }
    const message = body.message
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const profile = (body.profile || {}) as {
      experienceYears?: string
      experienceSummary?: string
      education?: string
      skills?: string[]
      positionSpecific?: string
      availability?: string
      startDate?: string
      phone?: string
      additional?: string
    }
    const guide = nextInterviewPrompt(profile, String(body.positionTitle || 'this role'))

    if (env.AI) {
      const messages: Array<{ role: string; content: string }> = [
        { role: 'system', content: SYSTEM },
        {
          role: 'system',
          content:
            'Current profile completeness guide: ' +
            JSON.stringify(guide) +
            '. Prefer ending with the suggested next prompt if the applicant has not finished.',
        },
      ]
      if (Array.isArray(body.history)) {
        for (const item of body.history.slice(-8)) {
          if (item.text && (item.role === 'user' || item.role === 'model')) {
            messages.push({
              role: item.role === 'model' ? 'assistant' : 'user',
              content: item.text,
            })
          }
        }
      }
      messages.push({ role: 'user', content: message })

      try {
        const result = (await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
          messages,
          temperature: 0.35,
          max_tokens: 420,
        })) as { response?: string; result?: string }

        const text =
          (typeof result?.response === 'string' && result.response.trim()) ||
          (typeof result?.result === 'string' && result.result.trim()) ||
          ''

        if (text) {
          return new Response(
            JSON.stringify({ text, guideComplete: guide.complete, nextCategory: guide.category }),
            { headers: { 'Content-Type': 'application/json' } },
          )
        }
      } catch {
        // fall through
      }
    }

    return new Response(
      JSON.stringify({
        text: guide.prompt,
        guideComplete: guide.complete,
        nextCategory: guide.category,
        fallback: true,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch {
    return new Response(JSON.stringify({ fallback: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
