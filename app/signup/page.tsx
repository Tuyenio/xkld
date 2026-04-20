'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Eye, EyeOff, Zap } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { apiClient } from '@/lib/api-client'
import { getSession, saveSession } from '@/lib/session'
import { toApiErrorMessage } from '@/lib/api-errors'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (!session) return
    router.replace(session.user.role === 'admin' ? '/admin' : '/dashboard')
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    if (step === 1) {
      setStep(2)
    } else {
      if (formData.password.length < 8) {
        setSubmitError('Password must be at least 8 characters.')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setSubmitError('Password confirmation does not match.')
        return
      }

      setIsSubmitting(true)
      try {
        const response = await apiClient.auth.register(formData)
        saveSession(response)
        router.push('/dashboard')
      } catch (error) {
        setSubmitError(toApiErrorMessage(error, 'Sign up failed. Please try again.'))
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <BrandLogo textClassName="text-3xl gradient-text" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Join 1000+ {step === 1 ? 'Professionals' : 'Successful'} in Taiwan
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {step === 1 
                ? 'Create your free account and start exploring premium job opportunities today.'
                : 'Secure your account and get ready to transform your career.'
              }
            </p>
          </div>

          {/* Main Card */}
          <GlassCard className="p-8 md:p-10 mb-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 1 ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
                <div className="text-sm font-medium">
                  <p className={step === 1 ? 'text-foreground' : 'text-muted-foreground'}>Personal Info</p>
                </div>
              </div>
              <div className={`h-1 flex-1 mx-3 rounded-full ${step >= 2 ? 'bg-accent' : 'bg-border'}`} />
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 2 ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <div className="text-sm font-medium">
                  <p className={step === 2 ? 'text-foreground' : 'text-muted-foreground'}>Security</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">First Name</label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Nguyễn"
                        className="bg-background/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Last Name</label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Văn A"
                        className="bg-background/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-background/50"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-2">We'll send you a verification code</p>
                  </div>

                  <div className="pt-4">
                    <PremiumButton type="submit" variant="primary" size="lg" className="w-full" icon={<Zap size={18} />}>
                      Continue to Security
                    </PremiumButton>
                  </div>
                </>
              )}

              {/* Step 2: Security */}
              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 8 characters"
                        className="bg-background/50 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Must be at least 8 characters with a mix of letters and numbers</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="bg-background/50"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <Link href="/terms" className="text-accent hover:text-accent/80 transition-colors font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy-policy" className="text-accent hover:text-accent/80 transition-colors font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <PremiumButton 
                      type="button" 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </PremiumButton>
                    <PremiumButton type="submit" variant="primary" size="lg" className="flex-1" isLoading={isSubmitting}>
                      Create Account
                    </PremiumButton>
                  </div>
                  {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                </>
              )}
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-background text-muted-foreground">or sign up with</span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="space-y-3">
              <PremiumButton variant="outline" size="lg" className="w-full">
                Google
              </PremiumButton>
              <PremiumButton variant="outline" size="lg" className="w-full">
                LinkedIn
              </PremiumButton>
            </div>
          </GlassCard>

          {/* Signin Link */}
          <p className="text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-accent font-semibold hover:text-accent/80 transition-colors">
              Sign In
            </Link>
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: '500+', label: 'Job Listings' },
              { icon: '1000+', label: 'Placements' },
              { icon: '50+', label: 'Companies' },
              { icon: '98%', label: 'Visa Success' },
            ].map((benefit, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-2">{benefit.icon}</div>
                <p className="text-xs text-muted-foreground">{benefit.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
