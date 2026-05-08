/**
 * Cloudflare Pages Function — POST /api/reveal-phone
 *
 * Layers of protection:
 *   Layer 2 — Phone number never in client HTML. Only returned by this server function.
 *   Layer 3 — Cloudflare Turnstile token validation before any data is returned.
 *   Layer 4 — IP-based rate limiting via Cloudflare KV (max 10 reveals/hour per IP).
 *             Falls back gracefully if KV is not bound (just skips rate limiting).
 *
 * Environment variables required (Cloudflare Dashboard → Pages → Settings → Env vars):
 *   TURNSTILE_SECRET_KEY  — from dash.cloudflare.com → Turnstile → your widget → Secret Key
 *   CONTACT_PHONE         — the raw digits, e.g. 8059106096
 *
 * Optional KV binding (for Layer 4 rate limiting):
 *   KV binding named RATE_LIMIT_KV in Cloudflare Dashboard → Pages → Settings → Functions → KV bindings
 *
 * Turnstile site key (public — goes in PhoneReveal.tsx):
 *   Get from dash.cloudflare.com → Turnstile → Add widget → choose "Invisible" or "Managed"
 *   Domain: grg-studios.com (or your Cloudflare Pages domain)
 */

interface Env {
  TURNSTILE_SECRET_KEY: string;
  CONTACT_PHONE: string;
  RATE_LIMIT_KV?: KVNamespace;  // optional — rate limiting
}

const RATE_LIMIT_MAX     = 10;    // max reveals per window
const RATE_LIMIT_WINDOW  = 3600;  // seconds (1 hour)

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  // ── Parse body ─────────────────────────────────────────────────────────
  let token: string;
  try {
    const body = await request.json() as { token?: string };
    token = body?.token ?? '';
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400, headers });
  }

  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing challenge token.' }), { status: 400, headers });
  }

  // ── Layer 3: Validate Turnstile token ──────────────────────────────────
  if (!env.TURNSTILE_SECRET_KEY) {
    console.error('TURNSTILE_SECRET_KEY not set');
    return new Response(JSON.stringify({ error: 'Server configuration error.' }), { status: 500, headers });
  }

  const clientIP = request.headers.get('CF-Connecting-IP') ?? 'unknown';

  const formData = new FormData();
  formData.append('secret',   env.TURNSTILE_SECRET_KEY);
  formData.append('response', token);
  formData.append('remoteip', clientIP);

  let turnstileOk = false;
  try {
    const tsRes  = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body:   formData,
    });
    const tsData = await tsRes.json() as { success: boolean };
    turnstileOk  = tsData.success === true;
  } catch (err) {
    console.error('Turnstile verification failed:', err);
    return new Response(JSON.stringify({ error: 'Challenge verification failed.' }), { status: 502, headers });
  }

  if (!turnstileOk) {
    return new Response(JSON.stringify({ error: 'Challenge failed. Please try again.' }), { status: 403, headers });
  }

  // ── Layer 4: IP rate limiting via KV (optional) ────────────────────────
  if (env.RATE_LIMIT_KV) {
    const kvKey = `phone_reveal:${clientIP}`;
    try {
      const existing = await env.RATE_LIMIT_KV.get(kvKey);
      const count    = existing ? parseInt(existing, 10) : 0;

      if (count >= RATE_LIMIT_MAX) {
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please try again later.' }),
          { status: 429, headers }
        );
      }

      // Increment counter; set TTL only on first write
      await env.RATE_LIMIT_KV.put(kvKey, String(count + 1), {
        expirationTtl: count === 0 ? RATE_LIMIT_WINDOW : undefined,
      });
    } catch (err) {
      // KV errors should not block the user — log and continue
      console.warn('Rate limit KV error (non-fatal):', err);
    }
  }

  // ── Return the phone number ────────────────────────────────────────────
  // CONTACT_PHONE env var holds plain digits e.g. "8059106096"
  // We return it as a JSON payload — the client does display obfuscation (Layer 1).
  const phone = env.CONTACT_PHONE;
  if (!phone) {
    console.error('CONTACT_PHONE env var not set');
    return new Response(JSON.stringify({ error: 'Server configuration error.' }), { status: 500, headers });
  }

  return new Response(JSON.stringify({ phone }), { status: 200, headers });
};

// Handle OPTIONS preflight + reject non-POST
export const onRequest: PagesFunction<Env> = async ({ request, next }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return next();
};
