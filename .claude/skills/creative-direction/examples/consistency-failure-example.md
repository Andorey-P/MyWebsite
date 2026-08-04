# Consistency Failure Example — Diagnosed

A worked example of a portfolio whose pages don't feel like one artistic vision, diagnosed specifically using [checklists/consistency-audit-checklist.md](../checklists/consistency-audit-checklist.md). This is the calibration anchor for what a *specific*, evidence-based coherence finding looks like, as opposed to a vague "it feels off" complaint.

---

## The site (hypothetical, composite of a common real pattern)

A four-page creative-developer portfolio: **Home**, **Work** (project grid), **Case Study** (individual project deep-dive), **About/Contact**.

- **Home:** Dark background (`#0D0D0D`), a full-bleed Three.js particle hero, geometric grotesque headline in all-caps, one cyan accent (`#3DDBD9`) on the CTA button, snappy/precise hover states, generous negative space.
- **Work:** Same dark background, project grid using card components with a warm amber (`#E8934A`) hover-glow effect that doesn't appear anywhere on Home, grid is dense with minimal spacing between cards.
- **Case Study:** Light background (`#FAFAF8`) — a hard switch from dark — body copy set in a serif that doesn't appear on any other page, no 3D elements at all, pull-quote treatment styled with the same amber from the Work page but at a different value (`#D97D35`).
- **About/Contact:** Back to dark background, but a *different* dark value (`#151515`, not the `#0D0D0D` used on Home), a rounded, friendly sans-serif for headings (not the grotesque used elsewhere), bouncy/springy hover states on the contact form fields that contradict the snappy motion on Home.

## Diagnosis, using the checklist categories

### 1. Point of view — fails

The one-sentence thesis from Home ("precise, technical, particle-driven") is not supported by Case Study (warm, editorial, no 3D at all) or About (friendly, bouncy, rounded type). A visitor who lands on Home and clicks through to a Case Study would reasonably wonder if they navigated to a different site. This is the root failure; the checks below are downstream symptoms of the same root cause — nobody wrote down a thesis before building, so each page solved its own local problem.

### 2. Color — fails on three counts

- Case Study's light background (`#FAFAF8`) breaks from every other page's dark-mode-first treatment with no stated reason — this isn't "light mode is wrong," it's that *nothing* signals this was an intentional, considered exception (see [docs/design-philosophy.md](../docs/design-philosophy.md) on when light-mode-first is the right call — it should be a whole-site decision or a clearly-motivated single exception, not an unexplained one-page drift).
- Two different amber values are used for what's meant to be the same accent color (`#E8934A` on Work, `#D97D35` on Case Study) — this reads as an implementation drift (two people, or two sessions, eyeballing "close enough") rather than a deliberate secondary-accent decision.
- About's near-black (`#151515`) is a different value from Home's (`#0D0D0D`) — close enough that most viewers won't consciously register the specific hex difference, but different enough that a side-by-side "swap test" (see [checklists/consistency-audit-checklist.md](../checklists/consistency-audit-checklist.md#7-the-swap-test)) shows a visible seam.

### 3. Typography — fails

Three different typefaces are now in play across four pages (the grotesque on Home/Work, a serif on Case Study, a rounded sans on About) against this Skill's stated ceiling of display + body + optional mono (see [docs/typography-pairing.md](../docs/typography-pairing.md)). Each individual choice might even be defensible in isolation (the serif genuinely suits long-form case-study reading), but nothing here reads as *one* typographic system — it reads as three separate decisions made without reference to each other.

### 4. Composition — partial fail

Work's dense grid isn't wrong on its own (denser composition for a scannable project list is a reasonable content-driven choice, per [docs/composition-balance.md](../docs/composition-balance.md)'s note on not maximizing negative space everywhere) — but paired with Home's very generous spacing and no stated density logic connecting the two, the jump reads as inconsistent rather than intentional.

### 5. Interaction feel — fails

Home is precise/snappy. About's form fields are loose/bouncy. Per [docs/interaction-philosophy.md](../docs/interaction-philosophy.md), a blend across pages is legitimate *only* when the split is deliberate and statable ("cinematic hero, precise elsewhere"). Here, nobody could state the rule — it reads as two different people's default motion instincts, not a designed blend.

### 6. Material and 3D language — fails

3D presence goes from "the entire thesis of the homepage" to "completely absent" on Case Study with no transitional logic. If 3D isn't meant to appear on every page (a legitimate choice — see Reference 2 in [examples/inspiration-references.md](inspiration-references.md), which restrains 3D to small embedded vignettes rather than every page), that needs to be a stated rule, not something that happens to be true because the Case Study page ran out of build time.

### 7. Swap test — fails outright

Screenshotting the hero-equivalent area of all four pages side by side (no text, no logos) produces four images that would not be grouped as one site by an unfamiliar viewer. This is the single clearest piece of evidence that the site fails cross-page coherence, and it's the fastest check to run before diagnosing anything else.

## Priority fix order (highest leverage first)

1. **Write the one-sentence thesis** (skipped originally) and check every page against it — this reframes every fix below from "make it match" to "make it match *this specific stated thing*."
2. **Lock the palette to the 3–5 color budget** — pick one amber value, decide whether Case Study's light-mode departure is a deliberate whole-site-informed exception (rare, needs its own stated reason) or should be brought back to dark, and unify the two near-black values.
3. **Cut the typography down to display + body** — the serif needs to either become the site's actual body face everywhere long-form reading happens, or be retired; the rounded sans on About should be replaced with the established grotesque or a genuinely justified pairing partner.
4. **State the interaction blend explicitly** and bring About's form-field motion in line with it (or explicitly justify bouncy-on-forms as a deliberate, rare exception with a stated reason — e.g. "forms specifically get a warmer register to feel less clinical/intimidating" — which is a legitimate call, but currently isn't one anyone actually made).
5. **Decide the 3D-presence rule** (every page / hero only / narrative vignettes) and apply it consistently, per [design-philosophy.md](../docs/design-philosophy.md)'s question about whether the 3D work carries the thesis.

Note what this diagnosis deliberately avoids: it doesn't say "make everything identical." Work's denser grid and Case Study's more editorial reading rhythm can both stay — content-driven variation is legitimate (see [docs/composition-balance.md](../docs/composition-balance.md)). What has to go is the *unexplained* drift in palette, typography, and motion that has no relationship to content differences at all.
