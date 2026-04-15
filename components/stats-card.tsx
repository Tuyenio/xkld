import { ReactNode } from 'react'
import { GlassCard } from '@/components/glass-card'

interface StatsCardProps {
  title: string
  value: string
  change?: string
  icon?: ReactNode
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        {icon}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {change && <span className="text-xs font-semibold text-emerald-600">{change}</span>}
      </div>
    </GlassCard>
  )
}
