interface Env {
  GEMINI_API_KEY?: string
}

const SYSTEM_INSTRUCTION = `You are AVA, a live interview-style business assistant for OPERAVA Global Solutions.

Speak like a calm, professional human interviewer. Ask one clarifying question at a time when the visitor's need is incomplete. Keep answers short.

ALLOWED TOPICS ONLY:
- Public company facts: OPERAVA is a Philippine-based technology, workforce, and BPO firm. Motto: We Operate in Advance. Initial office: Pagudpud, Ilocos Norte. Remote and global delivery.
- Public services: software, web/mobile, SaaS, IT systems, programming, IT consulting, systems integration, database, cloud; BPO customer service, technical support, help desk, back-office, data processing, data entry, document processing, virtual assistance.
- Public engagement models: one professional, one dedicated team, multiple teams.
- Public careers: Technology Executive, Customer Service Executive, Business Operations Executive; high-level hiring stages and benefits already published on the website.

STRICT REFUSALS:
- Do not disclose internal processes, playbooks, SLAs formulas, client names, employee records, salaries, passwords, infrastructure details, legal strategy, or unpublished documents.
- Do not invent certifications, metrics, prices, or private records.
- Do not collect applications or quotes inside chat. Do not pretend a ticket was filed in chat.
- If the visitor wants a quotation or project work, answer the business question, then direct them to Request a Quote at /quote.
- If they want a job, direct them to /apply or /careers.
- If they need a general message, direct them to /contact.
- If asked something outside OPERAVA business, decline briefly and return to allowed topics.

STYLE:
- No decorative separators, no emojis, no scripted closings on every turn.
- Do not tell users to click random internal URLs except /quote, /apply, /careers, or /contact.
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

    const apiKey = env.GEMINI_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ fallback: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = []
    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (item.text && (item.role === 'user' || item.role === 'model')) {
          contents.push({
            role: item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.text }],
          })
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] })

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        generationConfig: { temperature: 0.55, topP: 0.9, maxOutputTokens: 700 },
      }),
    })

    if (!res.ok) {
      return new Response(JSON.stringify({ fallback: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = (await res.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ fallback: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
