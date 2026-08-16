import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Sparkles, Shield, Cpu, Headphones, Database } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export interface StatementCardItem {
  type: 'statement'
  id: string
  title: string
  client: string
  scope: string
  metric: string
  variant?: 'default' | 'accent' | 'dark' | 'purple'
  icon: typeof Sparkles
  link: string
}

export interface VideoCardItem {
  type: 'video'
  id: string
  title: string
  subtitle: string
  badge: string
  metric: string
  videoUrl: string
  posterUrl: string
  link: string
}

export type MarqueeCardItem = StatementCardItem | VideoCardItem

function VideoCardComponent({ item, idx }: { item: VideoCardItem; idx: number }) {
  const [videoError, setVideoError] = useState(false)

  return (
    <div
      key={`${item.id}-${idx}`}
      className="w-[420px] sm:w-[480px] h-[480px] rounded-3xl overflow-hidden relative flex-shrink-0 shadow-2xl border border-gray-800 select-none group transition-transform duration-300 hover:scale-[1.02] bg-gray-950 flex flex-col justify-between p-9"
    >
      {/* Background Live Video / Motion Photo */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={item.posterUrl}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700"
          >
            <source src={item.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
          />
        )}
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-gray-950/60" />
        <div className="absolute inset-0 bg-violet-950/20 mix-blend-overlay" />
      </div>

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {item.badge}
          </span>
          <Link
            to={item.link}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-violet-600 group-hover:text-white transition-all shadow-md"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="relative z-10 pt-4 border-t border-white/20">
        <h3 className="text-xl sm:text-2xl font-black leading-snug tracking-tight text-white mb-2 drop-shadow-md">
          {item.title}
        </h3>
        <p className="text-xs text-gray-200 leading-relaxed mb-3 drop-shadow-sm font-medium">
          {item.subtitle}
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-600/80 backdrop-blur-sm text-xs font-semibold text-white border border-violet-400/40 shadow-sm">
          <span>⚡ {item.metric}</span>
        </div>
      </div>
    </div>
  )
}

