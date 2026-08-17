// Model routing for the chat assistant, with failover across providers.
//
// One provider outage used to mean the chat was simply down: ask.ts called
// Anthropic directly, and the SDK's default 10-minute timeout meant visitors
// watched a spinner rather than getting a fast error. This module walks a ladder
// of independent providers instead.
//
//   1. Anthropic direct        api.anthropic.com
//   2. OpenRouter              same Claude model served by Bedrock/Azure/Vertex,
//                              then GPT and Gemini as cross-lab backstops
//   3. Google direct           Gemini on Google's own API
//
// The point of tier 2 is that "Claude" is not one machine: Bedrock and Vertex
// run the same weights on Amazon's and Google's hardware, so an api.anthropic.com
// outage has no mechanical reason to reach them. The point of tier 3 is that it
// depends on neither Anthropic nor OpenRouter — three independent failure
// domains, so no single company's bad day takes the chat offline.
//
// Tiers with no key configured are skipped, so adding a provider is a matter of
// setting an env var, not a code change.

import Anthropic from '@anthropic-ai/sdk';

const env = (name: string): string | undefined =>
  ((import.meta.env ?? {}) as Record<string, string | undefined>)[name] ?? process.env[name];

// Each attempt gets its own budget. Kept short on purpose: a visitor waiting on
// a dead provider should move down the ladder in seconds, not minutes.
const TIER_TIMEOUT_MS = 12_000;

const ANTHROPIC_MODEL = 'claude-haiku-4-5';

// OpenRouter tries these in order within a single request, falling through on
// downtime, rate limits and context errors. The Claude entry is first so the
// answer keeps the same voice whenever possible; `provider.ignore` forces it
// onto Bedrock/Azure/Vertex, since routing back to the provider that just failed
// would defeat the point.
const OPENROUTER_MODELS = [
  'anthropic/claude-haiku-4.5', // $1.00 / $5.00 per MTok — same price as direct
  'openai/gpt-5-mini',          // $0.25 / $2.00
  'google/gemini-2.5-flash-lite', // $0.10 / $0.40
];

// Google renames these often; override with GEMINI_MODEL rather than editing.
const GEMINI_MODEL = env('GEMINI_MODEL') ?? 'gemini-flash-latest';

export type LlmResult = {
  text: string;
  /** which tier answered — logged so failover is visible after the fact */
  tier: string;
  refusal: boolean;
};

export class NoProviderAvailable extends Error {
  attempts: string[];
  constructor(attempts: string[]) {
    super(`all providers failed: ${attempts.join(', ')}`);
    this.attempts = attempts;
  }
}

export type Turn = { role: 'user' | 'assistant'; content: string };

// ---- failover policy --------------------------------------------------------

/**
 * Whether a failed attempt should move to the next provider.
 *
 * Deliberately narrow. Failing over on the wrong error is worse than not failing
 * over at all: a 400 means the request itself is malformed and will fail
 * identically downstream, and a spend-cap rejection must NOT be routed around —
 * doing so would quietly spend past the limit that was set on purpose.
 */
function shouldFailover(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  const message = String((err as Error)?.message ?? '').toLowerCase();

  // Budget rejections are a decision, not a fault. Never route around them.
  if (/credit balance|billing|quota|spend limit|insufficient funds/.test(message)) {
    return false;
  }

  // No status at all means the connection never completed: DNS, TLS, timeout,
  // socket reset. Exactly the shape of an outage.
  if (typeof status !== 'number') return true;

  return status === 408 || status === 429 || status >= 500;
}

// ---- tier 1: Anthropic direct ----------------------------------------------

async function callAnthropic(
  key: string,
  system: string,
  turns: Turn[],
  maxTokens: number
): Promise<LlmResult> {
  // maxRetries stays low so a hard outage reaches tier 2 quickly rather than
  // burning the visitor's patience on retries against a dead endpoint.
  const client = new Anthropic({ apiKey: key, timeout: TIER_TIMEOUT_MS, maxRetries: 1 });

  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: maxTokens,
    system: [{ type: 'text', text: system }],
    messages: turns,
  });

  if (response.stop_reason === 'refusal') {
    return { text: '', tier: 'anthropic', refusal: true };
  }

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();

  return { text, tier: 'anthropic', refusal: false };
}

// ---- tier 2: OpenRouter -----------------------------------------------------

async function callOpenRouter(
  key: string,
  system: string,
  turns: Turn[],
  maxTokens: number
): Promise<LlmResult> {
  // OpenAI-format rather than OpenRouter's Anthropic-compatible endpoint: the
  // docs are ambiguous about whether that endpoint honours non-Anthropic
  // routing, and failover is the wrong place to rely on an ambiguity. This
  // shape is plain fetch — no extra dependency.
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    signal: AbortSignal.timeout(TIER_TIMEOUT_MS),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
      'HTTP-Referer': 'https://maystash.xyz',
      'X-Title': 'maystash',
    },
    body: JSON.stringify({
      models: OPENROUTER_MODELS,
      provider: { ignore: ['anthropic'] },
      max_tokens: maxTokens,
      messages: [{ role: 'system', content: system }, ...turns],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw Object.assign(new Error(`openrouter ${res.status}: ${detail.slice(0, 200)}`), {
      status: res.status,
    });
  }

  const body = await res.json();
  const text = String(body?.choices?.[0]?.message?.content ?? '').trim();
  if (!text) throw new Error('openrouter returned no content');

  // body.model names the model that actually served it, which is the whole
  // reason this is worth logging: it shows which backstop caught the fall.
  return { text, tier: `openrouter:${body?.model ?? 'unknown'}`, refusal: false };
}

