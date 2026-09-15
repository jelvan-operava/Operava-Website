import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { itServices, bpoServices } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedService } from '../i18n/translations/services'
import ServiceCard from '../components/ServiceCard'
import DraggableMarquee from '../components/DraggableMarquee'
import HomeMediaLoader from '../components/HomeMediaLoader'
import ToolsEcosystemMarquee from '../components/ToolsEcosystemMarquee'
import OperavaCover from '../components/OperavaCover'

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    el.querySelectorAll('.reveal').forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

const industries = [
  'Technology', 'SaaS', 'E-commerce', 'Financial Services',
  'Healthcare', 'Professional Services', 'Real Estate', 'Logistics',
  'Retail', 'Startups', 'SMEs', 'Enterprise',
]

const techCategories = [
  'Cloud Architecture', 'Custom Software', 'REST & GraphQL APIs', 'SQL & NoSQL Databases',
  'RPA Automation', 'Cybersecurity', 'Data Pipelines', 'Digital Platforms', 'Enterprise Systems Integration',
]

export default function Home() {
  const { t, language } = useLanguage()

  const trustRef = useIntersection()
  const itRef = useIntersection()
  const bpoRef = useIntersection()
  const modelRef = useIntersection()
  const industriesRef = useIntersection()
  const whyRef = useIntersection()
  const workforceRef = useIntersection()
  const techRef = useIntersection()
  const signatureRef = useIntersection()

  const [isHomeReady, setIsHomeReady] = useState(false)

  const operatingModelSteps = [
    {
      step: '01',
      label: t('model.step1.label', 'Discover'),
      desc: t('model.step1.desc', 'Analyze business workflows, pain points, and strategic scaling objectives.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419731/discover.png',
    },
    {
      step: '02',
      label: t('model.step2.label', 'Design'),
      desc: t('model.step2.desc', 'Architect customized software, workforce configurations, and SLA frameworks.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419732/Design.png',
    },
    {
      step: '03',
      label: t('model.step3.label', 'Build'),
      desc: t('model.step3.desc', 'Deploy cloud infrastructure, integrate APIs, and train dedicated teams.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419731/Build.png',
    },
    {
      step: '04',
      label: t('model.step4.label', 'Launch'),
      desc: t('model.step4.desc', 'Seamless transition with zero downtime and strict governance.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419732/Launch.png',
    },
    {
      step: '05',
      label: t('model.step5.label', 'Operate'),
      desc: t('model.step5.desc', '24/7 continuous management, quality assurance, and real-time monitoring.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419733/Operate.png',
    },
    {
      step: '06',
      label: t('model.step6.label', 'Optimize'),
      desc: t('model.step6.desc', 'Ongoing enhancements driven by automated analytics and continuous feedback loops.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419731/Optimize.png',
    },
  ]

  const whyFeaturesList = [
    {
      title: t('why.feat1.title', 'Technology-led'),
      desc: t('why.feat1.desc', 'Modern architecture built strictly around measurable business outcomes.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787449257/Technology-led.png',
    },
    {
      title: t('why.feat2.title', 'People-powered'),
      desc: t('why.feat2.desc', 'Highly skilled, certified professionals supporting your critical operations.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787449256/People-powered.png',
    },
    {
      title: t('why.feat3.title', 'Elastic & Scalable'),
      desc: t('why.feat3.desc', 'Flexible staffing and infrastructure that dynamically adjust with demand.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787449259/Elastic%20and%20Escalable.png',
    },
    {
      title: t('why.feat4.title', 'Process-driven'),
      desc: t('why.feat4.desc', 'ISO-aligned workflows designed for consistent precision and security.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787449258/process-driven.png',
    },
    {
      title: t('why.feat5.title', 'Global-ready'),
      desc: t('why.feat5.desc', 'Robust remote infrastructure designed for global enterprises.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787449256/Global-ready.png',
    },
    {
      title: t('why.feat6.title', 'Client-focused'),
      desc: t('why.feat6.desc', 'Transparent partnership model with dedicated account managers and clear KPIs.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787449258/client-focused.png',
    },
  ]

  return (
    <>
      <HomeMediaLoader onLoadingComplete={() => setIsHomeReady(true)} />
      <main className={`overflow-x-hidden transition-opacity duration-700 ${isHomeReady ? 'opacity-100' : 'opacity-0'}`}>
        <section className="relative w-full pt-16 sm:pt-20 lg:pt-0 min-h-0 lg:min-h-screen flex flex-col justify-end overflow-hidden bg-white lg:bg-gray-950">
          <OperavaCover />
        </section>

        <section ref={trustRef} id="capabilities" className="py-20 lg:py-28 bg-white border-t border-gray-100 scroll-mt-20 relative overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100/25 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-16 lg:mb-20">
              <p className="reveal text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-violet-700 mb-3">
                Automation, Technology, Workforce and Talent Solutions
              </p>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Built for the way modern businesses operate.
              </h2>
              <p className="reveal reveal-delay-2 text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
                OPERAVA bridges enterprise technology, specialized global talent, and high-precision operational processes into a single unified delivery engine.
              </p>
            </div>

            <div className="space-y-16 sm:space-y-20 lg:space-y-28">
              {[
                {
                  number: '01',
                  category: 'Digital & Infrastructure',
                  title: 'Technology & Software Engineering',
                  desc: 'Digital platforms, custom cloud applications, API networks and IT infrastructure engineered for resilient global scalability.',
                  features: [
                    'Custom software, web applications & mobile platforms',
                    'Cloud architecture & managed hosting (AWS, Azure, GCP)',
                    'API integrations, microservices & zero-trust security',
                  ],
                  imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/tech_software_dev_FULLY_TRANSPARENT_vtmlaf.png',
                  link: '/services/it',
                  cta: 'Explore IT Services',
                  reverse: false,
                  floatClass: 'animate-float-gentle',
                },
                {
                  number: '02',
                  category: 'Managed Talent & Scale',
                  title: 'Global Dedicated Workforce',
                  desc: 'Skilled remote professionals and managed teams supporting 24/7 global operations with rigorous SLA governance and seamless team integration.',
                  features: [
                    'Vetted Tier-1 engineering, technical & operational talent',
                    '24/7 follow-the-sun timezone coverage & dedicated managers',
                    'Frictionless scaling with zero onboarding overhead',
                  ],
                  imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/global_workforce_FULLY_TRANSPARENT_ghnan4.png',
                  link: '/careers',
                  cta: 'Explore Workforce Solutions',
                  reverse: true,
                  floatClass: 'animate-float-gentle-rev',
                },
                {
                  number: '03',
                  category: 'Enterprise Operations',
                  title: 'End-to-End Business Processes',
                  desc: 'Reliable outsourced operations designed for measurable accuracy, speed and scale across customer care, back-office, and specialized workflows.',
                  features: [
                    '24/7 omnichannel customer care & live chat resolution',
                    'Audited data processing, verification & accounting pipelines',
                    'Continuous SLA monitoring with dual-layer quality audits',
                  ],
                  imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/bpo_outsourcing_data_customer_exec_FULLY_TRANSPARENT_eto94y.png',
                  link: '/services/bpo',
                  cta: 'Explore BPO Services',
                  reverse: false,
                  floatClass: 'animate-float-gentle',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} flex flex-col ${
                    item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-10 lg:gap-16 xl:gap-20`}
                >
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed mb-6 font-normal">{item.desc}</p>
                    <ul className="space-y-2.5 mb-8">
                      {item.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-700 group/item">
                          <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5 transition-transform group-hover/item:scale-110" />
                          <span className="transition-colors group-hover/item:text-gray-950">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-violet-700 text-white font-semibold text-sm hover:bg-violet-800 active:scale-95 transition-all duration-200 shadow-md shadow-violet-700/20 group/btn"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <div className={`w-full flex items-center justify-center p-2 sm:p-6 bg-transparent ${item.floatClass}`}>
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] h-auto object-contain pointer-events-none select-none drop-shadow-xl transition-all duration-700 ease-out hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={itRef} className="py-20 lg:py-28 bg-gray-50/70 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  {t('section.it.title', 'Technology and operations, connected.')}
                </h2>
                <p className="reveal reveal-delay-1 text-base text-gray-500 mt-4 leading-relaxed">
                  {t('section.it.desc', 'Technology solutions that help organizations build digital products, modernize infrastructure, connect systems and operate securely at scale.')}
                </p>
              </div>
              <div className="reveal reveal-delay-3 shrink-0">
                <Link
                  to="/services/it"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-violet-700 bg-white border border-violet-200 rounded-xl hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 shadow-2xs"
                >
                  <span>View all IT services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {itServices.slice(0, 8).map((s, i) => (
                <ServiceCard key={s.id} service={getLocalizedService(s, language)} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section ref={bpoRef} className="py-20 lg:py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  {t('section.bpo.title', 'Extend your capabilities. Scale your operations.')}
                </h2>
                <p className="reveal reveal-delay-1 text-base text-gray-500 mt-4 leading-relaxed">
                  {t('section.bpo.desc', 'Flexible business process services that help organizations extend their capabilities, improve efficiency and scale operations without unnecessary overhead.')}
                </p>
              </div>
              <div className="reveal reveal-delay-3 shrink-0">
                <Link
                  to="/services/bpo"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-violet-700 bg-white border border-violet-200 rounded-xl hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 shadow-2xs"
                >
                  <span>View all BPO services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {bpoServices.slice(0, 8).map((s, i) => (
                <ServiceCard key={s.id} service={getLocalizedService(s, language)} index={i} />
              ))}
            </div>
          </div>
        </section>

        <DraggableMarquee />

        <section ref={modelRef} className="py-20 lg:py-28 bg-gray-950 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-14">
              <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                {t('model.title', 'The OPERAVA Operating Model')}
              </h2>
              <p className="reveal reveal-delay-1 text-sm text-gray-400 mt-2">
                {t('model.subtitle', 'A structured, agile methodology designed for seamless transition and rapid scaling.')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {operatingModelSteps.map((step, i) => (
                <div
                  key={step.step}
                  style={{ animationDelay: `${(i % 3) * 0.4}s` }}
                  className={`reveal reveal-delay-${Math.min(i + 1, 5)} group relative bg-transparent flex items-center justify-center transition-all duration-500 hover:scale-[1.02] select-none`}
                >
                  <div className="relative w-full overflow-hidden bg-transparent">
                    <img
                      src={step.imageSrc}
                      alt={`${step.step} - ${step.label}: ${step.desc}`}
                      className="w-full h-auto object-contain pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={whyRef} className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {t('why.title', 'Why organizations choose OPERAVA')}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyFeaturesList.map((feat, i) => (
                <div key={feat.title} className={`reveal reveal-delay-${(i % 3) + 1} p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow`}>
                  <img src={feat.imageSrc} alt={feat.title} className="w-14 h-14 object-contain mb-4" loading="lazy" referrerPolicy="no-referrer" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={industriesRef} className="py-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="reveal text-center text-xs font-semibold tracking-widest uppercase text-violet-700 mb-6">Industries we support</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {industries.map((ind) => (
                <span key={ind} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700">{ind}</span>
              ))}
            </div>
          </div>
        </section>

        <ToolsEcosystemMarquee />

        <section className="py-20 lg:py-28 bg-violet-700 text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="reveal text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to operate in advance?</h2>
            <p className="reveal reveal-delay-1 text-violet-100 mb-8">Talk with our team about technology, workforce, or end-to-end operations.</p>
            <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/quote" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-violet-800 font-semibold text-sm hover:bg-violet-50 transition-colors">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
