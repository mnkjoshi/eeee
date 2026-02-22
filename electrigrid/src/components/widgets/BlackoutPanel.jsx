import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../ui/Card'
import GaugeChart from '../charts/GaugeChart'
import BlackoutChart from '../charts/BlackoutChart'
import Button from '../ui/Button'
import StatusBadge from '../ui/StatusBadge'

const zones = [
  { id: 'N1', name: 'Northgate', probability: 92, throttled: false },
  { id: 'N8', name: 'Central',   probability: 87, throttled: false },
  { id: 'N5', name: 'Westfield', probability: 74, throttled: false },
]

export default function BlackoutPanel() {
  const [zoneStates, setZoneStates] = useState(zones)
  const [alertSent, setAlertSent] = useState(false)

  const toggleThrottle = (id) => {
    setZoneStates((prev) =>
      prev.map((z) => z.id === id ? { ...z, throttled: !z.throttled } : z)
    )
  }

  const sendAlert = () => {
    setAlertSent(true)
    setTimeout(() => setAlertSent(false), 3000)
  }

  const overallProb = 82

  return (
    <Card className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-charcoal">Blackout Probability</h2>
          <p className="text-xs text-slate mt-0.5">ML model — updated every 5 min</p>
        </div>
        <StatusBadge status="danger">Critical Risk</StatusBadge>
      </div>

      {/* Gauge + Timeline */}
      <div className="grid grid-cols-2 gap-4 items-center">
        <GaugeChart value={overallProb} label="Blackout Risk" size={160} />
        <div>
          <p className="text-xs font-medium text-slate mb-2">Today's Probability Timeline</p>
          <BlackoutChart />
        </div>
      </div>

      {/* High-risk zones */}
      <div>
        <p className="text-xs font-semibold text-charcoal mb-2.5">High-Risk Zones — Load Shedding</p>
        <div className="space-y-2">
          {zoneStates.map((z) => (
            <motion.div
              key={z.id}
              layout
              className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                z.throttled ? 'bg-mint/8 border border-mint/25' : 'bg-crimson/6 border border-crimson/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: z.throttled ? '#2EBA7E' : '#D0021B' }}
                />
                <div>
                  <p className="text-sm font-medium text-charcoal">{z.name}</p>
                  <p className="text-[11px] text-slate">{z.probability}% blackout probability</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => toggleThrottle(z.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  z.throttled
                    ? 'bg-mint/20 text-mint hover:bg-mint/30'
                    : 'bg-crimson/15 text-crimson hover:bg-crimson/25'
                }`}
              >
                {z.throttled ? '✓ Throttled' : 'Throttle'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alert button */}
      <div className="flex gap-2">
        <Button variant="danger" className="flex-1" onClick={sendAlert}>
          📢 Broadcast Grid Alert
        </Button>
        <AnimatePresence>
          {alertSent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5 rounded-lg bg-mint/15 border border-mint/30 px-3 text-xs font-semibold text-mint"
            >
              ✓ Sent
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
