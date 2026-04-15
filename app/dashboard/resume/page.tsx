import { FileText, UploadCloud } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'

export default function DashboardResumePage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-6">Resume Manager</h1>
        <GlassCard className="p-8 text-center border-dashed border-2 border-border/80">
          <UploadCloud size={30} className="mx-auto text-accent mb-3" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Upload your latest CV</h2>
          <p className="text-muted-foreground mb-5">PDF, DOCX up to 8MB. Recruiters prioritize complete profiles.</p>
          <PremiumButton variant="primary" icon={<FileText size={16} />}>Upload Resume</PremiumButton>
        </GlassCard>
      </div>
    </div>
  )
}
