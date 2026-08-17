import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import useReducedDataMotion from '../hooks/useReducedDataMotion'

export default function BackgroundFx() {
  const reduceEffects = useReducedDataMotion()
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const smoothX = useSpring(x, { stiffness: 70, damping: 26, mass: 0.7 })
  const smoothY = useSpring(y, { stiffness: 70, damping: 26, mass: 0.7 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    if (reduceEffects || !finePointer.matches) return undefined

    let frame = 0
    let nextX = -500
    let nextY = -500

    const update = () => {
      frame = 0
      x.set(nextX)
      y.set(nextY)
    }

    const handlePointer = (event) => {
      nextX = event.clientX
      nextY = event.clientY
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointer)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [reduceEffects, x, y])

  const background = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, rgba(232,65,66,.10), transparent 72%)`

  return (
    <>
      <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={reduceEffects ? undefined : { background }} />
      <div aria-hidden="true" className="ambient-grid pointer-events-none fixed inset-0 z-0" />
    </>
  )
}
