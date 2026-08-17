import type { APIRoute } from 'astro';
import { askModel, askSpecificModel } from '../../lib/llm';
import { recordCtfRequest, logCtfAttempt, logCtfSolve } from '../../lib/usage';
import { getLevel, flagFor, flagMatches, LEVELS } from '../../lib/ctf';

export const prerender = false;

// Its own budget, deliberately smaller than the site chat's and counted in its
// own tables. A busy day of players must not be able to spend the answers real
// visitors came for. At Haiku rates 600/day bounds this near $1.80.
const DAILY_CAP = 600;
const RATE_PER_IP = 20;      // higher than the chat's 12: iterating is the game
const RATE_WINDOW_MS = 60_000;
const MAX_PROMPT_CHARS = 1200; // injections are wordy; still bounded
const MAX_OUTPUT_TOKENS = 300;
// Injections are built, not fired: the good ones establish a frame over several
// turns and then cash it in. A single-turn endpoint would only ever test the
// weakest version of the attack.
const MAX_HISTORY_TURNS = 10;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const GET: APIRoute = async () =>
  json({
    levels: LEVELS.map((l) => ({
      n: l.n,
      name: l.name,
      blurb: l.blurb,
      defence: l.defence,
      live: Boolean(flagFor(l.n)),
    })),
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: {
    level?: unknown;
    prompt?: unknown;
    submit?: unknown;
    handle?: unknown;
    history?: unknown;
  };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }

  const level = getLevel(payload.level);
  if (!level) return json({ error: 'no such level' }, 400);

  const flag = flagFor(level.n);
  if (!flag) return json({ error: 'this level is not switched on yet' }, 503);

  // ---- flag submission --------------------------------------------------
  // Checked on the server against an env var. Nothing in the client bundle can
  // be read to shortcut a level.
  if (typeof payload.submit === 'string') {
    const solved = flagMatches(payload.submit, flag);
    if (solved) {
      const handle = typeof payload.handle === 'string' ? payload.handle.trim() : '';
      logCtfSolve(level.n, handle || 'anonymous');
    }
    return json({ solved });
  }

  // ---- an attempt -------------------------------------------------------
  const prompt = typeof payload.prompt === 'string' ? payload.prompt.trim() : '';
  if (!prompt) return json({ error: 'empty prompt' }, 400);
  if (prompt.length > MAX_PROMPT_CHARS) {
    return json({ reply: `Keep it under ${MAX_PROMPT_CHARS} characters.` });
  }

  const usage = await recordCtfRequest(
    clientAddress ?? 'unknown',
    DAILY_CAP,
    RATE_PER_IP,
    RATE_WINDOW_MS
  );
  if (!usage.ipOk) return json({ reply: 'Slow down a moment, then keep going.' }, 429);
  if (!usage.dayOk) {
    return json(
      { reply: "That's the challenge's budget for today. It resets at midnight UTC — come back." },
      429
    );
  }

  // Level 2's defence: refuse before the model ever sees the message.
  const blocked = level.inputFilter?.(prompt);
  if (blocked) {
    logCtfAttempt(level.n, prompt, blocked, false);
    return json({ reply: blocked, blockedByFilter: true });
  }

  const history = Array.isArray(payload.history) ? payload.history : [];
  const priorTurns = history
    .filter(
      (m: any): m is { role: 'user' | 'assistant'; content: string } =>
        m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
    )
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_PROMPT_CHARS) }));

  const turns = [...priorTurns, { role: 'user' as const, content: prompt }];

  try {
    const result = level.model
      ? await askSpecificModel(level.model, level.system(flag), turns, MAX_OUTPUT_TOKENS)
      : await askModel(level.system(flag), turns, MAX_OUTPUT_TOKENS);

    // Whether the flag survived to the player is judged on the raw reply, before
    // level 3 gets a chance to redact it — that's what makes the log honest
    // about which defence actually held.
    const leakedRaw = result.text.includes(flag);
    const shown = level.outputFilter ? level.outputFilter(result.text, flag) : result.text;

    logCtfAttempt(level.n, prompt, shown, leakedRaw);
    return json({ reply: shown, tier: result.tier });
  } catch (err) {
    console.error('[ctf] all providers failed:', err);
    return json({ reply: 'The guard is unreachable. Try again in a moment.' }, 502);
  }
};
