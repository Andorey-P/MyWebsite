# Calibration Example: Poor Review Output (Anti-Pattern)

This is what to avoid. Each snippet below is a realistic-sounding but low-value finding, annotated with why it fails the bar this Skill sets. If a draft review reads like this, revise it before sending.

---

### ❌ Vague, no mechanism

> "This code could be optimized for better performance."

**Why this fails:** No location, no mechanism, no severity, nothing actionable. This is the single most common failure mode of a generic AI code review — restate what's wrong specifically, or don't say it.

---

### ❌ Asserts a fabricated precise number

> "Fixing this will improve your FPS from 24 to 60."

**Why this fails: **No profiler was run; this number is invented, not measured or reasoned from a stated mechanism. State a qualitative, honestly-bounded claim instead ("should meaningfully reduce frame time — worth confirming with a Performance recording before/after") per [SKILL.md's optimization philosophy](../SKILL.md#optimization-philosophy).

---

### ❌ Flags something not actually on a hot path

> "**Medium severity:** You're creating a new `Vector3` in your `initScene()` function. This runs every frame and causes GC pressure."

**Why this fails:** `initScene()` runs once, at startup — the finding is factually wrong about the code's execution frequency, which is the exact thing a reviewer must verify (see [SKILL.md § Review methodology, step 5](../SKILL.md#review-methodology)). Flagging setup-time allocation as a per-frame GC problem is the kind of error that destroys trust in the rest of the review.

---

### ❌ Generic best-practice dump disconnected from the actual code

> "Best practices for Three.js: always dispose your geometries, use InstancedMesh for repeated objects, compress your textures, cap your pixel ratio, use requestAnimationFrame..."

**Why this fails:** This is a checklist recitation, not a review of the code in front of you. None of it is tied to what the file actually does or doesn't do. It's not wrong, but it's not a review — it provides no signal about which of these actually apply here, which is the entire value a senior reviewer adds over a generic reference doc.

---

### ❌ Severity inflation

> "**Critical:** Your variable names could be more descriptive (e.g. `m` instead of `mesh`)."

**Why this fails:** Naming is, at most, a Suggestion-level finding (see the [severity rubric](../SKILL.md#severity-rubric)). Calling it Critical either signals the reviewer doesn't understand the rubric, or is padding the finding count with low-value items dressed up as urgent. Both erode the credibility of the findings that are actually Critical.

---

### ❌ Solution without acknowledging a real tradeoff

> "Just merge all your geometries into one mesh for better performance."

**Why this fails:** Presented as universally correct with no acknowledgment that merging collapses per-object transforms/toggling/culling granularity (see [optimization-guide.md](../docs/optimization-guide.md#draw-calls)). A senior reviewer states the tradeoff so the user can make an informed call, especially when the "obvious" fix has a real cost.

---

### ❌ Praise with no substance, used as filler

> "Great job overall! Your code is really well written. Now here are a few things to fix..."

**Why this fails:** Generic opener that delays the substance and says nothing specific. If something is genuinely well done, name it specifically (see [examples/excellent-review.md](excellent-review.md)'s closing note, and [SKILL.md § Tone](../SKILL.md#tone)); otherwise skip straight to the verdict.
