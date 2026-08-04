# Skills Ecosystem

Six Claude Code Skills that together cover the full lifecycle of building and maintaining an Awwwards/FWA/CSS-Design-Awards-tier creative-developer portfolio built with **JavaScript + Three.js + GSAP + GLSL + Vite**. Each Skill owns one layer of responsibility and defers to the others by reference — no skill re-teaches another's material. Claude loads the Skill(s) matching the task automatically; you rarely need to name one explicitly.

## The layered model

```
        VISION           creative-direction        "why this feels this way"
           │              (art direction, mood, palette rationale,
           │               typography pairing, composition, cross-page
           │               consistency — final say on artistic intent)
           ▼
        CONTENT          portfolio-storytelling     "what to say, in what order"
           │              (narrative sequencing, hero messaging, case-study
           │               structure, copywriting voice, recruiter psychology)
           ▼
        STRUCTURE        ui-ux-designer             "how it's laid out and systemized"
           │              (breakpoints, grids, spacing/type scale, color
           │               tokens, accessibility, component patterns —
           │               final say on usability/systemization)
           ▼
        MOTION           animation-principles       "how it moves"
           │              (timing, easing, choreography, camera movement,
           │               scroll narrative, motion accessibility)
           ▼
        CODE             javascript-architecture    "how it's built" (generative)
           │              (project structure, module design, state,
           │               events, Vite conventions — used when writing
           │               new code)
           ▼
        AUDIT            threejs-website-reviewer   "how it's graded" (evaluative)
                          (reviews EXISTING code for correctness,
                           performance, memory, shaders — cites the
                           layers above rather than re-deriving them)
```

Higher layers set intent; lower layers execute it. When a request crosses layers (e.g. "design my hero section"), Claude works top-down: message (`portfolio-storytelling`) → layout (`ui-ux-designer`) → mood/palette (`creative-direction`) → motion (`animation-principles`) → implementation (`javascript-architecture`), pulling in whichever Skills the specific ask touches.

`javascript-architecture` and `threejs-website-reviewer` are a deliberate pair, not a duplication: the former is **generative** (scaffolding new code before it exists), the latter is **evaluative** (auditing code that already exists for bugs/perf/leaks). Use the architecture skill when building, the reviewer skill when grading.

## The six skills

| Skill | Owns | Does not own |
|---|---|---|
| [`creative-direction/`](creative-direction/) | Design philosophy, mood/atmosphere, composition & balance, typeface *pairing*, color *palette* rationale, minimalism/maximalism stance, interaction *philosophy* (the feel), cross-page consistency | Grid mechanics, contrast ratios, type scale ratios, easing curves/durations, narrative copy, code |
| [`portfolio-storytelling/`](portfolio-storytelling/) | Project sequencing, hero *messaging* (words, not layout), about-page narrative, case-study structure, copywriting voice, CTAs, recruiter/employer psychology | Layout, visual mood, animation, code |
| [`ui-ux-designer/`](ui-ux-designer/) | Breakpoints, grids, spacing/type *scale*, visual hierarchy, color *systems* (tokens/contrast), accessibility (WCAG 2.2), touch targets, interaction *patterns* | Palette meaning, typeface pairing, animation timing, copy, JS implementation |
| [`animation-principles/`](animation-principles/) | Timing, easing curves, motion hierarchy/staging, scroll choreography, camera cinematography, transitions, motion accessibility, general animation perf | Where animation code lives in the file structure, GPU/draw-call perf, UI pattern choice, content/copy, brand mood |
| [`javascript-architecture/`](javascript-architecture/) | Project/folder structure, module design, naming, state management, event systems, Vite conventions, generative Three.js app architecture (SceneManager/AssetManager patterns) | Reviewing existing code for bugs (that's the reviewer skill), animation timing, visual/UI design, shader authoring |
| [`threejs-website-reviewer/`](threejs-website-reviewer/) | Auditing *existing* code: WebGL/GPU/CPU performance, memory/disposal, shader review, mobile rendering, asset pipeline, GSAP/Lenis/ScrollTrigger wiring correctness | Design/motion/narrative theory — it cites the skills above when critiquing, rather than re-explaining them |

## Shared conventions

Every skill uses the same folder shape and the same quality bar:

```
skill-name/
├── SKILL.md        # frontmatter (name + trigger-rich description) + purpose, methodology, output format, related skills, tone
├── README.md       # human-facing overview: what it is, folder tree, example prompts, maintenance notes
├── docs/           # deep reference material, read on demand
├── checklists/     # systematic `- [ ]` pass-through lists
├── templates/       # fill-in output structures
├── examples/        # good-vs-bad calibration examples
└── snippets/         # copy-paste-ready code/CSS/copy
```

All six assume the same stack (Vite + ES Modules + vanilla JavaScript, GSAP + ScrollTrigger, Lenis, raw GLSL, Three.js) and the same quality target (Awwwards/FWA/CSS Design Awards tier, 2026 professional standards). All are opinionated by design — concrete numbers and named recommendations, not "it depends."

## How cross-referencing works

A skill that touches a neighboring skill's territory states the boundary in one sentence and links out (e.g. `ui-ux-designer/docs/color-systems.md` explicitly defers palette *rationale* to `creative-direction` rather than explaining it). This is enforced content, not a suggestion — each skill was built against the boundary contract above and verified for encroachment before being considered complete. If you ever see a skill re-explaining another's material at length, that's a sign the boundary has drifted and the offending section should be trimmed to a reference link.

## Maintaining this ecosystem

- Adding a new skill: define its one-sentence "owns / does not own" row above *before* writing any files, and add it to the layer diagram.
- If two skills start duplicating content, the fix is almost always to delete the duplicate and add a link — not to merge the skills.
- Keep this file's table in sync with each skill's SKILL.md "Related skills" section; they should never disagree about who owns what.
