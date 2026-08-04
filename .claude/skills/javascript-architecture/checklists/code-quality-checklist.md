# Code Quality Checklist

Structural/maintainability code quality — SRP adherence, sizing thresholds, consistency. This is distinct from threejs-website-reviewer's checklists, which focus on runtime correctness/performance/leaks in code that already exists; this one is about whether new code is shaped well as it's written. Use per-file or per-PR, not just at project setup.

## File & class sizing

- [ ] No file exceeds ~250-300 lines while handling more than one concern (length alone with one cohesive concern is fine — see [module-design.md § when to split](../docs/module-design.md#when-to-split-a-file-or-class))
- [ ] No method reaches into an unrelated concern to do its job (a scene's `update()` touching `document.querySelector` directly instead of emitting for a `ui/` controller to react to)
- [ ] Extraction happened on the second occurrence of non-trivial duplicated logic, not deferred to the third
- [ ] No function split purely to reduce line count when the pieces have exactly one caller and no independent reuse value

## Responsibility & coupling

- [ ] Each class can be described in one sentence without "and"
- [ ] `core/` classes contain no references to concrete scene/section names or DOM selectors specific to one section
- [ ] No direct reach-into-internals across module boundaries (`otherScene.camera.position.set(...)` from outside the scene that owns that camera)
- [ ] New abstractions (interfaces, factories, DI-style injection) are justified by an actual current need, not "best practice" in the abstract — see the SOLID application table in [module-design.md](../docs/module-design.md#solid-applied-pragmatically--not-dogmatically)

## State & side effects

- [ ] No module-level mutable `let` used as de facto global state (`let activeScene = null` at module scope, mutated from multiple files) — owned by a class instance instead
- [ ] Functions in `utils/` are pure (no reads/writes of module-level state, no DOM access) — if a "util" needs the DOM or mutable state, it belongs elsewhere
- [ ] No state value has two independent writers (check: grep every `.set(` / assignment to a given store key — should trace to one owning module)

## Error handling & robustness

- [ ] Async asset loads have an explicit failure path (`.catch`/try-catch), not a silently-hanging promise
- [ ] A class's public methods fail loudly (throw or reject) rather than silently no-op-ing on invalid input, unless silent-no-op is a deliberate, commented design choice (e.g. `dispose()` called twice should be safe, not throw)
- [ ] Base/abstract-style classes (`BaseScene`) throw clearly on unimplemented required methods rather than silently doing nothing

## Consistency

- [ ] Naming follows [naming-conventions.md](../docs/naming-conventions.md) throughout the file/module being added — check acronym casing and boolean-prefix rules specifically, they're the two most commonly inconsistent in practice
- [ ] Import style is consistent (path aliases used, not a mix of `@core/...` in some files and `../../core/...` in others)
- [ ] JSDoc present on any function whose parameter types aren't obvious from its name/default value

## Dead weight

- [ ] No commented-out code left in place "in case it's needed later" — delete it, git history has it
- [ ] No unused imports, unused constructor parameters, or unreferenced exports left after a refactor
- [ ] No speculative configuration options/parameters added for a use case that doesn't exist yet ("just in case someone needs a second renderer")

## Before calling a module done

1. Could a second engineer explain what this module owns from its filename and public method names alone, without reading the implementation?
2. If this module were deleted, is the blast radius (files that need to change) limited to its direct importers — or does deleting it require hunting for scattered references because something reached into its internals?
3. Once merged, hand off runtime concerns (leak/perf review) to `threejs-website-reviewer` rather than trying to self-audit for both structure and runtime correctness in the same pass.
