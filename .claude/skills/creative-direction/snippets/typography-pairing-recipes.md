# Typography Pairing Recipes

Ready-to-use display/body pairings with real, currently-available typeface names, matched to mood. Pairing logic and category-level reasoning live in [docs/typography-pairing.md](../docs/typography-pairing.md) — this file is the fast-reference version. Sizes, scale ratios, and line-height belong to `ui-ux-designer` once a pairing is picked here.

---

### Precision — for clinical, technical, forensic moods

- **Display:** Neue Montreal (or Suisse Int'l) — geometric, tight, cold neutrality at large sizes
- **Body:** Inter, or General Sans — humanist enough to stay comfortable at body sizes without softening the overall register too much
- **Mono (optional):** JetBrains Mono or Berkeley Mono, for code snippets, labels, numerals
- **Shared trait:** both faces are neutral/grotesque-derived with consistent stroke width — the pairing contrasts on personality (geometric vs. humanist) while staying in the same overall family, keeping "precise" intact even in body copy.
- **Pairs with:** the Forensic and Cool Slate palettes in [palette-pairing-recipes.md](palette-pairing-recipes.md).

---

### Editorial Warmth — for warm, literary, unhurried moods

- **Display:** Fraunces (large optical size, high contrast) or Canela — genuine serif character at display sizes
- **Body:** Untitled Sans or Söhne — quiet, readable, doesn't compete with the serif's personality
- **Shared trait:** both have generous, comfortable proportions and moderate x-height — the contrast is serif-vs-sans, not high-drama-vs-plain.
- **Pairs with:** the Warm Editorial palette in [palette-pairing-recipes.md](palette-pairing-recipes.md).
- **Note:** this is the recipe most likely to tip into the "overused Söhne + generic serif" cliché named in [docs/typography-pairing.md](../docs/typography-pairing.md) if executed without any other differentiating decision — pair with an unusual color choice or an unconventional pull-quote treatment to avoid reading as templated.

---

### Signal — for aggressive, high-energy, kinetic moods

- **Display:** Founders Grotesk Condensed, or Druk — heavy, condensed, built for impact at huge sizes, often set in uppercase
- **Body:** Neue Haas Grotesk or Helvetica Now, quiet weight — completely neutral, exists only to get out of the way
- **Shared trait:** grotesque lineage in both — the contrast is entirely in weight/width/scale, not in category, which keeps the pairing from feeling like two unrelated decisions even at maximum drama.
- **Pairs with:** the Signal palette in [palette-pairing-recipes.md](palette-pairing-recipes.md).
- **Variable-font note:** if the display face has a variable width/weight axis (Founders Grotesk X-Condensed or a variable Druk-alike), consider scroll-driven interpolation per [docs/typography-pairing.md](../docs/typography-pairing.md)'s variable-fonts section — this is the pairing most likely to justify that investment.

---

### Quiet Authority — for restrained luxury, product-design moods

- **Display and body, same family:** a variable serif with an optical-size axis (Fraunces variable, or Source Serif 4 variable) used at both display and text sizes, interpolating rather than switching families
- **Mono (rare, if used at all):** a quiet mono for numerals/specs only, e.g. IBM Plex Mono at low visual weight
- **Shared trait:** intentionally the same face throughout — this recipe deliberately breaks the "contrast is what makes a pairing read as composed" default rule from [docs/typography-pairing.md](../docs/typography-pairing.md), and that departure is the point: it signals restraint precisely by refusing to make a second typographic decision.
- **Pairs with:** the Quiet Signal palette in [palette-pairing-recipes.md](palette-pairing-recipes.md).
- **When NOT to use this recipe:** a junior candidate's portfolio, where demonstrating typographic range is part of what's being evaluated — one face throughout undersells range on purpose, which is only correct when restraint itself is the message.

---

### Developer Signal — monospace-as-display

- **Display:** a monospace at large display sizes — Berkeley Mono, Commit Mono, or JetBrains Mono at 6–10rem — used for headline moments specifically, not body copy
- **Body:** Inter or General Sans — fully conventional, keeps reading comfortable since the monospace personality is spent entirely on the display role
- **Shared trait:** both are neutral/utilitarian in spirit even though one is monospaced and one isn't — neither face is trying to be expressive on its own; the *size and context* of the monospace face is what creates its personality, not the letterforms fighting for attention.
- **Pairs with:** the Forensic or Cool Slate palettes in [palette-pairing-recipes.md](palette-pairing-recipes.md).
- **Why it's current for 2026 specifically:** signals "built by someone who codes" without needing literal code-adjacent iconography (`</>`, terminal-window chrome) — the typographic choice itself carries that meaning, which is a more sophisticated version of the same signal a lot of dev portfolios reach for more literally.

---

## Building a new pairing from scratch

If none of the above fit, use the method in [docs/typography-pairing.md](../docs/typography-pairing.md): pick the display face directly from the mood word, pick a body face that contrasts with it on one axis (category, weight, or era) while sharing exactly one quiet trait (x-height, proportion, lineage), and cap the system at display + body + optional mono.
