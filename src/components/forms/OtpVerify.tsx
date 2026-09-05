import { useEffect, useRef, useState } from 'react'

interface Props {
  maskedEmail: string
  draftId: string
  devCode?: string
  onVerified: (result: { referenceId: string; name: string; formType: string }) => void
  onChangeEmail: () => void
  onBack: () => void
  onDraftIdChange?: (draftId: string) => void
}

export default function OtpVerify({
  maskedEmail,
  draftId: initialDraftId,
  devCode,
  onVerified,
  onChangeEmail,
  onBack,
  onDraftIdChange,
}: Props) {
  const [digits, setDigits] = useState(devCode && devCode.length === 6 ? devCode.split('') : ['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [seconds, setSeconds] = useState(45)
  const [draftId, setDraftId] = useState(initialDraftId)
  const refs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    setDraftId(initialDraftId)
  }, [initialDraftId])

  useEffect(() => {
    refs.current[0]?.focus()
    const timer = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(timer)
  }, [])

  const code = digits.join('')

  const verify = async (value = code) => {
    if (value.length !== 6 || busy) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/forms/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftId, code: value }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Verification failed.')
      onVerified({ referenceId: data.referenceId, name: data.name, formType: data.formType })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed.')
    } finally {
      setBusy(false)
    }
  }

  const onChange = (index: number, raw: string) => {
    const next = raw.replace(/\D/g, '')
    if (next.length > 1) {
      const pasted = next.slice(0, 6).split('')
      const filled = ['', '', '', '', '', ''].map((_, i) => pasted[i] || '')
      setDigits(filled)
      if (pasted.length === 6) void verify(pasted.join(''))
      return
    }
    const copy = [...digits]
    copy[index] = next
    setDigits(copy)
    if (next && index < 5) refs.current[index + 1]?.focus()
    if (copy.join('').length === 6) void verify(copy.join(''))
  }

  const resend = async () => {
    if (seconds > 0) return
    const res = await fetch('/api/forms/resend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftId }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Unable to resend.')
      return
    }
    if (data.draftId) {
      setDraftId(data.draftId)
      onDraftIdChange?.(data.draftId)
    }
    setSeconds(45)
    setError('')
  }

  return (
    <div className="max-w-md mx-auto text-center space-y-5">
      <h2 className="text-2xl font-black text-gray-900">Verify your email</h2>
      <p className="text-sm text-gray-600">We sent a 6-digit verification code to:<br /><strong>{maskedEmail}</strong></p>
      <div className="flex justify-center gap-2" role="group" aria-label="Verification code">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { refs.current[index] = el }}
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            aria-label={`Digit ${index + 1}`}
            maxLength={6}
            value={digit}
            onChange={(e) => onChange(index, e.target.value)}
            className="w-11 h-12 text-center text-lg font-bold border border-gray-200 rounded-xl"
          />
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button type="button" disabled={busy || code.length !== 6} onClick={() => verify()} className="w-full py-3 rounded-xl bg-violet-700 text-white text-sm font-bold disabled:opacity-50">
        {busy ? 'Verifying…' : 'VERIFY EMAIL'}
      </button>
      <p className="text-xs text-gray-500">Didn&apos;t receive the code?</p>
      <button type="button" onClick={resend} disabled={seconds > 0} className="text-xs font-semibold text-violet-700 disabled:text-gray-400">
        Resend code{seconds > 0 ? ` in 00:${String(seconds).padStart(2, '0')}` : ''}
      </button>
      <div className="flex justify-center gap-4 text-xs">
        <button type="button" onClick={onChangeEmail} className="underline text-gray-600">Change Email Address</button>
        <button type="button" onClick={onBack} className="underline text-gray-600">Return to Form</button>
      </div>
    </div>
  )
}
