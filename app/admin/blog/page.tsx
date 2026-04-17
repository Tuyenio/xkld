"use client"

import { useMemo, useState, useRef, useEffect } from 'react'
import { Link as LinkIcon, Image as ImageIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PremiumButton } from '@/components/premium-button'
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
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

export default function AdminBlogPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Top 10 Tips to Ace Your Taiwan Job Interview',
      author: 'Sarah Johnson',
      status: 'Published',
      views: 1240,
      published: '2024-03-15',
    },
    {
      id: 2,
      title: 'Guide to Finding Accommodation in Taipei',
      author: 'Mike Chen',
      status: 'Published',
      views: 856,
      published: '2024-03-10',
    },
    {
      id: 3,
      title: 'Salary Negotiation in Taiwan: What You Need to Know',
      author: 'Lisa Wong',
      status: 'Draft',
      views: 0,
      published: '2024-03-05',
    },
  ])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createFormId = useId()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newStatus, setNewStatus] = useState('Draft')
  const [newContent, setNewContent] = useState('')
  const [newContentHtml, setNewContentHtml] = useState('')
  const [showNewLinkInput, setShowNewLinkInput] = useState(false)
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [showNewImageInput, setShowNewImageInput] = useState(false)
  const [newImageUploadFile, setNewImageUploadFile] = useState<File | null>(null)
  const [newImageUploadPreview, setNewImageUploadPreview] = useState<string | null>(null)
  const [newPublished, setNewPublished] = useState('')
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)

  const [viewPost, setViewPost] = useState<any | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const viewEditorRef = useRef<HTMLDivElement | null>(null)
  const newEditorRef = useRef<HTMLDivElement | null>(null)
  const [showViewLinkInput, setShowViewLinkInput] = useState(false)
  const [viewLinkUrl, setViewLinkUrl] = useState('')
  const [showViewImageInput, setShowViewImageInput] = useState(false)
  const [viewImageUploadFile, setViewImageUploadFile] = useState<File | null>(null)
  const [viewImageUploadPreview, setViewImageUploadPreview] = useState<string | null>(null)

  const openView = (post: any, edit = false) => {
    setViewPost(post)
    setIsEditing(edit)
    setIsViewOpen(true)
  }

  const saveViewEdits = () => {
    if (!viewPost) return
    setPosts((prev) => prev.map((p) => (p.id === viewPost.id ? viewPost : p)))
    setIsEditing(false)
    setIsViewOpen(false)
    setMessage(`Saved changes for post #${viewPost.id}`)
  }

  const transformContentCase = (mode: 'lower' | 'upper' | 'title' | 'sentence') => {
    if (!viewPost) return
    const orig = viewPost.content || ''
    let next = orig
    if (mode === 'lower') next = orig.toLowerCase()
    if (mode === 'upper') next = orig.toUpperCase()
    if (mode === 'title') next = orig.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    if (mode === 'sentence') next = orig.replace(/(^|[.!?]\s+)([a-z])/, (m: string, p1: string, p2: string) => p1 + p2.toUpperCase())
    setViewPost({ ...viewPost, content: next })
  }

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesStatus = statusFilter === 'All' || post.status === statusFilter
      const text = `${post.title} ${post.author}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [posts, query, statusFilter])

  const togglePublish = (id: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) return post
        const nextStatus = post.status === 'Published' ? 'Draft' : 'Published'
        const nextViews = nextStatus === 'Published' && post.views === 0 ? 100 : post.views
        return { ...post, status: nextStatus, views: nextViews }
      })
    )
    setMessage(`Updated publish status for post #${id}`)
  }

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id))
    setMessage(`Removed post #${id}`)
  }

  return (
    <div className="bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
              <p className="text-muted-foreground">Create and manage blog posts</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <PremiumButton icon={<Plus size={20} />}>New Post</PremiumButton>
              </DialogTrigger>
              <DialogContent className="w-full sm:max-w-2xl rounded-2xl border border-border/60 max-h-[90vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle>New Post</DialogTitle>
                  <DialogDescription>Create and publish a new blog post.</DialogDescription>
                </DialogHeader>

                <form id={createFormId} className="grid gap-3 py-2" onSubmit={(e) => {
                  e.preventDefault()
                  const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1
                  const published = newPublished || new Date().toISOString().split('T')[0]
                  const created = {
                    id: nextId,
                    title: newTitle,
                    author: newAuthor,
                    status: newStatus,
                    views: 0,
                    published,
                    content: newContent,
                    image: newImagePreview || null,
                  }
                  setPosts((prev) => [created, ...prev])
                  setNewTitle('')
                  setNewAuthor('')
                  setNewStatus('Draft')
                  setNewContent('')
                  setNewPublished('')
                  if (newImagePreview) {
                    URL.revokeObjectURL(newImagePreview)
                  }
                  setNewImageFile(null)
                  setNewImagePreview(null)
                  setIsCreateOpen(false)
                  setMessage(`Created post #${nextId}`)
                }}>
                  <div className="relative overflow-y-auto max-h-[70vh] px-0 py-2 pb-40 rounded-b-lg overflow-hidden">
                  <div>
                    <label className="text-sm text-muted-foreground">Cover image</label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="w-32 sm:w-40 h-24 sm:h-28 bg-muted/30 rounded-md overflow-hidden flex items-center justify-center">
                        {newImagePreview ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={newImagePreview} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-xs text-muted-foreground">No image</div>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(ev) => {
                            const f = ev.target.files && ev.target.files[0]
                            if (f) {
                              if (newImagePreview) URL.revokeObjectURL(newImagePreview)
                              const url = URL.createObjectURL(f)
                              setNewImageFile(f)
                              setNewImagePreview(url)
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Title</label>
                      <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Author</label>
                      <input value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} className="w-full px-3 py-2 border border-border rounded-md" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="px-3 py-2 border border-border rounded-md">
                      <option>Draft</option>
                      <option>Published</option>
                    </select>
                    <input value={newPublished} onChange={(e) => setNewPublished(e.target.value)} placeholder="YYYY-MM-DD (optional)" className="px-3 py-2 border border-border rounded-md" />
                    <input placeholder="Tags (comma separated)" className="px-3 py-2 border border-border rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Content</label>
                    <div className="border border-border rounded-md bg-white">
                      <div className="flex flex-wrap items-center gap-2 p-2 border-b border-border/60 bg-muted/5">
                        <button type="button" onClick={() => document.execCommand('bold')} className="px-2 py-1 rounded text-sm">B</button>
                        <button type="button" onClick={() => document.execCommand('italic')} className="px-2 py-1 rounded text-sm">I</button>
                        <button type="button" onClick={() => document.execCommand('underline')} className="px-2 py-1 rounded text-sm">U</button>
                        <button type="button" onClick={() => document.execCommand('insertOrderedList')} className="px-2 py-1 rounded text-sm">OL</button>
                        <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="px-2 py-1 rounded text-sm">UL</button>
                        <div className="relative">
                          <button type="button" onClick={() => { setShowNewLinkInput((s) => !s); setShowNewImageInput(false) }} className="px-2 py-1 rounded text-sm flex items-center gap-1">
                            <LinkIcon size={14} />
                            <span className="sr-only">Insert link</span>
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
                            <span className="sr-only">Insert image</span>
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
                                    setNewImageUploadFile(f)
                                    setNewImageUploadPreview(url)
                                  }
                                }} />
                                {newImageUploadPreview && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={newImageUploadPreview} alt="preview" className="mt-2 w-full h-28 object-cover rounded" />
                                )}
                              </div>
                              <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => { setShowNewImageInput(false); setNewImageUploadFile(null); if (newImageUploadPreview) { URL.revokeObjectURL(newImageUploadPreview); setNewImageUploadPreview(null) } }} className="px-2 py-1 rounded border text-sm">Cancel</button>
                                <button type="button" onClick={() => {
                                  const url = newImageUploadPreview
                                  if (url) { document.execCommand('insertImage', false, url); setShowNewImageInput(false); setNewImageUploadFile(null); setNewImageUploadPreview(null) }
                                }} className="px-2 py-1 rounded bg-primary text-primary-foreground text-sm">Insert</button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="ml-2 text-xs text-muted-foreground">Case:</div>
                        <button type="button" onClick={() => { if (newEditorRef.current) { newEditorRef.current.innerText = newEditorRef.current.innerText.toLowerCase(); setNewContentHtml(newEditorRef.current.innerHTML) } }} className="px-2 py-1 rounded text-sm">lower</button>
                        <button type="button" onClick={() => { if (newEditorRef.current) { newEditorRef.current.innerText = newEditorRef.current.innerText.toUpperCase(); setNewContentHtml(newEditorRef.current.innerHTML) } }} className="px-2 py-1 rounded text-sm">UPPER</button>
                      </div>
                      <div
                        ref={newEditorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => setNewContentHtml((e.target as HTMLDivElement).innerHTML)}
                        className="min-h-[160px] p-3"
                        dangerouslySetInnerHTML={{ __html: newContentHtml }}
                      />
                    </div>
                  </div>

                  </div>
                  <DialogFooter className="absolute bottom-0 left-0 right-0 z-50 bg-background px-4 sm:px-6 py-3 flex justify-end gap-2 border-t border-border/10 rounded-b-lg shadow-md">
                    <DialogClose asChild>
                      <button type="button" className="px-4 py-2 rounded-md border border-border">Cancel</button>
                    </DialogClose>
                    <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Create post</button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {message && (
            <Card className="p-3 text-sm text-muted-foreground">{message}</Card>
          )}

          {/* Search */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center bg-muted rounded-lg px-4">
                <Search size={20} className="text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
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
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </Card>

          {/* Posts Table */}
          <Card className="p-6">
              <div className="overflow-x-auto">
              <table className="w-full min-w-0">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Author</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Views</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Published</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-semibold text-foreground">{post.title}</p>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{post.author}</td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{post.views}</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">{post.published}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button onClick={() => openView(post, false)} className="p-2 hover:bg-muted rounded-lg transition-colors" title="View">
                            <Eye size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Edit"
                            onClick={() => openView(post, true)}
                          >
                            <Edit2 size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                            onClick={() => deletePost(post.id)}
                          >
                            <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPosts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-muted-foreground">
                        No posts match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          {/* View / Edit Post Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
              <DialogContent className="w-full sm:max-w-2xl rounded-2xl border border-border/60 max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Edit Post' : 'Post details'}</DialogTitle>
                <DialogDescription>Read or edit the full post content.</DialogDescription>
              </DialogHeader>

              {viewPost && (
                <form className="grid gap-4 py-2" onSubmit={(e) => { e.preventDefault(); saveViewEdits(); }}>
                  <div className="overflow-y-auto max-h-[72vh] px-0 py-2">
                  {/* cover image preview / upload */}
                  <div className="flex items-start gap-4">
                    <div className="w-40 sm:w-56 h-28 sm:h-36 bg-muted/30 rounded-md overflow-hidden flex items-center justify-center">
                      {viewPost.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={viewPost.image} alt="cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-xs text-muted-foreground">No image</div>
                      )}
                    </div>
                    <div className="flex-1">
                      {isEditing && (
                        <div className="mb-2">
                          <label className="text-sm text-muted-foreground">Change cover image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(ev) => {
                              const f = ev.target.files && ev.target.files[0]
                              if (f) {
                                const url = URL.createObjectURL(f)
                                setViewPost({ ...viewPost, image: url })
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Title</label>
                      {isEditing ? (
                        <input value={viewPost.title} onChange={(e) => setViewPost({ ...viewPost, title: e.target.value })} className="w-full px-3 py-2 border border-border rounded-md" />
                      ) : (
                        <h3 className="text-lg font-semibold">{viewPost.title}</h3>
                      )}
                      <div className="text-sm text-muted-foreground mt-1">By {viewPost.author}</div>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      <div>Status: {isEditing ? (
                        <select value={viewPost.status} onChange={(e) => setViewPost({ ...viewPost, status: e.target.value })} className="px-2 py-1 border border-border rounded-md">
                          <option>Draft</option>
                          <option>Published</option>
                        </select>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-muted/20">{viewPost.status}</span>
                      )}</div>
                      <div className="mt-2">Published: <span className="text-muted-foreground">{viewPost.published}</span></div>
                      <div className="mt-2">Views: <strong>{viewPost.views}</strong></div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Content</label>
                    {isEditing ? (
                      <div>
                        <div className="flex flex-wrap items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">Formatting:</div>
                            <div className="flex gap-1">
                              <button type="button" onClick={() => document.execCommand('bold')} className="px-2 py-1 rounded text-sm">B</button>
                              <button type="button" onClick={() => document.execCommand('italic')} className="px-2 py-1 rounded text-sm">I</button>
                              <button type="button" onClick={() => document.execCommand('underline')} className="px-2 py-1 rounded text-sm">U</button>
                              <button type="button" onClick={() => document.execCommand('insertOrderedList')} className="px-2 py-1 rounded text-sm">OL</button>
                              <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="px-2 py-1 rounded text-sm">UL</button>
                              <div className="relative">
                                <button type="button" onClick={() => { setShowViewLinkInput((s) => !s); setShowViewImageInput(false) }} className="px-2 py-1 rounded text-sm flex items-center gap-1">
                                  <LinkIcon size={14} />
                                  <span className="sr-only">Insert link</span>
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
                                  <span className="sr-only">Insert image</span>
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
                                          setViewImageUploadFile(f)
                                          setViewImageUploadPreview(url)
                                        }
                                      }} />
                                      {viewImageUploadPreview && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={viewImageUploadPreview} alt="preview" className="mt-2 w-full h-28 object-cover rounded" />
                                      )}
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <button type="button" onClick={() => { setShowViewImageInput(false); setViewImageUploadFile(null); if (viewImageUploadPreview) { URL.revokeObjectURL(viewImageUploadPreview); setViewImageUploadPreview(null) } }} className="px-2 py-1 rounded border text-sm">Cancel</button>
                                      <button type="button" onClick={() => {
                                        const url = viewImageUploadPreview
                                        if (url && viewEditorRef.current) { document.execCommand('insertImage', false, url); setShowViewImageInput(false); setViewImageUploadFile(null); setViewImageUploadPreview(null) }
                                      }} className="px-2 py-1 rounded bg-primary text-primary-foreground text-sm">Insert</button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground">Case:</div>
                            <button type="button" onClick={() => { if (viewEditorRef.current) { viewEditorRef.current.innerText = viewEditorRef.current.innerText.toLowerCase(); setViewPost({ ...viewPost, content: viewEditorRef.current.innerHTML }) } }} className="px-2 py-1 rounded text-sm">lower</button>
                            <button type="button" onClick={() => { if (viewEditorRef.current) { viewEditorRef.current.innerText = viewEditorRef.current.innerText.toUpperCase(); setViewPost({ ...viewPost, content: viewEditorRef.current.innerHTML }) } }} className="px-2 py-1 rounded text-sm">UPPER</button>
                            <button type="button" onClick={() => transformContentCase('title')} className="px-2 py-1 rounded text-sm">Title</button>
                            <button type="button" onClick={() => transformContentCase('sentence')} className="px-2 py-1 rounded text-sm">Sentence</button>
                          </div>
                        </div>
                        <div className="border border-border rounded-md bg-white">
                          <div
                            ref={viewEditorRef}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={(e) => setViewPost({ ...viewPost, content: (e.target as HTMLDivElement).innerHTML })}
                            className="min-h-[220px] p-3"
                            dangerouslySetInnerHTML={{ __html: viewPost.content || '' }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="prose text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: viewPost.content || '' }} />
                    )}
                  </div>

                  </div>
                  <DialogFooter className="sticky bottom-0 left-0 right-0 z-50 bg-background px-4 sm:px-6 py-3 flex justify-end gap-2 border-t border-border/10">
                    {!isEditing && (
                      <DialogClose asChild>
                        <button type="button" className="px-4 py-2 rounded-md border border-border">Close</button>
                      </DialogClose>
                    )}
                    <div className="ml-auto flex gap-2">
                      {isEditing ? (
                        <>
                          <button onClick={() => { setIsEditing(false); setViewPost(null); setIsViewOpen(false); }} type="button" className="px-4 py-2 rounded-md border">Cancel</button>
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
        </div>
    </div>
  )
}
