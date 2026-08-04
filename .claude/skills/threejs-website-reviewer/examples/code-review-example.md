# Worked Example: Full File Review

A complete example of a condensed file review (per [SKILL.md § Output format](../SKILL.md#output-format), the "review this file/component" case), following [templates/review-template.md](../templates/review-template.md). The reviewed code is a hypothetical `src/scenes/ProductViewer.js` — a Vite + vanilla JS scene with GSAP, loading a glTF product model with `OrbitControls`-style drag rotation.

---

## Scope

Reviewed `src/scenes/ProductViewer.js` (single-file scene: setup, loader, render loop, resize, and drag-rotate interaction — ~180 lines). No other files inspected; assumptions noted below where relevant code might live elsewhere.

## Summary verdict

Functionally solid and the glTF/Draco loading is set up correctly, but there are two real problems worth fixing before this ships: an uncapped pixel ratio that will hurt badly on high-DPI phones, and a resize handler that recreates the renderer's render target-equivalent state on every single `resize` event without debouncing — which will visibly stutter during mobile address-bar-collapse scrolling. Everything else is Low/Suggestion territory.

## Findings

### High

#### Uncapped `devicePixelRatio`
- **Where:** `ProductViewer.js:34`
- **What:** `renderer.setPixelRatio(window.devicePixelRatio);`
- **Why it's an issue:** On a 3x-DPR device (most current iPhones), this renders 9x the fragment shader work of a 1x display for the same visible size. Combined with the `MeshPhysicalMaterial` used here (line 61) for the product's clearcoat finish — a materially more expensive shader than `MeshStandardMaterial` — this is the most likely cause of any reported mobile slowness.
- **Expected improvement if fixed:** Substantial fragment-shader cost reduction on high-DPR devices; visual difference between capped-at-2 and native 3x DPR is minor for most users.
- **Fix:**
  ```js
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  ```

#### Resize handler not debounced, recreates post-processing targets every event
- **Where:** `ProductViewer.js:98-112`
- **What:** `window.addEventListener('resize', () => { composer.setSize(...); bloomPass.setSize(...); })` with no throttling.
- **Why it's an issue:** Mobile browsers fire `resize` repeatedly during the URL-bar show/hide that happens on ordinary scroll (the viewport height changes as the browser chrome collapses). Each event here reallocates the composer's internal render targets (`EffectComposer.setSize` recreates its `WebGLRenderTarget`s). On a page where this viewer sits below a scrollable hero, ordinary scrolling will repeatedly reallocate GPU render targets — a real stutter source, and one that's easy to misdiagnose as "general scroll jank" rather than tracing back to this handler.
- **Expected improvement if fixed:** Removes a specific, repeated GPU allocation cost that fires during normal scrolling on mobile.
- **Fix:**
  ```js
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      composer.setSize(container.clientWidth, container.clientHeight);
      bloomPass.setSize(container.clientWidth, container.clientHeight);
    }, 200);
  });
  ```
  Alternatively, ignore resize events where only height changed by a small amount (typical address-bar collapse range) and width stayed constant, if immediate response to genuine resizes (e.g. orientation change) matters more than the debounce delay.

### Medium

#### Drag-rotate listeners use `mousemove`/`mouseup` only, no touch/pointer equivalent
- **Where:** `ProductViewer.js:130-145`
- **Why it's an issue:** This is the primary interaction for a product viewer; on touch devices it silently does nothing, since `mousedown`/`mousemove` don't fire from touch input in the way this code expects (no `pointer*` or `touch*` listeners present).
- **Expected improvement if fixed:** Makes the core interaction actually work on mobile/tablet, where a meaningful share of visitors to a product page will be.
- **Fix:** Switch to Pointer Events, which unify mouse and touch:
  ```js
  canvas.addEventListener('pointerdown', onDragStart);
  canvas.addEventListener('pointermove', onDragMove);
  canvas.addEventListener('pointerup', onDragEnd);
  canvas.style.touchAction = 'none'; // prevent the browser's native scroll/pinch from fighting the drag gesture
  ```

### Low

#### `THREE.LoadingManager` not used; loading state is a hardcoded 2-second `setTimeout`
- **Where:** `ProductViewer.js:20-24`
- **Why it's an issue:** The fake timer will show "ready" before the model has actually finished loading/decoding on a slow connection, or sit idle after real loading finished on a fast one — either way it's disconnected from ground truth.
- **Fix:** Wire an actual `LoadingManager` to the `GLTFLoader` and drive the UI off `onProgress`/`onLoad`. See [snippets/loading-patterns.md](../snippets/loading-patterns.md) for the full pattern.

### Suggestion

#### Scene/camera/renderer held as bare module-level `let` bindings
- **Where:** top of file
- **Why it's worth considering:** Fine at this file's current size and single-scene scope. If this pattern gets copied into additional scene files, revisit — see [architecture.md](../docs/architecture.md) for when a shared `SceneManager` earns its complexity. Not worth restructuring for this file alone.

## What's done well

- Draco decoder is self-hosted from `/draco/` (line 12) rather than pulled from a CDN — correct call for a production loading path.
- `texture.colorSpace` is set explicitly on the base color map (line 58) — an easy-to-miss step that's handled correctly here.
- Single `renderer.setAnimationLoop` drives the frame with no competing RAF loop — correct render-loop ownership.

## Prioritized action list

1. Cap `devicePixelRatio` at 2 — one-line fix, likely the single biggest mobile performance win here.
2. Debounce the resize handler to stop reallocating render targets during ordinary mobile scrolling.
3. Add Pointer Event handling so the core drag interaction works on touch devices at all.
4. Replace the fake loading timer with a real `LoadingManager`-driven progress state.

## Open questions / things to verify

- Actual mobile FPS/frame-time numbers weren't available — recommend re-testing on a real mid-tier device after the pixel-ratio and resize fixes, per [mobile-performance.md](../docs/mobile-performance.md).
- Didn't see the file(s) defining `bloomPass`/`composer` setup — flagged the resize-cost mechanism generically; if bloom resolution is already scaled down independently, the reallocation cost may be smaller than assumed here.
