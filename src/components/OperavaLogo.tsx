import { OPERAVA_LOGO_ALT, OPERAVA_LOGO_DATA_URL } from '../brand/operavaLogoData'

type OperavaLogoProps = {
  size?: number
  className?: string
  plateClassName?: string
  alt?: string
  priority?: boolean
}

/** OPERAVA twisted mark — always displayed on a white background plate. */
export default function OperavaLogo({
  size = 40,
  className = '',
  plateClassName = '',
  alt = OPERAVA_LOGO_ALT,
  priority = false,
}: OperavaLogoProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-white rounded-xl flex items-center justify-center ring-1 ring-black/5 ${plateClassName} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={OPERAVA_LOGO_DATA_URL}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-contain pointer-events-none select-none"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
