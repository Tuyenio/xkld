'use client'

import { useEffect, useState } from 'react'
import { ParticleBackground } from '@/components/particle-background'
import { FloatingElements } from '@/components/floating-elements'

function shouldEnableEffects() {
  if (typeof window === 'undefined') return false

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isSmallScreen = window.innerWidth < 1024
  const hasSaveData = 'connection' in navigator && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData)
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const isLowMemory = typeof deviceMemory === 'number' && deviceMemory <= 4

  return !reducedMotion && !isSmallScreen && !hasSaveData && !isLowMemory
}

export function DeferredHomeEffects() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const run = () => setEnabled(shouldEnableEffects())

    const idleId =
      'requestIdleCallback' in window
        ? (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(run)
        : window.setTimeout(run, 300)

    const handleResize = () => run()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if ('cancelIdleCallback' in window) {
        ;(window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId as number)
      } else {
        window.clearTimeout(idleId as number)
      }
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <ParticleBackground />
      <FloatingElements />
    </>
  )
}
