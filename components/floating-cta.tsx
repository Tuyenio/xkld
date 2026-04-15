'use client'

import Link from 'next/link'
import { PremiumButton } from '@/components/premium-button'

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-40 hidden sm:block">
      <Link href="/signup">
        <PremiumButton variant="primary" className="pulse-glow shadow-xl">
          Apply in 2 Minutes
        </PremiumButton>
      </Link>
    </div>
  )
}
