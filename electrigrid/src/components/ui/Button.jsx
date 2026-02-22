import { motion } from 'framer-motion'
import clsx from 'clsx'

const variants = {
  primary: 'bg-prussian text-white hover:bg-prussian-light focus-visible:ring-prussian',
  secondary: 'bg-cerulean text-white hover:bg-cerulean-light focus-visible:ring-cerulean',
  outline: 'border border-prussian text-prussian hover:bg-prussian hover:text-white focus-visible:ring-prussian',
  ghost: 'text-prussian hover:bg-prussian/8 focus-visible:ring-prussian',
  danger: 'bg-crimson text-white hover:bg-red-700 focus-visible:ring-crimson',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base font-semibold',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
