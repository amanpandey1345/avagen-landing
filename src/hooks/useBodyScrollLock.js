import { useEffect } from 'react'

let activeLocks = 0
let previousOverflow = ''
let previousPaddingRight = ''

/**
 * Locks page scrolling without causing a layout jump. A small reference counter
 * keeps overlapping overlays (mobile navigation + modal) from unlocking each
 * other accidentally.
 */
export default function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return undefined

    const body = document.body

    if (activeLocks === 0) {
      previousOverflow = body.style.overflow
      previousPaddingRight = body.style.paddingRight

      const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
      body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`
      body.dataset.scrollLocked = 'true'
    }

    activeLocks += 1

    return () => {
      activeLocks = Math.max(0, activeLocks - 1)
      if (activeLocks === 0) {
        body.style.overflow = previousOverflow
        body.style.paddingRight = previousPaddingRight
        delete body.dataset.scrollLocked
      }
    }
  }, [locked])
}
