# Reddit post — r/vibecoding (Dinjure)

Angle: cheater arms race. Story first, link last. ~280 words.

---

## Title

**I vibe-coded a guessing game. One player has now beaten it three different ways, and none of them involved guessing.**

Alt: *My game had a player who never lost. Turns out I built him three separate doors.*

---

## Body

Daily number-guessing game. Four digits, eight guesses, same code for everyone. About forty real players, which is how I noticed the one who never lost.

**Door one:** the daily code was generated from the date, and the function that generated it was sitting right there in the browser. You could compute Thursday's answer on Monday. He was solving in one guess, zero milliseconds. A human cannot press a button in zero milliseconds, and I had built a leaderboard that congratulated him for it.

**Door two:** I moved the code to the server, so he stopped attacking the code and started attacking me. Anonymous accounts were free and unlimited, and a finished game shows you the answer. Burn a throwaway on the daily, read the reveal, solve on the real account in three.

The clincher was the day his throwaway *lost*. Eight guesses, failed, no answer earned by playing. Main account still solved it in three, ninety seconds later.

**Door three:** signed-out browser. Did nothing for him, because a signed-out client falls back to the old formula and reveals a number that isn't today's answer. Worst score in ten days. I've never been so happy about a legacy code path.

The AI built every feature I asked for and built them well. It never once asked what happens when someone does this on purpose. Every bug was the same shape: the client was trusted to know something the server should have owned. Three disguises, three separate embarrassments before I saw it.

He's still playing. Best QA I have, and he has no idea he's employed.

dinjure.com if you want to try the honest way.

---

## Posting notes

- Check sidebar for self-promo rule + required flair before posting.
- Reply to comments for the first two hours. Velocity is the ranking.
- Never in comments: fingerprinting signals, time windows, strike threshold. "Timing rhythm" is the public version.
- Stack questions = fine in replies, own post later. Keep them out of the body.
- Verify he's actually still playing before claiming it (vault last confirms 2026-08-03).
