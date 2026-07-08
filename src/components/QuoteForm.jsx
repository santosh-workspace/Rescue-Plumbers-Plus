import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '../data.js'

const baseInput =
  'w-full min-w-0 border border-divider bg-background text-ink placeholder:text-muted/70 outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/15'

/** Quote request form — used inline in the Contact section and inside the popup modal (compact). */
export default function QuoteForm({ compact = false, idPrefix = 'qf' }) {
  const fid = (n) => `${idPrefix}-${n}`
  // text-base on mobile prevents iOS zoom-on-focus; compact = smaller paddings everywhere
  const inputCls = compact
    ? `${baseInput} rounded-xl px-3.5 py-2.5 text-base sm:text-sm`
    : `${baseInput} rounded-2xl px-4 py-3 text-base sm:py-3.5 sm:text-sm`
  const labelCls = compact
    ? 'mb-1 block text-xs font-semibold text-navy'
    : 'mb-1.5 block text-sm font-semibold text-navy'
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('sent')
    } catch {
      // Fallback: open the visitor's email client with the message pre-filled
      const f = new FormData(form)
      const body = encodeURIComponent(
        `Name: ${f.get('name')}\nPhone: ${f.get('phone')}\nEmail: ${f.get('email')}\nPostcode: ${f.get('postcode') || '-'}\n\n${f.get('message')}`
      )
      const subject = encodeURIComponent(`Website enquiry: ${f.get('subject')}`)
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setStatus('sent')
    }
  }

  if (status === 'sent') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${compact ? 'min-h-[300px]' : 'min-h-[420px]'}`}>
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-navy">Message received!</h3>
        <p className="mt-3 max-w-sm text-muted">
          Thanks for getting in touch. A member of the team will come back to you shortly. For
          emergencies, call us now on{' '}
          <a href={`tel:${PHONE_TEL}`} className="font-bold text-accent-dark">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'space-y-3' : 'space-y-4 sm:space-y-5'}>
      {/* FormSubmit configuration */}
      <input type="hidden" name="_subject" value="New enquiry from rescueplumbersplus.co.uk" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
      <div className={compact ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-4 sm:grid-cols-2 sm:gap-5'}>
        <div>
          <label htmlFor={fid('name')} className={labelCls}>
            Your name *
          </label>
          <input id={fid('name')} name="name" required autoComplete="name" className={inputCls} placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor={fid('phone')} className={labelCls}>
            Phone number *
          </label>
          <input
            id={fid('phone')}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputCls}
            placeholder="07xxx xxxxxx"
          />
        </div>
      </div>
      <div className={compact ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-4 sm:grid-cols-2 sm:gap-5'}>
        <div>
          <label htmlFor={fid('email')} className={labelCls}>
            Email address *
          </label>
          <input
            id={fid('email')}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            placeholder="you@example.co.uk"
          />
        </div>
        <div>
          <label htmlFor={fid('postcode')} className={labelCls}>
            Postcode
          </label>
          <input
            id={fid('postcode')}
            name="postcode"
            autoComplete="postal-code"
            className={inputCls}
            placeholder="NR1 …"
          />
        </div>
      </div>
      <div>
        <label htmlFor={fid('subject')} className={labelCls}>
          What do you need help with?
        </label>
        <select id={fid('subject')} name="subject" className={inputCls} defaultValue="Emergency Plumbing">
          {[
            'Emergency Plumbing',
            'Boiler Repair / Service',
            'Leak Detection',
            'Blocked Drains',
            'Bathroom Plumbing',
            'General Plumbing',
            'Commercial Enquiry',
            'Something else',
          ].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={fid('message')} className={labelCls}>
          Your message *
        </label>
        <textarea
          id={fid('message')}
          name="message"
          rows={compact ? '3' : '4'}
          required
          className={inputCls}
          placeholder="Briefly describe the issue — the more detail, the faster we can help."
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`magnetic-btn inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent font-bold text-white shadow-glow disabled:opacity-70 sm:w-auto ${
          compact ? 'px-6 py-3 text-sm' : 'px-8 py-4'
        }`}
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" /> Request Free Quote
          </>
        )}
      </button>
      <p className={compact ? 'text-[11px] leading-snug text-muted' : 'text-xs text-muted'}>
        * Required. We only use your details to respond to your enquiry — no spam, ever.
      </p>
    </form>
  )
}
