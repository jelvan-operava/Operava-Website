import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { label: t('nav.home', 'Home'), href: '/' },
    {
      label: t('nav.services', 'Services'),
      href: '/services',
      children: [
        {
          label: t('nav.services.it', 'Information Technology'),
          href: '/services/it',
          description: t('nav.services.it.desc', 'Software, cloud, infrastructure & data'),
        },
        {
          label: t('nav.services.bpo', 'Business Process Outsourcing'),
          href: '/services/bpo',
          description: t('nav.services.bpo.desc', 'Customer ops, back-office & workforce'),
        },
      ],
    },
    { label: t('section.services.badge', 'Capabilities'), href: '/#capabilities' },
    { label: t('nav.industries', 'Industries'), href: '/industries' },
    { label: t('nav.about', 'About'), href: '/about' },
    { label: t('nav.careers', 'Careers'), href: '/careers' },
    { label: t('nav.insights', 'Insights'), href: '/insights' },
    { label: t('nav.contact', 'Contact'), href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : 'shadow-xs'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="OPERAVA Global Solutions — Home">
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden bg-white flex items-center justify-center">
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
              className="h-full w-full object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
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
            <span className="text-xl font-black tracking-tight text-gray-900 group-hover:text-violet-700 transition-colors duration-200">
              {t('brand.name', 'OPERAVA')}
            </span>
          </div>
        </Link>

        {/* Desktop nav items */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setServicesOpen((o) => !o)}
                  onKeyDown={(e) => e.key === 'Escape' && setServicesOpen(false)}
                  type="button"
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-violet-700 bg-violet-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-fade-in z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-violet-50 transition-colors duration-150 group"
                      >
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
                          {child.label}
                        </span>
                        <span className="text-xs text-gray-500 leading-normal">{child.description}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-violet-700 bg-violet-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs & Language Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher variant="desktop" />

          <Link
            to="/services/it"
            className="text-sm font-medium text-gray-700 hover:text-violet-700 transition-colors duration-200"
          >
            {t('nav.exploreServices', 'Explore Services')}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <span>{t('nav.talkToUs', 'Talk to Us')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu and mobile switcher container */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher variant="desktop" />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            type="button"
            className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          ref={mobileRef}
          className="lg:hidden bg-white border-t border-gray-100 animate-fade-in shadow-xl max-h-[85vh] overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <button
                    onClick={() => setServicesOpen((o) => !o)}
                    type="button"
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-800 rounded-xl hover:bg-gray-50"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-violet-700' : ''}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="pl-4 flex flex-col gap-1 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="px-4 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(link.href) ? 'text-violet-700 bg-violet-50 font-semibold' : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Mobile Language Switcher Section */}
            <div className="pt-3 pb-2 border-t border-gray-100 mt-2">
              <LanguageSwitcher variant="mobile" />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors shadow-sm"
              >
                <span>{t('nav.talkToUs', 'Talk to Us')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
