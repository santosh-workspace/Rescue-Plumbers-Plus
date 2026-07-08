import { useEffect } from 'react'
import { X } from 'lucide-react'
import QuoteForm from './QuoteForm.jsx'

/** Popup dialog with the quote request form. Full-screen sheet on mobile, centered card on desktop. */
export default function QuoteModal({ open, onClose }) {
  // Lock page scroll while open + close on Escape
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Request a free quote"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close quote form"
        tabIndex={-1}
      />
      {/* Panel */}
      <div className="relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-surface shadow-lift sm:max-h-[90dvh] sm:w-[min(92vw,30rem)] sm:rounded-3xl lg:w-[min(88vw,34rem)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-divider bg-surface/95 px-5 py-3.5 backdrop-blur sm:px-6 lg:px-8">
          <h3 className="font-display text-base font-extrabold text-navy sm:text-lg">Request a Free Quote</h3>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-divider hover:text-navy"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 lg:pt-5">
          <QuoteForm compact idPrefix="qm" />
        </div>
      </div>
    </div>
  )
}
