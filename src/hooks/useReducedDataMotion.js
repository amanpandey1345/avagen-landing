import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Combines the OS reduced-motion preference with the browser data-saving hint.
 * Decorative loops can use this to pause themselves on constrained devices.
 */
export default function useReducedDataMotion() {
  const reducedMotion = useReducedMotion()
  const [saveData, setSaveData] = useState(false)

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (!connection) return undefined

    const update = () => setSaveData(Boolean(connection.saveData))
    update()
    connection.addEventListener?.('change', update)
    return () => connection.removeEventListener?.('change', update)
  }, [])

  return Boolean(reducedMotion || saveData)
}
