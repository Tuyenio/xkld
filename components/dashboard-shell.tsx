import Link from 'next/link'
import type { ReactNode } from 'react'
import { GlassCard } from '@/components/glass-card'
import { dashboardNavItems, type DashboardNavItem } from '@/lib/dashboard-data'

type DashboardShellProps = {
  title: string
  description: string
  active: DashboardNavItem['key']
  children: ReactNode
  sidebarExtra?: ReactNode
}

export function DashboardShell({ title, description, active, children, sidebarExtra }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6">
        <aside className="xl:col-span-1 space-y-4">
          <GlassCard className="p-6">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Candidate Dashboard</p>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </GlassCard>

          <GlassCard className="p-4">
            <nav className="space-y-2">
              {dashboardNavItems.map((item) => {
                const isActive = item.key === active
                return (
                  <Link key={item.key} href={item.href}>
                    <div
                      className={
                        isActive
                          ? 'rounded-lg border border-accent/30 bg-accent/15 p-3'
                          : 'rounded-lg border border-transparent hover:border-border/60 hover:bg-muted/30 p-3 transition-colors'
                      }
                    >
                      <p className={isActive ? 'font-semibold text-accent' : 'font-semibold text-foreground'}>{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </GlassCard>

          {sidebarExtra}
        </aside>

        <main className="xl:col-span-3 space-y-6">{children}</main>
      </div>
    </div>
  )
}
