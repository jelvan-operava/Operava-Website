export interface InsightCategory {
  slug: string
  name: string
  cardDescription: string
  introduction: string
}

export interface InsightArticle {
  slug: string
  categorySlug: string
  title: string
  excerpt: string
  readingMinutes: number
  published: string
  lastReviewed: string
  relatedServiceLabel: string
  relatedServiceHref: string
  sections: { heading: string; paragraphs: string[] }[]
}

export const insightCategories: InsightCategory[] = [
  {
    slug: 'automation',
    name: 'Automation',
    cardDescription:
      'Understand how businesses can improve workflows, automate repetitive work, connect systems and introduce AI assisted processes.',
    introduction:
      'Automation is the use of technology to perform tasks or workflows with reduced manual intervention. Business automation can range from simple scheduled tasks and notifications to integrated workflows involving applications, databases, APIs, artificial intelligence and human approval.',
  },
  {
    slug: 'information-technology',
    name: 'Information Technology',
    cardDescription:
      'Explore the technology systems, applications, infrastructure and digital capabilities that support modern business operations.',
    introduction:
      'Information technology supports the systems, applications, infrastructure, data and digital services businesses depend on to operate. A useful IT strategy begins with business requirements.',
  },
  {
    slug: 'outsourcing',
    name: 'Outsourcing',
    cardDescription:
      'Understand how businesses use external providers to perform defined processes, functions and specialized services.',
    introduction:
      'Outsourcing is a business arrangement in which an organization engages an external provider to perform defined activities, processes or services. Outsourcing does not automatically mean offshoring.',
  },
  {
    slug: 'offshoring',
    name: 'Offshoring',
    cardDescription:
      'Learn how international businesses structure cross border operations and offshore service delivery.',
    introduction:
      'Offshoring refers to obtaining business activities or services from an operation located in another country. Offshore outsourcing combines the geographic element of offshoring with an outsourcing arrangement involving an external provider.',
  },
  {
    slug: 'global-operations',
    name: 'Global Operations',
    cardDescription:
      'Explore the people, processes, technology and management practices involved in operating across markets.',
    introduction:
      'Global operations describes the systems, people, processes, technology and management practices required to operate across countries and markets.',
  },
  {
    slug: 'business-processes',
    name: 'Business Processes',
    cardDescription:
      'Learn how process design, documentation, standardization and improvement support efficient operations.',
    introduction:
      'Business processes are the structured activities through which an organization delivers products, services or internal outcomes. Understanding the process is important before deciding whether to improve it, automate it, outsource it or move it to another operating location.',
  },
  {
    slug: 'workforce',
    name: 'Workforce',
    cardDescription:
      'Explore workforce planning, dedicated teams, onboarding, knowledge transfer and technology enabled operations.',
    introduction:
      'Workforce operations concern the people required to deliver business activities. Technology and outsourcing can change how work is organized, but people remain important for judgment, customer interaction, problem solving, supervision, quality control and specialized knowledge.',
  },
  {
    slug: 'business-growth',
    name: 'Business Growth',
    cardDescription:
      'Understand how automation, technology and outsourcing can form part of a broader operating strategy.',
    introduction:
      'Growth creates operational requirements. A scalable operating model should make it possible to increase activity while maintaining quality, security, visibility and control.',
  },
]

