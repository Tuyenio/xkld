import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { PremiumButton } from '@/components/premium-button'
import { GlassCard } from '@/components/glass-card'
import { AnimatedCounter } from '@/components/animated-counter'
import { JobCardPro } from '@/components/job-card-pro'
import { DeferredHomeEffects } from '@/components/deferred-home-effects'
import { SearchBar } from '@/components/search-bar'
import Link from 'next/link'
import { ArrowRight, Briefcase, Globe, Users, TrendingUp, CheckCircle2, Star, Play } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'

const LogoMarquee = dynamic(
  () => import('@/components/logo-marquee').then((mod) => mod.LogoMarquee),
  { loading: () => <div className="h-20 w-full rounded-xl bg-muted/40 animate-pulse" /> }
)

const ProcessTimeline = dynamic(
  () => import('@/components/process-timeline').then((mod) => mod.ProcessTimeline),
  { loading: () => <div className="h-[360px] w-full rounded-2xl bg-muted/40 animate-pulse" /> }
)

const TestimonialCarousel = dynamic(
  () => import('@/components/testimonial-carousel').then((mod) => mod.TestimonialCarousel),
  { loading: () => <div className="h-[480px] w-full rounded-2xl bg-muted/40 animate-pulse" /> }
)

const FAQAccordion = dynamic(
  () => import('@/components/faq-accordion').then((mod) => mod.FAQAccordion),
  { loading: () => <div className="h-[280px] w-full rounded-2xl bg-muted/40 animate-pulse" /> }
)

