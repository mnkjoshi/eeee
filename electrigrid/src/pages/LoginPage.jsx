import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const defaultRole = searchParams.get('role') === 'admin' ? 'admin' : 'user'

  const [role, setRole] = useState(defaultRole)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setError('')
    setLoading(true)

    setTimeout(() => {
      login(email, role)
      setLoading(false)
      navigate(role === 'admin' ? '/admin' : '/dashboard')
    }, 900)
  }

  const handleSSO = (provider) => {
    setLoading(true)
    setTimeout(() => {
      login(`${provider.toLowerCase()}@demo.com`, role)
      setLoading(false)
      navigate(role === 'admin' ? '/admin' : '/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left Pane — Prussian Blue ──────────────────────────── */}
      <div className="hidden lg:flex w-1/2 bg-prussian relative overflow-hidden flex-col justify-between p-14">
        {/* Animated wave layers */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #2A75D3 0%, transparent 70%)',
              width: 600 + i * 200,
              height: 600 + i * 200,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: [1, 1.1 + i * 0.05, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-cerulean flex items-center justify-center">
            <BoltIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Electrigrid</span>
        </div>

        {/* Hero copy */}
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-extrabold text-white leading-snug mb-4"
          >
            Smart energy,<br />smarter living.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-white/55 leading-relaxed text-sm max-w-xs"
          >
            Real-time device monitoring, AI-powered efficiency recommendations, and city-level grid management — all in one platform.
          </motion.p>

          {/* Feature list */}
          <div className="mt-8 space-y-3">
            {[
              'Device-level consumption monitoring',
              'Remote on/off control for every appliance',
              'AI-driven personalised energy saving tips',
              'Municipal blackout prediction & prevention',
            ].map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2.5"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-mint flex-shrink-0" />
                <span className="text-xs text-white/65">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/25">© {new Date().getFullYear()} Electrigrid v1.0.0</p>
      </div>

      {/* ── Right Pane — Login Card ────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center bg-canvas px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-7 w-7 rounded-lg bg-prussian flex items-center justify-center">
              <BoltIcon className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-prussian">Electrigrid</span>
          </div>

          <h1 className="text-2xl font-bold text-charcoal mb-1">Welcome back</h1>
          <p className="text-sm text-slate mb-7">Sign in to your Electrigrid account</p>

          {/* Role Toggle */}
          <div className="flex bg-white rounded-xl p-1 border border-slate/15 mb-7 shadow-sm">
            {['user', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                  role === r
                    ? 'bg-prussian text-white shadow-sm'
                    : 'text-slate hover:text-charcoal'
                }`}
              >
                {r === 'user' ? '👤 User' : '🏛️ Admin'} Portal
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-charcoal mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'admin@cityops.gov' : 'you@example.com'}
                className="w-full rounded-xl border border-slate/20 bg-white px-4 py-3 text-sm
                           text-charcoal placeholder:text-slate/50 focus:outline-none focus:ring-2
                           focus:ring-cerulean/40 focus:border-cerulean transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate/20 bg-white px-4 py-3 text-sm
                           text-charcoal placeholder:text-slate/50 focus:outline-none focus:ring-2
                           focus:ring-cerulean/40 focus:border-cerulean transition-colors"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-crimson bg-crimson/8 rounded-lg px-3 py-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  />
                  Signing in…
                </span>
              ) : `Sign in as ${role === 'admin' ? 'Administrator' : 'User'}`}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate/15" />
            <span className="text-xs text-slate">or continue with</span>
            <div className="flex-1 h-px bg-slate/15" />
          </div>

          {/* SSO */}
          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Apple'].map((provider) => (
              <motion.button
                key={provider}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSSO(provider)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate/20 bg-white
                           px-4 py-3 text-sm font-medium text-charcoal hover:bg-canvas hover:border-slate/35
                           transition-colors shadow-sm"
              >
                {provider === 'Google' ? '🔵' : '🍎'} {provider}
              </motion.button>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-slate">
            Don't have an account?{' '}
            <button className="text-cerulean font-medium hover:text-prussian transition-colors">
              Request access
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function BoltIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m13 2-9 11h8l-1 9 9-11h-8l1-9z" />
    </svg>
  )
}
