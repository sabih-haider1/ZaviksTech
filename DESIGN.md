# ZaviksTech — Design Language: "The Practice Ledger"

A ground-up product design. The previous site (SaaS-blue, Inter, centered
eyebrow pills, three-column icon cards, fake dashboard hero) was treated as a
failed prototype and discarded. Business goals, pages, forms, backend logic,
SEO and lead-generation flow are preserved unchanged.

## Concepts considered

Three site-wide directions were developed and compared before any code:

### A — The Practice Ledger (editorial–technical) ← chosen
The site reads like the working journal of a meticulous engineering practice:
warm paper canvas, ink typography, deep pine plates, a single copper signal
color. Serif display type carries the hierarchy; a monospaced meta layer
(numbered indexes, uppercase labels, hairline rules) carries the "technical"
credibility. Services are an *index*, not a card grid.

- **Succeeds:** matches the brand promise (calm, dependable, no hype);
  typography-led so no fake imagery is needed; scales to content-dense,
  SEO-driven service pages; unmistakably not a template.
- **Risk:** could drift toward "law firm" — mitigated by the mono meta layer
  and copper interaction states.

### B — Control Room (dark technical console) ✗
Graphite canvas, phosphor/amber accents, grotesque caps, exposed grid lines,
terminal readouts.
- **Fails:** the buyers are SMB owners, not developers — a dark console reads
  "dev tool," not "trustworthy services partner"; long-form service content
  tires on dark; and the dark-dashboard look is itself now an AI-template
  cliché. Its mono meta-label layer is absorbed into A.

### C — Atelier (minimal luxury monochrome) ✗
Near-white, one accent, oversized light type, extreme negative space.
- **Fails:** this site is a working lead-gen machine — seven content-dense
  service pages, FAQs, three forms, a popup, WhatsApp. Atelier sparseness
  fights that job; it suits a five-project portfolio, not an IT practice.
  Its whitespace discipline is absorbed into A.

## Brand personality

An independent engineering practice: precise, calm, plain-spoken, human.
Never breathless, never "disruptive." The site should feel like a firm that
answers the phone and writes things down.

## Color

No blue. One warm, quiet palette; copper is the only signal.

| Role | Value | Use |
| --- | --- | --- |
| Paper | `hsl(40 30% 96%)` | Canvas |
| Paper raised | `hsl(42 38% 98%)` | Panels, form surfaces |
| Ink | `hsl(26 16% 12%)` | Headlines, body emphasis |
| Ink soft | `hsl(28 8% 36%)` | Body, captions |
| Pine | `hsl(167 30% 14%)` | Dark plates, primary buttons, footer |
| Copper | `hsl(21 74% 44%)` | CTAs, hover states, active nav — the signal |
| Hairline | `hsl(36 15% 83%)` | Rules, frames |

Copper is rationed: if two copper elements are visible at once, one is wrong.

## Typography (the hero of the system)

- **Display — Fraunces** (optical serif, 400–600 + italic): headlines ≥ 28px,
  large numerals, pull-quotes. Slight negative tracking at display sizes.
- **Text/UI — Hanken Grotesk**: body 16–18px, comfortable 65–70ch measure,
  1.6–1.75 line-height.
- **Meta — IBM Plex Mono**: 11–12px uppercase, 0.14–0.18em tracking — index
  numbers, kickers, labels, breadcrumbs, the "ledger" voice.

## Surfaces, cards, grid

- Corners near-square (2px). Elevation via hairlines, not shadows.
- **The card grid is dead.** The signature component is the **index row**:
  `number — serif title — summary — arrow`, separated by hairlines. Benefit
  and process content uses ruled blocks and numbered rails, never
  icon/title/description boxes.
- Asymmetric 12-col compositions; sticky left rails on long content; pine
  plates for contrast sections. Each page has its own composition — no
  repeated section rhythm.

## Buttons & forms

- Buttons: rectangular, 44–48px, uppercase 13px letterspaced labels.
  Primary = pine, conversion accent = copper, quiet = 1px ink outline.
