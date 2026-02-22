import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import TopNav from '../components/layout/TopNav'
import { AdminStats } from '../components/widgets/StatsCards'
import BlackoutPanel from '../components/widgets/BlackoutPanel'
import CityHeatMap from '../components/charts/CityHeatMap'
import EdmontonMap from '../components/charts/EdmontonMap'
import StatusBadge from '../components/ui/StatusBadge'
import Button from '../components/ui/Button'
import EnergyLineChart from '../components/charts/EnergyLineChart'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

const alerts = [
  { id: 1, zone: 'Northgate',   msg: 'Load at 92% — approaching critical threshold', severity: 'danger',  time: '4m ago' },
  { id: 2, zone: 'Central',     msg: 'Load at 95% — immediate action recommended',   severity: 'danger',  time: '1m ago' },
  { id: 3, zone: 'Westfield',   msg: 'Demand spike detected — +18% over 30 min',     severity: 'warning', time: '11m ago' },
]

export default function AdminDashboard() {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar role="admin" />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav role="admin" />

        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.15 }}
          className="flex-1 overflow-y-auto p-6 scrollbar-thin"
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <AdminStats />

            {/* Active Alerts Banner */}
            <AlertsBanner />

            {/* Main two-column layout */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
              {/* Left: Heat Map (3 cols) */}
              <div className="xl:col-span-3 space-y-6">
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-semibold text-charcoal">Edmonton Grid Demand Map</h2>
                      <p className="text-xs text-slate mt-0.5">Live demand &amp; blackout risk per community · click any neighbourhood</p>
                    </div>
                    <StatusBadge status="warning">87.7% Utilization</StatusBadge>
                  </div>
                  <EdmontonMap />
                </div>

                {/* Grid-wide consumption */}
                <EnergyLineChart />
              </div>

              {/* Right: Blackout Panel (2 cols) */}
              <div className="xl:col-span-2">
                <BlackoutPanel />
              </div>
            </div>

            {/* Load Shedding Controls */}
            <LoadSheddingControls />
          </div>
        </motion.main>
      </div>
    </div>
  )
}

// ─── Alert Banner ────────────────────────────────────────────────────────────
function AlertsBanner() {
  const [dismissed, setDismissed] = useState([])

  const visible = alerts.filter((a) => !dismissed.includes(a.id))

  if (!visible.length) return null

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {visible.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
              a.severity === 'danger'
                ? 'bg-crimson/6 border-crimson/20'
                : 'bg-amber-eg/8 border-amber-eg/20'
            }`}
          >
            <div className={`h-2 w-2 rounded-full shrink-0 animate-pulse ${
              a.severity === 'danger' ? 'bg-crimson' : 'bg-amber-eg'
            }`} />
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-semibold mr-2 ${
                a.severity === 'danger' ? 'text-crimson' : 'text-amber-eg'
              }`}>{a.zone}</span>
              <span className="text-xs text-charcoal">{a.msg}</span>
            </div>
            <span className="text-[11px] text-slate shrink-0">{a.time}</span>
            <button
              onClick={() => setDismissed((prev) => [...prev, a.id])}
              className="text-slate hover:text-charcoal transition-colors text-xs ml-1"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─── Load Shedding Controls ───────────────────────────────────────────────────
function LoadSheddingControls() {
  const [status, setStatus] = useState('idle')

  const plans = [
    { id: 1, name: 'Stage 1 — Non-essential commercial (< 5 MW)',  impact: '4.2 MW relief' },
    { id: 2, name: 'Stage 2 — Rotating residential 30-min blocks', impact: '12.8 MW relief' },
    { id: 3, name: 'Stage 3 — Industrial override protocols',       impact: '31 MW relief' },
  ]

  const activate = () => {
    setStatus('activating')
    setTimeout(() => setStatus('active'), 1500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-charcoal">Emergency Load Shedding Controls</h2>
          <p className="text-xs text-slate mt-0.5">Activate staged protocols to prevent system-wide outage</p>
        </div>
        <AnimatePresence mode="wait">
          {status === 'active' ? (
            <motion.div
              key="active"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 rounded-full bg-mint/15 border border-mint/30 px-3 py-1.5"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
              <span className="text-xs font-semibold text-mint">Protocol Active</span>
            </motion.div>
          ) : (
            <StatusBadge key="idle" status={status === 'activating' ? 'warning' : 'neutral'}>
              {status === 'activating' ? 'Activating…' : 'Standby'}
            </StatusBadge>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {plans.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-xl border p-4 transition-colors ${
              status === 'active'
                ? 'border-mint/30 bg-mint/5'
                : 'border-slate/10 bg-canvas'
            }`}
          >
            <p className="text-xs font-medium text-charcoal mb-1.5">{p.name}</p>
            <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${
              status === 'active'
                ? 'bg-mint/15 text-mint'
                : 'bg-prussian/8 text-prussian'
            }`}>
              {p.impact}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          variant="danger"
          onClick={activate}
          disabled={status !== 'idle'}
          className="flex-1"
        >
          {status === 'activating'
            ? '⚙️ Activating Protocol…'
            : status === 'active'
            ? '✓ Protocol Engaged'
            : '⚡ Initiate Load Shedding'}
        </Button>
        <Button
          variant="outline"
          onClick={() => setStatus('idle')}
          disabled={status === 'idle'}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
