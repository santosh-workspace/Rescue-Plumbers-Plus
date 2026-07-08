import { STATS } from '../data.js'
import { CountUp, Reveal } from './ui.jsx'

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20" aria-label="Company statistics">
      <div
        className="absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
        aria-hidden="true"
      />
      <Reveal className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        {STATS.map((s) => (
          <div key={s.label} data-reveal className="text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {s.value !== null ? <CountUp end={s.value} suffix={s.suffix} /> : s.display}
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-400">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
