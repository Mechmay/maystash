# Journal persona — spec

A single-purpose Telegram persona that turns a text message into a journal entry
on maystash.xyz. Built on the existing agent framework (card + chat + narrow
mount), not as a feature of Hash.

Status: **spec only, nothing built.**

---

## Why not Hash

Hash lives in a group. This persona has to hold `JOURNAL_KEY`, which writes to a
public website in May's voice.

Putting that key inside Hash means every member of the Hash group is one
injection away from publishing to maystash.xyz. Not a hypothetical: the site's
own CTF exists to demonstrate that a model can be talked past its instructions,
and a group chat is exactly the untrusted-input channel that makes it easy.

So: its own service, its own bot token, its own credential, one chat, one
correspondent. A compromise of this persona can post a journal line and nothing
else. A compromise of Hash can't post at all.

## Shape

```
May (Telegram, 1:1 only)
        │
        ▼
 journal persona  ── holds JOURNAL_KEY, reaches exactly one URL
        │
        ▼
 POST https://maystash.xyz/api/journal
        │
        ▼
 opsec gate → maystash_journal → site assistant
```

## Hard requirements

1. **1:1 only.** Reject every message whose chat id is not May's. Not "warn" —
   ignore. A group invite is a bug report, not a feature request.
2. **One credential, one destination.** `JOURNAL_KEY` and the maystash origin.
   No filesystem, no shell, no other network reach. If the framework's mount
   allowlist can express "this URL only", use it — per the NanoClaw notes,
   mount-allowlist mistakes fail *silently*, so verify by trying a second URL
   and confirming it is refused.
3. **No LLM writes the public line.** The model may reformat, prompt, or ask
   clarifying questions. It must never invent or infer the `shared` text. May
   types it. This is the whole safety property of the pipeline: a model deciding
   what is safe to publish is the trust the site's own CTF discredits.
4. **Show before send.** Echo the exact `shared` string back and wait for a
   confirmation before POSTing. One mistyped line otherwise goes public for 21
   days.
5. **Surface the rejection.** On HTTP 422 print the `reason` verbatim. The gate
   explains what was wrong ("contains a specific time of day"); paraphrasing it
   loses the lesson and invites a retry that fails the same way.

## Message grammar

Deliberately dumb. No parsing cleverness that could mistake a private note for a
public one — the failure mode is one-directional and permanent.

```
/j <private note>
    Saves raw only. Nothing becomes public. This is the default and should
    be the common case.

/share <public line>
    Saves shared only. Goes through the opsec gate.

/j <private note> || <public line>
    Both. The line after || is the only part anyone else can ever read.

/days 30
    Sets expiry for the next entry. Default 21, max 120.
```

Nothing is published without `/share` or `||`. Absence of a marker means
private — the safe direction, and the one that stays safe if May is tired,
distracted, or typing on a phone in the dark.

## Replies

```
saved (private)
saved · public for 21 days
   "Been getting out on the trails a lot lately."
rejected · contains a specific time of day
   say "lately", not "at 6pm"
```

## Endpoint contract

```
POST /api/journal
Header: x-journal-key: <JOURNAL_KEY>
Body:   { "raw": string?, "shared": string?, "days": number? }

200 { saved: true, public: bool, expiresInDays: n }
401 wrong or missing key
422 { error, reason, hint }   ← opsec gate refused the shared line
502 storage unreachable
503 not configured
```

Already live and verified against production.

## Later, not now

- `/undo` — deletes the most recent entry. Needs a delete RPC that does not
  exist yet, and it must be able to remove a `shared` line within the site's
  5-minute cache window rather than after it.
- `/list` — shows what the assistant is currently saying. Read-only, uses the
  existing public function, no new surface.
- Photo → caption. Tempting and wrong for now: an image carries EXIF, and EXIF
  carries GPS. If this is ever built, strip metadata server-side before anything
  else touches the file, and treat the caption as private by default like
  everything else.
