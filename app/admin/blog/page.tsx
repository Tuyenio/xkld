"use client"

import { useMemo, useState } from 'react'
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
import { blogPosts as seedBlogPosts } from '@/lib/blog-data'
import { sanitizeHtml } from '@/lib/html-sanitize'
import { RichTextEditor } from '@/components/admin/rich-text-editor'

type AdminPost = {
  id: number
  title: string
  author: string
  status: 'Published' | 'Draft'
  views: number
  published: string
  slug: string
  content: string
  image: string | null
}

const initialPosts: AdminPost[] = seedBlogPosts.map((post) => ({
  id: post.id,
  title: post.title,
  author: post.author,
  status: post.status,
  views: post.views,
  published: post.date,
  slug: post.slug,
  content: post.content,
  image: null,
}))

export default function AdminBlogPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState<AdminPost[]>(initialPosts)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const createFormId = useId()

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newStatus, setNewStatus] = useState<'Published' | 'Draft'>('Draft')
  const [newContentHtml, setNewContentHtml] = useState('')
  const [newPublished, setNewPublished] = useState('')
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)

  const [viewPost, setViewPost] = useState<AdminPost | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const openView = (post: AdminPost, edit = false) => {
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

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesStatus = statusFilter === 'All' || post.status === statusFilter
      const text = `${post.title} ${post.author}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [posts, query, statusFilter])

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id))
    setMessage(`Removed post #${id}`)
  }

  return (
    <div className="bg-background">
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

              <form
                id={createFormId}
                className="grid gap-3 py-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1
                  const published = newPublished || new Date().toISOString().split('T')[0]
                  const created: AdminPost = {
                    id: nextId,
                    title: newTitle,
                    author: newAuthor,
                    status: newStatus,
                    views: 0,
                    published,
                    slug: newTitle
                      .trim()
                      .toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-'),
                    content: sanitizeHtml(newContentHtml),
                    image: newImagePreview || null,
                  }
                  setPosts([created, ...posts])
                  setNewTitle('')
                  setNewAuthor('')
                  setNewStatus('Draft')
                  setNewContentHtml('')
                  setNewPublished('')
                  if (newImagePreview) URL.revokeObjectURL(newImagePreview)
                  setNewImagePreview(null)
                  setIsCreateOpen(false)
                  setMessage(`Created post #${nextId}`)
                }}
              >
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
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(ev) => {
                          const f = ev.target.files?.[0]
                          if (!f) return
                          if (newImagePreview) URL.revokeObjectURL(newImagePreview)
                          setNewImagePreview(URL.createObjectURL(f))
                        }}
                      />
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
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as 'Published' | 'Draft')} className="px-3 py-2 border border-border rounded-md">
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                    <input value={newPublished} onChange={(e) => setNewPublished(e.target.value)} placeholder="YYYY-MM-DD (optional)" className="px-3 py-2 border border-border rounded-md" />
                    <input placeholder="Tags (comma separated)" className="px-3 py-2 border border-border rounded-md" />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Content</label>
                    <RichTextEditor
                      value={newContentHtml}
                      onChange={setNewContentHtml}
                      minHeightClassName="min-h-[160px]"
                      allowCaseTransform
                    />
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

      <div className="p-4 sm:p-6 space-y-6">
        {message && <Card className="p-3 text-sm text-muted-foreground">{message}</Card>}

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
            <select className="px-4 py-2 border border-border rounded-lg bg-white" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </Card>

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
                    <td className="py-4 px-4"><p className="font-semibold text-foreground">{post.title}</p></td>
                    <td className="py-4 px-4 text-muted-foreground">{post.author}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{post.views}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{post.published}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => openView(post)} className="p-2 hover:bg-muted rounded-lg transition-colors" title="View"><Eye size={18} className="text-muted-foreground hover:text-foreground" /></button>
                        <button onClick={() => openView(post, true)} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit"><Edit2 size={18} className="text-muted-foreground hover:text-foreground" /></button>
                        <button onClick={() => deletePost(post.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={18} className="text-red-500 hover:text-red-700" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPosts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-muted-foreground">No posts match your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="w-full sm:max-w-2xl rounded-2xl border border-border/60 max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Post' : 'Post details'}</DialogTitle>
              <DialogDescription>Read or edit the full post content.</DialogDescription>
            </DialogHeader>

            {viewPost && (
              <form className="grid gap-4 py-2" onSubmit={(e) => { e.preventDefault(); saveViewEdits() }}>
                <div className="overflow-y-auto max-h-[72vh] px-0 py-2">
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
                              const f = ev.target.files?.[0]
                              if (!f) return
                              setViewPost({ ...viewPost, image: URL.createObjectURL(f) })
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
                      <div>
                        Status:{' '}
                        {isEditing ? (
                          <select value={viewPost.status} onChange={(e) => setViewPost({ ...viewPost, status: e.target.value as 'Published' | 'Draft' })} className="px-2 py-1 border border-border rounded-md">
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                          </select>
                        ) : (
                          <span className="px-2 py-1 rounded-full bg-muted/20">{viewPost.status}</span>
                        )}
                      </div>
                      <div className="mt-2">Published: <span className="text-muted-foreground">{viewPost.published}</span></div>
                      <div className="mt-2">Views: <strong>{viewPost.views}</strong></div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">Content</label>
                    {isEditing ? (
                      <RichTextEditor value={viewPost.content || ''} onChange={(next) => setViewPost({ ...viewPost, content: next })} minHeightClassName="min-h-[220px]" allowCaseTransform />
                    ) : (
                      <div className="prose text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: sanitizeHtml(viewPost.content || '') }} />
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
                        <button onClick={() => { setIsEditing(false); setViewPost(null); setIsViewOpen(false) }} type="button" className="px-4 py-2 rounded-md border">Cancel</button>
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
