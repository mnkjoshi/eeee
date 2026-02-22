import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const userNav = [
  { to: '/dashboard', icon: GridIcon, label: 'Overview' },
  { to: '/dashboard/devices', icon: DevicesIcon, label: 'Devices' },
  { to: '/dashboard/history', icon: HistoryIcon, label: 'History' },
  { to: '/dashboard/settings', icon: SettingsIcon, label: 'Settings' },
]

const adminNav = [
  { to: '/admin', icon: GridIcon, label: 'Grid Overview' },
  { to: '/admin/map', icon: MapIcon, label: 'Load Map' },
  { to: '/admin/alerts', icon: AlertIcon, label: 'Alerts' },
  { to: '/admin/settings', icon: SettingsIcon, label: 'Settings' },
]

export default function Sidebar({ role = 'user' }) {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const nav = role === 'admin' ? adminNav : userNav

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full w-60 bg-prussian text-white shrink-0"
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-cerulean flex items-center justify-center">
            <BoltIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">Electrigrid</span>
        </div>
        <div className="mt-1 text-xs text-white/40 capitalize">{role} portal</div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard' || to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute left-0 h-8 w-1 rounded-r-full bg-cerulean"
                  />
                )}
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-colors"
        >
          <LogoutIcon className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </motion.aside>
  )
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
function BoltIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m13 2-9 11h8l-1 9 9-11h-8l1-9z" />
    </svg>
  )
}
function GridIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}
function DevicesIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.5V14m6 4.5V10m6 8.5v-7M3 21h18" />
    </svg>
  )
}
function HistoryIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5M3.05 11a9 9 0 1 1 .49 3M3 4v4h4" />
    </svg>
  )
}
function SettingsIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.3 3.2A9 9 0 0 1 21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 .75-3.6M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  )
}
function MapIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 3-6 3v15l6-3 6 3 6-3V3l-6 3-6-3Zm0 0v15m6-12v15" />
    </svg>
  )
}
function AlertIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 4.5 3.5 16a2 2 0 0 0 1.7 3h13.6a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z" />
    </svg>
  )
}
function LogoutIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  )
}
