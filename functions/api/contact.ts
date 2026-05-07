export const onRequestPost: PagesFunction<{ RESEND_API_KEY: string }> = async (context) => {
  try {
    const formData = await context.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const project_type = formData.get('project_type');
    const budget = formData.get('budget');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'GRG Studios Leads <leads@send.grg-studios.com>',
        to: 'info@grg-studios.com',
        reply_to: email,
        subject: `New Lead: ${name} [${project_type}]`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #c9a84c; border-bottom: 2px solid #c9a84c; padding-bottom: 10px;">New Project Inquiry</h2>
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 10px;"><strong>Project Type:</strong> ${project_type}</p>
            <p style="margin-bottom: 10px;"><strong>Budget Range:</strong> ${budget}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              <strong>Message:</strong><br />
              <p style="white-space: pre-wrap;">${message || 'No message provided.'}</p>
            </div>
            <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #999; text-align: center;">
              Sent from your GRG Studios Lead Capture System
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Resend API Error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to send email via Resend' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Cloudflare Function Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
