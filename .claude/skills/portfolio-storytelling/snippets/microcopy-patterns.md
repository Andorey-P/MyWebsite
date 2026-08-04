# Microcopy Patterns

The small, easy-to-overlook text on a portfolio — loading screens, empty states, project-card labels, nav labels. These get skipped because they seem trivial, but they're often the first and last things a visitor reads, and generic microcopy is exactly the kind of small tell that makes an otherwise strong site feel templated. Voice rules from [../docs/copywriting-voice.md](../docs/copywriting-voice.md) apply here too — banned words and specificity matter even in three words of nav label.

## Loading screens

The loading screen's copy job is to hold attention honestly, not to perform cleverness at the cost of clarity — a visitor on a slow connection watching a loading screen is already at risk of leaving; don't make them decode a joke too.

- Good, functional: `Loading — [percentage]%` paired with an actual progress value (never a fake timer-driven bar — see `threejs-website-reviewer` for why real `LoadingManager` progress matters technically).
- Good, in-voice: a short line that matches site tone without obscuring status — `Warming up the shaders…` is fine *if* real percentage/progress is still visible nearby; it fails alone, because it gives no sense of how much longer.
- Bad: generic spinner with no text at all on a 3D-heavy site with real load weight — a visitor with no signal of progress vs. hang assumes the site is broken well before it actually is.
- Bad: a joke that requires the page to have already loaded to be understood ("Untangling wires…" makes no sense until context exists) — cute but risks reading as confusing rather than charming to a first-time visitor.

## Empty / fallback states

- No-JS / WebGL-unsupported fallback: state plainly what's missing and what to do, don't apologize excessively.
  > Good: `This site uses WebGL for its 3D content. [Browser/device] doesn't support it — here's a static version of the work: [link].`
  > Bad: `Oops! Something went wrong :(` — no information, no path forward, and the tone doesn't match a professional portfolio's register.
- Empty project filter/search result (if the portfolio has filterable project tags):
  > Good: `No projects tagged "[X]" yet — here's everything: [link/reset].`
  > Bad: `No results found.` with no path back.

## Project-card labels

Card labels are read in a skim, often before the visitor commits to opening a project — they do real work in the "proof, fast" step of the arc (see [../docs/narrative-structure.md](../docs/narrative-structure.md)).

- Good: a concrete role/type label under the project title — `Product Launch · WebGL, GLSL` or `Freelance · E-commerce Configurator` — gives the skimmer enough to decide whether to open it.
- Bad: no label at all, forcing every card to be opened to find out what it even is — costs attention the skim can't afford to spend.
- Bad: a vague label that repeats the project name with no new information (`Resonance — A Project`).
- Year: include only if it's doing work (portfolio explicitly argues trajectory/growth) — otherwise a visible year on your best, oldest-but-still-relevant project can wrongly signal it's stale. If included, keep it small and secondary to the type label.

## Navigation labels

Nav labels are read by every reader type, fastest by the recruiter under time pressure (see [../docs/recruiter-employer-psychology.md](../docs/recruiter-employer-psychology.md)) — clarity beats cleverness here more than almost anywhere else on the site.

- Good, standard and unambiguous: `Work`, `About`, `Contact` (or a single combined `Get in Touch`).
- Risky: stylized alternatives (`Selected`, `Studio`, `Say Hi`) — acceptable only if unambiguous in context (an icon or position makes the meaning obvious) and consistent with an intentional voice established elsewhere on the site. If a recruiter has to hover to find out what a nav item means, it's costing more than the personality is worth.
- Bad: internal/jargon labels a visitor has no context for (`Lab`, `Fragments`, `Signal`) used *without* a supporting subtitle or obvious content pattern once clicked — cute names need one line of plain-language support the first time a visitor encounters them.

## Section headers within a case study

Should orient the reader, not perform style. `The Challenge`, `Process`, `Outcome` are plain and fine — they're structural signposts, not the copy that needs to work hard (the prose under them does that). Save distinctive voice for the sentences, not the labels — an over-styled header set (`The Spark`, `The Grind`, `The Glow-Up`) risks reading as trying too hard exactly where a technical or creative-director reader wants to move fast to the substance.

## Form field labels / contact form (if used)

- Good: `Your email` / `Tell me about the project` — plain, low-friction, matches the direct voice of the rest of the site.
- Bad: `Let's start a conversation! What's your name?` — an overly performed, chatty register applied to a functional form usually reads as try-hard rather than warm, especially to the recruiter reader who wants to move fast. Save personality for the CTA framing around the form, not the field labels themselves.

## General rule for all microcopy

If a piece of microcopy could be deleted with no loss of information or trust (a spinner with no progress, a "Loading..." with no percentage, a nav label so clever it needs a tooltip), it's not earning its place. Every word of microcopy should either convey real status, real navigation, or genuine, low-cost voice — never all three sacrificed for the sake of the third.
