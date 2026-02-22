import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useDeviceStore from '../../store/useDeviceStore'
import useAuthStore from '../../store/useAuthStore'

export default function TopNav({ role = 'user' }) {
  const [time, setTime] = useState(new Date())
  const [prevWatts, setPrevWatts] = useState(0)
  const getTotalWatts = useDeviceStore((s) => s.getTotalWatts)
  const user = useAuthStore((s) => s.user)

  const totalWatts = getTotalWatts()

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setPrevWatts(totalWatts)
  }, [totalWatts])

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  })

  const wattColor = totalWatts > 10000 ? 'text-crimson' : totalWatts > 6000 ? 'text-amber-eg' : 'text-mint'

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate/10 shrink-0">
      {/* Left: Greeting */}
      <div>
        <p className="text-xs text-slate font-medium">{formattedDate} · {formattedTime}</p>
        <h1 className="text-lg font-semibold text-charcoal mt-0.5">
          {role === 'admin' ? 'Grid Operations Center' : `Welcome back, ${user?.name ?? 'User'}`}
        </h1>
      </div>

      {/* Right: Wattage Ticker */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs text-slate font-medium">Live Grid Load</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={totalWatts}
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 6, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-xl font-bold tabular-nums ${wattColor}`}
            >
              {role === 'admin' ? '4,821 MW' : `${totalWatts.toLocaleString()} W`}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div className="h-9 w-9 rounded-full bg-prussian text-white flex items-center justify-center text-sm font-bold select-none">
          {user?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>
      </div>
    </header>
  )
}
