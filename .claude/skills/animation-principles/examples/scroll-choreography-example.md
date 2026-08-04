# Worked Example: Scroll Choreography for a Portfolio Landing Page

One full scroll narrative, section by section, showing the choreography decisions this skill owns. Section *order and content* (what the hero says, why "Selected Work" comes before "About") is assumed as a given from `portfolio-storytelling` — this example only designs the motion for each beat, and deliberately varies the pattern section-to-section per [docs/scroll-animation.md § scroll choreography](../docs/scroll-animation.md#scroll-choreography-structuring-a-page-narrative).

Assumed page structure: Hero → Selected Work (project grid) → Signature Project (3D showcase) → About → Contact/CTA.

---

## Section 1 — Hero

**Pattern:** load-triggered timeline (not scroll-triggered — this plays on arrival).

Covered in full in [examples/good-vs-bad-motion.md § hero entrance](good-vs-bad-motion.md#1-hero-entrance). Total ~1.7s, staged canvas → headline → subhead → CTA.

**Scroll cue:** a small animated scroll-indicator (chevron or line) fades in *after* the CTA settles (+0.3s), looping a subtle 2px vertical drift at `sine.inOut`, 1.4s per cycle — continuous idle motion signaling "there's more below" without competing with the entrance itself.

## Section 2 — Selected Work (project grid)

**Pattern:** toggle, per [scrub vs. toggle vs. pin](../docs/scroll-animation.md#scrub-vs-toggle-vs-pin-the-decision) — this is a straightforward content reveal, not a scroll-scrubbed effect.

```js
gsap.from('.project-card', {
  opacity: 0,
  y: 40,
  duration: 0.7,
  ease: 'power2.out',
  stagger: { each: 0.07, from: 'start' },
  scrollTrigger: { trigger: '.work-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
});
```

**Choice rationale:** this is the first scroll-triggered content the user hits, and it's meant to be scanned quickly (a grid, not a linear read) — toggle keeps it simple and fast-resolving regardless of scroll speed, which matters here specifically because a fast scroller shouldn't have to slow down to see the grid arrive (see [scroll velocity as signal](../docs/scroll-animation.md#scroll-choreography-structuring-a-page-narrative)). `toggleActions: 'play none none reverse'` lets it replay cleanly if the user scrolls back up.

**Deliberately no parallax here** — this section is establishing the pattern of "content arrives cleanly," reserving scroll-tied motion for the next section so it reads as a shift in register, not more of the same.

## Section 3 — Signature Project (3D showcase, the centerpiece)

**Pattern:** pinned, scrubbed, path-based camera move — the one deliberate set-piece per [common scroll-narrative structures](../docs/scroll-animation.md#common-scroll-narrative-structures).

```js
ScrollTrigger.create({
  trigger: '.showcase-section',
  start: 'top top',
  end: '+=160%',
  pin: true,
  scrub: 0.8,
  animation: showcaseTimeline,
});

const showcaseTimeline = gsap.timeline()
  .to(cameraProgress, { t: 1, ease: 'none' })  // driven entirely by scrub, see camera path pattern
  .to('.showcase-caption-1', { opacity: 1, duration: 0.15 }, 0.1)
  .to('.showcase-caption-1', { opacity: 0, duration: 0.1 }, 0.35)
  .to('.showcase-caption-2', { opacity: 1, duration: 0.15 }, 0.4)
  .to('.showcase-caption-2', { opacity: 0, duration: 0.1 }, 0.65)
  .to('.showcase-caption-3', { opacity: 1, duration: 0.15 }, 0.7);
```

The `cameraProgress.t` value drives a `CatmullRomCurve3` camera path exactly as in [docs/camera-cinematography.md § path-based camera moves](../docs/camera-cinematography.md#path-based-camera-moves) — three framings (establishing → approach → detail), each paired with a caption that fades in/out at its corresponding point along the scrub progress.

**Choice rationale:** this is the one section where pin/scrub is earned — the 3D object *is* the content, camera travel through it communicates form/dimensionality that a static shot couldn't (justifying [orbit/dolly composite movement](../docs/camera-cinematography.md#movement-types-and-when-to-use-each)), and it's the site's single most memorable moment specifically because it's the only pinned sequence on the page. Scroll distance capped at 160% viewport height — within the [100–200vh budget](../docs/scroll-animation.md#scroll-choreography-structuring-a-page-narrative) for a pinned sequence.

**Reduced-motion fallback:** no pin, no scrub. The three framings become three static, cut-between images (or three static camera positions swapped on scroll-triggered toggle at fixed points), each with its caption toggle-revealed normally — per [docs/motion-accessibility.md § camera moves](../docs/motion-accessibility.md#what-to-replace-motion-with-by-category).

## Section 4 — About

**Pattern:** toggle, text-focused, minimal motion.

```js
gsap.from('.about-text > p', {
  opacity: 0,
  y: 16,
  duration: 0.6,
  ease: 'power2.out',
  stagger: { each: 0.12 },
  scrollTrigger: { trigger: '.about-text', start: 'top 75%' },
});
```

**Choice rationale:** deliberately the calmest section on the page — after the signature 3D moment, a beat of restraint reads as confidence rather than the site running out of ideas. This is a reading-focused section (per [docs/scroll-animation.md § snap points](../docs/scroll-animation.md#snap-points), explicitly no snap here — the user needs to stop and read at their own pace).

## Section 5 — Contact / CTA

**Pattern:** toggle, single focal element, one restrained signature ease.

```js
gsap.from('.contact-heading', {
  opacity: 0,
  y: 24,
  duration: 0.7,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-section', start: 'top 70%' },
});
gsap.from('.contact-cta', {
  opacity: 0,
  scale: 0.92,
  duration: 0.5,
  ease: 'back.out(1.4)',
  scrollTrigger: { trigger: '.contact-cta', start: 'top 85%' },
});
```

**Choice rationale:** the CTA is the one place on the page (besides the showcase) that earns a spring ease — it's the final, single most important action, and a small confident overshoot on arrival reinforces "click here" without having been used anywhere else recently, so it still reads as special rather than fatiguing.

---

## Why this reads as choreographed, not just "animated"

Looking at the sequence end to end: load-triggered → toggle → pinned/scrubbed centerpiece → calm toggle → toggle with one final accent. No two adjacent sections use the identical pattern, the one pin is reserved for the section that structurally deserves it, and the amount of motion has a clear arc (builds to the showcase, deliberately settles after it) rather than a flat, uniform level of animation throughout. This variation is the actual deliverable of scroll choreography — see [docs/scroll-animation.md § vary the pattern](../docs/scroll-animation.md#scroll-choreography-structuring-a-page-narrative).
