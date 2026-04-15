import type { Metadata } from 'next'
import { buildPrivateMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPrivateMetadata({
  title: 'Dashboard Security',
  description: 'Manage account security, password policy, and authentication preferences.',
  path: '/dashboard/security',
})

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children
}
