import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Users',
  description: 'Manage account permissions, verification, and access control.',
  path: '/admin/users',
  noIndex: true,
})

export default function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  return children
}
