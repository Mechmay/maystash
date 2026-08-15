import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '../../lib/knowledge';

export const prerender = false;

// ---- guardrails -------------------------------------------------------------
// These bound the worst case. Without them a single bored visitor (or a bot)
// could run up the bill; with them the ceiling is predictable.
const MAX_QUESTION_CHARS = 500;   // reject essays pasted as "questions"
const MAX_HISTORY_TURNS = 8;      // cap context growth per conversation
const MAX_OUTPUT_TOKENS = 400;    // cap cost per answer
const RATE_PER_IP = 12;           // requests…
const RATE_WINDOW_MS = 60_000;    // …per minute, per IP
const DAILY_CAP = 1500;           // total answers/day across all visitors

const MODEL = 'claude-haiku-4-5';

// In-memory counters. Serverless instances recycle, so this is a speed bump for
// casual abuse, not a hard guarantee — the daily cap is the real backstop.
const hits = new Map<string, number[]>();
let dayKey = new Date().toISOString().slice(0, 10);
let dayCount = 0;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > RATE_PER_IP;
}

function overDailyCap(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayCount = 0;
  }
  return ++dayCount > DAILY_CAP;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json({ reply: "The chat isn't switched on yet — May still has to add the key." }, 503);
  }

  let payload: { question?: unknown; history?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'bad request' }, 400);
  }

  const question = typeof payload.question === 'string' ? payload.question.trim() : '';
  if (!question) return json({ error: 'empty question' }, 400);
  if (question.length > MAX_QUESTION_CHARS) {
    return json({ reply: 'That is a bit long for me — try asking it in a sentence or two.' });
  }

  if (rateLimited(clientAddress ?? 'unknown')) {
    return json({ reply: 'Easy — too many questions at once. Give it a minute.' }, 429);
  }
  if (overDailyCap()) {
    return json({ reply: "I've hit my limit of answers for today. Try tomorrow, or email hello@maystash.xyz." }, 429);
  }

  // Only keep well-formed prior turns, and only the recent ones.
  const history = Array.isArray(payload.history) ? payload.history : [];
  const priorTurns = history
    .filter(
      (m: any): m is { role: 'user' | 'assistant'; content: string } =>
        m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
    )
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_QUESTION_CHARS) }));

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      // The knowledge base is stable across every request, so cache it: cached
      // tokens bill at ~10% of normal.
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [...priorTurns, { role: 'user', content: question }],
    });

    if (response.stop_reason === 'refusal') {
      return json({ reply: "I'd rather not answer that one. Ask me about May's work instead." });
    }

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();

    return json({ reply: reply || "I didn't catch that — try asking another way." });
  } catch (err) {
    console.error('[ask] request failed:', err);
    return json({ reply: 'Something broke on my end. Try again in a moment.' }, 502);
  }
};
