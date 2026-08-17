import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      id={`service-card-${service.slug}`}
      className={`group relative bg-white border border-gray-100/90 rounded-2xl p-7 hover:border-violet-300/80 hover:shadow-xl hover:shadow-violet-500/8 transition-all duration-300 flex flex-col justify-between items-center text-center ${className}`}
    >
      {/* Top Number Pill & Category Indicator */}
      <div className="w-full flex items-center justify-between mb-2">
        <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-violet-700 bg-violet-50 rounded-full border border-violet-100/60">
          {service.category.toUpperCase()}
        </span>
        <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-violet-600 transition-colors">
          #{service.number}
        </span>
      </div>

      {/* Prominent Centered Animated Floating Icon */}
      <div className="my-4 flex items-center justify-center">
        <ServiceAnimatedIcon
          icon={service.icon}
          size="lg"
          interactive={true}
        />
      </div>

      {/* Centered Structured Content */}
      <div className="w-full flex flex-col items-center">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2.5 group-hover:text-violet-700 transition-colors duration-200 line-clamp-2 min-h-[3.25rem] flex items-center justify-center text-center">
          {service.name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 min-h-[3.75rem] text-center max-w-sm">
          {service.shortDescription}
        </p>

        {/* Optional Capability Badges */}
        {showCapabilities && service.capabilities && service.capabilities.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-1.5 mb-5 w-full">
            {service.capabilities.slice(0, maxCapabilities).map((cap) => (
              <li
                key={cap}
                className="px-2.5 py-1 text-xs font-medium bg-gray-50/90 text-gray-600 rounded-lg border border-gray-100/60 group-hover:border-violet-100 group-hover:bg-violet-50/30 transition-colors"
              >
                {cap}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Explore Link */}
      <Link
        to={`/services/${service.category}/${service.slug}`}
        id={`btn-explore-${service.slug}`}
        className="w-full pt-3 mt-auto border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-800 transition-all duration-200 group/btn"
      >
        <span>{t('common.exploreService', 'Explore service')}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
      </Link>
    </motion.div>
  )
}
