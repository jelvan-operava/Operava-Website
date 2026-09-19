import { useEffect, useMemo, useState } from 'react'
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
  Search,
  MapPin,
} from 'lucide-react'
import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'
import CareerCard from '../components/CareerCard'
import { type CareerPosition } from '../data/careersData'

const COUNTRY_OPTIONS = [
  { value: 'all', label: 'All locations' },
  { value: 'global', label: 'Global' },
  { value: 'philippines', label: 'Philippines' },
  { value: 'united-states', label: 'United States' },
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'singapore', label: 'Singapore' },
] as const

type CountryValue = (typeof COUNTRY_OPTIONS)[number]['value']

export default function Careers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedRole, setSelectedRole] = useState<string>(
    searchParams.get('role') || 'OPERAVA Technology Executive'
  )
  const [openCardId, setOpenCardId] = useState<string | null>(null)
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [country, setCountry] = useState<CountryValue>(
    (searchParams.get('country') as CountryValue) || 'all'
  )

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
      countries: ['global', 'philippines', 'united-states', 'united-kingdom', 'canada', 'australia', 'singapore'],
      locationLabel: 'Global · Remote-friendly',
      image:
        'https://res.cloudinary.com/b5i5bwwa/image/upload/v1788660949/792090637_1483292190495964_5576048200188804631_n.webp',
      summary:
        'For builders, engineers, and technical problem-solvers. Work on international projects in software engineering, web/mobile development, and cloud systems.',
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
        'Reliable workspace setup: own PC/Laptop, stable internet (50 Mbps+), backup power/internet',
      ],
    },
    {
      id: 'ops-exec',
      code: 'ops',
      title: 'OPERAVA Business Operations Executive' as CareerPosition,
      shortTitle: 'Business Operations Executive',
      countries: ['global', 'philippines', 'united-states', 'united-kingdom', 'canada', 'australia', 'singapore'],
      locationLabel: 'Global · Remote-friendly',
      image:
        'https://res.cloudinary.com/b5i5bwwa/image/upload/v1788660938/Business%20Operations%20Executive%20Cover.jpg',
      summary:
        'For detail-driven operators and business enablers. Support HR, Finance, Recruitment, and business operations for global companies.',
      assignments: [
        'HR Operations & People Care',
        'Accounting, Bookkeeping & Financial Reporting',
        'Talent Acquisition & Sourcing',
        'Training & Professional Development Coordination',
        'Audited Data Processing & Workflow Administration',
      ],
      qualifications: [
        "Bachelor's Degree in Business, HR, Finance, Accountancy, or related field",
        '1+ year experience in HR, recruitment, bookkeeping, or admin. Strong fresh grads welcome.',
        'Proficient in Google Workspace / MS Excel, and tools like QuickBooks, Xero, HRIS, or ATS',
        'High attention to detail, data accuracy, and confidentiality',
        'Excellent organizational and English communication skills',
        'Reliable workspace setup: own PC/Laptop, stable internet (50 Mbps+), quiet workspace',
      ],
    },
    {
      id: 'cx-exec',
      code: 'cx',
      title: 'OPERAVA Customer Experience Executive' as CareerPosition,
      shortTitle: 'Customer Experience Executive',
      countries: ['global', 'philippines', 'united-states', 'united-kingdom', 'canada', 'australia', 'singapore'],
      locationLabel: 'Global · Remote-friendly',
      image:
        'https://res.cloudinary.com/b5i5bwwa/image/upload/v1788660940/797841464_3350629321810587_364897228139176087_n.jpg',
      summary:
        'For client-focused communicators and service leaders. Deliver world-class customer support for international brands.',
      assignments: [
        'Omnichannel Support (Live Chat, Email & Ticket Resolution)',
        'High-Touch Inbound & Outbound Voice Support',
        'Technical Helpdesk & Incident Triage (Tier 1 & 2)',
        'Customer Success, Onboarding & Client Retention',
        'Escalation Management & Quality Assurance',
      ],
      qualifications: [
        'At least 1 year in customer service, tech support, or client-facing BPO role',
        'Excellent English communication — fluent in chat, email, and phone with neutral accent',
        'Experience with Zendesk, Freshdesk, Intercom, Salesforce, or HubSpot',
        'Customer-centric, patient, and skilled in de-escalation and CSAT improvement',
        'Willing to work on US / shifting / night schedules where required',
        'Reliable workspace setup: own PC/Laptop, stable internet (50 Mbps+), noise-canceling headset, quiet workspace, backup power',
      ],
    },
  ]

  const filteredTracks = useMemo(() => {
    const q = query.trim().toLowerCase()
    return executiveTracks.filter((track) => {
      const countryOk = country === 'all' || track.countries.includes(country)
      if (!countryOk) return false
      if (!q) return true
      const hay = [
        track.title,
        track.shortTitle,
        track.summary,
        track.locationLabel,
        ...(track.assignments || []),
        ...(track.qualifications || []),
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query, country])

  const syncFiltersToUrl = (nextQ: string, nextCountry: string) => {
    const params = new URLSearchParams(searchParams)
    if (nextQ.trim()) params.set('q', nextQ.trim())
    else params.delete('q')
    if (nextCountry && nextCountry !== 'all') params.set('country', nextCountry)
    else params.delete('country')
    setSearchParams(params, { replace: true })
  }

  const hiringStages = [
    { step: '01', title: 'Initial / AI-Assisted Evaluation', desc: 'Rapid interactive evaluation assessing candidate background, technical literacy, and communication profile.' },
    { step: '02', title: 'Skills & Specialization Assessment', desc: 'Hands-on practical tests tailored to software, customer support scenarios, or operational accuracy benchmarks.' },
    { step: '03', title: 'Talent Acquisition Interview', desc: 'In-depth discussion with OPERAVA talent specialists to align career goals and workforce competency tracks.' },
    { step: '04', title: 'Client Alignment Interview', desc: 'Direct match and interview with partner client leadership for dedicated project onboarding.' },
    { step: '05', title: 'Engagement Documentation', desc: 'Final selection, structured onboarding documentation, hardware provisioning, and project commencement.' },
  ]

  const whyWork = [
    { title: 'Flexible Work Setup', desc: 'Roles designed for distributed teams serving international clients.', icon: Home },
    { title: 'Global Clients', desc: 'Work with organizations across North America, Europe, and Asia-Pacific.', icon: Globe2 },
    { title: 'Continuous Upskilling', desc: 'Mentorship, certifications, and collaborative engineering sprints.', icon: Sparkles },
    { title: 'Career Growth Path', desc: 'Performance-based growth with clear specialization tracks.', icon: ShieldCheck },
  ]

  const workRequirements = [
    'Authorized to work in your stated location',
    'Own equipment: Laptop/Desktop (i5 gen 8+ / M1+, 8GB RAM min), webcam, headset',
    'Stable internet connection (50 Mbps minimum) + backup connection/power',
    'Quiet, professional workspace setup',
    'Strong English proficiency (B2–C1 level) and ability to work independently',
    'Willing to undergo assessments and client interviews via video call',
  ]

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle)
    const target = document.getElementById('application-form')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const quickLinks = [
    { label: 'Technology', q: 'technology', country: 'all' as CountryValue },
    { label: 'Operations', q: 'operations', country: 'all' as CountryValue },
    { label: 'Customer Experience', q: 'customer', country: 'all' as CountryValue },
    { label: 'Philippines', q: '', country: 'philippines' as CountryValue },
    { label: 'Global', q: '', country: 'global' as CountryValue },
    { label: 'United States', q: '', country: 'united-states' as CountryValue },
  ]

  return (
    <main className="bg-[#FBFBFA]">
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
            alt="OPERAVA Global Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/70" />
        </div>
        <div className="relative w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Build Your Career. Operate in Advance.
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl font-normal mb-4">
              Join a global team powering technology, operations, and business processes for organizations worldwide.
            </p>
            <p className="text-base text-gray-400 leading-relaxed max-w-2xl">
              Explore executive tracks across Technology, Business Operations, and Customer Experience — then filter by location or search by skill.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ai-job-screening"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500"
              >
                Open Recruitment AVA
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#application-form"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/15"
              >
                Formal application form
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#F7F6F4] border-b border-stone-200/80">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              Open Executive Career Tracks
            </h2>
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              Three core tracks. Use search or country filters below. Tap the + on a card for core assignments and qualifications. Final assignments follow verified skills, specialization, assessments, and client needs.
            </p>
          </div>

          <div className="mb-10 rounded-2xl border border-violet-200 bg-violet-50/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-1">Recruitment AVA</p>
              <p className="text-sm font-semibold text-gray-900 mb-1">Start with AI-assisted job screening</p>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xl">
                Guided conversation for Technology, Operations, and Customer Experience tracks. Verify your email, build your profile, and prepare for assessment. Not a final hiring decision.
              </p>
            </div>
            <Link
              to="/ai-job-screening"
              className="inline-flex items-center justify-center gap-2 shrink-0 px-5 py-3 rounded-xl bg-violet-700 text-white text-sm font-semibold hover:bg-violet-600 shadow-sm"
            >
              Open Recruitment AVA
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mb-6 flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  const v = e.target.value
                  setQuery(v)
                  syncFiltersToUrl(v, country)
                }}
                placeholder="Search roles, skills, or keywords…"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 shadow-sm"
                aria-label="Search career tracks"
              />
            </div>
            <div className="relative min-w-[200px]">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={country}
                onChange={(e) => {
                  const v = e.target.value as CountryValue
                  setCountry(v)
                  syncFiltersToUrl(query, v)
                }}
                className="w-full appearance-none pl-10 pr-8 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 shadow-sm cursor-pointer"
                aria-label="Filter by country"
              >
                {COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {quickLinks.map((link) => {
              const active =
                (link.q && query.toLowerCase() === link.q) ||
                (!link.q && country === link.country)
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    setQuery(link.q)
                    setCountry(link.country)
                    syncFiltersToUrl(link.q, link.country)
                  }}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                    active
                      ? 'bg-violet-700 text-white border-violet-700'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:text-violet-700'
                  }`}
                >
                  {link.label}
                </button>
              )
            })}
            {(query || country !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCountry('all')
                  syncFiltersToUrl('', 'all')
                }}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300 bg-white"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredTracks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="text-sm font-semibold text-gray-900 mb-1">No tracks match your filters</p>
              <p className="text-sm text-gray-500 mb-4">Try another country or clear the search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCountry('all')
                  syncFiltersToUrl('', 'all')
                }}
                className="text-sm font-semibold text-violet-700 hover:text-violet-900"
              >
                Show all tracks
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center md:justify-items-stretch">
              {filteredTracks.map((exec, idx) => (
                <CareerCard
                  key={exec.id}
                  career={{
                    ...exec,
                    location: exec.locationLabel,
                  }}
                  variant="portrait"
                  index={idx}
                  onApply={handleApply}
                  isFlipped={openCardId === exec.id}
                  onFlipChange={(next) => setOpenCardId(next ? exec.id : null)}
                />
              ))}
            </div>
          )}

          <p className="mt-8 text-sm text-gray-500 max-w-3xl">
            Final assignments are based on verified skills, specialization, assessment results, and client requirements.{' '}
            <Link to="/terms#section-5" className="text-violet-700 font-semibold underline">
              See Terms — Section 5
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F7F6F4] border-b border-stone-200/80">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
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
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">Why Work With OPERAVA</h2>
            <p className="text-gray-400 text-sm">Distributed teams, global clients, and structured growth paths.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyWork.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Icon className="w-6 h-6 text-violet-300 mb-3" />
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-stone-200/80">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Work requirements</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {workRequirements.map((req) => (
              <li key={req} className="flex gap-2 text-sm text-gray-700">
                <ShieldCheck className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="application-form" className="py-20 bg-[#F7F6F4]">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-2xl mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Formal application</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Prefer the structured form? Submit here. You can also use{' '}
              <Link to="/ai-job-screening" className="text-violet-700 font-semibold underline">
                Recruitment AVA
              </Link>{' '}
              for guided AI screening first.
            </p>
          </div>
          <OperavaIntakeForm formType="CAREERS" defaultPosition={selectedRole} />
        </div>
      </section>
    </main>
  )
}
