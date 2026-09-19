import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Send,
  RotateCcw,
  Briefcase,
  Shield,
  ExternalLink,
  Sparkles,
  PanelLeft,
  X,
  Check,
  Circle,
  Mail,
  Phone,
  GraduationCap,
  Wrench,
  Clock,
  User,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { generateScreeningResponse } from '../utils/jobScreeningEngine'
import { SCREENING_GUIDELINES } from '../data/jobScreeningKnowledge'
import { CAREER_OPENINGS, type CareerOpening } from '../data/careersData'

type CategoryKey =
  | 'personal'
  | 'education'
  | 'experience'
  | 'skills'
  | 'position'
  | 'availability'
  | 'additional'

type CategoryStatus = 'empty' | 'partial' | 'complete'

interface Msg {
  id: string
  role: 'assistant' | 'user'
  text: string
  time: string
}

interface ApplicantProfile {
  name: string
  email: string
  phone: string
  education: string
  experienceYears: string
  experienceSummary: string
  skills: string[]
  positionSpecific: string
  availability: string
  startDate: string
  additional: string
  emailVerified: boolean
  applicationId: string
}

interface CategoryState {
  key: CategoryKey
  label: string
  status: CategoryStatus
}

type Stage = 'position' | 'email' | 'otp' | 'session'

const POSITIONS = CAREER_OPENINGS
const SESSION_KEY = 'operava_recruitment_session_v1'

const EMPTY_PROFILE: ApplicantProfile = {
  name: '',
  email: '',
  phone: '',
  education: '',
  experienceYears: '',
  experienceSummary: '',
  skills: [],
  positionSpecific: '',
  availability: '',
  startDate: '',
  additional: '',
  emailVerified: false,
  applicationId: '',
}

const CATEGORY_DEFS: { key: CategoryKey; label: string }[] = [
  { key: 'personal', label: 'Personal Information' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
  { key: 'skills', label: 'Skills' },
  { key: 'position', label: 'Position-Specific' },
  { key: 'availability', label: 'Availability' },
  { key: 'additional', label: 'Additional' },
]

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function renderText(text: string) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ))
}

function extractFromAnswer(text: string, profile: ApplicantProfile): Partial<ApplicantProfile> {
  const t = text.trim()
  const lower = t.toLowerCase()
  const next: Partial<ApplicantProfile> = {}

  const nameMatch =
    t.match(/^(?:my name is|i am|i'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i) ||
    t.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})$/)
  if (nameMatch && !profile.name) next.name = nameMatch[1].trim()

  const emailMatch = t.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  if (emailMatch && !profile.emailVerified) next.email = emailMatch[0]

  const phoneMatch = t.match(/(?:\+?\d[\d\s().-]{7,}\d)/)
  if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 8) next.phone = phoneMatch[0].trim()

  const yearsMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:\+\s*)?(?:years?|yrs?)\b/)
  if (yearsMatch) {
    next.experienceYears = yearsMatch[1]
    if (t.length > 20) next.experienceSummary = t.slice(0, 280)
  } else if (
    /\b(worked|experience|i have|i've worked|previously|background)\b/i.test(t) &&
    t.length > 40
  ) {
    next.experienceSummary = t.slice(0, 280)
  }

  if (/\b(degree|bachelor|master|bs|ba|bsit|bscs|college|university|graduated|diploma)\b/i.test(t)) {
    next.education = t.slice(0, 200)
  }

  const skillHints = [
    'react', 'typescript', 'javascript', 'node', 'python', 'java', 'aws', 'azure', 'gcp',
    'docker', 'kubernetes', 'sql', 'postgresql', 'mongodb', 'salesforce', 'zendesk', 'hubspot',
    'excel', 'sap', 'figma', 'git', 'github', 'next.js', 'nextjs', 'go', 'golang', 'php',
    'laravel', 'django', 'fastapi', 'rest', 'graphql', 'customer service', 'help desk',
    'chat support', 'voice', 'bpo', 'payroll', 'accounting', 'recruitment', 'hr',
  ]
  const found = skillHints.filter((s) => lower.includes(s))
  if (found.length) {
    const labeled = found.map((s) =>
      s.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    )
    next.skills = Array.from(new Set([...(profile.skills || []), ...labeled])).slice(0, 12)
  }

  if (/\b(night\s*shift|graveyard|overnight)\b/i.test(t)) next.availability = 'Night shift'
  else if (/\b(day\s*shift|morning)\b/i.test(t)) next.availability = 'Day shift'
  else if (/\b(mid\s*shift|afternoon)\b/i.test(t)) next.availability = 'Mid shift'
  else if (/\b(full[- ]?time|part[- ]?time|flexible|any shift|rotational)\b/i.test(t)) {
    next.availability = t.slice(0, 120)
  }

  const startMatch = t.match(
    /\b(?:start|available)\s+(?:on|from|by)?\s*([A-Za-z]+\s+\d{1,2}(?:,?\s*\d{4})?|\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|immediately|asap)\b/i,
  )
  if (startMatch) next.startDate = startMatch[1]

  return next
}

