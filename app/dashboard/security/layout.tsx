import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security | XKLD VietDai Dashboard',
  description: 'Manage account security, password policy, and authentication preferences.',
  alternates: { canonical: '/dashboard/security' },
}

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children
}
