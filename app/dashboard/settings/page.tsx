import { Globe, Bell, UserCircle } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { Switch } from '@/components/ui/switch'

export default function DashboardSettingsPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">User Settings</h1>
        <div className="space-y-4">
          <GlassCard className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3"><Bell size={18} className="text-accent" /><p className="font-semibold">Email notifications</p></div>
            <Switch defaultChecked />
          </GlassCard>
          <GlassCard className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3"><Globe size={18} className="text-accent" /><p className="font-semibold">Language preference</p></div>
            <p className="text-sm text-muted-foreground">English</p>
          </GlassCard>
          <GlassCard className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3"><UserCircle size={18} className="text-accent" /><p className="font-semibold">Profile visibility</p></div>
            <Switch defaultChecked />
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
