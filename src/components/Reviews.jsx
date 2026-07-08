import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { REVIEWS } from '../data.js'
import { SectionHeading, Stars } from './ui.jsx'

export default function Reviews() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (paused) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 5500)
    return () => clearInterval(timer.current)
  }, [paused])

  const go = (dir) => setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length)

  return (
    <section id="reviews" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          kicker="Customer Reviews"
          title="Trusted across Norwich and beyond"
          text="We follow up on every single job — here's what customers say about the service."
        />

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-4xl">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {REVIEWS.map((r) => (
                <figure
                  key={r.name}
                  className="w-full shrink-0 rounded-4xl border border-divider bg-surface p-8 shadow-soft sm:p-12"
                >
                  <div className="flex items-center justify-between">
                    <Stars className="h-5 w-5" />
                    <Quote className="h-8 w-8 text-accent/20" aria-hidden="true" />
                  </div>
                  <blockquote className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-accent-light">
                      {r.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <div>
                      <p className="font-display font-bold text-navy">{r.name}</p>
                      <p className="text-sm text-muted">{r.location}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              className="magnetic-btn flex h-11 w-11 items-center justify-center rounded-full border border-divider bg-surface text-navy shadow-soft"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Review navigation">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setIndex(i)}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Review ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-accent' : 'w-2.5 bg-divider hover:bg-accent/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="magnetic-btn flex h-11 w-11 items-center justify-center rounded-full border border-divider bg-surface text-navy shadow-soft"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
