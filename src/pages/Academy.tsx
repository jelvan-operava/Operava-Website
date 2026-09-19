import { Link } from 'react-router-dom'
import {
  GraduationCap,
  BookOpen,
  Award,
  Brain,
  Users2,
  Compass,
  Building2,
  CheckCircle2,
  ArrowRight,
  Laptop,
  Handshake,
  FileBadge,
  Globe2,
  Sparkles,
} from 'lucide-react'

const learningPillars = [
  {
    title: 'Online Learning',
    desc: 'Flexible, self-paced and instructor-supported programs designed for working professionals, remote teams, and lifelong learners — accessible anytime, anywhere.',
    icon: Laptop,
    points: [
      'Structured digital courses with practical exercises',
      'Live and recorded sessions for different schedules',
      'Progress tracking and completion records',
      'Aligned with real workplace skills and OPERAVA delivery practice',
    ],
  },
  {
    title: 'Professional Certifications',
    desc: 'Focused certification pathways in Artificial Intelligence, Human Resources, and Leadership — built for career mobility and organizational capability.',
    icon: Award,
    points: [
      'Industry-relevant curriculum and assessments',
      'Certificates issued upon successful completion',
      'Pathways from foundational to advanced levels',
      'Suitable for individuals and sponsored corporate cohorts',
    ],
  },
  {
    title: 'Institutional Partnerships',
    desc: 'Collaborations with academic and professional institutions to support degree and diploma pathways, bridging OPERAVA Academy learning with formal higher education credentials.',
    icon: Handshake,
    points: [
      'Partnerships for degree and diploma issuance where authorized',
      'Articulation and credit-transfer discussions with partner schools',
      'Joint programs and recognition of prior learning where applicable',
      'Clear disclosure of awarding body and credential type',
    ],
  },
]

const certificationTracks = [
  {
    title: 'Artificial Intelligence',
    subtitle: 'AI literacy to applied practice',
    icon: Brain,
    color: 'from-violet-600 to-fuchsia-600',
    topics: [
      'AI fundamentals and responsible use',
      'Prompting, evaluation, and workflow design',
      'AI in business processes and automation',
      'Data awareness, privacy, and human oversight',
      'Applied projects for workplace scenarios',
    ],
  },
  {
    title: 'Human Resources',
    subtitle: 'People operations and modern HR',
    icon: Users2,
    color: 'from-blue-600 to-cyan-600',
    topics: [
      'HR fundamentals and employee lifecycle',
      'Recruitment, onboarding, and documentation',
      'Performance, engagement, and workplace policy',
      'Remote and distributed workforce practices',
      'Compliance awareness and professional conduct',
    ],
  },
  {
    title: 'Leadership',
    subtitle: 'Lead teams and outcomes',
    icon: Compass,
    color: 'from-indigo-600 to-violet-700',
    topics: [
      'Leadership foundations and decision-making',
      'Communication, coaching, and feedback',
      'Remote team leadership and accountability',
      'Operational excellence and continuous improvement',
      'Ethics, culture, and stakeholder management',
    ],
  },
]

const partnershipFeatures = [
  {
    title: 'Degree pathways',
    desc: 'Through approved institutional partners, learners may progress toward degree programs where the partner institution is the degree-awarding body.',
    icon: GraduationCap,
  },
  {
    title: 'Diploma programs',
    desc: 'Diploma-level credentials developed or co-delivered with partner institutions, subject to each partner’s academic standards and regulations.',
    icon: FileBadge,
  },
  {
    title: 'Recognition & articulation',
    desc: 'Where agreements exist, completed Academy certifications may support admission, credit consideration, or advanced standing at partner schools.',
    icon: Building2,
  },
  {
    title: 'Global accessibility',
    desc: 'Online delivery supports learners across regions while formal credentials remain governed by the issuing institution’s jurisdiction and rules.',
    icon: Globe2,
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Explore programs',
    desc: 'Review online learning options and certification tracks in AI, HR, and Leadership.',
  },
  {
    step: '02',
    title: 'Enroll or partner',
    desc: 'Individuals enroll in open programs; organizations can sponsor cohorts. Institutions inquire about partnership frameworks.',
  },
  {
    step: '03',
    title: 'Learn and demonstrate',
    desc: 'Complete modules, practical work, and assessments under Academy standards.',
  },
  {
    step: '04',
    title: 'Credential outcomes',
    desc: 'Earn OPERAVA Academy professional certificates, and — where partnered — pursue diploma or degree pathways with awarding institutions.',
  },
]

