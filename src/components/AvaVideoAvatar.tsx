import { useRef, useEffect, useCallback } from 'react'

interface AvaVideoAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  className?: string
  showGlow?: boolean
}

export default function AvaVideoAvatar({
  size = 'md',
  className = '',
  showGlow = true,
}: AvaVideoAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const ensurePlayback = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry playback on next tick if restricted by policy
          setTimeout(() => {
            if (video && video.paused) {
              video.muted = true
              video.play().catch(() => {})
            }
          }, 100)
        })
      }
    }
  }, [])

  useEffect(() => {
    ensurePlayback()

    const video = videoRef.current
    if (!video) return

    // Auto-resume if accidentally paused or when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        ensurePlayback()
      }
    }

    const handleUserTouchOrClick = () => {
      ensurePlayback()
    }

    const handlePause = () => {
      // Re-trigger play immediately to prevent any frozen frame or browser pause UI
      ensurePlayback()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleVisibilityChange)
    window.addEventListener('touchstart', handleUserTouchOrClick, { passive: true })
    window.addEventListener('click', handleUserTouchOrClick, { passive: true })
    video.addEventListener('pause', handlePause)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleVisibilityChange)
      window.removeEventListener('touchstart', handleUserTouchOrClick)
      window.removeEventListener('click', handleUserTouchOrClick)
      video.removeEventListener('pause', handlePause)
    }
  }, [ensurePlayback])

  let sizeClass = 'w-10 h-10'
  let paddingClass = 'p-[2.5px]'
  let shadowStyle = showGlow
    ? '0 0 14px rgba(138, 43, 226, 0.8), inset 0 0 10px rgba(255, 0, 255, 0.45)'
    : 'none'

  if (typeof size === 'number') {
    return (
      <div
        className={`rounded-full shrink-0 relative select-none pointer-events-none ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          padding: `${Math.max(2, Math.round(size * 0.045))}px`,
          background: 'conic-gradient(from 0deg, #8A2BE2, #FF00FF, #7F00FF, #8A2BE2)',
          boxShadow: shadowStyle,
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-black relative pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            tabIndex={-1}
            aria-hidden="true"
            className="w-full h-full object-cover block pointer-events-none select-none no-media-controls"
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true
              e.currentTarget.play().catch(() => {})
            }}
            onLoadedData={(e) => {
              e.currentTarget.muted = true
              e.currentTarget.play().catch(() => {})
            }}
            onCanPlay={(e) => {
              e.currentTarget.play().catch(() => {})
            }}
          >
            <source
              src="https://res.cloudinary.com/mgyosgsm/video/upload/Video_vpaaxl.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    )
  }

  if (size === 'sm') {
    sizeClass = 'w-7 h-7'
    paddingClass = 'p-[2px]'
    shadowStyle = showGlow
      ? '0 0 10px rgba(138, 43, 226, 0.7), inset 0 0 6px rgba(255, 0, 255, 0.4)'
      : 'none'
  } else if (size === 'md') {
    sizeClass = 'w-10 h-10'
    paddingClass = 'p-[2.5px]'
    shadowStyle = showGlow
      ? '0 0 14px rgba(138, 43, 226, 0.8), inset 0 0 10px rgba(255, 0, 255, 0.45)'
      : 'none'
  } else if (size === 'lg') {
    sizeClass = 'w-12 h-12'
    paddingClass = 'p-[3px]'
    shadowStyle = showGlow
      ? '0 0 20px rgba(138, 43, 226, 0.85), inset 0 0 14px rgba(255, 0, 255, 0.5)'
      : 'none'
  } else if (size === 'xl') {
    sizeClass = 'w-16 h-16 sm:w-20 sm:h-20'
    paddingClass = 'p-[4px]'
    shadowStyle = showGlow
      ? '0 0 28px rgba(138, 43, 226, 0.95), inset 0 0 18px rgba(255, 0, 255, 0.6)'
      : 'none'
  }

  return (
    <div
      className={`rounded-full shrink-0 relative select-none pointer-events-none ${sizeClass} ${paddingClass} ${className}`}
      style={{
        background: 'conic-gradient(from 0deg, #8A2BE2, #FF00FF, #7F00FF, #8A2BE2)',
        boxShadow: shadowStyle,
      }}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-black relative pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          aria-hidden="true"
          className="w-full h-full object-cover block pointer-events-none select-none no-media-controls"
          onLoadedMetadata={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.play().catch(() => {})
          }}
          onLoadedData={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.play().catch(() => {})
          }}
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => {})
          }}
        >
          <source
            src="https://res.cloudinary.com/mgyosgsm/video/upload/Video_vpaaxl.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  )
}
