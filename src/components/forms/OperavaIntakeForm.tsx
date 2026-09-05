import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import OtpVerify from './OtpVerify'
import FormSuccess from './FormSuccess'

export type IntakeKind = 'SERVICES' | 'CAREERS' | 'CONTACT'

const SERVICE_CATEGORIES = [
  'Information Technology',
  'Business Process Outsourcing',
  'Combined IT & BPO',
  'General Business Inquiry & Consultation',
  'Other',
]

const IT_SERVICES = [
  'Software Development',
  'Web & Mobile Application Development',
  'SaaS & Platform Development',
  'IT Systems Development',
  'Computer Programming',
  'IT Consulting',
  'Systems Integration',
  'Database Services',
  'Cloud & Digital Infrastructure',
]

const BPO_SERVICES = [
  'Customer Service',
  'Technical Support',
  'Help Desk Operations',
  'Back-Office Operations',
  'Data Processing',
  'Data Entry',
  'Document Processing',
  'Virtual Assistance',
]

const GENERAL_SERVICES = [
  'General Business Consultation',
  'Strategic IT & BPO Partnership',
  'Custom Enterprise Solutions',
  'General Operational Inquiry',
  'Other Inquiry',
]

const POSITIONS = [
  'OPERAVA Technology Executive',
  'OPERAVA Customer Service Executive',
  'OPERAVA Business Operations Executive',
  'General application',
]

interface Props {
  kind: IntakeKind
  defaultPosition?: string
  defaultService?: string
  defaultCategory?: string
}

