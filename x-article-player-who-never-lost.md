# X Article — player-who-never-lost

Post via X's Article composer (long-form), not a thread. Same body works as-is for LinkedIn. Cover image: `evidence-card.png` (incident-log hook card) or `public/og/player-who-never-lost.png`. Canonical link at bottom.

**Do not** add detail about how the detection actually works — see `SecondBrain/memory/projects/dinjure.md`.

---

## One of Our Players Never Lost. That Wasn't Skill — It Was Our Bug.

One of our players had a 100% win rate for weeks. Turns out that wasn't skill. That was our bug.

Dinjure is a daily number-guessing game — one secret code, everyone in the world gets the same one, fewest guesses and fastest time wins. He was solving it in one guess, zero milliseconds, day after day. The code wasn't guessed. It was read — straight out of our own app's public JavaScript.

We'd generated the daily secret with a formula, and that formula shipped to every browser, sitting there for anyone who opened dev tools. He opened dev tools. We'd been handing out the answer key with the exam, in tiny print, for months. A sweep of the history turned up eight more suspiciously perfect solves going back weeks — some of those were probably us testing at launch, some of them weren't.

**The fix:** stop letting the player's device know the answer. The secret is now picked at random, kept on our machines, and when you guess, your device has to ask us whether you're right. It used to grade its own homework and report the score. Now it hands the paper in.

Case closed. We thought.

Weeks later, the same name reappeared — solving in three guesses, every day, which is suspiciously good but not impossible-good. He'd found something better, and this one didn't touch our secret at all.

When you finish the daily puzzle, win or lose, we show you the code. Of course we do — you just spent five minutes on it. What we never thought about was how cheaply someone could reach the ending. Our game lets you play without signing up: no email, no password, tap and go. Great for first-timers. Also great if what you want is a disposable identity.

So: open the game in a private window, play as a nobody, blow through the puzzle just to reach the ending, read the code off the screen. Close it. Open the real account. Solve in three. He wasn't beating the puzzle — he was watching a stranger beat it, and the stranger was him.

**How we caught it:** not by finding the trick. By noticing a rhythm. Every day a nameless account finished the puzzle a couple of minutes before his real one did, and his real one always did suspiciously well afterward. Never the reverse. Never a day off. Then came the day that ended the argument: the nameless account *lost* — ran out of guesses, no win, nothing to copy — and three minutes later his real account solved it perfectly anyway. You can be lucky. You can't be lucky *from* a failure.

**The fix:** this one never touches his device at all. It lives entirely on our side, and his game looks exactly like it did yesterday. Scores showing that telltale relationship to a throwaway account quietly stop counting toward rank. No ban, no accusation, no banner. He keeps his stats, his streak, and the game he clearly likes. He just can't be champion with borrowed answers.

And the one thing this article won't tell you is exactly what we look for. Publishing the tripwire is how you teach the next person to step over it.

### What this is really about

Almost nobody reading this runs a puzzle game. But every version of this story shows up wherever people can win something.

**Anything you hand to someone's device, they can read.** Not "a hacker can read" — anyone can, with a button that ships in every browser. If an answer must stay secret, it can't take a trip through the player's computer first, no matter how well you fold it up.

**"Free to try" is also free to abuse.** The second cheat needed no password, no code, no skill — only that we let people play without signing up, which was a deliberate kindness. Any door left open for the shy first-timer is a door someone else walks through fifty times.

**Cheating usually isn't invisible — it's unwatched.** Neither cheat was caught by clever detective work. Both were caught by lining up timestamps and noticing that a coincidence had stopped being coincidental. The pattern sat in our records the whole time. Nobody had looked at that particular column.

**Don't punish when you can simply not reward.** Banning starts an argument, and arguments with anonymous people on the internet are unwinnable and eternal. Quietly not counting a score ends it. Everyone loses slightly less than they wanted to, which is usually what a good fix feels like.

The scoreboard's clean again. For now — which is the only version of "clean" anyone ever actually gets.

Full write-up: https://maystash.xyz/posts/player-who-never-lost/
Play it: https://dinjure.com
