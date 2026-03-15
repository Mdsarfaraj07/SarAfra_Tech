# DevCraft Studio — Complete Setup Guide

## ⚡ Quick Start (works immediately, no config needed)
Just open `index.html` in a browser — everything runs in demo mode.

---

## 🗄️ Step 1 — Supabase Database (Free, 10 min)

1. Go to https://supabase.com → Create free project
2. Dashboard → **SQL Editor** → New Query
3. Paste contents of `supabase_schema.sql` → Click **Run**
4. Go to **Settings → API** and copy:
   - **Project URL** (looks like: https://abcdef.supabase.co)
   - **anon public** key (long JWT string)
5. Open `js/database.js` and replace lines 7–8:
   ```js
   const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';  // ← your URL
   const SUPABASE_KEY = 'YOUR_ANON_PUBLIC_KEY';                 // ← your key
   ```

---

## 💳 Step 2 — Razorpay Payments (5 min)

1. Go to https://razorpay.com → Sign up
2. Dashboard → **Settings → API Keys → Generate Test Key**
3. Open `js/payment.js` and replace line 9:
   ```js
   const RAZORPAY_KEY = 'rzp_test_YOUR_ACTUAL_KEY';
   ```
4. For live payments, use `rzp_live_...` key

> **Note**: Without a real key, the site runs in DEMO MODE — simulates payment and generates the invoice perfectly.

---

## 🚀 Step 3 — Deploy Online (2 min)

### Vercel (Recommended — Free)
1. Zip the entire `devcraft/` folder
2. Go to https://vercel.com → Sign up → **Add New Project → Upload**
3. Drag & drop the zip → **Deploy**
4. Live in ~30 seconds at `yourproject.vercel.app`

### Netlify (Also Free)
1. Go to https://netlify.com → Sign up
2. Drag the `devcraft/` folder into the dashboard
3. Instant live URL

---

## ✏️ Step 4 — Customize Content

All site content is in **`js/data.js`**:

| Variable        | What to edit                          |
|-----------------|---------------------------------------|
| `SERVICES`      | Your service offerings                |
| `PORTFOLIO`     | Your case studies                     |
| `PLANS`         | Your pricing tiers & amounts          |
| `TESTIMONIALS`  | Client quotes                         |
| `CONTACT_INFO`  | Email, phone, address                 |
| `AGENT_STEPS`   | ARIA chat questions                   |

### Change branding
- **Name**: Find/replace "DevCraft" in `index.html`
- **Colors**: Edit `:root` in `css/main.css`
  ```css
  --cyan: #00e5ff;   /* primary accent */
  --gold: #ffc940;   /* secondary accent */
  --pink: #ff2d78;   /* tertiary accent */
  ```
- **Logo**: Replace `assets/favicon.svg`
- **GST number**: Search "29ABCDE1234F1Z5" in `index.html` and `js/invoice.js`

---

## 📁 File Structure

```
devcraft/
├── index.html              ← Main page
├── supabase_schema.sql     ← Run once in Supabase
├── css/
│   ├── main.css            ← Layout & core styles
│   ├── animations.css      ← Keyframes & transitions
│   └── components.css      ← UI components
├── js/
│   ├── data.js             ← ALL site content (edit this!)
│   ├── database.js         ← Supabase integration
│   ├── agent.js            ← ARIA chat agent
│   ├── payment.js          ← Razorpay integration
│   ├── invoice.js          ← Invoice generation
│   └── main.js             ← UI rendering & interactions
└── assets/
    └── favicon.svg
```

---

## ✅ Config Checklist

- [ ] Open `index.html` locally — site works in demo mode
- [ ] Create Supabase project & run `supabase_schema.sql`
- [ ] Set `SUPABASE_URL` + `SUPABASE_KEY` in `js/database.js`
- [ ] Set `RAZORPAY_KEY` in `js/payment.js`
- [ ] Edit content in `js/data.js`
- [ ] Deploy to Vercel or Netlify
- [ ] Test full flow: ARIA chat → Proposal → Payment → Invoice

---

## 🆘 Support

Email: hello@devcraft.studio
