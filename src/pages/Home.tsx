import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Shield, Activity, Users, Globe, Cpu, Zap, BarChart3, Sparkles } from 'lucide-react'
import { itServices, bpoServices } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedService } from '../i18n/translations/services'
import ServiceCard from '../components/ServiceCard'
import DraggableMarquee from '../components/DraggableMarquee'
import TypewriterHero from '../components/TypewriterHero'
import HomeMediaLoader from '../components/HomeMediaLoader'
import ToolsEcosystemMarquee from '../components/ToolsEcosystemMarquee'

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
        {/* ── HERO SECTION WITH COVER PHOTO BACKGROUND ── */}
        <section className="relative w-full pt-16 sm:pt-20 lg:pt-0 min-h-0 lg:min-h-screen flex flex-col justify-end overflow-hidden bg-white lg:bg-gray-950">
          {/* Cover Photo Background - 100% Clear & Fully Visible (Zero Blur, Uncropped Full Landscape on Mobile) */}
          <div className="relative w-full lg:absolute lg:inset-0 lg:w-full lg:h-full overflow-hidden pointer-events-none z-0">
            <img
              src="https://res.cloudinary.com/sdaxzncs/image/upload/v1786240859/Cover%20Photo.png"
              alt="OPERAVA Global Solutions Cover"
              className="w-full h-auto block object-contain object-center lg:w-full lg:h-full lg:object-cover lg:object-center"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>

          {/* Hero Bottom Content (Single Line, Placed below the line at the bottom) */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-0 lg:pb-10">
            <TypewriterHero
              fullText="We Operate in Advance. Your Partner in Data, Tech, and End-to-End Outsource Staffing."
            />
          </div>
        </section>

        {/* ── THREE PILLARS / POSITIONING (ALTERNATING LAYOUT) ── */}
        <section ref={trustRef} id="capabilities" className="py-20 lg:py-28 bg-white border-t border-gray-100 scroll-mt-20 relative overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100/25 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-16 lg:mb-20">
              <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200/70 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                <span>{t('section.services.badge', 'Capabilities')}</span>
              </div>
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
                  reverse: false, // Left: Text, Right: Visual
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
                  reverse: true, // Left: Visual, Right: Text
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
                  reverse: false, // Left: Text, Right: Visual
                  floatClass: 'animate-float-gentle',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} flex flex-col ${
                    item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-10 lg:gap-16 xl:gap-20`}
                >
                  {/* Text Content Column */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-violet-100 text-violet-700 text-xs font-bold tracking-wider uppercase">
                        {item.number}
                      </span>
                      <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                      {item.title}
                    </h3>

                    <p className="text-base text-gray-600 leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>

                    {/* Bullet points */}
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

                  {/* Visual Media Column with Refined Gentle Levitation */}
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

        {/* ── IT SERVICES ── */}
        <section ref={itRef} className="py-20 lg:py-28 bg-gray-50/70 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100/80 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                  <span>{t('nav.services.it', 'Information Technology')}</span>
                </div>
                <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  {t('section.it.title', 'Technology and operations, connected.')}
                </h2>
                <p className="reveal reveal-delay-2 text-base text-gray-500 mt-4 leading-relaxed">
                  {t(
                    'section.it.desc',
                    'Technology solutions that help organizations build digital products, modernize infrastructure, connect systems and operate securely at scale.'
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

        {/* ── BPO SERVICES ── */}
        <section ref={bpoRef} className="py-20 lg:py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-3 border border-violet-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                  <span>{t('nav.services.bpo', 'Business Process Outsourcing')}</span>
                </div>
                <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  {t('section.bpo.title', 'Extend your capabilities. Scale your operations.')}
                </h2>
                <p className="reveal reveal-delay-2 text-base text-gray-500 mt-4 leading-relaxed">
                  {t(
                    'section.bpo.desc',
                    'Flexible business process services that help organizations extend their capabilities, improve efficiency and scale operations without unnecessary overhead.'
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

        {/* ── DRAGGABLE INFINITE PERFORMANCE MARQUEE ── */}
        <DraggableMarquee />

        {/* ── OPERATING MODEL ── */}
        <section ref={modelRef} className="py-20 lg:py-28 bg-gray-950 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-14">
              <div className="reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/80 border border-violet-800/60 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping inline-block" />
                <span>{t('model.badge', 'Our Framework')}</span>
              </div>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                {t('model.title', 'The OPERAVA Operating Model')}
              </h2>
              <p className="reveal reveal-delay-2 text-sm text-gray-400 mt-2">
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

        {/* ── INDUSTRIES ── */}
        <section ref={industriesRef} className="py-20 lg:py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-3 border border-violet-100">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                <span>{t('industries.badge', 'Sectors We Serve')}</span>
              </div>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {t('industries.title', 'Specialized Solutions Across Global Industries')}
              </h2>
              <p className="reveal reveal-delay-2 text-base text-gray-500 mt-3">
                {t('industries.subtitle', 'Tailored digital solutions and dedicated operational teams designed for specific industry compliance and workflows.')}
              </p>
            </div>
            <div className="reveal reveal-delay-2 flex flex-wrap gap-2.5 sm:gap-3">
              {industries.map((industry, idx) => (
                <Link
                  key={industry}
                  to="/industries"
                  style={{ animationDelay: `${(idx % 6) * 0.1}s` }}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:border-violet-400 hover:bg-violet-50/80 hover:text-violet-700 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 transition-all duration-200"
                >
                  {industry}
                </Link>
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

        {/* ── GLOBAL WORKFORCE HIGHLIGHT ── */}
        <section ref={workforceRef} className="py-20 lg:py-28 bg-violet-700 text-white overflow-hidden relative">
          {/* Ambient Background Grid and Pulsing Radial Glow */}
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
              <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-200 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-200 animate-pulse" />
                Global Workforce
              </p>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Extend your team without extending your complexity.
              </h2>
              <p className="reveal reveal-delay-2 text-base sm:text-lg text-violet-100 leading-relaxed mb-8">
                OPERAVA provides access to skilled professionals who can support technology, customer operations, administration and specialized business processes remotely.
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
            {/* Global Workforce Icon with Continuous Levitation */}
            <div className="flex items-center justify-center w-full">
              <div className="w-full max-w-sm sm:max-w-md aspect-square relative flex items-center justify-center select-none overflow-hidden group animate-orb-levitate">
                <img
                  src="https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_1000/white_theme_transparent_8K_wj9kr4.webp"
                  alt="OPERAVA Global Workforce"
                  className="w-full h-full max-w-[340px] sm:max-w-[400px] max-h-[340px] sm:max-h-[400px] object-contain pointer-events-none select-none transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (!target.src.includes('white_theme_transparent_8K_wj9kr4.webp')) {
                      target.src = 'https://res.cloudinary.com/sdaxzncs/image/upload/white_theme_transparent_8K_wj9kr4.webp'
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY STACKS ── */}
        <section ref={techRef} className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-3 border border-violet-100">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
                <span>Technology</span>
              </div>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
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

        {/* ── WHY OPERAVA ── */}
        <section ref={whyRef} className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
                </span>
                {t('why.badge', 'Why OPERAVA')}
              </p>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {t('why.title', 'Engineered for Performance & Scalability')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {whyFeaturesList.map((f, i) => (
                <div
                  key={f.title}
                  className={`reveal reveal-delay-${Math.min(i + 1, 5)} group relative bg-transparent w-full flex items-center justify-center transition-all duration-500 hover:scale-[1.02] select-none`}
                >
                  <div className="w-full relative flex items-center justify-center overflow-hidden bg-transparent">
                    <img
                      src={f.imageSrc}
                      alt={`${f.title}: ${f.desc}`}
                      width={2640}
                      height={1485}
                      className="w-full h-auto object-contain pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-[1.02] block"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 30+ TOOLS & PLATFORMS ECOSYSTEM (MULTI-DIRECTIONAL MARQUEE) ── */}
        <ToolsEcosystemMarquee />

        {/* ── OPERAVA SIGNATURE SECTION (LEFT-ALIGNED & COMPACT) ── */}
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
