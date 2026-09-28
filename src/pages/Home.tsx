import { useState } from 'react'
import HomeMediaLoader from '../components/HomeMediaLoader'
import OperavaCover from '../components/OperavaCover'
import HomeArtifact from '../components/HomeArtifact'

export default function Home() {
  const [isHomeReady, setIsHomeReady] = useState(false)

  return (
    <>
      <HomeMediaLoader onLoadingComplete={() => setIsHomeReady(true)} />
      <main className={`overflow-x-clip transition-opacity duration-700 ${isHomeReady ? 'opacity-100' : 'opacity-0'}`}>
        <section className="relative w-full pt-16 sm:pt-20 lg:pt-0 overflow-hidden bg-white">
          <OperavaCover />
        </section>
        <HomeArtifact />
      </main>
    </>
  )
}
