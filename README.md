# Rescue Plumbers Plus — Website Redesign

A complete, modern redesign of [rescueplumbersplus.co.uk](https://rescueplumbersplus.co.uk/) — 24/7 emergency plumbers in Norwich, UK. Built July 2026.

## Quick Start

**Instant preview (no setup):** double-click `preview.html` — a fully self-contained build that opens in any browser.

**Development:**

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
```

**Production build:**

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Tech Stack

| Layer | Tool |
|---|---|
| UI framework | React 19 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Animation | GSAP 3 (ScrollTrigger) + CSS keyframes |
| Icons | lucide-react |
| Fonts | Plus Jakarta Sans (display), Inter (body) — Google Fonts |
| Form delivery | FormSubmit.co (no backend needed) |

## Design System

- **Primary (navy):** `#0F172A` · **Accent (sky):** `#0EA5E9` · **Success:** `#22C55E`
- **Background:** `#F8FAFC` · **Text:** `#1E293B` · **WhatsApp green:** `#25D366`
- Rounded corners, soft shadows, subtle glassmorphism, blue glow effects
- All animations are GPU-composited and respect `prefers-reduced-motion`

## Homepage Sections (in order)

1. **Sticky navbar** — transparent → glass on scroll, scroll-progress bar, logo, links, WhatsApp + Call buttons (desktop)
2. **Hero** — full-screen, parallax background, shimmer on "Norwich", falling water-drop signature animation, single "Request Free Quote" CTA
3. **Trust ticker + bar** — infinite scrolling marquee of trust points, then 4 credibility cards
4. **Services** — 8 cards (emergency, boilers, leaks, drains, bathroom, general, residential, commercial) with wiggling icons and hover lift
5. **Why Choose Us (About)** — 6 feature cards + glowing dark strip with **click-to-copy phone number**
6. **Statistics** — animated counters (25+ years, 1000+ projects, 500+ customers, 24/7)
7. **Reviews** — auto-advancing carousel, pauses on hover *(placeholder testimonials)*
8. **Gallery** — masonry grid with lightbox and hover zoom *(Unsplash stock photos)*
9. **Process** — 4-step timeline (Call → We Arrive → Fix → You're Happy)
10. **Service areas** — interactive map with pinging markers (Norwich, Wroxham, Hoveton, Brundall, Cringleford, Taverham, Costessey, Thorpe St Andrew)
11. **FAQ** — smooth accordion, 6 questions
12. **Emergency CTA** — dark section, drifting glows, water drops, pulsing call button
13. **Contact** — quote form + phone (copyable), email, WhatsApp, hours cards
14. **Footer** — brand, services, quick links, areas, contact, Google Maps embed, socials

**Mobile:** sticky bottom bar with Call Now + WhatsApp (one thumb-tap from anywhere), full-width touch targets, safe-area insets, no duplicate CTAs.

## Project Structure

```
plumber-2/
├── index.html              # Meta, fonts, JSON-LD schema (Plumber + FAQPage)
├── preview.html            # Self-contained build — double-click to view
├── package.json
├── vite.config.js / tailwind.config.js / postcss.config.js
├── public/
│   ├── rpp-logo.svg        # Logo recreated as crisp vector SVG
│   └── rpp-roundel.png
└── src/
    ├── main.jsx            # Entry point
    ├── index.css           # Tailwind + custom animations/utilities
    ├── data.js             # ALL content: phone, email, services, reviews, FAQs…
    ├── App.jsx             # Page composition, mouse light, mobile call bar
    └── components/
        ├── ui.jsx          # Shared: Reveal, CountUp, SectionHeading, CopyPhone, Stars
        ├── Navbar.jsx  Hero.jsx  TrustBar.jsx  Services.jsx
        ├── WhyUs.jsx  Stats.jsx  Reviews.jsx  Gallery.jsx
        ├── Process.jsx  Areas.jsx  Faq.jsx  EmergencyCta.jsx
        └── Contact.jsx  Footer.jsx
```

## Key Features

- **Click-to-copy phone number** — About strip and Contact card; shows "Copied!" feedback
- **WhatsApp emergency** — `wa.me/447778077760` with pre-filled emergency message; in navbar (desktop), sticky bar (mobile), mobile menu, and Contact
- **Quote form → email** — submits to `info@rescueplumbersplus.co.uk` via FormSubmit.co; falls back to opening the visitor's mail app if the request fails
- **SEO** — LocalBusiness/Plumber + Service catalog + FAQPage JSON-LD, semantic HTML, single h1, meta/OG tags, alt text everywhere, lazy-loaded images
- **Performance** — ~125 KB gzipped JS, tree-shaken icons, GPU-only animations

## ⚠️ Before Going Live

1. **Activate the form**: submit the form once, then click the confirmation link FormSubmit emails to `info@rescueplumbersplus.co.uk`. To change the address, edit `EMAIL` in `src/data.js`.
2. **Replace placeholder reviews** in `src/data.js` (`REVIEWS`) with real Google/Rated People testimonials.
3. **Replace gallery stock photos** in `src/data.js` (`GALLERY`) with real job photos.
4. **Confirm the email address** shown on the site (currently a placeholder).
5. Optional: swap `public/rpp-logo.svg` for the original PNG logo if preferred.

## Editing Content

All copy lives in `src/data.js` — phone, email, WhatsApp message, services, reviews, gallery, FAQs, service areas, stats. Edit that one file to change site content; no component changes needed.
