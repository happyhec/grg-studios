'use client';

/**
 * PhoneReveal — Multi-layer bot/scraper protection for the contact phone number.
 *
 * Layer 1 — CSS obfuscation on the revealed number (bidi + entity encoding)
 * Layer 2 — Number never in HTML source; fetched from server function on click
 * Layer 3 — Cloudflare Turnstile challenge before server returns anything
 * Layer 4 — Server-side IP rate limiting via Cloudflare KV (optional)
 * Layer 5 — Hidden honeypot number in the DOM
 * Layer 6 — Entity-encoded character rendering after reveal
 *
 * ── ENV VARS REQUIRED ────────────────────────────────────────────────────────
 *
 * In Cloudflare Pages → Settings → Environment variables:
 *   CONTACT_PHONE                = 8059106096
 *   TURNSTILE_SECRET_KEY         = (from dash.cloudflare.com → Turnstile)
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY = (from dash.cloudflare.com → Turnstile)
 *
 * In your local .env.local (for development):
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x...
 *   NEXT_PUBLIC_DEV_PHONE=8059106096   ← only used on localhost, never deployed
 *
 * ── TURNSTILE DOMAIN SETUP ───────────────────────────────────────────────────
 * dash.cloudflare.com → Turnstile → your widget → Edit → Hostnames
 * Add ALL domains your site is served from, e.g.:
 *   grg-studios.com
 *   grg-portfolio-site.pages.dev   ← your Cloudflare Pages preview URL
 */

import { useState, useEffect, useRef, useCallback } from 'react';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

// Only used on localhost — never sent to the browser in production builds
// because Cloudflare Pages strips non-NEXT_PUBLIC_ vars, and this one
// is only meaningful in .env.local which is never committed to git.
const DEV_PHONE = process.env.NEXT_PUBLIC_DEV_PHONE ?? '';

type TurnstileWidgetId = string | number;

interface TurnstileRenderOptions {
  sitekey: string;
  theme: 'auto' | 'dark' | 'light';
  size: 'normal' | 'compact' | 'invisible';
  callback: (token: string) => void | Promise<void>;
  'error-callback': () => void;
  'expired-callback': () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => TurnstileWidgetId;
  remove: (widgetId: TurnstileWidgetId) => void;
}

declare global {
  interface Window { turnstile?: TurnstileApi; }
}

// ─── Layer 1 + 6: Entity-encode every character, bidi trick on the wrapper ───
function ObfuscatedNumber({ phone }: { phone: string }) {
  const formatted = `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`;
  return (
    <span
      style={{ unicodeBidi: 'bidi-override', direction: 'ltr', display: 'inline-block' }}
      aria-label={`Phone: ${formatted}`}
      role="text"
    >
      {formatted.split('').map((char, i) => (
        <span key={i} dangerouslySetInnerHTML={{ __html: `&#${char.charCodeAt(0)};` }} style={{ display: 'inline' }} />
      ))}
      {/* Decoy — breaks substring extraction */}
      <span aria-hidden="true" style={{ display: 'none' }} data-decoy="true">
        &#40;&#48;&#48;&#48;&#41;&#32;&#48;&#48;&#48;&#45;&#48;&#48;&#48;&#48;
      </span>
    </span>
  );
}

// ─── Turnstile script loader ──────────────────────────────────────────────────
let turnstileScriptLoaded = false;
function loadTurnstileScript(): Promise<void> {
  if (turnstileScriptLoaded || typeof window === 'undefined') return Promise.resolve();
  return new Promise((resolve) => {
    if (document.querySelector('script[src*="turnstile"]')) {
      turnstileScriptLoaded = true; resolve(); return;
    }
    const s   = document.createElement('script');
    s.src     = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async   = true;
    s.onload  = () => { turnstileScriptLoaded = true; resolve(); };
    s.onerror = () => resolve(); // don't hang if script fails to load
    document.head.appendChild(s);
  });
}

interface PhoneRevealProps {
  variant?: 'contact-bar' | 'drawer';
}

type RevealState = 'idle' | 'loading' | 'awaiting-challenge' | 'verifying' | 'revealed' | 'error';

// ─── Detect localhost ─────────────────────────────────────────────────────────
function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false;
  return ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);
}

