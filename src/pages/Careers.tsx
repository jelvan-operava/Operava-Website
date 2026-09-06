import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Wifi,
  Laptop,
  Headphones,
  Globe2,
  ShieldCheck,
  Home,
  Sparkles,
} from 'lucide-react'
import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'
import CareerCard from '../components/CareerCard'
import { type CareerPosition } from '../data/careersData'

export default function Careers() {
  const [searchParams] = useSearchParams()
  const [selectedRole, setSelectedRole] = useState<string>(
    searchParams.get('role') || 'OPERAVA Technology Executive'
  )
  const [openCardId, setOpenCardId] = useState<string | null>(null)

  useEffect(() => {
    const role = searchParams.get('role')
    if (role) {
      setSelectedRole(role)
      const target = document.getElementById('application-form')
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    }
  }, [searchParams])

  const executiveTracks = [
    {
      id: 'tech-exec',
      code: 'tech',
      title: 'OPERAVA Technology Executive' as CareerPosition,
      shortTitle: 'Technology Executive',
      image: 'https://res.cloudinary.com/b5i5bwwa/image/upload/OPERAVA_TECH_1000x1350_v3.webp',
      summary:
        'For builders, engineers, and technical problem-solvers. Work remotely on international projects in software engineering, web/mobile development, and cloud systems.',
      assignments: [
        'Full-Stack Web & Mobile Development',
        'Cloud Infrastructure, DevOps & Systems Architecture (AWS, GCP, Azure)',
        'Backend Engineering, Microservices & API Development',
        'Database Architecture & Administration',
        'QA Engineering, Testing & Cybersecurity',
      ],
      qualifications: [
        "Bachelor's Degree in IT, CS, Engineering or equivalent hands-on experience",
        'Hands-on experience in at least one: JavaScript/TypeScript, Python, PHP, Java, .NET, React Native, Flutter',
        'Knowledge of Git, REST APIs, databases (MySQL, PostgreSQL, MongoDB) and Agile workflow',
        'Familiarity with cloud (AWS/GCP/Azure) is a strong advantage',
        'Strong problem-solving and English communication skills',
        'Remote-Ready: Own PC/Laptop, stable internet (50 Mbps+), backup power/internet',
      ],
    },
    {
      id: 'ops-exec',
      code: 'ops',
      title: 'OPERAVA Business Operations Executive' as CareerPosition,
      shortTitle: 'Business Operations Executive',
      image: 'https://res.cloudinary.com/b5i5bwwa/image/upload/OPERAVA_OPS_1000x1350_v3.webp',
      summary:
        'For detail-driven operators and business enablers. Work remotely supporting HR, Finance, Recruitment, and business operations for global companies.',
      assignments: [
        'Remote HR Operations & People Care',
        'Remote Accounting, Bookkeeping & Financial Reporting',
        'Remote Talent Acquisition & Sourcing',
        'Remote Training & Professional Development Coordination',
        'Audited Data Processing & Workflow Administration',
      ],
      qualifications: [
        "Bachelor's Degree in Business, HR, Finance, Accountancy, or related field",
        '1+ year experience in HR, recruitment, bookkeeping, or admin. Strong fresh grads welcome.',
        'Proficient in Google Workspace / MS Excel, and tools like QuickBooks, Xero, HRIS, or ATS',
        'High attention to detail, data accuracy, and confidentiality',
        'Excellent organizational and English communication skills',
        'Remote-Ready: Own PC/Laptop, stable internet (50 Mbps+), quiet workspace',
      ],
    },
    {
      id: 'cx-exec',
      code: 'cx',
      title: 'OPERAVA Customer Experience Executive' as CareerPosition,
      shortTitle: 'Customer Experience Executive',
      image: 'https://res.cloudinary.com/b5i5bwwa/image/upload/OPERAVA_CX_1000x1350_v3.webp',
      summary:
        'For client-focused communicators and service leaders. Work remotely delivering world-class customer support for international brands.',
      assignments: [
        'Omnichannel Support (Live Chat, Email & Ticket Resolution) — Remote',
        'High-Touch Inbound & Outbound Voice Support — Remote',
        'Technical Helpdesk & Incident Triage (Tier 1 & 2) — Remote',
        'Customer Success, Onboarding & Client Retention — Remote',
        'Escalation Management & Quality Assurance — Remote',
      ],
      qualifications: [
        'At least 1 year in customer service, tech support, or client-facing BPO role',
        'Excellent English communication — fluent in chat, email, and phone with neutral accent',
        'Experience with Zendesk, Freshdesk, Intercom, Salesforce, or HubSpot',
        'Customer-centric, patient, and skilled in de-escalation and CSAT improvement',
        'Willing to work on US / shifting / night schedules from home',
        'Remote-Ready: Own PC/Laptop, stable internet (50 Mbps+), noise-canceling headset, quiet workspace, backup power',
      ],
    },
  ]

  const hiringStages = [
    { step: '01', title: 'Initial / AI-Assisted Evaluation', desc: 'Rapid interactive evaluation assessing candidate background, technical literacy, and communication profile.' },
    { step: '02', title: 'Skills & Specialization Assessment', desc: 'Hands-on practical tests tailored to software, customer support scenarios, or operational accuracy benchmarks.' },
    { step: '03', title: 'Talent Acquisition Interview', desc: 'In-depth discussion with OPERAVA talent specialists to align career goals and workforce competency tracks.' },
    { step: '04', title: 'Client Alignment Interview', desc: 'Direct match and interview with partner client leadership for dedicated project onboarding.' },
    { step: '05', title: 'Engagement Documentation', desc: 'Final selection, structured onboarding documentation, hardware provisioning, and project commencement.' },
  ]

  const whyRemote = [
    { title: '100% Work-From-Home', desc: 'Fully remote roles for Philippine-based talent serving international clients.', icon: Home },
    { title: 'Global Clients', desc: 'Work with organizations across North America, Europe, and Asia-Pacific.', icon: Globe2 },
    { title: 'Continuous Upskilling', desc: 'Mentorship, certifications, and collaborative engineering sprints.', icon: Sparkles },
    { title: 'Career Growth Path', desc: 'Performance-based growth with clear specialization tracks.', icon: ShieldCheck },
  ]

  const remoteRequirements = [
    'Philippine-based talent, authorized to work remotely',
    'Own equipment: Laptop/Desktop (i5 gen 8+ / M1+, 8GB RAM min), webcam, headset',
    'Stable internet connection (50 Mbps minimum) + backup connection/power',
    'Quiet, professional home office setup',
    'Strong English proficiency (B2–C1 level) and ability to work independently',
    'Willing to undergo assessments and client interviews via video call',
  ]

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle)
    const target = document.getElementById('application-form')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
            alt="OPERAVA Global Team"
            className="w-full h-full object-cover"
          />
          {/* Black overlay at ~30% transparency (70% opacity) */}
          <div className="absolute inset-0 bg-gray-950/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300 mb-4">100% Remote · Philippine Talent · Global Clients</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Build Your Career. Operate in Advance.
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl font-normal mb-4">
              Join a global team powering technology, operations, and business processes for organizations worldwide. All positions are 100% Remote.
            </p>
            <p className="text-base text-gray-400 leading-relaxed max-w-2xl">
              We hire top Filipino talent to work from home for international clients across Technology, Business Operations, and Customer Experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-slate-50 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              Open Remote Executive Career Tracks
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              Three core remote tracks. Tap the + on a card for core assignments, qualifications, and remote requirements. Final assignments follow verified skills, specialization, assessments, and client needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center md:justify-items-stretch">
            {executiveTracks.map((exec, idx) => (
              <CareerCard
                key={exec.id}
                career={exec}
                variant="portrait"
                index={idx}
                onApply={handleApply}
                isFlipped={openCardId === exec.id}
                onFlipChange={(next) => setOpenCardId(next ? exec.id : null)}
              />
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-500 max-w-3xl">
            All roles are fully remote. Final assignments are based on verified skills, specialization, assessment results, and client requirements.{' '}
            <Link to="/terms#section-5" className="text-violet-700 font-semibold underline">
              See Terms — Section 5
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Transparent 5-Stage Hiring Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {hiringStages.map((stage, i) => (
              <div
                key={stage.step}
                className="relative overflow-hidden rounded-2xl p-6 min-h-[220px] flex flex-col bg-transparent border-0 shadow-none"
              >
                <img
                  src="https://res.cloudinary.com/b5i5bwwa/image/upload/v1788594538/Shell_card3.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 rounded-2xl"
                  loading="lazy"
                />
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="text-2xl font-black text-white mb-3">{stage.step}</div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{stage.title}</h3>
                  <p className="text-xs text-[#e2dbff] leading-relaxed flex-1">{stage.desc}</p>
                  <div className="mt-4 pt-3 border-t border-white/15 text-[10px] font-semibold uppercase tracking-wider text-violet-200/80">
                    Stage {i + 1} of 5
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Why Work Remotely at OPERAVA?</h2>
            <p className="mt-3 text-sm text-gray-400">
              100% Work-From-Home · Global Clients · Continuous Upskilling & Mentorship · Collaborative Engineering Sprints · Career Growth Path · Performance-Based Growth
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyRemote.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:border-violet-500/40 hover:bg-white/10 transition-all duration-200">
                  <Icon className="w-6 h-6 text-violet-300 mb-3" />
                  <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Standard Remote Work Requirements</h2>
            <p className="text-base text-gray-600">Applies to all tracks.</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {remoteRequirements.map((req, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-gray-700 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5" /> Own equipment</span>
            <span className="inline-flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5" /> 50 Mbps+ internet</span>
            <span className="inline-flex items-center gap-1.5"><Headphones className="w-3.5 h-3.5" /> Headset & quiet space</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tight">Ready to Apply Remotely?</h2>
          <p className="text-base text-gray-500 mb-8 max-w-xl mx-auto">
            Choose a track, open the card for qualifications, then submit your application below.
          </p>
          <button
            type="button"
            onClick={() => handleApply('OPERAVA Technology Executive')}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-violet-700 rounded-2xl hover:bg-violet-800 active:scale-95 transition-all shadow-lg shadow-violet-700/25"
          >
            <span>Start Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section id="application-form" className="py-20 bg-slate-50 border-t border-gray-200 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Submit your application</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Email verification is required. After you verify, Talent and HR receive your application and you get a branded confirmation with a reference number.
              {selectedRole ? (
                <span className="block mt-2 font-semibold text-violet-800">Applying for: {selectedRole}</span>
              ) : null}
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <OperavaIntakeForm key={selectedRole} kind="CAREERS" defaultPosition={selectedRole} />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Prefer a dedicated page? Continue at{' '}
            <Link to={`/apply?role=${encodeURIComponent(selectedRole)}`} className="text-violet-700 font-semibold underline">
              /apply
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
