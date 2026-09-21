import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Service } from '../data/services'
import { automationServices } from '../data/automationServices'
import ServiceAnimatedIcon from './ServiceAnimatedIcon'
import { OPERAVA_LOGO_CDN } from './AvaVideoAvatar'

interface ServiceCardProps {
  service: Service
  index?: number
  showCapabilities?: boolean
  maxCapabilities?: number
  className?: string
  matchTitleTheme?: boolean
}

const automationSlugSet = new Set(automationServices.map((s) => s.slug))

/**
 * Pure Cloudinary diagram tile — no frame / border / chrome.
 * Larger on phone and desktop; AVA AI logo mark (bottom-right).
 */
export default function ServiceCard({
  service,
  index = 0,
  className = '',
}: ServiceCardProps) {
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
      className={`group relative w-full ${className}`}
    >
      <Link
        to={href}
        id={`btn-explore-${service.slug}`}
        className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
        aria-label={service.name}
      >
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] min-h-[320px] sm:min-h-[360px] lg:min-h-[420px] xl:min-h-[460px] overflow-hidden bg-transparent">
          {service.image && !imgError ? (
            <img
              src={service.image}
              alt={service.name}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain object-center select-none"
              draggable={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ServiceAnimatedIcon icon={service.icon} size="lg" interactive={false} />
            </div>
          )}

          {/* AVA AI logo — official Operava mark */}
          <img
            src={OPERAVA_LOGO_CDN}
            alt="AVA"
            width={36}
            height={36}
            className="absolute bottom-3 right-3 w-8 h-8 sm:w-9 sm:h-9 object-contain pointer-events-none select-none opacity-90"
            decoding="async"
            loading="lazy"
            draggable={false}
          />
        </div>
      </Link>
    </motion.div>
  )
}
