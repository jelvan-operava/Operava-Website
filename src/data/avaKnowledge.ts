/**
 * Authoritative Knowledge Base for AVA (OPERAVA Virtual Intelligence Assistant)
 * Derived directly from /create/ knowledge base and company profile background files:
 * - OPERAVA_AI_Assistant_Knowledge_Base_Company_and_Services.txt
 * - OPERAVA_Global_Solutions_Profile_Background.txt
 * - IT (01-08) & BPO (01-08) Service Source Files
 */

export interface KnowledgeItem {
  id: string
  category: 'company' | 'registration' | 'it' | 'bpo' | 'workforce' | 'delivery' | 'faq' | 'careers'
  question?: string
  title: string
  content: string
  tags: string[]
}

export const AVA_COMPANY_PROFILE = {
  name: 'OPERAVA Global Solutions',
  motto: 'Operating in Advance.',
  subMotto: 'Technology, Workforce & Business Process Outsourcing — Connected Remotely and Globally.',
  corePrinciple: 'MAKE WORK AND SERVICES ACCESSIBLE — ANYTIME, ANYWHERE.',
  description:
    'OPERAVA Global Solutions is a Philippine-based technology, workforce, and Business Process Outsourcing company focused on helping organizations build, modernize, connect, and operate through technology, skilled professionals, and digitally enabled business processes.',
  initialOffice: 'Pagudpud, Ilocos Norte 2919, Philippines',
  operationalModel: 'Philippine-based, operating remotely and globally with distributed delivery hubs and international reach.',
  corporateRegistration: {
    entityType: 'Corporation',
    country: 'Philippines',
    regulatoryBody: 'Philippine Securities and Exchange Commission (SEC)',
    secWebsites: ['https://www.sec.gov.ph/', 'https://esparc.sec.gov.ph/', 'https://apps002.sec.gov.ph/application/select-one-sec'],
    registrationPosition:
      'OPERAVA Global Solutions is organized in the Philippines as a Corporation and is registered with the Philippine Securities and Exchange Commission (SEC). SEC registration establishes the legal corporate framework; it is not a blanket license for every regulated activity. Where a specific service requires an additional permit or license, OPERAVA complies with applicable requirements before providing that regulated activity.',
  },
  taxRegistration: {
    authority: 'Bureau of Internal Revenue (BIR)',
    birWebsites: ['https://www.bir.gov.ph/', 'https://www.bir.gov.ph/primary-registration', 'https://web-services.bir.gov.ph/newbizreg/'],
    taxPosition:
      'OPERAVA is a Philippine business registered with the Bureau of Internal Revenue (BIR) and maintains its applicable Philippine taxpayer registration and tax compliance responsibilities.',
  },
  coreFormula: {
    title: 'BUSINESSES + TECHNOLOGY + TALENT + PROCESS',
    elements: [
      {
        name: 'TECHNOLOGY',
        desc: 'Digital products, systems, applications, cloud environments, integrations, and technology services.',
      },
      {
        name: 'PEOPLE',
        desc: 'Skilled professionals capable of operating, supporting, developing, and managing business functions.',
      },
      {
        name: 'PROCESS',
        desc: 'Structured workflows designed to produce consistent, measurable, and reliable outcomes.',
      },
    ],
  },
  deliveryModels: [
    {
      tier: 'ONE PROFESSIONAL',
      audience: 'Small Businesses & Startups',
      desc: 'A business can engage one dedicated professional for a defined function or workload without building a whole department.',
    },
    {
      tier: 'ONE DEDICATED TEAM',
      audience: 'Growing Businesses & SMEs',
      desc: 'A dedicated team supporting increasing customer volume, technology requirements, administrative work, or operational processes.',
    },
    {
      tier: 'MULTIPLE TEAMS',
      audience: 'Established Organizations & Enterprises',
      desc: 'Multiple specialized teams supporting different functions, regions, products, customer groups, or business processes with operational governance.',
    },
  ],
  clientTypes: ['Startups', 'Small Businesses', 'SMEs', 'Growing Companies', 'Established Organizations', 'Enterprises'],
  departmentalEmails: [
    { team: 'Clients Support Team', desc: 'For product, services and partnerships', email: 'hello@operavaglobal.com' },
    { team: 'Human Resources Team', desc: 'Application, verification and employment documentation related services', email: 'hr@operavaglobal.com' },
    { team: 'Customer Service Team', desc: 'Product and Services concerns', email: 'cs@operavaglobal.com' },
    { team: 'Compliance Team', desc: 'Data privacy act issue and concerns or any related compliance', email: 'compliance@operavaglobal.com' },
  ],
  talentStrategy: {
    primarySource: 'Philippines (highly skilled, English-fluent professionals)',
    globalRecruitment: 'Expanding global recruitment for specialized skills, technical domains, and language capabilities.',
    accessibility: 'Creating remote opportunities for skilled professionals, early-career talent, students seeking work, mothers and caregivers seeking flexible schedules, and experienced specialists.',
    scholarshipAndDevelopment: 'Merit-based scholarship opportunities, skills training, mentorship, and talent development initiatives as the organization grows.',
  },
}

