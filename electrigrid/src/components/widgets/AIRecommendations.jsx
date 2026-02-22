import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../ui/Card'
import { aiTips } from '../../data/mockData'

const priorityMap = {
  high: { color: 'border-l-crimson', badge: 'bg-crimson/10 text-crimson', icon: '🔴' },
  low:  { color: 'border-l-mint',    badge: 'bg-mint/10 text-mint',    icon: '🟢' },
}

export default function AIRecommendations() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 'intro',
      role: 'assistant',
      text: "Hi! I'm your Electrigrid AI energy advisor. I've analyzed your home's consumption patterns. Here are my current recommendations — or ask me anything about your energy usage.",
    },
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now().toString(), role: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate AI response after 1.2s
    setTimeout(() => {
      const responses = [
        "Based on your current usage pattern, turning off non-essential devices between 4–8 PM could reduce your peak-hour bill by up to 18%.",
        "Your home's standby power drain is approximately 340 W. Smart power strips could eliminate this entirely.",
        "The average for your neighborhood is 24.1 kWh/day. You're currently at 29.7 kWh — about 23% above average. Your HVAC is the primary driver.",
        "Scheduling your dishwasher and washing machine to run after 10 PM could save approximately $12 per month at off-peak rates.",
      ]
      const reply = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: reply }])
      setLoading(false)
    }, 1200)
  }

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-cerulean flex items-center justify-center text-base">✨</div>
        <div>
          <h2 className="text-base font-semibold text-charcoal">AI Energy Advisor</h2>
          <p className="text-xs text-slate">Powered by smart analysis</p>
        </div>
      </div>

      {/* Insight cards */}
      <div className="space-y-2 mb-4">
        {aiTips.map((tip) => {
          const style = priorityMap[tip.priority]
          return (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`border-l-4 ${style.color} pl-3 py-2 bg-canvas rounded-r-xl`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold text-slate uppercase tracking-wide">{tip.device}</span>
                <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${style.badge}`}>
                  Save {tip.saving}
                </span>
              </div>
              <p className="text-xs text-charcoal leading-relaxed">{tip.message}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 mb-3 max-h-[220px]">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-prussian text-white rounded-br-sm'
                    : 'bg-canvas text-charcoal border border-slate/10 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-canvas border border-slate/10 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-slate"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend() }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your energy usage…"
          className="flex-1 rounded-xl border border-slate/20 bg-canvas px-3.5 py-2.5 text-xs
                     text-charcoal placeholder:text-slate focus:outline-none focus:ring-2
                     focus:ring-cerulean/50 focus:border-cerulean transition-colors"
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.94 }}
          disabled={!input.trim() || loading}
          className="rounded-xl bg-prussian text-white px-4 py-2 text-xs font-semibold
                     hover:bg-prussian-light transition-colors disabled:opacity-50"
        >
          Send
        </motion.button>
      </form>
    </Card>
  )
}
