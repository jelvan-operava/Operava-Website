/** Official OPERAVA mark (Cloudinary) — used for AVA. */
export const OPERAVA_LOGO_CDN =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/c_fit,w_256,h_256,f_png,q_auto/Operava%20Logo.png'

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
 * AVA avatar — official OPERAVA logo (transparent PNG),
 * soft breathe + gentle wave.
 */
export default function AvaVideoAvatar({
  size = 'md',
  className = '',
  showGlow = false,
}: AvaVideoAvatarProps) {
  const px = typeof size === 'number' ? size : SIZE_MAP[size] ?? 40

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
        src={OPERAVA_LOGO_CDN}
        alt="AVA"
        width={px}
        height={px}
        className={`h-full w-full object-contain pointer-events-none select-none bg-transparent ${
          showGlow ? 'drop-shadow-[0_0_14px_rgba(109,40,217,0.45)]' : ''
        }`}
        decoding="async"
        loading="eager"
      />
    </div>
  )
}
