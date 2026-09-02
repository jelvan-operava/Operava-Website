import OperavaIntakeForm from '../components/forms/OperavaIntakeForm'

export default function Contact() {
  return (
    <main className="bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-3">Contact</p>
        <h1 className="text-4xl font-black text-gray-900 mb-3">General inquiry</h1>
        <p className="text-sm text-gray-600 mb-8">For service quotations use Request a Quote. For jobs use Careers. This form is for general OPERAVA messages.</p>
        <OperavaIntakeForm kind="CONTACT" />
      </div>
    </main>
  )
}
