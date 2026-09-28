import { useEffect } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

export default function SmoothScroll() {
  const isHome = useLocation().pathname === '/'

  useEffect(() => {
    // The supplied home artwork uses native window scroll for its sticky cards.
    if (isHome) return

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Make lenis available globally on window if needed
    const win = window as unknown as { lenis?: Lenis }
    win.lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      if (win.lenis === lenis) delete win.lenis
    }
  }, [isHome])

  return null
}
