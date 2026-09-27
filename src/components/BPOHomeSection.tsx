import { useEffect, useRef } from 'react'

type MountedSection = { unmount: () => void }
type SectionModule = { mount: (element: HTMLElement) => MountedSection }

/** Mount the supplied standalone artwork inside a shadow root to keep its exact CSS isolated. */
export default function BPOHomeSection() {
  const host = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = host.current
    if (!element) return

    const shadow = element.shadowRoot ?? element.attachShadow({ mode: 'open' })
    shadow.replaceChildren()
    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.href = '/bpo-home-section.css'
    shadow.append(stylesheet)

    const mountPoint = document.createElement('div')
    shadow.append(mountPoint)

    let mounted: MountedSection | undefined
    let cancelled = false
    const moduleUrl = new URL('/bpo-home-section.js', window.location.origin).href
    import(/* @vite-ignore */ moduleUrl).then((module: SectionModule) => {
      if (!cancelled) mounted = module.mount(mountPoint)
    })

    return () => {
      cancelled = true
      mounted?.unmount()
    }
  }, [])

  return <section ref={host} aria-label="Global Business Process Outsourcing services" className="block w-full" />
}
