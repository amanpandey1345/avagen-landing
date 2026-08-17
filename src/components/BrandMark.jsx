import { useId } from 'react'

export default function BrandMark({ size = 42, className = '', title }) {
  const uid = useId().replace(/:/g, '')
  const gradientA = `ava-mark-a-${uid}`
  const gradientB = `ava-mark-b-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientA} x1="12" y1="11" x2="49" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF696A" />
          <stop offset="0.48" stopColor="#E84142" />
          <stop offset="1" stopColor="#B90F21" />
        </linearGradient>
        <linearGradient id={gradientB} x1="39" y1="34" x2="51" y2="49" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E84142" />
          <stop offset="1" stopColor="#8D0716" />
        </linearGradient>
      </defs>
      <path d="M9 50.2L29.1 11H39.6L53.3 37.6H42.8L34.9 22.2L20.7 50.2H9Z" fill={`url(#${gradientA})`} />
      <path d="M36.2 50.2L43.7 35.9L51.2 50.2H36.2Z" fill={`url(#${gradientB})`} />
      <path d="M24 42.4L34.9 22.2L39.3 30.8L33.1 42.4H24Z" fill="white" fillOpacity="0.9" />
    </svg>
  )
}
