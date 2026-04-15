'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('opacity-100')
          element.classList.remove('opacity-0')
          const translate = {
            up: 'translate-y-0',
            down: '-translate-y-0',
            left: 'translate-x-0',
            right: '-translate-x-0',
          }[direction]
          element.classList.remove(
            'translate-y-8',
            '-translate-y-8',
            'translate-x-8',
            '-translate-x-8'
          )
          element.classList.add(translate)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [direction])

  const initialClass = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
  }[direction]

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 transition-all duration-700 ease-out',
        initialClass,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
