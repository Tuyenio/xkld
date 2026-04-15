import type { Metadata } from 'next'
import { buildPrivateMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPrivateMetadata({
  title: 'Dashboard Settings',
  description: 'Configure notifications, profile visibility, and user preferences.',
  path: '/dashboard/settings',
})

export default function UserSettingsLayout({ children }: { children: React.ReactNode }) {
  return children
}
