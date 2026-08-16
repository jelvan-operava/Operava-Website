import type { Service } from '../../data/services'
import type { LanguageCode } from '../translations'

export interface LocalizedService {
  name: string
  shortDescription: string
  description?: string
  capabilities?: string[]
  benefits?: string[]
}

// Localized service overrides for top services across all languages
export const localizedServiceMap: Record<string, Partial<Record<LanguageCode, LocalizedService>>> = {
  'software-development': {
    es: {
      name: 'Desarrollo de Software',
      shortDescription: 'Soluciones de software personalizadas diseñadas según sus flujos de trabajo y crecimiento.',
    },
    fr: {
      name: 'Développement Logiciel',
      shortDescription: 'Solutions logicielles sur mesure conçues selon vos exigences et votre croissance.',
    },
    de: {
      name: 'Softwareentwicklung',
      shortDescription: 'Individuelle Softwarelösungen, abgestimmt auf Ihre Prozesse und Ihr Wachstum.',
    },
    ja: {
      name: 'カスタムソフトウェア開発',
      shortDescription: '業務フローと事業成長に合わせて設計された専用ソフトウェアソリューション。',
    },
    zh: {
      name: '定制软件研发',
      shortDescription: '围绕您的业务流程与长期增长量身打造的定制软件解决方案。',
    },
    fil: {
      name: 'Pagbuo ng Software',
      shortDescription: 'Pasadyang mga solusyon sa software na dinisenyo para sa iyong operasyon at paglago.',
    },
    ar: {
      name: 'تطوير البرمجيات المخصصة',
      shortDescription: 'حلول برمجية مخصصة ومصممة وفقاً لمتطلبات عملك ونموك المستقبلي.',
    },
  },
  'web-mobile-development': {
    es: {
      name: 'Desarrollo Web y Móvil',
      shortDescription: 'Sitios web modernos, aplicaciones web y experiencias móviles de alto rendimiento.',
    },
    fr: {
      name: 'Développement Web & Mobile',
      shortDescription: 'Applications web modernes et expériences mobiles performantes et évolutives.',
    },
    de: {
      name: 'Web- & App-Entwicklung',
      shortDescription: 'Moderne Websites und mobile Erlebnisse für maximale Leistung und Skalierbarkeit.',
    },
    ja: {
      name: 'Web・モバイルアプリ開発',
      shortDescription: '高速性、操作性、拡張性を兼ね備えた最新のWebおよびモバイル体験。',
    },
    zh: {
      name: 'Web 与移动应用研发',
      shortDescription: '专为高性能、易用性与规模化打造的现代化 Web 与移动端体验。',
    },
    fil: {
      name: 'Paggawa ng Web at Mobile App',
      shortDescription: 'Mga modernong website at mobile app na dinisenyo para sa bilis at ganda ng gamit.',
    },
    ar: {
      name: 'تطوير تطبيقات الويب والموبايل',
      shortDescription: 'تطبيقات ومواقع حديثة مصممة للأداء العالي وسهولة الاستخدام وقابلية التوسع.',
    },
  },
  'customer-support': {
    es: {
      name: 'Soporte y Atención al Cliente',
      shortDescription: 'Equipos multilingües de atención omnicanal 24/7 dedicados a su marca.',
    },
    fr: {
      name: 'Support & Service Client',
      shortDescription: 'Équipes omnicanales multilingues 24/7 dédiées à l’excellence de votre marque.',
    },
    de: {
      name: 'Kundenservice & Support',
      shortDescription: 'Mehrsprachige 24/7-Omnichannel-Teams für erstklassigen Kundenservice.',
    },
    ja: {
      name: 'カスタマーサポート代行',
      shortDescription: '24時間365日対応のマルチリンガル・オムニチャネル対応チーム。',
    },
    zh: {
      name: '客户服务与技术支持',
      shortDescription: '全天候 24/7 多语种全渠道客户支持团队，守护您的品牌声誉。',
    },
    fil: {
      name: 'Suporta at Serbisyong Pang-kustomer',
      shortDescription: 'Mga dedikadong koponan para sa 24/7 suporta sa customer sa iba’t ibang wika.',
    },
    ar: {
      name: 'خدمة ودعم العملاء 24/7',
      shortDescription: 'فرق متعددة القنوات واللغات تعمل على مدار الساعة لخدمة عملائك بأعلى معايير الجودة.',
    },
  },
  'back-office-operations': {
    es: {
      name: 'Operaciones de Back-Office',
      shortDescription: 'Procesamiento de datos preciso y gestión administrativa para agilizar sus operaciones.',
    },
    fr: {
      name: 'Opérations Back-Office',
      shortDescription: 'Traitement de données précis et gestion administrative pour fluidifier vos processus.',
    },
    de: {
      name: 'Back-Office & Administration',
      shortDescription: 'Präzise Datenverarbeitung und administrative Entlastung für Ihr Kerngeschäft.',
    },
    ja: {
      name: 'バックオフィス業務代行',
      shortDescription: '正確なデータ処理と事務代行により、コア業務への集中をサポート。',
    },
    zh: {
      name: '后台运营与数据处理',
      shortDescription: '高精度的数据录入、审批流与行政事务支持，大幅提升日常流转效率。',
    },
    fil: {
      name: 'Mga Operasyon sa Back-Office',
      shortDescription: 'Tumpak na pagproseso ng datos at gawaing administratibo para sa iyong negosyo.',
    },
    ar: {
      name: 'عمليات المكاتب الخلفية وإدخال البيانات',
      shortDescription: 'معالجة دقيقة للبيانات وإدارة إدارية محكمة لتسريع وتيرة العمليات.',
    },
  },
}

export function getLocalizedService(service: Service, lang: LanguageCode): Service {
  const localized = localizedServiceMap[service.id]?.[lang]
  if (!localized) return service

  return {
    ...service,
    name: localized.name || service.name,
    shortDescription: localized.shortDescription || service.shortDescription,
    description: localized.description || service.description,
    capabilities: localized.capabilities || service.capabilities,
    benefits: localized.benefits || service.benefits,
  }
}
