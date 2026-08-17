import { motion } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  CircleDollarSign,
  Clock3,
  Code2,
  Coins,
  Cpu,
  Droplets,
  Gauge,
  Globe2,
  GraduationCap,
  LineChart,
  LockKeyhole,
  Network,
  RefreshCcw,
  Route,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users2,
  WalletCards,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import ArbitrageSimulator from './components/ArbitrageSimulator'
import BackgroundFx from './components/BackgroundFx'
import BrandMark from './components/BrandMark'
import ChainFlow from './components/ChainFlow'
import EngineCore from './components/EngineCore'
import HeroSection from './components/HeroSection'
import Faq from './components/Faq'
import MetricCounter from './components/MetricCounter'
import MonitoringConsole from './components/MonitoringConsole'
import Navbar from './components/Navbar'
import PlanPreview from './components/PlanPreview'
import RewardsExplorer from './components/RewardsExplorer'
import ScrollUtility from './components/ScrollUtility'
import SectionHeading from './components/SectionHeading'
import StrategyEvolution from './components/StrategyEvolution'
import WaitlistModal from './components/WaitlistModal'
import { ecosystemItems, engineFeatures } from './data/plan'

const featureIcons = [Droplets, Route, Activity, ShieldCheck, Network, BrainCircuit]
const ecosystemIcons = [Coins, BrainCircuit, Sparkles, BadgeCheck, Bot, Gauge]

