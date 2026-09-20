import React from 'react'

interface ToolBrand {
  name: string
  category: string
  color: string
}

const tools: ToolBrand[] = [
  { name: 'Cloudflare D1', category: 'Database & Storage', color: '#F38020' },
  { name: 'Cloudflare', category: 'CDN & Edge Security', color: '#F38020' },
  { name: 'AWS', category: 'Cloud Infrastructure', color: '#FF9900' },
  { name: 'Google Cloud', category: 'Cloud & AI Platform', color: '#4285F4' },
  { name: 'Microsoft Azure', category: 'Enterprise Cloud', color: '#0078D4' },
  { name: 'GitHub', category: 'CI/CD & Code Governance', color: '#24292F' },
  { name: 'Docker', category: 'Containers & Microservices', color: '#2496ED' },
  { name: 'Stripe', category: 'Payment Infrastructure', color: '#635BFF' },
  { name: 'Zendesk', category: 'Omnichannel Support', color: '#03363D' },
  { name: 'Shopify', category: 'Global Commerce Ops', color: '#96BF48' },
  { name: 'HubSpot', category: 'Inbound & Sales Hub', color: '#FF7A59' },
  { name: 'React', category: 'Component Architecture', color: '#61DAFB' },
]

function ToolCard({ tool }: { tool: ToolBrand }) {
  return (
    <div className="flex min-w-[190px] items-center gap-3 rounded-xl px-3 py-2 opacity-60 transition-opacity hover:opacity-100 sm:min-w-[210px]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-sm font-bold" style={{ color: tool.color }} aria-hidden="true">
        {tool.name.slice(0, 1)}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold tracking-tight text-gray-900">{tool.name}</span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{tool.category}</span>
      </div>
    </div>
  )
}

export default function ToolsEcosystemMarquee() {
  const stream = [...tools, ...tools]

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-6 pt-16 select-none lg:px-8 lg:pb-8 lg:pt-24">
      <div className="relative z-10 mx-auto mb-12 max-w-7xl text-center lg:mb-16">
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
          Connected directly into the 30+ enterprise tools you rely on every day.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          From Cloudflare and AWS cloud backbones to modern business and engineering workflows, our teams and systems integrate into your native stack.
        </p>
      </div>

      <div className="space-y-4">
        {[0, 1, 2].map((row) => (
          <div key={row} className="relative flex w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-40" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-40" />
            <div className={`flex shrink-0 items-center gap-3 sm:gap-4 ${row === 1 ? 'animate-marquee-right' : 'animate-marquee-left'}`}>
              {stream.map((tool, index) => <ToolCard key={`${row}-${tool.name}-${index}`} tool={tool} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
