import { useRef, useEffect } from 'react'

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

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      video.play().catch(() => {
        // Autoplay policy handled silently
      })
    }
  }, [])

  let sizeClass = 'w-10 h-10'
  let paddingClass = 'p-[2.5px]'
  let shadowStyle = showGlow
    ? '0 0 14px rgba(138, 43, 226, 0.8), inset 0 0 10px rgba(255, 0, 255, 0.45)'
    : 'none'

  if (typeof size === 'number') {
    return (
      <div
        className={`rounded-full shrink-0 relative ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          padding: `${Math.max(2, Math.round(size * 0.045))}px`,
          background: 'conic-gradient(from 0deg, #8A2BE2, #FF00FF, #7F00FF, #8A2BE2)',
          boxShadow: shadowStyle,
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            className="w-full h-full object-cover block pointer-events-none"
            onLoadedMetadata={(e) => {
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
      className={`rounded-full shrink-0 relative ${sizeClass} ${paddingClass} ${className}`}
      style={{
        background: 'conic-gradient(from 0deg, #8A2BE2, #FF00FF, #7F00FF, #8A2BE2)',
        boxShadow: shadowStyle,
      }}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          className="w-full h-full object-cover block pointer-events-none"
          onLoadedMetadata={(e) => {
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
