import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Siren, Flame, Droplets, CircleSlash2, Bath, Wrench, Home, Building2,
  Clock, Zap, BadgePoundSterling, HardHat, ShieldCheck, HeartHandshake,
  PhoneCall, Truck, SmilePlus, Star, Copy, Check,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  Siren, Flame, Droplets, CircleSlash2, Bath, Wrench, Home, Building2,
  Clock, Zap, BadgePoundSterling, HardHat, ShieldCheck, HeartHandshake,
  PhoneCall, Truck, SmilePlus,
}

/** Render a lucide icon by string name */
export function Icon({ name, className }) {
  const Cmp = ICONS[name] || Wrench
  return <Cmp className={className} aria-hidden="true" />
}

/** Fade-up reveal on scroll. Children with [data-reveal] stagger in. */
export function Reveal({ children, className = '', stagger = 0.12, y = 32, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('[data-reveal]')
    const items = targets.length ? targets : [el]
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [stagger, y])
  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  )
}

/** Animated counter that starts when visible */
export function CountUp({ end, suffix = '', duration = 2000 }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(end * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])
  return (
    <span ref={ref}>
      {value.toLocaleString('en-GB')}
      {suffix}
    </span>
  )
}

/** Section heading block */
export function SectionHeading({ kicker, title, text, dark = false, center = true }) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      {kicker && (
        <p
          data-reveal
          className={`text-base font-bold uppercase tracking-[0.22em] sm:text-lg ${
            dark ? 'text-accent-light' : 'text-accent-dark'
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        data-reveal
        className={`mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          data-reveal
          className={`mt-4 max-w-2xl text-base sm:text-lg leading-relaxed ${
            dark ? 'text-slate-300' : 'text-muted'
          } ${center ? 'mx-auto' : ''}`}
        >
          {text}
        </p>
      )}
    </Reveal>
  )
}

/** Click-to-copy phone number with visual feedback */
export function CopyPhone({ number, className = '' }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(number)
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement('textarea')
      ta.value = number
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`group/copy relative inline-flex items-center gap-2 ${className}`}
      aria-label={copied ? 'Phone number copied' : `Copy phone number ${number}`}
      title="Click to copy"
    >
      <span className="whitespace-nowrap">{number}</span>
      {copied ? (
        <Check className="h-4 w-4 text-success" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4 opacity-50 transition-opacity group-hover/copy:opacity-100" aria-hidden="true" />
      )}
      <span
        role="status"
        className={`absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white shadow-lift transition-all duration-300 ${
          copied ? 'opacity-100 -translate-y-0.5' : 'pointer-events-none opacity-0'
        }`}
      >
        Copied!
      </span>
    </button>
  )
}

/** Five stars */
export function Stars({ className = 'h-4 w-4' }) {
  return (
    <div className="flex gap-0.5 text-amber-400" role="img" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${className} fill-current`} aria-hidden="true" />
      ))}
    </div>
  )
}