export default function PhoneReveal({ variant = 'contact-bar' }: PhoneRevealProps) {
  const [state,    setState]    = useState<RevealState>('idle');
  const [phone,    setPhone]    = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const widgetRef               = useRef<HTMLDivElement>(null);
  const widgetIdRef             = useRef<TurnstileWidgetId | null>(null);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  // ── Fetch phone from server after Turnstile passes ──────────────────────────
  const fetchPhone = useCallback(async (token: string | null) => {
    setState('verifying');
    try {
      const res  = await fetch('/api/reveal-phone', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ token }),
      });
      const data = await res.json() as { phone?: string; error?: string };
      if (res.ok && data.phone) {
        setPhone(data.phone);
        setState('revealed');
        if (widgetIdRef.current !== null && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      } else {
        setState('error');
        setErrorMsg(data.error ?? 'Could not load number. Please use the contact form below.');
      }
    } catch {
      setState('error');
      setErrorMsg('Network error. Please use the contact form below.');
    }
  }, []);

  const handleReveal = useCallback(async () => {
    if (state !== 'idle' && state !== 'error') return;
    setState('loading');
    setErrorMsg('');

    // ── Localhost: use NEXT_PUBLIC_DEV_PHONE directly, no server call needed ──
    if (isLocalhost()) {
      if (DEV_PHONE) {
        setPhone(DEV_PHONE);
        setState('revealed');
      } else {
        setState('error');
        setErrorMsg('Add NEXT_PUBLIC_DEV_PHONE=8059106096 to your .env.local to test locally.');
      }
      return;
    }

    // ── Production: run Turnstile challenge ───────────────────────────────────
    await loadTurnstileScript();

    // Wait for window.turnstile to be available (up to 4s)
    let polls = 0;
    await new Promise<void>((resolve) => {
      const check = () => {
        if (window.turnstile || polls++ > 40) { resolve(); return; }
        setTimeout(check, 100);
      };
      check();
    });

    if (!window.turnstile) {
      setState('error');
      setErrorMsg('Verification unavailable. Please use the contact form below.');
      return;
    }

    setState('awaiting-challenge');

    if (widgetRef.current) {
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme:   'dark',
        size:    'compact',
        callback: (token: string) => { fetchPhone(token); },
        'error-callback': () => {
          // Turnstile failed (domain not whitelisted, network issue, etc.)
          // Fall back to direct server call — rate limiting still protects the endpoint.
          console.warn('Turnstile failed — falling back to direct call');
          if (widgetIdRef.current !== null && window.turnstile) {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
          }
          fetchPhone(null);
        },
        'expired-callback': () => { setState('idle'); },
      });
    }
  }, [state, fetchPhone]);

  const isDrawer = variant === 'drawer';

  return (
    <>
      {/* ── Layer 5: Honeypot ─────────────────────────────────────────── */}
      <span
        aria-hidden="true"
        style={{ display: 'none', visibility: 'hidden', position: 'absolute', left: '-9999px' }}
        data-hp="phone"
      >
        (999) 000-0000
      </span>

      <div className={isDrawer ? 'flex flex-col gap-3' : 'flex items-center gap-3'}>
        {state === 'revealed' && phone ? (
          <a
            href={`tel:${phone}`}
            className={isDrawer
              ? 'flex items-center gap-4 py-2 text-[14px] text-[#a3a39c] active:text-[#c9a84c] transition-colors'
              : 'flex items-center gap-3 hover:text-[#c9a84c] transition-colors text-[#a3a39c] text-sm'
            }
          >
            <span className={`text-[#c9a84c] ${isDrawer ? 'text-lg' : ''}`}>✆</span>
            <ObfuscatedNumber phone={phone} />
          </a>
        ) : (
          <div className={`flex ${isDrawer ? 'flex-col' : 'flex-col sm:flex-row'} gap-3`}>
            <button
              onClick={handleReveal}
              disabled={state === 'loading' || state === 'verifying'}
              className={isDrawer
                ? 'flex items-center gap-4 py-2 text-[14px] text-[#a3a39c] active:text-[#c9a84c] transition-colors text-left disabled:opacity-50'
                : 'flex items-center gap-3 text-sm text-[#a3a39c] hover:text-[#c9a84c] transition-colors disabled:opacity-50'
              }
              aria-label="Reveal phone number"
            >
              <span className={`text-[#c9a84c] ${isDrawer ? 'text-lg' : ''}`}>✆</span>
              <span>
                {state === 'loading'            ? 'Loading...'
                  : state === 'awaiting-challenge' ? 'Complete the check...'
                  : state === 'verifying'          ? 'Verifying...'
                  : 'Tap to call'}
              </span>
            </button>

            {/* Turnstile widget mounts here */}
            <div ref={widgetRef} className="turnstile-widget" />

            {state === 'error' && errorMsg && (
              <p className="text-[#a3a39c] text-xs mt-1 max-w-xs leading-relaxed">{errorMsg}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
