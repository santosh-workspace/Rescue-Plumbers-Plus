# AI Handoff — Rescue Plumbers Plus Website

> Give this file to any AI tool (ChatGPT, Cursor, Copilot, v0, etc.) so it has the full context, history and decisions behind this project. Pair it with the project folder (or at minimum `src/`, `index.html`, and the config files).

---

## 1. What This Project Is

A complete premium redesign of **https://rescueplumbersplus.co.uk/** — an independent, family-run 24/7 emergency plumbing company in Norwich, UK. Built July 2026 from a detailed client brief. The #1 business goal: **get visitors to call, WhatsApp, or request a quote as fast as possible**, especially on mobile.

**Business facts (do not change):**
- Company: Rescue Plumbers Plus Ltd
- Phone: 07778 077760 (international: +447778077760)
- Email: info@rescueplumbersplus.co.uk ⚠️ *unconfirmed placeholder — owner has not verified this address*
- Location: Norwich, Norfolk, UK
- Service areas: Norwich, Wroxham, Hoveton, Brundall, Cringleford, Taverham, Costessey, Thorpe St Andrew
- Trust signals: family run, fully insured, 25+ years experience, free quotes, no hidden charges, genuine 24/7
- Socials: facebook.com/RescuePlumbersPlus · linkedin.com/company/rescue-plumbers-plus-ltd
- Services (8): Emergency Plumbing, Boiler Repairs, Leak Detection, Blocked Drains, Bathroom Plumbing, General Plumbing, Residential, Commercial

## 2. Tech Stack & Architecture

- **React 19 + Vite 6 + Tailwind CSS 3 + GSAP 3 (ScrollTrigger) + lucide-react**
- Single-page site; all components in `src/components/`, one per section
- **ALL content lives in `src/data.js`** (phone, email, WhatsApp URL, services, reviews, gallery, FAQs, areas, stats). Edit content there, not in components.
- Shared primitives in `src/components/ui.jsx`: `Reveal` (GSAP fade-up on scroll), `CountUp` (IntersectionObserver counters), `SectionHeading`, `CopyPhone` (click-to-copy with "Copied!" feedback), `Stars`
- Icons are imported **explicitly** in `ui.jsx` (an `ICONS` map) for tree-shaking — a `import * as` barrel import balloons the bundle from 374 KB to 1.13 MB. Add new icons to both the import and the map.
- `preview.html` is a **generated** self-contained build (esbuild IIFE bundle + built CSS inlined, `/rpp-logo.svg` path made relative). Regenerate after source changes; don't hand-edit it.
- SEO: JSON-LD in `index.html` — schema.org `Plumber` (with offer catalog + areaServed) and `FAQPage`. Keep in sync with `data.js` FAQs.
- Fonts: Plus Jakarta Sans (display), Inter (body), via Google Fonts in `index.html`.

**Design tokens (tailwind.config.js):** navy `#0F172A`, accent `#0EA5E9`, accent-dark `#0284C7`, accent-light `#7DD3FC`, success `#22C55E`, background `#F8FAFC`, ink `#1E293B`, muted `#64748B`, WhatsApp green `#25D366` (used as arbitrary value). Custom shadows: `soft`, `lift`, `glow`.

**Custom CSS utilities (src/index.css):** `.glass`, `.glass-dark`, `.magnetic-btn` (hover lift + light sweep), `.card-lift`, `.ring-pulse` (pulsing glow), `.grid-bg`, `.drop` (falling water drop, the signature animation), `.shine-sweep`, `.text-shimmer`, `.animate-marquee`, `.icon-wiggle` (fires on `.card-lift:hover`), `.animate-drift` (drifting glow blobs), `.marker-ping`, `.scroll-dot`. All animation respects `prefers-reduced-motion`.

## 3. Page Structure (top to bottom)

