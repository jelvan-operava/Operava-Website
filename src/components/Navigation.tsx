import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const IT_LINKS = [
  { label: 'Software Development', href: '/services/it/software-development' },
  { label: 'Web & Mobile Apps', href: '/services/it/web-mobile-development' },
  { label: 'SaaS & Platforms', href: '/services/it/saas-platform-development' },
  { label: 'IT Systems', href: '/services/it/it-systems-development' },
  { label: 'Computer Programming', href: '/services/it/computer-programming' },
  { label: 'IT Consulting', href: '/services/it/it-consulting' },
  { label: 'Systems Integration', href: '/services/it/systems-integration' },
  { label: 'Database Services', href: '/services/it/database-services' },
]

const BPO_LINKS = [
  { label: 'Customer Service', href: '/services/bpo/customer-service' },
  { label: 'Technical Support', href: '/services/bpo/technical-support' },
  { label: 'Help Desk', href: '/services/bpo/help-desk' },
  { label: 'Back-Office Operations', href: '/services/bpo/back-office-operations' },
  { label: 'Data Processing', href: '/services/bpo/data-processing' },
  { label: 'Data Entry', href: '/services/bpo/data-entry' },
  { label: 'Document Processing', href: '/services/bpo/document-processing' },
  { label: 'Virtual Assistance', href: '/services/bpo/virtual-assistance' },
]

