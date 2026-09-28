import OperavaCover from '../components/OperavaCover'
import HomeArtifact from '../components/HomeArtifact'

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <section className="relative w-full pt-16 sm:pt-20 lg:pt-0 overflow-hidden bg-white">
        <OperavaCover />
      </section>
      <HomeArtifact />
    </main>
  )
}
