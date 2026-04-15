'use client'

import { cn } from '@/lib/utils'

interface AnimatedProgressProps {
  value: number
  max?: number
  showLabel?: boolean
  animated?: boolean
  variant?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

export function AnimatedProgress({
  value,
  max = 100,
  showLabel = true,
  animated = true,
  variant = 'default',
  className,
}: AnimatedProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const variantClasses = {
    default: 'bg-gradient-to-r from-primary to-accent',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-600',
    danger: 'bg-gradient-to-r from-rose-500 to-red-600',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        {showLabel && (
          <span className="text-sm font-medium text-foreground">
            Progress
          </span>
        )}
        {showLabel && (
          <span className="text-sm font-semibold text-accent">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            variantClasses[variant],
            'h-full rounded-full transition-all duration-500 ease-out',
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
