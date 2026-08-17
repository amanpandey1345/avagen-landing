import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeftRight,
  Bot,
  Building2,
  Clock3,
  Code2,
  Gauge,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { evolutionPhases, strategyComparison } from '../data/plan'

const modeIcons = {
  trading: TrendingUp,
  arbitrage: ArrowLeftRight,
}

const phaseIcons = [Building2, Code2, Gauge, Network]

export default function StrategyEvolution() {
  const [mode, setMode] = useState('arbitrage')
  const [phaseIndex, setPhaseIndex] = useState(3)
  const modeRefs = useRef({})
  const phaseRefs = useRef([])
  const selectedMode = strategyComparison[mode]
  const selectedPhase = evolutionPhases[phaseIndex]
  const ModeIcon = modeIcons[mode]
  const PhaseIcon = phaseIcons[phaseIndex]

  const selectMode = (next, focus = false) => {
    setMode(next)
    if (focus) window.requestAnimationFrame(() => modeRefs.current[next]?.focus())
  }

  const selectPhase = (index, focus = false) => {
    const next = (index + evolutionPhases.length) % evolutionPhases.length
    setPhaseIndex(next)
    if (focus) window.requestAnimationFrame(() => phaseRefs.current[next]?.focus())
  }

  return (
    <div className="mt-12 grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
      <div className="chrome-card overflow-hidden rounded-[30px] p-4 sm:rounded-[34px] sm:p-7 lg:p-8">
        <div className="flex flex-col gap-5 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-ava-red">Two different approaches</div>
            <h3 className="mt-3 font-display text-4xl font-black uppercase leading-[0.94] tracking-[-0.035em] text-ava-ink sm:text-5xl">
              Trading vs arbitrage
            </h3>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/40 bg-amber-50 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-amber-700 sm:text-[10px] sm:tracking-[0.16em]">
            Source-deck model
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-[22px] border border-slate-200 bg-slate-100/80 p-1.5" role="tablist" aria-label="Compare trading and arbitrage">
          {Object.entries(strategyComparison).map(([key, item]) => {
            const Icon = modeIcons[key]
            const active = mode === key
            return (
              <button
                ref={(node) => { modeRefs.current[key] = node }}
                id={`strategy-tab-${key}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="strategy-panel"
                tabIndex={active ? 0 : -1}
                key={key}
                onClick={() => selectMode(key)}
                onKeyDown={(event) => {
                  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                    event.preventDefault()
                    selectMode(key === 'trading' ? 'arbitrage' : 'trading', true)
                  }
                  if (event.key === 'Home') {
                    event.preventDefault()
                    selectMode('trading', true)
                  }
                  if (event.key === 'End') {
                    event.preventDefault()
                    selectMode('arbitrage', true)
                  }
                }}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-[17px] px-3 text-xs font-black uppercase tracking-[0.12em] transition sm:text-sm ${
                  active ? 'bg-white text-ava-red shadow-[0_10px_30px_rgba(15,23,42,.08)]' : 'text-slate-500 hover:bg-white/60 hover:text-ava-ink'
                }`}
              >
                <Icon size={17} /> {item.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            id="strategy-panel"
            role="tabpanel"
            aria-labelledby={`strategy-tab-${mode}`}
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="mt-5"
          >
            <div className={`relative overflow-hidden rounded-[26px] border p-5 sm:p-6 ${mode === 'arbitrage' ? 'border-ava-red/20 bg-red-50/70' : 'border-slate-200 bg-white/75'}`}>
              <div className="absolute -right-14 -top-14 size-40 rounded-full bg-ava-red/10 blur-3xl" />
              <div className="relative z-10 flex items-start gap-4">
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border ${mode === 'arbitrage' ? 'border-ava-red/20 bg-white text-ava-red' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
                  <ModeIcon size={22} />
                </span>
                <div className="min-w-0">
                  <div className="text-lg font-black text-ava-ink">{selectedMode.headline}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{selectedMode.copy}</p>
                </div>
              </div>

              <div className="relative z-10 mt-6 grid gap-3 min-[420px]:grid-cols-3">
                {selectedMode.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200/80 bg-white/[0.82] p-4">
                    <div className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">{metric.label}</div>
                    <div className="mt-2 text-sm font-black text-ava-ink">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/70">
          {[
            ['Time dependency', strategyComparison.trading.rows.time, strategyComparison.arbitrage.rows.time, Clock3],
            ['Market exposure', strategyComparison.trading.rows.exposure, strategyComparison.arbitrage.rows.exposure, ShieldCheck],
            ['Execution speed', strategyComparison.trading.rows.speed, strategyComparison.arbitrage.rows.speed, Zap],
            ['Decision model', strategyComparison.trading.rows.model, strategyComparison.arbitrage.rows.model, Bot],
          ].map(([label, trading, arbitrage, Icon], index) => (
            <div key={label} className={`grid gap-3 p-4 sm:grid-cols-[0.8fr_1fr_1fr] sm:items-center sm:p-5 ${index ? 'border-t border-slate-200/80' : ''}`}>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-slate-500">
                <Icon size={15} className="text-ava-red" /> {label}
              </div>
              <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                <span className="mr-2 font-black text-slate-400 sm:hidden">Trading:</span>{trading}
              </div>
              <div className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-ava-deep">
                <span className="mr-2 font-black text-ava-red sm:hidden">Arbitrage:</span>{arbitrage}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dark-console cut-panel overflow-hidden rounded-[30px] p-4 sm:rounded-[34px] sm:p-7 lg:p-8">
        <div className="relative z-10 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-red-300">Evolution of arbitrage</div>
            <h3 className="mt-3 font-display text-4xl font-black uppercase leading-[0.94] tracking-[-0.035em] text-white sm:text-5xl">
              From transfers to intelligence
            </h3>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white/[0.55] sm:text-[10px] sm:tracking-[0.16em]">
            <Sparkles size={14} className="text-red-300" /> Four phases
          </span>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Arbitrage evolution phases">
          {evolutionPhases.map((phase, index) => {
            const Icon = phaseIcons[index]
            const active = index === phaseIndex
            return (
              <button
                ref={(node) => { phaseRefs.current[index] = node }}
                id={`phase-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="phase-panel"
                tabIndex={active ? 0 : -1}
                key={phase.phase}
                onClick={() => selectPhase(index)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault()
                    selectPhase(index + 1, true)
                  }
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault()
                    selectPhase(index - 1, true)
                  }
                  if (event.key === 'Home') {
                    event.preventDefault()
                    selectPhase(0, true)
                  }
                  if (event.key === 'End') {
                    event.preventDefault()
                    selectPhase(evolutionPhases.length - 1, true)
                  }
                }}
                className={`rounded-[20px] border p-3 text-left transition sm:p-4 ${
                  active ? 'border-ava-red/50 bg-ava-red/[0.15] shadow-[0_0_28px_rgba(232,65,66,.14)]' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`flex size-9 items-center justify-center rounded-xl ${active ? 'bg-ava-red text-white' : 'bg-white/[0.07] text-white/[0.45]'}`}>
                    <Icon size={17} />
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-[0.14em] ${active ? 'text-red-300' : 'text-white/[0.32]'}`}>0{phase.phase}</span>
                </div>
                <div className="mt-4 text-xs font-black uppercase leading-5 tracking-[0.09em] text-white">{phase.short}</div>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            id="phase-panel"
            role="tabpanel"
            aria-labelledby={`phase-tab-${phaseIndex}`}
            key={phaseIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 mt-5 overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] p-5 sm:p-6"
          >
            <div className="absolute -right-16 -top-20 size-52 rounded-full bg-ava-red/[0.18] blur-[70px]" />
            <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-ava-red/30 bg-ava-red/10 text-red-300">
                  <PhaseIcon size={22} />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-red-300">Phase {selectedPhase.phase} - {selectedPhase.period}</div>
                  <div className="mt-2 text-xl font-black text-white sm:text-2xl">{selectedPhase.title}</div>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">{selectedPhase.copy}</p>
                </div>
              </div>
              <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white/[0.55]">
                <Gauge size={14} className="text-red-300" /> {selectedPhase.focus}
              </span>
            </div>

            <div className="relative z-10 mt-6 grid gap-3 min-[420px]:grid-cols-3">
              {selectedPhase.points.map((point, index) => (
                <div key={point} className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.15em] text-white/[0.32]">0{index + 1}</div>
                  <div className="mt-2 text-xs font-bold leading-5 text-white/[0.72]">{point}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mt-5 flex items-start gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-amber-200" />
          <p className="text-xs leading-5 text-white/[0.55]">
            This comparison reflects the framing used in the supplied deck. Real execution remains exposed to fees, failed transactions, liquidity changes, smart-contract risk and market conditions.
          </p>
        </div>
      </div>
    </div>
  )
}
