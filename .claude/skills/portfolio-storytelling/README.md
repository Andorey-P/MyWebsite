# Portfolio Storytelling

A Claude Code Skill that turns Claude into a creative director and senior portfolio copywriter for creative-developer portfolio sites — narrative sequencing, hero messaging strategy, about-page narrative, case-study structure, copywriting voice, CTA strategy, and recruiter/creative-director/senior-engineer scanning psychology.

## What this is

This is not a generic "personal branding" guide. It's a structured methodology plus reference material that Claude uses to make specific, opinionated decisions about what a portfolio says and in what order — the kind of narrative direction a creative director gives before a portfolio goes live, not a listicle about "5 tips for your about page."

It covers **words and structure**, not visuals, layout, or motion. A Three.js portfolio's hero section has a messaging job (this Skill), a layout job (`ui-ux-designer`), an animation job (`animation-principles`), and a visual-identity job (`creative-direction`) — this Skill only ever answers the first one. See [SKILL.md](SKILL.md) for the exact boundary.

It activates automatically when you ask Claude to write, structure, sequence, or critique portfolio narrative or copy in this workspace.

## Folder structure

```
portfolio-storytelling/
├── SKILL.md                              # Core definition: purpose, activation, methodology, output format
├── README.md                             # This file
├── docs/                                 # Deep reference material, read on demand
│   ├── narrative-structure.md            # Whole-portfolio arc, project sequencing strategy, pacing
│   ├── hero-section-strategy.md          # First-impression messaging: what, in what order, in what time budget
│   ├── about-page-strategy.md            # About-page narrative strategy: story, proof points, tone
│   ├── project-case-study-structure.md   # Anatomy of a great case study; what to show vs. tell
│   ├── copywriting-voice.md              # Voice/tone rules, sentence-level craft, banned words
│   └── recruiter-employer-psychology.md  # How the three audiences actually scan a portfolio
├── checklists/                           # Systematic pass-through checklists
│   ├── portfolio-flow-checklist.md       # End-to-end narrative audit
│   ├── case-study-checklist.md           # Single case-study structure audit
│   └── copywriting-checklist.md          # Sentence-level voice/craft pass
├── templates/                            # Fill-in-the-blank skeletons
│   ├── case-study-template.md
│   ├── hero-messaging-template.md
│   └── about-page-template.md
├── examples/                             # Calibration examples — good vs. bad, fully worked
│   ├── excellent-portfolio-narrative.md
│   ├── weak-portfolio-narrative.md
│   └── case-study-example.md
└── snippets/                             # Reusable copy patterns
    ├── cta-copy-patterns.md
    └── microcopy-patterns.md
```

## How to use it

Just ask, in this workspace:

- "Write hero copy for my portfolio — I'm a WebGL/creative developer"
- "Does the order of my projects make sense?"
- "Write a case study for my [project name] piece"
- "Review my about page — does it read as senior?"
- "This CTA feels weak, fix it"
- "What would a recruiter actually notice in the first 30 seconds of my site?"
- "Audit my whole portfolio's story before I ship it"

Claude picks the right output depth automatically (see "Output format" in [SKILL.md](SKILL.md)) — a one-line CTA fix gets a direct answer, a full portfolio review gets the full narrative audit and an offer to work through [checklists/portfolio-flow-checklist.md](checklists/portfolio-flow-checklist.md).

## Assumed context

Tuned for a **creative-developer portfolio** — Three.js + GSAP + raw GLSL + Vite, Awwwards/FWA/CSS Design Awards-tier bar — read by recruiters, creative directors, and senior engineers, each scanning for something different. See "Assumed context" in [SKILL.md](SKILL.md) for the full breakdown. The narrative principles apply regardless of stack; the case-study guidance specifically assumes a technical/creative process worth narrating (concept → prototype → technical challenge → solution → outcome), which is what makes a 3D/interactive portfolio's case studies different from a typical design portfolio's.

## Maintaining this Skill

- Keep `docs/` as the source of narrative truth — if the calibration examples in `examples/` stop matching what "excellent" looks like on current Awwwards-tier sites, update both together so they don't drift apart.
- When you write a piece of copy you're proud of (a hero line, a CTA, a case-study opening) that isn't already a pattern here, add it to the relevant `snippets/` file so future work reuses it instead of re-deriving it from scratch.
- If Claude's output starts sounding generic or hedging with "it depends," revisit `examples/excellent-portfolio-narrative.md` and `examples/weak-portfolio-narrative.md` — they're the calibration anchor, the same role `excellent-review.md`/`poor-review.md` play in `threejs-website-reviewer`.
- Do not let this Skill's docs absorb layout, animation, or color guidance just because a hero/about/case-study example needs to describe them briefly — keep those to one linking sentence and defer to `ui-ux-designer`, `animation-principles`, and `creative-direction` respectively.
