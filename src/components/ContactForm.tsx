'use client'

import { useState } from 'react'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { Messages } from '@/lib/i18n'

/* ── Types ─────────────────────────────────────────────────────── */
type FormState = 'idle' | 'sending' | 'success' | 'error'

interface FormData {
  name: string; company: string; email: string
  phone: string; subject: string; message: string
}

const initialData: FormData = {
  name: '', company: '', email: '', phone: '', subject: '', message: '',
}

/* ── Tokens visuels partagés ────────────────────────────────────── */
const INPUT_BASE = [
  'w-full font-body text-sm text-ink',
  'bg-primary-50/40 border border-primary-200/60',
  'rounded-xl px-4 py-3.5',
  'transition-all duration-200 ease-smooth',
  'hover:border-primary-300/80 hover:bg-primary-50/70',
  'placeholder:text-muted/35',
  'focus:outline-none focus:border-gold/50 focus:bg-white focus:ring-2 focus:ring-gold/[0.10]',
].join(' ')

const INPUT_ERR = [
  'border-red-300/60 bg-red-50/25',
  'hover:border-red-300/80',
  'focus:border-red-400/70 focus:ring-red-500/[0.08]',
].join(' ')

const LABEL_BASE =
  'block font-body text-[10.5px] tracking-[0.10em] uppercase font-semibold text-navy/55 mb-2'

/* ── Variants carte ─────────────────────────────────────────────── */
const CARD: Record<'premium' | 'compact', string> = {
  premium: [
    'bg-gradient-to-br from-white via-white to-primary-50/25',
    'rounded-2xl border border-primary-100 shadow-premium',
  ].join(' '),
  compact: 'bg-white rounded-xl border border-black/[0.08] shadow-card',
}

/* ── Props ──────────────────────────────────────────────────────── */
export interface ContactFormProps {
  t: Messages['contact']['form']
  /** premium → page contact (rounded-2xl, shadow multicouche)
   *  compact  → pages services (rounded-xl, ombre légère) */
  variant?: 'premium' | 'compact'
}

