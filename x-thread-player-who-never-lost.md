# X launch thread — player-who-never-lost

Post as thread from @checkthehash (cross-post/quote from @Dinjuredotcom optional). Hook image on tweet 1: `evidence-card.png` (incident-log card, 1200×675). Link only in last tweet (algorithm buries early links). Post tweet 1, then reply-chain the rest.

**Do not** add any detail about how the detection actually works. The vagueness is deliberate — see `SecondBrain/memory/projects/dinjure.md`.

---

**1/**
One of our players had a 100% win rate for weeks.

Turns out that wasn't skill. That was our bug. 🧵

---

**2/**
Every day our number-guessing game picks one secret code. Everyone in the world gets the same one.

He was solving it in ONE guess. Every single time. Zero milliseconds.

---

**3/**
Here's the part that stings: the code wasn't guessed. It was read.

Straight out of our own app's public JavaScript.

---

**4/**
We generated the secret with a formula. Same formula, shipped to every browser, sitting there for anyone who opened dev tools.

He opened dev tools.

---

**5/**
Swept the history. Found 8 more suspiciously perfect solves going back weeks.

Some were probably us testing at launch. Some weren't.

---

**6/**
Fix: secret moves server-side. Random, generated fresh, checked by code the browser never sees.

The app used to grade its own homework. Now it hands the paper in.

---

**7/**
Case closed. We thought.

---

**8/**
Weeks later — same player, back on the leaderboard, solving in 3 guesses flat, every day.

New trick. Doesn't touch the secret at all.

---

**9/**
Finish the daily and we show you the code. Fair — you just played it.

Nothing stopped how many times you could GET to "finished," though.

---

**10/**
Free account, no signup. Burn a throwaway just to see the answer. Log into the real account. Solve in 3.

He wasn't beating the puzzle. He was watching a stranger beat it — and the stranger was him.

---

**11/**
How we caught it: a nameless account kept finishing right before his. Suspiciously well. Every day. Never the reverse.

---

**12/**
Then the day that ended the argument: the throwaway LOST. Ran out of guesses, nothing to copy.

His real account still solved it perfectly, 3 minutes later.

You can be lucky. You can't be lucky FROM a failure.

---

**13/**
Fix #2 lives entirely in our database — his game looks identical to yesterday.

Scores with that telltale relationship to a throwaway quietly stop counting toward rank.

No ban. He just can't be champion with borrowed answers.

---

**14/**
Not telling you what we look for. Publishing the tripwire is how you teach the next person to step over it.

---

**15/**
Lesson from both rounds: anything you hand to someone's device, they can read. Not "a hacker" — anyone, with a button that ships in every browser.

And "free to try" is also free to abuse.

---

**16/**
Neither cheat was caught by clever detective work. Both were caught by lining up timestamps and noticing a coincidence had stopped being coincidental.

Cheating usually isn't invisible. It's unwatched.

---

**17/**
Scoreboard's honest again. For now — the only version of "clean" anyone gets.

Full story: https://maystash.xyz/posts/player-who-never-lost/
Play it: dinjure.com
