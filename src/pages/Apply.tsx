import { useSearchParams } from 'react-router-dom'
import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'

export default function Apply() {
  const [params] = useSearchParams()
  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-3">Careers</p>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Job application</h1>
        <p className="text-sm text-gray-600 mb-8">Applicants only. Client work inquiries use Request a Quote. Email verification is required before Talent receives the file.</p>
        <OperavaIntakeForm kind="CAREERS" defaultPosition={params.get('role') || params.get('position') || undefined} />
      </div>
    </main>
  )
}
