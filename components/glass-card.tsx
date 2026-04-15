'use client'

import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
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
  ...props
}: GlassCardProps) {
  return (
    <div
      {...props}
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
