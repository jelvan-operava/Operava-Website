/**
 * AVA Intelligent Topic Router
 * Determines user topic and intent to route inquirers to the correct verified form:
 * - /quote (Services / IT & Software / BPO / Consultation)
 * - /apply (Careers / Job Applications / Talent Opportunities)
 * - /contact (General Business Inquiries)
 */

export interface RouteAction {
  kind: 'SERVICES' | 'CAREERS' | 'CONTACT'
  to: string
  title: string
  subtitle: string
  buttonText: string
  category?: string
  service?: string
  position?: string
  isDirectIntent?: boolean
  routingMessage?: string
}

// Keywords signaling an immediate request to fill out an application or apply
const DIRECT_APPLY_KEYWORDS = [
  'i want to apply',
  'i would like to apply',
  "i'd like to apply",
  'how to apply',
  'how can i apply',
  'how do i apply',
  'where can i apply',
  'where do i apply',
  'apply now',
  'apply today',
  'apply for a job',
  'apply for job',
  'apply for the position',
  'apply for role',
  'submit application',
  'submit my application',
  'submit resume',
  'submit my resume',
  'submit cv',
  'submit my cv',
  'send resume',
  'send cv',
  'open application form',
  'open job form',
  'open job application',
  'take me to apply',
  'take me to the application',
  'take me to application',
  'let me apply',
  'can i apply',
  'fill application',
  'job application form',
  'career form',
  'application form',
]

// Keywords signaling an immediate request to request a quote, hire, or submit service inquiry
const DIRECT_QUOTE_KEYWORDS = [
  'i want a quote',
  'i would like a quote',
  "i'd like a quote",
  'get a quote',
  'request a quote',
  'request quote',
  'give me a quote',
  'need a quote',
  'need a quotation',
  'how can i get a quote',
  'where to get a quote',
  'open quote form',
  'open inquiry form',
  'take me to quote',
  'take me to the quote form',
  'take me to the service form',
  'take me to the form',
  'open form',
  'fill out form',
  'fill out quote',
  'fill out inquiry',
  'hire a team',
  'hire your team',
  'i want to hire',
  'hire developers',
  'hire bpo',
  'contact sales',
  'talk to sales',
  'reach out to sales',
  'contact operava',
  'submit inquiry',
  'start a project',
  'hire operava',
]

// Topic keywords for Careers & Hiring
const CAREER_KEYWORDS = [
  'career',
  'careers',
  'job',
  'jobs',
  'hiring',
  'hire me',
  'resume',
  'cv',
  'opening',
  'openings',
  'vacancy',
  'vacancies',
  'work at operava',
  'work with operava',
  'work for operava',
  'employment',
  'join operava',
  'join the team',
  'recruitment',
  'interview',
  'interview process',
  'benefits',
  'perks',
  'salary',
  'compensation',
  'hmo',
  'talent pool',
  'scholarship',
  'working student',
  'mothers',
  'caregivers',
  'hiring steps',
  'hiring process',
  'recruitment process',
]

// Topic keywords for IT & Software Development
const IT_KEYWORDS = [
  'it',
  'it service',
  'it services',
  'technology service',
  'technology services',
  'software',
  'software service',
  'software services',
  'software development',
  'custom software',
  'web development',
  'mobile app',
  'mobile application',
  'saas',
  'platform development',
  'systems development',
  'it systems',
  'computer programming',
  'programming',
  'it consulting',
  'systems integration',
  'database',
  'cloud',
  'digital infrastructure',
  'developer',
  'software engineer',
  'devops',
  'tech stack',
  'build an app',
  'web app',
  'api integration',
]

// Topic keywords for BPO & Operations
const BPO_KEYWORDS = [
  'bpo',
  'bpo service',
  'bpo services',
  'customer service',
  'customer support',
  'technical support',
  'tech support',
  'help desk',
  'back-office',
  'back office',
  'data processing',
  'data entry',
  'document processing',
  'virtual assistance',
  'virtual assistant',
  'workforce operations',
  'outsourcing',
  'call center',
  'chat support',
  'email support',
  'encoder',
  'ticket intake',
  'administrative operations',
]

// Topic keywords for General Quotes & Consultations
const GENERAL_QUOTE_KEYWORDS = [
  'quote',
  'quotation',
  'pricing',
  'price',
  'cost',
  'how much',
  'rates',
  'proposal',
  'rfp',
  'delivery model',
  'one professional',
  'dedicated team',
  'multiple teams',
  'consultation',
  'engagement',
  'business inquiry',
  'partner',
  'partnership',
]

// Topic keywords for Contact, Corporate, Office, and Compliance Inquiries
const CONTACT_KEYWORDS = [
  'contact',
  'contact us',
  'reach out',
  'email',
  'phone',
  'call us',
  'office',
  'location',
  'address',
  'where are you located',
  'pagudpud',
  'ilocos norte',
  'compliance',
  'data privacy',
  'dpa',
  'sec registration',
  'bir',
  'legal',
  'inquiry',
  'general inquiry',
  'partnership',
]

