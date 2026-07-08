import { Phone, ArrowUpRight } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL } from '../data.js'
import { Reveal } from './ui.jsx'

export default function EmergencyCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28" aria-label="Emergency call to action">
      <div
        className="animate-drift absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="animate-drift absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/10 blur-[100px] [animation-delay:-5s]"
        aria-hidden="true"
      />
      <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />
      {/* Falling water drops */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3" aria-hidden="true">
        {[
          { left: '12%', delay: '0s', dur: '7.5s', size: 8 },
          { left: '48%', delay: '3s', dur: '8.5s', size: 6 },
          { left: '86%', delay: '1.5s', dur: '7s', size: 9 },
        ].map((d, i) => (
          <svg
            key={i}
            className="drop"
            style={{ left: d.left, animationDelay: d.delay, animationDuration: d.dur }}
            width={d.size}
            height={d.size * 1.4}
            viewBox="0 0 10 14"
          >
            <path d="M5 0C5 4 0 7 0 10a5 4 0 0 0 10 0C10 7 5 4 5 0Z" fill="rgba(125,211,252,0.45)" />
          </svg>
        ))}
      </div>
      <Reveal className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p data-reveal className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-light">
          Available right now · 365 days a year
        </p>
        <h2
          data-reveal
          className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
        >
          Need an Emergency Plumber <span className="text-shimmer">Right Now?</span>
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
          Don't let a burst pipe or broken boiler wait. A member of our team is ready to take your call —
          day or night.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${PHONE_TEL}`}
            className="magnetic-btn ring-pulse inline-flex items-center gap-3 rounded-full bg-accent px-9 py-5 text-lg font-extrabold text-white shadow-glow"
          >
            <Phone className="h-6 w-6" aria-hidden="true" />
            Call Now · {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="magnetic-btn glass-dark inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold text-white"
          >
            Request Free Quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
