# Palette Recipes

Ready-to-use 3–5 color palettes, each named, with hex values and the rationale behind every color's job. Selection method and deeper rationale live in [docs/color-palette-rationale.md](../docs/color-palette-rationale.md) — this file is the fast-reference version. Pick by matching the mood word, not by which looks nicest in isolation; a palette that doesn't match the stated mood is wrong regardless of its individual appeal.

Adapt exact lightness/contrast values with `ui-ux-designer` for WCAG compliance before shipping — these hex values are creative starting points, not verified-accessible tokens.

---

### Forensic — clinical, precise, technical

| Role | Hex | Note |
|---|---|---|
| Background | `#0A0C0E` | Near-black, whisper of cool blue — not flat `#000000` |
| Primary text | `#E8EAED` | Soft off-white, not pure white — easier at body-copy sizes |
| Secondary text | `#6B7280` | Mid cool gray for metadata/captions |
| Accent | `#3DDBD9` | Cold cyan-teal — interactive states only |

**Use for:** brutalist-minimal or clinical-mood technical portfolios. **Don't use for:** anything warm, playful, or luxury-positioned — the cold undertone actively fights those moods.

---

### Warm Editorial — considered, unhurried, literary

| Role | Hex | Note |
|---|---|---|
| Background | `#F5F1EA` | Warm off-white, paper-like |
| Primary text | `#221D17` | Warm near-black with brown undertone |
| Secondary text | `#8A7F6E` | Warm taupe for bylines/captions |
| Accent | `#B34728` | Burnt terracotta — links, pull quotes, oversized numerals |

**Use for:** editorial-grid, case-study-heavy, writing-forward portfolios. **Don't use for:** WebGL-spectacle-led portfolios where the light background will mute dark-optimized particle/glow effects.

---

### Signal — aggressive, high-energy, confrontational

| Role | Hex | Note |
|---|---|---|
| Background | `#050505` | True near-black, deliberately harsh/flat |
| Primary text | `#FFFFFF` | Full white — correct here, unlike most other recipes |
| Accent 1 | `#FF3B1F` | Hot red-orange, the loudest single focal moment |
| Accent 2 (rare) | `#CFFF04` | Acid green-yellow, used even more sparingly than accent 1 |

**Use for:** maximalist-kinetic, motion-designer, high-energy portfolios. **Don't use for:** anything meant to read as calm, trustworthy, or enterprise-client-facing — this palette reads as confrontational by design.

---

### Quiet Signal — restrained luxury with warmth

| Role | Hex | Note |
|---|---|---|
| Background | `#161310` | Deep near-black, warm undertone (not blue-shifted) |
| Primary text | `#EDE7DD` | Warm off-white |
| Secondary text | `#7C7267` | Warm mid-gray |
| Accent (used twice, maybe) | `#B8925A` | Muted warm gold — near-absent by design |

**Use for:** quiet-luxury-minimal, product-design/brand-work portfolios targeting senior/client audiences. **Don't use for:** junior candidates who need to visibly demonstrate range — this palette's whole point is restraint, which can undersell breadth.

---

### Cool Slate — neutral-professional with one confident accent

| Role | Hex | Note |
|---|---|---|
| Background | `#12151A` | Cool charcoal, slightly blue-gray |
| Surface (cards/panels) | `#1B1F26` | One step up in lightness for layering |
| Primary text | `#DCE0E5` | Cool off-white |
| Secondary text | `#7A8390` | Cool mid-gray |
| Accent | `#5B8CFF` | Confident blue — CTAs and active states |

**Use for:** a safer, still-current default for portfolios without a strongly stated mood yet — a reasonable starting point while a sharper point of view is still being defined, not a permanent substitute for one (see [docs/design-philosophy.md](../docs/design-philosophy.md) on why "safe" shouldn't be the final answer).

---

### Monochrome Zero — near-total restraint, one signal only

| Role | Hex | Note |
|---|---|---|
| Background | `#000000` | True black, used deliberately, not by default |
| Text | `#FFFFFF` | True white |
| Accent | `#FF0044` or none | Optional single hot signal, used at most 2–3 times site-wide |

**Use for:** brutalist-minimal taken to its extreme, or a portfolio for someone whose actual creative work provides all the color (photographers, illustrators, colorists) — the site itself should recede completely. **Don't use for:** portfolios where the developer's own color/material sensibility is part of what's being evaluated — true monochrome answers nothing about that skill.

## Building a new palette from scratch

If none of the above fit, derive one using [docs/color-palette-rationale.md](../docs/color-palette-rationale.md)'s method: pick the dominant neutral and its temperature first (driven by the mood word), then the secondary neutral for text contrast, then exactly one accent with a single stated job, adding a second accent only if the mood genuinely demands more energy than one accent can carry (see the Signal recipe above for when that's justified).
