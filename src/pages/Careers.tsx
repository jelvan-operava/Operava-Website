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
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Careers() {
  const { t } = useLanguage()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
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

  const paths = [
    {
      title: t('careers.path1.title', 'Technology & Cloud'),
      desc: t('careers.path1.desc', 'Full-stack engineering, cloud infrastructure, DevOps, and cybersecurity consulting roles.'),
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      tag: 'Tech Track',
    },
    {
      title: t('careers.path2.title', 'BPO & Customer Success'),
      desc: t('careers.path2.desc', 'Omnichannel CX, technical tier support, and enterprise help desk operations.'),
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      tag: 'BPO Track',
    },
    {
      title: t('careers.path3.title', 'Back-Office & FinTech Ops'),
      desc: t('careers.path3.desc', 'KYC/AML verification, accounting, HR operations, and AI data labeling.'),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      tag: 'Ops Track',
    },
    {
      title: t('careers.path4.title', 'Global Remote Work'),
      desc: t('careers.path4.desc', 'Flexible remote opportunities designed for top global talent with modern async workflows.'),
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
      tag: 'Remote First',
    },
  ]

  const roles = [
    {
      id: 'r1',
      title: 'Senior Cloud Infrastructure Engineer',
      department: 'Technology',
      location: 'Remote / Hybrid (PH)',
      level: 'Senior',
      type: 'Full-time',
      desc: 'Architect resilient AWS/GCP Kubernetes clusters, automate Terraform CI/CD pipelines, and guarantee high-uptime cloud infrastructure.',
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r2',
      title: 'Full-Stack React & Node.js Developer',
      department: 'Technology',
      location: 'Remote',
      level: 'Mid–Senior',
      type: 'Full-time',
      desc: 'Build high-performance web applications, microservices, and enterprise dashboard interfaces.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r3',
      title: 'Tier 2 Technical Support Specialist',
      department: 'BPO Operations',
      location: 'Remote / Philippines',
      level: 'Entry–Mid',
      type: 'Full-time (24/7 Shifts)',
      desc: 'Deliver follow-the-sun technical triage, API troubleshooting, and omnichannel customer assistance.',
      image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r4',
      title: 'FinTech KYC / AML Verification Analyst',
      department: 'Back-Office',
      location: 'Philippines',
      level: 'Entry–Mid',
      type: 'Full-time',
      desc: 'Perform identity verification, document screening, and fraud prevention for leading global payments platforms.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r5',
      title: 'AI Data Operations & RLHF Specialist',
      department: 'Technology & AI',
      location: 'Remote / Philippines',
      level: 'Mid',
      type: 'Full-time',
      desc: 'Curate, annotate, and evaluate high-quality training datasets for cutting-edge LLMs and vision models.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'r6',
      title: 'Global Recruitment & Talent Partner',
      department: 'People Operations',
      location: 'Philippines',
      level: 'Mid–Senior',
      type: 'Full-time',
      desc: 'Source and vet the top 1% of Philippine technology and customer support professionals.',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
    },
  ]

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
      {/* Hero Header with Free-Source Hero Imagery */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gray-950 text-white overflow-hidden">
        {/* Ambient background photo */}
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
                'Join a global team delivering mission-critical IT infrastructure and high-performance BPO operations for enterprises worldwide.'
              )}
            </p>
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

      {/* Career Paths with Visual Stock Cards */}
      <section className="py-20 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 block mb-2">
              Specialized Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {t('careers.pathsTitle', 'Career Paths at OPERAVA')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paths.map((path) => (
              <div
                key={path.title}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-gray-950/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                      {path.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">{path.desc}</p>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900 pt-2 border-t border-gray-100"
                  >
                    <span>View Track Roles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings with Enhanced Application Modal/Feedback */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700 block mb-2">
                Join Our Talent Roster
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                {t('careers.openingsTitle', 'Current Openings')}
              </h2>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-bold text-violet-700">{roles.length} Active Positions</span> · Global Applicants Welcome
            </div>
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
            {roles.map((role) => (
              <div
                key={role.id}
                className="p-6 rounded-3xl bg-white border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-gray-100 hidden sm:block">
                    <img src={role.image} alt={role.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
                        {role.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-[11px] font-bold">
                        {role.department}
                      </span>
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
              'We are constantly scouting for exceptional engineers, cloud architects, customer champions, and back-office leaders. Send your portfolio and introduce yourself.'
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

