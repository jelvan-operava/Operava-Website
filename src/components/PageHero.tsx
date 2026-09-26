import type { ReactNode } from "react"

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  actions?: ReactNode
}

export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: PageHeroProps) {
  return (
    <section className="border-b border-gray-100 bg-white pt-28 pb-14 lg:pt-36 lg:pb-16">
      <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8 lg:px-12 xl:px-16">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
          {eyebrow}
        </p>
        <h1 className="mb-6 max-w-4xl text-4xl leading-[1.1] font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="max-w-3xl text-base leading-relaxed text-gray-500 sm:text-lg">
          {description}
        </div>
        {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}
