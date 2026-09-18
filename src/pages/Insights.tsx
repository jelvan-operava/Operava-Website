import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { insightCategories, insightArticles } from '../data/insights'

const GRADIENT = 'linear-gradient(90deg, #FF8B4A, #FF4DB8, #C44DFF, #3B6BFF)'

export default function Insights() {
  const featured = insightArticles.slice(0, 6)

  return (
    <main className="bg-white">
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-16 bg-white border-b border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
            OPERAVA INSIGHTS
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Technology. Automation.{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: GRADIENT }}
            >
              Global Operations.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-3xl">
            OPERAVA Insights is a business knowledge resource covering automation, information
            technology, outsourcing, offshoring and the operational decisions involved in building
            and scaling modern businesses. Articles explain concepts clearly, describe where a model
            can be useful, and distinguish general industry information from OPERAVA services.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Explore by topic
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-xl">
                Practical information for business owners, operations leaders, technology teams and
                organizations assessing their next stage of growth.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {insightCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/insights/${cat.slug}`}
                className="group flex flex-col p-6 rounded-2xl border border-[#E8E8EC] bg-white hover:border-violet-200 hover:shadow-[0_16px_40px_rgba(15,15,30,0.06)] transition-all duration-300"
              >
                <span
                  className="text-[10px] font-bold tracking-wider mb-3"
                  style={{
                    backgroundImage: GRADIENT,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  TOPIC
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                  {cat.cardDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white border-t border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-8">
            Foundational articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((article) => {
              const cat = insightCategories.find((c) => c.slug === article.categorySlug)
              return (
                <Link
                  key={`${article.categorySlug}/${article.slug}`}
                  to={`/insights/${article.categorySlug}/${article.slug}`}
                  className="group flex flex-col p-6 rounded-2xl border border-[#E8E8EC] bg-white hover:border-violet-200 hover:shadow-[0_16px_40px_rgba(15,15,30,0.06)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 text-[10px] font-semibold text-violet-700 bg-violet-50 rounded-full">
                      {cat?.name}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {article.readingMinutes} min read
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-violet-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white border-t border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-4">
              Have a process, technology requirement or operational challenge to discuss?
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mb-8 leading-relaxed">
              Explore OPERAVA services or contact OPERAVA GLOBAL SOLUTIONS to discuss the
              requirements, scope and operating model appropriate for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/services/it"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
              >
                Explore services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Contact OPERAVA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
