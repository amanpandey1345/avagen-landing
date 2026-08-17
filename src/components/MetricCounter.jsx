import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import useReducedDataMotion from '../hooks/useReducedDataMotion'

export default function MetricCounter({ value, prefix = '', suffix = '', decimals = 0, label, note, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const reduceEffects = useReducedDataMotion()
  const [display, setDisplay] = useState(reduceEffects ? value : 0)

  useEffect(() => {
    if (!inView) return undefined
    if (reduceEffects) {
      setDisplay(value)
      return undefined
    }
    const controls = animate(0, value, {
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return controls.stop
  }, [inView, reduceEffects, value])

  const formatted = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(display)

  return (
    <motion.div
      ref={ref}
      initial={reduceEffects ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
      className={`chrome-card rounded-[24px] p-5 sm:rounded-[26px] sm:p-6 ${className}`}
    >
      <div className="break-words font-display text-4xl font-black uppercase tracking-[-0.04em] text-ava-ink sm:text-5xl">
        {prefix}{formatted}{suffix}
      </div>
      <div className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-ava-red sm:text-xs sm:tracking-[0.18em]">{label}</div>
      {note ? <p className="mt-3 text-sm leading-6 text-slate-500">{note}</p> : null}
    </motion.div>
  )
}
