import { Globe, Bell, UserCircle, Shield, MoonStar, Mail, Smartphone } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { Switch } from '@/components/ui/switch'
import { DashboardShell } from '@/components/dashboard-shell'

export default function DashboardSettingsPage() {
  return (
    <DashboardShell
      title="User Settings"
      description="Control your account preferences, privacy options, and communication channels."
      active="settings"
      sidebarExtra={
        <GlassCard className="p-4">
          <p className="text-sm font-semibold text-foreground">Profile language</p>
          <p className="text-xs text-muted-foreground mt-1">English (US)</p>
        </GlassCard>
      }
    >
      <div className="space-y-4">
        <GlassCard className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><Bell size={18} className="text-accent" /><div><p className="font-semibold">Email notifications</p><p className="text-xs text-muted-foreground">Interviews, offers, and profile activity</p></div></div>
          <Switch defaultChecked />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><Smartphone size={18} className="text-accent" /><div><p className="font-semibold">Push notifications</p><p className="text-xs text-muted-foreground">Important updates on mobile devices</p></div></div>
          <Switch defaultChecked />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><Mail size={18} className="text-accent" /><div><p className="font-semibold">Weekly digest</p><p className="text-xs text-muted-foreground">Top job matches every Monday</p></div></div>
          <Switch />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><Globe size={18} className="text-accent" /><div><p className="font-semibold">Language preference</p><p className="text-xs text-muted-foreground">Choose primary dashboard language</p></div></div>
          <p className="text-sm text-muted-foreground">English</p>
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><UserCircle size={18} className="text-accent" /><div><p className="font-semibold">Profile visibility</p><p className="text-xs text-muted-foreground">Allow verified recruiters to view profile</p></div></div>
          <Switch defaultChecked />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><Shield size={18} className="text-accent" /><div><p className="font-semibold">Personalized recommendations</p><p className="text-xs text-muted-foreground">Use activity signals to improve job matches</p></div></div>
          <Switch defaultChecked />
        </GlassCard>

        <GlassCard className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3"><MoonStar size={18} className="text-accent" /><div><p className="font-semibold">Reduced motion mode</p><p className="text-xs text-muted-foreground">Lower animation intensity for accessibility</p></div></div>
          <Switch />
        </GlassCard>
      </div>
    </DashboardShell>
  )
}
