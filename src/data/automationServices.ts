import type { Service } from './services'

/** New circular service diagrams — cloud b5i5bwwa (2026-09 collections) */
const IMG = {
  aiAutomation:
    'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/v1789883998/795188595_1550334969738376_2629002611050598156_n.jpg',
  customAutomation:
    'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/v1789883997/818443341_1800198281153233_3417928797306308459_n.jpg',
  customerService:
    'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/v1789883179/818075191_1115987964333249_1393699877683613432_n.jpg',
  documentProcessing:
    'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/v1789883178/818133246_2111726673554111_7094790966613170147_n.jpg',
  dataProcessing:
    'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/v1789883178/816394333_4717468435148344_6455644252070295893_n.jpg',
  systemsIntegration:
    'https://res.cloudinary.com/b5i5bwwa/image/upload/f_auto,q_auto/v1789883197/795704726_4530308263854726_754283952295949774_n.jpg',
} as const

/** Dedicated Automation catalogue — shown when carousel selects Automation */
export const automationServices: Service[] = [
  {
    id: 'workflow-automation',
    slug: 'workflow-automation',
    category: 'it',
    number: '01',
    name: 'Workflow Automation',
    image: IMG.customAutomation,
    shortDescription:
      'Connect business tasks into structured digital processes so work moves automatically from one step to the next.',
    description:
      'Workflow Automation turns a series of business tasks into a structured digital process so work moves automatically based on defined conditions. Instead of employees repeatedly checking, copying, forwarding, or requesting information, Operava maps the current process, removes repetitive steps, connects the systems involved, builds the workflow, tests normal and exception cases, and deploys a process that can be monitored and improved. Typical uses include onboarding, approvals, task assignment, service request processing, internal routing, follow-up sequences, and record updates.',
    serviceMessage:
      'Design automation around how people, systems, data, and decisions interact—not around one isolated task.',
    capabilities: [
      'Map current workflows and identify manual, delayed, or error-prone steps',
      'Define business rules, conditions, and exception paths',
      'Automate approvals, escalations, handoffs, and status updates',
      'Trigger actions from forms, events, emails, and schedules',
      'Connect databases, applications, and notification channels',
      'Test normal cases, exceptions, and failure scenarios before go-live',
      'Deploy with monitoring, audit trails, and continuous improvement',
    ],
    benefits: [
      'Less repetitive administrative work',
      'Consistent processes with fewer missed steps',
      'Faster task completion and clearer ownership',
      'Better visibility of work in progress',
      'More scalable operating processes',
    ],
    industries: ['Professional Services', 'Finance', 'Healthcare', 'Logistics', 'Technology', 'Retail'],
    relatedPositions: ['Automation Specialist', 'Business Analyst', 'Process Engineer', 'Operations Analyst'],
    icon: 'zap',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'business-process-automation',
    slug: 'business-process-automation',
    category: 'it',
    number: '02',
    name: 'Business Process Automation',
    image: IMG.customAutomation,
    shortDescription:
      'Automate structured end-to-end business processes across departments, systems, approvals, and records.',
    description:
      'Business Process Automation (BPA) uses technology to automate structured processes from beginning to end—often spanning multiple departments, systems, approvals, records, and notifications. Operava documents the existing process, removes bottlenecks and duplication, defines the target process with clear rules and responsibilities, connects the right systems, automates and tests realistic scenarios, then monitors and optimizes. Common areas include customer onboarding, procurement, employee lifecycle, service request management, sales administration, and operations administration.',
    serviceMessage:
      'We look at what the business is trying to achieve before deciding what should be automated.',
    capabilities: [
      'Document existing processes and identify bottlenecks and waste',
      'Define target processes, rules, responsibilities, and exceptions',
      'Orchestrate cross-department workflows and approvals',
      'Connect the systems, records, and notification channels involved',
      'Automate end-to-end with branching and exception handling',
      'Test with realistic business scenarios before deployment',
      'Monitor results and refine as operations evolve',
    ],
    benefits: [
      'Standardized operations that scale cleanly',
      'Fewer process delays and operational errors',
      'Clearer accountability and easier tracking',
      'Growth without matching increases in admin workload',
    ],
    industries: ['BPO', 'Finance', 'Insurance', 'Manufacturing', 'Professional Services'],
    relatedPositions: ['BPA Specialist', 'RPA Developer', 'Operations Manager', 'Process Analyst'],
    icon: 'settings',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    category: 'it',
    number: '03',
    name: 'AI Automation',
    image: IMG.aiAutomation,
    shortDescription:
      'Combine automation with AI for language, classification, extraction, summarization, and intelligent routing.',
    description:
      'AI Automation applies artificial intelligence inside real business processes—not as a standalone chatbot. It supports tasks involving language, classification, summarization, information extraction, recommendations, and intelligent routing. Operava identifies where AI adds practical value, defines allowed inputs and human-review points, integrates the right technology into existing workflows, tests accuracy and edge cases, and deploys with oversight and measurable use cases. Examples include AI-assisted inquiries, document classification, extraction, summaries, knowledge-base help, lead qualification, response drafting, and internal assistants.',
    serviceMessage:
      'Treat AI as part of a controlled business process—with defined inputs, outputs, review points, and measurable outcomes.',
    capabilities: [
      'Identify high-value AI use cases within existing processes',
      'Define inputs, outputs, access limits, and human-review gates',
      'Document and email classification and intelligent routing',
      'Information extraction, summarization, and response drafting',
      'Lead qualification and knowledge-base assistance',
      'Connect AI to workflows, systems, and audit controls',
      'Test accuracy, privacy, edge cases, and failure handling',
      'Monitor performance and refine models and rules over time',
    ],
    benefits: [
      'Faster handling of information-heavy work',
      'Less repetitive knowledge work for teams',
      'More consistent responses and classifications',
      'Support for faster decisions with human judgment retained',
    ],
    industries: ['Technology', 'Legal', 'Healthcare', 'Customer Support', 'Finance'],
    relatedPositions: ['AI Automation Engineer', 'Prompt Engineer', 'Data Analyst', 'ML Ops'],
    icon: 'sparkles',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'customer-service-automation',
    slug: 'customer-service-automation',
    category: 'it',
    number: '04',
    name: 'Customer Service Automation',
    image: IMG.customerService,
    shortDescription:
      'Automate repetitive support work—routing, FAQs, tickets, follow-ups—while keeping complex cases with people.',
    description:
      'Customer Service Automation handles repetitive support activities while directing complex or sensitive cases to human agents. Operava reviews the current support process, identifies high-volume repetitive inquiries, organizes knowledge and response rules, builds routing, ticketing, notification, and response automation, defines escalation paths, and monitors service performance. Typical work includes inquiry routing, FAQ responses, ticket creation, follow-ups, status notifications, escalation workflows, information collection, and request categorization.',
    serviceMessage:
      'Design automation around the customer journey—routine work automated, complex situations handled by people.',
    capabilities: [
      'Review support processes and map high-volume repetitive inquiries',
      'Organize knowledge bases and response rules',
      'Automate intake, categorization, and smart routing',
      'Ticket creation, status notifications, and follow-ups',
      'Escalation rules for complex or sensitive cases',
      'Connect helpdesk, CRM, and communication systems',
      'Test customer journeys and exception paths',
      'Monitor service metrics and refine workflows',
    ],
    benefits: [
      'Faster first responses',
      'Less repetitive work for support teams',
      'Better ticket organization and consistency',
      'Faster escalation of complex cases',
      'Capacity to handle growing support volume',
    ],
    industries: ['Retail', 'SaaS', 'Telecom', 'E-commerce', 'Financial Services'],
    relatedPositions: ['Support Automation Specialist', 'CX Analyst', 'Contact Center Analyst'],
    icon: 'headphones',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'email-automation',
    slug: 'email-automation',
    category: 'it',
    number: '05',
    name: 'Email Automation',
    image: IMG.customAutomation,
    shortDescription:
      'Trigger, send, organize, and route emails from business events, customer actions, and system data.',
    description:
      'Email Automation uses business rules and triggers to send, organize, route, or process emails based on events, customer actions, internal activity, or system data. Operava identifies trigger events, defines recipients, timing, and message types, prepares templates with personalization, connects email to business systems, builds rules, tests delivery logic, and monitors results. Common uses include welcome and onboarding sequences, appointment and service notifications, follow-ups, internal alerts, lead nurturing, application updates, invoice notices, and escalations.',
    serviceMessage:
      'Connect email to real business events so messages are triggered by what is happening—not by someone remembering to send them.',
    capabilities: [
      'Map events that should trigger email communications',
      'Define recipients, timing, conditions, and message types',
      'Build templates with personalization fields',
      'Connect email systems to CRM, forms, and operational tools',
      'Automate sequences, alerts, and escalation messages',
      'Test delivery logic and exception scenarios',
      'Monitor delivery and engagement where applicable',
      'Update sequences as business needs change',
    ],
    benefits: [
      'Less manual email administration',
      'More consistent follow-up and response',
      'Fewer missed communications',
      'Scalable customer and employee messaging',
      'Predictable communication journeys',
    ],
    industries: ['Sales', 'Support', 'HR', 'Finance', 'Professional Services'],
    relatedPositions: ['Marketing Automation Specialist', 'Operations Analyst', 'CRM Admin'],
    icon: 'file-text',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'lead-sales-automation',
    slug: 'lead-sales-automation',
    category: 'it',
    number: '06',
    name: 'Lead & Sales Automation',
    image: IMG.customAutomation,
    shortDescription:
      'Automate lead capture, qualification, assignment, follow-up, CRM updates, and sales handoffs.',
    description:
      'Lead & Sales Automation organizes activity from lead capture through qualification, follow-up, sales administration, and handoff. Operava maps the lead-to-sale process, defines qualification and routing rules, connects forms, CRM, website, and email systems, automates lead creation and assignment, builds follow-up and notification workflows, and monitors the pipeline. Typical capabilities include lead capture, qualification, CRM record creation, assignment, reminders, email sequences, sales notifications, pipeline updates, and proposal or quotation workflows.',
    serviceMessage:
      'Remove administrative friction from sales so teams spend more time with qualified prospects and less time on repetitive updates.',
    capabilities: [
      'Map lead sources and the full lead-to-sale process',
      'Define qualification, scoring, and routing rules',
      'Connect forms, website, CRM, and email systems',
      'Automate lead creation, enrichment, and assignment',
      'Build follow-up sequences and sales notifications',
      'Keep CRM fields and pipeline stages updated automatically',
      'Support proposal and quotation workflow handoffs',
      'Monitor conversion-supporting processes and refine rules',
    ],
    benefits: [
      'Faster lead response',
      'Fewer lost or forgotten leads',
      'More consistent follow-up',
      'Cleaner customer records',
      'Better pipeline visibility',
    ],
    industries: ['SaaS', 'Real Estate', 'B2B Services', 'Financial Services', 'Technology'],
    relatedPositions: ['Revenue Operations', 'CRM Administrator', 'Sales Operations Analyst'],
    icon: 'bar-chart',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'data-reporting-automation',
    slug: 'data-reporting-automation',
    category: 'it',
    number: '07',
    name: 'Data & Reporting Automation',
    image: IMG.dataProcessing,
    shortDescription:
      'Collect, organize, and process data from connected systems into recurring reports and dashboards.',
    description:
      'Data & Reporting Automation gathers information from connected systems, organizes and processes it, and produces recurring reports or dashboards with less manual spreadsheet work. Operava starts from the business questions reports must answer, identifies source systems and fields, connects and cleans data, defines calculations, builds automated reports or dashboards, validates against source data, and schedules updates with ongoing data-quality monitoring. Typical outputs include daily or weekly business reports, sales and support metrics, workforce and marketing reporting, operational dashboards, and management summaries.',
    serviceMessage:
      'Build reporting around decisions and business needs—useful information at the right time, not more reports for their own sake.',
    capabilities: [
      'Define the business questions reports must answer',
      'Connect source systems and required data fields',
      'Clean, standardize, and structure data pipelines',
      'Define calculations, rules, and validation checks',
      'Build automated reports and operational dashboards',
      'Schedule recurring updates and distribution',
      'Validate results against source systems',
      'Monitor data quality and alert on anomalies',
    ],
    benefits: [
      'Less manual spreadsheet preparation',
      'More timely, consistent information',
      'Fewer data-entry and calculation errors',
      'Clearer operational visibility for teams',
    ],
    industries: ['Finance', 'Operations', 'Retail', 'Logistics', 'Healthcare'],
    relatedPositions: ['Data Analyst', 'BI Developer', 'Reporting Specialist'],
    icon: 'database',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'document-automation',
    slug: 'document-automation',
    category: 'it',
    number: '08',
    name: 'Document Automation',
    image: IMG.documentProcessing,
    shortDescription:
      'Generate, update, organize, route, and process business documents from predefined data and rules.',
    description:
      'Document Automation creates, updates, organizes, routes, or processes business documents using predefined data and rules. Operava reviews templates and requirements, identifies information that can be captured digitally, defines fields and rules, connects document flows to data sources, adds approval, storage, notification, or signing steps where needed, and maintains templates after deployment. Common documents include contracts, HR packs, offer letters, invoices, quotations, certificates, reports, forms, onboarding packs, and standard business letters.',
    serviceMessage:
      'Connect documents to underlying business data and workflow so the same information is not retyped into every file.',
    capabilities: [
      'Review templates and document requirements',
      'Define document fields, rules, and data sources',
      'Automate generation from structured business data',
      'Add approval, storage, notification, and e-sign steps',
      'Extract and validate data from incoming documents',
      'Organize filing, naming, and retention rules',
      'Test accuracy, formatting, and exception paths',
      'Maintain and version templates over time',
    ],
    benefits: [
      'Faster document preparation',
      'Less repetitive typing and fewer errors',
      'More consistent, organized document processes',
      'Easier high-volume document handling',
    ],
    industries: ['Legal', 'HR', 'Insurance', 'Real Estate', 'Healthcare'],
    relatedPositions: ['Document Controller', 'Operations Analyst', 'Automation Specialist'],
    icon: 'edit',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'hr-workforce-automation',
    slug: 'hr-workforce-automation',
    category: 'it',
    number: '09',
    name: 'HR & Workforce Automation',
    image: IMG.customAutomation,
    shortDescription:
      'Automate recruitment admin, onboarding, employee requests, documentation, notifications, and offboarding.',
    description:
      'HR & Workforce Automation applies automation to employee and workforce processes such as recruitment administration, onboarding, attendance-related workflows, documentation, communication, and offboarding. Operava reviews current HR processes, identifies repetitive admin, defines data, permissions, approvals, and workflow rules, connects HR, forms, document, and communication systems, implements access controls and data-handling procedures, and monitors results. Typical flows include candidate intake, interview scheduling, document collection, employee reminders, HR request routing, offboarding checklists, workforce notifications, and HR reporting.',
    serviceMessage:
      'Workforce processes involve people, documents, approvals, confidentiality, and timing—not just software.',
    capabilities: [
      'Review HR and workforce processes for repetitive admin',
      'Define employee data, permissions, approvals, and rules',
      'Automate candidate intake, routing, and interview scheduling',
      'Onboarding and offboarding checklists and document collection',
      'HR request routing, reminders, and policy notifications',
      'Connect HRIS, forms, document, and communication tools',
      'Apply access controls and appropriate data-handling procedures',
      'Monitor process health and refine over time',
    ],
    benefits: [
      'Lower HR administrative workload',
      'More consistent employee processes',
      'Faster onboarding and routine requests',
      'Fewer missed HR tasks',
      'More time for people and strategic work',
    ],
    industries: ['Technology', 'BPO', 'Healthcare', 'Retail', 'Professional Services'],
    relatedPositions: ['HR Operations', 'People Ops Analyst', 'HRIS Administrator'],
    icon: 'user-check',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'finance-invoicing-automation',
    slug: 'finance-invoicing-automation',
    category: 'it',
    number: '10',
    name: 'Finance & Invoicing Automation',
    image: IMG.customAutomation,
    shortDescription:
      'Streamline invoice preparation, delivery, payment reminders, approvals, and financial workflow routing.',
    description:
      'Finance & Invoicing Automation streamlines repetitive financial administration such as invoice preparation, payment notifications, reminders, record updates, and financial workflow routing. Operava understands the client\'s invoicing and finance workflow, identifies data sources and financial events, defines invoice, approval, notification, and reminder rules, connects systems, builds automated invoice generation and delivery, configures payment reminders and escalation paths, and monitors financial process health.',
    serviceMessage:
      'Connect invoicing and finance workflows to the systems and events that already generate the data—so fewer manual steps are required.',
    capabilities: [
      'Map invoicing and finance events and data sources',
      'Automate invoice generation, delivery, and status tracking',
      'Configure payment reminders and escalation rules',
      'Connect accounting, CRM, and operational systems',
      'Support approval workflows for financial documents',
      'Monitor delivery, payment status, and exception cases',
    ],
    benefits: [
      'Faster invoice cycles',
      'Fewer missed payments and follow-ups',
      'Lower manual finance administration',
      'Clearer visibility of receivables and workflow status',
    ],
    industries: ['Professional Services', 'SaaS', 'Agencies', 'Wholesale', 'Healthcare'],
    relatedPositions: ['Finance Operations', 'Billing Specialist', 'Accounts Receivable Analyst'],
    icon: 'bar-chart',
    cta: 'Discuss Your Requirements',
  },
]
