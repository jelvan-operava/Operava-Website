import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Users,
  Building2,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Send,
  Cpu,
  Headphones,
  FileSpreadsheet,
  Layers,
  Scale,
  ClipboardCheck,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'
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
    { title: t('careers.perk1.title', 'Flexible Remote Work'), desc: t('careers.perk1.desc', 'Work from home or access our modern collaboration hubs across the Philippines.'), icon: Users },
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-900/60 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {t('careers.badge', 'Join OPERAVA Global Team')}
            </div>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-100 text-violet-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" /><span>Workforce Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              3 Available Executive Careers
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              OPERAVA offers career positions across three core executive tracks. Candidates may be assigned to specific related tasks on available posts or based on your skills, demonstrated competencies, and chosen specialization.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {executiveTracks.map((exec) => {
              const Icon = exec.icon
              return (
                <div key={exec.id} className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-md hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="mb-6"><div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center border border-violet-100"><Icon className="w-6 h-6" /></div></div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-3">{exec.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">{exec.summary}</p>
                    <div className="border-t border-gray-100 pt-5 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Potential Tasks &amp; Focus Areas:</h4>
                      <ul className="space-y-2">
                        {exec.assignments.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-700"><CheckCircle2 className="w-3.5 h-3.5 text-violet-600 shrink-0 mt-0.5" /><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedTrack(exec.code); document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' }) }} className="w-full py-3 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-800 text-xs font-bold transition-colors inline-flex items-center justify-center gap-2">
                    <span>View {exec.shortTitle} Role</span><ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
          <div className="rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0"><Scale className="w-5 h-5" /></div>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <h4 className="text-base font-bold text-gray-900">Task Assignments &amp; Position Governance</h4>
                <p>Candidates and employees may be assigned to specific related tasks on available posts or based on their skills, qualifications, client specifications, assessments, and chosen specialization track.</p>
                <div className="pt-2"><Link to="/terms#section-5" className="inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900 underline"><span>Read full Terms Section 5</span><ArrowRight className="w-3 h-3" /></Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 block mb-2">Life at OPERAVA</span>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-100 text-violet-800 text-xs font-bold uppercase tracking-wider mb-2"><ClipboardCheck className="w-3.5 h-3.5" /><span>Assessment &amp; Selection</span></div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Transparent 5-Stage Hiring Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {hiringStages.map((stage, i) => (
              <div key={stage.step} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                <div className="text-2xl font-black text-violet-700 mb-3">{stage.step}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{stage.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{stage.desc}</p>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Stage {i + 1} of 5</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 block mb-2">Join Our Talent Roster</span>
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
            {filteredRoles.map((role) => (
              <div key={role.id} className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-100 hidden sm:block"><img src={role.image} alt={role.title} className="w-full h-full object-cover" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-700 transition-colors">{role.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-2xl my-2 leading-relaxed">{role.desc}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1 font-medium text-gray-500"><MapPin className="w-3.5 h-3.5 text-violet-600" />{role.location}</span><span>•</span>
                      <span className="flex items-center gap-1 font-medium text-gray-500"><Briefcase className="w-3.5 h-3.5 text-violet-600" />{role.type}</span><span>•</span>
                      <span className="flex items-center gap-1 font-medium text-gray-500"><Clock className="w-3.5 h-3.5 text-violet-600" />{role.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => handleApply(role.title)} className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-95 transition-all shadow-sm">
                    <Send className="w-3.5 h-3.5" /><span>Apply for this Role</span>
                  </button>
                  <Link to={`/apply?role=${encodeURIComponent(role.title)}`} className="inline-flex items-center px-4 py-3.5 text-xs font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Direct Link</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400 block mb-2">Why Join OPERAVA</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{t('careers.whyTitle', 'Benefits Built for High Performers')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-violet-500/40 hover:bg-white/10 transition-all duration-200 group">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-400/30 flex items-center justify-center mb-6 text-violet-300"><Icon className="w-6 h-6" /></div>
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
            <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-2">Careers</p>
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

