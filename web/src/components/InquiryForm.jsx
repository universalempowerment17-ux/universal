import { useState } from 'react'
import { openContactWhatsApp, openVolunteerWhatsApp, whatsappConfigured } from '../lib/submitForm'

const MAX_NAME_LENGTH = 25
const MAX_PHONE_LENGTH = 10
const MAX_EMAIL_LENGTH = 80
const MAX_MESSAGE_LENGTH = 150
const MAX_SUBMISSIONS_PER_SESSION = 3
const SESSION_SUBMISSION_KEY = 'uef_form_submissions_this_session'

function getSessionSubmissionCount() {
  try {
    const stored = Number(sessionStorage.getItem(SESSION_SUBMISSION_KEY) || '0')
    return Number.isFinite(stored) ? stored : 0
  } catch {
    return 0
  }
}

function incrementSessionSubmissionCount() {
  try {
    const nextCount = getSessionSubmissionCount() + 1
    sessionStorage.setItem(SESSION_SUBMISSION_KEY, String(nextCount))
    return nextCount
  } catch {
    return 0
  }
}

export default function InquiryForm({
  mode = 'volunteer',
  title,
  subtitle,
  submitLabel,
  onSuccess,
  onCancel,
  showCancel = false,
  variant = 'default',
}) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const next = {}
    const trimmedName = form.name.trim()
    const trimmedPhone = form.phone.trim()
    const trimmedEmail = form.email.trim()
    const trimmedMessage = form.message.trim()

    if (!trimmedName) next.name = 'Name is required'
    else if (trimmedName.length > MAX_NAME_LENGTH) next.name = `Name must be at most ${MAX_NAME_LENGTH} characters`

    if (!trimmedPhone) {
      next.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(trimmedPhone.replace(/\s/g, ''))) {
      next.phone = 'Enter a valid 10-digit phone number'
    }

    if (trimmedEmail) {
      if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
        next.email = `Email must be at most ${MAX_EMAIL_LENGTH} characters`
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        next.email = 'Enter a valid email address'
      }
    }

    if (!trimmedMessage) next.message = 'Message is required'
    else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      next.message = `Message must be at most ${MAX_MESSAGE_LENGTH} characters`
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    const currentCount = getSessionSubmissionCount()
    if (currentCount >= MAX_SUBMISSIONS_PER_SESSION) {
      setSubmitError(`You can submit only ${MAX_SUBMISSIONS_PER_SESSION} times in one session.`)
      return
    }

    if (!whatsappConfigured) {
      setSubmitError('WhatsApp is not set up yet. Please add the admin number in your .env file.')
      return
    }

    try {
      setSubmitting(true)
      setSubmitError('')

      if (mode === 'contact') {
        openContactWhatsApp(form)
      } else {
        openVolunteerWhatsApp(form)
      }

      incrementSessionSubmissionCount()
      onSuccess?.()
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const containerClassName =
    variant === 'contact'
      ? 'space-y-5'
      : 'space-y-4'

  const inputClassName =
    variant === 'contact'
      ? 'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15'
      : 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

  const labelClassName =
    variant === 'contact'
      ? 'block text-xs font-bold uppercase tracking-[0.18em] text-slate-500'
      : 'block text-sm font-medium text-slate-700'

  const errorClassName =
    variant === 'contact'
      ? 'mt-2 text-xs text-red-600'
      : 'mt-1 text-xs text-red-600'

  const buttonClassName =
    variant === 'contact'
      ? 'inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60'
      : 'inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60'

  return (
    <div>
      {title ? <h2 className="text-xl font-bold text-primary">{title}</h2> : null}
      {subtitle ? <p className={title ? 'mt-2 text-sm text-slate-600' : 'text-sm text-slate-600'}>{subtitle}</p> : null}

      <form onSubmit={handleSubmit} className={title || subtitle ? `mt-6 ${containerClassName}` : containerClassName}>
        <div className={variant === 'contact' ? 'grid gap-5 sm:grid-cols-2' : 'space-y-4'}>
          <div>
            <label htmlFor={`${mode}-name`} className={labelClassName}>
              Name
            </label>
            <input
              id={`${mode}-name`}
              type="text"
              maxLength={MAX_NAME_LENGTH}
              autoComplete="name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className={inputClassName}
              placeholder="Your name"
            />
            {errors.name && <p className={errorClassName}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor={`${mode}-phone`} className={labelClassName}>
              Phone Number
            </label>
            <input
              id={`${mode}-phone`}
              type="tel"
              maxLength={MAX_PHONE_LENGTH}
              inputMode="numeric"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              className={inputClassName}
              placeholder="10-digit mobile number"
            />
            {errors.phone && <p className={errorClassName}>{errors.phone}</p>}
          </div>
        </div>

        <div className={variant === 'contact' ? 'grid gap-5 sm:grid-cols-2' : 'space-y-4'}>
          <div>
            <label htmlFor={`${mode}-email`} className={labelClassName}>
              Email
            </label>
            <input
              id={`${mode}-email`}
              type="email"
              maxLength={MAX_EMAIL_LENGTH}
              autoComplete="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className={inputClassName}
              placeholder="you@example.com"
            />
            {errors.email && <p className={errorClassName}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor={`${mode}-message`} className={labelClassName}>
              Message
            </label>
            <textarea
              id={`${mode}-message`}
              rows={variant === 'contact' ? '6' : '5'}
              maxLength={MAX_MESSAGE_LENGTH}
              autoComplete="off"
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              className={inputClassName}
              placeholder="Write your message here"
            />
            {errors.message && <p className={errorClassName}>{errors.message}</p>}
          </div>
        </div>

        {submitError && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}

        <div className={variant === 'contact' ? 'pt-2' : 'flex flex-col gap-3 pt-2 sm:flex-row'}>
          <button type="submit" disabled={submitting} className={buttonClassName}>
            {submitting ? 'Sending...' : submitLabel}
          </button>

          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="w-full rounded-2xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 sm:w-auto sm:flex-1"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
