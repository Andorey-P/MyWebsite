# Easing Curve Reference

Concrete named-ease-to-use-case mapping, with cubic-bezier equivalents and a plain-language "feel" description. This is the lookup table version of [docs/easing-timing.md § easing curve reference](../docs/easing-timing.md#easing-curve-reference) — use that doc for the reasoning, this file for fast lookup while writing code.

## GSAP power family

| GSAP ease | Cubic-bezier (approx.) | Feel | Typical use |
|---|---|---|---|
| `power1.out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Gentle, soft arrival | Large/heavy elements, backgrounds, atmosphere, secondary/supporting motion |
| `power1.in` | `cubic-bezier(0.55, 0.06, 0.68, 0.19)` | Slow building start | Rare on its own — mostly used inside `inOut` compositing |
| `power1.inOut` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Very smooth both ends | Idle/ambient loops, slow atmospheric shifts |
| `power2.out` | `cubic-bezier(0.16, 0.68, 0.43, 0.99)` | Confident, clean deceleration | **Default choice** — most UI entrances, reveals, hover states |
| `power2.in` | `cubic-bezier(0.55, 0, 0.85, 0.35)` | Accelerating away | Exits where the element should feel like it's leaving with purpose |
| `power2.inOut` | `cubic-bezier(0.45, 0, 0.55, 1)` | Smooth accelerate-decelerate | Pass-through motion (camera moves between framings, marquee-style passes) |
| `power3.out` | `cubic-bezier(0.19, 1, 0.22, 1)` | Snappy, energetic arrival | Primary focal element (headline, hero CTA) — 1-2 uses per moment max |
| `power4.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Very snappy, almost overshoots without a spring | High-energy brand direction signature moments only |

## Sine family (very soft, near-imperceptible ease)

| GSAP ease | Cubic-bezier (approx.) | Feel | Typical use |
|---|---|---|---|
| `sine.out` | `cubic-bezier(0.39, 0.575, 0.565, 1)` | Barely-there deceleration | Very subtle UI micro-shifts |
| `sine.inOut` | `cubic-bezier(0.37, 0, 0.63, 1)` | Smooth, continuous, breathing | Ambient/idle Three.js motion (bob, drift, slow pulse) — no beginning/end reads to it |

## Spring/overshoot family (use sparingly — see restraint guidance)

| GSAP ease | Feel | Typical use | Cap |
|---|---|---|---|
| `back.out(1.2)` | Slight, tasteful overshoot | A small number of deliberate accent moments (icon pop, CTA arrival) | Default choice within the family |
| `back.out(1.7)` | More pronounced overshoot | Single hero signature moment, sparingly | Upper bound for "confident," not "bouncy" |
| `back.out(2)`+ | Toy-like, cartoonish | Avoid on a professional portfolio | — |
| `elastic.out(1, 0.5)` | Springy, 2-3 visible settle bounces | One playful confirmation moment (favorite/like icon) | Never on page-level or repeated list items |
| `elastic.out(1, 0.75)` | Softer, single visible bounce | Slightly more restrained alternative to the above | Same restriction |

## Linear

| GSAP ease | Feel | Typical use |
|---|---|---|
| `none` | No deceleration at all | Scroll-scrubbed tweens (scrub itself provides the ease), continuous unbounded rotation loops |

## Custom cubic-bezier (signature moments only)

| Bezier | Feel | Typical use |
|---|---|---|
| `cubic-bezier(0.65, 0, 0.35, 1)` | Balanced anticipation-then-arrival, slightly more "considered" than `power2.inOut` | A distinctive page-transition wipe as a brand signature |
| `cubic-bezier(0.83, 0, 0.17, 1)` | Sharp, almost stepped acceleration into deceleration | High-drama single moment (rare, deliberate) |

GSAP accepts raw bezier via `CustomEase` (Club plugin) or `ease: 'cubic-bezier(...)'` isn't natively supported — for custom curves without the plugin, use `ease: 'M0,0 C0.65,0 0.35,1 1,1'` SVG-path syntax with the free `CustomEase.create()`, or approximate with a built-in.

## Quick decision table

| If the element is... | Start here |
|---|---|
| A hover/click/focus response | `power2.out`, 120–250ms |
| A large background/atmospheric element | `power1.out`, longer duration |
| The single primary focal element in a moment | `power3.out` |
| Passing through the viewport (no clear arrival point) | `power2.inOut` |
| A signature accent moment (used once, maybe twice per page) | `back.out(1.4)`–`back.out(1.7)` |
| Continuously looping/idle | `sine.inOut` |
| Bound to scroll `scrub` | `none` |
| A camera move | `power2.inOut` (traveling) or `power2.out` (arriving) — see [docs/camera-cinematography.md](../docs/camera-cinematography.md) |

## Related

- Full reasoning and duration pairing: [docs/easing-timing.md](../docs/easing-timing.md)
- Applied in context: [snippets/gsap-timeline-patterns.md](gsap-timeline-patterns.md), [snippets/camera-tween-patterns.md](camera-tween-patterns.md)
