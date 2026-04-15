import type { Metadata } from 'next'
import { buildPrivateMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPrivateMetadata({
  title: 'Dashboard Resume Manager',
  description: 'Upload and manage CV versions to improve recruiter match quality.',
  path: '/dashboard/resume',
})

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
