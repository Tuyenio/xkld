import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | XKLD VietDai',
  description:
    'Learn about XKLD VietDai mission, values, and our commitment to connecting Vietnamese talent with Taiwan opportunities.',
  alternates: { canonical: '/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
