import type { APIRoute } from 'astro';
import { SYSTEM_PROMPT } from '../../lib/knowledge';
import { recordRequest, logQuestion } from '../../lib/usage';
import { askModel, scrubModelIdentity, hasAnyProvider } from '../../lib/llm';

export const prerender = false;

// ---- guardrails -------------------------------------------------------------
// These bound the worst case. Without them a single bored visitor (or a bot)
// could run up the bill; with them the ceiling is predictable.
const MAX_QUESTION_CHARS = 500;   // reject essays pasted as "questions"
const MAX_HISTORY_TURNS = 8;      // cap context growth per conversation
const MAX_OUTPUT_TOKENS = 400;    // cap cost per answer
const RATE_PER_IP = 12;           // requests…
const RATE_WINDOW_MS = 60_000;    // …per minute, per IP
// Total answers/day across all visitors, counted in Postgres so the cap holds
// across serverless instances rather than per-instance. At Haiku 4.5 rates this
// bounds a full day at roughly $3–7. See src/lib/usage.ts.
const DAILY_CAP = 1500;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!hasAnyProvider()) {
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

  // One round trip covers both the per-IP window and the shared daily cap.
  const usage = await recordRequest(
    clientAddress ?? 'unknown',
    DAILY_CAP,
    RATE_PER_IP,
    RATE_WINDOW_MS
  );
  if (!usage.ipOk) {
    return json({ reply: 'Easy — too many questions at once. Give it a minute.' }, 429);
  }
  if (!usage.dayOk) {
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
    // Walks Anthropic → OpenRouter → Google, skipping unconfigured providers, so
    // one provider's outage doesn't take the chat down. See src/lib/llm.ts.
    const result = await askModel(
      SYSTEM_PROMPT,
      [...priorTurns, { role: 'user', content: question }],
      MAX_OUTPUT_TOKENS
    );

    if (result.refusal) {
      const declined = "I'd rather not answer that one. Ask me about May's work instead.";
      logQuestion(question, declined, 'refusal');
      return json({ reply: declined });
    }

    // Backstop for the system prompt's "don't name the model" rule: prompt-level
    // suppression is soft, so anything that names the lab is removed here.
    const { text, scrubbed } = scrubModelIdentity(result.text);
    const answer = text || "I didn't catch that — try asking another way.";

    // The outcome column is how failover becomes visible after the fact: a
    // normal day logs nothing, an outage leaves a trail of fallback tiers.
    const outcome = [
      result.tier === 'anthropic' ? undefined : result.tier,
      text ? undefined : 'empty',
      scrubbed ? 'scrubbed' : undefined,
    ]
      .filter(Boolean)
      .join('+');

    logQuestion(question, answer, outcome || undefined);
    return json({ reply: answer });
  } catch (err) {
    console.error('[ask] every provider failed:', err);
    logQuestion(question, '', 'error');
    return json({ reply: 'Something broke on my end. Try again in a moment.' }, 502);
  }
};
