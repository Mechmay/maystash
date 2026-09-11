---
title: "Green Means the Runner Ran. It Never Meant the Work Got Done."
tagline: "For seven days a scheduler told me my job had succeeded, every thirty minutes, while the job did nothing at all. It's one of thirteen times this year a system of mine reported fine while broken. They fail in the same six ways, and none of them throw an error."
date: 2026-09-11
chapter: "07"
tags: ["ai", "automation", "reliability", "monitoring", "security"]
draft: true
cover: true
botNotes: >-
  A catalogue of times May's own systems reported success while broken, and
  the six patterns they share. Lead story: a scheduled job logged "succeeded"
  every 30 minutes for 7 days while doing nothing, because the scheduler's
  "succeeded" only meant the request was queued; it was caught by an alarm that
  watched for silence, not errors. Others: a sync script that logged "OK" 52
  times while a stale lock file blocked every commit for 4 days; an OAuth
  dashboard that read "connected" for 3 weeks while tokens expired every 7 days
  in Testing mode; a folder that looked like a repo but was a stale copy missing
  17 database migrations; an error message that blamed a subscription when the
  real cause was a wrong HOME directory; an unquoted # in a .env file that
  silently truncated a value; and the inverse, a measurer that reported two
  public posts as deleted because LinkedIn hides the reactions block at zero.
  Core rule: a runner reporting success proves the runner ran, never that the
  work happened, so assert on the artifact the work should produce. Practical
  habits: alarm on silence as well as errors, only print success after checking
  the artifact, verify an error's stated cause before fixing it, treat
  dashboards as claims, ask provenance instead of inspecting, and read the
  defaults.
---

INT. A SCHEDULER, EVERY THIRTY MINUTES, FOR A WEEK.

```
xg_watch   succeeded
xg_watch   succeeded
xg_watch   succeeded
```

That line printed every thirty minutes from the last day of August to the seventh of September. More than three hundred green ticks. The job it was reporting on, a bot that drafts posts for my X account, did not run once in that time. It wrote no rows at all. Seven days dark.

Nothing was lying, either. The scheduler was telling the exact truth about the question it answers. Its "succeeded" means *I handed the request to the network*. It says nothing about whether the thing on the other end woke up, did its work, and wrote anything down. I had read a sentence about the messenger as a sentence about the message.

I found it by accident, from the side. I'd just built an alarm to watch API spending, and I'd made it check in two directions: spending too high, and spending that should be happening and isn't. Its first run flagged the bot as silent for 169 hours. Nothing had errored, so there was nothing to catch, and an absence doesn't page anyone.

That was the day I started keeping a list. It has thirteen entries now.

## The list

Six of the thirteen each taught me something the others didn't.

### The sync that said OK fifty-two times

My notes vault syncs itself to a remote every few hours and logs the result. For four days it logged `sync OK`, fifty-two times in a row. For those same four days a stale lock file, left behind by a crashed process, blocked every single commit.

The script was written `git commit && say "committed"`. When the commit started failing, the `&&` skipped the log line, the pull and push that followed had nothing to do and succeeded, and the run finished with `ok`. A broken run and an idle run printed exactly the same thing. Four days of notes existed only on one machine, under a log that said the opposite.

### The dashboard that said connected

My assistant reads my email and calendar through a Google app. The dashboard said `connected`. A local file claimed the credential was valid until the year 5138. Both were confidently wrong for about three weeks. The app was sitting in Google's *Testing* status, which expires its tokens every seven days without telling anyone, and what finally noticed was me asking the assistant to read an email and getting nothing back.

### The folder that looked like a repo

I had a project directory that looked healthy in every listing, with the right names, the right files, the right shape. It was a stale hand-copy with no version control at all: forty-three files against the real project's fifty-nine, missing seventeen database migrations, including the one a live scheduler depends on. No command errored, because nothing was *wrong* with the folder. It just wasn't the folder. Reading the directory would never have shown me that. Asking git for its remote, and getting no answer, did.

### The error that blamed the wrong thing

A service I run failed to start with a crisp message: this feature is only available with a subscription. So I checked the subscription. Fine. I re-authenticated, and it still failed. Three restart cycles later I found the actual cause: a config file pointed the service's home directory at the wrong place, so it couldn't find the credentials it already had. The error message was specific and confident, and it was about something else entirely.

