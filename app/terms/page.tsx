import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Terms of Service</h1>
          <GlassCard className="p-8 space-y-5">
            <p className="text-muted-foreground">By using this platform, you agree to provide accurate profile information and respect recruitment communication guidelines.</p>
            <p className="text-muted-foreground">Job listings and process timelines may change based on employer demand, compliance checks, and immigration updates.</p>
            <p className="text-muted-foreground">We reserve the right to suspend misuse, fraudulent activities, or policy violations to protect candidates and employers.</p>
          </GlassCard>
        </div>
      </section>
      <Footer />
    </div>
  )
}
