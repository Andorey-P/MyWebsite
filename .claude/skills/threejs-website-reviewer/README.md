# Three.js Website Reviewer & Optimizer

A Claude Code Skill that turns Claude into a senior-level review panel for production Three.js websites — architecture, WebGL/GPU/CPU performance, memory management, asset pipeline, mobile rendering, GSAP/Lenis/ScrollTrigger integration, and portfolio-grade visual polish.

## What this is

This is not a generic "Three.js tips" reference. It's a structured methodology plus reference material that Claude uses to produce specific, evidence-based, prioritized reviews of real Three.js code — the kind of review a principal graphics engineer would give in a code review, not a blog post.

It activates automatically when you ask Claude to review, debug, or optimize Three.js/WebGL code in this workspace. See [SKILL.md](SKILL.md) for exact activation conditions.

## Folder structure

```
threejs-website-reviewer/
├── SKILL.md                        # Core definition: purpose, activation, methodology, priorities, philosophy
├── README.md                       # This file
├── docs/                           # Deep reference material, read on demand while reviewing
│   ├── threejs-best-practices.md   # Modern API usage, anti-patterns, renderer/color management
│   ├── optimization-guide.md       # Draw calls, instancing, LOD, culling, profiling methodology
│   ├── shader-review.md            # GLSL review criteria and common shader bugs
│   ├── mobile-performance.md       # DPR, thermal throttling, quality tiers, touch input
│   ├── asset-pipeline.md           # glTF / Draco / KTX2 / 3ds Max export workflow
│   └── architecture.md             # Module structure, render loop ownership, GSAP/Lenis integration
├── checklists/                     # Systematic pass-through checklists
│   ├── review-checklist.md         # Full-site review checklist, all categories
│   ├── performance-checklist.md    # Performance-only deep pass
│   ├── launch-checklist.md         # Pre-launch / ship-readiness checklist
│   └── portfolio-checklist.md      # Recruiter/portfolio-impression checklist
├── templates/                      # Output structures Claude fills in
│   ├── review-template.md          # Full review output format
│   ├── optimization-report.md      # Focused optimization pass output format
│   └── bug-report.md               # Single bug/leak report format
├── examples/                       # Calibration examples — what good vs. bad output looks like
│   ├── excellent-review.md
│   ├── poor-review.md
│   ├── optimization-example.md
│   └── code-review-example.md
└── snippets/                       # Copy-paste-ready reference implementations
    ├── disposal-patterns.md
    ├── loading-patterns.md
    ├── shader-patterns.md
    └── performance-patterns.md
```

## How to use it

Just ask, in this workspace:

- "Review `landing-scene.js`"
- "Why is my scene dropping frames on mobile?"
- "Audit the whole site before I ship it"
- "Is this shader doing anything wasteful?"
- "Walk through the launch checklist"

Claude will pick the right output format and depth automatically (see "Output format" in [SKILL.md](SKILL.md)). For a full-site audit, it will work through [checklists/review-checklist.md](checklists/review-checklist.md) and can be asked to pause on any category for depth (e.g. "just do the memory/disposal pass").

## Assumed stack

Tuned for: **Vite + ES Modules + vanilla JavaScript, GSAP + ScrollTrigger, Lenis, raw GLSL shaders, glTF assets authored in 3ds Max, compressed with Draco + KTX2/Basis.** If your project differs (TypeScript, React Three Fiber, a different bundler), Claude adapts — see the "Assumed stack" section of [SKILL.md](SKILL.md).

## Related skills

This is the evaluative/audit layer of a six-skill ecosystem — see [../README.md](../README.md) for the full map, and the "Related skills" section of [SKILL.md](SKILL.md) for exact boundaries against `javascript-architecture`, `ui-ux-designer`, `animation-principles`, `creative-direction`, and `portfolio-storytelling`.

## Maintaining this Skill

- Keep `docs/` as the source of technical truth — update it when Three.js ships breaking changes (e.g. renderer/color management API shifts) so reviews stay current.
- Add new findings you agree with repeatedly to the relevant `snippets/` or `checklists/` file so future reviews reuse them instead of re-deriving them.
- If Claude's review tone drifts too generic or too nitpicky, revisit `examples/excellent-review.md` and `examples/poor-review.md` — they're the calibration anchor.
