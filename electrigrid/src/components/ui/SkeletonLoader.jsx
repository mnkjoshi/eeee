export function SkeletonLine({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-md bg-prussian/8 ${className}`} />
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-prussian/6 p-6 ${className}`}>
      <div className="h-4 w-1/3 rounded-md bg-prussian/10 mb-4" />
      <div className="h-3 w-full rounded-md bg-prussian/8 mb-2" />
      <div className="h-3 w-5/6 rounded-md bg-prussian/8 mb-2" />
      <div className="h-3 w-2/3 rounded-md bg-prussian/8" />
    </div>
  )
}

export function SkeletonChart({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-prussian/6 p-6 ${className}`}>
      <div className="h-4 w-1/4 rounded-md bg-prussian/10 mb-6" />
      <div className="flex items-end gap-2 h-40">
        {[60, 80, 50, 90, 70, 85, 65, 75, 55, 88, 72, 45].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-md bg-prussian/10" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}
