import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function Card({ children, className = '', hover = false, padding = true, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={clsx(
        'bg-white rounded-2xl shadow-card',
        hover && 'cursor-pointer transition-shadow duration-200 hover:shadow-card-hover',
        padding && 'p-6',
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
