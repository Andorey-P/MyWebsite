# Snippet: Event Bus Usage Pattern

For the `EventEmitter` class itself, see [templates/event-emitter-template.md](../templates/event-emitter-template.md) — that's the literal file to create. This snippet covers the **usage pattern**: per-module emitter vs. global bus, and the namespacing discipline that keeps either approach from turning into event soup. Full reasoning in [docs/event-systems.md](../docs/event-systems.md).

## Pattern A — per-module emitter (default choice)

A manager class extends `EventEmitter` and emits its own lifecycle events. Consumers hold a direct reference to the manager instance they already depend on:

```js
// core/AssetManager.js
import EventEmitter from '@events/EventEmitter.js';

export default class AssetManager extends EventEmitter {
  async load(key) {
    this.emit('assets:loadStart', { key });
    try {
      const result = await this.#fetchAndParse(key);
      this.emit('assets:loaded', { key, result });
      return result;
    } catch (error) {
      this.emit('assets:error', { key, error });
      throw error;
    }
  }
}
```

```js
// consumer — already holds `assets` as a constructor dependency, no new import needed
class ProjectsScene extends BaseScene {
  async init() {
    this.assets.on('assets:error', (e) => this.#handleLoadFailure(e));
    const model = await this.assets.load('projects:showcaseModel');
  }
}
```

Traceable by import graph: every consumer of `AssetManager`'s events necessarily already imports or receives `assets`, so `grep "assets.on("` finds the entire listener graph.

## Pattern B — global bus (only for ownerless, cross-cutting signals)

Instantiated once in `App.js`, passed down as a constructor dependency — never imported as a module-level singleton:

```js
// App.js
import EventEmitter from '@events/EventEmitter.js';

const appEvents = new EventEmitter();

this.scenes = new SceneManager({ renderer: this.renderer, events: appEvents });
this.scroll = new ScrollController({ events: appEvents });
```

```js
// ui/MotionPreferenceToggle.js
export default class MotionPreferenceToggle {
  constructor({ events }) {
    this.events = events;
  }

  handleToggle(reduced) {
    this.events.emit('app:reducedMotionChanged', reduced);
  }
}
```

```js
// scenes/landing/LandingScene.js — reacts without knowing who toggled it
this.events.on('app:reducedMotionChanged', (reduced) => {
  this.idleAnimationEnabled = !reduced;
});
```

Passing `appEvents` as a constructor argument (not `import { appEvents } from './App.js'`) keeps every module's dependencies visible in its own constructor signature — a module-level singleton import hides that dependency and makes the module harder to reason about or reuse in isolation.

## Namespacing discipline (applies to both patterns)

```js
// events/events.js
export const EVENTS = Object.freeze({
  ASSETS_LOAD_START: 'assets:loadStart',
  ASSETS_LOADED: 'assets:loaded',
  ASSETS_ERROR: 'assets:error',
  SCENE_ACTIVATED: 'scene:activated',
  APP_REDUCED_MOTION_CHANGED: 'app:reducedMotionChanged',
});
```

Import from `EVENTS`, never type the string twice:

```js
import { EVENTS } from '@events/events.js';

this.emit(EVENTS.ASSETS_LOADED, { key, result });
// ...
assets.on(EVENTS.ASSETS_LOADED, handler);
```

## Choosing between A and B — quick test

Ask: **does this event have one natural owner module?** If yes (asset loading events naturally belong to `AssetManager`, scene-transition events to `SceneManager`), use Pattern A. If the answer requires picking an arbitrary owner ("I guess `reducedMotionChanged` could live on... the renderer? the UI controller?"), that's the signal it belongs on the shared global bus instead — forcing it onto an arbitrary single-module emitter just relocates the arbitrariness without fixing it.
