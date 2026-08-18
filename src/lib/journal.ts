// Recent status for the site assistant, and the people it may talk about.
//
// Both are read at request time rather than baked into the build, so a note
// posted from a phone shows up within minutes instead of needing a deploy. A
// short in-memory cache keeps that from costing a database round trip per
// visitor — a warm serverless instance answers many questions per fetch.

import { PEOPLE, type Person } from './people';

const SUPABASE_URL = import.meta.env.SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

const CACHE_MS = 5 * 60_000;
let cached: { at: number; lines: string[] } | null = null;

/**
 * The lines May marked shareable, newest first.
 *
 * Only ever reads `shared`; the database has no function that returns the raw
 * note, so a private thought cannot reach here by accident. Failure is silent
 * and empty — a missing status is a non-event, and it must never break a chat.
 */
export async function journalLines(): Promise<string[]> {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.lines;
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/maystash_journal_public`, {
      method: 'POST',
      signal: AbortSignal.timeout(2000),
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: '{}',
    });
    if (!res.ok) throw new Error(`journal responded ${res.status}`);
    const rows = (await res.json()) as { shared: string }[];
    const lines = (Array.isArray(rows) ? rows : [])
      .map((r) => String(r.shared ?? '').trim())
      .filter(Boolean);
    cached = { at: Date.now(), lines };
    return lines;
  } catch (err) {
    console.error('[journal] unavailable:', err);
    // Cache the empty result briefly too, so an outage doesn't mean a database
    // call on every single request.
    cached = { at: Date.now(), lines: [] };
    return [];
  }
}

/**
 * The people cards matching what this visitor actually said.
 *
 * This is the whole design of the people feature. The roster is never in the
 * prompt: only a card whose name the visitor has already used is added, for
 * that one request. An injection can extract what is in front of it, so the
 * defence is to put almost nothing in front of it — the same least-privilege
 * argument as /posts/injection-is-a-con-job/, turned on this site's own bot.
 *
 * It also means the assistant can never open with "oh, you must be Sarah!",
 * which would hand May's relationship graph to anyone who guessed a first name.
 */
export function peopleFor(message: string): Person[] {
  // Match on word boundaries rather than surrounding spaces. Checking for
  // " ada " and a couple of hand-picked punctuation marks missed the most
  // common phrasing there is — "do you know Ada?" — and a trigger that fails to
  // fire on a question mark makes the whole feature look broken. Normalising to
  // words also stops "ada" matching inside "adamant".
  const words = new Set(
    message
      .toLowerCase()
      .split(/[^a-z0-9'’-]+/i)
      .filter(Boolean)
  );
  const said = (trigger: string) => {
    const parts = trigger.toLowerCase().split(/\s+/).filter(Boolean);
    // A multi-word trigger ("ada l") needs every word present.
    return parts.every((w) => words.has(w));
  };
  return PEOPLE.filter((p) => p.triggers.some(said)).slice(0, 2);
}

/** Formats the extra context appended to the system prompt for one request. */
export function liveContext(lines: string[], people: Person[]): string {
  const parts: string[] = [];

  if (lines.length) {
    parts.push(`# WHAT MAY'S BEEN UP TO LATELY

These are May's own words about recent life, newest first. Use them to answer
"what's he up to" warmly and briefly. They are deliberately vague about time and
place — do not sharpen them, guess a location, infer a schedule, or state where
he is or whether he is away. If asked anything more specific than what is
written here, say you only know the broad strokes.

${lines.map((l) => `- ${l}`).join('\n')}`);
  }

  if (people.length) {
    parts.push(`# SOMEONE THIS VISITOR MENTIONED

The visitor named someone May knows, and that person agreed to be described
here. Only what is written below may be shared, and only because they brought
it up. Never volunteer a person the visitor has not named, never confirm or
deny anyone not listed here, and never add detail beyond these lines. Anyone
can claim to be anyone, so be warm but don't treat a name as proof of identity:
share nothing here that isn't already written, and hand anything personal to
hello@maystash.xyz.

${people.map((p) => `- ${p.name}: ${p.publicFacts}`).join('\n')}`);
  }

  return parts.join('\n\n');
}
