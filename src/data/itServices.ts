export interface ServiceFAQ {
  q: string
  a: string
}

export interface Service {
  id: string
  slug: string
  category: 'it' | 'bpo'
  number: string
  name: string
  shortDescription: string
  description: string
  serviceMessage?: string
  capabilities: string[]
  benefits: string[]
  industries: string[]
  relatedPositions?: string[]
  faqs?: ServiceFAQ[]
  icon: string
  image?: string
  cta: string
}

export const itServices: Service[] = [
  {
    id: 'software-development',
    slug: 'software-development',
    category: 'it',
    number: '01',
    name: 'Software Development',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto/v1787278539/software.webp',
    shortDescription: 'Custom software solutions designed around your business requirements, workflows, integrations, and long-term growth.',
    description: 'Custom software solutions designed around your business requirements, workflows, users, integrations, security requirements, and long-term growth.',
    serviceMessage: 'Build technology around your business—not your business around technology.',
    capabilities: ['Build software around the way your organization actually operates', 'Replace disconnected manual processes with purpose-built digital workflows', 'Develop solutions that can evolve as business requirements change', 'Integrate software with existing applications, databases, APIs, and services', 'Improve operational efficiency, visibility, and process control'],
    benefits: ['Solutions built around your real operational workflows', 'Elimination of disconnected manual bottlenecks', 'Scalable architecture that evolves with business demands', 'Seamless connectivity with existing databases, APIs, and systems'],
    relatedPositions: ['Software Developer', 'Full-Stack Developer', 'Software Architect', 'QA Engineer', 'DevOps Engineer'],
    industries: ['Financial Services', 'Healthcare', 'E-commerce', 'Logistics', 'Technology'],
    icon: 'code',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'web-mobile-development',
    slug: 'web-mobile-development',
    category: 'it',
    number: '02',
    name: 'Web & Mobile Application Development',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto/v1787278424/web_mobile.webp',
    shortDescription: 'Modern websites, web applications, and mobile experiences designed for performance, usability, security, and scale.',
    description: 'Modern websites, web applications, and mobile experiences designed for performance, usability, security, maintainability, and scale.',
    serviceMessage: 'Your digital presence should do more than look modern.',
    capabilities: ['Create modern digital experiences across web and mobile', 'Develop responsive interfaces', 'Connect applications with APIs, databases, and payment services', 'Improve usability, accessibility, and performance'],
    benefits: ['Performant experiences across web and mobile', 'Frictionless customer access', 'Robust integrations', 'Accessible architectures built for scale'],
    relatedPositions: ['Web Developer', 'Mobile Application Developer', 'UI Developer', 'UX Designer'],
    industries: ['E-commerce', 'SaaS', 'Retail', 'Healthcare Technology'],
    icon: 'monitor',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'saas-platform-development',
    slug: 'saas-platform-development',
    category: 'it',
    number: '03',
    name: 'SaaS & Platform Development',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto/v1787278192/saas.webp',
    shortDescription: 'Scalable software-as-a-service products and digital platforms built for recurring operations and growth.',
    description: 'Scalable SaaS products and digital platforms built for recurring business operations, subscriptions, integrations, and long-term growth.',
    serviceMessage: 'Turn a technology concept into an operating platform.',
    capabilities: ['Turn software concepts into scalable digital products', 'Build subscription-based environments', 'Support multi-user and role-based operations', 'Connect platforms with APIs and payment systems'],
    benefits: ['Revenue-ready multi-tenant architecture', 'Automated subscription lifecycle', 'Granular role-based permissions', 'Engineered for high availability'],
    relatedPositions: ['SaaS Developer', 'Platform Engineer', 'Cloud Engineer', 'Product Manager'],
    industries: ['SaaS', 'Fintech', 'HR Technology', 'Enterprise Software'],
    icon: 'layers',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'it-systems-development',
    slug: 'it-systems-development',
    category: 'it',
    number: '04',
    name: 'IT Systems Development',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto/v1787278269/it_systems.webp',
    shortDescription: 'Business systems designed to automate workflows, connect operational functions, and increase efficiency.',
    description: 'Business systems designed to automate workflows, connect operational functions, improve visibility, and increase organizational efficiency.',
    serviceMessage: 'Operational complexity should not prevent business growth.',
    capabilities: ['Automate repetitive business workflows', 'Replace fragmented manual processes', 'Improve information visibility', 'Connect departments through shared systems'],
    benefits: ['Elimination of disjointed spreadsheets', 'Cross-departmental collaboration', 'Real-time operational metrics', 'Future-ready system foundations'],
    relatedPositions: ['Systems Developer', 'Business Systems Analyst', 'Systems Architect'],
    industries: ['Business Services', 'BPO', 'Finance', 'Healthcare'],
    icon: 'settings',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'computer-programming',
    slug: 'computer-programming',
    category: 'it',
    number: '05',
    name: 'Computer Programming',
    image: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto/v1787257859/programming.webp',
    shortDescription: 'Professional programming services across modern technologies, APIs, scripts, automation, and applications.',
    description: 'Professional programming services across modern technologies and application architectures for new applications, integrations, and features.',
    serviceMessage: 'Access programming professionals who turn technical requirements into working solutions.',
    capabilities: ['Develop new features and applications', 'Extend and modernize existing software', 'Build APIs, integrations, and scripts', 'Support development teams with additional capacity'],
    benefits: ['Experienced engineers across frontend and backend', 'Clean, maintainable codebase', 'Flexible engagement models', 'Cost-effective technology bandwidth'],
    relatedPositions: ['Software Programmer', 'API Developer', 'Automation Developer'],
    industries: ['Software', 'SaaS', 'E-commerce', 'Telecommunications'],
    icon: 'code',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'it-consulting',
    slug: 'it-consulting',
    category: 'it',
    number: '06',
    name: 'IT Consulting',
    shortDescription: 'Technology advisory to help organizations plan systems, architecture, and digital initiatives.',
    description: 'Technology advisory services to help organizations plan systems, architecture, digital initiatives, and technology roadmaps aligned with business goals.',
    serviceMessage: 'Make technology decisions with clarity—based on your operations, constraints, and growth plans.',
    capabilities: ['Technology strategy and roadmap planning', 'Architecture and systems assessment', 'Vendor and platform evaluation', 'Digital transformation advisory'],
    benefits: ['Clearer technology decisions', 'Reduced risk on major initiatives', 'Aligned IT and business priorities', 'Practical implementation guidance'],
    relatedPositions: ['IT Consultant', 'Solutions Architect', 'Technology Advisor'],
    industries: ['All industries', 'Financial Services', 'Healthcare', 'Technology'],
    icon: 'briefcase',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'systems-integration',
    slug: 'systems-integration',
    category: 'it',
    number: '07',
    name: 'Systems Integration',
    shortDescription: 'Connect applications, databases, and platforms so information and workflows move across systems.',
    description: 'Connect applications, databases, and platforms so information and workflows move reliably across your technology landscape.',
    serviceMessage: 'Stop operating in silos—connect the systems your business already uses.',
    capabilities: ['API and middleware integration', 'Data synchronization between platforms', 'Workflow orchestration across systems', 'Legacy and modern system connectivity'],
    benefits: ['Single source of operational truth', 'Less manual data transfer', 'Faster end-to-end processes', 'Scalable integration architecture'],
    relatedPositions: ['Integration Engineer', 'API Developer', 'Solutions Architect'],
    industries: ['E-commerce', 'Logistics', 'Finance', 'Healthcare'],
    icon: 'git-merge',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'database-services',
    slug: 'database-services',
    category: 'it',
    number: '08',
    name: 'Database Services',
    shortDescription: 'Database design, administration, optimization, and data management support.',
    description: 'Database design, administration, optimization, and data management support for operational and analytical workloads.',
    serviceMessage: 'Keep your data reliable, structured, and ready for the applications and reports that depend on it.',
    capabilities: ['Database design and modeling', 'Administration and performance tuning', 'Backup, recovery, and availability planning', 'Data migration and consolidation'],
    benefits: ['Reliable data infrastructure', 'Improved query performance', 'Lower operational risk', 'Cleaner data for reporting and applications'],
    relatedPositions: ['Database Administrator', 'Data Engineer', 'Database Developer'],
    industries: ['Finance', 'Healthcare', 'Retail', 'Technology'],
    icon: 'database',
    cta: 'Discuss Your Requirements',
  },
]
