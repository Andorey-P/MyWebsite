# Calibration: Good vs. Bad Motion

Paired examples — the same moment done badly and well, with a specific diagnosis of the mechanism, not just a vibe judgment. This is the tone/depth target for this skill's findings: name the exact issue, connect it to a principle, give the fix as real code. Modeled on `threejs-website-reviewer`'s [excellent-review.md](../../threejs-website-reviewer/examples/excellent-review.md) calibration approach.

---

## 1. Hero entrance

### Bad
```js
gsap.to(['.hero-title', '.hero-subtitle', '.hero-cta', 'canvas'], {
  opacity: 1,
  duration: 1,
  ease: 'power2.out',
});
```
**Diagnosis:** every element — headline, subhead, CTA, and the 3D canvas — animates identically and simultaneously: same duration, same ease, same start time. There's no [staging](../docs/animation-fundamentals.md#1-staging--what-leads-whats-ignorable): nothing tells the eye what to look at first, so everything registers as one indistinct flash of content appearing. It also ignores [timing/spacing by mass](../docs/animation-fundamentals.md#8-timing-and-spacing--the-actual-numbers) — a full-viewport canvas and a CTA button have very different visual weight and shouldn't share a curve. At `duration: 1` for everything, the whole entrance also reads as fast-but-flat rather than paced.

