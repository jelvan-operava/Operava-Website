import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'

export default function Quote() {
  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-3">Services</p>
        <h1 className="text-4xl font-black text-gray-900 mb-3">Request a quote</h1>
        <p className="text-sm text-gray-600 mb-8">Tell OPERAVA about the service you need. We verify your email before the inquiry is filed.</p>
        <OperavaIntakeForm kind="SERVICES" />
      </div>
    </main>
  )
}
