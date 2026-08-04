# CSS Grid Patterns

Copy-paste-ready grid/subgrid recipes for common portfolio sections. All use the breakpoint values and spacing tokens from [docs/responsive-design.md](../docs/responsive-design.md) and [docs/spacing-typography.md](../docs/spacing-typography.md) — swap in the project's actual token names if they differ.

## Base responsive grid (4 / 8 / 12 columns)

The foundational grid every section should build on. See [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md#grid-system) for the full rationale.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  padding-inline: var(--space-4);
  max-width: 1600px;
  margin-inline: auto;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
    gap: var(--space-5);
    padding-inline: var(--space-6);
  }
}

@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-6);
    padding-inline: var(--space-9);
  }
}
```

## Project grid: 1 / 2 / 3 columns with fixed-aspect media

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}

.project-card { grid-column: span 4; } /* 1-up mobile */

@media (min-width: 768px) {
  .project-grid { grid-template-columns: repeat(8, 1fr); }
  .project-card { grid-column: span 4; } /* 2-up tablet */
}

@media (min-width: 1280px) {
  .project-grid { grid-template-columns: repeat(12, 1fr); }
  .project-card { grid-column: span 4; } /* 3-up desktop */
}

.project-card__media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Subgrid: baseline-aligned card content regardless of title/description length

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.project-card {
  display: grid;
  grid-row: span 4;
  /* rows: media / title / description / cta */
  grid-template-rows: subgrid;
}

/* Parent must define the row tracks the children subgrid into */
.project-grid {
  grid-template-rows: repeat(auto-fill, [media] auto [title] auto [desc] 1fr [cta] auto);
}
```

**Fallback for browsers without `subgrid` support (rare by 2026, but Safari lagged historically):** fall back to a fixed `min-height` on the description row via `@supports not (grid-template-rows: subgrid)` rather than leaving misaligned CTAs — see [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md#subgrid-for-nested-alignment).

## Asymmetric feature grid (hero project + supporting grid)

Common on portfolio homepages: one large featured case study beside/above a denser grid of smaller entries.

```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}

.feature-grid__hero { grid-column: span 4; }
.feature-grid__item { grid-column: span 4; }

@media (min-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(2, minmax(240px, auto));
  }
  .feature-grid__hero {
    grid-column: span 8;
    grid-row: span 2;
  }
  .feature-grid__item {
    grid-column: span 4;
  }
}
```

## Two-column split (image + text case-study section)

```css
.split-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .split-section {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: var(--space-9);
  }
  .split-section--reverse {
    direction: rtl; /* flips visual order without reordering DOM/tab order */
  }
  .split-section--reverse > * {
    direction: ltr; /* restore normal text direction inside children */
  }
}
```

Prefer the `direction: rtl` flip (or explicit `order` used only for *visual* reversal, never to fix a logical reading-order problem) over reordering the actual DOM — see the focus-order warning in [docs/accessibility.md](../docs/accessibility.md#focus-states).

## Container-query card (works in any grid context)

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card { padding: var(--space-4); }
.card__title { font-size: var(--text-md); }

@container card (min-width: 360px) {
  .card {
    display: grid;
    grid-template-columns: 40% 1fr;
    gap: var(--space-4);
  }
  .card__title { font-size: var(--text-lg); }
}
```

## What NOT to do

- Don't use `flexbox` with percentage widths to fake a grid (`width: 30%` per item) — it doesn't reserve gap space correctly and has no row-relative alignment mechanism; use `grid` for anything genuinely grid-shaped.
- Don't hardcode `grid-template-columns: repeat(3, 1fr)` without a mobile fallback — always define the mobile-first base before layering breakpoints.
- Don't use `order` to fix a tab-order bug — fix the DOM order instead.
