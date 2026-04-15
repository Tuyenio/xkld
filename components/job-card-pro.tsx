'use client'

import { Heart, MapPin, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { PremiumButton } from './premium-button'
import { cn } from '@/lib/utils'

interface JobCardProProps {
  id: string
  title: string
  company: string
  location: string
  salary: string
  tags: string[]
  featured?: boolean
  onApply?: () => void
  onSave?: () => void
  isSaved?: boolean
}

export function JobCardPro({
  id,
  title,
  company,
  location,
  salary,
  tags,
  featured = false,
  onApply,
  onSave,
  isSaved = false,
}: JobCardProProps) {
  const [savedState, setSavedState] = useState(isSaved)

  const handleSave = () => {
    setSavedState(!savedState)
    onSave?.()
  }

  return (
    <div
      className={cn(
        'card-premium p-6 rounded-2xl group cursor-pointer shadow-lg hover:shadow-xl transition-all',
        featured && 'border-2 border-accent/50'
      )}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {featured && (
                <span className="badge-premium flex items-center gap-1">
                  <TrendingUp size={14} />
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          <button
            onClick={handleSave}
            className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
          >
            <Heart
              size={20}
              className={cn(
                savedState
                  ? 'fill-accent text-accent'
                  : 'text-muted-foreground hover:text-accent'
              )}
            />
          </button>
        </div>

        {/* Location and Salary */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            {location}
          </div>
          <div className="text-lg font-bold text-primary">{salary}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Apply Button */}
        <div className="pt-2">
          <PremiumButton
            variant="primary"
            size="md"
            className="w-full"
            onClick={onApply}
          >
            View & Apply
          </PremiumButton>
        </div>
      </div>
    </div>
  )
}
