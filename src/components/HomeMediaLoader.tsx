import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, Loader2, Sparkles, Video, ShieldCheck, Zap } from 'lucide-react'

interface AssetToLoad {
  id: string
  name: string
  type: 'video' | 'image'
  url: string
}

const CRITICAL_ASSETS: AssetToLoad[] = [
  {
    id: 'cover-photo',
    name: 'Hero Visual Cover',
    type: 'image',
    url: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1786240859/Cover%20Photo.png',
  },
  {
    id: 'cap-tech',
    name: 'Technology & Cloud Video',
    type: 'video',
    url: 'https://res.cloudinary.com/mgyosgsm/video/upload/Video_otwv5l.mp4',
  },
  {
    id: 'cap-workforce',
    name: 'Global Workforce Video',
    type: 'video',
    url: 'https://res.cloudinary.com/mgyosgsm/video/upload/Video_nmdtfe.mp4',
  },
  {
    id: 'cap-bpo',
    name: 'Business Processes Video',
    type: 'video',
    url: 'https://res.cloudinary.com/mgyosgsm/video/upload/Video_pmorrn.mp4',
  },
  {
    id: 'brand-logo',
    name: 'OPERAVA Motion Logo',
    type: 'video',
    url: 'https://res.cloudinary.com/mgyosgsm/video/upload/Video_ffvnwd.mp4',
  },
  {
    id: 'ava-avatar',
    name: 'AVA Intelligence Stream',
    type: 'video',
    url: 'https://res.cloudinary.com/mgyosgsm/video/upload/Video_vpaaxl.mp4',
  },
]

interface HomeMediaLoaderProps {
  onLoadingComplete?: () => void
}

