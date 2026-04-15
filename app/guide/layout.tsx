import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Application Guide | XKLD VietDai',
  description:
    'Follow our step-by-step process from profile setup to successful placement in Taiwan.',
  alternates: { canonical: '/guide' },
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children
}
