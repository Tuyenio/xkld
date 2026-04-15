"use client"

import { useEffect } from 'react'

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-2xl border border-border/60 bg-card p-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-3">Dashboard unavailable</h1>
        <p className="text-muted-foreground mb-6">We hit an unexpected issue while loading your dashboard.</p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
