import { motion, useInView } from 'framer-motion'
import { Activity, CheckCircle2, Database, Eye, LockKeyhole, Radar, Route, ScanLine, Zap } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import useReducedDataMotion from '../hooks/useReducedDataMotion'

const feedRows = [
  { name: 'DEX pools', icon: Database, base: 128 },
  { name: 'Price feeds', icon: Activity, base: 42 },
  { name: 'Bridge routes', icon: Route, base: 18 },
  { name: 'Pending tx', icon: Eye, base: 76 },
]

const states = [
  { label: 'Scan opportunities', status: 'Active', color: 'text-red-300', bg: 'bg-ava-red/10', border: 'border-ava-red/20' },
  { label: 'Validate route', status: 'Ready', color: 'text-sky-300', bg: 'bg-sky-400/10', border: 'border-sky-400/20' },
  { label: 'Execute arbitrage', status: 'Queued', color: 'text-amber-200', bg: 'bg-amber-300/10', border: 'border-amber-300/20' },
  { label: 'Settle outcome', status: 'Watching', color: 'text-emerald-300', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
]

export default function MonitoringConsole() {
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { amount: 0.16 })
  const reduceEffects = useReducedDataMotion()
  const [tick, setTick] = useState(0)
  const rawId = useId().replace(/:/g, '')
  const radarGlowId = `radar-glow-${rawId}`
  const sweepGradientId = `sweep-gradient-${rawId}`

  useEffect(() => {
    if (!inView || reduceEffects) return undefined
    const timer = window.setInterval(() => setTick((value) => value + 1), 1800)
    return () => window.clearInterval(timer)
  }, [inView, reduceEffects])

  const feedValues = useMemo(
    () => feedRows.map((row, index) => row.base + Math.round(Math.sin((tick + index) * 0.9) * (index + 2))),
    [tick],
  )

  return (
    <div ref={rootRef} className="dark-console cut-panel mt-10 rounded-[30px] p-3 min-[390px]:p-4 sm:mt-12 sm:rounded-[38px] sm:p-7 lg:p-10">
      <div className="relative z-10 grid gap-4 sm:gap-5 xl:grid-cols-[.75fr_1.2fr_.75fr]">
        <div className="space-y-4">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-4 sm:rounded-[26px] sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Input layer</div>
                <div className="mt-2 text-lg font-black text-white sm:text-xl">Live signal map</div>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-ava-red/30 bg-ava-red/10 text-ava-red sm:size-11">
                <ScanLine size={20} />
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {feedRows.map((row, index) => {
                const Icon = row.icon
                return (
                  <motion.div
                    key={row.name}
                    layout={!reduceEffects}
                    className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-black/20 p-3 min-[390px]:gap-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-white/[0.55]">
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-bold text-white/70">{row.name}</div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-ava-red to-red-300"
                          animate={{ width: `${48 + ((tick + index * 11) % 42)}%` }}
                          transition={reduceEffects ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                    <motion.span
                      key={feedValues[index]}
                      initial={reduceEffects ? false : { opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="shrink-0 font-mono text-xs font-bold text-white"
                    >
                      {feedValues[index]}
                    </motion.span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="grid gap-3 min-[390px]:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <div className="rounded-[22px] border border-emerald-400/[0.15] bg-emerald-400/[0.07] p-4">
              <CheckCircle2 size={18} className="text-emerald-300" />
              <div className="mt-4 font-display text-2xl font-black text-white">99.98%</div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/[0.38]">Signal uptime</div>
            </div>
            <div className="rounded-[22px] border border-sky-400/[0.15] bg-sky-400/[0.07] p-4">
              <LockKeyhole size={18} className="text-sky-300" />
              <div className="mt-4 font-display text-2xl font-black text-white">4 checks</div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/[0.38]">Risk gates</div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/25 p-4 sm:rounded-[30px] sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(232,65,66,.18),transparent_46%)]" />
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">HyperGen intelligence core</div>
              <div className="mt-2 max-w-[15rem] text-xl font-black text-white sm:max-w-none sm:text-2xl">Always-on nervous system</div>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-200 sm:text-[10px]">
              <span className="live-dot size-1.5 rounded-full bg-emerald-300" /> Demo online
            </div>
          </div>

          <div className="relative z-10 mt-6 grid place-items-center sm:mt-8">
            <div className="relative aspect-square w-full max-w-[410px]">
              <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
                <defs>
                  <radialGradient id={radarGlowId} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E84142" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#E84142" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id={sweepGradientId} x1="200" y1="200" x2="390" y2="200">
                    <stop stopColor="#E84142" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#E84142" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="200" cy="200" r="172" fill={`url(#${radarGlowId})`} />
                {[45, 85, 125, 165].map((radius) => (
                  <circle key={radius} cx="200" cy="200" r={radius} fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1" />
                ))}
                {[0, 45, 90, 135].map((angle) => (
                  <line key={angle} x1="35" y1="200" x2="365" y2="200" stroke="rgba(255,255,255,.07)" strokeWidth="1" transform={`rotate(${angle} 200 200)`} />
                ))}
                <g className={reduceEffects ? '' : 'radar-sweep'}>
                  <path d="M200 200 L385 160 A190 190 0 0 1 385 240 Z" fill={`url(#${sweepGradientId})`} opacity="0.7" />
                  <line x1="200" y1="200" x2="383" y2="200" stroke="#E84142" strokeWidth="2" filter="drop-shadow(0 0 8px #E84142)" />
                </g>
                {[{ x: 120, y: 125, d: 0 }, { x: 278, y: 92, d: 0.7 }, { x: 310, y: 242, d: 1.2 }, { x: 155, y: 295, d: 1.7 }].map((dot, index) => (
                  <g key={`${dot.x}-${dot.y}`}>
                    <circle className={reduceEffects ? '' : 'radar-ping'} style={{ animationDelay: `${dot.d}s`, transformOrigin: `${dot.x}px ${dot.y}px` }} cx={dot.x} cy={dot.y} r="18" fill="none" stroke="#E84142" strokeWidth="1.5" />
                    <circle cx={dot.x} cy={dot.y} r="4" fill="#fff" filter="drop-shadow(0 0 8px #E84142)" />
                    <title>Demo signal {index + 1}</title>
                  </g>
                ))}
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <motion.div
                  animate={reduceEffects ? undefined : { scale: [0.96, 1.04, 0.96] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex size-20 items-center justify-center rounded-[26px] border border-ava-red/40 bg-[#11151d] text-ava-red shadow-[0_0_50px_rgba(232,65,66,.35)] sm:size-24 sm:rounded-[30px]"
                >
                  <Radar className="size-9 sm:size-[42px]" />
                </motion.div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-2 grid grid-cols-3 gap-1.5 min-[390px]:gap-2">
            {['Interpret', 'Correlate', 'Validate'].map((label, index) => (
              <div key={label} className="min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.04] px-1.5 py-2 text-center min-[390px]:px-3">
                <div className="text-[8px] font-black uppercase tracking-[0.12em] text-white/[0.38] min-[390px]:text-[9px]">0{index + 1}</div>
                <div className="mt-1 truncate text-[9px] font-bold text-white/[0.72] min-[390px]:text-[11px]">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4 sm:rounded-[28px] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Output loop</div>
              <div className="mt-2 text-xl font-black text-white">Execution state</div>
            </div>
            <Zap size={20} className="shrink-0 text-ava-red" />
          </div>

          <div className="mt-6 space-y-3">
            {states.map((item, index) => (
              <motion.div
                key={item.label}
                animate={!reduceEffects && index === tick % states.length ? { x: [0, 4, 0] } : undefined}
                transition={{ duration: 0.45 }}
                className={`rounded-2xl border ${item.border} ${item.bg} p-3 min-[390px]:p-4`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2 min-[390px]:gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black/20 text-[10px] font-black text-white/[0.55]">0{index + 1}</span>
                    <span className="min-w-0 text-[11px] font-bold leading-4 text-white/[0.72] min-[390px]:text-xs">{item.label}</span>
                  </div>
                  <span className={`shrink-0 text-[8px] font-black uppercase tracking-[0.12em] min-[390px]:text-[9px] min-[390px]:tracking-[0.14em] ${item.color}`}>{item.status}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 rounded-[22px] border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between gap-3 text-[9px] font-black uppercase tracking-[0.12em] text-white/[0.38] min-[390px]:text-[10px] min-[390px]:tracking-[0.14em]">
              <span>Opportunity index</span>
              <span className="text-white">72.4</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-ava-red via-amber-300 to-emerald-400"
                animate={reduceEffects ? { width: '72%' } : { width: ['52%', '78%', '64%', '72%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <p className="mt-4 text-[10px] leading-5 text-white/[0.38]">Visual demonstration only; this panel is not connected to live markets.</p>
        </div>
      </div>
    </div>
  )
}
