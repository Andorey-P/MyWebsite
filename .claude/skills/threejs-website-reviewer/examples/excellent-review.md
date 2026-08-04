# Calibration Example: Excellent Review Output

This is what a well-calibrated finding looks like — specific, mechanism-driven, honest about certainty, with a real fix. Use this as the tone/depth target, not a template to copy verbatim.

---

### [Finding] `TextureLoader` instantiated and textures loaded inside the render loop

- **Where:** `src/scenes/HeroScene.js:142`, inside `animate()`
- **What:**
  ```js
  function animate() {
    requestAnimationFrame(animate);

    if (particleSystem.needsTextureRefresh) {
      const loader = new THREE.TextureLoader();
      particleMaterial.map = loader.load('/textures/spark.png');
      particleMaterial.needsUpdate = true;
      particleSystem.needsTextureRefresh = false;
    }

    renderer.render(scene, camera);
  }
  ```
- **Why it's an issue:** `needsTextureRefresh` is set to `true` on every particle emission event (confirmed by checking `emitParticleBurst()` at line 89), which in this scene happens roughly every 400ms during active interaction. Each trigger creates a brand-new `TextureLoader`, re-requests an image that's almost certainly already cached by the browser, decodes it again, uploads a new `WebGLTexture` to the GPU, and — critically — never disposes the *previous* `map` texture before overwriting the reference. The old `THREE.Texture` and its underlying `WebGLTexture` are now unreachable from JS but still hold GPU memory, because nothing called `.dispose()` on them. `material.needsUpdate = true` additionally forces a shader recompile every time this runs, since Three.js treats a changed `map` as a structural material change.
- **Severity:** Critical — this is an unbounded memory leak (confirmed mechanism: no dispose call on the replaced texture) combined with a real per-trigger performance cost (network/decode/recompile), on a path that fires repeatedly during normal use. A user interacting with the hero for a few minutes will accumulate dozens of orphaned GPU textures.
- **Expected improvement if fixed:** Eliminates the leak entirely (GPU texture memory should plateau instead of climbing — verify via `renderer.info.memory.textures` before/after over a few minutes of interaction). Also removes the redundant network/decode/recompile cost on every particle burst, which should smooth out the periodic hitch you'd see in a Performance recording lined up with burst events.
- **Fix:** The texture never actually changes — it's the same `spark.png` every time. Load it once, outside the loop, and reuse the reference:
  ```js
  // At scene setup, once:
  const sparkTexture = textureLoader.load('/textures/spark.png');
  particleMaterial.map = sparkTexture;

  // In animate(), remove the reload entirely — nothing needs to change here per-burst.
  // If per-burst variation is actually intended (e.g. a random texture from a set),
  // load the full set once at setup and index into it, rather than loading on demand:
  const sparkVariants = [/* pre-loaded textures */];
  particleMaterial.map = sparkVariants[Math.floor(Math.random() * sparkVariants.length)];
  particleMaterial.needsUpdate = true; // still recompiles — see alternative below
  ```
  If per-burst texture *swapping* between a small fixed set is genuinely the intent and the recompile cost matters, prefer a texture array/atlas indexed by a uniform over swapping `.map` and forcing `needsUpdate`, which avoids shader recompilation entirely.
- **Alternatives:** If particles need genuinely dynamic textures generated at runtime (not the case here, based on the fixed filename), use a pooled set of pre-created textures rather than loading on demand.

---

Note what makes this "excellent": it names the exact line, traces *why* the code path fires as often as it claims (not asserted without basis), separates the leak mechanism from the recompile mechanism instead of bundling them as one vague complaint, gives a real fix in the project's own code, and offers a genuine alternative only where a genuine tradeoff exists — it doesn't manufacture options for the sake of seeming thorough.
