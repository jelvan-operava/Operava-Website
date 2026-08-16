import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function ScrollToTopButton() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const currentScroll = window.scrollY

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100)
      }

      if (currentScroll > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!visible) return null

  // Circle radius math for SVG progress ring
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="fixed bottom-24 right-6 z-40 p-2.5 rounded-full bg-white text-violet-700 shadow-lg border border-gray-100 hover:bg-violet-50 hover:border-violet-200 active:scale-95 transition-all duration-300 group flex items-center justify-center"
      aria-label={t('common.scrollToTop', 'Scroll to top')}
      title={t('common.scrollToTop', 'Scroll to top')}
    >
      {/* Background SVG Progress Ring */}
      <svg className="w-10 h-10 -rotate-90 pointer-events-none absolute" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="2.5"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#7C3AED"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
      </svg>
      <ArrowUp className="w-5 h-5 text-violet-700 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  )
}
