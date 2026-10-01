// functions/api/newsletter/confirm.ts
interface Env {
  NEWSLETTER_KV?: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ env, url }) => {
  const token = url.searchParams.get('token');

  const page = (title: string, msg: string, ok: boolean) =>
    new Response(
      `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ok ? 'Subscription Confirmed' : 'Verification Issue'} — MoroAI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: #020617;
      color: #f1f5f9;
      display: grid;
      place-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
    }
    .card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 20px;
      padding: 40px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.7);
    }
    .icon {
      font-size: 40px;
      margin-bottom: 16px;
      display: inline-block;
    }
    h1 {
      font-size: 26px;
      font-weight: 800;
      color: ${ok ? '#38bdf8' : '#f87171'};
      margin: 0 0 12px;
      letter-spacing: -0.02em;
    }
    p {
      color: #94a3b8;
      font-size: 15px;
      line-height: 1.6;
      margin: 0 0 28px;
    }
    a.btn {
      display: inline-block;
      padding: 12px 24px;
      background: #0ea5e9;
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      border-radius: 10px;
      font-size: 14px;
      transition: background 0.2s;
    }
    a.btn:hover {
      background: #0284c7;
    }
    .meta {
      margin-top: 24px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${ok ? '⚡' : '⚠️'}</div>
    <h1>${title}</h1>
    <p>${msg}</p>
    <a href="https://moroai.cc" class="btn">Return to moroai.cc →</a>
    <div class="meta">MoroAI Foundry · Double Opt-In Verified</div>
  </div>
</body>
</html>`,
      {
        status: ok ? 200 : 400,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
        },
      }
    );

  if (!token) {
    return page('Missing Token', 'No confirmation token was found in the link.', false);
  }

  if (!env.NEWSLETTER_KV) {
    // In dev / preview without KV
    return page(
      '✓ Confirmed (Dev Mode)',
      'Your subscription has been verified successfully. Welcome to the MoroAI foundry dispatch.',
      true
    );
  }

  const pending = (await env.NEWSLETTER_KV.get(`pending:${token}`, 'json')) as any;
  if (!pending) {
    return page(
      'Expired or Invalid Link',
      'This confirmation link has already been used or has expired after 7 days.',
      false
    );
  }

  await env.NEWSLETTER_KV.put(
    `sub:${pending.topic}:${pending.email}`,
    JSON.stringify({ status: 'confirmed', ts: Date.now() })
  );
  await env.NEWSLETTER_KV.delete(`pending:${token}`);

  return page(
    '✓ You’re on the List!',
    `Welcome to MoroAI, <strong>${pending.email}</strong>. You're set to receive our latest engineering breakthroughs and model recipes.`,
    true
  );
};
