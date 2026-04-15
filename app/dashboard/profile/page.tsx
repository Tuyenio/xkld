'use client'

import { useMemo, useState } from 'react'
import { DashboardShell } from '@/components/dashboard-shell'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { profileCompletionItems, getProfileCompletionScore } from '@/lib/dashboard-data'
import { BadgeCheck, Plus, Upload, GraduationCap, BriefcaseBusiness, Languages } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: 'Nguyễn',
    lastName: 'Văn Nam',
    email: 'nguyenvannam@email.com',
    phone: '+84 98 123 4567',
    jobTitle: 'Software Engineer',
    location: 'Ho Chi Minh City, Vietnam',
    workExperience: '5 years',
    bio: 'Experienced software engineer with expertise in full-stack development and cloud technologies.',
    skills: 'React, Node.js, AWS, TypeScript, Docker',
    education: 'Bachelor in Computer Science',
    university: 'University of Science, HCMC',
  })

  const [skills] = useState(['React', 'Node.js', 'AWS', 'TypeScript', 'Docker', 'CI/CD'])
  const [languages] = useState([
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Upper-Intermediate' },
    { name: 'Chinese', level: 'Beginner' },
  ])
  const [workHistory] = useState([
    {
      id: 'w1',
      role: 'Senior Frontend Engineer',
      company: 'Digital Product Studio',
      period: '2022 - Present',
      summary: 'Led React architecture and delivery for international recruitment platforms.',
    },
    {
      id: 'w2',
      role: 'Fullstack Developer',
      company: 'Tech Agency Vietnam',
      period: '2020 - 2022',
      summary: 'Built Next.js applications and APIs with strong SEO/performance focus.',
    },
  ])
  const [educationHistory] = useState([
    {
      id: 'e1',
      school: 'University of Science, HCMC',
      degree: 'Bachelor of Computer Science',
      period: '2016 - 2020',
    },
    {
      id: 'e2',
      school: 'Coursera / Meta',
      degree: 'Advanced Frontend Certificate',
      period: '2023',
    },
  ])

  const completionScore = useMemo(() => getProfileCompletionScore(profileCompletionItems), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', profile)
  }

  return (
    <DashboardShell
      title="Profile Builder"
      description="Maintain a recruiter-ready profile with complete professional context."
      active="profile"
      sidebarExtra={
        <GlassCard className="p-4">
          <p className="text-sm text-muted-foreground">Completion score</p>
          <p className="text-3xl font-bold text-accent mt-1">{completionScore}%</p>
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: `${completionScore}%` }} />
          </div>
        </GlassCard>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Avatar and Headline</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-border/70">
              <span className="text-3xl">NV</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Professional avatar</p>
              <p className="text-sm text-muted-foreground mt-1 mb-3">Use a clear portrait photo to increase recruiter trust.</p>
              <div className="flex flex-wrap gap-2">
                <PremiumButton type="button" variant="outline" size="sm" icon={<Upload size={15} />}>Upload avatar</PremiumButton>
                <PremiumButton type="button" variant="ghost" size="sm">Remove</PremiumButton>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">First Name</label>
              <Input type="text" name="firstName" value={profile.firstName} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Last Name</label>
              <Input type="text" name="lastName" value={profile.lastName} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <Input type="email" name="email" value={profile.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
              <Input type="tel" name="phone" value={profile.phone} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">Profile summary</label>
              <Textarea name="bio" value={profile.bio} onChange={handleChange} rows={4} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Professional Context</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Current Job Title</label>
              <Input type="text" name="jobTitle" value={profile.jobTitle} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
              <Input type="text" name="location" value={profile.location} onChange={handleChange} />
            </div>
          </div>

          <h3 className="font-semibold text-foreground mb-3">Skills Tags</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {skill}
              </span>
            ))}
            <button type="button" className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted/40 transition-colors inline-flex items-center gap-1">
              <Plus size={12} />
              Add skill
            </button>
          </div>

          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Languages size={16} className="text-accent" />Language Levels</h3>
          <div className="space-y-2">
            {languages.map((item) => (
              <div key={item.name} className="rounded-md border border-border/70 px-3 py-2 flex items-center justify-between bg-muted/10">
                <p className="text-sm text-foreground">{item.name}</p>
                <span className="text-xs rounded-full border border-border px-2 py-1 text-muted-foreground">{item.level}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"><BriefcaseBusiness size={20} className="text-accent" />Work History</h2>
          <div className="space-y-3">
            {workHistory.map((item) => (
              <div key={item.id} className="rounded-lg border border-border/70 p-4 bg-muted/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="font-semibold text-foreground">{item.role}</p>
                  <span className="text-xs text-muted-foreground">{item.period}</span>
                </div>
                <p className="text-sm text-accent mt-1">{item.company}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.summary}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"><GraduationCap size={20} className="text-accent" />Education History</h2>
          <div className="space-y-3">
            {educationHistory.map((item) => (
              <div key={item.id} className="rounded-lg border border-border/70 p-4 bg-muted/10 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{item.degree}</p>
                  <p className="text-sm text-muted-foreground">{item.school}</p>
                </div>
                <span className="text-xs rounded-full border border-border px-2 py-1 text-muted-foreground">{item.period}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 border border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-start gap-3">
            <BadgeCheck size={18} className="text-emerald-500 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Profile quality insight</p>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Your profile is highly visible to recruiters. Uploading a targeted CV can still improve match conversion.
              </p>
              <div className="flex flex-wrap gap-2">
                <PremiumButton type="submit" variant="primary" size="sm">Save Changes</PremiumButton>
                <PremiumButton type="button" variant="outline" size="sm">Preview Profile</PremiumButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </form>
    </DashboardShell>
  )
}
