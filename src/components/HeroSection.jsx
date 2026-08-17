import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  Network,
  Radar,
  Route,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import useReducedDataMotion from '../hooks/useReducedDataMotion'
import BrandMark from './BrandMark'
import EngineCore from './EngineCore'

const titleReveal = {
  hidden: { opacity: 0, y: 34, rotateX: -8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

const capabilityItems = [
  { value: '03', label: 'Operational chains', icon: Network },
  { value: '24/7', label: 'Monitoring concept', icon: Radar },
  { value: 'AI', label: 'Adaptive routing', icon: BrainCircuit },
]

const panelMetrics = [
  { label: 'Liquidity scan', value: 'Active', icon: ScanLine },
  { label: 'Route validation', value: 'Ready', icon: Route },
  { label: 'Risk controls', value: 'Armed', icon: ShieldCheck },
]

function DataPath({ path, delay, duration }) {
  return (
    <>
      <path d={path} className="hero-data-path" />
      <circle r="4" className="hero-data-packet">
        <animateMotion
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          path={path}
        />
      </circle>
    </>
  )
}

export default function HeroSection() {
  const reduceEffects = useReducedDataMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5.5, 5.5]), {
    stiffness: 120,
    damping: 20,
  })
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 120,
    damping: 20,
  })
  const translateX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 120,
    damping: 22,
  })
  const translateY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-5, 5]), {
    stiffness: 120,
    damping: 22,
  })

  const handlePointerMove = (event) => {
    if (reduceEffects || event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section className="hero-v2 relative overflow-hidden pt-[104px] sm:pt-[118px] lg:pt-[126px]" aria-labelledby="hero-title">
      <div className="hero-v2-grid absolute inset-0" aria-hidden="true" />
      <div className="hero-v2-glow hero-v2-glow-a" aria-hidden="true" />
      <div className="hero-v2-glow hero-v2-glow-b" aria-hidden="true" />
      <div className="hero-v2-beam hero-v2-beam-a" aria-hidden="true" />
      <div className="hero-v2-beam hero-v2-beam-b" aria-hidden="true" />

      <div className="section-shell relative z-10 grid min-h-[calc(100svh-104px)] items-center gap-12 pb-16 sm:min-h-[calc(100svh-118px)] sm:gap-14 sm:pb-20 lg:grid-cols-[minmax(0,.91fr)_minmax(0,1.09fr)] lg:gap-8 lg:pb-24 xl:gap-14">
        <div className="relative z-20 max-w-3xl lg:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            <Zap size={14} fill="currentColor" /> HyperGen liquidity intelligence
          </motion.div>

          <motion.h1
            id="hero-title"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.085, delayChildren: 0.08 } } }}
            className="hero-v2-title mt-7"
          >
            <motion.span variants={titleReveal} className="hero-v2-title-line">Liquidity</motion.span>
            <motion.span variants={titleReveal} className="hero-v2-title-line hero-v2-title-red">intelligence</motion.span>
            <motion.span variants={titleReveal} className="hero-v2-title-line">in motion.</motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="hero-v2-copy mt-7 max-w-[650px] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
          >
            A high-speed interface concept for monitoring liquidity, validating routes and coordinating execution across Avalanche&apos;s X, P and C chains.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6 }}
            className="hero-cta-row mt-8 flex flex-col gap-3 min-[440px]:flex-row"
          >
            <a href="#engine" className="btn-primary min-[440px]:min-w-[190px]">
              Explore the engine <ArrowRight size={17} />
            </a>
            <a href="#deck" className="btn-secondary min-[440px]:min-w-[180px]">
              Inspect the deck <ArrowUpRight size={17} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.65 }}
            className="hero-capability-grid mt-8"
          >
            {capabilityItems.map(({ value, label, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.63 + index * 0.07, duration: 0.45 }}
                className="hero-capability-item"
              >
                <span className="hero-capability-icon"><Icon size={16} /></span>
                <span className="min-w-0">
                  <span className="block font-display text-xl font-black uppercase leading-none text-ava-ink sm:text-2xl">{value}</span>
                  <span className="mt-1 block text-[9px] font-black uppercase tracking-[0.12em] text-slate-500 sm:text-[10px]">{label}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.82, duration: 0.55 }}
            className="hero-proof-row mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 sm:text-[10px]"
          >
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={13} className="text-ava-red" /> Responsive system</span>
            <span className="inline-flex items-center gap-2"><Sparkles size={13} className="text-ava-red" /> Source-deck inspired</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          className="hero-command-wrap relative mx-auto w-full max-w-[720px] lg:mx-0 lg:ml-auto"
        >
          <motion.div
            className="hero-command-card"
            style={reduceEffects ? undefined : { rotateX, rotateY, x: translateX, y: translateY }}
          >
            <div className="hero-command-topbar">
              <div className="flex min-w-0 items-center gap-3">
                <span className="hero-command-brand"><BrandMark size={26} /></span>
                <span className="min-w-0">
                  <span className="block truncate text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">HyperGen control layer</span>
                  <span className="mt-1 block truncate text-xs font-black text-ava-ink sm:text-sm">Liquidity intelligence console</span>
                </span>
              </div>
              <div className="hero-live-pill" aria-label="Demo system active">
                <span className="hero-live-dot" /> Demo active
              </div>
            </div>

            <div className="hero-command-stage">
              <div className="hero-command-scan" aria-hidden="true" />
              <div className="hero-command-grid" aria-hidden="true" />

              <svg className="hero-route-map" viewBox="0 0 640 470" aria-hidden="true" focusable="false">
                <DataPath path="M72 124 C178 124 201 210 316 230" delay={0} duration={3.5} />
                <DataPath path="M566 110 C472 110 442 205 324 230" delay={0.6} duration={3.9} />
                <DataPath path="M112 384 C205 384 225 278 319 240" delay={1.1} duration={4.2} />
                <DataPath path="M536 382 C451 382 421 288 326 240" delay={1.55} duration={3.7} />
              </svg>

              <motion.div
                animate={reduceEffects ? undefined : { y: [0, -6, 0], rotate: [0, -1.5, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="hero-node-card hero-node-card-a"
              >
                <span className="hero-node-icon"><Radar size={15} /></span>
                <span><small>Market scanner</small><strong>Continuous</strong></span>
              </motion.div>

              <motion.div
                animate={reduceEffects ? undefined : { y: [0, 7, 0], rotate: [0, 1.2, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="hero-node-card hero-node-card-b"
              >
                <span className="hero-node-icon"><Gauge size={15} /></span>
                <span><small>Execution state</small><strong>Route ready</strong></span>
              </motion.div>

              <div className="hero-chain-chip hero-chain-chip-x"><span>X</span><small>Asset flow</small></div>
              <div className="hero-chain-chip hero-chain-chip-p"><span>P</span><small>Coordination</small></div>
              <div className="hero-chain-chip hero-chain-chip-c"><span>C</span><small>Smart execution</small></div>

              <div className="hero-engine-zone">
                <EngineCore decorative={false} className="hero-engine-core" />
                <motion.div
                  animate={reduceEffects ? undefined : { opacity: [0.35, 0.95, 0.35], scale: [0.92, 1.06, 0.92] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="hero-engine-status"
                >
                  <Zap size={13} fill="currentColor" /> Intelligence online
                </motion.div>
              </div>
            </div>

            <div className="hero-command-metrics">
              {panelMetrics.map(({ label, value, icon: Icon }) => (
                <div key={label} className="hero-command-metric">
                  <span className="hero-command-metric-icon"><Icon size={15} /></span>
                  <span className="min-w-0">
                    <span className="block truncate text-[8px] font-black uppercase tracking-[0.14em] text-slate-400 sm:text-[9px]">{label}</span>
                    <span className="mt-1 block truncate text-[10px] font-black uppercase tracking-[0.1em] text-ava-ink sm:text-xs">{value}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={reduceEffects ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
            className="hero-float-badge hero-float-badge-left"
          >
            <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,.75)]" />
            <span><small>System</small><strong>Route validated</strong></span>
          </motion.div>

          <motion.div
            animate={reduceEffects ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            className="hero-float-badge hero-float-badge-right"
          >
            <span className="hero-float-mark"><BrandMark size={20} /></span>
            <span><small>Network</small><strong>Avalanche native</strong></span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#engine"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.6 }}
        className="hero-scroll-cue"
        aria-label="Scroll to the engine section"
      >
        <span>Explore</span>
        <motion.span
          animate={reduceEffects ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