/* ── Composant principal ────────────────────────────────────────── */
export function ContactForm({ t, variant = 'premium' }: ContactFormProps) {
  const [data, setData]       = useState<FormData>(initialData)
  const [errors, setErrors]   = useState<Partial<FormData>>({})
  const [formState, setFormState] = useState<FormState>('idle')

  function validate(): boolean {
    const e: Partial<FormData> = {}
    if (!data.name.trim()) e.name = t.errors.name
    if (!data.email.trim()) {
      e.email = t.errors.email
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = t.errors.emailInvalid
    }
    if (!data.subject.trim()) e.subject = t.errors.subject
    if (!data.message.trim()) e.message = t.errors.message
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // MODIFIED: Real API submission via /api/contact (Resend)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setFormState('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setFormState('success')
        setData(initialData)
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const padding = variant === 'premium' ? 'p-8 sm:p-12' : 'p-6 sm:p-8'

  /* État erreur */
  if (formState === 'error') {
    return (
      <div className={cn(CARD[variant], 'p-10 sm:p-14 text-center')}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-500 mb-6">
          <Icon name="close" size={22} strokeWidth={2.5} />
        </div>
        <h3 className="font-body text-xl font-semibold text-navy mb-3">{t.errorTitle}</h3>
        <p className="font-body text-muted text-sm leading-relaxed max-w-xs mx-auto">
          {t.errorMsg}
        </p>
        <button onClick={() => setFormState('idle')} className="btn-outline mt-8">
          {t.retry}
        </button>
      </div>
    )
  }

  /* État succès */
  if (formState === 'success') {
    return (
      <div className={cn(CARD[variant], 'p-10 sm:p-14 text-center')}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/[0.08] text-gold mb-6">
          <Icon name="check" size={22} strokeWidth={2.5} />
        </div>
        <h3 className="font-body text-xl font-semibold text-navy mb-3">{t.successTitle}</h3>
        <p className="font-body text-muted text-sm leading-relaxed max-w-xs mx-auto">{t.successMsg}</p>
        <button onClick={() => setFormState('idle')} className="btn-outline mt-8">
          {t.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      suppressHydrationWarning
      className={cn(CARD[variant], padding)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">

        {/* Rangée 1 */}
        <Field id="name"    label={t.fullName} type="text"  name="name"    autoComplete="name"         value={data.name}    onChange={handleChange} error={errors.name}    placeholder={t.placeholders.name}    />
        <Field id="company" label={t.company}  type="text"  name="company" autoComplete="organization" value={data.company} onChange={handleChange} error={errors.company} placeholder={t.placeholders.company} />

        {/* Rangée 2 */}
        <Field id="email" label={t.email} type="email" name="email" autoComplete="email" value={data.email} onChange={handleChange} error={errors.email} placeholder={t.placeholders.email} />
        <Field id="phone" label={t.phone} type="tel"   name="phone" autoComplete="tel"   value={data.phone} onChange={handleChange} error={errors.phone} placeholder={t.placeholders.phone} />

        {/* Sujet */}
        <div className="sm:col-span-2">
          <label htmlFor="subject" className={LABEL_BASE}>{t.subject}</label>
          <div className="relative">
            <select
              id="subject" name="subject" value={data.subject} onChange={handleChange}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              className={cn(
                INPUT_BASE,
                'appearance-none pr-10 cursor-pointer',
                data.subject === '' ? 'text-muted/40' : 'text-ink',
                errors.subject ? INPUT_ERR : ''
              )}
            >
              <option value="">{t.subjectDefault}</option>
              <option value="comptabilite">{t.subjects.accounting}</option>
              <option value="rh">{t.subjects.hr}</option>
              <option value="admin">{t.subjects.admin}</option>
              <option value="immobilier">{t.subjects.realestate}</option>
              <option value="autre">{t.subjects.other}</option>
            </select>
            <span
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/45"
              aria-hidden="true"
            >
              <Icon name="chevron" size={14} strokeWidth={2} className="rotate-90" />
            </span>
          </div>
          <FieldError id="subject-error" message={errors.subject} />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className={LABEL_BASE}>{t.message}</label>
          <textarea
            id="message" name="message" rows={5} value={data.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            placeholder={t.placeholders.message}
            className={cn(INPUT_BASE, 'resize-none', errors.message ? INPUT_ERR : '')}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      {/* Pied */}
      <div className="flex items-center justify-between border-t border-primary-100/70 pt-6 mt-6 gap-4 flex-wrap">
        <p className="font-body text-[10.5px] tracking-[0.08em] uppercase text-muted/50">{t.required}</p>
        <button
          type="submit"
          disabled={formState === 'sending'}
          className={cn(
            'btn-primary active:translate-y-0 active:shadow-none',
            formState === 'sending' && 'opacity-70 cursor-not-allowed'
          )}
        >
          {formState === 'sending' ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              {t.submitting}
            </>
          ) : (
            <>
              {t.submit}
              <Icon name="arrow" size={16} strokeWidth={2} />
            </>
          )}
        </button>
      </div>
    </form>
  )
}

/* ── FieldError — hauteur réservée, zéro layout shift ─────────── */
function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div className="mt-1.5 h-4" role="alert" aria-live="polite">
      {message && (
        <p id={id} className="text-[11px] text-red-500/85 font-body leading-none">{message}</p>
      )}
    </div>
  )
}

/* ── Field input réutilisable ───────────────────────────────────── */
interface FieldProps {
  id: string; label: string; type: string; name: string
  autoComplete?: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string; placeholder?: string
}

function Field({ id, label, type, name, autoComplete, value, onChange, error, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_BASE}>{label}</label>
      <input
        id={id} type={type} name={name} autoComplete={autoComplete}
        value={value} onChange={onChange} placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(INPUT_BASE, error ? INPUT_ERR : '')}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}
