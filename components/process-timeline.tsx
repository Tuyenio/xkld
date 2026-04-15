'use client'

import { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineStep {
  number: number
  title: string
  description: string
  icon?: ReactNode
}

interface ProcessTimelineProps {
  steps: TimelineStep[]
  orientation?: 'horizontal' | 'vertical'
}

export function ProcessTimeline({
  steps,
  orientation = 'horizontal',
}: ProcessTimelineProps) {
  if (orientation === 'vertical') {
    return (
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex gap-6">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-premium">
                {step.icon || <Check size={24} />}
              </div>
              {index < steps.length - 1 && (
                <div className="w-1 h-16 bg-gradient-to-b from-primary/50 to-accent/50 mt-4" />
              )}
            </div>

            {/* Content */}
            <div className="pt-2 pb-4">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={cn(
            'relative',
            index < steps.length - 1 && 'md:after:absolute md:after:top-12 md:after:left-[calc(100%+12px)] md:after:w-6 md:after:h-1 md:after:bg-gradient-to-r md:after:from-primary/50 md:after:to-accent/50'
          )}
        >
          <div className="card-premium p-6 h-full flex flex-col">
            {/* Step Number */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-premium mb-4">
              {step.icon ? step.icon : step.number}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-foreground mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground flex-grow">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
