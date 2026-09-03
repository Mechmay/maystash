---
title: "I Made My AI Agents Keep Receipts. Here's the Bill — Including the Rows That Say Zero."
tagline: "Six weeks of agents doing real work for a real client, priced in dollars at a real rate card. The method, the number, the four rules that stop the number being a lie, and the month I spent discovering that my own monitors were lying to me in three different directions."
date: 2026-09-03
chapter: "04"
tags: ["ai", "agents", "measurement", "automation", "money"]
draft: true
---

INT. A KITCHEN TABLE — SUNDAY EVENING.

Somebody is about to cancel something. Not because it failed. Because they can't remember it working.

That's how most automation dies. Not caught in a scandal — just quietly unfunded in month three, when the person paying can recall the two times it got something wrong and none of the forty times it didn't. Good work is invisible by design. Invisible things lose budget fights to visible ones.

So in August I made a rule for every agent I build: **it logs every task it does, prices that task in dollars of human labour, and mails the owner the bill on Friday whether the bill is flattering or not.** No ledger, no launch.

Six weeks in, here is the actual output, the method, and the month I spent finding out that my own monitors were lying to me in three different directions.

## The number, up front

One real client. A bookkeeper, drowning in the specific way bookkeepers drown: paper that has to become spreadsheet. Three batches of work over three weeks.

**$1,200 CAD of human labour.** Three priced rows. One row priced at nothing on purpose.

Before you do anything with that number, here's everything wrong with it:

- Every row is `basis: estimate`, not `measured`. I haven't yet timed a human doing the same job with a stopwatch.
- The rate card was never confirmed with him. I used $40 CAD/hour — the bottom half of the Canadian freelance bookkeeper range — because inventing his rate silently would make the whole ledger fiction.
- **It has not been audited.** The ledger was written by the same session that did the work. That's the exact failure mode I'll describe later, sitting inside my own file, flagged in the file itself.

A number with its own disclaimers attached is worth more than a bigger number without them. That's not modesty. It's that the first number survives being read by the client's accountant.

## What the rows actually say

The biggest single row: 264 paystubs — 24 Word documents, scanned, 2019, seventeen employees — turned into seventeen spreadsheets in the client's own template. About 4,750 individual values, keyed and checked.

The conservative human estimate, rounded *down* at every step: 18 hours. At $40 that's $720.

The interesting part is the arithmetic underneath, because that's the part that's normally hidden:

| Step | Rate used | Time |
|---|---|---|
| Transcribe 264 stubs × ~18 fields | 3 min/stub | 13.0 h |
| Build 17 workbooks to the template | 8 min each | 2.0 h |
| Reconcile three spellings of one employee's name | — | 1.0 h |
| Check each row adds up | 0.5 min/row | 2.0 h |

Three minutes per stub. The published benchmark for a clerk transcribing a comparable line-item document is twelve. I used a quarter of the industry number, deliberately, because I would rather defend $720 forever than defend $2,300 once.

The other side of the same job:

- My hands-on attention: **ten minutes.** One brief, one multiple-choice answer, one read of the output.
- Agent wall-clock: fifty minutes — including three approaches that failed before the fourth worked.
- Compute cost: *a few dollars, not measured.* That's marked as a guess in my own file, and it's a hole. I'll come back to it.

Those three failed approaches cost the client exactly nothing, which is rule three: **the agent's own overhead is never billed as value.** Retries, its own memory upkeep, the writing of the report itself — all zero. If I can't do the job efficiently, that's my problem, not a line item.

## The row worth the most is priced at nothing

Buried in those 264 stubs, the extractor found **80 that contradict themselves.** Line items that don't sum to the stub's own summary box. Net pay printed as `$-`. One employee's deduction wrong in all twenty-four pay periods of the year.

It did not fix a single one. It handed all eighty back in a separate review file.

That row is logged at `value: null`. Not zero — *unpriced*, waiting on one question I have to ask him in his own words:

> "How long would it take you to find those by hand — or would you not have gone looking at all?"

If the honest answer is "I'd never have found them," then the labour saved is genuinely **zero**, and it gets counted somewhere else entirely, under new capability, never inside hours-saved. That's the whole discipline in one question. The temptation is to price the exception-finding at some heroic number, because it's obviously the valuable half. Which is exactly why it's the half most likely to be inflated, and the half a skeptical client will test first.

There's a proof buried in there, too: he had already hand-corrected one of the December stubs the tool flagged, independently, before he ever sent me the file. Same stub. That's the method verifying itself against a human who didn't know he was the control group.

## Four rules, and why each one exists

The ledger's only asset is that it can be believed. Four rules protect that, and each one came from something going wrong:

**One task, one row.** Even if it touched five files. Double-counting is how "$40k a month saved" gets printed and then laughed at.

**Show the failures.** The first batch of that engagement matched **5 of 40 checks.** Twelve percent. It's in the ledger, priced, marked `partial`. A weekly report with no failures in it is a report nobody believes by week four — and they're right not to.

**Cap the estimates.** No task gets more than a couple of hours of assumed human time unless I actually timed a human. Uncapped estimates are just a wish with a dollar sign.

**Nothing grades its own homework.** Monthly, a fresh context — or me, on a different day — reads the ledger against reality and corrects it with *new* rows. Never edits the old ones.

