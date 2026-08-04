# Full Review Checklist

Use for a complete site/project audit. Work top to bottom — order roughly matches priority in [SKILL.md](../SKILL.md#review-priorities). Check off what's fine, note file/line for anything that isn't, and rate severity per the rubric in SKILL.md.

## 1. Stability & memory

- [ ] Every geometry/material/texture created dynamically (not just at boot) has a corresponding disposal path
- [ ] Render targets (post-processing, portals, RTT effects) are disposed on resize/teardown, not recreated without disposing the old one
- [ ] Event listeners (`resize`, `pointermove`, `scroll`, `visibilitychange`) added on init are removed on teardown
- [ ] No object creation (`Vector3`, `Matrix4`, `Color`, arrays) inside the render loop or per-frame callbacks
- [ ] `renderer.info.memory.geometries` / `.textures` don't grow unbounded across section/scene transitions
- [ ] WebGL context loss (`webglcontextlost`/`webglcontextrestored`) is handled, or consciously accepted as out of scope
- [ ] Async asset loading has no race conditions (e.g. component unmounted before load resolves still tries to add to a disposed scene)

## 2. GPU-bound performance

- [ ] `renderer.setPixelRatio` capped (not raw `window.devicePixelRatio`)
- [ ] Draw call count reasonable for scene complexity (`renderer.info.render.calls`); instancing/merging used where object count is high
- [ ] No redundant shader recompilation (`needsUpdate` set conditionally, not every frame)
- [ ] Shadow map sizes and camera frustums are tuned to scene bounds, not left at generous defaults
- [ ] Post-processing pass count justified; expensive passes (SSAO/SSR/DOF) run at appropriate resolution
- [ ] Materials use appropriate complexity for their visual role (no `MeshPhysicalMaterial` where `MeshStandardMaterial` would look identical)
- [ ] Textures have mipmaps where minification occurs; anisotropy set deliberately, not left at 1 for grazing-angle surfaces that need it

## 3. CPU-bound performance

- [ ] No per-frame DOM reads/writes causing layout thrashing
- [ ] No unnecessary `scene.traverse()` in hot paths
- [ ] Physics/collision cost appropriate to object count; not O(n²) at a scale where it matters
- [ ] Scratch objects reused for per-frame math, not reallocated

## 4. Asset pipeline

- [ ] Geometry compressed (Draco) where file size justifies the decoder cost
- [ ] Textures compressed (KTX2/Basis) with `detectSupport(renderer)` called
- [ ] Draco/KTX2 decoders self-hosted, not loaded from a third-party CDN
- [ ] Texture color space set correctly (sRGB for color maps, linear/NoColorSpace for data maps)
- [ ] glTF export scale/units correct; no leftover unused nodes, UV channels, or embedded cameras/lights
- [ ] Total initial 3D payload weight is reasonable for the experience (state the actual number found)

## 5. Loading UX

- [ ] Real progress feedback via `THREE.LoadingManager`, not a fake timer-based bar
- [ ] Loading state accounts for post-download decode/transcode time, not just network progress
- [ ] Critical path assets prioritized; non-critical assets deferred/lazy-loaded
- [ ] Graceful behavior on slow connections / load failure (timeout, retry, or explicit error state) — not an infinite spinner

## 6. Mobile & responsive

- [ ] Touch input handled (Pointer Events or explicit touch handlers), not mouse-only
- [ ] Quality tiering exists for lower-end/mobile devices (or a stated reason it doesn't)
- [ ] Resize handling is debounced/throttled against mobile address-bar-collapse resize spam
- [ ] `touch-action` set appropriately on the canvas for drag-based interaction
- [ ] Render loop pauses on `visibilitychange` (backgrounded tab)

## 7. Architecture & maintainability

- [ ] Single render loop drives the frame; no competing/duplicate RAF loops
- [ ] Clear ownership of scene/camera/renderer (not scattered global mutable state)
- [ ] Asset loading logic centralized, not duplicated per scene/section
- [ ] Shader code organized as separate files/modules where non-trivial, not inline strings scattered through logic
- [ ] Code is reasonably testable/readable — a second engineer could onboard without a walkthrough

## 8. GSAP / ScrollTrigger / Lenis integration

- [ ] Lenis `raf()` driven from the same loop as the render call, not a second independent loop
- [ ] `lenis.on('scroll', ScrollTrigger.update)` wired if both are present
- [ ] No stacked/competing scroll-smoothing layers (Lenis + manual lerp + GSAP scrub all fighting each other)
- [ ] Tweens/ScrollTriggers killed on teardown where the app supports navigating away from the 3D content
- [ ] `prefers-reduced-motion` respected for scroll-hijacking / heavy parallax effects

## 9. Visual quality & UX

- [ ] Color management correct (`outputColorSpace`, tone mapping) — no washed-out or blown-out results
- [ ] Lighting/IBL setup produces believable material response, not flat/default-lit look
- [ ] Camera framing, transitions, and interaction feel intentional, not default/untuned
- [ ] Loading-to-interactive transition feels considered (no jarring pop-in)

## 10. Code quality, accessibility, SEO

- [ ] Consistent module structure and naming
- [ ] TypeScript-friendly patterns if migration is a future possibility (no ad hoc property bags on Three.js objects)
- [ ] Meaningful fallback DOM content present for accessibility/SEO alongside canvas-only content
- [ ] Primary navigation reachable without relying on 3D interaction
- [ ] Bundle size reasonable; only used GSAP plugins imported; code-splitting used for below-the-fold 3D content if applicable

## Close with

- [ ] Prioritized top 3–5 action list, highest impact first (see [templates/review-template.md](../templates/review-template.md))
