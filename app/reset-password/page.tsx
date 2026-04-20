'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, KeyRound } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { BrandLogo } from '@/components/brand-logo'
import { resetPasswordAuth } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const tokenFromQuery = searchParams.get('token') || ''
  const [token, setToken] = useState(tokenFromQuery)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const canSubmit = useMemo(() => {
	return token.trim().length > 0 && password.length >= 8 && confirmPassword.length >= 8
  }, [confirmPassword.length, password.length, token])

  const handleSubmit = async (event: React.FormEvent) => {
	event.preventDefault()
	setSubmitError('')

	if (password !== confirmPassword) {
	  setSubmitError('Password confirmation does not match.')
	  return
	}

	setIsSubmitting(true)
	try {
	  await resetPasswordAuth({
		token: token.trim(),
		password,
		confirmPassword,
	  })
	  setIsSuccess(true)
	} catch (error) {
	  setSubmitError(toApiErrorMessage(error, 'Could not reset password. Please try again.'))
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
			{!isSuccess ? (
			  <>
				<h1 className="mb-2 text-3xl font-bold text-foreground">Reset Password</h1>
				<p className="mb-8 text-muted-foreground">
				  Enter your reset token and choose a new secure password.
				</p>

				<form onSubmit={handleSubmit} className="space-y-5">
				  <div>
					<label className="mb-2 block text-sm font-semibold text-foreground">Reset Token</label>
					<Input
					  value={token}
					  onChange={(event) => setToken(event.target.value)}
					  placeholder="Paste your reset token"
					  className="bg-background/60"
					  required
					/>
				  </div>

				  <div>
					<label className="mb-2 block text-sm font-semibold text-foreground">New Password</label>
					<Input
					  type="password"
					  value={password}
					  onChange={(event) => setPassword(event.target.value)}
					  placeholder="At least 8 characters"
					  className="bg-background/60"
					  required
					/>
				  </div>

				  <div>
					<label className="mb-2 block text-sm font-semibold text-foreground">Confirm Password</label>
					<Input
					  type="password"
					  value={confirmPassword}
					  onChange={(event) => setConfirmPassword(event.target.value)}
					  placeholder="Confirm your password"
					  className="bg-background/60"
					  required
					/>
				  </div>

				  {submitError && <p className="text-sm text-destructive">{submitError}</p>}

				  <PremiumButton
					type="submit"
					variant="primary"
					size="lg"
					className="w-full"
					isLoading={isSubmitting}
					disabled={!canSubmit}
				  >
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
				  Your password has been reset successfully. You can now sign in with the new password.
				</p>
				<Link href="/login" className="block">
				  <PremiumButton variant="primary" size="lg" className="w-full" icon={<KeyRound size={16} />}>
					Back to Sign In
				  </PremiumButton>
				</Link>
			  </>
			)}
		  </GlassCard>
		</div>
	  </div>
	</div>
  )
}


