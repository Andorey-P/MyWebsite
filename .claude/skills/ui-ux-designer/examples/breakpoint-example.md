# Calibration Example: Full Breakpoint Breakdown

A complete responsive breakdown of one component — the primary site navigation for a hypothetical Three.js-driven portfolio — across every tier. Use this as the depth target for "how should this component behave responsively," not just "what changes at mobile."

Component: persistent site nav, transparent-over-hero by default, solidifying on scroll, following the pattern in [docs/interaction-patterns.md](../docs/interaction-patterns.md#navigation).

---

## Base (0–479px) — small phones

- **Layout:** logo mark left (`32px` height), hamburger trigger right (`44×44px` target, `24px` icon centered within it). No inline links.
- **Bar height:** `64px`, fixed position, `background: transparent` in `default` state.
- **Trigger tap target:** `44×44px` per [docs/accessibility.md](../docs/accessibility.md#touch-targets) — non-negotiable even at this cramped a width; the icon can be visually `20px` but the tappable box stays `44px`.
- **Overlay on open:** full-screen (`position: fixed; inset: 0`), `100svh` height (not `100vh` — avoids the address-bar-collapse jump described in [docs/responsive-design.md](../docs/responsive-design.md#svhlvhdvh-over-bare-vh-on-mobile)), links stacked vertically, `56px` row height each, `--text-lg` size.
- **Scroll behavior:** background switches from `transparent` to `color-mix(in srgb, var(--color-bg-inverse) 92%, transparent)` with `backdrop-filter: blur(12px)` once `scrollY > 40px`, so nav text stays legible over whatever content scrolls beneath it.

```css
.site-nav {
  height: 64px;
  padding-inline: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  transition: background 0.2s ease; /* timing itself is animation-principles' call — structure only */
}
.site-nav[data-scrolled="true"] {
  background: color-mix(in srgb, var(--color-bg-inverse) 92%, transparent);
  backdrop-filter: blur(12px);
}
.site-nav__trigger {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
}
```

## `sm` (480–767px) — large phones

- **No structural change from base** — this tier exists in the general breakpoint set but the nav itself doesn't need a distinct rule here; content width simply grows. This is the correct outcome, not a gap: per [docs/responsive-design.md](../docs/responsive-design.md#breakpoint-set), not every component needs a rule at every tier.

## `md` (768–1023px) — tablets

- **Layout:** still hamburger-triggered — inline links don't fit comfortably yet at typical tablet-portrait widths with a 3–5 item nav plus logo. Overlay pattern unchanged from mobile, but row height can grow slightly (`64px`) since there's more vertical room and fewer competing elements.
- **Bar height:** grows to `72px` — logo mark grows to `36px`.

```css
@media (min-width: 768px) {
  .site-nav { height: 72px; padding-inline: var(--space-6); }
  .site-nav__mark { height: 36px; }
}
```

## `lg` (1024–1279px) — small laptops, tablet landscape

- **Structural switch: hamburger → inline links.** This is the deliberate breakpoint where the pattern changes, per [docs/interaction-patterns.md](../docs/interaction-patterns.md#navigation) — trackpad/cursor input is now the primary interaction model, and there's enough horizontal room for 3–5 links plus logo without crowding.
- **Layout:** logo left, links inline right, each link a `44px`-tall click area (generous even for cursor input — benefits trackpad/touchscreen-laptop users) with `var(--space-6)` (32px) gap between links.
- **Trigger removed from DOM flow** (or `display: none` with the overlay unmounted) rather than just visually hidden — avoid leaving an invisible-but-focusable trigger in the tab order.

```css
@media (min-width: 1024px) {
  .site-nav__trigger { display: none; }
  .site-nav__links {
    display: flex;
    gap: var(--space-6);
  }
  .site-nav__links a {
    display: inline-flex;
    align-items: center;
    height: 44px;
  }
}
```

## `xl` (1280–1535px) — standard desktop

- **No structural change** — bar height and spacing hold from `lg`. Content container gets its standard max-width/padding per the grid system, but the nav component itself is stable across `lg` through `2xl`.

## `2xl` (1536px+) — wide desktop

- **No structural change to the nav itself** — but confirm the nav's inner content respects the page's max-width cap (~1440–1600px, per [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md#grid-system)) rather than letting logo and links drift to the literal viewport edges on an ultrawide monitor.

```css
.site-nav__inner {
  max-width: 1600px;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

## Summary table

| Breakpoint | Pattern | Bar height | Trigger/links |
|---|---|---|---|
| 0–767px | Overlay | 64–72px | Hamburger (44×44px), full-screen overlay on open |
| 768–1023px | Overlay | 72px | Same as mobile, larger logo |
| 1024px+ | Inline | 72px | Inline links, 44px tall targets, trigger removed from DOM |
| 1536px+ | Inline (capped) | 72px | Same, content capped at 1600px max-width |

## Why this level of detail matters

A vague answer ("nav collapses to hamburger on mobile") leaves the actual switch point, the overlay's viewport-height unit, the trigger's removal-vs-hiding, and the ultrawide max-width cap all undecided — each of which is a real bug or inconsistency waiting to happen. Every tier above states a number and a reason; that's what makes it implementable without a follow-up round of questions.
