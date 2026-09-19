import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, RotateCcw, Briefcase, Shield, ExternalLink, Sparkles } from 'lucide-react'
import { generateScreeningResponse } from '../utils/jobScreeningEngine'
import { SCREENING_GUIDELINES } from '../data/jobScreeningKnowledge'

interface Msg {
  id: string
  role: 'assistant' | 'user'
  text: string
  time: string
}

const WELCOME =
  'Welcome to OPERAVA AI Job Screening — Initial Interview.\n\n' +
  'I am a dedicated screening assistant (separate from AVA). I can explain Technology, Business Operations, and Customer Experience tracks, outline hiring steps, and ask light fit questions.\n\n' +
  'This is not a final hiring decision. Formal applications go through the Apply form.\n\n' +
  'Which track interests you?\n1. Technology\n2. Business Operations\n3. Customer Experience'

function renderText(text: string) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ))
}

export default function AiJobScreening() {
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: WELCOME,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text || thinking) return

    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setThinking(true)

    let reply = generateScreeningResponse(text).text
    try {
      const res = await fetch('/api/job-screening-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: [...messages, userMsg].slice(-10).map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data?.text && !data.fallback) reply = data.text as string
      }
    } catch {
      // local engine fallback
    }

    setMessages((m) => [
      ...m,
      {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setThinking(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const reset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: WELCOME,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  const quick = ['List roles', 'Technology track', 'Hiring process', 'How do I apply?']

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white flex flex-col">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold tracking-tight truncate">AI Job Screening</p>
              <p className="text-[11px] text-violet-200/80 truncate">Initial Interview · OPERAVA Talent</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white/80 hover:bg-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <Link
              to="/apply"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white text-violet-900 hover:bg-violet-50"
            >
              Formal apply
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link to="/" className="text-xs text-white/60 hover:text-white px-2">
              Main site
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col min-h-0">
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-100/90">
          <Shield className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
          <p>
            {SCREENING_GUIDELINES.notAFinalDecision} Separate from AVA (business assistant). Talent:{' '}
            <a href={`mailto:${SCREENING_GUIDELINES.talentEmail}`} className="underline">
              {SCREENING_GUIDELINES.talentEmail}
            </a>
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-[50vh]">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-violet-600 text-white rounded-br-md'
                    : 'bg-white/10 border border-white/10 text-violet-50 rounded-bl-md'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-violet-300 mb-2">
                    <Sparkles className="w-3 h-3" />
                    Screening AI
                  </div>
                )}
                <div>{renderText(m.text)}</div>
                <p className={`mt-2 text-[10px] ${m.role === 'user' ? 'text-violet-200' : 'text-white/40'}`}>{m.time}</p>
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-violet-200">
                Reviewing…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {quick.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => void send(q)}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/10 border border-white/15 hover:bg-white/15 text-violet-100"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            void send()
          }}
          className="flex gap-2 items-center pb-6"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Answer or ask about roles, process, fit…"
            disabled={thinking}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            type="submit"
            disabled={thinking || !input.trim()}
            className="h-12 w-12 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 flex items-center justify-center"
            aria-label="Send"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </main>
  )
}
