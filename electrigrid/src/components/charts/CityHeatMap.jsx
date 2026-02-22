import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { neighborhoodData } from '../../data/mockData'

const riskColors = {
  critical: { bg: '#D0021B', text: 'white', label: 'Critical', badge: 'bg-crimson/15 text-crimson border border-crimson/30' },
  high:     { bg: '#F5A623', text: 'white', label: 'High',     badge: 'bg-amber-eg/15 text-amber-eg border border-amber-eg/30' },
  moderate: { bg: '#2A75D3', text: 'white', label: 'Moderate', badge: 'bg-cerulean/15 text-cerulean border border-cerulean/30' },
  low:      { bg: '#2EBA7E', text: 'white', label: 'Low',      badge: 'bg-mint/15 text-mint border border-mint/30' },
}

// Normalized grid positions for an approximate city layout (7-col × 5-row grid)
const positions = [
  { id: 'N1', gridCol: 4, gridRow: 1 },
  { id: 'N2', gridCol: 5, gridRow: 2 },
  { id: 'N3', gridCol: 2, gridRow: 2 },
  { id: 'N4', gridCol: 5, gridRow: 4 },
  { id: 'N5', gridCol: 1, gridRow: 3 },
  { id: 'N6', gridCol: 2, gridRow: 4 },
  { id: 'N7', gridCol: 6, gridRow: 3 },
  { id: 'N8', gridCol: 4, gridRow: 3 },
]

export default function CityHeatMap() {
  const [hovered, setHovered] = useState(null)
  const enriched = neighborhoodData.map((n) => ({
    ...n,
    ...(positions.find((p) => p.id === n.id) || {}),
  }))

  return (
    <div className="relative">
      {/* Grid of hexagonal-ish zone cells */}
      <div
        className="relative w-full rounded-xl overflow-hidden bg-prussian/5 border border-prussian/10"
        style={{ minHeight: 260 }}
      >
        {/* subtle grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#003153" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>

        {/* Zone bubbles */}
        <div className="relative z-10 p-4">
          {/* Legend */}
          <div className="flex gap-3 flex-wrap mb-4">
            {Object.entries(riskColors).map(([r, c]) => (
              <div key={r} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${c.badge}`}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.bg }} />
                {c.label}
              </div>
            ))}
          </div>

          {/* Neighbourhood cards in a responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {enriched.map((n) => {
              const rc = riskColors[n.risk]
              return (
                <motion.div
                  key={n.id}
                  whileHover={{ scale: 1.04 }}
                  onHoverStart={() => setHovered(n.id)}
                  onHoverEnd={() => setHovered(null)}
                  className="relative rounded-xl p-3 cursor-pointer transition-shadow"
                  style={{
                    backgroundColor: `${rc.bg}18`,
                    border: `1.5px solid ${rc.bg}40`,
                    boxShadow: hovered === n.id ? `0 0 16px ${rc.bg}40` : 'none',
                  }}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <p className="text-xs font-semibold text-charcoal">{n.name}</p>
                    <span className="text-[10px] font-bold" style={{ color: rc.bg }}>{n.load}%</span>
                  </div>

                  {/* Load bar */}
                  <div className="h-1.5 rounded-full bg-black/8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${n.load}%` }}
                      transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: rc.bg }}
                    />
                  </div>

                  <p className="text-[10px] text-slate mt-1.5">{n.households.toLocaleString()} households</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
