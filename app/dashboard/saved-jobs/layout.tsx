import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Saved Jobs | XKLD VietDai Dashboard',
  description: 'Manage your bookmarked opportunities and apply faster.',
  alternates: { canonical: '/dashboard/saved-jobs' },
}

export default function SavedJobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
