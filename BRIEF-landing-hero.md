# Brief — Landing hero, first viewport

**Surface:** `src/pages/index.astro`, the `.launch` header only.
**Status:** confirmed direction, not yet built. Preview at `/shape-preview/a` (throwaway).
**Origin:** critique P1 — *the first viewport contains no evidence*.

---

## 1. Job and audience

A hiring visitor — recruiter, founder, or prospective client — arrives cold, usually
from a link someone sent them, and gives the page roughly twenty seconds before
deciding whether May is worth a second minute. They are not browsing. They are
checking whether a claim is real.

Readers are the second audience and are already served: they arrive with intent,
scroll without prompting, and `/writing` is one click away. Where the two conflict,
the hiring visitor wins. Nothing in this brief may make the reader's path worse.

## 2. Outcome and proof

The first viewport must answer four questions before any scroll:

| Question | Answered by |
|---|---|
| Who is this? | wordmark |
| What do they do? | one line, no list of adjectives |
| Do they actually write? | newest post, by title, with its date |
| Do they actually ship? | newest live project, by name, linked to the running thing |
| What now? | one primary action |

Success: the visitor can name one thing May wrote and one thing May shipped
without touching the scrollbar.

The proof must be **real and current** — the newest post and a genuinely live
project, resolved at build time from the content collections. Never a hand-picked
pair, never a placeholder, never a metric nobody measured.

## 3. Selected direction

**Proof Strip.** Two-column: identity and evidence on the left, avatar on the right.

- **Visual authority:** unchanged. The Picture House, on the paper ground the
  hero already uses.
- **Structural thesis:** the hero stops being a title card and becomes a
  *programme* — the wordmark says whose picture house, the strip says what is
  showing right now.
- **Focal moment:** the strip's first row. Everything above it is orientation;
  everything below it is action.
- **Implementation consequence:** the avatar loses its monopoly on the screen and
  keeps its character. It is the only element on this page a template cannot
  produce, which is why it survives at roughly a quarter of its current footprint.

Colour follows the ground, not preference:

| Role | Value | Measured |
|---|---|---|
| Ground | `--paper` | — |
| Wordmark | `--paper-ink` + `--shadow-print` (klein offset) | — |
| Response (hover, focus, links, emphasis) | `--klein` | 6.95:1 on paper |
| Live tally dot | `--klein` | non-text mark |
| Primary CTA | `--klein` fill, `--paper-hi` text | 7.73:1 |
| Supporting text | `--paper-mute` | 6.56:1 |

**Acid does not appear in this hero.** On paper it measures 1.02:1. A live-status
dot in acid would be an invisible mark claiming to signal "shipped". See The Ground
Decides Rule.

## 4. Scope and boundaries

**In scope:** the `.launch` header, its markup, styles, and the build-time query
that feeds the strip.

**Untouched:** everything from the marquee down. The colour-blocked scroll
(paper → klein → acid → ink) is the landing page's structure and stays exactly as
it is. `/writing`, `/projects`, `/about` are not part of this work. `Nav.astro`
keeps its `corners` variant unchanged.

**Anti-goals:**

- Do not delete the avatar or the chat. Demotion is the decision; removal is not.
- Do not flatten the block scroll to match the inner pages. The exception is the point.
- Do not turn the hero into a post index — that was variant B, and it serves the
  wrong audience.
- Do not introduce a colour, typeface, radius, or easing curve that DESIGN.md does
  not already sanction.
- Do not put acid anywhere on the paper ground.

## 5. States and ranges

The strip is generated, so it must survive its own content:

| Case | Range today | Required behaviour |
|---|---|---|
| Posts | 8 files, 1 draft → **7 non-draft** | newest by `date`; **zero posts → row omitted, not blank** |
| Projects | 3, and **all three are `live`** | first `live` by `order`; falls back to first project of any status with the kicker reading `IN PRODUCTION` and no tally dot |
| Project `url` | 2 of 3 have one | absent → row links `/projects`; present and external → `target="_blank" rel="noopener"` |
| Post title | **11–16 words observed** | the 16-word title wraps to three lines at desktop; that is the design case, not the edge case |
| Tags | 0–3 | show at most 2; zero tags must not leave a dangling separator |

Two of these branches have **no live content exercising them**: every project is
currently `live`, so the `IN PRODUCTION` fallback and the dropped tally dot have
never rendered. Build them, then force them with a temporary status change before
claiming they work.

**Staleness is a real state.** The strip only reads as proof while the post is
recent. A post six months old, framed as `NOW SHOWING`, advertises neglect. Decide
whether the kicker softens past a threshold or whether the row simply tells the
truth about its date.

## 6. Interaction and layout

- Two columns on desktop; evidence column is the wider one.
- Strip rows are whole-row links. Hover and focus move the title to klein — colour
  change only, no elevation, per The Flat-Everywhere-Else Rule.
- A row fills or responds only when it has a real destination. See The Honest Fill
  Rule.
- The avatar remains a button that opens the existing chat panel. Its hint label
  stays at or above the 11px floor.
- One primary action (`HIRE ME →`) and one secondary (`ALL WRITING`). Not three.
- Reduced motion: the avatar's idle sway and any reveal must respect
  `prefers-reduced-motion`.
- Every interactive element keeps a visible `:focus-visible` outline. The page
  currently has 13 focus rules and zero `outline: none` — that does not regress.

## 7. Constraints and open decisions

**Binding constraints:**

- Astro 5 content collections; strip resolves at build time, no client fetch.
- 11px floor on all functional text, mobile included.
- Three typefaces, no fourth. `cubic-bezier(0.2, 0.6, 0.2, 1)`, no overshoot.
- Every rule in DESIGN.md applies. Where this brief and DESIGN.md disagree,
  DESIGN.md wins and the disagreement is a bug in this brief.

**Open — a builder must not invent these:**

1. **Mobile sequencing.** At ≤720px the grid stacks and the avatar column carries
   `order: -1`, which reopens the exact problem this work exists to close: avatar
   first, evidence below. Smaller avatar, same bug. Needs a decision, not a default.
2. **`HIRE ME →` is a stronger claim than the site currently backs.** No rate, no
   availability, no case study. Either the copy softens to match what exists, or
   something ships behind it. Do not fabricate credentials, clients, or numbers.
3. **`--paper-rule` does not exist.** The live hero spends `#d8d1c2` on paper
   hairlines in three places with no token behind it, plus `#4a4740` (a near-
   duplicate of `--paper-mute`) and `#e2dbcc`. Tokenise before building on them.
4. **DESIGN.md documents how to behave on each ground but never states which
   surface is which ground.** The hero is paper; the inner pages are ink. That gap
   caused a real error during this shape. Record the ground map.
5. **Staleness rule** for the `NOW SHOWING` kicker — see §5.

**Cleanup owed:** `src/pages/shape-preview/` and `src/components/ShapeVariant.astro`
are throwaway and must be deleted before the next deploy.
