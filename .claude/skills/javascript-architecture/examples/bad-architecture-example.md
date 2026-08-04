# Bad Architecture Example: The Same Feature, Tangled

The identical feature from [good-architecture-example.md](good-architecture-example.md) — scroll-driven camera dolly past project meshes, DOM-card hover highlights the matching mesh — built the way it tends to happen under time pressure: everything reaching into everything else. Read paired with the good example; the diagnosis below maps directly onto what changed.

## The tangled version

```js
// main.js — everything lives here
import * as THREE from 'three';
import gsap from 'gsap';

let scene, camera, renderer, meshes = [];
let hoveredId = null; // module-level mutable global

const projectData = [ /* ... */ ];

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#app-canvas') });

  projectData.forEach((project, i) => {
    const geometry = new THREE.IcosahedronGeometry(0.6, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(project.x, project.y, project.z);
    mesh.projectId = project.id; // bare custom property, not userData
    meshes.push(mesh);
    scene.add(mesh);
  });

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('pointerenter', () => {
      hoveredId = card.dataset.projectId;
      // reaches directly into the 3D layer's internals from the DOM layer
      meshes.forEach((m) => {
        m.material.emissiveIntensity = m.projectId === hoveredId ? 1 : 0;
      });
      // also directly mutates a GSAP timeline defined 200 lines further down
      cardHoverTimeline.play();
    });
  });

  gsap.timeline({
    scrollTrigger: { trigger: '#projects-section', start: 'top top', end: '+=200%', scrub: true },
  }).to(camera.position, { z: -10 });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// A second, independent RAF loop, added later by someone who didn't realize animate() existed
function pulseHoveredMesh() {
  requestAnimationFrame(pulseHoveredMesh);
  const mesh = meshes.find((m) => m.projectId === hoveredId);
  if (mesh) mesh.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.05);
}
pulseHoveredMesh();

init();
```

## Specific diagnosis

1. **Module-level mutable globals as de facto state.** `scene`, `camera`, `meshes`, `hoveredId` are all bare top-level `let` bindings. Nothing declares who's allowed to write `hoveredId` — the pointer handler does, but so could any later addition, with no compiler or convention stopping it. Compare to the good example's `uiStore`, where the write surface is one `set()` call in one file.

2. **The DOM layer reaches directly into 3D internals.** The card hover handler iterates `meshes` and mutates `.material.emissiveIntensity` directly — this file now has to know that meshes carry a `projectId`, that highlighting means touching `emissiveIntensity`, and that a `cardHoverTimeline` variable exists somewhere below it. Delete the 3D scene and this handler breaks immediately; there is no version of this code where the DOM layer and 3D layer are independently testable, because they were never actually decoupled — see [module-design.md § dependency direction](../docs/module-design.md#dependency-direction) for the rule this violates.

3. **Bare custom property instead of `userData`.** `mesh.projectId = project.id` is invisible to tooling, not type-friendly, and collides silently if Three.js ever adds its own `projectId`-named internal property in a future version. One-line fix, but symptomatic of nothing in this file following a stated convention.

4. **A second, independent `requestAnimationFrame` loop.** `pulseHoveredMesh()` was bolted on later by someone who didn't realize `animate()` already existed 40 lines up, because everything is flat in one file with no single obvious place a new per-frame behavior belongs. This is exactly the failure mode threejs-website-reviewer flags as a stability-risk finding in [its architecture.md](../../threejs-website-reviewer/docs/architecture.md#render-loop-ownership) — two competing RAF loops, no coordination, and now two different code paths can call `renderer.render()` or mutate the same mesh in the same frame in an undefined order.

5. **No lifecycle contract, no disposal path.** There is no `dispose()` anywhere. If this "scene" ever needs to be torn down (route change, section unmount), there's no enumerable list of what was created — geometries, materials, event listeners are all scattered through one function with no owner to ask "what do you hold onto." Untangling this later means re-reading the entire file line by line to reconstruct what needs releasing, whereas the good example's `dispose()` is a 6-line mirror of its `init()`.

6. **Everything in `main.js`.** Boot sequence, scene setup, asset construction, DOM event wiring, and animation timeline setup are all one file with no boundary at all. A second engineer cannot answer "where does hover-highlighting live" without reading the whole file — there's no filename to guess from.

## What fixing this actually looks like

Not a rewrite — a mechanical extraction, in this order, matching [module-design.md § when to split a file or class](../docs/module-design.md#when-to-split-a-file-or-class):

1. Delete `pulseHoveredMesh`'s independent RAF loop; fold its per-frame logic into the existing `animate()`/`update()`.
2. Introduce `uiStore` with one `hoveredProjectId` value; point the card handler at `uiStore.set()` instead of reaching into `meshes` directly.
3. Move mesh creation and the store subscription into a `ProjectsScene` class implementing the lifecycle contract; move the card DOM handling into a `ProjectCardList` class.
4. Replace `mesh.projectId` with `mesh.userData.projectId`.
5. Add `dispose()` to `ProjectsScene`, populated by tracing exactly what `init()` (now the constructor/`init` method) created.

Each step is independently small and testable — this is the "smallest version of the architectural change" discipline threejs-website-reviewer's SKILL.md also applies when recommending fixes to existing code; the difference here is this diagnosis exists to be internalized *before* writing the next feature the same way, not just to patch this one.
