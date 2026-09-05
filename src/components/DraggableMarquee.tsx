import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export interface PlainImageCardItem {
  type: 'image'
  id: string
  imageUrl: string
  alt: string
}

export interface InsightCardItem {
  type: 'insight'
  id: string
  category: string
  title: string
  description: string
  scope: string
  variant?: 'default' | 'accent' | 'dark' | 'purple'
  link: string
}

export type MarqueeCardItem = PlainImageCardItem | InsightCardItem

function PlainImageCardComponent({ item, idx }: { item: PlainImageCardItem; idx: number }) {
  return (
    <div
      key={`${item.id}-${idx}`}
      className="w-[420px] sm:w-[480px] h-[480px] rounded-3xl overflow-hidden relative flex-shrink-0 shadow-2xl border border-gray-200/80 select-none group transition-transform duration-300 hover:scale-[1.02] bg-gray-950"
    >
      <img
        src={item.imageUrl}
        alt={item.alt || 'Operava Operational Image'}
        className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    </div>
  )
}

function InsightCardComponent({ item, idx }: { item: InsightCardItem; idx: number }) {
  if (item.variant === 'accent') {
    return (
      <div
        key={`${item.id}-${idx}`}
        className="w-[420px] sm:w-[480px] h-[480px] rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 text-white p-9 flex flex-col justify-between flex-shrink-0 shadow-2xl shadow-violet-700/25 border border-violet-400/30 select-none group transition-transform duration-300 hover:scale-[1.02]"
      >
        <div>
          <div className="flex items-center justify-end mb-4">
            <Link
              to={item.link}
              className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-violet-700 transition-all shadow-md"
            >
              <ArrowUpRight className="w-4 h-4 text-white group-hover:text-violet-700" />
            </Link>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-white mb-3">
            {item.title}
          </h3>
          <p className="text-sm text-violet-100/90 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="pt-4 border-t border-white/20 text-xs">
          <strong className="block text-sm font-bold text-white mb-0.5">{item.category}</strong>
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
        <div className="absolute -right-10 -top-10 w-36 h-36 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />
        <div>
          <div className="flex items-center justify-end mb-4">
            <Link
              to={item.link}
              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white group-hover:bg-violet-600 group-hover:text-white transition-all shadow-md"
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-white mb-3">
            {item.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="pt-4 border-t border-gray-800 text-xs">
          <strong className="block text-sm font-bold text-white mb-0.5">{item.category}</strong>
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
          <div className="flex items-center justify-end mb-4">
            <Link
              to={item.link}
              className="w-9 h-9 rounded-full bg-violet-200/70 flex items-center justify-center text-gray-800 group-hover:bg-violet-700 group-hover:text-white transition-all shadow-sm"
            >
              <ArrowUpRight className="w-4 h-4 text-violet-900 group-hover:text-white" />
            </Link>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-gray-950 mb-3">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="pt-4 border-t border-violet-200/70 text-xs">
          <strong className="block text-sm font-bold text-gray-900 mb-0.5">{item.category}</strong>
          <span className="text-gray-600">{item.scope}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      key={`${item.id}-${idx}`}
      className="w-[420px] sm:w-[480px] h-[480px] rounded-3xl bg-white text-gray-900 p-9 flex flex-col justify-between flex-shrink-0 shadow-2xl shadow-gray-200/60 border border-gray-100 select-none group transition-transform duration-300 hover:scale-[1.02]"
    >
      <div>
        <div className="flex items-center justify-end mb-4">
          <Link
            to={item.link}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-violet-700 group-hover:text-white transition-all shadow-sm"
          >
            <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-white" />
          </Link>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight text-gray-950 mb-3">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>
      <div className="pt-4 border-t border-gray-100 text-xs">
        <strong className="block text-sm font-bold text-gray-900 mb-0.5">{item.category}</strong>
        <span className="text-gray-500">{item.scope}</span>
      </div>
    </div>
  )
}

export default function DraggableMarquee() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Alternating items: Purely Plain Image -> Operational Insight & Innovation -> Purely Plain Image -> ...
  const items: MarqueeCardItem[] = [
    // 1. Image 1: Business Handshake
    {
      type: 'image',
      id: 'img-1',
      imageUrl: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787283729/filipino_business_handshake_zpu4sb.webp',
      alt: 'Operava Strategic Partnerships',
    },
    // 1. Insight 1: Strategic Global Partnerships
    {
      type: 'insight',
      id: 'insight-1',
      category: 'Strategic Global Partnerships',
      title: 'Agile Cross-Border Operating Models for Enterprise Growth',
      description:
        'Aligning executive leadership, compliant legal frameworks, and SLA-backed governance to establish seamless multi-region operations with zero delivery friction.',
      scope: 'Global Expansion & Executive Alignment',
      variant: 'accent',
      link: '/about',
    },

    // 2. Image 2: Developer Coding
    {
      type: 'image',
      id: 'img-2',
      imageUrl: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787283770/filipino_developer_coding_daztmy.webp',
      alt: 'Operava Developer Engineering',
    },
    // 2. Insight 2: Full-Stack Engineering & Microservices
    {
      type: 'insight',
      id: 'insight-2',
      category: 'Software Engineering & Microservices',
      title: 'High-Velocity Engineering with Microservices & CI/CD Pipelines',
      description:
        'Modern React, TypeScript, and distributed GraphQL microservice architectures engineered for zero-downtime rollouts and accelerated time-to-market.',
      scope: 'Custom Software & Digital Platforms',
      variant: 'dark',
      link: '/services/it/custom-software',
    },

    // 3. Image 3: Data Analyst Operava
    {
      type: 'image',
      id: 'img-3',
      imageUrl: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787283803/data_analyst_operava_ekwjft.webp',
      alt: 'Operava Data Analyst',
    },
    // 3. Insight 3: Enterprise Data Analytics & BI
    {
      type: 'insight',
      id: 'insight-3',
      category: 'Data Operations & BI Analytics',
      title: 'Enterprise Data Pipelines & Predictive Business Intelligence',
      description:
        'Ingesting high-volume transactional streams into centralized data warehouses with automated ETL workflows and sub-second decision intelligence.',
      scope: 'Data Pipelines & Business Intelligence',
      variant: 'purple',
      link: '/services/it/managed-it',
    },

    // 4. Image 4: Cloud Engineer AWS Dashboard
    {
      type: 'image',
      id: 'img-4',
      imageUrl: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787283870/cloud_engineer_aws_dashboard_zn63vw.webp',
      alt: 'Operava Cloud Engineer AWS Dashboard',
    },
    // 4. Insight 4: Cloud Architecture & AWS DevOps
    {
      type: 'insight',
      id: 'insight-4',
      category: 'Cloud Architecture & DevOps',
      title: 'Resilient Multi-Region Cloud Infrastructure & Auto-Healing Clusters',
      description:
        'Designing fault-tolerant cloud architectures with automated failover, zero-trust security postures, and cost-optimized compute workloads.',
      scope: 'Managed AWS / Azure / GCP Cloud',
      variant: 'dark',
      link: '/services/it/cloud-infrastructure',
    },

    // 5. Image 5: Back Office Support Professional
    {
      type: 'image',
      id: 'img-5',
      imageUrl: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787283911/back_office_support_professional_on938n.webp',
      alt: 'Operava Back Office Support Professional',
    },
    // 5. Insight 5: High-Precision Back-Office Scalability
    {
      type: 'insight',
      id: 'insight-5',
      category: 'Back-Office Operations & Compliance',
      title: 'High-Volume Transaction Processing with Strict ISO 27001 Precision',
      description:
        'Scalable back-office workflows for invoice reconciliation, risk verification, and regulatory auditing with dual-layer human-in-the-loop quality checks.',
      scope: 'Enterprise Back-Office & Data Processing',
      variant: 'default',
      link: '/services/bpo/back-office',
    },

    // 6. Image 6: IT Helpdesk Professional
    {
      type: 'image',
      id: 'img-6',
      imageUrl: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787283964/it_helpdesk_professional_zyp15e.webp',
      alt: 'Operava IT Helpdesk Professional',
    },
    // 6. Insight 6: 24/7 Enterprise IT Helpdesk
    {
      type: 'insight',
      id: 'insight-6',
      category: '24/7 Enterprise IT Helpdesk',
      title: 'Follow-the-Sun Technical Helpdesk with Rapid Incident Triage',
      description:
        'Dedicated Tier 1–3 technical support engineers equipped to handle enterprise infrastructure troubleshooting, network monitoring, and endpoint administration.',
      scope: 'Managed IT Support & Endpoint Management',
      variant: 'accent',
      link: '/services/it/managed-it',
    },

    // 7. Image 7: Customer Support Banner
    {
      type: 'image',
      id: 'img-7',
      imageUrl: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787284005/customer_support_banner_hbpnus.webp',
      alt: 'Operava Customer Support Banner',
    },
    // 7. Insight 7: Omnichannel Customer Experience & CSAT
    {
      type: 'insight',
      id: 'insight-7',
      category: 'Omnichannel Customer Experience',
      title: 'Scalable Omnichannel CX Teams Delivering High-CSAT Global Retention',
      description:
        'Empowering enterprise brands with dedicated customer care professionals across live chat, voice, email, and social care channels with seamless CRM integration.',
      scope: '24/7 Customer Care & Escalation Operations',
      variant: 'purple',
      link: '/services/bpo/customer-service',
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
    if (item.type === 'image') {
      return <PlainImageCardComponent key={`${item.id}-${idx}`} item={item} idx={idx} />
    }
    return <InsightCardComponent key={`${item.id}-${idx}`} item={item} idx={idx} />
  }

  return (
    <section className="py-20 bg-gray-50/60 overflow-hidden relative border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {t('marquee.title', 'Operava Operational Insights & Innovations')}
          </h2>
        </div>
        <p className="text-sm text-gray-500 max-w-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{t('marquee.dragPrompt', 'Drag sideways to inspect innovations or explore details.')}</span>
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
