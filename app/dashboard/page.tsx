import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { ScrollReveal } from '@/components/scroll-reveal'
import Link from 'next/link'
import { LogOut, User, FileText, Bookmark, Settings, Clock, CheckCircle2, ArrowRight, Zap, Star, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const statStyles = {
    accent: { box: 'bg-accent/20 group-hover:bg-accent/30', icon: 'text-accent' },
    primary: { box: 'bg-primary/20 group-hover:bg-primary/30', icon: 'text-primary' },
    secondary: { box: 'bg-secondary/20 group-hover:bg-secondary/30', icon: 'text-secondary' },
  } as const

  const userData = {
    name: 'Nguyễn Văn Nam',
    email: 'nguyenvannam@email.com',
    phone: '+84 98 123 4567',
    completeness: 85,
  }

  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      status: 'Interview',
      appliedDate: '2024-03-10',
      lastUpdate: '2024-03-14',
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'DataSys Inc',
      status: 'Under Review',
      appliedDate: '2024-03-05',
      lastUpdate: '2024-03-12',
    },
    {
      id: 3,
      jobTitle: 'UX/UI Designer',
      company: 'Creative Studio',
      status: 'Rejected',
      appliedDate: '2024-02-28',
      lastUpdate: '2024-03-02',
    },
  ]

  const savedJobs = [
    {
      id: 1,
      title: 'DevOps Engineer',
      company: 'Infrastructure Pro',
      location: 'Taipei, Taiwan',
      salary: '$2,200 - $3,200',
      savedDate: '2024-03-13',
    },
    {
      id: 2,
      title: 'Sales Executive',
      company: 'Global Trade Solutions',
      location: 'Taipei, Taiwan',
      salary: '$1,600 - $2,400',
      savedDate: '2024-03-12',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
              xkld
            </div>
            <h1 className="text-xl font-bold text-foreground hidden md:block">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <PremiumButton variant="outline" size="sm" icon={<Settings size={16} />}>
              Settings
            </PremiumButton>
            <PremiumButton variant="ghost" size="sm" icon={<LogOut size={16} />}>
              Sign Out
            </PremiumButton>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-4">
            {/* Profile Card */}
            <ScrollReveal>
              <GlassCard className="p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl mx-auto mb-4 shadow-lg">
                  <User size={32} className="text-accent-foreground" />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-1">{userData.name}</h2>
                <p className="text-sm text-muted-foreground mb-6">{userData.email}</p>
                
                <div className="space-y-4 border-t border-border/50 pt-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-foreground">Profile Completeness</span>
                      <span className="text-xs font-bold text-accent">{userData.completeness}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all" style={{ width: `${userData.completeness}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {userData.completeness === 100 ? '✓ Profile complete!' : `${100 - userData.completeness}% to go`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <PremiumButton variant="primary" size="sm" className="w-full" icon={<User size={14} />}>
                    Edit
                  </PremiumButton>
                  <PremiumButton variant="outline" size="sm" className="w-full">
                    Download
                  </PremiumButton>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Quick Links */}
            <GlassCard className="p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap size={18} className="text-accent" />
                Navigation
              </h3>
              <nav className="space-y-2">
                {[
                  { href: '/dashboard', icon: FileText, label: 'Applications', active: true },
                  { href: '/dashboard/saved-jobs', icon: Bookmark, label: 'Saved Jobs' },
                  { href: '/dashboard/profile', icon: User, label: 'My Profile' },
                  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
                ].map((item) => (
                  <Link key={item.label} href={item.href}>
                    <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      item.active 
                        ? 'bg-accent/20 text-accent border border-accent/30' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}>
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Applications', value: applications.length, icon: FileText, color: 'accent' },
                { label: 'Saved Jobs', value: savedJobs.length, icon: Bookmark, color: 'primary' },
                { label: 'Profile Score', value: `${userData.completeness}%`, icon: Star, color: 'secondary' },
              ].map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard className="p-4 text-center group hover:shadow-xl transition-all">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${statStyles[stat.color as keyof typeof statStyles].box}`}>
                      <stat.icon size={20} className={statStyles[stat.color as keyof typeof statStyles].icon} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Applications Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <TrendingUp size={24} className="text-accent" />
                    My Applications
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{applications.length} active applications</p>
                </div>
                <Link href="/jobs">
                  <PremiumButton variant="outline" size="sm" icon={<ArrowRight size={16} />}>
                    Browse Jobs
                  </PremiumButton>
                </Link>
              </div>
              <div className="space-y-3">
                {applications.map((app, i) => (
                  <ScrollReveal key={app.id} delay={i * 0.1}>
                    <GlassCard className="p-6 hover:shadow-xl transition-all group">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors mb-1">
                            {app.jobTitle}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">{app.company}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="text-accent" />
                              {new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 size={14} className="text-accent" />
                              {new Date(app.lastUpdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                            app.status === 'Interview' ? 'bg-blue-500/20 text-blue-600 border-blue-500/30' :
                            app.status === 'Under Review' ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30' :
                            'bg-red-500/20 text-red-600 border-red-500/30'
                          }`}>
                            {app.status}
                          </span>
                          <PremiumButton variant="outline" size="sm">Details</PremiumButton>
                        </div>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Saved Jobs Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">💚 Saved Jobs</h2>
                <span className="text-sm text-muted-foreground font-medium">{savedJobs.length} saved</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedJobs.map((job, i) => (
                  <ScrollReveal key={job.id} delay={i * 0.1}>
                    <GlassCard className="p-6 group hover:shadow-xl transition-all h-full flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-foreground flex-1 group-hover:text-accent transition-colors">
                          {job.title}
                        </h3>
                        <button className="text-accent hover:text-accent/80 p-2">
                          <Bookmark size={20} fill="currentColor" />
                        </button>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{job.company}</p>
                      <p className="text-accent font-bold mb-auto text-lg">{job.salary}</p>
                      <div className="text-xs text-muted-foreground mb-4 pt-2 border-t border-border/50">
                        Saved {new Date(job.savedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/jobs/${job.id}`} className="flex-1">
                          <PremiumButton variant="outline" size="sm" className="w-full">
                            View
                          </PremiumButton>
                        </Link>
                        <PremiumButton variant="primary" size="sm" className="flex-1">
                          Apply
                        </PremiumButton>
                      </div>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Zap size={24} className="text-accent" />
                Personalized for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Full Stack Developer', company: 'Tech Startup Ltd.', salary: '$2,200 - $3,000', match: 85 },
                  { title: 'Senior React Developer', company: 'Digital Solutions Inc.', salary: '$2,500 - $3,500', match: 92 },
                ].map((job, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <GlassCard className="p-6 group hover:shadow-xl transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                          {job.title}
                        </h3>
                        <span className="bg-green-500/20 text-green-600 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">
                          {job.match}% match
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{job.company}</p>
                      <p className="text-accent font-bold mb-6">{job.salary}/month</p>
                      <PremiumButton variant="primary" size="sm" className="w-full">
                        View & Apply
                      </PremiumButton>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Tips & Support */}
            <GlassCard className="p-6 border border-accent/30 bg-accent/5">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Zap size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">Pro Tip: Boost Your Success Rate</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Complete your profile, add a professional photo, and customize your CV to match each job. See our guide for more tips.
                  </p>
                  <Link href="/guide">
                    <PremiumButton variant="outline" size="sm" icon={<ArrowRight size={14} />}>
                      Read Career Guide
                    </PremiumButton>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
