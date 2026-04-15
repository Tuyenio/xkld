import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Console',
  description: 'Manage jobs, applications, candidates, and editorial operations from the admin console.',
  path: '/admin',
  noIndex: true,
})

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
