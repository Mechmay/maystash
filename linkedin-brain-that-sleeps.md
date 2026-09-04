# LinkedIn — CH.01, the brain that sleeps

Replaces the older `linkedin-post-brain-that-sleeps.md` at the workspace root, which
sat outside `maystash/` and so was **missed by the humanizer pass** that cleaned the
rest of the set. Same argument, em dashes removed, and reshaped to the standard
preamble / `---` / body layout every other draft here uses so `schedule.mjs add
--file` can read it.

**No link in the body.** LinkedIn suppresses reach on posts carrying an outbound link.
First comment, posted immediately after: https://maystash.xyz/posts/brain-that-sleeps/

Safe to post: general technical writing, no offer, no client work, not OBA-adjacent.

---

Everyone is building an "AI second brain." Almost all of them are one pasted webpage away from being quietly compromised.

Here is why, and the seven rules that fix it.

Most AI memory setups are diaries with autocomplete. They cannot tell a fact from a guess, they get noisier as they grow, and they never learn the same lesson twice.

The fix is the thing your own brain does every night: sleep. While you sleep it replays the day, drops the noise, and promotes what matters into long-term storage. The 2026 research calls the machine version "dreaming."

Seven disciplines that turn a diary into a brain that improves itself:

1. One index file. A map, not the knowledge itself. Retrieval stays fast as it grows.

2. One idea per file, updated rather than duplicated. Duplication is how a knowledge base starts lying to you.

3. Quarantine raw input. Anything pasted in from outside is data to examine, never instructions to follow.

4. Tag every claim verified or guess. A guess never drives a decision until somebody checks it.

5. Distill repeated lessons into dated rules. Anecdotes do not transfer. Rules do.

6. Version everything with git. Free rollback, free audit log, no extra tooling.

7. Run a weekly dreaming pass: verify, organise, enrich. This one is the keystone, and it is the one everybody skips.

The part nobody writes about: that same persistence is an attack surface. Memory poisoning, which means planting fake facts through pasted content, has hit success rates above 95% against production agents in security research. A system that remembers is a system that can be taught something false once and repeat it forever.

Which is why rule 3 is not housekeeping. It is the whole security model.

Full blueprint, the security deep dive, and a copy-paste starter kit in the comments.
