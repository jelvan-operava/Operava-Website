/**
 * Schema.org JSON-LD Generation & Dynamic Injection Utility for OPERAVA GLOBAL SOLUTIONS
 * 
 * Provides functions to generate path-specific BreadcrumbList and FAQPage JSON-LD objects,
 * as well as full Schema.org graph markup, and inject them dynamically into the document head
 * for pages across the site (e.g., /services, /about, /services/it, /contact, etc.).
 */

import { itServices, bpoServices, getServiceBySlug } from '../data/services'

export const BASE_URL = 'https://www.operavaglobal.com'
export const SITE_NAME = 'OPERAVA GLOBAL SOLUTIONS'
export const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/sdaxzncs/image/upload/v1786240859/Cover%20Photo.png'

export interface BreadcrumbItem {
  name: string
  item: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface BreadcrumbListSchema {
  [key: string]: unknown
  '@type': 'BreadcrumbList'
  '@id': string
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

export interface FAQPageSchema {
  [key: string]: unknown
  '@type': 'FAQPage'
  '@id': string
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

export interface DynamicSchemaResult {
  breadcrumbSchema: BreadcrumbListSchema | null
  faqSchema: FAQPageSchema | null
  fullGraph: Record<string, unknown>
}

// Canonical company core FAQs
export const CORE_COMPANY_FAQS: FAQItem[] = [
  {
    q: 'What is OPERAVA Global Solutions?',
    a: 'OPERAVA Global Solutions is a Philippine-based Corporation providing Workforce, Information Technology, and Business Process Outsourcing (BPO) services, operating remotely and globally.',
  },
  {
    q: 'Where is OPERAVA located and how do you operate?',
    a: 'OPERAVA has its registered corporate location in Pagudpud, Ilocos Norte, Philippines (Postal Code 2919), and operates with a distributed remote-first model connecting skilled Philippine professionals with clients worldwide across all international time zones.',
  },
  {
    q: 'What Information Technology (IT) services does OPERAVA offer?',
    a: 'We provide custom software development, web and mobile application engineering, SaaS platforms, legacy system modernization, database services, and enterprise systems integration.',
  },
  {
    q: 'What Business Process Outsourcing (BPO) solutions does OPERAVA provide?',
    a: 'We deliver 24/7 omnichannel customer service (voice, email, live chat, social), technical help desk, back-office data operations, workflow management, and dedicated virtual assistance.',
  },
  {
    q: 'How does OPERAVA ensure data security and regulatory compliance?',
    a: 'We enforce enterprise security protocols including strict role-based access control (RBAC), end-to-end encryption, regular audits, signed NDAs, and adherence to the Philippine Data Privacy Act (RA 10173) and global standards.',
  },
]

/**
 * Returns path-specific breadcrumb items matching the site structure.
 */
export function getBreadcrumbItemsForPath(pathname: string): BreadcrumbItem[] {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'
  const homeCrumb: BreadcrumbItem = { name: 'Home', item: `${BASE_URL}/` }

  if (cleanPath === '/') {
    return [homeCrumb]
  }

  if (cleanPath === '/about') {
    return [
      homeCrumb,
      { name: 'About Us', item: `${BASE_URL}/about` },
    ]
  }

  if (cleanPath === '/services') {
    return [
      homeCrumb,
      { name: 'Services & Solutions', item: `${BASE_URL}/services` },
    ]
  }

  if (cleanPath === '/services/it') {
    return [
      homeCrumb,
      { name: 'Services', item: `${BASE_URL}/services` },
      { name: 'Information Technology (IT) Services', item: `${BASE_URL}/services/it` },
    ]
  }

  if (cleanPath === '/services/bpo') {
    return [
      homeCrumb,
      { name: 'Services', item: `${BASE_URL}/services` },
      { name: 'Business Process Outsourcing (BPO) Services', item: `${BASE_URL}/services/bpo` },
    ]
  }

  if (cleanPath.startsWith('/services/it/')) {
    const slug = cleanPath.split('/').pop() || ''
    const service = getServiceBySlug(slug)
    const serviceName = service ? service.name : slug.replace(/-/g, ' ')
    return [
      homeCrumb,
      { name: 'Services', item: `${BASE_URL}/services` },
      { name: 'IT Services', item: `${BASE_URL}/services/it` },
      { name: serviceName, item: `${BASE_URL}${cleanPath}` },
    ]
  }

  if (cleanPath.startsWith('/services/bpo/')) {
    const slug = cleanPath.split('/').pop() || ''
    const service = getServiceBySlug(slug)
    const serviceName = service ? service.name : slug.replace(/-/g, ' ')
    return [
      homeCrumb,
      { name: 'Services', item: `${BASE_URL}/services` },
      { name: 'BPO Services', item: `${BASE_URL}/services/bpo` },
      { name: serviceName, item: `${BASE_URL}${cleanPath}` },
    ]
  }

  if (cleanPath === '/industries') {
    return [
      homeCrumb,
      { name: 'Industries & Sectors', item: `${BASE_URL}/industries` },
    ]
  }

  if (cleanPath === '/careers') {
    return [
      homeCrumb,
      { name: 'Careers & Remote Opportunities', item: `${BASE_URL}/careers` },
    ]
  }

  if (cleanPath === '/insights') {
    return [
      homeCrumb,
      { name: 'Insights & Thought Leadership', item: `${BASE_URL}/insights` },
    ]
  }

  if (cleanPath === '/contact') {
    return [
      homeCrumb,
      { name: 'Contact Us', item: `${BASE_URL}/contact` },
    ]
  }

  if (cleanPath === '/privacy') {
    return [
      homeCrumb,
      { name: 'Privacy Policy', item: `${BASE_URL}/privacy` },
    ]
  }

  if (cleanPath === '/terms') {
    return [
      homeCrumb,
      { name: 'Terms of Service', item: `${BASE_URL}/terms` },
    ]
  }

  return [
    homeCrumb,
    { name: cleanPath.replace(/^\//, '').replace(/-/g, ' '), item: `${BASE_URL}${cleanPath}` },
  ]
}

/**
 * Returns path-specific FAQ items curated for search engine rich results.
 */
export function getFaqItemsForPath(pathname: string): FAQItem[] {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'

  if (cleanPath === '/') {
    return CORE_COMPANY_FAQS
  }

  if (cleanPath === '/about') {
    return [
      {
        q: 'Is OPERAVA an SEC-registered Philippine Corporation?',
        a: 'Yes. OPERAVA Global Solutions is organized in the Philippines as a Corporation and registered with the Philippine Securities and Exchange Commission (SEC) and the Bureau of Internal Revenue (BIR).',
      },
      {
        q: 'Where is OPERAVA located and how does it operate?',
        a: 'OPERAVA has its registered corporate location in Pagudpud, Ilocos Norte, Philippines, operating with a distributed remote-first model connecting skilled Philippine professionals with clients worldwide.',
      },
      {
        q: 'What is OPERAVA’s workforce and operational model?',
        a: 'OPERAVA operates three flexible engagement tiers: individual dedicated professionals, dedicated operational teams, and enterprise multi-team governance, backed by strict data security and compliance.',
      },
      {
        q: 'How does OPERAVA guarantee quality and compliance for remote professionals?',
        a: 'All OPERAVA professionals undergo a multi-tier vetting process, skills assessments, NDA execution, security policy onboarding, and continuous performance governance under dedicated team leads.',
      },
    ]
  }

  if (cleanPath === '/services') {
    return [
      {
        q: 'What services does OPERAVA Global Solutions offer?',
        a: 'OPERAVA provides full-lifecycle Information Technology (IT) engineering (custom software development, web & mobile applications, SaaS platforms, systems integration, database services, IT consulting) and Business Process Outsourcing (BPO) operations (customer service, technical help desk, back-office operations, data processing, virtual assistance).',
      },
      {
        q: 'How are OPERAVA IT and BPO services structured and priced?',
        a: 'Our services are structured through transparent engagement models including dedicated monthly staff, full agile delivery teams, milestone-based projects, and elastic enterprise operational pods.',
      },
      {
        q: 'Can our company start with a single specialist and scale into a full team?',
        a: 'Yes. Our delivery model is built to scale seamlessly from a single dedicated engineer or customer support specialist into an enterprise multi-team operation as your workload grows.',
      },
      {
        q: 'How does OPERAVA handle onboarding and knowledge transfer for new client services?',
        a: 'We implement a structured onboarding methodology including process documentation, system access provisioning, security verification, shadow sessions, and milestone-gated operational handoffs.',
      },
    ]
  }

  if (cleanPath === '/services/it') {
    return [
      {
        q: 'What Information Technology services does OPERAVA specialize in?',
        a: 'OPERAVA delivers end-to-end IT engineering services including custom software development, web and mobile application engineering, SaaS platforms, legacy modernization, systems integration, and database architecture.',
      },
      {
        q: 'Can OPERAVA integrate with existing enterprise tools and third-party APIs?',
        a: 'Yes. We design and implement secure API integrations across CRMs, ERPs, relational and NoSQL databases, legacy backends, payment gateways, and cloud infrastructure.',
      },
      {
        q: 'What technologies and programming frameworks do OPERAVA engineers support?',
        a: 'Our technology executives and software engineers work across modern tech stacks including React, Next.js, Node.js, TypeScript, Python, Go, Java, C#, PHP, SQL, PostgreSQL, MongoDB, AWS, Google Cloud, Docker, and Kubernetes.',
      },
    ]
  }

  if (cleanPath === '/services/bpo') {
    return [
      {
        q: 'What BPO and back-office solutions does OPERAVA provide?',
        a: 'OPERAVA provides 24/7 omnichannel customer service (voice, email, live chat), technical help desk, back-office transaction processing, data entry and validation, workflow administration, and virtual assistance.',
      },
      {
        q: 'Does OPERAVA provide 24/7/365 coverage for international time zones?',
        a: 'Yes. Our Philippine-based remote teams operate 24/7/365 across North American, European, Australian, and Asian business hours and shifts.',
      },
      {
        q: 'How does OPERAVA ensure high customer satisfaction and SLA compliance?',
        a: 'We utilize automated QA scorecards, real-time ticket analytics, dedicated supervisors, regular calibration sessions, and custom KPI reporting dashboards.',
      },
    ]
  }

  if (cleanPath.startsWith('/services/it/') || cleanPath.startsWith('/services/bpo/')) {
    const slug = cleanPath.split('/').pop() || ''
    const service = getServiceBySlug(slug)
    if (service?.faqs && service.faqs.length > 0) {
      return service.faqs
    }
    const serviceName = service ? service.name : 'this service'
    return [
      {
        q: `How does OPERAVA deliver ${serviceName}?`,
        a: `OPERAVA delivers ${serviceName} through dedicated Philippine-based professionals operating remotely and globally with structured workflows, security controls, and transparent communication.`,
      },
      {
        q: `Can ${serviceName} scale as our organization grows?`,
        a: `Yes. Our delivery model is designed to scale dynamically from single dedicated specialists to full dedicated operational teams as your business expands.`,
      },
    ]
  }

  if (cleanPath === '/industries') {
    return [
      {
        q: 'Which industry verticals does OPERAVA specialize in?',
        a: 'OPERAVA serves Technology & SaaS, Financial Services, Healthcare Administration, E-Commerce & Retail, Logistics & Supply Chain, and Professional Services globally.',
      },
      {
        q: 'Does OPERAVA comply with industry-specific security and privacy regulations?',
        a: 'Yes. Our workflows adhere to data privacy standards, HIPAA-aligned guidelines, and enterprise confidentiality practices.',
      },
    ]
  }

  if (cleanPath === '/careers') {
    return [
      {
        q: 'Are career opportunities at OPERAVA remote?',
        a: 'Yes. OPERAVA is a remote-first organization, enabling skilled professionals across the Philippines and worldwide to work from anywhere with flexible schedules and competitive compensation.',
      },
      {
        q: 'What positions does OPERAVA actively recruit for?',
        a: 'We hire Software Developers, Full-Stack Engineers, Customer Service Executives, Technical Support Representatives, Business Operations Specialists, and QA Engineers.',
      },
    ]
  }

  if (cleanPath === '/contact') {
    return [
      {
        q: 'How quickly does OPERAVA respond to contact and RFP inquiries?',
        a: 'Our solutions architecture team reviews and responds to all inquiries within 24 business hours.',
      },
      {
        q: 'Can we request an NDA prior to discussing project requirements?',
        a: 'Yes. You can request a mutual NDA directly on the contact form, and our legal team will execute it promptly.',
      },
    ]
  }

  if (cleanPath === '/privacy') {
    return [
      {
        q: 'How does OPERAVA protect personal and client information?',
        a: 'OPERAVA complies with the Philippine Data Privacy Act of 2012 (RA 10173) through organizational, physical, and technical safeguards, role-based access, and strict data governance.',
      },
    ]
  }

  if (cleanPath === '/terms') {
    return [
      {
        q: 'What terms govern OPERAVA client engagements and digital platforms?',
        a: 'Engagements are governed by our master terms and conditions, supplemented by executed Statements of Work (SOW), Service Level Agreements (SLAs), and NDAs.',
      },
    ]
  }

  return CORE_COMPANY_FAQS
}

/**
 * Generates dynamic BreadcrumbList Schema.org object based on page path.
 */
export function generateBreadcrumbList(pathname: string, customItems?: BreadcrumbItem[]): BreadcrumbListSchema {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'
  const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '/' : cleanPath}`
  const items = customItems || getBreadcrumbItemsForPath(cleanPath)

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: items.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  }
}

/**
 * Generates dynamic FAQPage Schema.org object based on page path.
 */
export function generateFAQPage(pathname: string, customFaqs?: FAQItem[]): FAQPageSchema {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'
  const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '/' : cleanPath}`
  const faqs = customFaqs || getFaqItemsForPath(cleanPath)

  return {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

/**
 * Returns the primary Organization / LocalBusiness node used consistently across the site.
 */
export function getOrganizationSchema(): Record<string, unknown> {
  return {
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${BASE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_NAME,
    alternateName: ['OPERAVA', 'Operava', 'OPERAVA Global Solutions'],
    url: `${BASE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: 'https://res.cloudinary.com/sdaxzncs/image/upload/Favicon_512x512.svg',
      width: 512,
      height: 512,
    },
    image: DEFAULT_OG_IMAGE,
    description:
      'OPERAVA Global Solutions is a Philippine-based Corporation providing Workforce, Information Technology, and Business Process Outsourcing (BPO) services, operating remotely and globally.',
    slogan: 'We Operate in Advance',
    priceRange: '$$',
    email: 'hello@operavaglobal.com',
    telephone: '+63-900-000-0000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pagudpud',
      addressLocality: 'Pagudpud',
      addressRegion: 'Ilocos Norte',
      postalCode: '2919',
      addressCountry: 'PH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.5595,
      longitude: 120.787,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Global / Worldwide' },
      { '@type': 'Country', name: 'Philippines' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'Singapore' },
      { '@type': 'Country', name: 'Japan' },
      { '@type': 'AdministrativeArea', name: 'Europe' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@operavaglobal.com',
        availableLanguage: ['English', 'Spanish', 'French', 'German', 'Filipino', 'Arabic', 'Chinese', 'Japanese'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@operavaglobal.com',
        availableLanguage: ['English', 'Filipino'],
      },
    ],
  }
}

/**
 * Generates dynamic BreadcrumbList and FAQPage JSON-LD objects along with the full @graph schema
 * based on the current page path and optional overrides.
 */
export function generatePageSchema(
  pathname: string,
  options?: {
    title?: string
    description?: string
    breadcrumbs?: BreadcrumbItem[]
    faqs?: FAQItem[]
  }
): DynamicSchemaResult {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'
  const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '/' : cleanPath}`
  const pageTitle = options?.title || SITE_NAME
  const pageDesc =
    options?.description ||
    'OPERAVA Global Solutions is a Philippine-based Corporation providing Workforce, Information Technology, and Business Process Outsourcing (BPO) services, operating remotely and globally.'

  const breadcrumbSchema = generateBreadcrumbList(cleanPath, options?.breadcrumbs)
  const faqSchema = generateFAQPage(cleanPath, options?.faqs)

  // WebPage entity type
  let pageType = 'WebPage'
  if (cleanPath === '/about') pageType = 'AboutPage'
  else if (cleanPath === '/services') pageType = 'CollectionPage'
  else if (cleanPath === '/contact') pageType = 'ContactPage'
  else if (cleanPath.startsWith('/services/it/') || cleanPath.startsWith('/services/bpo/')) pageType = 'ItemPage'

  const graphNodes: Record<string, unknown>[] = [
    // 1. WebSite
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: SITE_NAME,
      alternateName: ['OPERAVA', 'Operava', 'OPERAVA Global Solutions', 'OPERAVA GLOBAL SOLUTIONS OPC'],
      description:
        'Philippine-based Corporation providing Workforce, Information Technology, and Business Process Outsourcing (BPO) services, operating remotely and globally.',
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/services?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    // 2. Organization
    getOrganizationSchema(),
    // 3. WebPage
    {
      '@type': pageType,
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: pageTitle,
      description: pageDesc,
      isPartOf: {
        '@id': `${BASE_URL}/#website`,
      },
      inLanguage: 'en-US',
      breadcrumb: {
        '@id': `${canonicalUrl}#breadcrumb`,
      },
    },
    // 4. Breadcrumbs
    breadcrumbSchema,
    // 5. FAQs
    faqSchema,
  ]

  // Optional: Catalogues for service hub pages
  if (cleanPath === '/services') {
    const allServices = [...itServices, ...bpoServices]
    graphNodes.push({
      '@type': 'ItemList',
      '@id': `${canonicalUrl}#services-list`,
      name: 'OPERAVA Workforce, IT & BPO Services',
      description: 'Comprehensive catalog of Information Technology and Business Process Outsourcing services delivered by OPERAVA Global Solutions.',
      numberOfItems: allServices.length,
      itemListElement: allServices.map((srv, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: srv.name,
        url: `${BASE_URL}/services/${srv.category}/${srv.slug}`,
        description: srv.shortDescription,
      })),
    })
  }

  return {
    breadcrumbSchema,
    faqSchema,
    fullGraph: {
      '@context': 'https://schema.org',
      '@graph': graphNodes,
    },
  }
}

/**
 * Injects dynamic BreadcrumbList, FAQPage, and full graph Schema markup directly into document head.
 * 
 * @param pathname Current route path (e.g. window.location.pathname)
 * @param options Optional overrides for title, description, custom breadcrumbs or FAQs
 * @param scriptId Unique id for the ld+json script tag in document.head
 */
export function injectSchemaMarkup(
  pathname: string,
  options?: {
    title?: string
    description?: string
    breadcrumbs?: BreadcrumbItem[]
    faqs?: FAQItem[]
  },
  scriptId = 'operava-dynamic-jsonld'
): HTMLScriptElement {
  const { fullGraph } = generatePageSchema(pathname, options)

  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null
  if (!scriptEl) {
    scriptEl = document.createElement('script')
    scriptEl.id = scriptId
    scriptEl.type = 'application/ld+json'
    document.head.appendChild(scriptEl)
  }

  scriptEl.textContent = JSON.stringify(fullGraph, null, 2)
  return scriptEl
}
