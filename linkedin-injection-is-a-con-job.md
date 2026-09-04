# LinkedIn — CH.03, prompt injection is a con job

New. This chapter had no social copy at all, which is why it never went out despite
being live since 2026-07-25.

Worth posting even though CH.05 (the persistent-coworker post) covered adjacent
ground: that one is the news hook, this one is the mechanism, and CH.05 is the
best-performing LinkedIn post to date (127 impressions), so the audience has already
shown it wants this subject.

**No link in the body.** First comment: https://maystash.xyz/posts/injection-is-a-con-job/

Safe to post: general security writing, no offer, no client work, not OBA-adjacent.

---

A man in a perfect suit walks past the front desk, nods at security, takes the lift to the vault floor. Nobody stops him. He picked no lock and cut no wire. He just looked like he belonged.

That is a confidence trick, and it is almost exactly how prompt injection works.

Every AI agent has one load-bearing weakness and it is not in the code: the model reads instructions and data through the same channel. Your request and the webpage it is reading arrive as the same kind of thing, text in context, and the model has to judge which is which. Judgment can be conned.

So the attack is just a sentence, buried in a page or an email or a calendar invite. No exploit, no malware. A sentence in a good suit, standing where instructions usually stand. That is why it resists fixing years after everyone learned its name. You cannot patch grammar. There is no regex for "sounds legitimate."

The version worth worrying about is not someone typing tricks into a chatbot. It is the instruction planted in something your agent reads later: a page it browses for research, a README, a support ticket. The victim is not present when the trap is set. That is what makes it a con rather than a mugging.

It compounds the moment the agent has memory. A one-shot injection is a pickpocket, bounded by the session. Get the agent to write the instruction down and it survives every session after. Researchers have done exactly this to production agents at success rates above 95%. Memory exists to make the past authoritative, so a lie that reaches memory stops being an input to evaluate and becomes the thing everything else gets evaluated against. The con man does not rob the vault. He becomes the security consultant.

There is no silver bullet, and anyone selling one is running their own con. But confidence tricks have a classic defence and it works here too: procedure over vibes. Casinos do not beat card counters with intuition. They beat them with rules that do not care how legitimate you look.

Three habits.

Data is never instructions. Anything arriving from outside is material to examine, never orders to follow, however urgent it sounds. The polite man in the suit gets asked for ID because he looks like he belongs.

Shrink the blast radius. An agent that summarises email does not need send permission. Every capability you withhold turns an entire class of injection into a dud: the sentence fires and nothing happens.

Make lies traceable. You cannot guarantee nothing gets in. You can guarantee nothing hides. Version the memory, tag claims verified or guess, and re-check them on a schedule. A con relies on never being audited.

So stop asking whether your AI is smart enough not to be fooled. Smart people get conned daily, and con artists prefer confident marks. Ask the security question instead: when it gets fooled, what can the fool reach, and how fast do you find out?

Full write-up in the comments.
