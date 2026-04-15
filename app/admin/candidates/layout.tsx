import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Candidates',
  description: 'Inspect candidate quality, profile depth, and engagement readiness.',
  path: '/admin/candidates',
  noIndex: true,
})

export default function AdminCandidatesLayout({ children }: { children: React.ReactNode }) {
  return children
}
