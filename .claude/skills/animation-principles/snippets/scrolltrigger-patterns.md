# ScrollTrigger Patterns

Copy-paste ScrollTrigger recipes for the choreography patterns in [docs/scroll-animation.md](../docs/scroll-animation.md). These assume Lenis/ScrollTrigger sync is already correctly wired — see `threejs-website-reviewer`'s [architecture.md](../../threejs-website-reviewer/docs/architecture.md) if it isn't; that's not this doc's concern.

## Toggle-based content reveal (the default pattern)

```js
gsap.from('.section-content', {
  opacity: 0,
  y: 32,
  duration: 0.7,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section-content',
    start: 'top 80%',       // fires when element's top hits 80% down the viewport
    toggleActions: 'play none none reverse', // replays on scroll back up
  },
});
```

## Pin + scrub section (a signature centerpiece)

```js
const showcaseTl = gsap.timeline();
showcaseTl
  .to(cameraRig.position, { z: 2, ease: 'none' }, 0)
  .to(cameraRig.rotation, { y: Math.PI * 0.15, ease: 'none' }, 0)
  .to('.showcase-caption', { opacity: 1, duration: 0.1 }, 0.4);

ScrollTrigger.create({
  trigger: '.showcase-section',
  start: 'top top',
  end: '+=160%',        // cap: ~100-200vh of scroll distance, see docs/scroll-animation.md
  pin: true,
  scrub: 0.8,            // numeric, not `true` — adds deliberate weighted lag
  animation: showcaseTl,
  anticipatePin: 1,       // avoids a visible jump at the pin start on fast scroll
});
```

## Progress-driven Three.js property (no pin, just scrub-linked value)

```js
gsap.to(materialUniforms.uProgress, {
  value: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '.reveal-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.5,
  },
});
// shader reads uProgress.value each frame to drive a wipe/dissolve/reveal effect
```

## Snap sections (discrete slide-style content only)

```js
ScrollTrigger.create({
  snap: {
    snapTo: 1 / (document.querySelectorAll('.slide-section').length - 1),
    duration: { min: 0.3, max: 0.5 },
    ease: 'power2.out',
  },
});
```
Do not apply this to long-form/reading sections — see [docs/scroll-animation.md § snap points](../docs/scroll-animation.md#snap-points).

## Subtle parallax layer (amplitude-capped)

```js
gsap.to('.bg-layer', {
  yPercent: -18,          // capped per docs/motion-accessibility.md vestibular guidance
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.6,
  },
});
```

## Responsive choreography with `matchMedia`

Different scroll choreography per breakpoint (e.g. no pin on mobile — pinning is a poor fit for short mobile viewports and touch-scroll momentum):

```js
const mm = gsap.matchMedia();

mm.add('(min-width: 900px)', () => {
  ScrollTrigger.create({ trigger: '.showcase-section', pin: true, scrub: 0.8, end: '+=160%', animation: showcaseTl });
});

mm.add('(max-width: 899px)', () => {
  // Mobile: same content, no pin — toggle-reveal each beat instead of scrubbing through a pinned sequence
  gsap.from('.showcase-caption', {
    opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '.showcase-section', start: 'top 70%' },
  });
});
```

## `prefers-reduced-motion` gate for scroll effects

```js
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // full scrub/pin/parallax setup as above
});

mm.add('(prefers-reduced-motion: reduce)', () => {
  // toggle-only reveals, no pin, no parallax, no scrub — see docs/motion-accessibility.md
  gsap.utils.toArray('.section-content').forEach((el) => {
    gsap.from(el, {
      opacity: 0, duration: 0.4, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
});
```

## Related

- Choreography decisions behind these patterns: [docs/scroll-animation.md](../docs/scroll-animation.md)
- Camera path driven by scroll progress: [camera-tween-patterns.md](camera-tween-patterns.md)
- Reduced-motion category-by-category replacements: [docs/motion-accessibility.md](../docs/motion-accessibility.md)
