import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Jobs',
  description: 'Manage job lifecycle, status, and publication pipeline.',
  path: '/admin/jobs',
  noIndex: true,
})

export default function AdminJobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
