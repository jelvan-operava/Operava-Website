import { Link } from 'react-router-dom'
import {
  Building2,
  ShieldCheck,
  Globe2,
  Users2,
  Cpu,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
  Award,
  GraduationCap,
  HeartHandshake,
  MapPin,
  FileCheck,
  Server,
  Headphones,
  Laptop
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import HangingFeaturesBanner from '../components/HangingFeaturesBanner'

export default function About() {
  const { t } = useLanguage()

  const deliveryModels = [
    {
      title: 'One Professional',
      subtitle: 'Small Businesses & Startups',
      desc: 'Engage one dedicated specialist for a defined role, project, or operational workload without having to build an entire internal department.',
      features: [
        'Dedicated full-time or part-time specialist',
        'Direct communication and custom task alignment',
        'Eliminates overhead of full department buildouts',
        'Rapid onboarding and workflow integration'
      ],
      icon: Users2,
      accent: 'border-violet-200 bg-violet-50/50'
    },
    {
      title: 'One Dedicated Team',
      subtitle: 'Growing Businesses & SMEs',
      desc: 'A coordinated team supporting expanding customer volume, software development, administrative workload, or specialized operations.',
      features: [
        'Structured team with dedicated lead/supervision',
        'Integrated processes, QA, and metric reporting',
        'Flexible capacity expansion as volume increases',
        'Direct collaboration with your internal stakeholders'
      ],
      icon: Workflow,
      accent: 'border-blue-200 bg-blue-50/50'
    },
    {
      title: 'Multiple Teams',
      subtitle: 'Established Companies & Enterprises',
      desc: 'Multiple specialized teams supporting distinct functions, products, regions, departments, or high-volume business workflows.',
      features: [
        'Multi-tiered operations across technology and BPO',
        'Comprehensive operational governance and SLAs',
        'Cross-functional coordination and continuous optimization',
        'Distributed continuity across shifts and regions'
      ],
      icon: Layers,
      accent: 'border-emerald-200 bg-emerald-50/50'
    }
  ]

  const coreFormula = [
    {
      title: 'Technology',
      badge: 'Capability & Scale',
      desc: 'Digital platforms, custom software, cloud environments, integrations, and automation systems designed to make operations connected and measurable.',
      icon: Cpu
    },
    {
      title: 'Talent & People',
      badge: 'Expertise & Judgment',
      desc: 'Skilled professionals providing technical capability, problem-solving, communication, and human judgment that pure automation cannot replace.',
      icon: Users2
    },
    {
      title: 'Process',
      badge: 'Structure & Consistency',
      desc: 'Structured, repeatable workflows, quality assurance frameworks, and governance designed to produce reliable, scalable outcomes.',
      icon: Workflow
    },
    {
      title: 'Businesses',
      badge: 'Value & Growth',
      desc: 'Organizations of all sizes seeking flexible, reliable technology and operational support without unnecessary structural overhead.',
      icon: Building2
    }
  ]

  const complianceHighlights = [
    {
      title: 'Philippine Corporate Registration',
      authority: 'Securities and Exchange Commission (SEC)',
      desc: 'OPERAVA Global Solutions is organized in the Philippines as a Corporation and is registered with the SEC, establishing the legal corporate framework for authorized business activities.',
      icon: ShieldCheck
    },
    {
      title: 'Philippine Tax Compliance',
      authority: 'Bureau of Internal Revenue (BIR)',
      desc: 'OPERAVA is registered with the Bureau of Internal Revenue (BIR) and actively maintains its applicable Philippine taxpayer registration and tax compliance responsibilities.',
      icon: FileCheck
    },
    {
      title: 'Philippine-Based & Global Reach',
      authority: 'Pagudpud, Ilocos Norte 2919, Philippines',
      desc: 'Philippine-based with an initial office in Pagudpud, Ilocos Norte, operating remotely and globally to serve clients across North America, APAC, and Europe.',
      icon: MapPin
    },
    {
      title: 'Responsible Regulatory Stance',
      authority: 'Strict Regulatory Adherence',
      desc: 'SEC registration provides our corporate framework. Where specific activities require additional permits, licenses, or authorizations, OPERAVA complies with all requirements before providing them.',
      icon: Award
    }
  ]

  const workforceInitiatives = [
    {
      title: 'Inclusive Remote Employment',
      desc: 'Creating flexible remote career paths for skilled professionals, early-career talent, working students, and mothers & caregivers seeking flexible schedules.',
      icon: HeartHandshake
    },
    {
      title: 'Merit Scholarships & Training',
      desc: 'Supporting talent development through future merit-based scholarship programs, technical skills training, and mentorship initiatives as we grow.',
      icon: GraduationCap
    },
    {
      title: 'Philippine & Global Talent',
      desc: 'Primarily recruiting top-tier Filipino professionals known for English fluency and dedication, with international recruitment for specialized domains.',
      icon: Globe2
    }
  ]

  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-gray-50 via-white to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100/80 border border-violet-200 text-violet-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              ABOUT OPERAVA GLOBAL SOLUTIONS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
              Operating in Advance.
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-violet-900/80 leading-relaxed mb-6">
              Technology, Workforce & Business Process Outsourcing — Connected Remotely and Globally.
            </p>
            <div className="p-5 sm:p-6 bg-violet-900 text-white rounded-2xl shadow-xl shadow-violet-900/10 max-w-3xl mb-8">
              <p className="text-xs font-bold tracking-widest uppercase text-violet-300 mb-1">
                OUR CORE PURPOSE
              </p>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                MAKE WORK AND SERVICES ACCESSIBLE — ANYTIME, ANYWHERE.
              </p>
            </div>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              OPERAVA Global Solutions is a Philippine-based technology, workforce, and business process solutions company. We combine Information Technology services with Business Process Outsourcing (BPO) and remote workforce solutions to help organizations build, modernize, connect, and operate their digital systems and business processes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Philosophy & Formula */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-3">
              OPERATING PHILOSOPHY
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              The OPERAVA Formula
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              The name OPERAVA reflects our philosophy of operating ahead of changing business needs. We connect four essential components into an integrated environment where work is performed efficiently, professionally, and remotely.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFormula.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700 mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 block mb-1">
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Corporate Registration & Governance */}
      <section className="py-16 lg:py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-3">
              LEGAL ENTITY & COMPLIANCE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Corporate Registration & Governance
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              OPERAVA operates with clear corporate standing, transparent compliance, and responsible regulatory positioning in the Philippines and across international markets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {complianceHighlights.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-violet-200 transition-all flex gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-100/60 text-violet-700 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-violet-700 mb-2">
                      {item.authority}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Flexible Client Delivery Models */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-3">
              FLEXIBLE DELIVERY MODELS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Scaled to Your Actual Needs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We believe a business should not have to build more internal capacity than it actually needs. Whether you require a single specialist or multiple operational teams, we adapt seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {deliveryModels.map((model, idx) => {
              const Icon = model.icon
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl border ${model.accent} flex flex-col justify-between transition-all hover:shadow-xl`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-violet-700 mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-700 block mb-1">
                      {model.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {model.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {model.desc}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {model.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-semibold text-violet-700 bg-white border border-violet-200 hover:bg-violet-600 hover:text-white transition-colors"
                  >
                    Discuss This Model
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Remote Operations Matter */}
      <section className="py-16 lg:py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-3">
              REMOTE-FIRST ADVANTAGE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Why Remote Operations Matter
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Remote work does not mean lower quality. At OPERAVA, quality is driven by capable people, rigorous processes, modern technology, active communication, and clear accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all">
              <h3 className="text-xl font-bold text-violet-300 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-violet-400" />
                For Businesses & Organizations
              </h3>
              <ul className="space-y-3.5 text-sm text-gray-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>Access to a broader, vetted pool of skilled technology and operational talent.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>Greater staffing flexibility without the constraints of physical office footprints.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>Scalable operational capacity that adjusts dynamically with business cycles.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>Faster onboarding, extended service coverage, and business continuity.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all">
              <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                <Users2 className="w-5 h-5 text-blue-400" />
                For Professionals & Teams
              </h3>
              <ul className="space-y-3.5 text-sm text-gray-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Access to international opportunities beyond immediate geographic proximity.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Elimination of daily commuting burdens, promoting work-life balance and focus.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Exposure to modern global tech stacks, SaaS tools, and business workflows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Clear merit-based career progression and structured skills development.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Talent Accessibility & Scholarships */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-3">
              WORKFORCE & TALENT DEVELOPMENT
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Accessible Employment & Scholarships
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              OPERAVA is building an inclusive workforce model that provides meaningful opportunities based on capability, dedication, and potential rather than geographic barriers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {workforceInitiatives.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="p-6 sm:p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-violet-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-violet-900 to-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Join Our Growing Global Workforce
              </h3>
              <p className="text-sm text-violet-200 max-w-2xl">
                Explore remote career opportunities across Information Technology, software development, customer support, technical help desk, and back-office operations.
              </p>
            </div>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-900 font-bold text-sm hover:bg-violet-50 transition-colors shrink-0"
            >
              View Open Careers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive Service Spectrum Overview */}
      <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-3">
              WHAT OPERAVA DELIVERS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Integrated Technology & BPO Solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              From building custom applications to managing high-volume customer and back-office operations, we provide the full spectrum of modern digital services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* IT Services Card */}
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Information Technology</h3>
                    <p className="text-xs text-violet-700 font-semibold">8 Core Areas + Cloud Infrastructure</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Software Development, Web & Mobile Applications, SaaS & Platform Development, IT Systems, Computer Programming, IT Consulting, Systems Integration, Database Services, and Cloud Solutions.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mb-6">
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 01 Software Dev</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 02 Web & Mobile</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 03 SaaS Platforms</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 04 IT Systems</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 05 Programming</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 06 IT Consulting</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 07 Integration</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 08 Databases</span>
                </div>
              </div>
              <Link
                to="/services/it"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors"
              >
                Explore All IT Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* BPO Services Card */}
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Business Process Outsourcing</h3>
                    <p className="text-xs text-blue-700 font-semibold">8 Core Operations & Support Areas</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Customer Service (voice, chat, email), Technical Support, Help Desk operations, Back-Office Administration, Data Processing, Data Entry, Document Processing, and Virtual Assistance.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mb-6">
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 01 Customer Service</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 02 Technical Support</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 03 Help Desk</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 04 Back-Office Ops</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 05 Data Processing</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 06 Data Entry</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 07 Document Proc.</span>
                  <span className="p-2 rounded-lg bg-gray-50 font-medium">• 08 Virtual Assist.</span>
                </div>
              </div>
              <Link
                to="/services/bpo"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Explore All BPO Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Hanging Features Banner */}
      <HangingFeaturesBanner />

      {/* 9. Final Action CTA */}
      <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Ready to Connect with OPERAVA?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us know about your technology requirements, operational goals, or staffing needs. Our team is ready to structure a solution that operates in advance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors shadow-lg shadow-violet-700/20"
            >
              Get in Touch Today
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services/it"
              className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl hover:border-violet-300 hover:bg-violet-50/50 transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
