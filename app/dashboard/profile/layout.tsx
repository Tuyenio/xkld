import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile Settings | XKLD VietDai',
  description: 'Update your candidate profile, skills, and preferences to improve match quality.',
  alternates: { canonical: '/dashboard/profile' },
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}
