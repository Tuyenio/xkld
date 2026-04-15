import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | XKLD VietDai',
  description:
    'Reach our recruitment and support teams for consultation, job matching, and onboarding guidance.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
