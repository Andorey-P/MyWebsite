# Transition Spec Template

Fill this in before building a page or section transition — the connective tissue between two states, distinct from a single animation-in-place (use [animation-spec-template.md](animation-spec-template.md) for that). A transition has two halves (outgoing, incoming) that must be coordinated, plus a decision about whether a Three.js camera cut or move is involved.

---

## Transition

**From → To:** (e.g. "Landing scene → Second scene," "Project index → Project detail")

**Trigger:** (nav click, scroll threshold, route change)

**Category duration budget:** page/section transitions target 600ms–1.2s total — see [docs/easing-timing.md § duration by interaction type](../docs/easing-timing.md#duration-by-interaction-type). State the target total here:

## Outgoing (the "from" state leaving)

| What | Duration | Easing | Notes |
|---|---|---|---|
| | | | |

Outgoing motion is typically faster/simpler than incoming — the user's attention is already moving to what's next. State if this transition deliberately breaks that default and why.

## Overlap point

Do outgoing and incoming overlap (cross-fade style — outgoing starts fading while incoming starts appearing) or are they sequential (outgoing fully completes, then incoming starts)? State which, and the overlap amount if any (e.g. "incoming starts 150ms before outgoing finishes").

- Overlapping reads faster and more fluid — default choice for most transitions.
- Fully sequential reads more deliberate/ceremonial — reserve for transitions meant to feel weighty (a rare, significant state change), not routine navigation.

## Incoming (the "to" state arriving)

| What | Duration | Easing | Notes |
|---|---|---|---|
| | | | |

## Camera involvement (if a Three.js scene is on either side)

- [ ] No camera involvement — pure DOM/2D transition over/around the canvas
- [ ] Camera **cut** between scenes (see [docs/camera-cinematography.md § cut vs. move](../docs/camera-cinematography.md#cut-vs-move)) — state what masks the cut (a DOM-level wipe/fade covering the instant camera reposition)
- [ ] Camera **move** between scenes — only if the two scenes share spatial logic worth traveling through; state what the movement communicates that a cut wouldn't

## What masks the seam

Every transition needs something that hides the actual cut/swap moment (a full-bleed color wipe, a blur pulse, a brief flash of the loading state) so the underlying scene/DOM swap isn't visible as a pop. State what it is here and its duration — this is usually the shortest element in the whole transition (150–300ms) since it's a mask, not a feature.

## Interruptibility

Can the user trigger another transition while this one is mid-flight (e.g. rapid nav clicks)? State the behavior: queue, ignore-until-complete, or interrupt-and-restart. Undefined behavior here is a common source of visible bugs (overlapping incomplete transitions) — decide it explicitly rather than letting it emerge by accident.

## Reduced-motion version

Per [docs/motion-accessibility.md § page/section transitions](../docs/motion-accessibility.md), typically: shorten to a fast cross-fade (200–300ms), drop directional slide/wipe motion, drop any camera move in favor of a cut.

## Implementation

```js
// Real GSAP/timeline code once the above is decided.
```

## Open questions

Dependencies on other skills' decisions (does the destination content justify a ceremonial vs. routine transition — `portfolio-storytelling`; where the transition controller lives in the module structure — `javascript-architecture`) — name them rather than guessing.
