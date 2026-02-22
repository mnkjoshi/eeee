import { useMemo } from 'react'
import { motion } from 'framer-motion'

// SVG arc-based gauge
export default function GaugeChart({ value = 0, label = '', size = 200 }) {
  const radius = 80
  const strokeWidth = 14
  const cx = size / 2
  const cy = size / 2 + 20

  // Arc spans from 210° to 330° (i.e. 240° sweep)
  const sweepDeg = 240
  const startAngle = 210
  const endAngle = startAngle + sweepDeg

  const polarToXY = (angle, r) => {
    const rad = (angle - 90) * (Math.PI / 180)
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    }
  }

  const describeCurve = (start, end) => {
    const p1 = polarToXY(start, radius)
    const p2 = polarToXY(end, radius)
    const large = end - start > 180 ? 1 : 0
    return `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${large} 1 ${p2.x} ${p2.y}`
  }

  const fillEnd = startAngle + (value / 100) * sweepDeg

  const color = value >= 80
    ? '#D0021B'
    : value >= 50
    ? '#F5A623'
    : '#2EBA7E'

  const trackPath = describeCurve(startAngle, endAngle)
  const fillPath = describeCurve(startAngle, fillEnd)

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size * 0.75}`}>
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="#E5E8EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <motion.path
          d={fillPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 6px ${color}55)` }}
        />
        {/* Center text */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill={color}
          fontFamily="Inter, sans-serif"
        >
          {value}%
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize="11"
          fill="#6B7280"
          fontFamily="Inter, sans-serif"
        >
          {label}
        </text>
      </svg>
    </div>
  )
}