// Helper function to match terms with word boundaries for short words (<=4 characters)
// to prevent substring false positives like 'va' matching in 'operava' or 'it' in 'benefits'
function hasTerm(text: string, term: string): boolean {
  if (term.length <= 4) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`\\b${escaped}\\b`, 'i').test(text)
  }
  return text.includes(term)
}

function detectCareerPosition(q: string): string | undefined {
  if (
    q.includes('tech') ||
    q.includes('developer') ||
    q.includes('software') ||
    q.includes('engineer') ||
    q.includes('programming') ||
    q.includes('full stack') ||
    q.includes('frontend') ||
    q.includes('backend') ||
    q.includes('cloud') ||
    hasTerm(q, 'it')
  ) {
    return 'OPERAVA Technology Executive'
  }
  if (
    q.includes('customer experience') ||
    hasTerm(q, 'cx') ||
    q.includes('customer service') ||
    q.includes('customer support') ||
    q.includes('call center') ||
    hasTerm(q, 'csr') ||
    q.includes('voice') ||
    q.includes('chat support') ||
    q.includes('help desk')
  ) {
    return 'OPERAVA Customer Experience Executive'
  }
  if (
    q.includes('operations') ||
    q.includes('back office') ||
    q.includes('data entry') ||
    q.includes('data processing') ||
    q.includes('virtual assistant') ||
    (hasTerm(q, 'va') && !q.includes('operava')) ||
    q.includes('admin') ||
    hasTerm(q, 'hr') ||
    q.includes('human resources') ||
    q.includes('accounting') ||
    q.includes('finance') ||
    q.includes('recruitment') ||
    q.includes('talent') ||
    q.includes('training')
  ) {
    return 'OPERAVA Business Operations Executive'
  }
  return undefined
}

function detectITService(q: string): string | undefined {
  if (q.includes('web') || q.includes('mobile') || hasTerm(q, 'ios') || hasTerm(q, 'android')) {
    return 'Web & Mobile Application Development'
  }
  if (hasTerm(q, 'saas') || q.includes('platform')) {
    return 'SaaS & Platform Development'
  }
  if (q.includes('database')) {
    return 'Database Services'
  }
  if (q.includes('consulting') || q.includes('consultant')) {
    return 'IT Consulting'
  }
  if (q.includes('integration') || hasTerm(q, 'api')) {
    return 'Systems Integration'
  }
  if (q.includes('cloud') || q.includes('infrastructure')) {
    return 'Cloud & Digital Infrastructure'
  }
  if (q.includes('system')) {
    return 'IT Systems Development'
  }
  if (q.includes('programming') || q.includes('code')) {
    return 'Computer Programming'
  }
  if (q.includes('software') || hasTerm(q, 'app')) {
    return 'Software Development'
  }
  return undefined
}

function detectBPOService(q: string): string | undefined {
  if (q.includes('technical support') || q.includes('tech support')) {
    return 'Technical Support'
  }
  if (q.includes('help desk') || q.includes('ticket')) {
    return 'Help Desk Operations'
  }
  if (q.includes('back office') || q.includes('back-office')) {
    return 'Back-Office Operations'
  }
  if (q.includes('data entry') || q.includes('encoder')) {
    return 'Data Entry'
  }
  if (q.includes('data processing') || q.includes('clean data')) {
    return 'Data Processing'
  }
  if (q.includes('document') || hasTerm(q, 'ocr') || q.includes('indexing')) {
    return 'Document Processing'
  }
  if (q.includes('virtual assistant') || (hasTerm(q, 'va') && !q.includes('operava'))) {
    return 'Virtual Assistance'
  }
  if (q.includes('customer service') || q.includes('customer care') || q.includes('call center') || q.includes('chat support')) {
    return 'Customer Service'
  }
  return undefined
}

/**
 * Evaluates an inquirer message and returns the appropriate route action
 */
