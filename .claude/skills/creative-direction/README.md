# Creative Direction

A Claude Code Skill that turns Claude into a senior creative director for Awwwards/FWA/CSS Design Awards-tier creative-developer portfolios — design philosophy, art direction and mood, composition and visual balance, typography pairing, color palette rationale, minimalism/maximalism stance, interaction philosophy, and cross-page artistic consistency.

## What this is

This is not a "design trends" reference or a moodboard generator. It's a structured methodology plus opinionated reference material that Claude uses to make and defend specific creative decisions — the kind of call a working creative director makes and can justify in one sentence, not a vague vibe check.

It sits at the **top of a 6-skill ecosystem** for this codebase: it defines the artistic point of view; the other five skills (`portfolio-storytelling`, `ui-ux-designer`, `animation-principles`, `javascript-architecture`, `threejs-website-reviewer`) execute within it. It activates automatically when you ask Claude to pick a palette, pair typefaces, define a mood, judge whether something feels cohesive/premium/dated, or set the overall creative direction for a page or the whole site. See [SKILL.md](SKILL.md) for exact activation conditions.

## Folder structure

```
creative-direction/
├── SKILL.md                          # Core definition: purpose, activation, methodology, related skills
├── README.md                         # This file
├── docs/                             # Deep reference material, read on demand
│   ├── design-philosophy.md          # Coherent point of view; philosophy archetypes with real opinions
│   ├── art-direction-mood.md         # Mood-board practice; adjective → concrete visual decision
│   ├── composition-balance.md        # Negative space, focal point, rule of thirds, asymmetry, tension
│   ├── typography-pairing.md         # Real pairing recipes, display/body logic, 2026 overused pairings
│   ├── color-palette-rationale.md    # 3–5 color palette selection with intent, honest color psychology
│   └── interaction-philosophy.md     # The FEEL of motion as creative direction, briefing animation-principles
├── checklists/                       # Systematic audit passes
│   ├── consistency-audit-checklist.md  # Cross-page/cross-section coherence audit
│   └── critique-checklist.md           # "Does this feel like one artistic vision" framework
├── templates/                        # Output structures Claude fills in
│   ├── mood-board-brief-template.md    # Pre-design creative direction brief
│   └── design-critique-template.md     # Structured critique output format
├── examples/                         # Calibration examples
│   ├── inspiration-references.md       # Curated, specific Awwwards/FWA-tier breakdowns, with the "why"
│   └── consistency-failure-example.md  # A diagnosed example of a portfolio that doesn't cohere
└── snippets/                         # Copy-paste-ready starting points
    ├── palette-pairing-recipes.md      # Named hex palettes with rationale
    └── typography-pairing-recipes.md   # Named typeface pairings with rationale
```

## How to use it

Just ask, in this workspace:

- "What color palette fits a portfolio that should feel clinical and precise?"
- "Pair a display typeface with something for body copy — this should feel confident but not corporate."
- "Does the case-study page still feel like the same site as the landing page?"
- "This hero feels generic, what's wrong with it?"
- "Write a creative brief before I start building the About page."
- "Is glassmorphism still a good idea in 2026?"

Claude will pick the right output depth automatically (see "Output format" in [SKILL.md](SKILL.md)) — a quick answer for a scoped question, a full brief via [templates/mood-board-brief-template.md](templates/mood-board-brief-template.md) for a new project, or a full audit via [checklists/consistency-audit-checklist.md](checklists/consistency-audit-checklist.md) for an existing multi-page site.

## Assumed context

Tuned for: **Awwwards/FWA/CSS Design Awards-tier creative-developer portfolios**, built with **Three.js + GSAP + raw GLSL + Vite**, where the visual language has to hold up against current award-winning work, not generic SaaS defaults. If the actual project is a more conservative client/agency site, Claude adapts the register — see the "Assumed context" section of [SKILL.md](SKILL.md).

## Where this Skill stops

This Skill owns the vision layer only. It deliberately does **not** own:

- Grid mechanics, spacing scale math, type *scale* (sizes/ratios), WCAG contrast, accessibility → `ui-ux-designer`
- Narrative content, copywriting, project sequencing → `portfolio-storytelling`
- Easing curves, duration numbers, choreography mechanics → `animation-principles`
- Code structure and implementation → `javascript-architecture` / `threejs-website-reviewer`

See [SKILL.md](SKILL.md#related-skills) for the exact boundary language used to hand off each of these.

## Maintaining this Skill

- Keep `docs/color-palette-rationale.md` and `docs/typography-pairing.md` current — design trends move fast; a pairing or palette strategy that reads as fresh in 2024 can read as dated by 2026. Revisit yearly at minimum.
- Add new palette/typography combinations you land on and would reuse to [snippets/palette-pairing-recipes.md](snippets/palette-pairing-recipes.md) / [snippets/typography-pairing-recipes.md](snippets/typography-pairing-recipes.md) instead of re-deriving them each time.
- If Claude's creative output drifts toward generic "clean and modern" filler, revisit [examples/inspiration-references.md](examples/inspiration-references.md) and the Tone section of [SKILL.md](SKILL.md) — they're the calibration anchor against genericism.
