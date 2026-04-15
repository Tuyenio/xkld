'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LogoMarqueeProps {
  logos: ReactNode[]
  direction?: 'left' | 'right'
  speed?: 'slow' | 'normal' | 'fast'
}

export function LogoMarquee({
  logos,
  direction = 'left',
  speed = 'normal',
}: LogoMarqueeProps) {
  const speedMap = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  }

  const directionClass = direction === 'right' ? 'direction-right' : ''

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-slow {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee-fast {
          animation: marquee 20s linear infinite;
        }
        .direction-right {
          animation: marquee-reverse 30s linear infinite;
        }
        .direction-right.animate-marquee-slow {
          animation: marquee-reverse 50s linear infinite;
        }
        .direction-right.animate-marquee-fast {
          animation: marquee-reverse 20s linear infinite;
        }
      `}</style>

      <div className={cn('flex gap-12 w-max', speedMap[speed], directionClass)}>
        {/* Original set */}
        {logos.map((logo, index) => (
          <div
            key={`original-${index}`}
            className="flex-shrink-0 h-12 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
          >
            {logo}
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div
            key={`duplicate-${index}`}
            className="flex-shrink-0 h-12 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  )
}
