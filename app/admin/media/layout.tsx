import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Media Library',
  description: 'Upload and organize brand, campaign, and editorial assets.',
  path: '/admin/media',
  noIndex: true,
})

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children
}
