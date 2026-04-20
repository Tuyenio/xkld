'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Mail, ArrowLeft } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { BrandLogo } from '@/components/brand-logo'
import { apiClient } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [debugResetToken, setDebugResetToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    if (!email) return

    setIsSubmitting(true)
    try {
      const response = await apiClient.auth.forgotPassword({ email })
      setDebugResetToken(
        typeof (response as { debugResetToken?: unknown }).debugResetToken === 'string'
          ? (response as { debugResetToken: string }).debugResetToken
          : null
      )
      setSubmitted(true)
    } catch (error) {
      setSubmitError(toApiErrorMessage(error, 'Could not send reset link. Please try again.'))
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
                <h1 className="mb-2 text-3xl font-bold text-foreground">Forgot Password</h1>
                <p className="mb-8 text-muted-foreground">
                  Enter your account email. We will send a reset link so you can set a new password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="bg-background/60 pl-9"
                        required
                      />
                    </div>
                  </div>

                  {submitError && <p className="text-sm text-destructive">{submitError}</p>}

                  <PremiumButton type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                    Send Reset Link
                  </PremiumButton>
                </form>
              </>
            ) : (
              <>
                <div className="mb-5 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
                  <CheckCircle2 size={26} />
                </div>
                <h1 className="mb-2 text-3xl font-bold text-foreground">Check Your Inbox</h1>
                <p className="mb-7 text-muted-foreground">
                  We have sent a password reset link to <span className="font-semibold text-foreground">{email}</span>.
                </p>
                {debugResetToken && (
                  <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-700">
                    Development token: <span className="font-mono">{debugResetToken}</span>
                  </div>
                )}
                <div className="space-y-3">
                  {debugResetToken && (
                    <Link href={`/reset-password?token=${encodeURIComponent(debugResetToken)}`} className="block">
                      <PremiumButton variant="secondary" size="lg" className="w-full">
                        Go to Reset Password
                      </PremiumButton>
                    </Link>
                  )}
                  <PremiumButton variant="primary" size="lg" className="w-full" onClick={() => setSubmitted(false)}>
                    Send Again
                  </PremiumButton>
                  <Link href="/login" className="block">
                    <PremiumButton variant="outline" size="lg" className="w-full" icon={<ArrowLeft size={16} />}>
                      Back to Sign In
                    </PremiumButton>
                  </Link>
                </div>
              </>
            )}
          </GlassCard>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link href="/login" className="font-semibold text-accent transition-colors hover:text-accent/80">
              Sign in now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
