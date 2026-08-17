import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { faqs } from '../data/plan'

export default function Faq() {
  const [open, setOpen] = useState(0)
  const rawId = useId().replace(/:/g, '')

  return (
    <div className="divide-y divide-slate-200/80 overflow-hidden rounded-[24px] border border-slate-200 bg-white/75 shadow-chrome backdrop-blur-xl sm:rounded-[30px]">
      {faqs.map((item, index) => {
        const active = open === index
        const triggerId = `${rawId}-faq-trigger-${index}`
        const panelId = `${rawId}-faq-panel-${index}`
        return (
          <div key={item.q}>
            <h3>
              <button
                id={triggerId}
                type="button"
                onClick={() => setOpen(active ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left transition hover:bg-white/60 sm:gap-5 sm:px-7 sm:py-6"
                aria-expanded={active}
                aria-controls={panelId}
              >
                <span className="text-sm font-black leading-6 text-ava-ink sm:text-base">{item.q}</span>
                <motion.span
                  animate={{ rotate: active ? 180 : 0 }}
                  aria-hidden="true"
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition ${active ? 'border-ava-red bg-ava-red text-white' : 'border-slate-200 bg-white text-slate-500'}`}
                >
                  <ChevronDown size={17} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {active ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-6 text-sm leading-7 text-slate-600 sm:px-7">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
