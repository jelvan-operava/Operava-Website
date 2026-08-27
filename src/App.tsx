import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LanguageProvider } from './i18n/LanguageContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import SmoothScroll from './components/SmoothScroll'
import AvaAssistant from './components/AvaAssistant'
import { RouteLoadingProgress } from './components/Skeleton'
import Home from './pages/Home'
import About from './pages/About'
import ITServices from './pages/ITServices'
import BPOServices from './pages/BPOServices'
import ServiceDetail from './pages/ServiceDetail'
import Industries from './pages/Industries'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Insights from './pages/Insights'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import RefundPolicy from './pages/RefundPolicy'
import PaymentPortal from './pages/PaymentPortal'
import NotFound from './pages/NotFound'
import { getMetadataForPath, updatePageSEO } from './utils/seo'
import { injectSchemaMarkup } from './utils/schema'

function RouteManager() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Scroll to top on navigation instantly and reset Lenis scroll position
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const win = window as unknown as { lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }
    if (win.lenis?.scrollTo) {
      win.lenis.scrollTo(0, { immediate: true })
    }

    // Update document title, meta description, keywords, OpenGraph, and Twitter tags dynamically
    const metadata = getMetadataForPath(location.pathname)
    updatePageSEO(metadata)

    // Dynamically inject path-specific BreadcrumbList and FAQPage Schema JSON-LD markup into document head
    injectSchemaMarkup(location.pathname, {
      title: metadata.title,
      description: metadata.description,
      breadcrumbs: metadata.breadcrumbs,
      faqs: metadata.faqs,
    })

    // Trigger subtle route loading progress bar
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return <RouteLoadingProgress isLoading={loading} pathname={location.pathname} />
}

// Subtle, refined page transition variants
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 8,
    filter: 'blur(3px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: 'blur(2px)',
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
}

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 selection:bg-violet-100 selection:text-violet-800">
      <SmoothScroll />
      <RouteManager />
      <Navigation />
      
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex-1"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services/it" element={<ITServices />} />
              <Route path="/services/bpo" element={<BPOServices />} />
              <Route path="/services/it/:slug" element={<ServiceDetail />} />
              <Route path="/services/bpo/:slug" element={<ServiceDetail />} />
              <Route path="/services" element={<ITServices />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/payment-portal" element={<PaymentPortal />} />
              <Route path="/payment" element={<PaymentPortal />} />
              <Route path="/pay" element={<PaymentPortal />} />
              <Route path="/client-portal/payment" element={<PaymentPortal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
      <ScrollToTopButton />
      <AvaAssistant />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </LanguageProvider>
  )
}
