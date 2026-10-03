# LinkedIn — analytics observation, "LinkedIn removes the counter at zero" (2026-10-03)
# Short post, ~90 words. Mechanism-reveal shape.
# Safe to post: no offer, no CTA, technical observation. Not OBA-gated.
# Source: measure.mjs, bug found 2026-09-11. Meta but true and checkable by anyone.

---

LinkedIn does not tell you a post got zero reactions. It removes the counter from the page entirely.

I read my own numbers off the public embed. My reader looked for the reactions element, did not find it, and concluded the post had been deleted. It reported two perfectly live posts as missing for days.

A post with one reaction has the element. A post with none does not exist, as far as the markup is concerned.

It checks for the post's text now. That part is always there.
