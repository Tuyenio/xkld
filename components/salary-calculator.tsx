'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface SalaryLevel {
  level: string
  salaryMin: number
  salaryMax: number
  benefits: string[]
  description: string
}

interface SalaryCalculatorProps {
  levels: SalaryLevel[]
}

export function SalaryCalculator({ levels }: SalaryCalculatorProps) {
  const [selectedLevel, setSelectedLevel] = useState(0)
  const [yearsExperience, setYearsExperience] = useState(3)

  const current = levels[selectedLevel]
  const salaryRange = current.salaryMax - current.salaryMin
  const adjustedMin = current.salaryMin + (salaryRange * yearsExperience * 0.05)
  const adjustedMax = current.salaryMax + (salaryRange * yearsExperience * 0.08)

  return (
    <div className="space-y-8">
      {/* Level Selection */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Select Your Level
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {levels.map((level, index) => (
            <button
              key={level.level}
              onClick={() => setSelectedLevel(index)}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all duration-300',
                selectedLevel === index
                  ? 'bg-primary text-primary-foreground shadow-xl'
                  : 'bg-muted text-foreground hover:bg-muted/80 shadow-sm'
              )}
            >
              {level.level}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Slider */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Years of Experience
          </h3>
          <span className="text-2xl font-bold text-primary">{yearsExperience}+</span>
        </div>
        <Slider
          value={[yearsExperience]}
          onValueChange={(value) => setYearsExperience(value[0])}
          min={0}
          max={20}
          step={1}
          className="w-full"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Adjust to see estimated salary adjustments
        </p>
      </div>

      {/* Salary Display */}
      <div className="card-premium p-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Salary</p>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-4xl font-bold text-primary">
            ${Math.round(adjustedMin).toLocaleString()}
          </span>
          <span className="text-2xl text-muted-foreground">-</span>
          <span className="text-4xl font-bold text-primary">
            ${Math.round(adjustedMax).toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on {current.level} level with {yearsExperience}+ years of experience
        </p>
      </div>

      {/* Benefits */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Benefits for {current.level}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {current.benefits.map((benefit, index) => (
            <div key={index} className="flex gap-3 card-premium p-4">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <p className="text-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="card-premium p-6 border-2 border-accent/30">
        <p className="text-foreground">{current.description}</p>
      </div>
    </div>
  )
}
