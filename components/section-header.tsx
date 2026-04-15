import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  kicker?: string
  align?: 'left' | 'center'
  action?: ReactNode
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  kicker,
  align = 'left',
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {kicker && <p className="badge-premium">{kicker}</p>}
      <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{title}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
      {action}
    </div>
  )
}