export const insightArticles: InsightArticle[] = [
  {
    slug: 'what-is-business-process-automation',
    categorySlug: 'automation',
    title: 'What Is Business Process Automation',
    excerpt:
      'Business process automation uses technology to perform defined operational steps with less manual intervention, while keeping people involved where judgment is required.',
    readingMinutes: 7,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Automation Services',
    relatedServiceHref: '/services/it',
    sections: [
      {
        heading: 'The business question',
        paragraphs: [
          'Many organizations ask whether a recurring operational process should continue as manual work or be redesigned with technology. Business process automation is one approach to that decision.',
        ],
      },
      {
        heading: 'Definition and context',
        paragraphs: [
          'Business process automation (BPA) is the use of technology to execute structured steps in a business process—such as data entry, approvals, notifications, routing, and reporting—with reduced manual intervention.',
          'Automation should begin with understanding the process itself. A poorly designed process can become a poorly automated process. Businesses should identify the objective, inputs, decisions, exceptions, systems involved, and expected result before selecting an automation approach.',
        ],
      },
      {
        heading: 'How it works',
        paragraphs: [
          'Typical automation work includes mapping the current process, defining rules and exceptions, connecting the systems involved, implementing workflow or integration logic, testing edge cases, and monitoring outcomes after launch.',
          'Some processes use simple scheduling and notifications. Others combine applications, databases, APIs, artificial intelligence, and human approval steps.',
        ],
      },
      {
        heading: 'Where it can be useful',
        paragraphs: [
          'BPA is often considered for repetitive, rules-based work with clear inputs and outputs: approvals, document generation, report distribution, customer request routing, and data movement between systems.',
          'It is less suitable when every case is unique, when policy is still changing rapidly, or when the process has not been documented well enough to define reliable rules.',
        ],
      },
      {
        heading: 'Operational considerations',
        paragraphs: [
          'Teams should define ownership for process design, exception handling, and ongoing monitoring. Automation does not remove the need for governance; it changes how work is controlled.',
          'Outcomes vary by process quality, data quality, system readiness, and change management. Automation does not guarantee lower cost in every situation.',
        ],
      },
      {
        heading: 'Questions businesses should ask',
        paragraphs: [
          'Is the process documented and stable enough to automate? Which steps require human judgment? What systems must be connected? How will exceptions, failures, and access control be handled? How will success be measured after implementation?',
        ],
      },
    ],
  },
  {
    slug: 'how-to-identify-processes-suitable-for-automation',
    categorySlug: 'automation',
    title: 'How to Identify Processes Suitable for Automation',
    excerpt:
      'A practical way to decide which workflows to automate first is to evaluate volume, stability, clarity of rules, exception rate, and the systems involved.',
    readingMinutes: 8,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Automation Services',
    relatedServiceHref: '/services/it',
    sections: [
      {
        heading: 'The business question',
        paragraphs: [
          'Not every process should be automated. Identifying suitable candidates reduces wasted effort and improves the chance that automation delivers operational value.',
        ],
      },
      {
        heading: 'A practical selection approach',
        paragraphs: [
          'Start with processes that are high volume, relatively stable, and governed by clear rules. Review the frequency of exceptions, the number of systems involved, and the impact of delay or error.',
          'Document the current state before selecting tools. Process mapping often reveals unnecessary steps that should be removed rather than automated.',
        ],
      },
      {
        heading: 'Signals that a process may be a good candidate',
        paragraphs: [
          'Work is repetitive and follows consistent rules. Inputs and outputs are structured or can be structured. Delays or errors create measurable operational impact. People spend significant time on data entry, copying between systems, or routine follow-ups.',
        ],
      },
      {
        heading: 'Signals to proceed carefully',
        paragraphs: [
          'The process is still being redesigned or is highly variable. Critical decisions require nuanced judgment. Data quality is poor, or system access is unclear. There is no owner for ongoing monitoring and exception handling.',
        ],
      },
      {
        heading: 'Connecting process selection to delivery',
        paragraphs: [
          'Once candidates are prioritized, teams can design workflow automation, system integration, document automation, or AI-assisted steps where they fit. Clarify the process, then select the technology approach.',
        ],
      },
    ],
  },
  {
    slug: 'ai-automation-and-business-workflows',
    categorySlug: 'automation',
    title: 'AI Automation and Traditional Workflow Automation',
    excerpt:
      'Traditional workflow automation follows defined rules. AI automation can assist with classification, extraction, drafting, and decision support—often alongside human review.',
    readingMinutes: 8,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Automation Services',
    relatedServiceHref: '/services/it',
    sections: [
      {
        heading: 'Definition and context',
        paragraphs: [
          'Traditional workflow automation executes predetermined steps and rules. AI-assisted automation can interpret unstructured information, suggest classifications, draft content, or support decisions within a controlled process.',
          'These approaches are complementary. Many organizations combine rule-based workflows with AI for specific tasks while keeping people responsible for final decisions where risk or judgment is high.',
        ],
      },
      {
        heading: 'Where AI assistance can be useful',
        paragraphs: [
          'Classification of tickets or documents, extraction of fields from forms, summarization, drafting responses, and decision support within defined boundaries are common use cases.',
          'AI outputs should be evaluated for accuracy, bias, privacy, and operational risk. Human-in-the-loop review is often appropriate for higher-impact actions.',
        ],
      },
      {
        heading: 'Operational and security considerations',
        paragraphs: [
          'Access control, data handling, logging, and error handling remain essential. Organizations should avoid treating AI as a guarantee of cost reduction or quality improvement.',
        ],
      },
    ],
  },
  {
    slug: 'what-businesses-should-expect-from-modern-it-operations',
    categorySlug: 'information-technology',
    title: 'What Businesses Should Expect From Modern IT Operations',
    excerpt:
      'Modern IT operations support reliability, security, integration, and continuous improvement of the systems businesses depend on day to day.',
    readingMinutes: 7,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Information Technology',
    relatedServiceHref: '/services/it',
    sections: [
      {
        heading: 'Definition and context',
        paragraphs: [
          'IT operations cover the practices that keep applications, infrastructure, identity, data, and support functions running in a controlled way. Expectations should be grounded in business requirements rather than technology trends alone.',
        ],
      },
      {
        heading: 'Core expectations',
        paragraphs: [
          'Reliability and availability aligned to business criticality. Clear ownership for incidents, changes, and access management. Security practices that protect confidentiality, integrity, and availability of information. Integration awareness so systems exchange data without fragile manual workarounds. Documented recovery approaches for important systems.',
        ],
      },
      {
        heading: 'Information security note',
        paragraphs: [
          'Information security is an operational responsibility involving people, processes, and technology. International standards such as ISO/IEC 27001:2022 define requirements for an information security management system. Discussing a standard is not the same as claiming certification.',
        ],
      },
      {
        heading: 'Practical considerations',
        paragraphs: [
          'Organizations should define which services are critical, who supports them, how changes are controlled, and how success is measured.',
        ],
      },
    ],
  },
  {
    slug: 'why-systems-integration-matters',
    categorySlug: 'information-technology',
    title: 'Why Systems Integration Matters',
    excerpt:
      'When business systems do not exchange data reliably, teams compensate with manual entry, spreadsheets, and delayed decisions. Integration addresses that operational gap.',
    readingMinutes: 6,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Information Technology',
    relatedServiceHref: '/services/it',
    sections: [
      {
        heading: 'The business question',
        paragraphs: [
          'As companies add applications for sales, finance, support, and operations, data can become fragmented. Integration connects those systems so information can move with fewer manual steps.',
        ],
      },
      {
        heading: 'Where integration helps',
        paragraphs: [
          'Reducing duplicate data entry between CRM, finance, and operations tools. Triggering workflows when events occur in another system. Improving reporting accuracy by synchronizing source systems.',
        ],
      },
      {
        heading: 'Considerations',
        paragraphs: [
          'Integration design should account for ownership of each system, error handling, retries, security of credentials and data in transit, and monitoring when a connection fails.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-business-process-outsourcing',
    categorySlug: 'outsourcing',
    title: 'What Is Business Process Outsourcing',
    excerpt:
      'Business process outsourcing is the external provision of defined business processes or functions under an agreed scope, service level, and operating model.',
    readingMinutes: 7,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Outsourcing / Offshoring',
    relatedServiceHref: '/services/bpo',
    sections: [
      {
        heading: 'Definition and context',
        paragraphs: [
          'Outsourcing is a business arrangement in which an organization engages an external provider to perform defined activities, processes, or services. Business process outsourcing focuses on defined processes or functions.',
          'Outsourcing does not automatically mean offshoring. A business can outsource work to a provider in the same country or in another country.',
        ],
      },
      {
        heading: 'Common models',
        paragraphs: [
          'Project-based services for a defined outcome. Process-based services for ongoing operational work. Dedicated teams that work primarily for one client. Managed services with agreed outcomes and governance.',
        ],
      },
      {
        heading: 'When organizations consider BPO',
        paragraphs: [
          'To access specialized capacity, extend operating hours, standardize a process, or focus internal teams on core activities. Suitability depends on process maturity, security requirements, management model, and commercial structure—not on outsourcing as a universal cost solution.',
        ],
      },
      {
        heading: 'OPERAVA delivery terminology',
        paragraphs: [
          'OPERAVA uses LocalOps for local market operating support and onshore service delivery where applicable, and GlobalOps for international operating support and offshore service delivery where applicable. These terms describe delivery models; the underlying services remain clearly defined.',
        ],
      },
    ],
  },
  {
    slug: 'which-business-processes-are-suitable-for-outsourcing',
    categorySlug: 'outsourcing',
    title: 'Which Business Processes Are Suitable for Outsourcing',
    excerpt:
      'Processes that are well defined, measurable, and separable from core proprietary decision-making are often stronger candidates for outsourcing than highly variable or poorly documented work.',
    readingMinutes: 7,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Outsourcing / Offshoring',
    relatedServiceHref: '/services/bpo',
    sections: [
      {
        heading: 'Selection criteria',
        paragraphs: [
          'Clear scope and documented procedures. Measurable quality and turnaround expectations. Manageable data sensitivity with appropriate controls. Stable volume or predictable variation.',
        ],
      },
      {
        heading: 'Preparation before outsourcing',
        paragraphs: [
          'Document the process, define exceptions, identify systems and access needs, and establish how knowledge will be transferred. Outsourcing a poorly defined process often transfers the problem rather than resolving it.',
        ],
      },
      {
        heading: 'Governance',
        paragraphs: [
          'Service levels, escalation paths, security requirements, and regular performance review help keep the arrangement aligned to business needs. Outsourcing is not always cheaper than internal operations.',
        ],
      },
    ],
  },
  {
    slug: 'what-is-offshore-outsourcing',
    categorySlug: 'offshoring',
    title: 'What Is Offshore Outsourcing',
    excerpt:
      'Offshore outsourcing combines outsourcing to an external provider with delivery from an operation located in another country. Structure, law, and management—not geography alone—define the arrangement.',
    readingMinutes: 8,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Outsourcing / Offshoring',
    relatedServiceHref: '/services/bpo',
    sections: [
      {
        heading: 'Definition and context',
        paragraphs: [
          'Offshoring refers to obtaining business activities or services from an operation located in another country. Offshore outsourcing is when that arrangement is delivered by an external provider.',
          'The fact that a team is located in another country does not by itself define the commercial relationship. Agreement terms, responsibilities, management structure, employment arrangements, service scope, and applicable laws determine how the operation is structured.',
        ],
      },
      {
        heading: 'Industry context: the Philippines',
        paragraphs: [
          'The Philippines has developed a major business process outsourcing industry. Research published by the International Labour Organization has examined offshoring and BPO employment in the Philippines and has described the country as one of the major global BPO destinations.',
          'This is industry context, not a guarantee of results for any specific client engagement. Suitability depends on the process, required skills, security requirements, management model, service scope, and commercial arrangement.',
        ],
      },
      {
        heading: 'Practical considerations',
        paragraphs: [
          'Time zones, communication practices, knowledge transfer, quality management, data protection, and business continuity should be planned explicitly.',
        ],
      },
      {
        heading: 'Sources',
        paragraphs: [
          'International Labour Organization publications on offshoring and employment in the developing world (BPO in the Philippines) and on challenges for decent work in the Philippine BPO sector provide research context for the industry discussion above.',
        ],
      },
    ],
  },
  {
    slug: 'onshore-outsourcing-and-offshore-outsourcing',
    categorySlug: 'offshoring',
    title: 'Onshore Outsourcing and Offshore Outsourcing',
    excerpt:
      'Onshore outsourcing generally means the provider operates in the same country as the client. Offshore outsourcing means the provider operates in another country.',
    readingMinutes: 6,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Outsourcing / Offshoring',
    relatedServiceHref: '/services/bpo',
    sections: [
      {
        heading: 'Terminology',
        paragraphs: [
          'Outsourcing means obtaining defined activities or services from an external provider. Onshore outsourcing generally refers to outsourcing where the service provider operates within the same country as the client. Offshore outsourcing generally refers to outsourcing where the service provider operates in another country.',
        ],
      },
      {
        heading: 'How OPERAVA describes delivery',
        paragraphs: [
          'LocalOps refers to local market operating support and onshore service delivery where applicable. GlobalOps refers to international operating support and offshore service delivery where applicable.',
        ],
      },
      {
        heading: 'Choosing a model',
        paragraphs: [
          'The appropriate model depends on process requirements, language and cultural needs, time-zone coverage, data and regulatory constraints, and management preferences. No single model is appropriate for every process.',
        ],
      },
    ],
  },
  {
    slug: 'what-does-global-operations-mean',
    categorySlug: 'global-operations',
    title: 'What Does Global Operations Mean',
    excerpt:
      'Global operations is the organization of people, processes, technology, and management practices required to deliver work across countries and markets.',
    readingMinutes: 7,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Outsourcing / Offshoring',
    relatedServiceHref: '/services/bpo',
    sections: [
      {
        heading: 'Definition and context',
        paragraphs: [
          'International expansion can introduce considerations involving time zones, communication, data handling, legal requirements, employment structures, service continuity, quality management, and vendor governance.',
        ],
      },
      {
        heading: 'Building blocks',
        paragraphs: [
          'Process standardization and documentation. Clear operating models for ownership and escalation. Technology that supports distributed teams. Workforce practices for onboarding and knowledge transfer. Continuity planning for critical services.',
        ],
      },
      {
        heading: 'Centralized versus distributed',
        paragraphs: [
          'Some organizations centralize decision-making and standardize processes globally. Others distribute more autonomy by region. The right balance depends on the nature of the work, regulatory constraints, and management capacity.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-document-a-business-process',
    categorySlug: 'business-processes',
    title: 'How to Document a Business Process',
    excerpt:
      'Clear process documentation captures purpose, inputs, steps, decisions, exceptions, systems, and owners—creating a foundation for improvement, automation, or outsourcing.',
    readingMinutes: 6,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Automation Services',
    relatedServiceHref: '/services/it',
    sections: [
      {
        heading: 'Why documentation matters',
        paragraphs: [
          'Without a shared description of how work is done, training, quality control, automation, and outsourcing become harder. Documentation is a management tool, not only a compliance artifact.',
        ],
      },
      {
        heading: 'What to capture',
        paragraphs: [
          'Process purpose and success criteria. Triggers, inputs, and outputs. Step-by-step activities and decision points. Exception paths and escalation. Systems, data, and access requirements. Roles and owners.',
        ],
      },
      {
        heading: 'Using documentation',
        paragraphs: [
          'Well-written procedures support onboarding, process improvement, automation design, and knowledge transfer to internal or external teams. Documentation should be reviewed when the process changes.',
        ],
      },
    ],
  },
  {
    slug: 'why-standard-operating-procedures-matter',
    categorySlug: 'business-processes',
    title: 'Why Standard Operating Procedures Matter',
    excerpt:
      'Standard operating procedures help teams perform recurring work consistently, train new people faster, and create a baseline for measurement and improvement.',
    readingMinutes: 5,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Outsourcing / Offshoring',
    relatedServiceHref: '/services/bpo',
    sections: [
      {
        heading: 'Role of SOPs',
        paragraphs: [
          'SOPs describe the agreed way to perform a process. They reduce ambiguity, support quality review, and make it easier to identify bottlenecks or exceptions.',
        ],
      },
      {
        heading: 'Relationship to automation and outsourcing',
        paragraphs: [
          'Automating or outsourcing a process without a clear procedure often encodes inconsistency. Documenting and simplifying first usually improves outcomes later.',
        ],
      },
    ],
  },
  {
    slug: 'dedicated-teams-versus-individual-hiring',
    categorySlug: 'workforce',
    title: 'Dedicated Teams Versus Individual Hiring',
    excerpt:
      'A dedicated team model organizes capacity around a client’s ongoing work, while individual hiring focuses on single roles. The choice depends on scope, management preference, and growth plans.',
    readingMinutes: 6,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Talent Solutions',
    relatedServiceHref: '/careers',
    sections: [
      {
        heading: 'Comparing models',
        paragraphs: [
          'Individual hiring adds specific skills to an existing structure. A dedicated team can provide a coordinated group with shared processes, coverage, and management support for a defined scope of work.',
        ],
      },
      {
        heading: 'When a dedicated team may fit',
        paragraphs: [
          'Ongoing operational volume, need for coverage across shifts or functions, and preference for a managed unit rather than isolated contractors are common reasons organizations evaluate dedicated teams.',
        ],
      },
      {
        heading: 'People remain central',
        paragraphs: [
          'Technology and outsourcing change how work is organized, but judgment, supervision, quality control, and specialized knowledge still depend on people. Planning for onboarding and knowledge transfer is essential in either model.',
        ],
      },
    ],
  },
  {
    slug: 'combining-human-work-with-automation',
    categorySlug: 'workforce',
    title: 'Combining Human Work With Automation',
    excerpt:
      'Effective operating models often assign repetitive, rules-based steps to automation and reserve human effort for judgment, exceptions, relationships, and improvement.',
    readingMinutes: 6,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Automation Services',
    relatedServiceHref: '/services/it',
    sections: [
      {
        heading: 'A practical division of labor',
        paragraphs: [
          'Automation can handle high-volume, consistent tasks. People remain essential for exception handling, customer situations that require empathy, process design, and oversight.',
        ],
      },
      {
        heading: 'Change management',
        paragraphs: [
          'Introducing automation changes roles. Training, clear escalation paths, and transparent communication help teams adapt without losing service quality.',
        ],
      },
    ],
  },
  {
    slug: 'when-to-automate-and-when-to-hire',
    categorySlug: 'business-growth',
    title: 'When to Automate and When to Hire',
    excerpt:
      'Growth increases demand on processes and people. Choosing between automation and hiring works best when the underlying process is understood and the constraint is clearly identified.',
    readingMinutes: 7,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Automation Services',
    relatedServiceHref: '/services/it',
    sections: [
      {
        heading: 'Framing the decision',
        paragraphs: [
          'If work is repetitive and rules-based, automation may relieve volume pressure. If work requires judgment, relationship management, or specialized skill that is not yet codified, hiring or a dedicated team may be more appropriate.',
          'Many organizations use both: automate stable steps and add people where capacity or expertise is the real constraint.',
        ],
      },
      {
        heading: 'Avoiding false trade-offs',
        paragraphs: [
          'Automation does not always reduce cost, and hiring does not always increase flexibility. Evaluate process quality, time to value, risk, and management capacity—not only unit cost.',
        ],
      },
    ],
  },
  {
    slug: 'when-outsourcing-makes-operational-sense',
    categorySlug: 'business-growth',
    title: 'When Outsourcing Makes Operational Sense',
    excerpt:
      'Outsourcing can support growth when a process is defined, measurable, and better delivered with external capacity—provided governance and security requirements are clear.',
    readingMinutes: 6,
    published: 'September 2026',
    lastReviewed: 'September 2026',
    relatedServiceLabel: 'Outsourcing / Offshoring',
    relatedServiceHref: '/services/bpo',
    sections: [
      {
        heading: 'Conditions that support outsourcing',
        paragraphs: [
          'Documented process and success measures. Clear data and access controls. Internal capacity to manage the relationship. A genuine need for specialized capacity or coverage that is difficult to build quickly in-house.',
        ],
      },
      {
        heading: 'Caution',
        paragraphs: [
          'Outsourcing is not always cheaper than internal operations and is not appropriate for every process. Treat it as an operating design choice, not only a cost lever.',
        ],
      },
    ],
  },
]

export function getCategory(slug: string) {
  return insightCategories.find((c) => c.slug === slug)
}

export function getArticlesByCategory(categorySlug: string) {
  return insightArticles.filter((a) => a.categorySlug === categorySlug)
}

export function getArticle(categorySlug: string, articleSlug: string) {
  return insightArticles.find((a) => a.categorySlug === categorySlug && a.slug === articleSlug)
}

export function getRelatedArticles(categorySlug: string, articleSlug: string, limit = 3) {
  return insightArticles
    .filter((a) => a.categorySlug === categorySlug && a.slug !== articleSlug)
    .slice(0, limit)
}
