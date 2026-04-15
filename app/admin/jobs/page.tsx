"use client"

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit2, Trash2, Eye, Plus, Search, Radio } from 'lucide-react'

export default function AdminJobsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [message, setMessage] = useState('')
  const [pendingJobId, setPendingJobId] = useState<number | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState(() => new Date())
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      status: 'Active',
      applications: 47,
      posted: '2024-03-10',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'DataSys Inc',
      status: 'Active',
      applications: 23,
      posted: '2024-03-05',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Creative Studio',
      status: 'Draft',
      applications: 12,
      posted: '2024-02-28',
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'Infrastructure Pro',
      status: 'Closed',
      applications: 34,
      posted: '2024-02-15',
    },
  ])

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter
      const text = `${job.title} ${job.company}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [jobs, query, statusFilter])

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      setJobs((prev) => {
        if (prev.length === 0) return prev
        const idx = Math.floor(Math.random() * prev.length)
        return prev.map((job, i) => {
          if (i !== idx) return job
          return {
            ...job,
            applications: job.applications + Math.floor(Math.random() * 2),
          }
        })
      })
      setLastSyncedAt(new Date())
    }, 12000)

    return () => window.clearInterval(timer)
  }, [])

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id))
    setMessage(`Removed job #${id}`)
  }

  const handleToggleStatus = (id: number) => {
    const currentJob = jobs.find((job) => job.id === id)
    if (!currentJob) return

    const prevStatus = currentJob.status
    const nextStatus = currentJob.status === 'Active' ? 'Closed' : 'Active'

    setPendingJobId(id)
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, status: nextStatus } : job)))
    setMessage(`Syncing status for job #${id}...`)

    window.setTimeout(() => {
      const failed = Math.random() < 0.08
      if (failed) {
        setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, status: prevStatus } : job)))
        setMessage(`Sync failed for job #${id}. Status rolled back.`)
      } else {
        setMessage(`Updated status for job #${id}`)
        setLastSyncedAt(new Date())
      }
      setPendingJobId(null)
    }, 550)
  }

  return (
    <div className="bg-background">
        {/* Header */}
        <div className="admin-page-header">
          <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h1 className="admin-page-title">Jobs Management</h1>
              <p className="admin-page-subtitle">Manage all job postings</p>
              <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                <Radio size={12} className="text-emerald-500" />
                Live sync · {lastSyncedAt.toLocaleTimeString()}
              </p>
            </div>
            <Button className="admin-interactive gap-2">
              <Plus size={20} />
              Create Job
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="admin-page-body">
          {message && (
            <Card className="admin-card p-3 text-sm text-muted-foreground">{message}</Card>
          )}

          {/* Search and Filter */}
          <Card className="admin-card p-4">
            <div className="flex gap-4">
              <div className="admin-control flex flex-1 items-center rounded-lg bg-muted px-4">
                <Search size={20} className="text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
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
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </Card>

          {/* Jobs Table */}
          <Card className="admin-card p-5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Job Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Company</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Applications</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Posted</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-semibold text-foreground">{job.title}</p>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{job.company}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          job.status === 'Active' ? 'bg-green-100 text-green-700' :
                          job.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{job.applications}</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">{job.posted}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="admin-interactive rounded-lg p-2 hover:bg-muted" title="View">
                            <Eye size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="admin-interactive rounded-lg p-2 hover:bg-muted"
                            title="Edit"
                            onClick={() => handleToggleStatus(job.id)}
                            disabled={pendingJobId === job.id}
                          >
                            <Edit2 size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="admin-interactive rounded-lg p-2 hover:bg-red-50"
                            title="Delete"
                            onClick={() => handleDelete(job.id)}
                          >
                            <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredJobs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-muted-foreground">
                        No jobs match your filters.
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
