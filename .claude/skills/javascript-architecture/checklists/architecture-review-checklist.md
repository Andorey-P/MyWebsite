# Architecture Setup Checklist

Use this **before or while building** a new project/module — "did I set this up right," not "does this existing code have bugs." For auditing code that already exists and shipped, use threejs-website-reviewer's [review-checklist.md](../../threejs-website-reviewer/checklists/review-checklist.md) instead; that one is evaluative (finds leaks, perf issues, bugs in working code), this one is generative (confirms the structural decisions were made deliberately before/while writing).

Work top to bottom for a new project scaffold. For a single new module/feature added to an existing project, jump to the sections that apply (usually 3, 4, 7).

## 1. Project structure

- [ ] Folder layout matches (or has a stated, deliberate reason to deviate from) [project-structure.md](../docs/project-structure.md)
- [ ] `public/` used only for runtime-URL-fetched assets (decoders, manifests); everything else imported through `src/`
- [ ] Path aliases configured in both `vite.config.js` and `jsconfig.json`/`tsconfig.json` — not just one
- [ ] Env vars read in exactly one `config/constants.js`-style module, all client-read vars prefixed `VITE_`
- [ ] No folder created speculatively for content that doesn't exist yet (empty `scenes/second/` with nothing in it)

## 2. Module boundaries & dependency direction

- [ ] Import direction is strictly `config/utils → core → scenes/materials → animation/ui → App.js → main.js`, no reverse imports (see [module-design.md § dependency direction](../docs/module-design.md#dependency-direction))
- [ ] `core/` modules contain zero references to concrete scene/section names
- [ ] No sibling `scenes/` files import each other directly — shared logic lives in `utils/`/`materials/`, cross-scene coordination goes through `SceneManager` or events
- [ ] Every class has a single, statable reason to change (SRP gut-check: can you describe the class in one sentence without "and")
- [ ] No class constructor takes more than ~4-5 unrelated parameters without a config-object grouping

## 3. State & events

- [ ] UI state, 3D scene state, and animation state each live with their stated owner — not duplicated across a store and the owning class (see [state-management.md](../docs/state-management.md))
- [ ] A store was introduced only because 2+ unrelated modules need to read the same value — not by default
- [ ] Events used only for one-to-many/loosely-coupled signals, not as a substitute for a direct method call with one clear caller (see [event-systems.md § when not to use an event](../docs/event-systems.md#when-not-to-use-an-event))
- [ ] Every event name exists as a constant in a central registry (`events/events.js`), not typed as a raw string at each call site
- [ ] No dynamically-constructed event names (`` `scene:${name}:ready` ``)

## 4. Three.js app composition

- [ ] Exactly one `requestAnimationFrame`/`setAnimationLoop` call site in the app (see [threejs-app-architecture.md § Clock](../docs/threejs-app-architecture.md#clock--the-one-loop))
- [ ] Lenis `raf()` (if used) is driven from that same tick, `autoRaf: false` explicitly set
- [ ] `App.js` (or equivalent composition root) contains wiring only — no rendering/loading/animation logic inline
- [ ] Renderer setup (color space, tone mapping, DPR cap) lives in exactly one wrapper class, not repeated at every renderer-touching call site
- [ ] Scene classes conform to the same lifecycle contract (`init`/`update`/`resize`/`dispose`) so `SceneManager` depends on the contract, not concrete classes
- [ ] Project complexity matches the pattern chosen — a single-scene hero isn't carrying a full `SceneManager`/event-bus/store stack it doesn't need yet (see [threejs-app-architecture.md § when to add a class](../docs/threejs-app-architecture.md#when-to-add-a-class-vs-keep-it-simple))

## 5. Naming

- [ ] File names match their default export (`PascalCase.js` for classes, `camelCase.js` for utilities/stores)
- [ ] No stacked class-name suffixes (`XManagerServiceHandler`)
- [ ] Boolean-returning functions use `is`/`has`/`should`
- [ ] Constant primitives are `SCREAMING_SNAKE_CASE`; constant objects are `camelCase`
- [ ] Acronyms cased as ordinary words (`Gltf`, not `GLTF`) consistently across the codebase
- [ ] New private class state uses `#field`, not `_underscore`

## 6. Build & environment

- [ ] `vite-plugin-glsl` (or equivalent) configured if shaders are imported as `.glsl`/`.vert`/`.frag` files rather than inline strings
- [ ] `.env`/`.env.production` used for the one or two values that actually differ by environment (asset CDN base, base path) — no unused environment-tooling scaffolding
- [ ] `base` in `vite.config.js` correctly set for the deploy target (subpath deploys like GitHub Pages are a common miss)

## 7. TypeScript-readiness (even if not adopting TS now)

- [ ] No ad hoc properties added directly to Three.js instances (`mesh.customFlag = true`) — use `userData`
- [ ] JSDoc types present on public class methods and store/emitter generics where the shape isn't obvious from the name
- [ ] Config objects passed to constructors rather than long positional-argument lists

## Close with

State explicitly which items were skipped and why (usually: project too small for that layer yet — cite the relevant threshold from `docs/`, don't skip silently).
