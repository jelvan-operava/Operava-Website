import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const MOBILE_SRC =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/Intro-mobile-overlay.webp'
const DESKTOP_SRC =
  'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/desktop_intro_overlay.webp'

const BREAKPOINT_PX = 768
const MANDATORY_MS = 8000
const FADE_MS = 420

function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${BREAKPOINT_PX - 1}px)`).matches
}

/**
 * Fixed OPERAVA GLOBAL SOLUTIONS introduction overlay.
 * Renders only the provided Cloudinary WEBP (mobile or desktop).
 * No added text, logo, buttons inside the art, or website backdrop.
 */
export default function OperavaIntroOverlay() {
  const [active, setActive] = useState(true)
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [canClose, setCanClose] = useState(false)
  const [src, setSrc] = useState(() => (isMobileViewport() ? MOBILE_SRC : DESKTOP_SRC))

  const scrollYRef = useRef(0)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const mandatoryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enterRafRef = useRef<number | null>(null)
  const visibleAtRef = useRef<number | null>(null)
  const remainingMsRef = useRef(MANDATORY_MS)

  const finishClose = useCallback(() => {
    setActive(false)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    // Restore scroll position without jumping
    window.scrollTo({ top: scrollYRef.current, behavior: 'instant' as ScrollBehavior })
  }, [])

  const requestClose = useCallback(() => {
    if (!canClose || exiting) return
    setExiting(true)
    window.setTimeout(() => {
      finishClose()
    }, FADE_MS)
  }, [canClose, exiting, finishClose])

  // Lock scroll + body while active
  useEffect(() => {
    if (!active) return

    scrollYRef.current = window.scrollY || window.pageYOffset || 0
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const preventScroll = (e: Event) => {
      e.preventDefault()
    }
    // Block wheel / touchmove on document while intro is up
    document.addEventListener('wheel', preventScroll, { passive: false })
    document.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.removeEventListener('wheel', preventScroll)
      document.removeEventListener('touchmove', preventScroll)
      if (!active) {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }
    }
  }, [active])

  // Fade-in + start mandatory 8s timer once visible
  useEffect(() => {
    if (!active) return

    // Next frame: trigger enter transition
    enterRafRef.current = requestAnimationFrame(() => {
      setEntered(true)
      visibleAtRef.current = Date.now()
      remainingMsRef.current = MANDATORY_MS

      mandatoryTimerRef.current = setTimeout(() => {
        setCanClose(true)
      }, MANDATORY_MS)
    })

    return () => {
      if (enterRafRef.current != null) cancelAnimationFrame(enterRafRef.current)
      if (mandatoryTimerRef.current) clearTimeout(mandatoryTimerRef.current)
    }
  }, [active])

  // Focus close button when it appears
  useEffect(() => {
    if (canClose && !exiting) {
      closeBtnRef.current?.focus({ preventScroll: true })
    }
  }, [canClose, exiting])

  // Escape after 8s only
  useEffect(() => {
    if (!active) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (canClose) {
          e.preventDefault()
          requestClose()
        } else {
          e.preventDefault()
          e.stopPropagation()
        }
      }

      // Lightweight focus trap while open
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<
          HTMLElement
        >('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [active, canClose, requestClose])

  // Responsive asset swap without restarting the 8s timer
  useEffect(() => {
    if (!active) return

    const mq = window.matchMedia(`(max-width: ${BREAKPOINT_PX - 1}px)`)
    const apply = () => {
      const next = mq.matches ? MOBILE_SRC : DESKTOP_SRC
      setSrc((prev) => (prev === next ? prev : next))
    }

    apply()
    // Prefer modern API; fallback for older browsers
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
    mq.addListener(apply)
    return () => mq.removeListener(apply)
  }, [active])

  const onImageError = () => {
    // Do not permanently block the site
    if (mandatoryTimerRef.current) clearTimeout(mandatoryTimerRef.current)
    finishClose()
  }

  if (!active) return null

  return (
    <div
      ref={dialogRef}
      id="operava-intro-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="OPERAVA Global Solutions introduction"
      className="fixed inset-0 z-[10050] flex items-center justify-center overflow-hidden"
      style={{
        // Transparent — website remains fully visible around the WEBP
        background: 'transparent',
        pointerEvents: 'auto',
      }}
      // Click outside must NOT close
      onClick={(e) => e.stopPropagation()}
    >
      {/* Invisible full-screen catcher: blocks interaction with site underneath */}
      <div className="absolute inset-0" aria-hidden="true" style={{ background: 'transparent' }} />

      <div
        className="relative z-[1] flex items-center justify-center w-full h-full max-w-full max-h-full p-0"
        style={{
          opacity: entered && !exiting ? 1 : 0,
          transform: entered && !exiting ? 'scale(1)' : 'scale(0.98)',
          transition: `opacity ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          willChange: 'opacity, transform',
        }}
      >
        <img
          key={src}
          src={src}
          alt="OPERAVA Global Solutions"
          className="block max-w-full max-h-full w-auto h-auto object-contain pointer-events-none select-none"
          style={{
            objectFit: 'contain',
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
          draggable={false}
          decoding="async"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={onImageError}
        />
      </div>

      {/* X only after mandatory 8 seconds — separate from WEBP art */}
      {canClose && (
        <button
          ref={closeBtnRef}
          type="button"
          onClick={requestClose}
          aria-label="Close introduction"
          className="absolute z-[2] top-4 right-4 sm:top-5 sm:right-5 flex items-center justify-center rounded-full bg-white/95 text-gray-900 border border-gray-200/90 shadow-lg hover:bg-white active:scale-95 transition-all duration-300"
          style={{
            width: 44,
            height: 44,
            minWidth: 44,
            minHeight: 44,
            opacity: exiting ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease, transform 150ms ease`,
          }}
        >
          <X className="w-5 h-5" strokeWidth={2.25} aria-hidden />
        </button>
      )}
    </div>
  )
}
