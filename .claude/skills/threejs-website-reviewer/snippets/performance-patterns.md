# Performance Patterns

Reference implementations for the highest-payoff performance fixes. See [docs/optimization-guide.md](../docs/optimization-guide.md) for when each applies — don't apply these reflexively; justify against actual scene scale per [SKILL.md's premature-optimization guidance](../SKILL.md#avoiding-premature-optimization).

## Instancing (repeated geometry, per-instance transform/color)

```js
const count = 500;
const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
instancedMesh.instanceMatrix.setUsage(THREE.StaticDrawUsage); // DynamicDrawUsage only if transforms change post-setup

const dummy = new THREE.Object3D();
const color = new THREE.Color();

for (let i = 0; i < count; i++) {
  dummy.position.set(/* per-instance position */);
  dummy.rotation.y = Math.random() * Math.PI * 2;
  dummy.scale.setScalar(0.8 + Math.random() * 0.4);
  dummy.updateMatrix();
  instancedMesh.setMatrixAt(i, dummy.matrix);

  color.setHSL(Math.random(), 0.6, 0.5);
  instancedMesh.setColorAt(i, color); // requires instancedMesh.instanceColor to exist — Three.js allocates it automatically on first setColorAt call
}

instancedMesh.instanceMatrix.needsUpdate = true;
if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

scene.add(instancedMesh);
```

Raycasting against instances returns `instanceId` (index into your own per-instance data array) — see [examples/optimization-example.md](../examples/optimization-example.md) for the interaction-handling implication.

## Geometry merging (static, co-material meshes)

```js
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const geometries = meshList.map((mesh) => {
  const geom = mesh.geometry.clone();
  geom.applyMatrix4(mesh.matrixWorld); // bake each mesh's transform into its vertex data before merging
  return geom;
});

const merged = mergeGeometries(geometries, false);
const mergedMesh = new THREE.Mesh(merged, sharedMaterial);
scene.add(mergedMesh);

// Original individual meshes can now be removed/disposed — see snippets/disposal-patterns.md
```

Bake transforms *before* merging — a merged geometry has one shared transform going forward; if you skip baking, every merged piece ends up at the origin with the wrong orientation.

## Object pooling (frequently created/destroyed objects — particles, projectiles, UI markers)

```js
class ObjectPool {
  #available = [];
  #createFn;

  constructor(createFn, initialSize = 20) {
    this.#createFn = createFn;
    for (let i = 0; i < initialSize; i++) {
      this.#available.push(createFn());
    }
  }

  acquire() {
    return this.#available.pop() ?? this.#createFn();
  }

  release(obj) {
    obj.visible = false;
    this.#available.push(obj);
  }
}

const particlePool = new ObjectPool(() => new THREE.Mesh(particleGeometry, particleMaterial));

function spawnParticle(position) {
  const particle = particlePool.acquire();
  particle.position.copy(position);
  particle.visible = true;
  scene.add(particle);
  return particle;
}

function despawnParticle(particle) {
  scene.remove(particle);
  particlePool.release(particle);
}
```

Worth it once creation/destruction is frequent (many times per second, e.g. a particle burst system). Not worth it for objects created rarely (once per user action every few seconds) — the allocation cost there is negligible relative to interaction cadence.

## Reused scratch objects for per-frame math (avoids GC pressure)

```js
// Module-level, created once:
const _tempVec3 = new THREE.Vector3();
const _tempQuat = new THREE.Quaternion();
const _tempMatrix = new THREE.Matrix4();

function updateFollowCamera(target, camera, delta) {
  _tempVec3.copy(target.position).add(cameraOffset);
  camera.position.lerp(_tempVec3, 1 - Math.pow(0.001, delta)); // frame-rate-independent lerp
}
```

This is the single highest-value habit for avoiding per-frame allocation — apply it to any function called every frame that currently does `new THREE.Vector3(...)`/`new THREE.Matrix4()` internally.

## Render-on-demand loop (mostly-static, interaction-driven scenes)

```js
let needsRender = true;
function requestRender() {
  needsRender = true;
}

controls.addEventListener('change', requestRender);
window.addEventListener('resize', requestRender);
// any tween/animation start should also call requestRender() each frame it's active

renderer.setAnimationLoop(() => {
  if (!needsRender) return;
  renderer.render(scene, camera);
  needsRender = false;
});
```

For GSAP-driven animation feeding this loop, call `requestRender()` from the tween's `onUpdate`, or simply set `needsRender = true` unconditionally for the duration of any active tween/scroll interaction rather than trying to gate every single animated property change individually.

## Frame-rate-independent damping/lerp

```js
// Avoid: frame-rate-dependent, feels different at 30fps vs 144fps
position.lerp(target, 0.1);

// Prefer: consistent feel regardless of frame rate
const dampingHalfLife = 0.15; // seconds to close half the remaining distance
const t = 1 - Math.pow(0.5, delta / dampingHalfLife);
position.lerp(target, t);
```

## Pausing the loop when backgrounded

```js
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    renderer.setAnimationLoop(null);
  } else {
    lastFrameTime = performance.now(); // reset delta-time tracking to avoid a large jump on resume
    renderer.setAnimationLoop(tick);
  }
});
```

Prevents battery drain and GPU/thermal load from a backgrounded tab, and avoids animation/physics jumps from an artificially huge `deltaTime` on tab refocus.
