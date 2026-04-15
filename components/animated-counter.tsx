'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  isVisible?: boolean
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className,
  isVisible = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isVisible])

  return (
    <span className={cn('font-bold text-3xl', className)}>
      {prefix}{count}{suffix}
    </span>
  )
}
