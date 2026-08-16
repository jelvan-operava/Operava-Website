import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import type { LanguageCode } from '../i18n/translations'

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile'
  className?: string
}

export default function LanguageSwitcher({ variant = 'desktop', className = '' }: LanguageSwitcherProps) {
  const { language, currentLanguage, supportedLanguages, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code)
    setIsOpen(false)
  }

  if (variant === 'mobile') {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-violet-600" />
          <span>{t('nav.language', 'Language')}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-50 rounded-2xl border border-gray-100">
          {supportedLanguages.map((lang) => {
            const isSelected = lang.code === language
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                type="button"
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isSelected
                    ? 'bg-violet-700 text-white shadow-xs font-semibold'
                    : 'text-gray-700 hover:bg-white hover:text-gray-950 active:bg-gray-200/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-sm shrink-0">{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
        type="button"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-xl border transition-all duration-200 ${
          isOpen
            ? 'bg-violet-50 text-violet-700 border-violet-200 ring-2 ring-violet-500/20'
            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
        aria-expanded={isOpen}
        aria-label={t('nav.selectLanguage', 'Select Language')}
        title={t('nav.selectLanguage', 'Select Language')}
      >
        <span className="text-sm shrink-0 leading-none">{currentLanguage.flag}</span>
        <span className="font-semibold uppercase text-xs tracking-wider">{currentLanguage.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-violet-600' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-50 animate-fade-in divide-y divide-gray-100">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-gray-400">
            {t('nav.selectLanguage', 'Select Language')}
          </div>
          <div className="py-1 max-h-72 overflow-y-auto space-y-0.5">
            {supportedLanguages.map((lang) => {
              const isSelected = lang.code === language
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors duration-150 text-left ${
                    isSelected
                      ? 'bg-violet-50 text-violet-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{lang.flag}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-gray-900 truncate">{lang.nativeName}</span>
                      <span className="text-[10px] text-gray-400 truncate">{lang.name}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-violet-600 shrink-0 ml-2" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
