---
target: the landing page
total_score: 29
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
timestamp: 2026-08-22T17-20-30Z
slug: src-pages-index-astro
---
⚠️ DEGRADED: single-context (harness restricts sub-agent spawning to explicit user request; user asked for a critique, not for sub-agents)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Chat has aria-live and auto-focus; scroll cue present. No visible loading state named in markup. |
| 2 | Match System / Real World | 4 | Cinema metaphor sustained end-to-end: NOW SHOWING, IN PRODUCTION, CAST & CREW, ROLL FILM, FIN. |
| 3 | User Control and Freedom | 3 | Escape closes chat, close button labelled, input auto-focuses. No focus trap or focus restore on close. |
| 4 | Consistency and Standards | 3 | Internally consistent post-token-extraction, but no `<main>` landmark and section labels are divs. |
| 5 | Error Prevention | 3 | Small input surface; caps enforced server-side. |
| 6 | Recognition Rather Than Recall | 3 | Nav labels are plain, but "⚑ GUARD BOT" / "⚑ CTF" is unexplained jargon in a primary slot. |
| 7 | Flexibility and Efficiency | n/a | Persuade surface — no repeat-use workflows to accelerate. |
| 8 | Aesthetic and Minimalist Design | 4 | Distinctive, authored, coherent. The site's strongest axis. |
| 9 | Error Recovery | 3 | Provider failover exists server-side; no visible client error state in landing markup. |
| 10 | Help and Documentation | 3 | The chat is the help affordance and is discoverable, but its own hint is the only signpost. |
| **Total** | | **29/36** | **Good (81%)** |

## Design Specificity Verdict

**LLM assessment:** Strongly authored. Not category-interchangeable. The cinema conceit is not a veneer — it reaches the information architecture (reels, chapters, matinee sections), the copy (NOW PLAYING / IN THE VAULT / FIN.), the palette rationale, and the grain overlay. Swap in another product and the whole vocabulary breaks, which is the test. Type pairing (Anton / Newsreader / Space Mono) carries three distinct jobs. The ink→paper→klein→acid scroll gives the page real structural rhythm rather than stacked cards.

Weakness is not taste — it is that the page's structure does not express its own hierarchy to machines or to skimmers.

**Deterministic scan:** 10 findings in `src/pages/index.astro`. Only **1 non-advisory**: `bounce-easing` at line 308 (`cubic-bezier(0.34, 1.56, 0.64, 1)`). The other 9 are advisory design-system drift — 6 undocumented colours (`#6b675d`, `#ffe9e4`, `#7a2718`, and 3 more) and 3 off-ramp font sizes. No AI-slop tells beyond the easing.

**Visual overlays:** Not attempted. The preview pane in this session does not deliver real hover/mutation reliably, so no user-visible overlay is available. Fallback signal is the CLI scan above plus direct DOM inspection.

## Overall Impression

This is a good site with a weak skeleton. The surface is genuinely designed; the document underneath is nearly structureless. Biggest opportunity: the writing — the actual product — is buried below a chat toy.

## What's Working

1. **The metaphor is total.** Section labels, chapter numbering, status vocabulary, and the footer credits all speak the same language. Most sites apply a theme to the visuals and leave the copy generic. This does the opposite and is stronger for it.
2. **The chat is built with real care.** `<button>` element, descriptive aria-label, Escape-to-close, input auto-focus, aria-live region, labelled close button. That is better than most shipped chat widgets.
3. **Two grounds do structural work.** Ink→paper→klein→acid isn't decoration; it is how the page segments itself without card grids.

## Priority Issues

**[P1] The writing is below the fold on a writing site**
- Why it matters: 5.1 screens of scroll; the hero is an avatar and a chat prompt. A visitor arriving from a shared article link meets a toy before they meet the work. The chat is the most novel thing on the page but not the most valuable.
- Fix: Raise one real article into the first viewport — a single NOW SHOWING card under the wordmark. Keep the avatar; demote it from sole hero to co-hero.
- Suggested command: `/impeccable shape`

**[P1] No `<main>` landmark, and section labels are not headings**
- Why it matters: Landmarks are HEADER / NAV / FOOTER only. Heading outline is H1 MAYSTASH → three article titles → three project names → LET'S TALK. "NOW SHOWING — THE WRITING", "IN PRODUCTION — THE WORK" and "CAST & CREW" are `<div class="arm-slate">`. A screen-reader user browsing by heading gets a flat content list with no sections; search engines see the same.
- Fix: Wrap the arms in `<main>`; promote each arm label to `<h2>` and demote article titles to `<h3>`.
- Suggested command: `/impeccable audit`

**[P2] Keyboard affordance is thin**
- Why it matters: 20 interactive elements, only 3 `:focus-visible` rules on the page, and no skip link past a five-link corner nav.
- Fix: Add a skip link and a single shared `:focus-visible` treatment using the acid token.
- Suggested command: `/impeccable audit`

**[P2] `bounce-easing` contradicts your own DESIGN.md**
- Why it matters: line 308 uses `cubic-bezier(0.34, 1.56, 0.64, 1)` — an overshoot curve. DESIGN.md explicitly bans overshoot and names `--ease-reveal` as the house curve. The only non-advisory finding on the page.
- Fix: Replace with `var(--ease-reveal)`.
- Suggested command: `/impeccable animate`

**[P2] "LET'S TALK" has no accessible space**
- Why it matters: `LET'S<br />TALK` renders on two lines visually but its text content is `LET'STALK`. Screen readers announce one word; search engines index one word.
- Fix: `LET'S <br />TALK`, or split into two spans with whitespace.
- Suggested command: `/impeccable clarify`

## Persona Red Flags

**Jordan (First-Timer, arrives from a shared article link):** Lands on a wordmark and a cartoon avatar, not the article they were promised. Must scroll past a marquee to reach any writing. Sees "⚑ GUARD BOT" in a primary nav slot with no explanation of what that is. Risk: bounces before reaching the reel.

**Sam (Screen-reader user):** No skip link, so tabs through five corner links first. No `<main>`, so no jump-to-content. Browsing by heading yields "MAYSTASH", three article titles, three project names, "LET'STALK" — no indication that the page has a writing section or a projects section. Can operate the chat well, which is the page's best-served interaction.

**Riley (Prospective client evaluating credibility):** The metaphor reads as confident and distinctive. But the projects section labels the work `IN PRODUCTION` / `IN THE VAULT` without dates or outcomes in view, and one project card (Hash) has no destination at all — a dead end for someone trying to verify the work exists.

## Minor Observations

- H1 is the wordmark. Defensible on a personal site, but the tagline that carries the actual proposition is a `<p>`.
- Six undocumented colours and three off-ramp font sizes remain in this file — the largest concentration of drift left in the codebase.
- The avatar's six frames are correctly hidden from assistive tech (five `aria-hidden`, one with `alt="May"`). Good detail.
- Page is 5.1 viewports tall with four distinct grounds. Coherent, but it asks a first-timer to hold a lot of concepts: cinema house, chat agent, CTF, hub, two reel types.

## Questions to Consider

- If a visitor could only see one screen of this site, should it be the avatar or the most recent piece of writing?
- What is "⚑ GUARD BOT" doing in a primary nav slot, and would a first-timer know it is a security demo rather than a bot that guards the site?
- The site has five concepts running at once. Which one would you defend if you had to cut two?
- Does a project with no link belong in the same list as projects that have one?
