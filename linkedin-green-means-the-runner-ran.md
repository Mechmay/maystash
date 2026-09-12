# LinkedIn — CH.07, green means the runner ran

New. This is the failure catalogue, condensed to the story that anchors it plus
the six patterns. No offer, no CTA, general technical writing, not OBA-adjacent.

**No link in the body.** First comment: https://maystash.xyz/posts/green-means-the-runner-ran/

---

For seven days a scheduler I built logged this, every thirty minutes:

xg_watch succeeded
xg_watch succeeded
xg_watch succeeded

More than three hundred green ticks. The job it reported on, a bot that drafts posts for my X account, did not run once in that window. Zero rows written. Seven days dark.

Nothing was lying. The scheduler's "succeeded" meant I handed the request to the network. It said nothing about whether the other end woke up and did anything. I'd read a sentence about the messenger as a sentence about the message.

I found it sideways, from a spend alarm I'd just built to watch two directions: too much spending, and spending that should be happening and isn't. Its first run flagged the bot silent for 169 hours. Nothing had errored, so there was nothing to catch, and silence doesn't page anyone.

That's when I started a list. It's at thirteen entries now. A few of the others:

A sync script logged "OK" fifty two times running while a stale lock file blocked every commit for four days, because it was written command-and-then-log-success, and the "and" quietly skips the log line the moment the command starts failing.

An OAuth dashboard read "connected" for three weeks while the tokens died every seven days in a mode nobody had noticed they were in.

A project folder looked like a healthy repo in every listing and was a stale copy missing seventeen database migrations. No command errored, because nothing was wrong with the folder. It just wasn't the folder.

And the one I caused this week, pointed the other way: a measurer I wrote reported two live LinkedIn posts as deleted, because LinkedIn omits the reactions section entirely when a post has zero reactions, and my check read the missing section as a missing post. A false red instead of a false green, same root cause: checking a proxy instead of the thing itself.

Six of the thirteen share one shape. The thing reporting success sits one layer above the thing doing the work, and it can only ever tell you that it ran, never that the work happened. The fix is one rule: assert on the artifact the work should produce, a row, a file, a commit, never on the runner's own status.

Three more matter just as much. Alarms get built for spikes, so silence is the failure mode nobody watches for. An error message is a theory about what broke, and theories can be wrong, so confirm the stated cause before you fix it. And a dashboard is a cached claim rendered in the past, worth one real check before you bet anything on it.

None of this needed new tools. It needed one different question asked of the tools I already had: for each thing you rely on, what would it look like if it had quietly stopped a week ago, and would anything in your stack notice?

Full write-up, all thirteen incidents, in the comments.
