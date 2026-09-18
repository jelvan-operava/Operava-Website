import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

/** Cache-busted URLs — bump ASSET_V when replacing Cloudinary files at the same public_id */
const ASSET_V = '20260919a'

const MOBILE_SRC =
  `https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/v1789682664/Intro-mobile-overlay.webp?v=${ASSET_V}`
const DESKTOP_SRC =
  `https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/desktop_intro_overlay.webp?v=${ASSET_V}`

const BREAKPOINT_PX = 768
const MANDATORY_MS = 8000
const FADE_MS = 480
/** Premium 3D card flip duration */
const FLIP_MS = 1100
/** After flip, fade overlay away so live homepage is fully interactive */
const REVEAL_MS = 380

function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${BREAKPOINT_PX - 1}px)`).matches
}

/**
 * OPERAVA introduction overlay.
 *
 * Front face  = intro WEBP (mobile or desktop asset by viewport).
 * Back face   = solid white plate (never the intro image — avoids mirrored blink).
 * On X / 8s   = card rotates 180° (front → back), then overlay fades out.
 * Underneath  = live homepage already mounted — user stays on same URL and navigates.
 */
export default function OperavaIntroOverlay() {
  const [active, setActive] = useState(true)
  const [entered, setEntered] = useState(false)
  const [flipping, setFlipping] = useState(false)
  const [revealing, setRevealing] = useState(false)
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
  const flipDoneRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const revealDoneRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoCloseFiredRef = useRef(false)

  const finishClose = useCallback(() => {
    setActive(false)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    window.scrollTo({ top: scrollYRef.current, behavior: 'instant' as ScrollBehavior })
  }, [])

  const startFlip = useCallback(() => {
    if (flipping || revealing || autoCloseFiredRef.current) return
    autoCloseFiredRef.current = true
    setFlipping(true)

    if (flipDoneRef.current) clearTimeout(flipDoneRef.current)
    if (revealDoneRef.current) clearTimeout(revealDoneRef.current)

    // Phase 1: full 180° card flip (front → solid back)
    flipDoneRef.current = setTimeout(() => {
      setRevealing(true)
      // Phase 2: fade overlay out — live homepage underneath is fully visible
      revealDoneRef.current = setTimeout(() => {
        finishClose()
      }, REVEAL_MS)
    }, FLIP_MS)
  }, [flipping, revealing, finishClose])

  const requestClose = useCallback(() => {
    if (!canClose || flipping || revealing) return
    startFlip()
  }, [canClose, flipping, revealing, startFlip])

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
        // Auto-flip after 8s → solid back → live homepage
        setTimeout(() => {
          if (!autoCloseFiredRef.current) startFlip()
        }, 80)
      }, MANDATORY_MS)
    })

    return () => {
      if (enterRafRef.current != null) cancelAnimationFrame(enterRafRef.current)
      if (mandatoryTimerRef.current) clearTimeout(mandatoryTimerRef.current)
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current)
      if (flipDoneRef.current) clearTimeout(flipDoneRef.current)
      if (revealDoneRef.current) clearTimeout(revealDoneRef.current)
    }
  }, [active, startFlip])

  useEffect(() => {
    if (canClose && !flipping && !revealing) {
      closeBtnRef.current?.focus({ preventScroll: true })
    }
  }, [canClose, flipping, revealing])

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

  useEffect(() => {
    if (!active) return

    const mq = window.matchMedia(`(max-width: ${BREAKPOINT_PX - 1}px)`)
    const apply = () => {
      // Mobile viewport → mobile intro asset; desktop → desktop asset
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

  const busy = flipping || revealing

  const handleSurfaceClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    requestClose()
  }

  return (
    <div
      ref={dialogRef}
      id="operava-intro-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="OPERAVA Global Solutions introduction"
      className="fixed inset-0 z-[10050] overflow-hidden"
      style={{
        pointerEvents: busy ? 'none' : 'auto',
        perspective: '1600px',
        WebkitPerspective: '1600px',
        // Stay opaque until flip starts so homepage is fully covered;
        // go transparent during flip so the live site can show around the card edges
        backgroundColor: flipping || revealing ? 'transparent' : '#FFFFFF',
        opacity: revealing ? 0 : 1,
        transition: revealing
          ? `opacity ${REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1), background-color ${REVEAL_MS}ms ease`
          : `background-color ${Math.round(FLIP_MS * 0.25)}ms ease`,
      }}
      onClick={handleSurfaceClick}
    >
      {/* 3D card stage */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: flipping
            ? 'rotateY(-180deg) scale(0.98)'
            : entered
              ? 'rotateY(0deg) scale(1)'
              : 'rotateY(0deg) scale(1.02)',
          transition: flipping
            ? `transform ${FLIP_MS}ms cubic-bezier(0.45, 0.05, 0.2, 1)`
            : `transform ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          willChange: 'transform',
        }}
      >
        {/* ───────── FRONT: intro image only ───────── */}
        <div
          className="absolute inset-0 overflow-hidden bg-white"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg) translateZ(2px)',
            boxShadow: flipping
              ? '0 28px 80px rgba(15,15,30,0.22)'
              : 'none',
            transition: `box-shadow ${FLIP_MS}ms ease`,
          }}
        >
          <img
            key={src}
            src={src}
            alt="OPERAVA Global Solutions"
            className="absolute inset-0 block w-full h-full object-cover object-center pointer-events-none select-none"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            draggable={false}
            decoding="async"
            loading="eager"
            referrerPolicy="no-referrer"
            onError={onImageError}
          />

          {!canClose && (
            <div
              className="absolute z-[2] left-0 right-0 bottom-8 sm:bottom-10 flex flex-col items-center gap-2 text-center px-4 pointer-events-none"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex items-center gap-2.5 rounded-full bg-black/45 backdrop-blur-sm px-4 py-2">
                <span
                  className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                  aria-hidden
                />
                <p className="text-sm sm:text-base font-semibold text-white tracking-tight">
                  Wait for {secondsLeft} second{secondsLeft === 1 ? '' : 's'}
                </p>
              </div>
              <p className="text-[10px] sm:text-xs text-white/80 font-medium tracking-wide uppercase">
                Loading
              </p>
              <div className="w-40 sm:w-52 h-1 rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-[width] duration-200 ease-linear"
                  style={{
                    width: `${Math.min(100, ((8 - secondsLeft) / 8) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {canClose && !busy && (
            <p className="absolute z-[2] left-0 right-0 bottom-8 sm:bottom-10 text-center text-xs sm:text-sm text-white/90 font-medium pointer-events-none">
              Tap anywhere or × to continue
            </p>
          )}

          {canClose && !busy && (
            <button
              ref={closeBtnRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                requestClose()
              }}
              aria-label="Close introduction"
              className="absolute z-[3] top-4 right-4 sm:top-5 sm:right-5 flex items-center justify-center rounded-full bg-white/95 text-gray-900 border border-white/80 shadow-lg hover:bg-white active:scale-95 transition-all duration-300"
              style={{
                width: 44,
                height: 44,
                minWidth: 44,
                minHeight: 44,
              }}
            >
              <X className="w-5 h-5" strokeWidth={2.25} aria-hidden />
            </button>
          )}
        </div>

        {/* ───────── BACK: solid plate (NOT the intro image) ─────────
            Prevents mirrored-front blink. After the flip lands on this face,
            the whole overlay fades out so the live OPERAVA homepage underneath
            is what the user sees and navigates. */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(2px)',
            // Solid white so the reverse of the front image never shows
            backgroundColor: '#FFFFFF',
            boxShadow: flipping
              ? '0 28px 80px rgba(15,15,30,0.12)'
              : 'none',
          }}
        />
      </div>
    </div>
  )
}
