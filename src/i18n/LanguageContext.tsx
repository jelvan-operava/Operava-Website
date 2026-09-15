import React, { createContext, useContext, useEffect, useMemo } from 'react'
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

/**
 * Multi-language UI is disabled site-wide.
 * The provider remains so existing `useLanguage()` / `t()` call sites keep working,
 * but language is permanently locked to English.
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: LanguageCode = 'en'

  const currentLanguage = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === 'en') || SUPPORTED_LANGUAGES[0]
  }, [])

  useEffect(() => {
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
    try {
      localStorage.removeItem('operava_language')
    } catch {
      // ignore
    }
  }, [])

  const setLanguage = (_code: LanguageCode) => {
    // No-op: multi-language feature removed
  }

  const t = (key: string, fallback?: string): string => {
    const enDict = translations.en
    if (enDict && enDict[key]) {
      return enDict[key]
    }
    return fallback || key
  }

  const value = {
    language,
    currentLanguage,
    supportedLanguages: [currentLanguage],
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
