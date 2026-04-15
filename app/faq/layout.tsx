import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | XKLD VietDai',
  description: 'Frequently asked questions about recruitment process, visa, and working in Taiwan.',
  alternates: { canonical: '/faq' },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
