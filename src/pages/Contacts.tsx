import { Link } from 'react-router-dom'
import { Mail, Phone, ExternalLink, ShieldCheck, MessageCircle } from 'lucide-react'
import { contactChannels, verificationPortalUrl } from '../data/contacts'

export default function Contacts() {
  return (
    <main className="bg-[#FBFBFA] min-h-screen">
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 border-b border-stone-100/80 bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
            OPERAVA / CONTACTS
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            How to contact OPERAVA
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
            Use the channel that matches your request. Each department is listed with when and how to
            reach OPERAVA Global Solutions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-violet-700 rounded-xl hover:bg-violet-800 transition-colors"
            >
              Services inquiry form
            </Link>
            <a
              href={verificationPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-violet-800 bg-violet-50 border border-violet-100 rounded-xl hover:bg-violet-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              Document Verification Portal
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="w-full max-w-[100rem] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {contactChannels.map((c) => (
              <article
                key={c.id}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{c.description}</p>
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    When to contact
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{c.whenToContact}</p>
                </div>
                <div className="space-y-2">
                  {c.email && (
                    <a
                      href={`mailto:${c.email}`}
                      className="flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      {c.email}
                    </a>
                  )}
                  {c.phone && (
                    <a
                      href={`https://wa.me/${c.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      WhatsApp {c.phone}
                    </a>
                  )}
                  {c.url && (
                    <a
                      href={c.url}
                      target={c.url.startsWith('http') ? '_blank' : undefined}
                      rel={c.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
                    >
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      {c.url.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
