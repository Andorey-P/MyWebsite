# Bug / Leak Report Template

Use when reporting a single, specific defect (a memory leak, a race condition, a rendering bug) rather than a broad review.

---

## Issue

One sentence: what's wrong and where.

## Location

`path/to/file.js:line` — function/context.

## Severity

Critical / High / Medium / Low (per the rubric in [SKILL.md](../SKILL.md#severity-rubric)).

## Reproduction / trigger condition

What causes it — a specific action, a specific scene state, or "always, on every X" if unconditional. For a leak: what grows, under what repeated action (e.g. "each time the user navigates to this section, `renderer.info.memory.textures` increases by N and never decreases").

## Root cause

The actual mechanism — trace it, don't just describe the symptom. E.g.: "`loadSectionAssets()` creates a new `THREE.TextureLoader` and loads textures into new `Mesh` objects each time the section is entered, but the previous section's meshes are removed from the scene via `scene.remove()` without calling `.geometry.dispose()`/`.material.dispose()`/texture `.dispose()` first — the GPU resources are orphaned, not freed."

## Fix

```js
// corrected code
```

Explain briefly why this specific fix addresses the root cause (not just suppresses the symptom).

## Verification

How to confirm the fix worked — e.g. "Navigate between sections 10x, watch `renderer.info.memory.textures` in a logged/dashboarded value — should return to baseline after each navigation away, not climb monotonically."

## Related risk

Note if the same pattern likely exists elsewhere in the codebase (e.g. "check other section modules using the same load-on-enter pattern") — a single fix is less valuable if the same bug is about to recur three more times.
