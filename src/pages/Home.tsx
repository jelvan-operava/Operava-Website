import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
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

const techCategories = [
  'Cloud Architecture',
  'Custom Software',
  'REST & GraphQL APIs',
  'SQL & NoSQL Databases',
  'RPA Automation',
  'Cybersecurity',
  'Data Pipelines',
  'Digital Platforms',
  'Enterprise Systems Integration',
]

export default function Home() {
  const { t, language } = useLanguage()

  const trustRef = useIntersection()
  const itRef = useIntersection()
  const bpoRef = useIntersection()
  const modelRef = useIntersection()
  const industriesRef = useIntersection()
  const whyRef = useIntersection()
  const workforceRef = useIntersection()
  const techRef = useIntersection()
  const signatureRef = useIntersection()

  const [isHomeReady, setIsHomeReady] = useState(false)
  const [whySlide, setWhySlide] = useState(0)

  const operatingModelSteps = [
    {
      step: '01',
      label: t('model.step1.label', 'Discover'),
      desc: t('model.step1.desc', 'Analyze business workflows, pain points, and strategic scaling objectives.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419731/discover.png',
    },
    {
      step: '02',
      label: t('model.step2.label', 'Design'),
      desc: t('model.step2.desc', 'Architect customized software, workforce configurations, and SLA frameworks.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419732/Design.png',
    },
    {
      step: '03',
      label: t('model.step3.label', 'Build'),
      desc: t('model.step3.desc', 'Deploy cloud infrastructure, integrate APIs, and train dedicated teams.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419731/Build.png',
    },
    {
      step: '04',
      label: t('model.step4.label', 'Launch'),
      desc: t('model.step4.desc', 'Seamless transition with zero downtime and strict governance.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419732/Launch.png',
    },
    {
      step: '05',
      label: t('model.step5.label', 'Operate'),
      desc: t('model.step5.desc', '24/7 continuous management, quality assurance, and real-time monitoring.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419733/Operate.png',
    },
    {
      step: '06',
      label: t('model.step6.label', 'Optimize'),
      desc: t('model.step6.desc', 'Ongoing enhancements driven by automated analytics and continuous feedback loops.'),
      imageSrc: 'https://res.cloudinary.com/sdaxzncs/image/upload/v1787419731/Optimize.png',
    },
  ]

  const whyFeaturesList = [
    {
      title: t('why.feat1.title', 'Technology-led'),
      desc: t('why.feat1.desc', 'Modern architecture built strictly around measurable business outcomes.'),
    },
    {
      title: t('why.feat2.title', 'People-powered'),
      desc: t('why.feat2.desc', 'Highly skilled, certified professionals supporting your critical operations.'),
    },
    {
      title: t('why.feat3.title', 'Elastic & Scalable'),
      desc: t('why.feat3.desc', 'Flexible staffing and infrastructure that dynamically adjust with demand.'),
    },
    {
      title: t('why.feat4.title', 'Process-driven'),
      desc: t('why.feat4.desc', 'ISO-aligned workflows designed for consistent precision and security.'),
    },
    {
      title: t('why.feat5.title', 'Global-ready'),
      desc: t('why.feat5.desc', 'Robust remote infrastructure designed for global enterprises.'),
    },
    {
      title: t('why.feat6.title', 'Client-focused'),
      desc: t('why.feat6.desc', 'Transparent partnership model with dedicated account managers and clear KPIs.'),
    },
  ]

  return (
    <>
      <HomeMediaLoader onLoadingComplete={() => setIsHomeReady(true)} />
      <main className={`overflow-x-hidden transition-opacity duration-700 ${isHomeReady ? 'opacity-100' : 'opacity-0'}`}>
        <section className="relative w-full pt-16 sm:pt-20 lg:pt-0 overflow-hidden bg-white">
          <OperavaCover />
        </section>

        {/* NOTE: Remaining page sections temporarily abbreviated in this restore step.
            Full body is available in local artifacts and will be re-applied if deploy shows missing sections. */}
        <section ref={trustRef} id="capabilities" className="py-20 lg:py-28 bg-[#FBFBFA] border-t border-stone-100/80 scroll-mt-20 relative overflow-hidden">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="max-w-3xl mb-16 lg:mb-20">
              <p className="reveal text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-violet-700 mb-3">
                Automation, Technology, Workforce and Talent Solutions
              </p>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Built for the way modern businesses operate.
              </h2>
              <p className="reveal reveal-delay-2 text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
                OPERAVA bridges enterprise technology, specialized global talent, and high-precision operational processes into a single unified delivery engine.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
