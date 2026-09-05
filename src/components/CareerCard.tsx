import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { MapPin, Briefcase, Clock, Send, Plus, X } from 'lucide-react'

export interface CareerCardData {
  id: string
  code: string
  title: string
  shortTitle?: string
  summary?: string
  desc?: string
  assignments?: string[]
  qualifications?: string[]
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
  isFlipped?: boolean
  onFlipChange?: (flipped: boolean) => void
}

export default function CareerCard({
  career,
  variant = 'portrait',
  index = 0,
  onApply,
  onSelectTrack,
  className = '',
  isFlipped,
  onFlipChange,
}: CareerCardProps) {
  const [imgError, setImgError] = useState(false)
  const [internalFlipped, setInternalFlipped] = useState(false)
  const IconComponent = career.icon

  const flipped = typeof isFlipped === 'boolean' ? isFlipped : internalFlipped
  const setFlipped = (next: boolean | ((prev: boolean) => boolean)) => {
    const value = typeof next === 'function' ? next(flipped) : next
    if (onFlipChange) onFlipChange(value)
    else setInternalFlipped(value)
  }
  const toggleFlip = () => setFlipped(!flipped)

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
        <img
          src="https://res.cloudinary.com/b5i5bwwa/image/upload/v1788593069/Shell_card.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 rounded-[24px]"
          loading="lazy"
        />
        <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-5 flex-1">
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
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors">
                {career.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#e2dbff] max-w-2xl my-2.5 leading-relaxed font-normal">
                {career.desc || career.summary}
              </p>
            </div>
          </div>
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

  const positionLabel = career.shortTitle || career.title

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08 }}
      id={`career-card-${career.id}`}
      className={`operava-flip-scene w-full max-w-[360px] mx-auto md:max-w-none ${className}`}
    >
      <div
        className={`operava-flip-inner${flipped ? ' is-flipped' : ''}`}
        style={{ cursor: 'default' }}
      >
        {/* FRONT */}
        <div
          className="operava-flip-face operava-flip-face-front operava-card-frame operava-career-front group relative flex flex-col !p-[5px] h-full overflow-visible"
          aria-hidden={flipped}
        >
          <img
            src="https://res.cloudinary.com/b5i5bwwa/image/upload/Operava-contents-card.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 rounded-[20px]"
            loading="lazy"
          />

          {/* Model stage (clipped) */}
          <div className="relative z-10 flex-1 w-full min-h-0 overflow-hidden rounded-[14px] flex items-center justify-center">
            {career.image && !imgError ? (
              <img
                src={career.image}
                alt={career.title}
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="block w-full h-full object-contain object-center origin-center scale-[1.1]"
              />
            ) : IconComponent ? (
              <div className="flex items-center justify-center p-4">
                <IconComponent className="w-20 h-20 text-violet-300" />
              </div>
            ) : null}
          </div>

          {/*
            Outer-layer title bar:
            - Anchored to card base, then moved up by one full button height (~40px)
            - Horizontally centered on the card
            - Sits above the webp (overflows onto the model feet)
          */}
          <div
            className="pointer-events-none absolute z-30 left-1/2 -translate-x-1/2 bottom-[5px] w-[calc(100%-16px)] max-w-[calc(100%-16px)] flex items-center justify-center gap-2"
            style={{ transform: 'translate(-50%, -100%)' }}
          >
            <div
              className="operava-learn-more-btn pointer-events-none !py-2.5 !px-3 !text-[11px] sm:!text-xs !tracking-wide flex-1 flex items-center justify-center text-center select-none cursor-default shadow-md min-h-[40px]"
              aria-hidden="true"
            >
              <span className="line-clamp-1 text-center w-full">{positionLabel}</span>
            </div>

            <button
              type="button"
              aria-label={flipped ? `Hide details for ${career.title}` : `Show details for ${career.title}`}
              aria-pressed={flipped}
              onClick={(e) => {
                e.stopPropagation()
                toggleFlip()
              }}
              id={`btn-flip-${career.id}`}
              className="pointer-events-auto shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#5e42be] flex items-center justify-center shadow-md border border-white/80 hover:scale-105 active:scale-95 transition-transform"
            >
              <Plus
                className={`w-4 h-4 transition-transform duration-500 ease-out ${flipped ? 'rotate-45' : 'rotate-0'}`}
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>

        <div
          className="operava-flip-face operava-flip-face-back operava-card-frame flex flex-col items-stretch justify-between overflow-hidden"
          aria-hidden={!flipped}
        >
          <img
            src="https://res.cloudinary.com/b5i5bwwa/image/upload/Operava-contents-card.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 rounded-[20px]"
            loading="lazy"
          />

          <div className="relative z-10 w-full h-full flex flex-col min-h-0">
            <div className="flex items-start justify-between gap-2 mb-2 shrink-0">
              <div className="pr-2">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
                  {positionLabel}
                </h3>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-200/90 mt-0.5">
                  100% Remote
                </p>
              </div>
              <button
                type="button"
                aria-label="Flip card back"
                onClick={(e) => {
                  e.stopPropagation()
                  setFlipped(false)
                }}
                className="shrink-0 w-8 h-8 rounded-full bg-white text-[#5e42be] flex items-center justify-center shadow-md border border-white/80 hover:scale-105 active:scale-95 transition-transform"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>

            <p className="text-xs text-[#e2dbff] leading-relaxed mb-2 shrink-0">
              {career.summary || career.desc}
            </p>

            <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
              {career.assignments && career.assignments.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-violet-200/90 mb-1.5">
                    Core Remote Assignments
                  </p>
                  <ul className="space-y-1">
                    {career.assignments.map((item, i) => (
                      <li key={i} className="text-[11px] text-white/90 leading-snug pl-2 border-l-2 border-violet-400/50">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {career.qualifications && career.qualifications.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-violet-200/90 mb-1.5">
                    Qualifications
                  </p>
                  <ul className="space-y-1">
                    {career.qualifications.map((item, i) => (
                      <li key={i} className="text-[11px] text-white/90 leading-snug pl-2 border-l-2 border-white/25">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-3 shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setFlipped(false)
                  if (onSelectTrack) onSelectTrack(career.code)
                  if (onApply) onApply(career.title)
                }}
                className="operava-learn-more-btn !py-2 !px-3 !text-[10px] !tracking-wide flex-1 flex items-center justify-center"
              >
                <span className="line-clamp-1">Apply Remotely — {positionLabel}</span>
              </button>
              <button
                type="button"
                aria-label="Flip card back"
                onClick={(e) => {
                  e.stopPropagation()
                  setFlipped(false)
                }}
                className="shrink-0 w-9 h-9 rounded-full bg-white text-[#5e42be] flex items-center justify-center shadow-md border border-white/80"
              >
                <Plus className="w-4 h-4 rotate-45" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
