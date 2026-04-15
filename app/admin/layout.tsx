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
    <div className="admin-shell admin-density flex h-svh overflow-hidden bg-background">
      <AdminSidebar />
      <main className="admin-main min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
