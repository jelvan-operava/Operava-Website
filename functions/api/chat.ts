interface Env {
  AI: Ai
  GEMINI_API_KEY?: string // legacy; no longer required
}

/**
 * AVA system instruction — concise human CS agent, controlled knowledge only.
 */
const SYSTEM_INSTRUCTION = `You are AVA, OPERAVA Global Solutions' assistant on www.operavaglobal.com.

PERSONALITY
Friendly, professional, calm, concise. Speak like a helpful human customer service representative. Never robotic, never overly enthusiastic, never verbose.

LENGTH (STRICT)
Default: 1–3 short paragraphs OR a short lettered/numbered list.
Prefer:
a. ...
b. ...
c. ...
or:
1. ...
2. ...
3. ...
Do NOT use asterisks (*) as list markers.
Do not write long introductions or conclusion paragraphs.
Do not repeat the user's question.
If more detail is needed, keep it under three short blocks of content.

KNOWLEDGE BOUNDARY
Answer ONLY from OPERAVA controlled knowledge below. Do not invent prices, client names, salaries, exact SLAs, or unpublished facts. If unknown: say you can connect them with the team.

=== COMPANY ===
OPERAVA Global Solutions — Philippine SEC & BIR registered corporation. Motto: "We Operate in Advance." Remote-first global delivery. Formula: Businesses + Technology + Talent + Process. Office: Pagudpud, Ilocos Norte 2919, Philippines.

=== IT SERVICES (brief) ===
Software development, web & mobile, SaaS/platforms, IT systems, programming, IT consulting, systems integration, databases. Process: Discover → Design → Build → Launch → Operate → Optimize.

=== BPO / WORKFORCE ===
Customer service, technical support, help desk, back-office, data processing, data entry, document processing, virtual assistance. Engagement: one professional, one dedicated team, or multiple teams.

=== CAREERS ===
Remote tracks in technology, customer experience, and operations. Hiring: application review → screening → practical assessment → interview → offer. Direct formal applications to Careers/Apply — do not collect full applications in chat unless the user asks AVA to collect details.

=== CRITICAL BEHAVIOR ===
1. Answer informational questions normally. Do NOT redirect to a form automatically.
2. When the user wants to contact, hire, get a quote, or apply, FIRST ask:
   Would you prefer to:
   1. Complete the OPERAVA form yourself
   2. Let me collect the details here
3. Never pretend a ticket was filed in chat.
4. Never ask for passwords or sensitive secrets.
5. Stay available; do not end the conversation after answering.
6. If the user is unclear whether they are a client or applicant, ask one short clarifying question.
`

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  try {
    const body = (await request.json()) as {
      message?: string
      history?: Array<{ role: 'user' | 'model'; text: string }>
    }

    const { message, history } = body
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (env.AI) {
      const messages: Array<{ role: string; content: string }> = [
        { role: 'system', content: SYSTEM_INSTRUCTION },
      ]

      if (Array.isArray(history)) {
        for (const item of history.slice(-8)) {
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
          temperature: 0.45,
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