That last one has scar tissue behind it.

## The part where the method eats me

I ran a bot for months that predicted outcomes on a prediction market. Its scoreboard looked good. The scoreboard was a lie, in two ways at once:

It only scored the predictions where it had already decided it disagreed with the market — the most flattering slice available. Ninety-one percent of its guesses were thrown away unscored. And it compared itself to a coin flip, which nothing lopsided can lose to.

Score every prediction instead of the pre-selected ones, and the sample went from 7 to **200**. Benchmark it against the actual market price instead of a coin flip, and the honest answer arrived: over 200 resolutions, it does not beat the price. The bot never touched real money. The measurement is the only reason it didn't.

The bot's real failure wasn't being wrong. Being wrong is fine and cheap. The failure was **a metric that could only return good news.**

So when I say the client ledger is unaudited, I'm not being coy. I know precisely what an unaudited number does, because I have one framed on the wall.

## Then my own monitors lied to me, three different ways in one month

I wrote the section above about a bot with a flattering scoreboard. Then I went looking at my own instruments, and found the same disease everywhere — each instance failing in a *different* direction, which is the part I'd never have predicted.

**Sixteen days of nothing, on schedule, on time.** Three overnight jobs were dying instantly because the operating system quietly refuses to let scheduled tasks read files in one particular folder. Exit code 126, "Operation not permitted," written to a log nobody was reading. That one has an ending, at least: the jobs live on a small server now, outside the folder the OS was protecting, and they've run every night since.

**Green light, nothing happening.** My notes system syncs itself on a schedule. The script did this:

```
git commit -q -m "..." && log "committed"
```

Commit started failing on a stale lock file. And `&&` short-circuits — so the failure printed *nothing at all*, the script sailed past it, the next two steps succeeded by having nothing to do, and the run signed off with `ok`. Result: **52 consecutive "ok" entries across four days, a green status light, and not one thing saved.** Every other writer was blocked by the same lock the whole time.

Two rules fell out of it, and they're the most useful thing in this post:

**Log on the failure branch, not the success branch.** `cmd && log_success` makes a broken run and a skipped run look identical.

**Assert the postcondition, not the return code.** The script now re-checks whether anything actually got saved. That would have caught this on day one, whatever the cause — and it doesn't need me to have predicted the cause.

**The watchdog was in the graveyard it was guarding.** The job whose entire purpose is to flag other jobs as overdue was itself among the dead. So a four-week outage of everything went unreported, while the status files all read plausibly. **A health check may never live inside the thing it checks** — it needs a different alarm clock, a different key, and ideally a different machine. A dead man's switch that shares a failure mode with its subject stays silent at precisely the moment it matters.

**Then the same instrument cried wolf.** A detector read the last forty lines of an append-only log to decide if something was broken. One real failure scrolled through that window for a full day — so runs that *completed successfully* kept reporting themselves dead. **One stale line produced four false alarms and two healthy jobs pronounced dead.** Judge the current run's own output, not a window into history that happens to contain the past.

And a fourth, quieter one: the fix for the first outage had been *written down* five weeks before it was applied. **A documented fix is not an applied fix.** Verify the artifact exists, not that the plan exists.

## The gap I closed, and the one I didn't

Last month I wrote that I didn't know what the compute cost — "a few dollars, probably" — and that *probably* is not a number you can quote anyone.

I've since had to instrument it for a different build, and the real figures are unremarkable in the best way: **$1.07 to render an eight-image carousel, about eight cents to draft the copy, and roughly a dollar a month for the data scraping.** Not the scary number, not the rounding error — just a number, finally, with a decimal point in it.

The client ledger still doesn't have one. That's the honest state: **$1,200 of value against a cost line I can now measure and haven't yet.** I know exactly what that combination is worth, because I've spent this whole post describing what it does to a number.

And the one that isn't closed at all: **the ledger is still unaudited.** Same as when I wrote it. Written by the session that did the work, flagged in its own file, three weeks later and still true.

I'd rather print that sentence again than quietly drop it.

## What the receipts changed

I expected the ledger to be a renewal argument. It is, but that's the least of it.

It's a **kill signal.** Four weeks showing $180 a week of value against a $1,500 retainer is the truth surfacing before the client finds it. Better to reprice than be discovered.

It's a **map.** The row that repeats and prices high is the one worth building properly. The rows that don't repeat were entertainment.

It's a **weekly conversation** nobody has to schedule. The unpriced-tasks question gets answered in the owner's own words, which is the renewal discussion happening without a sales call in sight.

And it's an **immune system.** Every lie in the back half of this post was caught by the same reflex the ledger installs — distrust the instrument, check the postcondition, never let the thing that did the work report on the work. The ledger was built to convince a client. It ended up auditing me.

So it settles the argument the whole industry keeps having in the abstract. Does this stuff actually save anyone anything? I don't have to speculate. I have three rows, a rate I can defend, one row worth nothing until a human tells me otherwise, a twelve-percent failure printed next to a success, four monitors caught lying, and a cost line I'm no longer allowed to guess at.

That's a smaller claim than the ones on the timeline this week.

It's also the only kind that survives contact with someone's accountant.

CUT TO BLACK.
