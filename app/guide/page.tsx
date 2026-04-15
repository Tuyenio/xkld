import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Application Guide</h1>
          <p className="text-xl opacity-90">Step-by-step guide to landing your dream job in Taiwan</p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up with your email and basic information. This creates your professional profile that employers will see.',
                tips: [
                  'Use a professional email address',
                  'Create a strong password',
                  'Complete your profile 100%',
                ],
                time: '5 minutes',
              },
              {
                step: '02',
                title: 'Build Your Profile',
                description: 'Upload your resume, add work experience, education, and skills. A complete profile increases your chances of getting noticed.',
                tips: [
                  'Use a professional photo',
                  'Write a compelling summary',
                  'List all relevant skills',
                  'Add certifications if any',
                ],
                time: '30 minutes',
              },
              {
                step: '03',
                title: 'Search & Apply for Jobs',
                description: 'Browse our job listings using filters and apply to positions that match your skills and career goals.',
                tips: [
                  'Read job descriptions carefully',
                  'Apply to 3-5 jobs per week',
                  'Customize your application',
                  'Track your applications',
                ],
                time: 'Ongoing',
              },
              {
                step: '04',
                title: 'Prepare for Interviews',
                description: 'Use our resources to prepare for interviews. Practice common questions and research the company thoroughly.',
                tips: [
                  'Study the company background',
                  'Prepare examples from your experience',
                  'Practice speaking English/Mandarin',
                  'Prepare questions to ask',
                ],
                time: '1-2 weeks',
              },
              {
                step: '05',
                title: 'Attend Interviews',
                description: 'Interviews may be conducted online or in person. Be professional, punctual, and enthusiastic about the opportunity.',
                tips: [
                  'Arrive 15 minutes early',
                  'Dress professionally',
                  'Bring copies of your resume',
                  'Send thank you emails after',
                ],
                time: 'Varies',
              },
              {
                step: '06',
                title: 'Negotiate & Accept Offer',
                description: 'Review the job offer carefully. Discuss salary, benefits, and start date. Once agreed, sign the contract.',
                tips: [
                  'Negotiate respectfully',
                  'Understand benefits package',
                  'Clarify visa sponsorship',
                  'Get everything in writing',
                ],
                time: '1 week',
              },
              {
                step: '07',
                title: 'Visa & Documentation',
                description: 'Your employer will guide you through visa requirements. We&apos;re here to support the process and answer questions.',
                tips: [
                  'Start early',
                  'Gather required documents',
                  'Apply for ARC (resident card)',
                  'Don&apos;t delay - visa can take time',
                ],
                time: '2-4 weeks',
              },
              {
                step: '08',
                title: 'Relocate & Start Working',
                description: 'Find accommodation, arrange travel, and prepare for your new life in Taiwan. Welcome to your new career!',
                tips: [
                  'Research housing options',
                  'Plan your move',
                  'Learn basic Mandarin/Taiwanese',
                  'Connect with our community',
                ],
                time: 'Ongoing',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-secondary text-primary font-bold text-2xl">
                    {item.step}
                  </div>
                </div>
                <Card className="flex-1 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-secondary font-semibold mt-1">{item.time}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground text-sm">Key Tips:</p>
                    <ul className="space-y-2">
                      {item.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={16} className="text-secondary flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Interview Tips',
                description: 'Learn how to ace your interviews and make a great first impression with Taiwan employers.',
              },
              {
                title: 'Resume Writing',
                description: 'Create a winning resume that gets you noticed by top companies in Taiwan.',
              },
              {
                title: 'Salary Guide',
                description: 'Understand salary ranges for different positions and negotiate better compensation packages.',
              },
              {
                title: 'Visa Information',
                description: 'Complete guide to Taiwan work visa requirements and the application process.',
              },
              {
                title: 'Expat Living',
                description: 'Tips for living as an expat in Taiwan including housing, healthcare, and transportation.',
              },
              {
                title: 'Language Learning',
                description: 'Resources for learning Mandarin and English to improve your job prospects.',
              },
            ].map((resource, i) => (
              <Card key={i} className="p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-3">{resource.title}</h3>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <Button variant="outline" size="sm">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-lg mb-8 opacity-90">Start your journey to a better future in Taiwan today</p>
          <Link href="/jobs">
            <Button size="lg" variant="secondary">
              Browse Jobs Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
