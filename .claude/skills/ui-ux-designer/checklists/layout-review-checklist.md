# Layout Review Checklist

Use for a structural audit of a page/section's grid, spacing, and hierarchy. Work top to bottom; note selector/section for anything that fails. See [docs/visual-hierarchy-layout.md](../docs/visual-hierarchy-layout.md) and [docs/spacing-typography.md](../docs/spacing-typography.md) for reasoning.

## 1. Grid system

- [ ] Layout uses the shared grid system (4/8/12 columns per breakpoint) rather than ad hoc widths per section
- [ ] Components span column ranges (`grid-column: span N`), not arbitrary pixel/percent widths
- [ ] Gutter values come from the spacing scale, consistent across the page
- [ ] Content container has a max-width cap on ultra-wide viewports (~1440–1600px)

## 2. Spacing

- [ ] Every margin/padding/gap value is a spacing-scale token (`var(--space-*)`) — no unexplained hardcoded pixel values
- [ ] Related elements sit closer together than unrelated elements (proximity correctly signals grouping)
- [ ] Section padding scales fluidly between mobile and desktop, not a hard breakpoint jump
- [ ] The single most important element on the page/section has disproportionate white space around it (deliberate isolation, not accidental)
- [ ] Heading-to-body spacing is larger than paragraph-to-paragraph spacing (heading visually groups with what follows)

## 3. Typography

- [ ] Type sizes map to the defined scale (no off-scale font-size values)
- [ ] Body copy is never below 16px
- [ ] Line length for prose is capped (~60–75 characters / `max-width: 65ch`)
- [ ] Line-height differs appropriately by role (tight for headings, generous for body copy)
- [ ] Heading levels are used for structure, not chosen purely for visual size (cross-check [accessibility-checklist.md](accessibility-checklist.md))

## 4. Hierarchy

- [ ] Exactly one element per view wins on size + weight + contrast simultaneously (no tie for "most important")
- [ ] Primary CTA is visually distinguished by contrast/isolation, not just placed and hoped for
- [ ] No two unrelated elements compete at the same size/weight/contrast tier
- [ ] Hierarchy order (what's meant to be scanned first/second/third) can be stated in one sentence and matches what the eye actually does

## 5. Alignment

- [ ] One dominant alignment axis per section, held consistently (not left-aligned text beside centered CTAs in the same section without reason)
- [ ] Body copy is never center-aligned beyond 1–2 short lines
- [ ] Icons/glyphs are optically (not just mathematically) aligned against adjacent text baselines

## 6. Scan pattern fit

- [ ] Sparse/hero sections are composed along a Z-pattern (clear 3–4 anchor points)
- [ ] Content-dense sections (case studies, about) are composed for F-pattern scanning — key words front-loaded in headings/lead sentences, left-aligned
- [ ] No content-dense section relies on a scattered/off-edge layout that fights natural scanning behavior

## Close with

- [ ] Prioritized list of structural fixes, highest visual-impact first (hierarchy/spacing-system violations outrank optical alignment nitpicks)
