# Responsive Design Checklist

Use for a systematic breakpoint/fluid-layout pass on a page or full site. Work top to bottom; note file/selector for anything that fails. See [docs/responsive-design.md](../docs/responsive-design.md) for the reasoning behind each item.

## 1. Breakpoint strategy

- [ ] Breakpoints are mobile-first (`min-width` queries), not desktop-first (`max-width`), unless retrofitting into an existing desktop-first codebase
- [ ] No more than ~5 breakpoint tiers in active use (`480 / 768 / 1024 / 1280 / 1536`) — extra one-offs are scoped to the specific component that needs them, not added to the global system
- [ ] Every breakpoint value traces to an actual content/layout need, not a device-matrix guess
- [ ] Container queries (`@container`) used for components that appear in more than one layout context, not viewport media queries

## 2. Fluid sizing

- [ ] Type sizes above body-copy scale use `clamp()` rather than fixed-then-breakpoint-swapped values
- [ ] Section/major spacing uses fluid `clamp()` scaling between mobile and desktop values, not a hard jump at one breakpoint
- [ ] Body copy (`--text-base`) is NOT aggressively fluid-scaled — stays close to a fixed 16–18px range for readability
- [ ] No visible "jump" in heading size when resizing the viewport across a breakpoint (sign that a fluid value should replace a breakpoint swap)

## 3. Layout structural changes

- [ ] Column count changes are deliberate per breakpoint (not simply "whatever fits") and match the grid system in [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md)
- [ ] Content that's hidden/reordered/reflowed at each tier is a deliberate decision, stated, not an accident of squeeze
- [ ] Nav pattern switches from inline bar to full-screen overlay at the correct tier (see [docs/interaction-patterns.md](../docs/interaction-patterns.md#navigation))
- [ ] Max content width capped (~1440–1600px) on ultra-wide viewports — grid doesn't stretch unbounded

## 4. Canvas / 3D layout behavior

- [ ] Canvas viewport share is deliberately set per breakpoint (not just visually scaled), stated as an explicit proportion (e.g. "100svh desktop, 65svh mobile")
- [ ] A decision exists (even if "no change") for whether canvas quality/complexity should tier down on smaller/lower-power viewports — flag to `javascript-architecture`/`threejs-website-reviewer` for implementation
- [ ] Full-viewport-height sections use `100svh` (with `100vh` fallback), not bare `100vh`, to avoid mobile address-bar-collapse jump
- [ ] No layout-breaking overlap between canvas and DOM content at any tested viewport width

## 5. Touch vs. cursor input parity

- [ ] No interaction is hover-only with zero touch/tap equivalent at touch-input breakpoints (cross-check against [checklists/accessibility-checklist.md](accessibility-checklist.md))
- [ ] Custom cursor-follow elements are disabled via `(hover: none) and (pointer: coarse)` on touch-primary devices, not left inert
- [ ] Drag-to-interact 3D elements have a usable touch gesture equivalent, not just mouse-drag

## 6. Verification

- [ ] Tested (or explicitly noted as untested) at minimum: 375px (small phone), 768px (tablet portrait), 1024px (tablet landscape/small laptop), 1440px (desktop), 1920px+ (wide desktop)
- [ ] No horizontal scroll/overflow at any tested width
- [ ] Text remains legible (no sub-16px body copy) at every tier

## Close with

- [ ] Prioritized list of breakpoint/fluid-layout fixes, highest visual-impact first
