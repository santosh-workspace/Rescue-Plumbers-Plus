import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const BADGES = ['Family Run', 'Fully Insured', 'Emergency Service', '25+ Years Experience']

const DROPS = [
  { left: '8%', delay: '0s', dur: '7s', size: 10 },
  { left: '18%', delay: '2.4s', dur: '8.5s', size: 7 },
  { left: '82%', delay: '1.2s', dur: '7.5s', size: 9 },
  { left: '90%', delay: '3.6s', dur: '9s', size: 6 },
  { left: '72%', delay: '5s', dur: '8s', size: 8 },
]

export default function Hero({ onRequestQuote }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker', { y: 24, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' })
      gsap.from('.hero-line', {
        y: 48,
        opacity: 0,
        duration: 1.1,
        delay: 0.35,
        stagger: 0.15,
        ease: 'power3.out',
      })
      gsap.from('.hero-sub, .hero-cta, .hero-badges', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
      })
      // Gentle parallax on the background image
      gsap.to('.hero-bg', {
        yPercent: 14,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy">
      <img
        src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1920&q=75"
        alt="Professional plumbing pipework and taps in close-up"
        className="hero-bg absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/70 to-navy/85" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy to-transparent" aria-hidden="true" />
      {/* Drifting accent glows */}
      <div
        className="animate-drift absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="animate-drift absolute -left-48 bottom-0 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[120px] [animation-delay:-4.5s]"
        aria-hidden="true"
      />
      {/* Signature falling water drops */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2" aria-hidden="true">
        {DROPS.map((d, i) => (
          <svg
            key={i}
            className="drop"
            style={{ left: d.left, animationDelay: d.delay, animationDuration: d.dur }}
            width={d.size}
            height={d.size * 1.4}
            viewBox="0 0 10 14"
          >
            <path d="M5 0C5 4 0 7 0 10a5 4 0 0 0 10 0C10 7 5 4 5 0Z" fill="rgba(125,211,252,0.5)" />
          </svg>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:px-12">
        <p className="hero-kicker text-xs font-semibold uppercase tracking-[0.28em] text-accent-light">
          Norwich · Norfolk · Est. 25+ Years
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <span className="hero-line block">24/7 Emergency</span>
          <span className="hero-line block">
            Plumbers in <span className="text-shimmer">Norwich</span>
          </span>
        </h1>
        <p className="hero-sub mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Fast Response&ensp;•&ensp;Fully Insured&ensp;•&ensp;25+ Years Experience&ensp;•&ensp;No Hidden Charges
        </p>

        <div className="hero-cta mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={onRequestQuote}
            className="magnetic-btn ring-pulse inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-white shadow-glow sm:justify-start"
          >
            Request Free Quote
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <ul className="hero-badges mt-12 flex flex-wrap gap-x-7 gap-y-3">
          {BADGES.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20">
                <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll indicator */}
      <a
        href="#trust"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/60 transition-colors hover:text-white sm:block"
        aria-label="Scroll down"
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
          <span className="scroll-dot block h-2 w-1.5 rounded-full bg-white/80" />
        </span>
        <ChevronDown className="mx-auto mt-1 h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  )
}
