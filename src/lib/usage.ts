// Shared rate/usage counters for the chat assistant.
//
// The endpoint used to count in module memory. On Vercel that means each
// serverless instance keeps its own tally and every cold start resets it, so a
// "1500 answers/day" cap was really 1500 *per instance* — no bound on spend at
// all once traffic spread across instances. These counters live in Postgres, so
// every instance reads the same number.
//
// Both checks happen in one round trip via a security-definer function; the
// tables themselves are RLS-locked and unreadable with this key.

const SUPABASE_URL = import.meta.env.SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

export type UsageVerdict = {
  dayOk: boolean;
  ipOk: boolean;
  dayCount: number;
  /** true when the shared counter was unreachable and the local one was used */
  degraded: boolean;
};

// Fallback, used only when the shared counter can't be reached. Same behaviour
// as the old in-memory implementation: weak, but better than failing open.
const localHits = new Map<string, number[]>();
let localDayKey = new Date().toISOString().slice(0, 10);
let localDayCount = 0;

function localCheck(ip: string, dayCap: number, ipCap: number, windowMs: number): UsageVerdict {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== localDayKey) {
    localDayKey = today;
    localDayCount = 0;
  }
  localDayCount += 1;

  const now = Date.now();
  const recent = (localHits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  localHits.set(ip, recent);
  if (localHits.size > 5000) localHits.clear();

  return {
    dayOk: localDayCount <= dayCap,
    ipOk: recent.length <= ipCap,
    dayCount: localDayCount,
    degraded: true,
  };
}

/**
 * Records one request and reports whether it is allowed. Increments first, then
 * compares — the same order the in-memory version used, so the caps mean the
 * same thing they did before.
 */
export async function recordRequest(
  ip: string,
  dayCap: number,
  ipCap: number,
  windowMs: number
): Promise<UsageVerdict> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return localCheck(ip, dayCap, ipCap, windowMs);

  try {
    // Don't let a slow database hold up an answer; fall back instead.
    const abort = AbortSignal.timeout(2500);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/maystash_bump_chat_usage`, {
      method: 'POST',
      signal: abort,
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({ p_ip: ip, p_day_cap: dayCap, p_ip_cap: ipCap }),
    });

    if (!res.ok) throw new Error(`counter responded ${res.status}`);

    const rows = await res.json();
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row || typeof row.day_ok !== 'boolean') throw new Error('counter returned no row');

    return {
      dayOk: row.day_ok,
      ipOk: row.ip_ok,
      dayCount: row.day_count ?? 0,
      degraded: false,
    };
  } catch (err) {
    console.error('[usage] shared counter unavailable, using local fallback:', err);
    return localCheck(ip, dayCap, ipCap, windowMs);
  }
}
