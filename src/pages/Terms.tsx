import { useLanguage } from '../i18n/LanguageContext'

export default function Terms() {
  const { t } = useLanguage()

  const sections = [
    {
      title: '1. Acceptance of Terms',
      body: 'By accessing or using the OPERAVA Global Solutions website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.',
    },
    {
      title: '2. Use of the Website',
      body: 'You may use our website for lawful purposes only. You agree not to use the website in any way that violates applicable laws or regulations, infringes the rights of others, or disrupts the operation of the website.',
    },
    {
      title: '3. Intellectual Property',
      body: 'All content on this website, including text, graphics, logos and design elements, is the property of OPERAVA Global Solutions or its content providers and is protected by applicable intellectual property laws.',
    },
    {
      title: '4. Services',
      body: 'The services described on this website are offered subject to separate service agreements between OPERAVA Global Solutions and its clients. Information on this website does not constitute a binding offer of services.',
    },
    {
      title: '5. Accuracy of Information',
      body: 'We strive to ensure the accuracy of information on this website but make no warranties or representations regarding completeness, accuracy or reliability of any content.',
    },
    {
      title: '6. Limitation of Liability',
      body: 'To the fullest extent permitted by law, OPERAVA Global Solutions shall not be liable for any indirect, incidental, consequential or punitive damages arising from your use of this website.',
    },
    {
      title: '7. Links to Third-Party Websites',
      body: 'Our website may contain links to external websites. We are not responsible for the content, accuracy or privacy practices of third-party websites.',
    },
    {
      title: '8. Changes to Terms',
      body: 'We reserve the right to update these Terms & Conditions at any time. Continued use of the website following any changes constitutes acceptance of the revised terms.',
    },
    {
      title: '9. Governing Law',
      body: 'These Terms & Conditions shall be governed by and construed in accordance with the laws of the Republic of the Philippines.',
    },
    {
      title: '10. Contact',
      body: 'If you have questions about these Terms & Conditions, please contact us through our website contact form.',
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
            {t('footer.terms', 'Terms & Conditions')}
          </h1>
          <p className="text-gray-400 text-sm">{t('legal.lastUpdated', 'Last updated: August 2026')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
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
