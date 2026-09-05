import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  CheckCircle2,
  TrendingUp,
  Building2,
  ShieldCheck,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  industry: string
  location: string
  rating: number
  metric: string
  metricLabel: string
  verified: boolean
  avatarUrl: string
  tag: string
}

const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    quote:
      'OPERAVA completely re-architected our cloud infrastructure. We went from periodic latency spikes to a resilient 99.99% SLA with automated zero-downtime deployments, while cutting our operational compute overhead by 42%.',
    author: 'Marcus Vance',
    role: 'VP of Global Engineering',
    company: 'AxiomPay FinTech',
    industry: 'Financial Technology',
    location: 'London, United Kingdom',
    rating: 5,
    metric: '42% Cost Reduction',
    metricLabel: 'Cloud & Infrastructure Optimization',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    tag: 'Cloud & DevSecOps',
  },
  {
    id: 't2',
    quote:
      'Scaling our tier 1–3 technical support desk from 10 to 85 dedicated agents in under two weeks sounded impossible. OPERAVA delivered certified professionals trained directly on our stack, pushing CSAT from 88% to 98.4%.',
    author: 'Elena Rostova',
    role: 'Chief Operating Officer',
    company: 'NovaSphere SaaS',
    industry: 'Enterprise Software',
    location: 'San Francisco, USA',
    rating: 5,
    metric: '98.4% CSAT Rating',
    metricLabel: 'From 88% in 60 Days',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    tag: 'BPO & Omnichannel CX',
  },
  {
    id: 't3',
    quote:
      'For healthcare diagnostic models, data integrity is paramount. OPERAVA built our HIPAA-compliant annotation workflows and processed over 500,000 multimodal clinical records with 99.92% validation accuracy.',
    author: 'Dr. Julian Mercer',
    role: 'Head of AI Operations',
    company: 'Synapse BioHealth',
    industry: 'Healthcare & AI Diagnostics',
    location: 'Singapore',
    rating: 5,
    metric: '500K+ Data Points',
    metricLabel: '99.92% Clinical Accuracy',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    tag: 'AI Pipeline & Data Ops',
  },
  {
    id: 't4',
    quote:
      'Their 24/7 follow-the-sun operations transformed our cross-border supply chain. Exception handling that previously took 36 hours is now resolved in under 90 minutes with fully automated audit trails.',
    author: 'Sarah Lindqvist',
    role: 'Global Supply Chain Director',
    company: 'Apex Cargo Dynamics',
    industry: 'Global Logistics',
    location: 'Sydney, Australia',
    rating: 5,
    metric: '75% Faster Resolution',
    metricLabel: '24/7 Follow-the-Sun Coverage',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80',
    tag: 'Supply Chain Operations',
  },
  {
    id: 't5',
    quote:
      'OPERAVA’s SOC squad integrated seamlessly into our SIEM pipelines. They identified and neutralized anomalous threat patterns before they could touch production. Zero security breaches year-to-date.',
    author: 'David K. Weber',
    role: 'Chief Information Security Officer',
    company: 'Kinetix CyberSystems',
    industry: 'Cybersecurity',
    location: 'Frankfurt, Germany',
    rating: 5,
    metric: 'Zero Breaches',
    metricLabel: 'Continuous 24/7 SIEM Shield',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    tag: 'SOC & Threat Defense',
  },
  {
    id: 't6',
    quote:
      'During Black Friday traffic surges of 40,000 requests per second, our web and mobile checkout ran flawlessly. OPERAVA’s dedicated engineering team is the most dependable partner we’ve ever worked with.',
    author: 'Kenji Takahashi',
    role: 'VP of Digital Commerce',
    company: 'OMNI Retail Group',
    industry: 'E-Commerce Enterprise',
    location: 'Tokyo, Japan',
    rating: 5,
    metric: '40K Req/Sec',
    metricLabel: 'Zero Latency Degradation',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80',
    tag: 'High-Concurrency Systems',
  },
]

const AUTOPLAY_DURATION = 5500 // 5.5 seconds per slide

