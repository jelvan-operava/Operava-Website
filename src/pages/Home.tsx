import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Shield, Activity, Users, Globe, Cpu, Zap, BarChart3, Sparkles } from 'lucide-react'
import { itServices, bpoServices, type Service } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
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

const ServiceIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, ReactNode> = {
    code: <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    layers: <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    terminal: <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>,
    lightbulb: <><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" /></>,
    'git-merge': <><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" /></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
    server: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>,
    'bar-chart': <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    headphones: <><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></>,
    tool: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>,
    'life-buoy': <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="14.83" y1="9.17" x2="18.36" y2="5.64" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    'file-text': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>,
    'user-check': <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></>,
    'dollar-sign': <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    'user-plus': <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    'book-open': <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
    truck: <><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>,
    inbox: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      {icons[icon] || <circle cx="12" cy="12" r="10" />}
    </svg>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { t } = useLanguage()
  return (
    <div
      className={`reveal reveal-delay-${Math.min((index % 4) + 1, 5)} group bg-white border border-gray-100 rounded-2xl p-6 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 cursor-pointer flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700 group-hover:bg-violet-100 group-hover:scale-110 transition-all duration-300">
            <ServiceIcon icon={service.icon} />
          </div>
          <span className="text-xs font-mono text-gray-300 font-semibold">{service.number}</span>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors duration-200">
          {service.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.shortDescription}</p>
      </div>
      <Link
        to={`/services/${service.category}/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:gap-2.5 transition-all duration-200 pt-2"
      >
        <span>{t('common.exploreService', 'Explore service')}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}

export default function Home() {
  const { t } = useLanguage()

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {itServices.slice(0, 8).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bpoServices.slice(0, 8).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
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
          <div className="reveal reveal-delay-2 flex items-center justify-center">
            <svg viewBox="0 0 400 320" className="w-full max-w-sm opacity-85" fill="none" aria-hidden="true">
              <ellipse cx="200" cy="160" rx="130" ry="130" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <ellipse cx="200" cy="160" rx="80" ry="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <ellipse cx="200" cy="160" rx="130" ry="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <ellipse cx="200" cy="160" rx="130" ry="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              {[
                [120, 100], [280, 90], [90, 180], [310, 160], [160, 220], [240, 200], [200, 130], [175, 175],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="5" fill="rgba(255,255,255,0.95)" />
                  <circle cx={cx} cy={cy} r="5" fill="rgba(255,255,255,0.4)">
                    <animate attributeName="r" values="5;14;5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.4;0;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
              {[
                [120, 100, 280, 90], [90, 180, 160, 220], [310, 160, 240, 200],
                [200, 130, 175, 175], [280, 90, 310, 160], [120, 100, 90, 180],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
            </svg>
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
