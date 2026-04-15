import Link from 'next/link'
import { PremiumButton } from '@/components/premium-button'

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="badge-premium mb-4">New Module</p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Coming Soon</h1>
        <p className="text-muted-foreground mb-8">We are preparing a new high-impact feature for candidates and employers.</p>
        <Link href="/jobs">
          <PremiumButton variant="primary">Explore Current Jobs</PremiumButton>
        </Link>
      </div>
    </div>
  )
}
