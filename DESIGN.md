---
name: maystash
description: A technical field notebook — evidence recorded plainly, annotated in blue, occasionally powered.
colors:
  ink: "#0c0c0e"
  bone: "#ece7dd"
  bone-dim: "#a9a49a"
  klein: "#2823f0"
  klein-hot: "#4a45ff"
  acid: "#d8ff3e"
  paper: "#f2ede3"
  paper-2: "#e7e0d2"
  paper-ink: "#17161c"
  paper-dim: "#8a867c"
  paper-mute: "#57534b"
  paper-hi: "#fbfaf6"
  rule: "#2c2c33"
  rule-dim: "#26262b"
  bone-a02: "rgba(236, 231, 221, 0.02)"
  bone-a08: "rgba(236, 231, 221, 0.08)"
  bone-a16: "rgba(236, 231, 221, 0.16)"
  bone-a22: "rgba(236, 231, 221, 0.22)"
  bone-a28: "rgba(236, 231, 221, 0.28)"
  bone-a72: "rgba(236, 231, 221, 0.72)"
  bone-a82: "rgba(236, 231, 221, 0.82)"
  ink-a35: "rgba(12, 12, 14, 0.35)"
  ink-a82: "rgba(12, 12, 14, 0.82)"
typography:
  page-hero:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(3.5rem, 13vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "0.01em"
  home-hero:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(3rem, 12vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.01em"
  contact:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(3rem, 11vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "normal"
  post-title:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  card-title:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  section:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(1.7rem, 4vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "normal"
  plate:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "normal"
  statement:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.01em"
  lead:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  prose:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.22rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  base:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  compact:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  meta:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.08em"
  floor:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  none: "0"
  hairline: "2px"
  sm: "4px"
  md: "8px"
  card: "10px"
  bubble-sm: "12px"
  panel: "16px"
  bubble: "18px"
  pill: "999px"
  dot: "50%"
spacing:
  xs: "0.6rem"
  sm: "0.9rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "4rem"
components:
  link-pill:
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.3rem"
  link-pill-hover:
    textColor: "{colors.acid}"
  nav-link:
    textColor: "{colors.bone}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.acid}"
  product-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.card}"
    padding: "1.8rem 1.6rem"
  paper-plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.none}"
---

# Design System: maystash

## Overview

**Creative North Star: "The Field Notebook"**

maystash reads like a technical logbook kept by someone who writes well. Evidence gets recorded plainly — dated, labelled, ruled off — and the author occasionally annotates in blue. Nothing here is decorated for the sake of decoration; the ornament is the record-keeping itself. Mono labels, dotted rules, and terse specimen cards do the structural work, and long-form prose in a real reading serif does the rest.

The palette runs near-black by default with warm bone text, and the home page interrupts itself with light paper plates — the notebook opened flat under a lamp. Klein blue is the annotation hand: selection, blockquote, title offset, the mark of the author intervening in the record. Acid green is the only thing on the site that looks powered.

Film grain sits over everything at 5.5% opacity. It is incidental atmosphere, not the thesis — it warms the black and keeps the paper plates from reading as pure digital white. Removing it would not break the system; over-emphasizing it would.

**Key Characteristics:**
- Mono micro-labels are the dominant structural device, not an accent
- Dotted and hairline rules carry hierarchy where boxes would in other systems
- Two grounds: ink-default, paper-interruption
- Klein annotates; acid responds
- Flat by decree, with exactly one sanctioned exception

## Colors

A high-contrast ink-and-bone base, interrupted by paper, annotated in one saturated blue and charged by one acid green.

### Primary
- **Klein Annotation** (`#2823f0`): The author's hand in the record. Text selection, blockquote spine, the offset shadow behind the contact title, and the "building" status marker. It is a printed pigment — it never animates, never appears on hover, and never signals interactivity.
- **Klein Hot** (`#4a45ff`): The lifted variant, used only where Klein needs to read against a dark field without muddying.

### Secondary
- **Acid Tally** (`#d8ff3e`): The powered state. Hover, focus, and genuinely-live status. Nothing at rest is acid.

### Neutral
- **Ink** (`#0c0c0e`): The default ground. Near-black with a trace of blue, never pure `#000`.
- **Bone** (`#ece7dd`): Body text and default foreground. Warm off-white — the paper colour of an aged notebook, not screen white.
- **Bone Dim** (`#a9a49a`): Metadata, footer credits, secondary prose, table headers.
- **Paper / Paper 2** (`#f2ede3` / `#e7e0d2`): The light plates on the home page. The notebook laid open.
- **Paper Ink** (`#17161c`): Foreground on paper plates.
- **Rule** (`#2c2c33`): Hairline and dotted dividers, pill borders. Structural, never decorative.

### Named Rules

**The One Volt Rule.** Acid has exactly three sanctioned roles, and no fourth is granted without amending this file:
1. **Response** — hover and focus states on ink grounds.
2. **Live status** — tally dots and the logo's blinking cursor. A page legitimately listing three live projects shows three acid dots; that is the rule working, not failing.
3. **Emphasis** — exactly one word per page tagline (`.ph-tagline em`).
4. **Index marks** — the specimen numbering that opens a row: `CH.05` on `/writing`, `01` on `/projects`. The Field Notebook's cataloguing hand, and the only thing giving the index column presence.
5. **Row CTAs** — `WATCH →` and `VISIT →`. Constant markers, acid at rest and acid through the klein fill (7.07:1). The row carries the hover response; the CTA does not need to.

Roles 4 and 5 are paired across both reel pages and must never diverge.

Coverage stays under ~5% of any screen. The test is roles and area, not element count: acid on something that is none of these five is the violation.

**The Two Hands Rule.** Klein is printed; acid is electric. Acid appears only in response to the reader (hover, focus) or on genuinely-changing data. Nothing is acid merely because it is important. A colour that both decorates and signals does neither job.

**The Ground Decides Rule.** Which accent carries the response is set by the ground, not by preference — the contrast leaves no choice. On **ink**, acid responds (17.02:1) and Klein is unusable as a foreground (2.41:1). On **paper**, Klein responds (6.95:1) and acid is invisible (1.02:1). This is why the landing page's corner nav hovers Klein while every ink page hovers acid: same rule, different ground. Klein-hot on ink reaches only 3.34:1, so it is legal for non-text marks (a status dot) and illegal for small text.

**The Never-Black Rule.** The ground is `#0c0c0e` and the foreground is `#ece7dd`. Pure `#000` and pure `#fff` do not appear in this system.

## Typography

**Display Font:** Anton (sans-serif fallback)
**Body Font:** Newsreader (Georgia, serif fallback)
**Label/Mono Font:** Space Mono (monospace fallback)

**Character:** A three-voice pairing that maps directly onto the notebook metaphor: Anton is the stamped heading, Newsreader is the written entry, Space Mono is the pre-printed field label. Each voice owns a job and never borrows another's.

### Hierarchy
- **Display** (400, `clamp(3rem, 12vw, 7rem)`, 0.9): Page-owning statements — hero, contact. Uppercase. One per screen.
- **Headline** (400, `clamp(1.7rem, 4vw, 2.6rem)`, 1.06): Section and card titles, in-prose `h2`. Uppercase.
- **Title** (400, `2rem`, 1): Product-card titles at fixed size. Uppercase.
- **Body** (400, `1.125rem`, 1.6): All long-form prose. Newsreader at 1.125rem is the reading default; italics carry taglines and asides.
- **Label** (400, `0.72rem`, `0.08em`, uppercase): Mono micro-labels — dates, kickers, table headers, nav, status. The system's connective tissue.

### Named Rules

**The Label Floor Rule.** No functional text renders below 11px at any viewport — links, buttons, labels, hints, meta rows, all of it. The token is `--step-floor` (0.7rem / 11.2px); it exists so the floor has a name you can reach for instead of a number you have to remember. Contrast and size fail independently: fixing one is a half-fix, and a control at 4.8:1 and 9.9px is still unusable.

**The Three Voices Rule.** Anton stamps, Newsreader writes, Space Mono labels. A heading never runs in Newsreader; body copy never runs in Anton; a date never runs in anything but mono.

**The Short Shout Rule.** Uppercase belongs to display type and mono labels. It is legitimate on headings of any length, because Anton is a display face — but a passage of running body copy never goes uppercase.

## Layout

A centred single-column measure over a full-bleed ground. Containers cap at `1200px`; prose caps far tighter (`52rem` for wide statements, `36rem` for contact copy) so line length stays readable. Vertical rhythm is carried by generous section padding (`4rem 2rem 3rem` in the footer) and by rules rather than by boxes.

The home page alternates ground: dark ink sections interrupted by full-bleed light paper plates. That alternation *is* the page structure — there is no card grid doing that job.

Breakpoints observed: `720px` (nav collapses from absolute-centred to inline flow) and `400px` (nav gap tightens). Motion honours `prefers-reduced-motion` completely — grain, reveal, and smooth scroll all disable.

### Named Rules

**The Rule-Not-Box Rule.** Hierarchy comes from hairlines, dotted borders, and whitespace. Reach for a `border-bottom: 1px dotted` before reaching for a container with a background.

## Elevation & Depth

This system is **flat**. Depth comes from tonal ground changes (ink → paper), hairline borders, and the grain overlay — not from shadows. There is no ambient elevation vocabulary, no hover lift via shadow, no layered card stack.

Exactly one shadow is sanctioned, plus one typographic offset.

### Shadow Vocabulary
- **Tally glow** (`--glow-tally`, `0 0 8px var(--acid)`): Reserved exclusively for status dots representing *genuinely live, currently-changing* state. It is the on-air light. Not available to buttons, cards, inputs, or focus rings.
- **Print offset, text** (`--shadow-print`, `0.03em 0.03em 0 var(--klein)`): Display type. A registration-misalignment effect, not a glow.
- **Print offset, box** (`--offset-print-sm` / `--offset-print-lg`, `4px 4px 0` / `5px 5px 0 var(--klein)`): The same device on surfaces — the landing page's raised bubbles and panels. **Zero blur is the whole point.** A blurred version would be an elevation shadow, which this system does not have.

### Named Rules

**The Tally Light Rule.** The acid glow means "this is live right now." Applying it to anything static is a lie told in CSS. If the dot's state can't change while the reader is looking at it, it does not get the glow. "Building" and "archived" are states, not signals: they take their colour flat, with no halo.

**The Flat-Everywhere-Else Rule.** Outside the tally light and the two print offsets, this system has no shadows. Hover states change colour and border, never elevation.

**The Zero-Blur Rule.** Every shadow in this system except the tally glow has a blur radius of `0`. Blur reads as physical elevation; hard offset reads as ink printed slightly out of register. The second is the system, the first is not.

## Shapes

Two form languages coexist by role. **Plates are hard-edged** — full-bleed paper sections carry no radius at all, because they are sheets, not cards. **Interactive objects are pilled or softly rounded** — `999px` on links and status chips, `10px` on product cards, `16px` on panels, `18px` on chat bubbles, `50%` on dots and the avatar.

Borders are hairline (`1px`) and low-contrast (`#2c2c33`, or `rgba(236,231,221,0.28)` on dark cards). Dotted borders appear on the footer credit rows and read as notebook ruling.

### Named Rules

**The Sheet Rule.** Anything that spans the full viewport is a sheet and takes no corner radius. Radius signals "this is an object you can act on."

## Components

### Navigation
Fixed, full-width, `mix-blend-mode: difference` so it inverts against whatever passes beneath — the signature move of the site. Two states: **ghost** (blend-difference, invisible chrome) and **slated** (past 72% of viewport height, the logo snaps into an ink chip so it can't mush into prose). Links are mono labels, `0.1em` tracking, bone → acid on hover. Below `720px` the nav drops absolute centring and flows inline.

### Link Pills
Bone text, `1px solid #2c2c33`, `999px` radius, `0.8rem 1.3rem` padding. Hover moves both text and border to acid simultaneously. No background fill in any state, no lift.

### Product Cards
`10px` radius, `1px` translucent bone border, transparent ground, `1.8rem 1.6rem` padding. Anton title uppercase at `2rem`, italic Newsreader tagline beneath in `rgba(236,231,221,0.82)`. Status expressed as a 7px dot plus a mono label — live dots carry the tally glow, idle dots do not.

### Paper Plates
Full-bleed `#f2ede3` sections with `#17161c` foreground, zero radius. Uppercase Anton titles, italic taglines in `#57534b`. They interrupt the dark ground rather than sitting inside it.

### Prose (post body)
Newsreader at `1.22rem`. `h2` in uppercase Anton. Blockquotes carry a `3px` Klein left spine. Code and table headers run mono. Metadata rows are mono at `0.68rem`.

### Footer
Hairline top border. Credit rows are `display: flex` with `justify-content: space-between` and a `1px dotted` bottom — a two-column ledger. Social links reuse the link pill.

## Do's and Don'ts

**The Twin Reels Rule.** `/writing` and `/projects` are the same component wearing different nouns: an index mark, a title, a tagline, a meta row, a CTA. Any change to one is a change to both. The colour of `CH.05` and the colour of `01` are the same decision, and they have already drifted apart once.

**The Honest Fill Rule.** A row that fills with colour on hover is promising a click. It gets that fill only when it actually has a destination — `/projects` gates the fill behind `.is-linked`, and a project with no URL stays flat. The same test governs any future hover affordance: if the gesture implies an action the element cannot perform, the interface is lying.

### Do:
- **Do** reach for a hairline or dotted rule before reaching for a bordered box. See The Rule-Not-Box Rule.
- **Do** keep every functional text size at 11px or above, including mono labels on mobile.
- **Do** use Klein for the site's own structural marks and acid strictly for reader-response and live state.
- **Do** give full-bleed sheets zero corner radius and interactive objects a radius.
- **Do** honour `prefers-reduced-motion` on any new motion — the existing system disables grain, reveal, and smooth scroll completely.
- **Do** cap prose measure (`52rem` wide statements, `36rem` narrow) even when the container is wider.

### Don't:
- **Don't** add a shadow. The tally glow and the Klein print offset are the entire depth vocabulary.
- **Don't** put the acid glow on anything whose state cannot change while the reader watches.
- **Don't** let two acid elements share a screen at rest. Hover states are exempt — only one thing is hovered at a time. See The One Volt Rule.
- **Don't** put Klein on ink or acid on paper as a foreground colour. See The Ground Decides Rule.
- **Don't** use pure `#000` or `#fff`.
- **Don't** set running body copy in uppercase. Headings and mono labels only.
- **Don't** use bounce or elastic easing (`cubic-bezier` with an overshoot past 1). The established reveal curve is `cubic-bezier(0.2, 0.6, 0.2, 1)` — decelerating, no overshoot.
- **Don't** introduce a fourth typeface. Three voices, three jobs.
