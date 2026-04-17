import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FAQAccordion } from '@/components/faq-accordion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, DollarSign, Users, CheckCircle2, Share2, Bookmark, ArrowRight, Star, Clock, TrendingUp } from 'lucide-react'
import { jobRecords } from '@/lib/mock-data'

const SITE_URL = 'https://xkldvietdai.com'

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const job = jobRecords.find((item) => String(item.id) === params.id)
  if (!job) {
    return {
      title: 'Job Not Found | XKLD VietDai',
      description: 'The requested job posting is not available.',
      robots: { index: false, follow: false },
    }
  }

  const title = `${job.title} in ${job.location} | XKLD VietDai`
  const description = `Review responsibilities, benefits, and requirements for ${job.title} and apply now.`
  const canonical = `/jobs/${params.id}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${canonical}`,
      title,
      description,
      siteName: 'XKLD VietDai',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
      creator: '@xkldvietdai',
    },
  }
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const jobId = params.id
  const record = jobRecords.find((item) => String(item.id) === jobId)

  if (!record) {
    notFound()
  }

  // Sample job data
  const job = {
    id: jobId,
    title: record.title,
    company: record.company,
    location: `${record.location}, ${record.country}`,
    salary: `$${record.salaryMin.toLocaleString()} - $${record.salaryMax.toLocaleString()}`,
    type: 'Full-time',
    level: 'Senior',
    category: record.category,
    posted: record.postedAt,
    applications: 47,
    description: `We are looking for an experienced Senior Software Engineer to join our innovative team. You will be responsible for designing and developing scalable applications that serve millions of users worldwide.`,
    responsibilities: [
      'Design and develop high-performance web applications using modern technologies',
      'Collaborate with cross-functional teams to define and implement new features',
      'Conduct code reviews and mentor junior developers',
      'Optimize application performance and scalability',
      'Participate in architectural decisions and technical strategy',
      'Contribute to continuous integration and deployment processes',
    ],
    requirements: [
      '5+ years of professional software development experience',
      'Strong proficiency in JavaScript/TypeScript and React',
      'Experience with Node.js and backend development',
      'Solid understanding of AWS and cloud infrastructure',
      'Experience with Docker and Kubernetes is a plus',
      'Excellent problem-solving and communication skills',
      'Bachelor\'s degree in Computer Science or related field',
    ],
    benefits: [
      'Competitive salary package',
      'Comprehensive health insurance',
      'Annual performance bonuses',
      '15 days paid leave per year',
      'Professional development opportunities',
      'Flexible working hours',
      'Modern office environment',
      'Team building activities',
    ],
    aboutCompany: `Tech Company Inc. is a leading software development company based in Taipei. With over 200+ talented professionals, we deliver innovative solutions to clients worldwide. Our team is passionate about technology and committed to creating products that make a difference.`,
    skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'Docker', 'CI/CD'],
  }

  const jobStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: '2026-04-15',
    employmentType: job.type,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'TW',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: 2000,
        maxValue: 3500,
        unitText: 'MONTH',
      },
    },
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xkldvietdai.com' },
      { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://xkldvietdai.com/jobs' },
      { '@type': 'ListItem', position: 3, name: job.title, item: `https://xkldvietdai.com/jobs/${job.id}` },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Header />

      {/* Back Button */}
      <section className="bg-background/50 py-4 border-b border-border/50 sticky top-16 z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/jobs" className="text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-2">
              <ArrowRight size={16} className="rotate-180" />
              Back to Jobs
            </Link>
            <div className="flex items-center gap-4 text-sm overflow-x-auto w-full md:w-auto pb-1">
              <a href="#overview" className="text-muted-foreground hover:text-primary">Overview</a>
              <a href="#benefits" className="text-muted-foreground hover:text-primary">Benefits</a>
              <a href="#company" className="text-muted-foreground hover:text-primary">Company</a>
              <a href="#faq" className="text-muted-foreground hover:text-primary">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <ScrollReveal>
              <GlassCard className="p-8 md:p-10 mb-8" id="overview">
                <div className="mb-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full border border-accent/30">
                          Featured
                        </span>
                        <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                          {job.type}
                        </span>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">{job.title}</h1>
                      <p className="text-xl text-muted-foreground mb-2">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={24} className="text-accent fill-accent" />
                      <span className="text-lg font-bold">4.8</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={18} className="text-accent" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign size={18} className="text-accent" />
                      <span className="text-sm">{job.salary}/mo</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={18} className="text-accent" />
                      <span className="text-sm">{job.posted}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={18} className="text-accent" />
                      <span className="text-sm">{job.applications} applied</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-3">
                  <Link href="/signup" className="flex-1">
                    <PremiumButton variant="primary" size="lg" className="w-full" icon={<ArrowRight size={18} />}>
                      Apply Now
                    </PremiumButton>
                  </Link>
                  <PremiumButton variant="outline" size="lg" icon={<Bookmark size={18} />}>
                    Save
                  </PremiumButton>
                  <PremiumButton variant="outline" size="lg" icon={<Share2 size={18} />}>
                    Share
                  </PremiumButton>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Job Description */}
            <ScrollReveal delay={0.1}>
              <GlassCard className="p-8 md:p-10 mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <TrendingUp size={24} className="text-accent" />
                  Job Description
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">{job.description}</p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">Responsibilities</h3>
                    <ul className="space-y-4">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex gap-4">
                          <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={22} />
                          <span className="text-muted-foreground text-lg">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">Requirements</h3>
                    <ul className="space-y-4">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex gap-4">
                          <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={22} />
                          <span className="text-muted-foreground text-lg">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Company Gallery */}
            <ScrollReveal delay={0.15}>
              <GlassCard className="p-8 md:p-10 mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">Company Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['HQ', 'Team', 'Workspace', 'Events'].map((item) => (
                    <div key={item} className="aspect-[4/3] rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-sm font-semibold text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Salary Chart */}
            <ScrollReveal delay={0.18}>
              <GlassCard className="p-8 md:p-10 mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">Salary Benchmark</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2"><span>Market Median</span><span>$2,900</span></div>
                    <div className="h-3 rounded-full bg-muted"><div className="h-3 w-[60%] rounded-full bg-primary" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2"><span>This Position</span><span>$3,500</span></div>
                    <div className="h-3 rounded-full bg-muted"><div className="h-3 w-[78%] rounded-full bg-accent" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2"><span>Top Percentile</span><span>$4,600</span></div>
                    <div className="h-3 rounded-full bg-muted"><div className="h-3 w-[92%] rounded-full bg-emerald-500" /></div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Benefits */}
            <ScrollReveal delay={0.2}>
              <GlassCard className="p-8 md:p-10 mb-8" id="benefits">
                <h2 className="text-3xl font-bold text-foreground mb-6">Benefits & Perks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-lg bg-accent/5 border border-accent/20 hover:border-accent/50 transition-all">
                      <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* About Company */}
            <ScrollReveal delay={0.3}>
              <GlassCard className="p-8 md:p-10" id="company">
                <h2 className="text-3xl font-bold text-foreground mb-6">About {job.company}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{job.aboutCompany}</p>
              </GlassCard>
            </ScrollReveal>

            {/* Job FAQ */}
            <ScrollReveal delay={0.35}>
              <div id="faq" className="mt-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">Job FAQ</h2>
                <FAQAccordion
                  defaultOpen="f1"
                  items={[
                    { id: 'f1', question: 'Is relocation support included?', answer: 'Yes, relocation and onboarding support are included for shortlisted candidates.' },
                    { id: 'f2', question: 'Can I apply without prior Taiwan experience?', answer: 'Yes. Role fit is based on skills, portfolio strength, and interview performance.' },
                    { id: 'f3', question: 'How long does hiring usually take?', answer: 'Typical hiring timeline is 2 to 4 weeks from first interview to final offer.' },
                  ]}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info Card */}
            <ScrollReveal>
              <GlassCard className="p-6 md:p-8 mb-8 xl:sticky xl:top-24">
                <h3 className="font-bold text-foreground mb-6 text-lg">Job Details</h3>
                <div className="space-y-6 mb-6">
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Salary</p>
                    <p className="text-2xl font-bold text-accent">{job.salary}/month</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Experience</p>
                    <p className="text-lg font-bold text-foreground">{job.level}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Job Type</p>
                    <p className="text-foreground">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Category</p>
                    <p className="text-foreground">{job.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Posted</p>
                    <p className="text-foreground">{job.posted}</p>
                  </div>
                </div>
                <Link href="/signup" className="w-full">
                  <PremiumButton variant="primary" size="lg" className="w-full">
                    Apply Now
                  </PremiumButton>
                </Link>
              </GlassCard>
            </ScrollReveal>

            {/* Skills Card */}
            <ScrollReveal delay={0.1}>
              <GlassCard className="p-6 md:p-8 mb-8">
                <h3 className="font-bold text-foreground mb-4 text-lg">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="bg-accent/20 text-accent text-xs px-3 py-1.5 rounded-full font-medium border border-accent/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Share Card */}
            <ScrollReveal delay={0.2}>
              <GlassCard className="p-6 md:p-8">
                <h3 className="font-bold text-foreground mb-4 text-lg">Share This Job</h3>
                <div className="space-y-2">
                  <PremiumButton variant="outline" size="sm" className="w-full justify-start">
                    LinkedIn
                  </PremiumButton>
                  <PremiumButton variant="outline" size="sm" className="w-full justify-start">
                    Facebook
                  </PremiumButton>
                  <PremiumButton variant="outline" size="sm" className="w-full justify-start">
                    Copy Link
                  </PremiumButton>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Similar Jobs */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-foreground mb-12 text-balance">
              Similar <span className="gradient-text">Opportunities</span>
            </h2>
          </ScrollReveal>

          <div className="flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory">
            {[1, 2, 3].map((i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <GlassCard className="p-6 group hover:shadow-xl transition-all h-full flex flex-col min-w-[280px] snap-start">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-xs text-accent font-bold uppercase mb-2">Similar</p>
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        Mid-Level Developer
                      </h3>
                    </div>
                    <span className="bg-green-500/20 text-green-600 text-xs font-bold px-2 py-1 rounded-full">80% match</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">Tech Startup Ltd.</p>
                  <p className="text-lg font-bold text-accent mb-auto">$1,800 - $2,500</p>
                  <Link href="/jobs/2" className="mt-4">
                    <PremiumButton variant="outline" size="sm" className="w-full">
                      View Job
                    </PremiumButton>
                  </Link>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/jobs">
              <PremiumButton variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                Explore All Jobs
              </PremiumButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
