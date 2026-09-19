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
  category: 'it' | 'bpo' | 'automation' | string
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

/** Complete public service inventory for SEO descriptions and FAQs */
export const ALL_SERVICE_NAMES = {
  technology: [
    'Software Development',
    'Web & Mobile Application Development',
    'SaaS & Platform Development',
    'IT Systems Development',
    'Computer Programming',
    'IT Consulting',
    'Systems Integration',
    'Database Services',
  ],
  automation: [
    'Workflow Automation',
    'Business Process Automation',
    'AI Automation',
    'Customer Service Automation',
    'Email Automation',
    'Lead & Sales Automation',
    'Data & Reporting Automation',
    'Document Automation',
    'HR & Workforce Automation',
    'Finance & Invoicing Automation',
    'System & Application Integration',
    'Notification & Alert Automation',
    'Scheduling & Recurring Operations',
    'Custom Automation Solutions',
  ],
  outsourcing: [
    'Customer Service',
    'Technical Support',
    'Help Desk',
    'Back-Office Operations',
    'Data Processing',
    'Data Entry',
    'Document Processing',
    'Virtual Assistance',
  ],
}

export const COMPANY_CORE_FAQS: FAQItem[] = [
  {
    q: 'What services does OPERAVA Global Solutions provide?',
    a: 'OPERAVA provides three connected pillars: Automation (workflow, business process, AI, customer service, email, lead & sales, data & reporting, document, HR, finance, integration, notifications, scheduling, and custom automation), Technology / IT (software development, web & mobile apps, SaaS platforms, IT systems, programming, IT consulting, systems integration, database services), and Outsourcing / BPO (customer service, technical support, help desk, back-office operations, data processing, data entry, document processing, virtual assistance). Philippine-based, operating remotely and globally.',
  },
  {
    q: 'Where is OPERAVA located and registered?',
    a: 'OPERAVA Global Solutions is organized in the Philippines as a Corporation and registered with the Philippine Securities and Exchange Commission (SEC) and Bureau of Internal Revenue (BIR). Its initial corporate location is in Pagudpud, Ilocos Norte 2919, Philippines, operating remotely and serving clients globally.',
  },
  {
    q: 'How does OPERAVA deliver Automation, Technology, and Outsourcing solutions?',
    a: 'OPERAVA operates a distributed remote-first delivery model connecting skilled Philippine professionals with global enterprises across three engagement models: individual dedicated professionals, dedicated operational teams, and enterprise multi-team governance.',
  },
  {
    q: 'How does OPERAVA protect client confidentiality and data security?',
    a: 'OPERAVA enforces strict non-disclosure agreements (NDAs), encrypted communication channels, role-based access controls, and full adherence to the Philippine Data Privacy Act of 2012 and international data privacy benchmarks.',
  },
  {
    q: 'How quickly can a business engage OPERAVA for services?',
    a: 'Following an initial discovery consultation and requirements review, OPERAVA typically delivers a customized technical and operational proposal within 24 to 48 hours.',
  },
]

function serviceDetailMetadata(
  cleanPath: string,
  service: NonNullable<ReturnType<typeof getServiceBySlug>>,
  categoryKey: 'it' | 'bpo' | 'automation',
): PageMetadata {
  const labels = {
    it: { label: 'Technology / IT Services', href: '/services/it', short: 'IT Services' },
    bpo: { label: 'Outsourcing / BPO Services', href: '/services/bpo', short: 'BPO Services' },
    automation: { label: 'Automation Services', href: '/services/automation', short: 'Automation Services' },
  } as const
  const cat = labels[categoryKey]
  const customFaqs: FAQItem[] =
    service.faqs && service.faqs.length > 0
      ? service.faqs
      : [
          {
            q: `How does OPERAVA deliver ${service.name}?`,
            a: `OPERAVA delivers ${service.name} through skilled Philippine-based professionals operating remotely and globally with structured workflows, security controls, and transparent communication. ${service.shortDescription}`,
          },
          {
            q: `What does ${service.name} typically include?`,
            a: `${service.name} capabilities include: ${service.capabilities.slice(0, 6).join('; ')}.`,
          },
          {
            q: `Can ${service.name} scale as our organization grows?`,
            a: `Yes. Our delivery model scales from single dedicated specialists to full dedicated operational teams as your business expands.`,
          },
        ]

  const keywordParts = [
    service.name,
    ...service.capabilities.slice(0, 8),
    cat.short,
    'OPERAVA GLOBAL SOLUTIONS',
    'Philippine-based',
    'remote',
    'global',
  ]

  return {
    title: `${service.name} | ${cat.short} | OPERAVA GLOBAL SOLUTIONS`,
    description: `${service.name}: ${service.shortDescription} Delivered by skilled Philippine-based professionals operating remotely and globally. OPERAVA Global Solutions.`,
    keywords: keywordParts.join(', '),
    canonicalUrl: `${BASE_URL}${cleanPath}`,
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', item: `${BASE_URL}/` },
      { name: 'Services', item: `${BASE_URL}/services` },
      { name: cat.label, item: `${BASE_URL}${cat.href}` },
      { name: service.name, item: `${BASE_URL}${cleanPath}` },
    ],
    faqs: customFaqs,
    serviceData: {
      name: service.name,
      description: service.shortDescription,
      serviceType: service.name,
      category: categoryKey,
      capabilities: service.capabilities,
    },
  }
}

