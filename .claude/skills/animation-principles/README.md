# Animation Principles

A Claude Code Skill that turns Claude into a senior motion designer for production Three.js/GSAP portfolio sites — timing, easing, motion hierarchy, scroll choreography, cinematic camera movement, transition design, interaction feedback feel, and motion accessibility.

## What this is

This is not a generic "animation tips" reference. It's a structured methodology plus a concrete numeric reference (durations, cubic-bezier values, stagger ranges) that Claude uses to design new motion or diagnose why existing motion feels wrong — the kind of annotation a senior motion designer would leave on a GSAP timeline before a developer builds it, not a blog post about easing functions.

It owns the **creative/design** side of motion: what should animate, in what order, for how long, with what curve, and why. It explicitly does not own GSAP/ScrollTrigger/Lenis **wiring correctness** (duplicate RAF loops, sync bugs, memory leaks) — that stays with `threejs-website-reviewer`. See [SKILL.md](SKILL.md) for the exact boundary and activation conditions.

## Folder structure

```
animation-principles/
├── SKILL.md                            # Core definition: purpose, activation, methodology, output format, related skills
├── README.md                           # This file
├── docs/                               # Deep reference material, read on demand while designing/reviewing
│   ├── animation-fundamentals.md       # The 12 classical animation principles, reinterpreted for web/GSAP/Three.js
│   ├── easing-timing.md                # Duration ranges by interaction type, easing curve reference, stagger timing
│   ├── scroll-animation.md             # ScrollTrigger design patterns: scrub/toggle/pin, scroll narrative structure
│   ├── camera-cinematography.md        # Three.js camera movement design: framing, dolly/orbit/pan, cut vs. move
│   ├── motion-accessibility.md         # prefers-reduced-motion strategy, vestibular safety, inclusive motion design
│   └── animation-performance.md        # General web animation perf: compositor properties, will-change, RAF discipline
├── checklists/                         # Systematic pass-through checklists
│   ├── motion-review-checklist.md      # Full motion-design review checklist
│   └── gsap-implementation-checklist.md # Creative/pacing quality checklist for GSAP timelines (not wiring correctness)
├── templates/                          # Output structures Claude fills in
│   ├── animation-spec-template.md      # Fill-in spec for a single animation before building it
│   └── transition-spec-template.md     # Fill-in spec for a page/section transition
├── examples/                           # Calibration examples — good vs. bad motion, worked scroll narrative
│   ├── good-vs-bad-motion.md
│   └── scroll-choreography-example.md
└── snippets/                           # Copy-paste-ready GSAP/Three.js motion recipes
    ├── gsap-timeline-patterns.md
    ├── scrolltrigger-patterns.md
    ├── camera-tween-patterns.md
    └── easing-curve-reference.md
```

## How to use it

Just ask, in this workspace:

- "Design the hero entrance for the landing scene"
- "What duration/easing should this hover state use?"
- "Choreograph the scroll narrative for the projects section"
- "Design a camera move from the landing scene into the second scene"
- "Review the motion on this page — does the pacing feel right?"
- "What should happen instead of the parallax when `prefers-reduced-motion` is set?"

Claude will pick the right output depth automatically (see "Output format" in [SKILL.md](SKILL.md)) — a one-line duration answer for a quick question, a full filled spec for a new animation, or a checklist-driven review for existing motion.

## Assumed stack

Tuned for: **GSAP 3.x + ScrollTrigger, Lenis smooth scroll, Three.js, Vite + vanilla JS**, camera/object properties tweened via GSAP or native Three.js interpolation. If your project differs (React Three Fiber + Framer Motion, a different scroll library), Claude adapts the underlying timing/hierarchy/easing reasoning — see the "Assumed stack" section of [SKILL.md](SKILL.md).

## Relationship to `threejs-website-reviewer`

Both skills touch GSAP/ScrollTrigger/Lenis. The split:

- `threejs-website-reviewer` asks: *is this wired correctly and will it break/leak/desync?* (duplicate RAF loops, `ScrollTrigger.update` not synced to Lenis `scroll`, un-killed tweens, `matchMedia` responsiveness)
- `animation-principles` (this skill) asks: *is this the right motion, timed and eased well, in the right order?* (hierarchy, duration, easing curve, stagger, choreography, camera framing, transition feel)

A build can pass one and fail the other. Use both when doing a full pre-launch pass — see [checklists/motion-review-checklist.md](checklists/motion-review-checklist.md) here and [review-checklist.md § 8](../threejs-website-reviewer/checklists/review-checklist.md) there.

## Maintaining this Skill

- Keep `docs/easing-timing.md` and `snippets/easing-curve-reference.md` as the source of numeric truth — if a duration/curve convention changes project-wide, update it there so future designs stay consistent instead of drifting per-request.
- Add new well-executed motion patterns to `snippets/` as you build them, so future work reuses proven recipes instead of re-deriving timing from scratch.
- If Claude's output starts giving vague guidance ("use appropriate easing," "animate it smoothly") instead of concrete numbers, revisit `examples/good-vs-bad-motion.md` — it's the calibration anchor for how specific findings and recommendations must be.
