import express, { type Request as ExpressRequest, type Response as ExpressResponse } from 'express'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import { GoogleGenAI } from '@google/genai'
import type { FormEnv } from './functions/lib/formCore.ts'
import { onRequestPost as formsStartHandler } from './functions/api/forms/start.ts'
import { onRequestPost as formsVerifyHandler } from './functions/api/forms/verify.ts'
import { onRequestPost as formsResendHandler } from './functions/api/forms/resend.ts'
import { onRequestPost as formsUploadHandler } from './functions/api/forms/upload.ts'
import { onRequestPost as applyHandler } from './functions/api/apply.ts'

type BridgeEnv = FormEnv & { APPLICANT_CC?: string }

function buildFormEnv(): BridgeEnv {
  return {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    OTP_SECRET: process.env.OTP_SECRET,
    CLIENT_INBOX: process.env.CLIENT_INBOX,
    TALENT_INBOX: process.env.TALENT_INBOX,
    APPLICANT_CC: process.env.APPLICANT_CC,
  }
}

/**
 * Bridges an Express request to a Cloudflare Pages Function handler so the
 * same `functions/api/**` logic used in production also runs under the
 * local/preview Node server (which has no Pages Functions runtime).
 */
function bridgePagesFunction(
  handler: (context: { request: globalThis.Request; env: BridgeEnv }) => Promise<globalThis.Response>,
) {
  return async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const safeHost = /^[a-zA-Z0-9.-]+(:\d+)?$/.test(req.headers.host || '') ? req.headers.host : 'localhost'
      const url = `http://${safeHost}${req.originalUrl}`
      const headers = new Headers()
      const skipHeaders = new Set(['content-length', 'host', 'connection', 'transfer-encoding'])
      for (const [key, value] of Object.entries(req.headers)) {
        if (skipHeaders.has(key.toLowerCase())) continue
        if (typeof value === 'string') headers.set(key, value)
        else if (Array.isArray(value)) headers.set(key, value.join(', '))
      }
      const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
      const body = hasBody
        ? Buffer.isBuffer(req.body)
          ? req.body
          : JSON.stringify(req.body ?? {})
        : undefined
      const webRequest = new globalThis.Request(url, { method: req.method, headers, body })
      const response = await handler({ request: webRequest, env: buildFormEnv() })
      res.status(response.status)
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'content-length') return
        res.setHeader(key, value)
      })
      res.send(Buffer.from(await response.arrayBuffer()))
    } catch (err) {
      console.error('forms bridge error', err)
      res.status(500).json({ error: 'Unable to process this request.' })
    }
  }
}

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

function parseList(value?: string): string[] {
  if (!value) return []
  return value
    .split(/[,;]+/)
    .map((item) => item.trim().toLowerCase())
    .filter((item) => EMAIL_RE.test(item))
}

function uniqueEmails(list: string[], exclude: string): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const item of list) {
    if (!item || item === exclude || seen.has(item)) continue
    seen.add(item)
    out.push(item)
  }
  return out
}

async function startServer() {
  const app = express()
  const PORT = Number(process.env.PORT || 3000)

  app.use(express.json())

  app.post('/api/forms/start', bridgePagesFunction(formsStartHandler))
  app.post('/api/forms/verify', bridgePagesFunction(formsVerifyHandler))
  app.post('/api/forms/resend', bridgePagesFunction(formsResendHandler))
  app.post(
    '/api/forms/upload',
    express.raw({ type: () => true, limit: '10mb' }),
    bridgePagesFunction(formsUploadHandler),
  )
  app.post('/api/apply', bridgePagesFunction(applyHandler))

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
      const isCareer = kind === 'career' || kind === 'ai-career'
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
      const clientInbox = process.env.CLIENT_INBOX || 'hello@operavaglobal.com'
      const talentInbox = process.env.TALENT_INBOX || 'talents@operavaglobal.com'
      const from = process.env.RESEND_FROM || 'OPERAVA Website <noreply@operavaglobal.com>'
      const ticketId = `OPV-${Math.floor(100000 + Math.random() * 900000)}`
      const service = clean(body.service, 160)
      const role = clean(body.role, 180)
      const notes = clean(body.notes || body.description, 4000)
      const cc = uniqueEmails(
        isCareer
          ? [talentInbox, ...parseList(process.env.APPLICANT_CC)]
          : [clientInbox],
        email,
      )
      const subject = isCareer
        ? `Ticket #${ticketId} — career application received`
        : `Ticket #${ticketId} — consultation request received`
      const text = [
        isCareer
          ? `Thank you, ${name}. Your career application is registered under reference #${ticketId}.`
          : `Thank you, ${name}. Your project consultation request is registered under reference #${ticketId}.`,
        `Our team received your information (${email}).`,
        isCareer
          ? 'Talent review typically starts within 24-48 hours.'
          : 'We will review your requirements and connect within 2 business hours.',
        `Kind: ${kind}`,
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

      const payload: Record<string, unknown> = {
        from,
        to: [email],
        reply_to: isCareer ? talentInbox : clientInbox,
        subject,
        text,
      }
      if (cc.length) payload.cc = cc

      const sent = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!sent.ok) {
        res.status(502).json({ error: 'Unable to deliver this inquiry.' })
        return
      }
      res.json({ ok: true, referenceId: ticketId })
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
          model: 'gemini-3.8-flash',
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
    app.get(/.*/, (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'))
    })
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`)
  })
}

startServer()
