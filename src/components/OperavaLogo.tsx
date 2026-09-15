import { OPERAVA_LOGO_ALT, OPERAVA_LOGO_DATA_URL } from '../brand/operavaLogoData'

/** Same Cloudinary asset as AVA — true alpha PNG, no white square. */
export const OPERAVA_LOGO_CDN =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/c_fit,w_256,h_256,f_png,q_auto/Operava%20Logo.png'

type OperavaLogoProps = {
  size?: number
  className?: string
  plateClassName?: string
  alt?: string
  priority?: boolean
  breathe?: boolean
  /** When true: Cloudinary transparent PNG, no white plate — blends with nav/page background. */
  transparent?: boolean
  wave?: boolean
}

/**
 * OPERAVA twisted mark.
 * - transparent (nav): official Cloudinary PNG with full alpha — no white square.
 * - default: white-plate raster for contexts that need a solid badge.
 */
export default function OperavaLogo({
  size = 40,
  className = '',
  plateClassName = '',
  alt = OPERAVA_LOGO_ALT,
  priority = false,
  breathe = false,
  transparent = false,
  wave = false,
}: OperavaLogoProps) {
  const motion = breathe || wave
  const src = transparent ? OPERAVA_LOGO_CDN : OPERAVA_LOGO_DATA_URL

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center ${
        transparent
          ? 'bg-transparent overflow-visible'
          : 'bg-white rounded-lg overflow-hidden'
      } ${motion ? 'ava-logo-motion' : ''} ${plateClassName} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: transparent ? 'transparent' : undefined,
      }}
    >
      {motion && (
        <style>{`
          @keyframes avaLogoMotion {
            0%   { transform: scale(1) rotate(0deg) translateY(0); }
            25%  { transform: scale(1.04) rotate(2.2deg) translateY(-1.5px); }
            50%  { transform: scale(1.06) rotate(0deg) translateY(-2.5px); }
            75%  { transform: scale(1.04) rotate(-2.2deg) translateY(-1.5px); }
            100% { transform: scale(1) rotate(0deg) translateY(0); }
          }
          .ava-logo-motion {
            animation: avaLogoMotion 4.2s ease-in-out infinite;
            will-change: transform;
            transform-origin: center center;
          }
        `}</style>
      )}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-contain pointer-events-none select-none bg-transparent"
        style={{ background: 'transparent', boxShadow: 'none' }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  )
}