- Fields: 48px, paper-raised surface, 1px ink-tinted border, copper focus
  ring, mono uppercase labels. Forms feel like well-set stationery.

## Iconography, imagery, motion

- Icons almost eliminated; arrows and a few functional glyphs remain. The
  mono numeral replaces the decorative icon everywhere.
- No stock or AI illustration. The typographic composition *is* the imagery.
- Motion: fast (150–300ms), meaningful only — hero settle on load, hover
  color/arrow shifts, accordion ease. Reduced-motion respected.

## Page compositions

- **Home:** full-type hero with mono meta rail + service ticker → Service
  Index ledger (7 rows) → pine manifesto plate (claim + numbered reasons) →
  process rail (sticky intro left, numbered steps right) → closing strip.
- **Services:** intro → featured practice panel (01 dominates) → index rows
  02–07 → closing strip.
- **Service detail:** mono breadcrumb → editorial headline → meta strip →
  overview with sticky label rail → ruled benefit blocks (2-col) → numbered
  process rail → hairline FAQ → pine enquiry plate with paper form panel.
- **About:** manifesto opening → editorial two-column story → numbered
  principles ledger → pine strip of commitments → service index cross-link.
- **Contact:** split: "Speak to a person" + channel ledger (phone/email/
  WhatsApp as large type) | framed form panel. No extra CTA band.
- **Footer:** pine plate led by conversion ("Have a project in mind?"),
  contact ledger + numbered service index — not a four-column sitemap.
- **Navigation:** hairline utility bar (mono, phone/email) above a sticky
  paper bar; mobile menu is a full-screen paper overlay with numbered serif
  links and a contact block.

## Originality test

Before shipping any page ask: could this be mistaken for a Tailwind/Webflow
template, a Vercel clone, or a generic AI landing page? If yes, delete it.
Tell-tales to reject: centered pill eyebrows, icon-card triplets, rounded-2xl
shadows, gradient blobs, text-left/image-right heroes.

## Launch polish (post-approval pass)

The approved layouts were kept; this pass added identity, motion and depth.

### Brand mark — "The Keystone"
A single geometric symbol (no letters, no wordmark inside): the wedge stone
that locks an arch — "the piece that holds a structure up." A copper facet
cuts the lower-left, carrying the retired mark's diagonal DNA and the palette's
one signal colour. The wedge is `currentColor`, so it reads on paper or pine;
the two-tone silhouette survives at 16px. One mark drives navbar, favicon,
apple-icon and OG card (`src/components/layout/logo.tsx`, `app/icon.tsx`,
`app/apple-icon.tsx`, `app/opengraph-image.tsx`).

### Motion system
- `Reveal` (`components/motion/reveal.tsx`): IntersectionObserver fade/stagger,
  one observer per instance, transforms only. Progressive enhancement — the
  server renders visible markup; an inline script adds `.js` to `<html>` and
  only then does CSS arm the hidden state, so no-JS visitors and crawlers keep
  content, and `prefers-reduced-motion` shows everything instantly.
- `ScrollProgress`: rAF-throttled copper reading bar (scaleX).
- Page transitions via `(marketing)/template.tsx` (opacity only).
- Micro-interactions: service-index copper hover tick, button press
  (`active:translate-y-px`), animated link underlines, arrow nudges, header
  height-shrink on scroll, staggered mobile-menu entrance.

### Background depth (on-brand, readability-first)
- A single fixed film-grain layer over paper (`.grain`, 4%).
- Blueprint hairline grids behind the hero (slow seamless drift) and the pine
  plates/footer (`.blueprint`, `.blueprint-dark`), always radially masked and
  faint.
- Hero copper rule that draws itself in on load.

### Deliberately rejected (would cheapen the language)
Aurora / mesh gradients, glassmorphism, ripple effects, magnetic buttons,
parallax, floating circles, and animated stat counters (no invented metrics).
These fight the calm, precise "practice" personality — restraint is the point.
