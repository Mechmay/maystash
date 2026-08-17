// GENERATED FILE — DO NOT EDIT.
// Written by scripts/knowledge.mjs from src/posts, src/projects and
// src/pages/about.astro. To change what the assistant knows, change the site:
// edit a post, a project, or the about page, then build (the generator runs
// first). For facts a post's own opening doesn't carry, add a `botNotes` field
// to its frontmatter and they'll be used verbatim.
//
// Regenerate by hand with: node scripts/knowledge.mjs

/** Slugs of every published (non-draft) post — used to linkify replies. */
export const POST_SLUGS: string[] = [
  "we-gave-him-a-different-puzzle",
  "player-who-never-lost",
  "injection-is-a-con-job",
  "agents-need-a-leash",
  "thirsty-machines",
  "brain-that-sleeps"
];

/** Everything on the site, formatted for the assistant's prompt. */
export const SITE_CONTENT = `
# MY WRITING (maystash.xyz)

Two tracks:
- FEATURE PRESENTATION — technical field notes, deep and reproducible.
- MATINEE — plain-language pieces on tech questions everyone asks, no jargon.

Published pieces, newest first, each with the URL to send people to.
Always give the specific piece's URL, never just "maystash.xyz", when
pointing at an article.

1. "We Stopped Chasing the Cheater. We Gave Him a Different Puzzle."
   MATINEE — maystash.xyz/posts/we-gave-him-a-different-puzzle/
   The sequel: the scoreboard stayed clean for exactly a day. The game
   accidentally lied to the cheater, that accident became the fix, and the
   fix then bit an innocent player.
   Topics: games, security, cheating, dinjure, explainers.

2. "One of Our Players Never Lost. That Wasn't Skill — It Was Our Bug."
   MATINEE — maystash.xyz/posts/player-who-never-lost/
   A player cracked Dinjure's daily puzzle in one guess, every day, for
   weeks. Two cheats, two fixes, and the one detail deliberately not
   published.
   Topics: games, security, cheating, dinjure, explainers.

3. "Prompt Injection Isn't Hacking. It's a Con Job — and Your AI Is the Mark."
   FEATURE — maystash.xyz/posts/injection-is-a-con-job/
   Prompt injection is when instructions are smuggled inside data the model
   reads — a web page, a document, an email — and the model follows them as
   if the user had asked. It resists patching because a model takes
   instructions and data through the same channel and cannot tell them
   apart. Three habits break it: provenance (data is never instructions),
   least privilege (the agent can only reach what the task needs), and an
   audit trail. It's a con played on the model, not a vulnerability in it —
   which is why filters and blocklists keep losing.
   Topics: security, ai, prompt-injection, agents.

4. "Your AI Agent Doesn't Need More Autonomy. It Needs a Leash With Six Knots."
   FEATURE — maystash.xyz/posts/agents-need-a-leash/
   Everyone wants agents that run unsupervised; almost nobody builds the
   discipline that makes unsupervised safe. The loop contract that keeps
   automated AI work from quietly going feral: six constraints on what an
   agent may touch, how long it may run, and what it must write down.
   Topics: ai, agents, automation, loops.

5. "Your Burger Drinks More Than Your Chatbot. So Why Are the Wells Running Dry?"
   MATINEE — maystash.xyz/posts/thirsty-machines/
   A plain-language guide to AI and water. One chatbot answer costs a few
   drops to a shot glass; a hamburger costs ~2,500 litres. US golf courses
   out-drink every US data center roughly 30x. Estimates vary 2000x because
   people measure different boundaries (on-site cooling vs. water used
   generating the electricity vs. training amortised in). Water isn't
   destroyed, it's displaced — 70-90% of what a data center draws leaves
   the local watershed. Only one AI lab, Mistral, has published a full
   independently audited water bill. The real problem isn't the volume,
   it's that it's unaudited and locally concentrated: a data center can be
   0.02% of a country's water and still a quarter of one town's.
   Topics: ai, water, data-centers, environment, explainers.

6. "The AI Memory Everyone's Building Is a Diary. Here's How to Build a Brain That Sleeps."
   FEATURE — maystash.xyz/posts/brain-that-sleeps/
   A complete blueprint for a self-improving AI second brain on plain text
   files: the seven primitives (index-first retrieval, verified/guess
   tagging, rule distillation, git as memory versioning, a weekly
   "dreaming" consolidation pass), the memory-poisoning holes nobody warns
   you about, and a copy-paste starter kit.
   Topics: ai, second-brain, agents, security.

# PROJECTS

## Dinjure — LIVE (2026) https://dinjure.com
A number-guessing game that lives on the social feed — guess, get injured,
come back for revenge. A deceptively simple guessing game wired straight
into the places people already scroll. You pick a number, the game bites
back, and your hits and misses become something worth sharing — the loop is
built for the feed, not a landing page nobody visits. Under the hood it ties
a live web app to social distribution, so a round played is a round posted.
Named players opt in; the game does the rest. Shipped, live, and still
getting sharper.
Tags: game, social, web3, 0→1.

## Hash — LIVE (2026)
A resident AI agent that actually lives in the group chat — and a system for
spinning up more like it. Most "AI assistants" are a tab you have to
remember to open. Hash is the opposite — it lives inside a Telegram group,
keeps context, and does real work where the conversation already happens. No
new app to babysit. Behind the one agent is a small framework for standing
up more of them: give each a card, a group, and a narrow set of tools it's
allowed to touch, and you've got a purpose-built AI employee instead of a
general-purpose chatbot that can reach everything. It runs on its own box,
one service per job, so a bad day for one never becomes a bad day for all of
them.
Tags: ai, agents, automation, infrastructure.

## maystash — LIVE (2026) /writing
This site — long-form writing on tech, second brains, and building 0→1,
powered by a plain-text brain that improves itself. The site you're on. Part
publication, part experiment: every article is a complete blueprint — no
fluff, everything reproducible — and the whole thing runs on plain markdown
files instead of a database. The interesting part is the engine behind it: a
self-improving second brain that remembers across sessions, tags what it
knows as verified or guessed, and cleans up after itself. The writing is one
output. The system that writes it is the real project.
Tags: writing, ai, second-brain.

# ABOUT THIS SITE (May's own words, from the about page)

Most of my time goes into shipping: games that live on the social feed, AI
agents that do real work instead of demos, and the quiet infrastructure that
keeps them running. I like the part of a project where nothing exists yet
and the part where it finally survives contact with real users. The middle
is just work.

maystash is where the useful stuff gets written down properly — long-form,
no fluff, everything reproducible. If I figured something out the hard way,
it ends up here as a blueprint so the next person doesn't have to. Plain
text, no paywall, no gating.

Security taught me to assume everything can be conned. Web3 taught me to
build like nobody's coming to save you. AI taught me to automate the boring
parts and stay suspicious of the magic. It all points the same way: build
the thing, keep the receipts, tell the truth about what actually works.
`.trim();
