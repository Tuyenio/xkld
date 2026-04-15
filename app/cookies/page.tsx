import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Cookies Policy</h1>
          <GlassCard className="p-8 space-y-5">
            <p className="text-muted-foreground">We use essential cookies for authentication and security, and optional cookies for analytics and UX optimization.</p>
            <p className="text-muted-foreground">You can control cookie preferences from browser settings. Disabling certain cookies may impact site functionality.</p>
            <p className="text-muted-foreground">Policy updates will be published on this page with revised effective date.</p>
          </GlassCard>
        </div>
      </section>
      <Footer />
    </div>
  )
}
