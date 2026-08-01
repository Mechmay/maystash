---
title: "One of Our Players Never Lost. That Wasn't Skill — It Was Our Bug."
tagline: "He cracked our daily puzzle in one guess, every day, for weeks. Then we fixed it, and he came back with something better. Two cheats, two fixes, and the one detail we're not publishing."
date: 2026-08-01
chapter: "M2"
section: "matinee"
tags: ["games", "security", "cheating", "dinjure", "explainers"]
draft: false
---

INT. A LEADERBOARD, EARLY MORNING.

There's a name at the top that's always at the top. Not "usually." Always. Perfect score, first place, every single day, while everyone else takes four or five tries like normal humans.

You could call that a very good player. It was actually a very good bug — ours.

Here's what happened, twice, and what it taught us about building anything people can win at.

## First, the game

Dinjure is a daily number puzzle. One secret code a day. Everyone in the world gets the same one. You guess, the game tells you how warm you are, you guess again. Fewest guesses and fastest time wins the day. Think Wordle, but with numbers and a scoreboard people genuinely care about.

That "everyone gets the same code" part is what makes it fun. It's also what makes it worth cheating at.

## Cheat one: we mailed him the answer

Every day the game needed a fresh secret code. So we wrote a little recipe: feed in today's date, out comes today's code. Neat, tidy, and the same code for every player — exactly what we wanted.

Here's the part we didn't think hard enough about. That recipe lived inside the game itself, in the part that runs on *your* computer. Every website works this way: when you open a page, your browser downloads the instructions and runs them locally. And every browser made in the last twenty years has a button that lets you read those instructions.

So the recipe wasn't hidden. It was published. We'd been handing out the answer key with the exam, in tiny print, for months.

One player read the tiny print. He ran the recipe himself, off to the side, then typed the answer in as his first guess. One try. Zero seconds. Day after day after day.

When we finally went looking, we found eight more perfect solves scattered back through the history. Some of those were probably us testing the thing at launch. Some of them weren't.

**The fix:** stop letting the player's computer know the answer. Now the code is picked at random, kept on our machines, and when you make a guess your device has to *ask* us whether you're right. It used to grade its own homework and tell us the score. Now it hands the paper in.

## Cheat two: he stopped needing the answer key

Weeks go by. Clean scoreboard. Then the same name reappears — solving in three guesses, every day, which is suspiciously good but not impossible-good. He'd found something better, and this one didn't touch our secret at all.

When you finish the daily puzzle — win *or* lose — we show you the code. Of course we do. You just spent five minutes on it; you've earned the ending.

What we never thought about was how *cheaply* someone could get to the ending. Our game lets you play without signing up — no email, no password, just tap and go. Great for first-timers. Also great if what you want is a disposable identity.

So: open the game in a private window, play as a nobody, blow through the puzzle fast just to reach the ending, read the code off the screen. Close it. Open the real account. Solve in three.

He wasn't beating the puzzle. He was watching a stranger beat it — and the stranger was him.

**How we caught it:** not by finding the trick. By noticing a rhythm. Every single day, a nameless account finished the puzzle a couple of minutes before his real one did, and his real one always did suspiciously well afterward. Never the reverse. Never a day off.

Then came the day that ended the argument. The nameless account *lost* — ran out of guesses, no win, nothing to copy. And three minutes later, his real account solved it perfectly anyway.

You can be lucky. You can't be lucky *from* a failure. Whatever he learned, he learned it from the ending screen.

**The fix:** this one never touches his device at all — it lives entirely on our side, and his game looks exactly the same as it did yesterday. Scores that show that telltale relationship to a throwaway account quietly stop counting toward rank. No ban, no accusation, no dramatic banner. He can still play every day, keep his stats, keep his streak. He just can't be champion with borrowed answers.

And here's the one thing this article won't tell you: exactly what we look for. Publishing the tripwire is how you teach the next person to step over it.

## What this is really about

Almost nobody reading this runs a puzzle game. But every version of this story shows up anywhere people can win something.

**Anything you hand to someone's device, they can read.** Not "a hacker can read." *Anyone* can, with a button that ships in every browser. If the answer must stay secret, it can't take a trip through the player's computer first — no matter how well you fold it up.

**"Free to try" is also free to abuse.** The second cheat needed no password, no code, no skill — only that we let people play without signing up, which was a deliberate kindness. Any door you leave open for the shy first-timer is a door someone else will walk through fifty times.

**Cheating usually isn't invisible — it's just unwatched.** Neither of these was caught by clever detective work. Both were caught by lining up timestamps and noticing that a coincidence had stopped being coincidental. The pattern was sitting in our records the whole time. Nobody had looked at that particular column.

**Don't punish when you can just not reward.** We didn't ban him. Banning starts an argument, and arguments with anonymous people on the internet are unwinnable and eternal. Quietly not counting a score ends it. He gets to keep playing a game he clearly likes; the leaderboard gets to be honest. Everyone loses slightly less than they wanted to, which is usually what a good fix feels like.

The scoreboard's clean again. For now — which is the only version of "clean" anyone ever actually gets.

CUT TO BLACK.
