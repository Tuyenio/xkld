import { ReactNode } from 'react'
import { GlassCard } from '@/components/glass-card'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <GlassCard className="p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="min-h-52">{children}</div>
    </GlassCard>
  )
}
