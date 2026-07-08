import { useEffect, useState } from 'react'
import { Phone, Menu, X, MessageCircle } from 'lucide-react'
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '../data.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 z-[60] h-0.5 bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-soft py-1.5 sm:py-2' : 'bg-transparent py-2.5 sm:py-4'
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
          aria-label="Main navigation"
        >
          <a href="#home" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Rescue Plumbers Plus — home">
            <img src="/rpp-logo.svg" alt="" className="h-10 w-10 shrink-0 sm:h-14 sm:w-14" />
            <span
              className={`font-display text-base sm:text-2xl font-extrabold tracking-tight leading-tight whitespace-nowrap transition-colors ${
                scrolled ? 'text-navy' : 'text-white'
              }`}
            >
              Rescue Plumbers<span className="text-accent"> Plus</span>
            </span>
          </a>

          <ul className="hidden items-center gap-[1.6rem] lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-[0.95rem] font-medium transition-colors hover:text-accent ${
                    scrolled ? 'text-ink' : 'text-white/90'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn hidden items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_-6px_rgba(37,211,102,0.6)] sm:inline-flex sm:px-5"
              aria-label="Message us on WhatsApp for emergencies"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="magnetic-btn hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-glow sm:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call Now · {PHONE_DISPLAY}</span>
            </a>
            <button
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
                scrolled ? 'text-navy' : 'text-white'
              }`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-navy/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex shrink-0 items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <img src="/rpp-logo.svg" alt="" className="h-9 w-9" />
            <span className="font-display font-extrabold text-white">Rescue Plumbers Plus</span>
          </div>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <ul className="mt-2 flex flex-col gap-1 px-6">
          {NAV_LINKS.map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={`transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 font-display text-lg font-bold text-white hover:bg-white/5 hover:text-accent-light"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto shrink-0 space-y-2.5 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
          <a
            href={`tel:${PHONE_TEL}`}
            className="magnetic-btn flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-bold text-white"
          >
            <Phone className="h-5 w-5" aria-hidden="true" /> Call {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp Emergency
          </a>
        </div>
      </div>
    </>
  )
}
