# Animation Spec Template

Fill this in *before* building an animation — for a hero entrance, a grid reveal, a micro-interaction, or any moment with more than one moving part. Forces the hierarchy/timing/easing decisions to happen deliberately instead of being discovered by trial and error in code. For a page/section transition specifically, use [transition-spec-template.md](transition-spec-template.md) instead — transitions have their own concerns (outgoing/incoming coordination, cut points).

---

## Moment

**Name:** (e.g. "Hero entrance," "Project grid reveal," "Favorite-icon hover")

**Category:** micro-interaction / small UI reveal / content reveal / hero entrance / page transition / scroll-scrubbed / camera move — pick one, see [docs/easing-timing.md](../docs/easing-timing.md) for the category's duration budget

**Trigger:** what causes this to play (page load, scroll into view, click, hover, route change)

**Plays:** once / repeatable / continuous-loop — affects how much restraint to apply (repeatable and looping motion should be calmer than a one-shot moment, see [docs/animation-fundamentals.md § exaggeration](../docs/animation-fundamentals.md#9-exaggeration-restraint-for-this-context))

## Intent

One or two sentences: what should the user understand or feel from this motion, specifically. ("The headline should feel like it's claiming the frame — the primary thing worth looking at." Not: "make it look nice.")

If this moment is expressing a brand/mood direction, name it and note that the *mood* is `creative-direction`'s call — this section just records what mood the timing/easing below is calibrated to serve.

## Hierarchy (fill in before timing)

List every element that animates in this moment, in the order the eye should register them. For each: what leads, what follows, what's simultaneous.

| Order | Element | Role (lead / support / secondary) | Starts relative to previous |
|---|---|---|---|
| 1 | | | (moment starts) |
| 2 | | | |
| 3 | | | |

## Per-element timing & easing

| Element | Duration | Easing | Why this curve/duration |
|---|---|---|---|
| | | | |
| | | | |

Reference [docs/easing-timing.md](../docs/easing-timing.md) for ranges; every row should have a one-clause reason, not just a value ("power1.out — this is the large background layer, should feel heavier than the foreground text").

## Stagger (if a group)

- Group size:
- Increment:
- `from`: (start / center / edges / specific index — should match the visual entry point)

## Anticipation / follow-through (if applicable)

Does any element need a small counter-motion before the main action, or a secondary settle after it stops? Name it or explicitly state "none needed" — see [docs/animation-fundamentals.md § anticipation](../docs/animation-fundamentals.md#2-anticipation--the-wind-up-before-the-action) and [§ overlap](../docs/animation-fundamentals.md#3-staging-vs-overlap-and-follow-through--nothing-stops-on-a-dime).

## Reduced-motion version

What does this moment become under `prefers-reduced-motion`? (Not "disabled" — see [docs/motion-accessibility.md](../docs/motion-accessibility.md) for the replacement pattern per category.)

## Implementation

```js
// Real GSAP code, once the above is decided — not before.
```

## Open questions

Anything that depends on another skill's decision (content order → `portfolio-storytelling`, mood direction → `creative-direction`, interaction pattern choice → `ui-ux-designer`, where this code lives → `javascript-architecture`) — name the dependency rather than guessing.
