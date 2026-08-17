import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const footerServices = [
    { label: t('nav.services.it', 'Information Technology'), href: '/services/it' },
    { label: t('nav.services.bpo', 'Business Process Outsourcing'), href: '/services/bpo' },
    { label: 'Software Development', href: '/services/it/software-development' },
    { label: 'Web & Mobile Apps', href: '/services/it/web-mobile-development' },
    { label: 'Cloud Services & Infrastructure', href: '/services/it/cloud-services' },
    { label: 'Customer Service', href: '/services/bpo/customer-service' },
    { label: 'Technical Support', href: '/services/bpo/technical-support' },
    { label: 'Back-Office Operations', href: '/services/bpo/back-office-operations' },
  ]

  const footerCompany = [
    { label: t('nav.about', 'About'), href: '/about' },
    { label: t('nav.careers', 'Careers'), href: '/careers' },
    { label: t('nav.insights', 'Insights'), href: '/insights' },
    { label: t('nav.contact', 'Contact'), href: '/contact' },
  ]

  const footerLegal = [
    { label: t('footer.privacy', 'Privacy Policy'), href: '/privacy' },
    { label: t('footer.terms', 'Terms & Conditions'), href: '/terms' },
  ]

  return (
    <footer className="bg-gray-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-5 inline-flex" aria-label="OPERAVA Global Solutions — Home">
              <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-black border border-white/20 group-hover:border-violet-400/80 transition-all flex items-center justify-center">
                <video
                  ref={(el) => {
                    if (el) {
                      el.muted = true
                      el.defaultMuted = true
                      el.play().catch(() => {})
                    }
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  controls={false}
                  className="h-full w-full object-cover pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
                  onLoadedMetadata={(e) => {
                    e.currentTarget.muted = true
                    e.currentTarget.play().catch(() => {})
                  }}
                  onCanPlay={(e) => {
                    e.currentTarget.play().catch(() => {})
                  }}
                >
                  <source src="https://res.cloudinary.com/mgyosgsm/video/upload/Video_ffvnwd.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="flex flex-col leading-none">
                <div className="text-2xl font-black tracking-tight text-white group-hover:text-violet-300 transition-colors">
                  {t('brand.name', 'OPERAVA')}
                </div>
                <div className="text-[10px] font-semibold tracking-[0.18em] text-violet-400 uppercase mt-0.5">
                  {t('brand.tagline', 'Global Solutions')}
                </div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {t('brand.slogan', 'Operating in Advance.')}
            </p>
            <p className="text-xs text-gray-500">
              {t('brand.sub', 'Technology • Workforce • Business Process Services')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">
              {t('footer.services', 'Services')}
            </h3>
            <ul className="space-y-3">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">
              {t('footer.company', 'Company')}
            </h3>
            <ul className="space-y-3">
              {footerCompany.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">
              {t('footer.legal', 'Legal')}
            </h3>
            <ul className="space-y-3 mb-8">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-600 transition-colors duration-200"
            >
              {t('nav.talkToUs', 'Talk to Us')}
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 OPERAVA Global Solutions. {t('footer.rights', 'All rights reserved.')}
          </p>
          <p className="text-xs text-gray-600">{t('footer.location', 'Philippines • Global Operations')}</p>
        </div>
      </div>
    </footer>
  )
}