function computeCategories(profile: ApplicantProfile): CategoryState[] {
  return CATEGORY_DEFS.map(({ key, label }) => {
    let status: CategoryStatus = 'empty'
    switch (key) {
      case 'personal':
        if (profile.name && profile.email && profile.emailVerified) status = 'complete'
        else if (profile.name || profile.email || profile.phone) status = 'partial'
        break
      case 'education':
        status = profile.education ? 'complete' : 'empty'
        break
      case 'experience':
        if (profile.experienceYears && profile.experienceSummary) status = 'complete'
        else if (profile.experienceYears || profile.experienceSummary) status = 'partial'
        break
      case 'skills':
        status =
          profile.skills.length >= 2 ? 'complete' : profile.skills.length === 1 ? 'partial' : 'empty'
        break
      case 'position':
        status = profile.positionSpecific ? 'complete' : 'empty'
        break
      case 'availability':
        if (profile.availability && profile.startDate) status = 'complete'
        else if (profile.availability || profile.startDate) status = 'partial'
        break
      case 'additional':
        status = profile.additional ? 'complete' : 'empty'
        break
    }
    return { key, label, status }
  })
}

function StatusIcon({ status }: { status: CategoryStatus }) {
  if (status === 'complete')
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    )
  if (status === 'partial')
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
        <Circle className="h-2.5 w-2.5 fill-current" />
      </span>
    )
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <Circle className="h-2.5 w-2.5" />
    </span>
  )
}

function welcomeFor(position: CareerOpening, name: string) {
  const greet = name ? ` ${name}` : ''
  return (
    `Welcome to OPERAVA Recruitment AVA${greet}.\n\n` +
    `Your application email is verified. I'll guide you through your application for ${position.title}, gather the required information, and help prepare your application for assessment.\n\n` +
    `This is a guided conversation — not a long form. Your profile on the left updates as we go.\n\n` +
    `To continue, briefly share your professional background (years of experience and primary skills).`
  )
}

