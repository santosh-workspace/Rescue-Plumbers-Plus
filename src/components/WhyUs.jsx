import { Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL, WHY_US } from '../data.js'
import { CopyPhone, Icon, Reveal, SectionHeading } from './ui.jsx'

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          kicker="Why Choose Us"
          title="An independent family firm that answers the phone"
          text="Rescue Plumbers Plus was built on a simple promise: make a difference from the moment you pick up the phone to the moment we leave your home."
        />
        <Reveal className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {WHY_US.map((f) => (
            <article
              key={f.title}
              data-reveal
              className="card-lift rounded-3xl border border-divider bg-background/70 p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy">
                <Icon name={f.icon} className="icon-wiggle h-6 w-6 text-accent-light" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </article>
          ))}
        </Reveal>

        {/* Copyable phone number strip */}
        <Reveal className="mt-12">
          <div
            data-reveal
            className="shine-sweep relative mx-auto max-w-3xl overflow-hidden rounded-4xl bg-navy px-6 py-9 text-center shadow-lift sm:px-10"
          >
            <div
              className="animate-drift absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/25 blur-[70px]"
              aria-hidden="true"
            />
            <div
              className="animate-drift absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-accent/15 blur-[70px] [animation-delay:-4s]"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center justify-center gap-5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">
                  Lines open now — save our number
                </p>
              </div>
              <CopyPhone
                number={PHONE_DISPLAY}
                className="font-display text-3xl font-extrabold tracking-tight text-white transition-colors hover:text-accent-light sm:text-5xl"
              />
              <p className="text-sm text-slate-400">Click the number to copy it to your clipboard</p>
              <a
                href={`tel:${PHONE_TEL}`}
                className="magnetic-btn ring-pulse inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-glow"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> Call now — free quote
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
