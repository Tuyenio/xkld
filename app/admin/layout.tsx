import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Console | XKLD VietDai',
  description: 'Manage jobs, applications, candidates, and editorial operations from the admin console.',
  alternates: { canonical: '/admin' },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
