import { ShieldCheck, KeyRound } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'

export default function DashboardSecurityPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">Account Security</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <ShieldCheck className="text-accent mb-3" size={22} />
            <h2 className="text-xl font-bold text-foreground mb-2">Two-Factor Authentication</h2>
            <p className="text-muted-foreground mb-4">Add a second layer of account protection for all sign-ins.</p>
            <PremiumButton variant="secondary" size="sm">Enable 2FA</PremiumButton>
          </GlassCard>
          <GlassCard className="p-6">
            <KeyRound className="text-accent mb-3" size={22} />
            <h2 className="text-xl font-bold text-foreground mb-2">Password Rotation</h2>
            <p className="text-muted-foreground mb-4">Update your credentials regularly to reduce security risk.</p>
            <PremiumButton variant="outline" size="sm">Change Password</PremiumButton>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
