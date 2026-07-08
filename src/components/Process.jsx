import { PROCESS } from '../data.js'
import { Icon, Reveal, SectionHeading } from './ui.jsx'

export default function Process() {
  return (
    <section id="process" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          kicker="How It Works"
          title="Sorted in four simple steps"
          text="No call centres, no runaround. Just a straightforward process that gets your problem fixed."
        />
        <Reveal className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.15}>
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 bg-gradient-to-r from-accent/10 via-accent/50 to-accent/10 lg:block"
            aria-hidden="true"
          />
          {PROCESS.map((p, i) => (
            <div key={p.title} data-reveal className="relative text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent/30 bg-surface shadow-soft">
                <Icon name={p.icon} className="h-7 w-7 text-accent-dark" />
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-bold text-navy">{p.title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
