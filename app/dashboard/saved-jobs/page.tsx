import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Heart, MapPin, Briefcase, ArrowRight } from 'lucide-react'

const savedJobs = [
  {
    id: '1',
    title: 'Warehouse Supervisor',
    company: 'NexManufacture',
    location: 'Taoyuan',
    salary: '$2,600 - $3,300',
  },
  {
    id: '2',
    title: 'CNC Machine Operator',
    company: 'MetalForge',
    location: 'Taichung',
    salary: '$2,200 - $2,900',
  },
  {
    id: '3',
    title: 'Caregiver Assistant',
    company: 'CarePoint',
    location: 'Taipei',
    salary: '$1,900 - $2,400',
  },
]

export default function SavedJobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Saved Jobs</h1>
            </div>
            <Link href="/jobs">
              <PremiumButton variant="secondary" icon={<ArrowRight size={16} />} iconPosition="right">
                Browse more jobs
              </PremiumButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <GlassCard key={job.id} className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">{job.title}</h2>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                    <Heart size={18} />
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-5">
                  <p className="flex items-center gap-2"><MapPin size={14} />{job.location}</p>
                  <p className="flex items-center gap-2"><Briefcase size={14} />{job.salary}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/jobs/${job.id}`}>
                    <PremiumButton variant="outline" size="sm">View details</PremiumButton>
                  </Link>
                  <PremiumButton variant="primary" size="sm">Apply now</PremiumButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
