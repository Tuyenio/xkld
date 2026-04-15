'use client'

import { useEffect, useState } from 'react'

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const next = height > 0 ? (scrollTop / height) * 100 : 0
      setProgress(Math.min(100, Math.max(0, next)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-accent via-primary to-accent transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
