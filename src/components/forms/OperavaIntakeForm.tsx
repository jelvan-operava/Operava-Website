import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import OtpVerify from './OtpVerify'
import FormSuccess from './FormSuccess'
import {
  CAREER_POSITIONS,
  SKILLS_SPECIALIZATIONS,
  type CareerPosition,
} from '../../data/careersData'
import {
  validateSingleField,
  validateIntakeForm,
  type FormValidationState,
} from '../../utils/formValidation'

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

function normalizeCareerPosition(raw?: string): CareerPosition {
  if (!raw) return 'OPERAVA Technology Executive'
  const lower = raw.toLowerCase()
  if (lower.includes('customer') || lower.includes('cx') || lower.includes('support') || lower.includes('service')) {
    return 'OPERAVA Customer Experience Executive'
  }
  if (lower.includes('operations') || lower.includes('ops') || lower.includes('hr') || lower.includes('finance') || lower.includes('accounting') || lower.includes('recruitment')) {
    return 'OPERAVA Business Operations Executive'
  }
  if (lower.includes('tech') || lower.includes('software') || lower.includes('developer') || lower.includes('engineer') || lower.includes('cloud')) {
    return 'OPERAVA Technology Executive'
  }
  return 'OPERAVA Technology Executive'
}

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
  const kind = rawKind === 'CAREERS' ? 'CAREERS' : 'SERVICES'

  const [step, setStep] = useState<'form' | 'otp' | 'done'>('form')
  const [draftId, setDraftId] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [devCode, setDevCode] = useState<string | undefined>(undefined)
  const [result, setResult] = useState<{ referenceId: string; name: string; formType: string }>({
    referenceId: '',
    name: '',
    formType: kind,
  })
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [resumeKey, setResumeKey] = useState('')
  const [resumeName, setResumeName] = useState('')
  const [errors, setErrors] = useState<FormValidationState>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValidationState, boolean>>>({})

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
    position: normalizeCareerPosition(defaultPosition),
    specialization: '',
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
    if (defaultPosition) {
      const normalized = normalizeCareerPosition(defaultPosition)
      setForm((prev) => ({
        ...prev,
        position: normalized,
        specialization:
          SKILLS_SPECIALIZATIONS[normalized]?.includes(prev.specialization)
            ? prev.specialization
            : '',
      }))
    }
  }, [defaultPosition])

  useEffect(() => {
    if (defaultService) {
      setForm((prev) => ({ ...prev, service: defaultService }))
      setErrors((prev) => {
        const next = { ...prev }
        delete next.service
        return next
      })
    }
  }, [defaultService])

  useEffect(() => {
    if (defaultCategory) {
      setForm((prev) => ({ ...prev, category: defaultCategory }))
      setErrors((prev) => {
        const next = { ...prev }
        delete next.category
        return next
      })
    }
  }, [defaultCategory])

  const handleBlur = (key: keyof FormValidationState) => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    const fieldError = validateSingleField(key, form[key as keyof typeof form], kind, {
      hasResume: Boolean(resumeKey),
      formValues: form,
    })
    setErrors((prev) => {
      const next = { ...prev }
      if (fieldError) next[key] = fieldError
      else delete next[key]
      return next
    })
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
      setForm((prev) => {
        const nextForm = { ...prev, [key]: value }
        if (touched[key as keyof FormValidationState] || errors[key as keyof FormValidationState]) {
          const fieldError = validateSingleField(key as keyof FormValidationState, value, kind, {
            hasResume: Boolean(resumeKey),
            formValues: nextForm,
          })
          setErrors((prevErr) => {
            const nextErr = { ...prevErr }
            if (fieldError) nextErr[key as keyof FormValidationState] = fieldError
            else delete nextErr[key as keyof FormValidationState]
            return nextErr
          })
        }
        return nextForm
      })
    }

  const uploadResume = async (file: File) => {
    const data = new FormData()
    data.append('file', file)
    const res = await fetch('/api/forms/upload', { method: 'POST', body: data })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Resume upload failed.')
    setResumeKey(json.resumeKey)
    setResumeName(file.name)

    const p = json.parsed || {}
    setForm((prev) => {
      const next = { ...prev }
      const fill = (key: keyof typeof prev, value?: string) => {
        const v = String(value || '').trim()
        if (!v) return
        if (!String(next[key] || '').trim()) {
          // @ts-expect-error dynamic form keys
          next[key] = v
        }
      }
      fill('name', p.fullName)
      fill('email', p.email)
      fill('phone', p.phone)
      fill('country', p.location)
      fill('education', p.education)
      fill('experience', p.experience)
      if (p.skills && !String(next.skills || '').trim()) next.skills = String(p.skills).slice(0, 2000)
      if (p.summary && !String(next.additional || '').trim()) next.additional = String(p.summary).slice(0, 2000)
      return next
    })

    setErrors((prev) => {
      const next = { ...prev }
      delete next.portfolio
      return next
    })
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    const validationErrors = validateIntakeForm(form, kind, Boolean(resumeKey))
    const errorKeys = Object.keys(validationErrors) as (keyof FormValidationState)[]
    if (errorKeys.length > 0) {
      setErrors(validationErrors)
      setTouched((prev) => {
        const next = { ...prev }
        errorKeys.forEach((k) => {
          next[k] = true
        })
        return next
      })
      const count = errorKeys.length
      setError(`Please correct the ${count} highlighted ${count === 1 ? 'field' : 'fields'} below before continuing.`)
      const firstKey = errorKeys[0]
      const firstElement = document.getElementById(`field-${firstKey}`)
      if (firstElement) {
        firstElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        firstElement.focus()
      }
      return
    }

    setSending(true)
    try {
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
          specialization: form.specialization,
          availability: form.availability,
          experience: form.experience,
          education: form.education,
          skills: form.specialization + (form.skills.trim() ? ` — Additional: ${form.skills.trim()}` : ''),
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
      setDevCode(data.devCode)
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
        devCode={devCode}
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

  const getFieldClass = (hasError?: boolean, isTouched?: boolean) => {
    if (isTouched && hasError) {
      return 'w-full px-4 py-3 text-sm border border-red-300 rounded-xl bg-red-50/25 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all shadow-xs'
    }
    return 'w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all shadow-xs'
  }

  const currentSpecializations = SKILLS_SPECIALIZATIONS[form.position as CareerPosition] || []

  return (
    <form noValidate onSubmit={submit} className="space-y-5 max-w-2xl">
      <input className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="field-name" className="block text-xs font-semibold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
          </div>
          <input id="field-name" name="name" required value={form.name} onChange={set('name')} onBlur={() => handleBlur('name')} placeholder="Jane Doe" className={getFieldClass(Boolean(errors.name), Boolean(touched.name))} />
          {touched.name && errors.name && (
            <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {kind === 'SERVICES' && (
          <div>
            <label htmlFor="field-company" className="block text-xs font-semibold text-gray-700 mb-1">Company / Organization Name (Optional)</label>
            <input id="field-company" name="company" value={form.company} onChange={set('company')} placeholder="Acme Corp" className={getFieldClass(false, false)} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="field-email" className="block text-xs font-semibold text-gray-700 mb-1">{kind === 'SERVICES' ? 'Business Email Address' : 'Email Address'} <span className="text-red-500">*</span></label>
            <input id="field-email" name="email" required type="email" value={form.email} onChange={set('email')} onBlur={() => handleBlur('email')} placeholder="name@company.com" className={getFieldClass(Boolean(errors.email), Boolean(touched.email))} />
            {touched.email && errors.email && (
              <p role="alert" className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="field-phone" className="block text-xs font-semibold text-gray-700 mb-1">Contact / Phone Number <span className="text-red-500">*</span></label>
            <input id="field-phone" name="phone" required type="tel" value={form.phone} onChange={set('phone')} onBlur={() => handleBlur('phone')} placeholder="+1 (555) 000-0000" className={getFieldClass(Boolean(errors.phone), Boolean(touched.phone))} />
            {touched.phone && errors.phone && (
              <p role="alert" className="mt-1.5 text-xs text-red-600 font-medium">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="field-country" className="block text-xs font-semibold text-gray-700 mb-1">{kind === 'CAREERS' ? 'Country / Current Location' : 'Country / Location'} <span className="text-red-500">*</span></label>
          <input id="field-country" name="country" required value={form.country} onChange={set('country')} onBlur={() => handleBlur('country')} placeholder="United States, Philippines, Canada, etc." className={getFieldClass(Boolean(errors.country), Boolean(touched.country))} />
          {touched.country && errors.country && (
            <p role="alert" className="mt-1.5 text-xs text-red-600 font-medium">{errors.country}</p>
          )}
        </div>
      </div>

      {kind === 'SERVICES' && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <label htmlFor="field-category" className="block text-xs font-semibold text-gray-700 mb-1">Inquiry / Project Category <span className="text-red-500">*</span></label>
            <select id="field-category" value={form.category} onChange={set('category')} onBlur={() => handleBlur('category')} className={getFieldClass(Boolean(errors.category), Boolean(touched.category))}>
              {SERVICE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="field-service" className="block text-xs font-semibold text-gray-700 mb-1">Service / Focus <span className="text-red-500">*</span></label>
            <select id="field-service" value={form.service} onChange={set('service')} onBlur={() => handleBlur('service')} className={getFieldClass(Boolean(errors.service), Boolean(touched.service))}>
              <option value="">Select a service</option>
              {[...IT_SERVICES, ...BPO_SERVICES, ...GENERAL_SERVICES].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="field-description" className="block text-xs font-semibold text-gray-700 mb-1">Project description <span className="text-red-500">*</span></label>
            <textarea id="field-description" rows={4} value={form.description} onChange={set('description')} onBlur={() => handleBlur('description')} className={getFieldClass(Boolean(errors.description), Boolean(touched.description))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Budget (optional)</label>
              <input value={form.budget} onChange={set('budget')} className={getFieldClass(false, false)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Website / System URL (optional)</label>
              <input value={form.websiteUrl} onChange={set('websiteUrl')} className={getFieldClass(false, false)} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred contact method</label>
            <select value={form.contactMethod} onChange={set('contactMethod')} className={getFieldClass(false, false)}>
              <option>Email</option>
              <option>Phone</option>
              <option>Either</option>
            </select>
          </div>
        </div>
      )}

      {kind === 'CAREERS' && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <label htmlFor="field-position" className="block text-xs font-semibold text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
            <select id="field-position" value={form.position} onChange={set('position')} onBlur={() => handleBlur('position')} className={getFieldClass(Boolean(errors.position), Boolean(touched.position))}>
              {CAREER_POSITIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="field-specialization" className="block text-xs font-semibold text-gray-700 mb-1">Specialization / Skills track</label>
            <select id="field-specialization" value={form.specialization} onChange={set('specialization')} className={getFieldClass(false, false)}>
              <option value="">Select specialization</option>
              {currentSpecializations.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Availability</label>
              <input value={form.availability} onChange={set('availability')} className={getFieldClass(false, false)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Experience</label>
              <input value={form.experience} onChange={set('experience')} className={getFieldClass(false, false)} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Education</label>
            <input value={form.education} onChange={set('education')} className={getFieldClass(false, false)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Additional skills</label>
            <input value={form.skills} onChange={set('skills')} className={getFieldClass(false, false)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Portfolio / LinkedIn (optional)</label>
            <input value={form.portfolio} onChange={set('portfolio')} className={getFieldClass(false, false)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Resume (PDF / Word / TXT)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setError('')
                try {
                  await uploadResume(file)
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Resume upload failed.')
                }
              }}
              className="block w-full text-sm text-gray-600"
            />
            {resumeName && (
              <p className="mt-1 text-xs text-emerald-700 font-medium">Attached: {resumeName}{resumeKey ? ' · converted to text for review' : ''}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Additional notes</label>
            <textarea rows={3} value={form.additional} onChange={set('additional')} className={getFieldClass(false, false)} />
          </div>
        </div>
      )}

      <div className="space-y-2 pt-2 border-t border-gray-100">
        <label className="flex items-start gap-2 text-xs text-gray-700">
          <input type="checkbox" checked={form.accurate} onChange={set('accurate')} className="mt-0.5" />
          <span>I confirm the information provided is accurate. <span className="text-red-500">*</span></span>
        </label>
        <label className="flex items-start gap-2 text-xs text-gray-700">
          <input type="checkbox" checked={form.privacy} onChange={set('privacy')} className="mt-0.5" />
          <span>I agree to the processing of my data as described in the privacy notice. <span className="text-red-500">*</span></span>
        </label>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button type="submit" disabled={sending} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold disabled:opacity-60">
        {sending ? 'Sending verification…' : 'Continue to email verification'}
      </button>

      <p className="text-[11px] text-gray-500">
        Prefer AI screening? <Link to="/ai-job-screening" className="text-violet-700 font-medium underline">Open Recruitment AVA</Link>
      </p>
    </form>
  )
}
