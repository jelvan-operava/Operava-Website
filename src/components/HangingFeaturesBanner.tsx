import {
  ShieldCheck,
  Zap,
  Globe2,
  Clock,
  Lock,
  Award,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function HangingFeaturesBanner() {
  const { t } = useLanguage()

  const features = [
    {
      id: 1,
      icon: Award,
      title: 'SEC Registered',
      sub: 'Philippines HQ',
      delay: '0.0s',
      badgeColor: 'text-violet-400',
    },
    {
      id: 2,
      icon: Clock,
      title: '24/7/365',
      sub: 'Follow-the-Sun',
      delay: '0.5s',
      badgeColor: 'text-emerald-400',
    },
    {
      id: 3,
      icon: Sparkles,
      title: 'Top 1%',
      sub: 'PH Tech Talent',
      delay: '1.1s',
      badgeColor: 'text-violet-300',
    },
    {
      id: 4,
      icon: Zap,
      title: '14-Day',
      sub: 'Rapid Deploy',
      delay: '0.3s',
      badgeColor: 'text-amber-400',
    },
    {
      id: 5,
      icon: ShieldCheck,
      title: 'ISO 27001',
      sub: '& SOC2 Aligned',
      delay: '1.6s',
      badgeColor: 'text-sky-400',
    },
    {
      id: 6,
      icon: Lock,
      title: 'Zero-Breach',
      sub: 'Security Ops',
      delay: '0.8s',
      badgeColor: 'text-violet-400',
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-12">
      {/* Outer Banner Container matching OPERAVA gradient & style */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-violet-900 via-indigo-900 to-gray-950 p-6 sm:p-10 pt-12 pb-8 overflow-hidden shadow-2xl border border-violet-500/20">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-violet-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5" />
            OPERAVA Enterprise Advantage
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Engineered For Frictionless Reliability
          </h3>
        </div>

        {/* Hanging Grid Wrapper */}
        <div className="flex justify-center items-start gap-3 sm:gap-6 flex-wrap mb-8 relative z-10">
          {features.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center pt-8 w-[100px] sm:w-[130px] group"
              >
                {/* The Hanging String Wire */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-white/60 to-violet-400/40 z-0 group-hover:bg-violet-300 transition-colors" />

                {/* The Hanging Physical Card */}
                <div
                  className="w-full bg-gray-950/90 backdrop-blur-md text-white rounded-2xl p-3 sm:p-4 min-h-[110px] sm:min-h-[125px] flex flex-col items-center justify-center text-center z-10 shadow-lg shadow-black/40 border border-white/15 animate-heavy-swing hover:border-violet-400/60 transition-colors"
                  style={{
                    animationDelay: item.delay,
                  }}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-2 ${item.badgeColor}`} />
                  <div className="text-[12px] sm:text-xs font-bold leading-tight text-white">
                    {item.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-400 leading-tight mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Text Accent */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10 text-xs text-gray-400">
          <span className="font-semibold text-violet-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Global Enterprise Infrastructure
          </span>
          <span className="font-bold text-white tracking-wide">
            {t('banner.andMore', '...and a lot more enterprise capabilities!')}
          </span>
        </div>
      </div>
    </div>
  )
}
