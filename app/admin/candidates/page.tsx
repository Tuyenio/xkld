import AdminSidebar from '@/components/admin-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, Eye, Trash2, Search, Download } from 'lucide-react'

export default function AdminCandidatesPage() {
  const candidates = [
    {
      id: 1,
      name: 'Nguyễn Văn Nam',
      email: 'nguyenvannam@email.com',
      phone: '+84 98 123 4567',
      jobTitle: 'Senior Software Engineer',
      experience: '5 years',
      location: 'Ho Chi Minh City',
      applications: 3,
    },
    {
      id: 2,
      name: 'Trần Thị Hương',
      email: 'tranthihuong@email.com',
      phone: '+84 98 234 5678',
      jobTitle: 'Product Manager',
      experience: '4 years',
      location: 'Hanoi',
      applications: 2,
    },
    {
      id: 3,
      name: 'Hoàng Văn Tú',
      email: 'hoangvantu@email.com',
      phone: '+84 98 345 6789',
      jobTitle: 'UX Designer',
      experience: '3 years',
      location: 'Da Nang',
      applications: 1,
    },
    {
      id: 4,
      name: 'Lê Thị Linh',
      email: 'lethilinh@email.com',
      phone: '+84 98 456 7890',
      jobTitle: 'DevOps Engineer',
      experience: '6 years',
      location: 'Ho Chi Minh City',
      applications: 2,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto md:ml-0">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-20">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
            <p className="text-muted-foreground">Manage and review all candidates</p>
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
                  placeholder="Search candidates..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Download size={18} />
                Export
              </Button>
            </div>
          </Card>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View">
                      <Eye size={18} className="text-muted-foreground hover:text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 size={18} className="text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{candidate.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{candidate.jobTitle}</p>
                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail size={16} />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone size={16} />
                    <span>{candidate.phone}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-semibold text-foreground">{candidate.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Applications</span>
                    <span className="font-semibold text-foreground">{candidate.applications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-semibold text-foreground">{candidate.location}</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
