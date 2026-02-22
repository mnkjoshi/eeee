import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { blackoutProbabilityTimeline } from '../../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const val = payload[0].value
    const color = val >= 70 ? '#D0021B' : val >= 40 ? '#F5A623' : '#2EBA7E'
    return (
      <div className="bg-prussian text-white rounded-xl p-3 text-xs shadow-xl">
        <p className="font-semibold">{label}</p>
        <p style={{ color }}>{val}% probability</p>
      </div>
    )
  }
  return null
}

export default function BlackoutChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={blackoutProbabilityTimeline} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="blackoutGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#D0021B" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#D0021B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#E5E8EB" />
        <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={70} stroke="#D0021B" strokeDasharray="4 3" strokeWidth={1.5}
          label={{ value: 'Critical', position: 'insideTopRight', fontSize: 10, fill: '#D0021B' }} />
        <Area
          type="monotone"
          dataKey="probability"
          stroke="#D0021B"
          strokeWidth={2.5}
          fill="url(#blackoutGrad)"
          dot={false}
          activeDot={{ r: 5, fill: '#D0021B' }}
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
