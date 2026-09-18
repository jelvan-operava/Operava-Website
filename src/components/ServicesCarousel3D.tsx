import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Cog, Monitor, Users, UserPlus } from 'lucide-react'

export type CarouselServiceId = 'automation' | 'it' | 'workforce' | 'talent'
type ServiceId = CarouselServiceId

interface ServiceCard {
  id: ServiceId
  number: string
  title: string
  description: string
  capabilities: string[]
  href: string
  Icon: typeof Cog
}

const SERVICES: ServiceCard[] = [
  {
    id: 'automation',
    number: '01',
    title: 'Automation',
    description:
      'Business automation that reduces repetitive work, connects systems, and keeps operations moving with less manual intervention.',
    capabilities: [
      'Workflow Automation',
      'Business Process Automation',
      'AI Automation',
      'Customer Service Automation',
      'Email Automation',
      'Lead & Sales Automation',
      'Data & Reporting Automation',
      'Document Automation',
      'HR & Workforce Automation',
      'Finance & Invoicing Automation',
      'System & Application Integration',
      'Notification & Alert Automation',
      'Scheduling & Recurring Operations',
      'Custom Automation Solutions',
    ],
    href: '/services/it',
    Icon: Cog,
  },
  {
    id: 'it',
    number: '02',
    title: 'Information Technology',
    description:
      'Modern digital systems, software and infrastructure designed to support reliable operations, connected workflows and long-term business growth.',
    capabilities: [
      'Website Development',
      'Web Applications',
      'Software Development',
      'UI / UX Design',
      'Cloud Solutions',
      'Cloud Infrastructure',
      'Database Architecture',
      'API Development',
      'System Integration',
      'IT Support',
      'Technical Support',
      'Domain & DNS Management',
      'Business Email Systems',
      'Internal Business Tools',
      'Digital Infrastructure',
      'Website Maintenance & Optimization',
      'Technology Consulting',
    ],
    href: '/services/it',
    Icon: Monitor,
  },
  {
    id: 'workforce',
    number: '03',
    title: 'Workforce Solutions',
    description:
      'Flexible workforce and business process solutions that extend operational capacity across customer service, administration, back-office processes and business operations.',
    capabilities: [
      'Business Process Outsourcing',
      'Customer Support',
      'Technical Support',
      'Back-Office Operations',
      'Data Entry & Processing',
      'Administrative Support',
      'Virtual Assistance',
      'Finance & Invoicing Support',
      'HR Operations',
      'Recruitment Operations',
      'Quality Assurance',
      'Content Moderation',
      'Sales Support',
      'Lead Generation',
      'Appointment Setting',
      'Workforce Management',
      'Operations Support',
    ],
    href: '/services/bpo',
    Icon: Users,
  },
  {
    id: 'talent',
    number: '04',
    title: 'Talent Solutions',
    description:
      'Global talent solutions connecting businesses with skilled professionals through sourcing, screening, matching, onboarding and workforce administration.',
    capabilities: [
      'Global Talent Sourcing',
      'Recruitment & Hiring Support',
      'Talent Matching',
      'Filipino Talent',
      'Technical Talent',
      'Customer Service Talent',
      'Administrative Talent',
      'Sales & Business Development Talent',
      'Creative & Digital Talent',
      'IT & Software Talent',
      'AI & Automation Talent',
      'HR & Operations Talent',
      'Talent Screening',
      'Interview Coordination',
      'Onboarding Support',
      'Talent Documentation',
      'Workforce Administration',
    ],
    href: '/careers',
    Icon: UserPlus,
  },
]

const N = SERVICES.length
const AUTOPLAY_MS = 7000
const RESUME_MS = 9000
const TRANSITION =
  'transform 780ms cubic-bezier(0.22, 1, 0.36, 1), opacity 780ms cubic-bezier(0.22, 1, 0.36, 1)'

