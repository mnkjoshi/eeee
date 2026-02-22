import clsx from 'clsx'

const styles = {
  safe: 'bg-mint/15 text-mint border border-mint/30',
  warning: 'bg-amber-eg/15 text-amber-eg border border-amber-eg/30',
  danger: 'bg-crimson/15 text-crimson border border-crimson/30',
  info: 'bg-cerulean/15 text-cerulean border border-cerulean/30',
  neutral: 'bg-slate/10 text-slate border border-slate/20',
}

export default function StatusBadge({ status = 'neutral', children, dot = true }) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
      styles[status]
    )}>
      {dot && (
        <span className={clsx(
          'h-1.5 w-1.5 rounded-full',
          status === 'safe' && 'bg-mint',
          status === 'warning' && 'bg-amber-eg',
          status === 'danger' && 'bg-crimson',
          status === 'info' && 'bg-cerulean',
          status === 'neutral' && 'bg-slate',
        )} />
      )}
      {children}
    </span>
  )
}
