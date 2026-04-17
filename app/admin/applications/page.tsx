"use client"

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Eye, Archive, Search, Check, X, Radio } from 'lucide-react'
import { apiClient, type AdminApplication } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'

export default function AdminApplicationsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [message, setMessage] = useState('')
  const [pendingApplicationId, setPendingApplicationId] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState(() => new Date())
  const [applications, setApplications] = useState<AdminApplication[]>([])

  const loadApplications = async () => {
    try {
      const result = await apiClient.admin.listApplications()
      setApplications(result)
      setLastSyncedAt(new Date())
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not load applications.'))
    }
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter
      const text = `${app.candidate} ${app.job}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [applications, query, statusFilter])

  useEffect(() => {
    void loadApplications()
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

  const updateStatus = async (id: string, status: string) => {
    const current = applications.find((app) => app.id === id)
    if (!current) return

    const prevStatus = current.status
    setPendingApplicationId(id)
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)))
    setMessage(`Syncing application #${id}...`)

    try {
      const updated = await apiClient.admin.updateApplicationStatus(id, status)
      setApplications((prev) => prev.map((app) => (app.id === id ? updated : app)))
      setMessage(`Application #${id} updated to ${status}`)
      setLastSyncedAt(new Date())
    } catch (error) {
      setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: prevStatus } : app)))
      setMessage(toApiErrorMessage(error, `Sync failed for application #${id}.`))
    } finally {
      setPendingApplicationId(null)
    }
  }

  const archiveApplication = async (id: string) => {
    try {
      await apiClient.admin.deleteApplication(id)
      setApplications((prev) => prev.filter((app) => app.id !== id))
      setMessage(`Application #${id} archived`)
      setLastSyncedAt(new Date())
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not archive application.'))
    }
  }

  return (
    <div className="bg-background">
        {/* Header */}
        <div className="admin-page-header">
          <div className="px-4 sm:px-6 py-4">
            <h1 className="admin-page-title">Applications</h1>
            <p className="admin-page-subtitle">Review and manage job applications</p>
            <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
              <Radio size={12} className="text-emerald-500" />
              Live sync · {lastSyncedAt.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="admin-page-body">
          {message && (
            <Card className="admin-card p-3 text-sm text-muted-foreground">{message}</Card>
          )}

          {/* Search and Filter */}
          <Card className="admin-card p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="admin-control flex flex-1 items-center rounded-lg bg-muted px-4">
                <Search size={20} className="text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select
                className="admin-control rounded-lg border px-4 py-2"
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
          <Card className="admin-card p-5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
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
                          <button className="admin-interactive rounded-lg p-2 hover:bg-muted" title="View">
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
    </div>
  )
}
