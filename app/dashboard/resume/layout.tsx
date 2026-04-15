import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Manager | XKLD VietDai Dashboard',
  description: 'Upload and manage CV versions to improve recruiter match quality.',
  alternates: { canonical: '/dashboard/resume' },
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
