# Calibration Example: Excellent Portfolio Narrative

A full worked example — a hypothetical creative-developer portfolio, described end to end, with the reasoning for why each beat works. Use this as the calibration target for structure and copy quality, not a template to copy verbatim. Paired contrast at [weak-portfolio-narrative.md](weak-portfolio-narrative.md) — same premise, same person, done badly.

**Persona:** Iris Calder, mid-senior creative developer, four years agency (broadcast + web), two years freelance/studio work. Strong in GLSL shader work and scroll-driven interaction. Targeting: brand/agency creative-developer roles and select freelance clients.

**Stated thesis (decided before any copy was written):** *A creative developer who turns brand concepts into interactive 3D experiences with real engineering discipline underneath the visual craft — not just a shader artist, someone who ships performant, production-grade WebGL.*

---

## Hero

```
Creative Developer

I build interactive 3D experiences for brands that want
their site to feel like software, not a slideshow — WebGL,
custom shaders, and motion that responds to you.

Based in Berlin · Available for select freelance projects

[ View Work ↓ ]                         [ About / Contact ]
```

**Why it works:** Role stated in the eyebrow, in two words, before anything else loads. The identity sentence names what she builds (interactive 3D experiences), for whom (brands that want software-grade sites), and the differentiator (motion that responds to you — implying real interactivity, not just a passive render) — all in one sentence that survives a screenshot. It does not open with "Three.js/WebGL/GSAP developer." Availability line is a quiet trust signal and implies she's selective, which itself signals demand. Primary CTA points at proof; contact is present but visually secondary. This follows every rule in [../docs/hero-section-strategy.md](../docs/hero-section-strategy.md).

## Project sequencing

Four projects, in this order:

1. **Resonance** (spatial-audio startup site — shader-driven, technically ambitious, the strongest thesis match) — full case study.
2. **Fielded** (agency client, e-commerce configurator — different flavor: interaction/UX-heavy rather than shader-heavy, shows range) — full case study.
3. **Two broadcast-to-web motion pieces for a sports client** — highlight treatment, one paragraph each, shown together as a pair.
4. **A personal WebGL experiment — procedural terrain shader, no client, built for a shader-art competition, placed top 20** — highlight treatment, closes the flow on ambition/range.

**Why it works:** Opens with the single project that most proves the thesis (see [../docs/narrative-structure.md](../docs/narrative-structure.md)'s ordering rule), not chronologically first or "biggest client name" first. Project 2 deliberately shows a different technical muscle so the flow doesn't read as one-note. Projects 3–4 get lighter treatment on purpose — they're real, they're relevant, but they're not asked to carry full case-study weight they can't support, which would have surfaced as thin writing if forced into the six-part structure. Closing on the personal shader-art project ends on ambition rather than trailing off on the least distinctive client work.

## Resonance — case study opening (full case study elsewhere; here, just the opening beats)

> A product-launch site for a spatial-audio startup — the product's whole pitch is that sound has physical shape, so the site had to make that felt, not stated.
>
> The brief: three weeks, a small team, and an explicit requirement that the homepage run acceptably on the mid-range Android devices their investor deck flagged as common in target markets. No static illustration was allowed to carry the "sound has shape" idea — it had to be real-time and responsive to the visitor.
>
> Early prototypes drove typography distortion directly from a vertex shader sampling live audio-reactive noise. It looked excellent on desktop and dropped to single-digit frame rates on the target Android devices. Rather than cut the concept, the distortion calculation moved to a lower-resolution offscreen render target sampled as a texture, letting the GPU's bilinear interpolation do the smoothing cheaply — same visual result, roughly a tenth of the per-frame cost.

**Why it works:** Opens with the concept, not the stack (per [../docs/project-case-study-structure.md](../docs/project-case-study-structure.md)). States a real, specific constraint (three weeks, target device tier) before any technical detail. The key decision is told as chosen-vs-rejected with a real mechanism (offscreen render target sampled as texture, not "I optimized it"), which is exactly what a senior-engineer reader is scanning for per [../docs/recruiter-employer-psychology.md](../docs/recruiter-employer-psychology.md). See the complete version, annotated section by section, in [case-study-example.md](case-study-example.md).

## About page

> **Creative Developer — interactive 3D, real-time shaders, motion that holds up under interaction.**
>
> Six years building for screen — four in broadcast and agency motion graphics, two building for the browser. Notable studios/clients: [Studio A], [Agency B], [Client C]. Shader-driven work has placed in two international WebGL competitions.
>
> I spent my first few years building broadcast motion graphics — deadline-driven, frame-perfect, no user interaction to worry about. Moving to the web didn't feel like starting a new craft, it felt like the same one with a runtime attached: the motion still had to be frame-perfect, except now a cursor could interrupt it at any moment. That's the problem I've been chasing since — motion and shader work that hold up under real interaction, not just in a render.
>
> Most weekends I'm rebuilding some part of my own site's shader pipeline for no reason anyone asked for — the current one is getting procedural fog to read as volumetric without a full raymarch pass.
>
> Selective on freelance work through Q3. If the brief needs real-time 3D done properly, let's talk.

**Why it works:** Credibility block (years, named studios, competition placements) comes before the personal narrative, per [../docs/about-page-strategy.md](../docs/about-page-strategy.md). The narrative paragraph has an actual turn (broadcast → web, reframed as "same craft, new runtime") instead of a job-title chronology. The human-angle detail is specific enough to be falsifiable and quietly reinforces the shader-craft thesis instead of being a disconnected fact. Total running prose is under 200 words — respects the reader's investment.

## CTA

> **Have a brief that needs real-time 3D done properly?**
> I take on a small number of freelance projects each quarter. Tell me about the project — [iris@—.dev](#) or [book 20 minutes](#).

**Why it works:** Specific to what happens next (not "Contact Me"), implies selectivity without arrogance, gives two concrete, low-friction paths. See [../snippets/cta-copy-patterns.md](../snippets/cta-copy-patterns.md).

## What makes this portfolio "excellent" as a whole

Every section supports the same one-sentence thesis stated at the top — nothing is here to "round out" the picture at the cost of diluting it. The order follows the arc in [../docs/narrative-structure.md](../docs/narrative-structure.md): hero states identity, projects prove it fast then in depth, about corroborates it with a real story, CTA converts with momentum instead of trailing off. Every claim across every section is either a specific fact or explicitly framed as honest opinion — nothing relies on an adjective doing unverifiable work. And critically, depth varies on purpose: the two strongest projects get full case studies, the rest get treatment proportional to what they can actually support, which is why nothing in the flow reads as padded or templated.
