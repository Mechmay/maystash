# X Article — agents-need-a-leash

Post via X's Article composer (long-form), not a thread. Paste body below. Cover image: use `public/og/agents-need-a-leash.png`. Canonical link at bottom.

---

## Your AI Agent Doesn't Need More Autonomy. It Needs a Leash With Six Knots.

3:47 AM. An AI agent you set up two weeks ago is awake. You are not. It's on its 214th iteration of a task you vaguely remember describing. It has been wrong since iteration 30. Nobody told it. Nobody defined what "wrong" meant. By morning it will have produced a mountain of confidently formatted garbage, and — this is the part that stings — it will have spent real money doing it.

Nothing in this scene is science fiction. This is the *default outcome* of automating AI work without discipline. The agent didn't fail. You did, two weeks earlier, at setup time — you gave it a motor and no brakes.

The fix isn't smarter models. The fix is a contract. Every recurring AI job — I call them loops — signs the same one before it's allowed to run. Six clauses. Miss one and you're back at 3:47 AM.

### The six knots

**1. A schedule.** Obvious, but the point is explicit: nightly, weekly, monthly — written down, not "whenever it triggers." A loop with a schedule can be audited ("did it fire?"). A loop that fires "sometimes" cannot fail loudly, and things that can't fail loudly fail silently.

**2. One change per round.** The most violated rule in automation. Each iteration changes one variable, so when the result moves, you know what moved it. Let the agent "improve" ten things per run and by round three you're doing archaeology instead of engineering. This is just the scientific method with a cron job — and it's the difference between a loop that converges and a loop that wanders.

**3. A versioned metric.** The loop measures the same thing, the same way, every run. And the metric itself carries a version number — because the day you redefine "success," every prior data point becomes a lie unless you mark the boundary. Week-over-week comparisons are only comparisons if the ruler didn't change. When you must change the ruler, bump the version and never compare across it.

**4. A state file.** Every loop writes to one file: when it last ran, what it did, what's next, what's blocking. Plain text, one file per loop. Two things fall out of this. First, the watchdog trick: if a state file's `last_run` is older than its schedule says it should be, the loop silently died — and now a weekly check can catch silent deaths, which are otherwise invisible by definition. Second, resumability: any fresh session (or fresh agent, or fresh you) can read the file and continue. State that lives only inside a chat session evaporates with the session.

**5. Hard stops — three of them.** A done condition: what does finished look like? If you can't answer, the loop can't either, and "run forever" becomes the accidental spec. A blocked condition: when the loop hits something ambiguous, it halts and writes down the blocker. It does not retry silently — silent retries are how an agent burns a week's budget re-failing the same failure, with total confidence. A budget cap: max tokens, max dollars, max files touched, per run. The cap is not pessimism; it's the price of sleeping while machines work.

**6. An independent verifier.** The clause everyone skips, and the one that matters most: the context that produced the work never grades the work. Ask any model to review its own output, in the same session that produced it — glowing review, every time. Self-critique inflates pass rates the way students grade their own exams. Any loop producing real work-product gets its metric checked by a fresh context or a second agent that sees only the output and the yardstick, never the enthusiasm. This mirrors something the research community keeps rediscovering: evaluation is only meaningful when it's decoupled from generation. Bake that into the plumbing and quality becomes a property of the system instead of a hope.

### The golden rule over all of it

A loop automates a motion you already do manually and well. It never invents a motion.

Automating something you haven't personally done at least a few times means automating your own ignorance — you can't define the metric, can't set the budget, can't recognize "blocked," because you've never seen the terrain. Do the job by hand until it's boring. Boring is the signal it's ready for a loop.

Corollary: loops draft and flag; humans act. An agent that drafts a post is an asset. An agent that publishes one is a liability with your name on it. Keep deletion and publication in human hands — not because models are dumb, but because those two actions are the irreversible ones.

### Cheap models run the loop. Expensive models fix it.

Routine rounds run on the cheapest model that passes the metric. Escalate to the expensive model only on failure or genuine judgment calls. This is the same seniority structure as a good team: interns run the checklist, seniors handle the weird stuff. Running your best model on routine rounds isn't quality — it's burning payroll to do the intern's job. And notice what the metric quietly does here: it's not just quality control, it's a router. Without a versioned metric you can't even know whether the cheap model passes.

### The 20-minute setup

1. Pick a task you've done manually 3+ times and are bored of.
2. Write the contract in one file: schedule, the ONE variable that changes per round, metric + version, the three hard stops.
3. Add the state file with an empty `last_run`.
4. Schedule it. Cron, a scheduled agent task, a calendar block — the mechanism doesn't matter; the contract does.
5. After the first run, verify the output with a fresh context, not the one that did the work.
6. Watch the watchdog: `last_run` too old = silent death = investigate.

Six knots, one golden rule, one routing trick. None require new tools — a text file and a scheduler you already have.

The 3:47 AM scene ends differently now: the loop hit its budget cap at iteration 12, wrote "metric declining two rounds straight — halting, see blocker" to its state file, and went to sleep. Like a professional.

---

Full piece + copy-paste templates: https://maystash.xyz/posts/agents-need-a-leash/
