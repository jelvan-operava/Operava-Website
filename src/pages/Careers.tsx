import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Briefcase,
  MapPin,
  Sparkles,
  Users,
  Building2,
  HeartHandshake,
  ArrowRight,
  Cpu,
  Headphones,
  FileSpreadsheet,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'
import CareerCard from '../components/CareerCard'
import {
  CAREER_OPENINGS,
  type CareerPosition,
} from '../data/careersData'

export default function Careers() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const [selectedTrack, setSelectedTrack] = useState<string>('all')
  const [selectedRole, setSelectedRole] = useState<string>(
    searchParams.get('role') || 'OPERAVA Technology Executive'
  )

  useEffect(() => {
    const role = searchParams.get('role')
    if (role) {
      setSelectedRole(role)
      const target = document.getElementById('application-form')
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    }
  }, [searchParams])

  const cultureImages = [
    { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80', caption: 'Collaborative Engineering Sprints', tag: 'Engineering' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80', caption: 'Customer Success & Leadership Desks', tag: 'Operations' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80', caption: 'Modern Hybrid Office & Tech Facilities', tag: 'Workplace' },
    { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80', caption: 'Continuous Upskilling & Mentorship Programs', tag: 'Growth' },
  ]

  const executiveTracks = [
    {
      id: 'tech-exec',
      code: 'tech',
      title: 'OPERAVA Technology Executive' as CareerPosition,
      shortTitle: 'Technology Executive',
      icon: Cpu,
      image: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto/v1787278539/software.webp',
      summary: 'May be assigned to specific related tasks on available posts or based on your skills in software engineering, web/mobile development, cloud systems, or technical infrastructure.',
      assignments: [
        'Full-Stack Web & Mobile Software Development',
        'Cloud Infrastructure, DevOps & Architecture (AWS, GCP, Azure)',
        'Backend Microservices & API Engineering',
        'Database Architecture & Administration',
        'QA Engineering, Testing & Systems Security',
      ],
    },
    {
      id: 'ops-exec',
      code: 'ops',
      title: 'OPERAVA Business Operations Executive' as CareerPosition,
      shortTitle: 'Business Operations Executive',
      icon: FileSpreadsheet,
      image: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto/v1787258203/backoffice.webp',
      summary: 'May be assigned to specific related tasks on available posts or based on your skills in HR, accounting and finance, recruitment, training and development, or business operations.',
      assignments: [
        'Human Resources (HR) Operations & People Care',
        'Accounting, Bookkeeping & Financial Reporting',
        'Talent Acquisition, Recruitment & Sourcing',
        'Training, Upskilling & Professional Development',
        'Audited Data Processing, Records & Workflow Administration',
      ],
    },
    {
      id: 'cx-exec',
      code: 'cx',
      title: 'OPERAVA Customer Experience Executive' as CareerPosition,
      shortTitle: 'Customer Experience Executive',
      icon: Headphones,
      image: 'https://res.cloudinary.com/sdaxzncs/image/upload/f_auto,q_auto/v1787256801/customer_service.webp',
      summary: 'May be assigned to specific related tasks on available posts or based on your skills in customer care, technical help desk, omnichannel communication, or client account management.',
      assignments: [
        'Omnichannel Support (Live Chat, Email & Ticket Resolution)',
        'High-Touch Inbound & Outbound Voice Communications',
        'Technical Help Desk & Incident Triage (Tier 1 & Tier 2)',
        'Customer Success, Onboarding & Client Retention',
        'Escalation Management, CSAT Monitoring & Quality Assurance',
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

  const roles = CAREER_OPENINGS

  const filteredRoles = selectedTrack === 'all' ? roles : roles.filter((role) => role.code === selectedTrack)

  const perks = [
    { title: t('careers.perk1.title', 'Remote Work'), desc: t('careers.perk1.desc', 'Work from home or access our modern collaboration hubs across the Philippines.'), icon: Users },
    { title: t('careers.perk2.title', 'Accelerated Growth & Upskilling'), desc: t('careers.perk2.desc', 'Dedicated budget for certifications, cloud accreditations, and technical mentorship.'), icon: Sparkles },
    { title: t('careers.perk3.title', 'Comprehensive Healthcare & HMO'), desc: t('careers.perk3.desc', 'Top-tier medical coverage from Day 1 including dependent coverage and wellness benefits.'), icon: HeartHandshake },
    { title: t('careers.perk4.title', 'Modern Hardware & Tooling Allowance'), desc: t('careers.perk4.desc', 'Company-issued laptops, ergonomic workstation allowances, and modern dev stacks.'), icon: Building2 },
    { title: t('careers.perk5.title', 'Competitive Global Pay'), desc: t('careers.perk5.desc', 'Market-leading salaries, performance bonuses, night differentials, and 13th month pay.'), icon: Briefcase },
    { title: t('careers.perk6.title', 'Global Exposure & Impact'), desc: t('careers.perk6.desc', 'Work directly with international clients across North America, Europe, and Asia-Pacific.'), icon: MapPin },
  ]

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle)
    const target = document.getElementById('application-form')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80" alt="OPERAVA Global Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              {t('careers.title', 'Build your career. Operate in advance.')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl font-normal">
              {t('careers.desc', 'Join a global team delivering mission-critical IT infrastructure, advanced software systems, and high-performance BPO operations worldwide.')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-slate-50 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              Open Executive Careers
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              OPERAVA offers career positions across three core executive tracks. Candidates may be assigned to specific related tasks on available posts or based on your skills, demonstrated competencies, and chosen specialization.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {executiveTracks.map((exec, idx) => (
              <CareerCard
                key={exec.id}
                career={exec}
                variant="portrait"
                index={idx}
                onSelectTrack={(code) => {
                  setSelectedTrack(code)
                  document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            ))}
          </div>
          <div className="operava-landscape-card-frame relative rounded-3xl p-6 sm:p-8 overflow-hidden">
            <img
              src="https://res.cloudinary.com/b5i5bwwa/image/upload/v1788593069/Shell_card.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 rounded-[24px]"
              loading="lazy"
            />
            <div className="relative z-10 text-white space-y-3 leading-relaxed">
              <h4 className="text-base font-bold text-white">Task Assignments &amp; Position Governance</h4>
              <p className="text-sm text-[#e2dbff]">Candidates and employees may be assigned to specific related tasks on available posts or based on their skills, qualifications, client specifications, assessments, and chosen specialization track.</p>
              <div className="pt-2">
                <Link to="/terms#section-5" className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-200 hover:text-white underline transition-colors">
                  <span>Read full Terms Section 5</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Where Talent Meets World-Class Execution</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureImages.map((img, idx) => (
              <div key={idx} className="group relative h-64 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-violet-600/90 text-white text-[10px] font-bold uppercase tracking-wider mb-1">{img.tag}</span>
                  <p className="text-white text-sm font-semibold leading-snug">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
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

      <section id="openings" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{t('careers.openingsTitle', 'Current Openings')}</h2>
            </div>
            <div className="text-sm text-gray-500"><span className="font-bold text-violet-700">{filteredRoles.length} Active Positions</span> · Global &amp; Philippines Applicants Welcome</div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${selectedTrack === 'all' ? 'bg-violet-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All Available Positions ({roles.length})
            </button>
            <button
              onClick={() => setSelectedTrack('tech')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${selectedTrack === 'tech' ? 'bg-violet-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Technology Executive ({roles.filter((r) => r.code === 'tech').length})
            </button>
            <button
              onClick={() => setSelectedTrack('ops')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${selectedTrack === 'ops' ? 'bg-violet-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Business Operations Executive ({roles.filter((r) => r.code === 'ops').length})
            </button>
            <button
              onClick={() => setSelectedTrack('cx')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${selectedTrack === 'cx' ? 'bg-violet-700 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Customer Experience Executive ({roles.filter((r) => r.code === 'cx').length})
            </button>
          </div>
          <div className="grid gap-6">
            {filteredRoles.map((role, idx) => (
              <CareerCard
                key={role.id}
                career={role}
                variant="landscape"
                index={idx}
                onApply={handleApply}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{t('careers.whyTitle', 'Benefits Built for High Performers')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((item, idx) => {
              return (
                <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-violet-500/40 hover:bg-white/10 transition-all duration-200 group">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tight">Ready to Submit Your Application?</h2>
          <p className="text-base text-gray-500 mb-8 max-w-xl mx-auto">Select from our 3 available executive titles and specify your skills specialization in the application form below.</p>
          <button type="button" onClick={() => handleApply('OPERAVA Technology Executive')} className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-violet-700 rounded-2xl hover:bg-violet-800 active:scale-95 transition-all shadow-lg shadow-violet-700/25">
            <span>Start Application</span><ArrowRight className="w-4 h-4" />
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
            Prefer a dedicated page? Continue at <Link to={`/apply?role=${encodeURIComponent(selectedRole)}`} className="text-violet-700 font-semibold underline">/apply</Link>.
          </p>
        </div>
      </section>
    </main>
  )
}
