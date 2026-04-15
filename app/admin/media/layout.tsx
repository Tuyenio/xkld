import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media Library | XKLD VietDai Admin',
  description: 'Upload and organize brand, campaign, and editorial assets.',
  alternates: { canonical: '/admin/media' },
}

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children
}
