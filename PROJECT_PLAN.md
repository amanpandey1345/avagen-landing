# AVAGen Landing Page - Section and UX Plan

The page architecture follows the supplied 22-page deck rather than using generic crypto-template sections.

| Landing-page section | Deck basis | Web treatment |
|---|---|---|
| Hero | Pages 1, 3 and 22 | HyperGen command interface, liquidity-intelligence statement, X/P/C-chain signals, live-style scanner and Avalanche positioning |
| Intelligence engine | Pages 2 and 3 | Monitor, interpret, route, execute and optimize loop with feature cards |
| Arbitrage simulator | Page 4 | Scan, buy low, bridge, sell high and settle with editable costs and net outcome |
| Trading vs arbitrage | Page 5 | Accessible comparison tabs and a responsive factor breakdown |
| Evolution explorer | Pages 6 and 7 | Four selectable phases from centralized transfers to triple-chain intelligence |
| Triple-chain architecture | Pages 7 and 8 | X-Chain, P-Chain and C-Chain connected through a HyperGen coordination core |
| Monitoring console | Pages 12 to 14 | Price feeds, transaction watching, risk gates and execution-loop visualization |
| Community and ecosystem | Pages 9 to 11 | Team1 figures plus DeFi, AI, gaming, NFT, automation and market categories |
| Participation and rewards | Pages 16 to 20 | Entry-liquidity figures, direct gain, 15-level distribution and 12-rank ladder |
| Source-deck preview | Selected pages | No-crop local WebP viewer with keyboard, swipe, responsive index and full-screen inspect mode |
| Terms and disclosure | Page 21 | Withdrawal minimum, fee, review window, earning caps, payment rails and risk notice |
| FAQ and CTA | Product layer | Clear implementation boundaries, access form and final conversion path |

## Hero visual system

- Integrated chrome command card rather than detached floating status cards
- Three-line condensed headline with red intelligence emphasis
- Scanning beam, orbiting engine, route paths and moving data packets
- X, P and C chain chips placed around the engine core
- Command-state strip for scan, route validation and risk controls
- Spring-based pointer parallax on fine pointers only
- Dedicated low-height laptop treatment below 620px viewport height
- Mobile engine sizing isolated from the global engine component rules

## Source-deck responsive system

- Slides are always fully visible with `object-contain`
- Phone controls remain outside the artwork so PDF text is not covered
- Horizontal swipe is supported without blocking vertical page scrolling
- Inspect dialog uses a dark, distraction-free `object-contain` canvas
- Thumbnail index uses 2 columns on phones, 3 at 520px, 4 on tablets and 7 on wide screens
- Detail cards use fluid display type and wrap long titles at 320px
- No horizontal thumbnail rail or clipped final card

## General responsive system

- **320-639px:** single-column sections, full-width calls to action, compact controls and wrapping grids
- **640-1023px:** larger engine visuals and tablet spacing without premature content compression
- **1024-1279px:** balanced two-column hero and dense section grids
- **1280px and above:** full desktop navigation, wide hero composition and two-panel data experiences
- **Short desktop windows:** compact title spacing and console height keep the primary hero experience visible
- Content width remains capped with `max-w-7xl`; major headings use `clamp()` for continuous scaling

## Interaction system

- Framer Motion viewport reveals, spring hover states and pointer parallax
- CSS-driven 3D ring rotations preserving base transforms
- Scroll progress, smooth anchors and active-section navigation
- Keyboard-accessible tablists with Arrow, Home and End navigation
- Deck swipe gestures with horizontal/vertical intent filtering
- Focus-trapped mobile menu, request dialog and deck inspect dialog
- Reference-counted body scroll lock for overlapping overlays
- Reduced-motion and data-saving fallbacks for decorative loops

## Risk framing

The source deck contains market, participation, percentage and reward claims. The web treatment preserves those figures as source-derived content while surrounding them with visible labels and disclosures. The interface does not present a live trading system, guaranteed return, wallet flow or production payment form.