export default function HomeMediaLoader({ onLoadingComplete }: HomeMediaLoaderProps) {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({})
  const [displayProgress, setDisplayProgress] = useState(12)
  const [statusText, setStatusText] = useState('Initializing OPERAVA Systems...')
  const [isFinished, setIsFinished] = useState(false)
  const [shouldUnmount, setShouldUnmount] = useState(false)

  const startTimeRef = useRef(Date.now())
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    // Disable body scroll while loading
    document.body.style.overflow = 'hidden'

    const total = CRITICAL_ASSETS.length
    let loadedCount = 0

    const markLoaded = (id: string) => {
      setCompletedMap((prev) => {
        if (prev[id]) return prev
        const next = { ...prev, [id]: true }
        loadedCount = Object.keys(next).length
        return next
      })
    }

    // Preload each asset
    const videoElements: HTMLVideoElement[] = []
    const imageElements: HTMLImageElement[] = []

    CRITICAL_ASSETS.forEach((asset) => {
      if (asset.type === 'video') {
        const vid = document.createElement('video')
        vid.preload = 'auto'
        vid.muted = true
        vid.playsInline = true
        vid.crossOrigin = 'anonymous'

        let resolved = false
        const handleReady = () => {
          if (!resolved) {
            resolved = true
            markLoaded(asset.id)
          }
        }

        vid.onloadeddata = handleReady
        vid.oncanplay = handleReady
        vid.oncanplaythrough = handleReady
        vid.onerror = handleReady // graceful fallback

        vid.src = asset.url
        vid.load()
        videoElements.push(vid)
      } else {
        const img = new Image()
        img.referrerPolicy = 'no-referrer'
        let resolved = false
        const handleReady = () => {
          if (!resolved) {
            resolved = true
            markLoaded(asset.id)
          }
        }
        img.onload = handleReady
        img.onerror = handleReady
        img.src = asset.url
        imageElements.push(img)
      }
    })

    // Safety fallback timeout: maximum 4.2s to guarantee smooth loading even on slow 3G
    const fallbackTimer = setTimeout(() => {
      CRITICAL_ASSETS.forEach((a) => markLoaded(a.id))
    }, 4200)

    return () => {
      clearTimeout(fallbackTimer)
      document.body.style.overflow = ''
      videoElements.forEach((v) => {
        v.src = ''
        v.remove()
      })
      imageElements.forEach((img) => {
        img.src = ''
      })
    }
  }, [])

  // Smooth Progress & Status Updater Loop
  useEffect(() => {
    const total = CRITICAL_ASSETS.length

    const interval = setInterval(() => {
      const actualCount = Object.values(completedMap).filter(Boolean).length
      const targetPercent = Math.min(100, Math.round((actualCount / total) * 100))

      setDisplayProgress((prev) => {
        if (prev < targetPercent) {
          return Math.min(targetPercent, prev + Math.max(2, Math.round((targetPercent - prev) * 0.25)))
        } else if (prev < 90 && actualCount < total) {
          // Slow trickle progress while waiting
          return prev + 0.5
        }
        return prev
      })
    }, 45)

    return () => clearInterval(interval)
  }, [completedMap])

  // Update status messages according to progress
  useEffect(() => {
    if (displayProgress < 25) {
      setStatusText('Connecting to OPERAVA Cloud Ingress...')
    } else if (displayProgress < 50) {
      setStatusText('Preloading High-Definition Capabilities Videos...')
    } else if (displayProgress < 75) {
      setStatusText('Buffering Technology, Workforce & BPO Streams...')
    } else if (displayProgress < 95) {
      setStatusText('Optimizing GPU Acceleration & Video Canvas...')
    } else {
      setStatusText('All Systems & Media Streams Loaded. Launching...')
    }

    if (displayProgress >= 100 && !hasFinishedRef.current) {
      hasFinishedRef.current = true
      const elapsed = Date.now() - startTimeRef.current
      const delay = Math.max(300, 700 - elapsed)

      setTimeout(() => {
        setIsFinished(true)
        document.body.style.overflow = ''
        if (onLoadingComplete) {
          onLoadingComplete()
        }

        // Unmount DOM element after exit transition
        setTimeout(() => {
          setShouldUnmount(true)
        }, 800)
      }, delay)
    }
  }, [displayProgress, onLoadingComplete])

  if (shouldUnmount) return null

  const pct = Math.min(100, Math.round(displayProgress))

  return (
    <div
      id="operava-home-loader"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-gray-900 transition-all duration-700 select-none ${
        isFinished ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(139, 92, 246, 0.12), rgba(255, 255, 255, 0.98)), radial-gradient(circle at 50% 120%, rgba(217, 70, 239, 0.08), transparent)',
      }}
      aria-label="Loading OPERAVA Homepage"
      role="status"
    >
      {/* Background Ambient Grid Accent */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(124, 58, 237, 0.25) 1px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center text-center">
        {/* Animated Brand Core Emblem with Glowing Rings */}
        <div className="relative mb-8">
          {/* Pulsing Outer Gradient Ring */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-300 to-purple-400 opacity-40 blur-xl animate-pulse-slow" />

          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] shadow-xl flex items-center justify-center bg-white"
            style={{
              background: 'conic-gradient(from 0deg, #8A2BE2, #FF00FF, #7F00FF, #8A2BE2)',
              boxShadow: '0 10px 30px rgba(138, 43, 226, 0.25), inset 0 0 10px rgba(255, 0, 255, 0.35)',
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover pointer-events-none"
              >
                <source src="https://res.cloudinary.com/mgyosgsm/video/upload/Video_vpaaxl.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Mini active pulse indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center shadow-md">
            <Zap className="w-3 h-3 text-white fill-white" />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200/80 text-violet-800 text-xs font-semibold uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>OPERAVA Global Solutions</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
            We Operate in Advance
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-mono tracking-wider">
            Enterprise Technology &bull; Cloud &bull; BPO Operations
          </p>
        </div>

        {/* Progress Bar with Glowing Head */}
        <div className="w-full bg-gray-100 border border-gray-200/90 rounded-full h-2.5 p-0.5 mb-3 overflow-hidden relative shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-500 transition-all duration-150 ease-out relative shadow-sm"
            style={{ width: `${pct}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-3 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          </div>
        </div>

        {/* Percentage and Dynamic Status Text */}
        <div className="w-full flex items-center justify-between text-xs text-gray-500 mb-6 font-mono">
          <span className="truncate max-w-[260px] text-left text-gray-700 font-medium flex items-center gap-1.5">
            {pct < 100 ? (
              <Loader2 className="w-3.5 h-3.5 text-violet-600 animate-spin shrink-0" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            )}
            <span className="truncate">{statusText}</span>
          </span>
          <span className="font-bold text-violet-700 text-sm ml-2">{pct}%</span>
        </div>

        {/* Interactive Asset Checklist Grid */}
        <div className="w-full grid grid-cols-2 gap-2 text-left pt-2 border-t border-gray-100">
          {CRITICAL_ASSETS.slice(0, 4).map((asset) => {
            const isReady = !!completedMap[asset.id]
            return (
              <div
                key={asset.id}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-[11px] border transition-all duration-300 ${
                  isReady
                    ? 'bg-violet-50/90 border-violet-200 text-violet-900 font-medium shadow-xs'
                    : 'bg-gray-50/80 border-gray-200 text-gray-500'
                }`}
              >
                {isReady ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <Video className="w-3.5 h-3.5 text-gray-400 animate-pulse shrink-0" />
                )}
                <span className="truncate font-medium">{asset.name.replace(' Video', '')}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
