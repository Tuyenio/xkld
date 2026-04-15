import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maintenance Mode | XKLD VietDai',
  description: 'The platform is temporarily under maintenance. Please check back shortly.',
  alternates: { canonical: '/maintenance' },
}

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return children
}
