# ARTICLE — "Director's cut" of CH.05, coworker-who-never-logs-out
# Works as an X Article AND as a LinkedIn article. One body, two homes.
# Post ~48h after the thread. ~60% of the blog length. Ends pointing at the blog.
# LinkedIn-specific changes listed at the bottom.

⚠️ **GATE:** blog post is still `draft: true`. Publish it first or the closing link 404s.

═══════════════════════════════════════════
TITLE (paste into the title field):
═══════════════════════════════════════════

Your New AI Coworker Never Sleeps, Never Logs Out, and Will Believe Anything It Reads

═══════════════════════════════════════════
COVER IMAGE:
═══════════════════════════════════════════
Upload: https://maystash.xyz/og/coworker-who-never-logs-out.png
(Generate first: `node scripts/og.mjs` after flipping the draft. 1200×630, on-brand.)

═══════════════════════════════════════════
BODY:
═══════════════════════════════════════════

It's 3:14 in the morning and there's someone still at the desk.

They're reading email. They open the billing dashboard, download a file, click through the vendor portal with the login already saved. They were there when you left. They'll be there when you get back. They have never asked for a day off, and they have never once asked whether the email they're reading is telling the truth.

That's the product four companies shipped this summer.

**What actually shipped**

In eight weeks the same shape arrived from several directions.

In June, Anthropic put a persistent teammate inside Slack — one identity anyone on the team can tag, memory built from the channel's own history, a mode where it acts without being asked, and the ability to book work for itself days ahead.

In August, xAI opened the beta of an agent that gets its own computer in the cloud, one that stays awake after your laptop closes. Its headline trick is that it doesn't need a connection to your software at all. It signs in and clicks, the way a person does, which means it can operate the ugly old business program that has no integrations and never will.

OpenAI's agent browses, runs code, fills forms, works a terminal, reaches your connected accounts.

Different companies, one idea underneath. The industry stopped shipping a thing you *ask* and started shipping a thing you *delegate to*. The word going around is persistence, and it turns out to mean two things stacked: memory, plus authority. It remembers what happened, and it's allowed to act.

Both halves are load-bearing. Take away memory and you have a chatbot. Take away authority and you have a very well-read intern who can't reach anything. Keep both and you have a coworker.

**The three properties, and their shadows**

Here's the part that isn't in the launch posts. The three things that make a persistent agent worth having are, unmodified, the three things that make it worth attacking.

*It stays awake.* That's the pitch — work happens while you sleep. It's also the window, because nobody is watching the screen at 3:14 AM. The gap between a wrong action and a human noticing it just stretched from seconds to hours.

*It stays logged in.* That's what makes it useful instead of a demo: it holds live sessions into your mail, your files, your dashboards. It's also the reason it's worth conning. An agent with standing access isn't a program that might be exploited. It's a keyring that reads its own mail.

*It reads whatever arrives.* Inbox, web page, shared document, calendar invite, a ticket a stranger filed. That's the job. It's also the delivery mechanism, because a language model takes instructions and information through the same door and has to judge which is which.

I've written before about why that last one is a confidence trick rather than a hack. No exploit, no malware, just a sentence dressed well enough to walk past the front desk. All of that still holds. What changed this summer is who the con gets run on. The mark used to be a chatbot that could, at worst, say something embarrassing. The mark now has a computer, standing credentials, and permission to act unsupervised.

Same con. Much better payday.

**The receipts**

I don't want this read as hypothetical, so: it isn't one.

A security firm tested one of these base models against a standard suite of instructions hidden inside text it reads. It obeyed the hostile instruction in more than 99% of attempts and leaked restricted data. A rival model on the same suite scored around a third. Neither of those is a passing grade, but there's a wide gulf between "often fooled" and "always fooled," and one of them shipped underneath an agent product.

In May, someone drained roughly $150,000 out of an AI-connected wallet by sending an instruction encoded in Morse code. The encoding was the whole trick. A filter watching for dangerous words saw dots and dashes and waved it through, and the model, being a model, read straight through the costume.

There's a third claim circulating — that on at least one product, multiple bots share a single machine and, with it, a shared pool of logins. If true, a bot fooled while reading a hostile web page is sitting next to every other authenticated session on that box. I can't confirm it. Two of the reports making the claim wouldn't load for me, and I'm not going to assert something load-bearing off a headline. Note it, chase it, don't repeat it as fact.

