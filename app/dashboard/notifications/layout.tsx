import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notifications | XKLD VietDai Dashboard',
  description: 'Review interview, profile, and matching notifications in one center.',
  alternates: { canonical: '/dashboard/notifications' },
}

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
