/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives form submissions from AgencyContact.tsx, validates the payload,
 * and delivers a branded HTML email via the Resend API.
 *
 * Runtime: Cloudflare Workers (NOT Node.js — no fs, no require, no process.env)
 * Environment variable required: RESEND_API_KEY  (set in CF Dashboard → Pages →
 *   Settings → Environment variables, then redeploy)
 *
 * Sender domain note: the `from` address below uses grg-studios.com.
 * You must verify that domain inside your Resend account
 * (Resend Dashboard → Domains → Add Domain) before emails will deliver.
 * Until then, you can temporarily use Resend's shared domain:
 *   from: 'GRG Studios <onboarding@resend.dev>'
 */

interface Env {
  RESEND_API_KEY: string;
}

function buildEmailHtml(
  name: string,
  email: string,
  projectType: string,
  budget: string,
  message: string,
  submittedAt: string,
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Project Inquiry — GRG Studios</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="background:#080808;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
               style="max-width:600px;width:100%;background:#111111;border-radius:12px;
                      border:1px solid rgba(255,255,255,0.07);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0a0a0a;padding:32px 40px;border-bottom:1px solid rgba(201,168,76,0.25);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;
                                 color:#c9a84c;font-weight:700;">GRG Studios</span>
                    <p style="margin:6px 0 0;font-size:10px;letter-spacing:0.2em;
                               text-transform:uppercase;color:rgba(255,255,255,0.25);">
                      New Project Inquiry
                    </p>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(201,168,76,0.1);
                                 border:1px solid rgba(201,168,76,0.3);border-radius:20px;
                                 padding:5px 14px;font-size:10px;letter-spacing:0.2em;
                                 text-transform:uppercase;color:#c9a84c;">
                      Lead Capture
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <!-- Intro -->
              <p style="margin:0 0 32px;font-size:15px;color:rgba(245,240,232,0.7);line-height:1.6;">
                A new inquiry just came through the contact form. Here's everything submitted:
              </p>

              <!-- Data Fields -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">

                ${[
                  { label: 'Full Name',     value: name },
                  { label: 'Email',         value: email },
                  { label: 'Project Type',  value: projectType },
                  { label: 'Budget Range',  value: budget },
                ].map((row, i) => `
                <tr style="background:${i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'};">
                  <td style="padding:14px 20px;font-size:10px;letter-spacing:0.2em;
                              text-transform:uppercase;color:#c9a84c;font-weight:700;
                              white-space:nowrap;border-bottom:1px solid rgba(255,255,255,0.04);">
                    ${row.label}
                  </td>
                  <td style="padding:14px 20px;font-size:14px;color:#f5f0e8;
                              border-bottom:1px solid rgba(255,255,255,0.04);">
                    ${row.value}
                  </td>
                </tr>`).join('')}

              </table>

              <!-- Message Block -->
              ${message && message !== 'No message provided.' ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin-top:24px;">
                <tr>
                  <td style="padding:20px 24px;background:rgba(201,168,76,0.05);
                              border-left:2px solid #c9a84c;border-radius:0 8px 8px 0;">
                    <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;
                               text-transform:uppercase;color:#c9a84c;font-weight:700;">
                      Project Notes
                    </p>
                    <p style="margin:0;font-size:14px;color:rgba(245,240,232,0.8);
                               line-height:1.7;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>` : ''}

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="margin-top:36px;">
                <tr>
                  <td>
                    <a href="mailto:${email}?subject=Re%3A%20Your%20GRG%20Studios%20Inquiry"
                       style="display:inline-block;background:#c9a84c;color:#080808;
                              font-size:11px;font-weight:800;letter-spacing:0.2em;
                              text-transform:uppercase;text-decoration:none;
                              padding:14px 28px;border-radius:4px;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background:#0a0a0a;
                       border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:10px;letter-spacing:0.15em;
                         text-transform:uppercase;color:rgba(255,255,255,0.2);">
                GRG Studios &nbsp;·&nbsp; Camarillo, California
                &nbsp;·&nbsp; Submitted ${submittedAt}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // ── CORS headers (same-origin in production, but handy for local dev) ──
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  // ── Parse form data ────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid form data.' }),
      { status: 400, headers },
    );
  }

  const name        = (formData.get('name')         as string | null)?.trim() ?? '';
  const email       = (formData.get('email')        as string | null)?.trim() ?? '';
  const projectType = (formData.get('project_type') as string | null)?.trim() ?? '';
  const budget      = (formData.get('budget')       as string | null)?.trim() ?? '';
  const message     = (formData.get('message')      as string | null)?.trim() ?? '';

  // ── Validate required fields ───────────────────────────────────────────
  if (!name || !email || !projectType || !budget) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields.' }),
      { status: 400, headers },
    );
  }

  // Basic email sanity check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Invalid email address.' }),
      { status: 400, headers },
    );
  }

  // ── Guard: API key must be set ─────────────────────────────────────────
  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set.');
    return new Response(
      JSON.stringify({ error: 'Server configuration error.' }),
      { status: 500, headers },
    );
  }

  // ── Build and send email ───────────────────────────────────────────────
  const submittedAt = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const emailHtml = buildEmailHtml(
    name, email, projectType, budget,
    message || 'No message provided.',
    submittedAt,
  );

  const resendPayload = {
    // Change to your verified Resend sender once grg-studios.com is verified.
    // Until then use: 'GRG Studios <onboarding@resend.dev>'
    from:     'GRG Studios <noreply@grg-studios.com>',
    to:       ['inquiries@grg-studios.com'],
    reply_to: email,
    subject:  `New Inquiry — ${projectType} · ${name}`,
    html:     emailHtml,
  };

  let resendRes: Response;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    });
  } catch (err) {
    console.error('Network error contacting Resend:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to reach email provider.' }),
      { status: 502, headers },
    );
  }

  if (!resendRes.ok) {
    const body = await resendRes.text();
    console.error(`Resend API error ${resendRes.status}:`, body);
    return new Response(
      JSON.stringify({ error: 'Email delivery failed.' }),
      { status: 502, headers },
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers },
  );
};

// Return 405 for any non-POST method hitting this endpoint
export const onRequest: PagesFunction<Env> = async ({ request, next }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST' },
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
