// Refuses to publish a journal line that gives away more than it means to.
//
// This is the last gate before a sentence May wrote becomes something a
// stranger's chatbot will repeat on request. It rejects rather than rewrites:
// a scrubber that quietly edits would leave him believing he'd said one thing
// while the site said another, and a near-miss edit is worse than a refusal.
//
// The threat isn't any single line. "Out for a hike" is harmless. "Out for a
// hike", plus a town, plus a time, plus "back Sunday" is a pattern of life —
// where he is, when the house is empty, and how to be there too. So the rules
// below block the *components* that make aggregation possible, not sentences
// that look alarming on their own.

export type OpsecVerdict = { ok: true } | { ok: false; reason: string };

const RULES: { test: RegExp; reason: string }[] = [
  {
    test: /\b\d{1,5}\s+[A-Z][a-z]+\s+(street|st|road|rd|avenue|ave|drive|dr|lane|ln|boulevard|blvd|way|crescent|cres|court|ct)\b/i,
    reason: 'looks like a street address',
  },
  {
    test: /\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b|\b\d{5}(-\d{4})?\b/,
    reason: 'looks like a postal or ZIP code',
  },
  {
    test: /\b(\+?\d[\d\s().-]{7,}\d)\b/,
    reason: 'looks like a phone number',
  },
  {
    test: /\b[\w.+-]+@(?!maystash\.xyz)[\w-]+\.[\w.]+\b/i,
    reason: 'contains an email address that is not hello@maystash.xyz',
  },
  {
    // A precise clock time turns a status into a schedule.
    test: /\b([01]?\d|2[0-3]):[0-5]\d\b|\b\d{1,2}\s?(am|pm)\b/i,
    reason: 'contains a specific time of day — say "lately", not "at 6pm"',
  },
  {
    // Same for a date: "this week" ages gracefully, "on the 14th" pins you.
    test: /\b(mon|tues|wednes|thurs|fri|satur|sun)day\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{1,2}\b|\b\d{1,2}\/\d{1,2}(\/\d{2,4})?\b/i,
    reason: 'contains a specific day or date — keep it vague ("lately", "this week")',
  },
  {
    // Presence and absence are the two facts worth the most to the wrong reader.
    test: /\b(i am|i'm|im|he is|he's|currently|right now|today)\s+(at|in|near|heading to|on my way|leaving for|flying to|away|out of town|abroad)\b/i,
    reason: 'states where you are or that you are away — describe the habit, not today',
  },
  {
    test: /\b(back on|home on|returning|be away until|gone until|until the)\b/i,
    reason: 'reveals a travel schedule',
  },
  {
    test: /\b(my (house|home|apartment|flat|street|neighbou?rhood|gym|office)|where i live)\b/i,
    reason: 'points at where you live or spend fixed time',
  },
];

/**
 * Checks one line intended for publication.
 *
 * Deliberately not clever: it looks for the shapes that enable aggregation and
 * says no. False positives are cheap — rewrite the line. A false negative is
 * permanent, because the assistant will repeat it to anyone who asks.
 */
export function checkShareable(line: string): OpsecVerdict {
  const text = line.trim();
  if (!text) return { ok: false, reason: 'empty' };
  if (text.length > 220) {
    return { ok: false, reason: 'too long — a status line, not a paragraph' };
  }
  for (const r of RULES) {
    if (r.test.test(text)) return { ok: false, reason: r.reason };
  }
  return { ok: true };
}
