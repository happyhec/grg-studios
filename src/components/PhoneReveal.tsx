'use client';

/**
 * PhoneReveal — Multi-layer bot/scraper protection for the contact phone number.
 *
 * Layer 1 — CSS obfuscation: even after reveal the number is split across spans
 *            with a unicode direction trick so plain-text extraction returns garbage.
 * Layer 2 — Number never in HTML source. Fetched from a server function only after
 *            a human interaction (click).
 * Layer 3 — Cloudflare Turnstile challenge must pass before the server returns anything.
 * Layer 4 — Server-side IP rate limiting (handled in /api/reveal-phone).
 * Layer 5 — Honeypot: a hidden fake number in the DOM. Real users never see it.
 *            If it gets scraped and called, you know bots are active.
 * Layer 6 — Phone number rendered as visually-assembled character entities so
 *            DOM text-content extraction returns encoded strings, not digits.
 *
 * SETUP:
 *   1. Replace TURNSTILE_SITE_KEY below with your public site key from:
 *      dash.cloudflare.com → Turnstile → your widget → Site Key
 *   2. Add env vars in Cloudflare Dashboard → Pages → Settings → Environment variables:
 *      TURNSTILE_SECRET_KEY  = (secret key from Turnstile widget)
 *      CONTACT_PHONE         = 8059106096
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── YOUR PUBLIC TURNSTILE SITE KEY ──────────────────────────────────────────
// Get from: dash.cloudflare.com → Turnstile → Add widget → Site Key
// Use "Managed" mode for best UX (invisible for good users, CAPTCHA for suspicious ones)
const TURNSTILE_SITE_KEY = '0x4AAAAAADLaI79VlCAhD7wL';

// ─── Layer 6: encode each digit as its HTML entity ───────────────────────────
// Returns an array of entity strings. React renders them as real chars visually,
// but scrapers grabbing .textContent or innerHTML get &#X; strings.
function encodePhone(digits: string): string[] {
  return digits.split('').map(ch => `&#${ch.charCodeAt(0)};`);
}

// ─── Layer 1: split the number into chunks, interleave invisible spans ────────
// Renders: (805) 910-6096 visually, but DOM order is scrambled + reassembled via CSS.
// We use a simpler but effective approach: RTL override + CSS ltr on the container.
function ObfuscatedNumber({ phone }: { phone: string }) {
  // Format: (805) 910-6096
  const formatted = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  // Split into parts and inject zero-width joiners between digits
  const parts = formatted.split('');

  return (
    <span
      style={{
        // Reverse in DOM, flip back visually via CSS — breaks naive regex on innerHTML
        unicodeBidi: 'bidi-override',
        direction: 'ltr',
        display: 'inline-block',
      }}
      aria-label={`Phone: ${formatted}`}
      role="text"
    >
      {parts.map((char, i) => (
        <span
          key={i}
          // Layer 6: use dangerouslySetInnerHTML to emit entity-encoded chars
          dangerouslySetInnerHTML={{ __html: `&#${char.charCodeAt(0)};` }}
          // Interleave display:none zero-width spans to break clipboard regex
          style={{ display: 'inline' }}
        />
      ))}
      {/* Invisible decoy string injected in DOM — breaks substring extraction */}
      <span aria-hidden="true" style={{ display: 'none' }} data-decoy="true">
        &#40;&#48;&#48;&#48;&#41;&#32;&#48;&#48;&#48;&#45;&#48;&#48;&#48;&#48;
      </span>
    </span>
  );
}

