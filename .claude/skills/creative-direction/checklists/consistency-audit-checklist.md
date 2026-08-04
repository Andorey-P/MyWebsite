# Consistency Audit Checklist

Use for auditing whether an existing multi-page/multi-section site reads as one artistic vision. Work top to bottom, checking every page/section against the same answers — the goal isn't "is each page good," it's "do they visibly share a creator." Note the specific page/section and the specific deviation for anything that fails; "the about page feels different" isn't a finding, "the about page uses a warm cream background while every other page is near-black" is.

Pair with [critique-checklist.md](critique-checklist.md) for judging a single page's internal coherence; use this checklist for cross-page/cross-section comparison specifically.

## 1. Point of view

- [ ] Can you state the site's one-sentence creative thesis (from [docs/design-philosophy.md](../docs/design-philosophy.md)) after seeing only the homepage? Does every other page still support that same thesis, or does one page feel like it's making a different pitch?
- [ ] Is there a page that could be swapped into a completely different portfolio without anyone noticing? (A generic contact page, a stock-template about page.) That's a coherence failure even if that page is individually well-executed.

## 2. Color

- [ ] Is the same palette (per [docs/color-palette-rationale.md](../docs/color-palette-rationale.md)) used on every page, or does a page introduce a color not in the established 3–5-color budget?
- [ ] Is the accent color's *job* consistent — does it always mean "interactive/focal" everywhere, or does one page use it decoratively while another uses it functionally?
- [ ] Do all pages share the same background value/temperature, or does one page drift lighter/darker/warmer/cooler without a stated reason?
- [ ] If project imagery/thumbnails introduce their own colors (unavoidable — the work has its own palette), is there a consistent frame/treatment (border, overlay, duotone, grayscale-until-hover) that keeps the *site's* palette dominant rather than each thumbnail's native colors taking over the page?

## 3. Typography

- [ ] Is the same display/body pairing (per [docs/typography-pairing.md](../docs/typography-pairing.md)) used site-wide, or does a page introduce a third typeface?
- [ ] Is type voice consistent — same tracking/case conventions for headlines, same treatment for captions/metadata, across every page?
- [ ] Do heading levels *mean* the same thing everywhere (an H2 on the case-study page reads at the same relative weight/prominence as an H2 on the about page)? Note: the exact scale/ratio enforcement is `ui-ux-designer` territory — this check is purely "does it look/feel consistent," not "is the ratio mathematically correct."

## 4. Composition

- [ ] Do hero-equivalent moments (top of homepage, top of a case study, top of about) share a composition logic (per [docs/composition-balance.md](../docs/composition-balance.md)) — same general density, same use of negative space — even if the specific layout differs?
- [ ] Is there a page that's noticeably more cluttered or noticeably emptier than the rest with no content-driven reason (more content justifies more density; a page that's just under-designed doesn't)?
- [ ] Does every page have a clear single focal point per screen, or does at least one page drift into competing-focal-point territory (see [docs/composition-balance.md](../docs/composition-balance.md))?

## 5. Interaction feel

- [ ] Is the interaction register (precise/loose/cinematic, per [docs/interaction-philosophy.md](../docs/interaction-philosophy.md)) consistent across pages — do hover states, transitions, and scroll behavior feel like the same hand designed them?
- [ ] Do page-to-page transitions feel considered, or does navigating between pages feel like a hard context switch (a cinematic homepage into an instant-cut case-study page, with no transition bridging them)?
- [ ] Are the site's 2–3 "signature" interaction moments (per [docs/interaction-philosophy.md](../docs/interaction-philosophy.md)) actually distinct from the baseline, or has "everything is a signature moment" crept back in on a page that was built later/by a different pass?

## 6. Material and 3D language

- [ ] Do all 3D scenes/elements across pages share a lighting mood (warm/cool, hard/soft shadows) and material finish (matte/glossy, grainy/clean), or does one scene look like it was lit/authored with a different reference in mind?
- [ ] Is the same visual treatment applied to recurring elements (project cards, buttons, the cursor if custom) everywhere they appear, or does a later-built page reinvent one of these instead of reusing the established treatment?

## 7. The "swap test"

- [ ] Take a screenshot of each page's hero-equivalent area, remove all text/logos, and look at them side by side. Would someone unfamiliar with the site immediately group them as one project? If any one image looks like it belongs to a different site, that page is the priority fix — name specifically which of the checks above it's failing rather than describing it as a vague "feels off."

## Closing the audit

List every failed check with its specific page/section and specific deviation (not "feels inconsistent" — the actual color/typeface/spacing/motion difference). Rank fixes by how load-bearing the broken page is (a case-study page seen by every recruiter outranks a rarely-visited legal/credits page) and hand the prioritized list back using [templates/design-critique-template.md](../templates/design-critique-template.md).
