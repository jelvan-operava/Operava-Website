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
/** Match careers card flip feel */
const FLIP_MS = 720

function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${BREAKPOINT_PX - 1}px)`).matches
}

/**
 * Fixed OPERAVA GLOBAL SOLUTIONS introduction overlay.
 * WEBP covers the full viewport. On X: one-way 3D flip (like careers cards)
 * that reveals the home site behind. Cannot flip back — only a full page refresh
 * shows the intro again.
 */
export default function OperavaIntroOverlay() {
  const [active, setActive] = useState(true)
  const [entered, setEntered] = useState(false)
  const [flipping, setFlipping] = useState(false)
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

  const finishClose = useCallback(() => {
    setActive(false)
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    window.scrollTo({ top: scrollYRef.current, behavior: 'instant' as ScrollBehavior })
  }, [])

  const requestClose = useCallback(() => {
    if (!canClose || flipping) return
    setFlipping(true)
    // One-way flip → home. No reverse.
    if (flipDoneRef.current) clearTimeout(flipDoneRef.current)
    flipDoneRef.current = setTimeout(() => {
      finishClose()
    }, FLIP_MS)
  }, [canClose, flipping, finishClose])

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
      }, MANDATORY_MS)
    })

    return () => {
      if (enterRafRef.current != null) cancelAnimationFrame(enterRafRef.current)
      if (mandatoryTimerRef.current) clearTimeout(mandatoryTimerRef.current)
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current)
      if (flipDoneRef.current) clearTimeout(flipDoneRef.current)
    }
  }, [active])

  useEffect(() => {
    if (canClose && !flipping) {
      closeBtnRef.current?.focus({ preventScroll: true })
    }
  }, [canClose, flipping])

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
      className="fixed inset-0 z-[10050] overflow-hidden"
      style={{
        pointerEvents: flipping ? 'none' : 'auto',
        perspective: '1600px',
        WebkitPerspective: '1600px',
        background: flipping ? 'transparent' : 'transparent',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/*
        Flip card (careers-style):
        Front = intro WEBP. On X → rotateY(180°) one way.
        Transparent back + transparent scene → home website is the “back”.
        Unmount after flip; refresh is the only way to see intro again.
      */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: flipping ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: `transform ${FLIP_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          willChange: 'transform',
        }}
      >
        {/* FRONT — intro */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            opacity: entered ? 1 : 0,
            transition: entered ? 'none' : `opacity ${FADE_MS}ms ease`,
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

          {/* Countdown — on the WEBP */}
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

          {canClose && !flipping && (
            <p className="absolute z-[2] left-0 right-0 bottom-8 sm:bottom-10 text-center text-xs sm:text-sm text-white/90 font-medium pointer-events-none">
              Tap × to continue
            </p>
          )}

          {canClose && !flipping && (
            <button
              ref={closeBtnRef}
              type="button"
              onClick={requestClose}
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

        {/* BACK — empty / transparent so the live home site is what you “land” on */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'transparent',
          }}
        />
      </div>
    </div>
  )
}
