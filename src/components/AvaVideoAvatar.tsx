import OperavaLogo from './OperavaLogo'

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

/**
 * AVA avatar — same OPERAVA twisted mark as the site logo,
 * soft smooth breathing (no video, no edge rings).
 */
export default function AvaVideoAvatar({
  size = 'md',
  className = '',
  showGlow = false,
}: AvaVideoAvatarProps) {
  const px = typeof size === 'number' ? size : SIZE_MAP[size] ?? 40

  return (
    <div
      className={`relative shrink-0 select-none pointer-events-none ${className}`}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <OperavaLogo
        size={px}
        breathe
        priority
        alt="AVA"
        className={showGlow ? 'shadow-[0_0_20px_rgba(109,40,217,0.35)]' : ''}
      />
    </div>
  )
}
