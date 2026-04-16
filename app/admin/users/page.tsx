'use client'

import { useEffect, useMemo, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { useId } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PremiumModal } from '@/components/premium-modal'
import { Search, UserPlus, Shield, Mail, Phone, Radio, Eye, EyeOff, Lock } from 'lucide-react'

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
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<'weak'|'medium'|'strong' | ''>('')
  const [newRole, setNewRole] = useState('editor')
  const [newVerified, setNewVerified] = useState(false)
  const formId = useId()
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [pendingUserId, setPendingUserId] = useState<number | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.name} ${user.email}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      return matchesQuery && matchesRole
    })
  }, [users, query, roleFilter])

  useEffect(() => {
    // set initial time on client to avoid SSR/CSR mismatch
    setLastSyncedAt(new Date())
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
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
    <div className="bg-background">
        <div className="bg-gradient-to-r from-background to-muted/30 border-b border-border/50 sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-1">Users Management</h1>
              <p className="text-muted-foreground">Manage permissions, roles, and account lifecycle.</p>
                <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                <Radio size={12} className="text-emerald-500" />
                Live sync · {lastSyncedAt ? lastSyncedAt.toLocaleTimeString() : '—'}
              </p>
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <PremiumButton variant="primary" icon={<UserPlus size={18} />}>
                  Add New User
                </PremiumButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl rounded-2xl border border-border/60">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Fill in details to create a new user account.</DialogDescription>
                </DialogHeader>

                <form
                  id={formId}
                  onSubmit={(e) => {
                    e.preventDefault()
                    // basic validation
                    setPasswordError('')
                    setConfirmError('')
                    if (!newName.trim() || !newEmail.trim()) return
                    if (newPassword.length < 8) {
                      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự')
                      return
                    }
                    if (newPassword !== confirmPassword) {
                      setConfirmError('Mật khẩu xác nhận không khớp')
                      return
                    }
                    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1
                    const joinedAt = new Date().toISOString().split('T')[0]
                    const created = {
                      id: nextId,
                      name: newName.trim(),
                      email: newEmail.trim(),
                      phone: newPhone.trim(),
                      role: newRole,
                      status: 'active',
                      verified: newVerified,
                      joinedAt,
                      // Note: demo only — passwords should be hashed server-side
                      password: newPassword,
                    }
                    setUsers((prev) => [created, ...prev])
                    // reset form
                    setNewName('')
                    setNewEmail('')
                    setNewPhone('')
                    setNewPassword('')
                    setConfirmPassword('')
                    setNewRole('editor')
                    setNewVerified(false)
                    setPasswordStrength('')
                    setIsAddOpen(false)
                  }}
                  className="grid gap-4 py-2"
                >
                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-sm text-muted-foreground">Full name</label>
                    <input value={newName} onChange={(e) => setNewName(e.target.value)} className="px-3 py-2 border border-border rounded-md" placeholder="e.g. Nguyen Van A" />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-sm text-muted-foreground">Email</label>
                    <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="px-3 py-2 border border-border rounded-md" placeholder="email@example.com" type="email" />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-sm text-muted-foreground">Mật khẩu</label>
                    <div className="relative">
                      <input
                        value={newPassword}
                        onChange={(e) => {
                          const v = e.target.value
                          setNewPassword(v)
                          // simple strength
                          if (v.length >= 12 && /[0-9]/.test(v) && /[A-Z]/.test(v) && /[^A-Za-z0-9]/.test(v)) setPasswordStrength('strong')
                          else if (v.length >= 8) setPasswordStrength('medium')
                          else setPasswordStrength('weak')
                        }}
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-3 py-2 border border-border rounded-md pr-10"
                        placeholder="Ít nhất 8 ký tự"
                      />
                      <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
                    <div className="h-2 mt-2 rounded-md bg-muted/40 overflow-hidden">
                      <div
                        className={`h-full transition-all ${passwordStrength === 'weak' ? 'w-1/3 bg-red-400' : passwordStrength === 'medium' ? 'w-2/3 bg-amber-400' : passwordStrength === 'strong' ? 'w-full bg-emerald-400' : 'w-0'}`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-sm text-muted-foreground">Xác nhận mật khẩu</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="px-3 py-2 border border-border rounded-md" placeholder="Nhập lại mật khẩu" />
                    {confirmError && <p className="text-xs text-destructive">{confirmError}</p>}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="px-3 py-2 border border-border rounded-md" placeholder="+84 9x xxx xxxx" />
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex-1">
                      <label className="text-sm text-muted-foreground">Role</label>
                      <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md">
                        <option value="admin">admin</option>
                        <option value="recruiter">recruiter</option>
                        <option value="editor">editor</option>
                        <option value="support">support</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input id="verified" type="checkbox" checked={newVerified} onChange={(e) => setNewVerified(e.target.checked)} />
                      <label htmlFor="verified" className="text-sm text-muted-foreground">Verified</label>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <button type="button" className="px-4 py-2 rounded-md border border-border">Cancel</button>
                    </DialogClose>
                    <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Create user</button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
    </div>
  )
}
