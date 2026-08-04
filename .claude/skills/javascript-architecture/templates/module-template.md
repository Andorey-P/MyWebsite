# Feature Module Template: A Portfolio Section

A template for a well-formed "section" module — the unit of work when adding one new portfolio section (e.g. a "Projects" showcase combining a 3D scene, DOM UI, and scroll-triggered animation). Use this as the checklist/skeleton whenever a new section is added, so every section ends up structured the same way instead of each one inventing its own layout.

## Folder layout for one section

```
scenes/projects/
├── ProjectsScene.js         # the THREE.Scene + camera + section-local objects
├── projects.vert.glsl       # only if the section has a custom shader
├── projects.frag.glsl
├── projectsAnimations.js    # GSAP/ScrollTrigger timeline setup for this section
└── index.js                 # barrel: re-exports what App.js/SceneManager needs
```

Corresponding DOM-facing piece, if the section has UI beyond the canvas (project cards, a filter control):

```
ui/
└── ProjectsSectionUI.js     # DOM controller — no THREE import, reacts to state/events only
```

A section that's genuinely simple (no custom shader, no dedicated UI beyond the canvas) collapses to just `ProjectsScene.js` — don't create empty stub files for pieces a section doesn't need.

## `ProjectsScene.js` skeleton

```js
// scenes/projects/ProjectsScene.js
import * as THREE from 'three';
import BaseScene from '@core/BaseScene.js';
import { uiStore } from '@state/uiStore.js';

export default class ProjectsScene extends BaseScene {
  #unsubscribes = [];

  async init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    // Load section-specific assets through the shared AssetManager, never a
    // one-off `new GLTFLoader()` local to this file — see docs/threejs-app-architecture.md#assetmanager
    const gltf = await this.assets.load('projects:showcaseModel');
    this.scene.add(gltf.scene);

    // React to cross-module state without importing the module that owns it
    this.#unsubscribes.push(
      uiStore.select((s) => s.activeSectionIndex, (index) => this.onSectionChange(index)),
    );
  }

  onSectionChange(index) {
    // e.g. toggle idle animation based on whether this section is in view
  }

  update(delta) {
    // per-frame section logic
  }

  resize(width, height) {
    if (height === 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.#unsubscribes.forEach((unsub) => unsub());
    // geometry/material/texture disposal — see threejs-website-reviewer/snippets/disposal-patterns.md
  }
}
```

## `projectsAnimations.js` skeleton

```js
// scenes/projects/projectsAnimations.js
// Structural wiring only — timing/easing values are animation-principles' call.
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

/** @param {ProjectsScene} scene */
export function createProjectsTimeline(scene) {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#projects-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  timeline.to(scene.camera.position, { z: 2 /* duration/ease: animation-principles */ });

  return timeline; // caller (index.js) tracks this for teardown
}
```

## `index.js` barrel

```js
// scenes/projects/index.js
export { default as ProjectsScene } from './ProjectsScene.js';
export { createProjectsTimeline } from './projectsAnimations.js';
```

A barrel file per section keeps `App.js`'s imports at "one line per section" and makes it obvious what a section exposes to the rest of the app — everything else inside the folder is that section's private implementation detail.

## `ui/ProjectsSectionUI.js` skeleton (only if the section needs DOM UI)

```js
// ui/ProjectsSectionUI.js — no `import * as THREE` here, ever.
import { uiStore } from '@state/uiStore.js';

export default class ProjectsSectionUI {
  #root = document.querySelector('#projects-section');
  #unsubscribe = null;

  mount() {
    this.#unsubscribe = uiStore.select(
      (s) => s.activeSectionIndex,
      (index) => this.#root.classList.toggle('is-active', index === PROJECTS_SECTION_INDEX),
    );
  }

  unmount() {
    this.#unsubscribe?.();
  }
}
```

## New-section checklist

- [ ] Scene class extends `BaseScene` and implements the lifecycle contract — nothing more, nothing less
- [ ] Assets loaded through the shared `AssetManager`, not a local loader instance
- [ ] Any DOM UI lives in `ui/`, imports no `three` module, reacts to `state`/`events` rather than being called into directly by the scene
- [ ] Animation setup file contains structural wiring only — flag any hardcoded duration/easing choice as a placeholder for `animation-principles` review, don't treat it as final
- [ ] `dispose()` unsubscribes every store/event subscription created in `init()`
- [ ] Section registered in `App.js`/`SceneManager` in one line via the barrel export — no scattered imports of internal section files from outside the folder
