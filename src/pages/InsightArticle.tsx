import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  getArticle,
  getCategory,
  getRelatedArticles,
} from '../data/insights'
import NotFound from './NotFound'

export default function InsightArticle() {
  const { categorySlug = '', articleSlug = '' } = useParams<{
    categorySlug: string
    articleSlug: string
  }>()
  const article = getArticle(categorySlug, articleSlug)
  const category = getCategory(categorySlug)
  if (!article || !category) return <NotFound />

  const related = getRelatedArticles(categorySlug, articleSlug, 3)

  return (
    <main className="bg-white">
      <article className="pt-28 pb-8 lg:pt-36 lg:pb-10 bg-white border-b border-gray-100">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <Link
            to={`/insights/${categorySlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-violet-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {category.name}
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              to={`/insights/${categorySlug}`}
              className="px-2.5 py-1 text-[10px] font-semibold text-violet-700 bg-violet-50 rounded-full hover:bg-violet-100 transition-colors"
            >
              {category.name}
            </Link>
            <span className="text-[11px] text-gray-400">Published {article.published}</span>
            <span className="text-[11px] text-gray-300">·</span>
            <span className="text-[11px] text-gray-400">
              Last reviewed {article.lastReviewed}
            </span>
            <span className="text-[11px] text-gray-300">·</span>
            <span className="text-[11px] text-gray-400">
              {article.readingMinutes} min read
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-gray-900 tracking-tight leading-[1.15] mb-5">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">{article.excerpt}</p>
        </div>
      </article>

      <div className="py-10 lg:py-14 bg-white">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <div className="space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-[15px] sm:text-base text-gray-600 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-[#E8E8EC] bg-gradient-to-b from-white to-[#FAFAFC]">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-2">
              Relevant OPERAVA service
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{article.relatedServiceLabel}</h3>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Insights articles provide general business information first. When the topic relates
              to an OPERAVA capability, you can explore the related service for scope and delivery
              options.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={article.relatedServiceHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
              >
                View service
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Contact OPERAVA
              </Link>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
          <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Insights</h2>
            <div className="space-y-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/insights/${categorySlug}/${r.slug}`}
                  className="group flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-violet-200 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
                      {r.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{r.readingMinutes} min read</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-violet-500 shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
