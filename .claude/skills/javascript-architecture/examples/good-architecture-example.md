# Good Architecture Example: Scroll-Driven Project Reveal

Walkthrough of a small but real feature — a section where scrolling drives a camera dolly past three floating project meshes, and hovering a project's DOM card highlights the corresponding mesh — built the way this skill recommends. Paired with [bad-architecture-example.md](bad-architecture-example.md), the same feature built badly, for direct contrast.

## The feature

- A `ProjectsScene` with three meshes, one per project
- Scroll position drives the camera position (via GSAP ScrollTrigger + Lenis)
- Hovering a project's DOM card (outside the canvas) highlights the matching mesh
- Clicking a card opens a case-study route/modal (out of scope here — the point is the hover-highlight coupling)

## The file layout

```
scenes/projects/
├── ProjectsScene.js
├── projectsAnimations.js
└── index.js
ui/
└── ProjectCardList.js
state/
└── uiStore.js
```

## `state/uiStore.js`

```js
import { createStore } from './createStore.js';

export const uiStore = createStore({
  hoveredProjectId: null,
});
```

One value, one owner (`ProjectCardList` is the only writer), read by `ProjectsScene`. This is exactly the "genuinely shared value" case the store pattern is for — see [docs/state-management.md](../docs/state-management.md).

## `ui/ProjectCardList.js` — DOM only, zero knowledge of Three.js

```js
import { uiStore } from '@state/uiStore.js';

export default class ProjectCardList {
  #cards = document.querySelectorAll('.project-card');

  mount() {
    this.#cards.forEach((card) => {
      card.addEventListener('pointerenter', () => {
        uiStore.set({ hoveredProjectId: card.dataset.projectId });
      });
      card.addEventListener('pointerleave', () => {
        uiStore.set({ hoveredProjectId: null });
      });
    });
  }
}
```

`ProjectCardList` doesn't know `ProjectsScene` exists. It writes one value to a store and is done. This is the decoupling payoff: this file is fully testable and reusable with zero 3D context, and deleting the 3D scene entirely wouldn't require touching this file.

## `scenes/projects/ProjectsScene.js` — reacts, doesn't reach

```js
import * as THREE from 'three';
import BaseScene from '@core/BaseScene.js';
import { uiStore } from '@state/uiStore.js';

export default class ProjectsScene extends BaseScene {
  #meshesById = new Map();
  #unsubscribes = [];

  async init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    const projects = await this.assets.load('projects:manifest');
    for (const project of projects) {
      const mesh = this.#buildProjectMesh(project);
      this.#meshesById.set(project.id, mesh);
      this.scene.add(mesh);
    }

    this.#unsubscribes.push(
      uiStore.select((s) => s.hoveredProjectId, (id) => this.#setHighlighted(id)),
    );
  }

  #buildProjectMesh(project) {
    const geometry = new THREE.IcosahedronGeometry(0.6, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(project.x, project.y, project.z);
    mesh.userData.projectId = project.id; // userData, never a bare custom property
    return mesh;
  }

  #setHighlighted(hoveredId) {
    for (const [id, mesh] of this.#meshesById) {
      mesh.material.emissiveIntensity = id === hoveredId ? 1 : 0;
    }
  }

  update() {}

  resize(width, height) {
    if (height === 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.#unsubscribes.forEach((unsub) => unsub());
    for (const mesh of this.#meshesById.values()) {
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
  }
}
```

`ProjectsScene` never imports `ProjectCardList` and never touches the DOM. It subscribes to the one store value it needs and reacts. Hover-to-highlight works with **zero direct coupling** between the DOM layer and the 3D layer — both depend only on `uiStore`.

## `scenes/projects/projectsAnimations.js` — structural only

```js
import gsap from 'gsap';

export function createProjectsScrollTimeline(scene) {
  return gsap.timeline({
    scrollTrigger: { trigger: '#projects-section', start: 'top top', end: '+=200%', scrub: true },
  }).to(scene.camera.position, { z: -10 });
  // duration is implicit via scrub; specific camera path/easing = animation-principles' call
}
```

## Why this is good architecture

1. **Dependency direction holds.** `ui/` never imports `three`. `scenes/` never imports `ui/`. Both depend downward on `state/`, which depends on nothing. Deleting either the UI layer or the 3D layer leaves the other compiling and functioning (minus the interaction, obviously) — a concrete test of real decoupling, not just an aspiration.
2. **One writer per state value.** `hoveredProjectId` is written only by `ProjectCardList`. Grepping `uiStore.set(` finds exactly one call site touching this key — no ambiguity about who's responsible when the value is wrong.
3. **Lifecycle contract respected.** `ProjectsScene` implements `init/update/resize/dispose` and nothing more — `SceneManager` (not shown here, but this scene slots into it unchanged) never needs a special case for this scene.
4. **`userData` used correctly** for the mesh-to-project mapping, not a bare custom property — keeps the pattern TypeScript-migration-friendly per [naming-conventions.md](../docs/naming-conventions.md) and matches threejs-website-reviewer's TypeScript-compatibility guidance.
5. **Disposal is traceable.** Because assets and subscriptions were acquired in exactly one place (`init()`), `dispose()` can release exactly what was acquired — see [threejs-app-architecture.md § AssetManager](../docs/threejs-app-architecture.md#assetmanager--the-ownership-structure-that-makes-disposal-possible) for why this ownership structure is a prerequisite for correct disposal, not disposal itself.
6. **No premature abstraction.** There's no `HighlightStrategy` interface, no generic `InteractionBus` — one store value covers the actual requirement. Compare to the over-engineered temptation in the bad example's sibling section.
