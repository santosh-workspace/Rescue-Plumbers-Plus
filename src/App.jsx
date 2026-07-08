import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, MessageCircle } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Services from './components/Services.jsx'
import WhyUs from './components/WhyUs.jsx'
import Stats from './components/Stats.jsx'
import Reviews from './components/Reviews.jsx'
import Gallery from './components/Gallery.jsx'
import Process from './components/Process.jsx'
import Areas from './components/Areas.jsx'
import Faq from './components/Faq.jsx'
import EmergencyCta from './components/EmergencyCta.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import QuoteModal from './components/QuoteModal.jsx'
import { PHONE_TEL, WHATSAPP_URL } from './data.js'

gsap.registerPlugin(ScrollTrigger)

/** Desktop-only mouse-follow ambient light */
function MouseLight() {
  const [pos, setPos] = useState({ x: -400, y: -400 })
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let raf
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div
      className="pointer-events-none fixed z-[5] hidden h-[560px] w-[560px] rounded-full lg:block"
      style={{
        left: pos.x - 280,
        top: pos.y - 280,
        background: 'radial-gradient(circle, rgba(14,165,233,0.055) 0%, transparent 65%)',
      }}
      aria-hidden="true"
    />
  )
}

/** Sticky mobile quick-contact bar: one thumb-tap to call or WhatsApp */
function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2.5 px-3 pt-2 sm:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      role="navigation"
      aria-label="Quick contact"
    >
      <a
        href={`tel:${PHONE_TEL}`}
        className="ring-pulse flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full bg-accent font-display text-base font-extrabold text-white shadow-lift"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call Now
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full bg-[#25D366] font-display text-base font-extrabold text-white shadow-lift"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  )
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(id)
  }, [])

  const openQuote = () => setQuoteOpen(true)

  return (
    <div className="relative">
      <MouseLight />
      <Navbar />
      <main id="main">
        <Hero onRequestQuote={openQuote} />
        <TrustBar />
        <Services />
        <WhyUs />
        <Stats />
        <Reviews />
        <Gallery />
        <Process />
        <Areas />
        <Faq />
        <EmergencyCta onRequestQuote={openQuote} />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  )
}