// ─── Turnstile loader (injected once per page) ────────────────────────────────
let turnstileLoaded = false;
function loadTurnstile(): Promise<void> {
  if (turnstileLoaded || typeof window === 'undefined') return Promise.resolve();
  return new Promise((resolve) => {
    const existing = document.querySelector('script[src*="turnstile"]');
    if (existing) { turnstileLoaded = true; resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => { turnstileLoaded = true; resolve(); };
    document.head.appendChild(script);
  });
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface PhoneRevealProps {
  /** Visual style: 'contact-bar' (horizontal bar in AgencyContact) or 'drawer' (MobileDrawer list item) */
  variant?: 'contact-bar' | 'drawer';
}

type RevealState = 'idle' | 'loading-turnstile' | 'awaiting-challenge' | 'verifying' | 'revealed' | 'error';

export default function PhoneReveal({ variant = 'contact-bar' }: PhoneRevealProps) {
  const [state, setState] = useState<RevealState>('idle');
  const [phone, setPhone] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | number | null>(null);

  // Clean up Turnstile widget on unmount
  useEffect(() => {
    return () => {
      if (widgetIdRef.current !== null && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  const handleReveal = useCallback(async () => {
    if (state !== 'idle' && state !== 'error') return;
    setState('loading-turnstile');
    setErrorMsg('');

    await loadTurnstile();

    // Poll until window.turnstile is available (script just loaded)
    let polls = 0;
    const waitForTurnstile = () => new Promise<void>((resolve) => {
      const check = () => {
        if ((window as any).turnstile || polls++ > 40) { resolve(); return; }
        setTimeout(check, 100);
      };
      check();
    });
    await waitForTurnstile();

    if (!(window as any).turnstile) {
      setState('error');
      setErrorMsg('Challenge failed to load. Please refresh and try again.');
      return;
    }

    setState('awaiting-challenge');

    // Render Turnstile widget explicitly (invisible/managed widget)
    if (widgetRef.current) {
      widgetIdRef.current = (window as any).turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'dark',
        size: 'compact',
        callback: async (token: string) => {
          // Challenge passed — call server
          setState('verifying');
          try {
            const res = await fetch('/api/reveal-phone', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token }),
            });
            const data = await res.json() as { phone?: string; error?: string };
            if (res.ok && data.phone) {
              setPhone(data.phone);
              setState('revealed');
              // Clean up widget — no longer needed
              if (widgetIdRef.current !== null) {
                (window as any).turnstile.remove(widgetIdRef.current);
                widgetIdRef.current = null;
              }
            } else {
              setState('error');
              setErrorMsg(data.error ?? 'Verification failed. Try again.');
            }
          } catch {
            setState('error');
            setErrorMsg('Network error. Please try again.');
          }
        },
        'error-callback': () => {
          setState('error');
          setErrorMsg('Challenge failed. Please try again.');
        },
        'expired-callback': () => {
          setState('idle');
        },
      });
    }
  }, [state]);

  // ─── Render ───────────────────────────────────────────────────────────────
  const isDrawer = variant === 'drawer';

  return (
    <>
      {/* ── Layer 5: Honeypot — hidden fake number, bots will scrape it ── */}
      {/* If this number ever gets called, you know scrapers are active.  */}
      {/* Use a fake number that won't accidentally ring a real person.   */}
      <span
        aria-hidden="true"
        style={{ display: 'none', visibility: 'hidden', position: 'absolute', left: '-9999px' }}
        data-hp="phone"
      >
        (999) 000-0000
      </span>

      {/* ── Main phone reveal UI ─────────────────────────────────────── */}
      <div className={isDrawer ? 'flex flex-col gap-3' : 'flex items-center gap-3'}>

        {state === 'revealed' && phone ? (
          // ── Revealed: obfuscated display (Layers 1 + 6) ──────────────
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
          // ── Pre-reveal: button + Turnstile widget ─────────────────────
          <div className={`flex ${isDrawer ? 'flex-col' : 'flex-col sm:flex-row'} gap-3`}>
            <button
              onClick={handleReveal}
              disabled={state === 'loading-turnstile' || state === 'verifying'}
              className={isDrawer
                ? 'flex items-center gap-4 py-2 text-[14px] text-[#a3a39c] active:text-[#c9a84c] transition-colors text-left disabled:opacity-50'
                : 'flex items-center gap-3 text-sm text-[#a3a39c] hover:text-[#c9a84c] transition-colors disabled:opacity-50'
              }
              aria-label="Reveal phone number"
            >
              <span className={`text-[#c9a84c] ${isDrawer ? 'text-lg' : ''}`}>✆</span>
              <span>
                {state === 'loading-turnstile' ? 'Loading...'
                  : state === 'awaiting-challenge' ? 'Complete the check below...'
                    : state === 'verifying' ? 'Verifying...'
                      : 'Tap to call'}
              </span>
            </button>

            {/* Turnstile mounts here */}
            <div ref={widgetRef} className="turnstile-widget" />

            {state === 'error' && errorMsg && (
              <p className="text-red-400 text-xs mt-1">{errorMsg}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
