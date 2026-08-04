# Fluid Typography Recipes

`clamp()`-based fluid type scale recipes, keyed to the type scale in [docs/spacing-typography.md](../docs/spacing-typography.md). Use for anything `--text-lg` and above; keep `--text-base` (body copy) stable rather than aggressively fluid — see the rationale in that doc.

## The formula

```
clamp(MIN, MIN + (MAX - MIN) * ((100vw - MIN_VIEWPORT) / (MAX_VIEWPORT - MIN_VIEWPORT)), MAX)
```

Simplified in practice to a `rem + vw` hybrid for the preferred-value term, which approximates the same linear interpolation without a full calc chain:

```
clamp(MIN_REM, BASE_REM + N vw, MAX_REM)
```

Where `N` (the vw coefficient) is tuned so the curve hits roughly `MAX_REM` around the `xl` (1280px) breakpoint — beyond that, the clamp ceiling holds the value flat, which is correct: type shouldn't keep growing indefinitely on ultrawide monitors.

## Ready-to-use scale (mobile 375px → desktop 1440px interpolation range)

```css
:root {
  --text-md-fluid: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
  --text-lg-fluid: clamp(1.25rem, 1.05rem + 0.9vw, 1.563rem);
  --text-xl-fluid: clamp(1.5rem, 1.2rem + 1.4vw, 1.953rem);
  --text-2xl-fluid: clamp(1.75rem, 1.3rem + 2.1vw, 2.441rem);
  --text-3xl-fluid: clamp(2.1rem, 1.4rem + 3.2vw, 3.052rem);
  --text-4xl-fluid: clamp(2.5rem, 1.6rem + 4.5vw, 3.815rem);
  --text-5xl-fluid: clamp(3rem, 2rem + 5vw, 4.768rem);
}
```

## Custom min/max pair (worked example)

To generate a custom fluid step — say a hero statement that should read `40px` at a `375px` viewport and `96px` at a `1440px` viewport:

1. Convert to rem (16px root): min `2.5rem`, max `6rem`.
2. Slope = `(6 - 2.5) / (1440 - 375) = 0.00329`rem per px of viewport.
3. vw coefficient = slope × 100 = `0.329vw`.
4. Intercept (rem at `0vw`) = `min - slope * minViewport` = `2.5 - 0.00329 * 375 = 1.266rem`.
5. Result:
   ```css
   font-size: clamp(2.5rem, 1.266rem + 0.329vw, 6rem);
   ```

Recompute this whenever the min/max pair or the target viewport interpolation range changes — don't eyeball the vw coefficient, since a wrong coefficient produces a curve that overshoots or undershoots the intended max before the viewport reaches it.

## Fluid spacing (same technique applied to layout, not just type)

```css
:root {
  --space-section-fluid: clamp(4rem, 2.5rem + 6vw, 8rem);   /* section padding, mobile→desktop */
  --space-gap-fluid: clamp(1rem, 0.7rem + 1.2vw, 2rem);      /* grid gap, mobile→desktop */
}
```

## Fluid hero headline, capped and floored deliberately

```css
.hero__title {
  /* Never smaller than 2.5rem (readable as a hero statement even on the smallest supported phone)
     never larger than 6rem (avoids an absurd headline on a 3440px ultrawide) */
  font-size: clamp(2.5rem, 1.6rem + 4.5vw, 6rem);
  line-height: var(--leading-tight);
}
```

## Container-relative fluid type (for a component, not the viewport)

When a heading's size should respond to its own container rather than the viewport (e.g. a card title in a grid that's sometimes 3-up, sometimes 1-up featured), use `cqw` (container query width units) instead of `vw`:

```css
.card {
  container-type: inline-size;
}
.card__title {
  font-size: clamp(1.125rem, 1rem + 2cqw, 1.75rem);
}
```

## What NOT to do

- Don't fluid-scale body copy (`--text-base`) with a wide `clamp()` range — keep it close to fixed (16–18px) for reading stability.
- Don't guess the vw coefficient — compute it from the actual min/max/viewport-range triple using the formula above, or the curve will overshoot/undershoot its intended target size.
- Don't leave a `clamp()` uncapped on the high end (always set a real `MAX`, never `clamp(MIN, Nvw, none)`-style unbounded growth) — type must stop scaling at some point or it becomes absurd on very wide viewports.
- Don't mix `vw`-based fluid type with a page that also has a max-width container cap without accounting for it — past the container's max-width, viewport-relative units keep scaling even though the visible content width has stopped growing, causing text to look oversized relative to its container on ultrawide screens. Prefer `cqw` (container query units) for anything inside a capped-width container.
