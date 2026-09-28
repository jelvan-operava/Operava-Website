import { useEffect, useRef } from 'react'
import artifactCSS from '../artifact/operava-home-artifact.css?raw'

type ArtifactModule = { mountArtifact: (target: HTMLElement) => () => void }

export default function HomeArtifact() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const shadow = host.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = artifactCSS
    const root = document.createElement('div')
    root.id = 'root'
    shadow.append(style, root)

    // Fragment links inside the encapsulated section need a local scroll target.
    const onClick = (event: Event) => {
      const target = event.target as Element
      const anchor = target.closest?.('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      const destination = id && shadow.getElementById(id)
      if (destination) {
        event.preventDefault()
        destination.scrollIntoView({ behavior: 'smooth' })
      }
    }
    shadow.addEventListener('click', onClick)

    let disposed = false
    let unmount: (() => void) | undefined
    import('../artifact/operava-home-artifact.js').then((module: ArtifactModule) => {
      if (disposed) return
      unmount = module.mountArtifact(root)
    })

    return () => {
      disposed = true
      shadow.removeEventListener('click', onClick)
      unmount?.()
    }
  }, [])

  return <div ref={hostRef} className="w-full" aria-label="OPERAVA services and operating model" />
}
