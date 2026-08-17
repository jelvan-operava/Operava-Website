import { useState, useEffect, useRef } from 'react'
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Calendar,
  Briefcase,
  ShieldCheck,
  Copy,
  Check,
  Cpu,
  Users,
  Building2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import AvaVideoAvatar from './AvaVideoAvatar'
import { generateAvaHumanResponse, type AvaDirectResponse } from '../utils/avaConversationEngine'

export interface ChatMessage {
  id: string
  sender: 'ava' | 'user'
  text: string
  timestamp: string
  inquiryCard?: {
    type: 'consultation' | 'career'
    defaultRole?: string
  }
}

interface QuickTopic {
  label: string
  query: string
  icon: typeof Sparkles
  category: 'services' | 'careers' | 'about' | 'contact'
}

const QUICK_TOPICS: QuickTopic[] = [
  { label: 'IT & Software Services', query: 'What IT and software development services does OPERAVA offer?', icon: Cpu, category: 'services' },
  { label: 'BPO & Customer Operations', query: 'Tell me about your 8 BPO and customer support services.', icon: Users, category: 'services' },
  { label: 'Company Profile & SEC Registration', query: 'Can you tell me about OPERAVA, SEC registration, and your initial office?', icon: Building2, category: 'about' },
  { label: '1 Pro to Dedicated Teams', query: 'How do your delivery models work for small businesses and enterprises?', icon: Calendar, category: 'contact' },
  { label: 'Careers & Remote Talent', query: 'What remote career opportunities, benefits, and talent initiatives do you offer?', icon: Briefcase, category: 'careers' },
  { label: 'Hiring & Interview Steps', query: 'What are the steps in your recruitment and interview process?', icon: ShieldCheck, category: 'careers' },
]