### Good
```js
const tl = gsap.timeline();
tl.to('canvas', { opacity: 1, duration: 1.4, ease: 'power1.out' })
  .from('.hero-title', { yPercent: 100, duration: 0.9, ease: 'power3.out' }, 0.35)
  .from('.hero-subtitle', { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' }, 0.7)
  .from('.hero-cta', { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' }, 0.95);
```
**Why this works:** the canvas (largest, "heaviest" element) gets the gentlest curve and longest duration and starts the sequence, establishing atmosphere. The headline — the lead per [staging](../docs/animation-fundamentals.md#1-staging--what-leads-whats-ignorable) — gets the snappiest, most confident curve (`power3.out`) and claims focus at 0.35s, while the canvas is still settling (deliberate overlap, not fully sequential). Subhead and CTA follow at decreasing visual weight and duration, landing last as "the next action." Total sequence lands around 1.7s — inside the [1.5–3.5s hero-entrance budget](../docs/easing-timing.md#duration-by-interaction-type).

---

## 2. Hover state (project card)

### Bad
```js
card.addEventListener('mouseenter', () => {
  gsap.to(card, { scale: 1.08, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
});
```
**Diagnosis:** two independent problems stacking. First, 600ms is roughly 3x the [120–250ms micro-interaction budget](../docs/easing-timing.md#micro-interactions-hoverclickfocus) — a hover response that takes over half a second to resolve reads as the UI lagging behind the cursor, not as considered motion. Second, `elastic.out` on a hover — fired every time the cursor crosses the card, potentially dozens of times per session while browsing a grid — is exactly the [fatigue-on-repetition](../docs/easing-timing.md#easing-curve-reference) case; a springy bounce that's charming once becomes noisy on the fifth hover.

### Good
```js
card.addEventListener('mouseenter', () => {
  gsap.to(card, { scale: 1.03, duration: 0.2, ease: 'power2.out' });
});
card.addEventListener('mouseleave', () => {
  gsap.to(card, { scale: 1, duration: 0.22, ease: 'power2.out' });
});
```
**Why this works:** 200ms/`power2.out` is inside the micro-interaction budget and reads as immediate. Scale amplitude is small (1.03, not 1.08) — a hover cue doesn't need to be dramatic to register; oversized hover scale on a grid full of cards makes neighboring cards visually jostle for space. Hover-out duration slightly exceeds hover-in (per the [asymmetric hover guidance](../docs/easing-timing.md#micro-interactions-hoverclickfocus)) rather than snapping back abruptly.

---

## 3. Page transition (scene A → scene B)

### Bad
```js
function goToProject() {
  camera.position.set(newX, newY, newZ); // instant jump, no coordination with DOM
  document.querySelector('.project-view').style.display = 'block';
}
```
**Diagnosis:** no transition at all — an instant camera snap and an instant DOM `display` toggle, unmasked. Even if this is intentionally "no animation," it's an unintentional hard cut with nothing hiding the seam (see [what masks the seam](../templates/transition-spec-template.md#what-masks-the-seam)), so it reads as broken rather than as a deliberate stylistic cut. There's also no outgoing motion for the state being left — the previous view just disappears.

### Good
```js
const tl = gsap.timeline();
tl.to('.hero-view', { opacity: 0, duration: 0.3, ease: 'power2.in' })
  .to(transitionMask, { opacity: 1, duration: 0.25, ease: 'power1.inOut' }, '-=0.15')
  .call(() => {
    camera.position.set(newX, newY, newZ);       // cut happens while masked
    camera.lookAt(newTarget);
    document.querySelector('.project-view').style.display = 'block';
  })
  .to(transitionMask, { opacity: 0, duration: 0.3, ease: 'power1.inOut' }, '+=0.05')
  .from('.project-view', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.2');
```
**Why this works:** this is a deliberate [camera cut](../docs/camera-cinematography.md#cut-vs-move) (correct choice — the hero scene and project scene don't share spatial logic worth traveling through), but the cut itself happens fully hidden behind a mask, so the discontinuity is never visible. Outgoing and incoming both get real motion. Total duration lands around 0.9–1.0s, inside the [600ms–1.2s page-transition budget](../docs/easing-timing.md#duration-by-interaction-type).

---

## 4. Scroll-driven parallax

### Bad
```js
gsap.to('.bg-layer', {
  yPercent: -60,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.section', scrub: true, start: 'top bottom', end: 'bottom top' },
});
```
**Diagnosis:** `ease: 'power2.out'` inside a scrubbed tween is a double-easing artifact — see [scrub mechanics](../docs/scroll-animation.md#numeric-scrub-values). Scroll position already maps to progress non-linearly from the user's physical scroll input; adding an eased curve on top of that produces a background layer that visibly hitches/slows at points uncorrelated with actual scroll behavior, which reads as janky even though nothing is technically broken. Amplitude (`yPercent: -60`) is also well past the [~20–30% cap](../docs/motion-accessibility.md#vestibular-safety-guidance-beyond-the-media-query) recommended even for full-motion parallax — this is an aggressive, vestibular-risk amount of background travel for a routine section.

### Good
```js
gsap.to('.bg-layer', {
  yPercent: -18,
  ease: 'none',
  scrollTrigger: { trigger: '.section', scrub: 0.6, start: 'top bottom', end: 'bottom top' },
});
```
**Why this works:** `ease: 'none'` on the tween itself, with `scrub: 0.6` supplying a moderate, single source of smoothing lag — no double-easing. Amplitude reduced to 18%, inside the comfortable range, still perceptible as depth without being aggressive. This version also has a documented, straightforward reduced-motion fallback (remove the ScrollTrigger entirely, per [motion-accessibility.md](../docs/motion-accessibility.md#what-to-replace-motion-with-by-category)) — the bad version's non-standard easing-inside-scrub would need to be specifically unwound rather than simply omitted.

---

## 5. Grid reveal (12-item project grid)

### Bad
```js
gsap.from('.project-card', {
  opacity: 0,
  y: 60,
  duration: 0.8,
  stagger: 0.15,
  scrollTrigger: { trigger: '.grid', start: 'top 80%' },
});
```
**Diagnosis:** `stagger: 0.15` across 12 items produces a 1.8s span before the last card even *starts* animating (12 × 0.15s), on top of its own 0.8s duration — nearly 2.6s before the grid fully resolves. For a [medium grid](../docs/easing-timing.md#stagger-timing), the target increment is 60–100ms; 150ms is closer to large-list-with-no-cap territory, applied to a grid, producing a reveal that feels slow relative to how quickly a user visually scans a grid layout (unlike a list read top-to-bottom, a grid is scanned almost all at once).

### Good
```js
gsap.from('.project-card', {
  opacity: 0,
  y: 40,
  duration: 0.7,
  ease: 'power2.out',
  stagger: { each: 0.07, from: 'start' },
  scrollTrigger: { trigger: '.grid', start: 'top 80%' },
});
```
**Why this works:** 70ms increment lands in the medium-grid range — the reveal is perceived as one cohesive gesture (~0.7–1.1s total for 12 items) rather than a slow roll-call. `y: 40` (down from 60) keeps travel distance proportionate to the card's own size rather than an oversized swoop.

---

Each pair above follows the same diagnostic shape: name the specific value/pattern, connect it to the concrete mechanism (a budget in [docs/easing-timing.md](../docs/easing-timing.md), a principle in [docs/animation-fundamentals.md](../docs/animation-fundamentals.md), or an accessibility guideline in [docs/motion-accessibility.md](../docs/motion-accessibility.md)), then give the corrected code. Use this shape for review output — never just "this feels off, try something smoother."