export default function TestimonialsCarousel() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const progressIntervalRef = useRef<number | null>(null)
  const total = testimonialsData.length

  const triggerSlideChange = useCallback((newIdx: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(newIdx)
      setProgress(0)
      setIsTransitioning(false)
    }, 200)
  }, [])

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % total
    triggerSlideChange(nextIdx)
  }, [currentIndex, total, triggerSlideChange])

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + total) % total
    triggerSlideChange(prevIdx)
  }, [currentIndex, total, triggerSlideChange])

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return
    triggerSlideChange(idx)
  }

  // Auto-play progress loop
  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      return
    }

    const stepMs = 50
    const increment = (stepMs / AUTOPLAY_DURATION) * 100

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          handleNext()
          return 0
        }
        return old + increment
      })
    }, stepMs)

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [isPlaying, handleNext])

  // Touch swipe support
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  const current = testimonialsData[currentIndex]

  return (
    <section className="py-20 lg:py-28 bg-gray-950 text-white relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t('testimonials.title', 'Trusted by Global Engineering & Operations Leaders')}
            </h2>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-6 text-sm text-gray-400 border-l-2 border-violet-500/40 pl-4 py-1 shrink-0">
            <div>
              <div className="text-xl font-bold text-white">99.4%</div>
              <div className="text-xs text-gray-400">{t('testimonials.retention', 'Client Retention')}</div>
            </div>
            <div className="w-px h-8 bg-gray-800" />
            <div>
              <div className="text-xl font-bold text-white">4.9 / 5.0</div>
              <div className="text-xs text-gray-400">{t('testimonials.csat', 'Executive CSAT')}</div>
            </div>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative rounded-3xl bg-gray-900/90 border border-gray-800 shadow-2xl p-6 sm:p-10 lg:p-14 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Top Info Bar inside Card */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-800/80">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-semibold">
                {current.tag}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('testimonials.verified', 'Verified Client')}</span>
              </span>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-gray-300 ml-1.5">5.0</span>
            </div>
          </div>

          {/* Testimonial Body with Smooth Transition Effect */}
          <div
            className={`py-8 sm:py-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-300 transform ${
              isTransitioning ? 'opacity-0 translate-y-2 scale-[0.99]' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {/* Left: Quote & Author Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="text-violet-500/40">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              {/* Animated Text Block */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-100 leading-relaxed">
                "{current.quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-4">
                <img
                  src={current.avatarUrl}
                  alt={current.author}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-violet-500/40 shadow-lg"
                />
                <div>
                  <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{current.author}</span>
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="text-xs sm:text-sm text-violet-300 font-medium">
                    {current.role} · <span className="text-gray-300">{current.company}</span>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>{current.industry}</span>
                    <span>•</span>
                    <span>{current.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Key Result Metric Highlight Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-gradient-to-br from-violet-950/60 to-gray-900 border border-violet-500/30 p-6 sm:p-8 flex flex-col justify-between h-full shadow-inner relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center mb-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-400 block mb-1">
                    {t('testimonials.metric', 'Key Performance Impact')}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                    {current.metric}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                    {current.metricLabel}
                  </p>
                </div>

                <div className="pt-4 border-t border-violet-500/20 text-xs text-gray-400 flex items-center justify-between">
                  <span>Audited Result</span>
                  <span className="text-emerald-400 font-semibold">100% Guaranteed SLA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Footer Controls & Indicators */}
          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Slide Dots / Indicators */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-violet-500 shadow-sm shadow-violet-500/50'
                      : 'w-2.5 bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons + Play/Pause Toggle */}
            <div className="flex items-center gap-3">
              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 active:scale-95 text-gray-300 hover:text-white flex items-center justify-center transition-all border border-gray-700 cursor-pointer"
                title={isPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
                aria-label={isPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-gray-700 active:scale-95 text-gray-300 hover:text-white flex items-center justify-center transition-all border border-gray-700 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-95 text-white flex items-center justify-center transition-all shadow-md shadow-violet-600/30 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Animated Countdown Progress Bar at Bottom of Card */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-indigo-400 transition-all ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
