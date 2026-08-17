import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, copy, align = 'left', light = false }) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={centered ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl'}
    >
      <span className={`eyebrow ${light ? '!border-white/[0.15] !bg-white/[0.06] !text-red-300' : ''}`}>{eyebrow}</span>
      <h2 className={`section-title mt-6 ${light ? '!text-white' : ''}`}>{title}</h2>
      {copy ? (
        <p className={`section-copy mt-6 ${centered ? 'mx-auto' : ''} ${light ? '!text-white/60' : ''}`}>{copy}</p>
      ) : null}
    </motion.div>
  )
}
