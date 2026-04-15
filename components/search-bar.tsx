'use client'

import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { PremiumButton } from '@/components/premium-button'

interface SearchBarProps {
  placeholder?: string
  value?: string
  debounceMs?: number
  onDebouncedChange?: (value: string) => void
  onChange?: (value: string) => void
}

export function SearchBar({
  placeholder = 'Search...',
  value,
  debounceMs = 350,
  onDebouncedChange,
  onChange,
}: SearchBarProps) {
  const [internal, setInternal] = useState(value ?? '')

  useEffect(() => {
    if (typeof value === 'string') setInternal(value)
  }, [value])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onDebouncedChange?.(internal)
    }, debounceMs)

    return () => window.clearTimeout(timer)
  }, [internal, debounceMs, onDebouncedChange])

  return (
    <div className="relative flex items-center gap-2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
      <Input
        value={internal}
        onChange={(e) => {
          setInternal(e.target.value)
          onChange?.(e.target.value)
        }}
        placeholder={placeholder}
        className="pl-10"
      />
      {internal.length > 0 && (
        <PremiumButton variant="ghost" size="sm" onClick={() => setInternal('')} icon={<X size={14} />}>
          Clear
        </PremiumButton>
      )}
    </div>
  )
}
