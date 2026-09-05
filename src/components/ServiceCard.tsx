import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Service } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
import ServiceAnimatedIcon from './ServiceAnimatedIcon'

interface ServiceCardProps {
  service: Service
  index?: number
  showCapabilities?: boolean
  maxCapabilities?: number
  className?: string
}

export default function ServiceCard({
  service,
  index = 0,
  showCapabilities = false,
  maxCapabilities = 3,
  className = '',
}: ServiceCardProps) {
  const { t } = useLanguage()
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      id={`service-card-${service.slug}`}
      className={`operava-card-frame group relative w-full ${className}`}
    >
      {/* Shell Card Graphic Layer */}
      <img
        src="https://res.cloudinary.com/b5i5bwwa/image/upload/Operava-contents-card.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 rounded-[20px]"
        loading="lazy"
      />

      {/* Image Container with Focused Spotlight Glow */}
      <div className="operava-image-container relative z-10">
        {service.image && !imgError ? (
          <img
            src={service.image}
            alt={service.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div className="relative z-10 flex items-center justify-center p-4">
            <ServiceAnimatedIcon
              icon={service.icon}
              size="lg"
              interactive={true}
            />
          </div>
        )}
      </div>

      {/* Typography Section */}
      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <h2 className="operava-card-title line-clamp-2 min-h-[3.25rem] flex items-center justify-center">
          {service.name}
        </h2>

        <p className="operava-card-description line-clamp-3 min-h-[3.75rem]">
          {service.shortDescription || service.description}
        </p>

        {/* Optional Capability Badges */}
        {showCapabilities && service.capabilities && service.capabilities.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-1.5 mb-5 w-full">
            {service.capabilities.slice(0, maxCapabilities).map((cap) => (
              <li
                key={cap}
                className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-lg border border-white/15 backdrop-blur-xs transition-colors"
              >
                {cap}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Button */}
      <Link
        to={`/services/${service.category}/${service.slug}`}
        id={`btn-explore-${service.slug}`}
        className="operava-learn-more-btn relative z-10 mt-auto"
      >
        <span>{t('common.learnMore', 'Learn More')}</span>
      </Link>
    </motion.div>
  )
}

