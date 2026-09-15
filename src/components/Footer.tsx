import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import EmailDirectoryCarousel from './EmailDirectoryCarousel'
import OperavaLogo from './OperavaLogo'

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
    { label: t('footer.refund', 'Refund Policy'), href: '/refund-policy' },
  ]

  const renderFooterLink = (item: { label: string; href: string }) => {
    const className = 'text-sm text-gray-400 hover:text-white transition-colors duration-200'
    if (item.href.startsWith('http')) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {item.label}
        </a>
      )
    }
    return (
      <Link to={item.href} className={className}>
        {item.label}
      </Link>
    )
  }

  return (
    <>
      <section className="bg-[#FBFBFA] border-t border-stone-200/80 py-12 lg:py-14">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <EmailDirectoryCarousel />
        </div>
      </section>

      <footer className="bg-gray-950 text-white border-t border-white/10">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-5 inline-flex" aria-label="OPERAVA Global Solutions — Home">
              <OperavaLogo
                size={44}
                className="transition-transform duration-200 group-hover:scale-105"
              />
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
            <p className="text-xs text-gray-500 mb-6">
              {t('brand.sub', 'Technology • Workforce • Business Process Services')}
            </p>

            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3 flex items-center gap-2">
                <span>Connect With Us</span>
                <span className="text-[11px] text-violet-400 font-mono lowercase tracking-normal">@operavaglobal</span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <a href="https://facebook.com/operavaglobal" target="_blank" rel="noopener noreferrer" aria-label="Follow OPERAVA on Facebook (@operavaglobal)" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200 flex items-center justify-center shadow-sm" title="Facebook (@operavaglobal)">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://x.com/operavaglobal" target="_blank" rel="noopener noreferrer" aria-label="Follow OPERAVA on Twitter / X (@operavaglobal)" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-black hover:border-white/40 transition-all duration-200 flex items-center justify-center shadow-sm" title="Twitter / X (@operavaglobal)">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://tiktok.com/@operavaglobal" target="_blank" rel="noopener noreferrer" aria-label="Follow OPERAVA on TikTok (@operavaglobal)" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#000000] hover:border-[#FE2C55] transition-all duration-200 flex items-center justify-center shadow-sm" title="TikTok (@operavaglobal)">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.48 6.29 6.29 0 0 0 1.88-4.48V8.71a8.21 8.21 0 0 0 4.9 1.6V6.86c-.34-.03-.67-.09-1-.17z"/></svg>
                </a>
                <a href="https://instagram.com/operavaglobal" target="_blank" rel="noopener noreferrer" aria-label="Follow OPERAVA on Instagram (@operavaglobal)" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent transition-all duration-200 flex items-center justify-center shadow-sm" title="Instagram (@operavaglobal)">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://linkedin.com/company/operavaglobal" target="_blank" rel="noopener noreferrer" aria-label="Follow OPERAVA on LinkedIn (@operavaglobal)" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-200 flex items-center justify-center shadow-sm" title="LinkedIn (@operavaglobal)">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">{t('footer.services', 'Services')}</h3>
            <ul className="space-y-3">{footerServices.map((item) => (<li key={item.href}>{renderFooterLink(item)}</li>))}</ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">{t('footer.company', 'Company')}</h3>
            <ul className="space-y-3">{footerCompany.map((item) => (<li key={item.href}>{renderFooterLink(item)}</li>))}</ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-4">{t('footer.legal', 'Legal')}</h3>
            <ul className="space-y-3 mb-8">{footerLegal.map((item) => (<li key={item.href}>{renderFooterLink(item)}</li>))}</ul>
            <Link to="/contact" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-600 transition-colors duration-200">{t('nav.talkToUs', 'Talk to Us')}</Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-sm text-gray-500">© 2026 OPERAVA Global Solutions. {t('footer.rights', 'All rights reserved.')}</p>
            <span className="hidden sm:inline text-gray-700">•</span>
            <p className="text-xs text-gray-600">{t('footer.location', 'Philippines • Global Operations')}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-400 select-text">
              SEC Registration Number: 2026080262213-03
            </span>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
