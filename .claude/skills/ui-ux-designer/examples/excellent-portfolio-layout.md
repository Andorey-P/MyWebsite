# Calibration Example: Excellent Portfolio Layout

A worked walkthrough of a strong homepage layout for a hypothetical creative-developer portfolio ("Studio Node") — a Three.js hero, a project grid, and an about strip. This is the tone/depth target for a layout spec: concrete numbers, stated reasoning, real CSS. Not a template to copy verbatim — the numbers are for this hypothetical site's content.

---

## Section: Hero

**Structure:** Full-viewport-height (`100svh`) canvas background with an abstract particle-shader scene, DOM content overlaid: eyebrow label, oversized headline, one-line role/positioning statement, scroll cue.

**Why it works:**

- **Hierarchy is unambiguous.** The headline is set at `--text-5xl` (`clamp(3rem, 2rem + 5vw, 4.768rem)`), weight 600, full-contrast white against a dark scrim. Nothing else on screen approaches that size+weight+contrast combination — the eyebrow label is `--text-sm`, uppercase, 50% opacity; the role statement is `--text-md`, regular weight. There is exactly one visual winner, per [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md#establishing-hierarchy-size-weight-contrast-position--in-that-order-of-reliability) — no competing element ties with the headline.
- **Text-over-canvas contrast is guaranteed, not hoped for.** A `linear-gradient` scrim sits behind the text block, `color-mix(in srgb, var(--color-bg-inverse) 60%, transparent)` at its darkest point directly behind the headline, fading to transparent at the block's edges. This was verified against the *lightest* frame the particle shader produces (a near-white flash state), not its average dark state — the headline holds ≥4.5:1 at all times, per [docs/color-systems.md](../docs/color-systems.md#practical-rule-for-text-over-a-canvasvideogradient-background).
- **White space is disproportionate and deliberate.** The text block occupies the vertical center third of the viewport, with roughly 2× the surrounding empty space compared to any other section on the page. This isolation is what makes the hero read as a considered statement rather than "content plus a background."
- **Mobile canvas share is a decision, not a shrink.** Desktop hero is `100svh`; mobile hero is capped at `70svh` — worked out from [docs/responsive-design.md](../docs/responsive-design.md#desktop--tablet--mobile-layout-strategy-for-a-3d-canvas-site) so a phone visitor reaches real project content within one scroll rather than fighting a full-viewport hero on a 6-inch screen.
- **Real DOM text, canvas is decorative.** The headline exists as an actual `<h1>` with `aria-hidden` on the canvas — nothing depends on WebGL-rendered typography for content or SEO, per [docs/accessibility.md](../docs/accessibility.md#canvas--3d-accessibility-fallbacks).

```css
.hero {
  position: relative;
  height: 100vh;
  height: 100svh;
  display: grid;
  place-items: center;
}
.hero__canvas { position: absolute; inset: 0; }
.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 44rem;
  padding-inline: var(--space-5);
}
.hero__content::before {
  content: "";
  position: absolute;
  inset: -3rem -6rem;
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, var(--color-bg-inverse) 60%, transparent) 0%,
    transparent 70%
  );
  z-index: -1;
}
.hero__title {
  font-size: clamp(3rem, 2rem + 5vw, 4.768rem);
  font-weight: 600;
  line-height: var(--leading-tight);
}
@media (max-width: 767px) {
  .hero { height: 70svh; min-height: 70svh; }
}
```

## Section: Project grid

**Structure:** 12-column desktop grid, project cards spanning 4 columns each (3-up), 8-column tablet with cards spanning 4 (2-up), 4-column mobile with cards spanning 4 (1-up, full width).

**Why it works:**

- **Aspect ratio is fixed, not intrinsic.** Every card's media is `aspect-ratio: 4/3` regardless of source image dimensions — the grid reads as a considered system rather than a photo dump with jagged row heights, per [docs/interaction-patterns.md](../docs/interaction-patterns.md#cards-projectcase-study-grid-items).
- **Subgrid keeps CTAs aligned.** Titles vary from one to two lines across projects; using `grid-template-rows: subgrid` inside each card means every "View project →" label sits on the same baseline across the row regardless of title length — no card looks shorter or visually "sinks."
- **One hit target per card.** The whole card is a single `<a>` — no separate nested link competing with the image for clicks, satisfying both the UX and the no-nested-interactive-elements accessibility rule.
- **Hover reveal has a touch equivalent.** Desktop reveals a short description on `:hover` via an opacity/translate change on an absolutely-positioned overlay; below the `lg` breakpoint, that same overlay is always-visible (no hover trigger required) rather than permanently hidden on touch devices.

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
  padding-inline: var(--space-4);
}
@media (min-width: 768px) {
  .project-grid { grid-template-columns: repeat(8, 1fr); gap: var(--space-5); }
  .project-card { grid-column: span 4; }
}
@media (min-width: 1280px) {
  .project-grid { grid-template-columns: repeat(12, 1fr); gap: var(--space-6); padding-inline: var(--space-9); }
  .project-card { grid-column: span 4; }
}
```

## Why this is the calibration target

Every decision above traces to a stated reason and a specific number — the headline size isn't "big," it's `clamp(3rem, 2rem + 5vw, 4.768rem)` because it's the top step of the established type scale; the scrim isn't "darker," it's verified against the shader's lightest producible frame. Contrast this with [poor-layout-example.md](poor-layout-example.md), which makes the same layout decisions without any of the underlying reasoning or numbers — that's the failure mode this skill exists to prevent.
