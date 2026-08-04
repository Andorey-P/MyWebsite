# Calibration Example: Weak Portfolio Narrative

The same persona and premise as [excellent-portfolio-narrative.md](excellent-portfolio-narrative.md) — Iris Calder, the same real projects, the same underlying skill level — done badly. Nothing about her actual work changed; only the narrative and copy decisions did. This is the point: a weak portfolio is usually a storytelling failure, not a talent gap. Each section below is paired with a specific diagnosis, referencing the doc that explains the rule being broken.

---

## Hero

```
[particle logo animation, no text until scroll]

Welcome to my portfolio.
```

**Diagnosis:** No role, no specialty, no claim of any kind — the entire message is delegated to the 3D scene, which fails instantly on a slow connection, with WebGL disabled, or for a recruiter skimming a screenshot. "Welcome to my portfolio" is throat-clearing that announces content instead of being content. Violates the core rule in [../docs/hero-section-strategy.md](../docs/hero-section-strategy.md): *state role + specialty in real text, above the fold, before the 3D scene is the only messenger.* A recruiter given three seconds and this hero has learned nothing and, per [../docs/recruiter-employer-psychology.md](../docs/recruiter-employer-psychology.md), most will not scroll to find out more.

## Project sequencing

Seven projects, listed in the order they were built, oldest first: a university assignment, a small internal agency tool, the sports-broadcast pieces, a logo animation for a friend's band, then — sixth of seven — Resonance, the strongest and most thesis-relevant piece, followed by the shader-art competition entry as an afterthought at the very end with a one-line caption.

**Diagnosis:** Chronological order optimizes for "here's my history," not "here's my best argument" — see [../docs/narrative-structure.md](../docs/narrative-structure.md). The strongest project (Resonance) is buried sixth, past the point most visitors stop scrolling, meaning the piece that most proves the thesis is the least likely to be seen. Seven projects, several of them weak (a university assignment has no business on a professional portfolio targeting agency roles), reads as uncurated rather than prolific — padding, not range. Nothing signals which projects the developer herself considers her best work, which means the reader has to do curation the developer should have done herself.

## Resonance — case study opening

> This project was built using Three.js, GSAP ScrollTrigger, custom GLSL vertex shaders, and Vite for bundling.
>
> I really wanted to push the boundaries of what's possible with WebGL on this one and create a truly immersive, cutting-edge experience for the client. It was a fun and challenging project that let me leverage my skills.
>
> The result is a seamless, high-performance experience that I'm really proud of.

**Diagnosis:** Opens with the tech stack — exactly the rule [../docs/project-case-study-structure.md](../docs/project-case-study-structure.md) warns against, answering a question ("what tools?") before the reader has any reason to care. Every sentence after that is banned-word-list copy per [../docs/copywriting-voice.md](../docs/copywriting-voice.md) — "cutting-edge," "seamless," "high-performance," "leverage," "immersive" — none of it checkable, all of it interchangeable with any other portfolio on the internet. There is no brief, no constraint, no decision, no named mechanism, no outcome. A senior-engineer reader learns nothing about how the mobile frame-rate problem (which the excellent version turns into the single best evidence of technical judgment in the whole site) was solved, because it isn't even mentioned — the actual hardest, most interesting problem on the project is invisible here.

## About page

> **About Me**
>
> Jane— sorry, Iris is a passionate and detail-oriented creative developer with a love for pushing the boundaries of what's possible on the web. She is a highly skilled professional with experience across a range of technologies including Three.js, GSAP, WebGL, and GLSL.
>
> Iris studied Multimedia Design, then worked at [Studio A] from 2019–2021, then [Agency B] from 2021–2023, and has been freelancing since. In her free time she enjoys exploring new technologies, hiking, and coffee.
>
> Feel free to reach out!

**Diagnosis:** Third-person voice contradicts the first-person hero and case studies — reads as if a different, less invested person wrote it, which is itself a distrust signal per [../docs/recruiter-employer-psychology.md](../docs/recruiter-employer-psychology.md). Opens with adjectives ("passionate," "detail-oriented," "highly skilled") instead of the credibility block the [about-page strategy](../docs/about-page-strategy.md) calls for — no named clients presented as proof, no competition placement, nothing checkable. The middle paragraph is a résumé chronology with no turn, no "why this specialty" — it could be pasted onto any developer's about page unchanged, which is the exact failure mode the [self-edit test in copywriting-voice.md](../docs/copywriting-voice.md#quick-self-edit-pass) is built to catch. "Hiking and coffee" is the textbook generic human-angle detail — it tells the reader nothing that couldn't apply to thousands of other portfolios, and does zero work reinforcing the technical thesis.

## CTA

> Contact Me

*(a contact form only, no visible email or LinkedIn, required fields: name, email, company, budget range, message, "how did you hear about us")*

**Diagnosis:** Zero specificity about what happens next — compare to the excellent version's "Have a brief that needs real-time 3D done properly?" which restates the thesis one more time even in the CTA. A gated, multi-field form with no visible direct contact method is friction a recruiter — who is likely reaching out to several candidates in one sitting — will often just avoid in favor of someone easier to reach, exactly the distrust pattern flagged in [../docs/recruiter-employer-psychology.md](../docs/recruiter-employer-psychology.md).

---

## The through-line

Nothing about Iris's actual talent or work changed between this version and the excellent one — same projects, same skill level, same technical achievements. What changed is entirely narrative and copy: no thesis was ever decided, so nothing was curated against one; sequencing followed convenience (chronology) instead of argument; every claim was made in adjectives instead of facts; and voice was inconsistent across sections. This is the central case for why this Skill exists — a portfolio's story is not a cosmetic layer on top of the work, it's the mechanism by which the work's quality actually reaches the reader.
