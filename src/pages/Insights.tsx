import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function Insights() {
  const { t } = useLanguage()

  const articles = [
    {
      category: t('nav.services.it', 'Technology'),
      title: t('insights.art1.title', 'How cloud infrastructure is changing the way businesses scale operations.'),
      excerpt: t('insights.art1.desc', 'Modern cloud platforms offer organizations the ability to grow infrastructure in line with business demand — without the overhead of traditional data centers.'),
      date: 'August 2026',
    },
    {
      category: t('nav.services.bpo', 'BPO'),
      title: t('insights.art2.title', 'Why remote business process support is becoming the operational default.'),
      excerpt: t('insights.art2.desc', 'Organizations across industries are discovering that remote BPO services can deliver the same quality as on-site teams — with greater flexibility and efficiency.'),
      date: 'July 2026',
    },
    {
      category: 'IT Consulting',
      title: t('insights.art3.title', 'Five questions to ask before starting a system integration project.'),
      excerpt: t('insights.art3.desc', 'System integration projects that succeed share a set of common characteristics. Understanding these before starting can significantly improve outcomes.'),
      date: 'June 2026',
    },
    {
      category: 'Operations',
      title: t('insights.art4.title', 'Building scalable back-office operations: a practical guide.'),
      excerpt: t('insights.art4.desc', 'As businesses grow, back-office functions that once worked well can become bottlenecks. Here is how to design operations that scale with your business.'),
      date: 'May 2026',
    },
  ]

  return (
    <main>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">
              {t('insights.badge', 'Insights')}
            </p>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {t('insights.title', 'Insights from OPERAVA.')}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              {t('insights.desc', 'Perspectives on technology, business operations and the future of work.')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article
                key={article.title}
                className="group flex flex-col p-7 bg-white border border-gray-100 rounded-2xl hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-violet-700 bg-violet-50 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-700 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{article.excerpt}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 group-hover:gap-2.5 transition-all duration-200">
                  {t('insights.readMore', 'Read article')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('insights.stayInformed', 'Stay informed.')}
          </h2>
          <p className="text-base text-gray-500 mb-8">
            {t('insights.stayDesc', 'Subscribe to get perspectives on technology, business operations and the future of work delivered to your inbox.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('insights.emailPlaceholder', 'Enter your email')}
              className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-violet-700"
            />
            <button className="px-6 py-3 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors">
              {t('insights.subscribe', 'Subscribe')}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
