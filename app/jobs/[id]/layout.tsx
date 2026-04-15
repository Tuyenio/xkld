import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Details | XKLD VietDai',
  description:
    'Review job responsibilities, requirements, compensation, and apply for Taiwan positions with confidence.',
}

export default function JobDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
