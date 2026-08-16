import { useLanguage } from '../i18n/LanguageContext'

export default function Privacy() {
  const { t } = useLanguage()

  const sections = [
    {
      title: '1. ' + t('legal.introTitle', 'Introduction'),
      body: 'OPERAVA Global Solutions ("OPERAVA", "we", "our", "us") is committed to protecting the privacy of individuals who interact with our website and services. This Privacy Policy explains how we collect, use, store and protect personal information.',
    },
    {
      title: '2. Information We Collect',
      body: 'We may collect personal information that you provide directly to us, including your name, company name, work email address, phone number, country and any information you include in inquiry forms. We also collect standard web analytics data through server logs and analytics tools.',
    },
    {
      title: '3. How We Use Your Information',
      body: 'We use the information you provide to respond to your inquiries, provide the services you have requested, communicate about our services, and improve our website and offerings. We do not sell, rent or trade your personal information to third parties.',
    },
    {
      title: '4. Data Storage and Security',
      body: 'We apply reasonable security measures to protect personal information from unauthorized access, disclosure, alteration and destruction. We store personal information on secure systems with access controls.',
    },
    {
      title: '5. Cookies',
      body: 'Our website may use cookies and similar technologies to improve user experience and analyze web traffic. You can control cookie settings through your browser preferences.',
    },
    {
      title: '6. Third-Party Services',
      body: 'We may use trusted third-party service providers to help operate our website and deliver services. These providers are required to handle information responsibly and only for the purposes we specify.',
    },
    {
      title: '7. Your Rights',
      body: 'Depending on your location, you may have rights regarding your personal information, including the right to access, correct or delete information we hold about you. Contact us using the details below to exercise these rights.',
    },
    {
      title: '8. Contact',
      body: 'If you have questions about this Privacy Policy or how we handle personal information, please contact us through our website contact form.',
    },
  ]

  return (
    <main>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-700 mb-4">
            {t('legal.badge', 'Legal')}
          </p>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            {t('footer.privacy', 'Privacy Policy')}
          </h1>
          <p className="text-gray-400 text-sm">{t('legal.lastUpdated', 'Last updated: August 2026')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 prose prose-gray max-w-none">
          {sections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed text-base">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
