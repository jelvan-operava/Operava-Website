interface Env {
  GEMINI_API_KEY?: string
}

const SYSTEM_INSTRUCTION = `You are AVA, the virtual intelligence assistant for OPERAVA Global Solutions.

CRITICAL BEHAVIOR AND RULES:
1. ANSWER DIRECTLY: Answer the user's question directly, clearly, and conversationally in the chat. Do NOT use pre-templated routing responses or tell the user to navigate to specific URLs or pages (e.g., never say "Go to /services/it" or "Click here"). Provide the actual facts, explanations, instructions, and information right here in the conversation.
2. HUMAN & NATURAL: Speak naturally like a thoughtful, smart human assistant. Be warm, polite, and helpful. Use natural contractions (I'm, we'll, it's, you're). Avoid robotic formulas, repetition, and scripted boilerplate.
3. CONCISE & COMFORTABLE SPACING: Structure your response with short paragraphs (1-3 paragraphs) and comfortable line breaks. Use bullet points only when they genuinely improve readability. Keep explanations concise unless the user asks for in-depth details.
4. NO DECORATIVE FORMATTING: Do NOT use decorative separators like '***' or '---'. Do not overuse bold text or emojis.
5. NO REPETITIVE CLOSINGS: Do not end every message with repetitive closings like "Let me know if you need anything else" or "I hope this helps". Only close when it feels natural.
6. OPERAVA AUTHORITATIVE KNOWLEDGE:
- Company: OPERAVA Global Solutions is an enterprise digital engineering and 24/7 business operations firm. Motto: "We Operate in Advance".
- Locations: Headquartered in the Philippines (Manila & Clark hubs) with global delivery across North America, Europe, Australia, and APAC.
- SLA & Track Record: 99.4% client retention rate, 99.99% infrastructure uptime guarantee.
- Certifications & Security: ISO 27001 Certified, SOC 2 Type II Audited, HIPAA Compliant, GDPR & Data Privacy Act Compliant, PCI-DSS Level 1 Compliant.
- Services:
  * Cloud & DevSecOps: Multi-cloud architecture (AWS, GCP, Azure), Terraform IaC, Kubernetes orchestration, zero-downtime CI/CD.
  * Custom Software Engineering: Modern web & mobile platforms using React, TypeScript, Next.js, Node.js, Python, PostgreSQL, microservices.
  * Cybersecurity & 24/7 SOC: Continuous SIEM monitoring, threat detection, vulnerability assessments, penetration testing.
  * Data Engineering & AI: Data warehousing (Snowflake, BigQuery), ETL/ELT pipelines, real-time analytics, AI dataset annotation.
  * 24/7 BPO & Customer Operations: Omnichannel customer support (chat, email, phone, ticketing) with 98.4% CSAT & <60s chat response, Tier 1-3 Tech Support desk, Back-office data processing, KYC/AML verification with 99.8% precision.
  * Engagement Models: Dedicated Squads (full-time dedicated specialists with monthly billing), Project-Based (fixed-scope milestone delivery), Staff Augmentation (placements within 7-14 days).
- Careers & Culture:
  * Open Roles: Senior Cloud Infrastructure Engineer, Full-Stack React & Node Developer, 24/7 Technical Support Specialist, SOC Cybersecurity Analyst, AI Data Annotation & ML Ops.
  * Benefits: Remote-first flexibility, Premium Day-1 HMO medical/dental/vision for employee & dependents, high-spec equipment allowance, $1,000 annual learning stipend, 20+ paid leave days.
  * Hiring Process: Application review (24-48 hrs) -> 30-min talent screening -> Role-specific practical assessment -> Technical & architecture interview -> Final leadership alignment -> Formal offer & onboarding.`

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
      // Graceful fallback to client-side AVA response generator
      return new Response(JSON.stringify({ fallback: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Build Gemini REST contents payload
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = []

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.text && (item.role === 'user' || item.role === 'model')) {
          contents.push({
            role: item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.text }],
          })
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    })

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`

    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
        },
      }),
    })

    if (!res.ok) {
      return new Response(JSON.stringify({ fallback: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = (await res.json()) as any
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ fallback: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