function App() {
  const [accessOpen, setAccessOpen] = useState(false)

  return (
    <div id="top" className="app-root relative min-h-screen overflow-x-clip">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <BackgroundFx />
      <Navbar onOpenAccess={() => setAccessOpen(true)} />

      <main id="main-content" className="relative z-10">
        <HeroSection />

        <div className="marquee overflow-hidden border-y border-slate-200/80 bg-white/[0.55] py-4 backdrop-blur-xl">
          <div className="marquee-track flex items-center gap-8 pr-8">
            {[...Array(2)].flatMap((_, repeat) =>
              ['Monitor', 'Interpret', 'Route', 'Execute', 'Optimize', 'Recycle liquidity'].map((item, index) => (
                <div key={`${repeat}-${item}`} className="flex items-center gap-8">
                  <span className="font-display text-lg font-black uppercase tracking-[0.08em] text-slate-500">{item}</span>
                  <BrandMark size={18} />
                </div>
              )),
            )}
          </div>
        </div>

        <section id="engine" className="section-pad relative">
          <div className="section-shell">
            <SectionHeading
              eyebrow="The intelligence behind AVAGen"
              title={<>One engine. <span className="text-ava-red">Continuous awareness.</span></>}
              copy="The source plan describes HyperGen as a liquidity-intelligence layer that monitors markets, interprets signals, validates routes and coordinates execution across Avalanche infrastructure."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="dark-console cut-panel relative min-h-[480px] rounded-[28px] p-5 sm:min-h-[560px] sm:rounded-[34px] sm:p-8"
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.22em] text-red-300">HyperGen core</div>
                      <div className="mt-2 text-2xl font-black text-white">Execution intelligence</div>
                    </div>
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-ava-red/30 bg-ava-red/10 text-ava-red">
                      <Cpu size={22} />
                    </span>
                  </div>

                  <div className="mt-8 flex flex-1 items-center justify-center">
                    <EngineCore compact />
                  </div>

                  <div className="grid grid-cols-2 gap-2 min-[390px]:grid-cols-5">
                    {[
                      { label: 'Monitor', icon: ScanLine },
                      { label: 'Interpret', icon: BrainCircuit },
                      { label: 'Route', icon: Route },
                      { label: 'Execute', icon: Zap },
                      { label: 'Optimize', icon: LineChart },
                    ].map(({ label, icon: Icon }, index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 + index * 0.06 }}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-2 py-3 text-center"
                      >
                        <Icon size={16} className="mx-auto text-red-300" />
                        <div className="mt-2 truncate text-[8px] font-black uppercase tracking-[0.1em] text-white/[0.48]">{label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {engineFeatures.map((feature, index) => {
                  const Icon = featureIcons[index]
                  return (
                    <motion.article
                      key={feature.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ delay: index * 0.055, duration: 0.55 }}
                      whileHover={{ y: -7 }}
                      className="chrome-card group overflow-hidden rounded-[28px] p-5 sm:p-6"
                    >
                      <div className="card-shine" />
                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <span className="icon-orb"><Icon size={20} /></span>
                        <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
                          {feature.metric}
                        </span>
                      </div>
                      <h3 className="relative z-10 mt-6 text-lg font-black text-ava-ink">{feature.title}</h3>
                      <p className="relative z-10 mt-3 text-sm leading-6 text-slate-600">{feature.copy}</p>
                    </motion.article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="arbitrage" className="section-pad relative overflow-hidden bg-[#eef2f6]">
          <div className="absolute inset-0 micro-grid opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="section-shell relative">
            <SectionHeading
              eyebrow="Simple example"
              title={<>What is <span className="text-ava-red">arbitrage?</span></>}
              copy="Buy at a lower price, route the asset efficiently, sell at a higher price and account for fees, slippage and settlement. Use the controls below to explore the mechanics."
            />
            <ArbitrageSimulator />
          </div>
        </section>

        <section id="evolution" className="section-pad relative overflow-hidden bg-white">
          <div className="absolute inset-0 micro-grid opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />
          <div className="section-shell relative">
            <SectionHeading
              eyebrow="Trading vs arbitrage + evolution"
              title={<>Understand the model. <span className="text-ava-red">Trace the shift.</span></>}
              copy="A responsive interpretation of the source deck's trading comparison and four-phase arbitrage timeline, with the plan's claims clearly separated from risk-aware implementation notes."
            />
            <StrategyEvolution />
          </div>
        </section>

        <section id="architecture" className="section-pad relative">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Avalanche triple-chain system"
              title={<>X-Chain. P-Chain. <span className="text-ava-red">C-Chain.</span></>}
              copy="The plan positions the three operational chains as a coordinated liquidity environment: asset movement, platform coordination and EVM execution working through one intelligence layer."
              align="center"
            />
            <ChainFlow />
          </div>
        </section>

        <section className="section-pad bg-[#0a0d13]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Real-time monitoring"
              title={<>An always-on market <span className="text-red-300">nervous system.</span></>}
              copy="A modern interpretation of the source deck's price feeds, transaction watcher, risk engine and execution loop. The metrics below are visual demo data, not live feeds."
              light
            />
            <MonitoringConsole />
          </div>
        </section>

        <section id="ecosystem" className="section-pad relative overflow-hidden">
          <div className="absolute -left-40 top-20 size-[520px] rounded-full bg-ava-red/10 blur-[120px]" />
          <div className="section-shell relative">
            <SectionHeading
              eyebrow="Avalanche ecosystem + community"
              title={<>Builders connect. <span className="text-ava-red">Liquidity compounds.</span></>}
              copy="The source plan connects AVAGen to DeFi, AI infrastructure, gaming, NFTs, automation and an international Avalanche community."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <MetricCounter value={700} suffix="+" label="Community members" note="Team1 figure shown in the source deck." />
              <MetricCounter value={55} label="Countries" note="International community footprint presented in the plan." />
              <MetricCounter value={80} suffix="+" label="Universities" note="Education and builder-network figure shown in the deck." />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="chrome-card micro-grid relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[28px] p-4 min-[390px]:min-h-[390px] sm:min-h-[520px] sm:rounded-[36px] sm:p-8"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,65,66,.16),transparent_54%)]" />
                <div className="relative aspect-square w-full max-w-[430px]">
                  {[0, 1, 2].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute rounded-full border"
                      style={{ inset: `${ring * 12}%`, borderColor: ring === 1 ? 'rgba(232,65,66,.25)' : 'rgba(100,116,139,.18)' }}
                      animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                      transition={{ duration: 22 - ring * 4, repeat: Infinity, ease: 'linear' }}
                    >
                      {[0, 1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className="absolute size-2 rounded-full bg-ava-red shadow-[0_0_16px_rgba(232,65,66,.8)]"
                          style={{ left: dot % 2 === 0 ? '-4px' : 'calc(100% - 4px)', top: dot < 2 ? '25%' : '72%' }}
                        />
                      ))}
                    </motion.div>
                  ))}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="relative grid size-24 place-items-center rounded-[28px] min-[390px]:size-28 sm:size-36 sm:rounded-[38px] border border-slate-300 bg-white shadow-[0_25px_80px_rgba(15,23,42,.18),0_0_60px_rgba(232,65,66,.20),inset_0_1px_0_white]">
                      <BrandMark size={72} className="tri-mark" />
                    </div>
                  </div>
                  {[Globe2, Users2, GraduationCap, Code2].map((Icon, index) => {
                    const positions = ['left-[2%] top-[48%]', 'right-[4%] top-[20%]', 'bottom-[5%] left-[28%]', 'right-[11%] bottom-[12%]']
                    return (
                      <motion.span
                        key={index}
                        animate={{ y: [0, index % 2 ? 8 : -8, 0] }}
                        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                        className={`absolute flex size-9 items-center justify-center rounded-xl min-[390px]:size-10 sm:size-12 sm:rounded-2xl border border-slate-200 bg-white text-ava-red shadow-lg ${positions[index]}`}
                      >
                        <Icon size={20} />
                      </motion.span>
                    )
                  })}
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {ecosystemItems.map((item, index) => {
                  const Icon = ecosystemIcons[index]
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="rounded-[26px] border border-slate-200/80 bg-white/70 p-5 shadow-[0_16px_45px_rgba(15,23,42,.06)] backdrop-blur-xl"
                    >
                      <span className="icon-orb"><Icon size={20} /></span>
                      <div className="mt-5 text-lg font-black text-ava-ink">{item.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="rewards" className="section-pad relative bg-[#eef2f6]">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Participation + network model"
              title={<>Plan mechanics, <span className="text-ava-red">shown transparently.</span></>}
              copy="This section visualizes the participation, direct-gain, level-distribution and milestone figures in the supplied plan. All percentages and rewards are source-deck claims and are not promises."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: WalletCards, label: 'Minimum activation', value: '$100', note: 'Entry-liquidity figure presented in the plan.' },
                { icon: LineChart, label: 'Plan-stated daily range', value: '1%-2%', note: 'Illustrative source-deck range; not guaranteed.' },
                { icon: CircleDollarSign, label: 'Direct gain', value: '5%', note: 'Direct-gain figure shown in the plan.' },
                { icon: RefreshCcw, label: 'Participation capacity', value: 'No fixed cap', note: 'Subject to verified terms, risk and legality.' },
              ].map(({ icon: Icon, label, value, note }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="chrome-card rounded-[28px] p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="icon-orb"><Icon size={20} /></span>
                    <span className="rounded-full border border-amber-300/40 bg-amber-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-amber-700">Plan-stated</span>
                  </div>
                  <div className="mt-7 font-display text-4xl font-black uppercase tracking-[-0.04em] text-ava-ink">{value}</div>
                  <div className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-ava-red">{label}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{note}</p>
                </motion.div>
              ))}
            </div>

            <RewardsExplorer />
          </div>
        </section>

        <section id="deck" className="section-pad relative">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Source-deck visual language"
              title={<>Chrome precision. <span className="text-ava-red">Avalanche energy.</span></>}
              copy="The landing page reinterprets the PDF's white-and-silver surfaces, red illumination, condensed typography, circuit motifs, modular panels and 3D engine imagery for responsive web."
            />
            <PlanPreview />
          </div>
        </section>

        <section id="terms" className="section-pad relative overflow-hidden bg-[#0a0d13]">
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(232,65,66,.25)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="section-shell relative">
            <SectionHeading
              eyebrow="Transparency first"
              title={<>Terms must be visible, <span className="text-red-300">not buried.</span></>}
              copy="The source deck includes withdrawal fees, processing windows, earning caps and eligibility conditions. A compliant production launch should verify and clearly disclose every term before collecting any user data or funds."
              light
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: CircleDollarSign, value: '$10', label: 'Minimum withdrawal', copy: 'Minimum eligible amount stated in the plan.' },
                { icon: BarChart3, value: '10%', label: 'Processing fee', copy: 'Admin/service fee stated for withdrawal requests.' },
                { icon: Clock3, value: '24h', label: 'Review window', copy: 'Plan states processing within 24 business hours.' },
                { icon: LockKeyhole, value: '5x / 3x', label: 'Earning caps', copy: 'Working and non-working cap rules shown in the deck.' },
              ].map(({ icon: Icon, value, label, copy }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-[28px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl border border-ava-red/25 bg-ava-red/10 text-red-300"><Icon size={20} /></span>
                  <div className="mt-7 font-display text-4xl font-black text-white">{value}</div>
                  <div className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-red-300">{label}</div>
                  <p className="mt-3 text-sm leading-6 text-white/[0.48]">{copy}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
              <div className="rounded-[30px] border border-amber-300/20 bg-amber-300/[0.07] p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-200">
                    <TriangleAlert size={22} />
                  </span>
                  <div>
                    <div className="text-lg font-black text-white">Risk and compliance notice</div>
                    <p className="mt-3 text-sm leading-7 text-white/[0.55]">
                      Digital-asset participation can result in partial or total loss. Smart-contract, custody, bridge, liquidity, market, regulatory and counterparty risks require independent review. Do not present plan figures as guaranteed returns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[30px] border border-white/10 bg-white/[0.05] p-6 sm:p-7">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/[0.38]">Payment rails shown in source</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['USDT-BEP20', 'USDT-TRC20', 'USDT-AVAX · coming soon'].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-bold text-white/70">{item}</span>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-white/[0.38]">Production support must be confirmed before any payment option is shown as active.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section-pad relative">
          <div className="section-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Before launch"
                title={<>Questions that <span className="text-ava-red">build trust.</span></>}
                copy="Clear limits and implementation notes make the experience stronger than hype alone."
              />
            </div>
            <Faq />
          </div>
        </section>

        <section className="pb-20 sm:pb-24 lg:pb-32">
          <div className="section-shell">
            <div className="dark-console cut-panel relative overflow-hidden rounded-[40px] p-7 sm:p-10 lg:p-14">
              <div className="absolute -right-12 -top-20 size-80 rounded-full bg-ava-red/25 blur-[100px]" />
              <div className="absolute -bottom-28 left-1/4 size-80 rounded-full bg-white/10 blur-[110px]" />
              <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-red-300">
                    <Sparkles size={14} /> Front-end concept ready
                  </span>
                  <h2 className="mt-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                    High-speed UI.<br /><span className="text-red-300">Intelligent experience.</span>
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-white/[0.55]">
                    Responsive React, Tailwind CSS and Framer Motion — designed around the supplied AVAGen plan while keeping production risks and source-deck claims clearly disclosed.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[245px]">
                  <button onClick={() => setAccessOpen(true)} className="btn-primary w-full">
                    Request walkthrough <ArrowUpRight size={17} />
                  </button>
                  <a href="#top" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-ava-ink">
                    Back to top
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-200/80 bg-white/70 py-8 backdrop-blur-xl">
        <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark size={38} />
            <div>
              <div className="font-display text-xl font-black uppercase tracking-[-0.03em] text-ava-ink">AVAGen Club</div>
              <div className="mt-1 text-[9px] font-black uppercase tracking-[0.22em] text-slate-400">Liquidity intelligence concept</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
            <a href="#engine" className="hover:text-ava-red">Engine</a>
            <a href="#rewards" className="hover:text-ava-red">Plan mechanics</a>
            <a href="#terms" className="hover:text-ava-red">Risk disclosure</a>
            <span>© {new Date().getFullYear()} UI concept</span>
          </div>
        </div>
      </footer>

      <ScrollUtility />
      <WaitlistModal open={accessOpen} onClose={() => setAccessOpen(false)} />
    </div>
  )
}

export default App
