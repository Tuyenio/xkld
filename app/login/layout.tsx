import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | XKLD VietDai',
  description: 'Sign in to manage applications, saved jobs, and your recruitment dashboard.',
  alternates: { canonical: '/login' },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
