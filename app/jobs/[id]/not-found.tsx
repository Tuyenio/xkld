import Link from 'next/link'

export default function JobNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-xl w-full rounded-2xl border border-border/60 bg-card p-8 text-center">
        <p className="text-sm uppercase tracking-wide text-accent font-semibold mb-2">Job Not Found</p>
        <h1 className="text-4xl font-bold text-foreground mb-4">This job is no longer available</h1>
        <p className="text-muted-foreground mb-8">
          The listing may have expired, been removed, or the link is incorrect.
        </p>
        <Link
          href="/jobs"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Browse available jobs
        </Link>
      </div>
    </div>
  )
}
