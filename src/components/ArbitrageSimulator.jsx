import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  ArrowLeftRight,
  CheckCircle2,
  Pause,
  Play,
  Search,
  ShieldCheck,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import useReducedDataMotion from '../hooks/useReducedDataMotion'

const stages = [
  { label: 'Scan', copy: 'Compare markets and liquidity pools.', icon: Search },
  { label: 'Buy low', copy: 'Acquire at the lower-price venue.', icon: ShoppingCart },
  { label: 'Bridge', copy: 'Move through the selected route.', icon: ArrowLeftRight },
  { label: 'Sell high', copy: 'Exit at the higher-price venue.', icon: TrendingUp },
  { label: 'Settle', copy: 'Confirm costs and net outcome.', icon: ShieldCheck },
]

export default function ArbitrageSimulator() {
  const [buyPrice, setBuyPrice] = useState(20)
  const [spread, setSpread] = useState(1)
  const [fees, setFees] = useState(0.18)
  const [activeStep, setActiveStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const rootRef = useRef(null)
  const stageRefs = useRef([])
  const inView = useInView(rootRef, { amount: 0.18 })
  const reduceEffects = useReducedDataMotion()

  useEffect(() => {
    if (!auto || !inView || reduceEffects) return undefined
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % stages.length)
    }, 1450)
    return () => window.clearInterval(timer)
  }, [auto, inView, reduceEffects])

  const sellPrice = useMemo(() => buyPrice + spread, [buyPrice, spread])
  const netProfit = useMemo(() => spread - fees, [spread, fees])
  const netMargin = useMemo(() => (buyPrice > 0 ? (netProfit / buyPrice) * 100 : 0), [buyPrice, netProfit])
  const netPositive = netProfit >= 0
  const progress = (activeStep / (stages.length - 1)) * 100

  const chooseStep = (index, focus = false) => {
    const next = (index + stages.length) % stages.length
    setAuto(false)
    setActiveStep(next)
    if (focus) window.requestAnimationFrame(() => stageRefs.current[next]?.focus())
  }

  return (
    <div ref={rootRef} className="dark-console cut-panel mt-12 rounded-[30px] p-3 sm:rounded-[34px] sm:p-6 lg:p-8">
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="live-dot size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.9)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/[0.55] sm:text-xs sm:tracking-[0.24em]">
                Interactive execution lab
              </span>
            </div>
            <h3 className="mt-3 font-display text-3xl font-black uppercase leading-[0.96] tracking-[-0.03em] text-white sm:text-4xl">
              Buy low. Route smart. Settle clean.
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => {
                setActiveStep(0)
                setAuto(true)
              }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.11em] text-ava-ink transition hover:-translate-y-0.5 sm:px-4 sm:text-xs sm:tracking-[0.13em]"
            >
              <Play size={15} fill="currentColor" /> Run cycle
            </button>
            <button
              type="button"
              onClick={() => setAuto((value) => !value)}
              aria-pressed={!auto}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-2 text-[10px] font-black uppercase tracking-[0.11em] text-white/[0.8] transition hover:bg-white/[0.1] sm:px-4 sm:text-xs sm:tracking-[0.13em]"
            >
              {auto ? <Pause size={15} /> : <Play size={15} />}
              {auto ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
          <div className="min-w-0 rounded-[24px] border border-white/10 bg-white/[0.035] p-3 sm:rounded-[28px] sm:p-6">
            <div className="relative">
              <div className="absolute left-[10%] right-[10%] top-[26px] hidden h-[3px] rounded-full bg-white/10 sm:block" />
              <motion.div
                className="absolute left-[10%] top-[26px] hidden h-[3px] rounded-full bg-gradient-to-r from-ava-red via-red-300 to-emerald-400 shadow-[0_0_18px_rgba(232,65,66,.55)] sm:block"
                animate={{ width: `${progress * 0.8}%` }}
                transition={{ type: 'spring', stiffness: 160, damping: 24 }}
              />

              <div className="grid gap-2 sm:grid-cols-5" role="tablist" aria-label="Arbitrage execution stages">
                {stages.map((stage, index) => {
                  const Icon = stage.icon
                  const active = index === activeStep
                  const complete = index < activeStep
                  return (
                    <motion.button
                      ref={(node) => { stageRefs.current[index] = node }}
                      id={`arbitrage-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls="arbitrage-stage-panel"
                      tabIndex={active ? 0 : -1}
                      key={stage.label}
                      onClick={() => chooseStep(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                          event.preventDefault()
                          chooseStep(index + 1, true)
                        }
                        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                          event.preventDefault()
                          chooseStep(index - 1, true)
                        }
                        if (event.key === 'Home') {
                          event.preventDefault()
                          chooseStep(0, true)
                        }
                        if (event.key === 'End') {
                          event.preventDefault()
                          chooseStep(stages.length - 1, true)
                        }
                      }}
                      whileHover={{ y: -4 }}
                      className={`relative z-10 flex items-center gap-3 rounded-2xl border p-3 text-left transition sm:block sm:border-0 sm:bg-transparent sm:p-0 sm:text-center ${
                        active ? 'border-ava-red/50 bg-ava-red/10' : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-2xl border transition sm:mx-auto sm:size-12 ${
                          active
                            ? 'border-ava-red bg-ava-red text-white shadow-[0_0_28px_rgba(232,65,66,.45)]'
                            : complete
                              ? 'border-emerald-400/40 bg-emerald-400/[0.15] text-emerald-300'
                              : 'border-white/[0.12] bg-[#151a23] text-white/50'
                        }`}
                      >
                        {complete ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                      </span>
                      <span className={`block text-xs font-black uppercase tracking-[0.12em] sm:mt-3 ${active ? 'text-white' : 'text-white/[0.48]'}`}>
                        {stage.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-4">
              <motion.div
                layout
                className={`min-w-0 rounded-[22px] border p-4 transition sm:rounded-[24px] sm:p-5 ${
                  activeStep === 1 ? 'border-ava-red/[0.55] bg-ava-red/10' : 'border-white/10 bg-white/[0.04]'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 sm:text-xs sm:tracking-[0.18em]">
                  Market A - lower price
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-4xl font-black text-white sm:text-5xl">${buyPrice.toFixed(2)}</div>
                    <div className="mt-1 text-xs text-white/[0.45] sm:text-sm">AVAX reference price</div>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-ava-red/30 bg-ava-red/10 p-3 text-ava-red">
                    <ShoppingCart size={22} />
                  </div>
                </div>
              </motion.div>

              <div className="flex items-center justify-center py-1 md:py-0">
                <motion.div
                  animate={reduceEffects ? undefined : { x: [-4, 4, -4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`flex size-12 items-center justify-center rounded-full border sm:size-14 ${
                    activeStep === 2 ? 'border-sky-400/60 bg-sky-400/[0.15] text-sky-300' : 'border-white/10 bg-white/[0.05] text-white/[0.35]'
                  }`}
                >
                  <ArrowLeftRight size={22} />
                </motion.div>
              </div>

              <motion.div
                layout
                className={`min-w-0 rounded-[22px] border p-4 transition sm:rounded-[24px] sm:p-5 ${
                  activeStep === 3 ? 'border-emerald-400/[0.55] bg-emerald-400/10' : 'border-white/10 bg-white/[0.04]'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 sm:text-xs sm:tracking-[0.18em]">
                  Market B - higher price
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-4xl font-black text-white sm:text-5xl">${sellPrice.toFixed(2)}</div>
                    <div className="mt-1 text-xs text-white/[0.45] sm:text-sm">Illustrative exit price</div>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-300">
                    <TrendingUp size={22} />
                  </div>
                </div>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                id="arbitrage-stage-panel"
                role="tabpanel"
                aria-labelledby={`arbitrage-tab-${activeStep}`}
                aria-live="polite"
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ava-red/[0.15] text-xs font-black text-ava-red">
                  {String(activeStep + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white">{stages[activeStep].label}</div>
                  <div className="mt-0.5 text-xs leading-5 text-white/[0.45]">{stages[activeStep].copy}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="min-w-0 rounded-[24px] border border-white/10 bg-white/[0.045] p-4 sm:rounded-[28px] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.42] sm:text-xs">Cycle model</div>
                <div className="mt-2 text-2xl font-black text-white">Route economics</div>
              </div>
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-amber-200 sm:text-[10px] sm:tracking-[0.16em]">
                Illustrative
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.11em] text-white/[0.55] sm:text-xs sm:tracking-[0.12em]">
                  Buy price <output className="text-white">${buyPrice.toFixed(2)}</output>
                </span>
                <input
                  className="range-ava mt-3"
                  type="range"
                  min="10"
                  max="50"
                  step="0.25"
                  value={buyPrice}
                  onChange={(event) => setBuyPrice(Number(event.target.value))}
                  aria-label="Buy price"
                  aria-valuetext={`$${buyPrice.toFixed(2)}`}
                />
              </label>

              <label className="block">
                <span className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.11em] text-white/[0.55] sm:text-xs sm:tracking-[0.12em]">
                  Price gap <output className="text-white">${spread.toFixed(2)}</output>
                </span>
                <input
                  className="range-ava mt-3"
                  type="range"
                  min="0.1"
                  max="2.5"
                  step="0.05"
                  value={spread}
                  onChange={(event) => setSpread(Number(event.target.value))}
                  aria-label="Price gap"
                  aria-valuetext={`$${spread.toFixed(2)}`}
                />
              </label>

              <label className="block">
                <span className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.11em] text-white/[0.55] sm:text-xs sm:tracking-[0.12em]">
                  Fees + slippage <output className="text-white">${fees.toFixed(2)}</output>
                </span>
                <input
                  className="range-ava mt-3"
                  type="range"
                  min="0.02"
                  max="0.75"
                  step="0.01"
                  value={fees}
                  onChange={(event) => setFees(Number(event.target.value))}
                  aria-label="Fees and slippage"
                  aria-valuetext={`$${fees.toFixed(2)}`}
                />
              </label>
            </div>

            <div className="mt-6 grid gap-3 min-[390px]:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[9px] font-black uppercase tracking-[0.14em] text-white/40 sm:text-[10px] sm:tracking-[0.16em]">Gross spread</div>
                <div className="mt-2 font-display text-3xl font-black text-white">${spread.toFixed(2)}</div>
              </div>
              <div
                aria-live="polite"
                className={`rounded-2xl border p-4 ${
                  netPositive ? 'border-emerald-400/20 bg-emerald-400/10' : 'border-red-400/20 bg-red-400/10'
                }`}
              >
                <div className={`text-[9px] font-black uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em] ${netPositive ? 'text-emerald-200/70' : 'text-red-200/70'}`}>
                  Net outcome
                </div>
                <div className={`mt-2 flex items-center gap-2 font-display text-3xl font-black ${netPositive ? 'text-emerald-300' : 'text-red-300'}`}>
                  {netPositive ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
                  {netProfit < 0 ? '-' : ''}${Math.abs(netProfit).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="font-bold text-white/[0.45]">Illustrative net margin</span>
                <span className={`font-black ${netPositive ? 'text-emerald-300' : 'text-red-300'}`}>{netMargin.toFixed(2)}%</span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-white/[0.38]">
              This simulator explains the source deck&apos;s arbitrage flow. It is not live market data, a profit forecast or a trading tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