export const metadata: Metadata = buildPageMetadata({
  title: 'Home',
  description:
    'Discover premium Taiwan jobs for Vietnamese professionals with high-conversion guidance and trusted employer network.',
  path: '/',
})

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DeferredHomeEffects />

      <section className="relative overflow-hidden pt-20 md:pt-32 pb-20 md:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="badge-premium">Taiwan's #1 Recruitment Platform</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground text-balance">
                Build Your <span className="gradient-text">Premium Future</span> in Taiwan
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl text-balance">
                Discover exclusive opportunities from 50+ leading Taiwan companies. Join 1000+ Vietnamese professionals who transformed their careers with us.
              </p>

              <div className="mb-6">
                <SearchBar placeholder="Search by role, company or location..." />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/jobs">
                  <PremiumButton variant="primary" size="lg" className="pulse-glow" icon={<ArrowRight size={20} />}>
                    Explore Jobs
                  </PremiumButton>
                </Link>
                <Link href="/guide">
                  <PremiumButton variant="outline" size="lg" icon={<Play size={20} />}>
                    Watch Guide
                  </PremiumButton>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: 500, suffix: '+', label: 'Active Jobs' },
                  { number: 1000, suffix: '+', label: 'Placements' },
                  { number: 50, suffix: '+', label: 'Companies' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex items-baseline gap-1 mb-1">
                      <AnimatedCounter end={stat.number} duration={2000} suffix={stat.suffix} className="text-2xl md:text-3xl text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative">
                <GlassCard glowEffect className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        TW
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Taiwan Opportunities</p>
                        <p className="text-sm text-muted-foreground">Premium positions await</p>
                      </div>
                    </div>

                    {[
                      { label: 'Salary Range', value: '$2,000 - $5,000+' },
                      { label: 'Job Categories', value: '15+ Industries' },
                      { label: 'Support', value: '24/7 Available' },
                    ].map((item, i) => (
                      <div key={i} className="border-t border-border/50 pt-4">
                        <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-lg font-semibold text-primary">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 border-y border-border/40 bg-background/70 backdrop-blur-sm home-deferred-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center mb-6">Trusted by hiring partners across Taiwan</p>
          <LogoMarquee
            logos={[
              <span key="l1" className="text-lg font-bold text-muted-foreground">TechCorp</span>,
              <span key="l2" className="text-lg font-bold text-muted-foreground">DataSys</span>,
              <span key="l3" className="text-lg font-bold text-muted-foreground">CreativeStudio</span>,
              <span key="l4" className="text-lg font-bold text-muted-foreground">NexManufacture</span>,
              <span key="l5" className="text-lg font-bold text-muted-foreground">CarePoint</span>,
            ]}
          />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/30 home-deferred-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Why Choose <span className="gradient-text">XKLD VietDai</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              We&apos;ve perfected the process of connecting talented Vietnamese professionals with premium Taiwan opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Globe size={32} className="text-accent" />, title: 'Global Network', description: 'Access 500+ jobs from 50+ leading Taiwan companies across multiple industries' },
              { icon: <Users size={32} className="text-accent" />, title: 'Expert Support', description: 'Get guidance from experienced professionals throughout your entire journey' },
              { icon: <Briefcase size={32} className="text-accent" />, title: 'Vetted Opportunities', description: 'All jobs are carefully verified to ensure legitimate and premium positions' },
              { icon: <TrendingUp size={32} className="text-accent" />, title: 'Career Growth', description: 'Develop valuable skills and advance your career with leading companies' },
              { icon: <CheckCircle2 size={32} className="text-accent" />, title: 'Transparent Process', description: 'Know exactly what to expect at every step of your application' },
              { icon: <Star size={32} className="text-accent" />, title: 'Premium Service', description: 'Enjoy personalized support and priority matching with your ideal employer' },
            ].map((feature, i) => (
              <GlassCard key={i} className="p-8 flex flex-col hover:-translate-y-1 hover:rotate-[0.3deg]">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 home-deferred-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
                Featured <span className="gradient-text">Opportunities</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">Explore our most exclusive positions from top Taiwan employers</p>
            </div>
            <Link href="/jobs">
              <PremiumButton variant="secondary" size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                View All Jobs
              </PremiumButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Senior Software Engineer', company: 'TechCorp Taipei', location: 'Taipei', salary: '$3,500 - $5,000', tags: ['React', 'Node.js', 'AWS'], featured: true },
              { title: 'Product Manager', company: 'DataSys Inc', location: 'Hsinchu', salary: '$2,800 - $4,200', tags: ['Product', 'Strategy', 'Leadership'], featured: false },
              { title: 'UX/UI Designer', company: 'CreativeStudio', location: 'Taichung', salary: '$2,200 - $3,500', tags: ['Design', 'Figma', 'Web3'], featured: true },
              { title: 'Marketing Manager', company: 'BrandInc', location: 'Taipei', salary: '$2,500 - $3,800', tags: ['Marketing', 'Digital', 'Analytics'], featured: false },
            ].map((job, index) => (
              <JobCardPro key={index} id={String(index)} title={job.title} company={job.company} location={job.location} salary={job.salary} tags={job.tags} featured={job.featured} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent home-deferred-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground">Get hired in Taiwan in 4 simple steps</p>
          </div>
          <ProcessTimeline steps={[
            { number: 1, title: 'Create Profile', description: 'Build your professional profile in minutes' },
            { number: 2, title: 'Browse Jobs', description: 'Explore 500+ exclusive opportunities' },
            { number: 3, title: 'Get Matched', description: 'Our AI matches you with ideal positions' },
            { number: 4, title: 'Get Hired', description: 'Complete interviews and start your journey' },
          ]} />
        </div>
      </section>

      <section className="py-20 md:py-28 home-deferred-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-center text-balance">
            Hear from Our <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Join 1000+ professionals who transformed their careers with XKLD VietDai
          </p>
          <TestimonialCarousel testimonials={[
            { id: '1', name: 'Nguyễn Thị Hương', role: 'Senior Developer at TechCorp', content: 'XKLD VietDai made my transition smooth and hassle-free. The support team was incredible every step of the way!', rating: 5, avatar: 'N' },
            { id: '2', name: 'Trần Văn Nam', role: 'Product Manager at DataSys', content: 'Found the perfect job that matched my skills and career goals. The matching process was truly impressive!', rating: 5, avatar: 'T' },
            { id: '3', name: 'Hoàng Thị Liên', role: 'UX Designer at CreativeStudio', content: 'Excellent service and professional handling. They genuinely care about their candidates success.', rating: 5, avatar: 'H' },
          ]} />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/30 home-deferred-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-10">FAQ</h2>
          <FAQAccordion
            defaultOpen="q1"
            items={[
              { id: 'q1', question: 'Is profile creation free?', answer: 'Yes, candidate profile creation and initial matching are free.' },
              { id: 'q2', question: 'Do you support interview preparation?', answer: 'Yes, we provide interview coaching and documentation checklists.' },
              { id: 'q3', question: 'Can I apply to multiple positions?', answer: 'Yes, and we recommend applying strategically to improve success rate.' },
            ]}
          />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-primary/90 home-deferred-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 text-balance">Ready to Transform Your Career?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Join thousands of Vietnamese professionals building their future in Taiwan. Start for free today.
          </p>
          <Link href="/signup">
            <PremiumButton variant="secondary" size="lg" className="pulse-glow" icon={<ArrowRight size={20} />}>
              Create Free Account Now
            </PremiumButton>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
