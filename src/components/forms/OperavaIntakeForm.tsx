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
  // Centralize to 2 primary forms: SERVICES and CAREERS
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
        // If current specialization does not exist in new position, reset it
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
      if (fieldError) {
        next[key] = fieldError
      } else {
        delete next[key]
      }
      return next
    })
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
      setForm((prev) => {
        const nextForm = { ...prev, [key]: value }

        // If field was previously touched or already has an error, validate immediately for real-time responsiveness
        if (touched[key as keyof FormValidationState] || errors[key as keyof FormValidationState]) {
          const fieldError = validateSingleField(key as keyof FormValidationState, value, kind, {
            hasResume: Boolean(resumeKey),
            formValues: nextForm,
          })
          setErrors((prevErr) => {
            const nextErr = { ...prevErr }
            if (fieldError) {
              nextErr[key as keyof FormValidationState] = fieldError
            } else {
              delete nextErr[key as keyof FormValidationState]
            }
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
    setErrors((prev) => {
      const next = { ...prev }
      delete next.portfolio
      return next
    })
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    // Client-side validation across all relevant fields
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
      setError(
        `Please correct the ${count} highlighted ${
          count === 1 ? 'field' : 'fields'
        } below before continuing.`,
      )

      // Smooth scroll and focus on the first invalid field
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
      {/* Honeypot */}
      <input className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />

      {/* Common Contact Fields */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="field-name" className="block text-xs font-semibold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            {touched.name && !errors.name && form.name.trim().length >= 2 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <CheckCircle2 className="w-3 h-3" /> Valid
              </span>
            )}
          </div>
          <input
            id="field-name"
            name="name"
            required
            value={form.name}
            onChange={set('name')}
            onBlur={() => handleBlur('name')}
            placeholder="Jane Doe"
            aria-invalid={touched.name && Boolean(errors.name)}
            aria-describedby={touched.name && errors.name ? 'field-name-error' : undefined}
            className={getFieldClass(Boolean(errors.name), Boolean(touched.name))}
          />
          {touched.name && errors.name && (
            <p id="field-name-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {kind === 'SERVICES' && (
          <div>
            <label htmlFor="field-company" className="block text-xs font-semibold text-gray-700 mb-1">
              Company / Organization Name (Optional)
            </label>
            <input
              id="field-company"
              name="company"
              value={form.company}
              onChange={set('company')}
              onBlur={() => handleBlur('company')}
              placeholder="Acme Corp"
              className={getFieldClass(false, false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="field-email" className="block text-xs font-semibold text-gray-700">
                {kind === 'SERVICES' ? 'Business Email Address' : 'Email Address'} <span className="text-red-500">*</span>
              </label>
              {touched.email && !errors.email && form.email.trim() && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" /> Valid
                </span>
              )}
            </div>
            <input
              id="field-email"
              name="email"
              required
              type="email"
              value={form.email}
              onChange={set('email')}
              onBlur={() => handleBlur('email')}
              placeholder="name@company.com"
              aria-invalid={touched.email && Boolean(errors.email)}
              aria-describedby={touched.email && errors.email ? 'field-email-error' : undefined}
              className={getFieldClass(Boolean(errors.email), Boolean(touched.email))}
            />
            {touched.email && errors.email && (
              <p id="field-email-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="field-phone" className="block text-xs font-semibold text-gray-700">
                Contact / Phone Number <span className="text-red-500">*</span>
              </label>
              {touched.phone && !errors.phone && form.phone.trim() && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" /> Valid
                </span>
              )}
            </div>
            <input
              id="field-phone"
              name="phone"
              required
              type="tel"
              value={form.phone}
              onChange={set('phone')}
              onBlur={() => handleBlur('phone')}
              placeholder="+1 (555) 000-0000"
              aria-invalid={touched.phone && Boolean(errors.phone)}
              aria-describedby={touched.phone && errors.phone ? 'field-phone-error' : undefined}
              className={getFieldClass(Boolean(errors.phone), Boolean(touched.phone))}
            />
            {touched.phone && errors.phone && (
              <p id="field-phone-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="field-country" className="block text-xs font-semibold text-gray-700">
              {kind === 'CAREERS' ? 'Country / Current Location' : 'Country / Location'} <span className="text-red-500">*</span>
            </label>
            {touched.country && !errors.country && form.country.trim().length >= 2 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <CheckCircle2 className="w-3 h-3" /> Valid
              </span>
            )}
          </div>
          <input
            id="field-country"
            name="country"
            required
            value={form.country}
            onChange={set('country')}
            onBlur={() => handleBlur('country')}
            placeholder="United States, Philippines, Canada, etc."
            aria-invalid={touched.country && Boolean(errors.country)}
            aria-describedby={touched.country && errors.country ? 'field-country-error' : undefined}
            className={getFieldClass(Boolean(errors.country), Boolean(touched.country))}
          />
          {touched.country && errors.country && (
            <p id="field-country-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
              <span>{errors.country}</span>
            </p>
          )}
        </div>
      </div>

      {/* Centralized Services Form Fields (Used by Contact & Quote) */}
      {kind === 'SERVICES' && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="field-category" className="block text-xs font-semibold text-gray-700">
                Inquiry / Project Category <span className="text-red-500">*</span>
              </label>
              {touched.category && !errors.category && form.category && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" /> Selected
                </span>
              )}
            </div>
            <select
              id="field-category"
              name="category"
              value={form.category}
              onChange={set('category')}
              onBlur={() => handleBlur('category')}
              aria-invalid={touched.category && Boolean(errors.category)}
              aria-describedby={touched.category && errors.category ? 'field-category-error' : undefined}
              className={getFieldClass(Boolean(errors.category), Boolean(touched.category))}
            >
              {SERVICE_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {touched.category && errors.category && (
              <p id="field-category-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.category}</span>
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="field-service" className="block text-xs font-semibold text-gray-700">
                Specific Service or Consultation Needed <span className="text-red-500">*</span>
              </label>
              {touched.service && !errors.service && form.service && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" /> Selected
                </span>
              )}
            </div>
            <select
              id="field-service"
              name="service"
              required
              value={form.service}
              onChange={set('service')}
              onBlur={() => handleBlur('service')}
              aria-invalid={touched.service && Boolean(errors.service)}
              aria-describedby={touched.service && errors.service ? 'field-service-error' : undefined}
              className={getFieldClass(Boolean(errors.service), Boolean(touched.service))}
            >
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
            {touched.service && errors.service && (
              <p id="field-service-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.service}</span>
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="field-description" className="block text-xs font-semibold text-gray-700">
                Project Description / Inquiry Requirements <span className="text-red-500">*</span>
              </label>
              <span
                className={`font-mono text-[11px] ${
                  form.description.trim().length >= 15
                    ? 'text-emerald-600 font-semibold'
                    : form.description.trim().length > 0
                    ? 'text-amber-600 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {form.description.trim().length} / 15 min characters
              </span>
            </div>
            <textarea
              id="field-description"
              name="description"
              required
              minLength={15}
              value={form.description}
              onChange={set('description')}
              onBlur={() => handleBlur('description')}
              rows={5}
              placeholder="Describe your project goals, scope of work, technical requirements, or consultation inquiry (minimum 15 characters)..."
              aria-invalid={touched.description && Boolean(errors.description)}
              aria-describedby={touched.description && errors.description ? 'field-description-error' : undefined}
              className={getFieldClass(Boolean(errors.description), Boolean(touched.description))}
            />
            {touched.description && errors.description ? (
              <p id="field-description-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.description}</span>
              </p>
            ) : (
              <p className="text-[11px] text-gray-500 mt-1">
                Provide key details regarding your desired scope, objectives, or required team capabilities.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="field-budget" className="block text-xs font-semibold text-gray-700 mb-1">
                Estimated Budget (Optional)
              </label>
              <input
                id="field-budget"
                name="budget"
                value={form.budget}
                onChange={set('budget')}
                onBlur={() => handleBlur('budget')}
                placeholder="e.g., $10,000 - $25,000 USD"
                className={getFieldClass(false, false)}
              />
            </div>
            <div>
              <label htmlFor="field-contactMethod" className="block text-xs font-semibold text-gray-700 mb-1">
                Preferred Contact Method
              </label>
              <select
                id="field-contactMethod"
                name="contactMethod"
                value={form.contactMethod}
                onChange={set('contactMethod')}
                className={getFieldClass(false, false)}
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Either">Either Email or Phone</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="field-websiteUrl" className="block text-xs font-semibold text-gray-700">
                Website / Existing System URL (Optional)
              </label>
              {touched.websiteUrl && !errors.websiteUrl && form.websiteUrl.trim() && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" /> Valid URL
                </span>
              )}
            </div>
            <input
              id="field-websiteUrl"
              name="websiteUrl"
              value={form.websiteUrl}
              onChange={set('websiteUrl')}
              onBlur={() => handleBlur('websiteUrl')}
              placeholder="https://example.com"
              aria-invalid={touched.websiteUrl && Boolean(errors.websiteUrl)}
              aria-describedby={touched.websiteUrl && errors.websiteUrl ? 'field-websiteUrl-error' : undefined}
              className={getFieldClass(Boolean(errors.websiteUrl), Boolean(touched.websiteUrl))}
            />
            {touched.websiteUrl && errors.websiteUrl && (
              <p id="field-websiteUrl-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.websiteUrl}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Centralized Careers Form Fields */}
      {kind === 'CAREERS' && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <label htmlFor="field-position" className="block text-xs font-semibold text-gray-700 mb-1">
              Position Applied For <span className="text-red-500">*</span>
            </label>
            <select
              id="field-position"
              name="position"
              required
              value={form.position}
              onChange={(e) => {
                const newPos = e.target.value as CareerPosition
                setForm((prev) => ({
                  ...prev,
                  position: newPos,
                  specialization:
                    SKILLS_SPECIALIZATIONS[newPos]?.includes(prev.specialization)
                      ? prev.specialization
                      : '',
                }))
              }}
              onBlur={() => handleBlur('position')}
              className={getFieldClass(Boolean(errors.position), Boolean(touched.position))}
            >
              {CAREER_POSITIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {touched.position && errors.position && (
              <p id="field-position-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.position}</span>
              </p>
            )}
            <p className="text-[11px] text-gray-500 mt-1">
              May be assigned to specific related tasks on available posts or based on your skills and specialization.
            </p>
          </div>

          <div>
            <label htmlFor="field-specialization" className="block text-xs font-semibold text-gray-700 mb-1">
              Skills Specialization <span className="text-red-500">*</span>
            </label>
            <select
              id="field-specialization"
              name="specialization"
              required
              value={form.specialization}
              onChange={set('specialization')}
              onBlur={() => handleBlur('specialization')}
              aria-invalid={touched.specialization && Boolean(errors.specialization)}
              aria-describedby={touched.specialization && errors.specialization ? 'field-specialization-error' : undefined}
              className={getFieldClass(Boolean(errors.specialization), Boolean(touched.specialization))}
            >
              <option value="">-- Select Skills Specialization --</option>
              {currentSpecializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            {touched.specialization && errors.specialization && (
              <p id="field-specialization-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.specialization}</span>
              </p>
            )}
            <p className="text-[11px] text-gray-500 mt-1">
              Select your primary domain of expertise. Work assignments will align with available client posts matching this specialization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="field-availability" className="block text-xs font-semibold text-gray-700 mb-1">
                Availability / Notice Period <span className="text-red-500">*</span>
              </label>
              <input
                id="field-availability"
                name="availability"
                required
                value={form.availability}
                onChange={set('availability')}
                onBlur={() => handleBlur('availability')}
                placeholder="Immediate, 2 weeks, 1 month, etc."
                aria-invalid={touched.availability && Boolean(errors.availability)}
                aria-describedby={touched.availability && errors.availability ? 'field-availability-error' : undefined}
                className={getFieldClass(Boolean(errors.availability), Boolean(touched.availability))}
              />
              {touched.availability && errors.availability && (
                <p id="field-availability-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                  <span>{errors.availability}</span>
                </p>
              )}
            </div>
            <div>
              <label htmlFor="field-education" className="block text-xs font-semibold text-gray-700 mb-1">
                Highest Education Level <span className="text-red-500">*</span>
              </label>
              <input
                id="field-education"
                name="education"
                required
                value={form.education}
                onChange={set('education')}
                onBlur={() => handleBlur('education')}
                placeholder="Bachelor's, College Undergraduate, etc."
                aria-invalid={touched.education && Boolean(errors.education)}
                aria-describedby={touched.education && errors.education ? 'field-education-error' : undefined}
                className={getFieldClass(Boolean(errors.education), Boolean(touched.education))}
              />
              {touched.education && errors.education && (
                <p id="field-education-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                  <span>{errors.education}</span>
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="field-skills" className="block text-xs font-semibold text-gray-700 mb-1">
              Additional Technical Skills, Tools or Certifications (Optional)
            </label>
            <input
              id="field-skills"
              name="skills"
              value={form.skills}
              onChange={set('skills')}
              placeholder="e.g., React, TypeScript, AWS, QuickBooks, Zendesk, Salesforce, etc."
              className={getFieldClass(false, false)}
            />
          </div>

          <div>
            <label htmlFor="field-experience" className="block text-xs font-semibold text-gray-700 mb-1">
              Relevant Work Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              id="field-experience"
              name="experience"
              required
              value={form.experience}
              onChange={set('experience')}
              onBlur={() => handleBlur('experience')}
              rows={3}
              placeholder="Summary of previous roles, key responsibilities, and relevant achievements..."
              aria-invalid={touched.experience && Boolean(errors.experience)}
              aria-describedby={touched.experience && errors.experience ? 'field-experience-error' : undefined}
              className={getFieldClass(Boolean(errors.experience), Boolean(touched.experience))}
            />
            {touched.experience && errors.experience && (
              <p id="field-experience-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.experience}</span>
              </p>
            )}
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
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
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
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="field-portfolio" className="block text-xs font-semibold text-gray-700">
                Portfolio / LinkedIn / Professional Profile URL {!resumeKey && <span className="text-red-500">*</span>}
              </label>
              {touched.portfolio && !errors.portfolio && form.portfolio.trim() && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" /> Valid URL
                </span>
              )}
            </div>
            <input
              id="field-portfolio"
              name="portfolio"
              value={form.portfolio}
              onChange={set('portfolio')}
              onBlur={() => handleBlur('portfolio')}
              placeholder="https://linkedin.com/in/username or https://github.com/username"
              aria-invalid={touched.portfolio && Boolean(errors.portfolio)}
              aria-describedby={touched.portfolio && errors.portfolio ? 'field-portfolio-error' : undefined}
              className={getFieldClass(Boolean(errors.portfolio), Boolean(touched.portfolio))}
            />
            {touched.portfolio && errors.portfolio && (
              <p id="field-portfolio-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                <span>{errors.portfolio}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="field-contactMethodCareers" className="block text-xs font-semibold text-gray-700 mb-1">
                Preferred Contact Method
              </label>
              <select
                id="field-contactMethodCareers"
                name="contactMethod"
                value={form.contactMethod}
                onChange={set('contactMethod')}
                className={getFieldClass(false, false)}
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Either">Either Email or Phone</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="field-additional" className="block text-xs font-semibold text-gray-700 mb-1">
              Additional Information (Optional)
            </label>
            <textarea
              id="field-additional"
              name="additional"
              value={form.additional}
              onChange={set('additional')}
              rows={3}
              placeholder="Any additional notes, certifications, or cover information..."
              className={getFieldClass(false, false)}
            />
          </div>
        </div>
      )}

      {/* Consent & Verification Checkboxes */}
      <div className="pt-2 space-y-2.5">
        <div className={`p-2.5 rounded-xl transition-all ${touched.accurate && errors.accurate ? 'bg-red-50/70 border border-red-200' : ''}`}>
          <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              id="field-accurate"
              name="accurate"
              required
              checked={form.accurate}
              onChange={set('accurate')}
              onBlur={() => handleBlur('accurate')}
              aria-invalid={touched.accurate && Boolean(errors.accurate)}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
            />
            <span>I confirm that the information provided is accurate and complete.</span>
          </label>
          {touched.accurate && errors.accurate && (
            <p className="mt-1.5 ml-6 flex items-center gap-1.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
              <span>{errors.accurate}</span>
            </p>
          )}
        </div>

        <div className={`p-2.5 rounded-xl transition-all ${touched.privacy && errors.privacy ? 'bg-red-50/70 border border-red-200' : ''}`}>
          <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              id="field-privacy"
              name="privacy"
              required
              checked={form.privacy}
              onChange={set('privacy')}
              onBlur={() => handleBlur('privacy')}
              aria-invalid={touched.privacy && Boolean(errors.privacy)}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
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
          {touched.privacy && errors.privacy && (
            <p className="mt-1.5 ml-6 flex items-center gap-1.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
              <span>{errors.privacy}</span>
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{error}</div>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-violet-700 text-white text-sm font-bold hover:bg-violet-800 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {sending ? 'Sending verification code…' : 'Continue to email verification'}
      </button>
    </form>
  )
}
