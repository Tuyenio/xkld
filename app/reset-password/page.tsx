'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Lock, KeyRound } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { BrandLogo } from '@/components/brand-logo'
import { apiClient } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const tokenFromQuery = searchParams.get('token') || ''

  const [token, setToken] = useState(tokenFromQuery)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const hasTokenFromQuery = useMemo(() => Boolean(tokenFromQuery), [tokenFromQuery])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!token.trim()) {
      setSubmitError('Reset token is required.')
      return
    }

    if (password.length < 8) {
      setSubmitError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setSubmitError('Password confirmation does not match.')
      return
    }

    setIsSubmitting(true)
    try {
      await apiClient.auth.resetPassword({
        token: token.trim(),
        password,
        confirmPassword,
      })
      setSubmitted(true)
    } catch (error) {
      setSubmitError(toApiErrorMessage(error, 'Could not reset password.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-xl items-center px-4 py-12">
        <div className="w-full">
          <div className="mb-8 flex justify-center">
            <BrandLogo textClassName="text-2xl" />
          </div>

          <GlassCard className="p-8 md:p-10">
            {!submitted ? (
              <>
                <h1 className="mb-2 text-3xl font-bold text-foreground">Reset Password</h1>
                <p className="mb-8 text-muted-foreground">
                  Enter your reset token and choose a new password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Reset Token</label>
                    <div className="relative">
                      <KeyRound size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Paste token from email"
                        className="bg-background/60 pl-9"
                        required
                      />
                    </div>
                    {hasTokenFromQuery && (
                      <p className="mt-2 text-xs text-muted-foreground">Token auto-filled from link.</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">New Password</label>
                    <div className="relative">
                      <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="bg-background/60 pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Confirm Password</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="bg-background/60"
                      required
                    />
                  </div>

                  {submitError && <p className="text-sm text-destructive">{submitError}</p>}

                  <PremiumButton type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                    Reset Password
                  </PremiumButton>
                </form>
              </>
            ) : (
              <>
                <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
                  <CheckCircle2 size={26} />
                </div>
                <h1 className="mb-2 text-3xl font-bold text-foreground">Password Updated</h1>
                <p className="mb-7 text-muted-foreground">
                  Your password has been reset successfully. You can sign in with your new password.
                </p>
                <Link href="/login" className="block">
                  <PremiumButton variant="primary" size="lg" className="w-full">
                    Back to Sign In
                  </PremiumButton>
                </Link>
              </>
            )}
          </GlassCard>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Need a new reset email?{' '}
            <Link href="/forgot-password" className="font-semibold text-accent transition-colors hover:text-accent/80">
              Request reset link
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

