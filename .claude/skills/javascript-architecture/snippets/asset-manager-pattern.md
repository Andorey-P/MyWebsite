# Snippet: AssetManager with LoadingManager Integration

Architecture-focused reference implementation — the ownership/caching structure that makes centralized loading (and, downstream, correct disposal) possible. This is not a disposal guide: for the actual `.dispose()` mechanics on geometries/materials/textures, see threejs-website-reviewer's [disposal-patterns.md](../../threejs-website-reviewer/snippets/disposal-patterns.md). What this file shows is the acquire/release ownership structure that makes that disposal traceable in the first place.

```js
// core/AssetManager.js
import { LoadingManager, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import EventEmitter from '@events/EventEmitter.js';
import { assetManifest } from '@config/constants.js';

export default class AssetManager extends EventEmitter {
  #cache = new Map();        // url/key -> loaded resource
  #refCounts = new Map();    // resource -> number of active acquirers
  #loadingManager = new LoadingManager();
  #gltfLoader;
  #textureLoader;

  constructor({ renderer } = {}) {
    super();

    this.#loadingManager.onProgress = (_url, loaded, total) => {
      this.emit('assets:progress', { loaded, total });
    };
    this.#loadingManager.onLoad = () => this.emit('assets:complete');
    this.#loadingManager.onError = (url) => this.emit('assets:error', { url });

    const draco = new DRACOLoader(this.#loadingManager).setDecoderPath('/draco/');
    const ktx2 = renderer
      ? new KTX2Loader(this.#loadingManager).setTranscoderPath('/basis/').detectSupport(renderer)
      : null;

    this.#gltfLoader = new GLTFLoader(this.#loadingManager).setDRACOLoader(draco);
    if (ktx2) this.#gltfLoader.setKTX2Loader(ktx2);

    this.#textureLoader = new TextureLoader(this.#loadingManager);
  }

  /**
   * Load (or return the cached instance of) an asset by manifest key.
   * Centralizing loading here means no scene ever constructs its own loader —
   * see docs/threejs-app-architecture.md#assetmanager for why that matters.
   * @param {string} key a dotted key into `assetManifest`, e.g. 'models.hero'
   */
  async load(key) {
    if (this.#cache.has(key)) {
      return this.#acquire(this.#cache.get(key));
    }

    const url = this.#resolveManifestUrl(key);
    const isGltf = /\.(gltf|glb)$/i.test(url);
    const resource = isGltf
      ? await this.#gltfLoader.loadAsync(url)
      : await this.#textureLoader.loadAsync(url);

    this.#cache.set(key, resource);
    return this.#acquire(resource);
  }

  /** Called by whoever loaded the resource when they're done with it (e.g. scene teardown). */
  release(resource) {
    const count = (this.#refCounts.get(resource) ?? 1) - 1;
    if (count <= 0) {
      this.#refCounts.delete(resource);
      // Actual GPU disposal (geometry/material/texture .dispose()) happens here —
      // see threejs-website-reviewer/snippets/disposal-patterns.md for that routine.
      // AssetManager's job stops at "nobody holds a reference anymore, safe to dispose."
    } else {
      this.#refCounts.set(resource, count);
    }
  }

  #acquire(resource) {
    this.#refCounts.set(resource, (this.#refCounts.get(resource) ?? 0) + 1);
    return resource;
  }

  #resolveManifestUrl(key) {
    const url = key.split('.').reduce((obj, part) => obj?.[part], assetManifest);
    if (!url) throw new Error(`AssetManager: no manifest entry for "${key}"`);
    return url;
  }

  dispose() {
    this.#cache.clear();
    this.#refCounts.clear();
    this.clear(); // EventEmitter cleanup
  }
}
```

## What this structure buys you

- **One loader configuration site.** Draco/KTX2 decoder paths are set once, here — not duplicated in every scene that happens to load a `.glb`. threejs-website-reviewer flags duplicated loader setup as a maintainability finding when auditing existing code; this is how you avoid ever producing that finding in the first place.
- **Cache by manifest key, not ad hoc URL strings scattered through scene files.** Two scenes referencing `'models.hero'` get the same loaded instance, not two independent downloads.
- **Ref-counted acquire/release is the ownership ledger disposal needs.** A scene's `dispose()` calls `assets.release(resource)` for exactly what it acquired in `init()`; `AssetManager` only actually disposes GPU memory once the last holder released it. Without this ledger, "is anything else still using this texture" is a question you can only answer by reading every scene file — with it, it's a `Map` lookup.
- **Progress/complete/error surface as events**, so a loading-screen UI component can subscribe without `AssetManager` knowing a loading screen exists — see [docs/event-systems.md](../docs/event-systems.md).

## When ref-counting is unnecessary

For a project where nothing is shared across independently-torn-down scenes (a single-scene site, or a multi-scene site where each scene loads its own unique assets), skip `#refCounts` entirely — a plain cache plus a full-subtree dispose on scene teardown ([threejs-website-reviewer's pattern](../../threejs-website-reviewer/snippets/disposal-patterns.md#full-scene-subtree-teardown)) is sufficient and this adds complexity with no current payer. Add ref-counting when sharing across independently-torn-down scenes actually starts happening, not preemptively.
