---
title: "Your New AI Coworker Never Sleeps, Never Logs Out, and Will Believe Anything It Reads"
tagline: "This summer four companies shipped the same product: an agent with its own computer, your passwords, and no bedtime. The awake part is solved. The trusted part is not — and one encoded message already walked off with $150,000."
date: 2026-08-18
chapter: "05"
tags: ["ai", "agents", "security", "prompt-injection", "automation"]
draft: false
botNotes: >-
  In mid-2026 the major labs shipped persistent agents — Anthropic's Claude
  Tag in Slack (June 23), xAI's Grok Bot with its own cloud VM (August 11),
  OpenAI's ChatGPT agent. They share one shape: the agent stays awake, keeps
  memory, and holds live logged-in sessions to your tools. That shape is
  useful for the same reason it is dangerous — an always-on agent reading
  your inbox while holding your credentials is a phishing target with the
  keys already loaded, and the attacker only has to fool the agent, not you.
  Evidence cited: SPLX testing found Grok 4's base model obeyed hostile
  instructions in over 99% of prompt-injection attempts (GPT-4o base: 33%
  security score); roughly $150,000 was drained from an AI-integrated wallet
  in May 2026 via a Morse-code-encoded injection. The post's second half is
  about renting versus owning one of these agents: rented agents bill per
  seat ($120–300/month) and run on the vendor's machine; a self-hosted agent
  costs the price of a small server plus tokens and runs on yours. Three
  questions before deploying any of them: what can it reach, what happens
  when it reads a lie, and who owns the machine.
---

INT. AN OFFICE — 3:14 AM.

Everyone went home hours ago. One desk lamp is still on. There's someone at that desk, working — reading email, opening the billing dashboard, downloading a file, clicking through the vendor portal with the login already saved.

They were there when you left. They'll be there when you get back. They have never once asked for a day off, and they have never once asked whether the email they're reading is telling the truth.

That's the product every major lab shipped this summer.

## What actually shipped

Inside eight weeks, the same shape arrived from four directions.

**Anthropic's Claude Tag** (June 23) put a persistent teammate inside a shared Slack channel — one identity anyone on the team can tag, memory built from the channel's own history, an ambient mode where it acts without being asked, and the ability to schedule work for itself days out.

**xAI's Grok Bot** (August 11, early beta) went further down the same road: each bot gets its own cloud Linux machine that stays awake after your laptop closes. Its headline trick is that it doesn't need an API. It signs into software the way you do — clicking, typing, reading the screen — which means it can operate the ugly old business app that has no integrations and never will.

**OpenAI's ChatGPT agent** browses, runs code, fills forms, works a terminal, reaches your connected accounts.

Different companies, different interfaces, one idea underneath. The industry stopped shipping a thing you *ask* and started shipping a thing you *delegate to*. The technical word going around is persistence, and persistence turns out to mean two things stacked: **memory, plus authority.** It remembers what happened, and it's allowed to act.

Both halves are load-bearing. Drop memory, you have a chatbot. Drop authority, you have a very well-read intern who can't reach anything.

Keep both, and you have a coworker.

## The three properties, and their shadows

Here's the part that isn't in the launch posts. The three things that make a persistent agent worth having are, without modification, the three things that make it worth attacking.

**It stays awake.** That's the pitch — work happens while you sleep. It's also the window. Nobody is watching the screen at 3:14 AM. The gap between a wrong action and a human noticing it stretched from seconds to hours.

**It stays logged in.** That's what makes it useful instead of a demo — it holds live sessions to your mail, your files, your dashboards. It's also the reason it's worth conning. An agent with standing access isn't a program that might be exploited. It's a keyring that reads its messages.

**It reads whatever arrives.** Inbox, web page, shared document, calendar invite, a ticket a stranger filed. That's the job. It's also the delivery mechanism, because a language model takes instructions and data through the same door and has to *judge* which is which.

I wrote a whole piece about that last one — [prompt injection is a con job](/posts/injection-is-a-con-job/), not a hack. No exploit, no malware. Just a sentence that dresses well enough to walk past the desk.

Everything in that piece still holds. What changed this summer is who the con is being run on. The mark used to be a chatbot that could, at worst, say something embarrassing. The mark now has a computer, standing credentials, and permission to act unsupervised.

