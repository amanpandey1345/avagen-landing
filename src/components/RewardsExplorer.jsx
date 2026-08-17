import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Infinity as InfinityIcon, Layers3, Trophy, Users2 } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { distributionGroups, ranks } from '../data/plan'

const groupOrder = ['core', 'mid', 'deep']

export default function RewardsExplorer() {
  const [groupKey, setGroupKey] = useState('core')
  const [activeRank, setActiveRank] = useState(0)
  const rankScroller = useRef(null)
  const rankButtons = useRef([])
  const rawId = useId().replace(/:/g, '')
  const group = distributionGroups[groupKey]

  const selectRank = (index, focus = false) => {
    const next = (index + ranks.length) % ranks.length
    setActiveRank(next)
    rankButtons.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    if (focus) rankButtons.current[next]?.focus()
  }

  const scrollRanks = (direction) => {
    rankScroller.current?.scrollBy({ left: direction * 330, behavior: 'smooth' })
  }

  const handleRankKeyDown = (event, index) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      selectRank(index + 1, true)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      selectRank(index - 1, true)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectRank(0, true)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectRank(ranks.length - 1, true)
    }
  }

  return (
    <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
      <div className="chrome-card overflow-hidden rounded-[28px] p-4 min-[390px]:p-5 sm:rounded-[36px] sm:p-7 lg:p-9">
        <div className="flex flex-col gap-5 border-b border-slate-200/80 pb-6 sm:gap-6 sm:pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-ava-red sm:text-xs sm:tracking-[0.2em]">15-level energy distribution</div>
            <h3 className="mt-3 font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-ava-ink min-[390px]:text-4xl sm:text-5xl">
              Explore the network layers
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              The figures below mirror the Core, Mid and Deep structure displayed in the supplied plan deck. They are presented as plan mechanics, not guaranteed earnings.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/40 bg-amber-50 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-amber-700 sm:text-[10px] sm:tracking-[0.16em]">
            Plan-stated figures
          </span>
        </div>

        <div role="tablist" aria-label="Distribution layer groups" className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-3">
          {groupOrder.map((key) => {
            const item = distributionGroups[key]
            const active = groupKey === key
            return (
              <button
                type="button"
                role="tab"
                id={`${rawId}-${key}-tab`}
                aria-controls={`${rawId}-${key}-panel`}
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                key={key}
                onClick={() => setGroupKey(key)}
                onKeyDown={(event) => {
                  const index = groupOrder.indexOf(key)
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault()
                    setGroupKey(groupOrder[(index + 1) % groupOrder.length])
                  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault()
                    setGroupKey(groupOrder[(index - 1 + groupOrder.length) % groupOrder.length])
                  }
                }}
                className={`relative overflow-hidden rounded-[22px] border p-4 text-left transition duration-300 sm:rounded-[24px] sm:p-5 ${active ? 'border-transparent text-white shadow-lg' : 'border-slate-200 bg-white/[0.65] text-ava-ink hover:-translate-y-1 hover:bg-white'}`}
                style={active ? { background: `linear-gradient(135deg, ${item.accent}, #0c1016)` } : undefined}
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <div className={`text-[9px] font-black uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.2em] ${active ? 'text-white/[0.55]' : 'text-slate-400'}`}>Layer group</div>
                    <div className="mt-2 font-display text-3xl font-black uppercase tracking-[-0.03em]">{item.label}</div>
                  </div>
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-2xl sm:size-12 ${active ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Layers3 size={20} />
                  </div>
                </div>
                <div className="relative z-10 mt-5 flex items-end justify-between gap-3 sm:mt-6">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.14em] ${active ? 'text-white/[0.55]' : 'text-slate-400'}`}>Group total</span>
                  <span className="font-display text-4xl font-black">{item.total}%</span>
                </div>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={groupKey}
            id={`${rawId}-${groupKey}-panel`}
            role="tabpanel"
            aria-labelledby={`${rawId}-${groupKey}-tab`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid gap-3 min-[520px]:grid-cols-2 sm:gap-4 xl:grid-cols-5"
          >
            {group.levels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.045 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_14px_40px_rgba(17,24,39,.06)] sm:rounded-[24px] sm:p-5"
              >
                <div className="card-shine" />
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 sm:text-[10px] sm:tracking-[0.18em]">Level {String(level.level).padStart(2, '0')}</span>
                  <span className="size-2 shrink-0 rounded-full" style={{ background: group.accent, boxShadow: `0 0 14px ${group.accent}` }} />
                </div>
                <div className="relative z-10 mt-4 font-display text-5xl font-black tracking-[-0.045em]" style={{ color: group.accent }}>
                  {level.rate}%
                </div>
                <div className="relative z-10 mt-5 grid grid-cols-2 gap-2 border-t border-slate-200/80 pt-4">
                  <div className="min-w-0">
                    <div className="text-[8px] font-black uppercase tracking-[0.12em] text-slate-400 min-[390px]:text-[9px] min-[390px]:tracking-[0.15em]">Self req.</div>
                    <div className="mt-1 truncate text-sm font-black text-ava-ink">{level.self}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[8px] font-black uppercase tracking-[0.12em] text-slate-400 min-[390px]:text-[9px] min-[390px]:tracking-[0.15em]">Directs</div>
                    <div className="mt-1 truncate text-sm font-black text-ava-ink">{level.directs}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Core', value: '39%', accent: distributionGroups.core.accent },
            { label: 'Mid', value: '17%', accent: distributionGroups.mid.accent },
            { label: 'Deep', value: '11%', accent: distributionGroups.deep.accent },
            { label: 'Total', value: '67%', accent: '#0A0C11' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white/70 p-4">
              <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
              <div className="mt-2 font-display text-3xl font-black" style={{ color: item.accent }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dark-console cut-panel rounded-[28px] p-4 min-[390px]:p-5 sm:rounded-[36px] sm:p-7 lg:p-9">
        <div className="relative z-10 flex flex-col gap-5 border-b border-white/10 pb-6 sm:pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-red-300 sm:text-xs sm:tracking-[0.2em]">12-rank matching-business ladder</div>
            <h3 className="mt-3 font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white min-[390px]:text-4xl sm:text-5xl">
              From Spark to Infinity
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">
              Select a milestone to inspect the matching-volume and bounty figures shown in the source plan. Monthly reset and qualification rules still require independent verification.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollRanks(-1)} aria-label="Scroll ranks left" className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.11]">
              <ChevronLeft size={19} />
            </button>
            <button type="button" onClick={() => scrollRanks(1)} aria-label="Scroll ranks right" className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.11]">
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-6 grid gap-5 sm:mt-7 xl:grid-cols-[.72fr_1.28fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRank}
              id={`${rawId}-rank-panel`}
              role="tabpanel"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative overflow-hidden rounded-[24px] border border-ava-red/20 bg-gradient-to-br from-ava-red/[0.18] via-white/[0.05] to-transparent p-5 sm:rounded-[28px] sm:p-6"
            >
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-ava-red/20 blur-3xl" />
              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.08] text-white sm:size-14">
                  {activeRank === ranks.length - 1 ? <InfinityIcon size={26} /> : <Trophy size={24} />}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-white/[0.55] sm:text-[10px] sm:tracking-[0.16em]">
                  Rank {String(ranks[activeRank].rank).padStart(2, '0')}
                </span>
              </div>
              <div className="relative z-10 mt-8 break-words font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.045em] text-white min-[390px]:text-5xl sm:mt-10 sm:text-6xl">
                {ranks[activeRank].name}
              </div>
              <div className="relative z-10 mt-6 grid gap-3 min-[420px]:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-white/[0.38]">
                    <Users2 size={13} /> Matching volume
                  </div>
                  <div className="mt-3 text-lg font-black text-white">{ranks[activeRank].volume}</div>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.16em] text-emerald-200/[0.65]">Plan bounty</div>
                  <div className="mt-3 text-lg font-black text-emerald-300">{ranks[activeRank].bounty}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div ref={rankScroller} role="tablist" aria-label="Matching-business ranks" className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scroll-padding-inline:0.25rem]">
            {ranks.map((rank, index) => {
              const active = activeRank === index
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`${rawId}-rank-panel`}
                  tabIndex={active ? 0 : -1}
                  ref={(node) => { rankButtons.current[index] = node }}
                  key={rank.rank}
                  onClick={() => selectRank(index)}
                  onKeyDown={(event) => handleRankKeyDown(event, index)}
                  className={`group min-w-[205px] snap-start rounded-[22px] border p-4 text-left transition duration-300 min-[390px]:min-w-[225px] min-[390px]:rounded-[24px] min-[390px]:p-5 ${
                    active
                      ? 'border-ava-red/60 bg-ava-red/[0.15] shadow-[0_0_35px_rgba(232,65,66,.16)]'
                      : 'border-white/10 bg-white/[0.04] hover:-translate-y-1 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex size-10 items-center justify-center rounded-xl text-xs font-black ${active ? 'bg-ava-red text-white' : 'bg-white/[0.07] text-white/[0.55]'}`}>
                      {String(rank.rank).padStart(2, '0')}
                    </span>
                    <ChevronRight size={16} className={active ? 'text-ava-red' : 'text-white/25'} />
                  </div>
                  <div className="mt-6 font-display text-2xl font-black uppercase tracking-[-0.02em] text-white">{rank.name}</div>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="text-[9px] font-black uppercase tracking-[0.15em] text-white/[0.32]">Matching business</div>
                    <div className="mt-1 text-sm font-bold text-white/70">{rank.volume}</div>
                    <div className="mt-3 text-[9px] font-black uppercase tracking-[0.15em] text-white/[0.32]">Bounty</div>
                    <div className={`mt-1 text-base font-black ${active ? 'text-red-300' : 'text-white'}`}>{rank.bounty}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
