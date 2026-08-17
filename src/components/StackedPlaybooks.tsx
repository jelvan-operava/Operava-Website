import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function StackedPlaybooks() {
  const { t } = useLanguage()

  const cards = [
    {
      id: 'playbook-1',
      tagline: 'OPERATIONAL ARCHITECTURE',
      title: 'We architect the systems. You get high-velocity delivery.',
      description:
        'Everything we engineer in the trenches turns into battle-tested cloud frameworks, migration playbooks, and automated CI/CD pipelines so your technical teams can ship with zero friction.',
      cta: 'Explore IT Solutions',
      link: '/services/it',
      bgClass: 'bg-[#EDE9FE] text-gray-950 border-violet-300', // Violet Theme
      btnClass: 'bg-gray-950 text-white hover:bg-violet-900',
      tagClass: 'text-violet-900',
      rightBg: 'bg-[#0a071b]',
      neonLines: [
        'bg-gradient-to-r from-transparent via-violet-400 to-indigo-300 shadow-[0_0_25px_#8b5cf6]',
        'bg-gradient-to-r from-transparent via-sky-400 to-white shadow-[0_0_25px_#38bdf8]',
        'bg-gradient-to-r from-transparent via-violet-500 to-transparent shadow-[0_0_25px_#7c3aed]',
      ],
      labels: [
        { text: '99.99% Uptime SLA', top: '18%', left: '12%', color: 'text-violet-400' },
        { text: 'Automated Failover Clustered', top: '48%', right: '10%', color: 'text-sky-400' },
        { text: '14-Day Microservices Deploy', bottom: '18%', left: '25%', color: 'text-emerald-400' },
      ],
    },
    {
      id: 'playbook-2',
      tagline: 'TALENT ENGINE OPTIMIZATION',
      title: 'Scale omnichannel CX & support desks without friction.',
      description:
        'Take complete control over customer retention and operational SLAs. Build dedicated Philippines-based customer support, technical help desks, and back-office squads trained directly on your stack.',
      cta: 'Explore BPO Operations',
      link: '/services/bpo',
      bgClass: 'bg-[#CCFBF1] text-gray-950 border-teal-300', // Teal / Cyan Theme
      btnClass: 'bg-gray-950 text-white hover:bg-teal-950',
      tagClass: 'text-teal-900',
      rightBg: 'bg-[#041716]',
      neonLines: [
        'bg-gradient-to-r from-transparent via-teal-400 to-emerald-300 shadow-[0_0_25px_#2dd4bf]',
        'bg-gradient-to-r from-transparent via-cyan-300 to-white shadow-[0_0_25px_#67e8f9]',
        'bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-[0_0_25px_#14b8a6]',
      ],
      labels: [
        { text: '24/7 Follow-the-Sun Coverage', top: '22%', right: '15%', color: 'text-teal-400' },
        { text: 'Multilingual CSAT > 96%', bottom: '28%', left: '15%', color: 'text-cyan-400' },
        { text: 'Top 1% PH Talent Vetted', top: '65%', right: '20%', color: 'text-emerald-400' },
      ],
    },
    {
      id: 'playbook-3',
      tagline: 'DECISION RIGOR & COMPLIANCE',
      title: 'Enterprise governance verified by verifiable metrics.',
      description:
        'Stop guessing operational costs and compliance boundaries. We map real-time performance dashboards, SOC2-aligned protocols, and ISO 27001 data practices directly to your security stack.',
      cta: 'View Security Standards',
      link: '/about',
      bgClass: 'bg-[#FEF08A] text-gray-950 border-yellow-300', // Cyber Accent Theme
      btnClass: 'bg-gray-950 text-white hover:bg-yellow-950',
      tagClass: 'text-yellow-900',
      rightBg: 'bg-[#151502]',
      neonLines: [
        'bg-gradient-to-r from-transparent via-yellow-400 to-lime-300 shadow-[0_0_25px_#facc15]',
        'bg-gradient-to-r from-transparent via-amber-300 to-white shadow-[0_0_25px_#fde047]',
        'bg-gradient-to-r from-transparent via-yellow-500 to-transparent shadow-[0_0_25px_#eab308]',
      ],
      labels: [
        { text: 'SEC Registered Corporation', top: '20%', left: '15%', color: 'text-yellow-400' },
        { text: 'Zero Security Breaches', top: '50%', right: '12%', color: 'text-lime-400' },
        { text: '60% Cost Efficiency Unlocked', bottom: '20%', left: '30%', color: 'text-amber-300' },
      ],
    },
  ]

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 mb-3 inline-block">
          {t('playbooks.badge', 'Proven Methodologies')}
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
          {t('playbooks.title', 'Stacked Playbooks for Global Velocity')}
        </h2>
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mt-4">
          {t(
            'playbooks.subtitle',
            'Our standardized operating blueprints eliminate guesswork and ensure reliable delivery from day one.'
          )}
        </p>
      </div>

      {/* Main Stacking Container - Expanded End-to-End Left to Right and +50% Height */}
      <div className="w-full max-w-[96vw] xl:max-w-7xl 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-28">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={`sticky top-24 sm:top-28 rounded-3xl lg:rounded-[36px] overflow-hidden shadow-2xl border ${card.bgClass} grid lg:grid-cols-12 min-h-[580px] lg:min-h-[640px] transition-all duration-300`}
            style={{
              zIndex: idx + 1,
              marginBottom: '4rem',
            }}
          >
            {/* Left Content Panel */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center items-start">
              <span className={`text-xs sm:text-sm font-black tracking-[0.2em] uppercase mb-4 ${card.tagClass}`}>
                {card.tagline}
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
                {card.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed opacity-90 mb-10 max-w-2xl font-normal">
                {card.description}
              </p>
              <Link
                to={card.link}
                className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 shadow-lg ${card.btnClass} active:scale-95`}
              >
                <span>{card.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right Graphic Panel with Cyber Neon Backdrop */}
            <div
              className={`lg:col-span-5 relative ${card.rightBg} min-h-[340px] lg:min-h-full flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10`}
            >
              {/* Neon Backdrop Lines */}
              <div className="absolute w-[180%] h-[180%] -rotate-12 flex flex-col justify-around opacity-80 pointer-events-none">
                {card.neonLines.map((neonClass, lineIdx) => (
                  <div key={lineIdx} className={`w-full h-2 rounded-full ${neonClass}`} />
                ))}
              </div>

              {/* Floating Glass Badges with Glowing Bullets */}
              {card.labels.map((lbl, lblIdx) => (
                <div
                  key={lblIdx}
                  className="absolute px-5 py-2.5 rounded-full bg-gray-950/85 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2.5 whitespace-nowrap animate-float"
                  style={{
                    top: lbl.top,
                    bottom: lbl.bottom,
                    left: lbl.left,
                    right: lbl.right,
                    animationDelay: `${lblIdx * 0.7}s`,
                  }}
                >
                  <span className={`text-lg leading-none ${lbl.color}`}>•</span>
                  <span>{lbl.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
