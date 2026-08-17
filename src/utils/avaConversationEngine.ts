/**
 * Authoritative Conversation Engine for AVA (OPERAVA Virtual Intelligence Assistant)
 * Formulated directly from /create/ knowledge base and company profile files.
 * Provides rich, direct, human-like answers without redirects.
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

  // 1. GREETINGS & CASUAL CONVERSATION
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
      text: "Hello! I'm AVA, your virtual intelligence assistant at OPERAVA Global Solutions.\n\nI can answer any questions directly about our IT and software development services, BPO and customer operations, company registration and background, remote workforce solutions, career opportunities, or how to get started.\n\nHow can I help you today?",
    }
  }

  // 2. CASUAL CHECK-IN
  if (q.includes('how are you') || q.includes('how are things') || q.includes('how are u')) {
    return {
      text: "I'm doing well, thank you for asking! I'm ready to answer any questions you have about OPERAVA's services, delivery models, corporate background, or career opportunities.\n\nWhat would you like to explore?",
    }
  }

  // 3. IDENTITY & CAPABILITIES
  if (
    q.includes('who are you') ||
    q.includes('what are you') ||
    q.includes('what is your name') ||
    q.includes('what can you do') ||
    q.includes('help me with')
  ) {
    return {
      text: "I'm AVA, the virtual intelligence assistant for OPERAVA Global Solutions.\n\nI can assist you with:\n• IT & Software Services: Custom software, web & mobile apps, SaaS platforms, IT systems, programming, IT consulting, systems integration, and database services.\n• BPO & Workforce Operations: Customer service, technical support, help desk, back-office operations, data processing, data entry, document processing, and virtual assistance.\n• Company Background & Compliance: Corporate registration (SEC Corporation), tax registration (BIR), Philippine-based, operating remotely and globally.\n• Engagement Models: Flexible scaling from one professional to dedicated or multiple teams.\n• Careers & Hiring: Open positions, remote benefits, talent development, and application steps.",
    }
  }

  // 4. THANK YOU / APPRECIATION
  if (q.includes('thank you') || q.includes('thanks') || q.includes('appreciate it')) {
    return {
      text: "You're very welcome! Please feel free to ask anytime if you have more questions about OPERAVA.",
    }
  }

  // 5. CORPORATE REGISTRATION & SEC (SECURITIES AND EXCHANGE COMMISSION)
  if (
    q.includes('sec') ||
    q.includes('sec registered') ||
    q.includes('corporation') ||
    q.includes('corporate registration') ||
    q.includes('legal registration') ||
    q.includes('legal entity') ||
    q.includes('legit') ||
    q.includes('legitimate')
  ) {
    if (q.includes('license for everything') || q.includes('blanket') || q.includes('all services')) {
      return {
        text: "No. SEC registration establishes the corporation and its legal corporate framework. It is not a blanket license for every regulated activity.\n\nWhere a specific service or regulated activity requires additional permits, licenses, or authorizations, OPERAVA complies with all applicable requirements before providing that activity.",
      }
    }
    return {
      text: "Yes. OPERAVA Global Solutions is organized in the Philippines as a Corporation and is registered with the Philippine Securities and Exchange Commission (SEC).\n\nSEC registration establishes the legal corporate framework for our business. For any specialized, regulated activities that require specific additional permits, OPERAVA complies with applicable regulatory requirements before offering them.",
    }
  }

  // 6. TAX REGISTRATION & BIR (BUREAU OF INTERNAL REVENUE)
  if (
    q.includes('bir') ||
    q.includes('tax') ||
    q.includes('taxpayer') ||
    q.includes('bureau of internal revenue') ||
    q.includes('tax compliance')
  ) {
    return {
      text: "Yes. OPERAVA Global Solutions is a Philippine business registered with the Bureau of Internal Revenue (BIR) and maintains its applicable Philippine taxpayer registration and tax compliance responsibilities.",
    }
  }

  // 7. LOCATION, INITIAL OFFICE, & OPERATING MODEL
  if (
    q.includes('where are you') ||
    q.includes('headquarter') ||
    q.includes('office location') ||
    q.includes('where is operava') ||
    q.includes('where are you located') ||
    q.includes('pagudpud') ||
    q.includes('ilocos') ||
    q.includes('location') ||
    q.includes('address')
  ) {
    return {
      text: "OPERAVA Global Solutions is Philippine-based, operating remotely and globally.\n\nOur initial office is in Pagudpud, Ilocos Norte 2919, Philippines, delivering IT, workforce, and BPO solutions to clients worldwide across North America, APAC, and Europe.",
    }
  }

  // 8. ABOUT OPERAVA / COMPANY OVERVIEW / MISSION / MOTTO
  if (
    q.includes('about') ||
    q.includes('operava') ||
    q.includes('company overview') ||
    q.includes('mission') ||
    q.includes('vision') ||
    q.includes('motto') ||
    q.includes('philosophy') ||
    q.includes('what does operava do') ||
    q.includes('what is operava')
  ) {
    return {
      text: "OPERAVA Global Solutions is a Philippine-based technology, workforce, and Business Process Outsourcing company.\n\nOur core motto is **\"Operating in Advance.\"** and our foundational principle is to **\"MAKE WORK AND SERVICES ACCESSIBLE — ANYTIME, ANYWHERE.\"**\n\nWe connect four essential components:\n• Businesses: Organizations seeking flexible, high-quality operational and technology support.\n• Technology: Digital platforms, custom software, cloud environments, integrations, and automation.\n• Talent: Skilled professionals providing technical capability, domain expertise, and human judgment.\n• Process: Structured, repeatable workflows designed for quality, consistency, and scale.",
    }
  }

  // 9. DELIVERY MODELS & TEAM SIZES (1 PROFESSIONAL, DEDICATED TEAM, MULTIPLE TEAMS)
  if (
    q.includes('delivery model') ||
    q.includes('how many people') ||
    q.includes('team size') ||
    q.includes('one professional') ||
    q.includes('dedicated team') ||
    q.includes('multiple teams') ||
    q.includes('small business') ||
    q.includes('startup') ||
    q.includes('enterprise') ||
    q.includes('scale')
  ) {
    return {
      text: "OPERAVA provides three flexible delivery models based on your business requirements:\n\n1. One Professional (Small Businesses & Startups): Engage one dedicated specialist for a defined role or workload without hiring an entire department.\n2. One Dedicated Team (Growing Businesses & SMEs): A focused team supporting expanding customer volume, development, administration, or operational processes.\n3. Multiple Teams (Established Organizations & Enterprises): Multiple specialized teams across different functions, products, regions, or workflows with operational governance.\n\nOur philosophy is simple: you should not have to build more internal capacity than your business actually needs.",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 10. WHY REMOTE OPERATIONS & REMOTE WORK QUALITY
  if (
    q.includes('why remote') ||
    q.includes('remote model') ||
    q.includes('remote quality') ||
    q.includes('quality of remote') ||
    q.includes('lower quality') ||
    q.includes('work from home')
  ) {
    return {
      text: "Remote work does not mean lower quality. At OPERAVA, quality depends on the people, processes, technology, management, communication, and standards used to operate.\n\nOur remote-first model provides key advantages:\n• For Businesses: Access to a broader talent pool, flexible staffing, scalable operational capacity, and continuity without physical office constraints.\n• For Professionals: Flexible opportunities beyond immediate geographic limits, eliminated commutes, and international project exposure.",
    }
  }

  // 11. TALENT POOL, INCLUSIVE RECRUITMENT & SCHOLARSHIPS
  if (
    q.includes('talent pool') ||
    q.includes('where do you get talent') ||
    q.includes('scholarship') ||
    q.includes('students') ||
    q.includes('mothers') ||
    q.includes('caregivers') ||
    q.includes('early career') ||
    q.includes('training') ||
    q.includes('mentorship')
  ) {
    return {
      text: "OPERAVA's talent pool is primarily built from the Philippines, with global recruitment when specialized skills, language capabilities, or domain expertise are required.\n\nWe are committed to accessible employment and talent development:\n• Opportunities for skilled professionals, early-career talent, working students, and mothers & caregivers seeking flexible remote work.\n• Merit-based scholarship opportunities, skills development, training support, and mentorship initiatives as our organization expands.",
      inquiryCard: { type: 'career' },
    }
  }

  // 12. HIRING PROCESS & INTERVIEW STAGES
  if (
    (q.includes('how') && (q.includes('apply') || q.includes('hire') || q.includes('interview'))) ||
    q.includes('application process') ||
    q.includes('hiring process') ||
    q.includes('recruitment process') ||
    q.includes('interview process') ||
    q.includes('hiring stage') ||
    q.includes('how to apply')
  ) {
    return {
      text: "Our recruitment process is structured, transparent, and focused on genuine skills:\n\n1. Application Review: Evaluation of background, qualifications, and relevant experience.\n2. Initial Screening: Introductory conversation to discuss expectations, role requirements, and schedule.\n3. Practical Skills Assessment: Role-specific technical challenge or task-based evaluation.\n4. Technical & Lead Interview: In-depth interview with team leads or hiring managers.\n5. Offer & Onboarding: Final alignment, employment offer, and structured onboarding.\n\nWould you like to express interest or apply for an open position?",
      inquiryCard: { type: 'career' },
    }
  }

  // 13. CAREERS & OPEN POSITIONS
  if (
    q.includes('career') ||
    q.includes('job') ||
    q.includes('opening') ||
    q.includes('hiring') ||
    q.includes('vacanc') ||
    q.includes('perk') ||
    q.includes('benefit') ||
    q.includes('salary')
  ) {
    return {
      text: "We offer remote career opportunities across technology and business process operations:\n\n• IT & Software Roles: Software Developers, Web & Mobile Developers, SaaS Engineers, Systems Developers, Database Specialists, and QA Engineers.\n• BPO & Operations Roles: Customer Service Representatives, Technical Support Specialists, Help Desk Analysts, Back-Office Associates, Data Processing Specialists, Data Entry Clerks, and Virtual Assistants.\n\nBenefits include remote-first flexibility, competitive compensation, HMO coverage, professional development, and modern digital tooling.",
      inquiryCard: { type: 'career' },
    }
  }

  // 14. IT SERVICE 01: SOFTWARE DEVELOPMENT
  if (
    q.includes('software development') ||
    q.includes('custom software') ||
    q.includes('software engineer') ||
    q.includes('custom app') ||
    q.includes('enterprise app')
  ) {
    return {
      text: "OPERAVA's **Software Development** services deliver custom software solutions designed around your workflows, users, and long-term scaling:\n\n• Custom business applications and internal operational platforms\n• Workflow systems and automated customer portals\n• Application modernization, feature enhancement, and maintenance\n• Clean architecture, thorough testing, and scalable database integrations\n\nWhether you need one dedicated software developer or a full engineering squad, we adapt to your roadmap.",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 15. IT SERVICE 02: WEB & MOBILE APPLICATION DEVELOPMENT
  if (
    q.includes('web development') ||
    q.includes('mobile app') ||
    q.includes('website') ||
    q.includes('pwa') ||
    q.includes('ios') ||
    q.includes('android') ||
    q.includes('react')
  ) {
    return {
      text: "Our **Web & Mobile Application Development** practice builds modern digital experiences engineered for speed, usability, security, and scale:\n\n• Corporate websites and interactive web applications\n• Customer portals, e-commerce platforms, and booking systems\n• Cross-platform iOS & Android mobile applications and PWAs\n• API, payment, database, CRM, and authentication integrations\n\nYour digital products are where customers experience your business; we build them for reliability.",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 16. IT SERVICE 03: SAAS & PLATFORM DEVELOPMENT
  if (
    q.includes('saas') ||
    q.includes('platform development') ||
    q.includes('multi-tenant') ||
    q.includes('subscription') ||
    q.includes('digital platform')
  ) {
    return {
      text: "Our **SaaS & Platform Development** services design and engineer multi-user software products built for recurring operations:\n\n• Scalable multi-tenant SaaS architecture\n• User access, role-based permissions, and subscription management\n• Custom business portals, marketplaces, and workflow engines\n• Cloud-native database structures, automated deployments, and API connectivity",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 17. IT SERVICE 04: IT SYSTEMS DEVELOPMENT
  if (
    q.includes('it systems') ||
    q.includes('business systems') ||
    q.includes('hr system') ||
    q.includes('crm system') ||
    q.includes('erp system') ||
    q.includes('approval system')
  ) {
    return {
      text: "Our **IT Systems Development** services create centralized business solutions that connect operational functions and automate workflows:\n\n• HR & workforce management systems\n• Custom CRM and ERP-related operational tools\n• Internal workflow, approval, and document dispatch systems\n• Management reporting, performance dashboards, and process automation",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 18. IT SERVICE 05: COMPUTER PROGRAMMING
  if (
    q.includes('computer programming') ||
    q.includes('programmer') ||
    q.includes('coding') ||
    q.includes('api development') ||
    q.includes('backend development') ||
    q.includes('frontend development')
  ) {
    return {
      text: "OPERAVA provides professional **Computer Programming** across modern development stacks:\n\n• Front-end, back-end, and full-stack engineering\n• REST & GraphQL API creation and integration\n• Automation scripting, data connectors, and algorithm implementation\n• Bug fixing, feature enhancements, code refactoring, and maintenance\n\nYou can engage one dedicated programmer or expand into a dedicated development squad.",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 19. IT SERVICE 06: IT CONSULTING
  if (
    q.includes('it consulting') ||
    q.includes('technology consulting') ||
    q.includes('digital transformation') ||
    q.includes('technology assessment') ||
    q.includes('it strategy')
  ) {
    return {
      text: "Our **IT Consulting** services provide strategic technology guidance aligned with practical business execution:\n\n• Technology infrastructure and software assessments\n• Digital transformation roadmaps and modernization strategies\n• Architecture design, integration planning, and automation reviews\n• Tool selection, workflow evaluation, and implementation planning\n\nWe evaluate whether to improve, integrate, modernize, or replace systems for maximum operational value.",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 20. IT SERVICE 07: SYSTEMS INTEGRATION
  if (
    q.includes('systems integration') ||
    q.includes('integration') ||
    q.includes('connect systems') ||
    q.includes('api integration') ||
    q.includes('legacy system')
  ) {
    return {
      text: "Our **Systems Integration** practice connects disparate applications, databases, cloud tools, APIs, and business software:\n\n• API and webhook integrations between web tools, CRMs, and ERPs\n• Payment gateway, billing, and accounting platform connectivity\n• Application-to-application data syncing and workflow automation\n• Legacy system integration with modern cloud applications",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 21. IT SERVICE 08: DATABASE SERVICES
  if (
    q.includes('database') ||
    q.includes('sql') ||
    q.includes('data migration') ||
    q.includes('database administration') ||
    q.includes('dba')
  ) {
    return {
      text: "OPERAVA's **Database Services** cover the full lifecycle of your data tier:\n\n• Relational (SQL) and non-relational database design and architecture\n• Database administration, query optimization, and performance tuning\n• Data migration planning, extraction, validation, and transfer\n• Backup strategies, replication, maintenance, and monitoring",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 22. CLOUD & DIGITAL INFRASTRUCTURE
  if (
    q.includes('cloud') ||
    q.includes('infrastructure') ||
    q.includes('hosting') ||
    q.includes('devops') ||
    q.includes('server') ||
    q.includes('aws') ||
    q.includes('azure') ||
    q.includes('gcp')
  ) {
    return {
      text: "OPERAVA supports **Cloud & Digital Infrastructure** that enables modern remote operations:\n\n• Cloud application deployment and environment setup\n• Cloud migration support, infrastructure planning, and hosting environments\n• Systems administration, continuous monitoring, and maintenance\n• Backup, disaster recovery, and operational continuity configurations",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 23. BPO SERVICE 01: CUSTOMER SERVICE
  if (
    q.includes('customer service') ||
    q.includes('customer support') ||
    q.includes('chat support') ||
    q.includes('email support') ||
    q.includes('voice support') ||
    q.includes('call center') ||
    q.includes('customer care')
  ) {
    return {
      text: "Our **Customer Service** BPO operations deliver reliable customer-facing assistance across all digital and voice channels:\n\n• Live chat, email, and voice customer support\n• Order management, tracking, refunds, and account inquiries\n• Customer care, onboarding, and customer success workflows\n• Escalation handling following your approved procedures and scripts\n\nYou can engage one dedicated customer service agent or deploy a 24/7 multi-tiered team.",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 24. BPO SERVICE 02: TECHNICAL SUPPORT
  if (
    q.includes('technical support') ||
    q.includes('tech support') ||
    q.includes('product support') ||
    q.includes('troubleshooting') ||
    q.includes('tier 1') ||
    q.includes('tier 2')
  ) {
    return {
      text: "Our **Technical Support** teams provide structured product and technical assistance:\n\n• SaaS, software, and application troubleshooting\n• User account, configuration, and technical ticket resolution\n• Issue triage, reproduction, documentation, and engineering escalation\n• Multichannel support through help desks, ticketing systems, and chat",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 25. BPO SERVICE 03: HELP DESK
  if (
    q.includes('help desk') ||
    q.includes('service desk') ||
    q.includes('ticketing') ||
    q.includes('ticket intake') ||
    q.includes('internal it support')
  ) {
    return {
      text: "OPERAVA's **Help Desk** operations deliver structured front-line support for internal employees or external users:\n\n• Ticket intake, categorization, and prioritization\n• First-contact resolution for common IT and software inquiries\n• Incident routing and escalation management\n• Continuous status updates and service level agreement (SLA) tracking",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 26. BPO SERVICE 04: BACK-OFFICE OPERATIONS
  if (
    q.includes('back office') ||
    q.includes('back-office') ||
    q.includes('order processing') ||
    q.includes('billing support') ||
    q.includes('claims') ||
    q.includes('administrative operations')
  ) {
    return {
      text: "Our **Back-Office Operations** support essential process-driven business functions:\n\n• Order verification, fulfillment processing, and logistics coordination\n• Billing support, invoice processing, and account reconciliation\n• Claims processing, records administration, and document review\n• Scheduled operational reporting, research, and data verification",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 27. BPO SERVICE 05: DATA PROCESSING
  if (
    q.includes('data processing') ||
    q.includes('data classification') ||
    q.includes('data validation') ||
    q.includes('data reconciliation') ||
    q.includes('data formatting')
  ) {
    return {
      text: "OPERAVA provides structured **Data Processing** services to turn raw information into clean, actionable business data:\n\n• Data collection, organization, and normalization\n• Validation against predefined business rules and formats\n• Information classification, tagging, and category mapping\n• Data reconciliation, formatting, and quality assurance workflows",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 28. BPO SERVICE 06: DATA ENTRY
  if (
    q.includes('data entry') ||
    q.includes('data encoder') ||
    q.includes('spreadsheet') ||
    q.includes('catalog entry') ||
    q.includes('crm updates')
  ) {
    return {
      text: "Our **Data Entry** services provide high-accuracy, disciplined entry across systems and databases:\n\n• Spreadsheet, ERP, CRM, and portal data entry\n• Product catalog creation, updates, and eCommerce SKU maintenance\n• Paper/digital form transcription and record verification\n• Standardized review procedures to maintain consistent data accuracy",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 29. BPO SERVICE 07: DOCUMENT PROCESSING
  if (
    q.includes('document processing') ||
    q.includes('document indexing') ||
    q.includes('data extraction') ||
    q.includes('records management') ||
    q.includes('ocr')
  ) {
    return {
      text: "Our **Document Processing** solutions organize, digitize, and extract vital information from business documents:\n\n• Document intake, sorting, and classification\n• Metadata tagging, indexing, and digital filing\n• Key data extraction from forms, invoices, contracts, and receipts\n• Verification, record organization, and archive maintenance",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 30. BPO SERVICE 08: VIRTUAL ASSISTANCE
  if (
    q.includes('virtual assistant') ||
    q.includes('va') ||
    q.includes('executive assistant') ||
    q.includes('administrative assistant') ||
    q.includes('scheduling') ||
    q.includes('email management')
  ) {
    return {
      text: "OPERAVA's **Virtual Assistance** services provide dedicated remote support for executives, teams, and growing businesses:\n\n• Executive and administrative support, calendar and schedule management\n• Email correspondence, triage, and customer communication\n• Market research, data compilation, and presentation preparation\n• CRM updates, appointment coordination, and project support\n\nYou can engage one dedicated virtual assistant or a coordinated team of assistants.",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 31. GENERAL IT SERVICES LIST
  if (q.includes('it service') || q.includes('technology service') || q.includes('it offerings')) {
    return {
      text: "OPERAVA offers 8 primary IT and Technology service areas:\n\n01. Software Development\n02. Web & Mobile Application Development\n03. SaaS & Platform Development\n04. IT Systems Development\n05. Computer Programming\n06. IT Consulting\n07. Systems Integration\n08. Database Services\n+ Cloud & Digital Infrastructure\n\nWhich technology area can I explain in more detail for you?",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 32. GENERAL BPO SERVICES LIST
  if (q.includes('bpo service') || q.includes('bpo offerings') || q.includes('outsourcing service') || q.includes('workforce service')) {
    return {
      text: "OPERAVA offers 8 primary BPO and Workforce Operations service areas:\n\n01. Customer Service\n02. Technical Support\n03. Help Desk\n04. Back-Office Operations\n05. Data Processing\n06. Data Entry\n07. Document Processing\n08. Virtual Assistance\n\nWhich operations area would you like to know more about?",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 33. SECURITY, DATA PRIVACY & CONFIDENTIALITY
  if (
    q.includes('security') ||
    q.includes('confidentiality') ||
    q.includes('privacy') ||
    q.includes('data protection') ||
    q.includes('nda')
  ) {
    return {
      text: "OPERAVA treats client security, privacy, and confidentiality as fundamental:\n\n• We implement appropriate contractual, technical, administrative, and access-control measures tailored to each engagement.\n• Non-disclosure agreements (NDAs) and role-based access governance.\n• Compliance with the Philippine Data Privacy Act (DPA) and international privacy principles.\n• Secure infrastructure and communication protocols for all distributed workflows.",
    }
  }

  // 34. INDUSTRIES SERVED
  if (
    q.includes('industry') ||
    q.includes('sector') ||
    q.includes('fintech') ||
    q.includes('ecommerce') ||
    q.includes('healthcare') ||
    q.includes('logistics') ||
    q.includes('real estate')
  ) {
    return {
      text: "OPERAVA supports organizations across diverse industries:\n\n• Information Technology, SaaS, and Digital Platforms\n• E-Commerce, Retail, and Logistics\n• Financial Services, Insurance, and Professional Services\n• Healthcare Administration and Telecommunications\n• Real Estate, Hospitality, and EdTech\n• Startups, SMEs, and Enterprise Organizations",
    }
  }

  // 35. CONSULTATION / PRICING / HOW TO ENGAGE
  if (
    q.includes('how to start') ||
    q.includes('pricing') ||
    q.includes('cost') ||
    q.includes('quote') ||
    q.includes('proposal') ||
    q.includes('get started') ||
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('consultation')
  ) {
    return {
      text: "Getting started with OPERAVA is straightforward:\n\n1. Requirement Discovery: We discuss your technical, operational, or staffing needs.\n2. Solution & Delivery Scoping: We outline the appropriate delivery model (one professional, a dedicated team, or multiple teams) and service scope.\n3. Transparent Proposal: We provide clear, customized pricing and service parameters.\n4. Seamless Launch: Rapid onboarding, workflow alignment, and continuous delivery.\n\nWould you like to share your project details so our team can prepare a proposal?",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 36. NATURAL INTELLIGENT FALLBACK
  return {
    text: `I understand you're asking about "${query}".\n\nOPERAVA Global Solutions provides IT services (Software Development, Web & Mobile Apps, SaaS Platforms, IT Systems, Programming, IT Consulting, Systems Integration, Database Services, and Cloud Infrastructure) and BPO operations (Customer Service, Technical Support, Help Desk, Back-Office Operations, Data Processing, Data Entry, Document Processing, and Virtual Assistance).\n\nCould you let me know if you are interested in a specific service, learning more about our corporate background, or discussing a new project?`,
    inquiryCard: { type: 'consultation' },
  }
}