const AUTOMATION_LINKS = [
  { label: 'Workflow Automation', href: '/services/it/workflow-automation' },
  { label: 'Business Process Automation', href: '/services/it/business-process-automation' },
  { label: 'AI Automation', href: '/services/it/ai-automation' },
  { label: 'Customer Service Automation', href: '/services/it/customer-service-automation' },
  { label: 'Email Automation', href: '/services/it/email-automation' },
  { label: 'Lead & Sales Automation', href: '/services/it/lead-sales-automation' },
  { label: 'Data & Reporting Automation', href: '/services/it/data-reporting-automation' },
  { label: 'Document Automation', href: '/services/it/document-automation' },
  { label: 'HR & Workforce Automation', href: '/services/it/hr-workforce-automation' },
  { label: 'Finance & Invoicing Automation', href: '/services/it/finance-invoicing-automation' },
  { label: 'System & Application Integration', href: '/services/it/system-application-integration' },
  { label: 'Notification & Alert Automation', href: '/services/it/notification-alert-automation' },
  { label: 'Scheduling & Recurring Ops', href: '/services/it/scheduling-recurring-operations' },
  { label: 'Custom Automation Solutions', href: '/services/it/custom-automation-solutions' },
]

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
    { label: t('nav.services', 'Services'), href: '/services', mega: true },
    { label: t('section.services.badge', 'Capabilities'), href: '/#services' },
    { label: t('nav.industries', 'Industries'), href: '/industries' },
    { label: t('nav.about', 'About'), href: '/about' },
    { label: t('nav.careers', 'Careers'), href: '/careers' },
    { label: t('nav.insights', 'Insights'), href: '/insights' },
    { label: t('nav.contacts', 'Contacts'), href: '/contacts' },
    { label: t('nav.verification', 'Verification'), href: '/verification' },
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
      if (dropdownRef.current && !dropdownRef.current.contains(target)) setServicesOpen(false)
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
        <Link to="/" className="flex items-center shrink-0 group" aria-label="OPERAVA Global Solutions — Home">
          <span className="operava-text text-2xl sm:text-2xl md:text-3xl font-black tracking-tight select-none transition-transform duration-200 group-hover:scale-[1.03]">
            OPERAVA
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            (link as { mega?: boolean }).mega ? (
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
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive('/services') || servicesOpen
                      ? 'text-violet-700 bg-violet-50 font-semibold'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-violet-700' : ''}`}
                  />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[min(92vw,720px)] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-fade-in z-50">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Link
                          to="/services/automation"
                          onClick={closeMenus}
                          className="flex items-center justify-between px-2 py-1.5 mb-2 rounded-lg hover:bg-violet-50 group"
                        >
                          <span className="text-xs font-bold tracking-wider uppercase text-violet-700">Automation</span>
                          <ArrowRight className="w-3 h-3 text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <ul className="space-y-0.5 max-h-[280px] overflow-y-auto pr-1">
                          {AUTOMATION_LINKS.map((item) => (
                            <li key={item.href}>
                              <Link
                                to={item.href}
                                onClick={closeMenus}
                                className={`block px-2 py-1.5 text-xs rounded-lg transition-colors ${
                                  location.pathname === item.href
                                    ? 'bg-violet-50 text-violet-700 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Link
                          to="/services/it"
                          onClick={closeMenus}
                          className="flex items-center justify-between px-2 py-1.5 mb-2 rounded-lg hover:bg-violet-50 group"
                        >
                          <span className="text-xs font-bold tracking-wider uppercase text-violet-700">Information Technology</span>
                          <ArrowRight className="w-3 h-3 text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <ul className="space-y-0.5">
                          {IT_LINKS.map((item) => (
                            <li key={item.href}>
                              <Link
                                to={item.href}
                                onClick={closeMenus}
                                className={`block px-2 py-1.5 text-xs rounded-lg transition-colors ${
                                  location.pathname === item.href
                                    ? 'bg-violet-50 text-violet-700 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Link
                          to="/services/bpo"
                          onClick={closeMenus}
                          className="flex items-center justify-between px-2 py-1.5 mb-2 rounded-lg hover:bg-violet-50 group"
                        >
                          <span className="text-xs font-bold tracking-wider uppercase text-violet-700">Outsourcing / Offshoring</span>
                          <ArrowRight className="w-3 h-3 text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <ul className="space-y-0.5">
                          {BPO_LINKS.map((item) => (
                            <li key={item.href}>
                              <Link
                                to={item.href}
                                onClick={closeMenus}
                                className={`block px-2 py-1.5 text-xs rounded-lg transition-colors ${
                                  location.pathname === item.href
                                    ? 'bg-violet-50 text-violet-700 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between px-1">
                      <Link to="/services/it" onClick={closeMenus} className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-1">
                        Explore all services
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link to="/contact" onClick={closeMenus} className="text-xs font-semibold text-gray-600 hover:text-violet-700">
                        Talk to Us
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
                  isActive(link.href) ? 'text-violet-700 bg-violet-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/services/it" onClick={closeMenus} className="text-sm font-medium text-gray-700 hover:text-violet-700 transition-colors duration-200">
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
        <div ref={mobileRef} className="lg:hidden bg-white border-t border-gray-200 animate-fade-in shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              (link as { mega?: boolean }).mega ? (
                <div key={link.href} className="w-full">
                  <button
                    onClick={() => setMobileServicesOpen((o) => !o)}
                    type="button"
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                      isActive('/services') || mobileServicesOpen
                        ? 'text-violet-700 bg-violet-50 font-semibold'
                        : 'text-gray-800 hover:bg-gray-100'
                    }`}
                    aria-expanded={mobileServicesOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-violet-700' : ''}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-3 pr-1 flex flex-col gap-3 mt-1 mb-2 animate-fade-in">
                      <div>
                        <button type="button" onClick={() => goTo('/services/automation')} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
                          Automation
                        </button>
                        {AUTOMATION_LINKS.map((item) => (
                          <button key={item.href} type="button" onClick={() => goTo(item.href)} className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:text-violet-700">
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <div>
                        <button type="button" onClick={() => goTo('/services/it')} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
                          Information Technology
                        </button>
                        {IT_LINKS.map((item) => (
                          <button key={item.href} type="button" onClick={() => goTo(item.href)} className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:text-violet-700">
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <div>
                        <button type="button" onClick={() => goTo('/services/bpo')} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
                          Outsourcing / Offshoring
                        </button>
                        {BPO_LINKS.map((item) => (
                          <button key={item.href} type="button" onClick={() => goTo(item.href)} className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:text-violet-700">
                            {item.label}
                          </button>
                        ))}
                      </div>
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
              ),
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
