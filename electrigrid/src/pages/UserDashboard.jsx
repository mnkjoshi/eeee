import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import TopNav from '../components/layout/TopNav'
import EnergyLineChart from '../components/charts/EnergyLineChart'
import DeviceControl from '../components/widgets/DeviceControl'
import AIRecommendations from '../components/widgets/AIRecommendations'
import { UserStats } from '../components/widgets/StatsCards'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

export default function UserDashboard() {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar role="user" />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav role="user" />

        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.15 }}
          className="flex-1 overflow-y-auto p-6 scrollbar-thin"
        >
          {/* Route-specific content — default to Overview */}
          <UserOverview />
        </motion.main>
      </div>
    </div>
  )
}

function UserOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats row */}
      <UserStats />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Chart — spans 2 cols */}
        <div className="lg:col-span-2">
          <EnergyLineChart />
        </div>

        {/* Device Control */}
        <div className="lg:col-span-1">
          <DeviceControl />
        </div>
      </div>

      {/* AI Recommendations — full width */}
      <AIRecommendations />

      {/* Usage Breakdown */}
      <UsageBreakdown />
    </div>
  )
}

function UsageBreakdown() {
  const breakdown = [
    { category: 'Climate Control', pct: 42, color: '#D0021B' },
    { category: 'Water Heating',   pct: 18, color: '#F5A623' },
    { category: 'EV Charging',     pct: 15, color: '#2A75D3' },
    { category: 'Appliances',      pct: 13, color: '#003153' },
    { category: 'Lighting',        pct: 7,  color: '#2EBA7E' },
    { category: 'Electronics',     pct: 5,  color: '#6B7280' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h2 className="text-base font-semibold text-charcoal mb-5">Usage Breakdown by Category</h2>
      <div className="space-y-3">
        {breakdown.map((b, i) => (
          <div key={b.category} className="flex items-center gap-3">
            <div className="w-28 text-xs text-slate shrink-0">{b.category}</div>
            <div className="flex-1 h-2 rounded-full bg-slate/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${b.pct}%` }}
                transition={{ delay: i * 0.07, duration: 0.7, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: b.color }}
              />
            </div>
            <div className="w-8 text-xs font-semibold text-charcoal text-right tabular-nums">{b.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
