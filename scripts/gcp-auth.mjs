// Google Cloud access tokens from a service-account key, with no SDK and no
// gcloud on the box.
//
// Why this file exists rather than `gcloud auth print-access-token`:
// the VPS does not have gcloud (nor does this Mac -- checked 2026-09-01), the
// Cloud SDK is a ~200MB install that needs its own updates, and this tree has
// no package.json on purpose so a script can be scp'd and run. Signing a JWT
// is ~30 lines against `node:crypto`, which is built in.
//
// The flow is Google's documented server-to-server one: build a JWT asserting
// "I am this service account and I want this scope", sign it with the account's
// private key, POST it to the token endpoint, get a 1-hour access token back.
//
// CREDENTIAL HANDLING. The key is read from GOOGLE_APPLICATION_CREDENTIALS (a
// path) or GCP_SERVICE_ACCOUNT_JSON (the JSON itself, for env-only deploys).
// A path is preferred: a private key in an env var ends up in `systemctl show`,
// in process listings on some systems, and in any crash dump that prints env.
// Neither is ever logged here -- see redact() at the bottom, and note that it
// redacts on VALUE SHAPE, not on key name, because the name of the field that
// holds a secret is not something this file gets to assume.

import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';

const TOKEN_SCOPE = 'https://www.googleapis.com/auth/cloud-platform';

const b64url = (buf) => Buffer.from(buf)
  .toString('base64')
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

let cached = null;   // { token, expiresAt }

export function loadServiceAccount() {
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const inline = process.env.GCP_SERVICE_ACCOUNT_JSON;
  let raw;
  if (path) {
    try { raw = readFileSync(path, 'utf8'); }
    catch (e) { throw new Error(`GOOGLE_APPLICATION_CREDENTIALS=${path} could not be read: ${e.code || e.message}`); }
  } else if (inline) {
    raw = inline;
  } else {
    throw new Error('no Google credentials: set GOOGLE_APPLICATION_CREDENTIALS (path to the service-account JSON) or GCP_SERVICE_ACCOUNT_JSON');
  }

  let sa;
  try { sa = JSON.parse(raw); }
  catch { throw new Error('service-account credentials are not valid JSON'); }

  // Fail on the specific missing field rather than on a 400 from Google an
  // hour later. `type` is checked because the easiest wrong file to grab from
  // the Cloud Console is an OAuth *client* JSON, which has none of these and
  // produces a baffling `invalid_grant`.
  if (sa.type && sa.type !== 'service_account') {
    throw new Error(`credentials are type "${sa.type}", not a service account -- this is probably an OAuth client JSON, which is a different download`);
  }
  for (const f of ['client_email', 'private_key']) {
    if (!sa[f]) throw new Error(`service-account JSON is missing "${f}"`);
  }
  return sa;
}

export async function accessToken({ force = false } = {}) {
  // 60s of slack: a token that expires mid-request is a 401 on a call that
  // already cost money to prepare.
  if (!force && cached && Date.now() < cached.expiresAt - 60_000) return cached.token;

  const sa = loadServiceAccount();
  const aud = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email, scope: TOKEN_SCOPE, aud, iat, exp,
  }));

  // Escaped newlines survive a round-trip through .env and through some secret
  // managers; an unrepaired key fails with "error:0909006C:PEM routines", which
  // reads like a corrupt key rather than a formatting one.
  const pem = sa.private_key.includes('\\n')
    ? sa.private_key.replace(/\\n/g, '\n')
    : sa.private_key;

  let signature;
  try {
    signature = b64url(createSign('RSA-SHA256').update(`${header}.${claims}`).end().sign(pem));
  } catch (e) {
    throw new Error(`could not sign with the service-account private key: ${e.message}`);
  }

  const res = await fetch(aud, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    // Google's errors here are terse and the causes are unguessable, so name
    // the two that account for nearly all of them.
    let hint = '';
    if (/invalid_grant/.test(text)) hint = ' -- clock skew over ~5 min, or the key was deleted/disabled in IAM';
    if (/invalid_scope|access_denied/.test(text)) hint = ' -- the service account lacks the aiplatform.user role on the project (shown in the console as "Agent Platform User" since the 2026 Vertex AI -> Gemini Enterprise Agent Platform rename; the role ID is unchanged)';
    throw new Error(`token exchange failed ${res.status}: ${redact(text)}${hint}`);
  }

  const json = JSON.parse(text);
  if (!json.access_token) throw new Error(`token endpoint returned no access_token: ${redact(text)}`);

  cached = { token: json.access_token, expiresAt: Date.now() + (json.expires_in || 3600) * 1000 };
  return cached.token;
}

// Redact on the SHAPE of the value, never on the name of the field holding it.
// Straight from the cue.md audit: a redactor keyed on field names misses the
// secret the moment someone names the field something else.
export function redact(s) {
  return String(s)
    .replace(/-----BEGIN[\s\S]*?END [A-Z ]*-----/g, '[private key redacted]')
    .replace(/\bya29\.[A-Za-z0-9._-]+/g, '[access token redacted]')
    .replace(/\b[A-Za-z0-9._-]{24,}\.[A-Za-z0-9._-]{24,}\.[A-Za-z0-9._-]{24,}\b/g, '[jwt redacted]');
}
