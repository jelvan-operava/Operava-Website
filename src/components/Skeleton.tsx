import { type HTMLAttributes } from 'react'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text'
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
      className={`relative overflow-hidden bg-gray-200/70 dark:bg-gray-800/60 animate-pulse ${variantClasses[variant]} ${className}`}
      style={customStyle}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
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

export function ServiceDetailSkeleton() {
  return (
    <main className="min-h-screen bg-white" aria-hidden="true">
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

export function RouteLoadingProgress({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null
  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-violet-100 overflow-hidden"
    >
      <div className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-700 animate-[progress_1.2s_ease-in-out_infinite]" />
    </div>
  )
}

export default Skeleton
