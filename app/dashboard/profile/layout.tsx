import type { Metadata } from 'next'
import { buildPrivateMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPrivateMetadata({
  title: 'Dashboard Profile Settings',
  description: 'Update your candidate profile, skills, and preferences to improve match quality.',
  path: '/dashboard/profile',
})

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children
}
