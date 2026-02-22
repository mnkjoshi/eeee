import { motion, AnimatePresence } from 'framer-motion'
import Toggle from '../ui/Toggle'
import Card from '../ui/Card'
import useDeviceStore from '../../store/useDeviceStore'

const riskColors = {
  high:   'text-crimson',
  medium: 'text-amber-eg',
  low:    'text-mint',
}

export default function DeviceControl() {
  const devices = useDeviceStore((s) => s.devices)
  const toggleDevice = useDeviceStore((s) => s.toggleDevice)
  const activeCount = useDeviceStore((s) => s.getActiveCount())

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-charcoal">Device Control</h2>
          <p className="text-xs text-slate mt-0.5">{activeCount} of {devices.length} devices active</p>
        </div>
        <div className="h-8 w-8 rounded-lg bg-prussian/8 flex items-center justify-center">
          <span className="text-prussian font-bold text-sm">{activeCount}</span>
        </div>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto scrollbar-thin max-h-[320px] pr-1">
        <AnimatePresence initial={false}>
          {devices.map((device, i) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.15 }}
              className={`
                flex items-center gap-3 rounded-xl p-3 transition-colors duration-150
                ${device.status === 'on' ? 'bg-prussian/4' : 'bg-canvas'}
                hover:bg-prussian/6
              `}
            >
              {/* Icon */}
              <span className="text-xl shrink-0">{device.icon}</span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-charcoal truncate">{device.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-slate">{device.watts.toLocaleString()} W</span>
                  <span className={`text-[11px] font-medium capitalize ${riskColors[device.risk]}`}>
                    · {device.risk} draw
                  </span>
                </div>
              </div>

              {/* Watt badge for active */}
              {device.status === 'on' && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[10px] font-semibold text-cerulean bg-cerulean/10 rounded-full px-2 py-0.5"
                >
                  LIVE
                </motion.span>
              )}

              {/* Toggle */}
              <Toggle
                checked={device.status === 'on'}
                onChange={() => toggleDevice(device.id)}
                label={`Toggle ${device.name}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  )
}
