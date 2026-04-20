'use client'

import { useState } from 'react'
import { ShieldCheck, KeyRound, Smartphone, Laptop, AlertTriangle, LockKeyhole, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { DashboardShell } from '@/components/dashboard-shell'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'
import { signOut } from '@/lib/auth-actions'

export default function DashboardSecurityPage() {
  const router = useRouter()
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.replace('/login')
  }

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Password confirmation does not match.')
      return
    }

    setIsChangingPassword(true)
    try {
      const response = await apiClient.auth.changePassword(passwordForm)
      setPasswordSuccess(response.message)
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      await signOut()
      router.replace('/login')
    } catch (error) {
      setPasswordError(
        toApiErrorMessage(error, 'Could not change password. Please try again.'),
      )
    } finally {
      setIsChangingPassword(false)
    }
  }

  const activeSessions = [
    { id: 's1', device: 'MacBook Pro - Chrome', location: 'Ho Chi Minh City', lastSeen: 'Now', current: true },
    { id: 's2', device: 'iPhone 15 - Safari', location: 'Ho Chi Minh City', lastSeen: '2 hours ago', current: false },
  ]

  return (
    <DashboardShell
      title="Account Security"
      description="Protect your account with strong authentication and secure session controls."
      active="security"
      sidebarExtra={
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <CheckCircle2 size={16} />
            <p className="font-semibold">Security score: 88%</p>
          </div>
          <p className="text-xs text-muted-foreground">Enable 2FA and rotate password every 90 days to reach 100%.</p>
        </GlassCard>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <ShieldCheck className="text-accent mb-3" size={22} />
          <h2 className="text-xl font-bold text-foreground mb-2">Two-Factor Authentication</h2>
          <p className="text-muted-foreground mb-4">Add a second layer of account protection for all sign-ins.</p>
          <div className="flex gap-2 mb-4 text-xs">
            <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">App Authenticator</span>
            <span className="rounded-full border border-border px-2 py-1 text-muted-foreground">SMS Backup</span>
          </div>
          <PremiumButton variant="secondary" size="sm" icon={<Smartphone size={15} />}>Enable 2FA</PremiumButton>
        </GlassCard>

        <GlassCard className="p-6">
          <KeyRound className="text-accent mb-3" size={22} />
          <h2 className="text-xl font-bold text-foreground mb-2">Password Rotation</h2>
          <p className="text-muted-foreground mb-4">Update your credentials regularly to reduce security risk.</p>
          <div className="space-y-2 text-sm mb-4">
            <p className="text-muted-foreground">Last changed: 42 days ago</p>
            <p className="text-muted-foreground">Recommended interval: 90 days</p>
          </div>
          <form className="space-y-3" onSubmit={handlePasswordChange}>
            <Input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(event) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  currentPassword: event.target.value,
                }))
              }
              placeholder="Current password"
              required
            />
            <Input
              type="password"
              value={passwordForm.newPassword}
              onChange={(event) =>
                setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))
              }
              placeholder="New password"
              required
            />
            <Input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(event) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }))
              }
              placeholder="Confirm new password"
              required
            />
            {passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
            {passwordSuccess && <p className="text-xs text-emerald-600">{passwordSuccess}</p>}
            <PremiumButton
              type="submit"
              variant="outline"
              size="sm"
              icon={<LockKeyhole size={15} />}
              isLoading={isChangingPassword}
            >
              Change Password
            </PremiumButton>
          </form>
        </GlassCard>

        <GlassCard className="p-6 md:col-span-2">
          <h3 className="text-lg font-bold text-foreground mb-4">Active Sessions</h3>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="rounded-lg border border-border/70 bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="rounded-md bg-primary/10 p-2 text-primary border border-primary/20">
                    <Laptop size={15} />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{session.device}</p>
                    <p className="text-sm text-muted-foreground">{session.location} · {session.lastSeen}</p>
                  </div>
                </div>
                {session.current ? (
                  <span className="text-xs rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/25 px-3 py-1 font-semibold w-fit">Current session</span>
                ) : (
                  <PremiumButton variant="ghost" size="sm" onClick={() => void handleSignOut()}>Sign out</PremiumButton>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:col-span-2 border border-orange-500/30 bg-orange-500/5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-bold text-foreground mb-1">Security advisory</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Avoid reusing passwords across services and always verify recruiter domains before sharing documents.
              </p>
              <PremiumButton variant="outline" size="sm">View security tips</PremiumButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardShell>
  )
}
