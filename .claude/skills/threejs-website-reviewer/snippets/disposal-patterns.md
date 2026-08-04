# Disposal Patterns

Three.js does not garbage-collect GPU resources. `dispose()` must be called explicitly on geometries, materials, textures, and render targets, or the underlying GPU memory (and, for some resources, native driver objects) is never freed even after the JS objects become unreachable. Use these patterns when reviewing for leaks or fixing them.

## Full scene/subtree teardown

The canonical deep-dispose routine — walks a subtree and disposes everything reachable:

```js
function disposeObject3D(object) {
  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }

    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach(disposeMaterial);
    }
  });
}

function disposeMaterial(material) {
  // Dispose any texture maps attached to the material
  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && 'isTexture' in value) {
      value.dispose();
    }
  }
  material.dispose();
}

// Usage on section/scene teardown:
scene.remove(rootObject);
disposeObject3D(rootObject);
```

**Review note:** `scene.remove()` alone does nothing to GPU memory — it only detaches the object from the graph. Removal and disposal are two separate steps; flag code that does one without the other as a leak, not a style issue.

## Shared resources: don't double-dispose or dispose-while-in-use

If a texture or material is shared across multiple meshes (correctly, per [threejs-best-practices.md](../docs/threejs-best-practices.md#materials)), a naive per-object dispose loop will call `.dispose()` on the same shared resource multiple times (harmless — `dispose()` is idempotent) but, more importantly, must not run while *other still-visible* objects still reference that shared resource. Track ownership explicitly:

```js
class AssetManager {
  #refCounts = new Map();

  acquire(resource) {
    this.#refCounts.set(resource, (this.#refCounts.get(resource) ?? 0) + 1);
    return resource;
  }

  release(resource) {
    const count = (this.#refCounts.get(resource) ?? 1) - 1;
    if (count <= 0) {
      resource.dispose();
      this.#refCounts.delete(resource);
    } else {
      this.#refCounts.set(resource, count);
    }
  }
}
```

Only introduce reference counting once sharing is actually happening across independently-torn-down sections — for a single scene with no dynamic teardown, the full-subtree dispose above is sufficient and this adds unjustified complexity.

## Render targets

Post-processing, portals, mirrors, and render-to-texture effects allocate `WebGLRenderTarget`s, which hold GPU framebuffer/texture memory:

```js
function disposeRenderTarget(target) {
  target.dispose(); // disposes the target's internal texture(s) and framebuffer
}

// On resize, if not using EffectComposer's own setSize (which handles this internally):
function resizeRenderTarget(target, width, height) {
  target.setSize(width, height); // WebGLRenderTarget.setSize does NOT dispose the old GL objects on some paths —
  // verify against the Three.js version in use; when in doubt, dispose and recreate explicitly for custom RTT setups.
}
```

`EffectComposer.setSize()` handles its own internal passes' render targets correctly — don't manually dispose composer-owned targets. This pattern is for hand-rolled render-to-texture code (custom portals, reflections, GPGPU-style effects) outside the composer.

## Event listeners (DOM leak, not GPU, but equally real)

```js
class InteractiveSection {
  #onResize = () => this.handleResize();
  #onPointerMove = (e) => this.handlePointerMove(e);

  mount() {
    window.addEventListener('resize', this.#onResize);
    this.canvas.addEventListener('pointermove', this.#onPointerMove);
  }

  unmount() {
    window.removeEventListener('resize', this.#onResize);
    this.canvas.removeEventListener('pointermove', this.#onPointerMove);
  }
}
```

Storing the bound function as a class field (not an inline arrow function passed directly to `addEventListener`) is what makes `removeEventListener` actually work — an inline arrow function creates a new function reference each time, which `removeEventListener` cannot match against. This is a common, easy-to-miss bug: the code *looks* like it removes the listener but silently doesn't.

## GSAP / ScrollTrigger teardown

```js
function unmountSection() {
  scrollTriggerInstances.forEach((st) => st.kill());
  activeTweens.forEach((tween) => tween.kill());
}
```

Track created `ScrollTrigger`/tween instances (an array populated at creation) so they can be explicitly killed on teardown, rather than relying on `ScrollTrigger.getAll()` globally (which affects triggers from unrelated sections too, in a multi-section app).

## Detecting leaks during review/development

```js
// Cheap dev-time leak detector: log renderer.info after every navigation/teardown event
function logMemory(label) {
  console.log(label, {
    geometries: renderer.info.memory.geometries,
    textures: renderer.info.memory.textures,
  });
}
```

Call this before and after a repeated navigate-away-and-back cycle in development. A leak-free implementation returns to the same baseline each time; a leak shows a monotonic climb.
