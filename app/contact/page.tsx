import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-accent/3 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="space-y-6">
              <GlassCard className="p-6 flex items-start gap-4">
                <Mail className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">hello@xkldvietdai.com</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex items-start gap-4">
                <Phone className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Phone</h3>
                  <p className="text-muted-foreground">+886-2-1234-5678</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex items-start gap-4">
                <MapPin className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground">Taipei, Taiwan</p>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex items-start gap-4">
                <Clock className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Hours</h3>
                  <p className="text-muted-foreground">Mon - Fri: 9AM - 6PM</p>
                </div>
              </GlassCard>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <GlassCard className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Name</label>
                      <Input placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Subject</label>
                    <Input placeholder="How can we help?" />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Message</label>
                    <Textarea placeholder="Tell us more..." className="min-h-32" />
                  </div>

                  <PremiumButton variant="primary" size="lg" className="w-full">
                    Send Message
                  </PremiumButton>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Let&apos;s Build Together
          </h2>
          <p className="text-xl text-primary-foreground/90">
            Your success is our priority. Reach out today!
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
