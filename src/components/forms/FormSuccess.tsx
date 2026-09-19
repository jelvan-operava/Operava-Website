interface Props {
  formType: string
  name: string
  referenceId: string
}

export default function FormSuccess({ formType, name, referenceId }: Props) {
  const copy =
    formType === 'CAREERS'
      ? 'Your application has been successfully submitted and your email address has been verified. Our Talent Acquisition team will review your application.'
      : formType === 'SERVICES'
        ? 'Your service inquiry has been successfully submitted and your email address has been verified. Our team will review your inquiry and contact you if additional information is required.'
        : formType === 'ACADEMY'
          ? 'Your OPERAVA Academy enrollment or details inquiry has been submitted and your email is verified. The Academy team will review your request. You can also access the Learning Management System at academy.operavaglobal.com.'
          : 'Your message has been successfully submitted and your email address has been verified. We will respond if further action or information is required.'

  return (
    <div className="max-w-xl mx-auto text-center space-y-4 py-8">
      <h2 className="text-3xl font-black text-gray-900">Thank you, {name}.</h2>
      <p className="text-sm text-gray-600 leading-relaxed">{copy}</p>
      <p className="text-xs uppercase tracking-widest text-gray-500">Reference ID</p>
      <p className="font-mono text-lg font-bold text-violet-800">{referenceId}</p>
      {formType === 'ACADEMY' && (
        <a
          href="https://academy.operavaglobal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm font-semibold text-violet-700 hover:text-violet-900 underline-offset-2 hover:underline"
        >
          Open Learning Management System →
        </a>
      )}
    </div>
  )
}
