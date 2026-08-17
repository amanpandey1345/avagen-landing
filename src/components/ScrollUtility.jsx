import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollUtility() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setVisible(window.scrollY > Math.max(520, window.innerHeight * 0.75))
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[60] flex size-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/[0.88] text-ava-ink shadow-chrome backdrop-blur-xl transition hover:-translate-y-1 hover:border-ava-red/30 hover:text-ava-red sm:bottom-6 sm:right-6"
        >
          <ArrowUp size={19} />
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}
