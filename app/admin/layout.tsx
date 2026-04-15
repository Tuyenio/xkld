import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin-sidebar'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Admin Console',
  description: 'Manage jobs, applications, candidates, and editorial operations from the admin console.',
  path: '/admin',
  noIndex: true,
})

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
