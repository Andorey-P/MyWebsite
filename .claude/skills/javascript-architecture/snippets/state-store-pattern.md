# Snippet: Minimal Observable State Store

Copy-paste reference implementation of the store pattern explained in [docs/state-management.md](../docs/state-management.md). This file is the polished, ready-to-use version; the doc explains the reasoning for when to use it and what NOT to put in it.

```js
// state/createStore.js
export function createStore(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();

  function get() {
    return state;
  }

  /** @param {object | ((state: object) => object)} patch */
  function set(patch) {
    const partial = typeof patch === 'function' ? patch(state) : patch;
    const next = { ...state, ...partial };
    state = next;
    listeners.forEach((listener) => listener(state));
  }

  /**
   * Subscribe to every state change.
   * @param {(state: object) => void} listener
   * @returns {() => void} unsubscribe
   */
  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  /**
   * Subscribe to one derived value, only notified when that value actually changes
   * (reference/primitive inequality) — avoids re-running a handler on unrelated
   * state changes elsewhere in the same store.
   * @template T
   * @param {(state: object) => T} selector
   * @param {(value: T, previous: T) => void} listener
   * @returns {() => void} unsubscribe
   */
  function select(selector, listener) {
    let current = selector(state);
    return subscribe((next) => {
      const value = selector(next);
      if (value !== current) {
        const previous = current;
        current = value;
        listener(value, previous);
      }
    });
  }

  return { get, set, subscribe, select };
}
```

## Persisted variant

```js
// state/createPersistedStore.js
import { createStore } from './createStore.js';

export function createPersistedStore(key, initialState) {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(key) ?? 'null');
  } catch {
    saved = null; // corrupted/old-shape localStorage value — fall back to defaults, don't throw
  }

  const store = createStore({ ...initialState, ...saved });
  store.subscribe((state) => {
    localStorage.setItem(key, JSON.stringify(state));
  });
  return store;
}
```

## Usage

```js
// state/uiStore.js
import { createStore } from './createStore.js';

export const uiStore = createStore({
  loadingProgress: 0,
  activeSectionIndex: 0,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
});
```

```js
// any consumer
import { uiStore } from '@state/uiStore.js';

const unsubscribe = uiStore.select(
  (s) => s.activeSectionIndex,
  (index) => console.log('section changed to', index),
);

// on teardown:
unsubscribe();
```

For the reasoning on single-store-vs-multiple, what belongs in a store vs. a manager instance vs. an event, and per-frame-value pitfalls, see [docs/state-management.md](../docs/state-management.md) in full — this snippet intentionally carries no commentary so it's fast to paste.
