import AdminSidebar from '@/components/admin-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit2, Trash2, Eye, Plus, Search } from 'lucide-react'

export default function AdminJobsPage() {
  const jobs = [
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
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto md:ml-0">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-20">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Jobs Management</h1>
              <p className="text-muted-foreground">Manage all job postings</p>
            </div>
            <Button className="gap-2">
              <Plus size={20} />
              Create Job
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search and Filter */}
          <Card className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 flex items-center bg-muted rounded-lg px-4">
                <Search size={20} className="text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <select className="px-4 py-2 border border-border rounded-lg bg-white">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Closed</option>
              </select>
            </div>
          </Card>

          {/* Jobs Table */}
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
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
                  {jobs.map((job) => (
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
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View">
                            <Eye size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit">
                            <Edit2 size={18} className="text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                            <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