// Helper to render humanized, well-spaced message text without artificial clutter
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
  // Split into paragraphs by double newlines
  const paragraphs = text.split(/\n\n+/)

  return (
    <div className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed break-words font-normal">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n')
        const isList = lines.length > 1 && lines.every((l) => l.trim().startsWith('• ') || l.trim().startsWith('- ') || /^\d+\.\s/.test(l.trim()))

        if (isList || lines.some((l) => l.trim().startsWith('• ') || l.trim().startsWith('- ') || /^\d+\.\s/.test(l.trim()))) {
          return (
            <div key={pIdx} className="space-y-1.5">
              {lines.map((line, lIdx) => {
                const trimmed = line.trim()
                const numMatch = trimmed.match(/^(\d+)\.\s*(.*)$/)
                if (numMatch) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 pl-0.5">
                      <span className={isUser ? 'font-semibold text-violet-200 shrink-0' : 'font-semibold text-violet-600 shrink-0'}>
                        {numMatch[1]}.
                      </span>
                      <span>{renderInline(numMatch[2], isUser)}</span>
                    </div>
                  )
                }
                if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
                  const bulletContent = trimmed.replace(/^[•\-]\s*/, '')
                  return (
                    <div key={lIdx} className="flex items-start gap-2 pl-0.5">
                      <span className={isUser ? 'w-1.5 h-1.5 rounded-full bg-violet-200 shrink-0 mt-1.5' : 'w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0 mt-1.5'} />
                      <span>{renderInline(bulletContent, isUser)}</span>
                    </div>
                  )
                }
                return (
                  <p key={lIdx}>
                    {renderInline(line, isUser)}
                  </p>
                )
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

export default function AvaAssistant() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [inputText, setInputText] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingProgress, setThinkingProgress] = useState(0)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryType, setInquiryType] = useState<'consultation' | 'career'>('consultation')

  // Quick form state inside chat
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyOrRole: '',
    notes: '',
  })
  const [ticketRef, setTicketRef] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initial welcome message (Natural, friendly, human, clear, direct)
  const initialMessage: ChatMessage = {
    id: 'welcome-1',
    sender: 'ava',
    text: "Hello! I'm AVA, your virtual intelligence assistant at OPERAVA Global Solutions.\n\nAsk me anything directly about our IT & software development services, 8 BPO and customer operations, company registration (SEC & BIR), remote delivery models (from 1 professional to dedicated teams), career opportunities, or how our team works.\n\nHow can I help you today?",
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

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('operava_ava_messages', JSON.stringify(messages))
    } catch {
      // ignore
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isThinking, isOpen])

  // Dismiss welcome bubble after 12 seconds or when opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeBubble(false)
    }, 12000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setHasUnread(false)
    setShowWelcomeBubble(false)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 300)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleClearHistory = () => {
    setMessages([
      {
        ...initialMessage,
        id: `welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setShowInquiryForm(false)
  }

  const playNotificationSound = () => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12) // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.25)
    } catch {
      // audio context may be disabled
    }
  }

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[*_#•]/g, '').replace(/\[.*?\]\(.*?\)/g, '')
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1.05
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  // 3-SECOND THINKING ANIMATION & DIRECT ANSWER GENERATOR
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim()
    if (!query || isThinking) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    // Append user message immediately
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInputText('')
    setIsThinking(true)
    setThinkingProgress(0)
    playNotificationSound()

    // 3-second progress animation ticker (3000ms duration)
    const startTime = Date.now()
    const duration = 3000
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const percent = Math.min(100, Math.round((elapsed / duration) * 100))
      setThinkingProgress(percent)
      if (elapsed >= duration) {
        clearInterval(interval)
      }
    }, 40)

    // Build chat history for context
    const historyPayload = updatedMessages.slice(-6).map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text,
    }))

    // Async call to server chat API + guaranteed 3-second thinking wait
    const fetchPromise: Promise<AvaDirectResponse> = (async () => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, history: historyPayload }),
        })
        if (res.ok) {
          const data = await res.json()
          if (data && data.text && !data.fallback) {
            return {
              text: data.text as string,
            }
          }
        }
      } catch {
        // Fallback to rich local knowledge engine
      }
      return generateAvaHumanResponse(query)
    })()

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 3000))

    try {
      const [resp] = await Promise.all([fetchPromise, delayPromise])
      clearInterval(interval)
      setThinkingProgress(100)

      const avaMsg: ChatMessage = {
        id: `ava-${Date.now()}`,
        sender: 'ava',
        text: resp.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        inquiryCard: resp.inquiryCard,
      }

      setMessages((prev) => [...prev, avaMsg])
      setIsThinking(false)
      setThinkingProgress(0)
      playNotificationSound()
    } catch {
      clearInterval(interval)
      const fallbackResp = generateAvaHumanResponse(query)
      const avaMsg: ChatMessage = {
        id: `ava-${Date.now()}`,
        sender: 'ava',
        text: fallbackResp.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        inquiryCard: fallbackResp.inquiryCard,
      }
      setMessages((prev) => [...prev, avaMsg])
      setIsThinking(false)
      setThinkingProgress(0)
      playNotificationSound()
    }
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) return

    const refNumber = `OPV-${Math.floor(100000 + Math.random() * 900000)}`
    setTicketRef(refNumber)

    // Append direct confirmation message
    setTimeout(() => {
      const confirmMsg: ChatMessage = {
        id: `ava-${Date.now()}`,
        sender: 'ava',
        text: `Thank you, **${formData.name}**! I have registered your ${
          inquiryType === 'consultation' ? 'project consultation request' : 'career application'
        } under reference **#${refNumber}**.\n\nOur solutions team has received your information (${formData.email}) and will review your requirements to connect with you within 2 business hours.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, confirmMsg])
      setShowInquiryForm(false)
      setFormData({ name: '', email: '', companyOrRole: '', notes: '' })
      playNotificationSound()
    }, 350)
  }

  return (
    <aside aria-label="AVA - Operava Virtual Assistant" className="relative">
      {/* ── WELCOME PROMO BUBBLE (Appears initially when widget is closed) ── */}
      {!isOpen && showWelcomeBubble && (
        <div
          id="ava-welcome-bubble"
          className="fixed bottom-24 right-6 z-50 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-gray-950/95 text-white border border-purple-500/40 shadow-2xl backdrop-blur-md animate-fade-in-up"
        >
          <button
            onClick={() => setShowWelcomeBubble(false)}
            className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-3">
            <AvaVideoAvatar size="md" className="shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">AVA Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Hi! Ask me anything directly about our <strong>Services</strong>, <strong>Careers</strong>, or <strong>OPERAVA</strong>.
              </p>
              <button
                onClick={handleOpen}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Chat with AVA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FLOATING TRIGGER LAUNCHER BUTTON (Bottom-Right Corner) ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="ava-assistant-trigger"
          onClick={() => (isOpen ? handleClose() : handleOpen())}
          className="group relative block p-0 bg-transparent border-0 outline-none rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none"
          aria-label={isOpen ? 'Close AVA Assistant' : 'Open AVA Assistant'}
          title="AVA Assistant - OPERAVA Virtual Intelligence"
        >
          {/* Circular Icon with Gradient Aura using AvaVideoAvatar */}
          <AvaVideoAvatar size="xl" showGlow={true} />

          {/* Unread badge pulse */}
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-fuchsia-500 rounded-full border-2 border-white animate-bounce pointer-events-none shadow-md" />
          )}
        </button>
      </div>

      {/* ── EXPANDED CHAT DIALOG CONTAINER ── */}
      {isOpen && (
        <div
          id="ava-chat-window"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] sm:max-h-[640px] h-[580px] flex flex-col rounded-3xl bg-white shadow-2xl border border-gray-200/90 overflow-hidden animate-scale-up"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-gray-950 via-gray-900 to-purple-950 text-white flex items-center justify-between border-b border-gray-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <AvaVideoAvatar size="md" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-gray-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">AVA Assistant</h3>
                  <span className="px-1.5 py-0.5 rounded-md bg-purple-600/30 border border-purple-500/40 text-[10px] font-semibold text-purple-300">
                    AI Active
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">OPERAVA</p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 text-gray-400">
              <button
                onClick={() => setSoundEnabled((s) => !s)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute Chimes' : 'Enable Sound'}
                aria-label={soundEnabled ? 'Mute Chimes' : 'Enable Sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleClearHistory}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleClose}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Close Window"
                aria-label="Close Window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Direct Mode Notice Banner */}
          <div className="px-4 py-1.5 bg-violet-50 border-b border-violet-100 flex items-center justify-between text-[11px] text-violet-800 shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0" />
              <span>Ask any question</span>
            </span>
            <span className="text-[10px] text-violet-600/80 uppercase font-semibold tracking-wider">Live</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/60 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot Avatar */}
                {msg.sender === 'ava' && (
                  <AvaVideoAvatar size="sm" className="mt-0.5 shrink-0" />
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-violet-700 text-white rounded-tr-xs'
                      : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-xs'
                  }`}
                >
                  {/* Formatted Content */}
                  {renderMessageText(msg.text, msg.sender === 'user')}

                  {/* Embedded Inquiry Trigger Card if requested */}
                  {msg.inquiryCard && !showInquiryForm && (
                    <div className="pt-2 mt-1 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setInquiryType(msg.inquiryCard?.type || 'consultation')
                          setShowInquiryForm(true)
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-sm cursor-pointer"
                      >
                        {msg.inquiryCard.type === 'consultation' ? (
                          <>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Quick Book / Request Quote in Chat</span>
                          </>
                        ) : (
                          <>
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Submit Fast Career Interest in Chat</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Timestamp & Utilities (Copy & Listen) */}
                  <div
                    className={`flex items-center justify-between text-[10px] pt-1 ${
                      msg.sender === 'user' ? 'text-violet-200' : 'text-gray-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'ava' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="hover:text-gray-600 transition-colors cursor-pointer p-0.5"
                          title="Copy text"
                          aria-label="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                        <button
                          onClick={() => handleSpeech(msg.text)}
                          className="hover:text-gray-600 transition-colors cursor-pointer p-0.5"
                          title="Listen with voice"
                          aria-label="Listen with voice"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* ── 3-SECOND THINKING ANIMATION CARD ── */}
            {isThinking && (
              <div className="flex gap-2.5 justify-start animate-fade-in">
                <AvaVideoAvatar size="sm" className="mt-0.5 shrink-0" />
                <div className="max-w-[85%] rounded-2xl rounded-tl-xs p-3.5 bg-gradient-to-br from-violet-950 via-purple-950 to-gray-950 text-white shadow-lg border border-violet-500/40 space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/30">
                        <Sparkles className="w-3 h-3 text-violet-300 animate-spin [animation-duration:3s]" />
                      </div>
                      <span className="text-xs font-semibold text-violet-200 tracking-tight">AVA is thinking...</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-300 animate-pulse" />
                      <span className="text-[10px] text-violet-200 font-medium">3s reasoning</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] text-violet-200/90 leading-relaxed font-normal">
                      Analyzing query and preparing direct answer...
                    </p>

                    {/* Animated 3-second progress indicator bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-300 rounded-full transition-all duration-75 ease-linear shadow-sm"
                        style={{ width: `${thinkingProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INLINE INQUIRY / CONSULTATION CAPTURE MODAL */}
            {showInquiryForm && (
              <div className="p-4 rounded-2xl bg-white border-2 border-violet-500/40 shadow-md space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center">
                      {inquiryType === 'consultation' ? <Calendar className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">
                        {inquiryType === 'consultation' ? 'Request Immediate Consultation' : 'Direct Career Interest'}
                      </h4>
                      <p className="text-[10px] text-gray-500">Fast 2-hour executive response SLA</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInquiryForm(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-violet-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-violet-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">
                      {inquiryType === 'consultation' ? 'Company Name / Project Focus' : 'Target Role / Experience'}
                    </label>
                    <input
                      type="text"
                      placeholder={inquiryType === 'consultation' ? 'e.g. FinTech Cloud Migration' : 'e.g. Senior Cloud Engineer (5 yrs)'}
                      value={formData.companyOrRole}
                      onChange={(e) => setFormData({ ...formData, companyOrRole: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-violet-600 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Brief Details / Questions</label>
                    <textarea
                      rows={2}
                      placeholder="Tell us what you're looking to achieve..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-violet-600 text-xs resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowInquiryForm(false)}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Submit in Chat</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Topics Direct Question Bar */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
            {QUICK_TOPICS.map((topic, i) => {
              const IconComp = topic.icon
              return (
                <button
                  key={i}
                  onClick={() => handleSendMessage(topic.query)}
                  disabled={isThinking}
                  className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-800 text-gray-700 text-[11px] font-medium whitespace-nowrap flex items-center gap-1 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  <IconComp className="w-3 h-3 text-violet-600" />
                  <span>{topic.label}</span>
                </button>
              )
            })}
          </div>

          {/* Input & Send Bar */}
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
                placeholder="Ask AVA anything directly..."
                disabled={isThinking}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600/20 focus:border-violet-600 transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isThinking}
                className="w-10 h-10 rounded-2xl bg-violet-700 hover:bg-violet-800 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-md shadow-violet-700/20 active:scale-95 cursor-pointer shrink-0"
                title="Send Message"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-400 px-1">
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
