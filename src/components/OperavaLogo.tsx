import { OPERAVA_LOGO_ALT, OPERAVA_LOGO_DATA_URL } from '../brand/operavaLogoData'

type OperavaLogoProps = {
  size?: number
  className?: string
  plateClassName?: string
  alt?: string
  priority?: boolean
  breathe?: boolean
  transparent?: boolean
  wave?: boolean
}

/** OPERAVA twisted mark — clean square on white (nav/footer). AVA uses AvaVideoAvatar. */
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

  return (
    <div
      className={`relative shrink-0 overflow-hidden flex items-center justify-center ${
        transparent ? 'bg-transparent' : 'bg-white rounded-lg'
      } ${motion ? 'ava-logo-motion' : ''} ${plateClassName} ${className}`}
      style={{ width: size, height: size }}
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
        src={OPERAVA_LOGO_DATA_URL}
        alt={alt}
        width={size}
        height={size}
        className={`h-full w-full pointer-events-none select-none ${
          transparent ? 'object-contain' : 'object-cover'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
