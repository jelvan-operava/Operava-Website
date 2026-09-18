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
    href: '/services/automation',
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

/**
 * Stronger depth hierarchy: center card dominates the stage;
 * side cards remain partially visible for continuous carousel feel.
 */
function cardTransform(offset: number, mobile: boolean) {
  const a = Math.abs(offset)
  if (a === 0) {
    return {
      transform: mobile
        ? 'translateX(-50%) translateZ(60px) rotateY(0deg) scale(1)'
        : 'translateX(-50%) translateZ(100px) rotateY(0deg) scale(1)',
      opacity: 1,
      zIndex: 40,
      filter: 'none',
    }
  }
  const sign = offset > 0 ? 1 : -1
  if (mobile) {
    const x = sign * (a === 1 ? 62 : 98)
    const rot = sign * (a === 1 ? -14 : -26)
    const scale = a === 1 ? 0.82 : 0.68
    const z = a === 1 ? 8 : -50
    const opacity = a === 1 ? 0.7 : 0.38
    return {
      transform: `translateX(calc(-50% + ${x}%)) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
      opacity,
      zIndex: 30 - a * 5,
      filter: a >= 2 ? 'brightness(0.96)' : 'none',
    }
  }
  const x = sign * (a === 1 ? 38 : 68)
  const rot = sign * (a === 1 ? -16 : -30)
  const scale = a === 1 ? 0.78 : 0.64
  const z = a === 1 ? 16 : -90
  const opacity = a === 1 ? 0.72 : 0.48
  return {
    transform: `translateX(calc(-50% + ${x}%)) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
    opacity,
    zIndex: 30 - a * 5,
    filter: a >= 2 ? 'brightness(0.94)' : 'none',
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

  const stageHeight = mobile ? 440 : 560
  const cardWidth = mobile ? 'min(86vw, 340px)' : 'min(42vw, 520px)'
  const cardHeight = mobile ? 380 : 500

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="OPERAVA Services"
      className="relative w-full bg-white overflow-hidden pt-10 pb-2 sm:pt-12 sm:pb-4 lg:pt-14 lg:pb-6"
      onMouseEnter={pauseAutoplay}
    >
      <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 text-center mb-6 sm:mb-8 lg:mb-10">
        <h2 className="whitespace-nowrap font-bold tracking-tight text-gray-900 leading-none text-[clamp(1.05rem,3.8vw,2.5rem)] mx-auto">
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
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl mx-auto px-1">
          From intelligent automation and digital infrastructure to workforce operations and global
          talent, OPERAVA connects technology, people and processes to help businesses operate, scale
          and move forward.
        </p>
      </div>

      <div
        className="relative w-full select-none"
        style={{ perspective: mobile ? '1000px' : '1600px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="region"
        aria-roledescription="carousel"
        aria-label="Service categories"
      >
        <div
          className="relative w-full mx-auto"
          style={{
            height: stageHeight,
            maxWidth: '100%',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-35"
            style={{
              width: mobile ? 280 : 520,
              height: mobile ? 280 : 520,
              background:
                'radial-gradient(circle, rgba(255,139,74,0.18) 0%, rgba(255,77,184,0.22) 25%, rgba(196,77,255,0.28) 45%, rgba(59,107,255,0.14) 65%, transparent 78%)',
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-20 lg:w-28 z-20 bg-gradient-to-r from-white via-white/80 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-20 lg:w-28 z-20 bg-gradient-to-l from-white via-white/80 to-transparent"
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
                  width: cardWidth,
                  height: cardHeight,
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
                  className="h-full w-full rounded-2xl flex flex-col text-left overflow-hidden relative"
                  style={{
                    border: isActive
                      ? '1.5px solid transparent'
                      : '1px solid #E8E8EC',
                    background: isActive
                      ? 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF) border-box'
                      : '#ffffff',
                    backgroundOrigin: isActive ? 'border-box' : undefined,
                    backgroundClip: isActive ? 'padding-box, border-box' : undefined,
                    boxShadow: isActive
                      ? '0 28px 64px rgba(109, 40, 217, 0.18), 0 12px 28px rgba(59, 107, 255, 0.10), 0 0 0 1px rgba(196, 77, 255, 0.12)'
                      : '0 14px 32px rgba(15,15,30,0.07)',
                    transition:
                      'box-shadow 780ms cubic-bezier(0.22, 1, 0.36, 1), border-color 780ms ease, background 780ms ease',
                  }}
                >
                  <div
                    className="h-[3px] w-full shrink-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)'
                        : 'transparent',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 500ms ease',
                    }}
                  />
                  {isActive && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(196,77,255,0.08) 0%, rgba(59,107,255,0.04) 40%, transparent 70%)',
                      }}
                    />
                  )}
                  <div className="relative p-5 sm:p-6 lg:p-7 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span
                        className="text-xs font-bold tracking-wider"
                        style={{
                          backgroundImage: isActive
                            ? 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)'
                            : undefined,
                          WebkitBackgroundClip: isActive ? 'text' : undefined,
                          backgroundClip: isActive ? 'text' : undefined,
                          color: isActive ? 'transparent' : '#9CA3AF',
                        }}
                      >
                        {service.number}
                      </span>
                      <span
                        className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)'
                            : '#F3F4F6',
                          boxShadow: isActive
                            ? '0 4px 14px rgba(109, 40, 217, 0.35)'
                            : 'none',
                        }}
                      >
                        <Icon
                          className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                          style={{ color: isActive ? '#ffffff' : '#6B7280' }}
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight mb-2"
                      style={{
                        color: isActive ? '#1f1235' : '#111827',
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-[13px] sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3"
                      style={{ color: isActive ? '#4b3b6b' : '#6B7280' }}
                    >
                      {service.description}
                    </p>

                    {isActive && (
                      <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 overflow-hidden">
                        {service.capabilities.slice(0, mobile ? 6 : 12).map((cap) => (
                          <div
                            key={cap}
                            className="flex items-start gap-2 text-[11px] sm:text-xs"
                            style={{ color: '#4b5563' }}
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
                        className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all"
                        style={{
                          backgroundImage:
                            'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        View services
                        <ArrowRight className="w-3.5 h-3.5 text-violet-600" />
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

      <div className="w-full max-w-[56rem] mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-6 lg:mt-7 text-center">
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
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {activeService.description}
          </p>
          <div className="mt-5 sm:mt-6 hidden sm:grid sm:grid-cols-2 gap-x-8 gap-y-2 text-left max-w-2xl mx-auto">
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
        className="mt-5 sm:mt-6 lg:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4"
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
              aria-label={`Show ${s.title}`}
              aria-current={isOn ? 'true' : undefined}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isOn
                  ? 'text-white shadow-md'
                  : 'text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-800'
              }`}
              style={
                isOn
                  ? {
                      background: 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)',
                    }
                  : undefined
              }
            >
              {s.title}
            </button>
          )
        })}
      </nav>

      <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            pauseAutoplay()
            prev()
          }}
          aria-label="Previous service"
          className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-700 transition-colors flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5" aria-hidden>
          {SERVICES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-violet-600' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            pauseAutoplay()
            next()
          }}
          aria-label="Next service"
          className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-700 transition-colors flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
