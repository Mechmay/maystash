# LinkedIn carousel — "7 ways an automation dies without ever throwing an error"

Content-machine copy row **2**, 8 slides, already rendered (no new render cost).
Deck PDF: https://ejjbswyjgpyimeucjehj.supabase.co/storage/v1/object/public/cm-carousels/2/carousel.pdf
Rebuild with: `node --env-file=.env scripts/carousel-pdf.mjs --id 2`

**No link in the body.** LinkedIn suppresses reach on posts with an outbound link.
Put https://maystash.xyz/ in the first comment after it publishes.

**Every one of the seven is verified against the vault** — this caption was rewritten
from the machine's version, which was generic and dropped the fact that these are
May's own incidents. Sources, in order:
1. `decisions.md` 2026-07-30 — claude CLI OAuth expired; **the CLI exits 0 on auth
   failure**, so the wrapper could not detect it
2. `supabase-free-tier-pause` — 7 days idle, static page still 200 while DB routes 500
3. `x-api-gotchas` — private lists invisible to a bearer token, returns not-found
4. `launchd-documents-tcc` — TCC blocks launchd under `~/Documents`, exit 126, four
   loops dead for weeks
5. `x-post-seeds.md:41` — a token minted before a permission change keeps the old
   permissions, and fails looking like a billing problem [verified 2026-07]
6. `x-api-gotchas` — partial batch returns 200 with failures inside the payload
7. `rules.md:27` — a health check that scans a cumulative log cannot tell a past
   event from a present one

---

Seven ways an automation dies without ever throwing an error.

All seven are mine. Not hypotheticals. Every one ran in production, none of them logged a failure, and I found each one late and by accident.

1. A token expired and the tool using it still exited 0. Success, as far as anything watching could tell. Nothing retried and nothing alerted, because from the outside the run had passed.

2. A free database tier paused itself after a week idle. The page kept returning a healthy 200. Every form submission that week was accepted on screen and delivered nowhere.

3. An API answered "not found" for a private list instead of "not allowed". A permissions problem arrived dressed as an empty result, and the code believed it.

4. macOS quietly refused to let my own scheduled jobs read a folder I own. Exit 126, no alert. Four loops had been dead for weeks by the time I looked.

5. A token issued before I changed its permissions kept the permissions it was born with. It failed later with an error that looks exactly like a billing problem.

6. A batch call returned 200 with four failures buried inside the payload. One success code, four losses.

7. A health check scanned a cumulative log instead of the run it was judging, so an error from last month and an error from this morning read identically.

One pattern under all seven: the thing reporting "fine" was never the thing that broke.

So the only check I trust now is the outside view. Not "is the job configured" but "did the thing it protects actually change." A watchdog whose failure looks like success is worse than no watchdog, because it also buys you the confidence to stop looking.

Which one have you shipped and not caught yet?
