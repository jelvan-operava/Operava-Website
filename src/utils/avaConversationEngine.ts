/**
 * Authoritative Conversation Engine for AVA (OPERAVA assistant)
 * Controlled knowledge only — human-like answers with meaning, process, examples.
 * Contact rule: only the specific email/channel asked for; full list only when explicitly requested.
 * Document verification: users can paste a reference ID in chat; AvaAssistant looks up via API.
 */

export interface AvaDirectResponse {
  text: string
  inquiryCard?: {
    type: 'consultation' | 'career'
    defaultRole?: string
  }
}

function wantsAllContacts(q: string): boolean {
  return (
    (q.includes('all contact') ||
      q.includes('every email') ||
      q.includes('all email') ||
      q.includes('full contact') ||
      q.includes('contact list') ||
      q.includes('list of contact') ||
      q.includes('all department') ||
      (q.includes('contact') && q.includes('all'))) &&
    !q.includes('only')
  )
}

function contactResponse(rawQuery: string): AvaDirectResponse | null {
  const q = rawQuery.trim().toLowerCase()

  if (wantsAllContacts(q)) {
    return {
      text:
        'Public OPERAVA contacts:\n\n' +
        '1. General / clients: hello@operavaglobal.com\n' +
        '2. Partnership: partners@operavaglobal.com\n' +
        '3. Customer service: cs@operavaglobal.com\n' +
        '4. Human Resources: hr@operavaglobal.com\n' +
        '5. Talent / recruitment: talents@operavaglobal.com\n' +
        '6. Careers page: https://www.operavaglobal.com/careers\n' +
        '7. Compliance: compliance@operavaglobal.com\n' +
        '8. Document verification: verification@operavaglobal.com — portal: https://www.operavaglobal.com/verification (or paste the document ID here in chat)\n' +
        '9. Billing: billing@operavaglobal.com\n' +
        '10. WhatsApp (general info): +1 812 410 6066\n' +
        '11. Inquiry form: https://www.operavaglobal.com/contact\n\n' +
        'Full directory: https://www.operavaglobal.com/contacts',
    }
  }

  if (
    q.includes('verification') ||
    q.includes('verify document') ||
    q.includes('document id') ||
    q.includes('reference id')
  ) {
    return {
      text:
        'I can verify OPERAVA document reference IDs here in chat.\n\nPaste the document ID (for example OPERAVA-DOC-00000001) and I will check it.\n\nYou can also use the portal: https://www.operavaglobal.com/verification\n\nFor questions about specific document content beyond the ID status, email verification@operavaglobal.com.',
    }
  }

  if (q.includes('partner') || q.includes('reseller') || q.includes('collaboration')) {
    return {
      text: 'For partnership and collaboration inquiries, email partners@operavaglobal.com.',
    }
  }

  if (
    q.includes('customer service') ||
    q.includes('existing client') ||
    (q.includes('cs@') || q.includes('cs email'))
  ) {
    return {
      text: 'For existing client product or service concerns, email cs@operavaglobal.com.',
    }
  }

  if (
    q.includes(' human resource') ||
    q.includes('hr@') ||
    q.includes('hr email') ||
    q.includes('employment verification') ||
    (q.includes('hr') && (q.includes('email') || q.includes('contact') || q.includes('reach')))
  ) {
    return {
      text: 'For HR, employment documentation, or workforce correspondence, email hr@operavaglobal.com.',
    }
  }

  if (
    q.includes('talent') ||
    q.includes('recruit') ||
    (q.includes('hiring') && q.includes('email'))
  ) {
    return {
      text:
        'For recruitment questions, email talents@operavaglobal.com. Formal applications go through https://www.operavaglobal.com/careers.',
    }
  }

  if (q.includes('compliance') || q.includes('privacy') || q.includes('data privacy')) {
    return {
      text: 'For compliance and data privacy matters, email compliance@operavaglobal.com.',
    }
  }

  if (q.includes('billing') || q.includes('invoice') || q.includes('payment email')) {
    return {
      text: 'For billing and invoices, email billing@operavaglobal.com.',
    }
  }

  if (q.includes('whatsapp') || (q.includes('phone') && q.includes('contact'))) {
    return {
      text: 'For brief general questions via WhatsApp: +1 812 410 6066. For formal requests, prefer email or the contact form.',
    }
  }

  if (
    q.includes('hello@') ||
    q.includes('general email') ||
    q.includes('main email') ||
    q.includes('client email') ||
    (q.includes('email') && (q.includes('contact') || q.includes('reach') || q.includes('write'))) ||
    (q.includes('how') && q.includes('contact') && !wantsAllContacts(q))
  ) {
    return {
      text:
        'For general business, services, and quotations, email hello@operavaglobal.com.\n\nYou can also use the inquiry form: https://www.operavaglobal.com/contact.',
    }
  }

  return null
}

