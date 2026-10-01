// functions/api/newsletter.ts
interface Env {
  NEWSLETTER_KV?: KVNamespace;
  RESEND_API_KEY?: string;
}

const json = (o: any, s = 200) =>
  new Response(JSON.stringify(o), {
    status: s,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  });

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

async function sendConfirm(env: Env, email: string, token: string) {
  if (!env.RESEND_API_KEY) {
    console.warn('[NEWSLETTER] RESEND_API_KEY not configured. Bypassing email dispatch for token:', token);
    return;
  }

  const url = `https://moroai.cc/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'MoroAI <hello@moroai.cc>',
        to: [email],
        subject: 'Confirm your MoroAI subscription',
        html: `
          <div style="font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:auto;padding:36px;background:#020617;color:#e2e8f0;border-radius:16px;border:1px solid #1e293b">
            <div style="margin-bottom:20px">
              <span style="font-size:20px;font-weight:800;color:#fff">Moro<span style="color:#38bdf8">AI</span></span>
            </div>
            <h2 style="color:#38bdf8;font-size:22px;margin-bottom:12px">One click to confirm your subscription</h2>
            <p style="color:#94a3b8;line-height:1.6;font-size:14px">
              You requested updates, release notes, and deep-dives on sovereign local AI fine-tuning.
              Click the button below to confirm. You will receive at most two engineering dispatches per month. Zero tracking pixels, zero spam.
            </p>
            <div style="margin-top:24px;margin-bottom:24px">
              <a href="${url}" style="display:inline-block;padding:12px 28px;background:#0ea5e9;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px">
                Confirm subscription →
              </a>
            </div>
            <p style="font-size:12px;color:#64748b;line-height:1.5">
              This link expires in 7 days. If you did not request this, you can safely ignore this email.
            </p>
          </div>`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[NEWSLETTER] Resend error:', res.status, errText);
    }
  } catch (err) {
    console.error('[NEWSLETTER] Error sending email:', err);
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    let email = '';
    let topic = 'newsletter';
    let honeypot = '';

    const ct = request.headers.get('content-type') ?? '';
    if (ct.includes('application/json')) {
      const b = await request.json<any>();
      email = b.email ?? '';
      topic = b.topic ?? topic;
      honeypot = b.website ?? '';
    } else {
      const f = await request.formData();
      email = String(f.get('email') ?? '');
      topic = String(f.get('topic') ?? topic);
      honeypot = String(f.get('website') ?? '');
    }

    email = email.trim().toLowerCase();

    // Silent success for bot honeypot trap
    if (honeypot) {
      return json({ ok: true, status: 'subscribed' });
    }

    if (!EMAIL_RE.test(email)) {
      return json({ ok: false, error: 'invalid_email' }, 400);
    }

    // IP rate limiting: 4 attempts per IP per hour
    const ip = request.headers.get('cf-connecting-ip') ?? 'anon';
    const rl = `rl:${ip}`;

    if (env.NEWSLETTER_KV) {
      const n = Number((await env.NEWSLETTER_KV.get(rl)) ?? 0);
      if (n >= 4) {
        return json({ ok: false, error: 'rate_limited' }, 429);
      }
      await env.NEWSLETTER_KV.put(rl, String(n + 1), { expirationTtl: 3600 });

      const key = `sub:${topic}:${email}`;
      const existing = (await env.NEWSLETTER_KV.get(key, 'json')) as any;
      if (existing?.status === 'confirmed') {
        return json({ ok: true, status: 'already_subscribed' });
      }

      const token = crypto.randomUUID();
      await env.NEWSLETTER_KV.put(
        `pending:${token}`,
        JSON.stringify({ email, topic, ts: Date.now() }),
        { expirationTtl: 604800 }
      );
      await env.NEWSLETTER_KV.put(key, JSON.stringify({ status: 'pending', ts: Date.now() }));
      await sendConfirm(env, email, token);

      return json({ ok: true, status: 'confirm_sent' });
    } else {
      // Local dev / no KV fallback
      console.log('[NEWSLETTER DEV] Received subscription for:', email, 'topic:', topic);
      return json({ ok: true, status: 'confirm_sent' });
    }
  } catch (err: any) {
    console.error('[NEWSLETTER] Internal error:', err);
    return json({ ok: false, error: 'server_error' }, 500);
  }
};
