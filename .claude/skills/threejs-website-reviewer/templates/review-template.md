# Review Output Template

Use this structure for a full file/component/site review. For a targeted question, skip straight to the relevant finding(s) — don't force this whole structure onto a scoped question (see [SKILL.md § Output format](../SKILL.md#output-format)).

---

## Scope

One or two sentences: what was reviewed (file(s)/system), and at what depth (quick pass vs. full audit). State any assumptions made about intent or unseen code.

## Summary verdict

2–4 sentences. Direct assessment — what's solid, what's the biggest risk, roughly where this sits (e.g. "solid architecture, but three real performance issues that will hurt on mobile" or "functionally fine, several memory leaks that will degrade over a session"). No filler praise before this — lead with the assessment.

## Findings

Group by severity, Critical first. Within a severity, order by impact. Omit any severity section with nothing to report.

### Critical

#### [Short title of the issue]
- **Where:** `path/to/file.js:line` (function/context)
- **What:** the specific code/pattern
- **Why it's an issue:** the technical mechanism — be specific, not "this is bad practice"
- **Expected improvement if fixed:** framed honestly; use ranges/qualitative framing over invented precise numbers you can't actually measure
- **Fix:**
  ```js
  // corrected code, real and runnable, matching the project's style
  ```
- **Alternatives** (if a genuine tradeoff exists): brief note on when you'd choose differently

*(repeat per finding)*

### High
*(same structure)*

### Medium
*(same structure)*

### Low
*(same structure)*

### Suggestion
*(same structure — can be more compact, one-liners are fine here)*

## What's done well

Specific, not generic — call out particular decisions that were good and briefly say why (e.g. "KTX2 pipeline correctly calls `detectSupport(renderer)` — a step that's commonly missed"). Skip this section rather than padding it if the review scope is narrow/nothing stood out.

## Prioritized action list

The single most important section for the user to walk away with. 3–5 items, highest impact first, each a concrete next step (not a restatement of a whole finding):

1. [Highest-impact fix]
2. ...
3. ...

## Open questions / things to verify

Anything you couldn't confirm without running the project (profiler output, actual device testing, runtime `renderer.info` values) — state what you'd check and why, rather than asserting a number you don't have.
