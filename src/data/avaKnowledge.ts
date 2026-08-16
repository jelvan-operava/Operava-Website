/**
 * Authoritative Knowledge Base for AVA (OPERAVA Virtual Advisor)
 * Derived from /AVA-INSTRUCTIONS/ repository.
 */

export interface KnowledgeSection {
  title: string
  summary: string
  details: string[]
  tags: string[]
  actions?: Array<{ label: string; href?: string; actionKey?: string }>
}

export const AVA_COMPANY_KNOWLEDGE = {
  name: 'OPERAVA Global Solutions',
  motto: 'We Operate in Advance',
  headquarters: 'Philippines (Manila & Clark hubs) with global delivery',
  retentionRate: '99.4%',
  uptimeSla: '99.99%',
  certifications: ['ISO 27001 Certified', 'SOC 2 Type II Audited', 'HIPAA Compliant', 'GDPR & DPA Compliant', 'PCI-DSS Level 1 Compliant'],
  targetIndustries: ['FinTech & Digital Banking', 'Healthcare & Life Sciences', 'Enterprise SaaS & Cloud Platforms', 'E-Commerce & Retail', 'Data & AI', 'Logistics & Supply Chain'],
  operatingPrinciples: [
    'Operate in advance by anticipating challenges before they impact operations',
    'Craftsmanship and automated quality assurance across all deliverables',
    'Radical transparency with real-time reporting and open communication',
    'People-first culture with continuous professional growth',
  ],
}

export const AVA_CAREERS_KNOWLEDGE = {
  overview: 'OPERAVA provides remote-first and hybrid careers with market-leading compensation, premium HMO health coverage from Day 1, equipment allowances, and a $1,000 annual learning stipend.',
  openRoles: [
    {
      id: 'cloud-eng',
      title: 'Senior Cloud Infrastructure Engineer',
      department: 'Cloud & DevSecOps',
      location: 'Remote (Philippines / Global)',
      skills: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'CI/CD pipelines'],
      experience: '5+ years',
      description: 'Architecting resilient multi-cloud foundations, automated pipelines, and containerized clusters.',
    },
    {
      id: 'fullstack-dev',
      title: 'Full-Stack React & Node.js Developer',
      department: 'Software Engineering',
      location: 'Remote / Hybrid',
      skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL'],
      experience: '3+ years',
      description: 'Building high-performance web applications, microservices, and modern API integrations.',
    },
    {
      id: 'tech-support',
      title: '24/7 Technical Support Specialist (L1/L2)',
      department: 'Technical Operations',
      location: 'Remote (Shift-based)',
      skills: ['SaaS troubleshooting', 'Zendesk / Jira', 'Incident triage', 'Fluent English'],
      experience: '2+ years',
      description: 'Delivering tier 1 and tier 2 technical resolutions for enterprise software and customer platforms.',
    },
    {
      id: 'soc-analyst',
      title: 'SOC Cybersecurity Analyst',
      department: 'Security Operations',
      location: 'Remote / Hybrid',
      skills: ['SIEM monitoring', 'Splunk / Wazuh', 'Vulnerability scanning', 'Incident response'],
      experience: '2+ years',
      description: 'Monitoring threat telemetry, analyzing suspicious activities, and maintaining ISO 27001 protocols.',
    },
    {
      id: 'data-ai-specialist',
      title: 'AI Data Annotation & ML Ops Specialist',
      department: 'Data & AI Solutions',
      location: 'Remote',
      skills: ['Data labeling', 'Computer vision', 'NLP text curation', 'QA auditing'],
      experience: '1+ years',
      description: 'Curating training datasets, fine-tuning LLM outputs, and evaluating model accuracy.',
    },
  ],
  hiringProcessSteps: [
    'Submit application and resume through our Careers page or chat with AVA.',
    '30-minute initial screening call with our Talent Acquisition team.',
    'Role-specific technical challenge or scenario-based practical evaluation.',
    'In-depth technical and architectural discussion with team leads.',
    'Final conversation covering culture fit and team alignment.',
    'Official offer letter followed by equipment setup and onboarding.',
  ],
  benefits: [
    'Competitive base salary with annual performance incentives',
    'Comprehensive HMO medical, dental, and vision coverage from Day 1',
    'Company-provided high-spec laptops and home-office equipment stipend',
    '$1,000 annual education credit for certifications and tech courses',
    '20+ paid leave days plus statutory holidays and wellness days',
  ],
}

export const AVA_SERVICES_KNOWLEDGE = {
  it: {
    title: 'Information Technology & Software Engineering',
    summary: 'Enterprise digital engineering, multi-cloud infrastructure, custom software, and 24/7 security monitoring.',
    offerings: [
      {
        name: 'Cloud & DevSecOps',
        details: 'Multi-cloud architecture on AWS, GCP, and Azure, Terraform automation, Kubernetes clusters, and zero-downtime CI/CD deployment.',
      },
      {
        name: 'Custom Software Development',
        details: 'Modern web and mobile platforms built with React, Next.js, Node.js, Python, TypeScript, and microservices.',
      },
      {
        name: '24/7 Managed SOC & Cybersecurity',
        details: 'Continuous SIEM monitoring, vulnerability assessments, penetration testing, endpoint threat protection, and ISO 27001 compliance.',
      },
      {
        name: 'Data Engineering & AI Pipelines',
        details: 'Data warehousing, ETL pipelines, real-time analytics dashboards, and training data annotation.',
      },
    ],
  },
  bpo: {
    title: 'Business Process Outsourcing & Operations',
    summary: '24/7/365 follow-the-sun customer support, technical help desk, and back-office data processing.',
    offerings: [
      {
        name: 'Omnichannel Customer Support',
        details: '24/7 tier 1–3 support across live chat, email, phone, and ticketing with a 98.4% average CSAT.',
      },
      {
        name: 'Technical Support Desk',
        details: 'Specialized L1–L3 technical troubleshooting for SaaS platforms and IT infrastructure.',
      },
      {
        name: 'Back-Office Processing',
        details: 'High-volume data entry, transaction reconciliation, KYC/AML fraud checks, and document verification with 99.8% accuracy.',
      },
      {
        name: 'Dedicated Staffing Models',
        details: 'Handpicked operational teams onboarded and operational within 7 to 14 business days.',
      },
    ],
  },
  engagement: {
    models: [
      {
        name: 'Dedicated Squads',
        description: 'Full-time dedicated engineers or operations specialists managed directly by you with transparent monthly billing.',
      },
      {
        name: 'Project-Based Delivery',
        description: 'Fixed-scope, milestone-driven execution for new software builds, cloud migrations, and security audits.',
      },
      {
        name: 'Staff Augmentation',
        description: 'Rapid placement of individual certified professionals within 7 to 14 business days to bridge immediate skill gaps.',
      },
    ],
    sla: {
      uptime: '99.99% system availability',
      criticalResponse: 'Under 15 minutes for critical incidents with 2-hour target resolution',
      chatResponse: 'Under 60 seconds first-response time for live customer chat',
      csat: '95%+ customer satisfaction benchmark',
    },
  },
}
