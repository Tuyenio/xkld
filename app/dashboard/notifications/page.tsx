import { Bell, CheckCircle2, Clock3, BriefcaseBusiness, UserRoundSearch, Settings2 } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { DashboardShell } from '@/components/dashboard-shell'

export default function DashboardNotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'Interview invitation received',
      detail: 'Tech Company Inc invited you for a technical interview on Friday.',
      time: '2h ago',
      unread: true,
      icon: BriefcaseBusiness,
    },
    {
      id: 2,
      title: 'Profile viewed by recruiter',
      detail: '3 hiring managers viewed your profile in the last 24 hours.',
      time: '1d ago',
      unread: false,
      icon: UserRoundSearch,
    },
    {
      id: 3,
      title: 'New matching job posted',
      detail: 'A new role with 92% match score was added for your profile.',
      time: '2d ago',
      unread: false,
      icon: Bell,
    },
  ]

  const unreadCount = notifications.filter((item) => item.unread).length

  return (
    <DashboardShell
      title="Notification Center"
      description="Track every interview, recruiter action, and job recommendation in one timeline."
      active="notifications"
      sidebarExtra={
        <GlassCard className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Unread notifications</p>
          <p className="text-3xl font-bold text-accent">{unreadCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Auto-sorted by relevance and urgency</p>
        </GlassCard>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm"><Bell size={14} />Total</div>
          <p className="text-2xl font-bold text-foreground mt-2">{notifications.length}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm"><Clock3 size={14} />Unread</div>
          <p className="text-2xl font-bold text-accent mt-2">{unreadCount}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm"><Settings2 size={14} />Alert Mode</div>
          <p className="text-2xl font-bold text-foreground mt-2">Smart</p>
        </GlassCard>
      </div>

      <div className="space-y-4">
        {notifications.map((item) => {
          const ItemIcon = item.icon
          return (
            <GlassCard key={item.id} className="p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <span className="mt-0.5 rounded-md bg-accent/15 text-accent p-2 border border-accent/30">
                  <ItemIcon size={16} />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                  <p className="text-xs text-muted-foreground mt-2">{item.time}</p>
                </div>
              </div>
              {item.unread ? <span className="badge-premium">New</span> : <CheckCircle2 size={18} className="text-emerald-500 mt-1" />}
            </GlassCard>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <PremiumButton variant="outline" icon={<CheckCircle2 size={16} />}>Mark all as read</PremiumButton>
        <PremiumButton variant="ghost" icon={<Bell size={16} />}>Notification preferences</PremiumButton>
      </div>
    </DashboardShell>
  )
}