export function generateAvaHumanResponse(rawQuery: string): AvaDirectResponse {
  const query = rawQuery.trim()
  const q = query.toLowerCase()

  const contactHit = contactResponse(query)
  if (contactHit) return contactHit

  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q === 'good day' ||
    q === 'good morning' ||
    q === 'good afternoon' ||
    q === 'good evening' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ')
  ) {
    return {
      text: "Hello — I'm AVA, OPERAVA's business assistant.\n\nI can walk you through what we offer, help you get in touch, or verify an OPERAVA document if you paste the reference ID.\n\nWhat are you exploring today?",
    }
  }

  if (q.includes('how are you') || q.includes('how are things') || q.includes('how are u')) {
    return {
      text: "I'm doing well — thank you for asking. Ready when you are.\n\nI can explain OPERAVA services, contacts, careers, or verify a document ID if you paste it here.",
    }
  }

  if (
    q.includes('who are you') ||
    q.includes('what are you') ||
    q.includes('what is your name') ||
    q.includes('what can you do') ||
    q.includes('help me with')
  ) {
    return {
      text: "I'm AVA — OPERAVA Global Solutions' assistant. I only use our controlled company knowledge (not the open web).\n\nI can explain:\na. IT & software services\nb. BPO & workforce services\nc. Engagement models\nd. Company basics and careers\ne. Document verification — paste a reference ID here and I will check it\n\nFor a specific department email, just name the team.",
    }
  }

  if (q.includes('thank you') || q.includes('thanks') || q.includes('appreciate it')) {
    return { text: "You're very welcome. Ask anytime if you want more detail on a service, process, example, or document verification." }
  }

  if (
    q.includes('sec') ||
    q.includes('corporation') ||
    q.includes('legit') ||
    q.includes('legitimate') ||
    q.includes('legal entity')
  ) {
    return {
      text: 'OPERAVA Global Solutions is organized in the Philippines as a Corporation and is registered with the Philippine Securities and Exchange Commission (SEC). SEC registration establishes the legal corporate framework. It is not a blanket license for every regulated activity — where extra permits are required, OPERAVA complies before offering that activity.',
    }
  }

  if (q.includes('bir') || q.includes('tax') || q.includes('taxpayer')) {
    return {
      text: 'Yes. OPERAVA is a Philippine business registered with the Bureau of Internal Revenue (BIR) and maintains applicable taxpayer registration and tax compliance responsibilities.',
    }
  }

  if (
    q.includes('where are you') ||
    q.includes('headquarter') ||
    q.includes('location') ||
    q.includes('pagudpud') ||
    q.includes('ilocos') ||
    q.includes('address')
  ) {
    return {
      text: 'OPERAVA is Philippine-based, operating remotely and globally. Our initial office is in Pagudpud, Ilocos Norte 2919, Philippines, with delivery supporting clients across North America, APAC, and Europe.',
    }
  }

  if (
    q.includes('about') ||
    q.includes('what is operava') ||
    q.includes('what does operava') ||
    q.includes('mission') ||
    q.includes('motto')
  ) {
    return {
      text: 'OPERAVA Global Solutions is a Philippine-based technology, workforce, and BPO company — SEC and BIR registered, remote-first, serving clients globally.\n\nMotto: We Operate in Advance.\nPrinciple: Make work and services accessible — anytime, anywhere.\n\nWe connect four pieces: Businesses, Technology, Talent, and Process. Ask about any IT or BPO service for meaning, process, and examples.',
    }
  }

  if (
    q.includes('delivery model') ||
    q.includes('one professional') ||
    q.includes('dedicated team') ||
    q.includes('multiple teams') ||
    q.includes('how many people') ||
    q.includes('team size')
  ) {
    return {
      text: 'We engage in three flexible ways:\n\n1. One Professional — startups and small businesses; one specialist for a defined role.\n2. One Dedicated Team — growing SMEs; a focused team on a shared area.\n3. Multiple Teams — enterprises; multi-function or multi-region with governance.\n\nProcess: Discover → Design → Build → Launch → Operate → Optimize.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (
    q.includes('hiring process') ||
    q.includes('how to apply') ||
    q.includes('application process') ||
    (q.includes('how') && q.includes('interview'))
  ) {
    return {
      text: 'Hiring is structured and skills-focused:\n\n1. Application review\n2. Initial screening\n3. Practical skills assessment\n4. Technical / lead interview\n5. Offer and onboarding\n\nApplications go through Careers or Apply on the site (email verification). I do not collect full applications in chat.',
      inquiryCard: { type: 'career' },
    }
  }

  if (q.includes('career') || q.includes('job') || q.includes('hiring') || q.includes('vacanc') || q.includes('opening')) {
    return {
      text: 'Remote tracks include technology (developers, engineers, QA, systems) and BPO/operations (customer service, technical support, help desk, data work, virtual assistance).\n\nUse Careers or Apply for formal applications: https://www.operavaglobal.com/careers',
      inquiryCard: { type: 'career' },
    }
  }

  if (q.includes('software development') || q.includes('custom software') || q.includes('software engineer')) {
    return {
      text: 'Software Development means building software around how your business actually works.\n\nWhat it covers: custom business apps, internal tools, workflow systems, portals, modernization, and maintenance.\n\nProcess: Discover → Design → Build & test → Launch → Operate & improve.\n\nYou can start with one developer or a full squad.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('web development') || q.includes('mobile app') || q.includes('website') || q.includes('pwa')) {
    return {
      text: 'Web & Mobile Application Development builds digital experiences for speed, usability, and scale — corporate sites, web apps, portals, e-commerce, booking platforms, and mobile/PWAs.\n\nProcess: UX scope → UI → development → QA → deploy, with integrations where needed.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('saas') || q.includes('platform development') || q.includes('subscription')) {
    return {
      text: 'SaaS & Platform Development builds multi-user products for recurring operations — multi-tenant SaaS, subscriptions, portals, marketplaces, workflow engines.\n\nFocus: accounts, permissions, data models, cloud architecture, and continuous performance.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (
    q.includes('customer service') ||
    q.includes('customer support') ||
    q.includes('chat support') ||
    q.includes('call center') ||
    q.includes('customer care')
  ) {
    return {
      text: 'Customer Service covers voice, email, and live chat — orders, tracking, refunds, account care, and escalations using your scripts and rules.\n\nWe can staff one dedicated agent or a full team. For existing client issues after engagement, use cs@operavaglobal.com.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('technical support') || q.includes('help desk') || q.includes('it support')) {
    return {
      text: 'Technical Support / Help Desk handles product and user issues with defined escalation: ticket intake, basic troubleshooting, product/SaaS support, and routing to specialists.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('database') || q.includes('sql') || q.includes('data migration') || q.includes('dba')) {
    return {
      text: 'Database Services cover design, administration, SQL, optimization, migration, monitoring, and backups across the data tier lifecycle.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('integration') || q.includes('api integration') || q.includes('connect systems')) {
    return {
      text: 'Systems Integration connects apps, databases, APIs, and cloud tools — CRM/ERP, payments, SaaS connectors, webhooks, and legacy bridges — so work flows instead of duplicating.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (
    q.includes('bpo') ||
    q.includes('back-office') ||
    q.includes('data entry') ||
    q.includes('data processing') ||
    q.includes('virtual assistant') ||
    q.includes('document processing')
  ) {
    return {
      text: 'BPO & operational services extend capacity: back-office, data processing/entry, document work, and virtual assistance.\n\nEngagement: one professional, one dedicated team, or multiple teams — following your procedures.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (
    q.includes('cloud') ||
    q.includes('devops') ||
    q.includes('hosting') ||
    q.includes('aws') ||
    q.includes('azure') ||
    q.includes('gcp')
  ) {
    return {
      text: 'Cloud & infrastructure support deployment, environment setup, migration, monitoring, backups, and continuity across major clouds where scoped.',
      inquiryCard: { type: 'consultation' },
    }
  }

  if (
    q.includes('it service') ||
    q.includes('software service') ||
    q.includes('what services') ||
    q.includes('list of services')
  ) {
    return {
      text: 'OPERAVA services fall into two connected areas:\n\n1. IT & software — development, web/mobile, SaaS, systems, programming, consulting, integration, databases\n2. BPO & workforce — customer service, technical support, help desk, back-office, data and document work, virtual assistance\n\nAsk about any single service for more detail.',
      inquiryCard: { type: 'consultation' },
    }
  }

  return {
    text: "I can help with OPERAVA's technology, BPO, workforce, company background, engagement models, careers, or document verification (paste a reference ID). Formal quotes: Request a Quote. Applications: Careers / Apply.",
  }
}
