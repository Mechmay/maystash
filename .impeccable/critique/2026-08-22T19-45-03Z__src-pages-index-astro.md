---
target: the landing page
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
timestamp: 2026-08-22T19-45-03Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review, isolated — no detector access · B: detector + browser measurement, isolated)
Caveat: Assessment A could not reach the live page (dev server had stopped); its findings are source-grounded. All load-bearing claims re-verified against source by the parent before inclusion.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Submitting while `busy` destroys the question silently. No spinner, no disabled input, no aria-busy. |
| 2 | Match System / Real World | 2 | `WATCH →` on an article you read. `⚑ GUARD BOT` holds the top-centre nav slot, unexplained. |
| 3 | User Control and Freedom | 2 | 14 speech lines auto-rotate, no pause. Marquee has no reduced-motion guard. Focus not restored on chat close. |
| 4 | Consistency and Standards | 2 | Avatar button means two different things; hint text never updates. Five DESIGN.md rules broken on this page. |
| 5 | Error Prevention | 2 | `maxlength=500` and DOM-built replies are genuinely good; undercut by the destroyed-question path. |
| 6 | Recognition Rather Than Recall | 2 | CH.05, M2, NOW SHOWING, IN PRODUCTION, MATINEE, GUARD BOT — none defined on the page. |
| 7 | Flexibility and Efficiency | 3 | Suggestion chips, ALL WRITING →, Escape-to-close, direct mailto. |
| 8 | Aesthetic and Minimalist Design | 3 | Strongest axis. Deducted for a full-bleed acid plate and a first screen with zero content. |
| 9 | Error Recovery | 2 | `setPose('no')` is a silent no-op — avatar freezes in `think` permanently after a network failure. |
| 10 | Help and Documentation | 3 | The chat is real help. It answers "How do I hire him?" — which the page never does. |
| **Total** | | **23/40** | **Acceptable (58%)** |

Prior degraded run scored 29/36 (81%). The gap is the finding: that run was anchored by detector output and never exercised the chat's failure paths.

## Design Specificity Verdict

Authored — but specificity and prominence run in opposite directions. The programme metaphor is load-bearing: CH.xx indexes articles like a running order, NOW PLAYING / IN PRODUCTION / IN THE VAULT is a real three-state taxonomy, the credits ledger closes the building. None of it survives transplant. But the hero — circular 3D avatar, comic speech bubble, rotating one-liner, click-to-chat — is the most portable component on the internet in 2026. It occupies 100svh. The parts that could only be this site are all below the fold; the part that could be anyone's is the entire opening frame.

**Deterministic scan (B):** 10 findings, 1 non-advisory — `bounce-easing` line 308 (`cubic-bezier(0.34, 1.56, 0.64, 1)`, y2=1.56 overshoot) on the avatar `pop`. Nine advisory: 6 undocumented colours, 3 off-ramp sizes.

**Measured (B):** 26 interactive elements, 5 with `:focus-visible` — and `.nav-links a:focus-visible` matches zero elements on this page. Zero functional text below 11px at 1280 or 375 (floor work held). No real horizontal overflow at 320/375. Zero console errors, 0 failed requests across 68. No `<main>`, no skip link. `.chat-form input` renders 15.2px — under the 16px iOS-Safari zoom threshold.

## Verified Bugs

1. **Typed questions are destroyed.** `const q = input.value; input.value = ''; ask(q);` and `ask()` opens `if (busy || !question.trim()) return;`. Type a second question while the first is in flight: cleared, discarded, no feedback.
2. **Avatar freezes after a network failure.** The catch branch calls `setPose('no')`; `POSES` has no `'no'`; `setPose` opens `if (!frames.has(name) …) return;`. Silent no-op — the face stays in `think` forever.
3. **Focus indicator on the only text input is literally invisible.** `.chat { background: var(--paper-hi) }` and `.chat-form input:focus { outline: none; background: var(--paper-hi) }`. The outline is removed and replaced with the colour already there.
4. **`prefers-reduced-motion` coverage is incomplete, and DESIGN.md claims otherwise.** The block covers `.av`, `.pose`, `.roll` only. `.marquee-track { animation: marquee 30s linear infinite }` is unguarded, and the JS speech rotation is not gated. WCAG 2.2.2.
5. **`--paper-dim` measures 3.11:1 on paper** — confirmed against the file's own comment. Still on `.pcard-meta` (article dates), `.roll`, `.msg.think`. Only `.avatar-hint` was ever fixed.

