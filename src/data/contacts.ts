export interface ContactChannel {
  id: string
  title: string
  email?: string
  phone?: string
  url?: string
  description: string
  whenToContact: string
}

/** Public OPERAVA contact directory — shared by Contacts page, footer, and AI reference */
export const contactChannels: ContactChannel[] = [
  {
    id: 'general',
    title: 'Clients / General Inquiries',
    email: 'hello@operavaglobal.com',
    description: 'Primary channel for business inquiries, quotations, solutions discussion, and general company questions.',
    whenToContact: 'Use when you need OPERAVA services, a proposal, partnership exploration at a high level, or are unsure which department to reach.',
  },
  {
    id: 'partnership',
    title: 'Partnership',
    email: 'partners@operavaglobal.com',
    description: 'Dedicated channel for formal partnership, reseller, referral, and strategic collaboration requests.',
    whenToContact: 'Use when you represent an organization seeking a structured partnership or commercial alliance with OPERAVA.',
  },
  {
    id: 'customer-service',
    title: 'Customer Service',
    email: 'cs@operavaglobal.com',
    description: 'Support for existing clients regarding product and service concerns, delivery follow-ups, and operational issues.',
    whenToContact: 'Use if you are an active client and need help with an ongoing engagement, ticket, or service issue.',
  },
  {
    id: 'hr',
    title: 'Human Resources',
    email: 'hr@operavaglobal.com',
    description: 'HR administration, employment documentation, verification of employment, and workforce-related correspondence.',
    whenToContact: 'Use for HR documentation, employment verification letters, or non-application HR matters.',
  },
  {
    id: 'talent',
    title: 'Talent Acquisition',
    email: 'talents@operavaglobal.com',
    description: 'Recruitment and hiring team for roles, screening, and application status related to OPERAVA careers.',
    whenToContact: 'Use after applying, or when you have a recruitment-specific question about open roles.',
  },
  {
    id: 'careers',
    title: 'Career Applications',
    url: 'https://www.operavaglobal.com/careers',
    description: 'Official careers portal to browse roles and submit applications online.',
    whenToContact: 'Use this page first when applying for a position. Do not send resumes only by email unless instructed.',
  },
  {
    id: 'compliance',
    title: 'Compliance',
    email: 'compliance@operavaglobal.com',
    description: 'Data privacy, compliance questions, and formal compliance-related correspondence.',
    whenToContact: 'Use for privacy requests, compliance documentation, or regulatory-related inquiries.',
  },
  {
    id: 'verification',
    title: 'Document Verification',
    email: 'verification@operavaglobal.com',
    url: 'https://www.operavaglobal.com/verification',
    description: 'Verify OPERAVA-issued document reference IDs and request clarification on verified records.',
    whenToContact: 'Use the Verification Portal at https://www.operavaglobal.com/verification to check a reference ID. Email verification@operavaglobal.com only when you need confirmation of specific document content beyond the ID status.',
  },
  {
    id: 'billing',
    title: 'Billing Desk',
    email: 'billing@operavaglobal.com',
    description: 'Invoices, payment status, billing questions, and finance administration.',
    whenToContact: 'Use for invoice copies, payment confirmations, or billing disputes related to OPERAVA services.',
  },
  {
    id: 'whatsapp',
    title: 'General Info (WhatsApp)',
    phone: '+1 812 410 6066',
    description: 'Quick general information channel via WhatsApp for high-level questions about OPERAVA.',
    whenToContact: 'Use for brief general questions. For formal requests, proposals, or document matters, prefer email or the website forms.',
  },
  {
    id: 'contact-page',
    title: 'Contact / Inquiry Form',
    url: 'https://www.operavaglobal.com/contact',
    description: 'Structured web form for services and business inquiries with OTP verification.',
    whenToContact: 'Preferred for new service inquiries when you want a tracked submission and reference number.',
  },
]

/** Official document verification portal (main site path only) */
export const verificationPortalUrl = 'https://www.operavaglobal.com/verification'
export const verificationEmail = 'verification@operavaglobal.com'
