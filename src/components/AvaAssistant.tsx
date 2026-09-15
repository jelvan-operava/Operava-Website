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
  ArrowRight,
  Calendar,
} from 'lucide-react'
import AvaVideoAvatar from './AvaVideoAvatar'
import { generateAvaHumanResponse } from '../utils/avaConversationEngine'
import { detectTopicRoute, type RouteAction } from '../utils/avaRouting'

export interface ChatMessage {
  id: string
  sender: 'ava' | 'user'
  text: string
  timestamp: string
  routeAction?: RouteAction
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
  { label: 'Careers', query: 'What executive positions and skills specializations are available at OPERAVA?', icon: Briefcase },
  { label: 'Hiring steps', query: 'What is the OPERAVA hiring process?', icon: ShieldCheck },
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
        if (lines.some((l) => l.trim().startsWith('• ') || l.trim().startsWith('- ') || /^\d+\.\s/.test(l.trim()))) {
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
      <style>{`
        @keyframes avaWave {
          0%, 100% { transform: scaleX(0.22); opacity: 0.28; }
          50% { transform: scaleX(1); opacity: 1; }
        }
        .ava-wave-line { display:block; height:2px; width:100%; border-radius:999px; background:#7c3aed; transform-origin:left center; }
        .ava-wave-1 { animation: avaWave 1.15s ease-in-out infinite; }
        .ava-wave-2 { animation: avaWave 1.45s ease-in-out 0.22s infinite; }
        .ava-wave-3 { animation: avaWave 0.92s ease-in-out 0.38s infinite; }
      `}</style>
      <AvaVideoAvatar size="sm" className="mt-0.5 shrink-0" />
      <div className="min-w-[148px] rounded-2xl rounded-tl-xs px-3.5 py-3 bg-white border border-gray-200/80 shadow-sm">
        <div className="flex flex-col justify-center gap-[5px] h-7 w-28">
          <span className="ava-wave-line ava-wave-1" />
          <span className="ava-wave-line ava-wave-2" />
          <span className="ava-wave-line ava-wave-3" />
        </div>
      </div>
    </div>
  )
}

const WELCOME =
  "Hello. I'm AVA, OPERAVA's business assistant.\n\nI can discuss our IT, software, BPO, and workforce services, how engagements work, and open career tracks. I do not share internal processes, staff records, pricing formulas, or private client information.\n\nIf you want a quotation, use Request a Quote. If you want to apply, use Careers. For anything else, use Contact."

