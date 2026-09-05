import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  ShieldCheck,
  ArrowLeft,
  Search,
  Building,
  Mail,
  ExternalLink,
  ChevronRight,
  Printer,
  Scale,
  RefreshCw,
  Clock,
  AlertCircle,
  Calculator,
  HelpCircle,
  BookOpen,
} from 'lucide-react'

interface RefundSection {
  id: string
  num: string
  title: string
  intro?: string[]
  subsections?: {
    subNum?: string
    subTitle: string
    paragraphs?: string[]
    items?: string[]
    orderedItems?: string[]
    formula?: string
    highlightNote?: string
  }[]
  paragraphs?: string[]
  items?: string[]
  orderedItems?: string[]
  trailing?: string[]
  contactCard?: {
    company: string
    supportEmail: string
    escalationEmail?: string
    portalUrl?: string
    website: string
    policyUrl: string
  }
}

export default function RefundPolicy() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const sections: RefundSection[] = useMemo(
    () => [
      {
        id: 'section-1',
        num: '1',
        title: 'Purpose and Scope',
        intro: [
          'This Refund Policy (the “Policy”) explains how Operava Global Solutions Opc, corporation organized under the laws of the Republic of the Philippines (“Operava,” “we,” “us,” or “our”), handles refund requests, cancellations, service credits, service-quality concerns, billing errors, payment disputes, and related matters.',
          'This Policy applies to Products and Services that Operava offers, sells, licenses, delivers, manages, supports, or makes available through digital, remote, online, onsite, project-based, subscription-based, recurring, or other commercial arrangements.',
          'This Policy applies to, among other things:',
        ],
        items: [
          '(a) software development, custom software development, web application development, mobile application development, platform development, SaaS development, website development, e-commerce development, API development, systems integration, and software configuration;',
          '(b) software publishing, testing, quality assurance, technical support, help desk services, IT consulting, digital transformation, business automation, cybersecurity-related services, cloud services, hosting, infrastructure services, database services, data processing, data management, and document processing;',
          '(c) customer service, customer support, technical support, back-office operations, data entry, virtual assistance, administrative support, remote workforce services, outsourced business operations, recruitment process outsourcing, and staffing support;',
          '(d) subscriptions, SaaS offerings, digital products, software licenses, downloadable files, reports, templates, documentation, client portals, digital assets, and other Digital Services; and',
          '(e) any other IT, BPO, staffing, professional, managed, or technology-related services provided by Operava.',
        ],
        trailing: [
          'This Policy is intended to be consistent with applicable Philippine law, including applicable consumer-protection, electronic-commerce, data-privacy, contract, tax, and intellectual-property requirements. It does not limit rights or remedies that cannot lawfully be excluded, waived, or limited.',
        ],
      },
      {
        id: 'section-2',
        num: '2',
        title: 'Company and Service Overview',
        paragraphs: [
          'Operava is a Philippines-based information technology and business process outsourcing company. Operava may provide IT products and services, software development, software publishing, business process outsourcing, data processing, hosting and related activities, web portal activities, staffing support, and related professional services, subject to applicable law.',
          'Operava provides Services to Clients in the Philippines and internationally. The applicable Service may be project-based, milestone-based, hourly, usage-based, subscription-based, monthly, quarterly, annual, recurring, prepaid, postpaid, retainer-based, service-credit based, staff or resource-based, SaaS-based, digitally delivered, remotely delivered, or governed by a separate Agreement.',
          'Operava does not provide services to offshore gaming activities and will conduct its operations only within the limits permitted by applicable Philippine law.',
        ],
      },
      {
        id: 'section-3',
        num: '3',
        title: 'Definitions',
        intro: ['For purposes of this Policy:'],
        items: [
          '“Agreement” means the applicable contract, Master Service Agreement, Service Agreement, Statement of Work, Order Form, SaaS Terms, Subscription Terms, Staffing Agreement, Service Level Agreement, quotation accepted by the parties, purchase order accepted by Operava, invoice accepted or paid by Client, or other binding agreement governing the relevant Services.',
          '“Billing Period” means the recurring period for which Subscription Fees or recurring Service Fees are charged, such as a month, quarter, or year.',
          '“BPO Services” means business process outsourcing, customer service, customer support, technical support, help desk, back-office operations, data entry, data processing, document processing, virtual assistance, administrative support, remote workforce, outsourced operations, recruitment process outsourcing, and related services.',
          '“Business Client” means a Client that acquires or uses Services principally for business, trade, profession, commercial, organizational, or operational purposes, including a corporation, partnership, sole proprietorship, startup, agency, professional firm, organization, enterprise, or government entity.',
          '“Cancellation” means a request or notice to stop, discontinue, not renew, reduce, or terminate all or part of a Service. Cancellation does not automatically create a right to a Refund.',
          '“Chargeback” means a reversal, dispute, payment reversal, retrieval request, cardholder claim, or similar process initiated through a bank, card network, payment gateway, electronic wallet provider, or other payment service provider.',
          '“Client,” “you,” or “your” means an individual, Consumer, Business Client, entity, or other person that purchases, subscribes to, accesses, uses, or seeks to purchase or use Services from Operava.',
          '“Consumer” means an individual Client who acquires Services primarily for personal, family, or household use, where the transaction is covered by applicable consumer-protection law.',
          '“Defect” means a material error, malfunction, non-conformity, or deficiency in a Product, Deliverable, or Service that causes it not to substantially conform to the applicable Agreement, documented specifications, accepted scope, or mandatory legal requirements.',
          '“Deliverable” means a work product, output, software component, report, document, design, configuration, code, digital asset, data output, or other item expressly identified as a deliverable under an Agreement.',
          '“Digital Products” means downloadable or electronically delivered items, including software, templates, reports, documentation, digital assets, source code, access credentials, and other digital files or content.',
          '“Digital Services” means Services delivered electronically or through digital, internet-based, cloud-based, remote, hosted, platform, portal, or software-enabled means.',
          '“Effective Date” means the effective date stated at the beginning of this Policy.',
          '“Force Majeure” means an event beyond the reasonable control of the affected party that prevents or materially delays performance, including natural disasters, fire, flood, earthquake, war, terrorism, civil unrest, government action, epidemic or pandemic, major power failure, widespread telecommunications or internet infrastructure failure, cloud-provider outage, widespread cyber incident, or other comparable event, but only to the extent it is beyond the affected party’s reasonable control and cannot reasonably be avoided or overcome.',
          '“Full Refund” means repayment of the full amount actually paid by Client for the affected Service, subject to applicable law, the Agreement, applicable taxes, lawful set-off rights, and any non-refundable third-party cost that cannot lawfully or contractually be recovered.',
          '“IT Services” means information technology, software, cloud, hosting, infrastructure, data, cybersecurity-related, consulting, systems-development, programming, technical support, and related professional services.',
          '“Milestone” means a defined stage of a Project, including any associated Deliverable, acceptance criterion, payment trigger, or completion event described in the applicable Agreement.',
          '“Partial Refund” means repayment of a portion of the amount paid for an affected Service, determined in accordance with the Agreement, this Policy, applicable law, and the value of Services properly performed.',
          '“Payment” means any amount paid or payable by Client for Services, including deposits, fees, subscription charges, milestone payments, retainers, hourly fees, usage fees, taxes, reimbursable expenses, and third-party charges.',
          '“Project” means a defined engagement for the development, implementation, configuration, consulting, transition, staffing, outsourcing, or delivery of specified Services or Deliverables.',
          '“Refund” means a Full Refund or Partial Refund approved by Operava or otherwise required by applicable law or the Agreement. A Refund does not include a Service Credit unless expressly stated otherwise.',
          '“SaaS” means software-as-a-service, cloud-hosted software, platform services, subscription software, and related hosted or remotely accessed software offerings.',
          '“Service Credit” means a non-cash credit granted to Client for use against future fees for eligible Services, subject to the applicable Agreement or this Policy. A Service Credit is not a cash Refund unless expressly stated otherwise or required by applicable law.',
          '“Service Deficiency” means a material failure by Operava to provide Services substantially in accordance with the applicable Agreement, agreed scope, documented specifications, or applicable service levels.',
          '“Service Period” means the period during which Operava is scheduled or contracted to provide the applicable Service.',
          '“Services” means all Products and Services supplied, licensed, made available, or performed by Operava, including IT Services, BPO Services, Staffing Services, Digital Services, SaaS, Projects, and Deliverables.',
          '“Staffing Services” means recruitment, recruitment process outsourcing, technical staffing, professional staffing, virtual assistant services, dedicated personnel arrangements, remote workforce services, employee or resource allocation, and related outsourcing services.',
          '“Subscription” means a recurring or time-limited right to access SaaS, Digital Services, hosted services, support, content, or other recurring Services in exchange for periodic fees.',
          '“Third-Party Services” means services, software, infrastructure, platforms, licenses, applications, payment services, cloud services, hosting, telecommunications, APIs, domains, advertising services, or other products and services supplied by a third party rather than Operava.',
        ],
      },
      {
        id: 'section-4',
        num: '4',
        title: 'General Refund Principles',
        subsections: [
          {
            subNum: '4.1',
            subTitle: 'No Unlawful Blanket Exclusion',
            paragraphs: [
              'Operava does not apply an unlawful blanket “no refund,” “no return,” or “no exchange” rule. Refund rights depend on the applicable law, the nature of the transaction, the Agreement, the Service purchased, the work performed, whether a Service Deficiency exists, and the specific circumstances of the request.',
            ],
          },
          {
            subNum: '4.2',
            subTitle: 'Mandatory Rights Preserved',
            paragraphs: [
              'Nothing in this Policy excludes, restricts, or waives any right, remedy, protection, or obligation that cannot lawfully be excluded, restricted, or waived under applicable Philippine law or other mandatory law that applies to the relevant transaction.',
            ],
          },
          {
            subNum: '4.3',
            subTitle: 'Cancellation Is Not Automatically a Refund',
            paragraphs: [
              'A Cancellation stops or requests the stopping of future Services, subject to the Agreement and applicable notice requirements. A Cancellation does not automatically entitle Client to a Refund for Services already performed, committed costs, completed Milestones, accepted Deliverables, consumed Subscription access, reserved personnel or capacity, or non-cancellable Third-Party Services.',
            ],
          },
          {
            subNum: '4.4',
            subTitle: 'Case-Specific Assessment',
            paragraphs: [
              'Operava will assess Refund requests fairly and reasonably based on the relevant facts, payment records, Agreement, completed work, unperformed Services, Client conduct, applicable law, and available evidence.',
            ],
          },
          {
            subNum: '4.5',
            subTitle: 'Remedies May Differ',
            paragraphs: [
              'Depending on the circumstances, the appropriate remedy may be correction, repair, reperformance, replacement personnel, a price adjustment, a Partial Refund, a Full Refund, a Service Credit, account credit, cancellation of future billing, or another remedy required by law or agreed in the Agreement.',
            ],
          },
        ],
      },
      {
        id: 'section-5',
        num: '5',
        title: 'Consumer and Business Client Transactions',
        subsections: [
          {
            subNum: '5.1',
            subTitle: 'Consumers',
            paragraphs: [
              'Where a Client is a Consumer and applicable Philippine consumer-protection legislation applies, Operava will honor rights and remedies that are mandatory under applicable law. This Policy must be read consistently with those mandatory rights.',
              'Consumer remedies may depend on the nature of the Service, the facts of the transaction, any material defect or deficiency, representations made to the Consumer, the applicable contract, and the requirements of applicable law.',
            ],
          },
          {
            subNum: '5.2',
            subTitle: 'Business Clients',
            paragraphs: [
              'For Business Clients, the applicable Agreement will generally determine the parties’ rights and obligations concerning payment, refunds, service credits, acceptance, cancellation, service levels, limitations of liability, dispute resolution, staffing, change requests, and termination.',
              'Business Clients acknowledge that certain Services require Operava to allocate staff, capacity, infrastructure, Third-Party Services, licenses, and operational resources in reliance on Client commitments. Subject to applicable law and the Agreement, Services properly performed and costs properly incurred or committed before Cancellation or termination may not be refundable.',
            ],
          },
          {
            subNum: '5.3',
            subTitle: 'Mixed-Purpose Transactions',
            paragraphs: [
              'If a Client purchases Services for both personal and business purposes, Operava may assess the transaction based on its primary purpose, the contracting party, invoice details, representations made during purchase, and applicable law. This assessment will not restrict mandatory rights that apply as a matter of law.',
            ],
          },
        ],
      },
      {
        id: 'section-6',
        num: '6',
        title: 'Relationship With Other Agreements',
        subsections: [
          {
            subNum: '6.1',
            subTitle: 'Document Hierarchy',
            paragraphs: [
              'If there is a conflict between documents, the following order of precedence applies, unless a signed Agreement expressly provides a different order of precedence:',
            ],
            items: [
              '(a) mandatory applicable law;',
              '(b) a signed Master Service Agreement, Service Agreement, or equivalent negotiated contract;',
              '(c) the applicable Statement of Work, Order Form, accepted proposal, or project-specific agreement;',
              '(d) the applicable Service Level Agreement;',
              '(e) specific subscription, product, software license, staffing, or service terms;',
              '(f) this Policy; and',
              '(g) Operava’s general Terms and Conditions.',
            ],
          },
          {
            subNum: '6.2',
            subTitle: 'Specific Terms',
            paragraphs: [
              'More specific written terms for a particular Service, Project, Subscription, staffing arrangement, or Client may supplement or replace provisions of this Policy to the extent stated in the applicable Agreement and permitted by law.',
            ],
          },
          {
            subNum: '6.3',
            subTitle: 'Mandatory Law Prevails',
            paragraphs: [
              'If any provision of an Agreement or this Policy conflicts with a mandatory legal requirement, the mandatory legal requirement will prevail to the extent of the conflict.',
            ],
          },
        ],
      },
      {
        id: 'section-7',
        num: '7',
        title: 'Refund Eligibility',
        intro: [
          'A Client may be eligible for a Refund, Service Credit, reperformance, correction, price reduction, or another remedy where, as applicable:',
        ],
        items: [
          '(a) Operava charged Client more than once for the same authorized transaction;',
          '(b) Operava charged Client an incorrect amount due to an Operava billing error;',
          '(c) Client made an unauthorized Payment, subject to reasonable verification and applicable payment-provider procedures;',
          '(d) Operava did not commence an agreed Service and Client validly cancelled before commencement, subject to any lawful deposit, reservation, committed-cost, or Third-Party Service terms;',
          '(e) Operava materially failed to provide a Service substantially in accordance with the applicable Agreement and did not correct, reperform, or otherwise resolve the Service Deficiency within a reasonable period or any applicable contractual cure period;',
          '(f) a Deliverable materially fails to conform to agreed written specifications, subject to the agreed acceptance, testing, correction, and change-control process;',
          '(g) an Agreement expressly provides for a Refund, Partial Refund, price reduction, reimbursement, or Service Credit;',
          '(h) Client has prepaid for Services that have not been performed, and a Refund is appropriate under the Agreement, this Policy, or applicable law; or',
          '(i) a Refund or other remedy is required by applicable law.',
        ],
        trailing: [
          'Eligibility does not guarantee a Full Refund. The amount and form of any remedy will be determined under the Agreement, this Policy, and applicable law.',
        ],
      },
      {
        id: 'section-8',
        num: '8',
        title: 'Full Refunds',
        intro: ['A Full Refund may be appropriate where:'],
        items: [
          '(a) an authorized Payment was duplicated and no offsetting Service or credit was provided;',
          '(b) Client was charged in error for a Service that was not ordered, authorized, delivered, or made available;',
          '(c) Operava cannot commence the agreed Service due solely to its own material failure, and Client has not received material value from the affected Service;',
          '(d) a Service is cancelled before Operava begins work or incurs committed costs, and the Agreement does not provide otherwise;',
          '(e) the applicable Agreement expressly provides for a Full Refund in the relevant circumstances;',
          '(f) a mandatory legal right requires a Full Refund; or',
          '(g) Operava determines, acting reasonably and in good faith, that a Full Refund is the appropriate resolution.',
        ],
        trailing: [
          'A Full Refund may be reduced only to the extent permitted by applicable law and the Agreement for Services properly performed, benefits already received, or Third-Party Services and charges that were validly authorized, non-recoverable, and properly disclosed or contractually allocated.',
        ],
      },
      {
        id: 'section-9',
        num: '9',
        title: 'Partial Refunds',
        intro: ['A Partial Refund may be appropriate where:'],
        items: [
          '(a) Client prepaid for a Service Period and part of the Service has not been performed;',
          '(b) a Project was partially completed before valid Cancellation or termination;',
          '(c) Operava delivered some, but not all, of the agreed Services or Deliverables;',
          '(d) a Service Deficiency affects only part of the Service, Deliverable, Service Period, or Subscription;',
          '(e) a recurring Service is ended before the end of a prepaid period and a pro-rated Refund is required under the Agreement or applicable law;',
          '(f) the Agreement includes a partial-refund mechanism; or',
          '(g) Operava determines that a Partial Refund is a fair and appropriate resolution.',
        ],
        trailing: [
          'Any Partial Refund will ordinarily reflect the value of Services properly performed, completed Milestones, accepted Deliverables, hours worked, consumed usage, reserved capacity, and properly incurred or committed Third-Party costs, subject to applicable law.',
        ],
      },
      {
        id: 'section-10',
        num: '10',
        title: 'Service Credits and Alternative Remedies',
        subsections: [
          {
            subNum: '10.1',
            subTitle: 'Service Credits',
            paragraphs: [
              'Where legally permissible and contractually appropriate, Operava may offer a Service Credit instead of a cash Refund for eligible matters, including minor or temporary Service Deficiencies, service interruptions, billing adjustments, or goodwill resolutions.',
            ],
          },
          {
            subNum: '10.2',
            subTitle: 'Limitations',
            paragraphs: ['Unless the Agreement states otherwise, Service Credits:'],
            items: [
              '(a) may be used only against future invoices for the same or substantially similar Services;',
              '(b) are not transferable, assignable, saleable, or exchangeable for cash;',
              '(c) may not be used to offset taxes, reimbursable expenses, Third-Party charges, or amounts due for unrelated Services;',
              '(d) expire twelve (12) months after issue, unless the Agreement or the Service Credit notice states another period; and',
              '(e) are subject to any service-credit cap or claim process in the applicable Service Level Agreement.',
            ],
          },
          {
            subNum: '10.3',
            subTitle: 'Mandatory Remedies',
            paragraphs: [
              'A Service Credit will not replace a monetary Refund, statutory remedy, or other remedy where applicable law requires a different remedy or where the applicable Agreement expressly provides otherwise.',
            ],
          },
          {
            subNum: '10.4',
            subTitle: 'Reperformance and Correction',
            paragraphs: [
              'Operava may, where reasonable and legally permissible, correct, repair, replace, reperform, or otherwise remedy a Defect or Service Deficiency before issuing a Refund. This does not prevent Client from relying on a remedy that applicable law requires to be available without prior reperformance.',
            ],
          },
        ],
      },
      {
        id: 'section-11',
        num: '11',
        title: 'Software Development Refunds',
        subsections: [
          {
            subNum: '11.1',
            subTitle: 'Deposits and Discovery Fees',
            paragraphs: [
              'Project deposits, discovery fees, consultation fees, requirements-gathering fees, feasibility-assessment fees, architecture fees, and planning fees may compensate Operava for reserving resources and performing preliminary work. They are refundable only to the extent required by applicable law, expressly stated in the Agreement, or not earned because Operava did not perform the corresponding work.',
            ],
          },
          {
            subNum: '11.2',
            subTitle: 'Development Fees and Milestones',
            paragraphs: [
              'Fees attributable to completed work, development hours properly performed, completed Milestones, accepted Deliverables, approved designs, code developed, documentation prepared, configurations completed, testing conducted, and other Services properly delivered are generally not refundable merely because Client changes its mind, changes its business strategy, reduces its budget, delays its Project, decides not to launch, or chooses another provider.',
              'This Section does not limit Client’s rights in relation to a material Defect, Service Deficiency, failure to meet agreed specifications, fraud, misrepresentation, or another matter for which applicable law or the Agreement provides a remedy.',
            ],
          },
          {
            subNum: '11.3',
            subTitle: 'Partially Completed Projects',
            paragraphs: [
              'If a Project is cancelled or terminated after work has begun, Operava may calculate the refundable amount, if any, by taking into account:',
            ],
            items: [
              '(a) the value of Services properly performed;',
              '(b) completed or substantially completed Milestones;',
              '(c) documented development hours and professional time incurred;',
              '(d) Deliverables provided or made available to Client;',
              '(e) approved or reasonably necessary work in progress;',
              '(f) non-cancellable Third-Party Services and costs;',
              '(g) Client-requested changes, delays, or additional requirements;',
              '(h) any termination fee, notice period, or minimum commitment validly agreed in the Agreement; and',
              '(i) applicable law.',
            ],
          },
          {
            subNum: '11.4',
            subTitle: 'Change Requests and Scope Changes',
            paragraphs: [
              'Client-requested changes, scope expansions, revised requirements, additional features, new integrations, changed technical specifications, additional testing, or changes in delivery timelines may require a written change request, revised quotation, or adjustment in fees and schedule.',
              'Fees for work performed in response to an approved or reasonably authorized change request are generally not refundable, subject to applicable law and the Agreement.',
            ],
          },
          {
            subNum: '11.5',
            subTitle: 'Client Delays and Dependencies',
            paragraphs: [
              'Operava will not be responsible for delays, additional costs, or inability to complete a Project to the extent caused by Client’s failure to provide required information, approvals, content, access, credentials, data, systems, test environments, personnel, or timely decisions.',
              'Client-caused delay does not automatically create a Refund entitlement. Operava may charge or retain fees for work properly performed and costs reasonably incurred or committed during the delay, subject to the Agreement and applicable law.',
            ],
          },
          {
            subNum: '11.6',
            subTitle: 'Third-Party Technology',
            paragraphs: [
              'Fees for domains, cloud infrastructure, hosting, software licenses, APIs, plug-ins, payment gateways, external tools, and other Third-Party Services will be handled in accordance with Section 25.',
            ],
          },
        ],
      },
      {
        id: 'section-12',
        num: '12',
        title: 'Web, Mobile and Platform Development Refunds',
        subsections: [
          {
            subNum: '12.1',
            subTitle: 'Scope and Acceptance',
            paragraphs: [
              'Refund requests relating to websites, mobile applications, e-commerce systems, platforms, portals, and similar development Services will be assessed against the written scope, specifications, acceptance criteria, approved designs, change requests, test records, and communications forming part of the Agreement.',
            ],
          },
          {
            subNum: '12.2',
            subTitle: 'Correctable Issues',
            paragraphs: [
              'Where a reported issue is within scope and is a Defect or Service Deficiency, Operava may correct the issue, reperform affected work, provide a workaround, or agree a reasonable remediation plan before a Refund is considered, subject to mandatory law and the Agreement.',
            ],
          },
          {
            subNum: '12.3',
            subTitle: 'Out-of-Scope Requests',
            paragraphs: [
              'Requests for new features, design preferences, functionality not included in the agreed scope, changes caused by Client’s changed business requirements, changes to Third-Party platforms, browser or operating-system changes, or additions not included in the Agreement are not automatically evidence of a Defect and may be handled as change requests.',
            ],
          },
          {
            subNum: '12.4',
            subTitle: 'Deployment and Third-Party Environments',
            paragraphs: [
              'Operava is not responsible for a failure caused by Client’s hosting environment, domain configuration, app-store requirements, Third-Party platform policies, unsupported software, unsupported browsers, unauthorized modifications, or Client-controlled infrastructure, unless the Agreement expressly makes Operava responsible for that matter.',
            ],
          },
        ],
      },
      {
        id: 'section-13',
        num: '13',
        title: 'SaaS and Subscription Refunds',
        subsections: [
          {
            subNum: '13.1',
            subTitle: 'Recurring Billing',
            paragraphs: [
              'Subscriptions may be billed monthly, quarterly, annually, or on another Billing Period stated at checkout, in an Order Form, or in the applicable Agreement. By purchasing a Subscription, Client authorizes recurring billing until the Subscription is cancelled in accordance with the applicable terms.',
            ],
          },
          {
            subNum: '13.2',
            subTitle: 'Cancellation of Future Billing',
            paragraphs: [
              'Unless the applicable Agreement states otherwise, a valid Cancellation will stop future recurring billing after the end of the then-current Billing Period or any applicable notice period. Cancellation does not automatically create a Refund for fees already paid for the current Billing Period.',
            ],
          },
          {
            subNum: '13.3',
            subTitle: 'Monthly Subscriptions',
            paragraphs: [
              'For monthly Subscriptions, cancellation will generally take effect at the end of the current monthly Billing Period. Fees for the current Billing Period are generally not refundable merely because Client does not use the Subscription for all or part of that period, subject to applicable law, a material Service Deficiency, an Operava billing error, or express contractual terms.',
            ],
          },
          {
            subNum: '13.4',
            subTitle: 'Annual and Prepaid Subscriptions',
            paragraphs: [
              'For annual, prepaid, or fixed-term Subscriptions, any early-termination or early-cancellation refund will be determined by the applicable Agreement, Order Form, checkout terms, and applicable law. Operava may provide a pro-rated Refund for unused time where required by law, expressly agreed, or appropriate in the circumstances.',
            ],
          },
          {
            subNum: '13.5',
            subTitle: 'Upgrades and Downgrades',
            paragraphs: [
              'Upgrades may take effect immediately or at the next Billing Period, as stated in the applicable Subscription terms. Downgrades may take effect at the next Billing Period unless otherwise stated. Downgrades do not ordinarily create a Refund for amounts already paid, subject to applicable law and specific written terms.',
            ],
          },
          {
            subNum: '13.6',
            subTitle: 'Free Trials and Promotional Pricing',
            paragraphs: [
              'Free trials, evaluation access, discounts, promotions, and introductory pricing are subject to the applicable promotional terms. Client must cancel before the end of any trial period if Client does not wish to continue into a paid Subscription, unless applicable law provides otherwise.',
            ],
          },
          {
            subNum: '13.7',
            subTitle: 'Suspension and Termination',
            paragraphs: [
              'Operava may suspend or terminate access in accordance with the Agreement, including for non-payment, fraud, security risk, illegal use, or material breach. Refunds following suspension or termination will be assessed under the Agreement, this Policy, and applicable law.',
            ],
          },
          {
            subNum: '13.8',
            subTitle: 'Duplicate Billing and Billing Errors',
            paragraphs: [
              'Operava will investigate claims of duplicate billing, incorrect recurring charges, unauthorized charges, or other billing errors. Verified errors will be corrected by Refund, account adjustment, Service Credit, or another appropriate remedy.',
            ],
          },
        ],
      },
      {
        id: 'section-14',
        num: '14',
        title: 'IT Consulting and Professional Services',
        paragraphs: [
          'Fees for IT consulting, advisory services, strategy, audits, assessments, technical analysis, project management, digital transformation, business automation, quality assurance, support, training, and other professional Services are generally earned as the Services are performed.',
          'If Client cancels after Operava has begun providing professional Services, Client remains responsible for Services properly performed, time properly recorded, authorized expenses, and Third-Party costs properly incurred or committed, subject to applicable law and the Agreement.',
          'If Operava materially fails to provide the agreed professional Services, Operava may correct, reperform, provide substitute personnel, provide a price reduction, issue a Service Credit, or issue a Refund where appropriate, required by law, or required by the Agreement.',
        ],
      },
      {
        id: 'section-15',
        num: '15',
        title: 'Cloud, Hosting and Infrastructure Services',
        subsections: [
          {
            subNum: '15.1',
            subTitle: 'Recurring and Usage-Based Charges',
            paragraphs: [
              'Cloud, hosting, infrastructure, storage, database, managed-service, cybersecurity-related, and similar Services may be billed by Subscription, usage, consumption, reservation, resource allocation, or a combination of these methods.',
            ],
          },
          {
            subNum: '15.2',
            subTitle: 'Unused Capacity',
            paragraphs: [
              'Unused storage, compute capacity, bandwidth, support allocation, reserved resources, or other capacity does not automatically create a Refund entitlement, particularly where Operava has reserved, purchased, or committed those resources for Client.',
            ],
          },
          {
            subNum: '15.3',
            subTitle: 'Service Interruptions',
            paragraphs: [
              'Service interruptions will be assessed under the applicable Agreement and Service Level Agreement. Where an applicable Service Level Agreement provides service credits, those credits may be Client’s agreed contractual remedy for service-level failures, subject to mandatory law and any express Agreement provision.',
            ],
          },
          {
            subNum: '15.4',
            subTitle: 'Third-Party Infrastructure',
            paragraphs: [
              'Where Operava relies on Third-Party cloud providers, data centers, telecommunications providers, software licensors, security providers, or infrastructure providers, refunds and credits related to those services may depend on the relevant third-party terms, the extent to which Operava receives a recovery, the Agreement, and applicable law.',
            ],
          },
        ],
      },
      {
        id: 'section-16',
        num: '16',
        title: 'BPO Services',
        subsections: [
          {
            subNum: '16.1',
            subTitle: 'Services Already Rendered',
            paragraphs: [
              'Fees for BPO Services properly performed, including customer service, customer support, technical support, help desk, data entry, data processing, document processing, virtual assistance, administrative support, back-office operations, and outsourced business operations, are generally not refundable merely because Client later elects to discontinue the Service.',
            ],
          },
          {
            subNum: '16.2',
            subTitle: 'Prepaid Services',
            paragraphs: ['If Client prepays for BPO Services, any refund for an unused balance will depend on:'],
            items: [
              '(a) the applicable Agreement and any minimum term;',
              '(b) the value of Services already performed;',
              '(c) allocated or reserved personnel and capacity;',
              '(d) onboarding, training, transition, supervision, quality assurance, and management costs;',
              '(e) notice requirements;',
              '(f) non-cancellable Third-Party and operational costs; and',
              '(g) applicable law.',
            ],
          },
          {
            subNum: '16.3',
            subTitle: 'Service Deficiencies',
            paragraphs: [
              'If Client reasonably believes that BPO Services materially fail to conform to the Agreement, Client should promptly provide the relevant records, examples, dates, ticket numbers, quality reports, call recordings where lawfully available, and other evidence. Operava may investigate and, as appropriate, retrain personnel, correct records, reperform work, provide replacement personnel, implement a corrective action plan, issue a Service Credit, make a price adjustment, or provide another appropriate remedy.',
            ],
          },
          {
            subNum: '16.4',
            subTitle: 'Volume Fluctuations',
            paragraphs: [
              'A decrease in Client’s transaction volume, workload, customer demand, business needs, or use of the BPO Services does not automatically entitle Client to a Refund, particularly where the Agreement includes minimum fees, dedicated personnel, resource commitments, or notice requirements.',
            ],
          },
        ],
      },
      {
        id: 'section-17',
        num: '17',
        title: 'Staffing and Outsourcing Services',
        subsections: [
          {
            subNum: '17.1',
            subTitle: 'Dedicated Personnel and Reserved Capacity',
            paragraphs: [
              'Staffing Services may require Operava to recruit, onboard, train, supervise, reserve, assign, and manage personnel or resources for Client. Fees may include recruitment, onboarding, training, management, capacity reservation, administrative, payroll-related, technology, and operational components.',
            ],
          },
          {
            subNum: '17.2',
            subTitle: 'Services Performed',
            paragraphs: [
              'Fees for personnel time and Staffing Services properly delivered are generally not refundable, subject to applicable law and any Service Deficiency or contractual remedy.',
            ],
          },
          {
            subNum: '17.3',
            subTitle: 'Client Cancellation or Reduction',
            paragraphs: [
              'If Client cancels, reduces, pauses, or terminates Staffing Services, Client remains responsible for obligations arising before the effective date of the change, including Services performed, applicable notice-period fees, committed personnel costs, properly authorized expenses, and other charges validly payable under the Agreement.',
            ],
          },
          {
            subNum: '17.4',
            subTitle: 'Replacement Personnel',
            paragraphs: [
              'Where the Agreement includes replacement rights, service continuity commitments, performance-management procedures, or replacement guarantees, those provisions will apply. A request to replace a resource does not automatically entitle Client to a Refund unless expressly stated in the Agreement or required by law.',
            ],
          },
          {
            subNum: '17.5',
            subTitle: 'Unused Prepaid Staffing Services',
            paragraphs: [
              'For prepaid Staffing Services, Operava will assess any unused balance on a case-by-case basis, considering the Service Period remaining, documented work performed, onboarding and staffing costs, resource commitments, contractual notice requirements, and applicable law.',
            ],
          },
        ],
      },
      {
        id: 'section-18',
        num: '18',
        title: 'Recruitment and RPO Services',
        subsections: [
          {
            subNum: '18.1',
            subTitle: 'Recruitment Fees',
            paragraphs: [
              'Recruitment, placement, sourcing, screening, assessment, coordination, recruitment process outsourcing, and related fees are governed by the applicable Agreement, quotation, or engagement terms.',
            ],
          },
          {
            subNum: '18.2',
            subTitle: 'Work Performed',
            paragraphs: [
              'Fees for recruitment work properly performed, including sourcing, screening, interviewing, assessment, candidate coordination, recruitment administration, and reporting, are generally not refundable merely because Client changes its hiring plans, freezes hiring, withdraws a role, delays a decision, declines candidates, or hires through another channel.',
            ],
          },
          {
            subNum: '18.3',
            subTitle: 'Replacement and Guarantee Terms',
            paragraphs: [
              'If the Agreement contains a candidate replacement period, replacement guarantee, or other remedy, that specific provision will apply. Any remedy is subject to Client’s compliance with the agreed recruitment process, payment obligations, employment terms, candidate treatment, and notification requirements.',
            ],
          },
          {
            subNum: '18.4',
            subTitle: 'Refunds',
            paragraphs: [
              'A Refund may be available only where expressly provided in the Agreement, required by applicable law, or appropriate due to an Operava billing error or material failure to provide the agreed recruitment Services.',
            ],
          },
        ],
      },
      {
        id: 'section-19',
        num: '19',
        title: 'Data Processing and Back-Office Services',
        paragraphs: [
          'Refund requests relating to data processing, data entry, document processing, back-office operations, reporting, data management, and similar Services will be assessed based on the agreed scope, data quality requirements, service levels, error thresholds, operational procedures, Client instructions, and applicable law.',
          'Where an error is attributable to Operava and constitutes a Service Deficiency, Operava may correct the affected output, reprocess data, reperform the affected Services, provide a reasonable workaround, issue a Service Credit, grant a price adjustment, or provide another appropriate remedy.',
          'Operava is not responsible for errors resulting from incomplete, inaccurate, corrupted, unlawful, inaccessible, delayed, or improperly formatted Client data, Client instructions, Client systems, or Third-Party Services, unless Operava expressly agreed in writing to validate or correct those matters.',
        ],
      },
      {
        id: 'section-20',
        num: '20',
        title: 'Digital Products and Digital Deliverables',
        subsections: [
          {
            subNum: '20.1',
            subTitle: 'Access, Download, and Use',
            paragraphs: [
              'Digital Products and Digital Deliverables may include software, source code, reports, templates, documentation, digital files, designs, credentials, digital assets, access rights, and licensed materials.',
              'Once Client has accessed, downloaded, received, deployed, copied, used, or been granted access to a Digital Product or Digital Deliverable, the ability to return or reverse the transfer may be limited due to the nature of digital delivery, intellectual property, confidentiality, security, and licensing considerations.',
            ],
          },
          {
            subNum: '20.2',
            subTitle: 'No Improper Limitation of Rights',
            paragraphs: [
              'The limitation described in Section 20.1 does not exclude a Refund or remedy required by applicable law or available under the Agreement due to a Defect, Service Deficiency, material non-conformity, billing error, or other valid basis.',
            ],
          },
          {
            subNum: '20.3',
            subTitle: 'License and IP Terms',
            paragraphs: [
              'Any license, ownership, assignment, access, return, destruction, revocation, or continued use of Digital Products and Digital Deliverables will be governed by the applicable Agreement. A Refund does not automatically transfer ownership to Client, revoke Client rights, or require Client to delete materials unless the Agreement or applicable law provides for that result.',
            ],
          },
        ],
      },
      {
        id: 'section-21',
        num: '21',
        title: 'Non-Refundable or Generally Non-Refundable Charges',
        intro: [
          'Subject to applicable law, the Agreement, and the specific circumstances, the following may be non-refundable or generally non-refundable after they are properly incurred, performed, delivered, committed, or consumed:',
        ],
        items: [
          '(a) Services properly performed;',
          '(b) completed Milestones and accepted Deliverables;',
          '(c) documented hours and professional time properly incurred;',
          '(d) discovery, consultation, planning, design, configuration, onboarding, setup, mobilization, implementation, transition, training, and project-management Services properly performed;',
          '(e) dedicated personnel, reserved capacity, staffing allocation, and resource commitments;',
          '(f) usage-based Services already consumed;',
          '(g) licenses, subscriptions, cloud resources, hosting, domains, APIs, payment gateway costs, software, infrastructure, advertising, external contractors, external service providers, and other Third-Party Services that are non-refundable under the third party’s terms and for which Operava has not received a refund;',
          '(h) taxes, government charges, bank charges, intermediary-bank charges, card-network fees, payment-processing fees, and foreign-exchange costs to the extent lawfully chargeable and not recovered by Operava; and',
          '(i) lawful cancellation charges, notice-period charges, early-termination charges, or minimum commitments expressly agreed in the Agreement.',
        ],
        trailing: [
          'This Section does not create an absolute exclusion of Refunds and does not limit any mandatory legal remedy.',
        ],
      },
      {
        id: 'section-22',
        num: '22',
        title: 'Client Cancellation',
        subsections: [
          {
            subNum: '22.1',
            subTitle: 'Before Work Begins',
            paragraphs: [
              'If Client cancels before Services begin, Operava will assess whether a Refund is appropriate based on work already performed, reserved capacity, committed costs, Third-Party Services, deposits, and the Agreement.',
            ],
          },
          {
            subNum: '22.2',
            subTitle: 'After Work Begins',
            paragraphs: [
              'If Client cancels after Services begin, Client remains responsible for Services properly performed, completed Milestones, work in progress, committed and non-cancellable costs, and other charges properly payable under the Agreement. Any Refund for Services not performed will be assessed under this Policy, the Agreement, and applicable law.',
            ],
          },
          {
            subNum: '22.3',
            subTitle: 'Recurring Services',
            paragraphs: [
              'For recurring Services, Client must provide cancellation notice through the applicable account portal, written notice process, or other approved method stated in the Agreement. Cancellation will generally apply prospectively and will not automatically result in a Refund for the current Billing Period.',
            ],
          },
          {
            subNum: '22.4',
            subTitle: 'Client Change of Mind',
            paragraphs: [
              'A change of mind, budget change, business strategy change, decision to delay or abandon a Project, decision to use another provider, failure to continue a Project, reduced usage, or reduced business demand does not automatically entitle Client to a Refund. However, Operava will assess whether an unused prepaid balance may be refundable under the Agreement, this Policy, or applicable law.',
            ],
          },
          {
            subNum: '22.5',
            subTitle: 'Cancellation Does Not Waive Rights',
            paragraphs: [
              'Cancellation does not waive either party’s accrued rights, payment obligations, confidentiality obligations, data-security obligations, intellectual-property rights, or remedies for prior breach.',
            ],
          },
        ],
      },
      {
        id: 'section-23',
        num: '23',
        title: 'Service Deficiencies and Defective Services',
        subsections: [
          {
            subNum: '23.1',
            subTitle: 'Reporting',
            paragraphs: [
              'Client should report a suspected Defect or Service Deficiency promptly after becoming aware of it. The report should identify the affected Service or Deliverable, relevant dates, the nature of the concern, the business impact, supporting evidence, and the remedy requested.',
            ],
          },
          {
            subNum: '23.2',
            subTitle: 'Investigation',
            paragraphs: [
              'Operava will review the report, verify the relevant Agreement and scope, assess the available evidence, and determine whether the concern is attributable to Operava, Client, a Third-Party Service, a Force Majeure event, or another cause.',
            ],
          },
          {
            subNum: '23.3',
            subTitle: 'Remediation',
            paragraphs: ['Where appropriate, Operava may:'],
            items: [
              '(a) correct or repair the affected Service or Deliverable;',
              '(b) reperform the affected Service;',
              '(c) provide a workaround, patch, or replacement;',
              '(d) provide replacement personnel or additional supervision;',
              '(e) correct or reprocess affected data;',
              '(f) offer a Service Credit, price adjustment, or Partial Refund; or',
              '(g) provide another remedy required by applicable law or the Agreement.',
            ],
          },
          {
            subNum: '23.4',
            subTitle: 'Refunds for Deficiencies',
            paragraphs: [
              'If a material Service Deficiency cannot reasonably be corrected, is not corrected within a reasonable period or applicable contractual cure period, or otherwise gives rise to a Refund or another remedy under applicable law or the Agreement, Operava will determine the appropriate remedy on a case-by-case basis.',
              'Nothing in this Policy requires Client to accept reperformance or correction where applicable law gives Client a different mandatory remedy.',
            ],
          },
        ],
      },
      {
        id: 'section-24',
        num: '24',
        title: 'Client-Caused Issues',
        intro: [
          'Operava is not responsible for, and a Refund or Service Credit may not be available for, an issue to the extent it is caused or materially contributed to by:',
        ],
        items: [
          '(a) inaccurate, incomplete, delayed, corrupted, unlawful, or improperly formatted Client information, instructions, data, content, materials, or requirements;',
          '(b) Client’s failure to provide required approvals, access, credentials, systems, test environments, personnel, facilities, decisions, content, or cooperation;',
          '(c) Client-requested changes, delayed decisions, scope changes, or failure to follow agreed procedures;',
          '(d) Client’s infrastructure, network, internet connection, hardware, software, browser, operating system, security controls, or unsupported environment;',
          '(e) Client’s unauthorized modification, interference, misuse, or use of Services outside documentation or agreed specifications;',
          '(f) Third-Party Services not controlled by Operava;',
          '(g) Client’s failure to implement a reasonable patch, update, workaround, configuration change, or corrective action recommended by Operava; or',
          '(h) Client’s breach of the Agreement or applicable law.',
        ],
        trailing: [
          'Operava will apply this Section reasonably and based on available evidence. This Section does not limit mandatory rights that apply notwithstanding Client contribution or fault.',
        ],
      },
      {
        id: 'section-25',
        num: '25',
        title: 'Third-Party Services and Costs',
        subsections: [
          {
            subNum: '25.1',
            subTitle: 'General Rule',
            paragraphs: [
              'Third-Party Services and costs may include cloud services, hosting, domain registrations, software licenses, APIs, payment gateway fees, Third-Party subscriptions, advertising expenses, external contractors, external service providers, government charges, telecommunications, banking charges, and similar items.',
            ],
          },
          {
            subNum: '25.2',
            subTitle: 'Applicable Terms',
            paragraphs: [
              'Third-Party Services are subject to the third party’s own terms, billing practices, service levels, cancellation rules, refund rules, and availability. Operava will not be required to provide a Refund for a Third-Party cost that is non-refundable to Operava, unless applicable law or the Agreement requires otherwise.',
            ],
          },
          {
            subNum: '25.3',
            subTitle: 'Recoveries From Third Parties',
            paragraphs: [
              'If Operava receives a Refund, credit, reimbursement, or other recovery from a third party relating to a charge paid by Client, Operava will apply that recovery in accordance with the Agreement and applicable law, and may pass through the applicable recovery to Client where appropriate.',
            ],
          },
          {
            subNum: '25.4',
            subTitle: 'Client Authorization',
            paragraphs: [
              'Client is responsible for Third-Party charges that Client has authorized or that are reasonably necessary to perform the agreed Services, provided that the charges are disclosed, approved, or otherwise payable under the Agreement.',
            ],
          },
        ],
      },
      {
        id: 'section-26',
        num: '26',
        title: 'Payment Processing and Currency Conversion',
        subsections: [
          {
            subNum: '26.1',
            subTitle: 'Supported Payment Methods',
            paragraphs: [
              'Operava may accept payments in Philippine Peso, United States Dollars, or other supported currencies through bank transfer, card payment, debit card, payment gateway, electronic wallet, or other approved payment method.',
            ],
          },
          {
            subNum: '26.2',
            subTitle: 'Refund Method',
            paragraphs: [
              'Approved Refunds will generally be returned through the original payment method where practicable. If this is not practicable, Operava may use another lawful and reasonably secure refund method after verifying Client’s identity and payment entitlement.',
            ],
          },
          {
            subNum: '26.3',
            subTitle: 'Currency Conversion',
            paragraphs: [
              'If a Payment was made in a currency other than Philippine Peso, the Refund may be processed in the original payment currency, Philippine Peso, or another mutually agreed supported currency, subject to the payment provider’s capabilities, the Agreement, and applicable law.',
              'Unless applicable law requires otherwise, Operava is not responsible for exchange-rate differences, foreign-exchange losses, intermediary-bank fees, card issuer fees, electronic wallet fees, or payment-provider fees resulting from currency conversion or processing by third parties.',
            ],
          },
          {
            subNum: '26.4',
            subTitle: 'Processing Fees',
            paragraphs: [
              'Operava will not impose or shift fees to Client where doing so is prohibited by applicable law. Where permitted by law and disclosed in the Agreement, applicable payment-provider, bank, or processing costs may be deducted only to the extent they are actually incurred, lawful, and not otherwise recoverable by Operava.',
            ],
          },
        ],
      },
      {
        id: 'section-27',
        num: '27',
        title: 'Taxes and Refund Adjustments',
        paragraphs: [
          'Prices may be subject to value-added tax, withholding tax, or other applicable Philippine or foreign taxes, duties, levies, charges, or reporting requirements.',
          'If a Refund is approved, Operava may issue a credit note, refund invoice adjustment, receipt, tax document, or other record required by applicable law. The tax treatment of a Refund will depend on the nature of the transaction, the original invoice, the taxes collected or withheld, the jurisdiction involved, and applicable law.',
          'Client must provide reasonable information and cooperation needed to process tax adjustments, credit notes, or documentation. Nothing in this Policy requires Operava to refund taxes, withholding amounts, or charges that Operava did not receive or cannot lawfully recover, except to the extent required by applicable law.',
        ],
      },
      {
        id: 'section-28',
        num: '28',
        title: 'Refund Request Procedure',
        subsections: [
          {
            subNum: '28.1',
            subTitle: 'How to Submit a Request',
            paragraphs: ['Client must submit a Refund request through:'],
            items: [
              '(a) email to our customer service team: cs@operavaglobal.com;',
              '(b) the applicable Client portal at www.operavaglobal.com; or',
              '(c) another refund channel that Operava confirms in writing.',
            ],
          },
          {
            subNum: '28.2',
            subTitle: 'Required Information',
            paragraphs: ['To allow Operava to investigate, Client should provide:'],
            items: [
              '(a) Client’s full name or legal company name;',
              '(b) the name and contact details of the authorized representative, if Client is a Business Client;',
              '(c) email address and telephone number;',
              '(d) invoice number, transaction number, account number, order number, or other relevant reference;',
              '(e) date of Payment, amount paid, currency, and payment method;',
              '(f) the Service, Subscription, Product, Project, Deliverable, or invoice to which the request relates;',
              '(g) a clear explanation of the reason for the request and the remedy sought;',
              '(h) relevant supporting documents, screenshots, logs, communications, service tickets, proof of Payment, or other evidence reasonably available to Client; and',
              '(i) Client’s preferred refund method, where applicable.',
            ],
          },
          {
            subNum: '28.3',
            subTitle: 'Timing',
            paragraphs: [
              'Client should submit a Refund request within thirty (30) days after becoming aware of the relevant issue. This is an Operava administrative timeframe intended to support prompt investigation and is not intended to limit a longer period that applicable law or the Agreement requires or permits.',
            ],
          },
          {
            subNum: '28.4',
            subTitle: 'Cooperation',
            paragraphs: [
              'Client must provide accurate information and reasonably cooperate with Operava’s investigation. Failure to provide reasonably requested information may delay or affect Operava’s ability to assess the request, but will not be used to defeat a mandatory legal right.',
            ],
          },
        ],
      },
      {
        id: 'section-29',
        num: '29',
        title: 'Refund Review and Investigation',
        intro: ['Operava will use reasonable efforts to follow the process below:'],
        items: [
          '(a) receive and record the Refund request;',
          '(b) acknowledge receipt within a reasonable period;',
          '(c) verify Payment, account ownership, authority, and transaction details;',
          '(d) review the Agreement, applicable Service terms, invoice, statement of work, and relevant policies;',
          '(e) review Service delivery records, work performed, Milestones, Deliverables, usage records, time records, staffing records, support tickets, and other relevant evidence;',
          '(f) assess Client’s supporting information and the cause of the issue;',
          '(g) determine whether a mandatory legal remedy, contractual remedy, discretionary remedy, Service Credit, reperformance, correction, or Refund may apply;',
          '(h) notify Client of the decision and the basis for it within a reasonable period; and',
          '(i) process any approved Refund, credit, adjustment, or other remedy.',
        ],
        trailing: [
          'Operava aims to issue a decision within thirty (30) business days after receiving all information reasonably necessary to assess the request. This is a business target, not a statutory deadline, and complex matters may require additional time. Operava will provide reasonable status updates where a review is delayed.',
        ],
      },
      {
        id: 'section-30',
        num: '30',
        title: 'Refund Determination',
        intro: ['Operava will determine Refund requests fairly and in good faith based on:'],
        items: [
          '(a) applicable law and any mandatory Client rights;',
          '(b) the Agreement and applicable document hierarchy;',
          '(c) whether a Payment was authorized, duplicated, or incorrect;',
          '(d) whether Services commenced and the extent to which they were properly performed;',
          '(e) the value of completed work, Services, Milestones, Deliverables, usage, and benefits received;',
          '(f) the existence and nature of any Defect or Service Deficiency;',
          '(g) whether Operava had a reasonable opportunity to investigate, correct, reperform, or otherwise remedy the issue where appropriate;',
          '(h) Client-caused issues, delays, changes, omissions, or breaches;',
          '(i) properly authorized Third-Party costs and whether those costs are recoverable;',
          '(j) applicable tax, payment-processing, and currency matters; and',
          '(k) other facts reasonably relevant to the request.',
        ],
      },
      {
        id: 'section-31',
        num: '31',
        title: 'Refund Calculation',
        subsections: [
          {
            subNum: '31.1',
            subTitle: 'General Methodology',
            paragraphs: [
              'Where a Refund is appropriate, Operava will calculate it consistently with applicable law, the Agreement, and the value of Services and benefits received.',
              'For Project Services, the following formula may be used as an illustrative guide:',
            ],
            formula:
              'Refundable Amount = Amount Actually Paid − Value of Services Properly Performed − Properly Authorized and Non-Recoverable Third-Party Costs − Other Lawful Contractual Charges',
            highlightNote:
              'This formula is illustrative only. It will not be applied in a way that conflicts with mandatory law, the Agreement, or a specific remedy to which Client is entitled.',
          },
          {
            subNum: '31.2',
            subTitle: 'Completed Milestones',
            paragraphs: [
              'The value of a completed Milestone may be determined by the amount allocated to that Milestone in the Agreement, the work completed, Client acceptance, delivery records, time records, or another reasonable valuation method.',
            ],
          },
          {
            subNum: '31.3',
            subTitle: 'Hourly and Time-and-Materials Services',
            paragraphs: [
              'For hourly, daily, time-and-materials, or usage-based Services, Operava may deduct fees for time properly worked, Services properly delivered, and usage properly consumed before the effective Cancellation or termination date.',
            ],
          },
          {
            subNum: '31.4',
            subTitle: 'Prepaid Recurring Services',
            paragraphs: [
              'For prepaid recurring Services, Operava may calculate an unused balance based on the remaining Service Period after deducting Services properly provided, committed costs, applicable notice-period fees, minimum commitments, and other lawful charges.',
            ],
          },
          {
            subNum: '31.5',
            subTitle: 'No Double Recovery',
            paragraphs: [
              'Client may not receive duplicate recovery for the same issue through a Refund, Service Credit, Chargeback, insurance payment, third-party recovery, or another remedy. Operava may offset any approved Refund against undisputed overdue amounts owed by Client, to the extent permitted by applicable law and the Agreement.',
            ],
          },
        ],
      },
      {
        id: 'section-32',
        num: '32',
        title: 'Refund Processing',
        intro: [
          'If Operava approves a Refund, Operava will use reasonable efforts to process it within fifteen (15) business days after the Refund amount, payment method, and any required verification have been finalized. This is an internal service target and may be affected by banking, payment-provider, identity-verification, tax-documentation, currency, or cross-border processing requirements.',
          'Operava may process an approved Refund by:',
        ],
        items: [
          '(a) crediting the original payment method;',
          '(b) issuing an account credit or Service Credit, where legally permissible and agreed or appropriate;',
          '(c) applying the approved amount against outstanding undisputed invoices; or',
          '(d) using another lawful payment method agreed by Operava and Client.',
        ],
        trailing: [
          'The time for funds to appear in Client’s account may depend on the relevant bank, card issuer, payment gateway, electronic wallet provider, intermediary bank, and payment network.',
        ],
      },
      {
        id: 'section-33',
        num: '33',
        title: 'Chargebacks and Payment Disputes',
        subsections: [
          {
            subNum: '33.1',
            subTitle: 'Contact Operava First',
            paragraphs: [
              'Where reasonably practicable, Client should contact Operava before initiating a Chargeback, payment reversal, or payment-provider dispute so that Operava can investigate and correct legitimate billing errors promptly.',
              'This request does not limit Client’s right to use any payment-provider process, statutory right, consumer remedy, or legal remedy available under applicable law.',
            ],
          },
          {
            subNum: '33.2',
            subTitle: 'Unauthorized and Fraudulent Transactions',
            paragraphs: [
              'Client should promptly report any suspected unauthorized or fraudulent transaction to Operava and the relevant bank, card issuer, payment provider, or electronic wallet provider. Operava may require reasonable verification to protect Client, Operava, and payment systems from fraud.',
            ],
          },
          {
            subNum: '33.3',
            subTitle: 'Duplicate Charges and Billing Errors',
            paragraphs: [
              'Operava will investigate reported duplicate charges, billing errors, incorrect recurring charges, or unauthorized transactions and will correct verified errors through a Refund, reversal, credit, or other appropriate remedy.',
            ],
          },
          {
            subNum: '33.4',
            subTitle: 'Disputed Amounts',
            paragraphs: [
              'Client must continue to pay undisputed amounts when due, unless applicable law provides otherwise. Client and Operava will use reasonable efforts to resolve disputes in good faith.',
            ],
          },
          {
            subNum: '33.5',
            subTitle: 'Abusive Chargebacks',
            paragraphs: [
              'A Chargeback may be considered abusive if Client knowingly disputes a valid charge after receiving the agreed Services or Deliverables, submits false information, seeks a duplicate recovery after receiving a Refund or credit, or otherwise misuses a payment dispute process. Operava may respond to an abusive Chargeback by providing relevant records to the payment provider and exercising its contractual or legal remedies, subject to applicable law.',
            ],
          },
        ],
      },
      {
        id: 'section-34',
        num: '34',
        title: 'Fraudulent or Abusive Refund Claims',
        paragraphs: [
          'Operava may investigate and take reasonable action in response to suspected fraudulent, false, abusive, repetitive, or bad-faith Refund claims, including claims supported by falsified evidence, intentional misuse of Services, unauthorized access, payment fraud, account abuse, or attempts to obtain duplicate recovery.',
          'Subject to applicable law and the Agreement, Operava may suspend access, restrict transactions, require additional verification, deny a claim that is demonstrably fraudulent or abusive, report suspected fraud to appropriate authorities or payment providers, and pursue lawful recovery of amounts wrongfully obtained.',
          'Operava will not treat a good-faith complaint, legitimate payment dispute, or lawful exercise of Consumer rights as fraudulent or abusive merely because Client requests a Refund or disagrees with Operava’s decision.',
        ],
      },
      {
        id: 'section-35',
        num: '35',
        title: 'Service Interruptions',
        paragraphs: [
          'Service interruptions, outages, downtime, latency, degraded performance, maintenance events, and support delays will be assessed under the applicable Agreement and Service Level Agreement, if any.',
          'Where a Service Level Agreement applies, the stated service credits or remedies may apply, subject to mandatory law and the specific terms of that Agreement. Where no Service Level Agreement applies, Operava will assess the circumstances, duration, impact, cause, available mitigation, and any applicable legal or contractual remedy.',
          'Planned maintenance, emergency maintenance, security measures, Client-caused issues, Third-Party Service failures, and Force Majeure events may affect eligibility for a Refund or Service Credit, but do not automatically eliminate mandatory legal rights.',
        ],
      },
      {
        id: 'section-36',
        num: '36',
        title: 'Force Majeure',
        paragraphs: [
          'Neither Operava nor Client will be responsible for delay or failure to perform to the extent caused by Force Majeure, subject to the applicable Agreement and applicable law.',
          'The affected party must use reasonable efforts to mitigate the impact of the Force Majeure event and resume performance when reasonably practicable.',
          'Force Majeure does not automatically eliminate all payment obligations, refund rights, termination rights, statutory remedies, or other legal consequences. The parties’ rights will depend on the Agreement, the duration and impact of the event, and applicable law.',
        ],
      },
      {
        id: 'section-37',
        num: '37',
        title: 'International Clients',
        intro: [
          'Operava serves Clients located in the Philippines and other jurisdictions. This Policy is designed principally with Philippine law in mind, but mandatory consumer-protection, payment, tax, privacy, or other laws of a Client’s location may apply where legally required.',
          'For international transactions:',
        ],
        items: [
          '(a) the governing law and dispute-resolution provisions in the applicable Agreement will generally apply, subject to mandatory law;',
          '(b) currency conversion, payment-provider rules, intermediary-bank charges, foreign taxes, and cross-border processing requirements may affect the timing and amount of a Refund;',
          '(c) Client remains responsible for complying with laws applicable to its use of the Services; and',
          '(d) nothing in this Policy is intended to exclude mandatory rights that cannot lawfully be excluded in the relevant jurisdiction.',
        ],
      },
      {
        id: 'section-38',
        num: '38',
        title: 'Data Privacy',
        paragraphs: [
          'Operava may collect, use, store, verify, and disclose personal information and payment-related information as reasonably necessary to receive, investigate, process, document, defend, or prevent fraud in connection with Refund requests, payment disputes, Chargebacks, and related matters.',
          'Operava may share relevant information with payment processors, banks, card networks, electronic wallet providers, affiliates, professional advisers, service providers, regulators, law-enforcement authorities, and other parties where permitted or required by applicable law and reasonably necessary for the relevant purpose.',
          'Operava will handle personal data in accordance with applicable data-protection law, including the Data Privacy Act of 2012 where applicable, and Operava’s Privacy Policy available at https://www.operavaglobal.com/privacy. Client should not send passwords, full payment-card details, authentication codes, or other sensitive credentials through unsecured support channels.',
        ],
      },
      {
        id: 'section-39',
        num: '39',
        title: 'Intellectual Property',
        paragraphs: [
          'Refund processing, Cancellation, termination, or a payment dispute does not by itself change ownership, license, assignment, access, return, deletion, revocation, or other intellectual-property rights relating to source code, designs, documentation, Deliverables, software, Digital Products, Client materials, or Operava materials.',
          'Those matters are governed by the applicable Agreement, including any conditions relating to full payment, acceptance, confidentiality, license scope, assignment, return of property, suspension, and termination.',
          'Unless the Agreement provides otherwise or applicable law requires otherwise, Client may not use, reproduce, distribute, disclose, or exploit Operava materials beyond the rights expressly granted to Client.',
        ],
      },
      {
        id: 'section-40',
        num: '40',
        title: 'Confidentiality and Security',
        paragraphs: [
          'The submission, review, approval, denial, or processing of a Refund request does not waive any confidentiality, data-security, intellectual-property, trade-secret, privacy, payment-security, or other contractual or legal obligation.',
          'Each party must continue to protect the other party’s confidential information and personal data in accordance with the Agreement and applicable law. Operava may require appropriate identity and authority verification before discussing account, payment, project, staffing, or Service information with a requester.',
        ],
      },
      {
        id: 'section-41',
        num: '41',
        title: 'Limitation of Liability',
        paragraphs: [
          'To the maximum extent permitted by applicable law, any limitation of liability, exclusion of damages, service-credit cap, refund cap, or remedy limitation relating to the Services will be governed by the applicable Agreement.',
          'Where no Agreement contains a specific limitation, Operava’s liability in connection with a Refund request will remain subject to applicable law and will not exceed amounts that cannot lawfully be limited or excluded.',
          'Nothing in this Policy excludes or limits liability for fraud, intentional misconduct, liability that cannot lawfully be excluded or limited, or any mandatory Consumer right or remedy.',
        ],
      },
      {
        id: 'section-42',
        num: '42',
        title: 'Complaints and Escalation',
        subsections: [
          {
            subNum: '42.1',
            subTitle: 'Level 1: Customer Support or Account Representative',
            paragraphs: [
              'Client should first contact Operava’s customer support team or account representative through:',
              'Support Email: cs@operavaglobal.com',
              'Support Portal: https://support.operavaglobal.com',
              'Client should provide the relevant invoice, transaction, account, Project, ticket, or Refund reference number.',
            ],
          },
          {
            subNum: '42.2',
            subTitle: 'Level 2: Management Review',
            paragraphs: [
              'If Client is dissatisfied with the initial response, Client may request a management review by writing to:',
              'cs-escalation2@operavaglobal.com',
              'Operava will review the complaint and provide a written outcome or status update within a reasonable period.',
            ],
          },
          {
            subNum: '42.3',
            subTitle: 'Level 3: Formal Dispute Resolution',
            paragraphs: [
              'If a dispute remains unresolved, either party may pursue the dispute-resolution process set out in the applicable Agreement, including good-faith negotiation, mediation, arbitration where validly agreed and legally permissible, or court proceedings where appropriate.',
              'Consumers may also have rights to seek assistance from relevant Philippine government agencies or other competent authorities, including the Department of Trade and Industry where applicable, without prejudice to other remedies available under law.',
            ],
          },
        ],
      },
      {
        id: 'section-43',
        num: '43',
        title: 'Dispute Resolution',
        paragraphs: [
          'Before commencing formal proceedings, the parties should use reasonable good-faith efforts to resolve a dispute through customer support, account management, management escalation, and direct negotiation.',
          'Where appropriate and agreed by the parties, the dispute may be referred to mediation. Arbitration will apply only where it is expressly agreed in a valid Agreement and is legally enforceable in the circumstances.',
          'Nothing in this Policy prevents a party from seeking urgent interim relief, pursuing a mandatory statutory remedy, reporting a matter to a competent regulator or authority, or commencing court proceedings where negotiation, mediation, or arbitration is unavailable, ineffective, unlawful, or inappropriate.',
        ],
      },
      {
        id: 'section-44',
        num: '44',
        title: 'Governing Law',
        paragraphs: [
          'This Policy is primarily governed by and construed in accordance with the laws of the Republic of the Philippines, without prejudice to mandatory laws that apply to a particular Client or transaction.',
          'If the applicable Agreement contains a governing-law or jurisdiction provision, that provision will apply to the extent permitted by applicable law. Nothing in this Policy is intended to override mandatory consumer-protection rights or mandatory forum rights that apply under the law of the relevant jurisdiction.',
        ],
      },
      {
        id: 'section-45',
        num: '45',
        title: 'Policy Amendments',
        paragraphs: [
          'Operava may amend this Policy from time to time to reflect changes in its Services, operations, payment methods, legal requirements, or business practices.',
          'Operava will publish the updated Policy on its website at www.operavaglobal.com/refundpolicy or otherwise make it available through applicable Service channels. The revised Policy will apply from its stated Effective Date.',
          'No amendment will retroactively remove or reduce a Refund right that accrued before the revised Policy’s Effective Date, unless applicable law permits and Client expressly agrees otherwise.',
        ],
      },
      {
        id: 'section-46',
        num: '46',
        title: 'Relationship With Other Policies and Agreements',
        intro: ['This Policy should be read together with, where applicable:'],
        items: [
          '(a) Terms and Conditions;',
          '(b) Privacy Policy;',
          '(c) Cookie Policy;',
          '(d) Master Service Agreement;',
          '(e) Service Agreement;',
          '(f) Statement of Work;',
          '(g) Service Level Agreement;',
          '(h) SaaS Terms;',
          '(i) Staffing Agreement;',
          '(j) Acceptable Use Policy;',
          '(k) Payment Terms; and',
          '(d) Data Processing Agreement.',
        ],
        trailing: [
          'The applicable Agreement may contain more specific terms concerning cancellation, payment, refunds, service credits, acceptance, service levels, intellectual property, confidentiality, security, dispute resolution, and liability. Those specific terms will prevail in accordance with Section 6, subject to mandatory law.',
        ],
      },
      {
        id: 'section-47',
        num: '47',
        title: 'Contact Information',
        paragraphs: [
          'For Refund requests, account concerns, or questions about this Policy, contact:',
        ],
        contactCard: {
          company: 'OPERAVA GLOBAL SOLUTIONS',
          supportEmail: 'cs@operavaglobal.com',
          website: 'www.operavaglobal.com',
          policyUrl: 'www.operavaglobal.com/refundpolicy',
        },
      },
      {
        id: 'section-48',
        num: '48',
        title: 'Effective Date and Version Control',
        paragraphs: [
          'This Policy takes effect on the Effective Date stated at the beginning of this document.',
          'Operava may maintain prior versions of this Policy for recordkeeping, contractual, audit, and compliance purposes. The version applicable to a particular transaction will generally be the version made available to Client at the time of purchase, acceptance, renewal, or incorporation into the applicable Agreement, subject to mandatory law and any contrary written Agreement.',
        ],
      },
      {
        id: 'section-49',
        num: '49',
        title: 'Client Acknowledgment',
        paragraphs: [
          'By purchasing, subscribing to, accessing, using, accepting, or continuing to use the Services, Client acknowledges that Client has had an opportunity to review this Policy and agrees that it forms part of the applicable contractual terms to the extent permitted by law.',
          'If Client does not agree with this Policy, Client should not proceed with a purchase, Subscription, or new Service order. This acknowledgment does not waive any right or remedy that cannot lawfully be waived.',
        ],
      },
    ],
    []
  )

  const categories = [
    { id: 'all', label: 'All 49 Sections' },
    { id: 'general', label: 'Principles & Scope (1-10)', range: [1, 10] },
    { id: 'services', label: 'Service-Specific Policies (11-20)', range: [11, 20] },
    { id: 'procedure', label: 'Claims & Calculations (21-34)', range: [21, 34] },
    { id: 'governance', label: 'Legal & Escalations (35-49)', range: [35, 49] },
  ]

  const filteredSections = useMemo(() => {
    return sections.filter((s) => {
      const numVal = parseInt(s.num, 10)
      if (activeCategory !== 'all') {
        const cat = categories.find((c) => c.id === activeCategory)
        if (cat?.range && (numVal < cat.range[0] || numVal > cat.range[1])) {
          return false
        }
      }

      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      if (s.title.toLowerCase().includes(q)) return true
      if (s.num.includes(q)) return true
      if (s.paragraphs?.some((p) => p.toLowerCase().includes(q))) return true
      if (s.items?.some((i) => i.toLowerCase().includes(q))) return true
      if (s.intro?.some((i) => i.toLowerCase().includes(q))) return true
      if (s.trailing?.some((t) => t.toLowerCase().includes(q))) return true
      if (
        s.subsections?.some(
          (sub) =>
            sub.subTitle.toLowerCase().includes(q) ||
            sub.paragraphs?.some((p) => p.toLowerCase().includes(q)) ||
            sub.items?.some((i) => i.toLowerCase().includes(q))
        )
      )
        return true

      return false
    })
  }, [sections, activeCategory, searchQuery])

  const handlePrint = () => {
    window.print()
  }

  return (
    <main id="refund-policy-page" className="min-h-screen bg-slate-50 text-gray-900 pb-20">
      {/* ── HEADER BANNER ── */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-slate-900 via-violet-950 to-slate-900 text-white overflow-hidden">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-violet-300 mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-400">Legal Documentation</span>
            <span>/</span>
            <span className="text-violet-200">Refund Policy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Refund Policy
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-6">
            Authoritative refund rules, cancellation conditions, service credit allocations, billing error remedies, and resolution frameworks for Operava Global Solutions.
          </p>

          {/* Metadata pill container */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs text-xs text-slate-300">
            <div>
              <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Entity</span>
              <span className="font-semibold text-white">Operava Global Solutions</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Effective Date</span>
              <span className="font-semibold text-white">August 25, 2026</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Last Updated</span>
              <span className="font-semibold text-white">August 25, 2026</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Jurisdiction</span>
              <span className="font-semibold text-white">Republic of the Philippines</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTROLS & FILTER BAR ── */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 shadow-xs">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in policy (e.g. SaaS, SLA, Milestone)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white text-gray-900 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-violet-700 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <button
              onClick={handlePrint}
              title="Print Policy Document"
              className="p-1.5 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg shrink-0 transition-colors ml-1"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ACCORDION / SECTIONS ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-10">
        {filteredSections.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
            <AlertCircle className="w-10 h-10 text-violet-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No matching sections found</h3>
            <p className="text-sm text-gray-500 mb-4">
              We couldn’t find any refund clauses matching “{searchQuery}”.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="px-4 py-2 bg-violet-700 text-white rounded-lg text-xs font-semibold hover:bg-violet-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-xs transition-shadow hover:shadow-md"
              >
                {/* Section Header */}
                <div className="flex items-start gap-4 pb-4 mb-6 border-b border-gray-100">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-100 text-violet-800 font-black text-sm shrink-0 mt-0.5">
                    {section.num}
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                      {section.num}. {section.title}
                    </h2>
                  </div>
                </div>

                {/* Introductory Paragraphs if any */}
                {section.intro && (
                  <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                    {section.intro.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Top-level Paragraphs if any */}
                {section.paragraphs && (
                  <div className="space-y-3.5 text-gray-700 text-sm sm:text-base leading-relaxed">
                    {section.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Subsections if any */}
                {section.subsections && (
                  <div className="space-y-6 mt-4">
                    {section.subsections.map((sub, idx) => (
                      <div
                        key={idx}
                        className="pl-3 sm:pl-4 border-l-2 border-violet-200 space-y-2.5 py-1"
                      >
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                          {sub.subNum ? `${sub.subNum} ` : ''}
                          {sub.subTitle}
                        </h3>

                        {sub.paragraphs && (
                          <div className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
                            {sub.paragraphs.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        )}

                        {/* Subsection items */}
                        {sub.items && (
                          <ul className="space-y-2 pl-2 text-sm sm:text-base text-gray-700 mt-2">
                            {sub.items.map((it, itIdx) => (
                              <li key={itIdx} className="flex items-start gap-2.5">
                                <span className="text-violet-600 font-bold text-base leading-tight mt-0.5">
                                  •
                                </span>
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Subsection formula box */}
                        {sub.formula && (
                          <div className="mt-3 p-4 rounded-xl bg-violet-50 border border-violet-200 text-violet-950">
                            <div className="flex items-center gap-2 mb-2">
                              <Calculator className="w-4 h-4 text-violet-700" />
                              <span className="text-xs font-bold uppercase tracking-wider text-violet-800">
                                Illustrative Refund Formula
                              </span>
                            </div>
                            <div className="font-mono text-xs sm:text-sm font-semibold p-3 bg-white rounded-lg border border-violet-100 shadow-2xs text-violet-900 break-words">
                              {sub.formula}
                            </div>
                            {sub.highlightNote && (
                              <p className="text-xs text-violet-700 mt-2 leading-relaxed">
                                {sub.highlightNote}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Top-level List Items (letters or bullets) */}
                {section.items && (
                  <ul className="mt-4 mb-4 space-y-2 pl-2 text-sm sm:text-base text-gray-700">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-violet-600 font-bold text-base leading-tight mt-0.5 shrink-0">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Trailing Paragraphs */}
                {section.trailing && (
                  <div className="mt-4 space-y-2.5 text-gray-700 text-sm sm:text-base leading-relaxed">
                    {section.trailing.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Contact Card for Section 47 & 42 */}
                {section.contactCard && (
                  <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 text-violet-950">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-violet-600 text-white rounded-xl shadow-xs">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">
                          {section.contactCard.company}
                        </h4>
                        <p className="text-xs text-violet-700">
                          Official Refund & Customer Support Channels
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="p-3.5 bg-white rounded-xl border border-violet-100 shadow-2xs">
                        <span className="block text-gray-500 text-[11px] uppercase tracking-wider mb-1">
                          Primary Support & Claims
                        </span>
                        <a
                          href={`mailto:${section.contactCard.supportEmail}`}
                          className="font-bold text-violet-700 hover:text-violet-900 inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-4 h-4" />
                          {section.contactCard.supportEmail}
                        </a>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-violet-100 shadow-2xs">
                        <span className="block text-gray-500 text-[11px] uppercase tracking-wider mb-1">
                          Official Web Portal
                        </span>
                        <a
                          href="https://www.operavaglobal.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-violet-700 hover:text-violet-900 inline-flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {section.contactCard.website}
                        </a>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-violet-100 shadow-2xs sm:col-span-2">
                        <span className="block text-gray-500 text-[11px] uppercase tracking-wider mb-1">
                          Level 2 Escalation (Management Review)
                        </span>
                        <a
                          href="mailto:cs-escalation2@operavaglobal.com"
                          className="font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-4 h-4" />
                          cs-escalation2@operavaglobal.com
                        </a>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Use for secondary management review if initial Level 1 support response does not resolve your concern.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {/* ── BRAND FOOTER BANNER ── */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-violet-950 via-slate-900 to-purple-950 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-violet-400 mb-2">
              OPERAVA GLOBAL SOLUTIONS
            </p>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              OPERAVA — OPERATING IN ADVANCE.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Philippine-Based Corporation Providing Workforce, Information Technology, and Business Process Outsourcing Services.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
              <a
                href="mailto:cs@operavaglobal.com"
                className="px-5 py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                Submit Refund Inquiry
              </a>
              <Link
                to="/terms"
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
