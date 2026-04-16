"use client"

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { Edit2, Trash2, Eye, Plus, Search, Radio } from 'lucide-react'
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

export default function AdminJobsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [message, setMessage] = useState('')
  const [pendingJobId, setPendingJobId] = useState<number | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null)
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

  // Create Job modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createFormId = useId()
  const [newTitle, setNewTitle] = useState('')
  const [newCompany, setNewCompany] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newType, setNewType] = useState('Full-time')
  const [newSalary, setNewSalary] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newRequirements, setNewRequirements] = useState('')
  const [newResponsibilities, setNewResponsibilities] = useState('')
  const [newApplication, setNewApplication] = useState('')

  // View / Edit job modal
  const [viewJob, setViewJob] = useState<any | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const openView = (job: any) => {
    setViewJob(job)
    setIsEditing(false)
    setIsViewOpen(true)
  }

  const saveViewEdits = () => {
    if (!viewJob) return
    setJobs((prev) => prev.map((j) => (j.id === viewJob.id ? viewJob : j)))
    setIsEditing(false)
    setIsViewOpen(false)
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter
      const text = `${job.title} ${job.company}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [jobs, query, statusFilter])

  useEffect(() => {
    // set initial time on client to avoid SSR/CSR mismatch
    setLastSyncedAt(new Date())
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
                Live sync · {lastSyncedAt ? lastSyncedAt.toLocaleTimeString() : '—'}
              </p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <PremiumButton className="admin-interactive" icon={<Plus size={20} />}>
                  Create Job
                </PremiumButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl rounded-2xl border border-border/60">
                <DialogHeader>
                  <DialogTitle>Create Job</DialogTitle>
                  <DialogDescription>Enter job details for publishing.</DialogDescription>
                </DialogHeader>

                <form
                  id={createFormId}
                  onSubmit={(e) => {
                    e.preventDefault()
                    const nextId = jobs.length ? Math.max(...jobs.map((j) => j.id)) + 1 : 1
                    const posted = new Date().toISOString().split('T')[0]
                    const created = {
                      id: nextId,
                      title: newTitle,
                      company: newCompany,
                      location: newLocation,
                      status: 'Active',
                      type: newType,
                      salary: newSalary,
                      description: newDescription,
                      requirements: newRequirements,
                      responsibilities: newResponsibilities,
                      application: newApplication,
                      applications: 0,
                      posted,
                    }
                    setJobs((prev) => [created, ...prev])
                    // reset
                    setNewTitle('')
                    setNewCompany('')
                    setNewLocation('')
                    setNewType('Full-time')
                    setNewSalary('')
                    setNewDescription('')
                    setNewRequirements('')
                    setNewResponsibilities('')
                    setNewApplication('')
                    setIsCreateOpen(false)
                  }}
                  className="grid gap-3 py-2"
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Title</label>
                      <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Company</label>
                      <input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="px-3 py-2 border border-border rounded-md" placeholder="Location" />
                    <select value={newType} onChange={(e) => setNewType(e.target.value)} className="px-3 py-2 border border-border rounded-md">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                    <input value={newSalary} onChange={(e) => setNewSalary(e.target.value)} className="px-3 py-2 border border-border rounded-md" placeholder="Salary" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Description</label>
                    <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md min-h-[120px]" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Responsibilities</label>
                      <textarea value={newResponsibilities} onChange={(e) => setNewResponsibilities(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md min-h-[80px]" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Requirements</label>
                      <textarea value={newRequirements} onChange={(e) => setNewRequirements(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md min-h-[80px]" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input value={newApplication} onChange={(e) => setNewApplication(e.target.value)} className="px-3 py-2 border border-border rounded-md" placeholder="Application email or URL" />
                    <input placeholder="Tags (comma separated)" className="px-3 py-2 border border-border rounded-md" />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <button type="button" className="px-4 py-2 rounded-md border border-border">Cancel</button>
                    </DialogClose>
                    <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Publish job</button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
          {/* View / Edit Job Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="sm:max-w-3xl rounded-2xl border border-border/60">
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Edit Job' : 'Job details'}</DialogTitle>
                <DialogDescription>Full details of the job posting.</DialogDescription>
              </DialogHeader>

              {viewJob && (
                <form className="grid gap-4 py-2" onSubmit={(e) => { e.preventDefault(); saveViewEdits(); }}>
                  <div className="grid sm:grid-cols-2 gap-4 items-start">
                    <div>
                      <label className="text-sm text-muted-foreground">Title</label>
                      {isEditing ? (
                        <input value={viewJob.title} onChange={(e) => setViewJob({ ...viewJob, title: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md" />
                      ) : (
                        <h3 className="text-lg font-semibold">{viewJob.title}</h3>
                      )}
                      <div className="mt-2 text-sm text-muted-foreground">{viewJob.company} · {viewJob.location || '—'}</div>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs">Type</span>
                        {isEditing ? (
                          <select value={viewJob.type} onChange={(e) => setViewJob({ ...viewJob, type: e.target.value })} className="px-2 py-1 border border-border rounded-md">
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                          </select>
                        ) : (
                          <span className="px-2 py-1 rounded-full bg-muted/20">{viewJob.type || '—'}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs">Salary</span>
                        {isEditing ? (
                          <input value={viewJob.salary || ''} onChange={(e) => setViewJob({ ...viewJob, salary: e.target.value })} className="px-2 py-1 border border-border rounded-md" />
                        ) : (
                          <div>{viewJob.salary || '—'}</div>
                        )}
                      </div>
                      <div>Posted: <span className="text-sm text-muted-foreground">{viewJob.posted}</span></div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Description</label>
                    {isEditing ? (
                      <textarea value={viewJob.description} onChange={(e) => setViewJob({ ...viewJob, description: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md min-h-[140px]" />
                    ) : (
                      <div className="prose text-sm text-muted-foreground whitespace-pre-line">{viewJob.description}</div>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Responsibilities</label>
                      {isEditing ? (
                        <textarea value={viewJob.responsibilities} onChange={(e) => setViewJob({ ...viewJob, responsibilities: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md min-h-[100px]" />
                      ) : (
                        <div className="text-sm text-muted-foreground whitespace-pre-line">{viewJob.responsibilities}</div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Requirements</label>
                      {isEditing ? (
                        <textarea value={viewJob.requirements} onChange={(e) => setViewJob({ ...viewJob, requirements: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md min-h-[100px]" />
                      ) : (
                        <div className="text-sm text-muted-foreground whitespace-pre-line">{viewJob.requirements}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">How to apply</label>
                    {isEditing ? (
                      <input value={viewJob.application} onChange={(e) => setViewJob({ ...viewJob, application: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md" />
                    ) : (
                      <div className="text-sm text-muted-foreground">{viewJob.application}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-muted-foreground">Applications: <strong className="ml-1">{viewJob.applications}</strong></div>
                    <div className="flex items-center gap-2">
                      {!isEditing && (
                        <DialogClose asChild>
                          <button type="button" className="px-4 py-2 rounded-md border border-border">Close</button>
                        </DialogClose>
                      )}
                      {isEditing ? (
                        <>
                          <button onClick={() => { setIsEditing(false); }} type="button" className="px-4 py-2 rounded-md border">Cancel</button>
                          <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Save changes</button>
                        </>
                      ) : (
                        <button onClick={() => setIsEditing(true)} type="button" className="px-4 py-2 rounded-md border">Edit</button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>

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
                          <button onClick={() => openView(job)} className="admin-interactive rounded-lg p-2 hover:bg-muted" title="View">
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
