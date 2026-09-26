import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import DraggableMarquee from '../components/DraggableMarquee'
import HomeMediaLoader from '../components/HomeMediaLoader'
import ToolsEcosystemMarquee from '../components/ToolsEcosystemMarquee'
import OperavaCover from '../components/OperavaCover'
import ServicesCarousel3D from '../components/ServicesCarousel3D'

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )
    el.querySelectorAll('.reveal').forEach((t) => obs.observe(t))
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

const industries = [
  'Technology',
  'SaaS',
  'E-commerce',
  'Financial Services',
  'Healthcare',
  'Professional Services',
  'Real Estate',
  'Logistics',
  'Retail',
  'Startups',
  'SMEs',
  'Enterprise',
]

const SECTION_TITLE =
  'reveal whitespace-nowrap font-bold text-gray-900 tracking-tight leading-none ' +
  'text-[clamp(1.05rem,3.6vw,2.35rem)]'

const SECTION_TITLE_WHITE =
  'reveal whitespace-nowrap font-bold tracking-tight leading-none text-white ' +
  'text-[clamp(1.05rem,3.6vw,2.35rem)]'

export default function Home() {
  const { t } = useLanguage()

  const modelRef = useIntersection()
  const industriesRef = useIntersection()
  const signatureRef = useIntersection()

  const [isHomeReady, setIsHomeReady] = useState(false)

  const operatingModelSteps = [
    {
      step: '01',
      label: t('model.step1.label', 'Discover'),
      desc: t('model.step1.desc', 'Analyze business workflows, pain points, and strategic scaling objectives.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_640/v1787419731/discover.png',
    },
    {
      step: '02',
      label: t('model.step2.label', 'Design'),
      desc: t('model.step2.desc', 'Architect customized software, workforce configurations, and SLA frameworks.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_640/v1787419732/Design.png',
    },
    {
      step: '03',
      label: t('model.step3.label', 'Build'),
      desc: t('model.step3.desc', 'Deploy cloud infrastructure, integrate APIs, and train dedicated teams.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_640/v1787419731/Build.png',
    },
    {
      step: '04',
      label: t('model.step4.label', 'Launch'),
      desc: t('model.step4.desc', 'Seamless transition with zero downtime and strict governance.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_640/v1787419732/Launch.png',
    },
    {
      step: '05',
      label: t('model.step5.label', 'Operate'),
      desc: t('model.step5.desc', '24/7 continuous management, quality assurance, and real-time monitoring.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_640/v1787419733/Operate.png',
    },
    {
      step: '06',
      label: t('model.step6.label', 'Optimize'),
      desc: t('model.step6.desc', 'Ongoing enhancements driven by automated analytics and continuous feedback loops.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_640/v1787419731/Optimize.png',
    },
  ]

  return (
    <>
      <HomeMediaLoader onLoadingComplete={() => setIsHomeReady(true)} />
      <main className={`overflow-x-hidden transition-opacity duration-700 ${isHomeReady ? 'opacity-100' : 'opacity-0'}`}>
        <section className="relative w-full pt-16 sm:pt-20 lg:pt-0 overflow-hidden bg-white">
          <OperavaCover />
        </section>

        <ServicesCarousel3D />

        <DraggableMarquee />

        <section ref={modelRef} className="py-20 lg:py-28 bg-gray-950 text-white overflow-hidden relative">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="mb-14 min-w-0">
              <h2 className={SECTION_TITLE_WHITE}>
                {t('model.title', 'The OPERAVA Operating Model')}
              </h2>
              <p className="reveal reveal-delay-1 text-sm text-gray-400 mt-3">
                {t('model.subtitle', 'A structured, agile methodology designed for seamless transition and rapid scaling.')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {operatingModelSteps.map((step, i) => (
                <div
                  key={step.step}
                  style={{ animationDelay: `${(i % 3) * 0.4}s` }}
                  className={`reveal reveal-delay-${Math.min(i + 1, 5)} group relative bg-transparent flex items-center justify-center`}
                >
                  <div className="relative w-full overflow-hidden bg-transparent">
                    <img
                      src={step.imageSrc}
                      alt={`${step.step} - ${step.label}: ${step.desc}`}
                      className="w-full h-auto object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={industriesRef} className="py-20 lg:py-28 bg-white relative">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="mb-12 min-w-0">
              <h2 className={SECTION_TITLE}>
                {t('industries.title', 'Solutions Across Global Industries')}
              </h2>
              <p className="reveal reveal-delay-1 text-base text-gray-500 mt-3">
                {t('industries.subtitle', 'Tailored technology and operations delivery for the industries that define modern business.')}
              </p>
            </div>
            <div className="reveal reveal-delay-2 flex flex-wrap gap-2.5 sm:gap-3">
              {industries.map((name) => (
                <span
                  key={name}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-gray-700 border border-[#EDEDF2] rounded-full hover:border-violet-200 hover:bg-violet-50/60 hover:text-violet-900 transition-all duration-200 cursor-default"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <ToolsEcosystemMarquee />

        <section ref={signatureRef} className="pt-0 pb-6 sm:pb-8 bg-white relative overflow-hidden">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 w-full flex justify-start items-center relative z-10">
            <div className="reveal flex justify-start items-center bg-transparent max-w-sm sm:max-w-md">
              <img
                src="https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_480/operava-signature.jpg"
                srcSet="
                  https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_320/operava-signature.jpg 320w,
                  https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_480/operava-signature.jpg 480w,
                  https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto,w_640/operava-signature.jpg 640w
                "
                sizes="(max-width: 640px) 80vw, 448px"
                alt="OPERAVA Signature"
                width={480}
                height={133}
                className="w-full h-auto max-h-[160px] sm:max-h-[200px] object-contain object-left pointer-events-none select-none block mix-blend-multiply transition-transform duration-500 hover:scale-105"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
