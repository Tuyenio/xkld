import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coming Soon | XKLD VietDai',
  description: 'A new feature is launching soon. Stay tuned for updates.',
  alternates: { canonical: '/coming-soon' },
}

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return children
}
