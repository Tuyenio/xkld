import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cost Calculator | XKLD VietDai',
  description:
    'Estimate relocation, monthly expenses, and savings potential when working in Taiwan.',
  alternates: { canonical: '/costs' },
}

export default function CostsLayout({ children }: { children: React.ReactNode }) {
  return children
}
