import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import {
  getCategory,
  getArticlesByCategory,
  insightCategories,
} from '../data/insights'
import NotFound from './NotFound'

export default function InsightCategory() {
  const { categorySlug = '' } = useParams<{ categorySlug: string }>()
  const category = getCategory(categorySlug)
  if (!category) return <NotFound />

  const articles = getArticlesByCategory(categorySlug)

  return (
    <main className="bg-white">
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-14 bg-white border-b border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-violet-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Insights
          </Link>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
            OPERAVA / INSIGHTS
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-5">
            {category.name}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-3xl">
            {category.introduction}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-wrap gap-2 mb-10">
            {insightCategories.map((c) => (
              <Link
                key={c.slug}
                to={`/insights/${c.slug}`}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                  c.slug === categorySlug
                    ? 'border-violet-200 bg-violet-50 text-violet-700'
                    : 'border-gray-200 text-gray-600 hover:border-violet-200 hover:text-violet-700'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <p className="text-gray-500 text-sm">Articles for this topic are being prepared.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/insights/${categorySlug}/${article.slug}`}
                  className="group flex flex-col p-6 sm:p-7 rounded-2xl border border-[#E8E8EC] bg-white hover:border-violet-200 hover:shadow-[0_16px_40px_rgba(15,15,30,0.06)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] text-gray-400">{article.published}</span>
                    <span className="text-[11px] text-gray-300">·</span>
                    <span className="text-[11px] text-gray-400">
                      {article.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-violet-700 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Looking for related OPERAVA capabilities?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
          >
            Talk to OPERAVA
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
