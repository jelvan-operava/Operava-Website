import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { Service } from '../data/services'
import { automationServices } from '../data/automationServices'
import { useLanguage } from '../i18n/LanguageContext'
import ServiceAnimatedIcon from './ServiceAnimatedIcon'

interface ServiceCardProps {
  service: Service
  index?: number
  showCapabilities?: boolean
  maxCapabilities?: number
  className?: string
  /**
   * Services tab listings only: number uses the same color treatment as the title
   * (solid gray-900 hierarchy). Home and other contexts keep the gradient number.
   */
  matchTitleTheme?: boolean
}

const GRADIENT = 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)'

const automationSlugSet = new Set(automationServices.map((s) => s.slug))

export default function ServiceCard({
  service,
  index = 0,
  showCapabilities = false,
  maxCapabilities = 3,
  className = '',
  matchTitleTheme = false,
}: ServiceCardProps) {
  const { t } = useLanguage()
  const [imgError, setImgError] = useState(false)
  const isAutomation = automationSlugSet.has(service.slug)
  const href = isAutomation
    ? `/services/automation/${service.slug}`
    : `/services/${service.category}/${service.slug}`
  const categoryLabel = isAutomation
    ? 'Automation'
    : service.category === 'bpo'
      ? 'Outsourcing'
      : 'Technology'

  const displayNumber = service.number || String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      id={`service-card-${service.slug}`}
      className={`group relative flex flex-col w-full h-full rounded-2xl bg-white border border-[#EDEDF2] overflow-hidden transition-all duration-300 hover:border-violet-200/80 hover:shadow-[0_24px_48px_rgba(15,15,30,0.07)] ${className}`}
    >
      {/* Brand gradient accent line */}
      <div
        className="h-[2px] w-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: GRADIENT }}
        aria-hidden
      />

      {/* Image — circular diagrams sit cleanly on soft base */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#FAFAFC] via-white to-white flex items-center justify-center overflow-hidden">
        {service.image && !imgError ? (
          <img
            src={service.image}
            alt={service.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex items-center justify-center p-6">
            <div
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,139,74,0.12), rgba(196,77,255,0.12), rgba(59,107,255,0.12))',
              }}
            >
              <ServiceAnimatedIcon icon={service.icon} size="lg" interactive={true} />
            </div>
          </div>
        )}
      </div>

      <div className="relative flex flex-col flex-1 px-5 pb-5 pt-1">
        <div className="mb-2">
          <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
            {categoryLabel}
          </span>
        </div>

        <div className="flex items-start gap-2.5 mb-2">
          <span
            className={
              matchTitleTheme
                ? 'text-base sm:text-lg font-black text-gray-900 tracking-tight leading-snug shrink-0 tabular-nums'
                : 'text-[10px] font-bold tracking-wider shrink-0 pt-0.5'
            }
            style={
              matchTitleTheme
                ? undefined
                : {
                    backgroundImage: GRADIENT,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }
            }
            aria-hidden={!matchTitleTheme}
          >
            {displayNumber}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug line-clamp-2 min-h-[2.5rem]">
            {service.name}
          </h3>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
          {service.shortDescription || service.description}
        </p>

        {showCapabilities && service.capabilities?.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mb-4">
            {service.capabilities.slice(0, maxCapabilities).map((cap) => (
              <li
                key={cap}
                className="px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-50 border border-gray-100 rounded-md"
              >
                {cap.length > 36 ? cap.slice(0, 34) + '…' : cap}
              </li>
            ))}
          </ul>
        )}

        <Link
          to={href}
          id={`btn-explore-${service.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors group/link"
        >
          <span>{t('common.learnMore', 'Learn More')}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}
