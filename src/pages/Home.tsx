import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { itServices, bpoServices } from '../data/services'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedService } from '../i18n/translations/services'
import ServiceCard from '../components/ServiceCard'
import DraggableMarquee from '../components/DraggableMarquee'
import HomeMediaLoader from '../components/HomeMediaLoader'
import ToolsEcosystemMarquee from '../components/ToolsEcosystemMarquee'
import OperavaCover from '../components/OperavaCover'

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

export default function Home() {
  const { t, language } = useLanguage()

  const trustRef = useIntersection()
  const itRef = useIntersection()
  const bpoRef = useIntersection()
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

        <section ref={trustRef} id="capabilities" className="py-20 lg:py-28 bg-white scroll-mt-20 relative overflow-hidden">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="w-full flex justify-center mb-8 lg:mb-10">
              <img
                src="/title-automation-gradient.svg"
                alt="Automation, Technology, Workforce and Talent Solutions"
                width={1500}
                height={48}
                className="reveal w-full max-w-4xl h-auto object-contain pointer-events-none select-none"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Built for the way modern businesses operate.
              </h2>
              <p className="reveal reveal-delay-2 text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
                OPERAVA bridges enterprise technology, specialized global talent, and high-precision operational processes into a single unified delivery engine.
              </p>
            </div>

            <div className="space-y-16 sm:space-y-20 lg:space-y-24">
              {[
                {
                  number: '01',
                  title: 'Technology & Software Engineering',
                  desc: 'Digital platforms, custom cloud applications, API networks and IT infrastructure engineered for resilient global scalability.',
                  features: [
                    'Custom software, web applications & mobile platforms',
                    'Cloud architecture & managed hosting (AWS, Azure, GCP)',
                    'API integrations, microservices & zero-trust security',
                  ],
                  imageBase: 'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto',
                  imageId: 'Technology.png',
                  link: '/services/it',
                  cta: 'Explore IT Services',
                },
                {
                  number: '02',
                  title: 'Global Dedicated Workforce',
                  desc: 'Skilled remote professionals and managed teams supporting 24/7 global operations with rigorous SLA governance and seamless team integration.',
                  features: [
                    'Vetted Tier-1 engineering, technical & operational talent',
                    '24/7 follow-the-sun timezone coverage & dedicated managers',
                    'Frictionless scaling with zero onboarding overhead',
                  ],
                  imageBase: 'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto',
                  imageId: 'Workforce.png',
                  link: '/careers',
                  cta: 'Explore Workforce Solutions',
                },
                {
                  number: '03',
                  title: 'End-to-End Business Processes',
                  desc: 'Reliable outsourced operations designed for measurable accuracy, speed and scale across customer care, back-office, and specialized workflows.',
                  features: [
                    '24/7 omnichannel customer care & live chat resolution',
                    'Audited data processing, verification & accounting pipelines',
                    'Continuous SLA monitoring with dual-layer quality audits',
                  ],
                  imageBase: 'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto',
                  imageId: 'BPO.png',
                  link: '/services/bpo',
                  cta: 'Explore BPO Services',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} flex flex-col lg:flex-row items-center gap-8 lg:gap-10 xl:gap-12`}
                >
                  <div className="w-full lg:w-[40%] flex flex-col justify-center shrink-0">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed mb-6 font-normal">{item.desc}</p>
                    <ul className="space-y-2.5 mb-8">
                      {item.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-black active:scale-95 transition-all duration-200 group/btn"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-[60%] flex items-center justify-end">
                    <img
                      src={`${item.imageBase},w_960/${item.imageId}`}
                      srcSet={`
                        ${item.imageBase},w_480/${item.imageId} 480w,
                        ${item.imageBase},w_720/${item.imageId} 720w,
                        ${item.imageBase},w_960/${item.imageId} 960w,
                        ${item.imageBase},w_1200/${item.imageId} 1200w,
                        ${item.imageBase},w_1600/${item.imageId} 1600w
                      `}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
                      alt={item.title}
                      width={960}
                      height={696}
                      className="w-full h-auto object-contain pointer-events-none select-none"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={itRef} className="py-20 lg:py-28 bg-white relative">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">{t('section.it.title', 'Technology and operations, connected.')}</h2>
                <p className="reveal reveal-delay-1 text-base text-gray-500 mt-4 leading-relaxed">{t('section.it.desc', 'Technology solutions that help organizations build digital products, modernize infrastructure, connect systems and operate securely at scale.')}</p>
              </div>
              <div className="reveal reveal-delay-3 shrink-0">
                <Link to="/services/it" className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <span>View all IT services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {itServices.slice(0, 8).map((s, i) => (
                <ServiceCard key={s.id} service={getLocalizedService(s, language)} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section ref={bpoRef} className="py-20 lg:py-28 bg-white relative">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">{t('section.bpo.title', 'Extend your capabilities. Scale your operations.')}</h2>
                <p className="reveal reveal-delay-1 text-base text-gray-500 mt-4 leading-relaxed">{t('section.bpo.desc', 'Flexible business process services that help organizations extend their capacity and accelerate growth.')}</p>
              </div>
              <div className="reveal reveal-delay-3 shrink-0">
                <Link to="/services/bpo" className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <span>View all BPO services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {bpoServices.slice(0, 8).map((s, i) => (
                <ServiceCard key={s.id} service={getLocalizedService(s, language)} index={i} />
              ))}
            </div>
          </div>
        </section>

        <DraggableMarquee />

        <section ref={modelRef} className="py-20 lg:py-28 bg-gray-950 text-white overflow-hidden relative">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="max-w-2xl mb-14">
              <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">{t('model.title', 'The OPERAVA Operating Model')}</h2>
              <p className="reveal reveal-delay-1 text-sm text-gray-400 mt-2">{t('model.subtitle', 'A structured, agile methodology designed for seamless transition and rapid scaling.')}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {operatingModelSteps.map((step, i) => (
                <div key={step.step} style={{ animationDelay: `${(i % 3) * 0.4}s` }} className={`reveal reveal-delay-${Math.min(i + 1, 5)} group relative bg-transparent flex items-center justify-center`}>
                  <div className="relative w-full overflow-hidden bg-transparent">
                    <img src={step.imageSrc} alt={`${step.step} - ${step.label}: ${step.desc}`} className="w-full h-auto object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-105" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={industriesRef} className="py-20 lg:py-28 bg-white relative">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-2xl mb-12">
              <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">{t('industries.title', 'Specialized Solutions Across Global Industries')}</h2>
              <p className="reveal reveal-delay-1 text-base text-gray-500 mt-3">{t('industries.subtitle', 'Tailored technology and operations delivery for the industries that define modern business.')}</p>
            </div>
            <div className="reveal reveal-delay-2 flex flex-wrap gap-3">
              {industries.map((name) => (
                <span key={name} className="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-full hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-default">
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
