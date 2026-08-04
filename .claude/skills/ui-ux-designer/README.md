# UI/UX Designer

A Claude Code Skill that turns Claude into a senior UI/UX designer and design-systems lead for creative-developer portfolio and client websites — responsive breakpoints, spacing/type scales, grid systems and visual hierarchy, functional color tokens, WCAG 2.2 accessibility, and interaction patterns (nav, cards, modals, forms, cursor-follow UI).

## What this is

This is not a generic "UI best practices" reference. It's a structured methodology plus reference material that Claude uses to produce specific, numeric, immediately implementable layout decisions — exact breakpoints, exact spacing values, exact contrast ratios — calibrated to Awwwards / FWA / CSS Design Awards-tier creative-developer portfolios built with Three.js, GSAP, and Vite, not generic SaaS dashboards.

It owns the **structural/systemic** layer of design specifically: how a page is laid out, sized, spaced, and made accessible. It deliberately does not own color *mood*, typeface *pairing*, animation *timing*, or copy — those belong to sibling skills. See "Related skills" in [SKILL.md](SKILL.md) for the full boundary map.

It activates automatically when you ask Claude to design, lay out, restructure, or review the structure of a page or component in this workspace. See [SKILL.md](SKILL.md) for exact activation conditions.

## Folder structure

```
ui-ux-designer/
├── SKILL.md                          # Core definition: purpose, activation, methodology, output format, related skills
├── README.md                         # This file
├── docs/                             # Deep reference material, read on demand while designing/reviewing
│   ├── responsive-design.md          # Breakpoint strategy, fluid layout, container queries, canvas-aware responsive approach
│   ├── spacing-typography.md         # Spacing scale system, type scale/ratio, vertical rhythm, fluid type
│   ├── visual-hierarchy-layout.md    # Grid systems, alignment, white space, hierarchy via size/weight/contrast/position
│   ├── color-systems.md              # Functional color tokens, contrast ratios, dark mode strategy, semantic naming
│   ├── accessibility.md              # WCAG 2.2, touch targets, focus states, keyboard nav, canvas/3D fallbacks
│   └── interaction-patterns.md       # Nav, cards, modals, forms, cursor-follow structure, hover/focus states
├── checklists/                       # Systematic pass-through checklists
│   ├── responsive-checklist.md       # Breakpoint/fluid-layout pass
│   ├── accessibility-checklist.md    # WCAG 2.2 AA pass
│   ├── layout-review-checklist.md    # Grid/spacing/hierarchy audit
│   └── component-checklist.md        # Per-component structural checklist
├── templates/                        # Output structures Claude fills in
│   ├── layout-spec-template.md       # Full page/section layout spec
│   ├── component-spec-template.md    # Single component spec
│   └── design-review-template.md     # Structural design review output
├── examples/                         # Calibration examples — what good vs. bad output looks like
│   ├── excellent-portfolio-layout.md
│   ├── poor-layout-example.md
│   └── breakpoint-example.md
└── snippets/                         # Copy-paste-ready reference implementations
    ├── css-grid-patterns.md
    ├── spacing-scale-tokens.md
    ├── fluid-typography.md
    └── touch-target-patterns.md
```

## How to use it

Just ask, in this workspace:

- "Design the layout for the project grid section"
- "What breakpoints should this site use?"
- "Review the spacing/hierarchy on the hero section"
- "Is this contrast ratio WCAG compliant?"
- "Build a responsive nav pattern for a canvas-driven site"
- "Walk through the accessibility checklist on the case study page"

Claude will pick the right output format and depth automatically (see "Output format" in [SKILL.md](SKILL.md)). For a full layout audit, it will work through [checklists/layout-review-checklist.md](checklists/layout-review-checklist.md) or [checklists/accessibility-checklist.md](checklists/accessibility-checklist.md) and can be asked to pause on any category for depth.

If a request is actually about color mood, typeface pairing, animation timing, or copy, Claude will redirect to the relevant sibling skill (`creative-direction`, `portfolio-storytelling`, `animation-principles`) rather than answering outside its lane — see "Related skills" in [SKILL.md](SKILL.md).

## Assumed stack

Tuned for: **Vite + ES Modules + vanilla JavaScript, GSAP + ScrollTrigger, Lenis, a Three.js/GLSL canvas layered with standard DOM content, plain CSS with custom properties.** This is a portfolio or client-facing marketing site where layout has to hold up next to Awwwards/FWA-tier work. If your project differs (a component framework, Tailwind, TypeScript), Claude adapts — see the "Assumed stack" section of [SKILL.md](SKILL.md).

## Maintaining this Skill

- Keep `docs/` as the source of numeric truth — breakpoint values, contrast ratios, touch target minimums, spacing ratios. Update it if WCAG revises AA/AAA numbers or when the project settles on a different base grid.
- Add layout decisions you keep re-deriving to the relevant `snippets/` or `checklists/` file so future specs reuse them instead of re-deriving them from scratch.
- If Claude's design output drifts toward generic SaaS-dashboard advice instead of creative-dev-portfolio-tier specificity, revisit `examples/excellent-portfolio-layout.md` and `examples/poor-layout-example.md` — they're the calibration anchor.
- If a request keeps landing here that actually belongs to a sibling skill (palette mood, animation timing, copy), tighten the boundary language in `SKILL.md § Related skills` rather than letting this skill's docs absorb that content.
