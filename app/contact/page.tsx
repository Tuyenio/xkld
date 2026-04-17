'use client'

import { FormEvent, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitMessage(null)

    const hasEmptyField = Object.values(formData).some((value) => value.trim().length === 0)
    if (hasEmptyField) {
      setSubmitMessage('Please complete all fields before submitting.')
      return
    }

    if (honeypot.trim().length > 0) {
      setSubmitMessage('Spam check failed. Please refresh and try again.')
      return
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    if (!emailValid) {
      setSubmitMessage('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      await apiClient.contact.submit(formData)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitMessage('Your message has been sent successfully. Our team will contact you soon.')
      setShowSuccessModal(true)
    } catch (error) {
      setSubmitMessage(toApiErrorMessage(error, 'Could not send your message. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

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
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Name</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Subject</label>
                    <Input
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell us more..."
                      className="min-h-32"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                    />
                  </div>

                  {submitMessage && (
                    <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                      {submitMessage}
                    </div>
                  )}

                  <PremiumButton variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </PremiumButton>
                </form>
              </GlassCard>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-0 overflow-hidden">
              <iframe
                title="Taipei Office Map"
                className="w-full h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Taipei+Taiwan&output=embed"
              />
            </GlassCard>

            <GlassCard className="p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Need live support?</h3>
                <p className="text-muted-foreground mb-6">
                  Our recruitment specialists are available for direct consultation on profile readiness,
                  visa documents, and interview preparation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <PremiumButton variant="primary" icon={<MessageCircle size={16} />}>
                  Start Live Chat
                </PremiumButton>
                <PremiumButton variant="outline">Book Consultation</PremiumButton>
              </div>
            </GlassCard>
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

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Message sent successfully</DialogTitle>
            <DialogDescription>
              Thank you for contacting XKLD VietDai. Our team will respond shortly with next-step guidance.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
