import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Clock,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ArrowRight,
  RotateCcw,
  Loader2,
  Check,
  Globe2,
  Workflow,
  HelpCircle,
  FileCheck2
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import ContactSuccessState from '../components/ContactSuccessState'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  country: string
  service: string
  teamModel: string
  timeline: string
  description: string
  ndaConsent: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>
type TouchedFields = Partial<Record<keyof FormData, boolean>>

interface SubmittedData extends FormData {
  referenceId: string
  submittedAt: string
}

const TEAM_MODEL_OPTIONS = [
  { id: 'one-pro', label: 'One Professional', desc: '1 dedicated specialist' },
  { id: 'dedicated-team', label: 'One Dedicated Team', desc: 'Focused team (2–10)' },
  { id: 'multiple-teams', label: 'Multiple Teams', desc: 'Cross-functional (10+)' },
  { id: 'flexible', label: 'Exploring / Flexible', desc: 'Scope to be determined' },
]

const TIMELINE_OPTIONS = [
  'Immediately (< 2 weeks)',
  'Within 1 Month',
  '1–3 Months',
  'Exploring & Planning',
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
  'Customer Service (Voice, Chat, Email)',
  'Technical Support (Tier 1–3)',
  'Help Desk Operations',
  'Back-Office Operations',
  'Data Processing',
  'Data Entry',
  'Document Processing',
  'Virtual Assistance',
]