export function getMetadataForPath(pathname: string): PageMetadata {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'

  if (cleanPath === '/') {
    return {
      title: 'OPERAVA GLOBAL SOLUTIONS | Automation, Technology & Outsourcing',
      description:
        'OPERAVA Global Solutions — Philippine-based Corporation delivering Automation (workflow, AI, BPA, document, HR, finance), Technology / IT (software, web & mobile, SaaS, systems, databases), and Outsourcing / BPO (customer service, help desk, back-office, virtual assistance). Operating remotely and globally.',
      keywords:
        'OPERAVA GLOBAL SOLUTIONS, OPERAVA, Automation, Workflow Automation, AI Automation, Business Process Automation, Information Technology, Software Development, Web Mobile Apps, SaaS, Systems Integration, Database Services, Outsourcing, BPO, Customer Service, Technical Support, Help Desk, Back-Office, Virtual Assistance, Philippine-based, Remote Workforce, Global Operations',
      canonicalUrl: `${BASE_URL}/`,
      ogType: 'website',
      ogTitle: 'OPERAVA GLOBAL SOLUTIONS | Automation, Technology & Outsourcing',
      breadcrumbs: [{ name: 'Home', item: `${BASE_URL}/` }],
      faqs: COMPANY_CORE_FAQS,
    }
  }

  if (cleanPath === '/about') {
    return {
      title: 'About Us | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Learn about OPERAVA Global Solutions — a Philippine SEC & BIR registered Corporation delivering Automation, Technology (IT), and Outsourcing (BPO) services remotely and globally from Pagudpud, Ilocos Norte.',
      keywords:
        'About OPERAVA, Philippine Corporation, SEC Registered, Remote Workforce, Automation, IT Engineering, BPO, Global Operations',
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
          q: 'What service pillars does OPERAVA offer?',
          a: 'Automation, Technology (IT), and Outsourcing (BPO) — delivered through one professional, one dedicated team, or multiple teams.',
        },
      ],
    }
  }

  if (cleanPath === '/services/it') {
    const list = ALL_SERVICE_NAMES.technology.join(', ')
    return {
      title: 'Technology & IT Services | OPERAVA GLOBAL SOLUTIONS',
      description: `Enterprise Technology and IT solutions from OPERAVA: ${list}. Philippine-based engineering talent, operating remotely and globally.`,
      keywords: `${list}, IT Services, Philippine IT Talent, OPERAVA GLOBAL SOLUTIONS, Software Development, SaaS, Systems Integration`,
      canonicalUrl: `${BASE_URL}/services/it`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Technology & IT Services', item: `${BASE_URL}/services/it` },
      ],
      faqs: [
        {
          q: 'What Technology and IT services does OPERAVA provide?',
          a: `OPERAVA provides: ${list}.`,
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

  if (cleanPath === '/services/bpo') {
    const list = ALL_SERVICE_NAMES.outsourcing.join(', ')
    return {
      title: 'Outsourcing & BPO Services | OPERAVA GLOBAL SOLUTIONS',
      description: `Scalable Outsourcing and BPO from OPERAVA: ${list}. Philippine-based global workforce, operating remotely across time zones.`,
      keywords: `${list}, BPO Services, Philippine BPO, Global Delivery, OPERAVA GLOBAL SOLUTIONS`,
      canonicalUrl: `${BASE_URL}/services/bpo`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Outsourcing & BPO Services', item: `${BASE_URL}/services/bpo` },
      ],
      faqs: [
        {
          q: 'What Outsourcing and BPO services does OPERAVA offer?',
          a: `OPERAVA delivers: ${list}.`,
        },
        {
          q: 'Does OPERAVA provide 24/7 coverage across global time zones?',
          a: 'Yes. Our Philippine-based remote workforce operates 24/7, providing coverage for North America, Europe, Australia, and Asia-Pacific time zones where scoped.',
        },
        {
          q: 'How does OPERAVA maintain support quality and SLA adherence?',
          a: 'We implement QA monitoring, ticket tracking, dedicated team leads, continuous training, and transparent SLA reporting for client accounts.',
        },
      ],
    }
  }

  if (cleanPath === '/services/automation') {
    const list = ALL_SERVICE_NAMES.automation.join(', ')
    return {
      title: 'Automation Services | OPERAVA GLOBAL SOLUTIONS',
      description: `Business Automation from OPERAVA: ${list}. Design, build, and operate process automation with Philippine-based specialists, remotely and globally.`,
      keywords: `${list}, Business Automation, RPA, AI Automation, Process Automation, OPERAVA GLOBAL SOLUTIONS`,
      canonicalUrl: `${BASE_URL}/services/automation`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Automation Services', item: `${BASE_URL}/services/automation` },
      ],
      faqs: [
        {
          q: 'What Automation services does OPERAVA provide?',
          a: `OPERAVA provides: ${list}.`,
        },
        {
          q: 'How does OPERAVA approach automation projects?',
          a: 'We map current processes, define rules and exception paths, connect systems, build and test workflows, then deploy with monitoring and continuous improvement.',
        },
        {
          q: 'Is AI included in OPERAVA automation?',
          a: 'Yes. AI Automation is offered for classification, extraction, summarization, intelligent routing, and controlled use cases inside real business processes — with human-review gates where needed.',
        },
      ],
    }
  }

  if (cleanPath.startsWith('/services/it/')) {
    const slug = cleanPath.split('/').pop() || ''
    const service = getServiceBySlug(slug)
    if (service) return serviceDetailMetadata(cleanPath, service, 'it')
  }
  if (cleanPath.startsWith('/services/bpo/')) {
    const slug = cleanPath.split('/').pop() || ''
    const service = getServiceBySlug(slug)
    if (service) return serviceDetailMetadata(cleanPath, service, 'bpo')
  }
  if (cleanPath.startsWith('/services/automation/')) {
    const slug = cleanPath.split('/').pop() || ''
    const service = getServiceBySlug(slug)
    if (service) return serviceDetailMetadata(cleanPath, service, 'automation')
  }

  if (cleanPath === '/services') {
    return {
      title: 'Services | Automation, Technology & Outsourcing | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Explore OPERAVA services across Automation, Technology (IT), and Outsourcing (BPO). Full catalogs for workflow and AI automation, software and platforms, and customer operations — Philippine-based, remote and global.',
      keywords:
        'OPERAVA Services, Automation, Technology, IT Solutions, Outsourcing, BPO, Workflow Automation, Software Development, Customer Service, Remote Teams',
      canonicalUrl: `${BASE_URL}/services`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
      ],
      faqs: [
        {
          q: 'What is the full range of OPERAVA services?',
          a: `Technology: ${ALL_SERVICE_NAMES.technology.join(', ')}. Automation: ${ALL_SERVICE_NAMES.automation.join(', ')}. Outsourcing: ${ALL_SERVICE_NAMES.outsourcing.join(', ')}.`,
        },
        {
          q: 'How are OPERAVA services structured?',
          a: 'Services use flexible engagement models: one professional, one dedicated team, or multiple teams — plus Discover → Design → Build → Launch → Operate → Optimize delivery.',
        },
      ],
    }
  }

  if (cleanPath === '/industries') {
    return {
      title: 'Industries & Sectors | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Specialized Automation, Technology, and Outsourcing solutions for Technology & SaaS, Financial Services, Healthcare, E-Commerce, Logistics, and Professional Services globally.',
      keywords:
        'Industries, Technology, Financial Services, Healthcare, E-Commerce, Logistics, Professional Services, OPERAVA',
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
      ],
    }
  }

  if (cleanPath === '/careers') {
    return {
      title: 'Careers & Remote Opportunities | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Join OPERAVA Global Solutions. Explore remote career opportunities in technology, automation, customer experience, and operations across the Philippines and worldwide.',
      keywords:
        'Careers, Remote Jobs, IT Jobs Philippines, BPO Careers, Automation Jobs, OPERAVA Careers',
      canonicalUrl: `${BASE_URL}/careers`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Careers & Remote Opportunities', item: `${BASE_URL}/careers` },
      ],
      faqs: [
        {
          q: 'Are all OPERAVA positions remote?',
          a: 'Yes. OPERAVA operates a remote-first work environment for professionals across the Philippines and globally.',
        },
        {
          q: 'What roles does OPERAVA hire for?',
          a: 'Technology, customer experience, and business operations tracks — including developers, support specialists, operations, and automation roles.',
        },
      ],
    }
  }

  if (cleanPath === '/insights') {
    return {
      title: 'Insights & Thought Leadership | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Industry perspectives on automation, technology, BPO best practices, and global workforce management from OPERAVA Global Solutions.',
      keywords: 'Insights, Automation Trends, Tech Trends, BPO Best Practices, OPERAVA Insights',
      canonicalUrl: `${BASE_URL}/insights`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights & Thought Leadership', item: `${BASE_URL}/insights` },
      ],
    }
  }

  if (cleanPath === '/contact') {
    return {
      title: 'Contact Us | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Contact OPERAVA Global Solutions for Automation, Technology, and Outsourcing inquiries. Philippine-based, operating remotely and globally. hello@operavaglobal.com',
      keywords: 'Contact OPERAVA, Request a Proposal, IT Consultation, BPO Inquiries, Automation Inquiry',
      canonicalUrl: `${BASE_URL}/contact`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Contact Us', item: `${BASE_URL}/contact` },
      ],
      faqs: [
        {
          q: 'How fast will OPERAVA respond to my inquiry?',
          a: 'Our solutions team reviews inquiries and responds within 24 business hours.',
        },
        {
          q: 'What is the main business email?',
          a: 'For general business, services, and quotations: hello@operavaglobal.com. Full directory: https://www.operavaglobal.com/contacts',
        },
      ],
    }
  }

  if (cleanPath === '/contacts') {
    return {
      title: 'Contacts Directory | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Official OPERAVA contact directory: hello@, partners@, cs@, hr@, talents@, compliance@, verification@, billing@, WhatsApp, careers, and verification portal.',
      keywords:
        'OPERAVA Contacts, hello@operavaglobal.com, partners@operavaglobal.com, verification@operavaglobal.com, Contact Directory',
      canonicalUrl: `${BASE_URL}/contacts`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Contacts', item: `${BASE_URL}/contacts` },
      ],
      faqs: [
        {
          q: 'What is the general OPERAVA email?',
          a: 'hello@operavaglobal.com for product, services, and partnership inquiries.',
        },
        {
          q: 'Where is the document verification portal?',
          a: 'https://verification.operavaglobal.com and https://www.operavaglobal.com/verification — verification@operavaglobal.com for content questions.',
        },
      ],
    }
  }

  if (cleanPath === '/verification' || cleanPath.startsWith('/verification/')) {
    return {
      title: 'Document Verification Portal | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Verify OPERAVA-issued document reference IDs. Official verification confirms the ID was issued by OPERAVA Global Solutions. For specific document content, contact verification@operavaglobal.com.',
      keywords:
        'Document Verification, OPERAVA Verification Portal, Reference ID, verification@operavaglobal.com',
      canonicalUrl: `${BASE_URL}/verification`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Verification', item: `${BASE_URL}/verification` },
      ],
      faqs: [
        {
          q: 'What does a verified OPERAVA document ID mean?',
          a: 'It confirms the reference ID was issued by OPERAVA Global Solutions. Content may be updated; for exact content questions email verification@operavaglobal.com.',
        },
      ],
    }
  }

  if (cleanPath === '/privacy') {
    return {
      title: 'Privacy Policy | OPERAVA GLOBAL SOLUTIONS',
      description:
        "OPERAVA Global Solutions' commitment to data privacy, confidentiality, and compliance under Philippine and international data protection standards.",
      keywords: 'Privacy Policy, Data Protection, Data Privacy Act, OPERAVA',
      canonicalUrl: `${BASE_URL}/privacy`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Privacy Policy', item: `${BASE_URL}/privacy` },
      ],
    }
  }

  if (cleanPath === '/terms') {
    return {
      title: 'Terms of Service | OPERAVA GLOBAL SOLUTIONS',
      description:
        "Terms of Service governing OPERAVA Global Solutions' website, Automation, Technology, and Outsourcing services.",
      keywords: 'Terms of Service, Legal Agreement, OPERAVA',
      canonicalUrl: `${BASE_URL}/terms`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Terms of Service', item: `${BASE_URL}/terms` },
      ],
    }
  }

  if (cleanPath === '/refund-policy' || cleanPath === '/refundpolicy' || cleanPath === '/refund') {
    return {
      title: 'Refund Policy | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Official Refund Policy, cancellations, service credits, and billing remedies for OPERAVA Global Solutions.',
      keywords: 'Refund Policy, Service Credits, OPERAVA',
      canonicalUrl: `${BASE_URL}/refund-policy`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Refund Policy', item: `${BASE_URL}/refund-policy` },
      ],
    }
  }

  if (
    cleanPath === '/payment-portal' ||
    cleanPath === '/payment' ||
    cleanPath === '/pay' ||
    cleanPath === '/client-portal/payment'
  ) {
    return {
      title: 'Client Payment Portal | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Secure client payment and invoice settlement portal for OPERAVA Global Solutions services.',
      keywords: 'Payment Portal, Invoice Settlement, OPERAVA',
      canonicalUrl: `${BASE_URL}/payment-portal`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Payment Portal', item: `${BASE_URL}/payment-portal` },
      ],
    }
  }

  if (cleanPath === '/apply') {
    return {
      title: 'Apply | Careers | OPERAVA GLOBAL SOLUTIONS',
      description: 'Submit a formal application to OPERAVA Global Solutions for remote technology, operations, and customer experience roles.',
      keywords: 'Apply OPERAVA, Careers Application, Remote Jobs',
      canonicalUrl: `${BASE_URL}/apply`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Careers', item: `${BASE_URL}/careers` },
        { name: 'Apply', item: `${BASE_URL}/apply` },
      ],
    }
  }

  if (cleanPath === '/quote' || cleanPath === '/request-a-quote') {
    return {
      title: 'Request a Quote | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Request a quote for OPERAVA Automation, Technology, or Outsourcing services. Philippine-based, operating remotely and globally.',
      keywords: 'Request a Quote, OPERAVA Proposal, IT Quote, BPO Quote, Automation Quote',
      canonicalUrl: `${BASE_URL}/quote`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Request a Quote', item: `${BASE_URL}/quote` },
      ],
    }
  }

  return {
    title: `${SITE_NAME}`,
    description:
      'OPERAVA Global Solutions is a Philippine-based Corporation providing Automation, Technology, and Outsourcing services, operating remotely and globally.',
    keywords: 'OPERAVA GLOBAL SOLUTIONS, Automation, Technology, Outsourcing, BPO, IT Services',
    canonicalUrl: `${BASE_URL}${cleanPath}`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', item: `${BASE_URL}/` },
      { name: cleanPath.replace(/^\//, '').replace(/-/g, ' ') || 'Page', item: `${BASE_URL}${cleanPath}` },
    ],
  }
}