export default function Academy() {
  return (
    <main className="bg-[#FBFBFA]">
      {/* Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-violet-950 via-violet-900 to-indigo-950 text-white">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest mb-6">
              <GraduationCap className="w-3.5 h-3.5" />
              OPERAVA Academy
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Learn. Certify. Partner for formal credentials.
            </h1>
            <p className="text-lg sm:text-xl text-violet-100/90 leading-relaxed mb-6 max-w-3xl">
              OPERAVA Academy delivers online learning and professional certifications in Artificial
              Intelligence, Human Resources, and Leadership — and works with institutions to support
              degree and diploma pathways for learners who need formal academic credentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-900 font-semibold text-sm hover:bg-violet-50 transition-colors"
              >
                Inquire about programs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#partnerships"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Institutional partnerships
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-16 lg:py-24 bg-[#FBFBFA]">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              What OPERAVA Academy offers
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              A practical learning ecosystem: online education, professional certificates, and formal
              pathways through institutional partners.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {learningPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-violet-200 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{pillar.desc}</p>
                  <ul className="space-y-2.5 mt-auto">
                    {pillar.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certification tracks */}
      <section className="py-16 lg:py-24 bg-[#F7F6F4] border-y border-stone-100/80">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-700 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Professional certifications
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              AI · Human Resources · Leadership
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Certification programs focused on skills organizations need today — technical fluency
              with AI, capable people practices, and leadership that works in remote and hybrid
              environments.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {certificationTracks.map((track) => {
              const Icon = track.icon
              return (
                <div
                  key={track.title}
                  className="rounded-2xl overflow-hidden border border-gray-200/80 bg-white shadow-sm flex flex-col"
                >
                  <div className={`bg-gradient-to-r ${track.color} p-6 text-white`}>
                    <Icon className="w-8 h-8 mb-3 opacity-90" />
                    <h3 className="text-xl font-bold">{track.title}</h3>
                    <p className="text-sm text-white/85 mt-1">{track.subtitle}</p>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                      Program themes
                    </p>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {track.topics.map((t) => (
                        <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors"
                    >
                      Ask about this track
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Online learning detail */}
      <section className="py-16 lg:py-24 bg-[#FBFBFA]">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-700 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                Online learning
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Built for remote-first professionals
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                OPERAVA Academy’s online model mirrors how modern work happens: digital tools,
                clear outcomes, and accountability. Courses combine conceptual foundations with
                practical application so learners can use skills immediately in technology,
                operations, and people leadership roles.
              </p>
              <ul className="space-y-3">
                {[
                  'Self-paced modules with optional live facilitation',
                  'Assessments tied to workplace-relevant scenarios',
                  'Corporate cohort options for teams and departments',
                  'Records suitable for internal L&D and career development',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Who it is for</h3>
              <div className="space-y-4">
                {[
                  {
                    t: 'Individuals',
                    d: 'Professionals building AI fluency, HR capability, or leadership readiness.',
                  },
                  {
                    t: 'Employers',
                    d: 'Organizations upskilling teams with structured, certifiable learning.',
                  },
                  {
                    t: 'Institutions',
                    d: 'Schools and training bodies seeking industry-aligned partnership models.',
                  },
                ].map((row) => (
                  <div key={row.t} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-600 mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{row.t}</p>
                      <p className="text-sm text-gray-600">{row.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section id="partnerships" className="py-16 lg:py-24 bg-gray-950 text-white scroll-mt-24">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300 mb-3">
              <Handshake className="w-3.5 h-3.5" />
              Institutional partnerships
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Degree certifications & diplomas with partner institutions
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              OPERAVA Academy partners with academic and professional institutions so learners can
              move from professional certificates into formal diploma and degree pathways. Where a
              degree or diploma is issued, the partner institution is the awarding body under its
              own authority and regulations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {partnershipFeatures.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 transition-colors"
                >
                  <Icon className="w-6 h-6 text-violet-300 mb-3" />
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">Important:</strong> OPERAVA Academy professional
              certificates are issued by OPERAVA Global Solutions for completed Academy programs.
              Academic degrees and formal diplomas are issued only by authorized partner institutions
              under applicable law and their own academic governance. Program availability, admission,
              and credential titles depend on each partnership agreement.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors"
              >
                Partner with OPERAVA Academy
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:partners@operavaglobal.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                partners@operavaglobal.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-24 bg-[#FBFBFA]">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              From first inquiry to certificate — and, where partnered, toward diploma or degree
              pathways.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((s) => (
              <div key={s.step} className="p-6 rounded-2xl border border-gray-100 bg-white">
                <span className="text-xs font-bold tracking-widest text-violet-600">{s.step}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#F7F6F4] border-t border-stone-100/80">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-violet-900 to-indigo-900 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to start or partner?</h2>
              <p className="text-sm sm:text-base text-violet-100/90 leading-relaxed">
                Ask about online programs, professional certifications in AI, HR, and Leadership, or
                institutional partnerships for degree and diploma pathways.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-900 font-bold text-sm hover:bg-violet-50 transition-colors"
              >
                Contact OPERAVA
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Careers at OPERAVA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
