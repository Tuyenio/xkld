import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | XKLD VietDai',
  description: 'Terms and conditions for using XKLD VietDai recruitment platform and services.',
  alternates: { canonical: '/terms' },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
