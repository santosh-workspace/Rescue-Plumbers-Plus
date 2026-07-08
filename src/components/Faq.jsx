import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../data.js'
import { Reveal, SectionHeading } from './ui.jsx'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          kicker="FAQ"
          title="Questions, answered honestly"
          text="Everything customers usually ask before booking us. Anything else — just call."
        />
        <Reveal className="mt-12 space-y-4" stagger={0.07}>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                data-reveal
                className={`overflow-hidden rounded-3xl border transition-colors duration-300 ${
                  isOpen ? 'border-accent/40 bg-surface shadow-soft' : 'border-divider bg-surface'
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-display text-base font-bold text-navy sm:text-lg">{f.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? 'rotate-180 bg-accent text-white' : 'bg-background text-navy'
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="grid transition-[grid-template-rows] duration-400 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
