import { getServiceBySlug } from '../data/services'
import {
  injectPathSchema,
  generateBreadcrumbListSchema,
  generateFAQPageSchema,
  getBreadcrumbsForPath,
  getFaqsForPath,
  injectBreadcrumbAndFaqSchema,
  injectJsonLd,
  removeDynamicJsonLd,
  buildGraphForPath,
} from './schemaMarkup'

export {
  injectPathSchema,
  generateBreadcrumbListSchema,
  generateFAQPageSchema,
  getBreadcrumbsForPath,
  getFaqsForPath,
  injectBreadcrumbAndFaqSchema,
  injectJsonLd,
  removeDynamicJsonLd,
  buildGraphForPath,
}

export interface BreadcrumbItem {
  name: string
  item: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface ServiceSchemaData {
  name: string
  description: string
  serviceType: string
  category: 'it' | 'bpo' | string
  capabilities?: string[]
}

export interface PageMetadata {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  canonicalUrl?: string
  ogImage?: string
  breadcrumbs?: BreadcrumbItem[]
  faqs?: FAQItem[]
  serviceData?: ServiceSchemaData
}

export const BASE_URL = 'https://www.operavaglobal.com'
export const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/sdaxzncs/image/upload/v1786240859/Cover%20Photo.png'
export const SITE_NAME = 'OPERAVA GLOBAL SOLUTIONS'

// Core authoritative company FAQs
export const COMPANY_CORE_FAQS: FAQItem[] = [
  {
    q: 'What services does OPERAVA Global Solutions provide?',
    a: 'OPERAVA Global Solutions is a Philippine-based Corporation providing Workforce, Information Technology (IT), and Business Process Outsourcing (BPO) services, operating remotely and globally. Services include custom software development, web & mobile applications, SaaS platforms, systems integration, database services, IT consulting, customer support, technical help desk, back-office operations, and data processing.',
  },
  {
    q: 'Where is OPERAVA located and registered?',
    a: 'OPERAVA Global Solutions is organized in the Philippines as a Corporation and registered with the Philippine Securities and Exchange Commission (SEC) and Bureau of Internal Revenue (BIR). Its initial corporate location is in Pagudpud, Ilocos Norte 2919, Philippines, operating remotely and serving clients globally.',
  },
  {
    q: 'How does OPERAVA deliver its workforce, IT, and BPO solutions?',
    a: 'OPERAVA operates a distributed remote-first delivery model connecting skilled Philippine professionals with global enterprises across three engagement models: individual dedicated professionals, dedicated operational teams, and enterprise multi-team governance.',
  },
  {
    q: 'How does OPERAVA protect client confidentiality and data security?',
    a: 'OPERAVA enforces strict non-disclosure agreements (NDAs), encrypted communication channels, role-based access controls, and full adherence to the Philippine Data Privacy Act of 2012 and international data privacy benchmarks.',
  },
  {
    q: 'How quickly can a business engage OPERAVA for IT or BPO services?',
    a: 'Following an initial discovery consultation and requirements review, OPERAVA typically delivers a customized technical and operational proposal within 24 to 48 hours.',
  },
]

export function getMetadataForPath(pathname: string): PageMetadata {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'

  // 1. Home
  if (cleanPath === '/') {
    return {
      title: 'OPERAVA GLOBAL SOLUTIONS',
      description:
        'OPERAVA Global Solutions is a Philippine-based Corporation providing Workforce, Information Technology, and Business Process Outsourcing (BPO) services, operating remotely and globally.',
      keywords:
        'OPERAVA GLOBAL SOLUTIONS, OPERAVA, Workforce, Information Technology, Business Process Outsourcing, BPO, IT Services, Philippine-based, Remote Workforce, Global Operations, Cloud Infrastructure, Custom Software Development, Cybersecurity, 24/7 Support, Back-Office Operations',
      canonicalUrl: `${BASE_URL}/`,
      ogType: 'website',
      ogTitle: 'OPERAVA GLOBAL SOLUTIONS',
      breadcrumbs: [{ name: 'Home', item: `${BASE_URL}/` }],
      faqs: COMPANY_CORE_FAQS,
    }
  }

  // 2. About Us
  if (cleanPath === '/about') {
    return {
      title: 'About Us | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Learn about OPERAVA Global Solutions — a Philippine-based Corporation delivering enterprise IT engineering, modern workforce, and BPO operations remotely and globally.',
      keywords:
        'About OPERAVA, Philippine Corporation, SEC Registered Corporation, Remote Workforce, Global BPO, IT Engineering, Corporate Background, Philippine-based',
      canonicalUrl: `${BASE_URL}/about`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'About Us', item: `${BASE_URL}/about` },
      ],
      faqs: [
        {
          q: 'Is OPERAVA an SEC-registered Philippine Corporation?',
          a: 'Yes. OPERAVA Global Solutions is organized in the Philippines as a Corporation and registered with the Philippine Securities and Exchange Commission (SEC) and the Bureau of Internal Revenue (BIR).',
        },
        {
          q: 'Where is OPERAVA located?',
          a: 'OPERAVA has its initial corporate location in Pagudpud, Ilocos Norte 2919, Philippines, operating with a distributed remote workforce delivering services to clients worldwide.',
        },
        {
          q: 'What makes OPERAVA’s workforce model different?',
          a: 'We combine highly skilled Philippine technical and customer support talent with remote infrastructure, robust operational governance, and strict data security protocols.',
        },
      ],
    }
  }

  // 3. Information Technology Services
  if (cleanPath === '/services/it') {
    return {
      title: 'Information Technology (IT) Services | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Enterprise IT solutions from custom software, web & mobile applications, SaaS platforms, systems integration, and database management delivered by Philippine-based engineering talent globally.',
      keywords:
        'IT Services, Software Development, Web Applications, Mobile App Development, SaaS Platforms, Business Systems, Programming, IT Consulting, Systems Integration, Database Services, Philippine IT Talent',
      canonicalUrl: `${BASE_URL}/services/it`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Information Technology (IT) Services', item: `${BASE_URL}/services/it` },
      ],
      faqs: [
        {
          q: 'What IT services does OPERAVA provide?',
          a: 'OPERAVA provides full-lifecycle IT services including custom software development, web & mobile application engineering, SaaS platform development, systems integration, database services, and IT consulting.',
        },
        {
          q: 'Can OPERAVA integrate with existing enterprise systems and APIs?',
          a: 'Yes. We design and implement secure integrations across CRMs, ERPs, databases, legacy software, payment gateways, and third-party cloud services.',
        },
        {
          q: 'Can we hire a single developer or a dedicated engineering team?',
          a: 'Yes. OPERAVA offers elastic engagement models ranging from individual dedicated engineers to full-stack agile squads and multi-team enterprise governance.',
        },
      ],
    }
  }

  // 4. Business Process Outsourcing Services
  if (cleanPath === '/services/bpo') {
    return {
      title: 'Business Process Outsourcing (BPO) Services | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Scalable BPO solutions including customer support, technical help desk, back-office operations, data processing, and virtual assistance from our Philippine-based global workforce.',
      keywords:
        'BPO Services, Customer Service, Technical Support, Help Desk, Back-Office Operations, Data Processing, Data Entry, Document Processing, Virtual Assistance, Philippine BPO, Global Delivery',
      canonicalUrl: `${BASE_URL}/services/bpo`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Business Process Outsourcing (BPO) Services', item: `${BASE_URL}/services/bpo` },
      ],
      faqs: [
        {
          q: 'What BPO services does OPERAVA offer?',
          a: 'OPERAVA delivers omnichannel customer care, technical help desk support, back-office processing, data verification and entry, workflow administration, and virtual assistance.',
        },
        {
          q: 'Does OPERAVA provide 24/7/365 coverage across global time zones?',
          a: 'Yes. Our Philippine-based remote workforce operates 24/7, providing round-the-clock coverage for North America, Europe, Australia, and Asia-Pacific time zones.',
        },
        {
          q: 'How does OPERAVA maintain customer support quality and SLA adherence?',
          a: 'We implement rigorous QA monitoring, automated ticket tracking, dedicated team leads, continuous training, and transparent SLA reporting for all client accounts.',
        },
      ],
    }
  }

  // 5. Individual Service Detail
  if (cleanPath.startsWith('/services/it/') || cleanPath.startsWith('/services/bpo/')) {
    const slug = cleanPath.split('/').pop() || ''
    const service = getServiceBySlug(slug)
    if (service) {
      const categoryLabel = service.category === 'it' ? 'IT Services' : 'BPO Services'
      const categoryHref = service.category === 'it' ? '/services/it' : '/services/bpo'
      
      const customFaqs: FAQItem[] = service.faqs && service.faqs.length > 0
        ? service.faqs
        : [
            {
              q: `How does OPERAVA deliver ${service.name}?`,
              a: `OPERAVA delivers ${service.name} through skilled Philippine-based professionals operating remotely and globally with structured workflows, security controls, and transparent communication.`,
            },
            {
              q: `Can ${service.name} scale as our organization grows?`,
              a: `Yes. Our delivery model is designed to scale dynamically from single dedicated specialists to full dedicated operational teams as your business expands.`,
            },
          ]

      return {
        title: `${service.name} | ${categoryLabel} | OPERAVA GLOBAL SOLUTIONS`,
        description: `${service.name}: ${service.shortDescription} Delivered by skilled Philippine-based professionals operating remotely and globally.`,
        keywords: `${service.name}, ${service.capabilities.slice(0, 5).join(', ')}, Philippine-based, Global Operations, OPERAVA GLOBAL SOLUTIONS`,
        canonicalUrl: `${BASE_URL}${cleanPath}`,
        ogType: 'article',
        breadcrumbs: [
          { name: 'Home', item: `${BASE_URL}/` },
          { name: 'Services', item: `${BASE_URL}/services` },
          { name: categoryLabel, item: `${BASE_URL}${categoryHref}` },
          { name: service.name, item: `${BASE_URL}${cleanPath}` },
        ],
        faqs: customFaqs,
        serviceData: {
          name: service.name,
          description: service.shortDescription,
          serviceType: service.name,
          category: service.category,
          capabilities: service.capabilities,
        },
      }
    }
  }

  // 6. Services Hub
  if (cleanPath === '/services') {
    return {
      title: 'Services & Solutions | OPERAVA GLOBAL SOLUTIONS',
      description:
        "Explore OPERAVA's comprehensive IT and BPO service catalog. Philippine-based, operating remotely and globally to power your digital and operational transformation.",
      keywords:
        'OPERAVA Services, IT Solutions, BPO Solutions, Remote Teams, Global Outsourcing, Enterprise Technology',
      canonicalUrl: `${BASE_URL}/services`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services & Solutions', item: `${BASE_URL}/services` },
      ],
      faqs: [
        {
          q: 'What is the full range of OPERAVA services?',
          a: 'OPERAVA delivers comprehensive IT engineering (software development, web & mobile applications, SaaS, systems integration, databases) and BPO operations (customer support, help desk, back-office, data entry).',
        },
        {
          q: 'How are OPERAVA services structured and priced?',
          a: 'Services are structured around flexible monthly engagement tiers, transparent hourly rates, or milestone-based project scopes tailored to business requirements.',
        },
      ],
    }
  }

  // 7. Industries
  if (cleanPath === '/industries') {
    return {
      title: 'Industries & Sectors | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Specialized technology, workforce, and operational solutions for Technology & SaaS, Financial Services, Healthcare, E-Commerce, Logistics, and Professional Services globally.',
      keywords:
        'Industries, Technology, Financial Services, Healthcare, E-Commerce, Logistics, Professional Services, Global Outsourcing, OPERAVA',
      canonicalUrl: `${BASE_URL}/industries`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Industries & Sectors', item: `${BASE_URL}/industries` },
      ],
      faqs: [
        {
          q: 'Which industries does OPERAVA specialize in?',
          a: 'OPERAVA serves Technology & SaaS, Financial Services, Healthcare Administration, E-Commerce & Retail, Logistics & Transportation, and Professional Services.',
        },
        {
          q: 'Does OPERAVA adapt to industry-specific compliance requirements?',
          a: 'Yes. Our teams are trained in specific regulatory standards including data privacy, HIPAA-aligned handling procedures, and secure transaction workflows.',
        },
      ],
    }
  }

  // 8. Careers
  if (cleanPath === '/careers') {
    return {
      title: 'Careers & Remote Opportunities | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Join OPERAVA Global Solutions. Explore remote career opportunities in IT engineering, software development, customer support, and BPO operations across the Philippines and worldwide.',
      keywords:
        'Careers, Remote Jobs, IT Jobs Philippines, BPO Careers, Remote Work Philippines, Software Developer Jobs, Customer Support Jobs, OPERAVA Careers',
      canonicalUrl: `${BASE_URL}/careers`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Careers & Remote Opportunities', item: `${BASE_URL}/careers` },
      ],
      faqs: [
        {
          q: 'Are all OPERAVA positions remote?',
          a: 'Yes. OPERAVA operates a remote-first work environment, allowing talented professionals across the Philippines and globally to work flexibly and securely.',
        },
        {
          q: 'What roles does OPERAVA actively hire for?',
          a: 'We hire software engineers, front-end/back-end developers, UI/UX designers, customer service representatives, technical support agents, QA testers, and data specialists.',
        },
      ],
    }
  }

  // 9. Insights
  if (cleanPath === '/insights') {
    return {
      title: 'Insights & Thought Leadership | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Industry perspectives, technology analysis, operational best practices, and trends in global workforce management from OPERAVA Global Solutions.',
      keywords:
        'Insights, Tech Trends, BPO Best Practices, Global Workforce, Digital Transformation, Business Efficiency, OPERAVA Insights',
      canonicalUrl: `${BASE_URL}/insights`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights & Thought Leadership', item: `${BASE_URL}/insights` },
      ],
      faqs: [
        {
          q: 'What topics do OPERAVA Insights cover?',
          a: 'OPERAVA Insights covers enterprise software development trends, digital transformation best practices, BPO quality management, cybersecurity, and global remote team management.',
        },
      ],
    }
  }

  // 10. Contact Us
  if (cleanPath === '/contact') {
    return {
      title: 'Contact Us | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Get in touch with OPERAVA Global Solutions. Philippine-based, operating remotely and globally to support your enterprise IT and BPO requirements.',
      keywords:
        'Contact OPERAVA, Request a Proposal, IT Consultation, BPO Inquiries, Philippine Office, Global Support',
      canonicalUrl: `${BASE_URL}/contact`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Contact Us', item: `${BASE_URL}/contact` },
      ],
      faqs: [
        {
          q: 'How fast will OPERAVA respond to my inquiry?',
          a: 'Our solutions team reviews all inquiries and responds within 24 business hours with scheduling options and initial scoping insights.',
        },
        {
          q: 'Can we request a mutual Non-Disclosure Agreement (NDA) before sharing details?',
          a: 'Yes. You can request a mutual NDA directly on the contact form, and our legal team will execute it prior to in-depth technical discussions.',
        },
        {
          q: 'What information should I provide for a proposal?',
          a: 'Sharing your current technical stack, estimated team size, expected timeline, and high-level project goals helps us prepare an accurate proposal quickly.',
        },
      ],
    }
  }

  // 11. Privacy Policy
  if (cleanPath === '/privacy') {
    return {
      title: 'Privacy Policy | OPERAVA GLOBAL SOLUTIONS',
      description:
        "OPERAVA Global Solutions' commitment to data privacy, confidentiality, and regulatory compliance under Philippine and international data protection standards.",
      keywords:
        'Privacy Policy, Data Protection, Data Privacy Act, Confidentiality, Compliance, OPERAVA',
      canonicalUrl: `${BASE_URL}/privacy`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Privacy Policy', item: `${BASE_URL}/privacy` },
      ],
      faqs: [
        {
          q: 'How does OPERAVA comply with the Philippine Data Privacy Act of 2012?',
          a: 'OPERAVA complies with Republic Act No. 10173 through strict organizational, physical, and technical security measures, confidential data handling, and designated data protection oversight.',
        },
      ],
    }
  }

  // 12. Terms of Service
  if (cleanPath === '/terms') {
    return {
      title: 'Terms of Service | OPERAVA GLOBAL SOLUTIONS',
      description:
        "Terms of Service and legal agreements governing the use of OPERAVA Global Solutions' website, IT services, and BPO operations.",
      keywords:
        'Terms of Service, Legal Agreement, Service Terms, Client Agreement, OPERAVA',
      canonicalUrl: `${BASE_URL}/terms`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Terms of Service', item: `${BASE_URL}/terms` },
      ],
    }
  }

  // 13. Refund Policy
  if (cleanPath === '/refund-policy' || cleanPath === '/refundpolicy' || cleanPath === '/refund') {
    return {
      title: 'Refund Policy | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Official Refund Policy, cancellations, service credits, billing error remedies, and resolution frameworks for OPERAVA Global Solutions.',
      keywords:
        'Refund Policy, Service Credits, Cancellation Terms, Billing Dispute, Software Development Refund, BPO Refund, OPERAVA',
      canonicalUrl: `${BASE_URL}/refund-policy`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Refund Policy', item: `${BASE_URL}/refund-policy` },
      ],
      faqs: [
        {
          q: 'How do I submit a refund request to OPERAVA?',
          a: 'Clients may submit a refund request via email to cs@operavaglobal.com or through the client support portal at www.operavaglobal.com with relevant invoice and transaction details.',
        },
        {
          q: 'What is the timeframe for refund reviews?',
          a: 'OPERAVA aims to issue a review decision within thirty (30) business days of receiving all necessary details, and processed refunds are typically finalized within fifteen (15) business days thereafter.',
        },
      ],
    }
  }

  // 14. Client Payment Portal
  if (
    cleanPath === '/payment-portal' ||
    cleanPath === '/payment' ||
    cleanPath === '/pay' ||
    cleanPath === '/client-portal/payment'
  ) {
    return {
      title: 'Client Payment Portal | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Secure 256-Bit SSL client payment and invoice settlement portal for OPERAVA Global Solutions. Settle IT development milestones, BPO retainers, and cloud invoices.',
      keywords:
        'Payment Portal, Client Invoicing, Settle Milestone, Bank Wire SWIFT, Credit Card Payment, OPERAVA Billing, BPO Payment',
      canonicalUrl: `${BASE_URL}/payment-portal`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Client Payment Portal', item: `${BASE_URL}/payment-portal` },
      ],
      faqs: [
        {
          q: 'What payment methods are supported on the OPERAVA Payment Portal?',
          a: 'We support international and domestic bank wire transfers (SWIFT/ACH/BDO/BPI), major credit/debit cards (Visa, Mastercard, American Express, JCB), digital wallets (Stripe Checkout, PayPal Express, GCash, Maya), and corporate Purchase Orders (Net-30).',
        },
        {
          q: 'Is my payment data secure?',
          a: 'Yes. All transactions are protected by 256-Bit SSL/TLS 1.3 encryption and comply with PCI-DSS Level 1 security standards. Card details are processed via tokenization and are never stored on our servers.',
        },
      ],
    }
  }

  // 15. Fallback / 404
  return {
    title: 'Page Not Found (404) | OPERAVA GLOBAL SOLUTIONS',
    description:
      "The requested page could not be found. Explore OPERAVA's Philippine-based IT, workforce, and BPO solutions operating remotely and globally.",
    keywords: '404, Page Not Found, OPERAVA',
    canonicalUrl: `${BASE_URL}${cleanPath}`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', item: `${BASE_URL}/` },
      { name: 'Page Not Found', item: `${BASE_URL}${cleanPath}` },
    ],
  }
}

