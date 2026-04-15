export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        <p className="text-muted-foreground">Loading admin console...</p>
      </div>
    </div>
  )
}
