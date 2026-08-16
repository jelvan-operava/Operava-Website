import type { Service } from '../../data/services'
import type { LanguageCode } from '../translations'

export interface LocalizedService {
  name: string
  shortDescription: string
  description?: string
  capabilities?: string[]
  benefits?: string[]
}

// Complete localized service map covering all 29 services across all supported languages
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
  'saas-platform-development': {
    es: {
      name: 'Desarrollo de Plataformas SaaS',
      shortDescription: 'Productos SaaS escalables y plataformas digitales para operaciones comerciales recurrentes.',
    },
    fr: {
      name: 'Développement de Plateformes SaaS',
      shortDescription: 'Produits SaaS évolutifs et plateformes numériques pour modèles récurrents.',
    },
    de: {
      name: 'SaaS- & Plattform-Entwicklung',
      shortDescription: 'Skalierbare Software-as-a-Service-Produkte und Plattformen für wiederkehrende Modelle.',
    },
    ja: {
      name: 'SaaS・プラットフォーム開発',
      shortDescription: '事業拡大に伴走するスケーラブルなSaaS製品およびクラウドプラットフォーム構築。',
    },
    zh: {
      name: 'SaaS 与数字平台开发',
      shortDescription: '专为订阅制与持续增长业务打造的高可用 SaaS 软件与数字平台。',
    },
    fil: {
      name: 'Pagbuo ng SaaS at Platform',
      shortDescription: 'Mabilis lumagong mga produktong SaaS at digital platform para sa patuloy na negosyo.',
    },
    ar: {
      name: 'تطوير منصات البرمجيات كخدمة (SaaS)',
      shortDescription: 'منتجات برمجية سحابية ومنصات رقمية قابلة للتوسع ومبنية لنمو الأعمال المستمر.',
    },
  },
  'it-systems-development': {
    es: {
      name: 'Desarrollo de Sistemas de TI',
      shortDescription: 'Sistemas empresariales diseñados para automatizar flujos de trabajo y mejorar la eficiencia.',
    },
    fr: {
      name: 'Développement de Systèmes IT',
      shortDescription: 'Systèmes d’entreprise conçus pour automatiser les flux et maximiser l’efficacité.',
    },
    de: {
      name: 'IT-Systementwicklung',
      shortDescription: 'Unternehmenssysteme zur Workflow-Automatisierung und Steigerung der operativen Effizienz.',
    },
    ja: {
      name: 'IT業務システム開発',
      shortDescription: '社内ワークフローを自動化し業務効率を飛躍させるエンタープライズシステム。',
    },
    zh: {
      name: '企业 IT 系统开发',
      shortDescription: '通过数字化工作流与自动化管理系统，全面消除繁琐人工操作并提升效能。',
    },
    fil: {
      name: 'Pagbuo ng mga IT System',
      shortDescription: 'Mga internal na sistema upang gawing awtomatiko at mabilis ang mga proseso sa opisina.',
    },
    ar: {
      name: 'تطوير أنظمة تكنولوجيا المعلومات',
      shortDescription: 'أنظمة أعمال مصممة لأتمتة سير العمل ورفع الكفاءة التشغيلية للمؤسسات.',
    },
  },
  'computer-programming': {
    es: {
      name: 'Programación Informática',
      shortDescription: 'Servicios de programación profesional en tecnologías y arquitecturas modernas.',
    },
    fr: {
      name: 'Programmation Informatique',
      shortDescription: 'Services de programmation spécialisés sur des architectures et technologies modernes.',
    },
    de: {
      name: 'Computer-Programmierung',
      shortDescription: 'Professionelle Programmierdienste über modernste Technologien und Architekturen.',
    },
    ja: {
      name: 'プログラミング・受託開発',
      shortDescription: '最新のフレームワークと堅牢なアーキテクチャによる高品質なコーディングサービス。',
    },
    zh: {
      name: '计算机编程与工程开发',
      shortDescription: '涵盖现代技术栈的高标准后端、前端、API 接口与数据库开发和优化。',
    },
    fil: {
      name: 'Computer Programming',
      shortDescription: 'Propesyonal na serbisyo sa programming gamit ang mga makabagong teknolohiya.',
    },
    ar: {
      name: 'خدمات البرمجة وهندسة البرمجيات',
      shortDescription: 'برمجة وتطوير احترافي عبر أحدث التقنيات وبنى البرمجيات المتقدمة.',
    },
  },
  'it-consulting': {
    es: {
      name: 'Consultoría de TI',
      shortDescription: 'Orientación tecnológica estratégica que conecta los objetivos del negocio con soluciones prácticas.',
    },
    fr: {
      name: 'Conseil en Stratégie IT',
      shortDescription: 'Conseil technologique stratégique alignant objectifs d’entreprise et solutions concrètes.',
    },
    de: {
      name: 'IT-Beratung & Strategie',
      shortDescription: 'Strategische Technologieberatung für fundierte und zukunftssichere Geschäftsentscheidungen.',
    },
    ja: {
      name: 'ITコンサルティング',
      shortDescription: '経営課題と実践的な技術ソリューションを結ぶ戦略的テクノロジーアドバイザリー。',
    },
    zh: {
      name: 'IT 战略与技术咨询',
      shortDescription: '结合业务战略与实用技术架构，提供数字化转型路线图与评估咨询。',
    },
    fil: {
      name: 'Konsultasyon sa IT',
      shortDescription: 'Estratehikong gabay sa teknolohiya upang tugunan ang mga layunin ng iyong negosyo.',
    },
    ar: {
      name: 'الاستشارات التقنية وتكنولوجيا المعلومات',
      shortDescription: 'توجيه تكنولوجي استراتيجي يربط أهداف أعمالك بالحلول التقنية الفعالة.',
    },
  },
  'systems-integration': {
    es: {
      name: 'Integración de Sistemas',
      shortDescription: 'Conecte aplicaciones, plataformas y sistemas en un entorno unificado.',
    },
    fr: {
      name: 'Intégration de Systèmes',
      shortDescription: 'Connectez vos applications, plateformes et outils au sein d’un écosystème coordonné.',
    },
    de: {
      name: 'Systemintegration',
      shortDescription: 'Nahtlose Verbindung von Anwendungen und Plattformen in einer koordinierten Umgebung.',
    },
    ja: {
      name: 'システムインテグレーション',
      shortDescription: 'API連携やデータ同期を通じて散在するシステムを統合された環境へ集約。',
    },
    zh: {
      name: '系统集成与 API 互联',
      shortDescription: '打通应用孤岛与第三方平台，构建高协同、自动化的现代企业技术生态。',
    },
    fil: {
      name: 'Pagsasama-sama ng Sistema',
      shortDescription: 'Pag-ugnayin ang mga app at software sa iisang maayos na kapaligiran.',
    },
    ar: {
      name: 'تكامل الأنظمة والربط التقني',
      shortDescription: 'ربط التطبيقات والمنصات وأنظمة الأعمال في بيئة تكنولوجية متكاملة ومنسقة.',
    },
  },
  'database-services': {
    es: {
      name: 'Servicios de Bases de Datos',
      shortDescription: 'Diseño, optimización, administración y gestión confiable de bases de datos.',
    },
    fr: {
      name: 'Services de Bases de Données',
      shortDescription: 'Conception, administration, optimisation et sécurisation de vos bases de données.',
    },
    de: {
      name: 'Datenbank-Services',
      shortDescription: 'Zuverlässiges Datenbankdesign, Verwaltung, Leistungsoptimierung und Administration.',
    },
    ja: {
      name: 'データベース設計・運用管理',
      shortDescription: '高可用性・高速処理・堅牢なセキュリティを実現するデータベースの設計と運用。',
    },
    zh: {
      name: '数据库设计与运维管理',
      shortDescription: '提供高可靠的数据库架构设计、性能调优、备份恢复与 24/7 监控支持。',
    },
    fil: {
      name: 'Mga Serbisyo sa Database',
      shortDescription: 'Maaasahang disenyo, pamamahala, at pagpapabilis ng iyong mga database.',
    },
    ar: {
      name: 'خدمات وإدارة قواعد البيانات',
      shortDescription: 'تصميم وإدارة وتحسين قواعد البيانات لضمان أمان البيانات وسرعة استرجاعها.',
    },
  },
  'cloud-services': {
    es: {
      name: 'Servicios en la Nube',
      shortDescription: 'Soluciones en la nube diseñadas para escalabilidad, fiabilidad y seguridad.',
    },
    fr: {
      name: 'Services Cloud',
      shortDescription: 'Solutions cloud sécurisées conçues pour l’évolutivité, la fiabilité et l’efficience.',
    },
    de: {
      name: 'Cloud-Lösungen & DevOps',
      shortDescription: 'Skalierbare und hochsichere Cloud-Infrastrukturen für moderne Unternehmen.',
    },
    ja: {
      name: 'クラウド・DevOpsサービス',
      shortDescription: 'AWS/GCP/Azureを活用したスケーラブルで安全かつ費用対効果の高いクラウド構築。',
    },
    zh: {
      name: '云计算与云原生架构',
      shortDescription: '多云迁移、基础设施即代码（IaC）、成本优化与高可用弹性云端部署。',
    },
    fil: {
      name: 'Mga Serbisyo sa Cloud',
      shortDescription: 'Mga solusyon sa cloud na ligtas, mabilis lumago, at matipid sa gastos.',
    },
    ar: {
      name: 'الخدمات السحابية والترحيل السحابي',
      shortDescription: 'حلول سحابية مصممة لقابلية التوسع والموثوقية العالية والأمان التشغيلي.',
    },
  },
  'website-hosting': {
    es: {
      name: 'Alojamiento Web Gestionado',
      shortDescription: 'Entornos de alojamiento confiables y optimizados para sitios y plataformas web.',
    },
    fr: {
      name: 'Hébergement Web Géré',
      shortDescription: 'Infrastructures d’hébergement fiables, sécurisées et performantes pour vos sites web.',
    },
    de: {
      name: 'Managed Webhosting',
      shortDescription: 'Zuverlässiges Hosting für Websites und Plattformen mit höchster Verfügbarkeit.',
    },
    ja: {
      name: 'マネージドWebホスティング',
      shortDescription: '高速CDN、SSL証明書、24/7死活監視を備えた堅牢なWebホスティング基盤。',
    },
    zh: {
      name: '网站托管与 CDN 加速',
      shortDescription: '高可用、低延迟的现代化云端网站托管、SSL 部署与全天候运行监控。',
    },
    fil: {
      name: 'Website Hosting',
      shortDescription: 'Maaasahang hosting para sa mabilis at ligtas na takbo ng iyong website.',
    },
    ar: {
      name: 'استضافة المواقع والمنصات الرقمية',
      shortDescription: 'بيئات استضافة سحابية سريعة ومحمية مع ضمان استمرارية العمل على مدار الساعة.',
    },
  },
  'application-hosting': {
    es: {
      name: 'Alojamiento de Aplicaciones',
      shortDescription: 'Entornos optimizados para ejecutar aplicaciones comerciales de misión crítica.',
    },
    fr: {
      name: 'Hébergement d’Applications',
      shortDescription: 'Environnements d’hébergement conçus pour exécuter vos applications critiques.',
    },
    de: {
      name: 'Application Hosting',
      shortDescription: 'Robuste Hosting-Umgebungen für geschäftskritische Applikationen und Workloads.',
    },
    ja: {
      name: 'アプリケーションホスティング',
      shortDescription: '自動スケーリングとログ監視を備えた業務アプリケーション運用環境。',
    },
    zh: {
      name: '应用系统托管与运维',
      shortDescription: '自动扩缩容、全链路日志监控与高可用容器化应用托管基础设施。',
    },
    fil: {
      name: 'Application Hosting',
      shortDescription: 'Ligtas at maaasahang kapaligiran para patakbuhin ang iyong mga negosyong app.',
    },
    ar: {
      name: 'استضافة وإدارة التطبيقات السحابية',
      shortDescription: 'بيئات استضافة مخصصة ومراقبة لضمان تشغيل التطبيقات المؤسسية بكفاءة تامة.',
    },
  },
  'data-processing-it': {
    es: {
      name: 'Procesamiento de Datos TI',
      shortDescription: 'Transformación, validación y control de calidad de datos comerciales estructurados.',
    },
    fr: {
      name: 'Traitement de Données IT',
      shortDescription: 'Transformation, validation et contrôle qualité précis de vos données structurées.',
    },
    de: {
      name: 'IT-Datenverarbeitung',
      shortDescription: 'Präzise Datenbereinigung, Transformation und strukturierte Datenverwaltung.',
    },
    ja: {
      name: 'ITデータプロセッシング',
      shortDescription: 'データのクレンジング、形式変換、構造化検証を行う高品質データ処理。',
    },
    zh: {
      name: 'IT 数据清洗与流水线处理',
      shortDescription: '结构化数据转换、校验、清洗与质量控制，确保企业数据的纯净与精准。',
    },
    fil: {
      name: 'Pagproseso ng Datos sa IT',
      shortDescription: 'Mabilis at tumpak na pag-aayos at pagproseso ng mga digital na datos.',
    },
    ar: {
      name: 'معالجة البيانات الرقمية وتقنية المعلومات',
      shortDescription: 'معالجة وتنقية وتحويل البيانات المنظمة لتشغيل المؤسسات على معلومات دقيقة وموثوقة.',
    },
  },
  'it-infrastructure-support': {
    es: {
      name: 'Infraestructura de TI y Soporte Técnico',
      shortDescription: 'Soporte técnico y administración de sistemas para mantener operaciones continuas.',
    },
    fr: {
      name: 'Infrastructure IT & Support Technique',
      shortDescription: 'Supervision des infrastructures et support technique pour une continuité opérationnelle.',
    },
    de: {
      name: 'IT-Infrastruktur & Technischer Support',
      shortDescription: 'Infrastrukturüberwachung, Systemadministration und zuverlässige Fehlerbehebung.',
    },
    ja: {
      name: 'ITインフラ構築・テクニカルサポート',
      shortDescription: 'サーバー監視、端末管理、インシデント迅速対応によるダウンタイムの極小化。',
    },
    zh: {
      name: 'IT 基础设施与技术运维支持',
      shortDescription: '全天候网络基础设施监控、端点支持、系统管理与快速故障响应。',
    },
    fil: {
      name: 'Suporta sa IT Infrastructure',
      shortDescription: 'Pagsubaybay at teknikal na suporta upang manatiling maayos ang takbo ng mga sistema.',
    },
    ar: {
      name: 'البنية التحتية لتكنولوجيا المعلومات والدعم الفني',
      shortDescription: 'مراقبة وإدارة البنية التحتية والأنظمة التقنية لضمان استمرارية الأعمال وحل المشكلات.',
    },
  },

  // ── BPO SERVICES ──
  'customer-service': {
    es: {
      name: 'Atención y Servicio al Cliente',
      shortDescription: 'Equipos multicanal profesionales dedicados a brindar una experiencia de cliente excepcional.',
    },
    fr: {
      name: 'Service Client Omnicanal',
      shortDescription: 'Équipes professionnelles multicanales dédiées à une expérience client irréprochable.',
    },
    de: {
      name: 'Kundenservice & Betreuung',
      shortDescription: 'Professionelle Multichannel-Support-Teams für erstklassige Kundenerlebnisse.',
    },
    ja: {
      name: 'カスタマーサービス代行',
      shortDescription: '電話・チャット・メールに対応した高品質なマルチチャネル顧客対応。',
    },
    zh: {
      name: '全渠道客户服务外包',
      shortDescription: '覆盖语音、在线聊天与邮件的专业客服团队，显著提升客户满意度与留存率。',
    },
    fil: {
      name: 'Serbisyo sa Kustomer',
      shortDescription: 'Propesyonal na suporta sa pamamagitan ng tawag, chat, at email para sa iyong mga kustomer.',
    },
    ar: {
      name: 'خدمة العملاء والاتصال متعدد القنوات',
      shortDescription: 'فرق مدربة واحترافية لتقديم الدعم الصوتي وعبر البريد والمحادثات المباشرة 24/7.',
    },
  },
  'customer-support': {
    es: {
      name: 'Atención y Servicio al Cliente',
      shortDescription: 'Equipos multicanal profesionales dedicados a brindar una experiencia de cliente excepcional.',
    },
    fr: {
      name: 'Service Client Omnicanal',
      shortDescription: 'Équipes professionnelles multicanales dédiées à une expérience client irréprochable.',
    },
    de: {
      name: 'Kundenservice & Betreuung',
      shortDescription: 'Professionelle Multichannel-Support-Teams für erstklassige Kundenerlebnisse.',
    },
    ja: {
      name: 'カスタマーサービス代行',
      shortDescription: '電話・チャット・メールに対応した高品質なマルチチャネル顧客対応。',
    },
    zh: {
      name: '全渠道客户服务外包',
      shortDescription: '覆盖语音、在线聊天与邮件的专业客服团队，显著提升客户满意度与留存率。',
    },
    fil: {
      name: 'Serbisyo sa Kustomer',
      shortDescription: 'Propesyonal na suporta sa pamamagitan ng tawag, chat, at email para sa iyong mga kustomer.',
    },
    ar: {
      name: 'خدمة العملاء والاتصال متعدد القنوات',
      shortDescription: 'فرق مدربة واحترافية لتقديم الدعم الصوتي وعبر البريد والمحادثات المباشرة 24/7.',
    },
  },
  'technical-support': {
    es: {
      name: 'Soporte Técnico Especializado',
      shortDescription: 'Resolución eficiente de incidentes tecnológicos por niveles para productos y software.',
    },
    fr: {
      name: 'Support Technique Spécialisé',
      shortDescription: 'Résolution rapide des incidents logiciels et matériels avec gestion des escalades.',
    },
    de: {
      name: 'Technischer Support (L1-L3)',
      shortDescription: 'Schnelle und kompetente Fehlerbehebung bei Software-, SaaS- und Technologieproblemen.',
    },
    ja: {
      name: 'テクニカルサポート代行',
      shortDescription: 'L1〜L3のトラブルシューティングとチケット管理を行う専任エンジニアチーム。',
    },
    zh: {
      name: 'L1-L3 级别技术支持',
      shortDescription: '面向 SaaS 产品与软硬件的高水准技术排错、工单管理与快速上报支持。',
    },
    fil: {
      name: 'Teknikal na Suporta',
      shortDescription: 'Mabilis na paglutas sa mga teknikal na aberya at pagtulong sa mga user.',
    },
    ar: {
      name: 'الدعم الفني التقني المتخصص',
      shortDescription: 'مساعدة فنية وإدارة تذاكر الدعم لحل المشكلات التقنية للمنتجات والبرمجيات بكفاءة.',
    },
  },
  'help-desk': {
    es: {
      name: 'Mesa de Ayuda (Help Desk)',
      shortDescription: 'Gestión estructurada de incidentes, ticketing y soporte continuo para usuarios.',
    },
    fr: {
      name: 'Centre d’Assistance (Help Desk)',
      shortDescription: 'Gestion des tickets d’incidents, support utilisateurs et maintien de la base de connaissances.',
    },
    de: {
      name: 'Help Desk Services',
      shortDescription: 'Strukturierte Helpdesk-Abläufe, Ticketing und strukturierte Nutzerbetreuung.',
    },
    ja: {
      name: 'ヘルプデスク運営代行',
      shortDescription: 'ユーザー問い合わせの一元管理とナレッジベース構築による解決率向上。',
    },
    zh: {
      name: '企业 Help Desk 服务台',
      shortDescription: '标准化的服务台运营、事件管理流与知识库维护，显著提升用户响应满意度。',
    },
    fil: {
      name: 'Help Desk Services',
      shortDescription: 'Maayos na pamamahala ng mga ticket at agarang tulong para sa mga gumagamit.',
    },
    ar: {
      name: 'مكتب المساعدة وإدارة البلاغات',
      shortDescription: 'خدمات شاملة لمكتب المساعدة تشمل إدارة التذاكر وحل المشكلات ودعم المستخدمين.',
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
      name: '后台运营与行政事务支持',
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
  'data-processing-bpo': {
    es: {
      name: 'Procesamiento Masivo de Datos BPO',
      shortDescription: 'Validación, conversión y organización precisa de grandes volúmenes de datos.',
    },
    fr: {
      name: 'Traitement de Données BPO',
      shortDescription: 'Traitement, nettoyage et structuration à grande échelle de vos informations.',
    },
    de: {
      name: 'BPO-Datenverarbeitung',
      shortDescription: 'Skalierbare Datenkonvertierung, Validierung und Bereinigung mit höchster Präzision.',
    },
    ja: {
      name: 'BPOデータプロセッシング',
      shortDescription: '大量データの正確な入力・検証・変換・整理を一括して代行。',
    },
    zh: {
      name: 'BPO 大规模数据处理',
      shortDescription: '海量业务数据的清洗、验证、格式转换与结构化管理，确保数据资产安全准确。',
    },
    fil: {
      name: 'Pagproseso ng Datos sa BPO',
      shortDescription: 'Mabilis at eksaktong pagproseso at pagsasaayos ng malalaking bulto ng impormasyon.',
    },
    ar: {
      name: 'معالجة البيانات الضخمة (BPO)',
      shortDescription: 'معالجة دقيقة وتدقيق وتحويل للبيانات على نطاق واسع لضمان أعلى معايير الجودة.',
    },
  },
  'data-entry': {
    es: {
      name: 'Servicios de Entrada de Datos',
      shortDescription: 'Captura y digitalización rápida y precisa de información empresarial.',
    },
    fr: {
      name: 'Saisie de Données',
      shortDescription: 'Saisie précise, indexation et numérisation de vos documents et bases de données.',
    },
    de: {
      name: 'Datenerfassung & Dateneingabe',
      shortDescription: 'Schnelle und fehlerfreie Datenerfassung zur Pflege aktueller Geschäftsunterlagen.',
    },
    ja: {
      name: 'データ入力代行',
      shortDescription: 'フォーム入力、紙媒体の電子化、インデックス作成など高精度な入力代行。',
    },
    zh: {
      name: '高精度数据录入与数字化',
      shortDescription: '表单数据录入、文档数字化转换、档案索引与严格的双重校对机制。',
    },
    fil: {
      name: 'Data Entry Services',
      shortDescription: 'Mabilis at tumpak na pag-encode ng mga impormasyon at dokumento sa database.',
    },
    ar: {
      name: 'خدمات إدخال البيانات والرقمنة',
      shortDescription: 'إدخال دقيق للبيانات، رقمنة المستندات، وفهرسة المعلومات بسرعة وجودة فائقة.',
    },
  },
  'document-processing': {
    es: {
      name: 'Procesamiento de Documentos',
      shortDescription: 'Indexación, extracción de datos y gestión de archivos y registros digitales.',
    },
    fr: {
      name: 'Traitement de Documents',
      shortDescription: 'Indexation, extraction de données et numérisation documentaire à grande échelle.',
    },
    de: {
      name: 'Dokumentenverarbeitung',
      shortDescription: 'Klassifizierung, Extraktion und digitale Verwaltung von Geschäftsunterlagen.',
    },
    ja: {
      name: 'ドキュメント処理・電子ファイリング',
      shortDescription: '書類の自動分類、データ抽出、インデックス付与による文書管理の効率化。',
    },
    zh: {
      name: '文档处理与智能信息提取',
      shortDescription: '企业文档分类、关键数据抽取、数字化归档与合规记录管理。',
    },
    fil: {
      name: 'Pagproseso ng mga Dokumento',
      shortDescription: 'Pag-aayos, pag-extract ng datos, at pag-archive ng mga digital na dokumento.',
    },
    ar: {
      name: 'معالجة وإدارة الوثائق والمستندات',
      shortDescription: 'استخراج البيانات، تصنيف المستندات، والتحول الرقمي لإدارة السجلات بكفاءة.',
    },
  },
  'virtual-assistance': {
    es: {
      name: 'Asistencia Virtual Ejecutiva',
      shortDescription: 'Profesionales remotos capacitados para soporte administrativo y operativo.',
    },
    fr: {
      name: 'Assistance Virtuelle',
      shortDescription: 'Professionnels à distance qualifiés pour la gestion administrative et le soutien opérationnel.',
    },
    de: {
      name: 'Virtuelle Assistenz',
      shortDescription: 'Flexible Remote-Assistenten für Terminkoordination, Recherche und Organisation.',
    },
    ja: {
      name: 'オンラインアシスタント（秘書代行）',
      shortDescription: 'スケジュール管理、メール対応、リサーチ等を代行する優秀なリモート専任スタッフ。',
    },
    zh: {
      name: '虚拟助理与远程行政支持',
      shortDescription: '严选高素质远程专员，提供日程安排、邮件管理、市场调研与日常行政协同。',
    },
    fil: {
      name: 'Virtual Assistance',
      shortDescription: 'Maaasahang mga virtual assistant para sa pamamahala ng oras, email, at mga gawaing pang-opisina.',
    },
    ar: {
      name: 'المساعد الافتراضي والمهام الإدارية',
      shortDescription: 'محترفون مؤهلون عن بُعد لدعم إدارة المواعيد والبريد والبحوث والمهام اليومية.',
    },
  },
  'finance-accounting-support': {
    es: {
      name: 'Soporte Contable y Financiero',
      shortDescription: 'Cuentas por pagar, por cobrar, facturación y conciliaciones contables.',
    },
    fr: {
      name: 'Soutien Financier & Comptable',
      shortDescription: 'Comptabilité fournisseurs, clients, gestion des factures et rapprochements bancaires.',
    },
    de: {
      name: 'Finanz- & Buchhaltungssupport',
      shortDescription: 'Kreditoren-/Debitorenbuchhaltung, Rechnungsverarbeitung und Kontenabstimmung.',
    },
    ja: {
      name: '経理・会計事務サポート',
      shortDescription: '売掛・買掛金管理、請求書処理、照合作業など正確な経理オペレーション支援。',
    },
    zh: {
      name: '财务与会计核算支持',
      shortDescription: '应收应付账款核算、发票处理、银行对账及财务数据整理服务。',
    },
    fil: {
      name: 'Suporta sa Pinansyal at Accounting',
      shortDescription: 'Pagtulong sa pagproseso ng resibo, invoice, at pag-aayos ng mga talaang pinansyal.',
    },
    ar: {
      name: 'الدعم المالي وإدارة الحسابات',
      shortDescription: 'معالجة الفواتير، متابعة المدفوعات والتحصيلات، والتسويات المالية بدقة متناهية.',
    },
  },
  'hr-administration': {
    es: {
      name: 'Administración de Recursos Humanos',
      shortDescription: 'Gestión de expedientes, soporte en onboarding y administración de personal.',
    },
    fr: {
      name: 'Administration RH',
      shortDescription: 'Gestion des dossiers collaborateurs, processus d’intégration et soutien RH.',
    },
    de: {
      name: 'HR-Administration & Personalbetreuung',
      shortDescription: 'Mitarbeiterakten, Onboarding-Koordination und strukturierte HR-Prozessbegleitung.',
    },
    ja: {
      name: '人事・総務アシスタンス',
      shortDescription: '従業員データ管理、入社手続き、福利厚生オペレーションの円滑な遂行支援。',
    },
    zh: {
      name: '人力资源与人事行政管理',
      shortDescription: '员工档案管理、入职引导协同、考勤统计及人事文档标准化处理。',
    },
    fil: {
      name: 'Administrasyon ng HR',
      shortDescription: 'Pamamahala ng mga talaan ng empleyado, onboarding, at mga serbisyong pang-HR.',
    },
    ar: {
      name: 'إدارة الموارد البشرية والشؤون الإدارية',
      shortDescription: 'تنظيم سجلات الموظفين، تنسيق انضمام الكفاءات، وإدارة مستندات الموارد البشرية.',
    },
  },
  'recruitment-support': {
    es: {
      name: 'Soporte a la Selección y Reclutamiento',
      shortDescription: 'Búsqueda de candidatos, filtrado de perfiles y coordinación de entrevistas.',
    },
    fr: {
      name: 'Soutien au Recrutement',
      shortDescription: 'Sourcing de candidats, présélection des profils et coordination des entretiens.',
    },
    de: {
      name: 'Recruiting- & Talent-Sourcing-Support',
      shortDescription: 'Kandidatensourcing, Screening und strukturierte Intervieworganisation.',
    },
    ja: {
      name: '採用・リクルーティング支援',
      shortDescription: '候補者ソーシング、レジュメスクリーニング、面接日程調整の迅速な代行。',
    },
    zh: {
      name: '招聘支持与人才寻访协同',
      shortDescription: '候选人简历寻访、初筛评估、面试日程统筹与招聘流程全链路管理。',
    },
    fil: {
      name: 'Suporta sa Pagkuha ng Empleyado',
      shortDescription: 'Paghahanap ng kwalipikadong aplikante, pagsala, at pag-iskedyul ng panayam.',
    },
    ar: {
      name: 'دعم التوظيف واستقطاب الكفاءات',
      shortDescription: 'البحث عن الكفاءات، فحص طلبات التوظيف، وتنسيق المقابلات لتسريع عملية التعيين.',
    },
  },
  'payroll-admin': {
    es: {
      name: 'Gestión de Nóminas y Planillas',
      shortDescription: 'Procesamiento puntual y seguro de nóminas, tiempos y asistencia.',
    },
    fr: {
      name: 'Gestion de la Paie & Administration',
      shortDescription: 'Traitement des données de paie, gestion du temps et suivi des présences.',
    },
    de: {
      name: 'Lohn- & Gehaltsabrechnungs-Support',
      shortDescription: 'Zuverlässige Vorbereitung der Entgeltabrechnung und Zeiterfassung.',
    },
    ja: {
      name: '給与計算・勤怠管理サポート',
      shortDescription: '勤怠集計、給与データ作成、各種証明書発行など確実な労務事務代行。',
    },
    zh: {
      name: '薪资核算与考勤薪酬管理',
      shortDescription: '考勤工时统计、薪酬核算数据处理与合规报表整理，确保按时零差错发放。',
    },
    fil: {
      name: 'Payroll at Pamamahala ng Pasahod',
      shortDescription: 'Tumpak at ligtas na pagproseso ng sahod, oras, at attendance ng mga manggagawa.',
    },
    ar: {
      name: 'إدارة الرواتب والأجور والمعاملات',
      shortDescription: 'معالجة بيانات الرواتب، متابعة الحضور والانصراف، وإعداد التقارير بدقة عالية.',
    },
  },
  'research-analysis': {
    es: {
      name: 'Investigación y Análisis Estratégico',
      shortDescription: 'Estudios de mercado, análisis competitivo y síntesis de datos para decisiones.',
    },
    fr: {
      name: 'Recherche & Analyse Stratégique',
      shortDescription: 'Études de marché, veille concurrentielle et synthèse de données décisionnelles.',
    },
    de: {
      name: 'Marktforschung & Datenanalyse',
      shortDescription: 'Wettbewerbsanalysen, Informationsbeschaffung und aussagekräftige Marktberichte.',
    },
    ja: {
      name: 'リサーチ＆市場分析代行',
      shortDescription: '競合調査、市場トレンド分析、意思決定を支えるデータ収集とレポート作成。',
    },
    zh: {
      name: '商业调研与数据洞察分析',
      shortDescription: '深度行业研究、竞品动态追踪、数据归纳与定制化商业分析报告。',
    },
    fil: {
      name: 'Pananaliksik at Pagsusuri',
      shortDescription: 'Pangangalap ng datos, pagsusuri sa merkado, at pagbuo ng mahahalagang ulat.',
    },
    ar: {
      name: 'أبحاث السوق والتحليلات الاستراتيجية',
      shortDescription: 'أبحاث سوقية، تحليل المنافسين، واستخلاص الرؤى لدعم اتخاذ القرارات الذكية.',
    },
  },
  'knowledge-process-outsourcing': {
    es: {
      name: 'Externalización de Conocimiento (KPO)',
      shortDescription: 'Servicios analíticos avanzados y procesamiento de información especializada.',
    },
    fr: {
      name: 'Externalisation des Connaissances (KPO)',
      shortDescription: 'Services à haute valeur ajoutée, analyse avancée et expertise métier.',
    },
    de: {
      name: 'Knowledge Process Outsourcing (KPO)',
      shortDescription: 'Hochspezialisierte Wissensdienste, komplexe Analysen und Fachexpertise.',
    },
    ja: {
      name: 'ナレッジプロセスアウトソーシング (KPO)',
      shortDescription: '高度な専門知識を要する分析、レポート作成、知財・法務リサーチ支援。',
    },
    zh: {
      name: '知识流程外包 (KPO)',
      shortDescription: '依托高素质专业领域人才，提供深度分析、知识资产管理与专家级业务支持。',
    },
    fil: {
      name: 'Knowledge Process Outsourcing',
      shortDescription: 'Mataas na antas ng serbisyo sa pagsusuri ng datos at espesyalisadong kaalaman.',
    },
    ar: {
      name: 'الاستعانة بمصادر خارجية للعمليات المعرفية (KPO)',
      shortDescription: 'خدمات متقدمة قائمة على المعرفة والتحليل التخصصي وإدارة المعلومات المعقدة.',
    },
  },
  'supply-chain-support': {
    es: {
      name: 'Soporte a la Cadena de Suministro',
      shortDescription: 'Gestión de órdenes, compras, seguimiento de inventarios y logística.',
    },
    fr: {
      name: 'Soutien à la Chaîne Logistique',
      shortDescription: 'Gestion des commandes, suivi des stocks, approvisionnements et logistique.',
    },
    de: {
      name: 'Supply Chain & Logistik-Support',
      shortDescription: 'Auftragsabwicklung, Bestandsüberwachung und operative Beschaffungsunterstützung.',
    },
    ja: {
      name: 'サプライチェーン＆物流管理支援',
      shortDescription: '受発注管理、在庫トラッキング、仕入れ調達業務の円滑なオペレーション。',
    },
    zh: {
      name: '供应链与物流协同支持',
      shortDescription: '订单履约跟踪、采购协同、库存数据同步与全流程物流数据管理。',
    },
    fil: {
      name: 'Suporta sa Supply Chain at Logistika',
      shortDescription: 'Pamamahala ng mga order, imbentaryo, at koordinasyon sa pagpapadala.',
    },
    ar: {
      name: 'دعم سلاسل الإمداد والخدمات اللوجستية',
      shortDescription: 'إدارة الطلبات والمشتريات وتتبع المخزون وتنسيق العمليات اللوجستية بدقة.',
    },
  },
  'non-voice-processes': {
    es: {
      name: 'Otros Procesos No de Voz',
      shortDescription: 'Moderación de contenido, procesamiento de correos y QA operacional a medida.',
    },
    fr: {
      name: 'Processus Non-Vocaux Spécialisés',
      shortDescription: 'Modération de contenu, gestion d’e-mails et assurance qualité sur mesure.',
    },
    de: {
      name: 'Spezifische Non-Voice-Prozesse',
      shortDescription: 'Content-Moderation, E-Mail-Verarbeitung und individuelle Qualitätssicherung.',
    },
    ja: {
      name: '各種ノンボイス業務代行',
      shortDescription: 'コンテンツモデレーション、メール精査、業務品質保証（QA）など柔軟な代行。',
    },
    zh: {
      name: '定制化非语音业务流程外包',
      shortDescription: '内容审核、多语种邮件批量处理、业务质检（QA）与特定后台定制流程。',
    },
    fil: {
      name: 'Iba Pang Non-Voice Processes',
      shortDescription: 'Pag-moderate ng content, pagsagot sa email, at pagsusuri ng kalidad (QA).',
    },
    ar: {
      name: 'العمليات والخدمات غير الصوتية المتخصصة',
      shortDescription: 'إشراف ومراجعة المحتوى، معالجة رسائل البريد، وضمان جودة العمليات المخصصة.',
    },
  },
}

export function getLocalizedService(service: Service, lang: LanguageCode): Service {
  if (lang === 'en') return service

  const localized = localizedServiceMap[service.id]?.[lang] || localizedServiceMap[service.slug]?.[lang]
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
