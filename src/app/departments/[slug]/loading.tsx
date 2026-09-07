export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-16 border-b border-border/60" />
      <div className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-16 animate-pulse">
        <div className="h-4 w-28 rounded bg-muted mb-6" />
        <div className="h-12 w-3/4 max-w-xl rounded-lg bg-muted mb-4" />
        <div className="h-4 w-1/2 max-w-md rounded bg-muted mb-10" />
        <div className="aspect-[16/11] w-full rounded-2xl bg-muted" />
      </div>
    </div>
  )
}
