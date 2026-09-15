import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
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
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )
    el.querySelectorAll('.reveal').forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

const industries = [
  'Technology',
  'SaaS',
  'E-commerce',
  'Financial Services',
  'Healthcare',
  'Professional Services',
  'Real Estate',
  'Logistics',
  'Retail',
  'Startups',
  'SMEs',
  'Enterprise',
]

const techCategories = [
  'Cloud Architecture',
  'Custom Software',
  'REST & GraphQL APIs',
  'SQL & NoSQL Databases',
  'RPA Automation',
  'Cybersecurity',
  'Data Pipelines',
  'Digital Platforms',
  'Enterprise Systems Integration',
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
  const [whySlide, setWhySlide] = useState(0)

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
    },
    {
      title: t('why.feat2.title', 'People-powered'),
      desc: t('why.feat2.desc', 'Highly skilled, certified professionals supporting your critical operations.'),
    },
    {
      title: t('why.feat3.title', 'Elastic & Scalable'),
      desc: t('why.feat3.desc', 'Flexible staffing and infrastructure that dynamically adjust with demand.'),
    },
    {
      title: t('why.feat4.title', 'Process-driven'),
      desc: t('why.feat4.desc', 'ISO-aligned workflows designed for consistent precision and security.'),
    },
    {
      title: t('why.feat5.title', 'Global-ready'),
      desc: t('why.feat5.desc', 'Robust remote infrastructure designed for global enterprises.'),
    },
    {
      title: t('why.feat6.title', 'Client-focused'),
      desc: t('why.feat6.desc', 'Transparent partnership model with dedicated account managers and clear KPIs.'),
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
                  title: 'End-to-End Business Processes',
                  desc: 'Reliable outsourced operations designed for measurable accuracy, speed and scale across customer care, back-office, and specialized workflows.',
                  features: [
                    '24/7 omnichannel customer care & live chat resolution',
                    'Audited data processing, verification & accounting pipelines',
                    'Continuous SLA monitoring with dual-layer quality audits',
                  ],
                  imageSrc:
                    'https://res.cloudinary.com/sdaxzncs/image/upload/bpo_outsourcing_data_customer_exec_FULLY_TRANSPARENT_eto94y.png',
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
                  {t(
                    'section.it.desc',
                    'Technology solutions that help organizations build digital products, modernize infrastructure, connect systems and operate securely at scale.',
                  )}
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
                  {t(
                    'section.bpo.desc',
                    'Flexible business process services that help organizations extend their capabilities, improve efficiency and scale operations without unnecessary overhead.',
                  )}
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

        <section ref={industriesRef} className="py-20 lg:py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {t('industries.title', 'Specialized Solutions Across Global Industries')}
              </h2>
              <p className="reveal reveal-delay-1 text-base text-gray-500 mt-3">
                {t('industries.subtitle', 'Tailored technology and operations delivery for the industries that define modern business.')}
              </p>
            </div>
            <div className="reveal reveal-delay-2 flex flex-wrap gap-3">
              {industries.map((name) => (
                <span
                  key={name}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:border-violet-400 hover:bg-violet-50/80 hover:text-violet-700 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all duration-200"
                >
                  {name}
                </span>
              ))}
            </div>
            <div className="reveal reveal-delay-3 mt-8">
              <Link
                to="/industries"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
              >
                <span>Explore all industries</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section ref={workforceRef} className="py-20 lg:py-28 bg-violet-700 text-white overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.25) 1px, transparent 1.2px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-aura-pulse pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Extend your team without extending your complexity.
              </h2>
              <p className="reveal reveal-delay-1 text-base sm:text-lg text-violet-100 leading-relaxed mb-8">
                OPERAVA provides access to skilled professionals who can support technology, customer operations,
                administration and specialized business processes remotely.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-violet-900 bg-white rounded-xl hover:bg-violet-50 hover:shadow-xl hover:shadow-black/15 active:scale-95 transition-all duration-200 shadow-md"
                >
                  <span>Build Your Team</span>
                  <ArrowRight className="w-4 h-4 text-violet-700 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="w-full max-w-sm sm:max-w-md aspect-square relative flex items-center justify-center select-none overflow-hidden group animate-orb-levitate">
                <img
                  src="https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_1000/white_theme_transparent_8K_wj9kr4.webp"
                  alt="OPERAVA Global Workforce"
                  className="w-full h-full max-w-[340px] sm:max-w-[400px] max-h-[340px] sm:max-h-[400px] object-contain pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <section ref={techRef} className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Technology that moves your business forward.
              </h2>
            </div>
            <div className="reveal reveal-delay-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
              {techCategories.map((cat, i) => (
                <div
                  key={cat}
                  style={{ animationDelay: `${(i % 9) * 0.08}s` }}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-violet-300 hover:bg-violet-50/70 hover:-translate-y-1 hover:shadow-md hover:shadow-violet-900/5 transition-all duration-300 group text-center min-h-[90px] cursor-default"
                >
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-violet-800 transition-colors leading-snug">
                    {cat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={whyRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-indigo-100/30 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
              <p className="reveal text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-violet-700 mb-3">Why OPERAVA</p>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {t('why.title', 'Engineered for Performance & Scalability')}
              </h2>
            </div>

            <div className="reveal relative mx-auto w-full max-w-[560px] sm:max-w-[640px] aspect-square select-none">
              <div className="absolute inset-[12%] rounded-full border border-violet-200/80 pointer-events-none" />
              <div className="absolute inset-[12%] rounded-full border border-dashed border-violet-100 pointer-events-none animate-[spin_48s_linear_infinite] opacity-60" />

              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-[58%] sm:w-[52%] max-w-[300px] aspect-square rounded-full bg-white border border-violet-200 shadow-[0_20px_60px_-20px_rgba(109,40,217,0.35)] flex flex-col items-center justify-center text-center px-6 sm:px-8 transition-all duration-500">
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-violet-600 mb-2">
                    {String(whySlide + 1).padStart(2, '0')} / 06
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-2">
                    {whyFeaturesList[whySlide].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-[240px]">{whyFeaturesList[whySlide].desc}</p>
                </div>
              </div>

              {whyFeaturesList.map((f, i) => {
                const n = whyFeaturesList.length
                const rel = ((i - whySlide) % n + n) % n
                const angleDeg = -90 + rel * (360 / n)
                const rad = (angleDeg * Math.PI) / 180
                const r = 38
                const x = 50 + r * Math.cos(rad)
                const y = 50 + r * Math.sin(rad)
                const isActive = i === whySlide
                const isNear = rel === 1 || rel === n - 1
                return (
                  <button
                    key={f.title}
                    type="button"
                    aria-label={f.title}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setWhySlide(i)}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-center transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                      isActive
                        ? 'w-16 h-16 sm:w-20 sm:h-20 bg-violet-700 text-white shadow-lg shadow-violet-700/40 scale-110 border-2 border-violet-500'
                        : isNear
                          ? 'w-14 h-14 sm:w-16 sm:h-16 bg-violet-50 text-violet-800 border border-violet-200 hover:bg-violet-100 hover:scale-105'
                          : 'w-12 h-12 sm:w-14 sm:h-14 bg-white text-gray-700 border border-gray-200 hover:border-violet-300 hover:text-violet-700 hover:scale-105'
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      zIndex: isActive ? 30 : 10 + (n - Math.min(rel, n - rel)),
                    }}
                  >
                    <span className={`font-bold leading-tight px-1 ${isActive ? 'text-[10px] sm:text-xs' : 'text-[9px] sm:text-[10px]'}`}>
                      {f.title.split(' ')[0]}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 sm:gap-6">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => setWhySlide((s) => (s - 1 + whyFeaturesList.length) % whyFeaturesList.length)}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-400 flex items-center justify-center transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {whyFeaturesList.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to ${i + 1}`}
                    onClick={() => setWhySlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === whySlide ? 'w-8 bg-violet-600' : 'w-2 bg-violet-200 hover:bg-violet-400'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setWhySlide((s) => (s + 1) % whyFeaturesList.length)}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-violet-700 text-white hover:bg-violet-800 flex items-center justify-center transition-all shadow-md shadow-violet-700/25"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        <ToolsEcosystemMarquee />

        <section ref={signatureRef} className="pt-0 pb-6 sm:pb-8 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-start items-center relative z-10">
            <div className="reveal flex justify-start items-center bg-transparent max-w-sm sm:max-w-md">
              <img
                src="https://res.cloudinary.com/sdaxzncs/image/upload/operava-signature.jpg"
                alt="OPERAVA Signature"
                className="w-full h-auto max-h-[160px] sm:max-h-[200px] object-contain object-left pointer-events-none select-none block mix-blend-multiply transition-transform duration-500 hover:scale-[1.01]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
