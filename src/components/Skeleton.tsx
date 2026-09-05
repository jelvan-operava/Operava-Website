import { type HTMLAttributes } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  variant?: 'rectangular' | 'rounded' | 'circular' | 'text'
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className = '',
  variant = 'rounded',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 my-1',
  }

  const customStyle = {
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  }

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-gray-200/80 dark:bg-gray-800/60 ${variantClasses[variant]} ${className}`}
      style={customStyle}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/15 to-transparent" />
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={`h-4 ${
            i === lines - 1 && lines > 1
              ? 'w-3/5'
              : i % 2 === 0
              ? 'w-full'
              : 'w-4/5'
          }`}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white border border-gray-100 rounded-2xl p-7 shadow-xs space-y-4"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between">
            <Skeleton variant="rounded" className="w-11 h-11 rounded-xl" />
            <Skeleton variant="text" className="w-8 h-4" />
          </div>
          <Skeleton variant="text" className="w-3/4 h-6 rounded-md" />
          <SkeletonText lines={3} />
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton variant="rounded" className="w-16 h-6 rounded-lg" />
            <Skeleton variant="rounded" className="w-20 h-6 rounded-lg" />
            <Skeleton variant="rounded" className="w-24 h-6 rounded-lg" />
          </div>
          <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between">
            <Skeleton variant="text" className="w-24 h-4" />
            <Skeleton variant="circular" className="w-4 h-4" />
          </div>
        </div>
      ))}
    </>
  )
}

export function PageHeaderSkeleton() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Skeleton variant="rounded" className="w-28 h-5 rounded-full" />
          <Skeleton variant="text" className="w-4/5 h-12 lg:h-14 rounded-lg" />
          <Skeleton variant="text" className="w-3/5 h-12 lg:h-14 rounded-lg" />
          <SkeletonText lines={2} className="pt-2" />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   ROUTE-SPECIFIC CONTENT-AWARE SKELETON LAYOUTS
───────────────────────────────────────────────────────────── */

/** HOME PAGE SKELETON */
export function HomeRouteSkeleton() {
  return (
    <div className="w-full space-y-16 lg:space-y-24" aria-hidden="true">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gray-950 text-white overflow-hidden rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Skeleton variant="rounded" className="w-48 h-7 rounded-full bg-gray-800/80" />
            <div className="space-y-3">
              <Skeleton variant="text" className="w-11/12 h-12 sm:h-16 rounded-xl bg-gray-800/80" />
              <Skeleton variant="text" className="w-4/5 h-12 sm:h-16 rounded-xl bg-gray-800/80" />
            </div>
            <div className="space-y-2 max-w-xl">
              <Skeleton variant="text" className="w-full h-5 rounded-md bg-gray-800/60" />
              <Skeleton variant="text" className="w-3/4 h-5 rounded-md bg-gray-800/60" />
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Skeleton variant="rounded" className="w-44 h-12 rounded-xl bg-violet-900/60" />
              <Skeleton variant="rounded" className="w-40 h-12 rounded-xl bg-gray-800/60" />
            </div>
            {/* Stat Counters */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-800/80 max-w-lg">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton variant="text" className="w-16 h-8 rounded-lg bg-gray-800/80" />
                  <Skeleton variant="text" className="w-20 h-3 rounded-md bg-gray-800/50" />
                </div>
              ))}
            </div>
          </div>
          {/* Hero Visual Card Skeleton */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md aspect-[4/3] rounded-3xl bg-gray-900/90 border border-gray-800 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Skeleton variant="circular" className="w-10 h-10 bg-gray-800" />
                <Skeleton variant="rounded" className="w-20 h-5 bg-gray-800 rounded-md" />
              </div>
              <div className="space-y-3">
                <Skeleton variant="text" className="w-3/4 h-6 bg-gray-800" />
                <Skeleton variant="text" className="w-full h-4 bg-gray-800/60" />
                <Skeleton variant="text" className="w-4/5 h-4 bg-gray-800/60" />
              </div>
              <Skeleton variant="rounded" className="w-full h-10 bg-violet-900/40 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner Strip */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-16 rounded-2xl bg-gray-100/80 flex items-center justify-around px-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" className="w-24 sm:w-32 h-6" />
          ))}
        </div>
      </div>

      {/* 3 Solutions Pillars */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Skeleton variant="rounded" className="w-32 h-5 rounded-full mx-auto" />
          <Skeleton variant="text" className="w-3/4 h-10 rounded-lg mx-auto" />
          <Skeleton variant="text" className="w-1/2 h-4 rounded-md mx-auto" />
        </div>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200/90 rounded-3xl p-8 lg:p-12 shadow-sm grid lg:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-4">
                <Skeleton variant="rounded" className="w-12 h-6 rounded-md" />
                <Skeleton variant="text" className="w-3/4 h-8 rounded-lg" />
                <SkeletonText lines={3} />
                <div className="space-y-2 pt-2">
                  <Skeleton variant="text" className="w-4/5 h-4" />
                  <Skeleton variant="text" className="w-3/4 h-4" />
                  <Skeleton variant="text" className="w-2/3 h-4" />
                </div>
                <Skeleton variant="rounded" className="w-36 h-10 rounded-xl mt-4" />
              </div>
              <div className="h-64 sm:h-80 rounded-2xl bg-gray-100 flex items-center justify-center p-6">
                <Skeleton variant="rounded" className="w-full h-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/** ABOUT PAGE SKELETON */
export function AboutRouteSkeleton() {
  return (
    <div className="w-full space-y-16 lg:space-y-24" aria-hidden="true">
      {/* Header */}
      <PageHeaderSkeleton />

      {/* 4 Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center space-y-2">
              <Skeleton variant="text" className="w-20 h-10 rounded-lg mx-auto" />
              <Skeleton variant="text" className="w-24 h-4 rounded-md mx-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <Skeleton variant="circular" className="w-12 h-12" />
          <Skeleton variant="text" className="w-1/2 h-7" />
          <SkeletonText lines={4} />
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <Skeleton variant="circular" className="w-12 h-12" />
          <Skeleton variant="text" className="w-1/2 h-7" />
          <SkeletonText lines={4} />
        </div>
      </section>

      {/* Values 4-Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
        <Skeleton variant="text" className="w-48 h-8 rounded-lg" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl space-y-3 shadow-xs">
              <Skeleton variant="rounded" className="w-10 h-10 rounded-xl" />
              <Skeleton variant="text" className="w-3/4 h-5" />
              <SkeletonText lines={3} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/** SERVICES DIRECTORY SKELETON (IT & BPO) */
export function ServicesRouteSkeleton() {
  return (
    <div className="w-full space-y-12 lg:space-y-16" aria-hidden="true">
      {/* Header */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">
          <Skeleton variant="rounded" className="w-36 h-6 rounded-full" />
          <Skeleton variant="text" className="w-3/4 sm:w-1/2 h-12 lg:h-14 rounded-lg" />
          <Skeleton variant="text" className="w-full max-w-2xl h-5 rounded-md" />
          {/* Pill Tabs Filter */}
          <div className="flex flex-wrap gap-2.5 pt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" className="w-24 sm:w-28 h-9 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* 6 Services Card Grid (Purple Operava Card Style) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#5e42be]/90 rounded-2xl p-6 border border-[#4a32a3] flex flex-col items-center text-center space-y-4 shadow-lg"
            >
              {/* Card visual container */}
              <div className="w-full h-48 rounded-xl bg-white/10 flex items-center justify-center p-4">
                <Skeleton variant="circular" className="w-20 h-20 bg-white/20" />
              </div>
              <Skeleton variant="text" className="w-3/4 h-6 rounded-md bg-white/30" />
              <div className="space-y-2 w-full px-2">
                <Skeleton variant="text" className="w-full h-3.5 bg-white/20" />
                <Skeleton variant="text" className="w-5/6 h-3.5 bg-white/20 mx-auto" />
              </div>
              <Skeleton variant="rounded" className="w-full h-11 rounded-lg bg-white/90 mt-4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/** SERVICE DETAIL SKELETON */
export function ServiceDetailSkeleton() {
  return (
    <main className="min-h-screen bg-white" aria-hidden="true">
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton variant="text" className="w-12 h-3.5" />
            <Skeleton variant="text" className="w-4 h-3.5" />
            <Skeleton variant="text" className="w-32 h-3.5" />
            <Skeleton variant="text" className="w-4 h-3.5" />
            <Skeleton variant="text" className="w-40 h-3.5" />
          </div>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton variant="rounded" className="w-36 h-6 rounded-full" />
              <Skeleton variant="text" className="w-8 h-4" />
            </div>
            <Skeleton variant="text" className="w-3/4 h-12 rounded-lg" />
            <SkeletonText lines={2} className="pt-2" />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <Skeleton variant="text" className="w-48 h-7 rounded-md mb-4" />
              <SkeletonText lines={4} />
            </div>
            <div>
              <Skeleton variant="text" className="w-52 h-7 rounded-md mb-6" />
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl space-y-3">
                    <Skeleton variant="circular" className="w-6 h-6" />
                    <Skeleton variant="text" className="w-3/4 h-5" />
                    <SkeletonText lines={2} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-7 bg-gray-50 border border-gray-100 rounded-2xl space-y-4">
              <Skeleton variant="text" className="w-1/2 h-6" />
              <SkeletonText lines={3} />
              <Skeleton variant="rounded" className="w-full h-11 rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/** CAREERS PAGE SKELETON */
export function CareersRouteSkeleton() {
  return (
    <div className="w-full space-y-16 lg:space-y-20" aria-hidden="true">
      {/* Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gray-950 text-white rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">
          <Skeleton variant="rounded" className="w-32 h-6 rounded-full bg-gray-800" />
          <Skeleton variant="text" className="w-3/4 sm:w-1/2 h-12 lg:h-14 rounded-lg bg-gray-800" />
          <Skeleton variant="text" className="w-full max-w-xl h-5 rounded-md bg-gray-800/60" />
        </div>
      </section>

      {/* Workforce Model 3 Available Titles */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <Skeleton variant="rounded" className="w-40 h-5 rounded-md" />
          <Skeleton variant="text" className="w-1/2 h-8 rounded-lg" />
          <Skeleton variant="text" className="w-3/4 h-4 rounded-md" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <Skeleton variant="rounded" className="w-12 h-12 rounded-2xl" />
                <Skeleton variant="rounded" className="w-20 h-5 rounded-md" />
              </div>
              <Skeleton variant="text" className="w-4/5 h-6 rounded-md" />
              <SkeletonText lines={3} />
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <Skeleton variant="text" className="w-full h-3" />
                <Skeleton variant="text" className="w-5/6 h-3" />
                <Skeleton variant="text" className="w-4/6 h-3" />
              </div>
              <Skeleton variant="rounded" className="w-full h-11 rounded-xl" />
            </div>
          ))}
        </div>
      </section>

      {/* 5-Stage Hiring Process */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-3">
              <Skeleton variant="text" className="w-8 h-6 rounded-md" />
              <Skeleton variant="text" className="w-3/4 h-4" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/** CONTACT PAGE SKELETON */
export function ContactRouteSkeleton() {
  return (
    <div className="w-full space-y-12" aria-hidden="true">
      <PageHeaderSkeleton />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column Info */}
          <div className="lg:col-span-5 space-y-6">
            <Skeleton variant="text" className="w-48 h-6 rounded-md" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                  <Skeleton variant="text" className="w-32 h-5 font-bold" />
                  <Skeleton variant="text" className="w-full h-4" />
                  <Skeleton variant="text" className="w-2/3 h-4" />
                </div>
              ))}
            </div>
            <Skeleton variant="rounded" className="w-full h-24 rounded-2xl" />
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
            <Skeleton variant="text" className="w-52 h-7" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton variant="text" className="w-20 h-4" />
                <Skeleton variant="rounded" className="w-full h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton variant="text" className="w-20 h-4" />
                <Skeleton variant="rounded" className="w-full h-11 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton variant="text" className="w-24 h-4" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} variant="rounded" className="w-28 h-8 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton variant="text" className="w-28 h-4" />
              <Skeleton variant="rounded" className="w-full h-28 rounded-xl" />
            </div>
            <Skeleton variant="rounded" className="w-full h-12 rounded-xl bg-violet-600/30" />
          </div>
        </div>
      </section>
    </div>
  )
}

/** INSIGHTS / BLOG SKELETON */
export function InsightsRouteSkeleton() {
  return (
    <div className="w-full space-y-12 pb-20" aria-hidden="true">
      <PageHeaderSkeleton />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        {/* Featured Big Post */}
        <div className="rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-sm grid md:grid-cols-2 gap-6 items-center">
          <div className="h-64 sm:h-80 bg-gray-100 flex items-center justify-center p-8">
            <Skeleton variant="rounded" className="w-full h-full rounded-2xl" />
          </div>
          <div className="p-8 space-y-4">
            <Skeleton variant="rounded" className="w-24 h-5 rounded-full" />
            <Skeleton variant="text" className="w-5/6 h-8 rounded-lg" />
            <SkeletonText lines={3} />
            <Skeleton variant="rounded" className="w-32 h-9 rounded-xl" />
          </div>
        </div>

        {/* 3-column Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs space-y-4 p-5">
              <Skeleton variant="rounded" className="w-full h-44 rounded-xl" />
              <Skeleton variant="rounded" className="w-20 h-4 rounded-full" />
              <Skeleton variant="text" className="w-4/5 h-6" />
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/** LEGAL & POLICY SKELETON (Privacy / Terms) */
export function LegalRouteSkeleton() {
  return (
    <div className="w-full space-y-10 pb-24" aria-hidden="true">
      <PageHeaderSkeleton />
      <section className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
          <Skeleton variant="text" className="w-44 h-5 rounded-md" />
          <SkeletonText lines={2} />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4 pt-4 border-t border-gray-100">
            <Skeleton variant="text" className="w-1/3 h-6 rounded-md" />
            <SkeletonText lines={4} />
            <SkeletonText lines={3} />
          </div>
        ))}
      </section>
    </div>
  )
}

/** GENERAL / DEFAULT PAGE SKELETON */
export function PageSkeleton({ gridCols = 3, cardCount = 6 }: { gridCols?: 2 | 3 | 4; cardCount?: number }) {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[gridCols]

  return (
    <main className="min-h-screen bg-white" aria-label="Loading page content...">
      <PageHeaderSkeleton />
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`grid ${colClass} gap-6`}>
            <CardSkeleton count={cardCount} />
          </div>
        </div>
      </section>
    </main>
  )
}

/** CONTENT-AWARE ROUTE SELECTOR */
export function ContentAwareRouteSkeleton({ pathname }: { pathname: string }) {
  const cleanPath = pathname.toLowerCase().split('?')[0].split('#')[0]

  if (cleanPath === '/' || cleanPath === '') {
    return <HomeRouteSkeleton />
  }
  if (cleanPath === '/about') {
    return <AboutRouteSkeleton />
  }
  if (cleanPath === '/services' || cleanPath === '/services/it' || cleanPath === '/services/bpo') {
    return <ServicesRouteSkeleton />
  }
  if (cleanPath.startsWith('/services/it/') || cleanPath.startsWith('/services/bpo/')) {
    return <ServiceDetailSkeleton />
  }
  if (cleanPath === '/careers') {
    return <CareersRouteSkeleton />
  }
  if (cleanPath === '/contact') {
    return <ContactRouteSkeleton />
  }
  if (cleanPath === '/insights') {
    return <InsightsRouteSkeleton />
  }
  if (cleanPath === '/privacy' || cleanPath === '/terms') {
    return <LegalRouteSkeleton />
  }
  if (cleanPath === '/industries') {
    return <PageSkeleton gridCols={3} cardCount={6} />
  }

  return <PageSkeleton />
}

/**
 * Enhanced RouteLoadingProgress with Content-Aware Route Skeleton
 */
export function RouteLoadingProgress({
  isLoading,
  pathname,
}: {
  isLoading: boolean
  pathname?: string
}) {
  const location = useLocation()
  const activePath = pathname || location?.pathname || '/'

  return (
    <>
      {/* Subtle Top Slim Progress Indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="progressbar"
            aria-label="Loading route progress"
            className="fixed top-0 left-0 right-0 z-[100] h-1 bg-violet-100/80 overflow-hidden shadow-xs pointer-events-none"
          >
            <div className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-700 animate-[progress_1.2s_ease-in-out_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content-Aware Route Skeleton Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-busy="true"
            aria-live="polite"
            aria-label="Loading page structure"
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-[2px] overflow-y-auto pointer-events-none select-none scrollbar-none pt-4 pb-20"
          >
            <div className="w-full min-h-screen">
              <ContentAwareRouteSkeleton pathname={activePath} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Skeleton
