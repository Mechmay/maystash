---
title: "We Stopped Chasing the Cheater. We Gave Him a Different Puzzle."
tagline: "Three days ago we said our scoreboard was clean 'for now.' For now lasted a day. Then the game accidentally lied to him — and that accident turned out to be the fix."
date: 2026-08-04
chapter: "M3"
section: "matinee"
tags: ["games", "security", "cheating", "dinjure", "explainers"]
draft: true
---

INT. THE SAME LEADERBOARD — THREE DAYS LATER.

Last week I wrote about the player on our daily puzzle who never lost, and how that was our bug rather than his talent. It ended like this:

> "The scoreboard's clean again. For now — which is the only version of 'clean' anyone ever actually gets."

I meant it as a wry sign-off. It was a schedule. *For now* lasted about a day.

## The trap of catching people

Quick catch-up: everyone in the world gets the same secret code each day. He'd found a way to see it early — [full story here](/posts/player-who-never-lost/) — and our answer was to spot the pattern and quietly stop counting his score.

That worked. Every day. Which sounds like winning.

It isn't. Here's what nobody tells you: **every time you catch someone, you teach them.** He'd adjust. We'd catch the adjustment. He'd adjust again. Each round our rule got longer, and each round he learned the shape of the net by feeling where it wasn't.

That's not security. That's a subscription — and he sets the billing cycle.

## The morning the game lied to him

Then he tried a version of the trick with no account at all. Not even a throwaway. Just an anonymous browser window.

And the game handed him a wrong number.

Not on purpose. Leftover plumbing: the part of our game that works offline still made codes the *old* way, from before we moved the real answer onto our own machines. Nobody signed in ever touches the real puzzle. They're graded against a ghost.

So he spent that morning cracking a code that wasn't the code, carried it triumphantly back to his real account, and posted his worst result in ten days.

We hadn't built a trap. We'd left one lying around. And staring at it, the fix finally got obvious.

## What we resorted to

Stop asking *how do we spot him*. Ask *what is he taking?*

He was taking the ending. Every route he'd found — the answer key, the throwaway account, the anonymous window — was just a cheaper way to reach today's last screen before earning it.

So we stopped guarding the ending and removed it from everywhere cheap.

**Now, if you're not signed in, you play a warm-up round.** A real puzzle. Same rules, same feel. Just not today's ranked one. Scout it all you like, burn ten throwaway accounts on it — at the end you're holding a number that was never the answer to anything.

The ranked daily needs an account you keep. Which is precisely what a disposable identity can't be.

Detection is rent. This was a purchase.

## Why we put it on the screen

The obvious version is a silent decoy: quietly serve suspicious players a fake puzzle, let them waste the morning. We deliberately didn't. It says "warm-up round," in plain words, to everyone.

Partly honesty — our game shows a receipt at the end proving the answer wasn't rigged, and showing that receipt to someone secretly playing a different code makes it a lie.

Mostly arithmetic: **a labelled decoy leaks exactly as much as a secret one, which is nothing.** Knowing "this isn't the real one" tells you zero about the real one. Secrecy bought us nothing; honesty was free. When you find one of those, take it.

## The fix found worse than the cheat

Sorting *real puzzle* from *warm-up* meant checking every place in the game that treats a game as real. Six of them were still counting warm-ups as genuine — including the one that posts the day's best score publicly. We'd have been announcing practice runs as records.

Worse: one spot saved your in-progress guesses by grading them against the **real** answer, even mid-warm-up. That's not a scoreboard bug. That's the exact leak the warm-up round exists to close, sitting quietly in another room. Nobody was exploiting it. Nobody had noticed.

And a stray one, unrelated to cheating: a badly-timed network hiccup could decide you weren't logged in and hand you a blank new identity. Real accounts, wiped mid-session, occasionally, for months.

None of that took cleverness. It took listing every place that answers one question and reading them all.

## Then we emailed it to him

Last move: we told our players what the warm-up round is and why it exists.

The player this was all built for is on that mailing list. He signed up in July.

He got the email too, and that's the point. **A countermeasure nobody knows about can only catch people. One everybody knows about ends the game.** Telling a scout the route is dead beats watching that route forever, and it beats a ban. He can still play every day. He just can't shop for the answer, because the shelf is empty.

## Three things worth stealing

**Ask what's being taken, not who's taking it.** Every hour spent on *who* bought a rule with a shelf life. One hour on *what* bought a fix without one.

**Anything free and unlimited gets used at scale by exactly one person you didn't picture.** Ours was free accounts, offered as a kindness to first-timers. It stayed a kindness. It also became a supply line.

**The audit beats the fix.** The cheat cost us a scoreboard. Going looking for everywhere else the same thing could leak cost an afternoon — and turned up a live hole nobody was even using.

## Is it over?

No, and I'd rather say so than write another confident last line and watch it expire in a day.

One route survives: a determined person can make a throwaway account with a real email in twenty seconds. We could close it. We haven't, because it would punish every genuine new player on day one, and there are far more of them than of him. That's a trade, not an oversight.

So the scoreboard is clean — not "for now" this time, but *along the routes we removed*. Smaller claim. Truer one.

If it breaks again, you get part three.

CUT TO BLACK.
