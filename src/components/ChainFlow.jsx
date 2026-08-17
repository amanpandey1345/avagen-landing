import { motion } from 'framer-motion'
import { Code2, GitBranch, Layers3, Network, ShieldCheck, Zap } from 'lucide-react'
import { chains } from '../data/plan'
import BrandMark from './BrandMark'

const icons = [GitBranch, Layers3, Code2]

export default function ChainFlow() {
  return (
    <div className="chrome-card micro-grid relative mt-12 overflow-hidden rounded-[36px] p-4 sm:p-7 lg:p-10">
      <div className="absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ava-red/10 blur-[90px]" />

      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 1200 620"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowRed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E84142" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#E84142" stopOpacity="0.9" />
            <stop offset="1" stopColor="#E84142" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path className="flow-path" d="M190 418 C330 360 400 330 590 305" stroke="url(#flowRed)" strokeWidth="3" />
        <path className="flow-path" d="M600 135 C600 198 600 235 600 292" stroke="url(#flowRed)" strokeWidth="3" />
        <path className="flow-path" d="M1010 418 C870 360 800 330 610 305" stroke="url(#flowRed)" strokeWidth="3" />
        <circle cx="190" cy="418" r="6" fill="#E84142" />
        <circle cx="600" cy="135" r="6" fill="#E9A23B" />
        <circle cx="1010" cy="418" r="6" fill="#17A7B8" />
      </svg>

      <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_1.16fr_1fr] lg:grid-rows-[auto_auto] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="order-3 lg:order-none lg:col-start-2 lg:row-start-1"
        >
          <ChainCard chain={chains[1]} Icon={icons[1]} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.12 }}
          className="order-2 lg:order-none lg:col-start-1 lg:row-start-2"
        >
          <ChainCard chain={chains[0]} Icon={icons[0]} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
          className="order-1 flex justify-center lg:order-none lg:col-start-2 lg:row-start-2"
        >
          <div className="relative flex aspect-square w-[250px] items-center justify-center rounded-[34%] border border-slate-300/70 bg-white shadow-[0_30px_80px_rgba(20,26,36,.18),0_0_70px_rgba(232,65,66,.18),inset_0_1px_0_white] sm:w-[290px]">
            <motion.div
              className="absolute inset-[10%] rounded-[32%] border border-ava-red/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[18%] rounded-full border border-dashed border-slate-300"
              animate={{ rotate: -360 }}
              transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 text-center">
              <BrandMark size={76} className="mx-auto tri-mark" />
              <div className="mt-2 font-display text-2xl font-black uppercase tracking-[-0.03em] text-ava-ink">HyperGen</div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-ava-red">Coordination layer</div>
            </div>
            {[0, 1, 2, 3].map((item) => (
              <motion.span
                key={item}
                className="absolute size-2 rounded-full bg-ava-red shadow-[0_0_18px_rgba(232,65,66,.9)]"
                style={{ left: item % 2 === 0 ? '14%' : '82%', top: item < 2 ? '22%' : '76%' }}
                animate={{ scale: [0.65, 1.5, 0.65], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.2, delay: item * 0.35, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.12 }}
          className="order-4 lg:order-none lg:col-start-3 lg:row-start-2"
        >
          <ChainCard chain={chains[2]} Icon={icons[2]} />
        </motion.div>
      </div>

      <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Network, title: 'Cross-chain connectivity', copy: 'One coordinated intelligence layer.' },
          { icon: ShieldCheck, title: 'Execution controls', copy: 'Validation before route activation.' },
          { icon: Zap, title: 'Responsive liquidity', copy: 'Signals adapt to changing conditions.' },
        ].map(({ icon: Icon, title, copy }) => (
          <motion.div
            key={title}
            whileHover={{ y: -5 }}
            className="rounded-[22px] border border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <span className="icon-orb !size-10 !rounded-xl"><Icon size={18} /></span>
              <div>
                <div className="text-sm font-black text-ava-ink">{title}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{copy}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ChainCard({ chain, Icon }) {
  return (
    <motion.div
      whileHover={{ y: -7, scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-[28px] border bg-white/[0.82] p-5 shadow-[0_18px_55px_rgba(17,24,39,.10),inset_0_1px_0_white] backdrop-blur-xl sm:p-6"
      style={{ borderColor: `${chain.accent}38`, boxShadow: `0 22px 65px rgba(17,24,39,.10), 0 0 44px ${chain.glow}, inset 0 1px 0 white` }}
    >
      <div className="card-shine" />
      <div className="relative z-10 flex items-start gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl border text-xl font-black shadow-sm"
          style={{ borderColor: `${chain.accent}45`, color: chain.accent, background: `${chain.accent}12` }}
        >
          <Icon size={24} />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: chain.accent }}>{chain.subtitle}</div>
          <div className="mt-1 font-display text-3xl font-black uppercase tracking-[-0.035em] text-ava-ink">{chain.name}</div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{chain.copy}</p>
        </div>
      </div>
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-slate-200/70 pt-4">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Native role</span>
        <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: chain.accent, background: `${chain.accent}10` }}>
          {chain.id}-layer
        </span>
      </div>
    </motion.div>
  )
}
