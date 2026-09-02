import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'

interface CareerApplyFormProps {
  roleTitle: string
  onClose: () => void
  onSent?: (referenceId: string) => void
}

export default function CareerApplyForm({ roleTitle, onClose }: CareerApplyFormProps) {
  const target = `/apply?role=${encodeURIComponent(roleTitle)}`
  return (
    <div className="mt-4 p-4 rounded-2xl bg-violet-50 border border-violet-200 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900">Apply for {roleTitle}</p>
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close application prompt">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-gray-600">Applications use the official Careers form with email verification and resume upload.</p>
      <Link to={target} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-violet-700 rounded-xl">
        Continue to application
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}