export default function AvaAssistant() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [inputText, setInputText] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [isRouting, setIsRouting] = useState(false)
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
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(({ inquiryCard: _ignored, ...msg }: ChatMessage & { inquiryCard?: unknown }) => msg)
        }
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

  useEffect(() => {
    const chatEl = chatWindowRef.current
    if (!chatEl || !isOpen) return
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
      const target = e.target as HTMLElement | null
      const horizontalEl = target?.closest('.ava-horizontal-scroll') as HTMLElement | null
      if (horizontalEl && (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey)) {
        horizontalEl.scrollLeft += e.deltaX || e.deltaY
        e.preventDefault()
        return
      }
      const messagesEl = messagesContainerRef.current
      if (messagesEl) messagesEl.scrollTop += e.deltaY
      e.preventDefault()
    }
    chatEl.addEventListener('wheel', handleWheel, { passive: false })
    return () => chatEl.removeEventListener('wheel', handleWheel)
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
    setHasUnread(false)
    setShowWelcomeBubble(false)
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  const autoRouteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (autoRouteTimerRef.current) {
        clearTimeout(autoRouteTimerRef.current)
        autoRouteTimerRef.current = null
      }
    }
  }, [])

  const cancelAutoRoute = () => {
    if (autoRouteTimerRef.current) {
      clearTimeout(autoRouteTimerRef.current)
      autoRouteTimerRef.current = null
    }
    setIsRouting(false)
  }

  const handleRoute = (to: string) => {
    if (autoRouteTimerRef.current) {
      clearTimeout(autoRouteTimerRef.current)
      autoRouteTimerRef.current = null
    }
    setIsRouting(false)
    setIsOpen(false)
    setShowWelcomeBubble(false)
    navigate(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      const formEl = document.querySelector('form')
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 180)
  }

  const playNotificationSound = () => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12)
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

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim()
    if (!query || isThinking || isRouting) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInputText('')
    setIsThinking(true)
    playNotificationSound()

    const directRoute = detectTopicRoute(query)

    if (directRoute && directRoute.isDirectIntent) {
      setIsThinking(false)
      setIsRouting(true)
      const routingMsg =
        directRoute.routingMessage ||
        (directRoute.kind === 'CAREERS'
          ? `Routing you directly to our verified **Job Application Form** (${directRoute.position || 'Open positions'}) now. Please prepare your details and resume.`
          : directRoute.kind === 'CONTACT'
          ? 'Routing you directly to our verified **Contact Form** now. Our team will assist you promptly.'
          : `Routing you directly to our verified **Request a Quote Form** (${directRoute.category || 'Services'}) now. Our team will review your project requirements promptly.`)

      setMessages([
        ...updatedMessages,
        {
          id: `ava-${Date.now()}`,
          sender: 'ava',
          text: routingMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          routeAction: directRoute,
          isRoutingNotice: true,
        },
      ])
      playNotificationSound()
      if (autoRouteTimerRef.current) clearTimeout(autoRouteTimerRef.current)
      autoRouteTimerRef.current = setTimeout(() => handleRoute(directRoute.to), 1000)
      return
    }

    const historyPayload = updatedMessages.slice(-8).map((m) => ({
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

    const topicRoute = directRoute || detectTopicRoute(query, reply)

    setMessages((prev) => [
      ...prev,
      {
        id: `ava-${Date.now()}`,
        sender: 'ava',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        routeAction: topicRoute || undefined,
      },
    ])
    setIsThinking(false)
    playNotificationSound()

    if (topicRoute) {
      setIsRouting(true)
      if (autoRouteTimerRef.current) clearTimeout(autoRouteTimerRef.current)
      autoRouteTimerRef.current = setTimeout(() => handleRoute(topicRoute.to), 2500)
    }
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

  return (
    <aside aria-label="AVA - Operava Virtual Assistant">
      {!isOpen && showWelcomeBubble && (
        <div className="fixed bottom-24 right-6 z-50 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-gray-950/95 text-white border border-purple-500/40 shadow-2xl backdrop-blur-md animate-fade-in-up">
          <button onClick={() => setShowWelcomeBubble(false)} className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white p-1" aria-label="Dismiss message">
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-3">
            <AvaVideoAvatar size="md" className="shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">AVA</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">Ask about OPERAVA services or careers. Formal requests go through Quote, Careers, or Contact.</p>
              <button onClick={handleOpen} className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white">
                <span>Chat with AVA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={() => {
            if (isOpen) {
              cancelAutoRoute()
              setIsOpen(false)
            } else {
              handleOpen()
            }
          }}
          className="group relative block p-0 bg-transparent border-0 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
          aria-label={isOpen ? 'Close AVA Assistant' : 'Open AVA Assistant'}
        >
          <AvaVideoAvatar size="xl" showGlow={true} />
          {!isOpen && hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-fuchsia-500 rounded-full border-2 border-white animate-bounce pointer-events-none" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] sm:max-h-[640px] h-[580px] flex flex-col rounded-3xl bg-white shadow-2xl border border-gray-200/90 overflow-hidden animate-scale-up overscroll-contain"
        >
          <div className="px-5 py-4 bg-gradient-to-r from-gray-950 via-gray-900 to-purple-950 text-white flex items-center justify-between border-b border-gray-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AvaVideoAvatar size="md" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-gray-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">AVA</h3>
                  <span className="px-1.5 py-0.5 rounded-md bg-purple-600/30 border border-purple-500/40 text-[10px] font-semibold text-purple-300">Live</span>
                </div>
                <p className="text-[11px] text-gray-400">OPERAVA business assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <button onClick={() => setSoundEnabled((s) => !s)} className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg" aria-label={soundEnabled ? 'Mute' : 'Unmute'}>
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() =>
                  setMessages([
                    {
                      ...initialMessage,
                      id: `welcome-${Date.now()}`,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    },
                  ])
                }
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  cancelAutoRoute()
                  setIsOpen(false)
                }}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isRouting && (
            <div className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-medium flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Routing you to the form…
            </div>
          )}

          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/80">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ava' && <AvaVideoAvatar size="sm" className="mt-0.5 shrink-0" />}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-violet-700 text-white rounded-tr-xs'
                      : 'bg-white border border-gray-200/80 text-gray-800 rounded-tl-xs'
                  }`}
                >
                  {renderMessageText(msg.text, msg.sender === 'user')}
                  <div className={`mt-1.5 flex items-center gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-between'}`}>
                    <span className={`text-[10px] ${msg.sender === 'user' ? 'text-violet-200' : 'text-gray-400'}`}>{msg.timestamp}</span>
                    {msg.sender === 'ava' && (
                      <button
                        onClick={() => copyMessage(msg.id, msg.text)}
                        className="text-gray-400 hover:text-violet-600 p-0.5"
                        aria-label="Copy message"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                  {msg.routeAction && !msg.isRoutingNotice && (
                    <button
                      onClick={() => handleRoute(msg.routeAction!.to)}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:text-violet-900"
                    >
                      <span>Open form</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isThinking && <AvaThinkingWaves />}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-2 border-t border-gray-100 bg-white shrink-0">
            <div className="ava-horizontal-scroll flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {QUICK_TOPICS.map((t) => (
                <button
                  key={t.label}
                  onClick={() => handleSendMessage(t.query)}
                  disabled={isThinking || isRouting}
                  className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100 disabled:opacity-50"
                >
                  <t.icon className="w-3 h-3" />
                  {t.label}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask AVA about services or careers…"
                disabled={isThinking || isRouting}
                className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isThinking || isRouting}
                className="p-2.5 rounded-xl bg-violet-700 text-white hover:bg-violet-800 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  )
}
