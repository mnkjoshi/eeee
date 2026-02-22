import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../../store/useAuthStore'

const userNav = [
  { to: '/dashboard', icon: GridIcon,     label: 'Overview' },
  { to: '/dashboard/devices',  icon: DevicesIcon,  label: 'Devices' },
  { to: '/dashboard/history',  icon: HistoryIcon,  label: 'History' },
  { to: '/dashboard/settings', icon: SettingsIcon, label: 'Settings' },
]

const adminNav = [
  { to: '/admin', icon: GridIcon,     label: 'Grid Overview' },
  { to: '/admin/map',      icon: MapIcon,      label: 'Load Map' },
  { to: '/admin/alerts',   icon: AlertIcon,    label: 'Alerts' },
  { to: '/admin/settings', icon: SettingsIcon, label: 'Settings' },
]

export default function Sidebar({ role = 'user' }) {
  const logout   = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const nav      = role === 'admin' ? adminNav : userNav

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full w-56 bg-prussian text-white shrink-0 overflow-hidden"
    >
      {/* ── Logo ── */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-cerulean flex items-center justify-center shrink-0">
            <BoltIcon />
          </div>
          <span className="text-base font-bold tracking-tight">Electrigrid</span>
        </div>
        <p className="mt-1.5 text-[11px] text-white/40 capitalize">{role} portal</p>
      </div>

      {/* ── Nav Links ── */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard' || to === '/admin'}
            className={({ isActive }) =>
              [
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl',
                'text-sm font-medium transition-colors duration-150 select-none',
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/55 hover:bg-white/10 hover:text-white',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId={`nav-bar-${role}`}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-cerulean"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Sign Out ── */}
      <div className="px-3 pb-5 pt-3 border-t border-white/10 shrink-0">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                     font-medium text-white/50 hover:bg-white/10 hover:text-white
                     transition-colors duration-150"
        >
          <LogoutIcon />
          Sign Out
        </button>
      </div>
    </motion.aside>
  )
}

// ── Icons (all 18 × 18) ───────────────────────────────────────────────────────
const s = 'h-[18px] w-[18px] shrink-0'

function BoltIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m13 2-9 11h8l-1 9 9-11h-8l1-9z" />
    </svg>
  )
}
function GridIcon() {
  return (
    <svg className={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}
function DevicesIcon() {
  return (
    <svg className={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.5V14m6 4.5V10m6 8.5v-7M3 21h18" />
    </svg>
  )
}
function HistoryIcon() {
  return (
    <svg className={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5M3.05 11a9 9 0 1 1 .49 3M3 4v4h4" />
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg className={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M10.3 3.2A9 9 0 0 1 21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 .75-3.6M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  )
}
function MapIcon() {
  return (
    <svg className={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="m9 3-6 3v15l6-3 6 3 6-3V3l-6 3-6-3Zm0 0v15m6-12v15" />
    </svg>
  )
}
function AlertIcon() {
  return (
    <svg className={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 9v4m0 4h.01M10.3 4.5 3.5 16a2 2 0 0 0 1.7 3h13.6a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z" />
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg className={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  )
}
