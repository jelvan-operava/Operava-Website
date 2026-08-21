import { useState, useRef, useEffect } from 'react'

interface VideoBackgroundProps {
  videoUrl?: string
  posterUrl?: string
  overlayOpacity?: string
  className?: string
}

export default function VideoBackground({
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-data-31912-large.mp4',
  posterUrl = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
  overlayOpacity = 'bg-gray-950/80',
  className = '',
}: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      video.play().catch(() => {})
    }
  }, [videoUrl])

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}>
      {!videoError ? (
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
          poster={posterUrl}
          onError={() => setVideoError(true)}
          onLoadedMetadata={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.play().catch(() => {})
          }}
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => {})
          }}
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-125 pointer-events-none select-none no-media-controls"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <img src={posterUrl} alt="Background visual" className="w-full h-full object-cover object-center" />
      )}
      <div className={`absolute inset-0 ${overlayOpacity}`} />
    </div>
  )
}
