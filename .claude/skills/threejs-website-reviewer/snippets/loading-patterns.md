# Loading Patterns

Reference implementations for asset loading with real progress feedback, matched to the assumed pipeline (glTF + Draco + KTX2, Vite).

## Shared loader setup with real progress

```js
// core/AssetManager.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

export function createLoaders(renderer, onProgress, onLoad, onError) {
  const manager = new THREE.LoadingManager(onLoad, undefined, onError);
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    onProgress(itemsLoaded / itemsTotal);
  };

  const dracoLoader = new DRACOLoader(manager)
    .setDecoderPath('/draco/')
    .setDecoderConfig({ type: 'wasm' });

  const ktx2Loader = new KTX2Loader(manager)
    .setTranscoderPath('/basis/')
    .detectSupport(renderer);

  const gltfLoader = new GLTFLoader(manager)
    .setDRACOLoader(dracoLoader)
    .setKTX2Loader(ktx2Loader);

  return { manager, gltfLoader, dracoLoader, ktx2Loader };
}
```

All loaders share one `LoadingManager` so a single progress callback covers every asset type — critical for showing accurate combined progress rather than tracking each loader separately.

## Progress UI tied to real state, not a timer

```js
// animation/loadingUI.js
const progressEl = document.querySelector('[data-loading-progress]');
const loadingScreenEl = document.querySelector('[data-loading-screen]');

function onProgress(fraction) {
  progressEl.style.setProperty('--progress', fraction);
  progressEl.textContent = `${Math.round(fraction * 100)}%`;
}

function onLoad() {
  // Decode/transcode (Draco/KTX2 CPU work) has already resolved by the time
  // GLTFLoader's onLoad fires — no separate "preparing" stall needed for glTF specifically.
  // If compiling many distinct shader variants, pre-warm compilation before revealing:
  renderer.compile(scene, camera);

  gsap.to(loadingScreenEl, {
    autoAlpha: 0,
    duration: 0.6,
    onComplete: () => loadingScreenEl.remove(),
  });
}
```

`renderer.compile()` forces shader program compilation ahead of the first visible frame — worth doing during the loading screen for scenes with several distinct materials, to avoid a hitch on the first real frame after the loading screen dismisses.

## Deferred/lazy loading for below-the-fold content

```js
// Only start loading a section's assets when it's about to be needed,
// not blocking the initial critical-path load.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        loadSectionAssets(entry.target.dataset.section);
        sectionObserver.unobserve(entry.target);
      }
    }
  },
  { rootMargin: '200px' } // start loading before it's actually on screen
);

document.querySelectorAll('[data-section]').forEach((el) => sectionObserver.observe(el));
```

Combine with dynamic `import()` for the section's own module code, not just its assets, if the section's JS itself is non-trivial:

```js
async function loadSection(name) {
  const { initSection } = await import(`../scenes/${name}Scene.js`);
  return initSection();
}
```

## Handling load failure

```js
function onError(url) {
  console.error(`Failed to load: ${url}`);
  loadingScreenEl.dataset.state = 'error';
  errorMessageEl.textContent = 'Something failed to load. Please refresh.';
  // Optionally: retry logic with backoff for transient network failures,
  // but don't retry indefinitely — surface a clear failure state after a bounded number of attempts.
}
```

An infinite spinner on failure is a common, easily-avoided bad experience — always pair a `LoadingManager`'s `onLoad`/`onProgress` with its error callback.

## Preloading critical assets before app boot (optional, for very lightweight scenes)

```js
// main.js
const { manager, gltfLoader } = createLoaders(renderer, updateProgress, startApp, showError);
gltfLoader.load('/models/hero.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

For heavier scenes, prefer showing the page shell/UI immediately and loading 3D content in the background with its own progress state, rather than blocking all interactivity on the full 3D payload — see [asset-pipeline.md § Loading UX](../docs/asset-pipeline.md#loading-ux-see-also-snippetsloading-patternsmd).