function cardTransform(offset: number, mobile: boolean) {
  const a = Math.abs(offset)
  if (a === 0) {
    return {
      transform: 'translateX(-50%) translateZ(80px) rotateY(0deg) scale(1)',
      opacity: 1,
      zIndex: 40,
      filter: 'none',
    }
  }
  const sign = offset > 0 ? 1 : -1
  if (mobile) {
    const x = sign * (a === 1 ? 58 : 92)
    const rot = sign * (a === 1 ? -16 : -28)
    const scale = a === 1 ? 0.86 : 0.72
    const z = a === 1 ? 10 : -60
    const opacity = a === 1 ? 0.72 : 0.4
    return {
      transform: `translateX(calc(-50% + ${x}%)) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
      opacity,
      zIndex: 30 - a * 5,
      filter: a >= 2 ? 'brightness(0.96)' : 'none',
    }
  }
  const x = sign * (a === 1 ? 42 : 72)
  const rot = sign * (a === 1 ? -18 : -32)
  const scale = a === 1 ? 0.9 : 0.78
  const z = a === 1 ? 20 : -80
  const opacity = a === 1 ? 0.78 : 0.55
  return {
    transform: `translateX(calc(-50% + ${x}%)) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
    opacity,
    zIndex: 30 - a * 5,
    filter: a >= 2 ? 'brightness(0.95)' : 'none',
  }
}

interface ServicesCarousel3DProps {
  onActiveChange?: (id: CarouselServiceId) => void
}

export default function ServicesCarousel3D({ onActiveChange }: ServicesCarousel3DProps = {}) {
  const [active, setActive] = useState(0)
  const [contentKey, setContentKey] = useState(0)
  const [mobile, setMobile] = useState(false)
  const [paused, setPaused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const reduceMotion = useRef(false)
  const dragStartX = useRef(0)
  const dragDelta = useRef(0)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const activeService = SERVICES[active]

  useEffect(() => {
    onActiveChange?.(activeService.id)
  }, [active, activeService.id, onActiveChange])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMobile(mq.matches)
    reduceMotion.current = rm.matches
    apply()
    mq.addEventListener('change', apply)
    const onRm = () => {
      reduceMotion.current = rm.matches
    }
    rm.addEventListener('change', onRm)
    return () => {
      mq.removeEventListener('change', apply)
      rm.removeEventListener('change', onRm)
    }
  }, [])

  const goTo = useCallback((index: number) => {
    const next = ((index % N) + N) % N
    setActive(next)
    setContentKey((k) => k + 1)
  }, [])

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  const pauseAutoplay = useCallback(() => {
    setPaused(true)
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
    if (resumeRef.current) clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(() => setPaused(false), RESUME_MS)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion.current) return
    autoplayRef.current = setInterval(() => {
      setActive((a) => {
        const n = (a + 1) % N
        setContentKey((k) => k + 1)
        return n
      })
    }, AUTOPLAY_MS)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [paused, active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return
      const focused = sectionRef.current.contains(document.activeElement)
      if (!focused && document.activeElement !== document.body) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        pauseAutoplay()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        pauseAutoplay()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, pauseAutoplay])

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    dragStartX.current = e.clientX
    dragDelta.current = 0
    pauseAutoplay()
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    dragDelta.current = e.clientX - dragStartX.current
  }

  const onPointerUp = () => {
    if (!dragging) return
    setDragging(false)
    const d = dragDelta.current
    if (Math.abs(d) > 48) {
      if (d < 0) next()
      else prev()
    }
    dragDelta.current = 0
  }

  const visibleOffsets = useMemo(() => {
    return [-2, -1, 0, 1, 2].map((off) => {
      const idx = (((active + off) % N) + N) % N
      return { idx, offset: off, service: SERVICES[idx] }
    })
  }, [active])

  const halfCaps = Math.ceil(activeService.capabilities.length / 2)
  const leftCaps = activeService.capabilities.slice(0, halfCaps)
  const rightCaps = activeService.capabilities.slice(halfCaps)

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="OPERAVA Services"
      className="relative w-full bg-white overflow-hidden pt-14 pb-4 sm:pt-16 sm:pb-6 lg:pt-20 lg:pb-8"
      onMouseEnter={pauseAutoplay}
    >
      <div className="w-full max-w-[90rem] mx-auto px-5 sm:px-8 text-center mb-8 sm:mb-10 lg:mb-12">
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-gray-400 mb-4">
          OPERAVA / SERVICES
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-[1.15] max-w-3xl mx-auto">
          Technology, people and operations —{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)',
            }}
          >
            connected.
          </span>
        </h2>
        <p className="mt-5 text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
          From intelligent automation and digital infrastructure to workforce operations and global
          talent, OPERAVA connects technology, people and processes to help businesses operate, scale
          and move forward.
        </p>
      </div>

      <div
        className="relative w-full select-none"
        style={{ perspective: mobile ? '900px' : '1400px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="region"
        aria-roledescription="carousel"
        aria-label="Service categories"
      >
        <div
          className="relative mx-auto"
          style={{
            height: mobile ? 420 : 480,
            maxWidth: '100%',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30"
            style={{
              width: mobile ? 220 : 360,
              height: mobile ? 220 : 360,
              background:
                'radial-gradient(circle, rgba(196,77,255,0.25) 0%, rgba(59,107,255,0.12) 45%, transparent 70%)',
            }}
          />

          {visibleOffsets.map(({ idx, offset, service }) => {
            const style = cardTransform(offset, mobile)
            const isActive = offset === 0
            const Icon = service.Icon
            return (
              <button
                key={`${service.id}-${idx}`}
                type="button"
                onClick={() => {
                  if (Math.abs(dragDelta.current) > 8) return
                  pauseAutoplay()
                  goTo(idx)
                }}
                aria-label={`${service.number} ${service.title}`}
                aria-current={isActive ? 'true' : undefined}
                className="absolute left-1/2 top-0 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-2xl"
                style={{
                  width: mobile ? 'min(78vw, 300px)' : 'min(34vw, 380px)',
                  height: mobile ? 360 : 420,
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  filter: style.filter,
                  transition: reduceMotion.current ? 'opacity 400ms ease' : TRANSITION,
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  cursor: isActive ? 'default' : 'pointer',
                }}
              >
                <div
                  className="h-full w-full rounded-2xl bg-white border border-[#E8E8EC] flex flex-col text-left overflow-hidden"
                  style={{
                    boxShadow: isActive
                      ? '0 28px 60px rgba(15,15,30,0.10), 0 0 0 1px rgba(255,255,255,0.8)'
                      : '0 12px 28px rgba(15,15,30,0.06)',
                    backgroundImage: isActive
                      ? 'linear-gradient(180deg, #ffffff 0%, #faf9ff 100%)'
                      : undefined,
                  }}
                >
                  <div
                    className="h-[2px] w-full shrink-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)'
                        : 'transparent',
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  <div className="p-5 sm:p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold tracking-wider"
                        style={{
                          backgroundImage: isActive
                            ? 'linear-gradient(90deg, #FF8B4A, #C44DFF, #3B6BFF)'
                            : undefined,
                          WebkitBackgroundClip: isActive ? 'text' : undefined,
                          backgroundClip: isActive ? 'text' : undefined,
                          color: isActive ? 'transparent' : '#9CA3AF',
                        }}
                      >
                        {service.number}
                      </span>
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(255,139,74,0.12), rgba(196,77,255,0.12), rgba(59,107,255,0.12))'
                            : '#F3F4F6',
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: isActive ? '#6D28D9' : '#6B7280' }}
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {isActive && (
                      <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 overflow-hidden">
                        {service.capabilities.slice(0, mobile ? 6 : 10).map((cap) => (
                          <div
                            key={cap}
                            className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-600"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                              style={{
                                background: 'linear-gradient(90deg, #FF8B4A, #C44DFF, #3B6BFF)',
                              }}
                            />
                            <span className="leading-snug">{cap}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {isActive && (
                      <Link
                        to={service.href}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
                      >
                        View services
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {!isActive && (
                      <span className="mt-auto text-xs text-gray-400 font-medium">View services →</span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full max-w-[48rem] mx-auto px-5 sm:px-8 mt-6 sm:mt-8 lg:mt-8 text-center">
        <div
          key={contentKey}
          className="animate-[fadeUpContent_0.7s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 mb-2">
            {activeService.number} / 0{N}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {activeService.title}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
            {activeService.description}
          </p>
          <div className="mt-6 hidden sm:grid sm:grid-cols-2 gap-x-8 gap-y-2 text-left max-w-2xl mx-auto">
            {[leftCaps, rightCaps].map((col, ci) => (
              <ul key={ci} className="space-y-1.5">
                {col.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-sm text-gray-600">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{
                        background: 'linear-gradient(90deg, #FF8B4A, #C44DFF, #3B6BFF)',
                      }}
                    />
                    {cap}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <nav
        className="mt-6 sm:mt-8 lg:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4"
        aria-label="Service navigation"
      >
        {SERVICES.map((s, i) => {
          const isOn = i === active
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                pauseAutoplay()
                goTo(i)
              }}
              className="group flex flex-col items-center gap-1.5 min-w-[72px] sm:min-w-[100px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg px-1 py-1"
              aria-current={isOn ? 'true' : undefined}
              aria-label={`${s.number} ${s.title}`}
            >
              <span
                className="text-[10px] sm:text-xs font-semibold tracking-wide transition-colors"
                style={{ color: isOn ? '#111827' : '#9CA3AF' }}
              >
                <span className="mr-1 opacity-70">{s.number}</span>
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{s.title.split(' ')[0]}</span>
              </span>
              <span
                className="h-[2px] w-full max-w-[64px] sm:max-w-[88px] rounded-full transition-all duration-500"
                style={{
                  background: isOn
                    ? 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)'
                    : '#E5E7EB',
                  opacity: isOn ? 1 : 0.7,
                }}
              />
            </button>
          )
        })}
      </nav>

      <style>{`
        @keyframes fadeUpContent {
          from { opacity: 0; transform: translateY(12px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeUpContent {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }
      `}</style>
    </section>
  )
}
