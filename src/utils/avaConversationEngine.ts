/**
 * Authoritative Conversation Engine for AVA (OPERAVA assistant)
 * Controlled knowledge only — human-like answers with meaning, process, examples.
 */

export interface AvaDirectResponse {
  text: string
  inquiryCard?: {
    type: 'consultation' | 'career'
    defaultRole?: string
  }
}

export function generateAvaHumanResponse(rawQuery: string): AvaDirectResponse {
  const query = rawQuery.trim()
  const q = query.toLowerCase()

  if (
    q === 'hi' || q === 'hello' || q === 'hey' || q === 'good day' ||
    q === 'good morning' || q === 'good afternoon' || q === 'good evening' ||
    q.startsWith('hi ') || q.startsWith('hello ') || q.startsWith('hey ')
  ) {
    return {
      text: "Hello — I'm AVA, OPERAVA's business assistant.\n\nI can walk you through what we offer, what each service means, how delivery works, and practical examples — from software and cloud work to customer operations and dedicated teams.\n\nWhat are you exploring today: technology, operations support, workforce, or careers?",
    }
  }

  if (q.includes('how are you') || q.includes('how are things') || q.includes('how are u')) {
    return {
      text: "I'm doing well — thank you for asking. Ready when you are.\n\nI can explain OPERAVA services in plain language: what they cover, how we typically deliver them, and examples that fit startups through enterprises. What would you like to dig into?",
    }
  }

  if (
    q.includes('who are you') || q.includes('what are you') || q.includes('what is your name') ||
    q.includes('what can you do') || q.includes('help me with')
  ) {
    return {
      text: "I'm AVA — OPERAVA Global Solutions' assistant. I only use our controlled company knowledge (not the open web).\n\nI can explain, in practical terms:\n• **IT & software** — custom software, web/mobile, SaaS, systems, programming, consulting, integration, databases: what each means, typical process, and examples.\n• **BPO & workforce** — customer service, tech support, help desk, back-office, data and document work, virtual assistance.\n• **How we engage** — one professional, one dedicated team, or multiple teams; Discover → Design → Build → Launch → Operate → Optimize.\n• **Company basics** — Philippine SEC/BIR corporation, remote-first global delivery.\n• **Careers** — tracks and hiring steps (applications go through Careers/Apply).\n\nAsk about any service and I'll break down meaning, process, and examples.",
    }
  }

  if (q.includes('thank you') || q.includes('thanks') || q.includes('appreciate it')) {
    return { text: "You're very welcome. Ask anytime if you want more detail on a service, process, or example." }
  }

  if (q.includes('sec') || q.includes('corporation') || q.includes('legit') || q.includes('legitimate') || q.includes('legal entity')) {
    return {
      text: "OPERAVA Global Solutions is organized in the Philippines as a Corporation and is registered with the Philippine Securities and Exchange Commission (SEC). SEC registration establishes the legal corporate framework. It is not a blanket license for every regulated activity — where extra permits are required, OPERAVA complies before offering that activity.",
    }
  }

  if (q.includes('bir') || q.includes('tax') || q.includes('taxpayer')) {
    return {
      text: "Yes. OPERAVA is a Philippine business registered with the Bureau of Internal Revenue (BIR) and maintains applicable taxpayer registration and tax compliance responsibilities.",
    }
  }

  if (q.includes('where are you') || q.includes('headquarter') || q.includes('location') || q.includes('pagudpud') || q.includes('ilocos') || q.includes('address')) {
    return {
      text: "OPERAVA is Philippine-based, operating remotely and globally. Our initial office is in Pagudpud, Ilocos Norte 2919, Philippines, with delivery supporting clients across North America, APAC, and Europe.",
    }
  }

  if (q.includes('about') || q.includes('what is operava') || q.includes('what does operava') || q.includes('mission') || q.includes('motto')) {
    return {
      text: "OPERAVA Global Solutions is a Philippine-based technology, workforce, and BPO company — SEC and BIR registered, remote-first, serving clients globally.\n\n**Motto:** We Operate in Advance.\n**Principle:** Make work and services accessible — anytime, anywhere.\n\nWe connect four pieces:\n• **Businesses** that need flexible capacity\n• **Technology** — software, cloud, integrations, automation\n• **Talent** — skilled people for technical and operational work\n• **Process** — structured workflows for consistent outcomes\n\nAsk about any IT or BPO service and I can explain meaning, typical process, and examples from our controlled knowledge.",
    }
  }

  if (q.includes('delivery model') || q.includes('one professional') || q.includes('dedicated team') || q.includes('multiple teams') || q.includes('how many people') || q.includes('team size')) {
    return {
      text: "We engage in three flexible ways:\n\n1. **One Professional** — startups and small businesses; one specialist for a defined role.\n2. **One Dedicated Team** — growing SMEs; a focused team on a shared area.\n3. **Multiple Teams** — enterprises; multi-function or multi-region with governance.\n\n**Process:** Discover → Design → Build → Launch → Operate → Optimize.\n\nYou should not have to build more internal capacity than the business actually needs.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('hiring process') || q.includes('how to apply') || q.includes('application process') || (q.includes('how') && q.includes('interview'))) {
    return {
      text: "Hiring is structured and skills-focused:\n\n1. Application review\n2. Initial screening\n3. Practical skills assessment\n4. Technical / lead interview\n5. Offer and onboarding\n\nApplications go through Careers or Apply on the site (email verification). I don't collect full applications in chat.",
      inquiryCard: { type: 'career' },
    }
  }

  if (q.includes('career') || q.includes('job') || q.includes('hiring') || q.includes('vacanc') || q.includes('opening')) {
    return {
      text: "Remote tracks include:\n• **IT & software** — developers, engineers, QA, systems, database roles\n• **BPO & operations** — customer service, technical support, help desk, data and document work, virtual assistance\n\nBenefits emphasize remote-first flexibility, competitive pay, HMO, learning, and PTO. Use Careers or Apply for formal applications.",
      inquiryCard: { type: 'career' },
    }
  }

  if (q.includes('software development') || q.includes('custom software') || q.includes('software engineer')) {
    return {
      text: "**Software Development** means building software around how your business actually works — not generic templates.\n\n**What it covers**\n• Custom business apps, internal tools, workflow systems, customer portals\n• Modernization, feature work, and ongoing maintenance\n\n**Typical process**\nDiscover requirements → Design architecture → Build & test → Launch → Operate & improve\n\n**Examples**\nInternal ops platforms, automation apps, enterprise workflow systems, portal upgrades.\n\nYou can start with one developer or a full squad. For a scoped project, use Request a Quote.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('web development') || q.includes('mobile app') || q.includes('website') || q.includes('pwa')) {
    return {
      text: "**Web & Mobile Application Development** builds digital experiences for speed, usability, and scale.\n\n**What it covers**\nCorporate sites, web apps, customer portals, e-commerce, booking platforms, iOS/Android and PWAs.\n\n**Process**\nUX scope → UI → development → QA → deploy, with API, payment, and CRM integrations where needed.\n\nYour digital products are where customers experience your business.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('saas') || q.includes('platform development') || q.includes('subscription')) {
    return {
      text: "**SaaS & Platform Development** builds multi-user products for recurring operations.\n\n**Examples**\nMulti-tenant SaaS, subscription systems, business portals, marketplaces, workflow engines.\n\n**What matters**\nAccounts, permissions, data models, cloud architecture, and continuous performance — designed to scale with customers.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('customer service') || q.includes('customer support') || q.includes('chat support') || q.includes('call center') || q.includes('customer care')) {
    return {
      text: "**Customer Service** means your customers experience your brand — without being limited by internal capacity.\n\n**What it covers**\n• Voice, email, and live chat\n• Orders, tracking, refunds, account care, onboarding\n• Escalations following your scripts and rules\n\n**How it works**\nWe align on channels, hours, scripts, and escalation paths, then staff one dedicated agent or a full team (including 24/7 where scoped). Agents work to your knowledge base and quality standards.\n\n**Examples**\nChat for e-commerce, voice for SaaS, email for account issues. Use Request a Quote for a scoped engagement.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('technical support') || q.includes('help desk') || q.includes('it support')) {
    return {
      text: "**Technical Support / Help Desk** handles product and user issues with defined escalation.\n\n**What it covers**\nTicket intake, categorization, basic troubleshooting, product/SaaS support, documentation, and routing to specialists.\n\n**Process**\nDefined tiers (as scoped) so front-line support resolves what it can and escalates complex work to engineering — without replacing engineers.\n\n**Examples**\nSaaS user assistance, application support tickets, internal employee help desk.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('database') || q.includes('sql') || q.includes('data migration') || q.includes('dba')) {
    return {
      text: "**Database Services** cover the data tier lifecycle.\n\n**What it covers**\nDesign, administration, SQL development, optimization, migration, monitoring, and backups.\n\n**Process**\nAssess environment → design or improve schema → implement changes → validate → monitor.\n\nYour data underpins digital operations and decisions.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('integration') || q.includes('api integration') || q.includes('connect systems')) {
    return {
      text: "**Systems Integration** connects apps, databases, APIs, and cloud tools so work flows instead of duplicating.\n\n**Examples**\nCRM/ERP links, payment gateways, SaaS connectors, webhook automation, legacy-to-cloud bridges.\n\n**Process**\nMap systems and data → design interfaces → implement and test → monitor.\n\nDisconnected systems create friction; integration creates flow.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('bpo') || q.includes('back-office') || q.includes('data entry') || q.includes('data processing') || q.includes('virtual assistant') || q.includes('document processing')) {
    return {
      text: "**BPO & operational services** extend capacity without building full internal departments.\n\n**Examples**\n• Back-office administration and coordination\n• Data processing and data entry with quality checks\n• Document intake, classification, and filing\n• Virtual assistance (calendar, email, research, coordination)\n\n**How we engage**\nOne professional, one dedicated team, or multiple teams — following your procedures and quality standards.\n\nAsk about a specific function and I'll explain meaning, process, and examples.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('cloud') || q.includes('devops') || q.includes('hosting') || q.includes('aws') || q.includes('azure') || q.includes('gcp')) {
    return {
      text: "**Cloud & infrastructure** support modern remote operations.\n\n**What it covers**\nDeployment, environment setup, migration support, monitoring, backups, and continuity configurations across major clouds where scoped.\n\n**Process**\nPlan environment → deploy/migrate → harden and monitor → operate continuously.",
      inquiryCard: { type: 'consultation' },
    }
  }

  if (q.includes('it service') || q.includes('software service') || q.includes('what services') || q.includes('list of services')) {
    return {
      text: "OPERAVA services fall into two connected areas:\n\n**IT & software**\nSoftware development, web & mobile, SaaS platforms, IT systems, programming, IT consulting, systems integration, database services.\n\n**BPO & workforce**\nCustomer service, technical support, help desk, back-office, data processing, data entry, document processing, virtual assistance.\n\n**Engagement**\nOne professional → one dedicated team → multiple teams.\n**Operating model**\nDiscover → Design → Build → Launch → Operate → Optimize.\n\nAsk about any single service for meaning, process, and examples.",
      inquiryCard: { type: 'consultation' },
    }
  }

  return {
    text: "I can help with OPERAVA's technology, BPO, workforce, company background, engagement models, or careers — using only our controlled knowledge.\n\nTry asking about a specific service (for example software development or customer service), how we deliver (one professional vs teams), or whether you are exploring as a client or applying for a role.\n\nFormal quotes: Request a Quote. Applications: Careers / Apply.",
  }
}
