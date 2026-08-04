# Design Review Output Template

Use this structure for a structural design review of an existing page/component. For a targeted question, skip straight to the specific finding — see [SKILL.md § Output format](../SKILL.md#output-format).

---

## Scope

One or two sentences: what was reviewed, and at what depth (quick pass vs. full audit against the checklists). State any assumptions.

## Summary verdict

2–4 sentences. Direct assessment — what's structurally solid, what's the biggest systemic issue, roughly where this sits (e.g. "grid and spacing are consistent, but hierarchy is flat — nothing on the page reads as most important" or "strong visual polish, but several WCAG AA failures that block keyboard/AT users entirely"). No filler praise before this — lead with the assessment.

## Findings

Group by severity, Critical first. Within a severity, order by impact. Omit any severity section with nothing to report.

### Critical
*(blocks usage entirely for some users — keyboard traps, missing labels, contrast failures on primary content, broken layout)*

#### [Short title of the issue]
- **Where:** selector/section
- **What:** the specific structural pattern
- **Why it's an issue:** the mechanism — which users/scenarios are affected and how, not just "this is bad practice"
- **Severity:** per rubric below
- **Fix:**
  ```css
  /* corrected structure */
  ```

*(repeat per finding)*

### High
*(same structure — significant hierarchy/consistency/accessibility problems, not yet fully blocking)*

### Medium
*(same structure — real but bounded: inconsistent spacing scale usage, suboptimal breakpoint choices)*

### Low
*(same structure — minor deviations from the system with limited real-world impact)*

### Suggestion
*(same structure — can be more compact; optional polish)*

## What's done well

Specific, not generic — call out particular structural decisions that were good and why (e.g. "consistent use of the spacing scale across every section — no hardcoded pixel values found"). Skip this section rather than padding it if nothing stood out.

## Prioritized action list

3–5 items, highest impact first, each a concrete next step:

1. [Highest-impact fix]
2. ...
3. ...

## Out of scope for this review

Note anything observed that belongs to a sibling skill rather than absorbing it into this review — e.g. "the hero copy reads generically, but that's a `portfolio-storytelling` concern" or "the palette feels dated, but that's `creative-direction`."

---

### Severity rubric

| Severity | Meaning |
|---|---|
| **Critical** | Blocks task completion for some users entirely — keyboard trap, missing form label, sub-3:1 contrast on primary CTA, broken layout at a common viewport. |
| **High** | Significantly degrades usability/hierarchy for most users — flat hierarchy with no clear primary action, touch targets under 24px, hover-only interaction with no touch equivalent. |
| **Medium** | Real but bounded — inconsistent spacing-scale usage, a breakpoint that should be fluid instead, alignment inconsistency within a section. |
| **Low** | Minor deviation from the system, limited real-world impact — a slightly-off optical alignment, an unused scale step. |
| **Suggestion** | Stylistic or forward-looking improvement. Optional. |