### The character that ate the rest of the line

A secret in a `.env` file contained a `#`. Unquoted, a `#` starts a comment, so everything after it was dropped and the program received half a value. It didn't crash. It produced fluent, well-formatted output that made no sense and looked exactly like the AI model having a bad day. I spent money and an afternoon debugging a model that was doing precisely what it had been given.

### The one I caused this week

I built a measurer that reads how my LinkedIn posts perform. For three days it reported two of them as deleted or private, every thirty minutes. Both were fine and public. LinkedIn leaves the reactions section off a post when nobody has reacted yet, and my check read "no reactions section" as "no post". That's a false red instead of a false green, the same mistake pointed the other way: I was checking a proxy for the post instead of the post.

## The six ways they fail

Line all thirteen up and the shapes repeat. These are the six I now check for by name.

### 1. Green means the runner ran

Six of the thirteen reported success at the layer *above* the failure. The scheduler ran, the sync script ran, the dashboard rendered, and each of them was a messenger reporting on its own delivery. The fix is one rule, and it's the title of this piece: assert on the artifact the work was supposed to produce, never on the runner's status. That artifact might be a row in a table, a file with today's date, a commit on the remote, or a hash that changed.

### 2. Silence is a symptom nobody watches

Alarms are built for spikes: errors, latency, cost blowing up. Three of my worst incidents presented as nothing happening at all, and a healthy quiet system looks exactly the same. If a job should produce something every day, alarm on how long it has been since it last did.

### 3. The error names the wrong cause

Three of the thirteen sent me debugging in the wrong direction, because the stated reason was confidently and specifically wrong. An error message is the system's theory about what broke, and theories can be wrong. Before fixing the cause it names, confirm that cause some other way. It takes a minute and can save an afternoon.

### 4. Inspection lies, provenance doesn't

The fake repo looked perfect to a human reading it, and every check I'd have done by eye would have passed. Ask where a thing *came from* (a git remote, a deploy ID, a checksum) rather than what it looks like.

### 5. The defaults were chosen by someone else

Tokens that die every seven days in a mode nobody told you that you were in. A database that grants every new function to the public by default. An operating system that refuses scheduled jobs access to your Documents folder without a word. Each was working exactly as designed, by a vendor whose idea of a sensible default wasn't mine. Read the defaults of anything you depend on, especially the ones that expire, grant, or refuse.

### 6. A dashboard is a claim

A dashboard is someone's cached summary of the truth, rendered at some point in the past. Treat it the way you'd treat a colleague saying "yeah, it's fine": probably right, and worth one real check before you bet anything on it.

## What I actually changed

Every change below uses tools I already had.

Every scheduled job now names its artifact: what it leaves behind, and where. The bot that went dark for a week has an alarm on the age of its newest row instead of on the scheduler's status column.

Failures get logged on the failure branch, and success waits for the postcondition. The sync script used to speak only on the happy path. Now it alerts when the commit fails, and after committing it re-checks that nothing is left uncommitted. It's a small change, and it would have caught the lock file on day one instead of day four.

Alarms watch for zero as well as for fire. The spending alarm that found the dead bot only worked because it checked both directions: too much, and not enough.

When an error names a cause, I check the cause first. One command, `auth status`, would have told me the credentials were fine before I'd restarted anything.

And a missing signal can mean zero. My own false red is the reminder that this cuts both ways. A missing thing isn't automatically a failure, any more than a green tick is automatically a success. The only honest check is on the thing itself.

![](/art/green-means-the-runner-ran-02.jpg)

## The uncomfortable part

Every one of these systems was built by someone reasonably careful. Several were built by me, after I'd already written about exactly this failure. You don't learn it once and stop making it. It happens by default whenever the thing reporting status sits one layer above the thing doing the work, which in modern software is almost always.

Asking whether anything is broken won't help, because nothing will say it is. Ask this instead, for each thing you rely on: what would it look like if it had stopped a week ago, and would anything in your stack notice?

If the honest answer is "the dashboard would still be green", you already know what to go and check.
