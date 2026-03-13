# MOON CUTS — Booking System

## Folder Structure

```
moon-cuts/
├── public/                 ← Your website (deploy this folder)
│   ├── index.html          ← Client booking page
│   ├── dashboard.html      ← Barber dashboard
│   ├── config.js           ← ⭐ YOUR KEYS GO HERE
│   ├── services.js         ← Edit services & prices
│   └── sms-templates.js    ← Edit SMS message text
│
├── worker/                 ← Cloudflare SMS proxy
│   ├── sms-worker.js       ← The worker code
│   └── wrangler.toml       ← Worker config
│
├── netlify.toml            ← Netlify deploy config
├── .gitignore
└── README.md
```

---

## Setup (15 min total)

### 1. JSONBin — booking storage (free)

1. Go to https://jsonbin.io → sign up
2. **API Keys** (left sidebar) → copy your **Master Key**
3. **Bins** → **Create a Bin** → paste this → Create:
   ```json
   {"bookings":[],"clients":[]}
   ```
4. Copy the **Bin ID** from the URL bar

5. Open `public/config.js` and fill in:
   ```js
   JSONBIN_BIN_ID:  'paste-bin-id-here',
   JSONBIN_API_KEY: 'paste-master-key-here',
   ```

---

### 2. Twilio — SMS (free trial = ~500 texts)

1. Go to https://twilio.com → sign up
2. From the dashboard grab:
   - **Account SID** (starts with AC...)
   - **Auth Token**
3. **Phone Numbers → Get a number** → pick any US number

---

### 3. Cloudflare Worker — SMS proxy (free)

Twilio can't be called directly from a browser, so this tiny worker handles it.

**Option A — Cloudflare Dashboard (easiest)**
1. Go to https://workers.cloudflare.com → sign up (free)
2. **Create a Worker**
3. Delete the default code, paste in everything from `worker/sms-worker.js`
4. Click **Save and Deploy**
5. Copy your worker URL (e.g. `https://moon-sms.yourname.workers.dev`)
6. Go to **Settings → Variables** → add:
   - `TWILIO_ACCOUNT_SID` = your Account SID
   - `TWILIO_AUTH_TOKEN` = your Auth Token  
   - `TWILIO_PHONE_NUMBER` = your Twilio number (e.g. +15551234567)

**Option B — Wrangler CLI**
```bash
npm install -g wrangler
cd worker
wrangler login
wrangler deploy
wrangler secret put TWILIO_ACCOUNT_SID
wrangler secret put TWILIO_AUTH_TOKEN
wrangler secret put TWILIO_PHONE_NUMBER
```

7. Back in `public/config.js`, fill in:
   ```js
   SMS_ENDPOINT: 'https://moon-sms.yourname.workers.dev',
   ```

---

### 4. Test it

Open `dashboard.html` → **Settings** → hit **SEND TEST** → enter your phone number. 
If you get a text, you're live.

---

### 5. Deploy to Netlify (free)

1. Go to https://netlify.com → sign up
2. Drag and drop the entire `public/` folder onto the deploy area
3. Done — you'll get a URL like `https://moon-cuts.netlify.app`

**Custom domain** (optional):
- In Netlify → Domain Settings → Add custom domain
- Point your domain's DNS to Netlify

---

## Making Changes

| What you want to change | File to edit |
|---|---|
| Services / prices | `public/services.js` |
| SMS message text | `public/sms-templates.js` |
| API keys | `public/config.js` |
| Working hours / days | `public/config.js` |
| Site design | `public/index.html` |
| Dashboard | `public/dashboard.html` |

---

## How it works

```
Client books on index.html
        ↓
Saves to JSONBin (booking + client record)
        ↓
Calls your Cloudflare Worker
        ↓
Worker calls Twilio API
        ↓
Client gets SMS confirmation
        ↓
Moon sees it in dashboard.html
```
