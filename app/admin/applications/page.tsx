"use client"

import { useEffect, useMemo, useState } from 'react'
import AdminSidebar from '@/components/admin-sidebar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Eye, Archive, Search, Check, X, Radio } from 'lucide-react'

export default function AdminApplicationsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [message, setMessage] = useState('')
  const [pendingApplicationId, setPendingApplicationId] = useState<number | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState(() => new Date())
  const [applications, setApplications] = useState([
    {
      id: 1,
      candidate: 'Nguyễn Văn Nam',
      job: 'Senior Software Engineer',
      status: 'Interview',
      appliedDate: '2024-03-10',
      score: 92,
    },
    {
      id: 2,
      candidate: 'Trần Thị Hương',
      job: 'Product Manager',
      status: 'Under Review',
      appliedDate: '2024-03-05',
      score: 85,
    },
    {
      id: 3,
      candidate: 'Hoàng Văn Tú',
      job: 'UX Designer',
      status: 'New',
      appliedDate: '2024-03-13',
      score: null,
    },
    {
      id: 4,
      candidate: 'Lê Thị Linh',
      job: 'DevOps Engineer',
      status: 'Interview',
      appliedDate: '2024-03-12',
      score: 88,
    },
    {
      id: 5,
      candidate: 'Phạm Văn Hòa',
      job: 'Senior Software Engineer',
      status: 'New',
      appliedDate: '2024-03-14',
      score: null,
    },
  ])

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter
      const text = `${app.candidate} ${app.job}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [applications, query, statusFilter])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setApplications((prev) => {
        if (prev.length === 0) return prev
        const idx = Math.floor(Math.random() * prev.length)
        return prev.map((app, i) => {
          if (i !== idx) return app
          if (app.score == null) return app
          const delta = Math.random() > 0.5 ? 1 : -1
          const nextScore = Math.max(60, Math.min(99, app.score + delta))
          return { ...app, score: nextScore }
        })
      })
      setLastSyncedAt(new Date())
    }, 10000)

    return () => window.clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview':
        return 'bg-blue-100 text-blue-700'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700'
      case 'New':
        return 'bg-green-100 text-green-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const updateStatus = (id: number, status: string) => {
    const current = applications.find((app) => app.id === id)
    if (!current) return

    const prevStatus = current.status
    setPendingApplicationId(id)
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)))
    setMessage(`Syncing application #${id}...`)

    window.setTimeout(() => {
      const failed = Math.random() < 0.08
      if (failed) {
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: prevStatus } : app)))
        setMessage(`Sync failed for application #${id}. Rolled back.`)
      } else {
        setMessage(`Application #${id} updated to ${status}`)
        setLastSyncedAt(new Date())
      }
      setPendingApplicationId(null)
    }, 500)
  }

  const archiveApplication = (id: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== id))
    setMessage(`Application #${id} archived`)
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto md:ml-0">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-20">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-bold text-foreground">Applications</h1>
            <p className="text-muted-foreground">Review and manage job applications</p>
            <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
              <Radio size={12} className="text-emerald-500" />
              Live sync · {lastSyncedAt.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {message && (
            <Card className="p-3 text-sm text-muted-foreground">{message}</Card>
          )}

          {/* Search and Filter */}
          <Card className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 flex items-center bg-muted rounded-lg px-4">
                <Search size={20} className="text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-border rounded-lg bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </Card>

          {/* Applications Table */}
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Candidate</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Job</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Applied</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-semibold text-foreground">{app.candidate}</p>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{app.job}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {app.score ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${app.score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold">{app.score}%</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">{app.appliedDate}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View">
                            <Eye size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                            onClick={() => updateStatus(app.id, 'Interview')}
                            disabled={pendingApplicationId === app.id}
                          >
                            <Check size={18} className="text-green-600 hover:text-green-700" />
                          </button>
                          <button
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                            onClick={() => updateStatus(app.id, 'Rejected')}
                            disabled={pendingApplicationId === app.id}
                          >
                            <X size={18} className="text-red-500 hover:text-red-700" />
                          </button>
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Archive"
                            onClick={() => archiveApplication(app.id)}
                          >
                            <Archive size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredApplications.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-muted-foreground">
                        No applications match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
