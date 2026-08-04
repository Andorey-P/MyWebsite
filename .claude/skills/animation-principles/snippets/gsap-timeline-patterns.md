# GSAP Timeline Patterns

Copy-paste GSAP timeline recipes for common portfolio moments. Each includes a `prefers-reduced-motion` branch per [docs/motion-accessibility.md](../docs/motion-accessibility.md) and uses timing/easing from [docs/easing-timing.md](../docs/easing-timing.md). Adjust selectors/values to the project; keep the structure (labels, staged offsets, reduced-motion branch).

## Hero intro (staged, canvas + text)

```js
function buildHeroIntro() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

  if (reduced) {
    tl.to(['canvas', '.hero-title', '.hero-subtitle', '.hero-cta'], {
      opacity: 1,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power1.out',
    });
    return tl;
  }

  tl.addLabel('start')
    .to('canvas', { opacity: 1, duration: 1.4, ease: 'power1.out' }, 'start')
    .from('.hero-title', { yPercent: 100, duration: 0.9, ease: 'power3.out' }, 'start+=0.35')
    .from('.hero-subtitle', { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' }, 'start+=0.7')
    .from('.hero-cta', { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' }, 'start+=0.95')
    .addLabel('settled');

  return tl;
}
```

## Staggered grid reveal (project cards)

```js
function buildGridReveal(gridSelector, cardSelector) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.from(cardSelector, {
    opacity: 0,
    y: reduced ? 0 : 40,
    duration: reduced ? 0.4 : 0.7,
    ease: 'power2.out',
    stagger: reduced ? 0 : { each: 0.07, from: 'start' },
    scrollTrigger: {
      trigger: gridSelector,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}
```

For large lists (12+ items), swap the flat increment for a capped total:
```js
stagger: { amount: 0.6, from: 'start' }  // whole list resolves within 0.6s regardless of item count
```

## Text reveal (word-by-word via SplitText)

Requires the GSAP `SplitText` plugin (Club GreenSock). Split once, cache the result, animate per [stagger timing for text](../docs/easing-timing.md#stagger-timing):

```js
function buildTextReveal(el) {
  const split = new SplitText(el, { type: 'words' });
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return gsap.from(split.words, {
    opacity: 0,
    y: reduced ? 0 : 14,
    duration: reduced ? 0.35 : 0.5,
    ease: 'power2.out',
    stagger: reduced ? 0 : 0.02, // 20ms/word
    scrollTrigger: { trigger: el, start: 'top 85%' },
  });
}
```

Line-by-line (heavier, more deliberate reveal — use for a single pull-quote moment, not routine body copy):
```js
const split = new SplitText(el, { type: 'lines', linesClass: 'line' });
gsap.from(split.lines, {
  opacity: 0,
  y: 24,
  duration: 0.7,
  ease: 'power2.out',
  stagger: 0.05, // 50ms/line
});
```

## Modal/panel open

```js
function openModal(modalEl, contentSelector) {
  const tl = gsap.timeline();
  tl.set(modalEl, { display: 'flex' })
    .to(modalEl, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    .from(contentSelector, { opacity: 0, y: 16, duration: 0.35, ease: 'power2.out' }, '-=0.1');
  return tl;
}

function closeModal(modalEl) {
  const tl = gsap.timeline();
  tl.to(modalEl.querySelector(contentSelectorConst), { opacity: 0, y: 10, duration: 0.2, ease: 'power2.in' })
    .to(modalEl, { opacity: 0, duration: 0.2, ease: 'power1.in' }, '-=0.05')
    .set(modalEl, { display: 'none' });
  return tl;
}
```
Note the close sequence is intentionally faster than open (per [exit-vs-entrance timing](../docs/easing-timing.md#ease-out-vs-ease-in-vs-ease-in-out--the-decision-rule)).

## Hover press feedback (squash-style)

```js
function bindPressFeedback(el) {
  el.addEventListener('pointerdown', () => {
    gsap.to(el, { scaleY: 0.94, scaleX: 1.02, duration: 0.08, ease: 'power1.out', overwrite: 'auto' });
  });
  el.addEventListener('pointerup', () => {
    gsap.to(el, { scaleY: 1, scaleX: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
  });
}
```

## Cursor-follow / magnetic element (continuous lerp, not discrete tweens)

Per [docs/easing-timing.md § cursor-follow effects](../docs/easing-timing.md#micro-interactions-hoverclickfocus) — this runs in the shared RAF tick, not as a per-mousemove GSAP tween:

```js
const cursorState = { targetX: 0, targetY: 0, x: 0, y: 0 };

window.addEventListener('pointermove', (e) => {
  cursorState.targetX = e.clientX;
  cursorState.targetY = e.clientY;
});

function updateCursorFollow() {
  cursorState.x += (cursorState.targetX - cursorState.x) * 0.18; // lerp factor: 0.15-0.2 for a natural follow
  cursorState.y += (cursorState.targetY - cursorState.y) * 0.18;
  cursorEl.style.transform = `translate(${cursorState.x}px, ${cursorState.y}px)`;
}
// call updateCursorFollow() from the app's single shared RAF/render tick, not its own loop
```

## Reduced-motion GSAP `matchMedia` gate

For wrapping whole feature builds cleanly (GSAP's own responsive/conditional API):

```js
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  buildHeroIntro();
  buildGridReveal('.work-grid', '.project-card');
  // ...full-motion setup
});

mm.add('(prefers-reduced-motion: reduce)', () => {
  gsap.set(['.hero-title', '.hero-subtitle', '.hero-cta'], { opacity: 1 });
  // ...minimal/no-motion setup
});
```
This also auto-reverts and rebuilds if the user changes the OS setting live, which a one-time `matchMedia().matches` check does not.

## Related

- Duration/easing source values: [docs/easing-timing.md](../docs/easing-timing.md)
- ScrollTrigger-specific recipes: [scrolltrigger-patterns.md](scrolltrigger-patterns.md)
- Full classical-principles rationale behind these structures: [docs/animation-fundamentals.md](../docs/animation-fundamentals.md)
