import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobs in Taiwan | XKLD VietDai',
  description:
    'Browse premium Taiwan job opportunities for Vietnamese professionals across technology, operations, and design.',
  alternates: { canonical: '/jobs' },
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children
}
