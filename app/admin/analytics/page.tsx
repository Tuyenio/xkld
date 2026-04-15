import AdminSidebar from '@/components/admin-sidebar'
import { StatsCard } from '@/components/stats-card'
import { ChartCard } from '@/components/chart-card'
import { TrendingUp, Users, Briefcase, LineChart } from 'lucide-react'

export default function AdminAnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto md:ml-0 p-6 space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard title="Conversion Rate" value="24.6%" change="+2.4%" icon={<TrendingUp size={18} className="text-accent" />} />
          <StatsCard title="Active Candidates" value="1,482" change="+7.1%" icon={<Users size={18} className="text-accent" />} />
          <StatsCard title="Open Jobs" value="64" change="+5" icon={<Briefcase size={18} className="text-accent" />} />
          <StatsCard title="Applications/Week" value="328" change="+14%" icon={<LineChart size={18} className="text-accent" />} />
        </div>
        <ChartCard title="Application Trend" subtitle="Last 12 weeks">
          <div className="h-52 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/60 flex items-center justify-center text-muted-foreground">
            Chart area ready for realtime datasource
          </div>
        </ChartCard>
      </main>
    </div>
  )
}
