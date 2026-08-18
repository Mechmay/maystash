import type { APIRoute } from 'astro';
import { checkShareable } from '../../lib/opsec';

export const prerender = false;

const env = (n: string) =>
  ((import.meta.env ?? {}) as Record<string, string | undefined>)[n] ?? process.env[n];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/** Length-independent compare so a wrong key can't be probed a byte at a time. */
function sameSecret(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Posts a journal entry. May only — guarded by a shared secret in a header.
 *
 * Body: { raw?: string, shared?: string, days?: number }
 *
 *   raw     private note, kept for May, never served to anyone
 *   shared  the sentence he wrote for the public — the ONLY thing visitors see
 *
 * Nothing derives `shared` from `raw`. Publishing is an explicit act of writing
 * the public sentence, not a model's judgement about what was safe in a private
 * one.
 */
export const POST: APIRoute = async ({ request }) => {
  const key = env('JOURNAL_KEY');
  if (!key) return json({ error: 'journal is not configured' }, 503);

  const given = request.headers.get('x-journal-key') ?? '';
  if (!sameSecret(given, key)) return json({ error: 'nope' }, 401);

  let body: { raw?: unknown; shared?: unknown; days?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }

  const raw = typeof body.raw === 'string' ? body.raw.trim() : '';
  const shared = typeof body.shared === 'string' ? body.shared.trim() : '';
  const days = Number.isFinite(Number(body.days)) ? Number(body.days) : 21;

  if (!raw && !shared) return json({ error: 'nothing to save' }, 400);

  // The gate. A rejected line is not saved as shareable at all — better to hand
  // it back and have it rewritten than to publish a near-miss.
  if (shared) {
    const verdict = checkShareable(shared);
    if (!verdict.ok) {
      return json(
        {
          error: 'not shareable',
          reason: verdict.reason,
          hint: 'Keep it vague about time and place. Describe the habit, not today.',
        },
        422
      );
    }
  }

  const url = env('SUPABASE_URL');
  const anon = env('SUPABASE_ANON_KEY');
  if (!url || !anon) return json({ error: 'storage not configured' }, 503);

  const res = await fetch(`${url}/rest/v1/rpc/maystash_journal_add`, {
    method: 'POST',
    signal: AbortSignal.timeout(5000),
    headers: {
      'Content-Type': 'application/json',
      apikey: anon,
      Authorization: `Bearer ${anon}`,
    },
    body: JSON.stringify({
      // Without this the function refuses: the publishable key alone is not
      // authorisation, since it is served publicly by another site on the same
      // Supabase project.
      p_secret: env('SUPABASE_WRITE_SECRET'),
      p_raw: raw || null,
      p_shared: shared || null,
      p_days: days,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[journal] save failed:', res.status, detail.slice(0, 200));
    return json({ error: 'could not save' }, 502);
  }

  return json({
    saved: true,
    public: Boolean(shared),
    expiresInDays: Math.max(1, Math.min(days, 120)),
  });
};
