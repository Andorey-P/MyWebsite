# Event Emitter Starter Template

Drop-in starter file for the event emitter used throughout [event-systems.md](../docs/event-systems.md). This is the literal file to create in a new project; see [snippets/event-bus-pattern.md](../snippets/event-bus-pattern.md) for usage-pattern guidance (per-module emitter vs. global bus, namespacing) rather than the class itself.

## `events/EventEmitter.js`

```js
// events/EventEmitter.js
export default class EventEmitter {
  #listeners = new Map();

  /**
   * @param {string} event
   * @param {(...args: any[]) => void} handler
   * @returns {() => void} unsubscribe function
   */
  on(event, handler) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  /**
   * @param {string} event
   * @param {(...args: any[]) => void} handler
   * @returns {() => void} unsubscribe function
   */
  once(event, handler) {
    const wrapped = (...args) => {
      this.off(event, wrapped);
      handler(...args);
    };
    return this.on(event, wrapped);
  }

  off(event, handler) {
    this.#listeners.get(event)?.delete(handler);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach((handler) => {
      try {
        handler(...args);
      } catch (err) {
        // One listener throwing must not silently break every other listener
        // for the same event, or downstream events that would have fired next.
        console.error(`EventEmitter: listener for "${event}" threw`, err);
      }
    });
  }

  /** Remove every listener for a given event, or all listeners if no event given. */
  clear(event) {
    if (event) {
      this.#listeners.delete(event);
    } else {
      this.#listeners.clear();
    }
  }

  /** Number of active listeners for an event — useful for leak-hunting in dev. */
  listenerCount(event) {
    return this.#listeners.get(event)?.size ?? 0;
  }

  dispose() {
    this.clear();
  }
}
```

## Mixin form (when a class needs to extend something else too)

Vanilla JS has single inheritance — if a class already extends something (rare in this stack, but happens with certain loader/controller base classes), compose instead of extend:

```js
// events/emittable.js
export function emittable(instance) {
  const emitter = new EventEmitter();
  instance.on = emitter.on.bind(emitter);
  instance.once = emitter.once.bind(emitter);
  instance.off = emitter.off.bind(emitter);
  instance.emit = emitter.emit.bind(emitter);
  return instance;
}
```

```js
class SomeThirdPartyBase { /* ... */ }

class MyController extends SomeThirdPartyBase {
  constructor() {
    super();
    emittable(this);
  }
}
```

Prefer plain `extends EventEmitter` whenever there's no conflicting base class to extend — it's more discoverable (`instanceof EventEmitter` works, editor autocomplete shows `on`/`emit` directly on the class) than the mixin form. Reach for the mixin only when single inheritance is already spent.

## Minimal self-test (paste into a scratch file while developing, delete after)

```js
const emitter = new EventEmitter();
const unsub = emitter.on('test', (payload) => console.log('got', payload));
emitter.emit('test', { ok: true });
unsub();
emitter.emit('test', { ok: true }); // should log nothing — listener was removed
console.assert(emitter.listenerCount('test') === 0, 'unsubscribe failed');
```
