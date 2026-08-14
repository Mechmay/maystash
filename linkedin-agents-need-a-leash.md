# LinkedIn — CH.02, the six-knot loop contract

The one to post FIRST if the receipts post is gated — this one is already live, and it's the general-audience
version of the same discipline (no client work, no service marketing, nothing OBA-adjacent).

**Put the link in the first comment, not the body.**
Link: https://maystash.xyz/posts/agents-need-a-leash/
Image: `public/og/agents-need-a-leash.png`

---

3:47 AM.

An AI agent you set up two weeks ago is awake. You are not.

It's on iteration 214 of a task you vaguely remember describing. It has been wrong since iteration 30 — nobody told it, because nobody ever defined what "wrong" meant.

By morning it will have produced a mountain of confidently formatted garbage. And spent real money doing it.

That's not a horror story. That's the *default* outcome of automating AI work without discipline.

The agent didn't fail. You did — two weeks earlier, at setup. You gave it a motor and no brakes.

The fix isn't a smarter model. It's a contract. Six clauses, and every recurring AI job I run signs it before it's allowed to run unsupervised:

**1. A schedule, written down.** Not "whenever it triggers." A loop that fires *sometimes* can't fail loudly — and things that can't fail loudly fail silently.

**2. One variable changes per round.** Let it improve ten things at once and by round three you're doing archaeology instead of engineering.

**3. A versioned metric.** Same measurement, same way, every run. The day you redefine "success," every prior data point becomes a lie unless you mark the boundary.

**4. A state file.** When it last ran, what it did, what's blocking. Then the watchdog trick: if the last run is older than the schedule says it should be, the loop died silently — and silent deaths are otherwise invisible by definition.

**5. Three hard stops.** A done condition. A blocked condition that halts and writes down the blocker instead of retrying. And a budget cap. Silent retries are how an agent burns a week's budget re-failing the same failure, with total confidence.

**6. An independent verifier.** The clause everyone skips and the one that matters most: *the context that produced the work never grades the work.* Ask a model to review its own output in the session that produced it and you'll get a glowing review, every time. Self-critique inflates pass rates the way students grade their own exams.

The golden rule over all six:

**A loop automates a motion you already do well by hand. It never invents one.**

Automating something you've never personally done is automating your own ignorance — you can't define the metric, can't set the budget, can't recognise "blocked," because you've never seen the terrain. Do it by hand until it's boring. Boring is the signal it's ready.

And the corollary I'd put on a wall:

**Loops draft and flag. Humans publish and delete.**

An agent that drafts a post is an asset. An agent that publishes one is a liability with your name on it. Not because models are stupid — because those two actions are the irreversible ones.

None of this needs new tools. A text file and a scheduler you already have.

Full breakdown, plus the 20-minute setup, in the comments 👇
