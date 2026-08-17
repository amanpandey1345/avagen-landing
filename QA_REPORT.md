# AVAGen Landing Page - QA Report

**Project version:** 2.1.0
**Review date:** 2026-08-16
**Change scope:** hero composition, hero animation behavior, low-height laptop layout, source-deck mobile responsiveness and inspect-mode accessibility

## Result summary

The revised source passed all available dependency-free checks and the offline responsive render harness. The changed hero and source-deck experiences showed no page-level horizontal overflow, broken local images or browser-console errors in the tested matrix.

## Source and stylesheet checks

- 21 JavaScript/JSX files passed TypeScript JSX syntax parsing
- All relative imports resolve
- Every configured navigation target exists
- All seven local source-deck WebP assets resolve
- Unsupported Tailwind opacity utilities were not found
- `src/index.css` passed PostCSS parsing with 287 CSS rules
- Custom CSS brace balance passed
- The standard project validator passed with `npm run validate`

## Responsive render matrix

| Viewport | Horizontal overflow | Broken images | Console errors | Result |
|---|---:|---:|---:|---:|
| 320 x 568 | 0 | 0 | 0 | Pass |
| 360 x 800 | 0 | 0 | 0 | Pass |
| 390 x 844 | 0 | 0 | 0 | Pass |
| 414 x 896 | 0 | 0 | 0 | Pass |
| 768 x 1024 | 0 | 0 | 0 | Pass |
| 1024 x 550 | 0 | 0 | 0 | Pass |
| 1024 x 768 | 0 | 0 | 0 | Pass |
| 1280 x 800 | 0 | 0 | 0 | Pass |
| 1440 x 900 | 0 | 0 | 0 | Pass |
| 1920 x 1080 | 0 | 0 | 0 | Pass |

Additional visual captures reviewed the deck layout at `320x700`, `390x844` and `1024x768`. The active slide remained uncropped, the mobile controls stayed inside the viewport, the detail card wrapped correctly and the thumbnail index changed to a two-column phone grid.

The offline render harness uses a representative static snapshot of the changed component markup, the project's exact custom CSS and locally generated utility CSS. It verifies geometry and responsive behavior, but it does not replace a live React/Framer Motion production run.

## Hero-specific review

- 1440px desktop composition preserves clear separation between copy and command console
- 1024 x 550 low-height mode keeps the complete console and CTA row visible in the initial viewport
- Mobile typography remains within the viewport at 320px
- Decorative beams, glows and command-card perspective do not create document overflow
- Engine sizing uses a component-specific override so global engine widths cannot escape the console
- Fine-pointer parallax is skipped for touch input and disabled by reduced-motion/data preferences
- Repeating CSS animation is covered by the existing `prefers-reduced-motion` fallback

## Deck-specific review

- Active slides render with `object-contain` rather than `object-cover`
- Main carousel supports Arrow Left, Arrow Right, Home and End
- Touch/pointer swipes require a horizontal threshold and ignore vertical scrolling gestures
- Inspect mode supports Escape and Arrow navigation
- Inspect mode traps keyboard focus and restores focus after closing
- Body scrolling is reference-count locked while inspect mode is open
- The mobile deck index wraps instead of creating page-level horizontal scrolling
- All controls maintain practical mobile touch sizes

## Environment limitation

The environment could not reach the npm registry, so project dependencies could not be installed. The build command completed `npm run validate` and then stopped at `vite build` because the local Vite binary was unavailable. The source parser, project validator, stylesheet parser and offline browser geometry checks all passed.

Run one final internet-enabled verification before deployment:

```bash
npm install
npm run build
npm run preview
```

Then test the deployed URL in current Chrome, Safari, Firefox and Edge, plus at least one real iOS and Android device.
