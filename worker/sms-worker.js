// ============================================================
// MOON CUTS — Twilio SMS Worker
// Deploy this on Cloudflare Workers (free tier, takes 2 min)
// ============================================================

export default {
  async fetch(request, env) {

    // Allow CORS from your site
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers });
    }

    try {
      const { to, body } = await request.json();

      if (!to || !body) {
        return new Response(JSON.stringify({ error: 'Missing to or body' }), { status: 400, headers });
      }

      // Call Twilio
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;

      const form = new URLSearchParams();
      form.append('To', to);
      form.append('From', env.TWILIO_PHONE_NUMBER);
      form.append('Body', body);

      const twilioRes = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: form.toString(),
      });

      const result = await twilioRes.json();

      if (!twilioRes.ok) {
        console.error('Twilio error:', result);
        return new Response(JSON.stringify({ error: result.message }), { status: 500, headers });
      }

      return new Response(JSON.stringify({ success: true, sid: result.sid }), { headers });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
  }
};