# Pre-Launch Checklist

Ship-readiness pass for a Three.js site going live. Broader than performance — covers correctness, resilience, and the things that are embarrassing to find out about after launch.

## Robustness

- [ ] WebGL unsupported/unavailable case handled (old browser, disabled hardware acceleration, restrictive corporate environment) — a clear fallback message, not a blank canvas or a thrown error
- [ ] Asset load failure handled (network error, 404, timeout) — user sees something actionable, not an infinite loading spinner
- [ ] WebGL context loss (`webglcontextlost`) handled or consciously deemed acceptable risk for this project
- [ ] No console errors/warnings in a clean run (dev tools console checked, not just visual inspection)
- [ ] Works from a cold cache and a warm cache (test both — asset pipeline bugs often only surface on first load)

## Performance gate

- [ ] Tested on a real mid-tier mobile device, not just desktop + emulation
- [ ] Tested after 60+ seconds of continuous interaction (thermal throttling window) — see [mobile-performance.md](../docs/mobile-performance.md)
- [ ] `devicePixelRatio` capped
- [ ] Initial 3D payload weight checked against a stated budget for this project
- [ ] No memory growth across extended use / multiple section transitions

## Cross-browser / cross-device

- [ ] Verified on the actual target browser set (state which — Chrome/Safari/Firefox at minimum; Safari's WebGL/shader compiler quirks are a common surprise source)
- [ ] Touch interaction verified on a real touch device, not just emulated
- [ ] Orientation change handled on mobile
- [ ] Verified at unusual viewport sizes (ultra-wide, narrow tall mobile) — not just the design's reference breakpoints

## Loading & first impression

- [ ] Loading state present and real (tied to actual asset progress, not a fake timer)
- [ ] Time-to-first-meaningful-paint is reasonable — user sees *something* (page shell, loading state) immediately, not a blank page until the full 3D payload resolves
- [ ] No jarring pop-in/layout shift when the 3D content becomes ready

## Accessibility & inclusivity

- [ ] `prefers-reduced-motion` respected
- [ ] Meaningful fallback/alternative content in the DOM for screen readers and non-WebGL contexts
- [ ] Primary navigation and content reachable without relying on 3D interaction
- [ ] Sufficient contrast/legibility for any UI overlaid on the 3D scene

## SEO & metadata

- [ ] Page has real `<title>`, meta description, and Open Graph tags — not left at Vite's default template values
- [ ] Crawlable content exists outside the canvas (headings, text describing the site) since canvas content is invisible to crawlers
- [ ] Favicon and social preview image set

## Build & deployment

- [ ] Production build tested (`vite build` + `preview`), not just dev server — dev and prod can behave differently for asset paths, especially Draco/KTX2 decoder paths
- [ ] Binary assets (`.glb`, `.ktx2`, `.wasm`, `.hdr`) served correctly from the production host, with correct MIME types and no unexpected inlining
- [ ] Caching headers reasonable for large static assets (long cache lifetime + content-hashed filenames, if the host supports it)
- [ ] No leftover debug helpers, `OrbitControls` dev-only camera, `stats.js` panel, or console-log spam shipped to production
- [ ] Source maps handled deliberately (shipped for error tracking, or excluded — not left as an accidental default)

## Final pass

- [ ] Ran [checklists/review-checklist.md](review-checklist.md) at least once end-to-end
- [ ] Ran [checklists/portfolio-checklist.md](portfolio-checklist.md) if this is portfolio/client-facing work
- [ ] Prioritized action list delivered for anything not yet fixed, ranked by what would most embarrass the project if a visitor hit it first
