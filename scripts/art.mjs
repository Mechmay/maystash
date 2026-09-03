// Editorial cover art for maystash posts, rendered on Vertex (Gemini image).
//
// This is the SIBLING of content-machine/scripts/design.mjs, not a reuse. That
// script renders TEXT SLIDES and verifies the words came back correct. This one
// renders the opposite: cinematic images with NO text at all, because the site
// already sets every headline in HTML (Anton/Space Mono) and generated lettering
// is exactly where these models embarrass themselves. So: no verbatim-check loop,
// 3:2 not 4:5, and a house art-direction suffix welded onto every prompt so the
// whole gallery reads as one film.
//
// Auth is the proven path: gcp-auth.mjs signs a JWT from the service-account key
// at GOOGLE_APPLICATION_CREDENTIALS. Same key, same project as the content machine.
//
// Usage:
//   node scripts/art.mjs <slug>        # render one post's images
//   node scripts/art.mjs --all         # render every post in the manifest
//   node scripts/art.mjs <slug> --dry  # print prompts, spend nothing
//
// Output: public/art/<slug>-NN.jpg  (NN = 01, 02, ...)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { accessToken } from './gcp-auth.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const ART_DIR = join(ROOT, 'public', 'art');

const PROJECT  = process.env.GCP_PROJECT_ID;
const LOCATION = process.env.GCP_LOCATION || 'global';
const MODEL    = process.env.CM_IMAGE_MODEL || 'gemini-3-pro-image';
const ASPECT   = process.env.ART_ASPECT || '3:2';
const IMAGE_COST = Number(process.env.CM_IMAGE_COST_USD || 0.134);
const CAP        = Number(process.env.ART_CAP_USD || 8);

// The house look, welded onto every prompt. This is the maystash OG palette
// (see scripts/og.mjs): near-black ground, bone, klein blue #2823f0, acid #d8ff3e.
// Editorial-cinema, single hard light, film grain, and — load-bearing — NO TEXT,
// because the page supplies its own type and the model cannot spell.
const HOUSE = [
  'Editorial cinema still, cinematic wide shot, 3:2.',
  'Near-black background, deep shadow, a single hard directional light source.',
  'Muted desaturated palette of bone white and charcoal, with exactly ONE accent',
  'colour used sparingly — either electric klein blue (#2823f0) or acid yellow-green (#d8ff3e).',
  'Fine 35mm film grain, subtle vignette, shallow depth of field.',
  'Restrained, moody, premium — the visual language of a title card, not a stock photo.',
  'ABSOLUTELY NO TEXT, no letters, no numbers, no words, no logos, no watermarks, no captions anywhere in the image.',
].join(' ');

// One or more scenes per post. Keep each scene a PLACE or an OBJECT — the
// metaphor made physical — never a literal diagram and never a person's face.
const MANIFEST = {
  'agents-need-a-leash': [
    'A dim server room at 3:47 AM, one machine rack awake and glowing while the rest sit dark. '
    + 'Its single indicator LED throws a thin electric-blue line of light across a bare concrete floor. '
    + 'In the foreground, six frayed rope ends lie coiled and unattached to anything, catching the edge of the light.',
  ],
  'we-gave-him-a-different-puzzle': [
    'Two identical paper puzzle cards laid on black felt under one hard overhead lamp. '
    + 'The left card sits crisp inside the pool of light; the right card lies just outside it, in shadow. '
    + 'A single stroke of acid yellow-green catches the lit card\'s torn edge.',
  ],
  'receipts': [
    'A long paper receipt curling out of an old thermal printer in near-darkness, '
    + 'lit by one hard raking light so the paper glows against black. '
    + 'The roll trails off the edge of a desk into shadow; a thin line of klein blue rims the printer\'s slot.',
  ],
  'thirsty-machines': [
    'A backyard grill at dusk seen in cinematic wide shot, a single burger on the grate catching warm light, '
    + 'and behind it, across a chain-link fence, the cold silhouette of a data-center cooling tower breathing pale vapour into a bruised orange sky. '
    + 'Warm foreground, cold industrial background.',
  ],
  'player-who-never-lost': [
    'An empty competition leaderboard rendered as a physical departures-board in a dark hall, '
    + 'one top row lit and all rows below it falling into shadow. '
    + 'A single acid yellow-green pixel-glow marks the top line. Long cinematic shadows.',
  ],
  'injection-is-a-con-job': [
    'A grand hotel lobby at night, marble and shadow, a single figure-shaped absence of light walking past an unattended security desk toward a bank of elevators. '
    + 'One klein-blue lamp glows over the desk. Nobody is looking. Deep noir shadows, cinematic wide.',
  ],
  'brain-that-sleeps': [
    'A single filing cabinet drawer open in a dark archive, one folder inside it lit from within by a soft klein-blue glow, '
    + 'the rest of the cabinet receding into black. Motes of dust hang in the single shaft of light. Cinematic, still, quiet.',
  ],
  'coworker-who-never-logs-out': [
    'An open-plan office at 3 AM, every desk dark and empty except one, where a monitor still glows and an empty ergonomic chair sits slightly turned, as if just vacated. '
    + 'The glow spills klein blue across the empty desks around it. Cinematic wide, long shadows.',
  ],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);

