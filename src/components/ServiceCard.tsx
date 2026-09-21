import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Service } from '../data/services'
import { automationServices } from '../data/automationServices'
import ServiceAnimatedIcon from './ServiceAnimatedIcon'

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
 * Service tile = Cloudinary diagram only.
 * Same footprint as before (aspect 16/10), no frame, border, gradient, or chrome.
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
        className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 rounded-none"
        aria-label={service.name}
      >
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-transparent">
          {service.image && !imgError ? (
            <img
              src={service.image}
              alt={service.name}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-contain object-center select-none"
              draggable={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ServiceAnimatedIcon icon={service.icon} size="lg" interactive={false} />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
