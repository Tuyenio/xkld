import type { Metadata } from 'next'
import { buildPrivateMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPrivateMetadata({
  title: 'Dashboard Notifications',
  description: 'Review interview, profile, and matching notifications in one center.',
  path: '/dashboard/notifications',
})

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
