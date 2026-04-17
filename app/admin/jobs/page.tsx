"use client"

import { useEffect, useMemo, useState, useRef } from 'react'
import { Link as LinkIcon, Image as ImageIcon } from 'lucide-react'
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
  const [newDescriptionHtml, setNewDescriptionHtml] = useState('')
  const [newResponsibilitiesHtml, setNewResponsibilitiesHtml] = useState('')
  const [newRequirementsHtml, setNewRequirementsHtml] = useState('')
  const newEditorRef = useRef<HTMLDivElement | null>(null)
  const newRespRef = useRef<HTMLDivElement | null>(null)
  const newReqRef = useRef<HTMLDivElement | null>(null)
  const [showNewLinkInput, setShowNewLinkInput] = useState(false)
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [showNewImageInput, setShowNewImageInput] = useState(false)
  const [newImageUploadPreview, setNewImageUploadPreview] = useState<string | null>(null)

  // View / Edit job modal
  const [viewJob, setViewJob] = useState<any | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const viewEditorRef = useRef<HTMLDivElement | null>(null)
  const viewRespRef = useRef<HTMLDivElement | null>(null)
  const viewReqRef = useRef<HTMLDivElement | null>(null)
  const [showViewLinkInput, setShowViewLinkInput] = useState(false)
  const [viewLinkUrl, setViewLinkUrl] = useState('')
  const [showViewImageInput, setShowViewImageInput] = useState(false)
  const [viewImageUploadPreview, setViewImageUploadPreview] = useState<string | null>(null)

  const openView = (job: any, edit = false) => {
    setViewJob(job)
    setIsEditing(!!edit)
    setIsViewOpen(true)
  }

  const saveViewEdits = () => {
    if (!viewJob) return
    setJobs((prev) => prev.map((j) => (j.id === viewJob.id ? viewJob : j)))
    setIsEditing(false)
    setIsViewOpen(false)
  }

  const transformContentCase = (mode: 'lower' | 'upper' | 'title' | 'sentence') => {
    if (!viewJob) return
    const orig = viewJob.description || ''
    let next = orig
    if (mode === 'lower') next = orig.toLowerCase()
    if (mode === 'upper') next = orig.toUpperCase()
    if (mode === 'title') next = orig.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    if (mode === 'sentence') next = orig.replace(/(^|[.!?]\s+)([a-z])/, (m: string, p1: string, p2: string) => p1 + p2.toUpperCase())
    setViewJob({ ...viewJob, description: next })
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
                <DialogContent className="w-full sm:max-w-3xl rounded-2xl border border-border/60 max-h-[90vh] overflow-hidden">
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
                    <div className="border border-border rounded-md bg-white">
                      <div className="flex flex-wrap items-center gap-2 p-2 border-b border-border/60 bg-muted/5">
                        <button type="button" onClick={() => document.execCommand('bold')} className="px-2 py-1 rounded text-sm">B</button>
                        <button type="button" onClick={() => document.execCommand('italic')} className="px-2 py-1 rounded text-sm">I</button>
                        <button type="button" onClick={() => document.execCommand('underline')} className="px-2 py-1 rounded text-sm">U</button>
                        <div className="relative">
                          <button type="button" onClick={() => { setShowNewLinkInput((s) => !s); setShowNewImageInput(false) }} className="px-2 py-1 rounded text-sm flex items-center gap-1">
                            <LinkIcon size={14} />
                          </button>
                          {showNewLinkInput && (
                            <div className="absolute z-20 mt-2 bg-white border border-border rounded-md p-2 shadow-md w-64">
                              <div className="text-xs text-muted-foreground mb-1">Insert link URL</div>
                              <input value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} placeholder="https://example.com" className="w-full px-2 py-1 border border-border rounded-md mb-2" />
                              <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => { setShowNewLinkInput(false); setNewLinkUrl('') }} className="px-2 py-1 rounded border text-sm">Cancel</button>
                                <button type="button" onClick={() => { if (newLinkUrl) { document.execCommand('createLink', false, newLinkUrl); setShowNewLinkInput(false); setNewLinkUrl('') } }} className="px-2 py-1 rounded bg-primary text-primary-foreground text-sm">Insert</button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <button type="button" onClick={() => { setShowNewImageInput((s) => !s); setShowNewLinkInput(false) }} className="px-2 py-1 rounded text-sm flex items-center gap-1">
                            <ImageIcon size={14} />
                          </button>
                          {showNewImageInput && (
                            <div className="absolute z-20 mt-2 bg-white border border-border rounded-md p-3 shadow-md w-72">
                              <div className="text-xs text-muted-foreground mb-1">Insert image</div>
                              <input type="text" value={newImageUploadPreview || ''} onChange={(e) => setNewImageUploadPreview(e.target.value)} placeholder="Image URL (or upload below)" className="w-full px-2 py-1 border border-border rounded-md mb-2" />
                              <div className="mb-2">
                                <div className="text-xs text-muted-foreground mb-1">Or upload</div>
                                <input type="file" accept="image/*" onChange={(ev) => {
                                  const f = ev.target.files && ev.target.files[0]
                                  if (f) {
                                    if (newImageUploadPreview) URL.revokeObjectURL(newImageUploadPreview)
                                    const url = URL.createObjectURL(f)
                                    setNewImageUploadPreview(url)
                                  }
                                }} />
                                {newImageUploadPreview && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={newImageUploadPreview} alt="preview" className="mt-2 w-full h-28 object-cover rounded" />
                                )}
                              </div>
                              <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => { setShowNewImageInput(false); if (newImageUploadPreview) { URL.revokeObjectURL(newImageUploadPreview); setNewImageUploadPreview(null) } }} className="px-2 py-1 rounded border text-sm">Cancel</button>
                                <button type="button" onClick={() => { const url = newImageUploadPreview; if (url) { document.execCommand('insertImage', false, url); setShowNewImageInput(false); setNewImageUploadPreview(null) } }} className="px-2 py-1 rounded bg-primary text-primary-foreground text-sm">Insert</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        ref={newEditorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => setNewDescriptionHtml((e.target as HTMLDivElement).innerHTML)}
                        className="min-h-[140px] p-3"
                        dangerouslySetInnerHTML={{ __html: newDescriptionHtml }}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Responsibilities</label>
                        <div className="border border-border rounded-md bg-white">
                          <div className="flex items-center gap-2 p-2 border-b border-border/60 bg-muted/5">
                            <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="px-2 py-1 rounded text-sm">UL</button>
                            <button type="button" onClick={() => document.execCommand('insertOrderedList')} className="px-2 py-1 rounded text-sm">OL</button>
                          </div>
                          <div ref={newRespRef} contentEditable suppressContentEditableWarning onInput={(e) => setNewResponsibilitiesHtml((e.target as HTMLDivElement).innerHTML)} className="min-h-[80px] p-3" dangerouslySetInnerHTML={{ __html: newResponsibilitiesHtml }} />
                        </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Requirements</label>
                      <div className="border border-border rounded-md bg-white">
                        <div className="flex flex-wrap items-center gap-2 p-2 border-b border-border/60 bg-muted/5">
                          <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="px-2 py-1 rounded text-sm">UL</button>
                          <button type="button" onClick={() => document.execCommand('insertOrderedList')} className="px-2 py-1 rounded text-sm">OL</button>
                        </div>
                        <div ref={newReqRef} contentEditable suppressContentEditableWarning onInput={(e) => setNewRequirementsHtml((e.target as HTMLDivElement).innerHTML)} className="min-h-[80px] p-3" dangerouslySetInnerHTML={{ __html: newRequirementsHtml }} />
                      </div>
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
              <DialogContent className="w-full sm:max-w-3xl rounded-2xl border border-border/60">
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Edit Job' : 'Job details'}</DialogTitle>
                <DialogDescription>Full details of the job posting.</DialogDescription>
              </DialogHeader>

                  {viewJob && (
                    <form className="grid gap-4 py-2" onSubmit={(e) => { e.preventDefault(); saveViewEdits(); }}>
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
                      <div className="border border-border rounded-md bg-white">
                        <div className="flex items-center gap-2 p-2 border-b border-border/60 bg-muted/5">
                          <button type="button" onClick={() => document.execCommand('bold')} className="px-2 py-1 rounded text-sm">B</button>
                          <button type="button" onClick={() => document.execCommand('italic')} className="px-2 py-1 rounded text-sm">I</button>
                          <button type="button" onClick={() => document.execCommand('underline')} className="px-2 py-1 rounded text-sm">U</button>
                          <div className="relative">
                            <button type="button" onClick={() => { setShowViewLinkInput((s) => !s); setShowViewImageInput(false) }} className="px-2 py-1 rounded text-sm flex items-center gap-1">
                              <LinkIcon size={14} />
                            </button>
                            {showViewLinkInput && (
                              <div className="absolute z-20 mt-2 bg-white border border-border rounded-md p-2 shadow-md w-64">
                                <div className="text-xs text-muted-foreground mb-1">Insert link URL</div>
                                <input value={viewLinkUrl} onChange={(e) => setViewLinkUrl(e.target.value)} placeholder="https://example.com" className="w-full px-2 py-1 border border-border rounded-md mb-2" />
                                <div className="flex justify-end gap-2">
                                  <button type="button" onClick={() => { setShowViewLinkInput(false); setViewLinkUrl('') }} className="px-2 py-1 rounded border text-sm">Cancel</button>
                                  <button type="button" onClick={() => { if (viewLinkUrl && viewEditorRef.current) { document.execCommand('createLink', false, viewLinkUrl); setShowViewLinkInput(false); setViewLinkUrl('') } }} className="px-2 py-1 rounded bg-primary text-primary-foreground text-sm">Insert</button>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="relative">
                            <button type="button" onClick={() => { setShowViewImageInput((s) => !s); setShowViewLinkInput(false) }} className="px-2 py-1 rounded text-sm flex items-center gap-1">
                              <ImageIcon size={14} />
                            </button>
                            {showViewImageInput && (
                              <div className="absolute z-20 mt-2 bg-white border border-border rounded-md p-3 shadow-md w-72">
                                <div className="text-xs text-muted-foreground mb-1">Insert image</div>
                                <input type="text" value={viewImageUploadPreview || ''} onChange={(e) => setViewImageUploadPreview(e.target.value)} placeholder="Image URL (or upload below)" className="w-full px-2 py-1 border border-border rounded-md mb-2" />
                                <div className="mb-2">
                                  <div className="text-xs text-muted-foreground mb-1">Or upload</div>
                                  <input type="file" accept="image/*" onChange={(ev) => {
                                    const f = ev.target.files && ev.target.files[0]
                                    if (f) {
                                      if (viewImageUploadPreview) URL.revokeObjectURL(viewImageUploadPreview)
                                      const url = URL.createObjectURL(f)
                                      setViewImageUploadPreview(url)
                                    }
                                  }} />
                                  {viewImageUploadPreview && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={viewImageUploadPreview} alt="preview" className="mt-2 w-full h-28 object-cover rounded" />
                                  )}
                                </div>
                                <div className="flex justify-end gap-2">
                                  <button type="button" onClick={() => { setShowViewImageInput(false); if (viewImageUploadPreview) { URL.revokeObjectURL(viewImageUploadPreview); setViewImageUploadPreview(null) } }} className="px-2 py-1 rounded border text-sm">Cancel</button>
                                  <button type="button" onClick={() => { const url = viewImageUploadPreview; if (url && viewEditorRef.current) { document.execCommand('insertImage', false, url); setShowViewImageInput(false); setViewImageUploadPreview(null) } }} className="px-2 py-1 rounded bg-primary text-primary-foreground text-sm">Insert</button>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="ml-auto flex items-center gap-2">
                            <div className="text-xs text-muted-foreground">Case:</div>
                            <button type="button" onClick={() => { if (viewEditorRef.current) { viewEditorRef.current.innerText = viewEditorRef.current.innerText.toLowerCase(); setViewJob({ ...viewJob, description: viewEditorRef.current.innerHTML }) } }} className="px-2 py-1 rounded text-sm">lower</button>
                            <button type="button" onClick={() => { if (viewEditorRef.current) { viewEditorRef.current.innerText = viewEditorRef.current.innerText.toUpperCase(); setViewJob({ ...viewJob, description: viewEditorRef.current.innerHTML }) } }} className="px-2 py-1 rounded text-sm">UPPER</button>
                          </div>
                        </div>
                        <div className="min-h-[140px] p-3 border-t border-border/10">
                          <div ref={viewEditorRef} contentEditable suppressContentEditableWarning onInput={(e) => setViewJob({ ...viewJob, description: (e.target as HTMLDivElement).innerHTML })} className="min-h-[140px]" dangerouslySetInnerHTML={{ __html: viewJob.description || '' }} />
                        </div>
                      </div>
                    ) : (
                      <div className="prose text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: viewJob.description || '' }} />
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Responsibilities</label>
                      {isEditing ? (
                          <div className="border border-border rounded-md bg-white">
                            <div className="flex items-center gap-2 p-2 border-b border-border/60 bg-muted/5">
                              <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="px-2 py-1 rounded text-sm">UL</button>
                              <button type="button" onClick={() => document.execCommand('insertOrderedList')} className="px-2 py-1 rounded text-sm">OL</button>
                            </div>
                            <div ref={viewRespRef} contentEditable suppressContentEditableWarning onInput={(e) => setViewJob({ ...viewJob, responsibilities: (e.target as HTMLDivElement).innerHTML })} className="min-h-[100px] p-3" dangerouslySetInnerHTML={{ __html: viewJob.responsibilities || '' }} />
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: viewJob.responsibilities || '' }} />
                        )}
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Requirements</label>
                        {isEditing ? (
                          <div className="border border-border rounded-md bg-white">
                            <div className="flex items-center gap-2 p-2 border-b border-border/60 bg-muted/5">
                              <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="px-2 py-1 rounded text-sm">UL</button>
                              <button type="button" onClick={() => document.execCommand('insertOrderedList')} className="px-2 py-1 rounded text-sm">OL</button>
                            </div>
                            <div ref={viewReqRef} contentEditable suppressContentEditableWarning onInput={(e) => setViewJob({ ...viewJob, requirements: (e.target as HTMLDivElement).innerHTML })} className="min-h-[100px] p-3" dangerouslySetInnerHTML={{ __html: viewJob.requirements || '' }} />
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: viewJob.requirements || '' }} />
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
                          <button onClick={() => { setIsEditing(false); }} type="button" className="px-4 py-2 rounded-md border">Cancel</button>
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

          {/* Jobs Table */}
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
                            onClick={() => openView(job, true)}
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