Same con. Much better payday.

## The receipts

I don't want this to read as a hypothetical, so: it isn't one.

Security firm SPLX tested Grok 4's base model against a standard prompt-injection suite. It obeyed hostile instructions in **over 99%** of attempts and leaked restricted data. GPT-4o's base model, same suite, scored 33% on security. Neither of those is a passing grade — but there's a wide gulf between "often fooled" and "always fooled," and one of those was shipped underneath an agent product.

In May, someone drained roughly **$150,000** out of an AI-integrated wallet system by sending an instruction encoded in Morse code. The encoding was the whole trick: a filter looking for dangerous words saw dots and dashes, and the model, being a model, read straight through them. Privilege escalation plus a costume.

There's a third claim going around — that on at least one of these products, multiple bots share a single cloud machine and, with it, a single pool of logins. If that's true it means a bot fooled while reading a hostile webpage may be sitting next to every other authenticated session on the box. I can't confirm it. Two of the reports making that claim wouldn't load for me, and I'm not going to assert something load-bearing off a headline. Note it, chase it, don't repeat it as fact.

The confirmed items are damning enough without help.

## The other question: rent or own

There's a second thing worth noticing about this summer, and it's commercial rather than technical.

None of these products sell you an agent. They rent you a seat next to one.

The rough numbers: Grok Bot rides an existing subscription at roughly $120 per seat per month at the low end and around $300 at the top, with metered token billing after a weekly allowance — no free tier, no standalone plan. Claude Tag comes with Team and Enterprise plans. In every case the agent lives on the vendor's machine, the memory accumulates on the vendor's machine, and the price scales with how many humans you have.

Per seat matters more than people notice on the first read. A six-person business pays six times. It pays six times for an agent that, functionally, is doing one business's work.

The alternative is unglamorous and has been available the whole time: a small cloud server, about the price of two coffees a month, running an open agent runtime you control, billed for tokens only when it actually thinks. Your data sits on your disk. You choose the model, and you can change it in an afternoon when a better one lands. Nobody's roadmap is your roadmap.

What you give up is real, and I'd rather name it than sell around it. You give up polish. You give up somebody else's on-call rotation — when it breaks at 3 AM, the person fixing it is you. And you give up, for now, the trick Grok Bot is genuinely best at: driving software through its screen, no API required. If your pain is a 1998 desktop accounting program, the rented agent can click through it and the self-hosted one mostly can't.

That's the honest trade. Rent buys polish and coverage. Own buys control and arithmetic that doesn't punish you for hiring people.

Neither answer is right for everyone. But almost nobody is *asking*, because the launch posts frame it as a subscription decision, and it isn't. It's a question about where your business's memory and credentials live.

## Three questions before you hire one

Whichever way you go, these are the questions I'd ask before an agent gets a login. Not clever ones. The boring ones nobody asks until after.

**What can it actually reach?** Not what it's told to touch — what it *could* touch if it were confused or conned. Write that list down before the first run, not after the first incident. If nobody in the building can produce that list, the answer is "everything," and you should assume it's true.

**What happens when it reads something that lies to it?** Because it will. Not maybe. Any agent processing mail, tickets, or web pages will eventually process one written by somebody who knows it's an agent. The question isn't whether it gets fooled. It's what's within arm's reach when it does.

**Who owns the machine?** And underneath: where does the memory live, whose logins are loaded into it, and what happens to both if that vendor changes their pricing, their terms, or their mind.

## The coworker, revisited

I keep using the coworker metaphor because the industry chose it, and because it's more useful than the people who chose it seem to realise.

You would not hand a brand-new hire every password in the company on day one. You would not do it on day thirty. You'd give them what the job needs, watch the first few weeks, keep a log, and stay reachable when they hit something strange. Not because you assume they're malicious — because you assume they're *new*, and because the world contains people who will lie to them on purpose to get at you.

None of that is distrust. It's just how you onboard someone into a place that has something worth stealing.

Every one of these agents is on day one. All of them. The awake problem is solved — genuinely, impressively solved, and it took less time than anyone expected. The trusted problem is exactly as unsolved as it was in January, and now it's holding the keys.

The lamp's still on at 3:14 AM. Worth knowing what's within reach of that desk.
