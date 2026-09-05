import { Link } from 'react-router-dom'
import { FileText, ShieldAlert, ArrowLeft, Building, Scale } from 'lucide-react'

export default function Terms() {
  const sections = [
    {
      id: 'section-1',
      num: '1',
      title: 'ABOUT OPERAVA',
      content: [
        'OPERAVA Global Solutions is a Philippine-based technology, workforce, and Business Process Outsourcing organization focused on Information Technology, digital services, cloud-related solutions, business operations, customer service, data processing, and remote professional services.',
        'OPERAVA may serve startups, small businesses, SMEs, growing organizations, established businesses, and enterprises.',
        'OPERAVA operates with a remote-first model and may work with professionals and clients in different countries, subject to applicable laws and contractual requirements.',
        'OPERAVA is an SEC-registered Philippine corporation. Corporate registration is not represented as a blanket government license, accreditation, certification, or authorization for every possible technology, professional, staffing, financial, regulated, or specialized activity. Separate permits, licenses, certifications, professional qualifications, or authorizations may apply to particular activities.',
      ],
    },
    {
      id: 'section-2',
      num: '2',
      title: 'ACCEPTANCE',
      content: [
        'By accessing or using an OPERAVA website, platform, service, form, portal, or other digital property, you acknowledge these Terms to the extent applicable. If you do not agree, discontinue use of the relevant service or platform.',
        'Specific written agreements may contain additional or conflicting terms. The applicable specific agreement controls for that relationship and subject matter.',
      ],
    },
    {
      id: 'section-3',
      num: '3',
      title: 'SERVICES',
      content: [
        'OPERAVA services may include:',
      ],
      bullets: [
        'Software development',
        'Web and mobile application development',
        'SaaS and platform development',
        'IT systems development',
        'Computer programming',
        'IT consulting',
        'Systems integration',
        'Database services',
        'Cloud-related solutions',
        'Cloud application environments',
        'Hosting-related services',
        'Cloud migration and infrastructure support',
        'Application deployment',
        'Systems administration',
        'Customer service',
        'Technical support',
        'Help desk',
        'Back-office operations',
        'Data processing',
        'Data entry',
        'Document processing',
        'Virtual assistance',
        'Other related technology and business-process services',
      ],
      trailingContent: [
        'The exact scope, deliverables, staffing, technologies, service levels, and responsibilities are determined by the applicable agreement or assignment.',
      ],
    },
    {
      id: 'section-4',
      num: '4',
      title: 'NO AUTOMATIC SERVICE OBLIGATION',
      content: [
        'Descriptions on an OPERAVA website do not create an automatic obligation to provide every listed service to every customer. A service becomes applicable when accepted, contracted, assigned, or otherwise confirmed.',
      ],
    },
    {
      id: 'section-5',
      num: '5',
      title: 'AVAILABLE WORKFORCE EXECUTIVE POSITIONS',
      content: [
        'OPERAVA structures workforce opportunities across three available executive positions:',
      ],
      bullets: [
        'OPERAVA Technology Executive',
        'OPERAVA Business Operations Executive',
        'OPERAVA Customer Experience Executive',
      ],
      trailingContent: [
        'Candidates and employees may be assigned to specific related tasks on available posts or based on their skills, qualifications, client requirements, demonstrated competency, assessments, and specialization.',
        'An OPERAVA Business Operations Executive may be assigned to specific related tasks on available posts or based on skills in HR, accounting and finance, recruitment, training and development, data processing, or related administrative operations.',
        'An OPERAVA Technology Executive may be assigned to specific related tasks on available posts or based on skills in software engineering, cloud infrastructure, web and mobile systems, programming, or related technology functions.',
        'An OPERAVA Customer Experience Executive may be assigned to specific related tasks on available posts or based on skills in customer care, technical support, omnichannel communication, client account management, or related customer experience functions.',
      ],
    },
    {
      id: 'section-6',
      num: '6',
      title: 'CLIENT RESPONSIBILITIES',
      content: [
        'Clients must provide accurate and timely information, instructions, approvals, systems, access, and other resources reasonably required for contracted services. Clients must not request unlawful, unsafe, unauthorized, or out-of-scope activities.',
      ],
    },
    {
      id: 'section-7',
      num: '7',
      title: 'SERVICE QUALITY',
      content: [
        "OPERAVA aims to provide professional, reliable, technology-enabled services and appropriately qualified personnel. Outcomes may depend on client systems, information, third parties, technical environments, scope, and other factors outside OPERAVA's reasonable control. Unless expressly stated in writing, OPERAVA does not guarantee uninterrupted service or a particular commercial outcome.",
      ],
    },
    {
      id: 'section-8',
      num: '8',
      title: 'TALENT ASSIGNMENTS',
      content: [
        'OPERAVA may assign qualified personnel based on requirements, qualifications, assessments, training, availability, and operational needs.',
        'Passing an assessment or interview does not guarantee employment, a specific client, specialization, schedule, compensation, or long-term assignment.',
      ],
    },
    {
      id: 'section-9',
      num: '9',
      title: 'HIRING PROCESS',
      content: [
        'Where applicable:',
      ],
      numberedList: [
        'Initial / AI-assisted interview',
        'Skills or role assessment',
        'OPERAVA Talent Acquisition interview',
        'Client interview',
        'Final selection and applicable employment/engagement documentation',
      ],
      trailingContent: [
        'The process may vary by role, client, jurisdiction, and business requirements. AI-assisted screening does not itself create an employment relationship.',
      ],
    },
    {
      id: 'section-10',
      num: '10',
      title: 'REMOTE WORK',
      content: [
        'OPERAVA is primarily remote-first. Personnel may be required to maintain appropriate connectivity, equipment, professional communication, secure information handling, an appropriate work environment, agreed availability, and compliance with remote-work and security procedures.',
      ],
    },
    {
      id: 'section-11',
      num: '11',
      title: 'ACCOUNTS AND SECURITY',
      content: [
        'Users must protect credentials and report suspected unauthorized access or security incidents. OPERAVA may restrict, suspend, or terminate access when reasonably necessary to protect systems, users, clients, personnel, or information.',
      ],
    },
    {
      id: 'section-12',
      num: '12',
      title: 'ACCEPTABLE USE',
      content: [
        'Users must not use OPERAVA systems unlawfully, attempt unauthorized access, introduce malware, interfere with systems, bypass security controls, impersonate others, upload malicious or unlawful material, infringe rights, access information without authorization, or facilitate fraud, abuse, harassment, or other unlawful activity.',
      ],
    },
    {
      id: 'section-13',
      num: '13',
      title: 'INTELLECTUAL PROPERTY',
      content: [
        'Unless otherwise agreed, OPERAVA and its licensors retain rights in OPERAVA websites, branding, software, templates, systems, documentation, processes, designs, and proprietary materials. Client deliverable ownership or licensing is governed by the applicable agreement.',
      ],
    },
    {
      id: 'section-14',
      num: '14',
      title: 'CLIENT MATERIALS',
      content: [
        'Clients retain rights in materials supplied to OPERAVA, subject to the rights necessary to perform contracted services. Clients must have lawful authority to provide such materials.',
      ],
    },
    {
      id: 'section-15',
      num: '15',
      title: 'THIRD-PARTY SERVICES',
      content: [
        'OPERAVA may use or integrate third-party hosting, cloud, communication, payment, software, API, and other services. Third parties may have separate terms, privacy policies, limitations, and security practices.',
      ],
    },
    {
      id: 'section-16',
      num: '16',
      title: 'CONFIDENTIALITY',
      content: [
        'Confidential information may include business, client, customer, employee, technical, credential, source-code, financial, document, trade-secret, and non-public operational information. Additional confidentiality duties may arise under NDAs, employment agreements, and client contracts.',
      ],
    },
    {
      id: 'section-17',
      num: '17',
      title: 'DATA PRIVACY',
      content: [
        "OPERAVA processes personal information under applicable privacy and data-protection requirements. Processing is addressed further in OPERAVA's Privacy Policy and applicable privacy notices. Client processing may be governed by data-processing provisions.",
      ],
    },
    {
      id: 'section-18',
      num: '18',
      title: 'SECURITY',
      content: [
        'OPERAVA seeks to implement reasonable organizational, physical, and technical safeguards appropriate to the nature and risks of information and systems. No internet-connected system can be guaranteed completely secure.',
      ],
    },
    {
      id: 'section-19',
      num: '19',
      title: 'PAYMENTS AND COMMERCIAL TERMS',
      content: [
        'Prices, billing, payment schedules, taxes, refunds, service credits, expenses, and other commercial terms are governed by the applicable quotation, invoice, statement of work, or signed agreement.',
      ],
    },
    {
      id: 'section-20',
      num: '20',
      title: 'TAXES',
      content: [
        'Applicable taxes and legally required charges are handled according to applicable law and the relevant contract.',
      ],
    },
    {
      id: 'section-21',
      num: '21',
      title: 'CANCELLATION AND TERMINATION',
      content: [
        'Termination, suspension, notice, refunds, transition support, and related conditions are governed by the applicable agreement. OPERAVA may suspend access or services for security, unlawful use, non-payment, material breach, or legitimate operational reasons, subject to applicable law and contract.',
      ],
    },
    {
      id: 'section-22',
      num: '22',
      title: 'PROFESSIONAL ADVICE DISCLAIMER',
      content: [
        'Unless expressly agreed and appropriately qualified, OPERAVA does not provide legal, tax, medical, investment, or other regulated professional advice. Clients should obtain appropriate qualified advice where required.',
      ],
    },
    {
      id: 'section-23',
      num: '23',
      title: 'LIMITATION OF LIABILITY',
      content: [
        'To the maximum extent permitted by applicable law, liability is governed by the applicable written agreement. Nothing in these Terms excludes liability that cannot lawfully be excluded or limited.',
      ],
    },
    {
      id: 'section-24',
      num: '24',
      title: 'FORCE MAJEURE',
      content: [
        'OPERAVA is not responsible for delays or failures caused by circumstances beyond reasonable control, including major outages, natural disasters, government actions, war, civil disturbance, telecommunications failures, cyber incidents, third-party failures, or other extraordinary events, subject to applicable law and contractual obligations.',
      ],
    },
    {
      id: 'section-25',
      num: '25',
      title: 'MODIFICATIONS',
      content: [
        'OPERAVA may update these Terms. Material changes may be communicated through the website, platform, email, or other reasonable means.',
      ],
    },
    {
      id: 'section-26',
      num: '26',
      title: 'GOVERNING LAW',
      content: [
        'Unless otherwise required by applicable law or agreed in a valid written contract, these general Terms are intended to be governed by the laws of the Republic of the Philippines.',
      ],
    },
    {
      id: 'section-27',
      num: '27',
      title: 'SEVERABILITY',
      content: [
        'If any provision is invalid or unenforceable, the remaining provisions continue to the extent permitted by law.',
      ],
    },
    {
      id: 'section-28',
      num: '28',
      title: 'NO WAIVER',
      content: [
        'Failure to enforce a provision does not waive the right to enforce it later.',
      ],
    },
    {
      id: 'section-29',
      num: '29',
      title: 'ENTIRE AGREEMENT',
      content: [
        'These Terms operate together with applicable privacy notices, service agreements, statements of work, employment agreements, NDAs, and other written agreements. A specific written agreement controls where there is a conflict.',
      ],
    },
    {
      id: 'section-30',
      num: '30',
      title: 'CONTACT',
      isContactCard: true,
      content: [
        'OPERAVA Global Solutions',
        'Initial Philippine office:',
        'Pagudpud, Ilocos Norte 2919, Philippines',
        'Current official contact channels should be used for inquiries.',
      ],
    },
    {
      id: 'section-31',
      num: '31',
      title: 'FINAL NOTICE',
      isFinalNotice: true,
      content: [
        'This document is a general framework and is not a substitute for a signed client service agreement, employment agreement, NDA, data-processing agreement, or other legally required document.',
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-16 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-violet-700 mb-3">
            <Scale className="w-4 h-4" />
            <span>OPERAVA GLOBAL SOLUTIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-3">
            TERMS AND CONDITIONS
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-medium mb-4">
            Website, Services, Employment Applications, Client Engagements and Digital Platforms
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 rounded-full font-semibold border border-violet-100">
              Effective Date: 17 August 2026
            </span>
            <span>SEC-Registered Philippine Corporation</span>
            <span>•</span>
            <Link to="/privacy" className="text-violet-600 hover:text-violet-800 underline font-medium">
              View Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Important Notice Box */}
          <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 shadow-xs">
            <div className="flex items-start gap-3.5">
              <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-amber-900 uppercase tracking-wide mb-1.5">
                  IMPORTANT NOTICE
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-amber-900/90">
                  This is a general corporate and website framework for OPERAVA Global Solutions OPC. Specific client agreements, employment agreements, statements of work, NDAs, data-processing agreements, and other contracts may supplement or supersede these Terms for the applicable relationship. This document should be reviewed by qualified Philippine counsel before publication or contractual use.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Table of Contents / Outline Bar */}
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

          {/* Terms Sections Card Stack */}
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
                <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {section.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

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

                {/* Numbered List if any */}
                {section.numberedList && (
                  <ol className="mt-3.5 mb-3 space-y-2 pl-1 text-sm sm:text-base text-gray-700">
                    {section.numberedList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="font-bold text-violet-700 px-2 py-0.5 bg-violet-50 rounded text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Trailing Paragraphs if any */}
                {section.trailingContent && (
                  <div className="mt-3.5 space-y-2.5 text-gray-700 text-sm sm:text-base leading-relaxed">
                    {section.trailingContent.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Contact Card Specific Decoration */}
                {section.isContactCard && (
                  <div className="mt-4 p-5 rounded-xl bg-violet-50/70 border border-violet-100 text-violet-950 flex items-start gap-3.5">
                    <Building className="w-5 h-5 text-violet-700 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-bold text-violet-900">OPERAVA Global Solutions</p>
                      <p className="text-violet-800">Initial Philippine office: Pagudpud, Ilocos Norte 2919, Philippines</p>
                      <p className="text-violet-700 text-xs mt-1">Current official contact channels should be used for inquiries.</p>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Slogan Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-violet-900 to-purple-900 text-white text-center shadow-md">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-violet-300 mb-2">
              OPERAVA GLOBAL SOLUTIONS
            </p>
            <p className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              OPERAVA — OPERATING IN ADVANCE.
            </p>
            <p className="text-sm text-violet-200 max-w-xl mx-auto mb-6">
              Philippine-Based Corporation Providing Workforce, Information Technology, and Business Process Outsourcing Services.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-lg bg-white text-violet-900 hover:bg-violet-50 transition-colors shadow-xs"
              >
                Contact Legal & Operations
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
