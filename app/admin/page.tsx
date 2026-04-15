import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { BarChart3, Users, Briefcase, TrendingUp, AlertCircle, Plus, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const stats = [
    { icon: Briefcase, label: 'Total Jobs', value: '48', change: '+12%' },
    { icon: Users, label: 'Total Candidates', value: '1,240', change: '+5%' },
    { icon: TrendingUp, label: 'Applications', value: '847', change: '+23%' },
    { icon: BarChart3, label: 'Placements', value: '124', change: '+8%' },
  ]

  const recentApplications = [
    { id: 1, candidate: 'Nguyễn Văn Nam', job: 'Senior Software Engineer', status: 'Interview', date: '2024-03-15' },
    { id: 2, candidate: 'Trần Thị Hương', job: 'Product Manager', status: 'Under Review', date: '2024-03-14' },
    { id: 3, candidate: 'Hoàng Văn Tú', job: 'UX Designer', status: 'New', date: '2024-03-13' },
    { id: 4, candidate: 'Lê Thị Linh', job: 'DevOps Engineer', status: 'Interview', date: '2024-03-12' },
  ]

  return (
    <div className="bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-background to-muted/30 border-b border-border/50 sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your recruitment platform</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <stat.icon className="text-accent" size={24} />
                  </div>
                  <span className="text-emerald-600 text-sm font-bold">{stat.change}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </GlassCard>
            ))}
          </div>

          {/* Priority Alert */}
          <GlassCard className="p-6 border-l-4 border-l-amber-500">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-amber-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-2">Action Required</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  5 applications pending review. Expedite processing by reviewing them now.
                </p>
                <Link href="/admin/applications">
                  <PremiumButton variant="primary" size="sm">
                    Review Applications
                  </PremiumButton>
                </Link>
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <GlassCard className="xl:col-span-2 p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Recent Applications</h2>
                <Link href="/admin/applications">
                  <PremiumButton variant="ghost" size="sm">
                    View All
                  </PremiumButton>
                </Link>
              </div>
              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-all duration-200 cursor-pointer">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{app.candidate}</p>
                      <p className="text-sm text-muted-foreground">{app.job}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        app.status === 'Interview' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                        app.status === 'Under Review' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' :
                        'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {app.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-2">{app.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/admin/jobs" className="block">
                  <PremiumButton variant="secondary" className="w-full justify-start" icon={<Plus size={18} />}>
                    New Job
                  </PremiumButton>
                </Link>
                <Link href="/admin/candidates" className="block">
                  <PremiumButton variant="secondary" className="w-full justify-start" icon={<Users size={18} />}>
                    Candidates
                  </PremiumButton>
                </Link>
                <Link href="/admin/settings" className="block">
                  <PremiumButton variant="secondary" className="w-full justify-start" icon={<Settings size={18} />}>
                    Settings
                  </PremiumButton>
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
    </div>
  )
}
