import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Send, Briefcase, ExternalLink, PanelLeft, X, Check, Circle, Loader2,
} from 'lucide-react'
import { generateScreeningResponse } from '../utils/jobScreeningEngine'
import { CAREER_OPENINGS, type CareerOpening } from '../data/careersData'

type Stage = 'position' | 'email' | 'otp' | 'session' | 'assessment' | 'result'
type CategoryStatus = 'empty' | 'partial' | 'complete'

interface Msg { id: string; role: 'assistant' | 'user'; text: string; time: string }
interface ApplicantProfile {
  name: string; email: string; phone: string; education: string
  experienceYears: string; experienceSummary: string; skills: string[]
  positionSpecific: string; availability: string; startDate: string
  additional: string; emailVerified: boolean; applicationId: string
}

const POSITIONS = CAREER_OPENINGS
const SESSION_KEY = 'operava_recruitment_session_v1'
const EMPTY: ApplicantProfile = {
  name: '', email: '', phone: '', education: '', experienceYears: '',
  experienceSummary: '', skills: [], positionSpecific: '', availability: '',
  startDate: '', additional: '', emailVerified: false, applicationId: '',
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function extractFromAnswer(text: string, profile: ApplicantProfile): Partial<ApplicantProfile> {
  const t = text.trim()
  const lower = t.toLowerCase()
  const next: Partial<ApplicantProfile> = {}
  const yearsMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:\+\s*)?(?:years?|yrs?)\b/)
  if (yearsMatch) {
    next.experienceYears = yearsMatch[1]
    if (t.length > 20) next.experienceSummary = t.slice(0, 280)
  } else if (/\b(worked|experience|i have|i've worked|background)\b/i.test(t) && t.length > 40) {
    next.experienceSummary = t.slice(0, 280)
  }
  if (/\b(degree|bachelor|master|college|university|diploma|bsit|bscs)\b/i.test(t)) {
    next.education = t.slice(0, 200)
  }
  const skillHints = [
    'react', 'typescript', 'javascript', 'node', 'python', 'java', 'aws', 'azure', 'sql',
    'salesforce', 'zendesk', 'excel', 'git', 'customer service', 'help desk', 'bpo', 'hr',
  ]
  const found = skillHints.filter((s) => lower.includes(s)).map((s) =>
    s.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  )
  if (found.length) next.skills = Array.from(new Set([...(profile.skills || []), ...found])).slice(0, 12)
  if (/\b(night\s*shift|graveyard)\b/i.test(t)) next.availability = 'Night shift'
  else if (/\b(day\s*shift|morning)\b/i.test(t)) next.availability = 'Day shift'
  else if (/\b(full[- ]?time|flexible|any shift)\b/i.test(t)) next.availability = t.slice(0, 120)
  const startMatch = t.match(/\b(?:start|available)\s+(?:on|from|by)?\s*(immediately|asap|[A-Za-z]+\s+\d{1,2})/i)
  if (startMatch) next.startDate = startMatch[1]
  const phoneMatch = t.match(/(?:\+?\d[\d\s().-]{7,}\d)/)
  if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 8) next.phone = phoneMatch[0].trim()
  if (t.length > 80 && !next.positionSpecific && /\b(project|responsible|handled|built|managed)\b/i.test(t)) {
    next.positionSpecific = t.slice(0, 280)
  }
  if (t.length > 30 && /\b(also|note|equipment|laptop|willing)\b/i.test(t)) next.additional = t.slice(0, 200)
  return next
}

function categoryStatus(profile: ApplicantProfile): { label: string; status: CategoryStatus }[] {
  return [
    {
      label: 'Personal',
      status: profile.name && profile.email && profile.emailVerified ? 'complete' : profile.name || profile.phone ? 'partial' : 'empty',
    },
    { label: 'Education', status: profile.education ? 'complete' : 'empty' },
    {
      label: 'Experience',
      status: profile.experienceYears && profile.experienceSummary ? 'complete' : profile.experienceYears || profile.experienceSummary ? 'partial' : 'empty',
    },
    { label: 'Skills', status: profile.skills.length >= 2 ? 'complete' : profile.skills.length ? 'partial' : 'empty' },
    { label: 'Position-specific', status: profile.positionSpecific ? 'complete' : 'empty' },
    {
      label: 'Availability',
      status: profile.availability && profile.startDate ? 'complete' : profile.availability || profile.startDate ? 'partial' : 'empty',
    },
  ]
}

