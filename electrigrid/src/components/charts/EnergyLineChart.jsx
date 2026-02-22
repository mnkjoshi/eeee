import { useState } from 'react'
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { motion } from 'framer-motion'
import Card from '../ui/Card'
import { dailyConsumption, weeklyConsumption } from '../../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-prussian text-white rounded-xl p-3 shadow-xl text-xs">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value} {p.dataKey === 'kwh' ? 'kWh' : '$'}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function EnergyLineChart() {
  const [view, setView] = useState('daily')
  const data = view === 'daily' ? dailyConsumption : weeklyConsumption
  const xKey = view === 'daily' ? 'time' : 'day'

  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-charcoal">Energy Consumption</h2>
          <p className="text-xs text-slate mt-0.5">kWh usage over time</p>
        </div>
        <div className="flex gap-1 bg-canvas rounded-lg p-1">
          {['daily', 'weekly'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors duration-150 ${
                view === v
                  ? 'bg-prussian text-white shadow-sm'
                  : 'text-slate hover:text-charcoal'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={view}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="kwhGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2A75D3" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2A75D3" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2EBA7E" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2EBA7E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E5E8EB" />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
            />
            <Area
              type="monotone"
              dataKey="kwh"
              stroke="#2A75D3"
              strokeWidth={2.5}
              fill="url(#kwhGrad)"
              dot={false}
              activeDot={{ r: 5, fill: '#2A75D3' }}
              name="kWh"
              animationDuration={800}
              animationBegin={0}
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#2EBA7E"
              strokeWidth={2}
              fill="url(#costGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#2EBA7E' }}
              name="Cost ($)"
              animationDuration={800}
              animationBegin={200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  )
}