async function render(token, prompt, attempt = 0) {
  const url = `https://${LOCATION === 'global' ? '' : LOCATION + '-'}aiplatform.googleapis.com`
    + `/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `${prompt}\n\n${HOUSE}` }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: ASPECT,
          imageOutputOptions: { mimeType: 'image/jpeg', compressionQuality: 90 },
        },
      },
    }),
  });
  const text = await res.text();
  if ((res.status === 429 || res.status === 503) && attempt < 3) {
    const wait = 2 ** attempt * 15_000;
    log(`  quota (${res.status}), waiting ${wait / 1000}s`);
    await sleep(wait);
    return render(token, prompt, attempt + 1);
  }
  if (!res.ok) throw new Error(`vertex ${res.status}: ${text.slice(0, 400)}`);
  const json = JSON.parse(text);
  const cand = json.candidates?.[0];
  const part = cand?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part) throw new Error(`no image (finishReason=${cand?.finishReason || 'none'}) — a safety filter may have tripped on the prompt`);
  return Buffer.from(part.inlineData.data, 'base64');
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry');
  const all = args.includes('--all');
  const slugs = all ? Object.keys(MANIFEST) : args.filter((a) => !a.startsWith('--'));
  if (!slugs.length) {
    console.error('usage: node scripts/art.mjs <slug> [--dry] | --all');
    process.exit(1);
  }

  const jobs = [];
  for (const slug of slugs) {
    const scenes = MANIFEST[slug];
    if (!scenes) { console.error(`no manifest entry for "${slug}"`); process.exit(1); }
    scenes.forEach((prompt, i) => jobs.push({ slug, n: i + 1, prompt }));
  }

  const est = jobs.length * IMAGE_COST;
  log(`${jobs.length} image(s), est $${est.toFixed(2)} (cap $${CAP})`);
  if (est > CAP) { console.error(`estimate exceeds cap — raise ART_CAP_USD to proceed`); process.exit(1); }

  if (dry) {
    for (const j of jobs) log(`\n[${j.slug}-${String(j.n).padStart(2, '0')}]\n${j.prompt}\n${HOUSE}`);
    return;
  }

  mkdirSync(ART_DIR, { recursive: true });
  const token = await accessToken();
  let spent = 0;
  for (const j of jobs) {
    const name = `${j.slug}-${String(j.n).padStart(2, '0')}.jpg`;
    process.stdout.write(`rendering ${name} ... `);
    const buf = await render(token, j.prompt);
    writeFileSync(join(ART_DIR, name), buf);
    spent += IMAGE_COST;
    log(`ok (${(buf.length / 1024).toFixed(0)} KB)`);
  }
  log(`\ndone — ${jobs.length} image(s), ~$${spent.toFixed(2)} of Vertex credit`);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
