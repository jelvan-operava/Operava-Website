import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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

export interface ChatMessage {
  id: string
  sender: 'ava' | 'user'
  text: string
  timestamp: string
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
  { label: 'Careers', query: 'What career tracks and benefits does OPERAVA offer?', icon: Briefcase },
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
    if (!query || isThinking) return

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
      // local knowledge fallback already set
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `ava-${Date.now()}`,
        sender: 'ava',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setIsThinking(false)
    playNotificationSound()
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

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          className="group relative block p-0 bg-transparent border-0 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
          aria-label={isOpen ? 'Close AVA Assistant' : 'Open AVA Assistant'}
        >
          <AvaVideoAvatar size="xl" showGlow={true} />
          {!isOpen && hasUnread && <span className="absolute -top-1 -right-1 w-4 h-4 bg-fuchsia-500 rounded-full border-2 border-white animate-bounce pointer-events-none" />}
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
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto overscroll-y-contain space-y-4 bg-gray-50/60">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ava' && <AvaVideoAvatar size="sm" className="mt-0.5 shrink-0" />}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 shadow-sm ${
                    msg.sender === 'user' ? 'bg-violet-700 text-white rounded-tr-xs' : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-xs'
                  }`}
                >
                  {renderMessageText(msg.text, msg.sender === 'user')}
                  <div className={`flex items-center justify-between text-[10px] pt-1 ${msg.sender === 'user' ? 'text-violet-200' : 'text-gray-400'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'ava' && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(msg.text)
                          setCopiedId(msg.id)
                          setTimeout(() => setCopiedId(null), 2000)
                        }}
                        className="hover:text-gray-600 p-0.5"
                        aria-label="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isThinking && <AvaThinkingWaves />}
            <div ref={messagesEndRef} />
          </div>

          <div className="ava-horizontal-scroll px-3 py-2 bg-white border-t border-gray-100 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
            {QUICK_TOPICS.map((topic) => {
              const IconComp = topic.icon
              return (
                <button
                  key={topic.label}
                  onClick={() => handleSendMessage(topic.query)}
                  disabled={isThinking}
                  className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-800 text-gray-700 text-[11px] font-medium whitespace-nowrap flex items-center gap-1 disabled:opacity-50"
                >
                  <IconComp className="w-3 h-3 text-violet-600" />
                  <span>{topic.label}</span>
                </button>
              )
            })}
          </div>

          <div className="px-3 pt-2 bg-white flex items-center justify-between text-[10px] text-violet-800">
            <Link to="/quote" onClick={() => setIsOpen(false)} className="font-semibold hover:underline">
              Request a Quote
            </Link>
            <Link to="/apply" onClick={() => setIsOpen(false)} className="font-semibold hover:underline">
              Apply
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="font-semibold hover:underline">
              Contact
            </Link>
          </div>

          <div className="p-3 bg-white border-t border-gray-200/80 shrink-0">
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
                placeholder="Ask AVA about OPERAVA…"
                disabled={isThinking}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isThinking}
                className="w-10 h-10 rounded-2xl bg-violet-700 hover:bg-violet-800 disabled:opacity-40 text-white flex items-center justify-center"
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