export const AVA_IT_SERVICES = [
  {
    number: '01',
    name: 'Software Development',
    summary: 'Custom software solutions designed around business requirements, workflows, users, integrations, and long-term growth.',
    examples: ['Custom business applications', 'Enterprise applications', 'Workflow systems', 'Internal operational platforms', 'Customer portals', 'Automation applications', 'Software enhancement', 'Application modernization', 'Software maintenance'],
    relatedPositions: ['Software Developer', 'Software Engineer', 'Full-Stack Developer', 'Front-End Developer', 'Back-End Developer', 'Application Developer', 'Software Architect', 'QA Engineer', 'DevOps Engineer', 'Technical Lead', 'Solutions Architect', 'Business Systems Analyst', 'Project Manager'],
    message: 'Software should be designed around the way your business actually operates—and built to scale as your operations grow.',
    faqs: [
      { q: 'What type of software can OPERAVA develop?', a: 'OPERAVA can support custom business applications, internal systems, workflow platforms, portals, automation tools, integrations, and other software solutions based on defined requirements.' },
      { q: 'Can OPERAVA improve existing software?', a: 'Yes. Services may include enhancements, feature development, modernization, integrations, testing, maintenance, and technical improvements.' },
      { q: 'Can a small business use software development?', a: 'Yes. Projects can be scaled from focused applications or MVPs to larger enterprise systems.' },
      { q: 'Can software integrate with existing systems?', a: 'Yes. Integration requirements can be incorporated using appropriate APIs, databases, services, and approved technologies.' },
    ],
  },
  {
    number: '02',
    name: 'Web & Mobile Application Development',
    summary: 'Modern websites, web applications, and mobile experiences designed for performance, usability, accessibility, security, and scale.',
    examples: ['Corporate websites', 'Web applications', 'Customer portals', 'E-commerce platforms', 'Mobile applications', 'Progressive web applications', 'Booking platforms', 'Digital service platforms', 'Online business systems'],
    relatedPositions: ['Web Developer', 'Front-End Developer', 'Back-End Developer', 'Full-Stack Developer', 'Mobile Application Developer', 'UI Developer', 'UX Designer', 'Product Designer', 'QA Engineer', 'DevOps Engineer', 'Application Architect'],
    message: 'Your website and applications are where customers and users experience your business.',
    faqs: [
      { q: 'Does this include websites?', a: 'Yes. OPERAVA can support modern business websites and more advanced web applications.' },
      { q: 'Can OPERAVA develop mobile applications?', a: 'Yes, based on the required platform, features, user experience, integrations, and business objectives.' },
      { q: 'Can web applications connect to business systems?', a: 'Yes. Approved APIs, databases, CRMs, ERPs, payment services, authentication systems, and other platforms may be integrated where technically appropriate.' },
    ],
  },
  {
    number: '03',
    name: 'SaaS & Platform Development',
    summary: 'Scalable software-as-a-service products and digital platforms designed for recurring business operations, customers, users, subscriptions, and integrations.',
    examples: ['SaaS products', 'Multi-user platforms', 'Customer management platforms', 'Subscription systems', 'Business portals', 'Digital marketplaces', 'Workflow platforms', 'Cloud-based applications'],
    relatedPositions: ['SaaS Developer', 'Platform Engineer', 'Software Architect', 'Cloud Engineer', 'DevOps Engineer', 'Product Manager', 'UX/UI Designer', 'QA Engineer', 'Database Engineer', 'API Developer', 'Security Engineer'],
    message: 'A successful platform requires reliable architecture, scalable data structures, intuitive user experience, and continuous performance.',
    faqs: [
      { q: 'What is SaaS development?', a: 'SaaS development involves building software delivered as an ongoing online service, supporting users, accounts, permissions, subscriptions, integrations, and recurring operations.' },
      { q: 'Can OPERAVA build a SaaS product from an idea?', a: 'Yes. A project may progress from requirements and product definition through architecture, development, testing, deployment, and enhancement.' },
      { q: 'Can SaaS platforms support multiple customers?', a: 'Yes, where the architecture is designed to support the required accounts, users, permissions, tenants, and data model.' },
    ],
  },
  {
    number: '04',
    name: 'IT Systems Development',
    summary: 'Business systems designed to automate workflows, connect operational functions, improve visibility, and increase organizational efficiency.',
    examples: ['HR and workforce systems', 'CRM systems', 'ERP-related systems', 'Operations management systems', 'Internal administration systems', 'Workflow and approval systems', 'Business process automation', 'Reporting and management systems'],
    relatedPositions: ['Systems Developer', 'Business Systems Analyst', 'Systems Architect', 'Application Developer', 'Full-Stack Developer', 'Database Developer', 'Integration Engineer', 'QA Engineer', 'Systems Administrator', 'DevOps Engineer', 'Solutions Architect'],
    message: 'Organizations perform better when their systems reflect their actual operational workflows.',
    faqs: [
      { q: 'What is an IT business system?', a: 'It is a technology solution designed to support specific organizational processes such as operations, records, approvals, reporting, workforce management, customer processes, or administration.' },
      { q: 'Can OPERAVA automate an existing workflow?', a: 'Yes. Existing workflows can be translated into digital processes, rules, approvals, notifications, interfaces, and system functions.' },
    ],
  },
  {
    number: '05',
    name: 'Computer Programming',
    summary: 'Professional programming services across modern technologies and application architectures.',
    examples: ['Front-end development', 'Back-end development', 'Full-stack development', 'API development', 'Automation programming', 'Application programming', 'Database programming', 'Software maintenance', 'Feature development', 'Technical implementation'],
    relatedPositions: ['Software Programmer', 'Software Developer', 'Application Developer', 'Front-End Developer', 'Back-End Developer', 'Full-Stack Developer', 'API Developer', 'Automation Developer', 'Software Engineer', 'Technical Lead'],
    message: 'High-quality software is built on clean architecture, reliable code, and disciplined engineering practices.',
    faqs: [
      { q: 'Can OPERAVA provide one programmer?', a: 'Yes. One professional can support a defined project or workload, with the option to expand into a larger development team.' },
      { q: 'Can programmers work alongside an internal development team?', a: 'Yes. Assigned professionals can operate as an extension of the client’s existing team under agreed responsibilities and development practices.' },
    ],
  },
  {
    number: '06',
    name: 'IT Consulting',
    summary: 'Strategic technology guidance connecting business objectives with practical technology solutions.',
    examples: ['Technology assessments', 'IT strategy', 'Digital transformation planning', 'Software architecture', 'Technology roadmaps', 'Systems modernization', 'Automation strategy', 'Technology implementation planning'],
    relatedPositions: ['IT Consultant', 'Technology Consultant', 'Solutions Architect', 'Business Systems Analyst', 'Digital Transformation Consultant', 'IT Project Manager', 'Enterprise Architect', 'Cloud Consultant', 'Technology Strategist'],
    message: 'Technology investments should always align with real business objectives and operational needs.',
    faqs: [
      { q: 'What does IT consulting help with?', a: 'It can support technology assessment, planning, modernization, automation, architecture, digital transformation, integration strategy, and implementation planning.' },
      { q: 'Does consulting require replacing existing systems?', a: 'No. Existing systems should first be evaluated to determine whether improvement, integration, modernization, replacement, or another approach is appropriate.' },
    ],
  },
  {
    number: '07',
    name: 'Systems Integration',
    summary: 'Connecting applications, platforms, databases, APIs, cloud services, and business systems into coordinated technology environments.',
    examples: ['API integrations', 'CRM and ERP integrations', 'Payment integrations', 'SaaS integrations', 'Database integrations', 'Application-to-application connectivity', 'Cloud integrations', 'Workflow integrations'],
    relatedPositions: ['Integration Engineer', 'API Developer', 'Systems Integration Specialist', 'Solutions Architect', 'Software Engineer', 'Cloud Integration Engineer', 'Database Engineer', 'Enterprise Architect'],
    message: 'Disconnected systems create duplicate work and operational friction; integration creates flow.',
    faqs: [
      { q: 'Why integrate systems?', a: 'Integration can reduce duplicate work, improve information flow, automate processes, and help different systems operate as a coordinated environment.' },
      { q: 'Can OPERAVA integrate a legacy system with a new application?', a: 'Potentially, depending on the legacy system’s interfaces, architecture, access, security requirements, and technical constraints.' },
    ],
  },
  {
    number: '08',
    name: 'Database Services',
    summary: 'Database design, management, administration, optimization, migration support, and technical database operations.',
    examples: ['Database design', 'Database administration', 'SQL development', 'Database optimization', 'Database maintenance', 'Data migration', 'Database monitoring', 'Application database support'],
    relatedPositions: ['Database Administrator', 'Database Engineer', 'Database Developer', 'Data Engineer', 'SQL Developer', 'Database Architect', 'Cloud Database Specialist', 'Data Migration Specialist'],
    message: 'Your data is the foundation of your digital operations and decisions.',
    faqs: [
      { q: 'Can OPERAVA work with an existing database?', a: 'Yes, subject to the environment, technology, access, architecture, and business requirements.' },
      { q: 'Can OPERAVA help with database migration?', a: 'Yes. Migration support may include planning, preparation, transfer, validation, testing, and post-migration activities within the agreed scope.' },
    ],
  },
]

