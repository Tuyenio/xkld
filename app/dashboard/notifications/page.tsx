import { Bell, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'

export default function DashboardNotificationsPage() {
  const notifications = [
    { id: 1, title: 'Interview invitation received', time: '2h ago', unread: true },
    { id: 2, title: 'Profile viewed by recruiter', time: '1d ago', unread: false },
    { id: 3, title: 'New matching job posted', time: '2d ago', unread: false },
  ]

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">Notification Center</h1>
        <div className="space-y-4">
          {notifications.map((item) => (
            <GlassCard key={item.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="text-accent" size={18} />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
              {item.unread && <span className="badge-premium">New</span>}
            </GlassCard>
          ))}
        </div>
        <Link href="/dashboard" className="inline-block mt-6">
          <PremiumButton variant="outline" icon={<CheckCircle2 size={16} />}>Back to Dashboard</PremiumButton>
        </Link>
      </div>
    </div>
  )
}
