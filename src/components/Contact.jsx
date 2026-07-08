import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '../data.js'
import { CopyPhone, Reveal, SectionHeading } from './ui.jsx'
import QuoteForm from './QuoteForm.jsx'

export default function Contact() {
  return (
    <section id="contact" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          kicker="Contact"
          title="Report an issue or request a free quotation"
          text="Tell us what's wrong and we'll come back to you fast with an honest, no-obligation quote."
        />

        <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-5">
          {/* Info panel */}
          <Reveal className="space-y-4 lg:col-span-2" stagger={0.1}>
            {/* Phone card: call link + click-to-copy */}
            <div
              data-reveal
              className="card-lift flex items-start gap-3.5 rounded-3xl border border-divider bg-background/70 p-4 sm:gap-4 sm:p-6"
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
                className="card-lift flex items-start gap-3.5 rounded-3xl border border-divider bg-background/70 p-4 sm:gap-4 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
                  <IconCmp className="h-6 w-6 text-accent-dark" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted">{title}</h3>
                  {href ? (
                    <a
                      href={href}
                      className="mt-0.5 block break-all font-display text-base font-bold text-navy hover:text-accent-dark sm:text-lg"
                    >
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
            <div data-reveal className="rounded-3xl border border-divider bg-background/60 p-4 shadow-soft sm:rounded-4xl sm:p-6 md:p-8 lg:p-10">
              <QuoteForm idPrefix="qc" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
