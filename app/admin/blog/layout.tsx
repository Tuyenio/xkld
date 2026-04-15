import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Blog',
  description: 'Operate editorial workflows, visibility, and publishing schedules.',
  path: '/admin/blog',
  noIndex: true,
})

export default function AdminBlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