export default function OperavaIntakeForm({
  kind: rawKind,
  defaultPosition,
  defaultService,
  defaultCategory,
}: Props) {
  // Centralize to 2 primary forms: SERVICES and CAREERS
  const kind = rawKind === 'CAREERS' ? 'CAREERS' : 'SERVICES'

  const [step, setStep] = useState<'form' | 'otp' | 'done'>('form')
  const [draftId, setDraftId] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [result, setResult] = useState<{ referenceId: string; name: string; formType: string }>({
    referenceId: '',
    name: '',
    formType: kind,
  })
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
    category: defaultCategory || (rawKind === 'CONTACT' ? 'General Business Inquiry & Consultation' : 'Information Technology'),
    service: defaultService || (rawKind === 'CONTACT' ? 'General Business Consultation' : ''),
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
    accurate: false,
    privacy: false,
    website: '',
  })

  useEffect(() => {
    if (defaultPosition) setForm((prev) => ({ ...prev, position: defaultPosition }))
  }, [defaultPosition])

  useEffect(() => {
    if (defaultService) setForm((prev) => ({ ...prev, service: defaultService }))
  }, [defaultService])

  useEffect(() => {
    if (defaultCategory) setForm((prev) => ({ ...prev, category: defaultCategory }))
  }, [defaultCategory])

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          description: form.description,
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

  if (step === 'done') {
    return <FormSuccess formType={result.formType} name={result.name} referenceId={result.referenceId} />
  }

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

  const field = 'w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all'
  const positionOptions = Array.from(new Set([...(defaultPosition ? [defaultPosition] : []), ...POSITIONS]))

  return (
    <form onSubmit={submit} className="space-y-4 max-w-2xl">
      {/* Honeypot */}
      <input className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />

      {/* Common Contact Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Jane Doe"
            className={field}
          />
        </div>

        {kind === 'SERVICES' && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Company / Organization Name (Optional)
            </label>
            <input
              value={form.company}
              onChange={set('company')}
              placeholder="Acme Corp"
              className={field}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {kind === 'SERVICES' ? 'Business Email Address' : 'Email Address'} <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="name@company.com"
              className={field}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Contact / Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.phone}
              onChange={set('phone')}
              placeholder="+1 (555) 000-0000"
              className={field}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            {kind === 'CAREERS' ? 'Country / Current Location' : 'Country / Location'} <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={form.country}
            onChange={set('country')}
            placeholder="United States, Philippines, Canada, etc."
            className={field}
          />
        </div>
      </div>

      {/* Centralized Services Form Fields */}
      {kind === 'SERVICES' && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Inquiry / Project Category <span className="text-red-500">*</span>
            </label>
            <select value={form.category} onChange={set('category')} className={field}>
              {SERVICE_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Specific Service or Consultation Needed <span className="text-red-500">*</span>
            </label>
            <select required value={form.service} onChange={set('service')} className={field}>
              <option value="">Select Service / Inquiry Type</option>
              <optgroup label="Information Technology">
                {IT_SERVICES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Business Process Outsourcing (BPO)">
                {BPO_SERVICES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
              <optgroup label="General / Consultation">
                {GENERAL_SERVICES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Project Description / Inquiry Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              minLength={15}
              value={form.description}
              onChange={set('description')}
              rows={5}
              placeholder="Describe your project goals, scope of work, technical requirements, or consultation inquiry (minimum 15 characters)..."
              className={field}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Estimated Budget (Optional)
              </label>
              <input
                value={form.budget}
                onChange={set('budget')}
                placeholder="e.g., $10,000 - $25,000 USD"
                className={field}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Preferred Contact Method
              </label>
              <select value={form.contactMethod} onChange={set('contactMethod')} className={field}>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Either">Either Email or Phone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Website / Existing System URL (Optional)
            </label>
            <input
              value={form.websiteUrl}
              onChange={set('websiteUrl')}
              placeholder="https://example.com"
              className={field}
            />
          </div>
        </div>
      )}

      {/* Centralized Careers Form Fields */}
      {kind === 'CAREERS' && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Position Applied For <span className="text-red-500">*</span>
            </label>
            <select required value={form.position} onChange={set('position')} className={field}>
              {positionOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Availability / Notice Period <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.availability}
                onChange={set('availability')}
                placeholder="Immediate, 2 weeks, 1 month, etc."
                className={field}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Highest Education Level <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.education}
                onChange={set('education')}
                placeholder="Bachelor's, College Undergraduate, etc."
                className={field}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Skills &amp; Specialization <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={form.skills}
              onChange={set('skills')}
              placeholder="e.g., React, TypeScript, Cloud Infrastructure, Customer Support, etc."
              className={field}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Relevant Work Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={form.experience}
              onChange={set('experience')}
              rows={3}
              placeholder="Summary of previous roles, key responsibilities, and relevant achievements..."
              className={field}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Resume (PDF or Word) &mdash; recommended
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) uploadResume(file).catch((err) => setError(err.message))
              }}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            {resumeKey && (
              <p className="text-xs text-emerald-700 mt-1 font-medium">
                ✓ Resume attached{resumeName ? `: ${resumeName}` : ''}.
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              If upload is unavailable, provide your portfolio, GitHub, or LinkedIn URL below.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Portfolio / LinkedIn / Professional Profile URL
            </label>
            <input
              value={form.portfolio}
              onChange={set('portfolio')}
              placeholder="https://linkedin.com/in/username or https://github.com/username"
              className={field}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Preferred Contact Method
              </label>
              <select value={form.contactMethod} onChange={set('contactMethod')} className={field}>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Either">Either Email or Phone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Additional Information (Optional)
            </label>
            <textarea
              value={form.additional}
              onChange={set('additional')}
              rows={3}
              placeholder="Any additional notes, certifications, or cover information..."
              className={field}
            />
          </div>
        </div>
      )}

      {/* Consent & Verification Checkboxes */}
      <div className="pt-2 space-y-2">
        <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.accurate}
            onChange={set('accurate')}
            className="mt-0.5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
          />
          <span>I confirm that the information provided is accurate and complete.</span>
        </label>
        <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.privacy}
            onChange={set('privacy')}
            className="mt-0.5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
          />
          {kind === 'CAREERS' ? (
            <span>
              I acknowledge that my information will be processed for recruitment purposes in accordance with the{' '}
              <Link to="/privacy" className="text-violet-700 underline font-medium">
                Privacy Policy
              </Link>
              .
            </span>
          ) : (
            <span>
              I agree to the{' '}
              <Link to="/privacy" className="text-violet-700 underline font-medium">
                Privacy Policy
              </Link>{' '}
              and consent to OPERAVA contacting me regarding this inquiry.
            </span>
          )}
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-violet-700 text-white text-sm font-bold hover:bg-violet-800 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending verification code…' : 'Continue to email verification'}
      </button>
    </form>
  )
}
