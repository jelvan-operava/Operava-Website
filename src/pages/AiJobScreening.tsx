import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Loader2 } from 'lucide-react'
import { CAREER_OPENINGS, type CareerOpening } from '../data/careersData'

type Stage = 'position' | 'email' | 'otp' | 'session'

const POSITIONS = CAREER_OPENINGS
const SESSION_KEY = 'operava_recruitment_session_v1'

export default function AiJobScreening() {
  const [stage, setStage] = useState<Stage>('position')
  const [position, setPosition] = useState<CareerOpening | null>(null)
  const [emailName, setEmailName] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [draftId, setDraftId] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [sessionToken, setSessionToken] = useState('')
  const [profileName, setProfileName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const draftIdRef = useRef('')
  const otpRefs = useRef<Array<HTMLInputElement | null>>([])

  const clearDraft = () => {
    draftIdRef.current = ''
    setDraftId('')
  }

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      if (!raw) return
      const data = JSON.parse(raw) as {
        sessionToken?: string
        name?: string
        email?: string
        positionCode?: string
        expiresAt?: number
        applicationId?: string
      }
      if (!data.sessionToken || !data.expiresAt || Date.now() > data.expiresAt) {
        sessionStorage.removeItem(SESSION_KEY)
        return
      }
      const pos = POSITIONS.find((p) => p.code === data.positionCode)
      if (!pos) return
      setPosition(pos)
      setSessionToken(data.sessionToken)
      setProfileName(data.name || '')
      if (data.email) setEmailValue(data.email)
      setStage('session')
    } catch {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }, [])

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
      if (!res.ok) return setError(String(data.error || 'Unable to send code.'))
      const nextDraft = String(data.draftId || '')
      if (!nextDraft || !nextDraft.startsWith('s1.')) {
        return setError('Verification session did not start correctly. Please try again.')
      }
      draftIdRef.current = nextDraft
      setDraftId(nextDraft)
      setMaskedEmail(String(data.maskedEmail || email))
      setOtpDigits(['', '', '', '', '', ''])
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId: currentDraft }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return setError(String(data.error || 'Unable to resend code.'))
      const nextDraft = String(data.draftId || currentDraft)
      if (!nextDraft || !nextDraft.startsWith('s1.')) {
        return setError('Verification session is invalid. Please request a new code.')
      }
      draftIdRef.current = nextDraft
      setDraftId(nextDraft)
      if (data.maskedEmail) setMaskedEmail(String(data.maskedEmail))
      setOtpDigits(['', '', '', '', '', ''])
      otpRefs.current[0]?.focus()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const verifyOtp = async (forcedCode?: string) => {
    if (busy || !position) return
    setError('')
    const code = (forcedCode ?? otpDigits.join('')).replace(/\D/g, '').slice(0, 6)
    if (code.length !== 6) return setError('Enter the 6-digit code from your email.')
    const currentDraft = draftIdRef.current || draftId
    if (!currentDraft || !currentDraft.startsWith('s1.')) {
      return setError('Verification session missing. Go back and request a new code.')
    }
    setBusy(true)
    try {
      const res = await fetch('/api/recruitment/email-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId: currentDraft, code }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.draftId) {
        const rotated = String(data.draftId)
        if (rotated.startsWith('s1.')) {
          draftIdRef.current = rotated
          setDraftId(rotated)
        }
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
      setProfileName(name)
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
      setStage('session')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
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
            <p className="text-[11px] text-slate-500">Email verification · OPERAVA</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/careers" className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium">
            Formal apply
          </Link>
          <Link to="/" className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100">
            Main site
          </Link>
        </div>
      </div>
    </header>
  )

  if (stage === 'position') {
    return (
      <main className="min-h-screen bg-slate-50">
        {header}
        <div className="max-w-3xl mx-auto px-4 py-10">
          <p className="text-[11px] font-bold tracking-wider text-violet-600 uppercase mb-2">Application entry</p>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Select the position you are applying for</h1>
          <p className="text-sm text-slate-600 mb-8">
            Choose one track to begin. You will verify your application email before information is saved.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {POSITIONS.map((p) => (
              <button
                key={p.code}
                type="button"
                onClick={() => {
                  setPosition(p)
                  setStage('email')
                  setError('')
                  clearDraft()
                }}
                className="text-left p-4 rounded-2xl border border-slate-200 bg-white hover:border-violet-300 hover:shadow-sm transition"
              >
                <p className="font-bold text-slate-900 text-sm">{p.title}</p>
                <p className="text-xs text-slate-500 mt-1">{p.location || 'Remote / Global'}</p>
                <p className="text-xs font-semibold text-violet-700 mt-3">Continue →</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (stage === 'email' || stage === 'otp') {
    return (
      <main className="min-h-screen bg-slate-50">
        {header}
        <div className="max-w-md mx-auto px-4 py-10">
          <p className="text-[11px] font-bold tracking-wider text-violet-600 uppercase mb-2">
            {position?.title}
          </p>
          {stage === 'email' ? (
            <div className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6">
              <h1 className="text-xl font-black text-slate-900">Verify your email</h1>
              <p className="text-sm text-slate-600">We will send a 6-digit code to confirm this is your application email.</p>
              <label className="block text-xs font-semibold text-slate-700">
                Full name
                <input
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm"
                  value={emailName}
                  onChange={(e) => setEmailName(e.target.value)}
                  autoComplete="name"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                Email
                <input
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  autoComplete="email"
                  inputMode="email"
                />
              </label>
              <button
                type="button"
                disabled={busy}
                onClick={() => void sendOtp()}
                className="w-full py-3 rounded-xl bg-violet-700 text-white text-sm font-semibold disabled:opacity-50"
              >
                {busy ? 'Sending…' : 'Send verification code'}
              </button>
              <button
                type="button"
                className="w-full text-xs text-slate-500 hover:underline"
                onClick={() => {
                  setStage('position')
                  setError('')
                  clearDraft()
                }}
              >
                Back to positions
              </button>
            </div>
          ) : (
            <div className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6">
              <h1 className="text-xl font-black text-slate-900">Enter verification code</h1>
              <p className="text-sm text-slate-600">
                Code sent to <strong>{maskedEmail}</strong>. Use the <em>latest</em> email only.
              </p>
              <div className="flex justify-center gap-2" role="group" aria-label="Verification code">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpRefs.current[index] = el
                    }}
                    inputMode="numeric"
                    autoComplete={index === 0 ? 'one-time-code' : 'off'}
                    aria-label={`Digit ${index + 1}`}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '')
                      if (raw.length > 1) {
                        const pasted = raw.slice(0, 6).split('')
                        const filled = ['', '', '', '', '', ''].map((_, i) => pasted[i] || '')
                        setOtpDigits(filled)
                        if (pasted.length === 6) void verifyOtp(pasted.join(''))
                        return
                      }
                      const ch = raw.slice(-1)
                      const copy = [...otpDigits]
                      copy[index] = ch
                      setOtpDigits(copy)
                      if (ch && index < 5) otpRefs.current[index + 1]?.focus()
                      if (copy.join('').length === 6) void verifyOtp(copy.join(''))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
                        otpRefs.current[index - 1]?.focus()
                      }
                      if (e.key === 'Enter') void verifyOtp()
                    }}
                    className="w-11 h-12 text-center text-lg font-bold border border-slate-200 rounded-xl"
                  />
                ))}
              </div>
              <button
                type="button"
                disabled={busy || otpDigits.join('').replace(/\D/g, '').length !== 6}
                onClick={() => void verifyOtp()}
                className="w-full py-3 rounded-xl bg-violet-700 text-white text-sm font-semibold disabled:opacity-50"
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying…
                  </span>
                ) : (
                  'Verify & continue'
                )}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void resendOtp()}
                className="w-full py-2 text-sm font-medium text-violet-700 hover:underline disabled:opacity-50"
              >
                Resend code
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setStage('email')
                  setOtpDigits(['', '', '', '', '', ''])
                  setError('')
                  clearDraft()
                }}
                className="w-full py-1 text-xs text-slate-500 hover:underline"
              >
                Use a different email
              </button>
            </div>
          )}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {header}
      <div className="max-w-lg mx-auto px-4 py-12 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">Email verified</h1>
        <p className="text-sm text-slate-600">
          Welcome{profileName ? ` ${profileName}` : ''}. Your session is active for{' '}
          <strong>{position?.title}</strong>.
        </p>
        <p className="text-xs text-slate-500 break-all">Session: {sessionToken ? 'active' : 'missing'}</p>
        <p className="text-sm text-slate-600">
          Chat screening UI is being restored. You can continue the formal application on Careers, or stay
          signed in here for the next step.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/careers"
            className="px-4 py-2.5 rounded-xl bg-violet-700 text-white text-sm font-semibold"
          >
            Open Careers
          </Link>
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            onClick={() => {
              sessionStorage.removeItem(SESSION_KEY)
              setSessionToken('')
              setStage('position')
              setPosition(null)
              clearDraft()
            }}
          >
            Start over
          </button>
        </div>
      </div>
    </main>
  )
}
