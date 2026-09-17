import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

/** Cache-busted URLs — bump ASSET_V when replacing Cloudinary files at the same public_id */
const ASSET_V = '20260918a'

const MOBILE_SRC =
  `https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/v1789682664/Intro-mobile-overlay.webp?v=${ASSET_V}`
const DESKTOP_SRC =
  `https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/desktop_intro_overlay.webp?v=${ASSET_V}`

const BREAKPOINT_PX = 768
const MANDATORY_MS = 8000
const FADE_MS = 420

function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${BREAKPOINT_PX - 1}px)`).matches
}

/**
 * Fixed OPERAVA GLOBAL SOLUTIONS introduction overlay.
 * Full white background hides the website until the visitor closes with X.
 * Cloudinary WEBP only for art; countdown + X are UI chrome outside the artwork.
 */
export default function OperavaIntroOverlay() {
  const [active, setActive] = useState(true)
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [canClose, setCanClose] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(8)
  const [src, setSrc] = useState(() => (isMobileViewport() ? MOBILE_SRC : DESKTOP_SRC))

  const scrollYRef = useRef(0)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const mandatoryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const enterRafRef = useRef<number | null>(null)
  const startAtRef = useRef<number | null>(null)

  const finishClose = useCallback(() => {
    setActive(false)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    window.scrollTo({ top: scrollYRef.current, behavior: 'instant' as ScrollBehavior })
  }, [])

  const requestClose = useCallback(() => {
    if (!canClose || exiting) return
    setExiting(true)
    window.setTimeout(() => {
      finishClose()
    }, FADE_MS)
  }, [canClose, exiting, finishClose])

  // Lock scroll while active
  useEffect(() => {
    if (!active) return

    scrollYRef.current = window.scrollY || window.pageYOffset || 0
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const preventScroll = (e: Event) => {
      e.preventDefault()
    }
    document.addEventListener('wheel', preventScroll, { passive: false })
    document.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.removeEventListener('wheel', preventScroll)
      document.removeEventListener('touchmove', preventScroll)
    }
  }, [active])

  // Fade-in + mandatory 8s timer + live countdown
  useEffect(() => {
    if (!active) return

    enterRafRef.current = requestAnimationFrame(() => {
      setEntered(true)
      startAtRef.current = Date.now()
      setSecondsLeft(8)

      tickIntervalRef.current = setInterval(() => {
        if (startAtRef.current == null) return
        const elapsed = Date.now() - startAtRef.current
        const left = Math.max(0, Math.ceil((MANDATORY_MS - elapsed) / 1000))
        setSecondsLeft(left)
      }, 200)

      mandatoryTimerRef.current = setTimeout(() => {
        setSecondsLeft(0)
        setCanClose(true)
        if (tickIntervalRef.current) {
          clearInterval(tickIntervalRef.current)
          tickIntervalRef.current = null
        }
      }, MANDATORY_MS)
    })

    return () => {
      if (enterRafRef.current != null) cancelAnimationFrame(enterRafRef.current)
      if (mandatoryTimerRef.current) clearTimeout(mandatoryTimerRef.current)
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current)
    }
  }, [active])

  useEffect(() => {
    if (canClose && !exiting) {
      closeBtnRef.current?.focus({ preventScroll: true })
    }
  }, [canClose, exiting])

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
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
    mq.addListener(apply)
    return () => mq.removeListener(apply)
  }, [active])

  const onImageError = () => {
    if (mandatoryTimerRef.current) clearTimeout(mandatoryTimerRef.current)
    if (tickIntervalRef.current) clearInterval(tickIntervalRef.current)
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
      className="fixed inset-0 z-[10050] flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{ pointerEvents: 'auto' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Full white stage — website completely hidden until X closes intro */}
      <div className="absolute inset-0 bg-white" aria-hidden="true" />

      <div
        className="relative z-[1] flex flex-col items-center justify-center w-full h-full max-w-full max-h-full px-3 sm:px-6"
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
          className="block max-w-full max-h-[calc(100vh-5.5rem)] w-auto h-auto object-contain pointer-events-none select-none"
          style={{
            objectFit: 'contain',
            maxWidth: '100vw',
          }}
          draggable={false}
          decoding="async"
          loading="eager"
          referrerPolicy="no-referrer"
          onError={onImageError}
        />

        {/* Countdown / loading — outside WEBP artwork */}
        {!canClose && (
          <div
            className="mt-5 sm:mt-6 flex flex-col items-center gap-2 text-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="inline-block h-4 w-4 rounded-full border-2 border-violet-200 border-t-violet-600 animate-spin"
                aria-hidden
              />
              <p className="text-sm sm:text-base font-semibold text-gray-800 tracking-tight">
                Wait for {secondsLeft} second{secondsLeft === 1 ? '' : 's'}
              </p>
            </div>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Loading</p>
            <div className="mt-1 w-40 sm:w-52 h-1 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-violet-600 transition-[width] duration-200 ease-linear"
                style={{
                  width: `${Math.min(100, ((8 - secondsLeft) / 8) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {canClose && !exiting && (
          <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-gray-500 font-medium">
            Tap × to continue
          </p>
        )}
      </div>

      {canClose && (
        <button
          ref={closeBtnRef}
          type="button"
          onClick={requestClose}
          aria-label="Close introduction"
          className="absolute z-[2] top-4 right-4 sm:top-5 sm:right-5 flex items-center justify-center rounded-full bg-white text-gray-900 border border-gray-200 shadow-lg hover:bg-gray-50 active:scale-95 transition-all duration-300"
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
