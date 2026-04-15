'use client'

import { useEffect, useState } from 'react'

interface SmoothNumberProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
}

export function SmoothNumber({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
}: SmoothNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = value / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </>
  )
}
