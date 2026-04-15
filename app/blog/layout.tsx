import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Career Blog | XKLD VietDai',
  description:
    'Read practical guides, interview tactics, visa updates, and market insights for careers in Taiwan.',
  alternates: { canonical: '/blog' },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
