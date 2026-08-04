# Snippet: Responsive Canvas Resize Architecture

Copy-paste resize-handling architecture: one `ResizeObserver` owner, notifying subscribers, instead of every module independently listening to `window.resize`. The specific DPR-capping *value* and its performance rationale are threejs-website-reviewer's territory ([threejs-best-practices.md § renderer setup](../../threejs-website-reviewer/docs/threejs-best-practices.md#renderer-setup)) — this snippet is about where resize-handling code lives and how many listeners exist, not what number to clamp DPR to.

```js
// core/Resizer.js
export default class Resizer {
  #observer;
  #target;
  #onResize;
  #frame = null;

  /**
   * @param {Element} target the element whose box size drives the app (usually the
   *   canvas's *container*, not the canvas itself and not `window` — see rationale below)
   * @param {{ onResize: (width: number, height: number) => void }} options
   */
  constructor(target, { onResize }) {
    this.#target = target;
    this.#onResize = onResize;

    this.#observer = new ResizeObserver((entries) => {
      // Coalesce rapid-fire entries (mobile address-bar collapse, layout thrash)
      // into one callback per animation frame rather than firing onResize synchronously
      // for every observer tick.
      if (this.#frame) cancelAnimationFrame(this.#frame);
      this.#frame = requestAnimationFrame(() => {
        const { inlineSize: width, blockSize: height } = entries[0].contentBoxSize[0];
        this.#onResize(Math.floor(width), Math.floor(height));
      });
    });

    this.#observer.observe(target);
  }

  dispose() {
    if (this.#frame) cancelAnimationFrame(this.#frame);
    this.#observer.disconnect();
  }
}
```

## Why observe the container, not `window`

```js
// App.js
this.resizer = new Resizer(canvas.parentElement, {
  onResize: (w, h) => this.handleResize(w, h),
});
```

`window.resize` only fires when the *viewport* changes size. It does not fire when a GSAP ScrollTrigger pin-spacer changes the canvas's effective box, when a sibling element's layout shift changes available space, or in any container-query-driven responsive layout where the canvas's box can change without the window changing at all. `ResizeObserver` on the actual container fires for all of these correctly, because it observes the box itself rather than inferring it from viewport size — this is what keeps resize correct under the exact GSAP-pin-driven layouts this stack uses.

## Single subscriber fan-out

Every module that cares about size reacts to `App.handleResize`, not its own listener:

```js
// App.js
handleResize(width, height) {
  this.renderer.setSize(width, height);   // renderer.setSize(w, h, false) internally — see best-practices doc
  this.scenes.resize(width, height);      // active scene updates camera aspect
  this.composer?.setSize(width, height);  // if post-processing is in use
}
```

One `ResizeObserver` instance, one callback, one place that decides fan-out order (renderer before scene, so the scene's aspect calculation always sees the current canvas size). Compare to the failure mode this prevents: three separate modules each running `window.addEventListener('resize', ...)` independently, each recomputing aspect ratio from a slightly different read of `window.innerWidth` at a slightly different tick — a common source of one-frame-of-wrong-aspect flashes on resize.

## Debounce vs. rAF-coalesce

The pattern above coalesces via `requestAnimationFrame`, not a `setTimeout` debounce — deliberately. A `setTimeout(fn, 150)` debounce introduces a visible **delay** before the canvas catches up to its new size (the classic "resize, then a beat later the 3D content snaps to fit"). Coalescing to the next animation frame instead means the resize is applied on the very next paint, with no perceptible lag, while still collapsing a burst of rapid-fire `ResizeObserver` entries (which mobile browsers produce during address-bar show/hide) into a single `onResize` call per frame instead of dozens.

## Pairing with `EffectComposer`

If post-processing is in use, let `EffectComposer.setSize()` handle its own internal render-target resizing — don't manually resize/dispose composer-owned render targets from `Resizer`. `Resizer`'s job stops at "here is the new width/height"; what a given renderer/composer/scene does with that number is its own concern, not something `Resizer` should know the internals of.
