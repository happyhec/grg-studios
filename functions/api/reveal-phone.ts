interface Env {
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_PHONE?: string;
  RATE_LIMIT_KV?: KVNamespace;
}

type TurnstileVerifyResponse = {
  success?: boolean;
};

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...init?.headers,
    },
  });
}

async function verifyTurnstileToken(token: string, secret: string, clientIp: string) {
  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', token);
  formData.append('remoteip', clientIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  const data = (await response.json()) as TurnstileVerifyResponse;
  return response.ok && data.success === true;
}

async function rateLimitReveal(env: Env, clientIp: string) {
  if (!env.RATE_LIMIT_KV) {
    return null;
  }

  const key = `phone_reveal:${clientIp}`;
  const existing = await env.RATE_LIMIT_KV.get(key);
  const count = existing ? Number.parseInt(existing, 10) : 0;

  if (count >= RATE_LIMIT_MAX) {
    return jsonResponse({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  await env.RATE_LIMIT_KV.put(key, String(count + 1), {
    expirationTtl: count === 0 ? RATE_LIMIT_WINDOW_SECONDS : undefined,
  });

  return null;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, { status: 405 });
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.CONTACT_PHONE) {
    return jsonResponse({ error: 'Server configuration error.' }, { status: 500 });
  }

  let token = '';
  try {
    const body = (await request.json()) as { token?: unknown };
    token = typeof body.token === 'string' ? body.token : '';
  } catch {
    return jsonResponse({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!token) {
    return jsonResponse({ error: 'Missing challenge token.' }, { status: 400 });
  }

  const clientIp = request.headers.get('CF-Connecting-IP') ?? 'unknown';

  try {
    const isHuman = await verifyTurnstileToken(token, env.TURNSTILE_SECRET_KEY, clientIp);
    if (!isHuman) {
      return jsonResponse({ error: 'Challenge failed. Please try again.' }, { status: 403 });
    }
  } catch {
    return jsonResponse({ error: 'Challenge verification failed.' }, { status: 502 });
  }

  try {
    const rateLimitResponse = await rateLimitReveal(env, clientIp);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  } catch {
    // Do not block legitimate callers if optional KV rate limiting is unavailable.
  }

  return jsonResponse({ phone: env.CONTACT_PHONE });
};
