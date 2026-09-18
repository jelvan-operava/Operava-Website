import type { Service } from './services'

/** Dedicated Automation catalogue — shown when carousel selects Automation */
export const automationServices: Service[] = [
  {
    id: 'workflow-automation',
    slug: 'workflow-automation',
    category: 'it',
    number: '01',
    name: 'Workflow Automation',
    shortDescription:
      'Automate repetitive business processes, approvals, handoffs, and recurring tasks.',
    description:
      'Design and implement workflow automation that reduces manual steps across approvals, handoffs, and recurring operational tasks so teams can focus on higher-value work.',
    serviceMessage:
      'Replace manual handoffs with reliable automated workflows built around how your business actually operates.',
    capabilities: [
      'Map and digitize multi-step business processes',
      'Automate approvals, escalations, and handoffs',
      'Trigger actions from forms, events, and schedules',
      'Reduce cycle time on repetitive operational tasks',
      'Maintain audit trails and process visibility',
    ],
    benefits: [
      'Fewer manual errors and missed steps',
      'Faster throughput on routine processes',
      'Clear ownership and escalation paths',
      'Consistent execution across teams and shifts',
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
    shortDescription:
      'Convert manual operational procedures into structured, automated workflows.',
    description:
      'Transform documented operational procedures into structured automated workflows that run consistently, reduce friction, and scale with demand.',
    serviceMessage:
      'Turn SOPs and manual procedures into living automated processes that run the same way every time.',
    capabilities: [
      'Process discovery and prioritization',
      'SOP-to-workflow conversion',
      'Rules, branching, and exception handling',
      'Cross-department process orchestration',
      'Continuous improvement and monitoring',
    ],
    benefits: [
      'Standardized operations at scale',
      'Lower cost per transaction',
      'Improved compliance and consistency',
      'Capacity freed for higher-value work',
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
    shortDescription:
      'Use AI for information processing, classification, summarization, drafting, and decision support.',
    description:
      'Apply AI to classification, summarization, drafting, extraction, and decision support so knowledge work moves faster with less manual review.',
    serviceMessage:
      'Put AI where it reduces repetitive cognitive work—without losing control of outcomes.',
    capabilities: [
      'Document and data classification',
      'Summarization and content drafting',
      'Intelligent extraction and validation',
      'Decision-support assistants and agents',
      'Human-in-the-loop review paths',
    ],
    benefits: [
      'Faster turnaround on knowledge tasks',
      'Higher consistency in classification and drafting',
      'Scalable support without linear headcount growth',
      'Governed AI with clear review controls',
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
    shortDescription:
      'Automate FAQs, customer inquiries, routing, notifications, and support workflows.',
    description:
      'Automate common customer inquiries, FAQ responses, ticket routing, and support notifications so agents focus on complex cases.',
    serviceMessage:
      'Handle routine customer contact automatically while keeping complex issues with people who can resolve them.',
    capabilities: [
      'FAQ and knowledge-base automation',
      'Inquiry intake and smart routing',
      'Status notifications and follow-ups',
      'Support workflow orchestration',
      'Agent assist and escalation rules',
    ],
    benefits: [
      'Shorter response times',
      'Lower cost per interaction',
      'Better agent utilization',
      'Consistent customer communication',
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
    shortDescription:
      'Automated email notifications, responses, follow-ups, routing, and workflow-triggered communications.',
    description:
      'Build reliable email automation for notifications, responses, follow-ups, and routing tied to your business events and workflows.',
    serviceMessage:
      'Make every important event trigger the right message—on time, to the right people.',
    capabilities: [
      'Event-triggered email sequences',
      'Auto-responses and smart follow-ups',
      'Inbox routing and prioritization',
      'Template libraries with dynamic fields',
      'Delivery monitoring and compliance controls',
    ],
    benefits: [
      'No missed follow-ups',
      'Consistent brand and tone',
      'Reduced inbox workload',
      'Traceable communication history',
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
    shortDescription:
      'Automate lead capture, qualification, follow-ups, assignments, and CRM updates.',
    description:
      'Connect lead capture, qualification, assignment, and CRM updates so sales teams work from clean, timely pipeline data.',
    serviceMessage:
      'Keep pipeline motion automatic—from first capture through qualification and handoff.',
    capabilities: [
      'Lead capture and enrichment',
      'Scoring and qualification rules',
      'Auto-assignment and routing',
      'CRM field updates and activity logging',
      'Nurture and follow-up sequences',
    ],
    benefits: [
      'Higher lead response rates',
      'Cleaner CRM data',
      'Fair, fast lead distribution',
      'More selling time, less admin',
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
    shortDescription:
      'Automate data collection, synchronization, processing, reporting, and recurring updates.',
    description:
      'Automate collection, sync, processing, and delivery of operational and management reports on a reliable schedule.',
    serviceMessage:
      'Stop rebuilding the same reports—automate collection, refresh, and distribution.',
    capabilities: [
      'Scheduled data pulls and sync jobs',
      'Transformation and validation rules',
      'Dashboard and report generation',
      'Distribution to stakeholders',
      'Anomaly alerts on key metrics',
    ],
    benefits: [
      'Always-current numbers',
      'Less manual spreadsheet work',
      'Faster management decisions',
      'Audit-ready data pipelines',
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
    shortDescription:
      'Automate document generation, data extraction, validation, filing, and processing.',
    description:
      'Generate, extract, validate, file, and process documents automatically to cut turnaround time and filing errors.',
    serviceMessage:
      'Turn document-heavy work into structured digital flows—from intake to archive.',
    capabilities: [
      'Template-based document generation',
      'OCR and data extraction',
      'Validation and exception handling',
      'Automated filing and naming',
      'Approval and signature workflows',
    ],
    benefits: [
      'Faster document turnaround',
      'Fewer filing mistakes',
      'Searchable digital records',
      'Lower document handling cost',
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
    shortDescription:
      'Automate onboarding, employee workflows, notifications, documentation, and routine HR processes.',
    description:
      'Automate onboarding, employee lifecycle workflows, notifications, and routine HR administration with clear controls.',
    serviceMessage:
      'Give HR back time by automating onboarding, documentation, and recurring people processes.',
    capabilities: [
      'Onboarding and offboarding checklists',
      'Employee document collection',
      'Policy and training notifications',
      'Leave and request workflows',
      'HRIS and directory integrations',
    ],
    benefits: [
      'Faster employee onboarding',
      'Consistent people processes',
      'Reduced HR admin load',
      'Better compliance documentation',
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
    shortDescription:
      'Automate invoice workflows, payment notifications, reconciliation support, and financial administration.',
    description:
      'Streamline invoice creation, approval, payment notifications, and reconciliation support with controlled automation.',
    serviceMessage:
      'Keep cash-flow processes moving—automate invoices, reminders, and routine finance admin.',
    capabilities: [
      'Invoice generation and approval flows',
      'Payment reminders and notifications',
      'Reconciliation support workflows',
      'Expense and AP/AR assistance',
      'Finance system integrations',
    ],
    benefits: [
      'Faster billing cycles',
      'Fewer late payments',
      'Cleaner finance records',
      'Less manual bookkeeping effort',
    ],
    industries: ['Professional Services', 'SaaS', 'Retail', 'Logistics', 'Finance'],
    relatedPositions: ['Finance Operations', 'AP/AR Specialist', 'Billing Analyst'],
    icon: 'briefcase',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'system-application-integration',
    slug: 'system-application-integration',
    category: 'it',
    number: '11',
    name: 'System & Application Integration',
    shortDescription:
      'Connect business platforms, APIs, databases, and applications so information moves automatically.',
    description:
      'Connect CRMs, ERPs, databases, and internal tools so data flows between systems without manual export/import.',
    serviceMessage:
      'Stop copying data between tools—connect systems so information moves itself.',
    capabilities: [
      'API and webhook integrations',
      'Database and middleware connections',
      'Bi-directional sync rules',
      'Error handling and retry logic',
      'iPaaS and custom connector design',
    ],
    benefits: [
      'Single source of operational truth',
      'Less manual data entry',
      'Real-time process triggers',
      'Scalable integration architecture',
    ],
    industries: ['Technology', 'E-commerce', 'Logistics', 'Finance', 'Healthcare'],
    relatedPositions: ['Integration Engineer', 'Solutions Architect', 'API Developer'],
    icon: 'git-merge',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'notification-alert-automation',
    slug: 'notification-alert-automation',
    category: 'it',
    number: '12',
    name: 'Notification & Alert Automation',
    shortDescription:
      'Trigger emails, messages, alerts, and internal notifications based on defined events or conditions.',
    description:
      'Define event- and condition-based alerts across email, messaging, and internal channels so the right people act at the right time.',
    serviceMessage:
      'Never miss a critical event—automate alerts that reach the right channel and owner.',
    capabilities: [
      'Event and threshold-based triggers',
      'Multi-channel delivery (email, chat, SMS)',
      'Escalation and quiet-hour rules',
      'Internal ops and customer alerts',
      'Alert fatigue controls',
    ],
    benefits: [
      'Faster incident response',
      'Clear ownership on alerts',
      'Reduced missed SLAs',
      'Controlled notification volume',
    ],
    industries: ['Technology', 'Logistics', 'Healthcare', 'Finance', 'Support'],
    relatedPositions: ['SRE', 'Operations Analyst', 'Support Lead'],
    icon: 'life-buoy',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'scheduling-recurring-operations',
    slug: 'scheduling-recurring-operations',
    category: 'it',
    number: '13',
    name: 'Scheduling & Recurring Operations',
    shortDescription:
      'Automate scheduled jobs, recurring reports, reminders, data updates, and operational routines.',
    description:
      'Run scheduled jobs, recurring reports, reminders, and operational routines on reliable calendars without manual kickoff.',
    serviceMessage:
      'Put recurring work on a schedule so it happens every time—without someone remembering to start it.',
    capabilities: [
      'Cron and calendar-based job scheduling',
      'Recurring report generation',
      'Reminders and operational checklists',
      'Batch data updates and cleanups',
      'Failure alerts and retries',
    ],
    benefits: [
      'Reliable recurring execution',
      'Less calendar dependency on people',
      'Predictable operational cadence',
      'Automatic recovery on failures',
    ],
    industries: ['Operations', 'Finance', 'Retail', 'Technology', 'Logistics'],
    relatedPositions: ['Operations Analyst', 'DevOps Engineer', 'Systems Administrator'],
    icon: 'terminal',
    cta: 'Discuss Your Requirements',
  },
  {
    id: 'custom-automation-solutions',
    slug: 'custom-automation-solutions',
    category: 'it',
    number: '14',
    name: 'Custom Automation Solutions',
    shortDescription:
      'Design automation around a client’s specific workflow, systems, requirements, and existing processes.',
    description:
      'Tailor automation to your unique workflows, systems landscape, compliance needs, and operational goals—from discovery through delivery.',
    serviceMessage:
      'When off-the-shelf automation is not enough, we design solutions around your exact process and stack.',
    capabilities: [
      'Discovery and process prioritization',
      'Solution design around existing systems',
      'Custom scripts, bots, and workflows',
      'Pilot, measure, and scale',
      'Handover, training, and support',
    ],
    benefits: [
      'Automation that fits your reality',
      'ROI focused on high-impact processes',
      'Works with current tools and teams',
      'Clear ownership after delivery',
    ],
    industries: ['All industries', 'Technology', 'Professional Services', 'Manufacturing', 'Healthcare'],
    relatedPositions: ['Automation Architect', 'Solutions Consultant', 'Technical Project Manager'],
    icon: 'lightbulb',
    cta: 'Discuss Your Requirements',
  },
]
