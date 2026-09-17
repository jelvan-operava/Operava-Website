import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

/** OPERAVA wordmark — open A (no horizontal bar), solid brand indigo */
function OperavaWordmark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`operava-text-svg ${className}`}
      viewBox="0 0 520 72"
      width="520"
      height="72"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="operavaNavWave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2B0B90" />
          <stop offset="35%" stopColor="#2B0B90" />
          <stop offset="50%" stopColor="#4A2BB8" />
          <stop offset="65%" stopColor="#2B0B90" />
          <stop offset="100%" stopColor="#2B0B90" />
        </linearGradient>
      </defs>
      {/* Geometric ultra-bold OPERAVA; A has no crossbar (open Λ form) */}
      <text
        x="0"
        y="58"
        fill="url(#operavaNavWave)"
        fontFamily="'Arial Black', 'Arial Bold', 'Helvetica Neue', Helvetica, Impact, system-ui, sans-serif"
        fontWeight="900"
        fontSize="64"
        letterSpacing="-2.5"
        textLength="520"
        lengthAdjust="spacingAndGlyphs"
      >
        OPERAVA
      </text>
    </svg>
  )
}

export default function Navigation() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)

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
    setMobileServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setServicesOpen(false)
      }
      if (
        mobileRef.current &&
        !mobileRef.current.contains(target) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(target)
      ) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  const closeMenus = () => {
    setMobileOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }

  const goTo = (href: string) => {
    closeMenus()
    navigate(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : 'shadow-none'
      }`}
    >
      <nav className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between h-16 lg:h-18 bg-white">
        <Link
          to="/"
          className="flex items-center shrink-0 group"
          aria-label="OPERAVA Global Solutions — Home"
        >
          {/* Expanded on mobile; solid photo indigo; lightWave via CSS on gradient stops */}
          <span className="block transition-transform duration-200 group-hover:scale-[1.03] leading-none">
            <OperavaWordmark className="h-7 w-auto sm:h-8 md:h-9 select-none pointer-events-none" />
          </span>
          <span className="sr-only">{t('brand.name', 'OPERAVA')}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative flex items-center"
                ref={dropdownRef}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  id="nav-services-dropdown-btn"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setServicesOpen(false)
                    if (e.key === 'ArrowDown' && !servicesOpen) setServicesOpen(true)
                  }}
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive(link.href) || servicesOpen
                      ? 'text-violet-700 bg-violet-50 font-semibold'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-label={link.label}
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-violet-700' : ''}`}
                  />
                </button>
                {servicesOpen && (
                  <div
                    id="nav-services-dropdown-menu"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-84 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-fade-in z-50 divide-y divide-gray-100"
                  >
                    <div className="flex flex-col gap-1 p-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={closeMenus}
                          className={`flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-colors duration-150 group ${
                            location.pathname === child.href ? 'bg-violet-50 text-violet-700' : 'hover:bg-violet-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
                              {child.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-violet-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                          </div>
                          <span className="text-xs text-gray-500 leading-normal">{child.description}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 pb-1 px-3">
                      <Link
                        to="/services"
                        onClick={closeMenus}
                        className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center justify-between py-1 transition-colors"
                      >
                        <span>{t('nav.exploreServices', 'Explore All Services')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMenus}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-violet-700 bg-violet-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/services/it"
            onClick={closeMenus}
            className="text-sm font-medium text-gray-700 hover:text-violet-700 transition-colors duration-200"
          >
            {t('nav.exploreServices', 'Explore Services')}
          </Link>
          <Link
            to="/contact"
            onClick={closeMenus}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <span>{t('nav.talkToUs', 'Talk to Us')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            ref={mobileToggleRef}
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

      {mobileOpen && (
        <div
          ref={mobileRef}
          className="lg:hidden bg-white border-t border-gray-200 animate-fade-in shadow-xl max-h-[85vh] overflow-y-auto"
        >
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="w-full">
                  <button
                    onClick={() => setMobileServicesOpen((o) => !o)}
                    type="button"
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                      isActive(link.href) || mobileServicesOpen
                        ? 'text-violet-700 bg-violet-50 font-semibold'
                        : 'text-gray-800 hover:bg-gray-100'
                    }`}
                    aria-expanded={mobileServicesOpen}
                    aria-label={`Toggle ${link.label} submenu`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-violet-700' : ''}`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-3 pr-1 flex flex-col gap-1 mt-1 mb-1 animate-fade-in">
                      {link.children.map((child) => (
                        <button
                          key={child.href}
                          type="button"
                          onClick={() => goTo(child.href)}
                          className={`flex flex-col text-left px-3.5 py-2.5 rounded-xl transition-colors w-full ${
                            location.pathname === child.href
                              ? 'bg-violet-50 text-violet-700 font-semibold'
                              : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
                          }`}
                        >
                          <span className="text-sm font-semibold">{child.label}</span>
                          <span className="text-xs text-gray-500">{child.description}</span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => goTo('/services')}
                        className="px-3.5 py-2 text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center justify-between w-full text-left"
                      >
                        <span>{t('nav.exploreServices', 'Explore All Services')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors text-left w-full ${
                    isActive(link.href) ? 'text-violet-700 bg-violet-50 font-semibold' : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </button>
              )
            )}

            <div className="pt-2 flex flex-col gap-3 border-t border-gray-200 mt-2">
              <button
                type="button"
                onClick={() => goTo('/contact')}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors shadow-sm w-full"
              >
                <span>{t('nav.talkToUs', 'Talk to Us')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
