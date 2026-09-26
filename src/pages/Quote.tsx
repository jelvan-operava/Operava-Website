import { useSearchParams } from "react-router-dom"
import OperavaIntakeForm from "../components/forms/OperavaIntakeForm"
import PageHero from "../components/PageHero"

export default function Quote() {
  const [params] = useSearchParams()
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="OPERAVA / SERVICES"
        title="Request a quote"
        description="Client inquiries only. Job applications use Careers. Email verification is required before OPERAVA files the request."
      />
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <OperavaIntakeForm
            kind="SERVICES"
            defaultService={params.get("service") || undefined}
            defaultCategory={params.get("category") || undefined}
          />
        </div>
      </section>
    </main>
  )
}
