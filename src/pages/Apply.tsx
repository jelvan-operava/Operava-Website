import { useSearchParams } from "react-router-dom"
import OperavaIntakeForm from "../components/forms/OperavaIntakeForm"
import PageHero from "../components/PageHero"

export default function Apply() {
  const [params] = useSearchParams()
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="OPERAVA / CAREERS"
        title="Job application"
        description="Applicants only. Client work inquiries use Request a Quote. Email verification is required before Talent receives the file."
      />
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <OperavaIntakeForm
            kind="CAREERS"
            defaultPosition={
              params.get("role") || params.get("position") || undefined
            }
          />
        </div>
      </section>
    </main>
  )
}
