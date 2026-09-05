import { useState, useEffect, useRef } from 'react'

export interface OperavaCoverSlide {
  id: string
  name: string
  src: string
}

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
  {
    id: 'operava-cover-5',
    name: 'Operava Cover 5',
    src: 'https://res.cloudinary.com/b5i5bwwa/image/upload/v1788584249/Operava-cover5.webp',
  },
] as const

interface OperavaCoverProps {
  className?: string
}

export default function OperavaCover({ className = '' }: OperavaCoverProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const fadeCleanupRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Preload all 5 images immediately to prevent any blank frames or loading flash
    OPERAVA_COVERS.forEach((cover) => {
      const img = new Image()
      img.referrerPolicy = 'no-referrer'
      img.src = cover.src
    })

    // Auto-advance every 7 seconds in strictly sequential order
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % OPERAVA_COVERS.length
        setPreviousIndex(prevIndex)

        if (fadeCleanupRef.current) {
          clearTimeout(fadeCleanupRef.current)
        }
        // The crossfade duration is ~2.4s. Retire previous slide after transition finishes.
        fadeCleanupRef.current = setTimeout(() => {
          setPreviousIndex(null)
        }, 2600)

        return nextIndex
      })
    }, 7000)

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
      className={`relative w-full lg:absolute lg:inset-0 lg:w-full lg:h-full overflow-hidden pointer-events-none z-0 ${className}`}
    >
      {/* Invisible aspect-ratio spacer for mobile and tablet to preserve exact container height with 0 layout shift */}
      <img
        src={OPERAVA_COVERS[0].src}
        alt=""
        aria-hidden="true"
        width={2112}
        height={1168}
        className="w-full h-auto block invisible pointer-events-none select-none lg:hidden"
        loading="eager"
      />

      {/* 5 Seamless Cinematic Crossfade Slides */}
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
              transition: isPrevious
                ? 'none'
                : 'opacity 2400ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity',
            }}
          >
            <img
              src={cover.src}
              alt={cover.name}
              width={2112}
              height={1168}
              className="w-full h-full object-contain object-center lg:object-cover lg:object-center block pointer-events-none select-none"
              style={{
                transform: isCurrent ? 'scale(1.025)' : 'scale(1.0)',
                transition: isCurrent
                  ? 'transform 9000ms cubic-bezier(0.25, 1, 0.5, 1)'
                  : 'transform 0ms',
                willChange: 'transform',
              }}
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
        )
      })}
    </div>
  )
}
