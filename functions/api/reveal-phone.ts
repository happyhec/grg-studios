/**
 * Cloudflare Pages Function — POST /api/reveal-phone
 *
 * Security layers handled here:
 *   Layer 3 (soft) — Turnstile token verified when present; skipped when absent
 *                    so a Turnstile misconfiguration never fully blocks the feature.
 *   Layer 4        — IP rate limiting via KV (optional — skipped if KV not bound)
 *
 * ENV VARS (Cloudflare Dashboard → Pages → Settings → Environment variables):
 *   CONTACT_PHONE          = 8059106096          ← required
 *   TURNSTILE_SECRET_KEY   = 0x...               ← optional but recommended
 *
 * OPTIONAL KV binding for rate limiting:
 *   Binding name: RATE_LIMIT_KV
 */

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_PHONE?: string;
  RATE_LIMIT_KV?: KVNamespace;
}

type TurnstileVerifyResponse = { success?: boolean };

const RATE_LIMIT_MAX            = 10;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60; // 1 hour

const jsonHeaders = {
  'Content-Type':                'application/json',
  'Access-Control-Allow-Origin': '*',
};

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { ...jsonHeaders, ...init?.headers },
  });
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const fd = new FormData();
  fd.append('secret',   secret);
  fd.append('response', token);
  fd.append('remoteip', ip);
  const res  = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: fd });
  const data = await res.json() as TurnstileVerifyResponse;
  return res.ok && data.success === true;
}

async function checkRateLimit(env: Env, ip: string): Promise<Response | null> {
  if (!env.RATE_LIMIT_KV) return null;
  const key   = `phone_reveal:${ip}`;
  const existing = await env.RATE_LIMIT_KV.get(key);
  const count = existing ? parseInt(existing, 10) : 0;
  if (count >= RATE_LIMIT_MAX) {
    return jsonResponse({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }
  await env.RATE_LIMIT_KV.put(key, String(count + 1), {
    expirationTtl: count === 0 ? RATE_LIMIT_WINDOW_SECONDS : undefined,
  });
  return null;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  // ── CORS preflight ────────────────────────────────────────────────────────
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, { status: 405 });
  }

  // ── CONTACT_PHONE is the only hard requirement ────────────────────────────
  if (!env.CONTACT_PHONE) {
    console.error('CONTACT_PHONE env var is not set.');
    return jsonResponse({ error: 'Server configuration error.' }, { status: 500 });
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let token = '';
  try {
    const body = await request.json() as { token?: unknown };
    token = typeof body.token === 'string' ? body.token : '';
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, { status: 400 });
  }

  const clientIp = request.headers.get('CF-Connecting-IP') ?? 'unknown';

  // ── Layer 3: Turnstile (soft — only runs when secret key + token both present) ──
  // If TURNSTILE_SECRET_KEY isn't set, or if the client couldn't get a token
  // (e.g. domain not yet whitelisted), we skip verification rather than blocking.
  // Rate limiting below still provides server-side protection.
  if (env.TURNSTILE_SECRET_KEY && token) {
    try {
      const isHuman = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, clientIp);
      if (!isHuman) {
        return jsonResponse({ error: 'Challenge failed. Please try again.' }, { status: 403 });
      }
    } catch {
      // Turnstile API unreachable — log and continue rather than blocking the user
      console.warn('Turnstile verification failed (non-fatal):', clientIp);
    }
  }

  // ── Layer 4: IP rate limiting ─────────────────────────────────────────────
  try {
    const limited = await checkRateLimit(env, clientIp);
    if (limited) return limited;
  } catch {
    // KV unavailable — don't block legitimate users
    console.warn('Rate limit KV unavailable (non-fatal):', clientIp);
  }

  // ── Return phone number ───────────────────────────────────────────────────
  return jsonResponse({ phone: env.CONTACT_PHONE });
};
