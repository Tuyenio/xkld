'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Mail, ArrowLeft } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { BrandLogo } from '@/components/brand-logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
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

                  <PremiumButton type="submit" variant="primary" size="lg" className="w-full">
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
                <div className="space-y-3">
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
