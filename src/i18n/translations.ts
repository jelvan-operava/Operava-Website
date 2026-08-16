import { en } from './translations/en'
import { es } from './translations/es'
import { fr } from './translations/fr'
import { de } from './translations/de'
import { ja } from './translations/ja'
import { zh } from './translations/zh'
import { fil } from './translations/fil'
import { ar } from './translations/ar'

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'fil' | 'ar'

export interface LanguageOption {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
  dir?: 'ltr' | 'rtl'
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', dir: 'ltr' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
]

export const translations: Record<LanguageCode, Record<string, string>> = {
  en,
  es,
  fr,
  de,
  ja,
  zh,
  fil,
  ar,
}

export * from './translations/services'
