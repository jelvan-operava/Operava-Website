import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { automationServices } from '../data/automationServices'
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    el.querySelectorAll('.reveal').forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [])
  return ref
}

export default function AutomationServices() {
  const ref = useReveal()
  const { t, language } = useLanguage()

  return (
    <main className="bg-white">
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
              OPERAVA / SERVICES
            </p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              Automation
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-4">
              Operava helps businesses automate repetitive work, connect disconnected systems, organize
              information, and build reliable digital processes—designed around the client's actual
              operations, not a fixed software package.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              For every automation project we review the current process, identify manual work, map the
              desired workflow, connect the required systems, build and test the automation, and deliver a
              process that can be monitored and improved over time.
            </p>
          </div>
        </div>
      </section>

      <section ref={ref} className="py-16 lg:py-24 bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {automationServices.map((rawService, i) => {
              const service = getLocalizedService(rawService, language)
              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  showCapabilities={true}
                  maxCapabilities={3}
                  matchTitleTheme
                />
              )
            })}
          </div>
        </div>
      </section>

      <DraggableMarquee />

      <section className="py-16 lg:py-20 bg-white">
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('cta.title', 'Ready to discuss your automation requirements?')}
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
