import { useParams, Link } from 'react-router-dom'
import { getServiceBySlug } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedService } from '../i18n/translations/services'

function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-gray-100">
      {items.map((item, i) => (
        <details key={i} className="group py-5">
          <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
            <span className="text-base font-semibold text-gray-900">{item.q}</span>
            <span className="shrink-0 w-5 h-5 text-violet-700 group-open:rotate-180 transition-transform duration-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams<{ category: string; slug: string }>()
  const rawService = slug ? getServiceBySlug(slug) : undefined
  const { t, language } = useLanguage()

  if (!rawService) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('serviceDetail.notFound', 'Service not found')}</h1>
          <Link to="/services/it" className="text-violet-700 hover:underline">
            {t('serviceDetail.viewAll', 'View all services')}
          </Link>
        </div>
      </main>
    )
  }

  const service = getLocalizedService(rawService, language)
  const categoryLabel = service.category === 'it' 
    ? t('nav.services.it', 'Information Technology') 
    : t('nav.services.bpo', 'Business Process Outsourcing')
  const categoryHref = service.category === 'it' ? '/services/it' : '/services/bpo'

  const faqItems = [
    {
      q: t('faq.q1', 'How quickly can we get started?'),
      a: t('faq.a1', 'After an initial discovery conversation, we typically have a clear proposal within a few business days. Implementation timelines vary by scope and complexity.'),
    },
    {
      q: t('faq.q2', 'Do you work with startups and SMEs as well as enterprise organizations?'),
      a: t('faq.a2', 'Yes. We work with organizations at different stages — from startups building their first systems to established enterprises modernizing operations.'),
    },
    {
      q: t('faq.q3', 'How do you handle confidentiality and data security?'),
      a: t('faq.a3', 'We apply structured data handling procedures, role-based access controls and defined operational controls to protect client information and systems.'),
    },
    {
      q: t('faq.q4', 'Can your services scale as our business grows?'),
      a: t('faq.a4', 'Yes. Our service model is designed to scale with your requirements — you can expand scope, capacity or capabilities as your business grows.'),
    },
  ]

  return (
    <main>
      {/* Breadcrumb + Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link to="/" className="hover:text-gray-600 transition-colors">{t('nav.home', 'Home')}</Link>
            <span>/</span>
            <Link to={categoryHref} className="hover:text-gray-600 transition-colors">{categoryLabel}</Link>
            <span>/</span>
            <span className="text-gray-700">{service.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 text-xs font-semibold text-violet-700 bg-violet-50 rounded-full">
                {categoryLabel}
              </span>
              <span className="text-xs font-mono text-gray-400">{service.number}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">{service.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('serviceDetail.overview', 'Service Overview')}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            {/* Capabilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('serviceDetail.capabilities', 'Key Capabilities')}
              </h2>
              <ul className="space-y-3">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-700 mt-2 shrink-0" />
                    <span className="text-sm text-gray-600">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('serviceDetail.benefits', 'Benefits')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3 text-violet-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('serviceDetail.industries', 'Common Industries')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.industries.map((ind) => (
                  <span key={ind} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-full">
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('serviceDetail.faq', 'Frequently Asked Questions')}
              </h2>
              <FAQAccordion items={faqItems} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* CTA card */}
              <div className="bg-violet-700 text-white rounded-2xl p-7">
                <h3 className="text-lg font-bold mb-3">
                  {t('serviceDetail.sidebarTitle', 'Ready to discuss your requirements?')}
                </h3>
                <p className="text-sm text-violet-200 leading-relaxed mb-6">
                  {t('serviceDetail.sidebarDesc', 'Our team can help you understand how this service fits your specific business context.')}
                </p>
                <Link
                  to="/contact"
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-violet-700 bg-white rounded-xl hover:bg-violet-50 transition-colors"
                >
                  {t('common.discussRequirements', 'Discuss Your Requirements')}
                </Link>
              </div>

              {/* Related services */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  {t('footer.services', 'Services')}
                </h3>
                <div className="space-y-3">
                  <Link to={categoryHref} className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-700 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                    {t('serviceDetail.viewAll', 'View all')} {categoryLabel}
                  </Link>
                  <Link to="/contact" className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-700 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                    {t('nav.talkToUs', 'Talk to our team')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
