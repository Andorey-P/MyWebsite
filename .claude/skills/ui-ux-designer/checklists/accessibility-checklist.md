# Accessibility Checklist (WCAG 2.2 AA)

Use for a systematic accessibility pass on a page or full site. Work top to bottom; note selector/component for anything that fails. See [docs/accessibility.md](../docs/accessibility.md) for the reasoning and exact numbers behind each item.

## 1. Touch targets & pointer input

- [ ] Every interactive element is at least 24×24px (hard WCAG 2.2 AA floor); primary actions (nav, buttons, CTAs) are 44×44px
- [ ] Adjacent interactive targets have at least 8px of spacing between them
- [ ] Target size includes padding, not just the visible glyph/icon

## 2. Focus states

- [ ] Every interactive element has a visible `:focus-visible` style — no bare `outline: none` without a replacement
- [ ] Focus indicator meets 3:1 contrast against adjacent background and the element itself
- [ ] Focus order matches visual/DOM reading order — no CSS-reordered or absolutely-positioned elements creating an illogical tab sequence
- [ ] Custom cursor states (hover/drag/magnetic-snap) are mirrored by a redundant signal on the element itself, not cursor-only

## 3. Keyboard navigation

- [ ] Every mouse/touch-triggered interaction (hover reveals, drag-to-rotate, cursor-follow triggers) has a keyboard-operable equivalent
- [ ] Skip link to main content present and functional if a persistent nav or full-viewport hero precedes it
- [ ] Modals/overlays trap focus while open and return focus to the trigger on close
- [ ] `Escape` closes any open modal/overlay/nav takeover
- [ ] No keyboard traps anywhere on the page

## 4. Motion

- [ ] `prefers-reduced-motion: reduce` is checked in JS and honored for any scroll-hijack, camera fly-through, or parallax effect
- [ ] The CSS blanket rule (`animation-duration`/`transition-duration` near-zero under `prefers-reduced-motion`) is present as a baseline safety net
- [ ] No auto-playing animation sequence longer than ~5s runs with no way to pause/stop it (WCAG SC 2.2.2)

## 5. Canvas / 3D content

- [ ] `<canvas>` elements are `aria-hidden="true"` when equivalent content exists elsewhere in real DOM
- [ ] No headline/body copy exists only as WebGL-rendered text with no real DOM duplicate
- [ ] Genuinely interactive canvas content (draggable objects, clickable hotspots with no DOM equivalent) has an `aria-label`/text alternative and, ideally, a keyboard-operable control set
- [ ] Loading screens use `aria-live="polite"` for status text and never block access to real content longer than the actual load

## 6. Color & contrast

- [ ] All body text meets 4.5:1 contrast against its background; large text (≥24px or ≥19px bold) meets 3:1
- [ ] Text over canvas/video/gradient backgrounds is verified against the background's worst-case (lightest/most-washed-out) frame, not the average
- [ ] UI component borders/icons conveying state meet 3:1 non-text contrast
- [ ] Color is never the only signal for state (errors, active nav, selected items also carry an icon/text/weight change)

## 7. Forms

- [ ] Every input has a real, programmatically associated `<label>` — no placeholder-as-label
- [ ] Error messages are associated via `aria-describedby`, announced via `aria-live`/`role="alert"`, and stated in visible text
- [ ] Required fields are marked both visually and with `required`/`aria-required="true"`

## 8. Structure & semantics

- [ ] Heading levels (`h1`–`h6`) are sequential and describe actual document structure, not chosen for visual size
- [ ] Landmark regions (`<nav>`, `<main>`, `<footer>`) present and singular where appropriate
- [ ] Images have meaningful `alt` text (or `alt=""` when purely decorative)
- [ ] Primary navigation and core content are reachable without relying on any 3D/canvas interaction

## Close with

- [ ] Prioritized list of accessibility fixes, ordered by how many users are blocked (keyboard traps and missing focus states outrank contrast nitpicks on secondary text)
