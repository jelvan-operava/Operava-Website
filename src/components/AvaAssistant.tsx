import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Briefcase,
  ShieldCheck,
  Copy,
  Check,
  Cpu,
  Users,
  Building2,
  Calendar,
  FileText,
} from 'lucide-react'
import AvaVideoAvatar from './AvaVideoAvatar'
import { generateAvaHumanResponse } from '../utils/avaConversationEngine'
import { detectTopicRoute, type RouteAction } from '../utils/avaRouting'
import {
  wantsDocumentVerification,
  extractDocumentReferenceId,
  lookupDocumentVerification,
  formatVerificationReply,
  ASK_FOR_DOCUMENT_ID,
} from '../utils/avaDocumentVerify'

export interface ChatMessage {
  id: string
  sender: 'ava' | 'user'
  text: string
  timestamp: string
  routeAction?: RouteAction
  showChoice?: boolean
  isRoutingNotice?: boolean
}

interface QuickTopic {
  label: string
  query: string
  icon: typeof Sparkles
}

const QUICK_TOPICS: QuickTopic[] = [
  { label: 'IT & Software', query: 'What IT and software services does OPERAVA offer?', icon: Cpu },
  { label: 'BPO Operations', query: 'Tell me about OPERAVA BPO and customer operations.', icon: Users },
  { label: 'Company', query: 'Who is OPERAVA and where do you operate from?', icon: Building2 },
  { label: 'Engagement', query: 'How do OPERAVA delivery models work?', icon: Calendar },
  { label: 'Careers', query: 'What careers are available at OPERAVA?', icon: Briefcase },
  { label: 'Verify document', query: 'I want to verify a document reference ID', icon: FileText },
]

