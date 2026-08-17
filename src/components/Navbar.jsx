import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../data/plan'
import useBodyScrollLock from '../hooks/useBodyScrollLock'
import BrandMark from './BrandMark'

export default function Navbar({ onOpenAccess }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState('#top')
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, restDelta: 0.001 })

  useBodyScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.href.slice(1))
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return undefined

    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.intersectionRatio))
        const current = [...visible.entries()].sort((a, b) => b[1] - a[1]).find(([, ratio]) => ratio > 0.08)
        if (current) setActiveHref(`#${current[0]}`)
      },
      { rootMargin: '-18% 0px -64% 0px', threshold: [0.08, 0.2, 0.4, 0.65] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const previousFocus = document.activeElement
    const panel = menuRef.current
    const focusable = () => [...(panel?.querySelectorAll('a[href], button:not([disabled])') || [])]

    window.requestAnimationFrame(() => focusable()[0]?.focus())

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
    }
  }, [open])

  const openAccessFromMenu = () => {
    setOpen(false)
    onOpenAccess()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <motion.div className="absolute inset-x-0 top-0 h-[2px] origin-left bg-ava-red" style={{ scaleX: progress }} />
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-slate-200/70 bg-white/[0.82] shadow-[0_12px_40px_rgba(15,23,42,.07)] backdrop-blur-2xl'
            : 'bg-white/[0.28] backdrop-blur-sm'
        }`}
      >
        <div className="section-shell flex h-[72px] items-center justify-between gap-4">
          <a href="#top" className="group inline-flex min-w-0 items-center gap-3 rounded-xl" aria-label="AVAGen home">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-ava-red/25 blur-xl transition group-hover:bg-ava-red/40" />
              <BrandMark size={40} className="relative" />
            </div>
            <div className="min-w-0 leading-none">
              <div className="font-display text-[23px] font-black uppercase tracking-[-0.035em] text-ava-ink">AVAGen</div>
              <div className="mt-1 hidden truncate text-[9px] font-bold uppercase tracking-[0.28em] text-slate-500 min-[380px]:block">
                Liquidity Intelligence
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
            {navLinks.map((item) => {
              const active = activeHref === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-full px-2 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] transition ${
                    active ? 'text-ava-red' : 'text-slate-600 hover:text-ava-red'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-2 -bottom-0.5 h-px origin-center bg-ava-red transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <a href="#deck" className="btn-secondary !min-h-10 !px-4 !py-2 !text-[10px]">
              View deck
            </a>
            <button type="button" onClick={onOpenAccess} className="btn-primary !min-h-10 !px-4 !py-2 !text-[10px]">
              Request access <ArrowUpRight size={15} />
            </button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/[0.82] text-ava-ink shadow-sm backdrop-blur-xl transition hover:border-ava-red/30 hover:text-ava-red xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto overscroll-contain bg-ava-ink/[0.56] p-4 backdrop-blur-xl xl:hidden"
            onMouseDown={() => setOpen(false)}
            aria-hidden={false}
          >
            <motion.div
              id="mobile-navigation"
              ref={menuRef}
              initial={{ opacity: 0, y: -18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="chrome-card mx-auto max-w-lg overflow-hidden rounded-[28px] p-4 sm:p-5"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <nav className="grid gap-1" aria-label="Mobile navigation">
                {navLinks.map((item, index) => {
                  const active = activeHref === item.href
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035 }}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-12 items-center justify-between rounded-2xl border px-4 py-3 text-sm font-black uppercase tracking-[0.11em] transition ${
                        active
                          ? 'border-ava-red/20 bg-red-50 text-ava-red'
                          : 'border-transparent text-ava-ink hover:border-ava-red/20 hover:bg-red-50 hover:text-ava-red'
                      }`}
                    >
                      {item.label}
                      <ArrowUpRight size={17} />
                    </motion.a>
                  )
                })}
              </nav>
              <button type="button" onClick={openAccessFromMenu} className="btn-primary mt-4 w-full">
                Request access <ArrowUpRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
