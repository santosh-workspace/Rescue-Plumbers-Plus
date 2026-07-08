import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { GALLERY } from '../data.js'
import { Reveal, SectionHeading } from './ui.jsx'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null) // index | null

  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (dir) => setLightbox((i) => (i === null ? null : (i + dir + GALLERY.length) % GALLERY.length)),
    []
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, close, step])

  return (
    <section id="gallery" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          kicker="Our Work"
          title="Recent projects, finished properly"
          text="A snapshot of installations and repairs across Norwich — every job left clean, tidy and working perfectly."
        />
        <Reveal
          className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
          stagger={0.08}
        >
          {GALLERY.map((g, i) => (
            <button
              key={g.src}
              data-reveal
              onClick={() => setLightbox(i)}
              className="group relative block w-full overflow-hidden rounded-3xl text-left shadow-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
              aria-label={`View ${g.label}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">{g.tag}</span>
                <p className="mt-2 font-display font-bold text-white">{g.label}</p>
              </div>
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                <Expand className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
            </button>
          ))}
        </Reveal>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[lightbox].label}
          onClick={close}
        >
          <button
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={close}
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <figure className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              className="max-h-[75vh] w-auto rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center font-display font-semibold text-white">
              {GALLERY[lightbox].label}
            </figcaption>
          </figure>
          <button
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}
