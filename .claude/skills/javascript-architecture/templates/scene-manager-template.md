# SceneManager / Experience Starter Template

Full starter code for a `SceneManager` implementing the lifecycle-contract pattern from [module-design.md](../docs/module-design.md#the-lifecycle-contract-pattern), plus the `BaseScene` contract every scene extends. Copy both files as-is into a new project; the only thing that changes per-project is which concrete scenes get registered in `App.js`.

## `core/BaseScene.js`

```js
// core/BaseScene.js
/**
 * The lifecycle contract every scene must implement. SceneManager depends on
 * this shape, never on a concrete scene class — see module-design.md's
 * dependency-inversion section for why that matters.
 */
export default class BaseScene {
  constructor({ renderer, assets, events } = {}) {
    if (new.target === BaseScene) {
      throw new Error('BaseScene is abstract — extend it, do not instantiate it directly.');
    }
    this.renderer = renderer;
    this.assets = assets;
    this.events = events;
    this.scene = null;   // set in init()
    this.camera = null;  // set in init()
    this._initialized = false;
  }

  /** Called once, first time this scene becomes active. Load/create everything here. */
  async init() {
    throw new Error(`${this.constructor.name}: init() must be implemented`);
  }

  /** Called every frame while active. @param {number} delta seconds since last frame */
  update(_delta) {
    throw new Error(`${this.constructor.name}: update() must be implemented`);
  }

  /** Called on container resize while active (and once after init). Optional to override. */
  resize(_width, _height) {}

  /** Called when this scene becomes active again after being backgrounded. Optional. */
  enter() {}

  /** Called just before another scene becomes active. Optional — pause audio/animation, etc. */
  exit() {}

  /** Called once, on app teardown or scene de-registration. Release everything acquired in init(). */
  dispose() {}
}
```

## `core/SceneManager.js`

```js
// core/SceneManager.js
export default class SceneManager {
  #scenes = new Map();
  #active = null;
  #activeName = null;
  #lastSize = { width: 0, height: 0 };

  constructor({ renderer, events } = {}) {
    this.renderer = renderer;
    this.events = events;
  }

  /** @param {string} name @param {import('./BaseScene.js').default} scene */
  register(name, scene) {
    if (this.#scenes.has(name)) {
      throw new Error(`SceneManager: a scene named "${name}" is already registered`);
    }
    this.#scenes.set(name, scene);
  }

  async activate(name) {
    const next = this.#scenes.get(name);
    if (!next) throw new Error(`SceneManager: no scene registered as "${name}"`);
    if (next === this.#active) return;

    const previousName = this.#activeName;
    this.#active?.exit?.();

    if (!next._initialized) {
      await next.init();
      next._initialized = true;
      next.resize(this.#lastSize.width, this.#lastSize.height);
    } else {
      next.enter?.();
    }

    this.#active = next;
    this.#activeName = name;
    this.events?.emit('scene:activated', { name, previous: previousName });
  }

  update(delta) {
    this.#active?.update(delta);
    if (this.#active) {
      this.renderer.render(this.#active.scene, this.#active.camera);
    }
  }

  resize(width, height) {
    this.#lastSize = { width, height };
    this.#active?.resize(width, height);
    this.events?.emit('scene:resized', { width, height });
  }

  get activeName() {
    return this.#activeName;
  }

  dispose() {
    for (const scene of this.#scenes.values()) {
      if (scene._initialized) scene.dispose();
    }
    this.#scenes.clear();
    this.#active = null;
  }
}
```

## Example concrete scene

```js
// scenes/landing/LandingScene.js
import * as THREE from 'three';
import BaseScene from '@core/BaseScene.js';
import { DEFAULT_FOV } from '@config/constants.js';

export default class LandingScene extends BaseScene {
  async init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(DEFAULT_FOV, 1, 0.1, 100);
    this.camera.position.z = 5;

    const geometry = new THREE.IcosahedronGeometry(1, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh, new THREE.DirectionalLight(0xffffff, 2));
  }

  update(delta) {
    this.mesh.rotation.y += delta * 0.3;
  }

  resize(width, height) {
    if (!this.camera || height === 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
```

## Wiring it up

```js
// App.js (excerpt)
import SceneManager from '@core/SceneManager.js';
import LandingScene from '@scenes/landing/LandingScene.js';

this.scenes = new SceneManager({ renderer: this.renderer, events: this.events });
this.scenes.register('landing', new LandingScene({ renderer: this.renderer, assets: this.assets, events: this.events }));
this.scenes.activate('landing');
```

## Adapting this template

- **Single-scene project:** skip `SceneManager` entirely per the threshold in [threejs-app-architecture.md](../docs/threejs-app-architecture.md#when-to-add-a-class-vs-keep-it-simple) — instantiate one scene directly in `App.js` and call its `update`/`resize` straight from `App`.
- **Scenes needing async data beyond assets** (e.g. a CMS fetch): keep that fetch inside the scene's own `init()`, not in `SceneManager` — the manager's job is orchestration, not knowing what any given scene needs to load.
- **Transition animation between scenes** (crossfade, camera move): belongs in `exit()`/`enter()` hooks or a dedicated transition module the manager awaits — the *timing/easing* of that transition is `animation-principles` territory; this template only provides the hook points.
