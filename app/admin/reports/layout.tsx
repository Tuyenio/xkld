import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reports | XKLD VietDai Admin',
  description: 'Generate and monitor operational reports for recruitment performance.',
  alternates: { canonical: '/admin/reports' },
}

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children
}
