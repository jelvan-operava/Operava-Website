import { useState, useEffect, useRef } from 'react'

export interface OperavaCoverSlide {
  id: string
  name: string
  src: string
}

/**
 * Four approved hero states only.
 * Images already contain the people + OPERAVA 3D/ribbon lettering.
 * OPERAVA is treated as the fixed visual anchor across all states.
 * Do not generate, redraw, or substitute these assets.
 */
export const OPERAVA_COVERS: readonly OperavaCoverSlide[] = [
  {
    id: 'operava-cover-1',
    name: 'Operava Cover 1',
    src: 'https://res.cloudinary.com/b5i5bwwa/image/upload/v1788584251/Operava-cover1.webp',
  },
  {
    id: 'operava-cover-2',
    name: 'Operava Cover 2',
    src: 'https://res.cloudinary.com/b5i5bwwa/image/upload/v1788584250/Operava-cover2.webp',
  },
  {
    id: 'operava-cover-3',
    name: 'Operava Cover 3',
    src: 'https://res.cloudinary.com/b5i5bwwa/image/upload/v1788584250/Operava-cover3.webp',
  },
  {
    id: 'operava-cover-4',
    name: 'Operava Cover 4',
    src: 'https://res.cloudinary.com/b5i5bwwa/image/upload/v1788584250/Operava-cover4.webp',
  },
] as const

/** Native artboard size shared by all four approved images */
const HERO_W = 2112
const HERO_H = 1168

interface OperavaCoverProps {
  className?: string
}

export default function OperavaCover({ className = '' }: OperavaCoverProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const fadeCleanupRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Preload all states immediately so crossfades never flash empty frames
    OPERAVA_COVERS.forEach((cover) => {
      const img = new Image()
      img.referrerPolicy = 'no-referrer'
      img.src = cover.src
    })

    // Sequential 1 → 2 → 3 → 4 → 1
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % OPERAVA_COVERS.length
        setPreviousIndex(prevIndex)

        if (fadeCleanupRef.current) {
          clearTimeout(fadeCleanupRef.current)
        }
        // Retire previous layer after the opacity transition finishes
        fadeCleanupRef.current = setTimeout(() => {
          setPreviousIndex(null)
        }, 800)

        return nextIndex
      })
    }, 5500)

    return () => {
      clearInterval(intervalId)
      if (fadeCleanupRef.current) {
        clearTimeout(fadeCleanupRef.current)
      }
    }
  }, [])

  return (
    <div
      id="operava-cover-container"
      className={`relative w-full overflow-hidden bg-white pointer-events-none select-none ${className}`}
      style={{ aspectRatio: `${HERO_W} / ${HERO_H}` }}
    >
      {/*
        Stable stage: every image occupies the exact same visual frame.
        object-contain + identical native dimensions keep OPERAVA lettering
        locked in horizontal/vertical position and scale across all states.
        No scale, zoom, Ken Burns, slide, rotate, or progressive crop.
      */}
      {OPERAVA_COVERS.map((cover, index) => {
        const isCurrent = index === currentIndex
        const isPrevious = index === previousIndex
        const isVisible = isCurrent || isPrevious

        return (
          <div
            key={cover.id}
            id={`operava-cover-slide-${index + 1}`}
            aria-hidden={!isCurrent}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
            style={{
              zIndex: isCurrent ? 2 : isPrevious ? 1 : 0,
              opacity: isVisible ? 1 : 0,
              // Previous layer stays fully opaque with no transition so the
              // incoming layer can crossfade over a stable base.
              transition: isPrevious
                ? 'none'
                : 'opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: isVisible ? 'opacity' : 'auto',
            }}
          >
            <img
              src={cover.src}
              alt={cover.name}
              width={HERO_W}
              height={HERO_H}
              className="block w-full h-full object-contain object-center pointer-events-none select-none"
              // CRITICAL: no transform, no scale, no animation on the image itself
              style={{
                transform: 'none',
                transition: 'none',
              }}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
            />
          </div>
        )
      })}
    </div>
  )
}
