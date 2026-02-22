import { motion } from 'framer-motion'

export default function Toggle({ checked, onChange, disabled = false, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full
        transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-prussian focus-visible:ring-offset-2
        disabled:opacity-40 disabled:cursor-not-allowed
        ${checked ? 'bg-mint' : 'bg-slate/30'}
      `}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className={`
          inline-block h-5 w-5 rounded-full bg-white shadow-md
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  )
}