function welcomeFor(position: CareerOpening, name: string) {
  return (
    `Welcome to OPERAVA Recruitment AVA${name ? ' ' + name : ''}.\n\n` +
    `Your email is verified. I will gather required information for ${position.title}, then prepare you for the 30-question live assessment (pass mark 26/30).\n\n` +
    `Share your professional background: years of experience and primary skills.`
  )
}

export default function AiJobScreening() {
  const [stage, setStage] = useState<Stage>('position')
  const [position, setPosition] = useState<CareerOpening | null>(null)
  const [profile, setProfile] = useState<ApplicantProfile>(EMPTY)
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
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [appStatus, setAppStatus] = useState('APPLICATION_IN_PROGRESS')
  const [assessmentQ, setAssessmentQ] = useState<{ number: number; prompt: string } | null>(null)
  const [assessmentMeta, setAssessmentMeta] = useState({ total: 30, correctCount: 0 })
  const [resultMsg, setResultMsg] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const draftIdRef = useRef('')
  const cats = useMemo(() => categoryStatus(profile), [profile])
  const doneCount = cats.filter((c) => c.status === 'complete').length

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      if (!raw) return
      const data = JSON.parse(raw) as {
        sessionToken?: string; applicationId?: string; name?: string; email?: string
        positionCode?: string; expiresAt?: number
      }
      if (!data.sessionToken || !data.expiresAt || Date.now() > data.expiresAt) {
        sessionStorage.removeItem(SESSION_KEY)
        return
      }
      const pos = POSITIONS.find((p) => p.code === data.positionCode)
      if (!pos) return
      setPosition(pos)
      setSessionToken(data.sessionToken)
      setProfile({ ...EMPTY, name: data.name || '', email: data.email || '', emailVerified: true, applicationId: data.applicationId || '' })
      setMessages([{ id: 'w', role: 'assistant', text: welcomeFor(pos, data.name || ''), time: nowTime() }])
      setStage('session')
      void fetch('/api/recruitment/profile-get', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken: data.sessionToken }),
      }).then(async (res) => {
        if (!res.ok) return
        const row = await res.json()
        setProfile((prev) => ({
          ...prev,
          name: row.name || prev.name, email: row.email || prev.email, phone: row.phone || '',
          education: row.education || '', experienceYears: row.experienceYears || '',
          experienceSummary: row.experienceSummary || '',
          skills: Array.isArray(row.skills) ? row.skills : [],
          positionSpecific: row.positionSpecific || '', availability: row.availability || '',
          startDate: row.startDate || '', additional: row.additional || '',
          applicationId: row.applicationId || prev.applicationId, emailVerified: true,
        }))
        if (row.status) setAppStatus(String(row.status))
      }).catch(() => {})
    } catch {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }, [])

  const persist = (next: ApplicantProfile, token: string) => {
    if (!token) return
    void fetch('/api/recruitment/profile-update', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionToken: token, name: next.name, phone: next.phone, education: next.education,
        experienceYears: next.experienceYears, experienceSummary: next.experienceSummary,
        skills: next.skills, positionSpecific: next.positionSpecific,
        availability: next.availability, startDate: next.startDate, additional: next.additional,
      }),
    }).catch(() => {})
  }

  const merge = (partial: Partial<ApplicantProfile>) => {
    setProfile((prev) => {
      const skills = partial.skills
        ? Array.from(new Set([...(prev.skills || []), ...partial.skills])).slice(0, 12)
        : prev.skills
      const next = { ...prev, ...partial, skills }
      if (sessionToken) persist(next, sessionToken)
      return next
    })
  }

  const logMsg = (role: 'user' | 'assistant', text: string) => {
    if (!sessionToken) return
    void fetch('/api/recruitment/message', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionToken, role, text }),
    }).catch(() => {})
  }

  const sendOtp = async () => {
    if (!position || busy) return
    setError('')
    const name = emailName.trim()
    const email = emailValue.trim().toLowerCase()
    if (name.length < 2) return setError('Enter your full name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email.')
    setBusy(true)
    try {
      const res = await fetch('/api/recruitment/email-send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, position: position.title, positionCode: position.code, website: '' }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return setError(String(data.error || 'Unable to send code.'))
      const nextDraft = String(data.draftId || '')
      draftIdRef.current = nextDraft
      setDraftId(nextDraft)
      setMaskedEmail(String(data.maskedEmail || email))
      setOtpCode('')
      setProfile((p) => ({ ...p, name, email }))
      setStage('otp')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const resendOtp = async () => {
    const currentDraft = draftIdRef.current || draftId
    if (!currentDraft || busy) return
    setError('')
    setBusy(true)
    try {
      const res = await fetch('/api/recruitment/email-resend', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId: currentDraft }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return setError(String(data.error || 'Unable to resend code.'))
      const nextDraft = String(data.draftId || currentDraft)
      draftIdRef.current = nextDraft
      setDraftId(nextDraft)
      if (data.maskedEmail) setMaskedEmail(String(data.maskedEmail))
      setOtpCode('')
      setError('')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const verifyOtp = async () => {
    if (busy || !position) return
    setError('')
    const code = otpCode.replace(/\D/g, '').slice(0, 6)
    if (code.length !== 6) return setError('Enter the 6-digit code from your email.')
    const currentDraft = draftIdRef.current || draftId
    if (!currentDraft) return setError('Verification session missing. Go back and request a new code.')
    setBusy(true)
    try {
      const res = await fetch('/api/recruitment/email-verify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId: currentDraft, code }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.draftId) {
        const rotated = String(data.draftId)
        draftIdRef.current = rotated
        setDraftId(rotated)
      }
      if (!res.ok) {
        const remaining = data.attemptsRemaining
        const base = String(data.error || 'Invalid verification code.')
        if (typeof remaining === 'number') {
          return setError(base + (remaining > 0 ? ` (${remaining} attempts left)` : ''))
        }
        return setError(base)
      }
      const token = String(data.sessionToken || '')
      if (!token) return setError('Verification succeeded but session was not created. Please try again.')
      const applicationId = String(data.applicationId || '')
      const name = String(data.name || emailName)
      const email = String(data.email || emailValue)
      setSessionToken(token)
      setProfile({ ...EMPTY, name, email, emailVerified: true, applicationId })
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        sessionToken: token, applicationId, name, email, positionCode: position.code,
        expiresAt: data.expiresAt || Date.now() + 86400000,
      }))
      setMessages([{ id: 'w', role: 'assistant', text: welcomeFor(position, name), time: nowTime() }])
      setStage('session')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const completeProfile = async () => {
    if (!sessionToken || busy) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/recruitment/complete-profile', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return setError(String(data.error || 'Profile incomplete.'))
      setAppStatus('PROFILE_COMPLETE')
      const text = String(data.message || 'Profile validated. You may start the assessment.')
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text, time: nowTime() }])
    } catch {
      setError('Network error.')
    } finally {
      setBusy(false)
    }
  }

  const startAssessment = async () => {
    if (!sessionToken || busy) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/recruitment/assessment-start', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return setError(String(data.error || 'Cannot start assessment.'))
      setStage('assessment')
      setAppStatus('ASSESSMENT_IN_PROGRESS')
      setAssessmentQ({ number: data.question?.number || 1, prompt: data.question?.prompt || '' })
      setAssessmentMeta({ total: data.total || 30, correctCount: 0 })
      const text = `${data.notice || 'Live assessment started.'}\n\nQuestion 1 of ${data.total}:\n${data.question?.prompt || ''}`
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text, time: nowTime() }])
    } catch {
      setError('Network error.')
    } finally {
      setBusy(false)
    }
  }

  const send = async () => {
    const text = input.trim()
    if (!text || !position) return
    if (stage === 'assessment') {
      if (busy || !sessionToken) return
      setBusy(true)
      setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text, time: nowTime() }])
      setInput('')
      logMsg('user', text)
      try {
        const res = await fetch('/api/recruitment/assessment-answer', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionToken, answer: text }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(String(data.error || 'Submit failed.'))
          setBusy(false)
          return
        }
        if (data.done) {
          setResultMsg(String(data.message || ''))
          setAppStatus(data.passed ? 'IN_POOL' : 'ASSESSMENT_COMPLETE')
          setStage('result')
          setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text: String(data.message), time: nowTime() }])
        } else {
          setAssessmentQ({ number: data.question?.number || 0, prompt: data.question?.prompt || '' })
          setAssessmentMeta({ total: data.total || 30, correctCount: Number(data.correctCount) || 0 })
          const reply = `Question ${data.question?.number} of ${data.total}:\n${data.question?.prompt || ''}`
          setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text: reply, time: nowTime() }])
        }
      } catch {
        setError('Network error.')
      } finally {
        setBusy(false)
      }
      return
    }
    if (thinking || !profile.emailVerified) return
    setThinking(true)
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text, time: nowTime() }])
    setInput('')
    logMsg('user', text)
    const extracted = extractFromAnswer(text, profile)
    if (Object.keys(extracted).length) merge(extracted)
    let reply = generateScreeningResponse(text).text
    try {
      const res = await fetch('/api/job-screening-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-8).map((m) => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text })),
          profile: { ...profile, ...extracted },
          positionTitle: position.title,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data?.text) reply = data.text
      }
    } catch { /* local fallback */ }
    setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text: reply, time: nowTime() }])
    logMsg('assistant', reply)
    setThinking(false)
  }

  const header = (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center text-white">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Recruitment AVA</p>
            <p className="text-[11px] text-slate-500">Your Virtual Assistant for today</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/apply" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white">
            Formal apply <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link to="/" className="text-xs text-slate-500 px-2">Main site</Link>
        </div>
      </div>
    </header>
  )

  if (stage === 'position') {
    return (
      <main className="min-h-screen bg-white flex flex-col">
        {header}
        <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-2">Application entry</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Select the position you are applying for</h1>
          <p className="text-sm text-slate-600 mb-8 max-w-2xl">
            Welcome to OPERAVA Recruitment AVA. Choose one track to begin. You will verify your application email before information is saved.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {POSITIONS.map((p) => (
              <button
                key={p.code}
                type="button"
                onClick={() => { setPosition(p); setStage('email'); setError('') }}
                className="text-left rounded-2xl border border-slate-200 p-5 hover:border-violet-300 hover:shadow-sm transition"
              >
                <p className="font-semibold text-slate-900 mb-1">{p.title}</p>
                <p className="text-xs text-slate-500 mb-3">{(p as { location?: string }).location || 'Remote / Global'}</p>
                <p className="text-xs text-violet-700 font-semibold">Continue →</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (stage === 'email' || stage === 'otp') {
    return (
      <main className="min-h-screen bg-white flex flex-col">
        {header}
        <div className="flex-1 max-w-md mx-auto px-4 py-12 w-full">
          <p className="text-xs font-semibold text-violet-600 mb-2">{position?.title}</p>
          <h1 className="text-xl font-bold mb-2">{stage === 'email' ? 'Verify application email' : 'Enter verification code'}</h1>
          <p className="text-sm text-slate-600 mb-6">
            {stage === 'email'
              ? 'We will send a verification code before your application information is saved.'
              : `Code sent to ${maskedEmail || 'your email'}. Use the latest code only.`}
          </p>
          {stage === 'email' ? (
            <div className="space-y-3">
              <input className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" placeholder="Full name" value={emailName} onChange={(e) => setEmailName(e.target.value)} />
              <input className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" placeholder="Application email" type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
              <button type="button" disabled={busy} onClick={() => void sendOtp()} className="w-full py-3 rounded-xl bg-violet-700 text-white text-sm font-semibold disabled:opacity-50">
                {busy ? 'Sending…' : 'Send verification code'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm tracking-widest text-center"
                placeholder="6-digit code"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => { if (e.key === 'Enter') void verifyOtp() }}
                maxLength={6}
              />
              <button type="button" disabled={busy || otpCode.replace(/\D/g, '').length !== 6} onClick={() => void verifyOtp()} className="w-full py-3 rounded-xl bg-violet-700 text-white text-sm font-semibold disabled:opacity-50">
                {busy ? 'Verifying…' : 'Verify & continue'}
              </button>
              <button type="button" disabled={busy} onClick={() => void resendOtp()} className="w-full py-2 text-sm font-medium text-violet-700 hover:underline disabled:opacity-50">
                Resend code
              </button>
              <button type="button" disabled={busy} onClick={() => { setStage('email'); setOtpCode(''); setError('') }} className="w-full py-1 text-xs text-slate-500 hover:underline">
                Use a different email
              </button>
            </div>
          )}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      </main>
    )
  }

  if (stage === 'result') {
    return (
      <main className="min-h-screen bg-white flex flex-col">
        {header}
        <div className="flex-1 max-w-lg mx-auto px-4 py-12">
          <h1 className="text-xl font-bold mb-3">Assessment complete</h1>
          <p className="text-sm text-slate-700 whitespace-pre-wrap mb-6">{resultMsg}</p>
          <p className="text-xs text-slate-500">Application: {profile.applicationId || '—'} · Status: {appStatus}</p>
          <Link to="/" className="inline-block mt-6 text-sm font-semibold text-violet-700">Return to main site</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="h-[100dvh] bg-white flex flex-col overflow-hidden">
      {header}
      <div className="flex-1 flex overflow-hidden max-w-6xl w-full mx-auto">
        <aside className={`w-full max-w-xs border-r border-slate-200 p-4 overflow-y-auto ${profileOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Live profile</p>
            <button type="button" className="lg:hidden" onClick={() => setProfileOpen(false)}><X className="w-4 h-4" /></button>
          </div>
          <p className="text-sm font-semibold text-slate-900 mb-1">{profile.name || 'Applicant'}</p>
          <p className="text-xs text-slate-500 mb-1">{profile.email || '—'}</p>
          <p className="text-[11px] text-violet-700 mb-4">{position?.title}</p>
          <p className="text-[11px] text-slate-500 mb-2">{doneCount}/6 categories · {appStatus}</p>
          <ul className="space-y-2 mb-4">
            {cats.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-xs">
                {c.status === 'complete' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Circle className="w-3.5 h-3.5 text-slate-300" />}
                <span className={c.status === 'complete' ? 'text-slate-800' : 'text-slate-500'}>{c.label}</span>
              </li>
            ))}
          </ul>
          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {profile.skills.map((s) => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-800">{s}</span>
              ))}
            </div>
          )}
          <div className="space-y-2">
            <button type="button" disabled={busy} onClick={() => void completeProfile()} className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold disabled:opacity-50">
              Validate profile
            </button>
            <button type="button" disabled={busy || appStatus === 'APPLICATION_IN_PROGRESS'} onClick={() => void startAssessment()} className="w-full py-2 rounded-lg bg-violet-700 text-white text-xs font-semibold disabled:opacity-50">
              Start 30-question assessment
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </aside>

        <section className="flex-1 flex flex-col min-w-0">
          <div className="lg:hidden border-b border-slate-200 px-3 py-2 flex items-center gap-2">
            <button type="button" onClick={() => setProfileOpen(true)} className="p-2 rounded-lg border border-slate-200">
              <PanelLeft className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-600 truncate">{position?.title}</p>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-violet-700 text-white' : 'bg-slate-100 text-slate-800'}`}>
                  {m.text}
                  <div className={`text-[10px] mt-1 ${m.role === 'user' ? 'text-violet-200' : 'text-slate-400'}`}>{m.time}</div>
                </div>
              </div>
            ))}
            {(thinking || busy) && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Working…
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t border-slate-200 p-3">
            <form
              className="flex gap-2"
              onSubmit={(e) => { e.preventDefault(); void send() }}
            >
              <input
                ref={inputRef}
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm"
                placeholder={stage === 'assessment' ? 'Type your answer…' : 'Message AVA…'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!profile.emailVerified || busy}
              />
              <button type="submit" disabled={!input.trim() || busy || thinking} className="px-3 rounded-xl bg-violet-700 text-white disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
