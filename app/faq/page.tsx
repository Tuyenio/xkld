import Header from '@/components/header'
import Footer from '@/components/footer'
import { FAQAccordion } from '@/components/faq-accordion'
import { SectionHeader } from '@/components/section-header'

const items = [
  { id: '1', question: 'How long does the placement process take?', answer: 'Most candidates complete matching and onboarding within 4 to 8 weeks depending on role and visa readiness.' },
  { id: '2', question: 'Do you support visa documentation?', answer: 'Yes. Our team provides a full checklist and document quality review before employer submission.' },
  { id: '3', question: 'What costs should I prepare?', answer: 'Use our cost calculator for relocation estimates. We provide transparent guidance before any commitment.' },
  { id: '4', question: 'Can I apply for multiple jobs?', answer: 'Yes. We recommend applying to 3 to 5 aligned roles to maximize conversion.' },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Help Center"
            title="Frequently Asked Questions"
            subtitle="Everything you need before applying for premium opportunities in Taiwan."
            align="center"
          />
          <FAQAccordion items={items} defaultOpen="1" />
        </div>
      </section>
      <Footer />
    </div>
  )
}
