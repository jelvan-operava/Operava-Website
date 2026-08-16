import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export interface BackgroundScene {
  id: string
  title: string
  subtitle: string
  url: string
  alt: string
}

export const LIVE_SCENES: BackgroundScene[] = [
  {
    id: 'global-network',
    title: 'Global Enterprise Network',
    subtitle: 'Connecting distributed clouds, systems and data',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    alt: 'Global network earth and interconnected digital infrastructure',
  },
  {
    id: 'tech-operations',
    title: 'Modern Operations Hub',
    subtitle: 'Dedicated global talent executing with precision',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Collaborative technology and operational workforce teamwork',
  },
  {
    id: 'cloud-data',
    title: 'Cloud & System Architecture',
    subtitle: 'Scalable engineering for enterprise workloads',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    alt: 'High-speed cloud computing and microprocessor technology architecture',
  },
  {
    id: 'corporate-scale',
    title: 'Enterprise Growth & Scale',
    subtitle: 'Strategic digital transformation for market leaders',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    alt: 'Modern architectural glass building reflecting high-growth business',
  },
]

export default function LiveBackground() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})

  // Preload images for buttery smooth crossfades
  useEffect(() => {
    LIVE_SCENES.forEach((scene, index) => {
      const img = new Image()
      img.src = scene.url
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }))
      }
    })
  }, [])

  const nextScene = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % LIVE_SCENES.length)
  }, [])

  const prevScene = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + LIVE_SCENES.length) % LIVE_SCENES.length)
  }, [])

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      nextScene()
    }, 7000)
    return () => clearInterval(timer)
  }, [isPlaying, nextScene])

  const activeScene = LIVE_SCENES[currentIndex]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {/* Background Image Carousel with Ken-Burns and Crossfade */}
      <div className="absolute inset-0">
        {LIVE_SCENES.map((scene, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-35 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '1200ms',
                transform: isActive ? 'scale(1.06)' : 'scale(1.0)',
              }}
            >
              <img
                src={scene.url}
                alt={scene.alt}
                className="w-full h-full object-cover object-center filter brightness-95 saturate-110"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          )
        })}
      </div>

      {/* Layered Gradient Scrims to guarantee pristine light-theme text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(109,40,217,0.12),transparent_60%)]" />

      {/* Subtle high-tech geometric grid */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(to right, #6D28D9 1px, transparent 1px), linear-gradient(to bottom, #6D28D9 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient floating glowing orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-400/15 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-12 left-1/4 w-80 h-80 rounded-full bg-indigo-300/10 blur-3xl" />

      {/* Interactive Floating Live Background Badge & Controls (Pointer events enabled for this mini bar) */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-20 pointer-events-auto hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-gray-200/80 shadow-md transition-all hover:bg-white">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-700 pr-2 border-r border-gray-200">
          <Sparkles className="w-3.5 h-3.5 text-violet-600 animate-pulse" />
          <span className="truncate max-w-[140px] font-semibold text-gray-900">{activeScene.title}</span>
        </div>

        <button
          onClick={() => setIsPlaying((p) => !p)}
          type="button"
          className="p-1 rounded-full text-gray-500 hover:text-violet-700 hover:bg-violet-50 transition-colors"
          title={isPlaying ? t('hero.bgPaused', 'Pause live visual') : t('hero.bgPlaying', 'Play live visual')}
          aria-label={isPlaying ? 'Pause live visuals' : 'Play live visuals'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>

        <button
          onClick={prevScene}
          type="button"
          className="p-1 rounded-full text-gray-500 hover:text-violet-700 hover:bg-violet-50 transition-colors"
          title="Previous visual scene"
          aria-label="Previous scene"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={nextScene}
          type="button"
          className="p-1 rounded-full text-gray-500 hover:text-violet-700 hover:bg-violet-50 transition-colors"
          title="Next visual scene"
          aria-label="Next scene"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Scene Indicator Dots */}
        <div className="flex items-center gap-1 pl-1">
          {LIVE_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setCurrentIndex(idx)}
              type="button"
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-4 bg-violet-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to scene ${idx + 1}: ${scene.title}`}
              title={scene.title}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
