# LinkedIn — CH.04, the agent value ledger ("receipts")

⚠️ **TWO GATES BEFORE THIS GOES OUT:**
1. The blog post `src/posts/receipts.md` is still `draft: true` — not live. No link target yet.
2. **WFG OBA.** This post markets paid AI services work (client engagement, dollar value delivered, retainer pricing). Vault rule: prior WRITTEN OBA approval required before ANY public marketing of the AI business. Confirm the approval letter is in hand before posting.

Link once live: https://maystash.xyz/posts/receipts/
Image: `public/og/receipts.png` (generate with `node scripts/og.mjs` after flipping the draft)

---

Three of my AI agents ran for sixteen days doing absolutely nothing.

On schedule. On time. Zero output.

The operating system had quietly refused to let them read one particular folder. Exit code 126, "Operation not permitted," written to a log nobody was reading.

I only caught it because I make every agent I build keep receipts.

The rule: **it logs every task it does, prices that task in dollars of human labour, and mails the owner the bill on Friday — whether the bill is flattering or not.** No ledger, no launch.

Three months in, here's what the receipts actually say.

**$1,200 CAD of human labour, one client, three rows.** One of them priced at zero on purpose.

The biggest row: 264 scanned paystubs — 24 documents, 17 employees, roughly 4,750 individual values — turned into 17 spreadsheets in the client's own template. Conservative human estimate, rounded *down* at every step: 18 hours.

My hands-on attention: ten minutes.

But the part I actually care about is that everything wrong with that number is written next to it:

→ Every row is an estimate, not a measurement. I haven't timed a human doing the same job with a stopwatch.
→ The rate was never confirmed with the client. I used the bottom half of the market range deliberately — I'd rather defend a smaller number forever than a bigger one once.
→ It hasn't been audited. The ledger was written by the same session that did the work, which is precisely the failure mode I'm about to describe.

**And the row worth the most is priced at nothing.**

Buried in those 264 stubs, the tool found 80 that contradict themselves. Line items that don't sum to the document's own summary box. Net pay printed as a dash. One employee's deduction wrong in all 24 pay periods of the year.

It fixed none of them. It handed all 80 back in a separate review file.

That row is logged as *unpriced* — waiting on one question I have to ask him in his own words:

*"How long would it take you to find those by hand — or would you not have gone looking at all?"*

If the honest answer is "I'd never have found them," then the hours saved are genuinely zero, and it gets counted somewhere else entirely, under new capability, never inside hours-saved.

That's the whole discipline in one question. The temptation is to price the exception-finding at some heroic number, because it's obviously the valuable half. Which is exactly why it's the half most likely to be inflated — and the half a skeptical client tests first.

Why I'm this paranoid about my own numbers:

I ran a prediction bot for months whose scoreboard looked great. It only scored the predictions where it had already decided it disagreed with the market — the most flattering slice available — and it benchmarked itself against a coin flip, which nothing lopsided can lose to.

Score every prediction instead, against the actual market price, and the sample went from 7 to 200 and the honest answer arrived: it does not beat the price.

It never touched real money. The measurement is the only reason.

Its real failure wasn't being wrong. Being wrong is cheap. **The failure was a metric that could only return good news.**

The rest of my gaps, since we're doing receipts:

→ A watchdog cried wolf for three weeks about a job that had never existed. It was reading a status file for a thing nobody ever built.
→ A monitor flagged "these numbers look frozen" and I ignored it for two weeks — because flagging was all it could do. **A detector with no owning action isn't a control. It's a diary.**
→ I still don't know what the compute cost. "A few dollars, probably." Probably is not a number, and you can't quote anyone a monthly price off a probably.

Here's why any of this matters.

Most automation doesn't die in a scandal. It gets quietly unfunded in month three, when the person paying can recall the two times it got something wrong and none of the forty times it didn't.

Good work is invisible by design. Invisible things lose budget fights to visible ones.

So: three rows, a rate I can defend, one row worth nothing until a human tells me otherwise, a 12% failure printed right next to a success, and a cost line I'm no longer allowed to guess at.

Smaller claim than most of what's on this timeline today. Also the only kind that survives contact with someone's accountant.

Full write-up in the comments 👇
