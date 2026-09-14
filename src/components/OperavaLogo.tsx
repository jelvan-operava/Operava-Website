import { OPERAVA_LOGO_ALT, OPERAVA_LOGO_DATA_URL } from '../brand/operavaLogoData'

type OperavaLogoProps = {
  size?: number
  className?: string
  plateClassName?: string
  alt?: string
  priority?: boolean
  /** Soft scale pulse (AVA floating button, etc.) */
  breathe?: boolean
}

/** OPERAVA twisted mark — clean square on white, no edge rings or margins. */
export default function OperavaLogo({
  size = 40,
  className = '',
  plateClassName = '',
  alt = OPERAVA_LOGO_ALT,
  priority = false,
  breathe = false,
}: OperavaLogoProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-white rounded-lg flex items-center justify-center ${
        breathe ? 'ava-breathe' : ''
      } ${plateClassName} ${className}`}
      style={{ width: size, height: size }}
    >
      {breathe && (
        <style>{`
          @keyframes avaBreathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.045); }
          }
          .ava-breathe {
            animation: avaBreathe 3.6s ease-in-out infinite;
            will-change: transform;
          }
        `}</style>
      )}
      <img
        src={OPERAVA_LOGO_DATA_URL}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-cover pointer-events-none select-none"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
