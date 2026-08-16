import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { itServices } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedService } from '../i18n/translations/services'
import DraggableMarquee from '../components/DraggableMarquee'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    el.querySelectorAll('.reveal').forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function ITServices() {
  const ref = useReveal()
  const { t, language } = useLanguage()

  return (
    <main>
      {/* Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">
              {t('nav.services.it', 'Information Technology')}
            </p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {t('nav.services.it', 'Information Technology')}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              {t('section.it.desc', 'Technology solutions that help organizations build digital products, modernize infrastructure, connect systems and operate securely at scale.')}
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section ref={ref} className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {itServices.map((rawService, i) => {
              const service = getLocalizedService(rawService, language)
              return (
                <Link
                  key={service.id}
                  to={`/services/it/${service.slug}`}
                  className={`reveal reveal-delay-${Math.min((i % 3) + 1, 5)} group flex flex-col bg-white border border-gray-100 rounded-2xl p-7 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700 group-hover:bg-violet-100 group-hover:scale-110 transition-all duration-300">
                      <span className="text-xs font-bold font-mono text-violet-700">{service.number}</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-violet-700 transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                    {service.shortDescription}
                  </p>
                  <ul className="flex flex-wrap gap-1.5 mb-5">
                    {service.capabilities.slice(0, 3).map((cap) => (
                      <li key={cap} className="px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-lg">
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 group-hover:gap-2.5 transition-all duration-200 mt-auto">
                    {t('common.exploreService', 'Explore service')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Marquee Tracks */}
      <DraggableMarquee />

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('cta.title', 'Ready to discuss your technology requirements?')}
          </h2>
          <p className="text-base text-gray-500 mb-8">
            {t('cta.subtitle', 'Our team can help you identify the right approach for your business.')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-95 transition-all duration-200"
          >
            {t('common.discussRequirements', 'Discuss Your Requirements')}
          </Link>
        </div>
      </section>
    </main>
  )
}
