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
import { apiClient, type AdminJob } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'
import { sanitizeHtml } from '@/lib/html-sanitize'
import { RichTextEditor } from '@/components/admin/rich-text-editor'

export default function AdminJobsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [message, setMessage] = useState('')
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null)
  const [jobs, setJobs] = useState<AdminJob[]>([])

  // Create Job modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createFormId = useId()
  const [newTitle, setNewTitle] = useState('')
  const [newCompany, setNewCompany] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newType, setNewType] = useState('Full-time')
  const [newSalary, setNewSalary] = useState('')
  const [newApplication, setNewApplication] = useState('')
  const [newDescriptionHtml, setNewDescriptionHtml] = useState('')
  const [newResponsibilitiesHtml, setNewResponsibilitiesHtml] = useState('')
  const [newRequirementsHtml, setNewRequirementsHtml] = useState('')

  // View / Edit job modal
  const [viewJob, setViewJob] = useState<AdminJob | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const openView = (job: AdminJob, edit = false) => {
    setViewJob(job)
    setIsEditing(edit)
    setIsViewOpen(true)
  }

  const loadJobs = async () => {
    try {
      const result = await apiClient.admin.listJobs()
      setJobs(result)
      setLastSyncedAt(new Date())
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not load jobs from server.'))
    }
  }

  useEffect(() => {
    void loadJobs()
  }, [])

  const saveViewEdits = async () => {
    if (!viewJob) return
    try {
      const updated = await apiClient.admin.updateJob(viewJob.id, viewJob)
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)))
      setLastSyncedAt(new Date())
      setIsEditing(false)
      setIsViewOpen(false)
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not save job updates.'))
    }
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter
      const text = `${job.title} ${job.company}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [jobs, query, statusFilter])

  const handleDelete = async (id: string) => {
    try {
      await apiClient.admin.deleteJob(id)
      setJobs((prev) => prev.filter((job) => job.id !== id))
      setMessage(`Removed job #${id}`)
      setLastSyncedAt(new Date())
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not delete job.'))
    }
  }

  return (
    <div className="bg-background">
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
              <PremiumButton className="admin-interactive" icon={<Plus size={20} />}>Create Job</PremiumButton>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-3xl rounded-2xl border border-border/60 max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Create Job</DialogTitle>
                <DialogDescription>Enter job details for publishing.</DialogDescription>
              </DialogHeader>

              <form
                id={createFormId}
                className="grid gap-3 py-2"
                onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    const created = await apiClient.admin.createJob({
                      title: newTitle,
                      company: newCompany,
                      location: newLocation,
                      status: 'Active',
                      type: newType,
                      salary: newSalary,
                      description: sanitizeHtml(newDescriptionHtml),
                      requirements: sanitizeHtml(newRequirementsHtml),
                      responsibilities: sanitizeHtml(newResponsibilitiesHtml),
                      application: newApplication,
                    })
                    setJobs((prev) => [created, ...prev])
                    setLastSyncedAt(new Date())
                    setMessage('Job created successfully')
                    setNewTitle('')
                    setNewCompany('')
                    setNewLocation('')
                    setNewType('Full-time')
                    setNewSalary('')
                    setNewDescriptionHtml('')
                    setNewRequirementsHtml('')
                    setNewResponsibilitiesHtml('')
                    setNewApplication('')
                    setIsCreateOpen(false)
                  } catch (error) {
                    setMessage(toApiErrorMessage(error, 'Could not create job.'))
                  }
                }}
              >
                <div className="relative overflow-y-auto max-h-[72vh] px-0 py-2 pb-40 rounded-b-lg overflow-hidden">
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
                    <RichTextEditor value={newDescriptionHtml} onChange={setNewDescriptionHtml} minHeightClassName="min-h-[140px]" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Responsibilities</label>
                      <RichTextEditor value={newResponsibilitiesHtml} onChange={setNewResponsibilitiesHtml} minHeightClassName="min-h-[100px]" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Requirements</label>
                      <RichTextEditor value={newRequirementsHtml} onChange={setNewRequirementsHtml} minHeightClassName="min-h-[100px]" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input value={newApplication} onChange={(e) => setNewApplication(e.target.value)} className="px-3 py-2 border border-border rounded-md" placeholder="Application email or URL" />
                    <input placeholder="Tags (comma separated)" className="px-3 py-2 border border-border rounded-md" />
                  </div>
                </div>

                <DialogFooter className="sticky bottom-0 bg-background/70 backdrop-blur py-3 flex justify-end gap-2 border-t border-border/10">
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

      <div className="admin-page-body">
        {message && <Card className="admin-card p-3 text-sm text-muted-foreground">{message}</Card>}

        <Card className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="admin-control flex flex-1 items-center rounded-lg bg-muted px-4">
              <Search size={20} className="text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select className="admin-control rounded-lg border px-4 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </Card>

        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="w-full sm:max-w-3xl rounded-2xl border border-border/60">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Job' : 'Job details'}</DialogTitle>
              <DialogDescription>Full details of the job posting.</DialogDescription>
            </DialogHeader>

            {viewJob && (
              <form className="grid gap-4 py-2" onSubmit={(e) => { e.preventDefault(); void saveViewEdits() }}>
                <div className="overflow-y-auto max-h-[72vh] px-0 py-2 pb-28">
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
                        <span className="text-xs">Status</span>
                        {isEditing ? (
                          <select value={viewJob.status} onChange={(e) => setViewJob({ ...viewJob, status: e.target.value })} className="px-2 py-1 border border-border rounded-md">
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Closed</option>
                          </select>
                        ) : (
                          <span className="px-2 py-1 rounded-full bg-muted/20">{viewJob.status || '—'}</span>
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
                      <RichTextEditor value={viewJob.description || ''} onChange={(next) => setViewJob({ ...viewJob, description: next })} minHeightClassName="min-h-[140px]" />
                    ) : (
                      <div className="prose text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: sanitizeHtml(viewJob.description || '') }} />
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Responsibilities</label>
                      {isEditing ? (
                        <RichTextEditor value={viewJob.responsibilities || ''} onChange={(next) => setViewJob({ ...viewJob, responsibilities: next })} minHeightClassName="min-h-[100px]" />
                      ) : (
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: sanitizeHtml(viewJob.responsibilities || '') }} />
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Requirements</label>
                      {isEditing ? (
                        <RichTextEditor value={viewJob.requirements || ''} onChange={(next) => setViewJob({ ...viewJob, requirements: next })} minHeightClassName="min-h-[100px]" />
                      ) : (
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: sanitizeHtml(viewJob.requirements || '') }} />
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
                </div>

                <DialogFooter className="absolute bottom-0 left-0 right-0 z-50 bg-background px-4 sm:px-6 py-3 flex items-center gap-2 border-t border-border/10 rounded-b-lg shadow-md">
                  <div className="text-sm text-muted-foreground mr-auto">Applications: <strong className="ml-1">{viewJob.applications}</strong></div>
                  {!isEditing && (
                    <DialogClose asChild>
                      <button type="button" className="px-4 py-2 rounded-md border border-border">Close</button>
                    </DialogClose>
                  )}
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <button onClick={() => setIsEditing(false)} type="button" className="px-4 py-2 rounded-md border">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Save changes</button>
                      </>
                    ) : (
                      <button onClick={() => setIsEditing(true)} type="button" className="px-4 py-2 rounded-md border">Edit</button>
                    )}
                  </div>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <Card className="admin-card p-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-0">
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
                    <td className="py-4 px-4"><p className="font-semibold text-foreground">{job.title}</p></td>
                    <td className="py-4 px-4 text-muted-foreground">{job.company}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-700' : job.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{job.applications}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{job.posted}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => openView(job)} className="admin-interactive rounded-lg p-2 hover:bg-muted" title="View"><Eye size={18} className="text-muted-foreground hover:text-foreground" /></button>
                        <button onClick={() => openView(job, true)} className="admin-interactive rounded-lg p-2 hover:bg-muted" title="Edit"><Edit2 size={18} className="text-muted-foreground hover:text-foreground" /></button>
                        <button onClick={() => void handleDelete(job.id)} className="admin-interactive rounded-lg p-2 hover:bg-red-50" title="Delete"><Trash2 size={18} className="text-red-500 hover:text-red-700" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredJobs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-muted-foreground">No jobs match your filters.</td>
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
