import { useState, type FormEvent } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const teamSizeOptions = ['1–5', '6–20', '21–50', '51–200', '200+']

export default function Contact() {
  const { t } = useLanguage()

  const serviceOptions = [
    t('home.hero.badge.software', 'Software Development'),
    t('home.hero.badge.webMobile', 'Web & Mobile Development'),
    t('home.hero.badge.customerSupport', 'Customer Support'),
    t('home.hero.badge.backOffice', 'Back-Office Operations'),
    t('home.hero.badge.cloud', 'Cloud & DevOps'),
    t('home.hero.badge.data', 'Data Services'),
    'Other',
  ]

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    teamSize: '',
    description: '',
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = t('contact.err.name', 'Full name is required')
    if (!form.email.trim()) e.email = t('contact.err.email', 'Work email is required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('contact.err.validEmail', 'Enter a valid email address')
    if (!form.service) e.service = t('contact.err.service', 'Please select a service')
    if (!form.description.trim()) e.description = t('contact.err.desc', 'Please describe your requirements')
    return e
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    setSubmitted(true)
  }

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const inputClass = (field: keyof typeof form) =>
    `w-full px-4 py-3 text-sm bg-white border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700/20 focus:border-violet-700 ${
      errors[field] ? 'border-red-300' : 'border-gray-200 hover:border-gray-300'
    }`

  return (
    <main>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">
              {t('contact.badge', 'Contact')}
            </p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {t('contact.title', "Let's build what comes next.")}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              {t('contact.desc', 'Tell us about your technology or operational requirements and our team will be in touch.')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-start gap-4 p-8 bg-violet-50 border border-violet-100 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-violet-700 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('contact.successTitle', 'Inquiry received.')}
                  </h2>
                  <p className="text-gray-600">
                    {t('contact.successDesc', 'Thank you for reaching out. We typically respond as soon as possible during business hours.')}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('contact.fullName', 'Full Name')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Your full name"
                      className={inputClass('name')}
                      autoComplete="name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('contact.company', 'Company')}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={set('company')}
                      placeholder="Your company name"
                      className={inputClass('company')}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('contact.email', 'Work Email')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@company.com"
                      className={inputClass('email')}
                      autoComplete="email"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('contact.phone', 'Phone')}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+1 000 000 0000"
                      className={inputClass('phone')}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('contact.country', 'Country')}
                    </label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={set('country')}
                      placeholder="Your country"
                      className={inputClass('country')}
                      autoComplete="country-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t('contact.serviceRequired', 'Service Required')} <span className="text-red-400">*</span>
                    </label>
                    <select value={form.service} onChange={set('service')} className={inputClass('service')}>
                      <option value="">{t('contact.selectService', 'What can we help with?')}</option>
                      {serviceOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {t('contact.teamSize', 'Estimated Team Size')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {teamSizeOptions.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, teamSize: size }))}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-150 ${
                          form.teamSize === size
                            ? 'border-violet-700 bg-violet-50 text-violet-700'
                            : 'border-gray-200 text-gray-600 hover:border-violet-200 hover:bg-violet-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {t('contact.projectDescription', 'Project Description')} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={set('description')}
                    rows={5}
                    placeholder={t('contact.projectPlaceholder', 'Describe your requirements, goals and any relevant context...')}
                    className={`${inputClass('description')} resize-none`}
                  />
                  {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-95 transition-all duration-200"
                >
                  {t('contact.submit', 'Submit Inquiry')}
                </button>
                <p className="text-xs text-gray-400 mt-3">
                  {t('contact.responseNotice', 'We typically respond as soon as possible during business hours.')}
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                {t('contact.nextSteps', 'What happens next?')}
              </h3>
              <div className="space-y-4">
                {[
                  { step: '01', label: t('contact.step1.label', 'We review your inquiry'), desc: t('contact.step1.desc', 'Our team reads every inquiry carefully.') },
                  { step: '02', label: t('contact.step2.label', 'We get in touch'), desc: t('contact.step2.desc', 'A team member will contact you to learn more.') },
                  { step: '03', label: t('contact.step3.label', 'We propose a solution'), desc: t('contact.step3.desc', 'We present a clear approach tailored to your needs.') },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="text-xs font-mono font-bold text-violet-700 shrink-0 mt-0.5">{item.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-violet-700 text-white rounded-2xl">
              <h3 className="text-sm font-bold mb-2">
                {t('contact.philsDelivery', 'Philippines-based. Globally delivered.')}
              </h3>
              <p className="text-sm text-violet-100">
                {t('contact.philsDeliveryDesc', 'Our team operates from the Philippines and supports organizations around the world.')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
