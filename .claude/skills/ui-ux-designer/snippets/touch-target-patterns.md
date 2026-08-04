# Touch Target Patterns

CSS/HTML patterns for correct touch target sizing (44×44px default, 24×24px WCAG 2.2 AA floor — see [docs/accessibility.md](../docs/accessibility.md#touch-targets)) without inflating visual density on a design-forward portfolio site where oversized buttons can look clumsy.

## The core technique: expand the hit area, not the visual element

The visual glyph/icon can stay small and refined; the interactive box around it meets the minimum. This is the single most useful pattern in this file — use it whenever a designed icon/element is smaller than 44px but still needs a compliant target.

```css
.icon-button {
  /* Interactive area */
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-button svg {
  /* Visual glyph stays small */
  width: 18px;
  height: 18px;
}
```

## Invisible hit-area expansion (when the visual element can't change size at all)

For a small inline element (a close "×" inside a tight layout, a text-link-styled icon) where growing the box would break the surrounding layout, expand the *clickable* area with a pseudo-element or negative-margin technique instead of resizing the box itself:

```css
.close-icon {
  position: relative;
  width: 20px;
  height: 20px;
}
.close-icon::after {
  content: "";
  position: absolute;
  inset: -12px; /* expands the hit area to 44x44px (20 + 12*2) without affecting layout flow */
}
```

**Caution:** this only extends the *pointer* hit area. It does nothing for keyboard focus rings, which will still visually wrap the small 20px box — that's correct (the focus ring should indicate the actual visual element), just don't confuse "I expanded the tap area" with "I expanded the focus target," which are different concerns.

## Adjacent target spacing (8px minimum gap)

Even compliant individual targets cause mis-taps if packed edge-to-edge. Enforce spacing at the container level so it can't be forgotten per-instance:

```css
.icon-toolbar {
  display: flex;
  gap: 8px; /* minimum; prefer var(--space-2) or larger where layout allows */
}
```

## Text links inline within body copy (an exception, by necessity)

Inline text links within a paragraph cannot practically meet 44px height without breaking typography — WCAG 2.2's Target Size criterion (SC 2.5.8) explicitly exempts inline links within a sentence of text for exactly this reason. No special CSS needed here; this is a documented, intentional exception, not an oversight — don't "fix" it by adding padding that breaks text flow.

## Dense UI clusters: tag chips / filter pills

Small tag/filter chips are a common place density and target-size compliance conflict. Compromise pattern: keep the visual chip compact, but ensure the actual tap target (via padding, not just visual size) clears the 24px AA floor, and group with adequate gap:

```css
.filter-pill {
  padding: 0.5rem 0.875rem; /* --space-2 vertical, ~14px horizontal */
  min-height: 32px;         /* below the 44px ideal but clears the 24px hard floor */
  border-radius: var(--radius-full);
}
.filter-pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2); /* 8px min */
}
```

Use the relaxed 24–32px floor here deliberately (not 44px) because these are secondary, low-consequence, easily-retried controls (toggling a filter) in a dense cluster — per the exception carved out in [docs/accessibility.md](../docs/accessibility.md#touch-targets). Don't apply this relaxed sizing to primary actions (nav, submit buttons, card CTAs) — those stay at 44px.

## Verifying in dev tools

Chrome DevTools' rendering panel (`Rendering` → `Show tap target sizes`, or the newer "Highlight target size issues" overlay in current Lighthouse/DevTools accessibility audits) draws a visible box over every interactive element's computed hit area. Run this pass over the full page rather than spot-checking individual components — targets that look fine in isolation frequently fail once real spacing/padding from a parent container is applied.

## What NOT to do

- Don't resize a carefully designed small icon just to hit 44px visually — expand the invisible hit area instead.
- Don't apply the 24px "dense cluster" exception to primary CTAs, nav items, or form submit buttons.
- Don't forget the 8px minimum gap between adjacent targets even when each one individually clears the size minimum.
- Don't add padding to inline text links inside body copy to force 44px height — this is a documented WCAG exemption, not a violation to fix.
