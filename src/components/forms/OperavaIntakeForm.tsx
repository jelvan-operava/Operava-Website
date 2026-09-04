import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import OtpVerify from './OtpVerify'
import FormSuccess from './FormSuccess'

export type IntakeKind = 'SERVICES' | 'CAREERS' | 'CONTACT'

const SERVICE_CATEGORIES = ['Information Technology', 'Business Process Outsourcing', 'Combined IT & BPO', 'Other']
const IT_SERVICES = ['Software Development', 'Web & Mobile Application Development', 'SaaS & Platform Development', 'IT Systems Development', 'Computer Programming', 'IT Consulting', 'Systems Integration', 'Database Services', 'Cloud & Digital Infrastructure']
const BPO_SERVICES = ['Customer Service', 'Technical Support', 'Help Desk Operations', 'Back-Office Operations', 'Data Processing', 'Data Entry', 'Document Processing', 'Virtual Assistance']
const POSITIONS = ['OPERAVA Technology Executive', 'OPERAVA Customer Service Executive', 'OPERAVA Business Operations Executive', 'General application']

interface Props {
  kind: IntakeKind
  defaultPosition?: string
  defaultService?: string
}

export default function OperavaIntakeForm({ kind, defaultPosition, defaultService }: Props) {
  const [step, setStep] = useState<'form' | 'otp' | 'done'>('form')
  const [draftId, setDraftId] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [result, setResult] = useState({ referenceId: '', name: '', formType: kind })
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [resumeKey, setResumeKey] = useState('')
  const [resumeName, setResumeName] = useState('')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    category: 'Information Technology',
    service: defaultService || '',
    description: '',
    budget: '',
    websiteUrl: '',
    contactMethod: 'Email',
    position: defaultPosition || 'General application',
    availability: '',
    experience: '',
    education: '',
    skills: '',
    portfolio: '',
    additional: '',
    message: '',
    accurate: false,
    privacy: false,
    website: '',
  })

  useEffect(() => {
    if (defaultPosition) setForm((prev) => ({ ...prev, position: defaultPosition }))
  }, [defaultPosition])

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const uploadResume = async (file: File) => {
    const data = new FormData()
    data.append('file', file)
    const res = await fetch('/api/forms/upload', { method: 'POST', body: data })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Resume upload failed.')
    setResumeKey(json.resumeKey)
    setResumeName(file.name)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSending(true)
    try {
      if (kind === 'CAREERS' && !resumeKey && !form.portfolio.trim()) {
        throw new Error('Upload a resume (PDF/Word) or add a portfolio / LinkedIn URL before continuing.')
      }
      const res = await fetch('/api/forms/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: kind,
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          country: form.country,
          category: form.category,
          service: form.service,
          description: kind === 'CONTACT' ? form.message : form.description,
          budget: form.budget,
          websiteUrl: form.websiteUrl,
          contactMethod: form.contactMethod,
          position: form.position,
          availability: form.availability,
          experience: form.experience,
          education: form.education,
          skills: form.skills,
          portfolio: form.portfolio,
          additional: form.additional,
          message: form.message,
          resumeKey,
          accurate: form.accurate,
          privacy: form.privacy,
          website: form.website,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to send verification code.')
      setDraftId(data.draftId)
      setMaskedEmail(data.maskedEmail)
      setStep('otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit.')
    } finally {
      setSending(false)
    }
  }

  if (step === 'done') return <FormSuccess formType={result.formType} name={result.name} referenceId={result.referenceId} />
  if (step === 'otp') {
    return (
      <OtpVerify
        maskedEmail={maskedEmail}
        draftId={draftId}
        onDraftIdChange={setDraftId}
        onVerified={(value) => {
          setResult(value)
          setStep('done')
        }}
        onChangeEmail={() => setStep('form')}
        onBack={() => setStep('form')}
      />
    )
  }

  const field = 'w-full px-4 py-3 text-sm border border-gray-200 rounded-xl'
  const positionOptions = Array.from(new Set([...(defaultPosition ? [defaultPosition] : []), ...POSITIONS]))

  return (
    <form onSubmit={submit} className="space-y-4 max-w-2xl">
      <input className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
      <input required value={form.name} onChange={set('name')} placeholder="Full Name" className={field} />
      {kind === 'SERVICES' && <input value={form.company} onChange={set('company')} placeholder="Company / Organization Name (Optional)" className={field} />}
      <input required type="email" value={form.email} onChange={set('email')} placeholder={kind === 'SERVICES' ? 'Business Email Address' : 'Email Address'} className={field} />
      <input value={form.phone} onChange={set('phone')} placeholder={kind === 'CAREERS' ? 'Contact Number' : 'Contact Number (Optional)'} required={kind === 'CAREERS'} className={field} />
      <input required={kind !== 'CONTACT'} value={form.country} onChange={set('country')} placeholder={kind === 'CAREERS' ? 'Country / Current Location' : 'Country / Location'} className={field} />

      {kind === 'SERVICES' && (
        <>
          <select value={form.category} onChange={set('category')} className={field}>
            {SERVICE_CATEGORIES.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select required value={form.service} onChange={set('service')} className={field}>
            <option value="">Specific Service Needed</option>
            <optgroup label="IT">{IT_SERVICES.map((item) => <option key={item}>{item}</option>)}</optgroup>
            <optgroup label="BPO">{BPO_SERVICES.map((item) => <option key={item}>{item}</option>)}</optgroup>
          </select>
          <textarea required minLength={15} value={form.description} onChange={set('description')} rows={5} placeholder="Project Description / Requirements" className={field} />
          <input value={form.budget} onChange={set('budget')} placeholder="Estimated Budget (Optional)" className={field} />
          <input value={form.websiteUrl} onChange={set('websiteUrl')} placeholder="Website / Existing System URL (Optional)" className={field} />
          <select value={form.contactMethod} onChange={set('contactMethod')} className={field}>
            <option>Email</option>
            <option>Phone</option>
            <option>Either</option>
          </select>
        </>
      )}

      {kind === 'CAREERS' && (
        <>
          <select required value={form.position} onChange={set('position')} className={field}>
            {positionOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input required value={form.availability} onChange={set('availability')} placeholder="Availability" className={field} />
          <textarea required value={form.experience} onChange={set('experience')} rows={3} placeholder="Relevant Work Experience" className={field} />
          <input required value={form.education} onChange={set('education')} placeholder="Education Level" className={field} />
          <input required value={form.skills} onChange={set('skills')} placeholder="Skills / Specialization" className={field} />
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Resume (PDF or Word) — recommended</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) uploadResume(file).catch((err) => setError(err.message))
              }}
              className="text-sm"
            />
            {resumeKey && <p className="text-xs text-emerald-700 mt-1">Resume ready{resumeName ? `: ${resumeName}` : ''}.</p>}
            <p className="text-xs text-gray-500 mt-1">If upload is unavailable, add a portfolio or LinkedIn URL below.</p>
          </div>
          <input value={form.portfolio} onChange={set('portfolio')} placeholder="Portfolio / LinkedIn / Professional Profile" className={field} />
          <textarea value={form.additional} onChange={set('additional')} rows={3} placeholder="Additional Information (Optional)" className={field} />
        </>
      )}

      {kind === 'CONTACT' && (
        <textarea required minLength={10} value={form.message} onChange={set('message')} rows={5} placeholder="How can OPERAVA help?" className={field} />
      )}

      <label className="flex items-start gap-2 text-xs text-gray-600">
        <input type="checkbox" required checked={form.accurate} onChange={set('accurate')} className="mt-0.5" />
        I confirm that the information provided is accurate.
      </label>
      <label className="flex items-start gap-2 text-xs text-gray-600">
        <input type="checkbox" required checked={form.privacy} onChange={set('privacy')} className="mt-0.5" />
        {kind === 'CAREERS'
          ? <span>I acknowledge that my information will be processed for recruitment purposes in accordance with the <Link to="/privacy" className="underline">Privacy Policy</Link>.</span>
          : <span>I agree to the <Link to="/privacy" className="underline">Privacy Policy</Link> and consent to OPERAVA contacting me regarding this inquiry.</span>}
      </label>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button type="submit" disabled={sending} className="px-6 py-3 rounded-xl bg-violet-700 text-white text-sm font-bold disabled:opacity-60">
        {sending ? 'Sending code…' : 'Continue to email verification'}
      </button>
    </form>
  )
}