1. **Navbar** — fixed; transparent over hero → glass + shadow after 24px scroll; scroll-progress bar on top edge; logo (SVG, h-14) + wordmark; links (Home #home, Services #services, About #why-us, Gallery #gallery, Reviews #reviews, Contact #contact); **WhatsApp (green) + Call Now buttons — desktop/tablet only**; hamburger → full-screen overlay menu on mobile (contains Call + WhatsApp buttons)
2. **Hero** (#home) — full-dvh, Unsplash tap/pipework photo with GSAP parallax (yPercent 14, scale 1.06, scrubbed), navy gradient overlays, two drifting accent glows, 5 falling water drops; kicker "NORWICH · NORFOLK · EST. 25+ YEARS"; H1 "24/7 Emergency / Plumbers in *Norwich*" (Norwich has `.text-shimmer`); sub-line "Fast Response • Fully Insured • 25+ Years Experience • No Hidden Charges"; **ONE CTA only: "Request Free Quote" → #contact** (pulsing accent pill); 4 trust badges with green checks; scroll indicator (hidden on mobile)
3. **Trust ticker** — infinite marquee (30s loop, pauses on hover) of 7 trust phrases separated by droplet icons, navy strip with edge fades; then **TrustBar** (#trust) — 4 icon cards
4. **Services** (#services) — 8 cards, icon wiggles on hover, "Get help now" tel: link per card
5. **WhyUs / About** (#why-us) — 6 feature cards; then the **copy-phone strip**: navy rounded card, shine sweep, drifting glows, green "LINES OPEN NOW" ping, big white clickable number (copies to clipboard, "Copied!" tooltip), "Call now — free quote" button
6. **Stats** — navy band, animated counters: 25+ / 1000+ / 500+ / 24-7
7. **Reviews** (#reviews) — carousel, 5 testimonials, auto-advance 5.5s, pause on hover, dots + arrows. ⚠️ **Placeholder reviews written by AI — must be replaced with real ones before launch**
8. **Gallery** (#gallery) — masonry (CSS columns), 6 Unsplash stock photos ⚠️ placeholders; hover zoom + label overlay; full lightbox (Esc/arrows keyboard support)
9. **Process** (#process) — 4 steps with connecting gradient line (desktop)
10. **Areas** (#areas) — stylised navy map card with pinging MapPin markers + hoverable area chips (not a real map; Google Maps iframe is in the footer)
11. **FAQ** (#faq) — accordion, 6 items, grid-rows animation
12. **EmergencyCta** — navy, drifting glows, 3 water drops, shimmer on "Right Now?", pulsing call button
13. **Contact** (#contact) — info cards (phone with CopyPhone + Call + WhatsApp mini-buttons, email, location, hours) + quote form (name, phone, email, postcode, subject select, message; honeypot; idle→sending→sent states)
14. **Footer** — 4-column: brand + socials + "Open now" pulse, services, quick links + areas, contact + Google Maps iframe; copyright. Extra bottom padding on mobile clears the sticky bar.
15. **Global:** `MouseLight` (desktop-only cursor glow), `MobileCallBar` — **sticky bottom bar, mobile only (<640px): two big buttons, pulsing "Call Now" + green "WhatsApp"**, safe-area-inset padding

## 4. Key Feature Implementations

- **Form → email:** POSTs `FormData` to `https://formsubmit.co/ajax/{EMAIL}` with hidden `_subject`, `_template=table`, `_captcha=false`, `_honey` honeypot. On fetch failure falls back to `mailto:` with pre-filled body. ⚠️ **FormSubmit requires a one-time activation: submit once, click the link emailed to the address.**
- **WhatsApp:** `https://wa.me/447778077760?text=` + encoded "EMERGENCY — Hi Rescue Plumbers Plus, I need urgent plumbing help. My postcode is: ". Constant `WHATSAPP_URL` in data.js. Appears: navbar (sm+), mobile menu, mobile sticky bar, contact card.
- **CopyPhone:** `navigator.clipboard.writeText` with `execCommand('copy')` fallback; 2s "Copied!" state; number wrapped in `whitespace-nowrap` (it used to wrap onto two lines — client flagged it).
- **Logo:** original WordPress PNG was recreated as a crisp SVG (`public/rpp-logo.svg`) — red/blue rotating-arrows swirl + red bold "RESCUE PLUMBERS PLUS" + "24/7" (red `#C0344A`, blue `#3B82C4`). Client accepted it; original PNG can be swapped in if requested.

## 5. Decision History (chronological, with client feedback)

1. **Initial build** from a detailed brief: 14 sections, palette `#0F172A`/`#0EA5E9`, Stripe/Linear-level polish but appropriate for a plumber, conversion-first. Client approved defaults: recreate logo from live site, realistic placeholder reviews, Unsplash gallery, placeholder email.
2. **Feature round:** client asked for (a) click-to-copy phone "in About", (b) form actually sending email, (c) WhatsApp quick-message "on top" → implemented copy strip in WhyUs + copyable contact card, FormSubmit integration, WhatsApp in navbar.
3. **Mobile round:** "customers must reach us as fast as possible on mobile" → sticky bottom bar became split Call+WhatsApp, hero CTAs full-width, safe-area insets, 44px+ touch targets, `theme-color`, `viewport-fit=cover`, tap-highlight removal.
4. **"More impressive and animated":** parallax hero, trust marquee, shine-sweep + drifting glows on copy strip (also fixed number wrapping), icon wiggle, text shimmer, water drops + glows in EmergencyCta.
5. **De-duplication (important client preference):** client saw Call/WhatsApp repeated in hero + sticky bar and said "looks messy, remove duplicate". Iterated to final rule: **each contact route appears once per viewport. Hero has ONLY "Request Free Quote". Desktop: Call + WhatsApp live in navbar. Mobile: Call + WhatsApp live in sticky bottom bar.** Don't reintroduce duplicate CTAs.
6. **Sizing tweaks (client iterates in % steps — expect requests like "make it 30% larger"):** section kickers `text-xs` → `text-base sm:text-lg` bold; navbar logo `h-11` → `h-14`, wordmark → `text-xl sm:text-2xl`; nav links `text-sm` → `text-[1.06rem]` → settled at **`text-[0.95rem]`**; nav link gap `gap-7` → **`gap-[1.6rem]`**. Client then said "Done perfect".

## 6. Outstanding / Before Launch

- [ ] Activate FormSubmit (one submission + confirmation click at info@rescueplumbersplus.co.uk) — or change `EMAIL` in `src/data.js` first
- [ ] Replace 5 placeholder reviews in `data.js` with real testimonials
- [ ] Replace 6 Unsplash gallery images with real job photos (before/after)
- [ ] Confirm the public email address
- [ ] Optionally swap SVG logo for original PNG
- [ ] No privacy policy / terms pages exist yet (footer has no legal links)
- [ ] Deployment not set up — `npm run build` produces static `dist/`, host anywhere (Netlify/Vercel/cPanel)

## 7. Working Conventions for the Next AI

- Client (Santosh) gives short, visual feedback, often with screenshots and percentage-based sizing requests; keep replies concise.
- Keep the one-CTA-per-route rule (section 5.5) — the client explicitly cleaned this up.
- Content edits → `src/data.js` only. Style tokens → `tailwind.config.js` / `index.css`.
- Keep bundle lean: explicit lucide imports, no new heavy deps, animations CSS/GSAP-composited only.
- Regenerate `preview.html` after changes if the client still uses it for review (self-contained: inline built CSS + esbuild IIFE bundle of `src/main.jsx`, replace `"/rpp-logo.svg"` with `"rpp-logo.svg"`).
- Maintain accessibility: single h1, aria-labels on icon buttons, alt text, keyboard-navigable lightbox/accordion, reduced-motion support.
