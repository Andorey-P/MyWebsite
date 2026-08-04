# Performance-Only Checklist

Use for a focused optimization pass, not a full review — pair with [docs/optimization-guide.md](../docs/optimization-guide.md) for the reasoning behind each item. Output using [templates/optimization-report.md](../templates/optimization-report.md).

## Step 0: diagnose before touching anything

- [ ] Confirmed (or stated how to confirm) whether the bottleneck is GPU-bound or CPU-bound — see [optimization-guide.md](../docs/optimization-guide.md#step-1-figure-out-whether-youre-gpu-bound-or-cpu-bound)
- [ ] Pulled `renderer.info` (calls, triangles, geometries, textures) if code access allows, or asked the user for it
- [ ] Identified whether the reported slowness is constant, or specific to a moment (load, a specific interaction, scroll, resize)

## Draw calls & batching

- [ ] `renderer.info.render.calls` measured or estimated from scene contents
- [ ] Static co-material meshes identified as merge candidates
- [ ] Repeated geometry+material identified as `InstancedMesh` candidates
- [ ] Small textures identified as atlas candidates

## Geometry

- [ ] Vertex attribute bloat checked (unused UVs, unused vertex colors)
- [ ] Index buffer type appropriate (`Uint16` vs `Uint32`) for vertex count
- [ ] Collision/physics proxies separate from render geometry where physics is present
- [ ] `computeBoundingSphere()`/`computeBoundingBox()` correctness after any runtime vertex mutation

## Materials & shaders

- [ ] Material complexity matched to visual need (no unused `MeshPhysicalMaterial` features)
- [ ] `needsUpdate` not set unconditionally in a hot path
- [ ] Custom shaders reviewed against [docs/shader-review.md](../docs/shader-review.md) (branching, texture lookups, precision)
- [ ] Shared materials not mutated per-object in the render loop

## Textures

- [ ] Mipmaps present for minified textures
- [ ] Texture sizes matched to actual on-screen footprint, not oversized
- [ ] KTX2/Basis compression applied where the pipeline supports it
- [ ] Anisotropy set deliberately for grazing-angle surfaces (and not wastefully maxed everywhere)

## Lighting & shadows

- [ ] Shadow-casting light count justified
- [ ] Shadow map size and camera frustum tuned to scene bounds
- [ ] `shadow.autoUpdate` considered for static-lighting scenes
- [ ] `castShadow`/`receiveShadow` set deliberately per-object, not left default-on everywhere

## Post-processing

- [ ] Pass count and necessity justified per pass
- [ ] Expensive passes (SSAO/SSR/bloom/DOF) resolution-scaled or gated by quality tier
- [ ] No redundant render-target round-trips across passes

## CPU / JS

- [ ] No allocation inside `animate()`/per-frame callbacks
- [ ] No per-frame DOM reads mixed with writes (layout thrashing)
- [ ] `scene.traverse()` avoided in hot paths
- [ ] Physics/collision cost appropriate to object count

## Mobile-specific

- [ ] `devicePixelRatio` capped
- [ ] Quality tier system present or explicitly deemed unnecessary for this project's scope
- [ ] Verified reasoning doesn't rely solely on desktop Chrome device emulation (state that real-device testing is needed)

## Output

- [ ] Every finding has: mechanism, severity, expected improvement, fix, code example if non-trivial
- [ ] Findings ranked highest-impact first
- [ ] Explicitly noted what was *not* flagged because it's not on a hot path (shows restraint, per [premature optimization guidance](../SKILL.md#avoiding-premature-optimization))
