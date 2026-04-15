import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Candidate Dashboard | XKLD VietDai',
  description: 'Track your applications, saved jobs, and profile progress in one place.',
  alternates: { canonical: '/dashboard' },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
