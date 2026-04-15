import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | XKLD VietDai Dashboard',
  description: 'Configure notifications, profile visibility, and user preferences.',
  alternates: { canonical: '/dashboard/settings' },
}

export default function UserSettingsLayout({ children }: { children: React.ReactNode }) {
  return children
}
