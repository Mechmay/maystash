# X launch thread — agents-need-a-leash

Post as thread from @checkthehash. One knot per tweet. Link only in last (algorithm buries early links). Post tweet 1, then reply-chain the rest.

---

**1/**
3:47 AM. Your agent is on iteration 214 of a job you vaguely remember describing.

It's been wrong since iteration 30. Nobody told it. By morning: a mountain of confident garbage, paid for with real money.

The agent didn't fail. You did — at setup. 🧵

---

**2/**
The fix isn't a smarter model. It's a contract.

Every recurring AI job I run signs the same one before it's allowed to loop unsupervised. Six knots. Miss one, you're back at 3:47 AM.

---

**3/**
Knot 1 — a schedule, written down. Not "whenever it triggers."

Knot 2 — ONE variable changes per round. Let it "improve" ten things and by round 3 you're doing archaeology instead of engineering.

---

**4/**
Knot 3 — a versioned metric. Same measurement, every run.

Redefine "success" mid-stream and every prior data point becomes a lie — unless you bump the version and mark the boundary.

---

**5/**
Knot 4 — a state file. One file: last run, what happened, what's next, what's blocking.

The watchdog trick: if last_run is older than the schedule says it should be, the loop died silently. Now you can catch a death that's invisible by definition.

---

**6/**
Knot 5 — three hard stops:
• a done condition
• a blocked condition (halts + logs, never retries silently)
• a budget cap — max tokens/$/files, per run

Silent retries are how an agent burns a week's budget re-failing the same failure. Confidently.

---

**7/**
Knot 6 — the one everyone skips: an independent verifier.

Ask a model to grade its own output in the same session that produced it — glowing review, every time. The context that made the work can't be the context that grades it.

---

**8/**
Golden rule underneath all six: a loop automates a motion you already do well by hand. It never invents one.

Corollary: loops draft and flag. Humans publish and delete. Keep the irreversible actions in human hands.

---

**9/**
Cheap model runs the routine rounds. Expensive model only gets called on failure or real judgment calls.

Same seniority structure as any good team — and the versioned metric is what tells you the cheap model still passes.

---

**10/**
20-minute setup, no new tools — a text file and a scheduler you already have:

Full six knots + the setup checklist:
https://maystash.xyz/posts/agents-need-a-leash/

---

## Alt single-tweet version (if not threading)

An AI agent running unsupervised doesn't need more autonomy. It needs a contract.

Six knots: schedule, one variable per round, versioned metric, state file (+ watchdog trick), three hard stops, independent verifier that never grades its own work.

Full breakdown + 20-min setup:
https://maystash.xyz/posts/agents-need-a-leash/

## Reply-guy snippet (drop under "my agent went off the rails" posts)

Classic missing piece: the model that did the work also graded the work. Self-review always inflates — needs a fresh context or second agent that only sees the output and the yardstick. Wrote up the full six-clause contract (schedule, one var/round, versioned metric, state file, hard stops, independent verifier) here: https://maystash.xyz/posts/agents-need-a-leash/
