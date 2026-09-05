import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { MapPin, Briefcase, Clock, Send, ArrowRight } from 'lucide-react'

export interface CareerCardData {
  id: string
  code: string
  title: string
  shortTitle?: string
  summary?: string
  desc?: string
  assignments?: string[]
  image?: string
  location?: string
  type?: string
  level?: string
  icon?: React.ComponentType<{ className?: string }>
}

interface CareerCardProps {
  career: CareerCardData
  variant?: 'portrait' | 'landscape'
  index?: number
  onApply?: (roleTitle: string) => void
  onSelectTrack?: (trackCode: string) => void
  className?: string
}

export default function CareerCard({
  career,
  variant = 'portrait',
  index = 0,
  onApply,
  onSelectTrack,
  className = '',
}: CareerCardProps) {
  const [imgError, setImgError] = useState(false)
  const IconComponent = career.icon

  if (variant === 'landscape') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
        id={`career-landscape-card-${career.id}`}
        className={`operava-landscape-card-frame group relative w-full ${className}`}
      >
        {/* Landscape Shell Card Graphic Layer */}
        <img
          src="https://res.cloudinary.com/b5i5bwwa/image/upload/v1788593069/Shell_card.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 rounded-[24px]"
          loading="lazy"
        />

        {/* Content Layer */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-5 flex-1">
            {/* Spotlight Thumbnail Image */}
            {career.image && !imgError ? (
              <div className="operava-landscape-image-container w-20 h-20 sm:w-24 sm:h-24 shrink-0 shadow-lg border border-white/20">
                <img
                  src={career.image}
                  alt={career.title}
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            ) : IconComponent ? (
              <div className="operava-landscape-image-container w-20 h-20 sm:w-24 sm:h-24 shrink-0 shadow-lg border border-white/20 flex items-center justify-center p-4">
                <IconComponent className="w-10 h-10 text-violet-300" />
              </div>
            ) : null}

            {/* Typography & Details */}
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors">
                {career.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#e2dbff] max-w-2xl my-2.5 leading-relaxed font-normal">
                {career.desc || career.summary}
              </p>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/90 mt-3">
                {career.location && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white/90 border border-white/15 backdrop-blur-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-violet-300" />
                    {career.location}
                  </span>
                )}
                {career.type && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white/90 border border-white/15 backdrop-blur-xs font-medium">
                    <Briefcase className="w-3.5 h-3.5 text-violet-300" />
                    {career.type}
                  </span>
                )}
                {career.level && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white/90 border border-white/15 backdrop-blur-xs font-medium">
                    <Clock className="w-3.5 h-3.5 text-violet-300" />
                    {career.level}
                  </span>
                )}
              </div>

              {/* Assignments / Focus Tags */}
              {career.assignments && career.assignments.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {career.assignments.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] bg-white/10 text-violet-100 border border-white/15 backdrop-blur-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

            {/* Action Buttons */}
            <div className="flex sm:flex-row lg:flex-col xl:flex-row items-center gap-3 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => onApply && onApply(career.title)}
                id={`btn-apply-${career.id}`}
                className="operava-learn-more-btn whitespace-nowrap !w-auto !py-3 !px-6 shadow-md"
              >
                <Send className="w-3.5 h-3.5 mr-2 inline-block" />
                <span>Apply for this Role</span>
              </button>

              <Link
                to={`/apply?role=${encodeURIComponent(career.title)}`}
                id={`btn-direct-${career.id}`}
                className="inline-flex items-center justify-center px-4 py-3 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
              >
                Direct Link
              </Link>
            </div>
        </div>
      </motion.div>
    )
  }

  // Default: Portrait Variant (Matches ServiceCard.tsx visual style)
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      id={`career-card-${career.id}`}
      className={`operava-card-frame group relative w-full flex flex-col items-center justify-between ${className}`}
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
        {career.image && !imgError ? (
          <img
            src={career.image}
            alt={career.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : IconComponent ? (
          <div className="relative z-10 flex items-center justify-center p-4">
            <IconComponent className="w-16 h-16 text-violet-300" />
          </div>
        ) : null}
      </div>

      {/* Typography Section */}
      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <h3 className="operava-card-title line-clamp-2 min-h-[3.25rem] flex items-center justify-center text-center">
          {career.title}
        </h3>

        <p className="operava-card-description line-clamp-3 min-h-[3.75rem] text-center">
          {career.summary || career.desc}
        </p>

        {/* Assignments / Capability Badges */}
        {career.assignments && career.assignments.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-1.5 mb-5 w-full">
            {career.assignments.slice(0, 3).map((cap, i) => (
              <li
                key={i}
                className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-lg border border-white/15 backdrop-blur-xs transition-colors"
              >
                {cap}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => {
          if (onSelectTrack) onSelectTrack(career.code)
          if (onApply) onApply(career.title)
        }}
        id={`btn-career-${career.id}`}
        className="operava-learn-more-btn relative z-10 mt-auto flex items-center justify-center gap-2"
      >
        <span>View {career.shortTitle || 'Role'}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  )
}