export function detectTopicRoute(query: string, replyText?: string): RouteAction | null {
  const q = query.toLowerCase().trim()
  const r = (replyText || '').toLowerCase()

  // 1. CHECK DIRECT APPLY INTENT (Immediate routing to Careers Application Form)
  const isDirectApply = DIRECT_APPLY_KEYWORDS.some((kw) => hasTerm(q, kw))
  if (isDirectApply) {
    const position = detectCareerPosition(q)
    const url = position ? `/apply?role=${encodeURIComponent(position)}` : '/apply'
    return {
      kind: 'CAREERS',
      to: url,
      position,
      title: 'Careers Application Form',
      subtitle: position ? `Routing directly to apply for: ${position}` : 'Routing to Job Application Form',
      buttonText: 'Open Job Application Form',
      isDirectIntent: true,
      routingMessage: position
        ? `I'm routing you directly to our verified **Job Application Form** (${position}). Please select your skills specialization and have your resume ready.`
        : "I'm routing you directly to our verified **Job Application Form**. Please select your executive position and skills specialization.",
    }
  }

  // 2. CHECK DIRECT QUOTE / SERVICE INTENT (Immediate routing to Request a Quote Form)
  const isDirectQuote = DIRECT_QUOTE_KEYWORDS.some((kw) => hasTerm(q, kw))
  if (isDirectQuote) {
    const itService = detectITService(q)
    const bpoService = detectBPOService(q)

    let url = '/quote'
    let category = 'Information Technology'
    let service: string | undefined = undefined

    if (bpoService || hasTerm(q, 'bpo') || q.includes('customer service') || q.includes('virtual assistant')) {
      category = 'Business Process Outsourcing'
      service = bpoService
      url = service
        ? `/quote?category=${encodeURIComponent(category)}&service=${encodeURIComponent(service)}`
        : `/quote?category=${encodeURIComponent(category)}`
    } else if (itService || q.includes('software') || q.includes('web') || hasTerm(q, 'app') || hasTerm(q, 'it')) {
      category = 'Information Technology'
      service = itService
      url = service
        ? `/quote?category=${encodeURIComponent(category)}&service=${encodeURIComponent(service)}`
        : `/quote?category=${encodeURIComponent(category)}`
    }

    return {
      kind: 'SERVICES',
      to: url,
      category,
      service,
      title: 'Request a Quote / Service Form',
      subtitle: `Routing directly to ${category}${service ? ` (${service})` : ''}`,
      buttonText: 'Open Quote Inquiry Form',
      isDirectIntent: true,
      routingMessage: `I'm routing you directly to our verified **Request a Quote Form** for ${category}. Our team will prepare your proposal promptly.`,
    }
  }

  // 3. CHECK CAREER TOPIC (Informational response + Interactive Route Card)
  const isCareerTopic = CAREER_KEYWORDS.some((kw) => hasTerm(q, kw)) || r.includes('career track') || r.includes('application review')
  if (isCareerTopic) {
    const position = detectCareerPosition(q)
    const url = position ? `/apply?role=${encodeURIComponent(position)}` : '/apply'
    return {
      kind: 'CAREERS',
      to: url,
      position,
      title: 'Careers & Talent Acquisition',
      subtitle: 'Apply for open remote technology or operations executive positions.',
      buttonText: 'Open Job Application Form',
      isDirectIntent: false,
    }
  }

  // 4. CHECK IT & SOFTWARE SERVICES TOPIC
  const isITTopic = IT_KEYWORDS.some((kw) => hasTerm(q, kw)) || r.includes('software development') || r.includes('web & mobile')
  if (isITTopic) {
    const service = detectITService(q)
    const url = service
      ? `/quote?category=Information+Technology&service=${encodeURIComponent(service)}`
      : '/quote?category=Information+Technology'
    return {
      kind: 'SERVICES',
      to: url,
      category: 'Information Technology',
      service,
      title: 'IT & Software Development',
      subtitle: service ? `Request a verified quote for ${service}.` : 'Request a verified quote for custom software and IT systems.',
      buttonText: 'Open IT Quote Form',
      isDirectIntent: false,
    }
  }

  // 5. CHECK BPO & WORKFORCE TOPIC
  const isBPOTopic = BPO_KEYWORDS.some((kw) => hasTerm(q, kw)) || r.includes('customer service') || r.includes('technical support') || r.includes('help desk')
  if (isBPOTopic) {
    const service = detectBPOService(q)
    const url = service
      ? `/quote?category=Business+Process+Outsourcing&service=${encodeURIComponent(service)}`
      : '/quote?category=Business+Process+Outsourcing'
    return {
      kind: 'SERVICES',
      to: url,
      category: 'Business Process Outsourcing',
      service,
      title: 'BPO & Workforce Operations',
      subtitle: service ? `Scope team requirements for ${service}.` : 'Scope team requirements for customer care, back-office, or virtual assistance.',
      buttonText: 'Open BPO Quote Form',
      isDirectIntent: false,
    }
  }

  // 6. CHECK GENERAL QUOTE / PRICING / DELIVERY MODEL / CONSULTATION
  const isGeneralQuoteTopic =
    GENERAL_QUOTE_KEYWORDS.some((kw) => hasTerm(q, kw)) ||
    r.includes('delivery model') ||
    r.includes('proposal') ||
    r.includes('quotation')
  if (isGeneralQuoteTopic) {
    return {
      kind: 'SERVICES',
      to: '/quote',
      title: 'Request an Official Quote',
      subtitle: 'Submit project requirements for transparent scoping, team sizing, and proposal.',
      buttonText: 'Proceed to Request a Quote',
      isDirectIntent: false,
    }
  }

  // 7. CHECK CONTACT, COMPLIANCE & GENERAL BUSINESS INQUIRIES
  const isContactTopic =
    CONTACT_KEYWORDS.some((kw) => hasTerm(q, kw)) ||
    r.includes('compliance') ||
    r.includes('contact form') ||
    r.includes('data privacy')
  if (isContactTopic) {
    return {
      kind: 'CONTACT',
      to: '/contact',
      title: 'Contact & Business Inquiries',
      subtitle: 'Connect directly with OPERAVA teams for client support, partnerships, or compliance.',
      buttonText: 'Open Contact Form',
      isDirectIntent: false,
      routingMessage: "I'm routing you to our **Contact & Business Inquiry Form**. Our management and compliance team will assist you promptly.",
    }
  }

  return null
}