export const AVA_BPO_SERVICES = [
  {
    number: '01',
    name: 'Customer Service',
    summary: 'Professional customer-facing support through defined channels and workflows.',
    examples: ['Voice customer service', 'Email support', 'Live chat support', 'Customer care', 'Customer account support', 'Order support', 'Returns and refund support', 'Customer experience support', 'Escalation support', 'Customer success support'],
    relatedPositions: ['Customer Service Representative', 'Customer Support Specialist', 'Customer Care Representative', 'Customer Experience Specialist', 'Email Support Representative', 'Chat Support Representative', 'Voice Support Representative', 'Customer Success Associate', 'Order Support Specialist', 'Escalation Specialist', 'Team Leader', 'Quality Analyst', 'Workforce Coordinator'],
    message: 'Your customers should experience your brand, not the limitations of your internal capacity.',
    faqs: [
      { q: 'Can OPERAVA provide one customer service representative?', a: 'Yes. A business can engage one dedicated professional for a specific workload or customer channel.' },
      { q: 'Can OPERAVA provide a complete customer service team?', a: 'Yes. A dedicated team or multiple specialized teams can support different channels, products, regions, or customer groups.' },
      { q: 'Can customer service cover voice, email, and chat?', a: 'Yes, where those channels are within the agreed service scope.' },
      { q: 'Is customer service only for large companies?', a: 'No. The model can be scaled for small businesses, startups, growing companies, and enterprises.' },
      { q: 'Can the team follow the client’s scripts and processes?', a: 'Yes. Assigned professionals can work according to approved procedures, knowledge bases, scripts, escalation rules, and service requirements.' },
    ],
  },
  {
    number: '02',
    name: 'Technical Support',
    summary: 'Technology-focused assistance for customers, users, and defined product-support processes.',
    examples: ['Product support', 'SaaS support', 'Application support', 'Basic troubleshooting', 'Technical ticket handling', 'User assistance', 'Issue documentation', 'Technical escalation'],
    relatedPositions: ['Technical Support Representative', 'Technical Support Specialist', 'IT Support Specialist', 'Application Support Analyst', 'Product Support Specialist', 'SaaS Support Specialist', 'Desktop Support Technician', 'Technical Escalation Specialist', 'Support Team Lead', 'Technical QA Analyst'],
    message: 'Effective technical support solves user problems, protects product reputation, and reduces churn.',
    faqs: [
      { q: 'What type of technical support can OPERAVA provide?', a: 'Depending on scope, support may include troubleshooting, product assistance, ticket handling, issue documentation, user guidance, and defined escalation.' },
      { q: 'Does technical support replace engineers?', a: 'Not necessarily. Technical support can handle defined support responsibilities while complex issues are escalated to engineering or specialized technical teams.' },
      { q: 'Can OPERAVA support SaaS products?', a: 'Yes, where the required support processes and technical scope are defined.' },
    ],
  },
  {
    number: '03',
    name: 'Help Desk',
    summary: 'Structured front-line support for internal users, employees, customers, or clients.',
    examples: ['Ticket intake', 'Ticket categorization', 'Request management', 'Basic troubleshooting', 'Service request handling', 'Incident routing', 'Status updates', 'Escalation management'],
    relatedPositions: ['Help Desk Technician', 'Service Desk Analyst', 'IT Service Desk Representative', 'Level 1 Support Analyst', 'Level 2 Support Analyst', 'Desktop Support Specialist', 'IT Support Coordinator', 'Ticketing Specialist', 'Incident Coordinator', 'Service Request Analyst', 'Service Desk Team Lead'],
    message: 'A structured help desk brings order, visibility, and fast resolution to everyday user issues.',
    faqs: [
      { q: 'What does a help desk team handle?', a: 'A help desk can receive requests, create and update tickets, perform defined troubleshooting, provide assistance, route issues, communicate status, and escalate matters requiring specialized intervention.' },
      { q: 'Can OPERAVA support internal employees?', a: 'Yes, where the service scope includes employee or internal IT support.' },
      { q: 'Can OPERAVA work with the client’s ticketing system?', a: 'Yes, where access and technical arrangements are appropriate.' },
    ],
  },
  {
    number: '04',
    name: 'Back-Office Operations',
    summary: 'Operational support for administrative and process-driven business functions.',
    examples: ['Order processing', 'Account administration', 'Billing support', 'Claims-related processing', 'Records maintenance', 'Research', 'Reporting', 'Scheduling', 'Administrative operations', 'Operations support'],
    relatedPositions: ['Back-Office Associate', 'Operations Associate', 'Administrative Specialist', 'Order Processing Specialist', 'Account Support Specialist', 'Billing Support Specialist', 'Claims Processing Specialist', 'Workforce Coordinator', 'Operations Analyst', 'Quality Analyst', 'Research Specialist', 'Administrative Assistant'],
    message: 'Smooth back-office execution is what keeps front-facing promises reliable.',
    faqs: [
      { q: 'What is back-office outsourcing?', a: 'It means delegating defined internal administrative or operational processes to an external professional or team.' },
      { q: 'Can a client outsource only one process?', a: 'Yes. A business can start with one process and expand into additional functions or teams.' },
      { q: 'Can a back-office team work alongside internal employees?', a: 'Yes. The team can operate as an extension of the client’s organization under agreed workflows and responsibilities.' },
    ],
  },
  {
    number: '05',
    name: 'Data Processing',
    summary: 'Structured processing, organization, validation, classification, updating, and management of business information.',
    examples: ['Data collection', 'Data organization', 'Data validation', 'Data classification', 'Data updating', 'Data reconciliation', 'Data formatting', 'Data preparation', 'Data quality support'],
    relatedPositions: ['Data Processing Specialist', 'Data Operations Associate', 'Data Management Specialist', 'Data Quality Analyst', 'Data Validation Specialist', 'Data Analyst Assistant', 'Records Specialist', 'Information Processing Associate', 'Data Coordinator', 'Data Operations Team Lead'],
    message: 'Accurate data processing turns raw, unstructured information into reliable business value.',
    faqs: [
      { q: 'What does data processing involve?', a: 'It may involve collecting, organizing, validating, updating, classifying, formatting, reconciling, and preparing information according to defined business rules.' },
      { q: 'Can OPERAVA handle high-volume data processing?', a: 'Yes, staffing can be structured around transaction volume, turnaround requirements, process complexity, and quality standards.' },
      { q: 'Can processing include quality assurance?', a: 'Yes. Workflows can include validation and quality-review steps.' },
    ],
  },
  {
    number: '06',
    name: 'Data Entry',
    summary: 'High-volume or recurring data-entry support for approved business systems and records.',
    examples: ['Spreadsheet entry', 'Database entry', 'CRM updates', 'ERP data entry', 'Catalog data entry', 'Form processing', 'Records updating', 'Data verification'],
    relatedPositions: ['Data Entry Specialist', 'Data Entry Clerk', 'Data Encoder', 'Records Assistant', 'Administrative Data Specialist', 'Database Assistant', 'Catalog Data Specialist', 'Data Verification Associate', 'Data Quality Assistant', 'Data Entry Team Lead'],
    message: 'High-accuracy data entry ensures that records, catalogs, and systems remain clean and dependable.',
    faqs: [
      { q: 'Is data entry only spreadsheets?', a: 'No. It may involve spreadsheets, databases, CRM systems, ERP systems, forms, records, catalogs, portals, and other authorized platforms.' },
      { q: 'Can OPERAVA handle repetitive high-volume data entry?', a: 'Yes. Team-based staffing can be structured for sustained or seasonal workloads.' },
      { q: 'How is quality supported?', a: 'Quality can be supported through standardized instructions, validation procedures, review steps, monitoring, and agreed quality controls.' },
    ],
  },
  {
    number: '07',
    name: 'Document Processing',
    summary: 'Structured processing of business documents and document-based information.',
    examples: ['Document intake', 'Sorting', 'Classification', 'Indexing', 'Data extraction', 'Document verification', 'Records organization', 'Digital document processing', 'Document administration'],
    relatedPositions: ['Document Processing Specialist', 'Document Control Assistant', 'Records Specialist', 'Document Indexing Specialist', 'Records Management Associate', 'Data Extraction Specialist', 'Document Verification Associate', 'Administrative Processing Specialist', 'Document Processing Team Lead'],
    message: 'Structured document processing organizes critical business records and extracts vital data with precision.',
    faqs: [
      { q: 'What is document processing?', a: 'It is the structured handling of business documents, which may include intake, classification, indexing, extraction, verification, updating, and organization.' },
      { q: 'Can OPERAVA process digital documents?', a: 'Yes, subject to the required systems, access, procedures, document formats, and security controls.' },
      { q: 'Can sensitive documents be processed?', a: 'Potentially, subject to confidentiality, access controls, security measures, privacy requirements, and applicable laws.' },
    ],
  },
  {
    number: '08',
    name: 'Virtual Assistance',
    summary: 'Remote professional support for administrative, operational, customer, research, coordination, and specialized business activities.',
    examples: ['Executive assistance', 'Administrative support', 'Scheduling', 'Email management', 'Research', 'Customer support', 'CRM administration', 'E-commerce support', 'Appointment coordination', 'Project coordination', 'Recruitment assistance', 'Operations assistance'],
    relatedPositions: ['Virtual Assistant', 'Executive Virtual Assistant', 'Administrative Virtual Assistant', 'Customer Support Virtual Assistant', 'Sales Assistant', 'Marketing Assistant', 'Research Assistant', 'E-commerce Assistant', 'Appointment Coordinator', 'Operations Assistant', 'Project Coordinator', 'Recruitment Assistant', 'Executive Assistant'],
    message: 'A dedicated virtual assistant handles time-consuming administrative tasks so you can focus on high-impact growth.',
    faqs: [
      { q: 'Can OPERAVA provide one dedicated virtual assistant?', a: 'Yes.' },
      { q: 'Can OPERAVA provide multiple virtual assistants?', a: 'Yes. Multiple professionals can be organized into specialized teams.' },
      { q: 'Can virtual assistants work with existing tools?', a: 'Where technically and contractually appropriate, professionals can work with approved communication, CRM, project-management, productivity, and business systems.' },
    ],
  },
]

