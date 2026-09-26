import { Link } from "react-router-dom"
import OperavaIntakeForm from "../components/forms/OperavaIntakeForm"
import {
  contactChannels,
  verificationPortalUrl,
  verificationEmail,
} from "../data/contacts"
import { Mail, ExternalLink, ShieldCheck, MessageCircle } from "lucide-react"
import PageHero from "../components/PageHero"

export default function Contact() {
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="OPERAVA / CONTACT"
        title="Services & business inquiry"
        description={
          <p>
            Reach out to OPERAVA for services, solutions, quotations, and
            partnership inquiries. For job applications, please visit{" "}
            <Link
              to="/careers"
              className="text-violet-700 underline font-medium"
            >
              Careers
            </Link>
            . For the full contact directory, see{" "}
            <Link
              to="/contacts"
              className="text-violet-700 underline font-medium"
            >
              Contacts
            </Link>
            . Document reference checks:{" "}
            <a
              href={verificationPortalUrl}
              className="text-violet-700 underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verification Portal
            </a>
            .
          </p>
        }
      />
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <OperavaIntakeForm
            kind="SERVICES"
            defaultCategory="General Business Inquiry & Consultation"
          />

          <section className="mt-14 pt-10 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Department contacts
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Prefer email or WhatsApp for a specific team. Verification team:{" "}
              <a
                href={`mailto:${verificationEmail}`}
                className="text-violet-700 font-medium"
              >
                {verificationEmail}
              </a>
              .
            </p>
            <ul className="space-y-4">
              {contactChannels.map((c) => (
                <li
                  key={c.id}
                  className="rounded-xl border border-gray-100 p-4"
                >
                  <p className="font-semibold text-gray-900">{c.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{c.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="font-semibold text-gray-700">When: </span>
                    {c.whenToContact}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {c.email && (
                      <a
                        href={`mailto:${c.email}`}
                        className="inline-flex items-center gap-1.5 text-sm text-violet-700 font-medium"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {c.email}
                      </a>
                    )}
                    {c.phone && (
                      <a
                        href={`https://wa.me/${c.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-violet-700 font-medium"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        {c.phone}
                      </a>
                    )}
                    {c.url && (
                      <a
                        href={c.url}
                        target={c.url.startsWith("http") ? "_blank" : undefined}
                        rel={
                          c.url.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="inline-flex items-center gap-1.5 text-sm text-violet-700 font-medium"
                      >
                        {c.id === "verification" ? (
                          <ShieldCheck className="w-3.5 h-3.5" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                        {c.url.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  )
}
