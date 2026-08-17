import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Mail, ShieldCheck, UserRound, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import useBodyScrollLock from '../hooks/useBodyScrollLock'
import BrandMark from './BrandMark'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function WaitlistModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', role: 'Community member' })
  const dialogRef = useRef(null)
  const nameRef = useRef(null)
  const previousFocusRef = useRef(null)
  const rawId = useId().replace(/:/g, '')
  const titleId = `access-title-${rawId}`
  const descriptionId = `access-description-${rawId}`
  const errorId = `access-error-${rawId}`

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return undefined

    previousFocusRef.current = document.activeElement
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 50)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll(focusableSelector)].filter(
        (node) => !node.hasAttribute('hidden') && node.getAttribute('aria-hidden') !== 'true',
      )
      if (focusable.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) return undefined
    const timer = window.setTimeout(() => {
      setSubmitted(false)
      setError('')
    }, 250)
    return () => window.clearTimeout(timer)
  }, [open])

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    if (error) setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    const normalized = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
    }

    if (!normalized.name || !normalized.email) {
      setError('Please enter a valid name and email address.')
      return
    }

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    try {
      const stored = JSON.parse(window.localStorage.getItem('avagen-access-requests') || '[]')
      const requests = Array.isArray(stored) ? stored : []
      requests.push({ ...normalized, createdAt: new Date().toISOString() })
      window.localStorage.setItem('avagen-access-requests', JSON.stringify(requests.slice(-20)))
    } catch {
      // The demo remains usable when browser storage is blocked or full.
    }

    setForm(normalized)
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-ava-ink/[0.68] p-3 backdrop-blur-xl sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 270, damping: 25 }}
            className="chrome-card my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-[26px] outline-none sm:max-h-[calc(100dvh-2rem)] sm:rounded-[34px]"
          >
            <div className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-red-50 p-5 sm:p-8">
              <div className="absolute -right-16 -top-16 size-52 rounded-full bg-ava-red/[0.15] blur-3xl" />
              <div className="relative z-10 flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <BrandMark size={42} className="shrink-0 sm:size-[46px]" />
                  <div className="min-w-0">
                    <div className="truncate font-display text-xl font-black uppercase tracking-[-0.03em] text-ava-ink min-[390px]:text-2xl">AVAGen Club</div>
                    <div className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-ava-red min-[390px]:text-[9px] min-[390px]:tracking-[0.24em]">Access request</div>
                  </div>
                </div>
                <button type="button" onClick={onClose} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 transition hover:border-ava-red/30 hover:text-ava-red" aria-label="Close access form">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-5 text-center sm:py-6" aria-live="polite">
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={30} />
                  </span>
                  <h2 id={titleId} className="mt-6 font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-ava-ink min-[390px]:text-4xl">Request saved</h2>
                  <p id={descriptionId} className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
                    This front-end demo stores the request only in this browser. Connect the form to a verified backend or CRM before production launch.
                  </p>
                  <button type="button" onClick={onClose} className="btn-primary mt-7">Done</button>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 id={titleId} className="font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-ava-ink min-[390px]:text-4xl">Request project access</h2>
                  <p id={descriptionId} className="mt-3 text-sm leading-6 text-slate-600">
                    Share basic details for a product walkthrough. No wallet connection or payment is requested in this demo.
                  </p>

                  <div className="mt-6 grid gap-4 sm:mt-7">
                    <div>
                      <label htmlFor={`name-${rawId}`} className="text-xs font-black uppercase tracking-[0.13em] text-slate-500">Name</label>
                      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 focus-within:border-ava-red focus-within:ring-4 focus-within:ring-ava-red/10">
                        <UserRound size={18} className="shrink-0 text-slate-400" />
                        <input
                          ref={nameRef}
                          id={`name-${rawId}`}
                          name="name"
                          autoComplete="name"
                          required
                          value={form.name}
                          onChange={updateField('name')}
                          aria-describedby={error ? errorId : undefined}
                          className="h-12 min-w-0 flex-1 bg-transparent py-3 text-base text-ava-ink outline-none placeholder:text-slate-300 sm:text-sm"
                          placeholder="Your name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`email-${rawId}`} className="text-xs font-black uppercase tracking-[0.13em] text-slate-500">Email</label>
                      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 focus-within:border-ava-red focus-within:ring-4 focus-within:ring-ava-red/10">
                        <Mail size={18} className="shrink-0 text-slate-400" />
                        <input
                          id={`email-${rawId}`}
                          name="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          required
                          value={form.email}
                          onChange={updateField('email')}
                          aria-describedby={error ? errorId : undefined}
                          className="h-12 min-w-0 flex-1 bg-transparent py-3 text-base text-ava-ink outline-none placeholder:text-slate-300 sm:text-sm"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`role-${rawId}`} className="text-xs font-black uppercase tracking-[0.13em] text-slate-500">Primary interest</label>
                      <select id={`role-${rawId}`} name="role" autoComplete="off" value={form.role} onChange={updateField('role')} className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-ava-ink outline-none transition focus:border-ava-red focus:ring-4 focus:ring-ava-red/10 sm:text-sm">
                        <option>Community member</option>
                        <option>Builder / developer</option>
                        <option>Product partner</option>
                        <option>Compliance reviewer</option>
                        <option>General enquiry</option>
                      </select>
                    </div>
                  </div>

                  {error ? <p id={errorId} role="alert" className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">{error}</p> : null}

                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:mt-6">
                    <ShieldCheck size={18} className="mt-0.5 shrink-0 text-amber-600" />
                    <p className="text-xs leading-5 text-amber-800">Do not submit seed phrases, private keys, identity documents or payment information through an unverified landing page.</p>
                  </div>

                  <button type="submit" className="btn-primary mt-6 w-full">Save demo request</button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
