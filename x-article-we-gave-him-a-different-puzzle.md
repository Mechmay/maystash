# X Article — we-gave-him-a-different-puzzle (follow-up to player-who-never-lost)

Post via X's Article composer (long-form), not a thread. Same body works as-is for LinkedIn — this is the follow-up to the CH.M2 piece already posted there, and it opens by quoting it, so post it as a reply/comment link on that original LinkedIn post too. Cover image: `public/og/we-gave-him-a-different-puzzle.png`. Canonical link at bottom.

**Do not** add detail about how the detection actually works — no timing windows, no account-shape conditions, no network/IP signals, no strike counts. See `SecondBrain/memory/projects/dinjure.md`. The warm-up round itself is public and labelled in-app, so describing *that* is fine.

---

## We Stopped Trying to Catch the Cheater. We Gave Him a Different Puzzle.

Three days ago I published the story of a player on our daily puzzle game who never lost — and how that turned out to be our bug, not his talent. It ended like this:

> "The scoreboard's clean again. For now — which is the only version of 'clean' anyone ever actually gets."

I meant that as a wry sign-off. It turned out to be a schedule. *For now* lasted about a day.

This is the sequel, and it has a better ending — because we finally stopped playing detective.

### Previously, in two sentences

Our daily puzzle gives everyone in the world the same secret code. First we accidentally shipped the recipe for that code inside the game itself, so one player could read the answer key off his own screen. We fixed that; he came back with a second trick — burn through the puzzle on a throwaway account, read the answer off the ending screen, then go solve it "properly" on his real account.

### He came back. Then he came back again.

Our answer to trick two was to notice the pattern and quietly stop counting scores that showed it. That worked. It kept working, day after day, which sounds like a win.

It isn't. Here's the thing nobody tells you about catching cheaters: every time you catch someone, you teach them. He'd adjust. We'd catch the adjustment. He'd adjust again. Each round our rule got longer and more specific, and each round he learned a little more about the shape of the net by feeling where it wasn't.

That's not security. That's a subscription. You pay it forever, in attention, and the other person sets the billing cycle.

### The day the game lied to him

Then something funny happened. He tried a version of the trick that skipped signing in altogether — no account at all, not even a throwaway.

And the game handed him a wrong number.

Not on purpose. It was a leftover: the part of our game that works offline still used the old way of making a code, from before we moved the real answer onto our own machines. So a player who never signs in never touches the real puzzle. He grades himself against a ghost.

He spent that morning solving a code that wasn't the code, then carried it back to his real account and posted his worst result in ten days.

We hadn't built a trap. We'd left one lying around. And staring at it, the actual fix got obvious.

### What we resorted to: a real puzzle, just not *the* puzzle

Stop asking *how do we spot him.* Ask *what is he actually taking?*

He was taking the ending. The reveal. Every route he found — the answer key, the throwaway account, the signed-out session — was a different way to reach the last screen of today's puzzle before doing it honestly.

So we stopped defending the ending and removed it from the places he could cheaply reach.

As of this week, if you're not signed in, you play a warm-up round. It's a genuine puzzle — same rules, same feedback, same feel. It just isn't today's ranked one. Everyone signed out gets the same warm-up code, and it has nothing to do with the real answer.

Scout it all you want. Burn ten throwaway accounts on it. At the end you're holding a number that was never the answer to anything that counts.

The ranked daily now requires an account — one you keep, that keeps your streak and your history and your name. Exactly the thing a disposable identity can't be.

That's the whole switch: from catching people after, to there being nothing worth stealing. Detection is rent. This was a purchase.

### We labelled it instead of hiding it

The obvious version of this idea is a silent decoy — quietly hand suspicious players a fake puzzle and let them waste their morning without knowing.

We deliberately didn't. It's called a warm-up round, on screen, in plain words.

The honest reason: our game shows a "provably fair" receipt at the end so you can verify the answer wasn't rigged after the fact. Showing that receipt to someone secretly playing a different code would make it a lie — and that receipt is the entire reason anyone trusts a daily puzzle.

The practical reason: a labelled decoy leaks exactly as much as a secret one — which is nothing. Knowing "this warm-up isn't the real one" tells you zero about the real one. Secrecy bought us nothing and honesty was free. When you find one of those, take it.

### Building the fix found worse things than the cheat

Once we started sorting *real puzzle* from *warm-up puzzle*, we had to check every place in the game that treats a game as real. Six more of them were still counting warm-up games as the genuine article — including one that posts the day's best score to our public account. We'd have been tweeting practice results as records.

Worse, we found a spot where the game saved your in-progress guesses by grading them against the real answer — even during a warm-up. That's not a scoreboard bug. That's the exact leak the entire warm-up round exists to close, sitting quietly in a different room. Nobody was exploiting it. Nobody had noticed it. It had been there the whole time.

Separately, a bug fell out that had nothing to do with cheating: if the network hiccuped at the wrong moment, the game would decide you weren't really logged in and hand you a blank new identity. Real people, real accounts, occasionally wiped mid-session — quietly, for months, with no complaint loud enough to spot in the data.

None of this was found by being clever. It was found by making a list of every place that answers one question, and reading them all. That's the whole technique.

### Then we told everyone. Including him.

The last move was emailing our players to explain the warm-up round in plain language — what it is, why it exists, what changed.

Our mailing list is people who ticked a box asking to hear when things change. The player this was all built for is on it. He signed up in July.

So he got the email too, and that's not an accident. A countermeasure nobody knows about can only catch people. A countermeasure everybody knows about ends the game. Telling a scout the route is dead is cheaper than watching the route forever, and kinder than a ban. He can still play every day. He just can't shop for the answer anymore, because there's nothing on that shelf.

### Five things worth stealing from this

**Ask what's being taken, not who's taking it.** Every hour spent on *who* produced a rule with a shelf life. The one hour spent on *what* produced a fix with none.

**Every detection rule you ship is a lesson you give away.** If the only thing between someone and the prize is your ability to notice, you've signed up for a permanent job.

**Anything free and unlimited will eventually be used at scale by exactly one person you didn't have in mind.** Ours was free accounts, offered as a kindness to first-timers. It stayed a kindness. It also became a supply line.

**A secret defense is only worth building if the secret buys something.** Ours bought nothing, so we put it on screen in plain words and got trust for free.

**The audit is worth more than the fix.** The cheat cost us a scoreboard. Going looking for every place that could leak the same thing cost an afternoon and turned up a live hole nobody was even using — plus a bug that had been silently logging real people out for months.

### Is it over?

No, and I'd rather say so than write another confident closing line and have it expire in twenty-four hours.

There's still a route we know about: someone determined enough can make a throwaway account, with a real email, in about twenty seconds. We could close it. We've chosen not to yet, because it would also punish every genuine new player on their first day, and there are far more of those than there are of him. That's not a technical call, it's a trade, and we made it on purpose.

So: the scoreboard is clean. Not "for now" this time — clean along the routes we removed. A smaller claim, and a truer one.

If it breaks again, you'll get part three.

---

Part one, if you missed it: https://maystash.xyz/posts/player-who-never-lost/

Full write-up of this one: https://maystash.xyz/posts/we-gave-him-a-different-puzzle/
