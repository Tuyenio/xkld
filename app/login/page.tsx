'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary via-primary/95 to-primary/90 p-12 text-primary-foreground relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -ml-40 -mb-40" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-accent/30">
                <span className="text-2xl font-bold">xkld</span>
              </div>
              <h2 className="text-2xl font-bold">XKLD VietDai</h2>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome Back to Your Career Journey</h1>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Access your dashboard to track applications, save jobs, and get matched with premium opportunities in Taiwan.
            </p>

            <div className="space-y-4">
              {[
                '500+ Active Jobs',
                '1000+ Successful Placements',
                '50+ Partner Companies',
                '98% Visa Success Rate',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-sm text-primary-foreground/60">
            <p>Secure · Trusted · Professional</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center px-6 py-12 lg:p-12">
          <div className="w-full max-w-md mx-auto">
            {/* Logo for Mobile */}
            <div className="lg:hidden mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                  xkld
                </div>
                <h2 className="text-xl font-bold text-foreground">XKLD VietDai</h2>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">Sign in to access your account and dashboard</p>

            <GlassCard className="p-8 mb-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
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
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-foreground">Password</label>
                    <Link href="/forgot-password" className="text-xs text-accent hover:text-accent/80 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
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
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <PremiumButton type="submit" variant="primary" size="lg" className="w-full mt-6">
                  Sign In
                </PremiumButton>
              </form>

              {/* Divider */}
              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-background text-muted-foreground">or continue with</span>
                </div>
              </div>

              {/* Social Logins */}
              <div className="space-y-3">
                <PremiumButton variant="outline" size="lg" className="w-full">
                  Sign in with Google
                </PremiumButton>
                <PremiumButton variant="outline" size="lg" className="w-full">
                  Sign in with LinkedIn
                </PremiumButton>
              </div>
            </GlassCard>

            {/* Signup Link */}
            <p className="text-center text-muted-foreground text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-accent font-semibold hover:text-accent/80 transition-colors">
                Create one now
              </Link>
            </p>

            {/* Security Note */}
            <GlassCard className="mt-6 p-4 bg-accent/5 border border-accent/20">
              <p className="text-xs text-muted-foreground">
                🔒 Your data is secure and encrypted. We never share your information without consent.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
