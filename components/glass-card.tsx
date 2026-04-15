'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glowEffect?: boolean
}

export function GlassCard({ 
  children, 
  className, 
  hover = true,
  glowEffect = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl border border-border/50 backdrop-blur-md p-6',
        'transition-all duration-300 shadow-lg',
        hover && 'hover:shadow-2xl hover:border-accent/30',
        glowEffect && 'drop-shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