function StatementCardComponent({ item, idx }: { item: StatementCardItem; idx: number }) {
  const Icon = item.icon

  if (item.variant === 'accent') {
    return (
      <div
        key={`${item.id}-${idx}`}
        className="w-[420px] sm:w-[480px] h-[480px] rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white p-9 flex flex-col justify-between flex-shrink-0 shadow-2xl shadow-violet-700/25 border border-violet-400/30 select-none group transition-transform duration-300 hover:scale-[1.02]"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider text-white">
              <Icon className="w-3.5 h-3.5" />
              Featured Case
            </span>
            <Link
              to={item.link}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-violet-700 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-white mb-3">
            {item.title}
          </h3>
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-white/15 text-xs font-semibold text-violet-100">
            ⚡ {item.metric}
          </div>
        </div>
        <div className="pt-4 border-t border-white/20 text-xs">
          <strong className="block text-sm font-bold text-white mb-0.5">{item.client}</strong>
          <span className="text-violet-200">{item.scope}</span>
        </div>
      </div>
    )
  }

  if (item.variant === 'dark') {
    return (
      <div
        key={`${item.id}-${idx}`}
        className="w-[420px] sm:w-[480px] h-[480px] rounded-3xl bg-gray-950 text-white p-9 flex flex-col justify-between flex-shrink-0 shadow-2xl border border-gray-800 select-none group transition-transform duration-300 hover:scale-[1.02] relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 text-[11px] font-bold uppercase tracking-wider text-violet-300 border border-violet-500/20">
              <Icon className="w-3.5 h-3.5" />
              Operational Proof
            </span>
            <Link
              to={item.link}
              className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white group-hover:bg-violet-600 group-hover:text-white transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-white mb-3">
            {item.title}
          </h3>
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-violet-950/60 border border-violet-700/40 text-xs font-semibold text-violet-300">
            ✓ {item.metric}
          </div>
        </div>
        <div className="pt-4 border-t border-gray-800 text-xs">
          <strong className="block text-sm font-bold text-white mb-0.5">{item.client}</strong>
          <span className="text-gray-400">{item.scope}</span>
        </div>
      </div>
    )
  }

  if (item.variant === 'purple') {
    return (
      <div
        key={`${item.id}-${idx}`}
        className="w-[420px] sm:w-[480px] h-[480px] rounded-3xl bg-violet-50 text-gray-900 p-9 flex flex-col justify-between flex-shrink-0 shadow-xl border border-violet-200/80 select-none group transition-transform duration-300 hover:scale-[1.02]"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-[11px] font-bold uppercase tracking-wider text-violet-700">
              <Icon className="w-3.5 h-3.5" />
              AI & Data Ops
            </span>
            <Link
              to={item.link}
              className="w-8 h-8 rounded-full bg-violet-200/60 flex items-center justify-center text-gray-700 group-hover:bg-violet-700 group-hover:text-white transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-gray-900 mb-3">
            {item.title}
          </h3>
          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-white text-xs font-semibold text-violet-700 border border-violet-200">
            📊 {item.metric}
          </div>
        </div>
        <div className="pt-4 border-t border-violet-200/60 text-xs">
          <strong className="block text-sm font-bold text-gray-900 mb-0.5">{item.client}</strong>
          <span className="text-gray-600">{item.scope}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      key={`${item.id}-${idx}`}
      className="w-[420px] sm:w-[480px] h-[480px] rounded-3xl bg-white text-gray-900 p-9 flex flex-col justify-between flex-shrink-0 shadow-2xl shadow-gray-200/50 border border-gray-100 select-none group transition-transform duration-300 hover:scale-[1.02]"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-700">
            <Icon className="w-3.5 h-3.5" />
            Production Track
          </span>
          <Link
            to={item.link}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-violet-700 group-hover:text-white transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <h3 className="text-xl sm:text-2xl font-black leading-snug tracking-tight text-gray-900 mb-3">
          {item.title}
        </h3>
        <div className="inline-block px-3 py-1 rounded-lg bg-gray-50 text-xs font-semibold text-gray-700 border border-gray-200">
          ★ {item.metric}
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100 text-xs">
        <strong className="block text-sm font-bold text-gray-900 mb-0.5">{item.client}</strong>
        <span className="text-gray-500">{item.scope}</span>
      </div>
    </div>
  )
}

export default function DraggableMarquee() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Alternating items: Live Video -> Statement -> Live Video -> Statement ...
  const items: MarqueeCardItem[] = [
    {
      type: 'video',
      id: 'v1',
      title: 'Cloud Infrastructure & High-Availability Clusters',
      subtitle: 'Real-time telemetry, auto-scaling Kubernetes nodes & edge delivery network.',
      badge: 'Live Cloud Feed',
      metric: '99.99% Monitored Uptime',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-data-31912-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      link: '/services/it/cloud-infrastructure',
    },
    {
      type: 'statement',
      id: 's1',
      title: 'Global Cloud Architecture & 99.99% Uptime DevSecOps Migration',
      client: 'European FinTech Enterprise',
      scope: 'Managed Cloud & Kubernetes Infrastructure',
      metric: 'Zero-Downtime Migration',
      variant: 'dark',
      icon: Cpu,
      link: '/services/it/cloud-infrastructure',
    },
    {
      type: 'video',
      id: 'v2',
      title: '24/7 Global BPO Operations & Support Floor',
      subtitle: 'Dedicated multichannel support squads delivering tier 1–3 technical resolution.',
      badge: 'Live Operations Floor',
      metric: 'Follow-The-Sun Coverage',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-people-working-in-an-office-42777-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      link: '/services/bpo/customer-service',
    },
    {
      type: 'statement',
      id: 's2',
      title: 'Omnichannel CX & Tier 1–3 Global Technical Support Scaling',
      client: 'North American SaaS Unicorn',
      scope: 'BPO Operations & 24/7 Multilingual Desk',
      metric: 'Scaled to 85 Agents in 14 Days',
      variant: 'accent',
      icon: Headphones,
      link: '/services/bpo/customer-service',
    },
    {
      type: 'video',
      id: 'v3',
      title: 'Security Operations Center (SOC) Threat Matrix',
      subtitle: 'Continuous threat intelligence, SIEM anomaly detection & zero-breach protocols.',
      badge: 'Live SOC Feed',
      metric: 'Zero-Breach SLA',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-motherboard-with-integrated-circuits-and-lights-42998-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      link: '/services/it/cybersecurity',
    },
    {
      type: 'statement',
      id: 's3',
      title: 'Automated KYC / AML Compliance & High-Volume Back-Office Engine',
      client: 'Pan-Asian Digital Payments Hub',
      scope: 'Risk Screening & Data Processing',
      metric: '48h to 4h Turnaround · 99.8% Accuracy',
      variant: 'default',
      icon: Shield,
      link: '/services/bpo/back-office',
    },
    {
      type: 'video',
      id: 'v4',
      title: 'Full-Stack Software Engineering & CI/CD Pipelines',
      subtitle: 'Modern React, TypeScript, GraphQL microservices and distributed queue workflows.',
      badge: 'Live Engineering Lab',
      metric: 'Continuous Automated Deploy',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-41334-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      link: '/services/it/custom-software',
    },
    {
      type: 'statement',
      id: 's4',
      title: 'Enterprise AI Data Pipeline & RLHF Annotation Ops',
      client: 'Healthcare AI Diagnostics Lab',
      scope: 'Data Labeling & Model Evaluation',
      metric: '500,000+ Verified Clinical Datasets',
      variant: 'purple',
      icon: Database,
      link: '/services/it/managed-it',
    },
    {
      type: 'video',
      id: 'v5',
      title: 'Enterprise Data Lake & Real-Time Analytics Engine',
      subtitle: 'High-throughput ETL pipelines streaming actionable operational business metrics.',
      badge: 'Live Data Streams',
      metric: 'Sub-second Latency',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-grid-31911-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      link: '/services/it/managed-it',
    },
    {
      type: 'statement',
      id: 's5',
      title: 'Full-Stack Modernization & Resilient Microservices Pipeline',
      client: 'Global E-Commerce Logistics Group',
      scope: 'React, Node, GraphQL & Distributed Queues',
      metric: '3.4x Faster Checkout Throughput',
      variant: 'default',
      icon: Sparkles,
      link: '/services/it/custom-software',
    },
    {
      type: 'video',
      id: 'v6',
      title: 'Global Compliance & Enterprise QA Command Desk',
      subtitle: 'ISO 27001 aligned monitoring, financial reconciliation, and continuous audit trails.',
      badge: 'Live QA Command',
      metric: '100% Audit Compliance',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-data-and-analysis-of-a-finance-app-42996-large.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      link: '/services/bpo/back-office',
    },
    {
      type: 'statement',
      id: 's6',
      title: '24/7 Follow-the-Sun Global Security Operations Center (SOC)',
      client: 'Critical Supply Chain Enterprise',
      scope: 'Continuous Threat Intelligence & SIEM',
      metric: '120+ Mitigated High Threats in 90 Days',
      variant: 'dark',
      icon: Shield,
      link: '/services/it/cybersecurity',
    },
  ]

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let currentX = 0
    const speed = -0.9 // Continuous leftward drift
    let isDragging = false
    let startX = 0
    let animId: number

    // Calculate boundary reset threshold (since we render 3 sets of items)
    const getResetThreshold = () => track.offsetWidth / 3

    function animate() {
      // Continuous movement: NEVER paused by simple hovering, only when actively dragged
      if (!isDragging) {
        currentX += speed
        const threshold = getResetThreshold()
        if (threshold > 0) {
          if (currentX <= -threshold) {
            currentX += threshold
          } else if (currentX > 0) {
            currentX -= threshold
          }
        }
        track!.style.transform = `translateX(${currentX}px)`
      }
      animId = requestAnimationFrame(animate)
    }

    function handleMouseDown(e: MouseEvent) {
      isDragging = true
      startX = e.pageX - currentX
      container!.style.cursor = 'grabbing'
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isDragging) return
      e.preventDefault()
      currentX = e.pageX - startX
      const threshold = getResetThreshold()
      if (threshold > 0) {
        if (currentX <= -threshold) {
          startX -= threshold
          currentX += threshold
        } else if (currentX > 0) {
          startX += threshold
          currentX -= threshold
        }
      }
      track!.style.transform = `translateX(${currentX}px)`
    }

    function handleMouseUp() {
      isDragging = false
      if (container) container.style.cursor = 'grab'
    }

    function handleTouchStart(e: TouchEvent) {
      isDragging = true
      startX = e.touches[0].pageX - currentX
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isDragging) return
      currentX = e.touches[0].pageX - startX
      const threshold = getResetThreshold()
      if (threshold > 0) {
        if (currentX <= -threshold) {
          startX -= threshold
          currentX += threshold
        } else if (currentX > 0) {
          startX += threshold
          currentX -= threshold
        }
      }
      track!.style.transform = `translateX(${currentX}px)`
    }

    function handleTouchEnd() {
      isDragging = false
    }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)

      container.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const renderCard = (item: MarqueeCardItem, idx: number) => {
    if (item.type === 'video') {
      return <VideoCardComponent key={`${item.id}-${idx}`} item={item} idx={idx} />
    }
    return <StatementCardComponent key={`${item.id}-${idx}`} item={item} idx={idx} />
  }

  return (
    <section className="py-20 bg-gray-50/60 overflow-hidden relative border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 mb-2 block">
            {t('marquee.badge', 'Global Performance Tracks')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {t('marquee.title', 'Proven Execution Across Critical Enterprise Stacks')}
          </h2>
        </div>
        <p className="text-sm text-gray-500 max-w-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{t('marquee.dragPrompt', 'Drag sideways to inspect case tracks or explore details.')}</span>
        </p>
      </div>

      {/* Outer Marquee Container */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none py-4"
      >
        {/* Inner Track (Tripled for seamless continuous loop) */}
        <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
          {items.map((item, idx) => renderCard(item, idx))}
          {items.map((item, idx) => renderCard(item, idx + 20))}
          {items.map((item, idx) => renderCard(item, idx + 40))}
        </div>
      </div>
    </section>
  )
}