function ShellHeader({ right }: { right?: ReactNode }) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center shrink-0 text-white">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-tight text-slate-900">Recruitment AVA</p>
            <p className="text-[11px] text-slate-500 truncate">Your Virtual Assistant for today</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {right}
          <Link
            to="/apply"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
          >
            Formal apply
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-800 px-2">
            Main site
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function AiJobScreening() {
  const [stage, setStage] = useState<Stage>('position')
  const [position, setPosition] = useState<CareerOpening | null>(null)
  const [profile, setProfile] = useState<ApplicantProfile>(EMPTY_PROFILE)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const [emailName, setEmailName] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [draftId, setDraftId] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [sessionToken, setSessionToken] = useState('')
  const [verifyBusy, setVerifyBusy] = useState(false)
  const [verifyError, setVerifyError] = useState('')

  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => computeCategories(profile), [profile])
  const completedCount = categories.filter((c) => c.status === 'complete').length

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      if (!raw) return
      const data = JSON.parse(raw) as {
        sessionToken?: string
        applicationId?: string
        name?: string
        email?: string
        positionCode?: string
        expiresAt?: number
      }
      if (!data.sessionToken || !data.expiresAt || Date.now() > data.expiresAt) {
        sessionStorage.removeItem(SESSION_KEY)
        return
      }
      const pos = POSITIONS.find((p) => p.code === data.positionCode)
      if (!pos) return
      setPosition(pos)
      setSessionToken(data.sessionToken)
      setProfile({
        ...EMPTY_PROFILE,
        name: data.name || '',
        email: data.email || '',
        emailVerified: true,
        applicationId: data.applicationId || '',
      })
      setMessages([
        {
          id: 'welcome-restore',
          role: 'assistant',
          text: welcomeFor(pos, data.name || ''),
          time: nowTime(),
        },
      ])
      setStage('session')
    } catch {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }, [])

  const startWithPosition = useCallback((p: CareerOpening) => {
    setPosition(p)
    setProfile(EMPTY_PROFILE)
    setEmailName('')
    setEmailValue('')
    setOtpCode('')
    setDraftId('')
    setMaskedEmail('')
    setVerifyError('')
    setSessionToken('')
    setStage('email')
  }, [])

  const resetAll = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setStage('position')
    setPosition(null)
    setProfile(EMPTY_PROFILE)
    setMessages([])
    setInput('')
    setThinking(false)
    setProfileOpen(false)
    setEmailName('')
    setEmailValue('')
    setOtpCode('')
    setDraftId('')
    setMaskedEmail('')
    setSessionToken('')
    setVerifyError('')
  }

  const mergeProfile = (partial: Partial<ApplicantProfile>) => {
    setProfile((prev) => {
      const skills =
        partial.skills !== undefined
          ? Array.from(new Set([...(prev.skills || []), ...partial.skills])).slice(0, 12)
          : prev.skills
      return {
        ...prev,
        ...partial,
        skills,
        experienceSummary:
          partial.experienceSummary &&
          (!prev.experienceSummary || partial.experienceSummary.length > prev.experienceSummary.length)
            ? partial.experienceSummary
            : prev.experienceSummary || partial.experienceSummary || '',
      }
    })
  }

  const sendOtp = async () => {
    if (!position || verifyBusy) return
    setVerifyError('')
    const name = emailName.trim()
    const email = emailValue.trim().toLowerCase()
    if (name.length < 2) {
      setVerifyError('Please enter your full name.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setVerifyError('Please enter a valid application email.')
      return
    }
    setVerifyBusy(true)
    try {
      const res = await fetch('/api/recruitment/email-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          position: position.title,
          positionCode: position.code,
          website: '',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setVerifyError(String(data.error || 'Unable to send verification email.'))
        return
      }
      setDraftId(String(data.draftId || ''))
      setMaskedEmail(String(data.maskedEmail || email))
      setProfile((p) => ({ ...p, name, email }))
      setStage('otp')
    } catch {
      setVerifyError('Network error. Please try again.')
    } finally {
      setVerifyBusy(false)
    }
  }

  const resendOtp = async () => {
    if (!draftId || verifyBusy) return
    setVerifyError('')
    setVerifyBusy(true)
    try {
      const res = await fetch('/api/recruitment/email-resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setVerifyError(String(data.error || 'Unable to resend code.'))
        return
      }
      if (data.draftId) setDraftId(String(data.draftId))
      if (data.maskedEmail) setMaskedEmail(String(data.maskedEmail))
      setOtpCode('')
    } catch {
      setVerifyError('Network error. Please try again.')
    } finally {
      setVerifyBusy(false)
    }
  }

  const verifyOtp = async () => {
    if (!draftId || verifyBusy || !position) return
    setVerifyError('')
    const code = otpCode.replace(/\D/g, '')
    if (code.length !== 6) {
      setVerifyError('Enter the 6-digit code from your email.')
      return
    }
    setVerifyBusy(true)
    try {
      const res = await fetch('/api/recruitment/email-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId, code }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (data.draftId) setDraftId(String(data.draftId))
        setVerifyError(String(data.error || 'Invalid verification code.'))
        return
      }
      const token = String(data.sessionToken || '')
      const applicationId = String(data.applicationId || '')
      const name = String(data.name || emailName)
      const email = String(data.email || emailValue)
      setSessionToken(token)
      setProfile({
        ...EMPTY_PROFILE,
        name,
        email,
        emailVerified: true,
        applicationId,
      })
      try {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            sessionToken: token,
            applicationId,
            name,
            email,
            positionCode: position.code,
            expiresAt: data.expiresAt || Date.now() + 86400000,
          }),
        )
      } catch {
        /* ignore */
      }
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          text: welcomeFor(position, name),
          time: nowTime(),
        },
      ])
      setStage('session')
      setTimeout(() => inputRef.current?.focus(), 80)
    } catch {
      setVerifyError('Network error. Please try again.')
    } finally {
      setVerifyBusy(false)
    }
  }

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text || thinking || !position || !profile.emailVerified) return

    const userMsg: Msg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      time: nowTime(),
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setThinking(true)

    const extracted = extractFromAnswer(text, profile)
    if (Object.keys(extracted).length) mergeProfile(extracted)

    let reply = generateScreeningResponse(text).text

    const contextPrefix =
      `[Position: ${position.title}] ` +
      (profile.name ? `[Applicant: ${profile.name}] ` : '') +
      (profile.applicationId ? `[App ID: ${profile.applicationId}] ` : '') +
      (profile.experienceYears ? `[Years exp: ${profile.experienceYears}] ` : '')

    try {
      const history = [...messages, userMsg].slice(-10).map((m) => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        text: m.text,
      }))
      const res = await fetch('/api/job-screening-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: contextPrefix + text,
          history,
          sessionToken: sessionToken || undefined,
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
        time: nowTime(),
      },
    ])
    setThinking(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  if (stage === 'position') {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex flex-col">
        <ShellHeader />
        <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">Application entry</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Select the position you are applying for
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Welcome to OPERAVA Recruitment AVA. I will guide you through your application, gather the required
              information, and help prepare your application for assessment. Choose one track to begin.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {POSITIONS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => startWithPosition(p)}
                className="group text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-violet-300 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
              >
                <div className="h-9 w-9 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center mb-3 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Briefcase className="w-4 h-4" />
                </div>
                <p className="text-sm font-bold text-slate-900 mb-1 leading-snug">{p.shortTitle}</p>
                <p className="text-[11px] text-slate-500 mb-3">{p.location}</p>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet-700">
                  Continue
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            <Shield className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <p>
              {SCREENING_GUIDELINES.notAFinalDecision} Next you will verify your application email before the guided
              conversation continues.
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (stage === 'email' && position) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex flex-col">
        <ShellHeader
          right={
            <button type="button" onClick={resetAll} className="text-xs text-slate-500 hover:text-slate-800 px-2">
              Change position
            </button>
          }
        />
        <div className="flex-1 max-w-md w-full mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">
            Application email verification
          </p>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Verify your application email</h1>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Position: <span className="font-semibold text-slate-800">{position.title}</span>
            <br />
            We will send a verification code to this email before your application information is saved.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full name</label>
              <input
                value={emailName}
                onChange={(e) => setEmailName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Maria Santos"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Application email</label>
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            {verifyError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{verifyError}</p>
            )}
            <button
              type="button"
              disabled={verifyBusy}
              onClick={() => void sendOtp()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 disabled:opacity-50"
            >
              {verifyBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Send verification code
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (stage === 'otp' && position) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex flex-col">
        <ShellHeader
          right={
            <button
              type="button"
              onClick={() => {
                setStage('email')
                setVerifyError('')
                setOtpCode('')
              }}
              className="text-xs text-slate-500 hover:text-slate-800 px-2"
            >
              Change email
            </button>
          }
        />
        <div className="flex-1 max-w-md w-full mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">Enter verification code</p>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Check your email</h1>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            We sent a 6-digit code to <span className="font-semibold">{maskedEmail}</span>. Enter it below to continue.
            The code expires in 10 minutes.
          </p>
          <div className="space-y-4">
            <input
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-3 py-3 rounded-xl border border-slate-200 text-center text-lg tracking-[0.35em] font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="••••••"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
            {verifyError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{verifyError}</p>
            )}
            <button
              type="button"
              disabled={verifyBusy || otpCode.length !== 6}
              onClick={() => void verifyOtp()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 disabled:opacity-50"
            >
              {verifyBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Verify and continue
            </button>
            <button
              type="button"
              disabled={verifyBusy}
              onClick={() => void resendOtp()}
              className="w-full text-xs font-medium text-violet-700 hover:text-violet-900 py-2"
            >
              Resend code
            </button>
          </div>
        </div>
      </main>
    )
  }

  const profilePanel = (
    <div className="h-full flex flex-col bg-slate-50 border-r border-slate-200">
      <div className="px-4 py-4 border-b border-slate-200 bg-white">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Applicant</p>
        <p className="text-sm font-bold text-slate-900 truncate">{profile.name || '—'}</p>
        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{profile.applicationId || 'Session'}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 text-sm">
        <section>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Position</p>
          <p className="text-xs font-semibold text-violet-800 leading-snug">{position?.title}</p>
        </section>
        <section>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3 h-3" /> Contact
          </p>
          <div className="space-y-1 text-xs text-slate-700">
            <p className="truncate">{profile.email || '—'}</p>
            {profile.emailVerified ? (
              <p className="text-[10px] text-emerald-700 font-medium">Verified</p>
            ) : (
              <p className="text-[10px] text-amber-700">Unverified</p>
            )}
            {profile.phone && (
              <p className="flex items-center gap-1.5 pt-1">
                <Phone className="w-3 h-3 text-slate-400" />
                {profile.phone}
              </p>
            )}
          </div>
        </section>
        {profile.education && (
          <section>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3 h-3" /> Education
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">{profile.education}</p>
          </section>
        )}
        {(profile.experienceYears || profile.experienceSummary) && (
          <section>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <User className="w-3 h-3" /> Experience
            </p>
            {profile.experienceYears && (
              <p className="text-xs font-semibold text-slate-900 mb-1">{profile.experienceYears} years</p>
            )}
            {profile.experienceSummary && (
              <p className="text-xs text-slate-600 leading-relaxed">{profile.experienceSummary}</p>
            )}
          </section>
        )}
        {profile.skills.length > 0 && (
          <section>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Wrench className="w-3 h-3" /> Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex px-2 py-0.5 rounded-md bg-violet-50 text-violet-800 text-[10px] font-medium border border-violet-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}
        {(profile.availability || profile.startDate) && (
          <section>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Availability
            </p>
            {profile.availability && <p className="text-xs text-slate-700">{profile.availability}</p>}
            {profile.startDate && <p className="text-xs text-slate-500 mt-0.5">Start: {profile.startDate}</p>}
          </section>
        )}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Screening</p>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.key} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-600">{c.label}</span>
                <StatusIcon status={c.status} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] text-slate-400">
            {completedCount} of {categories.length} sections filled
          </p>
        </section>
        <section>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Application status</p>
          <p className="text-xs font-semibold text-violet-700">Application in progress</p>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
            Email verified. Profile details stay in this session until permanent storage (Phase 3).
          </p>
        </section>
      </div>
    </div>
  )

  return (
    <main className="h-[100dvh] bg-white text-slate-900 flex flex-col overflow-hidden">
      <header className="border-b border-slate-200 bg-white shrink-0 z-20">
        <div className="px-3 sm:px-5 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              className="lg:hidden h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              onClick={() => setProfileOpen(true)}
              aria-label="Open applicant profile"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
            <div className="h-9 w-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold tracking-tight text-slate-900 truncate">Recruitment AVA</p>
              <p className="text-[10px] text-slate-500 truncate">Your Virtual Assistant for today</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <Link
              to="/apply"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
            >
              Formal apply
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <aside className="hidden lg:flex w-[320px] xl:w-[360px] shrink-0 flex-col">{profilePanel}</aside>

        {profileOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close profile"
              onClick={() => setProfileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[min(100%,320px)] shadow-xl flex flex-col bg-white">
              <div className="flex items-center justify-between px-3 py-3 border-b border-slate-200">
                <p className="text-xs font-bold text-slate-800">Applicant profile</p>
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 min-h-0">{profilePanel}</div>
            </div>
          </div>
        )}

        <section className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="px-4 sm:px-6 py-2 border-b border-slate-100 bg-violet-50/60">
            <p className="text-[11px] text-violet-900/80 leading-snug">
              <span className="font-semibold">{position?.shortTitle}</span>
              {' · '}Email verified · Guided application · Not a final hiring decision
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[92%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-violet-600 text-white rounded-br-md'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-md'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-violet-600 mb-2 font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Recruitment AVA
                    </div>
                  )}
                  <div>{renderText(m.text.replace(/\*\*/g, ''))}</div>
                  <p className={`mt-2 text-[10px] ${m.role === 'user' ? 'text-violet-200' : 'text-slate-400'}`}>{m.time}</p>
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-500">
                  Recruitment AVA is reviewing…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="shrink-0 border-t border-slate-200 bg-white px-4 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void send()
              }}
              className="flex gap-2 items-center max-w-3xl mx-auto"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Recruitment AVA anything…"
                disabled={thinking}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={thinking || !input.trim()}
                className="h-12 w-12 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 flex items-center justify-center text-white shrink-0"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
