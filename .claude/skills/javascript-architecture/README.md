# JavaScript Architecture

A Claude Code Skill that turns Claude into a senior software architect for the structural side of a Vite + Three.js + GSAP vanilla-JS portfolio site — project/folder layout, module boundaries, state and event design, naming conventions, and the App/SceneManager/AssetManager composition pattern.

## What this is

This is not a generic "clean code" reference. It's a structured methodology plus real, runnable ES module reference material that Claude uses to design and scaffold new project structure, new modules, and new architectural patterns — the kind of guidance a senior creative-technologist architect would give *before* code is written, not a post-hoc audit of code that already exists.

It activates automatically when you ask Claude to scaffold a project, organize files, design a `SceneManager`/`App` root, set up state or events, or answer "how should I structure this" in this workspace. See [SKILL.md](SKILL.md) for exact activation conditions.

## Folder structure

```
javascript-architecture/
├── SKILL.md                              # Core definition: purpose, activation, methodology, output format, related skills
├── README.md                             # This file
├── docs/                                 # Deep reference material, read on demand while architecting
│   ├── project-structure.md              # Folder tree, public/ vs src/, vite.config.js conventions, env handling, aliases
│   ├── module-design.md                  # Pragmatic SOLID, dependency direction, file/class-split thresholds
│   ├── state-management.md               # Vanilla-JS observable store pattern, UI/scene/animation state ownership
│   ├── event-systems.md                  # Event emitter design, per-module vs. global bus, when not to use an event
│   ├── naming-conventions.md             # File/class/function/constant naming rules
│   └── threejs-app-architecture.md       # App/SceneManager/AssetManager/Renderer/Resizer/Clock composition pattern
├── checklists/                           # Systematic pass-through checklists
│   ├── architecture-review-checklist.md  # "Did I set this project/module up right" — for new/in-progress work
│   └── code-quality-checklist.md         # Per-file/per-PR structural quality pass
├── templates/                            # Starting-point files Claude adapts and hands back
│   ├── vite-project-structure-template.md
│   ├── scene-manager-template.md
│   ├── event-emitter-template.md
│   └── module-template.md
├── examples/                             # Calibration examples — paired good/bad architecture contrast
│   ├── good-architecture-example.md
│   └── bad-architecture-example.md
└── snippets/                             # Copy-paste-ready reference implementations
    ├── state-store-pattern.md
    ├── event-bus-pattern.md
    ├── asset-manager-pattern.md
    └── resize-observer-pattern.md
```

## How to use it

Just ask, in this workspace:

- "Scaffold a new Vite + Three.js project for my portfolio"
- "Where should scroll-driven camera logic live?"
- "Design a SceneManager for three portfolio sections"
- "Should hover state live in a store or get passed as a prop?"
- "Is this a good file structure for a new 'about' section?"
- "Set up path aliases and the GLSL plugin in vite.config.js"

Claude will pick the right output depth automatically (see "Output format" in [SKILL.md](SKILL.md)) — a one-line structural question gets a direct answer, a new project gets the full scaffold, an in-progress module gets a checklist-driven pass.

## Assumed stack

Tuned for: **Vite + ES Modules + vanilla JavaScript (no framework), GSAP + ScrollTrigger, Lenis, raw GLSL shaders imported via a Vite plugin, no TypeScript today but TypeScript-readiness expected.** If the project differs, Claude adapts — see the "Assumed stack" section of [SKILL.md](SKILL.md).

## How this differs from `threejs-website-reviewer`

Both skills cover project structure, module boundaries, and the render-loop/GSAP/Lenis composition — deliberately, since they're two angles on the same territory:

- **`threejs-website-reviewer` is evaluative.** It audits code that already exists and runs, looking for leaks, bugs, performance problems, and architectural debt that's already accumulated. Its `docs/architecture.md` tells you what to flag when a codebase's structure has gone wrong.
- **`javascript-architecture` (this Skill) is generative.** It designs structure before code exists, or while it's being written, so there's less to find wrong later. Its `docs/threejs-app-architecture.md` tells you what to build, not what to flag.

The two are meant to be used sequentially on the same feature: design it with this Skill, build it, then hand the finished code to `threejs-website-reviewer` for a runtime-correctness and performance pass. Where this Skill's material overlaps with reviewer territory (disposal mechanics, renderer setup correctness, the specific render-loop-ownership failure modes), it links to that Skill's docs/snippets rather than re-deriving them — see the cross-references throughout `docs/` and `snippets/`.

## Maintaining this Skill

- Keep `docs/` as the source of architectural truth — update it if the recommended composition pattern changes (e.g. a new Three.js API shifts how `SceneManager`/`Renderer` should be structured) so scaffolds stay current.
- Add new reusable patterns you find yourself recommending repeatedly to `templates/` or `snippets/` rather than re-deriving them in conversation each time.
- If output starts drifting toward either over-engineering (recommending the full composition for a one-scene hero) or under-structuring (no boundaries at all for a growing multi-section site), revisit `examples/good-architecture-example.md` and `examples/bad-architecture-example.md` — they're the calibration anchor, same role `threejs-website-reviewer`'s `examples/excellent-review.md`/`poor-review.md` play for that Skill.
- Keep the "Related skills" boundaries in [SKILL.md](SKILL.md) in sync if any sibling skill's scope changes — this Skill should never start giving animation-timing, palette, copy, or layout advice; it should link out instead.
