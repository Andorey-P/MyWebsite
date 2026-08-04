# New Project Scaffold Template

Literal folder tree and starter file stubs for bootstrapping a new Vite + Three.js + GSAP portfolio project from scratch, or restructuring an existing one onto this pattern. Copy the tree, then fill files in the order listed under [Build order](#build-order) — don't write all six `core/` files before you have a scene that needs them.

## Folder tree to create

```
project-root/
├── public/
│   ├── draco/
│   └── basis/
├── src/
│   ├── main.js
│   ├── App.js
│   ├── core/
│   │   ├── Renderer.js
│   │   ├── Clock.js
│   │   ├── Resizer.js
│   │   ├── AssetManager.js
│   │   └── SceneManager.js
│   ├── scenes/
│   │   └── landing/
│   │       └── LandingScene.js
│   ├── state/
│   │   └── uiStore.js
│   ├── events/
│   │   ├── EventEmitter.js
│   │   └── events.js
│   ├── animation/
│   │   └── ScrollController.js
│   ├── ui/
│   ├── utils/
│   ├── config/
│   │   └── constants.js
│   └── styles/
├── vite.config.js
├── jsconfig.json
├── .env
├── .env.production
├── index.html
└── package.json
```

See [docs/project-structure.md](../docs/project-structure.md) for the full rationale on each folder — this file is the copy-paste starting point, that one is the reasoning.

## `main.js` stub

```js
// src/main.js — boot sequence only. No rendering/loading/animation logic belongs here.
import App from './App.js';

const canvas = document.querySelector('#app-canvas');
const app = new App(canvas);

app.start();

// Optional: expose for debugging in dev only
if (import.meta.env.DEV) {
  window.__app = app;
}
```

## `config/constants.js` stub

```js
// src/config/constants.js
export const MAX_DPR = 2;
export const DEFAULT_FOV = 45;
export const IS_PRODUCTION = import.meta.env.PROD;
export const ASSET_BASE_URL = import.meta.env.VITE_ASSET_CDN_URL ?? '/';

export const assetManifest = Object.freeze({
  models: {
    hero: `${ASSET_BASE_URL}models/hero.glb`,
  },
});
```

## `index.html` stub

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio</title>
</head>
<body>
  <!-- Fallback/semantic content for accessibility & SEO alongside the canvas —
       see threejs-website-reviewer/docs/architecture.md#accessibility--seo-implications-of-architecture -->
  <main>
    <h1 class="visually-hidden">Your Name — Creative Developer</h1>
    <canvas id="app-canvas"></canvas>
  </main>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

## `package.json` — minimum dependency set

```json
{
  "name": "portfolio",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "vite-plugin-glsl": "^1.3.0"
  },
  "dependencies": {
    "three": "^0.170.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.16"
  }
}
```

## Build order

Don't scaffold all files at once and leave most of them empty. Build in this order so every file exists because something needs it:

1. `vite.config.js` + `jsconfig.json` (aliases, glsl plugin) — see [project-structure.md § vite.config.js conventions](../docs/project-structure.md#viteconfigjs-conventions)
2. `core/Renderer.js`, `core/Clock.js` + `main.js`/`App.js` wiring a bare render loop with nothing in the scene yet — confirm the canvas clears to a color
3. One `scenes/` file with a spinning cube, registered directly (no `SceneManager` yet if this is a single-scene project — see the threshold in [threejs-app-architecture.md](../docs/threejs-app-architecture.md#when-to-add-a-class-vs-keep-it-simple))
4. `core/AssetManager.js` once there's an actual asset to load
5. `core/Resizer.js` once you're tired of the canvas not matching its container on resize
6. `core/SceneManager.js` + `events/` + `state/` only once a second scene or cross-module signal actually appears
7. `animation/ScrollController.js` once scroll needs to drive anything in the 3D scene

This order matches the size thresholds throughout `docs/` — the scaffold above is the *ceiling*, not the day-one starting point for every project.
