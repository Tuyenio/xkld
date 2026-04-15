import { CheckCircle2, AlertTriangle, CircleDashed } from 'lucide-react'
import { Card } from '@/components/ui/card'

type QaStatus = 'pass' | 'warning' | 'todo'

type QaRow = {
  route: string
  purpose: string
  mobile: QaStatus
  tablet: QaStatus
  laptop: QaStatus
  desktop: QaStatus
  notes: string
}

const adminRows: QaRow[] = [
  {
    route: '/admin',
    purpose: 'Dashboard admin',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Header sticky + card grid da can bang lai cho 1366.',
  },
  {
    route: '/admin/jobs',
    purpose: 'Quan ly tin tuyen dung',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Table va control da duoc toi uu hover/focus.',
  },
  {
    route: '/admin/candidates',
    purpose: 'Quan ly ung vien',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Khac phuc loi sidebar khi cuon va chuyen route.',
  },
  {
    route: '/admin/applications',
    purpose: 'Xu ly ho so',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Live sync + sticky header van on dinh.',
  },
  {
    route: '/admin/users',
    purpose: 'Quan ly nguoi dung',
    mobile: 'warning',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Can test them 1 lan nua voi danh sach du lieu dai.',
  },
]

const publicRows: QaRow[] = [
  {
    route: '/',
    purpose: 'Landing page',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Hero + section deferred rendering da on dinh.',
  },
  {
    route: '/jobs',
    purpose: 'Danh sach viec lam',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Filter va card list can bang spacing tot.',
  },
  {
    route: '/jobs/[id]',
    purpose: 'Chi tiet viec lam',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Metadata dong da du canonical/OG/Twitter.',
  },
  {
    route: '/blog',
    purpose: 'Danh sach bai viet',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Grid bai viet va typography hierarchy da can doi.',
  },
  {
    route: '/blog/[slug]',
    purpose: 'Chi tiet bai viet',
    mobile: 'pass',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Metadata va chia cap heading da dong bo SEO.',
  },
  {
    route: '/dashboard',
    purpose: 'Dashboard ung vien',
    mobile: 'warning',
    tablet: 'pass',
    laptop: 'pass',
    desktop: 'pass',
    notes: 'Can bo sung 1 dot test density cho block thong ke.',
  },
]

function StatusBadge({ status }: { status: QaStatus }) {
  if (status === 'pass') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-semibold text-emerald-700">
        <CheckCircle2 size={12} /> Pass
      </span>
    )
  }

  if (status === 'warning') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/12 px-2.5 py-1 text-xs font-semibold text-amber-700">
        <AlertTriangle size={12} /> Watch
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/12 px-2.5 py-1 text-xs font-semibold text-slate-700">
      <CircleDashed size={12} /> Todo
    </span>
  )
}

function QaTable({ title, rows }: { title: string; rows: QaRow[] }) {
  return (
    <Card className="admin-card overflow-hidden p-0">
      <div className="border-b border-border/70 px-4 py-4 sm:px-5">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Breakpoint: Mobile 390px, Tablet 768px, Laptop 1366px, Desktop 1920px
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="bg-muted/35">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Route</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Muc tieu</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Mobile</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Tablet</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Laptop</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Desktop</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Ghi chu</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.route} className="border-t border-border/70 align-top">
                <td className="px-4 py-3 font-semibold text-foreground">{row.route}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                <td className="px-4 py-3"><StatusBadge status={row.mobile} /></td>
                <td className="px-4 py-3"><StatusBadge status={row.tablet} /></td>
                <td className="px-4 py-3"><StatusBadge status={row.laptop} /></td>
                <td className="px-4 py-3"><StatusBadge status={row.desktop} /></td>
                <td className="px-4 py-3 text-muted-foreground">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default function AdminQaChecklistPage() {
  return (
    <div className="bg-background">
      <div className="admin-page-header">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="admin-page-title">QA Checklist Theo Breakpoint</h1>
          <p className="admin-page-subtitle">
            Theo doi nhanh tinh trang responsive, UI density va vi chi tiet premium tren route admin/public trong diem.
          </p>
        </div>
      </div>

      <div className="admin-page-body">
        <QaTable title="Admin Routes" rows={adminRows} />
        <QaTable title="Public Routes" rows={publicRows} />
      </div>
    </div>
  )
}