## DESIGN.md Violations On Its Own Flagship Page

- `.block-acid { background: var(--acid) }` — a full-bleed acid **ground**. Acid has five sanctioned roles; ground is not one, and the cap is ~5% of a screen.
- `.pc-tags { color: var(--acid) }` — nine tag chips in acid at rest across three cards.
- `.c-link.primary { background: var(--acid) }`.
- `.about-text { font-family: var(--font-display) }` — running body copy in Anton. The Three Voices Rule forbids it outright.
- `.prod-card:hover { transform: translateY(-3px); background: rgba(0,0,0,0.14) }` — elevation on hover (Flat rule) and pure black (Never-Black Rule).
- `.stage-name { text-shadow: 0.035em … }` vs the `--shadow-print` token's `0.03em` — a hand-tweak that forked the token on the most prominent type on the site.

Acid means "the only thing switched on." At twelve-plus resting instances plus a full-bleed field, it means nothing — which retroactively empties the tally dots of the signal they were built to carry.

## What's Working

1. **Ground-alternation is the layout.** Section boundaries are announced by the ground changing under you, not a container edge. This is why the Rule-Not-Box Rule holds without effort.
2. **The status system is honest.** Three real states, three programme nouns, glow only on live. A visitor can't see the discipline, but the result reads as trustworthy.
3. **The reply renderer is injection-proof by construction.** `createTextNode`/`createElement`, never `innerHTML`; links generated from `POST_SLUGS` with drafts excluded. On a site whose headline article is about prompt injection, the hero widget being structurally immune is the most persuasive thing on the page — and it's invisible.

## Priority Issues

**[P0] Keyboard users get nothing.** Six content cards define `:hover` and no `:focus-visible`; the only text input has no visible focus at all. DESIGN.md's One Volt role 1 says "hover **and focus**" — the constitution says focus, the implementation shipped hover. Highest audience overlap: technical readers navigate by keyboard. → Add `:focus-visible` to every `:hover` selector; give the chat input `outline: 2px solid var(--klein); outline-offset: -2px`.

**[P1] The first viewport contains no evidence.** 100svh of avatar, joke, wordmark, tagline. Zero article titles, dates, or credentials. Then a buzzword marquee before any real content. First article title at ~1.2 viewports. → Put the most recent article in the hero as a one-line strip: `CH.05 · NOW SHOWING · "…"`. Costs ~4rem, converts assertion into evidence.

**[P1] Reduced-motion claim is false.** Add `.marquee-track { animation: none }` to the block and gate the rotation loop on `matchMedia('(prefers-reduced-motion: reduce)')`.

**[P2] Chat destroys questions and freezes on failure.** Clear the input only after `ask()` accepts; add `'no'` to `POSES` or catch to `'idle'`.

**[P2] The acid budget is blown.** Either restyle `.block-acid` as ink/paper with a single acid accent, or amend DESIGN.md to sanction an acid ground and say why. Move `.pc-tags` to `--bone-a72`.

## Persona Red Flags

**Prospective client, 40 seconds, desktop:** 100svh cartoon, zero evidence. `.stage-tag` claims security/web3/applied-AI and demonstrates none. Buzzword marquee as the reward for scrolling. CONTACT exiled to a bottom corner while `⚑ GUARD BOT` holds top-centre. Never sees an article title.

**Technical reader, keyboard-first, reduced-motion on:** marquee still scrolling, bubble still rewriting every 7s, six cards with no focus response, focus vanishing in the chat input.

**Screen-reader reader:** no `<main>`, no skip link, section slates are `<div>` so the outline is h1 → three h2 article titles → three h3 project names → h2 LET'STALK, with no section labels. Article dates at 3.11:1.

## One Place Assessment A Overstated

A claimed the Hash card "promises a destination it doesn't have." Source says `href={p.data.url ?? '/projects'}` — the link resolves to the projects index, so it isn't dead. The substance survives: the landing page has no `.is-linked` gate, so a card labelled "Hash" gives full hover-lift and acid border, then delivers a generic index. Weak, not broken.

## Questions to Consider

1. If you deleted the avatar, the speech loop, and the chat and put five article titles in that space — would the page persuade more or less? You now have analytics; measure it.
2. The chat can answer "How do I hire him?" — why can't the page? You hardcoded that chip, so you already know it's what visitors want.
3. DESIGN.md says two grounds. The landing page has four. Which document is lying?
4. The metaphor now calls reading "watching." Where's the line between a frame and a false verb?
