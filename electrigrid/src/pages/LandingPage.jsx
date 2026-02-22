import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

const features = [
  {
    icon: '📊',
    title: 'Personal Energy Tracking',
    desc: 'Real-time dashboards showing device-level consumption, cost projections, and efficiency benchmarks against your neighbourhood.',
  },
  {
    icon: '🎛️',
    title: 'Remote Device Control',
    desc: 'Toggle HVAC, EV chargers, and smart appliances from anywhere. Automated schedules shift loads to off-peak hours automatically.',
  },
  {
    icon: '🏙️',
    title: 'Community Grid Stability',
    desc: 'City-level operators gain predictive blackout alerts, neighbourhood heat-maps, and emergency load-shedding tools in one command centre.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-canvas font-sans overflow-x-hidden">
      {/* ── Nav ───────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-prussian/8">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-prussian flex items-center justify-center">
            <BoltIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-prussian tracking-tight">Electrigrid</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/login')}>Get Started</Button>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-20 pb-24 overflow-hidden">
        {/* Background gradient blob */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full
                          bg-prussian/6 blur-3xl" />
        </div>

        <motion.div {...fadeUp(0)} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-cerulean/30 bg-cerulean/8
                           px-4 py-1.5 text-xs font-semibold text-cerulean">
            ⚡ Smart Grid Management Platform
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl font-extrabold text-prussian leading-[1.05] max-w-4xl text-balance"
        >
          Take Control of<br />
          <span className="text-cerulean">Your Grid.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 max-w-xl text-lg text-slate leading-relaxed text-balance"
        >
          Monitor every watt. Control every device. Predict outages before they happen.
          Electrigrid connects households and municipalities into one intelligent energy network.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex items-center gap-3 mt-10">
          <Button size="lg" onClick={() => navigate('/login')}>
            Get Started Free
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/login?role=admin')}>
            Admin Portal →
          </Button>
        </motion.div>

        {/* Isometric Grid Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
          className="mt-16 w-full max-w-4xl"
        >
          <IsometricIllustration />
        </motion.div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate/10 py-20 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest text-cerulean uppercase mb-3">Platform Features</p>
          <h2 className="text-4xl font-bold text-prussian">Everything you need to manage energy</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="rounded-2xl border border-prussian/8 p-7 bg-canvas hover:shadow-card transition-shadow duration-200"
            >
              <div className="h-12 w-12 rounded-xl bg-prussian/6 flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-charcoal mb-2">{f.title}</h3>
              <p className="text-sm text-slate leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Stats Banner ──────────────────────────────────────── */}
      <section className="bg-prussian py-16 px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-white text-center">
          {[
            { value: '142K+', label: 'Connected Meters' },
            { value: '31%',   label: 'Avg. Energy Saved' },
            { value: '8',     label: 'Cities Online' },
            { value: '99.98%',label: 'Platform Uptime' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-4xl font-extrabold text-cerulean-light">{s.value}</p>
              <p className="text-sm text-white/60 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-prussian mb-4">Ready to modernise your grid?</h2>
          <p className="text-slate max-w-md mx-auto mb-8">
            Join thousands of households and municipalities already using Electrigrid to prevent blackouts and reduce costs.
          </p>
          <Button size="lg" onClick={() => navigate('/login')}>Start Monitoring Now</Button>
        </motion.div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-slate/10 px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-prussian flex items-center justify-center">
            <BoltIcon className="h-3 w-3 text-white" />
          </div>
          <span className="font-semibold text-prussian">Electrigrid</span>
          <span className="text-slate/50">· v1.0.0 · © {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Contact', 'Documentation'].map((l) => (
            <a key={l} href="#" className="hover:text-prussian transition-colors">{l}</a>
          ))}
        </div>
        <button
          onClick={() => navigate('/login')}
          className="text-cerulean font-medium hover:text-prussian transition-colors"
        >
          Sign In →
        </button>
      </footer>
    </div>
  )
}

// ── Inline SVG: Isometric City/Grid Illustration ─────────────────────────────
function IsometricIllustration() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-prussian/10 shadow-card bg-white p-8">
      <div className="grid grid-cols-3 gap-6">
        {/* Home card */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-2xl bg-prussian/4 border border-prussian/10 p-5 text-center"
        >
          <div className="text-4xl mb-3">🏠</div>
          <p className="text-xs font-semibold text-charcoal">Home Hub</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            <p className="text-[11px] text-slate">8,120 W live</p>
          </div>
        </motion.div>

        {/* Grid hub */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="rounded-2xl bg-prussian border border-prussian p-5 text-center col-span-1"
        >
          <div className="text-4xl mb-3">⚡</div>
          <p className="text-xs font-semibold text-white">City Grid</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            <p className="text-[11px] text-white/60">4,821 MW</p>
          </div>
        </motion.div>

        {/* City Hall */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="rounded-2xl bg-cerulean/8 border border-cerulean/20 p-5 text-center"
        >
          <div className="text-4xl mb-3">🏛️</div>
          <p className="text-xs font-semibold text-charcoal">Control Center</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-eg animate-pulse" />
            <p className="text-[11px] text-slate">3 Alerts</p>
          </div>
        </motion.div>
      </div>

      {/* Connection lines */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
        <svg width="600" height="60" className="opacity-15">
          <line x1="150" y1="30" x2="280" y2="30" stroke="#003153" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="320" y1="30" x2="450" y2="30" stroke="#003153" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
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
