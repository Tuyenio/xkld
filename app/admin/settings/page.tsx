import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bell, ShieldCheck, Globe, Save } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="bg-background">
        <div className="bg-gradient-to-r from-background to-muted/30 border-b border-border/50 sticky top-0 z-20">
          <div className="px-6 py-6">
            <h1 className="text-4xl font-bold text-foreground mb-1">System Settings</h1>
            <p className="text-muted-foreground">Configure platform defaults, notifications, and security.</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Globe className="text-accent" size={18} />
                <h2 className="text-xl font-bold text-foreground">General</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company name</Label>
                  <Input id="company-name" defaultValue="XKLD VietDai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support email</Label>
                  <Input id="support-email" type="email" defaultValue="support@xkld.vn" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Default language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="vi">Vietnamese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Bell className="text-accent" size={18} />
                <h2 className="text-xl font-bold text-foreground">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border/60 p-4">
                  <div>
                    <p className="font-semibold text-foreground">New Application Alert</p>
                    <p className="text-sm text-muted-foreground">Notify recruiters when a candidate applies.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/60 p-4">
                  <div>
                    <p className="font-semibold text-foreground">Daily Summary Email</p>
                    <p className="text-sm text-muted-foreground">Send report at 8:00 AM each day.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/60 p-4">
                  <div>
                    <p className="font-semibold text-foreground">System Incident Alerts</p>
                    <p className="text-sm text-muted-foreground">Notify admins on service degradation.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="text-accent" size={18} />
                <h3 className="text-lg font-bold text-foreground">Security</h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>2FA for all admin accounts: Enabled</p>
                <p>Password rotation: Every 90 days</p>
                <p>Session timeout: 30 minutes</p>
              </div>
              <PremiumButton variant="outline" size="sm" className="mt-4 w-full">
                Manage Security Policies
              </PremiumButton>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Save Changes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Apply all modified settings to production configuration.
              </p>
              <PremiumButton variant="primary" className="w-full" icon={<Save size={16} />}>
                Save Settings
              </PremiumButton>
            </GlassCard>
          </div>
        </div>
    </div>
  )
}
