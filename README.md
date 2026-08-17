# AVAGen Club Landing Page - Hero and Mobile Deck Polish 2.1

A responsive React landing-page concept based on the supplied **AVAGen Club International 2.0** deck. This release rebuilds the opening experience as an integrated HyperGen command interface and replaces the source-deck gallery with a mobile-first, no-crop slide viewer.

## Stack

- React 18 + JavaScript
- Vite 6
- Tailwind CSS 3
- Framer Motion 11
- Lucide React icons

## Quick start

```bash
npm install
npm run dev
```

Vite normally starts the site at `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The project uses `base: './'`, so the compiled site can be hosted from a normal folder or subdirectory. Vite writes the optimized output to `dist/`.

## Validation commands

```bash
npm run validate
npm run lint
npm run build
```

`npm run validate` checks local imports, navigation targets, public assets and unsupported Tailwind opacity utilities before the Vite build starts.

## Release 2.1 improvements

### Rebuilt hero

- New three-line hierarchy: **Liquidity / Intelligence / In Motion**
- Integrated chrome HyperGen command card instead of an isolated floating logo
- Animated scanner, orbital engine, route map, data paths and X/P/C-chain status nodes
- Fine-pointer parallax with spring damping; automatically disabled by reduced-motion or data-saving preferences
- Low-height desktop mode for 1024 x 550 and similar laptop viewports
- Mobile-specific typography, control sizing and engine composition down to 320px
- Clear demo-state labels so the visual does not imply a live trading connection

### Rebuilt source-deck viewer

- Slides use `object-contain`, so the PDF artwork is never cropped
- Mobile swipe gestures plus visible previous, inspect and next controls
- Full-screen inspect mode with Escape, Arrow-key navigation, focus trapping and focus restoration
- Responsive information card with readable title and description at 320px
- Two-column mobile deck index that expands to 3, 4 and 7 columns at larger breakpoints
- No horizontally overflowing thumbnail rail
- Keyboard Home/End and Arrow navigation retained on the main carousel region

### Existing experience retained

- Sticky navigation with active-section tracking and scroll progress
- Interactive arbitrage simulator with fees, slippage and negative-outcome handling
- Trading-vs-arbitrage comparison and four-phase evolution explorer
- X-Chain, P-Chain and C-Chain coordination visualization
- Monitoring console with explicit demo-data labeling
- Community, ecosystem, level-distribution and rank explorers
- FAQ accordion, access-request modal, skip link and back-to-top control
- Reduced-motion, data-saving and reference-counted body-scroll locking

## Responsive strategy

The changed hero and deck experiences were checked at:

`320x568`, `360x800`, `390x844`, `414x896`, `768x1024`, `1024x550`, `1024x768`, `1280x800`, `1440x900`, `1920x1080`

The low-height desktop breakpoint keeps the complete command console visible without crushing the copy. On phones, the deck image remains fully visible, controls stay finger-friendly and thumbnails become a wrapping grid instead of forcing page-level horizontal scrolling.

See [`QA_REPORT.md`](./QA_REPORT.md) for the exact checks and environment limitation.

## Main project files

- `src/App.jsx` - page composition and section structure
- `src/components/HeroSection.jsx` - rebuilt hero, parallax and command-console composition
- `src/components/EngineCore.jsx` - reusable animated engine with hero sizing support
- `src/components/PlanPreview.jsx` - responsive slide viewer, swipe logic and inspect dialog
- `src/index.css` - complete visual system, breakpoints and custom animations
- `src/data/plan.js` - deck-derived copy and structured content
- `src/components/ArbitrageSimulator.jsx` - interactive route-economics demo
- `src/components/StrategyEvolution.jsx` - comparison and timeline explorer
- `src/components/RewardsExplorer.jsx` - level and rank interactions
- `src/components/Navbar.jsx` - active navigation and mobile overlay
- `src/components/WaitlistModal.jsx` - accessible demo access form
- `src/hooks/` - scroll-lock and reduced-data/motion helpers
- `public/deck/` - optimized local source-deck images
- `scripts/validate-project.mjs` - dependency-free source validation

## Demo form behavior

The request-access form is intentionally front-end only. Successful demo submissions are stored in the current browser's `localStorage` under `avagen-access-requests`. The page does not connect a wallet, call an API, send an email or process a payment.

## Production requirements

Before a real launch, add legal review, audited contracts, secure authentication, backend APIs, verified live-market data, privacy and consent flows, monitoring and final cross-browser/device testing.

Percentages, reward amounts, processing periods and participation figures shown in the interface are labeled as **plan-stated** or **illustrative**. They must not be represented as guaranteed returns or outcomes.
