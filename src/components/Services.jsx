import { ArrowRight } from 'lucide-react'
import { SERVICES, PHONE_TEL } from '../data.js'
import { Icon, Reveal, SectionHeading } from './ui.jsx'

export default function Services() {
  return (
    <section id="services" className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          kicker="Our Services"
          title="Every plumbing problem, solved"
          text="From middle-of-the-night emergencies to planned bathroom refits — one trusted local team for homeowners, landlords, property managers and small businesses."
        />
        <Reveal className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {SERVICES.map((s) => (
            <article
              key={s.title}
              data-reveal
              className="card-lift group flex flex-col rounded-3xl border border-divider bg-surface p-7 shadow-soft"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent">
                <Icon
                  name={s.icon}
                  className="icon-wiggle h-7 w-7 text-accent-dark transition-colors duration-300 group-hover:text-white"
                />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition-colors hover:text-accent"
                aria-label={`Call about ${s.title}`}
              >
                Get help now
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
