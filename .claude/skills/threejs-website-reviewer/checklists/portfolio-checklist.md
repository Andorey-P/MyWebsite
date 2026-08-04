# Portfolio Quality & Recruiter-Impression Checklist

For when the Three.js site's job is to get someone hired, hire a freelancer, or win a client. This checklist evaluates impression and craft signal, not just correctness — a technically flawless but visually forgettable scene fails this checklist even if it passes every other one.

## First 5 seconds

- [ ] Something visually interesting is on screen within a couple seconds, not a long loading screen before any payoff
- [ ] The loading experience itself looks intentional (a designed loading state) rather than a generic spinner — this is a craft signal recruiters do notice
- [ ] No layout shift or jarring pop when the 3D content resolves
- [ ] The first thing shown clearly communicates "this person can do 3D on the web" — not a default-lit gray cube or an unstyled placeholder

## Craft signals a technical reviewer will notice

- [ ] Lighting looks considered (not default `AmbientLight` + one `DirectionalLight` with no tuning) — HDRI/IBL or deliberately placed lights, believable material response
- [ ] Color management correct — no washed-out or oversaturated textures betraying a missing `outputColorSpace`/tone-mapping setup (this is a specific, checkable signal of Three.js fluency)
- [ ] Camera work feels directed (considered framing, easing, transitions) rather than a raw default `OrbitControls` with no constraints
- [ ] Materials show intentional PBR authoring (roughness/metalness variation, not everything at flat defaults)
- [ ] Post-processing (if present) is tasteful and purposeful, not a generic bloom-everything default

## Interaction quality

- [ ] Interactions respond immediately and smoothly — any input lag or stutter undermines the "this person ships polished work" impression fast
- [ ] Scroll-driven animation (if present) feels smooth and intentional, not janky or fighting itself (see Lenis/ScrollTrigger sync checks in [architecture.md](../docs/architecture.md))
- [ ] Hover/interaction affordances are discoverable — a reviewer shouldn't need to be told where to click/drag
- [ ] Mobile visitors get a genuinely good experience, not an obviously stripped-down or broken one — many recruiters and clients will open the link on a phone

## Technical depth signals (the things that separate "followed a tutorial" from "understands the engine")

- [ ] Evidence of custom shader work where appropriate to the concept (not exclusively stock materials) — even a small, well-executed custom effect reads as stronger than a large scene entirely built from defaults
- [ ] Evidence of asset pipeline care — reasonable load times suggest compression/optimization was actually done, not skipped
- [ ] No visible seams of "default Three.js example code" (unmodified example boilerplate, leftover debug UI, an unstyled `dat.GUI`/`lil-gui` panel left in production)
- [ ] Performance holds up under scrutiny — a reviewer who opens dev tools and sees console errors, huge network payloads, or visible frame drops will downgrade their assessment of the work regardless of how it looks in a screen recording

## Presentation & context

- [ ] Site clearly communicates what it is and who made it (not purely a 3D scene with zero identifying context — a recruiter needs to know whose portfolio this is within seconds)
- [ ] A path exists to see more (other work, contact, resume/LinkedIn) — a stunning scene that's a dead end doesn't convert into an opportunity
- [ ] If this is one piece among several portfolio projects, it's clear what makes this one distinct/worth remembering

## Anti-patterns that undercut portfolio value specifically

- [ ] Not simply a recreation of a well-known tutorial scene with no personal twist (technically literate reviewers recognize these; it reads as "followed instructions" rather than "solved a problem")
- [ ] Not over-scoped to the point of being buggy — a smaller, flawless experience outperforms a larger, glitchy one for this audience
- [ ] No unexplained/unpolished rough edges left visible (a debug camera control, an obviously placeholder texture, lorem-ipsum-style content)

## Close with

State plainly, as part of the review: what would most change a recruiter's or client's first impression, ranked highest-impact first. For this checklist specifically, weigh *visible* craft and *felt* smoothness more heavily than backend code elegance — the audience for this checklist judges the experience, not the source.
