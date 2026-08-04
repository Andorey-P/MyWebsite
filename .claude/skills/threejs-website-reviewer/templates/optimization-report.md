# Optimization Report Template

Use for a focused performance pass (as opposed to a full review). Pair with [checklists/performance-checklist.md](../checklists/performance-checklist.md).

---

## Target

What was optimized (file/system/scene) and the starting complaint or goal (e.g. "drops to ~20fps on scroll on mobile", "audit before adding more scene content").

## Diagnosis

- **Bottleneck type:** GPU-bound / CPU-bound / load-time / memory growth — state which, and the evidence or reasoning (see [optimization-guide.md § Step 1](../docs/optimization-guide.md#step-1-figure-out-whether-youre-gpu-bound-or-cpu-bound))
- **Mechanism:** the specific cause, in engineering terms, not just a symptom restatement
- **Confirmed vs. inferred:** state plainly what was verified against actual profiler/`renderer.info` output vs. what's a well-reasoned inference from reading the code that would need profiling to confirm

## Changes, ranked by impact

For each change:

### [N]. [Change name]
- **Severity/impact:** Critical / High / Medium / Low
- **Before:**
  ```js
  // original code
  ```
- **After:**
  ```js
  // optimized code
  ```
- **Why this helps:** the mechanism — draw calls eliminated, allocations removed, bytes saved, etc.
- **Expected result:** qualitative/bounded claim, not an invented precise FPS number
- **Tradeoff, if any:** complexity added, flexibility lost, visual difference (if any)

*(repeat, highest impact first)*

## Explicitly not changed

List anything considered and deliberately left alone, with the reason — demonstrates the pass was diagnostic, not reflexive (see [premature optimization guidance](../SKILL.md#avoiding-premature-optimization)). E.g. "Per-mesh materials for the 12 hero props — object count is far below where instancing/merging pays for its complexity."

## Recommended verification

Concrete steps to confirm the improvement in the actual project (e.g. "re-check `renderer.info.render.calls` before/after", "profile on [specific device class] for 60s of continuous scroll", "compare Chrome Performance recordings before/after").
