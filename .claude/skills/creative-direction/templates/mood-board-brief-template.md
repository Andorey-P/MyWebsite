# Mood Board / Creative Direction Brief Template

Fill in every section before design begins. A blank or vague answer anywhere is a signal to stop and resolve it before moving to palette/type/composition — see [docs/design-philosophy.md](../docs/design-philosophy.md) for how to answer the first three sections honestly.

---

## 1. Point of view

- **Who is this for, specifically?** (Not "recruiters" — the actual person, in a specific moment: e.g. "a hiring manager at a mid-size creative agency, evaluating 15 minutes between other candidates.")
- **The one adjective a competitor's portfolio wouldn't use:**
- **What should someone remember five minutes after leaving:**
- **What this is deliberately NOT** (the rejected direction, named explicitly):
- **Does the 3D/WebGL work carry the thesis, or support a conventional portfolio structure?**

## 2. Mood translation

State the mood adjective, then answer all six from [docs/art-direction-mood.md](../docs/art-direction-mood.md):

- **Mood adjective:**
- **Color temperature/saturation:**
- **Type voice:**
- **Motion speed/character (brief only, no numbers — see [docs/interaction-philosophy.md](../docs/interaction-philosophy.md)):**
- **Density/negative space:**
- **Material/texture language:**
- **Sound-adjacent register:**

## 3. Philosophy archetype

- **Primary archetype** (from [docs/design-philosophy.md](../docs/design-philosophy.md): brutalist-minimal / editorial-grid / maximalist-kinetic / quiet-luxury-minimal / other, named):
- **Why this archetype fits the point of view above, in one sentence:**
- **Any deliberate secondary influence** (e.g. "primarily quiet-luxury-minimal, with one maximalist-kinetic hero moment"):

## 4. Palette

- **Background (dominant neutral):** — hex, and the one-sentence reason
- **Secondary neutral (text/surface):** — hex, and the one-sentence reason
- **Accent 1:** — hex, its specific job (interactive/focal signal — where does it appear and where does it NOT appear)
- **Accent 2 (only if genuinely needed):** — hex, its job, and why one accent wasn't enough
- **Rejected colors** (colors considered and cut, and why — forces discipline; see [docs/color-palette-rationale.md](../docs/color-palette-rationale.md)):

## 5. Typography

- **Display typeface:** — category and specific face, one-sentence reason tied to mood
- **Body typeface:** — category and specific face, one-sentence reason, and what it contrasts against the display face on
- **Shared trait between the two** (per [docs/typography-pairing.md](../docs/typography-pairing.md)'s pairing logic):
- **Monospace (optional):** — where it's used, if at all

## 6. Composition stance

- **Symmetric or asymmetric, and why** (per [docs/composition-balance.md](../docs/composition-balance.md)):
- **Negative space level** (generous/moderate/tight) and what it's meant to do:
- **Primary focal mechanism per hero-equivalent screen** (motion / scale / isolation / color contrast / depth-of-field):

## 7. Interaction philosophy

- **Primary register** (precise-snappy / loose-organic / cinematic-slow / named blend, per [docs/interaction-philosophy.md](../docs/interaction-philosophy.md)):
- **If blended, the exact split** (e.g. "cinematic for hero + section transitions, precise for nav and micro-interactions"):
- **The 2–3 signature interaction moments** (name them specifically — everything else should be quiet by comparison):
- **What this should never feel like** (the failure mode to avoid):

## 8. References

- 2–3 images/sites per category (color, type, motion/interaction, 3D material) with a one-line caption naming *which specific decision* each demonstrates. Include at least one "close but wrong" reference and why it's excluded — see [docs/art-direction-mood.md](../docs/art-direction-mood.md#mood-board-practice).

## 9. Handoff

- **To `portfolio-storytelling`:** narrative structure/copy needed, informed by the point-of-view section above.
- **To `ui-ux-designer`:** exact type scale, spacing system, contrast verification of the palette above, accessibility pass.
- **To `animation-principles`:** the interaction philosophy section above, turned into actual easing/duration values and choreography.
