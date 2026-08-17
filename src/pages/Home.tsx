import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Shield, Activity, Users, Globe, Cpu, Zap, BarChart3, Sparkles } from 'lucide-react'
import { itServices, bpoServices } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedService } from '../i18n/translations/services'
import ServiceCard from '../components/ServiceCard'
import DraggableMarquee from '../components/DraggableMarquee'
import StackedPlaybooks from '../components/StackedPlaybooks'
import VideoBackground from '../components/VideoBackground'
import TypewriterHero from '../components/TypewriterHero'
import TestimonialsCarousel from '../components/TestimonialsCarousel'
import PurpleRunningBorderBeam from '../components/PurpleRunningBorderBeam'
import HomeMediaLoader from '../components/HomeMediaLoader'

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
  const securityRef = useIntersection()
  const aboutRef = useIntersection()
  const careersRef = useIntersection()
  const contactRef = useIntersection()

  const [activeStep, setActiveStep] = useState(0)
  const [isHomeReady, setIsHomeReady] = useState(false)

  const operatingModelSteps = [
    { step: '01', label: t('model.step1.label', 'Discover'), desc: t('model.step1.desc', 'Analyze business workflows, pain points, and strategic scaling objectives.') },
    { step: '02', label: t('model.step2.label', 'Design'), desc: t('model.step2.desc', 'Architect customized software, workforce configurations, and SLA frameworks.') },
    { step: '03', label: t('model.step3.label', 'Build'), desc: t('model.step3.desc', 'Deploy cloud infrastructure, integrate APIs, and train dedicated teams.') },
    { step: '04', label: t('model.step4.label', 'Launch'), desc: t('model.step4.desc', 'Seamless transition with zero downtime and strict governance.') },
    { step: '05', label: t('model.step5.label', 'Operate'), desc: t('model.step5.desc', '24/7 continuous management, quality assurance, and real-time monitoring.') },
    { step: '06', label: t('model.step6.label', 'Optimize'), desc: t('model.step6.desc', 'Ongoing enhancements driven by automated analytics and continuous feedback loops.') },
  ]

  const whyFeaturesList = [
    { title: t('why.feat1.title', 'Technology-led'), desc: t('why.feat1.desc', 'Modern architecture built strictly around measurable business outcomes.') },
    { title: t('why.feat2.title', 'People-powered'), desc: t('why.feat2.desc', 'Highly skilled, certified professionals supporting your critical operations.') },
    { title: t('why.feat3.title', 'Elastic & Scalable'), desc: t('why.feat3.desc', 'Flexible staffing and infrastructure that dynamically adjust with demand.') },
    { title: t('why.feat4.title', 'Process-driven'), desc: t('why.feat4.desc', 'ISO-aligned workflows designed for consistent precision and security.') },
    { title: t('why.feat5.title', 'Global-ready'), desc: t('why.feat5.desc', 'Robust remote infrastructure designed for global enterprises.') },
    { title: t('why.feat6.title', 'Client-focused'), desc: t('why.feat6.desc', 'Transparent partnership model with dedicated account managers and clear KPIs.') },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % 6)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

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

      {/* ── THREE PILLARS / POSITIONING ── */}
      <section ref={trustRef} id="capabilities" className="py-20 lg:py-28 bg-white border-t border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              {t('section.services.badge', 'Capabilities')}
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Built for the way modern businesses operate.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Technology & Software',
                desc: 'Digital platforms, custom cloud applications, API networks and IT infrastructure.',
                icon: <Cpu className="w-6 h-6" />,
                videoSrc: 'https://res.cloudinary.com/mgyosgsm/video/upload/Video_otwv5l.mp4',
                coverPhoto: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
                link: '/services/it',
                tag: 'Cloud & Tech',
                beamDuration: 4.2,
                beamDelay: 0,
              },
              {
                title: 'Global Workforce',
                desc: 'Skilled remote professionals and managed teams supporting 24/7 global operations.',
                icon: <Users className="w-6 h-6" />,
                videoSrc: 'https://res.cloudinary.com/mgyosgsm/video/upload/Video_nmdtfe.mp4',
                coverPhoto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
                link: '/careers',
                tag: 'Talent & Teams',
                beamDuration: 5.2,
                beamDelay: -1.8,
              },
              {
                title: 'Business Processes',
                desc: 'Reliable outsourced operations designed for measurable accuracy, speed and scale.',
                icon: <Activity className="w-6 h-6" />,
                videoSrc: 'https://res.cloudinary.com/mgyosgsm/video/upload/Video_pmorrn.mp4',
                coverPhoto: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                link: '/services/bpo',
                tag: 'Operations & BPO',
                beamDuration: 4.6,
                beamDelay: -3.4,
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-delay-${i + 2} relative overflow-hidden rounded-3xl min-h-[380px] p-8 sm:p-9 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-500 shadow-xl border border-white/20 hover:border-white/50 hover:shadow-2xl bg-gray-950`}
              >
                {/* Running Purple Glowing Light Beam along the Box Perimeter - Staggered Timings */}
                <PurpleRunningBorderBeam
                  duration={item.beamDuration}
                  delay={item.beamDelay}
                  rx={24}
                />

                {/* Background Cover Video or Photo - Ultra Clear & Transparent */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-gray-950">
                  {item.videoSrc ? (
                    <video
                      ref={(el) => {
                        if (el) {
                          el.muted = true
                          el.defaultMuted = true
                          el.play().catch(() => {})
                        }
                      }}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      disablePictureInPicture
                      controls={false}
                      className="w-full h-full min-w-full min-h-full object-cover object-center absolute inset-0 pointer-events-none select-none"
                      poster={item.coverPhoto}
                      onLoadedMetadata={(e) => {
                        e.currentTarget.muted = true
                        e.currentTarget.play().catch(() => {})
                      }}
                      onCanPlay={(e) => {
                        e.currentTarget.play().catch(() => {})
                      }}
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                    </video>
                  ) : item.coverPhoto ? (
                    <img
                      src={item.coverPhoto}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : null}
                  {/* Clear Glass Transparent Sheen Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20 pointer-events-none" />
                </div>

                {/* Top Badge & Icon - Clear Glass Aesthetic */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-sm group-hover:bg-violet-600/90 group-hover:border-violet-300 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold tracking-wide shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Content with Same Color Text & Crisp Shadow for High Contrast */}
                <div className="relative z-10 pt-12">
                  <h3 className="text-2xl font-black text-white mb-2.5 tracking-tight group-hover:text-violet-200 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    {item.title}
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-6 font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                    {item.desc}
                  </p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-violet-300 transition-colors group/link drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
                  >
                    <span>{t('common.learnMore', 'Learn more')}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IT SERVICES ── */}
      <section ref={itRef} className="py-20 lg:py-28 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
                {t('nav.services.it', 'Information Technology')}
              </p>
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
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-violet-700 bg-white border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors shadow-2xs"
              >
                <span>View all IT services</span>
                <ArrowRight className="w-4 h-4" />
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
      <section ref={bpoRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
                {t('nav.services.bpo', 'Business Process Outsourcing')}
              </p>
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
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-violet-700 bg-white border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors shadow-2xs"
              >
                <span>View all BPO services</span>
                <ArrowRight className="w-4 h-4" />
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

      {/* ── STACKED OPERATIONAL PLAYBOOKS ── */}
      <StackedPlaybooks />

      {/* ── OPERATING MODEL ── */}
      <section ref={modelRef} className="py-20 lg:py-28 bg-gray-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-400 mb-3">
              {t('model.badge', 'Our Framework')}
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
              {t('model.title', 'The OPERAVA Operating Model')}
            </h2>
            <p className="reveal reveal-delay-2 text-sm text-gray-400 mt-2">
              {t('model.subtitle', 'A structured, agile methodology designed for seamless transition and rapid scaling.')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operatingModelSteps.map((step, i) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(i)}
                type="button"
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeStep === i
                    ? 'border-violet-500 bg-violet-900/30 shadow-lg shadow-violet-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-mono font-bold ${activeStep === i ? 'text-violet-400' : 'text-gray-500'}`}>
                    {step.step}
                  </span>
                  <div
                    className={`h-px flex-1 transition-colors duration-300 ${activeStep === i ? 'bg-violet-500' : 'bg-white/10'}`}
                  />
                </div>
                <h3
                  className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    activeStep === i ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  {step.label}
                </h3>
                <p
                  className={`text-sm leading-relaxed transition-colors duration-300 ${
                    activeStep === i ? 'text-gray-200' : 'text-gray-400'
                  }`}
                >
                  {step.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section ref={industriesRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              {t('industries.badge', 'Sectors We Serve')}
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              {t('industries.title', 'Specialized Solutions Across Global Industries')}
            </h2>
            <p className="reveal reveal-delay-2 text-base text-gray-500 mt-3">
              {t('industries.subtitle', 'Tailored digital solutions and dedicated operational teams designed for specific industry compliance and workflows.')}
            </p>
          </div>
          <div className="reveal reveal-delay-2 flex flex-wrap gap-2.5 sm:gap-3">
            {industries.map((industry) => (
              <Link
                key={industry}
                to="/industries"
                className="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200"
              >
                {industry}
              </Link>
            ))}
          </div>
          <div className="reveal reveal-delay-3 mt-8">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:gap-3 transition-all duration-200"
            >
              <span>Explore all industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── GLOBAL WORKFORCE HIGHLIGHT ── */}
      <section ref={workforceRef} className="py-20 lg:py-28 bg-violet-700 text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 1px, transparent 1.2px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-200 mb-4">
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
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-violet-900 bg-white rounded-xl hover:bg-violet-50 active:scale-95 transition-all duration-200 shadow-md"
              >
                <span>Build Your Team</span>
                <ArrowRight className="w-4 h-4 text-violet-700" />
              </Link>
            </div>
          </div>
          {/* Globe visualization */}
          <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-sm sm:max-w-md aspect-square relative flex items-center justify-center select-none overflow-hidden">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=mgyosgsm&public_id=Copy_of_Untitled_f9yslx&profile=cld-looping"
                width="100%"
                height="100%"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                tabIndex={-1}
                aria-hidden="true"
                className="w-full h-full border-0 bg-transparent pointer-events-none select-none"
                style={{ border: 'none', background: 'transparent', pointerEvents: 'none' }}
                title="Global Workforce Globe"
              />
              {/* Invisible touch & pointer barrier to ensure no click or hover triggers controls */}
              <div className="absolute inset-0 z-10 bg-transparent cursor-default select-none" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY STACKS ── */}
      <section ref={techRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              Technology
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Technology that moves your business forward.
            </h2>
          </div>
          <div className="reveal reveal-delay-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {techCategories.map((cat) => (
              <div
                key={cat}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-violet-200 hover:bg-violet-50 transition-all duration-200 group text-center min-h-[90px]"
              >
                <span className="text-xs font-semibold text-gray-700 group-hover:text-violet-700 transition-colors leading-snug">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY & GOVERNANCE ── */}
      <section ref={securityRef} className="py-20 lg:py-28 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              Security & Trust
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Designed with enterprise security and strict compliance in mind.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Secure Development', desc: 'DevSecOps practices and continuous vulnerability scanning built into CI/CD pipelines.' },
              { title: 'Access Governance', desc: 'Granular Role-Based Access Controls (RBAC) with multi-factor authentication enforcement.' },
              { title: 'Data Encryption', desc: 'AES-256 encryption at rest and TLS 1.3 encryption in transit for all client data.' },
              { title: 'Privacy-Conscious', desc: 'Strict adherence to GDPR, CCPA, and global privacy standards by design.' },
              { title: 'Operational Audits', desc: 'Continuous operational controls for service delivery consistency and compliance.' },
              { title: 'Security Monitoring', desc: '24/7 SIEM monitoring of infrastructure and endpoints for anomaly detection.' },
              { title: 'Disaster Recovery', desc: 'Automated failovers, geographic redundancy, and rapid incident escalation runbooks.' },
              { title: 'Ethical Operations', desc: 'Transparent SLAs, clear accountability, and ethical global business practices.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} p-6 bg-white border border-gray-100 rounded-2xl hover:border-violet-200 transition-all duration-200 shadow-2xs`}
              >
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-700 mb-4">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OPERAVA ── */}
      <section ref={whyRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-3">
              {t('why.badge', 'Why OPERAVA')}
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              {t('why.title', 'Engineered for Performance & Scalability')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFeaturesList.map((f, i) => (
              <div
                key={f.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} flex gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-violet-100 transition-colors`}
              >
                <div className="w-1 shrink-0 rounded-full bg-violet-700 self-stretch" />
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS CAROUSEL ── */}
      <TestimonialsCarousel />

      {/* ── CONTACT CTA WITH AMBIENT VIDEO BACKGROUND ── */}
      <section ref={contactRef} className="relative py-24 lg:py-32 bg-gray-950 text-white overflow-hidden">
        {/* Ambient Video Background with Fallback */}
        <VideoBackground
          videoUrl="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-data-31912-large.mp4"
          posterUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80"
          overlayOpacity="bg-gray-950/85"
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="reveal text-xs font-semibold tracking-[0.14em] uppercase text-violet-400 mb-4">
            Get Started
          </p>
          <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-6 text-white">
            {t('cta.title', 'Ready to Modernize Your Operations?')}
          </h2>
          <p className="reveal reveal-delay-2 text-base sm:text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t('cta.subtitle', 'Connect with our solutions architects today and discover how OPERAVA can accelerate your digital and operational roadmap.')}
          </p>
          <div className="reveal reveal-delay-3 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-violet-600 rounded-xl hover:bg-violet-500 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-600/30"
            >
              <span>{t('cta.button', 'Get in Touch Today')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services/it"
              className="inline-flex items-center px-8 py-4 text-sm font-semibold text-gray-200 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              {t('nav.exploreServices', 'Explore Services')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  </>
  )
}
