# Motion Review Checklist

Use for a complete motion-design pass on a page/component/site. This checks whether motion is *well-designed* — hierarchy, timing, feel, accessibility of the motion itself. It does not check GSAP/ScrollTrigger/Lenis wiring correctness or Three.js GPU cost — for that, use `threejs-website-reviewer`'s [review-checklist.md § 8](../../threejs-website-reviewer/checklists/review-checklist.md#8-gsap--scrolltrigger--lenis-integration) alongside this one. Work top to bottom; note the specific element/moment for anything that isn't fine, and rate it the way [SKILL.md](../SKILL.md) frames findings (mechanism, not vibes).

## 1. Hierarchy & staging

- [ ] In every moment with 3+ animating elements, there's a clear, intentional lead — not everything firing simultaneously at the same speed
- [ ] Staging order matches actual content priority (what the user should notice first), not just DOM order or arbitrary sequencing
- [ ] Elements that are functionally one unit animate together, not staggered apart from each other
- [ ] No competing simultaneous large-amplitude motions fighting for attention in the same moment

## 2. Timing

- [ ] Micro-interactions (hover/click/focus) land in the 120–250ms range — see [docs/easing-timing.md](../docs/easing-timing.md)
- [ ] Content reveals land in the 500–900ms per-element range; hero entrances total 1.5–3.5s across the full sequence, not per element
- [ ] Duration scales with visual/physical weight — large elements aren't using the same fast, snappy timing as small UI chips (and vice versa)
- [ ] Exit animations are equal to or faster than their matching entrance, not slower
- [ ] Nothing sits in an uncanny middle duration (350–500ms range used for something that should be a fast micro-interaction, or something that should be a slower deliberate reveal)

## 3. Easing

- [ ] No unintentional linear (`ease: 'none'`) motion outside scroll-scrubbed tweens and continuous loops
- [ ] Easing direction matches intent — `*.out` for arriving/appearing elements, faster/simpler curves for exits
- [ ] Spring/overshoot eases (`back.out`, `elastic.out`) are reserved for a small number (1–3) of deliberate signature moments per page, not applied broadly or to repeated list items
- [ ] The same easing curve isn't blanket-applied to elements of clearly different visual mass without a stated reason
- [ ] Scrubbed tweens use `ease: 'none'` internally, with the `scrub` numeric value supplying the deceleration feel (not double-eased)

## 4. Classical principles (spot-check the three highest-yield ones — see [docs/animation-fundamentals.md](../docs/animation-fundamentals.md))

- [ ] **Overlap/follow-through:** grouped elements don't all start and stop in perfect lockstep — some lag/overlap exists between parent and child motion
- [ ] **Staging:** re-confirm the primary read-order is enforced by timing, not just by static layout
- [ ] **Timing/spacing:** duration and easing both reflect the implied mass of what's moving

## 5. Stagger

- [ ] Stagger increments match group size (40–80ms small groups, 60–100ms medium grids, 20–40ms or capped-total for large lists) — see [docs/easing-timing.md § stagger timing](../docs/easing-timing.md#stagger-timing)
- [ ] Large lists use `stagger: { amount }` or a small per-item value, not a flat increment that produces a multi-second total reveal
- [ ] Stagger direction (`from: 'start'/'center'/index`) matches the visual entry point the user's eye actually lands on first

## 6. Scroll choreography (if applicable — see [docs/scroll-animation.md](../docs/scroll-animation.md))

- [ ] Scrub vs. toggle vs. pin chosen deliberately per section, not defaulted to one pattern everywhere
- [ ] The page's scroll pattern varies across sections rather than repeating the identical reveal treatment section after section
- [ ] Pin usage is sparing (1–2 moments per page) and each pinned sequence resolves within roughly 100–200vh of scroll distance
- [ ] Snap points, if used, are on discrete "slide"-style content, not long-form reading content
- [ ] No stacked/competing scroll-smoothing layers producing mushy, hard-to-place lag

## 7. Camera work (if applicable — see [docs/camera-cinematography.md](../docs/camera-cinematography.md))

- [ ] Each camera move has a legible reason (what the movement communicates that a cut wouldn't) — not movement for its own sake
- [ ] Position and orientation (`lookAt`) tweening use matched easing/duration, or are deliberately staggered with a stated reason
- [ ] Camera easing avoids linear motion outside scrubbed sequences
- [ ] Cuts are used between spatially/conceptually unrelated framings instead of forcing a moved transition between them

## 8. Motion accessibility (see [docs/motion-accessibility.md](../docs/motion-accessibility.md)) — weighted, not a footnote

- [ ] `prefers-reduced-motion` is checked and branches to a genuinely different, designed choreography — not just a global animation kill switch that leaves content stuck hidden
- [ ] Parallax and continuous large-field motion are removed (not just reduced) under reduced motion
- [ ] Camera moves fall back to cuts between key framings under reduced motion
- [ ] Pinned/scroll-hijacked sequences fall back to normal scroll with toggle-based reveals
- [ ] The media query is listened to for live changes, not just read once at load
- [ ] No strobing/high-contrast flicker effects regardless of motion preference

## 9. Restraint & over-animation

- [ ] No motion added purely to fill perceived flatness — check whether the actual issue is a hierarchy/timing problem instead (see [docs/animation-fundamentals.md § secondary action](../docs/animation-fundamentals.md#7-secondary-action--supporting-motion-that-reinforces-doesnt-compete))
- [ ] Decorative/secondary motion doesn't compete with or distract from the primary action in the same moment
- [ ] Repeated elements (list/grid items) don't use fatiguing eases (elastic, heavy overshoot) that read fine once but wear thin on repetition

## Close with

State plainly, as part of the review: the 3–5 highest-impact motion changes, ranked by how much they'd change the perceived quality of the page — not a flat re-statement of every checked box. Distinguish clearly between "this is broken" (functional issue — content never appears, reduced-motion path is empty) and "this could feel more considered" (a design refinement), since they carry very different urgency.
