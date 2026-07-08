import { useState } from 'react'
import { MapPin, Phone } from 'lucide-react'
import { AREAS, PHONE_DISPLAY, PHONE_TEL } from '../data.js'
import { Reveal, SectionHeading } from './ui.jsx'

export default function Areas() {
  const [active, setActive] = useState('Norwich')

  return (
    <section id="areas" className="overflow-hidden bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              center={false}
              kicker="Service Areas"
              title="Local engineers across Norwich & Norfolk"
              text="Based in Norwich, covering the city and surrounding villages. If you're close by, we can usually help — just ask."
            />
            <Reveal className="mt-8 flex flex-wrap gap-2.5" stagger={0.05}>
              {AREAS.map((a) => (
                <button
                  key={a.name}
                  data-reveal
                  onMouseEnter={() => setActive(a.name)}
                  onFocus={() => setActive(a.name)}
                  onClick={() => setActive(a.name)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active === a.name
                      ? 'border-accent bg-accent text-white shadow-glow'
                      : 'border-divider bg-background text-ink hover:border-accent/50'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </Reveal>
            <Reveal className="mt-8">
              <a
                data-reveal
                href={`tel:${PHONE_TEL}`}
                className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 font-bold text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Check we cover you · {PHONE_DISPLAY}
              </a>
            </Reveal>
          </div>

          {/* Stylised map */}
          <Reveal>
            <div
              data-reveal
              className="relative aspect-square max-w-lg rounded-4xl border border-divider bg-navy p-4 shadow-lift lg:ml-auto"
              role="img"
              aria-label="Map of service areas around Norwich"
            >
              <div className="grid-bg absolute inset-4 rounded-3xl opacity-40" aria-hidden="true" />
              {/* radiating coverage rings */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                {[64, 46, 28].map((r) => (
                  <span
                    key={r}
                    className="absolute rounded-full border border-accent/15"
                    style={{ width: `${r}%`, height: `${r}%` }}
                  />
                ))}
              </div>
              {AREAS.map((a) => (
                <button
                  key={a.name}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                  onMouseEnter={() => setActive(a.name)}
                  onFocus={() => setActive(a.name)}
                  aria-label={a.name}
                >
                  <span className="relative flex items-center justify-center">
                    <span
                      className={`marker-ping absolute rounded-full ${
                        a.main ? 'h-4 w-4 bg-accent/60' : 'h-2.5 w-2.5 bg-accent/40'
                      }`}
                    />
                    <MapPin
                      className={`relative transition-all duration-300 ${
                        active === a.name
                          ? 'scale-125 text-accent-light'
                          : a.main
                            ? 'text-accent'
                            : 'text-slate-400'
                      } ${a.main ? 'h-7 w-7' : 'h-5 w-5'}`}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300 ${
                      active === a.name
                        ? 'bg-accent text-white opacity-100'
                        : 'bg-white/10 text-slate-300 opacity-0 group-hover:opacity-100'
                    } ${a.main ? '!opacity-100' : ''}`}
                  >
                    {a.name}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
