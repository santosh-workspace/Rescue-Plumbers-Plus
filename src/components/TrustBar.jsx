import { ShieldCheck, Users, Clock, ThumbsUp, Droplet } from 'lucide-react'
import { Reveal } from './ui.jsx'

const TICKER = [
  '24/7 Emergency Call-Outs',
  'Free Quotations',
  'Fully Insured',
  'Family Run Business',
  '25+ Years Experience',
  'No Hidden Charges',
  '100% Guaranteed Leak Stop',
]

function Ticker() {
  const row = TICKER.map((t, i) => (
    <span key={i} className="flex items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
      <span className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-widest text-white/90">
        {t}
      </span>
      <Droplet className="h-3.5 w-3.5 shrink-0 text-accent-light/80" aria-hidden="true" />
    </span>
  ))
  return (
    <div className="relative overflow-hidden bg-navy py-3.5" aria-hidden="true">
      <div className="animate-marquee flex w-max">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy to-transparent" />
    </div>
  )
}

const ITEMS = [
  { icon: Users, title: 'Independent & Family Run', text: 'A local Norwich business, not a franchise' },
  { icon: ShieldCheck, title: 'Fully Insured', text: 'Complete peace of mind on every job' },
  { icon: Clock, title: 'Genuine 24/7 Call-Out', text: 'A team member always available' },
  { icon: ThumbsUp, title: 'Free Quotations', text: 'Honest pricing, no hidden charges' },
]

export default function TrustBar() {
  return (
    <section id="trust" className="relative border-b border-divider bg-surface" aria-label="Why customers trust us">
      <Ticker />
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {ITEMS.map(({ icon: IconCmp, title, text }) => (
          <div key={title} data-reveal className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
              <IconCmp className="h-6 w-6 text-accent-dark" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold text-navy">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
