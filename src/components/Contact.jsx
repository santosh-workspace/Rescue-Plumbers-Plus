import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react'
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '../data.js'
import { CopyPhone, Reveal, SectionHeading } from './ui.jsx'

const inputCls =
  'w-full rounded-2xl border border-divider bg-background px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 outline-none transition-all duration-300 focus:border-accent focus:ring-4 focus:ring-accent/15'

export default function Contact() {
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

  return (
    <section id="contact" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          kicker="Contact"
          title="Report an issue or request a free quotation"
          text="Tell us what's wrong and we'll come back to you fast with an honest, no-obligation quote."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info panel */}
          <Reveal className="space-y-4 lg:col-span-2" stagger={0.1}>
            {/* Phone card: call link + click-to-copy */}
            <div
              data-reveal
              className="card-lift flex items-start gap-4 rounded-3xl border border-divider bg-background/70 p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                <Phone className="h-6 w-6 text-accent-dark" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted">Call us 24/7</h3>
                <CopyPhone
                  number={PHONE_DISPLAY}
                  className="mt-0.5 font-display text-lg font-bold text-navy hover:text-accent-dark"
                />
                <p className="mt-0.5 text-sm text-muted">Emergencies answered around the clock</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-white"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
            {[
              {
                icon: Mail,
                title: 'Email us',
                line: EMAIL,
                href: `mailto:${EMAIL}`,
                note: 'For quotes and general enquiries',
              },
              {
                icon: MapPin,
                title: 'Based in Norwich',
                line: 'Norwich, Norfolk, UK',
                note: 'Covering the city and surrounding villages',
              },
              {
                icon: Clock,
                title: 'Opening hours',
                line: 'Open 24 hours, 7 days a week',
                note: 'Including bank holidays',
              },
            ].map(({ icon: IconCmp, title, line, href, note }) => (
              <div
                key={title}
                data-reveal
                className="card-lift flex items-start gap-4 rounded-3xl border border-divider bg-background/70 p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                  <IconCmp className="h-6 w-6 text-accent-dark" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted">{title}</h3>
                  {href ? (
                    <a href={href} className="mt-0.5 block font-display text-lg font-bold text-navy hover:text-accent-dark">
                      {line}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-display text-lg font-bold text-navy">{line}</p>
                  )}
                  <p className="mt-0.5 text-sm text-muted">{note}</p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div data-reveal className="rounded-4xl border border-divider bg-background/60 p-6 shadow-soft sm:p-10">
              {status === 'sent' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
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
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  {/* FormSubmit configuration */}
                  <input type="hidden" name="_subject" value="New enquiry from rescueplumbersplus.co.uk" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy">
                        Your name *
                      </label>
                      <input id="name" name="name" required autoComplete="name" className={inputCls} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy">
                        Phone number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        className={inputCls}
                        placeholder="07xxx xxxxxx"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">
                        Email address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputCls}
                        placeholder="you@example.co.uk"
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className="mb-1.5 block text-sm font-semibold text-navy">
                        Postcode
                      </label>
                      <input
                        id="postcode"
                        name="postcode"
                        autoComplete="postal-code"
                        className={inputCls}
                        placeholder="NR1 …"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-navy">
                      What do you need help with?
                    </label>
                    <select id="subject" name="subject" className={inputCls} defaultValue="Emergency Plumbing">
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
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
                      Your message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      className={inputCls}
                      placeholder="Briefly describe the issue — the more detail, the faster we can help."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="magnetic-btn inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 font-bold text-white shadow-glow disabled:opacity-70 sm:w-auto"
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
                  <p className="text-xs text-muted">
                    * Required. We only use your details to respond to your enquiry — no spam, ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