The confirmed items are damning enough without help.

**Rent or own**

There's a second thing worth noticing about this summer, and it's commercial rather than technical.

None of these products sell you an agent. They rent you a seat next to one.

Roughly: $120 per seat per month at the low end, around $300 at the top, metered token billing after a weekly allowance, and in most cases no standalone plan at all. The agent lives on the vendor's machine. The memory accumulates on the vendor's machine. The price scales with how many humans you employ.

Per seat matters more than people notice on first read. A six-person business pays six times, for an agent that is functionally doing one business's work.

The alternative is unglamorous and has been sitting there the whole time: a small cloud server for about the price of two coffees a month, running an open agent runtime you control, billed for tokens only when it actually thinks. Your data on your disk. Your choice of model, changeable in an afternoon when a better one lands.

What you give up is real, and I'd rather name it than sell around it. You give up polish. You give up somebody else's on-call rotation, because when it breaks at 3 AM the person fixing it is you. And you give up, for now, the trick the rented agent is genuinely best at: driving software through its screen with no integration required.

Rent buys polish and coverage. Own buys control, and arithmetic that doesn't punish you for hiring people. Neither is right for everyone. But almost nobody is *asking*, because the launch posts frame it as a subscription decision — and it isn't. It's a question about where your business's memory and credentials live.

**Three questions before you hire one**

Not clever ones. The boring ones nobody asks until afterwards.

What can it actually reach? Not what it's told to touch, but what it *could* touch if it were confused or conned. Write that list before the first run. If nobody in the building can produce that list, the answer is "everything."

What happens when it reads something that lies to it? Because it will. Any agent processing mail, tickets or web pages eventually processes one written by somebody who knows it's an agent. The question isn't whether it gets fooled. It's what's within arm's reach when it does.

Who owns the machine? And underneath that: where the memory lives, whose logins are loaded into it, and what happens to both if that vendor changes their pricing, their terms, or their mind.

**The coworker, revisited**

I keep the coworker metaphor because the industry chose it, and because it's more useful than the people who chose it seem to realise.

You would not hand a brand-new hire every password in the company on day one. You'd give them what the job needs, watch the first few weeks, keep a log, and stay reachable when they hit something strange. Not because you assume they're malicious, but because you assume they're *new* — and because the world contains people who will lie to them on purpose to get at you.

Every one of these agents is on day one. All of them.

The awake problem is solved. Genuinely, impressively solved, and faster than anyone expected. The trusted problem is exactly as unsolved as it was in January, and it's now holding the keys.

The full version, including the parts I cut here, is on my site:
https://maystash.xyz/posts/coworker-who-never-logs-out/

═══════════════════════════════════════════
FORMATTING NOTES — X ARTICLE
═══════════════════════════════════════════
- Bold the section headers in X's editor. The *italics* markers above are single-word
  emphasis; apply as italics, don't leave asterisks in.
- Em-dashes are fine in long-form (this is the carve-out in memory/x-voice.md — the ban
  is for posts, not articles). The THREAD has none. Keep it that way.
- No hashtags, no emoji. Same as always.
- Post ~48h after the thread so the thread has finished its run first.

═══════════════════════════════════════════
USING THIS AS A LINKEDIN ARTICLE
═══════════════════════════════════════════
Same body works as-is. Four changes:

1. **Headline** — LinkedIn truncates around 60 chars in feed. Use:
   "Your New AI Coworker Never Sleeps and Never Logs Out"
2. **Open with the money paragraph, not the 3 AM scene.** LinkedIn readers decide in one
   line. Move the "None of these products sell you an agent, they rent you a seat next to
   one" paragraph to the top, then drop into the 3 AM scene as the second beat.
3. **Cut the "I can't confirm it" paragraph down to one sentence** or drop it. It's the
   right call on a personal blog and on X; on LinkedIn the nuance mostly costs you scroll.
   (If you keep it, keep it whole. Half of it is worse than none.)
4. **Closing link** goes at the very bottom AND in the first comment. LinkedIn articles
   don't suffer the same link penalty as native posts, but the comment still helps.

Do NOT post the article and the native post on the same day. Native post first (see
`linkedin-coworker-who-never-logs-out.md`), article 3–4 days later as the deeper cut.
