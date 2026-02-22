import { motion } from 'framer-motion'
import useDeviceStore from '../../store/useDeviceStore'

const statVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.2 } }),
}

export function UserStats() {
  const getTotalWatts = useDeviceStore((s) => s.getTotalWatts)
  const getActiveCount = useDeviceStore((s) => s.getActiveCount)
  const totalWatts = getTotalWatts()
  const active = getActiveCount()

  const stats = [
    { label: 'Live Usage',     value: `${totalWatts.toLocaleString()} W`,  sub: 'Right now',        color: 'text-cerulean' },
    { label: 'Today\'s Total', value: '29.7 kWh',  sub: '+23% avg',         color: 'text-amber-eg' },
    { label: 'This Month',     value: '$84.20',     sub: 'Estimated bill',   color: 'text-prussian' },
    { label: 'Active Devices', value: active,       sub: 'of 8 connected',   color: 'text-mint' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          custom={i}
          initial="hidden"
          animate="show"
          variants={statVariants}
          className="bg-white rounded-2xl shadow-card p-5"
        >
          <p className="text-xs text-slate font-medium">{s.label}</p>
          <p className={`text-2xl font-bold mt-1 tabular-nums ${s.color}`}>{s.value}</p>
          <p className="text-xs text-slate mt-0.5">{s.sub}</p>
        </motion.div>
      ))}
    </div>
  )
}

export function AdminStats() {
  const stats = [
    { label: 'Total Grid Load', value: '4,821 MW',  sub: '87.7% capacity',   color: 'text-amber-eg' },
    { label: 'Capacity',         value: '5,500 MW',  sub: 'Available: 679 MW', color: 'text-prussian' },
    { label: 'Active Meters',    value: '142,380',   sub: '+3.2% peak hour',   color: 'text-cerulean' },
    { label: 'Active Alerts',    value: '3',          sub: '2 critical zones',  color: 'text-crimson' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          custom={i}
          initial="hidden"
          animate="show"
          variants={statVariants}
          className="bg-white rounded-2xl shadow-card p-5"
        >
          <p className="text-xs text-slate font-medium">{s.label}</p>
          <p className={`text-2xl font-bold mt-1 tabular-nums ${s.color}`}>{s.value}</p>
          <p className="text-xs text-slate mt-0.5">{s.sub}</p>
        </motion.div>
      ))}
    </div>
  )
}
