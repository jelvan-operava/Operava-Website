/** Canonical OPERAVA mark — always rendered on a white background. */

const LOGO_SRC = '/operava-logo.jpg'
const LOGO_FALLBACK = '/operava-logo.svg'

type OperavaLogoProps = {
  /** Outer box size in px (square). */
  size?: number
  className?: string
  /** Extra classes on the white plate behind the mark. */
  plateClassName?: string
  alt?: string
  priority?: boolean
}

export default function OperavaLogo({
  size = 40,
  className = '',
  plateClassName = '',
  alt = 'OPERAVA',
  priority = false,
}: OperavaLogoProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-white flex items-center justify-center ${plateClassName} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={alt ? undefined : true}
    >
      <img
        src={LOGO_SRC}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-contain pointer-events-none select-none"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => {
          const el = e.currentTarget
          if (el.src.includes('operava-logo.jpg')) {
            el.src = LOGO_FALLBACK
          }
        }}
      />
    </div>
  )
}
