import { useState, type FormEvent } from 'react'
import { Loader2, Send, X } from 'lucide-react'
import { submitInquiry } from '../utils/submitInquiry'

interface CareerApplyFormProps {
  roleTitle: string
  onClose: () => void
  onSent: (referenceId: string) => void
}

export default function CareerApplyForm({ roleTitle, onClose, onSent }: CareerApplyFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      const result = await submitInquiry({
        kind: 'career',
        name,
        email,
        phone,
        role: roleTitle,
        notes,
      })
      onSent(result.referenceId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your application.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 rounded-2xl bg-violet-50 border border-violet-200 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900">Apply for {roleTitle}</p>
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close application form">
          <X className="w-4 h-4" />
        </button>
      </div>
      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200" />
      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200" />
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Experience, availability, or a resume link" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 resize-none" />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button type="submit" disabled={sending} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-violet-700 rounded-xl disabled:opacity-70">
        {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
        {sending ? 'Sending…' : 'Submit application'}
      </button>
      <p className="text-[11px] text-gray-500">You receive a ticket confirmation. Talent and HR are copied.</p>
    </form>
  )
}
