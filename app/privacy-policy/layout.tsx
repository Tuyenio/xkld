import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | XKLD VietDai',
  description: 'Read how XKLD VietDai collects, uses, and protects your personal data.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
