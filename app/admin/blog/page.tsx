"use client"

import { useMemo, useState } from 'react'
import AdminSidebar from '@/components/admin-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

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
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto lg:ml-0">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
              <p className="text-muted-foreground">Create and manage blog posts</p>
            </div>
            <Button className="gap-2">
              <Plus size={20} />
              New Post
            </Button>
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
              <table className="w-full min-w-[760px]">
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
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View">
                            <Eye size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Edit"
                            onClick={() => togglePublish(post.id)}
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
        </div>
      </main>
    </div>
  )
}
