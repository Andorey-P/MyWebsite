# Component Checklist

Per-component structural checklist for nav, cards, modals, and forms. Use when designing or reviewing a single component — see [docs/interaction-patterns.md](../docs/interaction-patterns.md) for the full pattern rationale.

## Navigation

- [ ] 3–5 top-level items max; more triggers an information-architecture review, not a bigger bar
- [ ] Desktop: inline bar with `default`/`scrolled` states, each meeting contrast requirements against whatever's behind it
- [ ] Mobile: hamburger trigger (44×44px min) opens a full-screen overlay, not a cramped dropdown
- [ ] Overlay traps focus, closes on `Escape`/link-select, returns focus to trigger on close
- [ ] Every link/trigger has a visible `:focus-visible` state
- [ ] Nav sits above canvas and cursor layers in stacking order

## Cards (project/case-study grid items)

- [ ] Entire card is a single hit target (one wrapping `<a>`, no nested interactive elements)
- [ ] Media has a fixed, consistent `aspect-ratio` across the grid
- [ ] Hover-revealed content (overlay, description, secondary image) has a touch/focus equivalent, not hover-only
- [ ] Title, meta, and CTA align consistently across sibling cards regardless of content length (subgrid or fixed-row-height grid)
- [ ] Card meets the 44px-min tap target as a whole on touch tiers

## Modals / overlays

- [ ] `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the modal heading
- [ ] Focus trapped while open; returns to trigger on close
- [ ] Three dismiss methods present: close button (44×44px min), `Escape`, backdrop click/tap
- [ ] Background scroll locked while open (including Lenis pause, if in use)
- [ ] No layout shift when scroll lock engages (scrollbar-width compensated)

## Forms

- [ ] Single-column layout, even on desktop
- [ ] Labels top-aligned above each input, not placeholder-only
- [ ] Every field: real `<label>`, 44px-min height, visible focus state
- [ ] Inline validation on blur (not every keystroke) except for actively-erred fields
- [ ] Errors: `aria-describedby` + `role="alert"`/`aria-live` + visible text, not color-only
- [ ] Required fields marked visually and with `required`/`aria-required`

## Cursor-follow / custom pointer UI

- [ ] Every cursor-morph state is mirrored by a change on the element itself (never cursor-only signal)
- [ ] `pointer-events: none` set on the cursor element so it never blocks clicks/hovers underneath
- [ ] Disabled entirely on `(hover: none) and (pointer: coarse)` devices, not left inert
- [ ] Full state inventory defined before implementation: default, hover-interactive, hover-media, drag-active, disabled/loading

## Every custom interactive component (general)

- [ ] All four states defined: `default`, `:hover`, `:focus-visible`, `:active`/pressed
- [ ] Meets 44px touch target (or documented, justified exception down to 24px minimum)
- [ ] Meets 3:1 non-text contrast for borders/icons conveying state
- [ ] Reachable and fully operable by keyboard alone

## Close with

- [ ] Note which component(s) are missing a full state set or touch-target compliance — these are the highest-priority fixes, since they block usage rather than just looking imperfect
