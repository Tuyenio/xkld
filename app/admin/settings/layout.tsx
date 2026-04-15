import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Settings',
  description: 'Configure platform controls, policy guardrails, and operational defaults.',
  path: '/admin/settings',
  noIndex: true,
})

export default function AdminSettingsLayout({ children }: { children: React.ReactNode }) {
  return children
}
