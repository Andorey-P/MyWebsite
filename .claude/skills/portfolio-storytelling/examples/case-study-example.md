# Calibration Example: Full Case Study, Annotated

One complete case study, written out in full, following [../templates/case-study-template.md](../templates/case-study-template.md) and the anatomy in [../docs/project-case-study-structure.md](../docs/project-case-study-structure.md). Same project referenced in [excellent-portfolio-narrative.md](excellent-portfolio-narrative.md) — Iris Calder's "Resonance" project — shown here in full with a note after each section explaining why it works. Use this as the depth/quality target for a thesis-defining case study, not something to force onto every project (see pacing guidance for when a lighter treatment is correct).

---

## Resonance

### Hook / overview

> A product-launch site for a spatial-audio startup, built to make their core pitch — that sound has physical shape — something you feel on the page in real time, not something you're told in a paragraph.

**> Why this works:** One sentence, no jargon, states what it is and the single most interesting thing about it (the idea *is* the interaction, not decoration on top of one). A skimmer who reads only this line still walks away knowing what the project is and why it's distinctive.

### The brief

> [Startup] builds spatial-audio hardware and needed a launch site ahead of a funding round. The pitch — that sound has a physical, navigable shape — had never been visualized on their existing marketing pages; it lived only in the founders' verbal explanation. The site had to make that idea legible without a single static illustration doing the explaining.
>
> Timeline was three weeks, team of two (myself building, one designer providing direction), and a hard requirement from the founders: the homepage had to run acceptably on the mid-range Android devices their investor deck cited as common in their target markets — not just look good in a Chrome dev-tools demo on a MacBook.

**> Why this works:** States the problem in the client's terms first (a pitch that had never been made visual) before any technical framing. The constraint — three weeks, small team, and specifically a *device-tier* requirement — isn't decorative context, it's what makes the coming technical decision meaningful. Without this paragraph, the mobile-performance pivot later in the case study would just read as generic "I optimized it" instead of "I solved the actual constraint that mattered."

### Process & key decisions

> **Decision: how the "shape of sound" idea becomes an interaction, not an illustration.** Early direction considered a literal audio-waveform visualization — rejected fast, because waveforms read as a technical diagnostic, not an emotional pitch. Instead, the concept became typography itself as the audio-reactive surface: the brand's headline distorts in real time, driven by a shader displacement responding to ambient audio input (or, when audio permission isn't granted, a generated idle pattern) — so the *words explaining the product* are simultaneously demonstrating it.
>
> **Decision: how to keep that distortion affordable on target devices.** The first working prototype computed the displacement per-vertex, directly in the vertex shader, sampling a noise function driven by live audio-frequency data. It looked excellent in local testing on a desktop GPU and dropped to single-digit frame rates on the target mid-range Android devices during a first real-device test — the noise function was cheap, but the vertex density needed for legible type distortion wasn't. Rather than simplify the type (which would have undercut the whole concept) or drop the effect for mobile (which would have meant two different pitches for two audiences), the displacement calculation moved off the vertex shader entirely: computed once per frame into a small offscreen render target, then sampled as a texture by a much simpler per-vertex lookup. The GPU's native bilinear filtering smoothed the result essentially for free. Visually near-identical to the original approach; a fraction of the per-frame cost, because the expensive noise evaluation now runs once per frame at low resolution instead of once per vertex at full type resolution.

**> Why this works:** Two decisions, not a diary of every day worked — each stated as option-considered vs. option-chosen, with the *why* spelled out. The second decision explicitly rejects two tempting-but-wrong fixes (simplify the type, drop the effect on mobile) before explaining the one that preserved the concept — that rejection is exactly the kind of judgment a creative director is reading for, and it's a completely different (and more convincing) claim than just describing the fix in isolation.

### The technical challenge

> The hardest problem on this project wasn't the shader itself — it was that the *initial* correct-looking solution actively failed on the exact audience the project existed to reach. Confirming that meant real-device testing, not just a desktop profiler: Chrome remote debugging over USB against an actual mid-range Android device surfaced the frame drop that a MacBook's dev tools never would have shown, since desktop GPUs absorbed the per-vertex cost without visible strain.
>
> Once the bottleneck was confirmed as vertex-shader cost rather than fragment cost or draw-call count, the fix (offscreen render target, sampled as texture) was almost mechanical — the hard part was correctly diagnosing *what* was expensive before reaching for a fix, rather than guessing.

**> Why this works:** Names the actual diagnostic method (real-device testing over USB, not just desktop profiling) — this is the detail that convinces a senior-engineer reader this is a real account, not a retrospective just-so story, because it explains *how the problem was even found*, not just how it was fixed. It also makes an honest, useful point about process (diagnosis before fix) that reads as senior judgment on its own.

### Outcome

> Shipped on schedule, ahead of the funding round it supported. Held a steady 55–60fps on the target-tier Android test device (a mid-range Samsung Galaxy A-series phone used for validation throughout) — the metric that mattered most, since it was the explicit constraint from the brief. Site launched to Awwwards Site of the Day the following week, and the studio re-engaged for a second project three months later.

**> Why this works:** Leads with the constraint-specific metric (frame rate on the actual target device) rather than a generic performance claim, because that's the number this specific project needed to hit. The award and the repeat engagement are both independently verifiable facts, not self-assessed claims — no "the client loved it" language anywhere.

### Reflection

> If I rebuilt this today, I'd build the offscreen-render-target approach as the first prototype instead of the per-vertex one — I reached for the "obviously correct" technique first and let real-device testing catch the problem, when a five-minute cost estimate up front would have gotten me to the same answer faster. Worth remembering: "looks right on a desktop GPU" is not a performance signal for a project with an explicit mobile constraint.

**> Why this works:** A genuinely useful, slightly self-critical insight — not an apology, a lesson. This is optional (see [../docs/project-case-study-structure.md](../docs/project-case-study-structure.md)), but including it is a strong, rare signal of seniority: only someone confident in the finished work volunteers a real limitation in how they got there.

---

**Live:** [resonance-project.example](#) · **Note:** design direction by [Designer Name]; build, shader work, and performance engineering by Iris Calder.

## What makes this "excellent" as a full case study

Every section earns its place: the brief section isn't throat-clearing, it sets up the constraint the technical-challenge section later pays off. The two "decisions" are genuinely different kinds of decisions (a creative/conceptual one, then a technical/performance one), which shows range within a single project instead of two variations on the same point. The technical-challenge section names a diagnostic method, not just a fix — this is the detail most weak case studies skip, and it's the one senior engineers specifically look for per [../docs/recruiter-employer-psychology.md](../docs/recruiter-employer-psychology.md). Nothing in the whole case study relies on an adjective to do persuasive work; every claim is either a specific fact or an explicitly honest, non-defensive admission in the reflection.
