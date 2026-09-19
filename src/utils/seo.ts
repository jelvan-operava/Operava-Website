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
    a: 'OPERAVA provides Automation, Technology/IT, Outsourcing/BPO, and OPERAVA Academy for online learning and professional certifications. Philippine-based, operating remotely and globally.',
  },
  {
    q: 'Where is OPERAVA located and registered?',
    a: 'OPERAVA Global Solutions is a Philippine Corporation registered with the SEC and BIR. Initial office: Pagudpud, Ilocos Norte 2919, Philippines.',
  },
  {
    q: 'How does OPERAVA deliver solutions?',
    a: 'Remote-first delivery with three engagement models: one professional, one dedicated team, or multiple teams.',
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
            a: `OPERAVA delivers ${service.name} through skilled Philippine-based professionals operating remotely and globally. ${service.shortDescription}`,
          },
        ]

  return {
    title: `${service.name} | ${cat.short} | OPERAVA GLOBAL SOLUTIONS`,
    description: `${service.name}: ${service.shortDescription} Philippine-based, remote and global.`,
    keywords: [service.name, cat.short, 'OPERAVA'].join(', '),
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
        'OPERAVA Global Solutions - Philippine-based Corporation delivering Automation, Technology/IT, Outsourcing/BPO, and OPERAVA Academy. Operating remotely and globally.',
      keywords: 'OPERAVA, Automation, Technology, Outsourcing, BPO, Academy, AI, Philippine-based',
      canonicalUrl: `${BASE_URL}/`,
      ogType: 'website',
      breadcrumbs: [{ name: 'Home', item: `${BASE_URL}/` }],
      faqs: COMPANY_CORE_FAQS,
    }
  }

  if (cleanPath === '/about') {
    return {
      title: 'About Us | OPERAVA GLOBAL SOLUTIONS',
      description:
        'About OPERAVA Global Solutions - Philippine SEC and BIR registered Corporation delivering Automation, Technology, and Outsourcing services remotely and globally.',
      keywords: 'About OPERAVA, SEC Registered, Philippine Corporation',
      canonicalUrl: `${BASE_URL}/about`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'About Us', item: `${BASE_URL}/about` },
      ],
    }
  }

  if (cleanPath === '/academy') {
    return {
      title: 'Operava Academy | Online Learning & Professional Certifications | OPERAVA GLOBAL SOLUTIONS',
      description:
        'OPERAVA Academy: online learning and professional certifications in Artificial Intelligence, Human Resources, and Leadership. Institutional partnerships for degree and diploma pathways.',
      keywords:
        'Operava Academy, Online Learning, AI Certification, HR Certification, Leadership Certification, Degree Partnership, Diploma',
      canonicalUrl: `${BASE_URL}/academy`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Operava Academy', item: `${BASE_URL}/academy` },
      ],
      faqs: [
        {
          q: 'What is OPERAVA Academy?',
          a: 'Online learning and professional certifications in AI, Human Resources, and Leadership, with institutional partners for degree and diploma pathways.',
        },
        {
          q: 'Does OPERAVA Academy issue university degrees?',
          a: 'OPERAVA Academy issues professional certificates. Academic degrees and formal diplomas are issued by authorized partner institutions under their own authority.',
        },
        {
          q: 'How do institutions partner?',
          a: 'Contact partners@operavaglobal.com or use the contact form to discuss degree and diploma partnership frameworks.',
        },
      ],
    }
  }

  if (cleanPath === '/services/it') {
    const list = ALL_SERVICE_NAMES.technology.join(', ')
    return {
      title: 'Technology & IT Services | OPERAVA GLOBAL SOLUTIONS',
      description: `Technology and IT services: ${list}. Philippine-based, remote and global.`,
      keywords: `${list}, IT Services, OPERAVA`,
      canonicalUrl: `${BASE_URL}/services/it`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Technology & IT Services', item: `${BASE_URL}/services/it` },
      ],
    }
  }

  if (cleanPath === '/services/bpo') {
    const list = ALL_SERVICE_NAMES.outsourcing.join(', ')
    return {
      title: 'Outsourcing & BPO Services | OPERAVA GLOBAL SOLUTIONS',
      description: `Outsourcing and BPO: ${list}. Philippine-based global workforce.`,
      keywords: `${list}, BPO, OPERAVA`,
      canonicalUrl: `${BASE_URL}/services/bpo`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Outsourcing & BPO Services', item: `${BASE_URL}/services/bpo` },
      ],
    }
  }

  if (cleanPath === '/services/automation') {
    const list = ALL_SERVICE_NAMES.automation.join(', ')
    return {
      title: 'Automation Services | OPERAVA GLOBAL SOLUTIONS',
      description: `Automation services: ${list}.`,
      keywords: `${list}, Automation, OPERAVA`,
      canonicalUrl: `${BASE_URL}/services/automation`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: 'Automation Services', item: `${BASE_URL}/services/automation` },
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
      title: 'Services | OPERAVA GLOBAL SOLUTIONS',
      description: 'OPERAVA services across Automation, Technology, and Outsourcing.',
      keywords: 'OPERAVA Services, Automation, Technology, Outsourcing',
      canonicalUrl: `${BASE_URL}/services`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
      ],
    }
  }

  if (cleanPath === '/industries') {
    return {
      title: 'Industries | OPERAVA GLOBAL SOLUTIONS',
      description:
        'OPERAVA solutions for Technology, Financial Services, Healthcare, E-Commerce, Logistics, and Professional Services.',
      canonicalUrl: `${BASE_URL}/industries`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Industries', item: `${BASE_URL}/industries` },
      ],
    }
  }

  if (cleanPath === '/careers') {
    return {
      title: 'Careers | OPERAVA GLOBAL SOLUTIONS',
      description: 'Remote careers at OPERAVA in technology, operations, and customer experience.',
      canonicalUrl: `${BASE_URL}/careers`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Careers', item: `${BASE_URL}/careers` },
      ],
    }
  }

  if (cleanPath === '/ai-job-screening') {
    return {
      title: 'Recruitment AVA | AI Job Screening | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Start your OPERAVA application with Recruitment AVA — guided AI job screening for Technology, Business Operations, and Customer Experience executive tracks. Email verification required. Not a final hiring decision.',
      keywords:
        'Recruitment AVA, AI Job Screening, OPERAVA Careers, Technology Executive, Business Operations Executive, Customer Experience Executive',
      canonicalUrl: `${BASE_URL}/ai-job-screening`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Careers', item: `${BASE_URL}/careers` },
        { name: 'Recruitment AVA', item: `${BASE_URL}/ai-job-screening` },
      ],
      faqs: [
        {
          q: 'What is OPERAVA Recruitment AVA?',
          a: 'Recruitment AVA is OPERAVA’s guided AI job-screening assistant. It collects application information through conversation after email verification. It is not a final hiring decision.',
        },
        {
          q: 'Do I still need to apply formally?',
          a: 'Yes. Formal applications remain available at https://www.operavaglobal.com/apply. Recruitment AVA supports screening; Talent Acquisition makes final decisions.',
        },
      ],
    }
  }

  if (cleanPath === '/insights') {
    return {
      title: 'Insights | OPERAVA GLOBAL SOLUTIONS',
      description: 'Insights on automation, technology, and global workforce from OPERAVA.',
      canonicalUrl: `${BASE_URL}/insights`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/insights` },
      ],
    }
  }

  if (cleanPath === '/contact') {
    return {
      title: 'Contact Us | OPERAVA GLOBAL SOLUTIONS',
      description: 'Contact OPERAVA Global Solutions. hello@operavaglobal.com',
      canonicalUrl: `${BASE_URL}/contact`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Contact Us', item: `${BASE_URL}/contact` },
      ],
    }
  }

  if (cleanPath === '/contacts') {
    return {
      title: 'Contacts Directory | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Official OPERAVA contact directory including verification portal at https://www.operavaglobal.com/verification and department emails.',
      canonicalUrl: `${BASE_URL}/contacts`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Contacts', item: `${BASE_URL}/contacts` },
      ],
    }
  }

  if (cleanPath === '/verification' || cleanPath.startsWith('/verification/')) {
    return {
      title: 'Document Verification Portal | OPERAVA GLOBAL SOLUTIONS',
      description:
        'Official OPERAVA document verification portal at https://www.operavaglobal.com/verification. Verify reference IDs issued by OPERAVA Global Solutions. For content questions: verification@operavaglobal.com.',
      keywords:
        'Document Verification, OPERAVA Verification Portal, Reference ID, www.operavaglobal.com/verification',
      canonicalUrl: `${BASE_URL}/verification`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Verification', item: `${BASE_URL}/verification` },
      ],
      faqs: [
        {
          q: 'Where is the OPERAVA document verification portal?',
          a: 'The official portal is https://www.operavaglobal.com/verification. For specific document content questions, email verification@operavaglobal.com.',
        },
      ],
    }
  }

  if (cleanPath === '/privacy') {
    return {
      title: 'Privacy Policy | OPERAVA GLOBAL SOLUTIONS',
      description: 'OPERAVA privacy and data protection policy.',
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
      description: 'OPERAVA terms of service.',
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
      description: 'OPERAVA refund and cancellation policy.',
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
      description: 'Secure client payment portal for OPERAVA services.',
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
      title: 'Apply | OPERAVA GLOBAL SOLUTIONS',
      description: 'Apply for remote roles at OPERAVA Global Solutions.',
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
      description: 'Request a quote for OPERAVA Automation, Technology, or Outsourcing services.',
      canonicalUrl: `${BASE_URL}/quote`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Request a Quote', item: `${BASE_URL}/quote` },
      ],
    }
  }

  return {
    title: SITE_NAME,
    description: 'OPERAVA Global Solutions - Automation, Technology, and Outsourcing.',
    canonicalUrl: `${BASE_URL}${cleanPath}`,
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', item: `${BASE_URL}/` },
      {
        name: cleanPath.replace(/^\//, '').replace(/-/g, ' ') || 'Page',
        item: `${BASE_URL}${cleanPath}`,
      },
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
  if (metadata.keywords) setMeta('keywords', metadata.keywords, 'name')

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

  const graphSchema = buildGraphForPath({
    pathname: window.location.pathname || '/',
    title: metadata.title,
    description: metadata.description,
    canonicalUrl: ogUrl,
    breadcrumbs: metadata.breadcrumbs,
    faqs: metadata.faqs,
    serviceInfo: metadata.serviceData,
  })

  injectJsonLd(graphSchema, 'operava-dynamic-jsonld')
}
