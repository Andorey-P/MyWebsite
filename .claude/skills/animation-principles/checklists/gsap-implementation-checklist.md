# GSAP Implementation Checklist (Creative/Design Quality)

This checklist evaluates a GSAP timeline for **motion-design quality** — pacing, hierarchy, restraint, and choreography. It is deliberately distinct from `threejs-website-reviewer`'s wiring-correctness checklist ([review-checklist.md § 8](../../threejs-website-reviewer/checklists/review-checklist.md#8-gsap--scrolltrigger--lenis-integration)), which asks whether the timeline is *built correctly* (killed on teardown, synced to Lenis, no duplicate loops). A timeline can pass every item here and still be buggy, or pass every wiring check and still feel amateurish. Use both for a full pre-launch pass; use this one alone when the ask is specifically "does this timeline feel right."

## Structure

- [ ] The timeline uses labels (`addLabel`) for its key beats, not raw absolute-time offsets guessed by hand — makes retiming and a second developer's onboarding both easier (see [docs/animation-fundamentals.md § pose-to-pose](../docs/animation-fundamentals.md#4-straight-ahead-vs-pose-to-pose--plan-the-beats-dont-wing-the-timeline))
- [ ] Relative position offsets (`"-=0.3"`, label references) are used for overlap between beats, not everything chained at `0`/sequential with no overlap producing a slow, disconnected feel
- [ ] The timeline's total duration matches the moment's category budget (see [docs/easing-timing.md](../docs/easing-timing.md)) — a hero intro isn't accidentally 6 seconds because each beat crept a little long

## Hierarchy

- [ ] There is a clear lead element/beat, staged to register first
- [ ] Simultaneous starts are intentional (elements that genuinely belong together), not accidental (everything defaulted to position `0`)
- [ ] Nothing structurally important is buried after a long chain of decorative beats — the user shouldn't have to wait through atmosphere to see the actual content/CTA

## Easing per element

- [ ] Each tween's easing curve is a deliberate choice for that element's role/mass, not a copy-pasted default applied everywhere (`power2.out` on literally every `.to()` in the file is a sign no per-element thought happened — see [docs/easing-timing.md § easing curve reference](../docs/easing-timing.md#easing-curve-reference))
- [ ] Overshoot/spring eases are counted — if more than 1–3 elements in the timeline use `back.out`/`elastic.out`, that's very likely over-used, not a stylistic throughline
- [ ] No `ease: 'none'` on a non-scrubbed tween (a common leftover from prototyping that never got a real curve assigned)

## Stagger

- [ ] `stagger` values are appropriate to group size, per [docs/easing-timing.md § stagger timing](../docs/easing-timing.md#stagger-timing) — not a flat guessed number
- [ ] `stagger.from` matches the actual visual entry point (where the user's eye starts), not left at the default `'start'` (first-in-DOM-order) when the layout implies a different origin (e.g. a centered hero grid)

## Restraint

- [ ] The timeline doesn't animate every possible property just because GSAP makes it easy (e.g. tweening `opacity`, `y`, `scale`, `rotation`, and a filter simultaneously on one element with no reason each is needed) — every animated property should be earned by what it communicates
- [ ] Secondary/decorative beats (particle bursts, glow pulses, background shifts) don't outnumber or outlast the primary content beats they're meant to support
- [ ] `duration`/`ease` values aren't left at obviously-untuned defaults (e.g. every tween at exactly `duration: 1` — a sign of "made it work" rather than "made it feel right")

## Reduced-motion branch

- [ ] A `prefers-reduced-motion` branch exists for any timeline with positional/scale motion, parallax, or camera movement — not just for the largest hero moment (see [docs/motion-accessibility.md](../docs/motion-accessibility.md))
- [ ] The reduced-motion branch is a real, designed alternative (opacity-only reveal, cuts instead of camera moves), not an early-return that leaves elements at their `from()` hidden state

## ScrollTrigger-specific creative checks (design, not wiring)

- [ ] `scrub` value (if used) is deliberately chosen for the intended weight/feel, not left at `true` by default everywhere — see [docs/scroll-animation.md § numeric scrub values](../docs/scroll-animation.md#numeric-scrub-values)
- [ ] `start`/`end` trigger points are tuned to when content should actually be visible/relevant on screen, not left at ScrollTrigger's defaults without checking against real viewport behavior
- [ ] `toggleActions` (for toggle-based triggers) is set intentionally (commonly `"play none none reverse"` for a clean re-trigger on scroll-back) rather than left at the default, if scrolling back up should replay/reverse the reveal

## Signals this timeline needs a design pass, not just a code review

- Every element uses the same duration and easing curve
- No labels, only chained/absolute offsets
- More than 3 elements using overshoot/elastic easing
- No `prefers-reduced-motion` branch despite meaningful positional motion
- The timeline "technically works" (nothing throws, nothing visually breaks) but a stakeholder describes it as "fine" or "not sure what's wrong but it doesn't feel expensive" — that gut reaction usually maps to a hierarchy or timing/spacing violation, see [docs/animation-fundamentals.md § the three that matter most](../docs/animation-fundamentals.md#the-three-that-matter-most-in-priority-order-for-review)

## Related

- Wiring-correctness checklist (separate concern): `threejs-website-reviewer`'s [review-checklist.md § 8](../../threejs-website-reviewer/checklists/review-checklist.md#8-gsap--scrolltrigger--lenis-integration)
- Copy-paste starting points that already satisfy this checklist: [snippets/gsap-timeline-patterns.md](../snippets/gsap-timeline-patterns.md)
