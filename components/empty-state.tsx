import { ReactNode } from 'react'
import { PremiumButton } from '@/components/premium-button'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted/60">
        {icon ?? <span className="text-xl">📭</span>}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      {actionLabel && onAction && (
        <PremiumButton variant="primary" onClick={onAction}>
          {actionLabel}
        </PremiumButton>
      )}
    </div>
  )
}
