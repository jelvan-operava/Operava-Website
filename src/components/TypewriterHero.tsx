interface TypewriterHeroProps {
  fullText?: string
  className?: string
}

export default function TypewriterHero({
  fullText = 'We Operate in Advance. Your Partner in Data, Tech, and End-to-End Outsource Staffing.',
  className = '',
}: TypewriterHeroProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
        <h1 className="text-[10px] min-[420px]:text-xs sm:text-sm md:text-base font-semibold tracking-tight text-black leading-tight">
          <span>{fullText}</span>
        </h1>
      </div>
    </div>
  )
}
