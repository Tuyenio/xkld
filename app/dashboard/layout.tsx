import type { Metadata } from 'next'
import { buildPrivateMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPrivateMetadata({
  title: 'Candidate Dashboard',
  description: 'Track your applications, saved jobs, and profile progress in one place.',
  path: '/dashboard',
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
