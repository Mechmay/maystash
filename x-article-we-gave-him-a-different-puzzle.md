# X Article — we-gave-him-a-different-puzzle (follow-up to player-who-never-lost)

Post via X's Article composer (long-form), not a thread. Same body works as-is for LinkedIn — it's the sequel to the CH.M2 piece already posted there and opens by quoting it, so drop it as a follow-up on that original LinkedIn post. Cover image: `public/og/we-gave-him-a-different-puzzle.png`. Canonical link at bottom.

**Do not** add detail about how the detection actually works — no timing windows, no account-shape conditions, no network/IP signals, no strike counts. See `SecondBrain/memory/projects/dinjure.md`. The warm-up round itself is public and labelled in-app, so describing *that* is fine.

---

## We Stopped Chasing the Cheater. We Gave Him a Different Puzzle.

Two weeks ago I wrote about the player on our daily puzzle who never lost, and how that was our bug rather than his talent. It ended like this:

> "The scoreboard's clean again. For now — which is the only version of 'clean' anyone ever actually gets."

I meant it as a wry sign-off. It was a schedule. *For now* lasted about a day.

### The trap of catching people

Quick catch-up: everyone in the world gets the same secret code each day. He'd found a way to see it early, and our answer was to spot the pattern and quietly stop counting his score.

That worked. Every day. Which sounds like winning.

It isn't. Here's what nobody tells you: **every time you catch someone, you teach them.** He'd adjust. We'd catch the adjustment. He'd adjust again. Each round our rule got longer, and each round he learned the shape of the net by feeling where it wasn't.

That's not security. That's a subscription — and he sets the billing cycle.

### The morning the game lied to him

Then he tried a version of the trick with no account at all. Not even a throwaway. Just an anonymous browser window.

And the game handed him a wrong number.

Not on purpose. Leftover plumbing: the part of our game that works offline still made codes the *old* way, from before we moved the real answer onto our own machines. Anyone playing without signing in was never touching the real puzzle at all. They were being graded against a ghost.

So he spent that morning cracking a code that wasn't the code, carried it triumphantly back to his real account, and posted his worst result in ten days.

We hadn't built a trap. We'd left one lying around. And staring at it, the fix finally got obvious.

### What we resorted to

Stop asking *how do we spot him*. Ask *what is he taking?*

He was taking the ending. Every route he'd found — the answer key, the throwaway account, the anonymous window — was just a cheaper way to reach today's last screen before earning it.

So we stopped guarding the ending and removed it from everywhere cheap.

**Now, if you're not signed in, you play a warm-up round.** A real puzzle. Same rules, same feel. Just not today's ranked one. Scout it all you like, burn ten throwaway accounts on it — at the end you're holding a number that was never the answer to anything.

The ranked daily needs an account you keep. Which is precisely what a disposable identity can't be.

Detection is rent. This was a purchase.

### Why we put it on the screen

The obvious version is a silent decoy — quietly serve suspicious players a fake puzzle and let them waste the morning. We didn't. It says "warm-up round," in plain words, to everyone.

Partly honesty: our game shows a receipt at the end proving the answer wasn't rigged, and showing that receipt to someone secretly playing a different code makes it a lie.

Mostly arithmetic: **a labelled decoy leaks exactly as much as a secret one, which is nothing.** Knowing "this isn't the real one" tells you nothing about the real one. Secrecy bought us nothing; honesty was free. When you find one of those, take it.

### The fix found worse than the cheat

Sorting *real puzzle* from *warm-up* meant checking every place in the game that treats a game as real. Six were still counting warm-ups as genuine — including the one that posts the day's best score publicly. We'd have been announcing practice runs as records.

Worse: one spot saved your in-progress guesses by grading them against the **real** answer, even mid-warm-up. That's not a scoreboard bug — that's the exact leak the warm-up round exists to close, sitting quietly in another room. Nobody was exploiting it. Nobody had noticed.

That took no cleverness. It took listing every place that answers one question, and reading them all.

### Then we emailed it to him

Last move: we told our players what the warm-up round is and why it exists.

The player this was all built for is on that mailing list. He signed up in July.

He got the email too, and that's the point. **A countermeasure nobody knows about can only catch people. One everybody knows about ends the game.** Telling a scout the route is dead beats watching that route forever, and it beats a ban. He can still play every day. He just can't shop for the answer, because the shelf is empty.

### Then the fix bit somebody innocent

A week later a player wrote in to say they'd been locked out of their account.

They hadn't. The account was fine — right password, right email, nothing banned. But on their phone the app had asked "is this person signed in?", the question hung, and nothing was watching for an answer that never came. No error. No retry. Just a player who looked, to us, like a stranger.

And there's the bill for everything above: **we had just made "looks like a stranger" mean "give them the warm-up round."** So a real player with a real streak spent their morning on a practice puzzle that counted for nothing. The defence worked exactly as designed. It was aimed at the wrong person.

A second trap sat underneath. They tried a password reset — but on an iPhone the reset link opens the browser, while the game lives in the installed app, and those two don't share a memory. The reset worked perfectly. It just worked *somewhere else*.

Total damage: two phantom games in three weeks. Small. The shape of it is the lesson, and it's the sentence I'd keep if I could only keep one: **the day you make being unrecognised a punishment, every bug that fails to recognise someone becomes a punishment too.**

We fixed it the boring way — give the question a time limit, retry it, and if it still won't answer, *say so on the screen* instead of quietly assuming the worst about somebody. And the ghost from earlier is gone too: a player whose warm-up hasn't arrived yet now gets their guess politely refused, rather than quietly marked against a leftover number that stopped meaning anything back in July.

### Three things worth stealing

**Ask what's being taken, not who's taking it.** Every hour spent on *who* bought a rule with a shelf life. One hour on *what* bought a fix without one.

**Anything free and unlimited gets used at scale by exactly one person you didn't picture.** Ours was free accounts, a kindness to first-timers. It stayed a kindness. It also became a supply line.

**The audit beats the fix.** The cheat cost us a scoreboard. Checking everywhere else the same thing could leak cost an afternoon — and turned up a live hole nobody was even using.

### Is it over?

No, and I'd rather say so than write another confident last line and watch it expire in a day.

It's held for eleven days, which is the longest quiet stretch we've had since this started. That's evidence, not proof — the last time I mistook one for the other, it cost me a sequel.

One route also survives, and we know exactly what it is: a determined person can make a throwaway account with a real email in about twenty seconds. We could close it tomorrow. We haven't, because it would also punish every genuine new player on their first day, and there are far more of them than of him. That's a trade we made on purpose, not an oversight — and now that the warm-up round has already caught one innocent bystander, we're in no hurry to widen the net.

So the scoreboard is clean — not "for now" this time, but *along the routes we removed*. Smaller claim. Truer one.

If it breaks again, you get part three.

---

Part one, if you missed it: https://maystash.xyz/posts/player-who-never-lost/

Full write-up: https://maystash.xyz/posts/we-gave-him-a-different-puzzle/
