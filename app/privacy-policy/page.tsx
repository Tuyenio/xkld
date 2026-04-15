import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Privacy Policy</h1>
          <GlassCard className="p-8 space-y-5">
            <p className="text-muted-foreground">We collect profile and application data only to provide recruitment matching and onboarding support services.</p>
            <p className="text-muted-foreground">Your data is processed with strict access control, encrypted transfer, and retained based on legal and operational requirements.</p>
            <p className="text-muted-foreground">You may request correction or deletion of personal data by contacting support at any time.</p>
          </GlassCard>
        </div>
      </section>
      <Footer />
    </div>
  )
}