export function updatePageSEO(metadata: PageMetadata): void {
  if (typeof document === 'undefined') return

  document.title = metadata.title

  const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  setMeta('title', metadata.title, 'name')
  setMeta('description', metadata.description, 'name')
  if (metadata.keywords) {
    setMeta('keywords', metadata.keywords, 'name')
  }

  const ogTitle = metadata.ogTitle || metadata.title
  const ogDesc = metadata.ogDescription || metadata.description
  const ogType = metadata.ogType || 'website'
  const ogUrl = metadata.canonicalUrl || window.location.origin + window.location.pathname
  const ogImage = metadata.ogImage || DEFAULT_OG_IMAGE

  setMeta('og:title', ogTitle, 'property')
  setMeta('og:description', ogDesc, 'property')
  setMeta('og:type', ogType, 'property')
  setMeta('og:url', ogUrl, 'property')
  setMeta('og:site_name', SITE_NAME, 'property')
  setMeta('og:image', ogImage, 'property')
  setMeta('og:image:secure_url', ogImage, 'property')
  setMeta('og:image:alt', ogTitle, 'property')

  setMeta('twitter:card', 'summary_large_image', 'name')
  setMeta('twitter:title', ogTitle, 'name')
  setMeta('twitter:description', ogDesc, 'name')
  setMeta('twitter:url', ogUrl, 'name')
  setMeta('twitter:image', ogImage, 'name')
  setMeta('twitter:image:alt', ogTitle, 'name')

  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', ogUrl)

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
