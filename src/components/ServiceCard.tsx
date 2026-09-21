import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { Service } from '../data/services'
import { automationServices } from '../data/automationServices'
import ServiceAnimatedIcon from './ServiceAnimatedIcon'
import { useLanguage } from '../i18n/LanguageContext'

interface ServiceCardProps {
  service: Service
  index?: number
  showCapabilities?: boolean
  maxCapabilities?: number
  className?: string
  matchTitleTheme?: boolean
}

const GRADIENT = 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)'

const automationSlugSet = new Set(automationServices.map((s) => s.slug))

/**
 * Service card — Cloudinary diagram + brand accent line + Learn More.
 * No title text (name is on the diagram asset).
 */
export default function ServiceCard({
  service,
  index = 0,
  className = '',
}: ServiceCardProps) {
  const { t } = useLanguage()
  const [imgError, setImgError] = useState(false)
  const isAutomation = automationSlugSet.has(service.slug)
  const href = isAutomation
    ? `/services/automation/${service.slug}`
    : `/services/${service.category}/${service.slug}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      id={`service-card-${service.slug}`}
      className={`group relative flex flex-col w-full h-full rounded-2xl bg-white border border-[#EDEDF2] overflow-hidden transition-all duration-300 hover:border-violet-200/80 hover:shadow-[0_20px_40px_rgba(15,15,30,0.06)] ${className}`}
    >
      {/* Brand gradient accent line */}
      <div
        className="h-[3px] w-full shrink-0"
        style={{ background: GRADIENT }}
        aria-hidden
      />

      {/* Cloudinary diagram */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] overflow-hidden bg-white">
        {service.image && !imgError ? (
          <img
            src={service.image}
            alt={service.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain object-center select-none p-2 sm:p-3"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ServiceAnimatedIcon icon={service.icon} size="lg" interactive={false} />
          </div>
        )}
      </div>

      {/* Learn More only */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
        <Link
          to={href}
          id={`btn-explore-${service.slug}`}
          className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-95 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          style={{ background: GRADIENT }}
          aria-label={`${t('common.learnMore', 'Learn More')}: ${service.name}`}
        >
          <span>{t('common.learnMore', 'Learn More')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  )
}
