import { Phone, Mail, MapPin, Facebook, Linkedin } from 'lucide-react'
import { AREAS, EMAIL, NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, SERVICES } from '../data.js'

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-28 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src="/rpp-logo.svg" alt="Rescue Plumbers Plus logo" className="h-14 w-14" />
              <p className="font-display text-xl font-extrabold text-white">
                Rescue Plumbers <span className="text-accent">Plus</span>
              </p>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              An independent, family run emergency plumbing company serving Norwich and the surrounding
              areas for over 25 years. Fully insured, available 24/7, and hot on customer service.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/RescuePlumbersPlus/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-accent hover:text-white"
                aria-label="Rescue Plumbers Plus on Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/rescue-plumbers-plus-ltd/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-accent hover:text-white"
                aria-label="Rescue Plumbers Plus on LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              <span className="font-medium text-slate-200">Open now — 24/7 emergency line</span>
            </div>
          </div>

          {/* Services */}
          <nav className="lg:col-span-3" aria-label="Services">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-sm text-slate-400 transition-colors hover:text-accent-light">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links + areas */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-accent-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-wider text-white">Areas</h3>
            <ul className="mt-5 space-y-2.5">
              {AREAS.slice(0, 5).map((a) => (
                <li key={a.name} className="text-sm text-slate-400">
                  {a.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + map */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 transition-colors hover:text-accent-light">
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 transition-colors hover:text-accent-light">
                  <Mail className="h-4 w-4 text-accent" aria-hidden="true" /> {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" /> Norwich, Norfolk, UK
              </li>
            </ul>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Map of Norwich — Rescue Plumbers Plus service area"
                src="https://www.google.com/maps?q=Norwich,+UK&output=embed"
                width="100%"
                height="160"
                style={{ border: 0, filter: 'grayscale(0.4) contrast(1.05)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Rescue Plumbers Plus Ltd. All rights reserved.</p>
          <p>
            24/7 Emergency Plumbers in Norwich ·{' '}
            <a href={`tel:${PHONE_TEL}`} className="text-slate-400 hover:text-accent-light">
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
