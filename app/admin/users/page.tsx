import AdminSidebar from '@/components/admin-sidebar'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, UserPlus, Shield, Mail, Phone } from 'lucide-react'

const users = [
  {
    id: 1,
    name: 'Truong Minh Tuan',
    email: 'tuan@example.com',
    phone: '+84 93 123 7890',
    role: 'admin',
    status: 'active',
    joinedAt: '2026-01-12',
  },
  {
    id: 2,
    name: 'Pham Gia Linh',
    email: 'linh@example.com',
    phone: '+84 97 333 2221',
    role: 'recruiter',
    status: 'active',
    joinedAt: '2026-02-03',
  },
  {
    id: 3,
    name: 'Le Hoang Nam',
    email: 'nam@example.com',
    phone: '+84 98 888 1100',
    role: 'editor',
    status: 'pending',
    joinedAt: '2026-03-18',
  },
  {
    id: 4,
    name: 'Nguyen Bao Han',
    email: 'han@example.com',
    phone: '+84 90 444 7712',
    role: 'support',
    status: 'inactive',
    joinedAt: '2026-03-25',
  },
]

function roleBadge(role: string) {
  if (role === 'admin') return 'default'
  if (role === 'recruiter') return 'secondary'
  return 'outline'
}

export default function AdminUsersPage() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto md:ml-0">
        <div className="bg-gradient-to-r from-background to-muted/30 border-b border-border/50 sticky top-0 z-20">
          <div className="px-6 py-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-1">Users Management</h1>
              <p className="text-muted-foreground">Manage permissions, roles, and account lifecycle.</p>
            </div>
            <PremiumButton variant="primary" icon={<UserPlus size={18} />}>
              Add New User
            </PremiumButton>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <GlassCard className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Search by name, email, role..." className="pl-10" />
            </div>
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px]">
                <thead>
                  <tr className="border-b border-border/70 bg-muted/20">
                    <th className="text-left py-4 px-5 font-semibold text-foreground">User</th>
                    <th className="text-left py-4 px-5 font-semibold text-foreground">Role</th>
                    <th className="text-left py-4 px-5 font-semibold text-foreground">Status</th>
                    <th className="text-left py-4 px-5 font-semibold text-foreground">Joined</th>
                    <th className="text-left py-4 px-5 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Mail size={12} />{user.email}</span>
                          <span className="inline-flex items-center gap-1"><Phone size={12} />{user.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <Badge variant={roleBadge(user.role)} className="capitalize">{user.role}</Badge>
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                            user.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                              : user.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-sm text-muted-foreground">{user.joinedAt}</td>
                      <td className="py-4 px-5">
                        <div className="flex gap-2">
                          <PremiumButton variant="outline" size="sm" icon={<Shield size={14} />}>
                            Permissions
                          </PremiumButton>
                          <PremiumButton variant="ghost" size="sm">
                            Edit
                          </PremiumButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
