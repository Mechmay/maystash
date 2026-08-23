---
target: the landing page
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-08-23T04-37-38Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review, isolated — no detector access · B: detector + browser measurement, isolated)
Parent corrections: A's H9 raised 1→2 (its P0 rested on a dev-only string; prod error copy is distinct and adequate). B's `design-system-color` on the skip link and `.msg.bot a:focus-visible` recorded as false positives.

## Design Health Score

| # | Heuristic | Score | Δ | Key Issue |
|---|-----------|-------|---|-----------|
| 1 | Visibility of System Status | 2 | = | Chat has no busy state. Mid-flight `input.disabled === false`; a second question is discarded with zero feedback. Offset by the Currency Rule. |
| 2 | Match System / Real World | 3 | +1 | Film vocabulary now decodable from context (`NOW SHOWING` + date, `SHIPPED` + tally). `⚑ GUARD BOT` still holds top-centre unexplained. |
| 3 | User Control and Freedom | 2 | = | Escape/✕ close the chat but focus lands on `<body>`; the 76px open-scroll is never restored. No retry, no conversation reset. |
| 4 | Consistency and Standards | 2 | = | Two primary-button languages for one mailto (klein rectangle in hero, acid pill in contact). One project, two labels on one page (`SHIPPED` vs `NOW PLAYING`). |
| 5 | Error Prevention | 2 | = | In-flight submit swallowed silently. External strip row opens a new tab unannounced. Suggestions hidden behind `res.ok`. |
| 6 | Recognition Rather Than Recall | 3 | +1 | Strip does its job — a visitor names one post without scrolling. Shipped row still demands recall: name + two tags, tagline 1,600px away. |
| 7 | Flexibility and Efficiency | 2 | −1 | Accelerators exist but are incomplete: no keyboard route to the chat, seed chips vanish permanently once used or once an error fires. |
| 8 | Aesthetic and Minimalist Design | 3 | = | Composition genuinely handsome, type discipline real. Cost: 11 interactive targets in the first viewport plus a bubble rewriting itself through 14 lines. |
| 9 | Error Recovery | 2 | = | No retry anywhere. Suggestions hidden on error. Network-failure path leaves the bubble frozen on "Thinking…" permanently. |
| 10 | Help and Documentation | 3 | = | Hint at 11.2px always visible; three seed questions document the bot's scope. Nothing explains `⚑ GUARD BOT`. |
| **Total** | | **24/40** | **+1** | **Acceptable (60%)** |

## Trend

| Run | Score | Method |
|---|---|---|
| 2026-08-22 17:20 | 29/36 (81%) | ⚠️ degraded, single-context — inflated |
| 2026-08-22 19:45 | 23/40 (58%) | dual-agent — real baseline |
| 2026-08-23 (this) | **24/40 (60%)** | dual-agent |

Essentially flat. The composition changed completely: every point lost at baseline to focus, floors, landmarks and detector drift has been recovered, and an equal number of points is now lost to chat interaction and undefined vocabulary — problems that were always present but were never exercised this hard.

## Design Specificity Verdict

**Specific, and the rebuild did not dilute it.** The Picture House vocabulary is load-bearing rather than decorative, the three-voice type split is enforced, the klein print offset reads as out-of-register printing rather than a drop shadow, and the paper→klein→acid→ink scroll is the page's actual structure. A said the brief *undersells* the rest of the hero and *overstates* the avatar's necessity.

Two exceptions: `.cta-strong` is the most templated element on the page — a solid klein rectangle where DESIGN.md's only sanctioned button component is `link-pill`, and where the contact section implements exactly that pill for the identical mailto. And the proof strip's form (kicker/title/meta) is generic, surviving on house nouns and Anton uppercase.

**Deterministic scan (B):** landing page **2 findings** — one em-dash advisory, one `design-system-color` on the skip link that is a **false positive** (the link is off-screen until `:focus`, so the scanner resolves it against no painted ground). Down from 10 findings / 1 non-advisory at baseline. Sitewide: 59, dominated by advisory colour/size drift.

**Measured (B):** 30 interactive elements, **28 carry a matching `:focus-visible` rule** (was 5 of 26). Zero functional text under 11px at 1280/375/320. Chat input **16px** at all three. **Zero horizontal overflow** at all three, confirmed with `overflow-x` forced visible. Exactly one `<main>` with `id="main"`; `<nav>` **outside** it; skip link present and **first focusable in DOM order**. Zero console errors, zero failed requests. Every hero text pair passes WCAG AA; lowest is `.avatar-hint` at 4.83:1.

## Verified Bugs

