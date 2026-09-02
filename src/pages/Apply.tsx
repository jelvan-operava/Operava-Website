import { useState, type FormEvent } from 'react'
import { submitApplication } from '../utils/submitInquiry'

export default function Apply() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [role, setRole] = useState('General application')
  const [notes, setNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [referenceId, setReferenceId] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSending(true)
    try {
      const result = await submitApplication({ name, email, phone, country, role, notes, kind: 'career' })
      setReferenceId(result.referenceId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your application.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-3">Applicants</p>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Career application</h1>
        <p className="text-sm text-gray-600 mb-8">
          This form is for talent applicants only. Client project inquiries use the Contact form.
          You receive a confirmation email. HR and Talent are copied.
        </p>
        {referenceId ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
            Application received. Ticket <strong>#{referenceId}</strong> was emailed to you.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200" />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200" />
            <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country (optional)" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200" />
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200" />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} placeholder="Experience, availability, or a resume link" className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 resize-none" />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button type="submit" disabled={sending} className="px-5 py-2.5 text-sm font-bold text-white bg-violet-700 rounded-xl disabled:opacity-70">
              {sending ? 'Sending…' : 'Submit application'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
