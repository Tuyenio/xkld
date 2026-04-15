import { cn } from '@/lib/utils'

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn('rounded-2xl border border-border/60 bg-card p-6', className)}>
      <div className="h-4 w-1/3 animate-pulse rounded bg-muted mb-4" />
      <div className="h-6 w-2/3 animate-pulse rounded bg-muted mb-3" />
      <div className="h-4 w-full animate-pulse rounded bg-muted mb-2" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
    </div>
  )
}
