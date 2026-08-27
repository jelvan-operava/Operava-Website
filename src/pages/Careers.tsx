import { useState } from 'react'
import { Link } from 'react-router-dom'
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
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Careers() {
  const { t } = useLanguage()
  const [selectedTrack, setSelectedTrack] = useState<string>('all')
  const [appliedRole, setAppliedRole] = useState<string | null>(null)

  const cultureImages = [
    {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
      caption: 'Collaborative Engineering Sprints',
      tag: 'Engineering',
    },
    {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
      caption: 'Customer Success & Leadership Desks',
      tag: 'Operations',
    },
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
      caption: 'Modern Hybrid Office & Tech Facilities',
      tag: 'Workplace',
    },
    {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
      caption: 'Continuous Upskilling & Mentorship Programs',
      tag: 'Growth',
    },
  ]

  // The 3 Broad Executive Titles & Workforce Model
  const executiveTracks = [
    {
      id: 'tech-exec',
      code: 'tech',
      title: 'OPERAVA Technology Executive',
      shortTitle: 'Technology Executive',
      icon: Cpu,
      badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
      gradient: 'from-violet-600 to-indigo-700',
      summary:
        'Assigned to IT, cloud, web, software, application, systems, database, programming, or other related technology functions.',
      assignments: [
        'Cloud & DevOps (AWS, Azure, GCP, Kubernetes)',
        'Full-Stack Web & Mobile Software Development',
        'Application Systems & API Architecture',
        'Database Management & Programming',
        'IT Infrastructure, Systems Administration & Cybersecurity',
      ],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'cx-exec',
      code: 'cx',
      title: 'OPERAVA Customer Service Executive',
      shortTitle: 'Customer Service Executive',
      icon: Headphones,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      gradient: 'from-blue-600 to-cyan-700',
      summary:
        'Assigned to voice, chat, email, customer support, account support, technical help desk, or other related customer-service functions.',
      assignments: [
        '24/7 Inbound & Outbound Voice Communications',
        'Live Chat & Real-Time Digital Resolution',
        'Omnichannel Email & Ticket Desk Support',
        'Enterprise Client Account Support & Retention',
        'Tier 1 & Tier 2 Technical Help Desk Triage',
      ],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'ops-exec',
      code: 'ops',
      title: 'OPERAVA Business Operations Executive',
      shortTitle: 'Business Operations Executive',
      icon: FileSpreadsheet,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      gradient: 'from-emerald-600 to-teal-700',
      summary:
        'Assigned to HR operations, accounting support, finance operations, data processing, administrative operations, or other related functions.',
      assignments: [
        'HR Operations, Talent Acquisition & People Care',
        'Accounting Support, Bookkeeping & Invoicing',
        'FinTech & Finance Operations (KYC / AML Screening)',
        'Audited Data Processing, Entry & Verification',
        'Executive & Administrative Business Workflows',
      ],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    },
  ]

  const hiringStages = [
    {
      step: '01',
      title: 'Initial / AI-Assisted Interview',
      desc: 'Rapid interactive evaluation assessing candidate background, technical literacy, and communication profile.',
    },
    {
      step: '02',
      title: 'Skills or Role Assessment',
      desc: 'Hands-on practical tests tailored to software, customer support scenarios, or operational accuracy benchmarks.',
    },
    {
      step: '03',
      title: 'Talent Acquisition Interview',
      desc: 'In-depth discussion with OPERAVA talent specialists to align career goals and workforce competency tracks.',
    },
    {
      step: '04',
      title: 'Client Alignment Interview',
      desc: 'Direct match and interview with partner client leadership for dedicated project onboarding.',
    },
    {
      step: '05',
      title: 'Engagement Documentation',
      desc: 'Final selection, structured onboarding documentation, hardware provisioning, and project commencement.',
    },
  ]

  // Role Openings Mapped to the 3 Broad Executive Titles
  const roles = [
    {
      id: 'r1',
      title: 'OPERAVA Technology Executive — Cloud & DevOps',
      broadTitle: 'OPERAVA Technology Executive',
      track: 'tech',
      location: 'Remote / Hybrid (PH)',
      level: 'Senior',
      type: 'Full-time',
      desc: 'Assigned to cloud application environments, AWS/GCP infrastructure, Kubernetes orchestration, and continuous deployment systems.',
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r2',
      title: 'OPERAVA Technology Executive — Software & Full-Stack Development',
      broadTitle: 'OPERAVA Technology Executive',
      track: 'tech',
      location: 'Remote',
      level: 'Mid–Senior',
      type: 'Full-time',
      desc: 'Assigned to web and mobile software development, API microservices architecture, and enterprise digital platform engineering.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r3',
      title: 'OPERAVA Customer Service Executive — Omnichannel & Voice Support',
      broadTitle: 'OPERAVA Customer Service Executive',
      track: 'cx',
      location: 'Remote / Philippines',
      level: 'Entry–Mid',
      type: 'Full-time (24/7 Shifts)',
      desc: 'Assigned to high-touch voice communications, live chat resolution, and tier-1 customer assistance for global commercial clients.',
      image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r4',
      title: 'OPERAVA Customer Service Executive — Technical Help Desk & Account Support',
      broadTitle: 'OPERAVA Customer Service Executive',
      track: 'cx',
      location: 'Remote / Philippines',
      level: 'Mid',
      type: 'Full-time',
      desc: 'Assigned to tier-2 incident triage, software customer support tickets, client account care, and multi-channel help desk workflows.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r5',
      title: 'OPERAVA Business Operations Executive — FinTech, KYC & Compliance Support',
      broadTitle: 'OPERAVA Business Operations Executive',
      track: 'ops',
      location: 'Philippines / Remote',
      level: 'Entry–Mid',
      type: 'Full-time',
      desc: 'Assigned to finance operations, identity verification, accounting support, and auditable data validation for international platforms.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r6',
      title: 'OPERAVA Business Operations Executive — HR & Talent Operations',
      broadTitle: 'OPERAVA Business Operations Executive',
      track: 'ops',
      location: 'Philippines',
      level: 'Mid–Senior',
      type: 'Full-time',
      desc: 'Assigned to HR operations, administrative workflows, talent acquisition, and workforce management across global engagements.',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
    },
  ]

  const filteredRoles =
    selectedTrack === 'all' ? roles : roles.filter((role) => role.track === selectedTrack)

  const perks = [
    {
      title: t('careers.perk1.title', 'Flexible Remote Work'),
      desc: t('careers.perk1.desc', 'Work from home or access our modern collaboration hubs across the Philippines.'),
      icon: Users,
    },
    {
      title: t('careers.perk2.title', 'Accelerated Growth & Upskilling'),
      desc: t('careers.perk2.desc', 'Dedicated budget for certifications, cloud accreditations, and technical mentorship.'),
      icon: Sparkles,
    },
    {
      title: t('careers.perk3.title', 'Comprehensive Healthcare & HMO'),
      desc: t('careers.perk3.desc', 'Top-tier medical coverage from Day 1 including dependent coverage and wellness benefits.'),
      icon: HeartHandshake,
    },
    {
      title: t('careers.perk4.title', 'Modern Hardware & Tooling Allowance'),
      desc: t('careers.perk4.desc', 'Company-issued laptops, ergonomic workstation allowances, and modern dev stacks.'),
      icon: Building2,
    },
    {
      title: t('careers.perk5.title', 'Competitive Global Pay'),
      desc: t('careers.perk5.desc', 'Market-leading salaries, performance bonuses, night differentials, and 13th month pay.'),
      icon: Briefcase,
    },
    {
      title: t('careers.perk6.title', 'Global Exposure & Impact'),
      desc: t('careers.perk6.desc', 'Work directly with international clients across North America, Europe, and Asia-Pacific.'),
      icon: MapPin,
    },
  ]

  const handleApply = (roleTitle: string) => {
    setAppliedRole(roleTitle)
    setTimeout(() => {
      setAppliedRole(null)
    }, 4000)
  }

  return (
    <main>
      {/* Hero Header */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
            alt="OPERAVA Global Team"
            className="w-full h-full object-cover"
          />
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
              {t(
                'careers.desc',
                'Join a global team delivering mission-critical IT infrastructure, advanced software systems, and high-performance BPO operations worldwide.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── GENERALIST AND SPECIALIST WORKFORCE MODEL SECTION ── */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-100 text-violet-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Workforce Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              Generalist and Specialist Workforce Model
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              OPERAVA utilizes broad professional executive titles designed to balance agile multi-domain capabilities with high-precision specialization. Actual assignments are dynamically matched to client specifications, candidate experience, demonstrated competencies, and structured training tracks.
            </p>
          </div>

          {/* 3 Broad Executive Titles Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {executiveTracks.map((exec) => {
              const Icon = exec.icon
              return (
                <div
                  key={exec.id}
                  className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-md hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center border border-violet-100 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-3">
                      {exec.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                      {exec.summary}
                    </p>

                    <div className="border-t border-gray-100 pt-5 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                        Potential Functions & Assignments:
                      </h4>
                      <ul className="space-y-2">
                        {exec.assignments.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTrack(exec.code)
                      const target = document.getElementById('openings')
                      if (target) target.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-full py-3 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-800 text-xs font-bold transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <span>View {exec.shortTitle} Roles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>

          {/* Model Clarification & Assignment Terms Box */}
          <div className="rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <h4 className="text-base font-bold text-gray-900">
                  Assignment Terms & Position Governance
                </h4>
                <p>
                  These titles are intentionally broad. Employees will not necessarily perform every function associated with a position. Actual assignments depend on client requirements, education, experience, demonstrated competency, assessments, training, and project requirements.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 pt-2 text-xs text-gray-700">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">Technology Executive:</span>
                    IT, cloud, web, software, application, systems, database, programming, or related technology functions.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">Customer Service Executive:</span>
                    Voice, chat, email, customer support, account support, or related customer-service functions.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">Business Operations Executive:</span>
                    HR operations, accounting support, finance operations, data processing, administrative operations, or related functions.
                  </div>
                </div>
                <div className="pt-2">
                  <Link
                    to="/terms#section-5"
                    className="inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900 underline"
                  >
                    <span>Read full Terms Section 5 (Generalist and Specialist Workforce Model)</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Team Photo Grid */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 block mb-2">
              Life at OPERAVA
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Where Talent Meets World-Class Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-violet-600/90 text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                    {img.tag}
                  </span>
                  <p className="text-white text-sm font-semibold leading-snug">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-STAGE HIRING PROCESS (Section 9 Aligned) ── */}
      <section className="py-20 bg-gray-50/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-100 text-violet-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Assessment & Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Transparent 5-Stage Hiring Journey
            </h2>
            <p className="text-sm text-gray-600 mt-3">
              Standardized hiring framework designed to evaluate demonstrated competency and ensure precision placement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {hiringStages.map((stage, i) => (
              <div
                key={stage.step}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-violet-700 mb-3">{stage.step}</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{stage.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{stage.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Stage {i + 1} of 5
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings with Filter by Broad Title */}
      <section id="openings" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 block mb-2">
                Join Our Talent Roster
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {t('careers.openingsTitle', 'Current Openings')}
              </h2>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-bold text-violet-700">{filteredRoles.length} Active Positions</span> · Global & Philippines Applicants Welcome
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedTrack === 'all'
                  ? 'bg-violet-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Roles ({roles.length})
            </button>
            <button
              onClick={() => setSelectedTrack('tech')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedTrack === 'tech'
                  ? 'bg-violet-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Technology Executives ({roles.filter((r) => r.track === 'tech').length})
            </button>
            <button
              onClick={() => setSelectedTrack('cx')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedTrack === 'cx'
                  ? 'bg-violet-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Customer Service Executives ({roles.filter((r) => r.track === 'cx').length})
            </button>
            <button
              onClick={() => setSelectedTrack('ops')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedTrack === 'ops'
                  ? 'bg-violet-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Business Operations Executives ({roles.filter((r) => r.track === 'ops').length})
            </button>
          </div>

          {appliedRole && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Application intent received for: {appliedRole}</p>
                <p className="text-xs text-emerald-700">Please send your resume via our contact form or recruitment inbox.</p>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 rounded-3xl bg-white border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-gray-100 hidden sm:block">
                    <img src={role.image} alt={role.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="mb-1.5">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
                        {role.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mb-2">{role.desc}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {role.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                        {role.type}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {role.level}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleApply(role.title)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-95 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Quick Apply</span>
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-4 py-3 text-xs font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400 block mb-2">
              Why Join OPERAVA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t('careers.whyTitle', 'Benefits Built for High Performers')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-violet-500/40 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-400/30 flex items-center justify-center mb-6 text-violet-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Custom Application CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            {t('cta.title', "Don't see a role that fits?")}
          </h2>
          <p className="text-base text-gray-500 mb-8 max-w-xl mx-auto">
            {t(
              'careers.desc',
              'We are constantly scouting for exceptional engineers, cloud architects, customer champions, and back-office leaders across our broad executive tracks. Send your portfolio and introduce yourself.'
            )}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-violet-700 rounded-2xl hover:bg-violet-800 active:scale-95 transition-all shadow-lg shadow-violet-700/25"
          >
            <span>{t('nav.talkToUs', 'Send General Application')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}

