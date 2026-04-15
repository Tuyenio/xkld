'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminSidebar from '@/components/admin-sidebar'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PremiumModal } from '@/components/premium-modal'
import { Search, UserPlus, Shield, Mail, Phone, Radio } from 'lucide-react'

const initialUsers = [
  {
    id: 1,
    name: 'Truong Minh Tuan',
    email: 'tuan@example.com',
    phone: '+84 93 123 7890',
    role: 'admin',
    status: 'active',
    verified: true,
    joinedAt: '2026-01-12',
  },
  {
    id: 2,
    name: 'Pham Gia Linh',
    email: 'linh@example.com',
    phone: '+84 97 333 2221',
    role: 'recruiter',
    status: 'active',
    verified: true,
    joinedAt: '2026-02-03',
  },
  {
    id: 3,
    name: 'Le Hoang Nam',
    email: 'nam@example.com',
    phone: '+84 98 888 1100',
    role: 'editor',
    status: 'pending',
    verified: false,
    joinedAt: '2026-03-18',
  },
  {
    id: 4,
    name: 'Nguyen Bao Han',
    email: 'han@example.com',
    phone: '+84 90 444 7712',
    role: 'support',
    status: 'inactive',
    verified: false,
    joinedAt: '2026-03-25',
  },
]

function roleBadge(role: string) {
  if (role === 'admin') return 'default'
  if (role === 'recruiter') return 'secondary'
  return 'outline'
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [pendingUserId, setPendingUserId] = useState<number | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState(() => new Date())

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.name} ${user.email}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      return matchesQuery && matchesRole
    })
  }, [users, query, roleFilter])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setUsers((prev) => {
        if (prev.length === 0) return prev
        const idx = Math.floor(Math.random() * prev.length)
        return prev.map((user, i) => {
          if (i !== idx) return user
          if (user.status === 'pending') return { ...user, status: 'active' }
          return user
        })
      })
      setLastSyncedAt(new Date())
    }, 15000)

    return () => window.clearInterval(timer)
  }, [])

  const toggleStatus = (id: number) => {
    const current = users.find((user) => user.id === id)
    if (!current) return

    const prevStatus = current.status
    const nextStatus = current.status === 'active' ? 'inactive' : 'active'
    setPendingUserId(id)
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status: nextStatus } : user)))

    window.setTimeout(() => {
      const failed = Math.random() < 0.08
      if (failed) {
        setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status: prevStatus } : user)))
      } else {
        setLastSyncedAt(new Date())
      }
      setPendingUserId(null)
    }, 500)
  }

  const toggleVerify = (id: number) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, verified: !user.verified } : user)))
  }

  const rotateRole = (id: number) => {
    const roles = ['admin', 'recruiter', 'editor', 'support'] as const
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user
        const idx = roles.indexOf(user.role as (typeof roles)[number])
        const nextRole = roles[(idx + 1) % roles.length]
        return { ...user, role: nextRole }
      })
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="bg-gradient-to-r from-background to-muted/30 border-b border-border/50 sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-1">Users Management</h1>
              <p className="text-muted-foreground">Manage permissions, roles, and account lifecycle.</p>
              <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                <Radio size={12} className="text-emerald-500" />
                Live sync · {lastSyncedAt.toLocaleTimeString()}
              </p>
            </div>
            <PremiumButton variant="primary" icon={<UserPlus size={18} />}>
              Add New User
            </PremiumButton>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <GlassCard className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Search by name, email, role..." className="pl-10" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <select className="px-4 py-2 border border-border rounded-lg bg-white" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="all">All roles</option>
                <option value="admin">admin</option>
                <option value="recruiter">recruiter</option>
                <option value="editor">editor</option>
                <option value="support">support</option>
              </select>
            </div>
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Mail size={12} />{user.email}</span>
                          <span className="inline-flex items-center gap-1"><Phone size={12} />{user.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <Badge variant={roleBadge(user.role)} className="capitalize">{user.role}</Badge>
                          <span className={`text-[10px] px-2 py-1 rounded-full ${user.verified ? 'bg-emerald-500/20 text-emerald-700' : 'bg-muted text-muted-foreground'}`}>
                            {user.verified ? 'Verified' : 'Unverified'}
                          </span>
                        </div>
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
                          <PremiumModal
                            trigger={
                              <PremiumButton variant="outline" size="sm" icon={<Shield size={14} />}>
                                Details
                              </PremiumButton>
                            }
                            title={`User details · ${user.name}`}
                            description="Review account identity, role and verification status"
                          >
                            <div className="space-y-2 text-sm">
                              <p><strong>Email:</strong> {user.email}</p>
                              <p><strong>Phone:</strong> {user.phone}</p>
                              <p><strong>Role:</strong> {user.role}</p>
                              <p><strong>Status:</strong> {user.status}</p>
                              <p><strong>Verified:</strong> {user.verified ? 'Yes' : 'No'}</p>
                            </div>
                          </PremiumModal>
                          <PremiumButton variant="ghost" size="sm" onClick={() => rotateRole(user.id)}>
                            Change Role
                          </PremiumButton>
                          <PremiumButton variant="ghost" size="sm" onClick={() => toggleVerify(user.id)}>
                            {user.verified ? 'Unverify' : 'Verify'}
                          </PremiumButton>
                          <PremiumButton variant="ghost" size="sm" onClick={() => toggleStatus(user.id)} disabled={pendingUserId === user.id}>
                            {user.status === 'active' ? 'Ban' : 'Unban'}
                          </PremiumButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-muted-foreground">No users match current filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
