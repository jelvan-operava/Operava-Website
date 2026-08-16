import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import NotFound from './pages/NotFound'

function RouteManager() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Update document title dynamically based on route
    const path = location.pathname
    if (path === '/' || path === '') {
      document.title = 'OPERAVA'
    } else if (path.startsWith('/about')) {
      document.title = 'About Us | OPERAVA'
    } else if (path.startsWith('/services/it')) {
      document.title = 'Information Technology Services | OPERAVA'
    } else if (path.startsWith('/services/bpo')) {
      document.title = 'Business Process Outsourcing Services | OPERAVA'
    } else if (path.startsWith('/services')) {
      document.title = 'Services & Solutions | OPERAVA'
    } else if (path.startsWith('/industries')) {
      document.title = 'Industries | OPERAVA'
    } else if (path.startsWith('/careers')) {
      document.title = 'Careers | OPERAVA'
    } else if (path.startsWith('/insights')) {
      document.title = 'Insights & Thought Leadership | OPERAVA'
    } else if (path.startsWith('/contact')) {
      document.title = 'Contact Us | OPERAVA'
    } else if (path.startsWith('/privacy')) {
      document.title = 'Privacy Policy | OPERAVA'
    } else if (path.startsWith('/terms')) {
      document.title = 'Terms of Service | OPERAVA'
    } else {
      document.title = 'OPERAVA'
    }

    // Trigger subtle route loading progress bar
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 450)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return <RouteLoadingProgress isLoading={loading} />
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 selection:bg-violet-100 selection:text-violet-800">
      <SmoothScroll />
      <RouteManager />
      <Navigation />
      <div className="flex-1">
        <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
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
