# Spacing & Type Scale Tokens

Ready-to-drop-in CSS custom properties implementing the spacing scale from [docs/spacing-typography.md](../docs/spacing-typography.md). Drop this into a `tokens.css` (or equivalent) imported once at the app root in a Vite project.

```css
:root {
  /* ============================================
     SPACING SCALE — 8px base unit
     ============================================ */
  --space-1: 0.25rem;   /* 4px  */
  --space-2: 0.5rem;    /* 8px  — base unit */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-7: 3rem;      /* 48px */
  --space-8: 4rem;      /* 64px */
  --space-9: 6rem;      /* 96px */
  --space-10: 8rem;     /* 128px */
  --space-11: 12rem;    /* 192px */

  /* Fluid section padding — mobile --space-8 to desktop --space-10 */
  --space-section: clamp(4rem, 5vw + 2rem, 8rem);

  /* ============================================
     TYPE SCALE — 1.25 ratio (Major Third), 16px base
     ============================================ */
  --text-xs: 0.64rem;    /* ~10px */
  --text-sm: 0.8rem;     /* ~13px */
  --text-base: 1rem;     /* 16px  — never go smaller for body copy */
  --text-md: 1.25rem;    /* 20px  */
  --text-lg: 1.563rem;   /* ~25px */
  --text-xl: 1.953rem;   /* ~31px */
  --text-2xl: 2.441rem;  /* ~39px */
  --text-3xl: 3.052rem;  /* ~49px */
  --text-4xl: 3.815rem;  /* ~61px */
  --text-5xl: 4.768rem;  /* ~76px */

  /* Fluid variants for display/heading type (see snippets/fluid-typography.md for the full set) */
  --text-4xl-fluid: clamp(2.5rem, 1.6rem + 4.5vw, 3.815rem);
  --text-5xl-fluid: clamp(3rem, 2rem + 5vw, 4.768rem);

  /* ============================================
     LINE HEIGHT — by role
     ============================================ */
  --leading-tight: 1.15;   /* headings */
  --leading-normal: 1.5;   /* UI labels, buttons */
  --leading-relaxed: 1.65; /* body copy */

  /* ============================================
     LINE LENGTH
     ============================================ */
  --measure-prose: 65ch;

  /* ============================================
     BREAKPOINTS (for reference in JS via matchMedia; CSS media queries hardcode these)
     ============================================ */
  --bp-sm: 480px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;

  /* ============================================
     RADIUS + BORDER (commonly paired with spacing scale)
     ============================================ */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  --border-width: 1px;
}
```

## Usage rules (enforced by convention, not the browser)

- Every `margin`, `padding`, and `gap` value in component CSS should reference a `--space-*` token. If a value doesn't fit an existing step, that's a signal to either use the nearest step or add a new one to this file — never hardcode a one-off.
- Every `font-size` should reference a `--text-*` token (fluid variant for headings/display type, fixed for anything at or below `--text-base`).
- JS breakpoint checks (`matchMedia`, resize handlers) should read the same pixel values as `--bp-*` — keep them in sync manually since custom properties aren't readable inside a media query condition; consider generating both from a single JSON/JS source of truth if the project's build tooling supports it, to avoid drift between the CSS and JS breakpoint values (a `javascript-architecture` concern for how that sync is implemented).

## Optional: Sass/PostCSS map equivalent

If the project uses PostCSS with `postcss-simple-vars` or similar rather than raw custom properties for build-time values:

```js
// spacing.tokens.js — single source of truth importable by both CSS-in-JS and JS breakpoint logic
export const space = {
  1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.5rem',
  6: '2rem', 7: '3rem', 8: '4rem', 9: '6rem', 10: '8rem', 11: '12rem',
};

export const breakpoints = {
  sm: 480, md: 768, lg: 1024, xl: 1280, '2xl': 1536,
};
```
