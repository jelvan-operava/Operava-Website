import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

export interface DepartmentEmailItem {
  id: string
  email: string
  image: string
}

export const departmentalEmails: DepartmentEmailItem[] = [
  {
    id: 'client-support',
    email: 'hello@operavaglobal.com',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787462467/Client%20Team%20-%20Email.png',
  },
  {
    id: 'human-resources',
    email: 'hr@operavaglobal.com',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787462462/Human%20Resources%20Team%20-%20Email.png',
  },
  {
    id: 'customer-service',
    email: 'cs@operavaglobal.com',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787462456/Customer%20Service%20Team%20-%20Email.png',
  },
  {
    id: 'compliance-team',
    email: 'compliance@operavaglobal.com',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787462474/Compliance%20Team%20-%20Email.png',
  },
]

interface EmailDirectoryCarouselProps {
  className?: string
}

export default function EmailDirectoryCarousel({ className = '' }: EmailDirectoryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselContainerRef = useRef<HTMLDivElement>(null)

  const totalItems = departmentalEmails.length

  // Touch swipe support
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  // Calculate items per view dynamically based on screen width
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setItemsPerView(1)
        } else if (window.innerWidth < 1024) {
          setItemsPerView(2)
        } else {
          setItemsPerView(3)
        }
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const maxIndex = Math.max(0, totalItems - itemsPerView)

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return

    const timer = setInterval(() => {
      handleNext()
    }, 4500)

    return () => clearInterval(timer)
  }, [isAutoPlaying, isHovered, handleNext])

  return (
    <div
      className={`relative w-full ${className}`}
      aria-label="Departmental Email Directory"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Direct Departmental Inquiries
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Reach our specialized teams directly for expedited support & scope planning
          </p>
        </div>

        {/* Carousel Action Bar (Prev / Next / Autoplay indicator) */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            aria-label={isAutoPlaying ? 'Pause email directory autoplay' : 'Play email directory autoplay'}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 hover:text-gray-900 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            title={isAutoPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-violet-600" />}
            <span className="hidden md:inline font-mono text-[11px]">
              {isAutoPlaying ? 'Auto' : 'Paused'}
            </span>
          </button>

          <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-xl p-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous department"
              className="p-1.5 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-white active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-2 text-xs font-mono text-gray-500 border-x border-gray-200">
              <span className="text-gray-900 font-bold">{activeIndex + 1}</span>
              <span className="text-gray-400"> / {maxIndex + 1}</span>
            </div>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next department"
              className="p-1.5 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-white active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div
        className="relative overflow-hidden rounded-2xl touch-pan-y"
        ref={carouselContainerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          className="flex transition-transform ease-out"
          animate={{
            x: `-${activeIndex * (100 / itemsPerView)}%`,
          }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {departmentalEmails.map((dept) => (
            <div
              key={dept.id}
              style={{ flex: `0 0 ${100 / itemsPerView}%` }}
              className="px-2 sm:px-3"
            >
              <a
                href={`mailto:${dept.email}`}
                className="group relative block w-full bg-transparent rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                title={`Click to email ${dept.email}`}
              >
                {/* Image fits full frame naturally without border lines or color highlights */}
                <div className="w-full flex items-center justify-center bg-transparent overflow-hidden rounded-2xl">
                  <img
                    src={dept.image}
                    alt={dept.email}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </a>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Indicators / Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
          const isActive = activeIndex === idx
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-7 bg-violet-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