1. **In-flight submissions are swallowed silently.** B stubbed a 3s request and fired a second submit: `.msg` count 6→6, zero network requests, `input.disabled === false`, `button.disabled === false`, no `aria-busy`, no bubble change. The text is preserved (the earlier fix works) but nothing tells the user the submit was rejected. The fix shipped earlier this session solved half the problem.
2. **The network-failure path freezes the speech bubble on "Thinking…" permanently.** The `catch` branch removes the pending line, appends the error, and calls `setPose('idle')` — but never calls `bubbleSay()`. Confirmed still reading "Thinking…" 8 seconds later. The chat log says the request failed; the avatar simultaneously claims it is still thinking. The `setPose('no')` freeze fixed earlier was the pose half of this bug; the bubble half was missed.
3. **Closing the chat drops focus to `<body>`.** `closeChat()` sets `chat.hidden = true` and calls `startRotation()` — no `btn.focus()`. A keyboard user loses their place and must re-tab from the skip link.
4. **The avatar button has no focus outline.** Two rules style its *descendants* on `:focus-visible`; nothing targets the button. It falls back to the UA default ring while every neighbouring control has a custom klein or ink ring.
5. **`.nav-links a:focus-visible` matches zero elements** — dead rule shipping from the unused Nav bar variant. Unchanged since baseline.
6. **`<h2>LET'S<br />TALK</h2>` yields the accessible name `LET'STALK`.** No word break.
7. **Tap targets:** `.cta-weak` and `.cta-ghost` are 22px tall at 375 — under the 24px WCAG 2.5.8 minimum. Three `.arm-all` links are 18–20px.

## False Positives (named so they are not chased)

- `design-system-color` on `SKIP TO CONTENT` — off-screen element resolved against no ground.
- `.msg.bot a:focus-visible` matching zero — those nodes are runtime-injected by the chat.
- A naive DOM-ancestor contrast walk reports the five corner nav links at **1.09:1**. Wrong. `elementsFromPoint` shows the real paint stack lands on `header.launch` (paper). Actual **15.41:1**. Any tool that walks the DOM rather than the paint stack will flag these falsely.
- `.blink` keyframe unguarded for reduced motion — matches zero elements on this page.

## Priority Issues

- **[P1] The chat has no busy state.** A dead control on the one element the page asks visitors to trust. Fix: disable input and button while `busy`, swap `→` for a mono `…`, set `aria-busy="true"`, re-enable in the existing `finally`. Suggested command: `/impeccable harden`
- **[P1] No recovery path on error.** `showSuggestions()` is gated behind `res.ok`, so a failure hides the only affordances left. No retry anywhere. Plus the frozen-bubble bug above. Fix: move `showSuggestions` out of the `res.ok` guard, add a `Try again` control, call `bubbleSay()` in the `catch`. Suggested command: `/impeccable harden`
- **[P1] The hero's primary CTA contradicts the site's own button language.** Klein rectangle vs the `link-pill` DESIGN.md sanctions and the contact section implements — same destination, two products. Fix: klein-filled pill in the hero (7.77:1 already measured), acid pill in contact. Suggested command: `/impeccable polish`
- **[P2] Chat panel opens below the fold and dumps focus on close.** Opening grows `.launch` 720→861px, forces a 76px scroll that clips the wordmark, lands the input flush at y=720. Fix: `scrollIntoView` on open, `btn.focus()` on close. Suggested command: `/impeccable layout`
- **[P2] Mobile tap targets and bottom-corner collision.** 22px CTAs; corner nav sits 4px below `.cta-ghost` at 320. Fix: vertical padding on the text CTAs, bottom padding on `.launch` under 700px height. Suggested command: `/impeccable adapt`

## Persona Red Flags

**Recruiter, 13" laptop, 20 seconds.** Passes the core test — names one post and one project without scrolling. But `SHIPPED / DINJURE / GAME · SOCIAL` cannot tell them whether this is a toy or a product, and clicking it leaves the site in a new tab with no marker at the exact moment they were evaluating it. `⚑ GUARD BOT` sits above the wordmark meaning nothing.

**Keyboard / screen-reader user.** Skip link and landmarks now work. But Escape dumps focus to `<body>`; the most prominent control on the page has no custom focus ring; the three section slates are `div`s so there are **no section headings at all**; and `.chat-log:empty { display: none }` means the `aria-live` region is `display: none` at the instant the first message is inserted.

**Mobile visitor from a shared link.** Evidence and primary CTA above the fold at 320 — the hardest requirement, met. Two of three hero actions are 22px tall. `↓ ROLL FILM` sits below the fold on short phones.

## Minor Observations

- Five raw hexes remain outside tokens: `#6b675d`, `#6a655c`, `#2a3200` (×2), `#ffe9e4`, `#7a2718`.
- `.reveal { opacity: 0 }` has a reduced-motion escape but no no-JS escape; after a jump-scroll B measured 8 of 10 `.reveal` elements still without `.in`.
- The bubble truncates replies at 46 chars mid-word.
- Clicking the avatar while the chat is open advances the speech line instead of closing.
- Avatar `.webp` frames are requested twice on load and re-fetched on each pose cycle in dev.
- Reduced motion: every rule that actually moves something is guarded; verified `getAnimations().length === 0` under reduce.
