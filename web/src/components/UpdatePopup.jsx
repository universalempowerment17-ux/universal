import { useEffect, useState } from 'react'
import InquiryForm from './InquiryForm'

const STORAGE_KEY = 'uef_update_popup_dismissed'

function isDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function dismissPopup() {
  try {
    sessionStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // ignore
  }
}

export default function UpdatePopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isDismissed()) {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    const handleOpenPopup = () => {
      setVisible(true)
    }

    window.addEventListener('uef:open-volunteer-form', handleOpenPopup)

    return () => window.removeEventListener('uef:open-volunteer-form', handleOpenPopup)
  }, [])

  const close = () => {
    dismissPopup()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-popup-title"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <InquiryForm
          mode="volunteer"
          title="Become a Volunteer"
          subtitle="Share your details and we’ll send them directly to our WhatsApp admin."
          submitLabel="Send on WhatsApp"
          onSuccess={() => {
            setVisible(false)
            dismissPopup()
          }}
          onCancel={close}
          showCancel
        />
      </div>
    </div>
  )
}