/**
 * Updates DOM meta tags, OpenGraph properties, Twitter card tags, canonical links,
 * and dynamically injects rich JSON-LD structured data (Breadcrumbs, LocalBusiness, FAQPage, Service).
 */
export function updatePageSEO(metadata: PageMetadata): void {
  // Title
  document.title = metadata.title

  // Helper to safely set or create standard meta tags
  const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  // Standard Meta Tags
  setMeta('title', metadata.title, 'name')
  setMeta('description', metadata.description, 'name')
  if (metadata.keywords) {
    setMeta('keywords', metadata.keywords, 'name')
  }

  // OpenGraph Tags
  const ogTitle = metadata.ogTitle || metadata.title
  const ogDesc = metadata.ogDescription || metadata.description
  const ogType = metadata.ogType || 'website'
  const ogUrl = metadata.canonicalUrl || (window.location.origin + window.location.pathname)
  const ogImage = metadata.ogImage || DEFAULT_OG_IMAGE

  setMeta('og:title', ogTitle, 'property')
  setMeta('og:description', ogDesc, 'property')
  setMeta('og:type', ogType, 'property')
  setMeta('og:url', ogUrl, 'property')
  setMeta('og:site_name', SITE_NAME, 'property')
  setMeta('og:image', ogImage, 'property')
  setMeta('og:image:secure_url', ogImage, 'property')
  setMeta('og:image:alt', ogTitle, 'property')

  // Twitter / X Tags
  setMeta('twitter:card', 'summary_large_image', 'name')
  setMeta('twitter:title', ogTitle, 'name')
  setMeta('twitter:description', ogDesc, 'name')
  setMeta('twitter:url', ogUrl, 'name')
  setMeta('twitter:image', ogImage, 'name')
  setMeta('twitter:image:alt', ogTitle, 'name')

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', ogUrl)

  // ----------------------------------------------------
  // Dynamic JSON-LD Structured Data Injection
  // ----------------------------------------------------
  const currentPath = window.location.pathname || '/'
  const graphSchema = buildGraphForPath({
    pathname: currentPath,
    title: metadata.title,
    description: metadata.description,
    canonicalUrl: ogUrl,
    breadcrumbs: metadata.breadcrumbs,
    faqs: metadata.faqs,
    serviceInfo: metadata.serviceData,
  })

  injectJsonLd(graphSchema, 'operava-dynamic-jsonld')
}
