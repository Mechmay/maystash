// Builds the chat assistant's knowledge of the site from the site itself.
//
// Publishing used to mean editing two files by hand: a summary in knowledge.ts
// and a slug in index.astro. Miss the first and the bot claims a published post
// doesn't exist; miss the second and it names a URL that renders as dead text.
// This reads the real content instead — posts, projects, the about page — and
// writes src/lib/content.generated.ts, so publishing is the only step.
//
// Runs automatically before every build (see package.json), or by hand:
//   node scripts/knowledge.mjs
//
// Drafts are excluded everywhere: an unpublished post 404s, so the bot must not
// know it exists.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// How much of a post's opening to quote when it has no botNotes. Enough for the
// bot to answer from, short enough that ten posts don't blow up the prompt.
const AUTO_EXCERPT_CHARS = 700;

// ---- frontmatter ------------------------------------------------------------

/**
 * Parses the subset of YAML the site actually uses: scalars, quoted strings,
 * inline arrays, and `|` / `>` block scalars (which botNotes needs).
 */
function parseFrontmatter(raw) {
  const block = raw.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!block) return { data: {}, body: raw };

  const body = raw.slice(raw.indexOf('\n---', 3) + 4).trim();
  const data = {};
  const lines = block.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    let value = rawValue.trim();

    // Block scalar: consume the indented lines that follow.
    if (value === '|' || value === '>' || value === '>-' || value === '|-') {
      const folded = value.startsWith('>');
      const parts = [];
      while (i + 1 < lines.length && /^\s{2,}\S|^\s*$/.test(lines[i + 1])) {
        i++;
        parts.push(lines[i].trim());
      }
      data[key] = folded
        ? parts.join(' ').replace(/\s+/g, ' ').trim()
        : parts.join('\n').trim();
      continue;
    }

    value = value.replace(/^["'](.*)["']$/, '$1');
    if (value.startsWith('[')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["'](.*)["']$/, '$1'))
        .filter(Boolean);
    } else if (value === 'true' || value === 'false') {
      data[key] = value === 'true';
    } else {
      data[key] = value;
    }
  }

  return { data, body };
}

// ---- markdown -> plain prose ------------------------------------------------

/** Strips markdown so the model reads prose, not syntax. */
function toProse(md) {
  return md
    .replace(/```[\s\S]*?```/g, '')        // fenced code
    .replace(/^\s*>\s?/gm, '')             // blockquote markers
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')  // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> their text
    .replace(/[*_`]/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^\s*[-–—]{3,}\s*$/gm, '');
}

/** First few paragraphs of a post, as a fallback when botNotes is absent. */
function openingOf(body) {
  const paras = toProse(body)
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 40);

  let out = '';
  for (const p of paras) {
    if (out.length + p.length > AUTO_EXCERPT_CHARS) break;
    out += (out ? ' ' : '') + p;
  }
  return out || paras[0]?.slice(0, AUTO_EXCERPT_CHARS) || '';
}

/** Wraps prose so the generated file stays readable in a diff. */
function wrap(text, width, indent) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const w of words) {
    if (line && (line + ' ' + w).length > width) {
      lines.push(line);
      line = w;
    } else line = line ? `${line} ${w}` : w;
  }
  if (line) lines.push(line);
  return lines.map((l, i) => (i === 0 ? l : indent + l)).join('\n');
}

// ---- collect ----------------------------------------------------------------

function readCollection(dir) {
  const path = join(root, dir);
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, body } = parseFrontmatter(readFileSync(join(path, f), 'utf8'));
      return { slug: f.replace(/\.md$/, ''), data, body };
    })
    .filter((e) => e.data.draft !== true); // drafts 404 — the bot must not cite them
}

const posts = readCollection('src/posts').sort(
  (a, b) => new Date(b.data.date) - new Date(a.data.date)
);
const projects = readCollection('src/projects').sort(
  (a, b) => Number(a.data.order ?? 99) - Number(b.data.order ?? 99)
);

// The about page is hand-written HTML rather than a collection, so pull its
// paragraphs directly. Keeps May's own words in the bot's mouth.
function aboutParagraphs() {
  const file = join(root, 'src/pages/about.astro');
  if (!existsSync(file)) return [];
  const html = readFileSync(file, 'utf8');
  return [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)]
    .map((m) =>
      m[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&mdash;/g, '—')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter((p) => p.length > 30 && !p.includes('{'));
}

// ---- render -----------------------------------------------------------------

const out = [];

out.push('# MY WRITING (maystash.xyz)');
out.push('');
out.push('Two tracks:');
out.push('- FEATURE PRESENTATION — technical field notes, deep and reproducible.');
out.push('- MATINEE — plain-language pieces on tech questions everyone asks, no jargon.');
out.push('');
out.push('Published pieces, newest first, each with the URL to send people to.');
out.push('Always give the specific piece\'s URL, never just "maystash.xyz", when');
out.push('pointing at an article.');
out.push('');

posts.forEach((p, i) => {
  const n = `${i + 1}.`;
  const track = p.data.section === 'matinee' ? 'MATINEE' : 'FEATURE';
  out.push(`${n} "${p.data.title}"`);
  out.push(`   ${track} — maystash.xyz/posts/${p.slug}/`);
  const detail = p.data.botNotes?.trim() || `${p.data.tagline} ${openingOf(p.body)}`;
  out.push(`   ${wrap(detail.replace(/\s+/g, ' ').trim(), 72, '   ')}`);
  if (p.data.tags?.length) out.push(`   Topics: ${p.data.tags.join(', ')}.`);
  out.push('');
});

out.push('# PROJECTS');
out.push('');
projects.forEach((p) => {
  const bits = [p.data.status?.toUpperCase(), p.data.year && `(${p.data.year})`, p.data.url]
    .filter(Boolean)
    .join(' ');
  out.push(`## ${p.data.title} — ${bits}`);
  out.push(wrap(`${p.data.tagline} ${toProse(p.body).replace(/\s+/g, ' ').trim()}`, 76, ''));
  if (p.data.tags?.length) out.push(`Tags: ${p.data.tags.join(', ')}.`);
  out.push('');
});

const about = aboutParagraphs();
if (about.length) {
  out.push('# ABOUT THIS SITE (May\'s own words, from the about page)');
  out.push('');
  for (const p of about) {
    out.push(wrap(p, 76, ''));
    out.push('');
  }
}

const content = out.join('\n').replace(/\n{3,}/g, '\n\n').trim();

// Backticks and ${} would break the template literal this lands inside.
const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

const file = `// GENERATED FILE — DO NOT EDIT.
// Written by scripts/knowledge.mjs from src/posts, src/projects and
// src/pages/about.astro. To change what the assistant knows, change the site:
// edit a post, a project, or the about page, then build (the generator runs
// first). For facts a post's own opening doesn't carry, add a \`botNotes\` field
// to its frontmatter and they'll be used verbatim.
//
// Regenerate by hand with: node scripts/knowledge.mjs

/** Slugs of every published (non-draft) post — used to linkify replies. */
export const POST_SLUGS: string[] = ${JSON.stringify(posts.map((p) => p.slug), null, 2)
  .split('\n')
  .join('\n')};

/** Everything on the site, formatted for the assistant's prompt. */
export const SITE_CONTENT = \`
${escaped}
\`.trim();
`;

writeFileSync(join(root, 'src/lib/content.generated.ts'), file);

console.log(
  `knowledge: ${posts.length} posts, ${projects.length} projects, ${about.length} about paragraphs ` +
    `-> src/lib/content.generated.ts (${content.length} chars)`
);
const noNotes = posts.filter((p) => !p.data.botNotes);
if (noNotes.length) {
  console.log(
    `           auto-summarised from the opening: ${noNotes.map((p) => p.slug).join(', ')}`
  );
}
