import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics | XKLD VietDai Admin',
  description: 'Track conversion, applications, and market performance with analytics views.',
  alternates: { canonical: '/admin/analytics' },
}

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children
}
