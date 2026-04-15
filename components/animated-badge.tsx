import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedBadgeProps {
  children: ReactNode
  className?: string
}

export function AnimatedBadge({ children, className }: AnimatedBadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-accent/15 text-accent border border-accent/30 pulse-glow', className)}>
      {children}
    </span>
  )
}
