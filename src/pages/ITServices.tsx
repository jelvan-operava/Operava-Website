import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { itServices } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedService } from '../i18n/translations/services'
import ServiceCard from '../components/ServiceCard'
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
      <section ref={ref} className="py-16 lg:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {itServices.map((rawService, i) => {
              const service = getLocalizedService(rawService, language)
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  showCapabilities={true}
                  maxCapabilities={3}
                />
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
