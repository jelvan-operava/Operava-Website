import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import {
  type LanguageCode,
  type LanguageOption,
  SUPPORTED_LANGUAGES,
  translations,
} from './translations'

interface LanguageContextType {
  language: LanguageCode
  currentLanguage: LanguageOption
  supportedLanguages: LanguageOption[]
  setLanguage: (code: LanguageCode) => void
  t: (key: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'operava_language'

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved
      }
      // Check browser navigator language
      const browserLang = navigator.language.slice(0, 2).toLowerCase()
      const match = SUPPORTED_LANGUAGES.find((l) => l.code === browserLang)
      if (match) return match.code
    } catch {
      // ignore
    }
    return 'en'
  })

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // ignore
    }
  }

  const currentLanguage = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0]
  }, [language])

  useEffect(() => {
    // Update document lang and direction
    document.documentElement.lang = language
    document.documentElement.dir = currentLanguage.dir || 'ltr'
  }, [language, currentLanguage])

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language]
    if (langDict && langDict[key]) {
      return langDict[key]
    }
    // Fallback to English
    const enDict = translations.en
    if (enDict && enDict[key]) {
      return enDict[key]
    }
    return fallback || key
  }

  const value = {
    language,
    currentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    setLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
