import type { Metadata } from 'next'
import { buildPrivateMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPrivateMetadata({
  title: 'Dashboard Saved Jobs',
  description: 'Manage your bookmarked opportunities and apply faster.',
  path: '/dashboard/saved-jobs',
})

export default function SavedJobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
