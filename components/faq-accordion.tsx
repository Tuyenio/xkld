'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  defaultOpen?: string
}

export function FAQAccordion({ items, defaultOpen }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen || null)

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <div
            key={item.id}
            className="card-premium p-0 overflow-hidden"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-foreground text-left">
                {item.question}
              </h3>
              <ChevronDown
                size={20}
                className={cn(
                  'text-primary transition-transform duration-300 flex-shrink-0',
                  isOpen && 'transform rotate-180'
                )}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 border-t border-border pt-4">
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
