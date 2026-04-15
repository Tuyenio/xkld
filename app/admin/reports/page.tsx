import AdminSidebar from '@/components/admin-sidebar'
import { GlassCard } from '@/components/glass-card'
import { SectionHeader } from '@/components/section-header'
import { DataTablePro } from '@/components/data-table-pro'

const rows = [
  { name: 'Weekly Placement Summary', period: 'Week 15', status: 'Ready' },
  { name: 'Candidate Pipeline Report', period: 'April 2026', status: 'Generating' },
]

export default function AdminReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 p-6">
        <SectionHeader title="Reports" subtitle="Generate and review business performance reports." />
        <GlassCard className="p-4">
          <DataTablePro
            rows={rows}
            columns={[
              { key: 'name', label: 'Report Name' },
              { key: 'period', label: 'Period' },
              { key: 'status', label: 'Status' },
            ]}
          />
        </GlassCard>
      </main>
    </div>
  )
}
