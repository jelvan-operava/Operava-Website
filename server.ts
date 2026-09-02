import express from 'express'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import { GoogleGenAI } from '@google/genai'

const SYSTEM_INSTRUCTION = `You are AVA, the virtual intelligence assistant for OPERAVA Global Solutions.

CRITICAL BEHAVIOR AND RULES:
1. ANSWER DIRECTLY: Answer the user's question directly, clearly, and conversationally right in the chat. Do NOT use pre-templated routing links or tell the user to navigate to specific URLs or pages (e.g., never say "Go to /services/it" or "Click here"). Provide the actual facts, explanations, instructions, and information directly in the conversation.
2. HUMAN & NATURAL: Speak naturally like a thoughtful, smart human assistant. Be warm, polite, and helpful. Use natural contractions (I'm, we'll, it's, you're). Avoid robotic formulas, repetition, and scripted boilerplate.
3. CONCISE & COMFORTABLE SPACING: Structure your response with short paragraphs (1-3 paragraphs) and comfortable line breaks. Use bullet points only when they genuinely improve readability. Keep explanations concise unless the user asks for in-depth details.
4. NO DECORATIVE FORMATTING: Do NOT use decorative separators like '***' or '---'. Do not overuse bold text or emojis.
5. NO REPETITIVE CLOSINGS: Do not end every message with repetitive closings like "Let me know if you need anything else" or "I hope this helps". Only close when it feels natural.
6. OPERAVA AUTHORITATIVE KNOWLEDGE (DERIVED FROM OFFICIAL COMPANY PROFILE & KNOWLEDGE BASE):
- Company: OPERAVA Global Solutions is a Philippine-based technology, workforce, and Business Process Outsourcing (BPO) company.
`

let genAIClient: GoogleGenAI | null = null

function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  }
  return genAIClient
}

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

function clean(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
}

async function startServer() {
  const app = express()
  const PORT = Number(process.env.PORT || 3000)

  app.use(express.json())

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  app.post('/api/inquiry', async (req, res) => {
    try {
      const body = req.body || {}
      if (clean(body.website, 80)) {
        res.json({ ok: true, referenceId: 'OPV-FILTERED' })
        return
      }
      const kind = clean(body.kind, 40)
      const career = kind === 'career' || kind === 'ai-career'
      const allowed = ['contact', 'service', 'ai-consultation', 'career', 'ai-career']
      if (!allowed.includes(kind)) {
        res.status(400).json({ error: 'Unknown inquiry type.' })
        return
      }
      const name = clean(body.name, 120)
      const email = clean(body.email, 180).toLowerCase()
      if (name.length < 2 || !EMAIL_RE.test(email)) {
        res.status(400).json({ error: 'Name and a valid email are required.' })
        return
      }
      const apiKey = process.env.RESEND_API_KEY
      if (!apiKey) {
        res.status(503).json({ error: 'Email delivery is not configured yet.' })
        return
      }
      const to = career
        ? process.env.TALENT_INBOX || 'talents@operavaglobal.com'
        : process.env.CLIENT_INBOX || 'client@operavaglobal.com'
      const from = process.env.RESEND_FROM || 'OPERAVA Website <noreply@operavaglobal.com>'
      const referenceId = `OPV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
      const service = clean(body.service, 160)
      const role = clean(body.role, 180)
      const notes = clean(body.notes || body.description, 4000)
      const subject = career
        ? `[Career] ${role || 'Application'} — ${name} (${referenceId})`
        : `[Client] ${service || 'Inquiry'} — ${name} (${referenceId})`
      const text = [
        `Kind: ${kind}`,
        `Reference: ${referenceId}`,
        `Name: ${name}`,
        `Email: ${email}`,
        clean(body.company, 160) && `Company: ${clean(body.company, 160)}`,
        clean(body.phone, 40) && `Phone: ${clean(body.phone, 40)}`,
        clean(body.country, 80) && `Country: ${clean(body.country, 80)}`,
        service && `Service: ${service}`,
        clean(body.teamModel, 80) && `Model: ${clean(body.teamModel, 80)}`,
        clean(body.timeline, 80) && `Timeline: ${clean(body.timeline, 80)}`,
        role && `Role: ${role}`,
        notes && `Details:\n${notes}`,
      ]
        .filter(Boolean)
        .join('\n')

      const sent = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject,
          text,
        }),
      })
      if (!sent.ok) {
        res.status(502).json({ error: 'Unable to deliver this inquiry.' })
        return
      }
      res.json({ ok: true, referenceId })
    } catch {
      res.status(500).json({ error: 'Unable to process this inquiry.' })
    }
  })

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' })
        return
      }

      const ai = getGenAI()

      if (ai) {
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = []

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.text && (item.role === 'user' || item.role === 'model')) {
              contents.push({
                role: item.role,
                parts: [{ text: item.text }],
              })
            }
          }
        }

        contents.push({
          role: 'user',
          parts: [{ text: message }],
        })

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.9,
          },
        })

        const text = response.text || ''
        res.json({ text })
        return
      }

      res.json({ fallback: true })
    } catch (err: unknown) {
      console.error('Gemini chat error:', err)
      res.json({ fallback: true })
    }
  })

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    })
    app.use(vite.middlewares)
  } else {
    const distPath = path.join(process.cwd(), 'dist')
    app.use(express.static(distPath))
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'))
    })
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`)
  })
}

startServer()
