'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { PremiumButton } from '@/components/premium-button'
import { JobCardPro } from '@/components/job-card-pro'
import { EmptyState } from '@/components/empty-state'
import { SkeletonCard } from '@/components/skeleton-card'
import { SearchBar } from '@/components/search-bar'
import { PaginationPro } from '@/components/pagination-pro'
import { FilterDrawer } from '@/components/filter-drawer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react'
import { jobRecords } from '@/lib/mock-data'

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [country, setCountry] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedExperience, setSelectedExperience] = useState('all')
  const [selectedShift, setSelectedShift] = useState('all')
  const [selectedGender, setSelectedGender] = useState('all')
  const [selectedHousing, setSelectedHousing] = useState('all')
  const [salaryBand, setSalaryBand] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const pageSize = 4

  const filteredJobs = useMemo(() => {
    const bySalaryBand = (salaryMin: number, band: string) => {
      if (band === 'all') return true
      if (band === 'lt2500') return salaryMin < 2500
      if (band === '2500_3500') return salaryMin >= 2500 && salaryMin <= 3500
      if (band === 'gt3500') return salaryMin > 3500
      return true
    }

    const base = jobRecords.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(debouncedQuery.toLowerCase())
      const matchesCountry = country === 'all' || job.country === country
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory
      const matchesExperience = selectedExperience === 'all' || job.experience === selectedExperience
      const matchesShift = selectedShift === 'all' || job.shift === selectedShift
      const matchesGender = selectedGender === 'all' || job.gender === selectedGender
      const matchesHousing =
        selectedHousing === 'all' ||
        (selectedHousing === 'supported' && job.housingSupport) ||
        (selectedHousing === 'no_support' && !job.housingSupport)
      const matchesSalary = bySalaryBand(job.salaryMin, salaryBand)

      return (
        matchesSearch &&
        matchesCountry &&
        matchesLocation &&
        matchesCategory &&
        matchesExperience &&
        matchesShift &&
        matchesGender &&
        matchesHousing &&
        matchesSalary
      )
    })

    if (sortBy === 'highest_salary') {
      return [...base].sort((a, b) => b.salaryMax - a.salaryMax)
    }

    if (sortBy === 'best_match') {
      return [...base].sort((a, b) => b.matchScore - a.matchScore)
    }

    return [...base].sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1))
  }, [
    debouncedQuery,
    country,
    selectedLocation,
    selectedCategory,
    selectedExperience,
    selectedShift,
    selectedGender,
    selectedHousing,
    salaryBand,
    sortBy,
  ])

  useEffect(() => {
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 260)
    return () => window.clearTimeout(timer)
  }, [
    debouncedQuery,
    country,
    selectedLocation,
    selectedCategory,
    selectedExperience,
    selectedShift,
    selectedGender,
    selectedHousing,
    salaryBand,
    sortBy,
    viewMode,
    currentPage,
  ])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize))
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const categories = [...new Set(jobRecords.map((j) => j.category))]
  const locations = [...new Set(jobRecords.map((j) => j.location))]
  const experiences = [...new Set(jobRecords.map((j) => j.experience))]

  const clearFilters = () => {
    setSearchQuery('')
    setDebouncedQuery('')
    setCountry('all')
    setSelectedCategory('all')
    setSelectedLocation('all')
    setSelectedExperience('all')
    setSelectedShift('all')
    setSelectedGender('all')
    setSelectedHousing('all')
    setSalaryBand('all')
    setSortBy('newest')
    setCurrentPage(1)
  }

  const filterControls = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select value={country} onValueChange={setCountry}>
        <SelectTrigger><SelectValue placeholder="Country" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Countries</SelectItem>
          <SelectItem value="Taiwan">Taiwan</SelectItem>
          <SelectItem value="Japan">Japan</SelectItem>
          <SelectItem value="Korea">Korea</SelectItem>
        </SelectContent>
      </Select>

      <Select value={salaryBand} onValueChange={setSalaryBand}>
        <SelectTrigger><SelectValue placeholder="Salary" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Salary</SelectItem>
          <SelectItem value="lt2500">Under $2,500</SelectItem>
          <SelectItem value="2500_3500">$2,500 - $3,500</SelectItem>
          <SelectItem value="gt3500">Above $3,500</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger><SelectValue placeholder="Industry" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Industries</SelectItem>
          {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
        </SelectContent>
      </Select>

      <Select value={selectedExperience} onValueChange={setSelectedExperience}>
        <SelectTrigger><SelectValue placeholder="Experience" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Experience</SelectItem>
          {experiences.map((exp) => (<SelectItem key={exp} value={exp}>{exp}</SelectItem>))}
        </SelectContent>
      </Select>

      <Select value={selectedShift} onValueChange={setSelectedShift}>
        <SelectTrigger><SelectValue placeholder="Shift" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Shifts</SelectItem>
          <SelectItem value="Day">Day</SelectItem>
          <SelectItem value="Night">Night</SelectItem>
          <SelectItem value="Rotating">Rotating</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedGender} onValueChange={setSelectedGender}>
        <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Any">Any</SelectItem>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedHousing} onValueChange={setSelectedHousing}>
        <SelectTrigger><SelectValue placeholder="Housing Support" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any</SelectItem>
          <SelectItem value="supported">Supported</SelectItem>
          <SelectItem value="no_support">No Support</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {locations.map((loc) => (<SelectItem key={loc} value={loc}>{loc}</SelectItem>))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Browse <span className="gradient-text">Premium Jobs</span> in Taiwan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12">
            Explore 500+ exclusive opportunities from top Taiwan employers
          </p>

          <div className="space-y-4">
            <SearchBar
              placeholder="Search jobs by title, company, or skill..."
              value={searchQuery}
              onChange={setSearchQuery}
              onDebouncedChange={(value) => {
                setDebouncedQuery(value)
                setCurrentPage(1)
              }}
            />

            <div className="hidden lg:block">{filterControls}</div>

            <div className="flex flex-wrap items-center gap-3">
              <FilterDrawer
                trigger={
                  <PremiumButton variant="outline" size="sm" icon={<SlidersHorizontal size={16} />}>
                    Advanced Filters
                  </PremiumButton>
                }
              >
                {filterControls}
              </FilterDrawer>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Sort" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="highest_salary">Highest Salary</SelectItem>
                  <SelectItem value="best_match">Best Match</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto flex gap-2">
                <PremiumButton variant={viewMode === 'grid' ? 'primary' : 'outline'} size="sm" icon={<LayoutGrid size={16} />} onClick={() => setViewMode('grid')}>
                  Grid
                </PremiumButton>
                <PremiumButton variant={viewMode === 'list' ? 'primary' : 'outline'} size="sm" icon={<List size={16} />} onClick={() => setViewMode('list')}>
                  List
                </PremiumButton>
              </div>

              <PremiumButton variant="ghost" size="sm" icon={<X size={16} />} onClick={clearFilters}>
                Clear
              </PremiumButton>
            </div>

            <p className="text-sm text-muted-foreground">Showing {filteredJobs.length} of {jobRecords.length} jobs</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 xl:grid-cols-2 gap-6' : 'space-y-4'}>
                  {paginatedJobs.map((job) => (
                    <Link key={job.id} href={`/jobs/${job.id}`}>
                      {viewMode === 'grid' ? (
                        <JobCardPro
                          id={String(job.id)}
                          title={job.title}
                          company={job.company}
                          location={job.location}
                          salary={`$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`}
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
                      ) : (
                        <div className="card-premium p-5 hover:bg-muted/20 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                              <p className="text-muted-foreground">{job.company} · {job.location}</p>
                              <p className="text-sm text-muted-foreground mt-2">{job.category} · {job.experience} · {job.shift}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground mt-1">Match {job.matchScore}%</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>

                <PaginationPro currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="card-premium p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Saved Jobs ({savedJobs.length})
                    </h3>
                    {savedJobs.length > 0 ? (
                      <div className="space-y-3">
                        {jobRecords
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

                  <Link href="/signup">
                    <PremiumButton variant="primary" size="lg" className="w-full">
                      Start Job Search
                    </PremiumButton>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No jobs found"
              description="Try widening salary, location, or industry filters to discover more opportunities."
              actionLabel="Clear all filters"
              onAction={clearFilters}
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
