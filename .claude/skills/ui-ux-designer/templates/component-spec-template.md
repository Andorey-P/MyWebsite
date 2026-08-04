# Component Spec Output Template

Use this structure when designing or specifying a single reusable component (nav, card, modal, form, cursor-follow element). For a full section/page, use [layout-spec-template.md](layout-spec-template.md). For a scoped question, skip straight to the answer — see [SKILL.md § Output format](../SKILL.md#output-format).

---

## Component

Name and one-sentence purpose. Note which established pattern this follows (see [docs/interaction-patterns.md](../docs/interaction-patterns.md)) or, if it's a novel pattern, state why a standard one doesn't fit.

## Anatomy

The structural parts, in order, as a simple list or diagram — e.g.:
```
[ media ] → [ title ] → [ meta ] → [ description (optional) ] → [ CTA ]
```

## States

Every state this component can be in, with a defined visual treatment for each — do not leave any unstated:

| State | Trigger | Visual treatment |
|---|---|---|
| Default | — | ... |
| Hover | pointer over (mouse only) | ... |
| Focus-visible | keyboard focus | ... |
| Active/pressed | click/tap-down | ... |
| Disabled (if applicable) | ... | ... |

## Sizing & spacing

- Dimensions (fixed, fluid, or content-driven), referencing the spacing/type scale
- Minimum touch target confirmation (44×44px default, 24×24px absolute floor with justification if used)

## Responsive behavior

What changes about this component across breakpoints — layout (e.g. side-by-side → stacked), visibility (e.g. secondary text hidden on mobile), or interaction model (hover → tap).

## Markup + CSS

```html
<!-- real, complete markup -->
```

```css
/* real, complete CSS */
```

## Accessibility

- Semantic HTML / ARIA role used and why
- Keyboard operability (what keys do what)
- Focus behavior (order, trap if applicable, return-focus if applicable)
- Touch target and contrast confirmation (reference [docs/accessibility.md](../docs/accessibility.md))

## What this spec does not cover

- Motion/timing for state transitions → `animation-principles`
- Copy content → `portfolio-storytelling`
- JS event wiring/state management → `javascript-architecture`
