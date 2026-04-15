import Link from 'next/link'
import { PremiumButton } from '@/components/premium-button'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="badge-premium mb-4">Service Update</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">We are improving your experience</h1>
        <p className="text-muted-foreground mb-8">Our team is deploying performance and reliability upgrades. Please check back soon.</p>
        <Link href="/">
          <PremiumButton variant="primary">Back to Home</PremiumButton>
        </Link>
      </div>
    </div>
  )
}
