interface Env {
  AI: Ai
}

const SYSTEM = `You are OPERAVA AI Job Screening — an initial interview assistant for OPERAVA Global Solutions careers.
You are NOT AVA (the business/services assistant). Stay only in hiring and career-screening scope.

PERSONALITY
Professional, calm, concise. Sound like a structured screening interviewer.

LENGTH
1–3 short paragraphs or a short numbered list. No asterisks as bullets.

SCOPE
- Three tracks: Technology Executive, Business Operations Executive, Customer Experience Executive
- Hiring steps: application review → AI initial interview → human screening → skills assessment → interview → offer
- Remote / hybrid PH & global; full-time (CX may involve shifts)
- Formal apply: https://www.operavaglobal.com/apply — careers: https://www.operavaglobal.com/careers
- Talent email: talents@operavaglobal.com

RULES
1. Do not invent salaries, headcount, or guarantees of hire.
2. Do not answer general IT/BPO sales questions — redirect to www.operavaglobal.com or AVA on the main site.
3. Encourage formal application for real consideration.
4. Ask clarifying fit questions when the candidate shares experience.
5. State clearly this AI session is not a final hiring decision.
`

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context
  try {
    const body = (await request.json()) as {
      message?: string
      history?: Array<{ role: 'user' | 'model'; text: string }>
    }
    const message = body.message
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (env.AI) {
      const messages: Array<{ role: string; content: string }> = [{ role: 'system', content: SYSTEM }]
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
          temperature: 0.4,
          max_tokens: 420,
        })) as { response?: string; result?: string }

        const text =
          (typeof result?.response === 'string' && result.response.trim()) ||
          (typeof result?.result === 'string' && result.result.trim()) ||
          ''

        if (text) {
          return new Response(JSON.stringify({ text }), {
            headers: { 'Content-Type': 'application/json' },
          })
        }
      } catch {
        // fall through
      }
    }

    return new Response(JSON.stringify({ fallback: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ fallback: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
