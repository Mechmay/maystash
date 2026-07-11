// Generates OG images + favicons for maystash.xyz.
// Run after adding a post: node scripts/og.mjs
// Outputs: public/og/default.png, public/og/<post-id>.png, public/favicon-*.png, public/apple-touch-icon.png
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontFiles = ['anton.ttf', 'spacemono.ttf', 'spacemono-bold.ttf'].map((f) =>
  join(root, 'scripts/fonts', f)
);

const INK = '#0c0c0e';
const BONE = '#ece7dd';
const DIM = '#a9a49a';
const KLEIN = '#2823f0';
const ACID = '#d8ff3e';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Greedy word-wrap for Anton at a given px size (Anton avg glyph ≈ 0.52em wide).
function wrap(text, size, maxWidth) {
  const perChar = size * 0.52;
  const maxChars = Math.floor(maxWidth / perChar);
  const words = text.toUpperCase().split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const cand = line ? `${line} ${w}` : w;
    if (cand.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else line = cand;
  }
  if (line) lines.push(line);
  return lines;
}

function render(svg, outPath, width) {
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Anton' },
  }).render().asPng();
  writeFileSync(outPath, png);
  console.log('wrote', outPath);
}

function ogCard({ slate, title, footerLeft, footerRight, titleSize = 96 }) {
  const lines = wrap(title, titleSize, 1040);
  const lineH = titleSize * 1.04;
  const blockH = lines.length * lineH;
  const startY = 315 - blockH / 2 + lineH * 0.78;
  const titleSvg = lines
    .map(
      (l, i) => `
      <text x="80" y="${startY + i * lineH + 4}" font-family="Anton" font-size="${titleSize}" fill="${KLEIN}">${esc(l)}</text>
      <text x="76" y="${startY + i * lineH}" font-family="Anton" font-size="${titleSize}" fill="${BONE}">${esc(l)}</text>`
    )
    .join('');
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${INK}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${KLEIN}"/>
  <text x="76" y="96" font-family="Space Mono" font-size="22" letter-spacing="3" fill="${DIM}">${esc(slate)}</text>
  ${titleSvg}
  <line x1="76" y1="552" x2="1124" y2="552" stroke="#26262b" stroke-width="1"/>
  <text x="76" y="592" font-family="Space Mono" font-size="22" letter-spacing="3" fill="${ACID}">${esc(footerLeft)}</text>
  <text x="1124" y="592" text-anchor="end" font-family="Space Mono" font-size="22" letter-spacing="3" fill="${DIM}">${esc(footerRight)}</text>
</svg>`;
}

// Favicon: ink tile, acid clapper notch, Anton "m" — no emoji, reads at 16px.
const favicon = `<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="24" fill="${INK}"/>
  <rect x="0" y="0" width="128" height="26" rx="13" fill="${KLEIN}"/>
  <rect x="18" y="4" width="14" height="18" rx="3" transform="skewX(-18)" fill="${BONE}"/>
  <rect x="52" y="4" width="14" height="18" rx="3" transform="skewX(-18)" fill="${BONE}"/>
  <rect x="86" y="4" width="14" height="18" rx="3" transform="skewX(-18)" fill="${BONE}"/>
  <text x="50" y="106" text-anchor="middle" font-family="Anton" font-size="78" fill="${BONE}">m</text>
  <rect x="88" y="58" width="16" height="48" fill="${ACID}"/>
</svg>`;

// --- default/brand card ---
render(
  ogCard({
    slate: 'SCENE 001 · INT. INTERNET — NIGHT · TAKE ∞',
    title: 'maystash',
    footerLeft: 'MAYSTASH.XYZ',
    footerRight: 'TECH · BRAINS · BUILDS',
    titleSize: 190,
  }),
  join(root, 'public/og/default.png'),
  1200
);

// --- per-post cards from frontmatter ---
const postsDir = join(root, 'src/posts');
for (const f of readdirSync(postsDir).filter((f) => f.endsWith('.md'))) {
  const raw = readFileSync(join(postsDir, f), 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const title = fm.match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1] ?? f;
  const chapter = fm.match(/^chapter:\s*["']?(\w+)["']?\s*$/m)?.[1] ?? '';
  const id = f.replace(/\.md$/, '');
  render(
    ogCard({
      slate: `MAYSTASH — CH.${chapter}`,
      title,
      footerLeft: 'MAYSTASH.XYZ',
      footerRight: 'A FEATURE PRESENTATION',
      titleSize: 76,
    }),
    join(root, `public/og/${id}.png`),
    1200
  );
}

// --- favicons ---
render(favicon, join(root, 'public/favicon-32.png'), 32);
render(favicon, join(root, 'public/favicon-192.png'), 192);
render(favicon, join(root, 'public/apple-touch-icon.png'), 180);
writeFileSync(join(root, 'public/favicon.svg'), favicon);
console.log('done');