export default function Contact() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const initialService = searchParams.get('service') || ''
  const initialModel = searchParams.get('model') || 'One Dedicated Team'

  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    service: initialService,
    teamModel: initialModel,
    timeline: 'Within 1 Month',
    description: '',
    ndaConsent: true,
  })

  const [touched, setTouched] = useState<TouchedFields>({})
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null)

  // Update initial parameters if URL changes
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    const modelParam = searchParams.get('model')
    if (serviceParam) {
      setForm((prev) => ({ ...prev, service: serviceParam }))
    }
    if (modelParam) {
      setForm((prev) => ({ ...prev, teamModel: modelParam }))
    }
  }, [searchParams])

  // Field validation logic
  const validateField = (field: keyof FormData, value: any): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || !value.trim()) {
          return 'Full name is required'
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters'
        }
        return undefined

      case 'email':
        if (!value || !value.trim()) {
          return 'Work email is required'
        }
        // RFC 5322 compliant regex for robust email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid work email (e.g. name@company.com)'
        }
        return undefined

      case 'phone':
        if (value && value.trim()) {
          // Validate phone numbers: must have at least 7 digits, allowing +, -, spaces, ()
          const phoneClean = value.replace(/[\s\-()+]/g, '')
          if (!/^\d{7,15}$/.test(phoneClean)) {
            return 'Please enter a valid phone number (7–15 digits)'
          }
        }
        return undefined

      case 'service':
        if (!value || !value.trim()) {
          return 'Please select a primary service or area of interest'
        }
        return undefined

      case 'description':
        if (!value || !value.trim()) {
          return 'Please provide a brief description of your project or requirements'
        }
        if (value.trim().length < 15) {
          return `Please add more details (${value.trim().length}/15 min characters)`
        }
        return undefined

      case 'ndaConsent':
        if (!value) {
          return 'You must agree to privacy and confidentiality terms to submit'
        }
        return undefined

      default:
        return undefined
    }
  }

  // Validate entire form
  const validateAll = (): FormErrors => {
    const newErrors: FormErrors = {}
    ;(Object.keys(form) as Array<keyof FormData>).forEach((field) => {
      const err = validateField(field, form[field])
      if (err) {
        newErrors[field] = err
      }
    })
    return newErrors
  }

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, form[field])
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleChange = (field: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))

    // Re-validate immediately if the field was already touched
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched to show errors
    const allTouched: TouchedFields = {
      name: true,
      company: true,
      email: true,
      phone: true,
      country: true,
      service: true,
      teamModel: true,
      timeline: true,
      description: true,
      ndaConsent: true,
    }
    setTouched(allTouched)

    const validationErrors = validateAll()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      // Focus error summary or first invalid field
      if (errorSummaryRef.current) {
        errorSummaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    // Begin submission simulation
    setIsSubmitting(true)

    // Simulate network submission delay
    setTimeout(() => {
      const randomId = Math.floor(10000 + Math.random() * 90000)
      const refCode = `OPV-${new Date().getFullYear()}-${randomId}`
      const submissionTime = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })

      setSubmittedData({
        ...form,
        referenceId: refCode,
        submittedAt: submissionTime,
      })
      setIsSubmitting(false)
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }, 700)
  }

  const handleReset = () => {
    setForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      country: '',
      service: '',
      teamModel: 'One Dedicated Team',
      timeline: 'Within 1 Month',
      description: '',
      ndaConsent: true,
    })
    setTouched({})
    setErrors({})
    setSubmittedData(null)
    window.scrollTo({ top: 100, behavior: 'smooth' })
  }

  // Field styling helper
  const getInputStyles = (field: keyof FormData) => {
    const isError = touched[field] && !!errors[field]
    const isValid = touched[field] && !errors[field] && form[field] !== '' && form[field] !== false

    let borderClass = 'border-gray-200 hover:border-gray-300 focus:border-violet-700'
    if (isError) {
      borderClass = 'border-red-400 bg-red-50/20 text-gray-900 focus:border-red-500 focus:ring-red-200'
    } else if (isValid) {
      borderClass = 'border-emerald-300 focus:border-emerald-600 focus:ring-emerald-100'
    }

    return `w-full px-4 py-3 text-sm bg-white border rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-violet-700/20 ${borderClass}`
  }

  const hasErrors = Object.keys(errors).length > 0 && Object.keys(touched).length > 0

  return (
    <main className="bg-white">
      {/* 1. Header Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-gray-50 via-white to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100/80 border border-violet-200 text-violet-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t('contact.badge', 'OPERAVA SOLUTIONS INQUIRY')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
              {t('contact.title', "Let's build what comes next.")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {t(
                'contact.desc',
                'Tell us about your technology, workforce, or business process requirements. Our team will review your scope and provide a tailored engagement plan.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Form or Success Container */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {submittedData ? (
                /* ANIMATED SUCCESS FEEDBACK STATE */
                <ContactSuccessState
                  key="success-state"
                  data={submittedData}
                  onReset={handleReset}
                />
              ) : (
                /* ACTIVE FORM WITH ROBUST CLIENT VALIDATION */
                <motion.form
                  key="active-form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-6"
                  id="operava-contact-form"
                >
                {/* Form-Level Validation Error Summary Banner */}
                {hasErrors && (
                  <div
                    ref={errorSummaryRef}
                    className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 animate-in fade-in duration-200"
                    role="alert"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-bold">Please correct the highlighted fields before submitting:</p>
                      <ul className="list-disc list-inside mt-1.5 space-y-1 text-xs text-red-700">
                        {errors.name && <li>Full Name: {errors.name}</li>}
                        {errors.email && <li>Work Email: {errors.email}</li>}
                        {errors.phone && <li>Phone Number: {errors.phone}</li>}
                        {errors.service && <li>Service Required: {errors.service}</li>}
                        {errors.description && <li>Project Description: {errors.description}</li>}
                        {errors.ndaConsent && <li>Privacy Terms: {errors.ndaConsent}</li>}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 1. Name & Company Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-gray-700">
                        {t('contact.fullName', 'Full Name')} <span className="text-red-500">*</span>
                      </label>
                      {touched.name && !errors.name && form.name.trim().length >= 2 && (
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Valid
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={handleChange('name')}
                        onBlur={handleBlur('name')}
                        placeholder="e.g. Eleanor Vance"
                        className={getInputStyles('name')}
                        autoComplete="name"
                        aria-invalid={touched.name && !!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        disabled={isSubmitting}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-company" className="text-xs font-semibold text-gray-700">
                        {t('contact.company', 'Company / Organization')}
                      </label>
                      <span className="text-[11px] text-gray-400">Optional</span>
                    </div>
                    <input
                      id="contact-company"
                      type="text"
                      value={form.company}
                      onChange={handleChange('company')}
                      onBlur={handleBlur('company')}
                      placeholder="e.g. Global Tech Enterprises"
                      className={getInputStyles('company')}
                      autoComplete="organization"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* 2. Email & Phone Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-gray-700">
                        {t('contact.email', 'Work Email')} <span className="text-red-500">*</span>
                      </label>
                      {touched.email && !errors.email && form.email.trim() && (
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Valid
                        </span>
                      )}
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder="name@company.com"
                      className={getInputStyles('email')}
                      autoComplete="email"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {touched.email && errors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-gray-700">
                        {t('contact.phone', 'Phone Number')}
                      </label>
                      <span className="text-[11px] text-gray-400">Optional</span>
                    </div>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      placeholder="+1 (555) 000-0000"
                      className={getInputStyles('phone')}
                      autoComplete="tel"
                      aria-invalid={touched.phone && !!errors.phone}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      disabled={isSubmitting}
                    />
                    {touched.phone && errors.phone && (
                      <p id="contact-phone-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. Country & Service Selection Row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-country" className="text-xs font-semibold text-gray-700">
                        {t('contact.country', 'Country / Region')}
                      </label>
                      <span className="text-[11px] text-gray-400">Optional</span>
                    </div>
                    <input
                      id="contact-country"
                      type="text"
                      value={form.country}
                      onChange={handleChange('country')}
                      onBlur={handleBlur('country')}
                      placeholder="e.g. United States, Singapore, Australia, Philippines"
                      className={getInputStyles('country')}
                      autoComplete="country-name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-service" className="text-xs font-semibold text-gray-700">
                        {t('contact.serviceRequired', 'Service Required')} <span className="text-red-500">*</span>
                      </label>
                      {touched.service && !errors.service && form.service && (
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </span>
                      )}
                    </div>
                    <select
                      id="contact-service"
                      value={form.service}
                      onChange={handleChange('service')}
                      onBlur={handleBlur('service')}
                      className={getInputStyles('service')}
                      aria-invalid={touched.service && !!errors.service}
                      aria-describedby={errors.service ? 'contact-service-error' : undefined}
                      disabled={isSubmitting}
                    >
                      <option value="">{t('contact.selectService', 'Select service of interest...')}</option>
                      <optgroup label="Information Technology Services (8 Core Areas)">
                        {IT_SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="BPO & Workforce Operations (8 Core Areas)">
                        {BPO_SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Custom / Combined Scope">
                        <option value="Combined IT & BPO Operations">Combined IT & BPO Operations</option>
                        <option value="Dedicated Remote Staffing / Staff Augmentation">Dedicated Remote Staffing / Staff Augmentation</option>
                        <option value="General Technology & Operations Consultation">General Technology & Operations Consultation</option>
                        <option value="Other Custom Requirements">Other Custom Requirements</option>
                      </optgroup>
                    </select>
                    {touched.service && errors.service && (
                      <p id="contact-service-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. Flexible Delivery Model Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    {t('contact.teamSize', 'Preferred Delivery Model')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TEAM_MODEL_OPTIONS.map((model) => {
                      const isSelected = form.teamModel === model.label
                      return (
                        <button
                          key={model.id}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setForm((prev) => ({ ...prev, teamModel: model.label }))}
                          className={`p-3 text-left rounded-xl border transition-all duration-150 flex flex-col justify-between ${
                            isSelected
                              ? 'border-violet-700 bg-violet-50/80 ring-2 ring-violet-700/20 text-violet-900 shadow-sm'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-violet-200 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-xs font-bold">{model.label}</span>
                          <span className="text-[11px] text-gray-500 mt-1">{model.desc}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 5. Project Timeline Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Target Start Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINE_OPTIONS.map((tl) => {
                      const isSelected = form.timeline === tl
                      return (
                        <button
                          key={tl}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setForm((prev) => ({ ...prev, timeline: tl }))}
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            isSelected
                              ? 'border-violet-700 bg-violet-700 text-white'
                              : 'border-gray-200 text-gray-600 hover:border-violet-300 hover:bg-violet-50/50'
                          }`}
                        >
                          {tl}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 6. Project Description Textarea with Live Character Count */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="contact-description" className="text-xs font-semibold text-gray-700">
                      {t('contact.projectDescription', 'Project & Operational Requirements')}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-xs font-mono font-medium ${
                        form.description.trim().length >= 15 ? 'text-emerald-600' : 'text-gray-400'
                      }`}
                    >
                      {form.description.trim().length} / 15 min characters
                    </span>
                  </div>
                  <textarea
                    id="contact-description"
                    value={form.description}
                    onChange={handleChange('description')}
                    onBlur={handleBlur('description')}
                    rows={5}
                    placeholder={t(
                      'contact.projectPlaceholder',
                      'Describe your technical requirements, team roles needed, workflow goals, existing platforms, or any specific constraints...'
                    )}
                    className={`${getInputStyles('description')} resize-none`}
                    aria-invalid={touched.description && !!errors.description}
                    aria-describedby={errors.description ? 'contact-description-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {touched.description && errors.description && (
                    <p id="contact-description-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* 7. NDA & Privacy Terms Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      id="contact-nda-consent"
                      type="checkbox"
                      checked={form.ndaConsent}
                      onChange={handleChange('ndaConsent')}
                      onBlur={handleBlur('ndaConsent')}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-violet-700 focus:ring-violet-700 shrink-0"
                      disabled={isSubmitting}
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      I agree to have OPERAVA review this inquiry under standard confidentiality guidelines and the{' '}
                      <Link to="/privacy" className="text-violet-700 underline hover:text-violet-900">
                        Privacy Policy
                      </Link>
                      . Mutual NDAs are executed prior to deep architecture reviews.
                    </span>
                  </label>
                  {touched.ndaConsent && errors.ndaConsent && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.ndaConsent}
                    </p>
                  )}
                </div>

                {/* 8. Submit Button & Submission States */}
                <div className="pt-2">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-700/20 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.submit', 'Submit Solutions Inquiry')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Average response time: within 24 business hours. No spam guarantee.</span>
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

          {/* Sidebar & Information Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact & Office Details */}
            <div className="p-6 bg-gray-50 border border-gray-200/80 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-violet-700" />
                Location & Operations
              </h3>
              <div className="space-y-3.5 text-xs text-gray-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Philippine-Based</p>
                    <p>Pagudpud, Ilocos Norte 2919, Philippines</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Globe2 className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Operating Model</p>
                    <p>Philippine-based, operating remotely and globally across North America, APAC & Europe</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-violet-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Registration</p>
                    <p>SEC Registered (Corporation) & BIR Tax Compliant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Process Timeline */}
            <div className="p-6 bg-white border border-gray-200/80 rounded-2xl shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-violet-700" />
                {t('contact.nextSteps', 'How We Engage')}
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    label: 'Discovery & Scope',
                    desc: 'We analyze your workflows, technology stack, and team requirements.',
                  },
                  {
                    step: '02',
                    label: 'Solution Architecture',
                    desc: 'We propose the exact delivery tier (1 Pro, Dedicated, or Multiple Teams).',
                  },
                  {
                    step: '03',
                    label: 'Launch & Continuity',
                    desc: 'Seamless onboarding, standard KPIs, and operational management.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="text-xs font-mono font-bold text-violet-700 shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.label}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive AVA Assistant Callout */}
            <div className="p-6 bg-gradient-to-br from-violet-900 to-indigo-950 text-white rounded-2xl shadow-md">
              <div className="flex items-center gap-2 text-violet-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Instant Answers
              </div>
              <h3 className="text-base font-bold mb-1.5">
                Need immediate information?
              </h3>
              <p className="text-xs text-violet-200 leading-relaxed mb-4">
                Our virtual intelligence assistant AVA is available 24/7 in the bottom-right corner to answer questions regarding service capabilities, hiring models, and compliance.
              </p>
              <button
                type="button"
                onClick={() => {
                  const avaBtn = document.querySelector('button[aria-label="Open virtual assistant"]') as HTMLButtonElement | null
                  if (avaBtn) avaBtn.click()
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat with AVA Now
              </button>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
