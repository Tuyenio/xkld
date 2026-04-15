import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | XKLD VietDai',
  description: 'Create your account to unlock job matching, profile visibility, and faster placement support.',
  alternates: { canonical: '/signup' },
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children
}
