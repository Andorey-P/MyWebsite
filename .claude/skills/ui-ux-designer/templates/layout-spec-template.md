# Layout Spec Output Template

Use this structure when designing a full page or section layout. For a single component, use [component-spec-template.md](component-spec-template.md) instead. For a scoped question, skip the full structure — see [SKILL.md § Output format](../SKILL.md#output-format).

---

## Scope

One or two sentences: what's being designed (page/section), and what already exists to work within (an existing spacing/type scale, an established grid, brand tokens from `creative-direction`). State any assumptions made about content that wasn't provided.

## Intent & hierarchy

State explicitly, before any layout detail:
- What should the eye hit first, second, third (see [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md#establishing-hierarchy-size-weight-contrast-position--in-that-order-of-reliability))
- What the primary action/outcome of this section is (view a project, scroll further, submit contact info)

## Grid & structure

- Column system used per breakpoint (reference [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md#grid-system) or state a deviation and why)
- Content max-width
- Real CSS:
  ```css
  /* grid definition */
  ```

## Spacing

- Section padding (mobile → desktop, as a `clamp()` if fluid)
- Internal component spacing, referencing scale tokens
- Real CSS:
  ```css
  /* spacing values */
  ```

## Typography

- Which type-scale steps are used for which elements, and why those steps (not just "looks right")
- Fluid vs. fixed sizing decision per element
- Real CSS:
  ```css
  /* type sizing */
  ```

## Responsive behavior

State explicitly what changes at each relevant breakpoint — don't leave this implied by the CSS alone:

| Breakpoint | Column/structure change | What's hidden/reordered/resized |
|---|---|---|
| Mobile (0–767px) | ... | ... |
| Tablet (768–1023px) | ... | ... |
| Desktop (1024px+) | ... | ... |

## Color & contrast

- Semantic tokens used (reference [docs/color-systems.md](../docs/color-systems.md)), not raw palette values
- Contrast verification for any text over variable backgrounds (canvas/gradient), stated as pass/fail against worst-case frame

## Accessibility notes

- Touch target sizing for any interactive elements introduced
- Focus order and keyboard reachability
- `prefers-reduced-motion` hook, if the section includes scroll-driven or auto-playing motion
- Canvas fallback content, if a 3D/WebGL element is present

## Full markup + CSS

```html
<!-- real, complete markup -->
```

```css
/* real, complete CSS, using project token conventions */
```

## Handoffs

Note explicitly what this spec does *not* cover and who owns it:
- Motion timing/easing → `animation-principles`
- Copy content → `portfolio-storytelling`
- Palette/typeface choice rationale → `creative-direction`
- JS state/event wiring → `javascript-architecture`

## Open questions

Anything assumed due to missing content/context (real copy length, final image assets, brand palette values) that should be verified once available.
