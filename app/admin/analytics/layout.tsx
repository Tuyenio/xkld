import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Analytics',
  description: 'Track conversion, applications, and market performance with analytics views.',
  path: '/admin/analytics',
  noIndex: true,
})

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children
}
