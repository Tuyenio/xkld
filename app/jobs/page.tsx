'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { PremiumButton } from '@/components/premium-button'
import { JobCardPro } from '@/components/job-card-pro'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { Search, Filter, X } from 'lucide-react'
import { useState } from 'react'

const allJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp Taipei',
    location: 'Taipei',
    salary: '$3,500 - $5,000',
    category: 'Technology',
    experience: '3-5 years',
    tags: ['React', 'Node.js', 'AWS'],
    featured: true,
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'DataSys Inc',
    location: 'Hsinchu',
    salary: '$2,800 - $4,200',
    category: 'Management',
    experience: '5-7 years',
    tags: ['Product', 'Strategy', 'Leadership'],
    featured: false,
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'CreativeStudio',
    location: 'Taichung',
    salary: '$2,200 - $3,500',
    category: 'Design',
    experience: '2-4 years',
    tags: ['Design', 'Figma', 'Web3'],
    featured: true,
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Infrastructure Pro',
    location: 'Taipei',
    salary: '$3,000 - $4,500',
    category: 'Technology',
    experience: '3-5 years',
    tags: ['Kubernetes', 'Docker', 'AWS'],
    featured: false,
  },
  {
    id: 5,
    title: 'Marketing Manager',
    company: 'BrandInc',
    location: 'Taipei',
    salary: '$2,500 - $3,800',
    category: 'Marketing',
    experience: '3-5 years',
    tags: ['Marketing', 'Digital', 'Analytics'],
    featured: false,
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'Analytics Hub',
    location: 'Taipei',
    salary: '$3,200 - $4,800',
    category: 'Technology',
    experience: '2-4 years',
    tags: ['Python', 'ML', 'TensorFlow'],
    featured: true,
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation

    return matchesSearch && matchesCategory && matchesLocation
  })

  const categories = [...new Set(allJobs.map((j) => j.category))]
  const locations = [...new Set(allJobs.map((j) => j.location))]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Browse <span className="gradient-text">Premium Jobs</span> in Taiwan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12">
            Explore 500+ exclusive opportunities from top Taiwan employers
          </p>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search jobs by title, company, or skill..."
                className="pl-12 py-3 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchQuery || selectedCategory !== 'all' || selectedLocation !== 'all') && (
                <PremiumButton
                  variant="ghost"
                  size="md"
                  icon={<X size={18} />}
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedLocation('all')
                  }}
                >
                  Clear Filters
                </PremiumButton>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {allJobs.length} jobs
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Job List */}
              <div className="lg:col-span-2 space-y-6">
                {filteredJobs.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`}>
                    <JobCardPro
                      id={String(job.id)}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      tags={job.tags}
                      featured={job.featured}
                      isSaved={savedJobs.includes(job.id)}
                      onSave={() => {
                        setSavedJobs((prev) =>
                          prev.includes(job.id)
                            ? prev.filter((id) => id !== job.id)
                            : [...prev, job.id]
                        )
                      }}
                    />
                  </Link>
                ))}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Saved Jobs */}
                  <div className="card-premium p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Saved Jobs ({savedJobs.length})
                    </h3>
                    {savedJobs.length > 0 ? (
                      <div className="space-y-3">
                        {allJobs
                          .filter((j) => savedJobs.includes(j.id))
                          .map((job) => (
                            <Link
                              key={job.id}
                              href={`/jobs/${job.id}`}
                              className="block p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                            >
                              <p className="font-semibold text-sm text-foreground hover:text-primary">
                                {job.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{job.company}</p>
                            </Link>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No saved jobs yet. Start saving!</p>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="card-premium p-6 space-y-4">
                    <h3 className="text-lg font-bold text-foreground">Market Insights</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Avg. Salary</span>
                        <span className="font-bold text-primary">$3,200/mo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Top Category</span>
                        <span className="font-bold text-primary">Technology</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Hiring Companies</span>
                        <span className="font-bold text-primary">50+</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href="/signup">
                    <PremiumButton variant="primary" size="lg" className="w-full">
                      Start Job Search
                    </PremiumButton>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-foreground mb-4">No jobs found</h2>
              <p className="text-muted-foreground mb-8">Try adjusting your filters</p>
              <PremiumButton
                variant="primary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedLocation('all')
                }}
              >
                Clear All Filters
              </PremiumButton>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
