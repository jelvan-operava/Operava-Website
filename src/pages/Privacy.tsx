import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, Mail, FileText, CheckCircle } from 'lucide-react'

export default function Privacy() {
  const sections = [
    {
      id: 'section-1',
      num: '1',
      title: 'COMMITMENT',
      content: [
        'OPERAVA respects privacy and seeks to collect only information reasonably necessary for identified and legitimate purposes, use it appropriately, protect it through reasonable safeguards, and retain it only as long as necessary or legally required.',
        'OPERAVA may act as a Personal Information Controller, Personal Information Processor, or another applicable role depending on the processing activity.',
      ],
    },
    {
      id: 'section-2',
      num: '2',
      title: 'WHO THIS APPLIES TO',
      content: [
        'This notice may apply to website visitors, job applicants, prospective employees, employees, contractors, professionals, clients, prospective clients, customers/end users, vendors, suppliers, business contacts, and digital-platform users.',
        'Specific processing activities may have separate privacy notices.',
      ],
    },
    {
      id: 'section-3',
      num: '3',
      title: 'INFORMATION WE MAY COLLECT',
      content: [
        'Depending on the relationship:',
      ],
      bullets: [
        'Name and contact details',
        'Address and identification information where necessary and lawful',
        'Resume/CV, education, employment history, skills, certifications and references',
        'Interview and assessment information',
        'Availability and work preferences',
        'Business and client information',
        'Contract and billing information',
        'IP address, browser/device information, operating system, timestamps, website activity, referring platform, cookies, and security/audit information where applicable',
      ],
      trailingContent: [
        'The specific information collected depends on the purpose and context.',
      ],
    },
    {
      id: 'section-4',
      num: '4',
      title: 'SENSITIVE INFORMATION',
      content: [
        'Sensitive personal information may be processed only where there is a lawful basis and appropriate safeguards. Individuals should not submit sensitive information unless specifically requested through an appropriate secure process or necessary for a lawful purpose.',
      ],
    },
    {
      id: 'section-5',
      num: '5',
      title: 'COLLECTION METHODS',
      content: [
        'Information may be collected directly from individuals, through forms, applications, interviews, assessments, email, contracts, digital platforms, authorized representatives, service providers, or lawful professional/public sources. Some technical information may be collected automatically.',
      ],
    },
    {
      id: 'section-6',
      num: '6',
      title: 'PURPOSES',
      content: [
        'OPERAVA may process information for:',
      ],
      bullets: [
        'Inquiries and communications',
        'Service delivery',
        'Client relationship management',
        'Recruitment and assessment',
        'AI-assisted initial interviews',
        'Talent Acquisition interviews',
        'Client interviews',
        'Employment and professional engagements',
        'Workforce operations',
        'Customer service',
        'BPO and data processing',
        'Account and billing administration',
        'IT and security',
        'Quality assurance',
        'Training and development',
        'Analytics and reporting',
        'Legal and regulatory compliance',
        'Dispute resolution',
        'Protection of rights, property, systems, and users',
      ],
    },
    {
      id: 'section-7',
      num: '7',
      title: 'AI-ASSISTED RECRUITMENT',
      content: [
        'Where used, AI-assisted recruitment technology may process applicant information for initial screening, communication, scheduling, assessment, or related recruitment purposes. AI-assisted screening does not itself create employment.',
        'Where automated decision-making or profiling applies, appropriate information will be provided and applicable privacy requirements followed. Human review may occur in later stages, including OPERAVA Talent Acquisition and client interviews.',
      ],
    },
    {
      id: 'section-8',
      num: '8',
      title: 'LAWFUL BASIS',
      content: [
        'Depending on circumstances, processing may rely on consent, contract-related necessity, legal obligations, legitimate interests where permitted, protection of lawful rights/interests, or another lawful basis recognized by applicable law.',
      ],
    },
    {
      id: 'section-9',
      num: '9',
      title: 'CLIENT DATA / OUTSOURCED PROCESSING',
      content: [
        'OPERAVA may process personal information on behalf of clients for BPO, IT, data processing, customer service, technical support, document processing, staffing, and other services. The applicable client may determine purposes and means while OPERAVA processes information according to contractual instructions. Appropriate safeguards and contractual provisions should apply.',
      ],
    },
    {
      id: 'section-10',
      num: '10',
      title: 'DISCLOSURE',
      content: [
        'Information may be disclosed where necessary and lawful to authorized OPERAVA personnel, clients, technology/service providers, cloud/hosting providers, communication providers, recruitment/assessment providers, professional advisers, auditors, government authorities, legal/regulatory authorities, and other authorized recipients.',
        'OPERAVA does not authorize unauthorized sale, disclosure, or dissemination of personal information.',
      ],
    },
    {
      id: 'section-11',
      num: '11',
      title: 'INTERNATIONAL PROCESSING',
      content: [
        'Because OPERAVA is remote-first and may serve international clients or use international providers, personal information may be accessed, stored, or processed across jurisdictions where lawful and necessary. Appropriate safeguards should be applied.',
      ],
    },
    {
      id: 'section-12',
      num: '12',
      title: 'SECURITY',
      content: [
        'OPERAVA seeks reasonable organizational, physical, and technical safeguards appropriate to risk, which may include access controls, authentication, least privilege, encryption where appropriate, logging, monitoring, endpoint controls, confidentiality obligations, training, incident response, vendor controls, backups, and secure disposal.',
        'No electronic transmission or storage method can guarantee absolute security.',
      ],
    },
    {
      id: 'section-13',
      num: '13',
      title: 'INCIDENTS AND BREACHES',
      content: [
        'OPERAVA maintains procedures for identifying, assessing, containing, investigating, and responding to suspected security incidents. Where notification is legally required, OPERAVA will follow applicable regulatory and contractual requirements.',
      ],
    },
    {
      id: 'section-14',
      num: '14',
      title: 'RETENTION',
      content: [
        'Personal information is retained only as reasonably necessary for the identified purpose, contractual relationship, legitimate business need, legal obligation, dispute resolution, security, or other lawful basis.',
        'Retention periods may differ for recruitment, employment, client, accounting/tax, service, security, contract, and legal records. OPERAVA should maintain an internal retention schedule.',
        'When no longer required and no lawful reason for retention exists, information may be securely deleted, anonymized, destroyed, or otherwise disposed of.',
      ],
    },
    {
      id: 'section-15',
      num: '15',
      title: 'COOKIES',
      content: [
        'OPERAVA websites or services may use cookies or similar technologies for essential operation, security, preferences, analytics, performance, and functionality. Applicable consent or controls may be provided where required. Browser settings may restrict cookies, although functionality may be affected.',
      ],
    },
    {
      id: 'section-16',
      num: '16',
      title: 'JOB APPLICANTS',
      content: [
        'Applicant information may be used to evaluate qualifications, conduct interviews and assessments, verify information where lawful, match applicants with roles, facilitate client interviews, communicate with applicants, maintain recruitment records, and meet legal/operational requirements.',
        'Application does not guarantee employment.',
      ],
    },
    {
      id: 'section-17',
      num: '17',
      title: 'EMPLOYEES AND PROFESSIONALS',
      content: [
        'Employee information may be processed for onboarding, employment administration, scheduling, performance, training, payroll/benefits administration, compliance, security, client assignment, workforce management, internal communications, and business operations.',
        'Separate employee privacy notices and employment documentation may provide additional details.',
      ],
    },
    {
      id: 'section-18',
      num: '18',
      title: 'MINORS',
      content: [
        "OPERAVA does not intentionally seek children's personal information where inappropriate for the relevant service. Where processing involving minors is necessary, appropriate safeguards and legal requirements apply.",
      ],
    },
    {
      id: 'section-19',
      num: '19',
      title: 'DATA SUBJECT RIGHTS',
      content: [
        'Subject to legal limitations, data subjects may have:',
      ],
      bullets: [
        'Right to be informed',
        'Right to access',
        'Right to correct/rectify',
        'Right to object',
        'Right to erasure or blocking where applicable',
        'Right to data portability where applicable',
        'Right to lodge a complaint',
        'Right to damages where provided by law',
      ],
    },
    {
      id: 'section-20',
      num: '20',
      title: 'PRIVACY REQUESTS',
      content: [
        'Requests should contain enough information to identify the requester and understand the request. OPERAVA may take reasonable steps to verify identity before acting.',
        'Requests may include access, correction, objection, erasure/blocking, portability, and privacy complaints.',
      ],
    },
    {
      id: 'section-21',
      num: '21',
      title: 'PRIVACY CONTACT',
      isPrivacyContactCard: true,
      content: [
        'OPERAVA should maintain a designated privacy contact or Data Protection Officer where required or appropriate.',
      ],
      contactDetails: {
        team: 'Operava Compliance Team',
        email: 'compliance@operavaglobal.com',
      },
    },
    {
      id: 'section-22',
      num: '22',
      title: 'PROCESSOR REQUESTS',
      content: [
        "Where OPERAVA acts as a processor for a client, requests concerning the client's processing may need to be directed to the relevant client/controller under the applicable contract and privacy notice. OPERAVA will cooperate with lawful client instructions.",
      ],
    },
    {
      id: 'section-23',
      num: '23',
      title: 'THIRD-PARTY SERVICES',
      content: [
        'OPERAVA may link to or integrate third-party services. Third parties have their own privacy practices and terms. OPERAVA does not control independent third-party privacy practices.',
      ],
    },
    {
      id: 'section-24',
      num: '24',
      title: 'MARKETING',
      content: [
        'Where direct marketing is used, OPERAVA will apply applicable legal requirements and provide appropriate opt-out or objection mechanisms where required.',
      ],
    },
    {
      id: 'section-25',
      num: '25',
      title: 'DATA ACCURACY',
      content: [
        'OPERAVA seeks to maintain accurate and relevant personal information. Individuals should notify OPERAVA when important information changes or is inaccurate.',
      ],
    },
    {
      id: 'section-26',
      num: '26',
      title: 'ACCOUNTABILITY',
      content: [
        'OPERAVA treats privacy as an organizational responsibility. Personnel and service providers may be required to follow privacy, security, confidentiality, access-control, data-handling, incident-response, and client-specific requirements.',
      ],
    },
    {
      id: 'section-27',
      num: '27',
      title: 'PRIVACY BY DESIGN',
      content: [
        'Where reasonably practicable, OPERAVA seeks to incorporate privacy and security considerations into systems, processes, services, recruitment, and technology development.',
      ],
    },
    {
      id: 'section-28',
      num: '28',
      title: 'CHANGES',
      content: [
        'OPERAVA may update this Privacy Policy for changes in services, technology, legal requirements, or processing activities. Material changes should be communicated appropriately.',
      ],
    },
    {
      id: 'section-29',
      num: '29',
      title: 'GOVERNING LAW',
      content: [
        'This Privacy Policy is intended to operate consistently with applicable Philippine privacy law, including Republic Act No. 10173 (Data Privacy Act of 2012), its implementing rules and regulations, and applicable National Privacy Commission issuances. Additional jurisdiction-specific requirements may apply.',
      ],
    },
    {
      id: 'section-30',
      num: '30',
      title: 'IMPORTANT COMPLIANCE NOTE',
      content: [
        'This Privacy Policy does not by itself establish that OPERAVA has obtained every registration, certification, accreditation, privacy seal, or regulatory authorization that might apply to a particular processing activity.',
        'OPERAVA should maintain appropriate internal privacy documentation, including processing records where required, privacy impact assessments where applicable, data-processing agreements, security policies, retention schedules, incident-response procedures, employee notices, client privacy provisions, and other controls appropriate to actual processing activities.',
      ],
    },
    {
      id: 'section-31',
      num: '31',
      title: 'PRIVACY PRINCIPLES',
      isPrinciplesCard: true,
      principles: [
        {
          name: 'TRANSPARENCY',
          desc: 'People should understand what personal information is processed and why.',
        },
        {
          name: 'LEGITIMATE PURPOSE',
          desc: 'Personal information should be processed for identified and lawful purposes.',
        },
        {
          name: 'PROPORTIONALITY',
          desc: 'Only information reasonably necessary for the stated purpose should be processed.',
        },
        {
          name: 'SECURITY',
          desc: 'Personal information should receive appropriate protection.',
        },
        {
          name: 'ACCOUNTABILITY',
          desc: 'OPERAVA remains responsible for appropriate privacy governance within its role.',
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-16 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-3">
            PRIVACY POLICY AND PRIVACY NOTICE
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-medium mb-4">
            Website, Applicants, Employees, Clients, Customers and Service Users
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 rounded-full font-semibold border border-violet-100">
              Effective Date: 17 August 2026
            </span>
            <span>Philippine Data Privacy Act of 2012 (RA 10173)</span>
            <span>•</span>
            <Link to="/terms" className="text-violet-600 hover:text-violet-800 underline font-medium">
              View Terms and Conditions
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Important Notice Box */}
          <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-violet-50/80 border border-violet-200 text-violet-950 shadow-xs">
            <div className="flex items-start gap-3.5">
              <ShieldAlert className="w-6 h-6 text-violet-700 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-violet-950 uppercase tracking-wide mb-1.5">
                  IMPORTANT NOTICE
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-violet-900/90 mb-2">
                  This Privacy Policy describes how OPERAVA Global Solutions (&quot;OPERAVA,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) may collect, use, disclose, retain, secure, and otherwise process personal information in connection with websites, recruitment, employment, client services, business operations, communications, and digital platforms.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-violet-900/90">
                  It is designed around transparency, legitimate purpose, and proportionality under the Philippine Data Privacy Act of 2012 and its implementing rules. It should be reviewed against OPERAVA&apos;s actual processing activities, systems, contracts, retention schedules, and current regulatory requirements before publication.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Table of Contents */}
          <div className="mb-10 p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-600" />
              Table of Contents (31 Sections)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="p-1.5 rounded-lg text-gray-600 hover:text-violet-700 hover:bg-violet-50 transition-colors truncate block"
                >
                  <span className="font-bold text-violet-600 mr-1.5">{sec.num}.</span>
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Privacy Sections Card Stack */}
          <div className="space-y-6">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 p-6 sm:p-8 bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:border-gray-300 transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-4 border-b border-gray-100 pb-3">
                  <span className="text-sm font-black px-2.5 py-0.5 rounded-md bg-violet-100 text-violet-800 shrink-0">
                    {section.num}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                    {section.title}
                  </h2>
                </div>

                {/* Primary Content Paragraphs */}
                {section.content && (
                  <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                    {section.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Bullets List if any */}
                {section.bullets && (
                  <ul className="mt-3.5 mb-3 space-y-1.5 pl-2 text-sm sm:text-base text-gray-700">
                    {section.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-violet-600 font-bold text-base leading-tight mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Trailing Paragraphs if any */}
                {section.trailingContent && (
                  <div className="mt-3.5 space-y-2.5 text-gray-700 text-sm sm:text-base leading-relaxed">
                    {section.trailingContent.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Privacy Contact Specific Card */}
                {section.isPrivacyContactCard && section.contactDetails && (
                  <div className="mt-4 p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      PRIVACY CONTACT:
                    </p>
                    <div className="space-y-2 text-sm">
                      {section.contactDetails.team && (
                        <div className="font-semibold text-gray-900 text-base">
                          {section.contactDetails.team}
                        </div>
                      )}
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-violet-600 shrink-0" />
                        <span className="font-semibold text-gray-800">Email:</span>
                        <a
                          href={`mailto:${section.contactDetails.email}`}
                          className="text-violet-700 hover:text-violet-900 font-medium hover:underline transition-colors"
                        >
                          {section.contactDetails.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Principles Specific Card */}
                {section.isPrinciplesCard && section.principles && (
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {section.principles.map((pr, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border ${
                          idx === section.principles!.length - 1
                            ? 'sm:col-span-2 bg-violet-50/70 border-violet-200 text-violet-950'
                            : 'bg-slate-50 border-slate-200 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <CheckCircle className="w-4 h-4 text-violet-600 shrink-0" />
                          <h3 className="text-sm font-black tracking-wide uppercase text-violet-900">
                            {pr.name}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
                          {pr.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Slogan Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-violet-900 to-purple-900 text-white text-center shadow-md">
            <p className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              OPERAVA — OPERATING IN ADVANCE.
            </p>
            <p className="text-sm text-violet-200 max-w-xl mx-auto mb-6">
              Committed to Data Privacy, Confidentiality, and Regulatory Governance Across All Operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-lg bg-white text-violet-900 hover:bg-violet-50 transition-colors shadow-xs"
              >
                Submit Privacy Inquiry
              </Link>
              <Link
                to="/"
                className="px-5 py-2.5 rounded-lg bg-violet-800/80 text-white hover:bg-violet-800 transition-colors border border-violet-700/60 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
