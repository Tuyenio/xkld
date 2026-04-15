import { FileText, UploadCloud, CheckCircle2, Clock3, BadgeCheck, Download, Eye } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { DashboardShell } from '@/components/dashboard-shell'

export default function DashboardResumePage() {
  const resumeVersions = [
    { id: 'cv-1', name: 'CV_Senior_Engineer_EN.pdf', updatedAt: '2026-04-12', size: '1.2 MB', primary: true },
    { id: 'cv-2', name: 'CV_Product_Generic.pdf', updatedAt: '2026-03-20', size: '980 KB', primary: false },
  ]

  return (
    <DashboardShell
      title="Resume Manager"
      description="Maintain ATS-friendly CV versions and keep your strongest profile active."
      active="resume"
      sidebarExtra={
        <GlassCard className="p-4">
          <p className="text-sm text-muted-foreground">Primary CV health</p>
          <p className="text-3xl font-bold text-emerald-500 mt-1">92%</p>
          <p className="text-xs text-muted-foreground mt-1">Well-structured for recruiter screening</p>
        </GlassCard>
      }
    >
      <GlassCard className="p-8 text-center border-dashed border-2 border-border/80">
        <UploadCloud size={30} className="mx-auto text-accent mb-3" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Upload your latest CV</h2>
        <p className="text-muted-foreground mb-5">PDF, DOCX up to 8MB. Recruiters prioritize complete profiles.</p>
        <PremiumButton variant="primary" icon={<FileText size={16} />}>Upload Resume</PremiumButton>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm"><FileText size={14} />Versions</div>
          <p className="text-2xl font-bold text-foreground mt-2">{resumeVersions.length}</p>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm"><BadgeCheck size={14} />Primary</div>
          <p className="text-2xl font-bold text-accent mt-2">Active</p>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm"><Clock3 size={14} />Last update</div>
          <p className="text-2xl font-bold text-foreground mt-2">3d ago</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Resume Versions</h3>
        <div className="space-y-3">
          {resumeVersions.map((item) => (
            <div key={item.id} className="rounded-lg border border-border/70 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-muted/20">
              <div>
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-1">Updated {item.updatedAt} · {item.size}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {item.primary && <span className="text-xs rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/25 px-3 py-1 font-semibold">Primary</span>}
                <PremiumButton variant="ghost" size="sm" icon={<Eye size={14} />}>Preview</PremiumButton>
                <PremiumButton variant="outline" size="sm" icon={<Download size={14} />}>Download</PremiumButton>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">CV Completion Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Professional headline and summary',
            'Quantified work achievements',
            'Relevant technical skills',
            'Language proficiency section',
            'Education and certifications',
            'Exported PDF in ATS-safe format',
          ].map((item) => (
            <div key={item} className="rounded-md border border-border/70 px-3 py-2 text-sm text-muted-foreground flex items-center gap-2 bg-muted/10">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </DashboardShell>
  )
}
