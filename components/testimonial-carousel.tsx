'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, testimonials.length])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const testimonial = testimonials[current]

  return (
    <div className="w-full">
      <div className="relative card-premium p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={20} className="fill-accent text-accent" />
          ))}
        </div>

        {/* Testimonial Content */}
        <blockquote className="text-xl md:text-2xl font-semibold text-foreground mb-8 leading-relaxed">
          "{testimonial.content}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          {testimonial.avatar && (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
              {testimonial.avatar}
            </div>
          )}
          <div>
            <p className="font-bold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prev}
          className="p-3 rounded-lg bg-primary text-primary-foreground hover:shadow-premium transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === current
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-border hover:bg-primary/50'
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-3 rounded-lg bg-primary text-primary-foreground hover:shadow-premium transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