// ---- tier 3: Google direct --------------------------------------------------

async function callGemini(
  key: string,
  system: string,
  turns: Turn[],
  maxTokens: number
): Promise<LlmResult> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const res = await fetch(url, {
    method: 'POST',
    signal: AbortSignal.timeout(TIER_TIMEOUT_MS),
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      // Gemini calls the assistant role "model".
      contents: turns.map((t) => ({
        role: t.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: t.content }],
      })),
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw Object.assign(new Error(`gemini ${res.status}: ${detail.slice(0, 200)}`), {
      status: res.status,
    });
  }

  const body = await res.json();
  const text = String(
    body?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') ?? ''
  ).trim();
  if (!text) throw new Error('gemini returned no content');

  return { text, tier: `gemini:${GEMINI_MODEL}`, refusal: false };
}

// ---- identity scrubbing -----------------------------------------------------

const IDENTITY_LINE =
  "I'm the assistant on May's site — he swaps the model behind me, so I'm not tied to one provider.";

// Self-reference and a lab/model name in the same sentence is the giveaway. Both
// must be present: May's writing legitimately names labs (the water piece names
// Mistral), and stripping those would mangle a correct answer.
const SELF_REF =
  /\b(i'?m|i am|i'?ve been|i was (?:built|made|created|trained)|i run on|i'?m running|my model|my underlying|the model behind me|built by|made by|created by|powered by|trained by)\b/i;
const LAB_OR_MODEL =
  /\b(claude|anthropic|chatgpt|gpt-?\d|openai|gemini|bard|google deepmind|deepmind|llama|meta ai|kimi|moonshot|mistral|grok|xai|deepseek|qwen)\b/i;

/**
 * Removes any sentence in which the assistant names the model or lab behind it,
 * replacing the first such sentence with a provider-neutral line.
 *
 * The system prompt asks the model not to do this; this is the backstop for when
 * it does anyway. Prompt-level suppression is soft — a determined visitor can
 * often talk a model into naming itself — so the guarantee lives here instead.
 */
export function scrubModelIdentity(text: string): { text: string; scrubbed: boolean } {
  // Split on sentence ends, keeping the terminator attached.
  const parts = text.match(/[^.!?\n]+[.!?]*\n*/g);
  if (!parts) return { text, scrubbed: false };

  let scrubbed = false;
  const kept = parts.filter((s) => {
    if (SELF_REF.test(s) && LAB_OR_MODEL.test(s)) {
      scrubbed = true;
      return false;
    }
    return true;
  });

  if (!scrubbed) return { text, scrubbed: false };

  const rest = kept.join('').trim();
  // Lead with the neutral line so the answer still addresses what was asked.
  return { text: rest ? `${IDENTITY_LINE} ${rest}` : IDENTITY_LINE, scrubbed: true };
}

// ---- the ladder -------------------------------------------------------------

/**
 * Asks the first provider that is configured and reachable.
 *
 * Throws NoProviderAvailable only when every configured tier fails; a refusal
 * from tier 1 is a real answer and stops the ladder.
 */
export async function askModel(
  system: string,
  turns: Turn[],
  maxTokens: number
): Promise<LlmResult> {
  const anthropicKey = env('ANTHROPIC_API_KEY');
  const openRouterKey = env('OPENROUTER_API_KEY');
  const geminiKey = env('GEMINI_API_KEY');

  const ladder: Array<{ name: string; run: () => Promise<LlmResult> }> = [];
  if (anthropicKey) {
    ladder.push({ name: 'anthropic', run: () => callAnthropic(anthropicKey, system, turns, maxTokens) });
  }
  if (openRouterKey) {
    ladder.push({ name: 'openrouter', run: () => callOpenRouter(openRouterKey, system, turns, maxTokens) });
  }
  if (geminiKey) {
    ladder.push({ name: 'gemini', run: () => callGemini(geminiKey, system, turns, maxTokens) });
  }

  const attempts: string[] = [];

  for (const [i, tier] of ladder.entries()) {
    try {
      const result = await tier.run();
      if (i > 0) console.warn(`[llm] answered by fallback tier ${result.tier}`);
      return result;
    } catch (err) {
      attempts.push(`${tier.name}: ${(err as Error)?.message ?? 'unknown'}`);
      const isLast = i === ladder.length - 1;
      if (isLast || !shouldFailover(err)) {
        console.error(`[llm] ${tier.name} failed, not continuing:`, err);
        throw new NoProviderAvailable(attempts);
      }
      console.warn(`[llm] ${tier.name} failed, trying next provider:`, (err as Error)?.message);
    }
  }

  throw new NoProviderAvailable(attempts.length ? attempts : ['no provider configured']);
}

/** True when at least one provider key is present. */
export function hasAnyProvider(): boolean {
  return Boolean(env('ANTHROPIC_API_KEY') || env('OPENROUTER_API_KEY') || env('GEMINI_API_KEY'));
}
