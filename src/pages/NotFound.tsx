import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen flex items-center justify-center bg-white pt-16">
      <div className="max-w-md mx-auto px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">404</p>
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          {t('notFound.title', 'Page not found.')}
        </h1>
        <p className="text-base text-gray-500 mb-8">
          {t('notFound.desc', 'The page you are looking for does not exist or has been moved.')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
          >
            {t('notFound.returnHome', 'Return Home')}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:border-violet-200 hover:bg-violet-50 transition-colors"
          >
            {t('footer.contact', 'Contact Us')}
          </Link>
        </div>
      </div>
    </main>
  )
}
