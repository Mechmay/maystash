import type { APIRoute } from 'astro';

export const prerender = false;

// Serve content-machine carousel slides from a domain May owns.
//
// WHY THIS EXISTS. TikTok photo posts accept only `source: PULL_FROM_URL` --
// there is no FILE_UPLOAD path for photos -- and TikTok will only pull from a
// URL prefix that has been VERIFIED as owned in its developer portal. The
// images live in Supabase Storage, which serves from *.supabase.co: a domain
// May does not own and can never verify. So the bytes have to come from here.
//
// A REDIRECT DOES NOT WORK. TikTok fetches the file itself and follows the
// redirect to the unverified host, which is exactly what the check is for.
// This streams the bytes so the response genuinely originates from maystash.xyz.
//
// Register `https://maystash.xyz/cm/` as a URL property on the TikTok app.
// The trailing slash matters -- TikTok matches on the exact prefix string.

// Public by design: the bucket is public because both platforms fetch the
// media anonymously. Not a secret, so a fallback keeps this working without a
// Vercel env var. Override if the project ever moves.
const SUPABASE_URL =
  import.meta.env.SUPABASE_URL ?? 'https://ejjbswyjgpyimeucjehj.supabase.co';

const BUCKET = 'cm-carousels';

// Storage layout is `<copyId>/<nn>.jpg`, written by design.mjs. Anchored and
// deliberately narrow: this endpoint is an open door onto a storage bucket, so
// it must forward only the exact shape the Designer produces. Without this a
// crafted path could reach any other object in the bucket, and `..` segments
// could try to climb out of it.
const SAFE_PATH = /^\d+\/\d{2}\.jpg$/;

export const GET: APIRoute = async ({ params }) => {
  const path = Array.isArray(params.path) ? params.path.join('/') : (params.path ?? '');

  if (!SAFE_PATH.test(path)) {
    return new Response('Not found', { status: 404 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`);
  } catch {
    // TikTok retries a 502; a thrown error would surface as a 500 with a stack.
    return new Response('Upstream unavailable', { status: 502 });
  }

  if (!upstream.ok) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      // Pinned rather than forwarded. The bucket only accepts image/jpeg, and
      // echoing an upstream content-type would let a mis-uploaded object
      // change what this endpoint claims to serve.
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
