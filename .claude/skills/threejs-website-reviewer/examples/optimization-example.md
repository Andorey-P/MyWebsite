# Worked Example: Optimization Pass

A complete example following [templates/optimization-report.md](../templates/optimization-report.md), for a realistic scenario: a scene rendering ~200 identical "card" meshes (a common portfolio pattern — a grid/wall of repeated elements) that's slow on mobile.

---

## Target

`src/scenes/GalleryWall.js` — a wall of 200 identical card meshes (same geometry, same material, per-card position/rotation only), reported as dropping to ~15fps on a mid-tier Android device, fine on desktop.

## Diagnosis

- **Bottleneck type:** GPU/API-overhead-bound, driven by draw call count — not fill-rate or shader complexity.
- **Mechanism:** `renderer.info.render.calls` reported by the user as 203 for this scene alone. 200 draw calls of a simple ~200-triangle card each is a classic "too many small draw calls" profile — the fixed CPU-side cost of submitting each draw call (state validation, command buffer work) dominates over the actual triangle throughput, and that fixed cost is proportionally much higher on mobile GPU drivers than desktop.
- **Confirmed vs. inferred:** Draw call count is confirmed via the reported `renderer.info` value. The "desktop fine, mobile slow" split is consistent with draw-call-overhead being the bottleneck (mobile GPU drivers generally have higher per-draw-call overhead than desktop) rather than fill-rate (which would typically degrade on desktop too, just less severely, given desktop's usually-higher fragment throughput headroom) — worth confirming with a Spector.js capture on the mobile device if available, but the pattern strongly points here without it.

## Changes, ranked by impact

### 1. Convert to `InstancedMesh`

- **Severity/impact:** Critical/High — this is the actual bottleneck; everything else is secondary.
- **Before:**
  ```js
  const cards = [];
  for (const cardData of galleryData) {
    const mesh = new THREE.Mesh(cardGeometry, cardMaterial);
    mesh.position.copy(cardData.position);
    mesh.rotation.copy(cardData.rotation);
    scene.add(mesh);
    cards.push(mesh);
  }
  ```
- **After:**
  ```js
  const instancedCards = new THREE.InstancedMesh(cardGeometry, cardMaterial, galleryData.length);
  instancedCards.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // only if positions animate; StaticDrawUsage (default) if fixed after setup

  const dummy = new THREE.Object3D();
  galleryData.forEach((cardData, i) => {
    dummy.position.copy(cardData.position);
    dummy.rotation.copy(cardData.rotation);
    dummy.updateMatrix();
    instancedCards.setMatrixAt(i, dummy.matrix);
  });
  instancedCards.instanceMatrix.needsUpdate = true;
  scene.add(instancedCards);
  ```
- **Why this helps:** 200 draw calls collapse to 1. The GPU still processes the same total triangle count, but the CPU-side per-draw-call overhead — the actual bottleneck here — is paid once instead of 200 times.
- **Expected result:** Should bring mobile frame time down substantially given draw-call submission was the dominant cost; expect it to move from GPU-API-overhead-bound to somewhere else entirely (likely no longer a bottleneck at this object count). Re-measure rather than assuming a specific fps.
- **Tradeoff:** Individual cards can no longer be independently added/removed from the scene graph via `scene.add`/`remove` — visibility/selection state must be handled via per-instance data (e.g. scaling an instance to zero, or a per-instance visibility attribute) instead. If the gallery needs per-card click-to-select with an outline/highlight effect, that now needs to be built as a per-instance shader effect or a separate single "highlight" mesh overlaid on the selected instance, rather than swapping a material on a real removed `Mesh`.

### 2. If per-card hover/click interactivity is needed, raycast against the InstancedMesh directly

- **Severity/impact:** Medium — only relevant if change #1 broke existing per-card interaction.
- **After:**
  ```js
  const intersects = raycaster.intersectObject(instancedCards);
  if (intersects.length > 0) {
    const instanceId = intersects[0].instanceId; // index into your original galleryData array
  }
  ```
- **Why this helps:** `InstancedMesh` raycasting returns `instanceId`, so per-card interaction logic (that indexed into `cards[i]` before) can index into `galleryData[instanceId]` instead — no separate mesh array needed.

## Explicitly not changed

- **Card geometry itself** — already a simple, low-poly plane-like shape; not a triangle-count concern at this scale, and simplifying it further wouldn't move the needle given the bottleneck is draw-call count, not vertex throughput.
- **Card material** — a straightforward `MeshStandardMaterial` with one texture map; no unnecessary complexity to strip.
- **Texture compression** — not evaluated in this pass since it wasn't the reported symptom; worth a separate look if load time (rather than frame rate) becomes the next concern.

## Recommended verification

1. Re-check `renderer.info.render.calls` — should read close to the app's other draw calls + 1, not +200.
2. Re-test on the same mobile device that reported 15fps, both on initial load and after ~60 seconds of scrolling/interaction (thermal throttling window).
3. Compare a Chrome Performance recording before/after if possible, to confirm the frame-time reduction and see whether a new (smaller) bottleneck emerges.
