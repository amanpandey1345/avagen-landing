import { motion } from 'framer-motion'
import useReducedDataMotion from '../hooks/useReducedDataMotion'
import BrandMark from './BrandMark'

const particles = [
  { x: '17%', y: '30%', delay: 0.2, scale: 0.8 },
  { x: '80%', y: '25%', delay: 0.8, scale: 1 },
  { x: '87%', y: '59%', delay: 1.4, scale: 0.7 },
  { x: '67%', y: '83%', delay: 0.5, scale: 0.9 },
  { x: '28%', y: '79%', delay: 1.1, scale: 0.75 },
  { x: '11%', y: '58%', delay: 1.8, scale: 0.62 },
]

const lines = [
  { width: '32%', angle: 8, delay: 0 },
  { width: '36%', angle: 62, delay: 0.7 },
  { width: '31%', angle: 125, delay: 1.3 },
  { width: '34%', angle: 188, delay: 0.4 },
  { width: '36%', angle: 244, delay: 1.6 },
  { width: '31%', angle: 305, delay: 0.9 },
]

export default function EngineCore({ compact = false, decorative = true, className = '' }) {
  const reduceEffects = useReducedDataMotion()

  return (
    <div
      className={`engine-stage ${compact ? 'engine-stage-compact' : ''} ${className}`.trim()}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'HyperGen liquidity intelligence engine visualization'}
      aria-hidden={decorative ? true : undefined}
    >
      <div className="engine-ring ring-a" />
      <div className="engine-ring ring-b" />
      <div className="engine-ring ring-c" />

      {lines.map((line) => (
        <div
          key={line.angle}
          className="engine-data-line"
          style={{ width: line.width, transform: `rotate(${line.angle}deg) translateX(36px)`, animationDelay: `${line.delay}s` }}
        />
      ))}

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.x}-${particle.y}`}
          className="engine-particle"
          style={{ left: particle.x, top: particle.y }}
          animate={
            reduceEffects
              ? undefined
              : {
                  scale: [particle.scale, particle.scale * 1.7, particle.scale],
                  opacity: [0.35, 1, 0.35],
                  y: [0, index % 2 === 0 ? -8 : 8, 0],
                }
          }
          transition={{ duration: 2.8 + index * 0.15, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="engine-core">
        <motion.div
          className="relative z-10"
          animate={reduceEffects ? undefined : { scale: [0.94, 1.04, 0.94], filter: ['brightness(1)', 'brightness(1.16)', 'brightness(1)'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BrandMark size={compact ? 82 : 112} className="tri-mark" />
        </motion.div>
      </div>

      <div className="absolute bottom-[8%] left-1/2 h-8 w-1/2 -translate-x-1/2" aria-hidden="true">
        <motion.div
          className="h-full w-full rounded-full bg-ava-red/[0.15] blur-2xl"
          animate={reduceEffects ? undefined : { scaleX: [0.75, 1.08, 0.75], opacity: [0.28, 0.62, 0.28] }}
          transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
