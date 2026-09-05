import { Link } from 'react-router-dom'
import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'

export default function Contact() {
  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black text-gray-900 mb-3">Services &amp; business inquiry</h1>
        <p className="text-sm text-gray-600 mb-8">
          Reach out to OPERAVA for services, solutions, quotations, and partnership inquiries. For job applications, please visit{' '}
          <Link to="/careers" className="text-violet-700 underline font-medium">
            Careers
          </Link>
          .
        </p>
        <OperavaIntakeForm kind="SERVICES" defaultCategory="General Business Inquiry & Consultation" />
      </div>
    </main>
  )
}
