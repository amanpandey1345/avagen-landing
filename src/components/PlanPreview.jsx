import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  ExternalLink,
  FileStack,
  Maximize2,
  MousePointer2,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { deckSlides } from '../data/plan'
import useBodyScrollLock from '../hooks/useBodyScrollLock'

const swipeThreshold = 52

export default function PlanPreview() {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const frameRef = useRef(null)
  const pointerStartRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lightboxRef = useRef(null)
  const slide = deckSlides[active]

  useBodyScrollLock(lightboxOpen)

  const move = useCallback((direction) => {
    setActive((current) => (current + direction + deckSlides.length) % deckSlides.length)
  }, [])

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    pointerStartRef.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event) => {
    const start = pointerStartRef.current
    pointerStartRef.current = null
    if (!start) return

    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y
    if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return
    move(deltaX > 0 ? -1 : 1)
  }

  useEffect(() => {
    const node = frameRef.current
    if (!node) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        move(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        move(1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        setActive(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        setActive(deckSlides.length - 1)
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => node.removeEventListener('keydown', onKeyDown)
  }, [move])

  useEffect(() => {
    if (!lightboxOpen) return undefined

    const previousFocus = document.activeElement
    const panel = lightboxRef.current
    const getFocusable = () => [...(panel?.querySelectorAll('button:not([disabled]), a[href]') || [])]
    window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        move(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        move(1)
      } else if (event.key === 'Tab') {
        const items = getFocusable()
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
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
    }
  }, [lightboxOpen, move])

  const openLightbox = () => {
    setLightboxOpen(true)
  }

  return (
    <div className="plan-preview mt-10 min-w-0 sm:mt-12">
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.34fr)_minmax(300px,.66fr)] lg:gap-6">
        <div className="min-w-0">
          <div
            ref={frameRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Source deck pages"
            className="deck-frame overflow-hidden rounded-[24px] p-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ava-red/20 sm:rounded-[34px] sm:p-3"
          >
            <div
              className="deck-viewport relative aspect-[16/9] touch-pan-y overflow-hidden rounded-[19px] bg-[#e8edf2] sm:rounded-[27px]"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => { pointerStartRef.current = null }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,.98),rgba(226,232,240,.82))]" />
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={slide.image}
                  src={slide.image}
                  alt={`Source deck page ${slide.page}: ${slide.title}`}
                  decoding="async"
                  fetchPriority={active === 0 ? 'high' : 'auto'}
                  draggable="false"
                  initial={{ opacity: 0, scale: 1.025, filter: 'blur(7px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.985, filter: 'blur(4px)' }}
                  transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full select-none object-contain"
                />
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 via-black/[0.04] to-transparent" />

              <div className="absolute left-2.5 right-2.5 top-2.5 flex items-center justify-between gap-2 sm:left-5 sm:right-5 sm:top-5">
                <div className="deck-page-pill">
                  <FileStack size={13} /> Page {slide.page}
                </div>
                <button
                  type="button"
                  onClick={openLightbox}
                  className="deck-tool-button"
                  aria-label={`Open page ${slide.page} in full-screen viewer`}
                >
                  <Maximize2 size={16} />
                  <span className="hidden sm:inline">Expand</span>
                </button>
              </div>

              <button type="button" onClick={() => move(-1)} className="deck-nav deck-nav-left hidden sm:flex" aria-label="Previous deck page">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => move(1)} className="deck-nav deck-nav-right hidden sm:flex" aria-label="Next deck page">
                <ChevronRight size={20} />
              </button>

              <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
                <motion.div
                  className="h-full origin-left bg-ava-red"
                  animate={{ width: `${((active + 1) / deckSlides.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:hidden">
            <button type="button" onClick={() => move(-1)} className="deck-mobile-control justify-self-start" aria-label="Previous deck page">
              <ChevronLeft size={17} /> Prev
            </button>
            <button type="button" onClick={openLightbox} className="deck-mobile-expand" aria-label="Open full-screen slide viewer">
              <Expand size={16} /> Inspect
            </button>
            <button type="button" onClick={() => move(1)} className="deck-mobile-control justify-self-end" aria-label="Next deck page">
              Next <ChevronRight size={17} />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-center text-[9px] font-black uppercase tracking-[0.14em] text-slate-400 sm:hidden">
            <MousePointer2 size={13} className="text-ava-red" /> Swipe the slide or open inspect mode
          </div>
        </div>

        <aside className="chrome-card min-w-0 rounded-[26px] p-5 sm:rounded-[34px] sm:p-7 lg:flex lg:min-h-full lg:flex-col">
          <div className="flex items-center justify-between gap-3">
            <span className="icon-orb"><FileStack size={20} /></span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
              {String(active + 1).padStart(2, '0')} / {String(deckSlides.length).padStart(2, '0')}
            </span>
          </div>

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              aria-live="polite"
              className="min-w-0"
            >
              <div className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-ava-red sm:mt-7 sm:text-xs">Source page {slide.page}</div>
              <h3 className="mt-3 break-words font-display text-[2rem] font-black uppercase leading-[0.94] tracking-[-0.035em] text-ava-ink min-[390px]:text-4xl lg:text-[2.6rem]">
                {slide.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">{slide.copy}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              ['Full', 'No crop'],
              ['Touch', 'Swipe'],
              ['Focus', 'Inspect'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-slate-200/80 bg-white/70 px-2 py-3 text-center shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-[0.12em] text-ava-ink">{value}</div>
                <div className="mt-1 text-[8px] font-black uppercase tracking-[0.12em] text-slate-400">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-1" aria-label="Choose a deck slide">
            {deckSlides.map((item, index) => (
              <button
                type="button"
                key={item.page}
                onClick={() => setActive(index)}
                aria-label={`Open source deck page ${item.page}: ${item.title}`}
                aria-pressed={active === index}
                className="group grid size-8 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ava-red"
              >
                <span className={`block h-2 rounded-full transition-all ${active === index ? 'w-6 bg-ava-red' : 'w-2 bg-slate-200 group-hover:bg-slate-300'}`} />
              </button>
            ))}
          </div>

          <div className="mt-6 hidden items-center gap-2 sm:flex lg:mt-auto lg:pt-7">
            <button type="button" onClick={() => move(-1)} className="btn-secondary !min-h-11 flex-1 !px-3 !py-2 !text-[10px]">
              <ChevronLeft size={16} /> Prev
            </button>
            <button type="button" onClick={() => move(1)} className="btn-primary !min-h-11 flex-1 !px-3 !py-2 !text-[10px]">
              Next <ChevronRight size={16} />
            </button>
          </div>

          <a href="#rewards" className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-ava-red transition hover:gap-3 sm:text-xs">
            Explore plan mechanics <ExternalLink size={15} />
          </a>
        </aside>
      </div>

      <div className="mt-7 sm:mt-8">
        <div className="mb-3 flex items-end justify-between gap-4 sm:mb-4">
          <div>
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-ava-red">Deck index</div>
            <div className="mt-1 text-sm font-black text-ava-ink sm:text-base">Select any source-inspired screen</div>
          </div>
          <div className="hidden text-[9px] font-black uppercase tracking-[0.14em] text-slate-400 sm:block">{deckSlides.length} selected pages</div>
        </div>

        <div className="grid min-w-0 grid-cols-2 gap-3 min-[520px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
          {deckSlides.map((item, index) => (
            <button
              type="button"
              key={item.page}
              onClick={() => setActive(index)}
              aria-current={active === index ? 'true' : undefined}
              className={`group min-w-0 overflow-hidden rounded-[18px] border bg-white p-1.5 text-left transition duration-300 sm:rounded-[22px] sm:p-2 ${
                active === index
                  ? 'border-ava-red shadow-[0_16px_42px_rgba(232,65,66,.16)]'
                  : 'border-slate-200 hover:-translate-y-1 hover:border-ava-red/30 hover:shadow-[0_14px_34px_rgba(15,23,42,.08)]'
              }`}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-slate-100 sm:rounded-[15px]">
                <img src={item.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 border-2 transition ${active === index ? 'border-ava-red/60' : 'border-transparent'}`} />
                <span className={`absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full text-[8px] font-black shadow-sm backdrop-blur-md ${active === index ? 'bg-ava-red text-white' : 'bg-white/85 text-slate-600'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="min-w-0 px-1.5 pb-1.5 pt-2.5 sm:px-2 sm:pb-2 sm:pt-3">
                <div className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-400 sm:text-[9px]">Page {item.page}</div>
                <div className="mt-1 line-clamp-2 text-[11px] font-black leading-tight text-ava-ink sm:text-xs">{item.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[110] flex bg-[#05070b]/[0.96] p-2 backdrop-blur-2xl sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-label={`Expanded source deck page ${slide.page}: ${slide.title}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setLightboxOpen(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              ref={lightboxRef}
              className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0e14] shadow-[0_40px_140px_rgba(0,0,0,.55)] sm:rounded-[32px]"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-red-300"><FileStack size={17} /></span>
                  <div className="min-w-0">
                    <div className="truncate text-[8px] font-black uppercase tracking-[0.18em] text-white/40 sm:text-[9px]">Source deck · page {slide.page}</div>
                    <div className="mt-1 truncate text-xs font-black text-white sm:text-sm">{slide.title}</div>
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white hover:text-ava-ink"
                  aria-label="Close expanded slide viewer"
                >
                  <X size={19} />
                </button>
              </div>

              <div
                className="relative min-h-0 flex-1 touch-pan-y overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,.08),transparent_65%)] p-2 sm:p-5"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => { pointerStartRef.current = null }}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={`lightbox-${slide.image}`}
                    src={slide.image}
                    alt={`Source deck page ${slide.page}: ${slide.title}`}
                    draggable="false"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.32 }}
                    className="h-full w-full select-none object-contain"
                  />
                </AnimatePresence>

                <button type="button" onClick={() => move(-1)} className="deck-lightbox-nav left-2 sm:left-5" aria-label="Previous deck page">
                  <ChevronLeft size={23} />
                </button>
                <button type="button" onClick={() => move(1)} className="deck-lightbox-nav right-2 sm:right-5" aria-label="Next deck page">
                  <ChevronRight size={23} />
                </button>
              </div>

              <div className="shrink-0 border-t border-white/10 px-3 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="line-clamp-2 min-w-0 text-[11px] leading-5 text-white/[0.55] sm:text-sm">{slide.copy}</p>
                  <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white/60">
                    {active + 1} / {deckSlides.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