export const AVA_CLOUD_INFRASTRUCTURE = {
  title: 'Cloud & Digital Infrastructure',
  summary: 'Supporting technology environments that enable organizations to operate digitally and remotely.',
  services: [
    'Cloud solutions',
    'Cloud application environments',
    'Cloud migration support',
    'Cloud infrastructure planning',
    'Hosting solutions',
    'Database infrastructure',
    'Systems administration',
    'Application deployment',
    'Infrastructure integration',
    'Backup and continuity support',
    'Cloud-based business systems',
    'Remote technology operations',
    'Digital platform infrastructure',
  ],
  faqs: [
    { q: 'Does OPERAVA provide cloud services?', a: 'OPERAVA can support cloud-related solutions, infrastructure, deployment, migration, hosting-related environments, integrations, and other defined cloud requirements depending on project scope.' },
    { q: 'Can cloud services be combined with software development?', a: 'Yes. Cloud environments can support applications, databases, APIs, deployment, integrations, and ongoing digital operations.' },
    { q: 'Does "cloud" mean OPERAVA is a cloud provider?', a: 'No. OPERAVA provides cloud-related solutions and engineering services within the agreed project scope, rather than claiming to own or operate underlying cloud provider platforms.' },
  ],
}

export const AVA_INDUSTRIES = [
  'Information Technology and Software',
  'SaaS and Digital Platforms',
  'E-commerce and Retail',
  'Financial Services',
  'Insurance',
  'Healthcare Administration',
  'Telecommunications',
  'Logistics and Transportation',
  'Real Estate',
  'Education and EdTech',
  'Hospitality and Travel',
  'Professional Services & Consulting',
  'Manufacturing',
  'Digital Agencies',
  'Business Services',
  'Startups and Technology Ventures',
  'Small and Medium Enterprises (SMEs)',
  'Enterprise Organizations',
]
