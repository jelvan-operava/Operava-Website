import { useSearchParams } from 'react-router-dom'
import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'

export default function Quote() {
  const [params] = useSearchParams()
  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-3">Services</p>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Request a quote</h1>
        <p className="text-sm text-gray-600 mb-8">
          Client inquiries only. Job applications use Careers. Email verification is required before OPERAVA files the request.
        </p>
        <OperavaIntakeForm kind="SERVICES" defaultService={params.get('service') || undefined} />
      </div>
    </main>
  )
}
