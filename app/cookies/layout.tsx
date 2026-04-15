import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookies Policy | XKLD VietDai',
  description: 'Understand how cookies are used to improve performance and personalization.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
