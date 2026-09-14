import { useEffect, useState } from 'react'
import { OPERAVA_LOGO_DATA_URL } from '../brand/operavaLogoData'

interface AvaVideoAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  className?: string
  showGlow?: boolean
}

const SIZE_MAP = {
  sm: 28,
  md: 40,
  lg: 48,
  xl: 80,
} as const

/** Cache transparent data URL derived from white-plate logo (knock out near-white). */
let cachedTransparent: string | null = null

function buildTransparentLogo(): Promise<string> {
  if (cachedTransparent) return Promise.resolve(cachedTransparent)
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const size = 128
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(OPERAVA_LOGO_DATA_URL)
        return
      }
      ctx.clearRect(0, 0, size, size)
      ctx.drawImage(img, 0, 0, size, size)
      const imageData = ctx.getImageData(0, 0, size, size)
      const d = imageData.data
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i]
        const g = d[i + 1]
        const b = d[i + 2]
        // Knock out near-white / light plate so mark sits on transparent
        if (r > 245 && g > 245 && b > 245) {
          d[i + 3] = 0
        } else if (r > 230 && g > 230 && b > 230) {
          d[i + 3] = Math.min(d[i + 3], 40)
        }
      }
      ctx.putImageData(imageData, 0, 0)
      cachedTransparent = canvas.toDataURL('image/png')
      resolve(cachedTransparent)
    }
    img.onerror = () => resolve(OPERAVA_LOGO_DATA_URL)
    img.src = OPERAVA_LOGO_DATA_URL
  })
}

/**
 * AVA avatar — transparent OPERAVA twisted mark,
 * soft breathe + gentle wave.
 */
export default function AvaVideoAvatar({
  size = 'md',
  className = '',
  showGlow = false,
}: AvaVideoAvatarProps) {
  const px = typeof size === 'number' ? size : SIZE_MAP[size] ?? 40
  const [src, setSrc] = useState(OPERAVA_LOGO_DATA_URL)

  useEffect(() => {
    let cancelled = false
    buildTransparentLogo().then((url) => {
      if (!cancelled) setSrc(url)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className={`relative shrink-0 select-none pointer-events-none ava-logo-motion ${className}`}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes avaLogoMotion {
          0%   { transform: scale(1) rotate(0deg) translateY(0); }
          25%  { transform: scale(1.045) rotate(2.4deg) translateY(-2px); }
          50%  { transform: scale(1.07) rotate(0deg) translateY(-3px); }
          75%  { transform: scale(1.045) rotate(-2.4deg) translateY(-2px); }
          100% { transform: scale(1) rotate(0deg) translateY(0); }
        }
        .ava-logo-motion {
          animation: avaLogoMotion 4.2s ease-in-out infinite;
          will-change: transform;
          transform-origin: center center;
        }
      `}</style>
      <img
        src={src}
        alt="AVA"
        width={px}
        height={px}
        className={`h-full w-full object-contain pointer-events-none select-none bg-transparent ${
          showGlow ? 'drop-shadow-[0_0_14px_rgba(109,40,217,0.45)]' : ''
        }`}
        decoding="async"
      />
    </div>
  )
}
