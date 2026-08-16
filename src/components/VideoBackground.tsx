import { useState } from 'react'

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

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterUrl}
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-125"
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