function renderInline(str: string, isUser = false) {
  const parts = str.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className={isUser ? 'font-semibold text-white' : 'font-semibold text-gray-900'}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

function renderMessageText(text: string, isUser = false) {
  const paragraphs = text.split(/\n\n+/)
  return (
    <div className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed break-words font-normal">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n')
        if (
          lines.some(
            (l) =>
              l.trim().startsWith('• ') ||
              l.trim().startsWith('- ') ||
              l.trim().startsWith('a. ') ||
              /^\d+\.\s/.test(l.trim()),
          )
        ) {
          return (
            <div key={pIdx} className="space-y-1.5">
              {lines.map((line, lIdx) => {
                const trimmed = line.trim()
                const numMatch = trimmed.match(/^(\d+)\.\s*(.*)$/)
                if (numMatch) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2">
                      <span className={isUser ? 'font-semibold text-violet-200 shrink-0' : 'font-semibold text-violet-600 shrink-0'}>
                        {numMatch[1]}.
                      </span>
                      <span>{renderInline(numMatch[2], isUser)}</span>
                    </div>
                  )
                }
                if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2">
                      <span className={isUser ? 'w-1.5 h-1.5 rounded-full bg-violet-200 shrink-0 mt-1.5' : 'w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0 mt-1.5'} />
                      <span>{renderInline(trimmed.replace(/^[•\-]\s*/, ''), isUser)}</span>
                    </div>
                  )
                }
                return <p key={lIdx}>{renderInline(line, isUser)}</p>
              })}
            </div>
          )
        }
        return (
          <p key={pIdx}>
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                {renderInline(line, isUser)}
                {lIdx < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}

function AvaThinkingWaves() {
  return (
    <div className="flex gap-2.5 justify-start animate-fade-in" aria-live="polite" aria-label="AVA is thinking">
      <AvaVideoAvatar size="sm" className="mt-0.5 shrink-0" />
      <div className="min-w-[148px] rounded-2xl rounded-tl-xs px-3.5 py-3 bg-white border border-gray-200/80 shadow-sm">
        <div className="flex flex-col justify-center gap-[5px] h-7 w-28">
          <span className="block h-0.5 w-full rounded-full bg-violet-600 animate-pulse" />
          <span className="block h-0.5 w-3/4 rounded-full bg-violet-600 animate-pulse" />
          <span className="block h-0.5 w-1/2 rounded-full bg-violet-600 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

const WELCOME =
  "Hi! I'm AVA from OPERAVA.\n\nI can explain our technology, workforce, and talent solutions — help you get in touch — or verify an OPERAVA document if you paste the reference ID.\n\nHow can I help you today?"

export default function AvaAssistant() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [inputText, setInputText] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const initialMessage: ChatMessage = {
    id: 'welcome-1',
    sender: 'ava',
    text: WELCOME,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('operava_ava_messages')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return [initialMessage]
  })

  useEffect(() => {
    if (['/quote', '/apply', '/contact'].includes(location.pathname)) {
      setIsOpen(false)
      setShowWelcomeBubble(false)
    }
  }, [location.pathname, location.search])

  useEffect(() => {
    try {
      localStorage.setItem('operava_ava_messages', JSON.stringify(messages))
    } catch {
      // ignore
    }
  }, [messages])

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking, isOpen])

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcomeBubble(false), 12000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setHasUnread(false)
    setShowWelcomeBubble(false)
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  const handleRoute = (to: string) => {
    setIsOpen(false)
    setShowWelcomeBubble(false)
    navigate(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const playNotificationSound = () => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, ctx.currentTime)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.25)
    } catch {
      // audio may be blocked
    }
  }

  const pushAva = (text: string, extra?: Partial<ChatMessage>) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `ava-${Date.now()}`,
        sender: 'ava',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...extra,
      },
    ])
    playNotificationSound()
  }

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim()
    if (!query || isThinking) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    playNotificationSound()

    // Document verification — paste reference ID in chat
    if (wantsDocumentVerification(query)) {
      const docId = extractDocumentReferenceId(query)
      if (!docId) {
        pushAva(ASK_FOR_DOCUMENT_ID)
        return
      }
      setIsThinking(true)
      try {
        const result = await lookupDocumentVerification(docId)
        pushAva(formatVerificationReply(result))
      } finally {
        setIsThinking(false)
      }
      return
    }

    setIsThinking(true)

    const historyPayload = [...messages, userMsg].slice(-8).map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text,
    }))

    let reply = generateAvaHumanResponse(query).text
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history: historyPayload }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data?.text && !data.fallback) reply = data.text as string
      }
    } catch {
      // local knowledge fallback
    }

    const topicRoute = detectTopicRoute(query, reply)
    if (topicRoute && topicRoute.isDirectIntent) {
      pushAva(reply, { routeAction: topicRoute, showChoice: true })
    } else {
      pushAva(reply, topicRoute ? { routeAction: topicRoute } : undefined)
    }
    setIsThinking(false)
  }

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ava',
        text: WELCOME,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  const copyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch {
      // ignore
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2">
        {showWelcomeBubble && (
          <button
            type="button"
            onClick={handleOpen}
            className="max-w-[240px] rounded-2xl bg-white border border-gray-200 shadow-lg px-4 py-3 text-left text-xs text-gray-700 hover:border-violet-200 transition-colors"
          >
            Hi — I'm AVA. Ask about services, or paste a document ID to verify.
          </button>
        )}
        <button
          type="button"
          onClick={handleOpen}
          className="relative h-14 w-14 rounded-full bg-violet-700 text-white shadow-xl hover:bg-violet-800 flex items-center justify-center"
          aria-label="Open AVA assistant"
        >
          <Sparkles className="w-6 h-6" />
          {hasUnread && <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-fuchsia-400" />}
        </button>
      </div>
    )
  }

  return (
    <aside
      ref={chatWindowRef}
      className="fixed bottom-5 right-5 z-[60] w-[min(100vw-1.5rem,400px)] h-[min(85vh,640px)] flex flex-col rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden"
      role="dialog"
      aria-label="AVA assistant"
    >
      <header className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-violet-700 to-fuchsia-700 text-white">
        <div className="flex items-center gap-2 min-w-0">
          <AvaVideoAvatar size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-bold truncate">AVA</p>
            <p className="text-[10px] text-white/80 truncate">OPERAVA assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setSoundEnabled((s) => !s)} className="p-2 rounded-lg hover:bg-white/10" aria-label="Toggle sound">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button type="button" onClick={handleReset} className="p-2 rounded-lg hover:bg-white/10" aria-label="Reset chat">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/10" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-[#FBFBFA]">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ava' && <AvaVideoAvatar size="sm" className="mt-0.5 shrink-0" />}
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                m.sender === 'user'
                  ? 'bg-violet-700 text-white rounded-tr-xs'
                  : 'bg-white border border-gray-200/80 text-gray-800 rounded-tl-xs'
              }`}
            >
              {renderMessageText(m.text, m.sender === 'user')}
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className={`text-[10px] ${m.sender === 'user' ? 'text-violet-200' : 'text-gray-400'}`}>{m.timestamp}</span>
                {m.sender === 'ava' && (
                  <button type="button" onClick={() => copyMessage(m.id, m.text)} className="text-gray-400 hover:text-violet-600 p-0.5" aria-label="Copy">
                    {copiedId === m.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>
              {m.showChoice && m.routeAction && (
                <div className="mt-2 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleRoute(m.routeAction!.to)}
                    className="text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg px-3 py-2 text-left"
                  >
                    Open form on website
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isThinking && <AvaThinkingWaves />}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 pt-2 pb-1 border-t border-gray-100 bg-white">
        <div className="flex gap-1.5 overflow-x-auto pb-2 ava-horizontal-scroll">
          {QUICK_TOPICS.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => handleSendMessage(t.query)}
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium text-violet-800 bg-violet-50 hover:bg-violet-100 border border-violet-100"
              >
                <Icon className="w-3 h-3" />
                {t.label}
              </button>
            )
          })}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void handleSendMessage()
          }}
          className="flex items-center gap-2 pb-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask AVA or paste a document ID…"
            className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            disabled={isThinking}
          />
          <button
            type="submit"
            disabled={isThinking || !inputText.trim()}
            className="h-10 w-10 rounded-xl bg-violet-700 text-white flex items-center justify-center hover:bg-violet-800 disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </aside>
  )
}
