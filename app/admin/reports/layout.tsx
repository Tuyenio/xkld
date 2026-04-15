import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Reports',
  description: 'Generate and monitor operational reports for recruitment performance.',
  path: '/admin/reports',
  noIndex: true,
})

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children
}
