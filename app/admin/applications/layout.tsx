import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Applications',
  description: 'Review incoming applications with fast moderation actions.',
  path: '/admin/applications',
  noIndex: true,
})

export default function AdminApplicationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
