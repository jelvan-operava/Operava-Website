/**
 * Direct-Answer Conversation Engine for AVA
 * Provides rich, direct, human-like answers for OPERAVA Global Solutions
 * without pre-templated routing links or redirecting users away.
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
    q === 'good morning' ||
    q === 'good afternoon' ||
    q === 'good evening' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ')
  ) {
    return {
      text: "Hello! I'm AVA, your assistant at OPERAVA Global Solutions.\n\nI can answer any questions you have about our cloud engineering, custom software development, 24/7 customer support and BPO operations, career opportunities, or how our team works.\n\nWhat can I help you with today?",
    }
  }

  // 2. HOW ARE YOU / CASUAL CHECK-IN
  if (q.includes('how are you') || q.includes('how are things') || q.includes('how are u')) {
    return {
      text: "I'm doing well, thank you for asking! I'm here and ready to help answer any questions you have about OPERAVA's services, team, or open roles.\n\nWhat would you like to know?",
    }
  }

  // 3. WHO ARE YOU / WHAT CAN YOU DO / IDENTITY
  if (
    q.includes('who are you') ||
    q.includes('what are you') ||
    q.includes('what is your name') ||
    q.includes('what can you do') ||
    q.includes('help me with')
  ) {
    return {
      text: "I'm AVA, the virtual intelligence assistant for OPERAVA Global Solutions.\n\nI can answer questions directly about our IT and cloud engineering capabilities, 24/7 BPO operations, active job openings, hiring stages, compliance standards, and engagement models. If you'd like to schedule a consultation or apply for a position, I can also take your details directly here in the chat.",
    }
  }

  // 4. THANK YOU / APPRECIATION
  if (q.includes('thank you') || q.includes('thanks') || q.includes('appreciate it')) {
    return {
      text: "You're very welcome! Feel free to ask anytime if there's anything else you'd like to know.",
    }
  }

  // 5. LOCATION / HEADQUARTERS / WHERE ARE YOU
  if (
    q.includes('where are you') ||
    q.includes('headquarter') ||
    q.includes('office location') ||
    q.includes('where is operava') ||
    q.includes('where are you located') ||
    q.includes('philippines') ||
    q.includes('location')
  ) {
    return {
      text: "OPERAVA is headquartered in the Philippines, with primary operational hubs in Manila and Clark.\n\nWe provide 24/7 follow-the-sun service delivery to clients across North America, Europe, Australia, and the Asia-Pacific region through our blended onsite and remote-first engineering squads.",
    }
  }

  // 6. CERTIFICATIONS / SECURITY / COMPLIANCE / ISO / SOC 2 / HIPAA
  if (
    q.includes('certification') ||
    q.includes('security') ||
    q.includes('iso') ||
    q.includes('soc 2') ||
    q.includes('soc2') ||
    q.includes('hipaa') ||
    q.includes('compliance') ||
    q.includes('gdpr') ||
    q.includes('pci') ||
    q.includes('privacy')
  ) {
    return {
      text: "Security and data compliance are foundational to all our operations. OPERAVA is audited and certified under key international standards:\n\n• ISO 27001 Certified for Information Security Management Systems\n• SOC 2 Type II Audited for enterprise security, availability, and confidentiality\n• HIPAA Compliant for healthcare data protection and clinical workflows\n• GDPR and Philippine Data Privacy Act (DPA) Compliant\n• PCI-DSS Level 1 Compliant for payment and financial workflows\n\nAll infrastructure, code repositories, customer data, and operational communications are encrypted end-to-end both in transit and at rest.",
    }
  }

  // 7. HIRING PROCESS & INTERVIEWS
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
      text: "Our hiring process is designed to be transparent, fast, and respectful of your time:\n\n1. Application Review: Our talent acquisition team reviews your resume within 24 to 48 business hours.\n2. Initial Screening (30 mins): A brief conversation to discuss your background, career goals, and role expectations.\n3. Practical Challenge: A role-specific practical assessment or coding challenge to evaluate real-world problem-solving.\n4. Technical & Lead Interview: An in-depth discussion with engineering or operational leads.\n5. Cultural Alignment & Offer: Final conversation with leadership, followed by an official offer letter and equipment provisioning.\n\nWould you like to express interest or submit your details directly here?",
      inquiryCard: { type: 'career' },
    }
  }

  // 8. CAREERS / BENEFITS / SALARY / REMOTE WORK
  if (
    q.includes('career') ||
    q.includes('job') ||
    q.includes('opening') ||
    q.includes('hiring') ||
    q.includes('developer job') ||
    q.includes('cloud job') ||
    q.includes('support job') ||
    q.includes('work with you') ||
    q.includes('salary') ||
    q.includes('perks') ||
    q.includes('benefit') ||
    q.includes('remote work') ||
    q.includes('work from home') ||
    q.includes('wfh')
  ) {
    if (q.includes('benefit') || q.includes('perk') || q.includes('remote') || q.includes('wfh') || q.includes('salary')) {
      return {
        text: "OPERAVA offers industry-leading benefits designed to support our team's well-being and growth:\n\n• Remote-First Flexibility: Work comfortably from home or from our modern hubs in Manila and Clark.\n• Day-1 Premium HMO: Comprehensive medical, dental, and optical insurance covering both you and your dependents from your very first day.\n• High-Spec Equipment: Latest Apple M-series MacBook Pro or high-performance workstation with an ergonomic home-office stipend.\n• $1,000 Annual Learning Stipend: Dedicated budget for technical certifications, courses, and conferences.\n• 20+ Paid Leave Days: Generous vacation, sick leave, and wellness days on top of national holidays.\n• Competitive Compensation: Above-market base pay with annual performance reviews and bonuses.",
        inquiryCard: { type: 'career' },
      }
    }

    return {
      text: "We are actively hiring for several remote and hybrid roles across engineering and operations:\n\n• Senior Cloud Infrastructure Engineer (AWS, GCP, Kubernetes, Terraform)\n• Full-Stack React & Node.js Developer (TypeScript, Next.js, Microservices)\n• 24/7 Technical Support Specialist (L1/L2 SaaS troubleshooting and customer support)\n• SOC Cybersecurity Analyst (SIEM threat defense and vulnerability monitoring)\n• AI Data Annotation & ML Ops Specialist (Training dataset curation and LLM evaluation)\n\nAll roles include Day-1 comprehensive HMO coverage for you and your dependents, hardware allowances, and flexible remote arrangements.",
      inquiryCard: { type: 'career' },
    }
  }

  // 9. CONSULTATIONS / PRICING / ENGAGEMENT MODELS / QUOTE
  if (
    (q.includes('how') && (q.includes('start') || q.includes('contact') || q.includes('quote') || q.includes('consultation'))) ||
    q.includes('book a call') ||
    q.includes('schedule a call') ||
    q.includes('request a quote') ||
    q.includes('get an estimate') ||
    q.includes('pricing') ||
    q.includes('rates') ||
    q.includes('how much') ||
    q.includes('cost') ||
    q.includes('proposal') ||
    q.includes('engagement model') ||
    q.includes('dedicated team')
  ) {
    return {
      text: "We provide three flexible engagement models tailored to your project requirements and budget:\n\n• Dedicated Squads: Full-time dedicated engineers or operations specialists integrated directly into your workflows with transparent monthly seat billing.\n• Project-Based Delivery: Fixed-scope milestones with guaranteed delivery timelines, sprint reviews, and SLA commitments.\n• Staff Augmentation: Rapid placement of pre-vetted, certified engineers or BPO specialists within 7 to 14 business days.\n\nAll engagements include dedicated account management, continuous performance tracking, and a 99.99% infrastructure uptime SLA guarantee. Would you like to share your project details so we can prepare an estimate for you?",
      inquiryCard: { type: 'consultation' },
    }
  }

  // 10. CLOUD INFRASTRUCTURE & DEVSECOPS
  if (
    q.includes('cloud') ||
    q.includes('devops') ||
    q.includes('devsecops') ||
    q.includes('aws') ||
    q.includes('gcp') ||
    q.includes('azure') ||
    q.includes('kubernetes') ||
    q.includes('terraform') ||
    q.includes('ci/cd')
  ) {
    return {
      text: "Our Cloud and DevSecOps engineering practice designs, builds, and maintains high-reliability cloud architectures:\n\n• Multi-Cloud Architecture: Architecture and cost-optimized management across AWS, Google Cloud (GCP), and Microsoft Azure.\n• Infrastructure as Code (IaC): Automated, repeatable provisioning using Terraform, OpenTofu, and Ansible.\n• Container Orchestration: Production Kubernetes (EKS, GKE, AKS) cluster management with automated auto-scaling and zero-downtime rolling upgrades.\n• Automated CI/CD Pipelines: Fast, secure deployment workflows with integrated static analysis, container scanning, and automated rollbacks.\n• 24/7 SRE & Monitoring: Continuous uptime monitoring, automated incident remediation, and a 99.99% uptime guarantee.",
    }
  }

  // 11. CYBERSECURITY & MANAGED SOC
  if (
    q.includes('cybersecurity') ||
    q.includes('soc') ||
    q.includes('siem') ||
    q.includes('penetration testing') ||
    q.includes('vulnerability') ||
    q.includes('threat')
  ) {
    return {
      text: "OPERAVA provides 24/7 Managed SOC and cybersecurity services to safeguard your infrastructure, applications, and customer data:\n\n• 24/7 SIEM & Threat Monitoring: Continuous telemetry analysis, threat hunting, and rapid incident isolation.\n• Vulnerability Management: Regular automated scans, code security audits, and scheduled penetration testing.\n• Endpoint & Cloud Security: Centralized endpoint detection and response (EDR) and cloud security posture management (CSPM).\n• Compliance Readiness: Assistance with ISO 27001, SOC 2, HIPAA, and GDPR audit preparations.",
    }
  }

  // 12. CUSTOM SOFTWARE & WEB DEVELOPMENT
  if (
    q.includes('software') ||
    q.includes('web development') ||
    q.includes('app development') ||
    q.includes('react') ||
    q.includes('node') ||
    q.includes('full stack') ||
    q.includes('frontend') ||
    q.includes('backend') ||
    q.includes('api') ||
    q.includes('mobile app')
  ) {
    return {
      text: "We engineer scalable custom software, web platforms, and APIs tailored to your product needs:\n\n• Modern Frontend Platforms: High-performance web applications using React, Next.js, TypeScript, and Tailwind CSS.\n• Resilient Backend Services: Scalable microservices, REST APIs, and GraphQL endpoints in Node.js, Python, and Go.\n• Database Architecture: High-concurrency schema design and query optimization for PostgreSQL, MySQL, MongoDB, and Redis.\n• Quality Engineering: Automated unit, integration, and end-to-end testing with CI verification on every commit.",
    }
  }

  // 13. DATA ENGINEERING & AI
  if (
    q.includes('data engineering') ||
    q.includes('artificial intelligence') ||
    q.includes('ai') ||
    q.includes('machine learning') ||
    q.includes('etl') ||
    q.includes('warehouse') ||
    q.includes('annotation') ||
    q.includes('analytics')
  ) {
    return {
      text: "Our Data Engineering and AI solutions help enterprises turn raw data into operational insights:\n\n• Data Warehousing: Scalable architectures using Snowflake, BigQuery, and Databricks with automated ETL/ELT pipelines.\n• Real-Time Analytics: Real-time event streaming with Apache Kafka and interactive business intelligence dashboards.\n• AI Training Data Operations: High-accuracy annotation, labeling, and verification for computer vision, NLP, and multimodal AI models.\n• LLM Integration: Custom prompt optimization, fine-tuning, and retrieval-augmented generation (RAG) pipelines.",
    }
  }

  // 14. BPO & 24/7 CUSTOMER OPERATIONS
  if (
    q.includes('bpo') ||
    q.includes('customer support') ||
    q.includes('customer service') ||
    q.includes('help desk') ||
    q.includes('back office') ||
    q.includes('cx') ||
    q.includes('call center') ||
    q.includes('kyc') ||
    q.includes('staffing') ||
    q.includes('omnichannel')
  ) {
    return {
      text: "Our BPO and Operations division provides 24/7/365 follow-the-sun customer support and business process execution:\n\n• Omnichannel Customer Support: 24/7 coverage across live chat, email, voice, and ticketing systems, maintaining a 98.4% average CSAT and under 60-second response times.\n• Technical Support Desk: Dedicated L1 to L3 troubleshooting for SaaS platforms, cloud software, and IT equipment.\n• Back-Office Processing: High-volume transaction processing, KYC/AML fraud verification, invoice auditing, and document management with 99.8% accuracy.\n• Rapid Staffing: Dedicated, bilingual operational teams trained on your workflows and operational in 7 to 14 days.",
    }
  }

  // 15. IT SERVICES OVERVIEW (GENERAL IT)
  if (q.includes('it') || q.includes('tech') || q.includes('technology') || q.includes('service')) {
    return {
      text: "OPERAVA delivers enterprise digital engineering across four primary focus areas:\n\n• Cloud & DevSecOps: Multi-cloud architecture on AWS/GCP/Azure, Kubernetes, Terraform, and CI/CD automation.\n• Custom Software Development: Full-stack web and mobile platforms built with React, TypeScript, and Node.js microservices.\n• Cybersecurity & 24/7 SOC: Continuous SIEM monitoring, threat detection, and ISO 27001/SOC 2 compliance.\n• Data & AI Pipelines: Modern data warehousing, real-time analytics, and high-accuracy AI training data curation.\n\nLet me know which of these areas you'd like to explore in more detail!",
    }
  }

  // 16. ABOUT OPERAVA / COMPANY OVERVIEW
  if (
    q.includes('about') ||
    q.includes('operava') ||
    q.includes('company') ||
    q.includes('mission') ||
    q.includes('vision') ||
    q.includes('culture') ||
    q.includes('history')
  ) {
    return {
      text: "OPERAVA Global Solutions is an enterprise engineering and 24/7 business operations firm founded on the principle 'We Operate in Advance'.\n\nWe unite world-class technical talent from the Philippines with modern cloud automation and operational excellence. Today, we maintain a 99.4% client retention rate and a 99.99% infrastructure uptime SLA, partnering with organizations across FinTech, HealthTech, E-Commerce, SaaS, and AI.",
    }
  }

  // 17. INDUSTRIES / VERTICALS
  if (
    q.includes('industry') ||
    q.includes('fintech') ||
    q.includes('health') ||
    q.includes('ecommerce') ||
    q.includes('saas') ||
    q.includes('logistics') ||
    q.includes('banking')
  ) {
    return {
      text: "We provide specialized solutions across several regulated and fast-growing industries:\n\n• FinTech & Banking: PCI-DSS compliant workflows, automated KYC/AML verification, and real-time fraud monitoring.\n• Healthcare & Life Sciences: HIPAA-compliant data workflows, diagnostic image annotation, and billing operations.\n• Enterprise SaaS: 24/7 DevOps reliability, Tier 1–3 technical support, and high-throughput cloud infrastructure.\n• E-Commerce & Retail: Peak-season surge staffing, order management, catalog moderation, and omnichannel support.\n• Logistics & Supply Chain: Shipment tracking, dispatch coordination, and 24/7 telematics support.",
    }
  }

  // 18. NATURAL DIRECT FALLBACK
  return {
    text: `I understand you're asking about "${query}".\n\nOPERAVA Global Solutions is an enterprise technology and 24/7 business operations company. We specialize in Cloud & DevSecOps, Custom Software Engineering, 24/7 Managed SOC Cybersecurity, Data & AI pipelines, and Omnichannel BPO Support.\n\nCould you let me know if you are interested in a specific service, exploring career opportunities, or discussing a new project?`,
  }
}
