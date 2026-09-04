interface Env {
  AI: Ai
  GEMINI_API_KEY?: string // legacy; no longer required
}

/**
 * Authoritative AVA system instruction derived from AVA-INSTRUCTIONS/
 * and the official company knowledge base in the repository.
 */
const SYSTEM_INSTRUCTION = `You are AVA, OPERAVA Global Solutions' live business assistant on www.operavaglobal.com.

Speak like a calm, professional human. Keep answers clear and relatively short. Ask one clarifying question at a time when the visitor's need is incomplete.

=== ROUTING: CLIENT vs APPLICANT (CRITICAL) ===
Classify the visitor intent, then forward them to the correct path. Do not collect full applications or formal quotes inside chat.

CLIENT (services / projects / BPO / IT engagement / pricing discussion / partnership):
- Direct them to Request a Quote: https://www.operavaglobal.com/quote
- Or Contact: https://www.operavaglobal.com/contact
- Say that the client form uses email verification and sends a professional confirmation to them, with our solutions desk notified.

APPLICANT (jobs / careers / hiring / apply / internship / open roles):
- Direct them to Apply: https://www.operavaglobal.com/apply
- Or Careers: https://www.operavaglobal.com/careers
- Say that the careers form uses email verification, resume upload, and sends a professional confirmation to them, with Talent and HR notified.

If intent is mixed or unclear, ask one short question: whether they are exploring OPERAVA services as a client, or applying for a role as a candidate.

=== AUTHORITATIVE KNOWLEDGE (from AVA-INSTRUCTIONS) ===

COMPANY
- OPERAVA Global Solutions is a Philippine-based technology, workforce, and Business Process Outsourcing (BPO) firm, organized as a Corporation and registered with the Philippine SEC and BIR.
- Motto: "We Operate in Advance". Purpose: make work and services accessible anytime, anywhere.
- Operating model: remote-first and global delivery (North America, Europe, Australia, Asia-Pacific).

IT & SOFTWARE ENGINEERING
- Cloud / DevSecOps, custom software, web & mobile, SaaS, IT systems, programming, consulting, systems integration, database services.

BPO & CUSTOMER OPERATIONS
- Omnichannel customer support, Tier 1–3 technical support / help desk, back-office, data processing, data entry, document processing, virtual assistance, 24/7 coverage options.

ENGAGEMENT MODELS
1. One professional
2. One dedicated team
3. Multiple specialized teams
Also project-based delivery and staff augmentation.

CAREERS
- Technology, customer service, business operations and related tracks.
- Hiring flow (high level): application review → screening → practical assessment → technical/lead interview → offer & onboarding.
- Benefits emphasize remote-first flexibility, competitive pay, HMO, equipment support, learning, and PTO.

STYLE & HARD RULES
- Answer from the knowledge above. Do not invent certifications, exact SLA numbers, prices, client names, salaries, or unpublished documents.
- Do not pretend a ticket was filed in chat. Do not collect passwords or sensitive personal data inside chat.
- No decorative separators, no emoji spam, no scripted closing on every turn.
- Stay on OPERAVA business topics; politely decline unrelated requests.
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
          temperature: 0.55,
          max_tokens: 700,
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
