import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import HangingFeaturesBanner from '../components/HangingFeaturesBanner'

export default function About() {
  const { t } = useLanguage()

  const pillars = [
    {
      title: t('about.pillar1.title', 'Technology enables.'),
      desc: t('about.pillar1.desc', 'We build the systems, platforms and digital infrastructure your business needs to operate at its best.'),
    },
    {
      title: t('about.pillar2.title', 'People operate.'),
      desc: t('about.pillar2.desc', 'Our skilled professionals support technology operations, business processes and customer-facing functions.'),
    },
    {
      title: t('about.pillar3.title', 'Processes scale.'),
      desc: t('about.pillar3.desc', 'Structured, repeatable processes let your operations grow without adding unnecessary complexity.'),
    },
  ]

  const approachItems = [
    { title: t('why.feat1.title', 'Technology-led'), desc: t('why.feat1.desc', 'Modern technology built around business outcomes.') },
    { title: t('why.feat2.title', 'People-powered'), desc: t('why.feat2.desc', 'Skilled professionals supporting business operations.') },
    { title: t('why.feat3.title', 'Elastic & Scalable'), desc: t('why.feat3.desc', 'Solutions that scale with your requirements.') },
    { title: t('why.feat4.title', 'Process-driven'), desc: t('why.feat4.desc', 'Structured workflows designed for consistency.') },
    { title: t('why.feat5.title', 'Global-ready'), desc: t('why.feat5.desc', 'Remote service delivery across markets.') },
    { title: t('why.feat6.title', 'Client-focused'), desc: t('why.feat6.desc', 'Solutions designed around each client.') },
  ]

  return (
    <main>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">
              {t('about.badge', 'About')}
            </p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {t('about.title', 'Operating in Advance.')}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              {t('about.desc', 'OPERAVA Global Solutions combines technology, people and business processes to help organizations build better systems, operate efficiently and scale with confidence.')}
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t('about.whatWeDo.title', 'What OPERAVA does.')}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              {t('about.whatWeDo.p1', 'OPERAVA provides technology services and BPO/IT-BPM capabilities for organizations seeking flexible and reliable operational support.')}
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-5">
              {t('about.whatWeDo.p2', 'We are a Philippine-based technology and business process services company delivering IT solutions, digital platforms, cloud services, data processing and global Business Process Outsourcing services.')}
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              {t('about.whatWeDo.p3', 'The name OPERAVA reflects our core philosophy: technology and people working together to help businesses operate better, today and in the future.')}
            </p>
          </div>
          <div className="space-y-4">
            {pillars.map((item) => (
              <div key={item.title} className="flex gap-5 p-6 border border-gray-100 rounded-2xl hover:border-violet-100 transition-colors">
                <div className="w-1 rounded-full bg-violet-700 shrink-0 self-stretch" />
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('about.approach.title', 'Our approach.')}
            </h2>
            <p className="text-gray-400">
              {t('about.approach.desc', 'A serious technology and business operations partner capable of supporting startups, SMEs and enterprise organizations globally.')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {approachItems.map((item) => (
              <div key={item.title} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 hover:border-violet-500/30 transition-all duration-200">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mb-4" />
                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hanging Features Animation Banner */}
      <HangingFeaturesBanner />

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('about.ready.title', 'Ready to work together?')}
          </h2>
          <p className="text-base text-gray-500 mb-8">
            {t('about.ready.desc', 'Let us know about your business requirements and we can discuss how OPERAVA can help.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
            >
              {t('nav.talkToUs', 'Talk to Us')}
            </Link>
            <Link
              to="/services/it"
              className="inline-flex items-center px-7 py-3.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:border-violet-200 hover:bg-violet-50 transition-colors"
            >
              {t('nav.exploreServices', 'Explore Services')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

