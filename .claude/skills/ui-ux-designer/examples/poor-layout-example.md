# Calibration Example: Poor Layout Example

The same hypothetical site as [excellent-portfolio-layout.md](excellent-portfolio-layout.md) ("Studio Node"), but built the way an under-specified layout commonly ends up — visually similar at a glance, structurally broken underneath. Paired contrast: read this after the excellent example to see exactly what's different and why it matters.

---

## Section: Hero

**What's here:**

```css
.hero {
  height: 100vh;
  padding: 40px;
}
.hero h1 {
  font-size: 72px;
  color: #f5f5f5;
}
.hero p {
  font-size: 22px;
  color: #eaeaea;
}
.hero .eyebrow {
  font-size: 18px;
  color: #dcdcdc;
}
```

**Why this fails:**

- **No hierarchy — three text elements at near-identical weight/contrast.** The headline (`72px`), the role statement (`22px`), and the eyebrow (`18px`) all use nearly the same light-gray-on-dark color with no scrim, no weight differentiation stated, and no deliberate white-space isolation. Per [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md#establishing-hierarchy-size-weight-contrast-position--in-that-order-of-reliability), size alone (`72px` vs `22px`) is *a* signal, but with near-equal contrast and no white-space isolation the page still reads flat and unconsidered rather than deliberately composed — there's no reinforcement, so it feels like default sizing choices, not hierarchy.
- **`100vh`, not `100svh`, on a mobile-loaded hero.** On iOS Safari before the address bar collapses, this overflows the visible viewport, pushing the scroll cue and part of the headline below the fold on load — the exact bug [docs/responsive-design.md](../docs/responsive-design.md#svhlvhdvh-over-bare-vh-on-mobile) calls out.
- **Contrast never verified against the canvas.** `#f5f5f5` on a busy, animated particle-shader background with no scrim was presumably eyeballed against one frame during development. There's no guarantee it holds 4.5:1 against the shader's lightest frame — this is very likely a real WCAG failure that would only surface when the shader happens to flash light while someone's reading the headline, i.e., intermittently and hard to catch in casual QA.
- **Hardcoded pixel values with no scale.** `72px`, `40px`, `22px`, `18px` — none trace to a spacing/type scale token. The next section built by a different contributor will almost certainly pick different arbitrary values, and the site accumulates a dozen slightly-different "large heading" sizes over a few months, per the anti-pattern named in [docs/spacing-typography.md](../docs/spacing-typography.md).
- **No mobile-specific viewport-height decision.** The hero stays `100vh` at every breakpoint — on a 375px-wide phone this means a visitor has to scroll past a full screen of hero before reaching any actual project content, with no stated reasoning that this was intentional.

## Section: Project grid

**What's here:**

```html
<div class="grid">
  <div class="card">
    <img src="project1.jpg" />
    <h3>Project One</h3>
    <p>Short description text that may run one or two lines depending on content...</p>
    <a href="/project-1">View project</a>
  </div>
  <!-- repeated -->
</div>
```
```css
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card { width: 30%; }
.card img { width: 100%; }
```

**Why this fails:**

- **Nested interactive elements.** If the card itself is later wrapped in a link (a common follow-up "make the whole card clickable" request), this markup produces an `<a>` inside an `<a>` — invalid HTML and a real accessibility violation, per [docs/interaction-patterns.md](../docs/interaction-patterns.md#cards-projectcase-study-grid-items). Even as-is, the description text and the explicit "View project" link create two separate, differently-sized hit targets for what is conceptually one action.
- **No aspect ratio on the image.** `width: 100%` with unset height means every card's height is dictated by whatever aspect ratio its source photo happens to have — a 4:3 photo next to a 16:9 photo next to a square crop produces a visibly uneven, "amateur" grid, the exact failure named in [docs/interaction-patterns.md](../docs/interaction-patterns.md#cards-projectcase-study-grid-items).
- **`flex-wrap` with a fixed `30%` width instead of a grid.** This approximates 3 columns but drifts under real content — a description that wraps to 3 lines instead of 2 pushes that one card's "View project" link out of alignment with its row siblings, since flexbox has no row-relative baseline mechanism equivalent to subgrid. No two projects will visually line up once real copy is dropped in.
- **`20px` gap, `30%` width — again, no scale token**, and `30%` doesn't reserve room for the gap itself, so at exactly 3-per-row this will subtly overflow depending on box-sizing, which is the kind of bug that "looks right" until a specific content length breaks it.

## What to take from this pairing

Both examples are "a hero and a project grid" at the level of a one-line description. The difference the reviewer should be looking for isn't visual — it's whether every number traces to a system (scale, breakpoint strategy, verified contrast) or was chosen in isolation and will drift/break under real content and real devices. See [checklists/layout-review-checklist.md](../checklists/layout-review-checklist.md) for the systematic version of this comparison.
